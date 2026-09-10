#!/usr/bin/env python3
"""Regression checks for the static site and its production content."""

from __future__ import annotations

import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parents[1]
PAGES = [
    "index.html", "research.html", "contributions.html", "publications.html",
    "software.html", "people.html", "about.html", "writing.html", "coin.html",
    "contact.html", "cv.html", "projects.html",
]
PRIMARY_PAGES = [name for name in PAGES if name not in {"cv.html", "projects.html"}]
CANONICAL_ROOT = "https://rafaelsdesouza.com.br"
LEGACY_ANCHORS = {
    "index.html": {"home"},
    "research.html": {"research-interest-grid", "research-application-grid", "research-video-grid", "videos"},
    "publications.html": {"publications", "publication-search", "publication-count", "publication-list"},
    "software.html": {"software-grid"},
    "writing.html": {"writing-grid"},
}
PROSE_RED_FLAGS = (
    "scientific software makes a statistical argument inspectable",
    "software turns statistical methods into research infrastructure",
    "research infrastructure",
    "intellectual architecture",
    "scientific ecosystem",
    "methodological frontier",
    "research engine",
    "platform for discovery",
    "scientific machinery",
    "innovation pipeline",
    "knowledge infrastructure",
    "interpretive layer",
    "interpretive record",
    "research architecture",
    "building scientific communities",
    "these works were selected because",
    "the list is interpretive",
    "projects are labelled here",
)


class ReferenceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.references: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if tag in {"a", "link", "script"}:
            value = values.get("href") or values.get("src")
            if value:
                self.references.append(value)
        elif tag == "img" and values.get("src"):
            self.references.append(values["src"] or "")


def check_local_reference(page: Path, reference: str) -> str | None:
    parsed = urlsplit(reference)
    if parsed.scheme or parsed.netloc or reference.startswith(("mailto:", "#")):
        return None
    target = (page.parent / parsed.path).resolve()
    if not target.exists():
        return f"{page.name}: missing local target {reference}"
    return None


def main() -> None:
    errors: list[str] = []
    for name in PAGES:
        page = ROOT / name
        if not page.exists():
            errors.append(f"missing page: {name}")
            continue
        text = page.read_text(encoding="utf-8")
        parser = ReferenceParser()
        parser.feed(text)
        for reference in parser.references:
            error = check_local_reference(page, reference)
            if error:
                errors.append(error)
        if "�" in text:
            errors.append(f"{name}: replacement character found")
        if name in PRIMARY_PAGES and not re.search(r'<meta name="viewport"', text):
            errors.append(f"{name}: missing viewport metadata")
        if name in PRIMARY_PAGES:
            nav = re.search(r'<nav class="site-nav"[^>]*>([\s\S]*?)</nav>', text)
            labels = re.findall(r'<a[^>]*>([^<]+)</a>', nav.group(1)) if nav else []
            if labels != ["Research", "Publications", "Software", "COIN", "Mentoring", "Writing", "About"]:
                errors.append(f"{name}: incorrect primary navigation {labels}")
            if "Software Atlas" in text:
                errors.append(f"{name}: obsolete Software Atlas label")
            canonical = re.search(r'<link rel="canonical" href="([^"]+)"', text)
            if not canonical or not canonical.group(1).startswith(CANONICAL_ROOT):
                errors.append(f"{name}: missing or incorrect canonical URL")
            for property_name in ("og:title", "og:description", "og:url"):
                if f'property="{property_name}"' not in text:
                    errors.append(f"{name}: missing {property_name}")

        for anchor in LEGACY_ANCHORS.get(name, set()):
            if not re.search(rf'\bid="{re.escape(anchor)}"', text):
                errors.append(f"{name}: missing legacy anchor #{anchor}")

    for name in ["profile.json", "site.json", "software.json", "publications.json", "research.json", "writing.json"]:
        with (ROOT / "content" / name).open(encoding="utf-8") as handle:
            json.load(handle)

    publications = json.loads((ROOT / "content/publications.json").read_text(encoding="utf-8"))
    if len(publications) != 140:
        errors.append(f"expected 140 publications, found {len(publications)}")
    software = json.loads((ROOT / "content/software.json").read_text(encoding="utf-8"))
    software_counts = tuple(len(software[key]) for key in ("published", "systems", "development"))
    if software_counts != (18, 6, 1):
        errors.append(f"expected software counts 18/6/1, found {software_counts}")

    research = json.loads((ROOT / "content/research.json").read_text(encoding="utf-8"))
    expected_research_counts = {
        "questions": 5,
        "domains": 6,
        "contribution_forms": 6,
    }
    for field, expected in expected_research_counts.items():
        actual = len(research.get(field, []))
        if actual != expected:
            errors.append(f"expected {expected} research {field}, found {actual}")
    for project in research.get("projects", []):
        for field in ("questions", "domains", "methods", "contribution_forms"):
            if not isinstance(project.get(field), list) or not project[field]:
                errors.append(f"{project.get('title', 'research project')}: missing non-exclusive {field} metadata")
    software_url_fields = (
        "paper_url", "docs_url", "getting_started_url", "github_url",
        "release_url", "registry_url",
    )
    for group in ("published", "systems", "development"):
        for project in software[group]:
            name = project["name"]
            if "links" in project:
                errors.append(f"{name}: legacy generic links array is not allowed")
            urls = {
                field: project[field]
                for field in software_url_fields
                if project.get(field)
            }
            for field, url in urls.items():
                parsed = urlsplit(url)
                if parsed.scheme not in {"https", "http"} or not parsed.netloc:
                    errors.append(f"{name}: {field} is not an absolute URL")
                if "/HEAD/" in parsed.path:
                    errors.append(f"{name}: {field} uses HEAD instead of a stable branch")
                if parsed.path.endswith(".md"):
                    errors.append(f"{name}: {field} exposes a browser-facing .md URL")
                if re.search(r"/(blob|raw)/(main|master|HEAD)/articles/", parsed.path):
                    errors.append(f"{name}: {field} infers a root-level GitHub articles path")
            github_url = project.get("github_url")
            if github_url:
                parsed = urlsplit(github_url)
                if (
                    parsed.netloc.lower() != "github.com"
                    or not re.fullmatch(r"/[^/]+/[^/]+/?", parsed.path)
                    or parsed.query
                    or parsed.fragment
                ):
                    errors.append(f"{name}: github_url must point to a repository root")
            normalized = [
                url.rstrip("/").split("#", 1)[0]
                for url in urls.values()
            ]
            if len(normalized) != len(set(normalized)):
                errors.append(f"{name}: duplicate software actions resolve to the same destination")

    capivara = next(
        project for project in software["published"]
        if project["name"] == "CAPIVARA"
    )
    expected_capivara_urls = {
        "paper_url": "https://doi.org/10.1093/mnras/staf688",
        "docs_url": "https://rafaelsdesouza.com.br/capivara/",
        "getting_started_url": "https://rafaelsdesouza.com.br/capivara/articles/getting-started.html",
        "github_url": "https://github.com/RafaelSdeSouza/capivara",
    }
    for field, expected in expected_capivara_urls.items():
        if capivara.get(field) != expected:
            errors.append(f"CAPIVARA: expected {field}={expected}")
    homepage_marks = [item["name"] for item in software["published"] if item.get("homepage")]
    expected_homepage_marks = {"DRACULA", "SCONCE-SCMS", "CAPIVARA", "SAGUI", "PowerSpectR", "Lightstack"}
    if len(homepage_marks) != 6 or set(homepage_marks) != expected_homepage_marks:
        errors.append(f"expected homepage marks {expected_homepage_marks}, found {homepage_marks}")

    visible_pages = "\n".join((ROOT / name).read_text(encoding="utf-8") for name in PRIMARY_PAGES)
    structured_prose = "\n".join(
        (ROOT / "content" / name).read_text(encoding="utf-8")
        for name in ("site.json", "software.json", "research.json")
    )
    prose_corpus = f"{visible_pages}\n{structured_prose}".lower()
    for phrase in PROSE_RED_FLAGS:
        if phrase in prose_corpus:
            errors.append(f"editorial red flag remains: {phrase!r}")
    if "assets/images/coin.png" in visible_pages:
        errors.append("legacy COIN mark is still displayed")
    if visible_pages.count("assets/images/coin-2024.png") != 3:
        errors.append("current COIN mark should appear on Home, About and COIN")
    about = (ROOT / "about.html").read_text(encoding="utf-8")
    if 'assets/images/rafael-de-souza.jpg' not in about:
        errors.append("About is missing the approved portrait")
    if about.count('class="career-entry"') != 8:
        errors.append("About must contain all eight appointments")
    if "four methodological programmes" in visible_pages.lower():
        errors.append("obsolete four-programme research architecture remains visible")

    if errors:
        raise SystemExit("Site checks failed:\n- " + "\n- ".join(errors))
    print("Site checks passed")
    print(f"pages checked: {len(PAGES)}")
    print("publications: 140")
    print("software: 18 published / 6 systems / 1 in development")


if __name__ == "__main__":
    main()

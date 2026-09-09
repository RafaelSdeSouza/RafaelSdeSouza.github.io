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
            canonical = re.search(r'<link rel="canonical" href="([^"]+)"', text)
            if not canonical or not canonical.group(1).startswith(CANONICAL_ROOT):
                errors.append(f"{name}: missing or incorrect canonical URL")
            for property_name in ("og:title", "og:description", "og:url"):
                if f'property="{property_name}"' not in text:
                    errors.append(f"{name}: missing {property_name}")

        for anchor in LEGACY_ANCHORS.get(name, set()):
            if not re.search(rf'\bid="{re.escape(anchor)}"', text):
                errors.append(f"{name}: missing legacy anchor #{anchor}")

    for name in ["profile.json", "site.json", "software.json", "publications.json", "writing.json"]:
        with (ROOT / "content" / name).open(encoding="utf-8") as handle:
            json.load(handle)

    publications = json.loads((ROOT / "content/publications.json").read_text(encoding="utf-8"))
    if len(publications) != 140:
        errors.append(f"expected 140 publications, found {len(publications)}")
    software = json.loads((ROOT / "content/software.json").read_text(encoding="utf-8"))
    software_counts = tuple(len(software[key]) for key in ("published", "systems", "development"))
    if software_counts != (18, 6, 1):
        errors.append(f"expected software counts 18/6/1, found {software_counts}")
    homepage_marks = [item["name"] for item in software["published"] if item.get("homepage")]
    expected_homepage_marks = {"DRACULA", "SCONCE-SCMS", "CAPIVARA", "SAGUI", "PowerSpectR", "Lightstack"}
    if len(homepage_marks) != 6 or set(homepage_marks) != expected_homepage_marks:
        errors.append(f"expected homepage marks {expected_homepage_marks}, found {homepage_marks}")

    visible_pages = "\n".join((ROOT / name).read_text(encoding="utf-8") for name in PRIMARY_PAGES)
    if "assets/images/coin.png" in visible_pages:
        errors.append("legacy COIN mark is still displayed")
    if visible_pages.count("assets/images/coin-2024.png") != 2:
        errors.append("current COIN mark should appear exactly on Home and Leadership & Community")

    if errors:
        raise SystemExit("Site checks failed:\n- " + "\n- ".join(errors))
    print("Site checks passed")
    print(f"pages checked: {len(PAGES)}")
    print("publications: 140")
    print("software: 18 published / 6 systems / 1 in development")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Render catalogue records into HTML while keeping JSON as the source of truth."""

from __future__ import annotations

import argparse
import html
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def esc(value: object) -> str:
    return html.escape("" if value is None else str(value), quote=True)


def slugify(value: object) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", str(value).lower()).strip("-")
    return slug or "record"


def replace_generated(path: Path, key: str, body: str, *, check: bool) -> None:
    start = f"<!-- generated:{key}:start -->"
    end = f"<!-- generated:{key}:end -->"
    text = path.read_text(encoding="utf-8")
    pattern = re.compile(rf"{re.escape(start)}.*?{re.escape(end)}", re.DOTALL)
    if not pattern.search(text):
        raise SystemExit(f"{path.name}: missing generated block {key}")
    replacement = f"{start}\n{body.rstrip()}\n{end}"
    rendered = pattern.sub(lambda _: replacement, text, count=1)
    if check:
        if rendered != text:
            raise SystemExit(f"{path.name}: generated {key} block is stale; run make update")
        return
    if rendered != text:
        path.write_text(rendered, encoding="utf-8")


def format_venue(record: dict) -> str:
    parts: list[str] = []
    venue = record.get("venue") or record.get("publisher")
    if venue:
        parts.append(str(venue))
    if record.get("volume"):
        parts.append(f"vol. {record['volume']}")
    if record.get("number"):
        parts.append(f"no. {record['number']}")
    if record.get("pages"):
        parts.append(str(record["pages"]))
    elif record.get("eid"):
        parts.append(str(record["eid"]))
    return ", ".join(parts)


def publication_rows(records: list[dict]) -> str:
    rows: list[str] = []
    preferred = ("DOI", "ADS", "arXiv")
    for record in records:
        links = record.get("links") or []
        primary = next(
            (link for label in preferred for link in links if link.get("label") == label),
            links[0] if links else None,
        )
        title = esc(record.get("title"))
        if primary:
            title = f'<a href="{esc(primary.get("url"))}">{title}</a>'
        link_markup = "".join(
            f'<a href="{esc(link.get("url"))}">{esc(link.get("label"))}</a>'
            for link in links
        )
        facets = " ".join(str(item) for item in record.get("facets", []))
        search_parts = [
            record.get("title"), record.get("authors"), record.get("year"),
            record.get("venue"), record.get("publisher"), record.get("volume"),
            record.get("number"), record.get("pages"), record.get("eid"),
            *(link.get("url") for link in links),
        ]
        search = " ".join(str(item) for item in search_parts if item).lower()
        rows.append(
            f'''<article class="catalogue-row grid publication-row" data-id="{esc(record.get('id'))}" data-facets="{esc(facets)}" data-first-author="{str(bool(record.get('firstAuthor'))).lower()}" data-search="{esc(search)}">
  <div class="slot marginal" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:1"><p>{esc(record.get('year'))}</p><p>{esc(record.get('type'))}</p></div>
  <div class="slot" style="--col:3;--span:7;--tcol:2;--tspan:5;--mcol:2;--mspan:3">
    <h2 class="catalogue-title">{title}</h2>
    <p class="catalogue-authors">{esc(record.get('authors'))}</p>
  </div>
  <div class="slot catalogue-meta" style="--col:10;--span:3;--tcol:7;--tspan:2;--mcol:2;--mspan:3">
    <p>{esc(format_venue(record))}</p>
    <nav class="link-line">{link_markup}</nav>
    <details><summary>BibTeX</summary><pre>{esc(record.get('bibtex'))}</pre></details>
  </div>
</article>'''
        )
    return "\n".join(rows)


SOFTWARE_ACTIONS = (
    ("paper_url", "Paper"),
    ("docs_url", "Docs"),
    ("getting_started_url", "Get Started"),
    ("github_url", "GitHub"),
    ("release_url", "Release"),
)


def software_rows(catalogue: dict) -> tuple[str, int]:
    records = [
        *catalogue.get("published", []),
        *catalogue.get("systems", []),
        *catalogue.get("development", []),
    ]
    rows: list[str] = []
    for project in records:
        display = project.get("display_name") or project.get("name")
        actions = [
            (label, project[field])
            for field, label in SOFTWARE_ACTIONS
            if project.get(field)
        ]
        if project.get("registry_url"):
            actions.append((project.get("registry_label") or "Registry", project["registry_url"]))
        primary = next(
            (project.get(field) for field in ("docs_url", "github_url", "paper_url", "release_url", "registry_url") if project.get(field)),
            None,
        )
        heading = esc(display)
        if primary:
            heading = f'<a href="{esc(primary)}">{heading}</a>'
        mark = ""
        if project.get("logo"):
            mark = f'<img class="project-mark" loading="lazy" src="{esc(project["logo"])}" alt="{esc(display)} project mark">'
        action_markup = "".join(f'<a href="{esc(url)}">{esc(label)}</a>' for label, url in actions)
        rows.append(
            f'''<article class="catalogue-row grid software-row" id="{slugify(project.get('name'))}">
  <div class="slot marginal" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:1"><p>{esc(project.get('year') or '—')}</p><p>{esc(project.get('status'))}</p></div>
  <div class="slot project-identity" style="--col:3;--span:3;--tcol:2;--tspan:2;--mcol:2;--mspan:3">
    <h2 class="catalogue-title">{heading}</h2>
    {mark}
  </div>
  <div class="slot project-purpose" style="--col:6;--span:4;--tcol:4;--tspan:3;--mcol:2;--mspan:3"><p>{esc(project.get('purpose'))}</p><p class="project-problem">{esc(project.get('problem'))}</p></div>
  <nav class="slot link-line catalogue-actions" style="--col:10;--span:3;--tcol:7;--tspan:2;--mcol:2;--mspan:3">{action_markup}</nav>
</article>'''
        )
    return "\n".join(rows), len(records)


PEOPLE_GROUPS = (
    ("currentPhd", "Current doctoral researchers", "PhD", "Current"),
    ("currentUndergraduate", "Current undergraduate research", "Undergraduate", "Current"),
    ("formerPhd", "Former doctoral researchers", "PhD", "Former"),
    ("formerMasters", "Former master's researchers", "Master's", "Former"),
    ("formerUndergraduate", "Former undergraduate research", "Undergraduate", "Former"),
)


def mentoring_rows(site: dict) -> tuple[str, int]:
    groups: list[str] = []
    total = 0
    for key, label, degree, status in PEOPLE_GROUPS:
        records = site.get("people", {}).get(key, [])
        if not records:
            continue
        total += len(records)
        rows: list[str] = []
        for person in records:
            details = [degree]
            if person.get("institution"):
                details.append(person["institution"])
            if person.get("outcome"):
                details.append(person["outcome"])
            detail_markup = "".join(f"<p>{esc(item)}</p>" for item in details)
            rows.append(
                f'''<article class="mentor-row grid">
  <div class="slot marginal mentor-date" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:4"><p>{esc(person.get('years'))}</p><p>{esc(status)}</p></div>
  <h3 class="slot mentor-name" style="--col:3;--span:4;--tcol:2;--tspan:3;--mcol:1;--mspan:4">{esc(person.get('name'))}</h3>
  <p class="slot mentor-project" style="--col:7;--span:4;--tcol:5;--tspan:3;--mcol:1;--mspan:4">{esc(person.get('project'))}</p>
  <div class="slot mentor-meta" style="--col:11;--span:2;--tcol:8;--tspan:1;--mcol:1;--mspan:4">{detail_markup}</div>
</article>'''
            )
        groups.append(
            f'''<section class="mentor-group" aria-labelledby="people-{esc(key)}">
  <h2 class="label people-section-label" id="people-{esc(key)}">{esc(label)}</h2>
  {chr(10).join(rows)}
</section>'''
        )
    return "\n".join(groups), total


def teaching_rows(site: dict) -> tuple[str, int]:
    rows: list[str] = []
    for item in site.get("teaching", []):
        rows.append(
            f'''<article class="catalogue-row grid teaching-row">
  <div class="slot marginal" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:1"><p>{esc(item.get('years'))}</p><p>{esc(item.get('term'))}</p></div>
  <h3 class="slot record-name" style="--col:3;--span:5;--tcol:2;--tspan:4;--mcol:2;--mspan:3">{esc(item.get('course'))}</h3>
  <div class="slot record-detail" style="--col:8;--span:3;--tcol:6;--tspan:2;--mcol:2;--mspan:3"><p>{esc(item.get('level'))}</p></div>
  <p class="slot metadata" style="--col:11;--span:2;--tcol:8;--tspan:1;--mcol:2;--mspan:3">{esc(item.get('enrolment'))} students</p>
</article>'''
        )
    return "\n".join(rows), len(rows)


def writing_rows(data: dict) -> tuple[str, int]:
    rows: list[str] = []
    works = [work for work in data.get("works", []) if not work.get("featured")]
    for work in works:
        author_value = work.get("authors", [])
        authors = author_value if isinstance(author_value, str) else " and ".join(author_value)
        meta = " · ".join(str(item) for item in (work.get("type"), work.get("year")) if item)
        essay = work.get("type") == "Essay"
        cover_style = (
            "--col:10;--span:2;--tcol:7;--tspan:2;--mcol:1;--mspan:2"
            if essay else
            "--col:3;--span:2;--tcol:2;--tspan:2;--mcol:1;--mspan:2"
        )
        cover = ""
        if work.get("cover"):
            alt = work.get("cover_alt") or f"Cover of {work.get('title')}"
            cover = f'''<figure class="slot writing-cover" style="{cover_style}"><a href="{esc(work.get('url'))}"><img loading="lazy" src="{esc(work.get('cover'))}" alt="{esc(alt)}"></a></figure>'''
        if work.get("cover"):
            copy_style = (
                "--col:3;--span:6;--tcol:2;--tspan:5;--mcol:1;--mspan:4"
                if essay else
                "--col:6;--span:6;--tcol:4;--tspan:5;--mcol:1;--mspan:4"
            )
        else:
            copy_style = "--col:3;--span:7;--tcol:2;--tspan:6;--mcol:1;--mspan:4"
        excerpt = ""
        if work.get("excerpt"):
            excerpt = f"<p>{esc(work['excerpt']).replace(chr(10), '<br>')}</p>"
        summary = f"<p>{esc(work['summary'])}</p>" if work.get("summary") else ""
        copy = f'''<div class="slot writing-copy" style="{copy_style}"><h2><a href="{esc(work.get('url'))}">{esc(work.get('title'))}</a></h2><p class="writing-authors">{esc(authors)}</p>{excerpt}{summary}<nav class="link-line"><a href="{esc(work.get('url'))}">Read</a></nav></div>'''
        classes = "writing-item writing-object" if cover else "writing-item writing-text"
        if essay:
            classes += " writing-essay"
        objects = copy + cover if essay else cover + copy
        rows.append(
            f'''<article class="{classes} grid"><p class="slot writing-meta" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:4">{esc(meta)}</p>{objects}</article>'''
        )
    return "\n".join(rows), len(works)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="fail if rendered HTML is stale")
    args = parser.parse_args()

    publications = json.loads((ROOT / "content/publications.json").read_text(encoding="utf-8"))
    software = json.loads((ROOT / "content/software.json").read_text(encoding="utf-8"))
    site = json.loads((ROOT / "content/site.json").read_text(encoding="utf-8"))
    writing = json.loads((ROOT / "content/writing.json").read_text(encoding="utf-8"))

    software_markup, software_count = software_rows(software)
    mentoring_markup, mentoring_count = mentoring_rows(site)
    teaching_markup, teaching_count = teaching_rows(site)
    writing_markup, writing_count = writing_rows(writing)

    replace_generated(ROOT / "publications.html", "publications", publication_rows(publications), check=args.check)
    replace_generated(ROOT / "software.html", "software", software_markup, check=args.check)
    replace_generated(ROOT / "people.html", "mentoring", mentoring_markup, check=args.check)
    replace_generated(ROOT / "people.html", "teaching", teaching_markup, check=args.check)
    replace_generated(ROOT / "writing.html", "writing", writing_markup, check=args.check)

    mode = "verified" if args.check else "rendered"
    print(
        f"Static catalogues {mode}: {len(publications)} publications, "
        f"{software_count} software projects, {mentoring_count} mentoring records, "
        f"{teaching_count} teaching records, {writing_count} archive works"
    )


if __name__ == "__main__":
    main()

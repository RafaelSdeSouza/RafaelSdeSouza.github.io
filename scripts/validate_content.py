#!/usr/bin/env python3
"""Validate human-editable content before rendering any public page."""

from __future__ import annotations

import json
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"
RESEARCH_LAYOUTS = {"quiet", "compact", "scientific-plate", "object-left", "figure-inline", "documentary"}
CONTRIBUTION_LAYOUTS = {"quiet", "compact", "scientific-plate", "object-left", "offset", "documentary"}
HOME_LAYOUTS = {"scientific-plate", "object-left"}


class ContentError(ValueError):
    pass


def read_json(name: str, content_dir: Path = CONTENT) -> object:
    path = content_dir / name
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as error:
        raise ContentError(f"content/{name}: file does not exist") from error
    except json.JSONDecodeError as error:
        raise ContentError(
            f"content/{name}:{error.lineno}: invalid JSON — {error.msg}"
        ) from error


def required(record: dict, fields: tuple[str, ...], source: str, label: str) -> None:
    missing = [field for field in fields if record.get(field) in (None, "", [])]
    if missing:
        raise ContentError(f"{source}: {label}: missing {', '.join(missing)}")


def unique_ids(records: list[dict], source: str) -> None:
    seen: set[str] = set()
    for index, record in enumerate(records, 1):
        record_id = record.get("id")
        if not record_id:
            raise ContentError(f"{source}: record {index}: missing id")
        if record_id in seen:
            raise ContentError(f"{source}: duplicate id {record_id!r}")
        seen.add(record_id)


def validate_url(url: object, source: str, label: str) -> None:
    if not isinstance(url, str) or not url.strip():
        raise ContentError(f"{source}: {label}: URL is empty")
    parsed = urlsplit(url)
    if parsed.scheme:
        if parsed.scheme not in {"http", "https", "mailto"}:
            raise ContentError(f"{source}: {label}: unsupported URL scheme {parsed.scheme!r}")
    elif url.startswith("//"):
        raise ContentError(f"{source}: {label}: protocol-relative URLs are not allowed")


def validate_links(record: dict, source: str, label: str) -> None:
    for index, link in enumerate(record.get("links", []), 1):
        required(link, ("label", "url"), source, f"{label} link {index}")
        validate_url(link["url"], source, f"{label} link {link['label']!r}")


def validate_asset(path: object, source: str, label: str) -> None:
    if path in (None, ""):
        return
    target = ROOT / str(path)
    if not target.is_file():
        raise ContentError(f"{source}: {label}: asset does not exist: {path}")


def validate_layout(record: dict, allowed: set[str], source: str) -> None:
    layout = record.get("layout")
    if layout not in allowed:
        choices = ", ".join(sorted(allowed))
        raise ContentError(
            f"{source}: {record.get('id') or record.get('title')}: unknown layout {layout!r}; "
            f"allowed: {choices}"
        )


def validate_research(data: dict) -> None:
    source = "content/research.json"
    if not isinstance(data.get("opening"), list) or not data["opening"]:
        raise ContentError(f"{source}: opening must contain at least one paragraph")
    questions = data.get("current_questions", [])
    unique_ids(questions, source)
    for item in questions:
        required(item, ("title", "status", "body"), source, item["id"])
    entries = [*data.get("current_work", []), *data.get("trajectory", [])]
    unique_ids(entries, source)
    for item in entries:
        required(item, ("title", "body", "layout"), source, item["id"])
        validate_layout(item, RESEARCH_LAYOUTS, source)
        validate_links(item, source, item["id"])
        figure = item.get("figure")
        if figure:
            required(figure, ("src", "alt"), source, f"{item['id']} figure")
            validate_asset(figure["src"], source, f"{item['id']} figure")
            if figure.get("href"):
                validate_url(figure["href"], source, f"{item['id']} figure link")
            if figure.get("caption_link"):
                validate_links({"links": [figure["caption_link"]]}, source, f"{item['id']} caption")
    if len(data.get("domains", [])) != 6:
        raise ContentError(f"{source}: expected 6 Across astronomy entries")


def validate_all(content_dir: Path = CONTENT) -> dict[str, int]:
    home = read_json("home.json", content_dir)
    research = read_json("research.json", content_dir)
    about = read_json("about.json", content_dir)
    people = read_json("people.json", content_dir)
    writing = read_json("writing.json", content_dir)
    coin = read_json("coin.json", content_dir)
    contributions = read_json("contributions.json", content_dir)
    software = read_json("software.json", content_dir)
    publications = read_json("publications.json", content_dir)
    site = read_json("site.json", content_dir)
    profile = read_json("profile.json", content_dir)

    validate_research(research)

    for item in home.get("research_objects", []):
        validate_layout(item, HOME_LAYOUTS, "content/home.json")
        validate_asset(item.get("figure", {}).get("src"), "content/home.json", item.get("id", "figure"))
    validate_asset(home.get("identity", {}).get("art", {}).get("src"), "content/home.json", "home artwork")

    appointments = about.get("appointments", [])
    if len(appointments) != 8:
        raise ContentError(f"content/about.json: expected 8 appointments, found {len(appointments)}")
    for item in appointments:
        required(item, ("start", "role", "appointment_type", "institution", "country", "url"), "content/about.json", item.get("institution", "appointment"))
        if item["appointment_type"] not in {"salaried", "visiting", "adjunct", "research"}:
            raise ContentError(f"content/about.json: {item['institution']}: unknown appointment_type {item['appointment_type']!r}")
        validate_url(item["url"], "content/about.json", item["institution"])
    validate_asset(about.get("opening", {}).get("portrait"), "content/about.json", "portrait")

    mentoring = [record for group in people.get("groups", []) for record in group.get("records", [])]
    if len(mentoring) != 15:
        raise ContentError(f"content/people.json: expected 15 mentoring records, found {len(mentoring)}")
    for person in mentoring:
        required(person, ("name", "degree", "status", "project"), "content/people.json", person.get("name", "record"))
        if not person.get("years") and person.get("start") in (None, ""):
            raise ContentError(f"content/people.json: {person['name']}: missing years or start")
        if person.get("url"):
            validate_url(person["url"], "content/people.json", person["name"])

    works = writing.get("works", [])
    if len(works) != 4:
        raise ContentError(f"content/writing.json: expected 4 works, found {len(works)}")
    unique_ids(works, "content/writing.json")
    for work in works:
        required(work, ("id", "type", "title", "authors", "url"), "content/writing.json", work.get("id", "record"))
        validate_url(work["url"], "content/writing.json", work["id"])
        validate_asset(work.get("cover"), "content/writing.json", f"{work['id']} cover")

    if len(coin.get("residences", [])) != 3:
        raise ContentError("content/coin.json: expected 3 residence records")
    for residence in coin["residences"]:
        required(residence, ("number", "city", "country", "year", "summary"), "content/coin.json", str(residence.get("number", "residence")))
    validate_asset(coin.get("mark"), "content/coin.json", "COIN mark")

    items = contributions.get("items", [])
    for item in items:
        validate_layout(item, CONTRIBUTION_LAYOUTS, "content/contributions.json")
        required(item, ("year", "title", "body", "links"), "content/contributions.json", item.get("title", "contribution"))
        validate_links(item, "content/contributions.json", item["title"])
        if item.get("figure"):
            validate_asset(item["figure"].get("src"), "content/contributions.json", item["title"])

    projects = [project for group in ("published", "systems", "development") for project in software.get(group, [])]
    if len(projects) != 25:
        raise ContentError(f"content/software.json: expected 25 projects, found {len(projects)}")
    for project in projects:
        required(project, ("name", "purpose", "problem", "status"), "content/software.json", project.get("name", "project"))
        if project.get("year") not in (None, ""):
            try:
                int(project["year"])
            except (TypeError, ValueError) as error:
                raise ContentError(
                    f"content/software.json: {project['name']}: year must be a four-digit number"
                ) from error
        validate_asset(project.get("logo"), "content/software.json", f"{project['name']} logo")

    if len(publications) != 140:
        raise ContentError(f"content/publications.json: expected 140 works, found {len(publications)}")

    nav_labels = [item.get("label") for item in site.get("navigation", [])]
    expected_nav = ["Research", "Publications", "Software", "COIN", "Mentoring", "Writing", "About"]
    if nav_labels != expected_nav:
        raise ContentError(f"content/site.json: primary navigation must be {expected_nav}")
    for item in site["navigation"]:
        validate_url(item["url"], "content/site.json", item["label"])
    if not profile.get("links"):
        raise ContentError("content/profile.json: profile links are missing")

    return {
        "publications": len(publications),
        "software": len(projects),
        "writing": len(works),
        "appointments": len(appointments),
        "mentoring": len(mentoring),
    }


def main() -> None:
    try:
        counts = validate_all()
    except ContentError as error:
        raise SystemExit(str(error)) from error
    print(
        "Content passed: "
        + ", ".join(f"{label} {count}" for label, count in counts.items())
    )


if __name__ == "__main__":
    main()

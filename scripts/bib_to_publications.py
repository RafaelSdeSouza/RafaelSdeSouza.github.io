#!/usr/bin/env python3
"""Generate the website publication index from the canonical BibTeX source."""

from __future__ import annotations

import json
import re
import sys
import unicodedata
from pathlib import Path


TYPE_MAP = {
    "article": "paper",
    "inproceedings": "proceeding",
    "bookchapter": "chapter",
    "incatalogues": "catalogue",
    "book": "book",
    "software": "software",
    "tns": "report",
}

ACCENTS = {
    "'": "\u0301",
    "`": "\u0300",
    '"': "\u0308",
    "^": "\u0302",
    "~": "\u0303",
    "=": "\u0304",
    ".": "\u0307",
    "u": "\u0306",
    "v": "\u030c",
    "H": "\u030b",
    "c": "\u0327",
}

SIMPLE_COMMANDS = {
    r"\&": "&",
    r"\_": "_",
    r"\%": "%",
    r"\$": "$",
    r"\#": "#",
    r"\i": "i",
    r"\j": "j",
    r"\o": "ø",
    r"\O": "Ø",
    r"\aa": "å",
    r"\AA": "Å",
    r"\ae": "æ",
    r"\AE": "Æ",
    r"\ss": "ß",
    r"\l": "ł",
    r"\L": "Ł",
    r"\sim": "∼",
    r"\gamma": "γ",
}

JOURNAL_COMMANDS = {
    r"\mnras": "Monthly Notices of the Royal Astronomical Society",
    r"\aap": "Astronomy & Astrophysics",
    r"\prc": "Physical Review C",
    r"\prd": "Physical Review D",
    r"\aj": "The Astronomical Journal",
    r"\apj": "The Astrophysical Journal",
    r"\apjs": "The Astrophysical Journal Supplement Series",
    r"\apss": "Astrophysics and Space Science",
    r"\jcap": "Journal of Cosmology and Astroparticle Physics",
}

SUPERSCRIPTS = str.maketrans("0123456789+-", "⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻")
MONTHS = {
    "jan": 1, "feb": 2, "mar": 3, "apr": 4, "may": 5, "jun": 6,
    "jul": 7, "aug": 8, "sep": 9, "oct": 10, "nov": 11, "dec": 12,
}


def split_entries(text: str) -> list[tuple[str, str, str, str]]:
    """Return type, key, body, and raw BibTeX for each balanced entry."""
    entries: list[tuple[str, str, str, str]] = []
    index = 0
    while index < len(text):
        if text[index] != "@":
            index += 1
            continue

        match = re.match(r"@([A-Za-z]+)\s*\{\s*([^,]+),", text[index:])
        if not match:
            index += 1
            continue

        entry_type = match.group(1).lower()
        key = match.group(2).strip()
        body_start = index + match.end()
        depth = 1
        cursor = body_start
        while cursor < len(text) and depth:
            if text[cursor] == "{":
                depth += 1
            elif text[cursor] == "}":
                depth -= 1
            cursor += 1

        raw = text[index:cursor].strip()
        entries.append((entry_type, key, text[body_start : cursor - 1], raw))
        index = cursor
    return entries


def split_fields(body: str) -> dict[str, str]:
    fields: dict[str, str] = {}
    index = 0
    while index < len(body):
        while index < len(body) and body[index] in " \n\r\t,":
            index += 1

        name_match = re.match(r"([A-Za-z][A-Za-z0-9_-]*)\s*=", body[index:])
        if not name_match:
            index += 1
            continue

        name = name_match.group(1).lower()
        index += name_match.end()
        while index < len(body) and body[index].isspace():
            index += 1

        if index >= len(body):
            break

        if body[index] == "{":
            index += 1
            start = index
            depth = 1
            while index < len(body) and depth:
                if body[index] == "{":
                    depth += 1
                elif body[index] == "}":
                    depth -= 1
                index += 1
            value = body[start : index - 1]
        elif body[index] == '"':
            index += 1
            start = index
            depth = 0
            while index < len(body):
                if body[index] == "{" and (index == 0 or body[index - 1] != "\\"):
                    depth += 1
                elif body[index] == "}" and depth:
                    depth -= 1
                elif body[index] == '"' and depth == 0 and body[index - 1] != "\\":
                    break
                index += 1
            value = body[start:index]
            index += 1
        else:
            start = index
            while index < len(body) and body[index] != ",":
                index += 1
            value = body[start:index]

        fields[name] = value.strip()
    return fields


def _accent(match: re.Match[str]) -> str:
    command = match.group(1)
    letter = match.group(2)
    if letter in {r"\i", r"\j"}:
        letter = letter[1:]
    return unicodedata.normalize("NFC", letter + ACCENTS[command])


def clean_latex(value: str) -> str:
    value = value.replace("--", "–")
    value = value.replace("``", '“').replace("''", '”')
    value = re.sub(r"\$\^\{([^{}]+)\}\$", lambda match: match.group(1).translate(SUPERSCRIPTS), value)
    value = re.sub(r"\$\^([^$])\$", lambda match: match.group(1).translate(SUPERSCRIPTS), value)
    value = re.sub(r"\^\{([^{}]+)\}", lambda match: match.group(1).translate(SUPERSCRIPTS), value)
    value = re.sub(r"\\(?:textbf|textit|emph|mathrm|textrm|textsf)\s*\{([^{}]*)\}", r"\1", value)

    accent_pattern = r"\{?\\(['`\"\^~=\.uvHc])\s*\{?(\\[ij]|[A-Za-z])\}?\}?"
    previous = None
    while previous != value:
        previous = value
        value = re.sub(accent_pattern, _accent, value)

    for old, new in JOURNAL_COMMANDS.items():
        value = value.replace(old, new)
    for old, new in SIMPLE_COMMANDS.items():
        value = value.replace(old, new)

    value = re.sub(r"(?<!\\)~", " ", value)
    value = value.replace("$", "")
    value = re.sub(r"\\(?:,|;|!|quad|qquad)\s*", " ", value)
    value = re.sub(r"\\[A-Za-z]+\*?\s*", "", value)
    value = value.replace("{", "").replace("}", "")
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def clean_url(value: str) -> str:
    return value.strip().replace(" ", "")


def links_for(fields: dict[str, str]) -> list[dict[str, str]]:
    links: list[dict[str, str]] = []

    def add(label: str, url: str) -> None:
        url = clean_url(url)
        if url and all(item["url"] != url for item in links):
            links.append({"label": label, "url": url})

    doi = clean_latex(fields.get("doi", "")).replace("https://doi.org/", "")
    if doi:
        add("DOI", f"https://doi.org/{doi}")
    if fields.get("adsurl"):
        add("ADS", clean_latex(fields["adsurl"]))

    archive_prefix = clean_latex(fields.get("archiveprefix", "")).lower()
    eprint = clean_latex(fields.get("eprint", ""))
    if eprint and archive_prefix == "arxiv":
        add("arXiv", f"https://arxiv.org/abs/{eprint}")

    for field, label in (
        ("repository", "Repository"),
        ("documentation", "Documentation"),
        ("archive", "Archive"),
    ):
        if fields.get(field):
            add(label, clean_latex(fields[field]))

    if fields.get("url"):
        add("URL", clean_latex(fields["url"]))
    return links


def record_facets(entry_type: str, fields: dict[str, str]) -> list[str]:
    base = TYPE_MAP.get(entry_type, entry_type)
    journal = clean_latex(fields.get("journal", "")).lower()
    facets = ["preprint" if base == "paper" and "arxiv" in journal else base]
    keywords = [clean_latex(item).lower() for item in fields.get("keywords", "").split(",")]
    for keyword in keywords:
        if keyword == "paper" and base == "paper" and "arxiv" in journal:
            continue
        if keyword in {"paper", "preprint", "software", "report", "proceeding", "chapter", "book", "catalogue"}:
            if keyword not in facets:
                facets.append(keyword)
    return facets


def publication_from(entry_type: str, key: str, fields: dict[str, str], raw: str) -> dict[str, object]:
    year_text = clean_latex(fields.get("year", "0"))
    year_match = re.search(r"\d{4}", year_text)
    year: int | str = int(year_match.group(0)) if year_match else year_text
    month_text = clean_latex(fields.get("month", "")).lower()[:3]
    authors = clean_latex(fields.get("author", ""))
    first_author = authors.split(" and ", 1)[0].strip().lower()
    is_first_author = first_author.startswith("de souza") or first_author.startswith("souza, r")

    return {
        "id": key,
        "year": year,
        "month": MONTHS.get(month_text, 0),
        "type": TYPE_MAP.get(entry_type, entry_type),
        "facets": record_facets(entry_type, fields),
        "bibtexType": entry_type,
        "title": clean_latex(fields.get("title", key)),
        "authors": authors,
        "venue": clean_latex(
            fields.get("journal")
            or fields.get("booktitle")
            or fields.get("howpublished")
            or fields.get("publisher")
            or ""
        ),
        "publisher": clean_latex(fields.get("publisher", "")),
        "volume": clean_latex(fields.get("volume", "")),
        "number": clean_latex(fields.get("number", "")),
        "pages": clean_latex(fields.get("pages", "")),
        "eid": clean_latex(fields.get("eid", "")),
        "isbn": clean_latex(fields.get("isbn", "")),
        "firstAuthor": is_first_author,
        "links": links_for(fields),
        "bibtex": raw,
    }


def build_publications(source: Path) -> list[dict[str, object]]:
    publications = [
        publication_from(entry_type, key, split_fields(body), raw)
        for entry_type, key, body, raw in split_entries(source.read_text(encoding="utf-8", errors="replace"))
    ]
    publications.sort(
        key=lambda item: (
            int(item["year"]) if str(item["year"]).isdigit() else 0,
            int(item["month"]),
            str(item["title"]).lower(),
        ),
        reverse=True,
    )
    return publications


def main() -> int:
    if len(sys.argv) != 3:
        print("Usage: bib_to_publications.py INPUT.bib OUTPUT.json", file=sys.stderr)
        return 2

    source = Path(sys.argv[1])
    target = Path(sys.argv[2])
    publications = build_publications(source)
    target.write_text(json.dumps(publications, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {len(publications)} publications to {target}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

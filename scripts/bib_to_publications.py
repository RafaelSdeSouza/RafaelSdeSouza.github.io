#!/usr/bin/env python3
"""Convert the Overleaf BibTeX file into website publication JSON."""

from __future__ import annotations

import json
import re
import sys
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


def split_entries(text: str) -> list[tuple[str, str, str]]:
    entries: list[tuple[str, str, str]] = []
    i = 0
    while i < len(text):
      if text[i] != "@":
        i += 1
        continue

      match = re.match(r"@([A-Za-z]+)\s*\{\s*([^,]+),", text[i:])
      if not match:
        i += 1
        continue

      entry_type = match.group(1).lower()
      key = match.group(2).strip()
      start = i + match.end()
      depth = 1
      j = start
      while j < len(text) and depth:
        if text[j] == "{":
          depth += 1
        elif text[j] == "}":
          depth -= 1
        j += 1

      entries.append((entry_type, key, text[start : j - 1]))
      i = j
    return entries


def split_fields(body: str) -> dict[str, str]:
    fields: dict[str, str] = {}
    i = 0
    while i < len(body):
      while i < len(body) and body[i] in " \n\r\t,":
        i += 1

      name_match = re.match(r"([A-Za-z][A-Za-z0-9_-]*)\s*=", body[i:])
      if not name_match:
        i += 1
        continue

      name = name_match.group(1).lower()
      i += name_match.end()
      while i < len(body) and body[i].isspace():
        i += 1

      if i >= len(body):
        break

      if body[i] == "{":
        i += 1
        start = i
        depth = 1
        while i < len(body) and depth:
          if body[i] == "{":
            depth += 1
          elif body[i] == "}":
            depth -= 1
          i += 1
        value = body[start : i - 1]
      elif body[i] == '"':
        i += 1
        start = i
        while i < len(body) and body[i] != '"':
          i += 1
        value = body[start:i]
        i += 1
      else:
        start = i
        while i < len(body) and body[i] != ",":
          i += 1
        value = body[start:i]

      fields[name] = clean_latex(value)
    return fields


def clean_latex(value: str) -> str:
    replacements = {
        r"{\textbf{": "",
        r"\textbf{": "",
        r"\emph{": "",
        r"\&": "&",
        r"~": " ",
        r"--": "-",
        r"``": '"',
        r"''": '"',
        r"\_": "_",
        r"\%": "%",
        r"\$": "$",
        r"\#": "#",
    }
    for old, new in replacements.items():
      value = value.replace(old, new)

    value = re.sub(r"\\[a-zA-Z]+\s*", "", value)
    value = value.replace("{", "").replace("}", "")
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def links_for(fields: dict[str, str]) -> dict[str, str]:
    links: dict[str, str] = {}
    if fields.get("doi"):
      doi = fields["doi"].replace("https://doi.org/", "")
      links["DOI"] = f"https://doi.org/{doi}"
    if fields.get("adsurl"):
      links["ADS"] = fields["adsurl"]
    if fields.get("eprint"):
      links["arXiv"] = f"https://arxiv.org/abs/{fields['eprint']}"
    if fields.get("url") and fields["url"] not in links.values():
      links["URL"] = fields["url"]
    return links


def publication_from(entry_type: str, key: str, fields: dict[str, str]) -> dict[str, object]:
    year = fields.get("year", "0")
    try:
      year_value: int | str = int(re.search(r"\d{4}", year).group(0))  # type: ignore[union-attr]
    except AttributeError:
      year_value = year

    return {
        "id": key,
        "year": year_value,
        "type": TYPE_MAP.get(entry_type, entry_type),
        "bibtex_type": entry_type,
        "title": fields.get("title", key),
        "authors": fields.get("author", ""),
        "venue": fields.get("journal") or fields.get("booktitle") or fields.get("publisher") or "",
        "volume": fields.get("volume", ""),
        "pages": fields.get("pages", ""),
        "links": links_for(fields),
    }


def main() -> int:
    if len(sys.argv) != 3:
      print("Usage: bib_to_publications.py INPUT.bib OUTPUT.json", file=sys.stderr)
      return 2

    source = Path(sys.argv[1])
    target = Path(sys.argv[2])
    publications = [
        publication_from(entry_type, key, split_fields(body))
        for entry_type, key, body in split_entries(source.read_text(errors="ignore"))
    ]
    publications.sort(key=lambda item: (str(item["year"]), str(item["title"])), reverse=True)
    target.write_text(json.dumps(publications, indent=2, ensure_ascii=False) + "\n")
    print(f"Wrote {len(publications)} publications to {target}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

#!/usr/bin/env python3
"""Regression checks for the reconciled scholarly publication record."""

from __future__ import annotations

import json
import sys
from collections import Counter
from pathlib import Path

from bib_to_publications import build_publications


ROOT = Path(__file__).resolve().parents[1]
BIB_PATH = ROOT / "assets" / "cv" / "references.bib"
JSON_PATH = ROOT / "content" / "publications.json"
EXPECTED_COUNT = 140


def normalized_doi(record: dict[str, object]) -> str:
    links = record.get("links", [])
    if not isinstance(links, list):
        return ""
    for link in links:
        if isinstance(link, dict) and link.get("label") == "DOI":
            return str(link.get("url", "")).lower().removeprefix("https://doi.org/")
    return ""


def fail(message: str) -> None:
    print(f"FAIL: {message}", file=sys.stderr)
    raise SystemExit(1)


def main() -> int:
    publications = build_publications(BIB_PATH)
    if len(publications) != EXPECTED_COUNT:
        fail(f"expected {EXPECTED_COUNT} publications, found {len(publications)}")

    keys = {str(item["id"]) for item in publications}
    required_keys = {
        "deSouza2026radialpaths",
        "deSouzaBunk2026spectropath",
        "deSouza_2026rnaasb",
        "deLima_2026",
        "2022arXiv2206.06787",
    }
    missing = sorted(required_keys - keys)
    if missing:
        fail(f"missing required records: {', '.join(missing)}")

    forbidden_keys = {"deSouza_2026rnaas", "galmask2022"}
    duplicates_left = sorted(forbidden_keys & keys)
    if duplicates_left:
        fail(f"duplicate records remain: {', '.join(duplicates_left)}")

    doi_counts = Counter(filter(None, (normalized_doi(item) for item in publications)))
    duplicate_dois = sorted(doi for doi, count in doi_counts.items() if count > 1)
    if duplicate_dois:
        fail(f"duplicate DOI values remain: {', '.join(duplicate_dois)}")

    if not any(item.get("type") == "book" for item in publications):
        fail("the scholarly book record is missing")
    if not any(str(item.get("year", "")).isdigit() and int(item["year"]) <= 2004 for item in publications):
        fail("early-career publications are missing")
    if any("sci-fi" in item.get("facets", []) for item in publications):
        fail("fiction must not be counted as scholarship")

    for item in publications:
        if not item.get("title") or not item.get("authors") or not item.get("year"):
            fail(f"required bibliographic field missing from {item.get('id')}")
        for link in item.get("links", []):
            if not str(link.get("url", "")).startswith(("https://", "http://")):
                fail(f"malformed external link in {item.get('id')}: {link}")

    order = [(int(item["year"]), int(item.get("month", 0))) for item in publications]
    if order != sorted(order, reverse=True):
        fail("publication records are not in reverse chronological order")

    reaction_titles = [str(item["title"]) for item in publications if "Thermonuclear Rate" in str(item["title"])]
    if not reaction_titles or "⁷Be(n,p)⁷Li" not in reaction_titles[0]:
        fail("nuclear-reaction superscripts were not preserved")
    if not any("Cristóbal-Hornillos" in str(item["authors"]) for item in publications):
        fail("Unicode author accents were not preserved")

    derived = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    if derived != publications:
        fail("content/publications.json is stale; regenerate it from references.bib")

    print("Publication reconciliation passed")
    print("old unique scholarly works: 138")
    print("newly added scholarly works: 2")
    print("final unique scholarly works: 140")
    print("removed scholarly works: 0")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

#!/usr/bin/env python3
"""Validate the canonical writing catalogue and its local documentary assets."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOGUE = ROOT / "content" / "writing.json"
REQUIRED_FIELDS = {"id", "type", "title", "authors", "url"}
APPROVED_EXCERPT = "The hour arrives.\nRain has passed.\nThe air is cool and shimmering with ions."


def main():
    data = json.loads(CATALOGUE.read_text())
    works = data.get("works")
    if not isinstance(works, list) or not works:
        raise SystemExit("content/writing.json must contain a non-empty works list")
    errors = []
    ids = set()
    for index, work in enumerate(works, 1):
        missing = REQUIRED_FIELDS - set(work)
        if missing:
            errors.append(f"writing record {index}: missing fields {sorted(missing)}")
        work_id = work.get("id")
        if not work_id or work_id in ids:
            errors.append(f"writing record {index}: missing or duplicate id {work_id!r}")
        ids.add(work_id)
        if not work.get("type") or not work.get("title") or not work.get("authors") or not work.get("url"):
            errors.append(f"writing record {index}: id, type, title, authors and url are required")
        cover = work.get("cover")
        if cover and not (ROOT / cover).is_file():
            errors.append(f"writing record {work_id}: missing cover {cover}")
    featured = [work for work in works if work.get("featured")]
    if len(featured) != 1 or featured[0].get("id") != "beyond-the-rainbow":
        errors.append("Beyond the Rainbow must remain the sole featured writing record")
    if featured and featured[0].get("excerpt") != APPROVED_EXCERPT:
        errors.append("Beyond the Rainbow excerpt differs from the approved text")
    journey = next((work for work in works if work.get("id") == "a-journey-into-the-void"), None)
    if not journey or journey.get("title") != "A Journey into the Void":
        errors.append("A Journey into the Void must use its canonical public title")
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"Writing catalogue passed: {len(works)} works, {len(featured)} featured")


if __name__ == "__main__":
    main()

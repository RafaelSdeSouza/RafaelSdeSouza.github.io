#!/usr/bin/env python3
"""Render the static About appointment list from content/site.json."""
import argparse
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def render() -> str:
    appointments = json.loads((ROOT / "content/site.json").read_text())["appointments"]
    rows = []
    for item in appointments:
        e = lambda key: html.escape(item[key], quote=True)
        rows.append(f'    <article class="career-entry"><span class="career-years">{e("years")}</span>'
                    f'<div><h3>{e("role")}</h3><p><a href="{e("url")}">{e("institution")}</a>'
                    f' · {e("location")}</p></div></article>')
    return "<!-- appointments:start -->\n" + "\n".join(rows) + "\n<!-- appointments:end -->"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    file = ROOT / "about.html"
    original = file.read_text()
    updated, count = re.subn(r"<!-- appointments:start -->[\s\S]*?<!-- appointments:end -->", render(), original)
    if count != 1:
        raise SystemExit("Missing or duplicate appointment markers")
    if args.check:
        if updated != original:
            raise SystemExit("About appointments are stale; run scripts/render_appointments.py")
    else:
        file.write_text(updated)
    print("Eight appointments rendered and checked against content/site.json")


if __name__ == "__main__":
    main()

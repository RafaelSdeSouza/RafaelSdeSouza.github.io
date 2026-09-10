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
        rows.append(
            '<article class="archive-record grid appointment">'
            f'<p class="year slot" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:1">{e("years")}</p>'
            f'<h3 class="record-name slot" style="--col:3;--span:4;--tcol:2;--tspan:3;--mcol:2;--mspan:3"><a href="{e("url")}">{e("institution")}</a></h3>'
            f'<div class="record-detail slot" style="--col:7;--span:4;--tcol:5;--tspan:3;--mcol:2;--mspan:3"><p>{e("role")}</p></div>'
            f'<p class="country slot" style="--col:11;--span:2;--tcol:8;--tspan:1;--mcol:2;--mspan:3">{e("location")}</p>'
            '</article>'
        )
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

#!/usr/bin/env python3
"""Run the complete, dependency-free website update workflow."""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

from public_site import config_text


ROOT = Path(__file__).resolve().parents[1]
PYTHON = sys.executable


def run(*args: str) -> None:
    result = subprocess.run([PYTHON, *args], cwd=ROOT, check=False)
    if result.returncode:
        raise SystemExit(result.returncode)


def main() -> None:
    run("scripts/bib_to_publications.py", "assets/cv/references.bib", "content/publications.json")
    run("scripts/validate_content.py")
    run("scripts/render_static_content.py")
    (ROOT / "_config.yml").write_text(config_text(), encoding="utf-8")
    run("-m", "unittest", "discover", "-s", "scripts", "-p", "test_*.py")
    run("scripts/build_site.py")

    about = json.loads((ROOT / "content/about.json").read_text(encoding="utf-8"))
    writing = json.loads((ROOT / "content/writing.json").read_text(encoding="utf-8"))
    software = json.loads((ROOT / "content/software.json").read_text(encoding="utf-8"))
    publications = json.loads((ROOT / "content/publications.json").read_text(encoding="utf-8"))
    software_count = sum(len(software[group]) for group in ("published", "systems", "development"))
    print("\nUpdate complete")
    print(f"Publications: {len(publications)}")
    print(f"Software: {software_count}")
    print(f"Writing: {len(writing['works'])}")
    print(f"Appointments: {len(about['appointments'])}")
    print("Build: passed")


if __name__ == "__main__":
    main()

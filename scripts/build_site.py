#!/usr/bin/env python3
"""Validate and assemble only the files intended for GitHub Pages."""
import argparse
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
from lint_public_copy import lint_tree
from public_site import ROOT, config_text, public_files


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path)
    parser.add_argument("--write-config", action="store_true")
    args = parser.parse_args()
    config = ROOT / "_config.yml"
    if args.write_config:
        config.write_text(config_text())
    if not config.exists() or config.read_text() != config_text():
        raise SystemExit("Pages exclusions are stale; run scripts/build_site.py --write-config")
    if (ROOT / ".nojekyll").exists():
        raise SystemExit(".nojekyll bypasses Pages exclusions and must not exist")
    for script in ("render_appointments.py", "check_publications.py", "check_site.py"):
        command = [sys.executable, str(ROOT / "scripts" / script)]
        if script == "render_appointments.py":
            command.append("--check")
        subprocess.run(command, check=True)
    errors, _ = lint_tree()
    if errors:
        raise SystemExit("\n".join(errors))
    output = args.output.resolve() if args.output else Path(tempfile.mkdtemp(prefix="rafael-public-"))
    if output.exists() and any(output.iterdir()):
        raise SystemExit("Output must be empty; existing files will not be overwritten")
    for name in public_files():
        destination = output / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(ROOT / name, destination)
    errors, _ = lint_tree(output)
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"Public build passed: {len(public_files())} files\n{output}")


if __name__ == "__main__":
    main()

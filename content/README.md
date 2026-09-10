# Canonical content

These files are the editable sources for the public website. The root-level HTML
files are generated output; do not edit sections marked `generated:*`.

- `home.json` — Home identity, selected objects and closing links
- `research.json` — Research opening, current questions and trajectory
- `contributions.json` — Selected Contributions
- `about.json` — portrait, appointments, education, recognition and leadership
- `people.json` — mentoring and teaching records
- `writing.json` — featured work and Writing archive
- `coin.json` — COIN history, residences and selected projects
- `software.json` — all 25 software records
- `site.json` — global navigation and footer
- `profile.json` — identity and scholarly profile links
- `publications.json` — generated from `assets/cv/references.bib`; never edit directly

JSON is used rather than YAML so the update command depends only on Python's
standard library. See `EDITING.md` for copyable recipes.

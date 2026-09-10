# Updating Rafael's website

Edit a file in `content/`, add an optional authentic asset, then run:

```sh
make update
```

The command validates the records, regenerates static HTML, runs the tests and
builds the public site. If a record is malformed, it reports the source file and
record name. Do not edit generated regions in the root-level HTML files.

## Add a publication

1. Paste the complete BibTeX record into `assets/cv/references.bib`.
2. Run `make update`.
3. Open `publications.html` and search for the title.

`assets/cv/references.bib` is the sole bibliography source.

## Add a Writing work

1. Add one object to `content/writing.json`:

```json
{
  "id": "story-slug",
  "type": "Science fiction",
  "title": "Story title",
  "authors": ["Rafael S. de Souza"],
  "year": 2027,
  "url": "https://example.org/story",
  "cover": "assets/images/writing/story-cover.jpg",
  "excerpt": null,
  "summary": null,
  "citation": null,
  "featured": false
}
```

2. If an authentic cover exists, copy it to `assets/images/writing/` and set
   `cover`; otherwise omit `cover` or use `null`.
3. Use `excerpt` only for exact, approved text.
4. Run `make update`.

## Add software

Add one object to the appropriate list in `content/software.json`. Required
meaning fields are `name`, `purpose`, `problem` and `status`. Add `year` when
known. Optional actions are independent:

```json
{
  "name": "PackageName",
  "year": 2027,
  "purpose": "What the software computes.",
  "problem": "The scientific problem it addresses.",
  "status": "Published and released",
  "logo": "assets/images/software/package-logo.png",
  "paper_url": "https://doi.org/...",
  "docs_url": "https://...",
  "getting_started_url": "https://...",
  "github_url": "https://github.com/owner/repository",
  "release_url": "https://..."
}
```

Omit `logo` when no authentic mark exists. The page sorts dated records in
reverse chronological order and places undated records afterward.

## Add Research

Add a record to `current_work` or `trajectory` in `content/research.json`.
Choose one approved semantic composition:

```json
{
  "id": "short-slug",
  "layout": "quiet",
  "metadata": "2027",
  "title": "Scientific title",
  "body": ["Scientific paragraph."],
  "links": [{"label": "Paper", "url": "https://doi.org/..."}]
}
```

Allowed layouts are `quiet`, `compact`, `scientific-plate`, `object-left`,
`figure-inline` and `documentary`. For an object-led layout, add `figure` with
`src`, `alt` and an optional factual `caption`. The renderer owns the grid.

## Add an appointment

Add one object to `appointments` in `content/about.json`:

```json
{
  "start": 2027,
  "end": null,
  "role": "Visiting Professor",
  "appointment_type": "visiting",
  "institution": "Institution",
  "country": "Country",
  "url": "https://institution.example/"
}
```

Use `salaried`, `visiting`, `adjunct` or `research` for `appointment_type`.

## Add mentoring or teaching

Add a person to the appropriate `records` list in `content/people.json`.
Required fields are `name`, `degree`, `status`, `project`, and either `start` or
an explicit `years` label; `end`, `url`, `institution` and `outcome` are optional.
Teaching records live in `teaching`.

## Add a COIN residence or project

Edit `content/coin.json`. A residence uses `number`, `city`, `country`, `year`,
`summary`, optional `url`, and optional `outputs`. No grid settings are needed.

## Replace an asset safely

Keep the existing filename and aspect ratio when replacing an approved asset.
Use only authentic artwork, figures, covers and project marks. Then run
`make update`; missing files and broken local references fail validation.

## Inspect and publish

```sh
python3 -m http.server 8000
git status --short
git diff --check
git add content assets index.html research.html about.html people.html writing.html coin.html contributions.html publications.html software.html
git commit -m "Update website content"
git push origin main
```

Open `http://127.0.0.1:8000/` before committing. Add only the files shown by
`git status`; do not copy temporary screenshots into the repository.

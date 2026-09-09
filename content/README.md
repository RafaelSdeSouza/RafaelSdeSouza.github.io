# Editing Website Content

The production pages use HTML for page-level copy and JSON for records rendered
by JavaScript. The Markdown files in this directory are editorial mirrors and
must not be treated as runtime sources.

## Runtime Sources

- Page introductions, section copy, navigation, labels, and captions: the relevant
  root-level `.html` file.
- Software records: `software.json`.
- Publication records: `publications.json`, generated from `../assets/cv/references.bib`.
- Appointments, recognition, leadership, people, and teaching: `site.json`.
- Writing records: `writing.json`.
- External profile links: `profile.json`.

## Automatic Publication List

Edit this BibTeX file when you want the publications list to change:

```text
../assets/cv/references.bib
```

The website reads that BibTeX file directly. You do not need to edit the
publication cards manually.

## Images

Put new images in one of these folders:

```text
assets/images/research/
assets/images/software/
assets/images/writing/
assets/images/institutions/
assets/images/backgrounds/
```

Then reference the image path in Markdown:

```md
image: assets/images/research/my-project.png
logo: assets/images/software/my-package-logo.png
cover: assets/images/writing/my-story-cover.jpg
```

Use `imageFit: contain` for logos or marks that should not be cropped.
The homepage wallpaper is `assets/images/backgrounds/home-nebula-contours.jpg`.

Keep your public CV files here:

```text
assets/cv/cv.pdf
assets/cv/references.bib
```

## Add Software

Add the record to the appropriate group in `software.json`. URLs have distinct
fields and are not inferred from one another:

```json
{
  "name": "PackageName",
  "year": 2026,
  "purpose": "What the software computes.",
  "problem": "The scientific problem it addresses.",
  "status": "Published and released",
  "logo": "assets/images/software/package-logo.png",
  "paper_url": "https://...",
  "docs_url": "https://...",
  "getting_started_url": "https://...",
  "github_url": "https://github.com/owner/repository",
  "release_url": "https://..."
}
```

Omit unavailable URL fields. If a project has no established logo, omit `logo`;
the Atlas displays its name without inventing a mark.

## Add A Writing Piece

Add a record to `writing.json`. The Writing page is linked from the homepage and
About page.

```md
### Story Title

type: Science fiction
year: 2026
authors: Rafael S. de Souza
cover: assets/images/writing/story-cover.jpg
coverLabel: Story Title
summary: A short teaser.
status: Optional publication or hosting note.

links:
- Story: https://...

body:
Optional full text, one paragraph per blank line.
```

## Markdown Mirrors

`research.md` and `software.md` can be refreshed from their JSON records with:

```text
node scripts/export-content-markdown.mjs research software
```

Do not edit generated mirrors in place. The remaining Markdown files are retained
for editorial reference and do not control the production pages.

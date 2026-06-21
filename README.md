# Rafael S. de Souza Academic Website

This repository contains a static GitHub Pages website for an academic CV, research profile, publications, software, and COIN highlights.

## Main Files

- `index.html`: page structure and section order.
- `research.html`: research interests and highlights loaded from `content/research.md`.
- `software.html`: research software cards.
- `writing.html`: science fiction, poetry, and literary work loaded from `content/writing.md`.
- `coin.html`: COIN page.
- `styles.css`: visual design.
- `script.js`: loads Markdown content, BibTeX publications, filters, and the CV map.
- `content/README.md`: detailed editing guide with copy-paste examples.
- `content/home.md`: edit the homepage hero, roles, impact strip, and homepage contact block here.
- `content/research.md`: edit research interests and research highlights here.
- `content/software.md`: edit software cards here.
- `content/writing.md`: edit sci-fi, poetry, and literary work here.
- `content/publications.md`: edit the publications page title, subtitle, impact badges, and featured book text here.
- `content/cv.md`: edit the CV page, map appointments, funding, awards, teaching, and service here.
- `content/coin.md`: edit the COIN page here.
- `content/contact.md`: edit the contact page here.
- `assets/cv/references.bib`: edit publication references here; the website reads this file directly.
- `content/*.json`: fallback data files. You normally do not need to edit these.
- `assets/cv/cv.pdf`: downloadable PDF CV.
- `assets/images/rafael-de-souza.jpg`: hero/profile image.
- `assets/images/coin.png`: COIN logo used in the visual identity areas.
- `CV_rafael_2026/`: original Overleaf/LaTeX CV source. The website no longer needs this folder to render.

## Editing Content

For normal edits, use the Markdown files in `content/`.

Each card starts with `### Title`, followed by simple fields:

```md
### New Project

year: 2026
tag: Topic
mark: N
logo: assets/images/software/new-logo.png
featured: false
summary: One clean sentence.

links:
- Paper: https://...
- Code: https://...
```

After editing, commit and push in GitHub Desktop. GitHub Pages will rebuild automatically.

If the browser still shows the old text, add a cache-busting query to the URL, for example:

```text
https://rafaelsdesouza.com.br/research.html?fresh=20260608
```

## Publications From BibTeX

The publication list is read directly from:

```text
assets/cv/references.bib
```

That means you only edit the BibTeX file. After commit and push, the website loads the updated references automatically.

The older JSON generator is kept only as a backup/fallback:

```bash
python3 scripts/bib_to_publications.py assets/cv/references.bib content/publications.json
```

Supported `type` values include `paper`, `software`, `report`, `book`, `chapter`, `proceeding`, and `catalogue`.

## Replacing Images and Logos

- Replace `assets/images/rafael-de-souza.jpg` with a formal portrait or a preferred graphic.
- Add logos to `assets/images/` and reference them from the relevant Markdown file.
- Software logos live in `assets/images/software/`.
- Research highlight images live in `assets/images/research/`.
- Writing covers live in `assets/images/writing/`.

## Custom Domain

See `docs/domain-setup.md` for the custom domain and Google visibility workflow.

In short: after the site is pushed to GitHub, configure GitHub Pages, add your domain in `Settings > Pages`, set DNS at your registrar, enable HTTPS, and then submit the domain to Google Search Console.

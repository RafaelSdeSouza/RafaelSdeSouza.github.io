# Rafael S. de Souza academic website

Static HTML, CSS and JavaScript for `https://rafaelsdesouza.com.br`.

## Content sources

- The ten root visitor pages contain their own editorial copy. Home, Research,
  About and Writing do not depend on JavaScript to expose their main text.
- `content/software.json` supplies the Software catalogue. Keep `paper_url`,
  `docs_url`, `getting_started_url`, `github_url` and `release_url` independent.
  Omit unavailable actions; do not infer documentation paths from repository URLs.
- `content/site.json` contains appointments and supporting records. After changing
  appointments, run `python3 scripts/render_appointments.py` to update About's
  static appointment list. The checker rejects stale rendered appointments.
- `assets/cv/references.bib` is the canonical bibliography.
  `content/publications.json` is its generated browser dataset. Regenerate with
  `python3 scripts/bib_to_publications.py assets/cv/references.bib content/publications.json`.
  The reconciliation check protects the complete record of 140 unique works.
- `assets/cv/cv.pdf` is the downloadable CV. Its LaTeX source remains under
  `CV_rafael_2026/`, outside the deployed file set.
- Earlier Markdown and unused JSON files are retained for historical reference,
  but are not the sources for the current pages and are not deployed.

Preserve the established scientific figures, artwork, project marks, book covers
and stylized About portrait. Do not substitute generated artwork or invented marks.
Preserve the approved *Beyond the Rainbow* excerpt verbatim.

## Styles and interactions

`styles.css` defines the shared white surface, STIX Two Text / IBM Plex Sans fonts,
navigation, responsive layouts and figure-led pages. `assets/css/records.css`
contains the archival page layouts. `script.js` supplies navigation behaviour,
publication search and filters, and structured-data rendering.

Stylesheets, JavaScript, CSS imports and font URLs share a cache-busting release
token, checked by `scripts/check_release_assets.py`. When publishing changed CSS,
JavaScript or fonts, update its `RELEASE_TOKEN` and every matching URL, including
font preloads. The build rejects missing or mismatched tokens.

## Validation and public build

```sh
python3 -m unittest discover -s scripts -p 'test_*.py'
python3 scripts/lint_public_copy.py
python3 scripts/build_site.py
```

The builder runs the appointment, bibliography, site and editorial checks, then
prints a new temporary directory containing only public files. Serve that directory
for local QA; do not serve the repository root as the public deployment preview.
To choose a destination, use `--output` with an empty directory. CI runs the same
checks through `.github/workflows/validate-site.yml`.

`scripts/public_site.py` defines the deployable inventory. When adding a required
asset or page, update that inventory where needed and run:

```sh
python3 scripts/build_site.py --write-config
```

The generated `_config.yml` excludes development files from branch-based GitHub
Pages. Do not restore `.nojekyll`: it would bypass those exclusions. CI verifies
that the configuration agrees with the public inventory. `design/`, editing notes,
CV source, provenance notes, screenshots and QA output must not be deployed.

Internal concepts and review evidence are archived outside this repository. Keep
future review output outside the public tree. Existing `cv.html`, `projects.html`
and `multiradial/` redirects are retained for compatibility.

The public-copy lint checks visible HTML text and attributes, structured data and
renderer strings. It rejects review language and development URLs; Research
headings cannot consist solely of a package name. Its `--dump-dir` option exports
Home, Research, About and Writing copy for an editorial review outside the site.

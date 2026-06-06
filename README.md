# Rafael S. de Souza Academic Website

This repository contains a static GitHub Pages website for an academic CV, research profile, publications, software, and COIN highlights.

## Main Files

- `index.html`: page structure and section order.
- `research.html`: research interests and application examples loaded from `content/research.json`.
- `software.html`: research software cards.
- `coin.html`: COIN page.
- `styles.css`: visual design.
- `script.js`: loads and filters publications and research cards.
- `content/publications.json`: the easiest place to add new papers, software, and media items.
- `content/research.json`: the easiest place to edit research interests, examples, links, and research-card images.
- `assets/cv/cv.pdf`: downloadable PDF CV.
- `assets/images/rafael-de-souza.jpg`: hero/profile image.
- `assets/images/coin.png`: COIN logo used in the visual identity areas.
- `CV_rafael_2026/`: original Overleaf/LaTeX CV source.

## Adding Publications

The full website publication list is generated from the Overleaf BibTeX file:

```bash
python3 scripts/bib_to_publications.py CV_rafael_2026/references.bib content/publications.json
```

Run that command after editing `CV_rafael_2026/references.bib`.

You can also edit `content/publications.json` by hand. A publication object looks like this:

```json
{
  "year": 2026,
  "type": "paper",
  "title": "Paper title",
  "venue": "Journal or preprint server",
  "summary": "One sentence summary.",
  "links": {
    "DOI": "https://doi.org/...",
    "ADS": "https://ui.adsabs.harvard.edu/..."
  }
}
```

Supported `type` values include `paper`, `software`, `report`, `book`, `chapter`, `proceeding`, and `catalogue`.

## Replacing Images and Logos

- Replace `assets/images/rafael-de-souza.jpg` with a formal portrait or a preferred graphic.
- Add logos to `assets/images/` and then reference them from the relevant HTML page.
- Software cards live in `software.html`.
- Research-card images live in `assets/images/research/`; edit their text and links in `content/research.json`.

## Custom Domain

See `docs/domain-setup.md` for the custom domain and Google visibility workflow.

In short: after the site is pushed to GitHub, configure GitHub Pages, add your domain in `Settings > Pages`, set DNS at your registrar, enable HTTPS, and then submit the domain to Google Search Console.

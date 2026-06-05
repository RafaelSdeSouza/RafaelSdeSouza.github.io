# Rafael S. de Souza Academic Website

This repository contains a static GitHub Pages website for an academic CV, research profile, publications, software, and project highlights.

## Main Files

- `index.html`: page structure and section order.
- `styles.css`: visual design.
- `script.js`: loads and filters publications.
- `content/publications.json`: the easiest place to add new papers, software, and media items.
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
- Add logos to `assets/images/` and then add them to the `Visual Lab` section in `index.html`.
- Project cards live in the `Projects and Software` section of `index.html`.

## Custom Domain

See `docs/domain-setup.md` for the custom domain and Google visibility workflow.

In short: after the site is pushed to GitHub, configure GitHub Pages, add your domain in `Settings > Pages`, set DNS at your registrar, enable HTTPS, and then submit the domain to Google Search Console.

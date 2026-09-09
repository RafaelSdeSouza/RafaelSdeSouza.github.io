# Final visual review set

These screenshots were captured from the implemented local site after loading all lazy assets.

## Final implementation screenshots

- `home-desktop.png` — homepage, 1440 px desktop
- `home-mobile.png` — homepage, 390 px mobile
- `research-desktop.png` — Research
- `selected-contributions-desktop.png` — Selected Contributions
- `publications-desktop.png` — Publications above the fold, including the local list
- `software-atlas-desktop.png` — complete Software Atlas
- `writing-ideas-desktop.png` — Writing & Ideas

## Production files

The site starts at `../../index.html`. Shared presentation and behaviour are in `../../styles.css` and `../../script.js`. Page-specific HTML is stored at repository root. Visible images are under `../../assets/images/`.

## Approved design references

The final concepts used for comparison are:

- `../concepts/career-architecture-review/final-homepage.png`
- `../concepts/career-architecture-review/research-final.png`
- `../concepts/career-architecture-review/selected-contributions-final.png`
- `../concepts/career-architecture-review/software-atlas.png`

The authoritative copy and full image-provenance table are in `../final-editorial-content-asset-review.md`.

## Review note

The production site should be served over HTTP for review because Publications, Software, People, profiles, and Writing load structured JSON with `fetch()`. Opening `index.html` directly through `file://` can cause the browser to block those requests.

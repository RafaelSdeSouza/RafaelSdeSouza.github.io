# Editing Website Content

Use these files for normal edits:

- `research.md`: research interests and research highlights.
- `software.md`: software cards.
- `writing.md`: sci-fi, poetry, and literary work.
- `publications.md`: publications page title, subtitle, impact badges, and featured book text.

Use this file for the publication list:

- `../CV_rafael_2026/references.bib`: all papers, books, reports, chapters, and software records.

The `.json` files are fallback files. You normally do not need to edit them.

## Card Format

```md
### Card Title

tag: Topic
summary: One concise sentence.
image: assets/images/research/example.png
url: https://example.com

links:
- Paper: https://...
- Code: https://...
```

Keep image paths relative to the website root, such as:

```text
assets/images/software/sagui-logo.png
assets/images/research/spicy.png
assets/images/writing/beyond-the-rainbow-cover.png
```

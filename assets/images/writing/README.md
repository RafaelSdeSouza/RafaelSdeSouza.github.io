Writing covers live here. Keep authentic covers unmodified and use lowercase,
descriptive filenames.

To add a work:

1. Add one record to `content/writing.json`.
2. Copy an optional cover into this directory and set the record's `cover` path.
3. Run `make update`.
4. Commit and push the generated site changes.

`cover`, `cover_alt`, `excerpt`, `year`, and `summary` are optional. The page
renders a work without empty controls or placeholder images when those fields
are absent.

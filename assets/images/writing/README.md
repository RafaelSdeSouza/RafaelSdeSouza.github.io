Writing covers live here.

Use lowercase story slugs for filenames, for example:

- `beyond-the-rainbow-cover.jpg`
- `another-story-cover.jpg`

To add a new story, edit `content/writing.md`.

Copy this block under the `## Writing` heading and change the values:

```md
### Story Title

type: Science fiction
year: 2026
authors: Rafael S. de Souza
status: Short story
summary: One or two sentences for the publications list and writing page.
cover: assets/images/writing/story-title-cover.jpg
coverLabel: Story Title
readerLabel: Read text

links:
- Wattpad: https://www.wattpad.com/...
body:

Optional story text can go here, one paragraph per blank line.

footnotes:
- Optional note.
```

The publications page shows each story as a compact entry under the `Sci-fi`
filter. The cover and full text appear on `writing.html`.

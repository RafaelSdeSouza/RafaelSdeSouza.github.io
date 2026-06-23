# Editing Website Content

The site is designed so normal edits happen in Markdown. You should rarely need
to touch HTML, CSS, JavaScript, or JSON.

## Main Editable Files

- `home.md`: homepage hero, roles, top impact strip, and homepage contact block.
- `research.md`: research page title, research interests, highlights, and COIN block.
- `software.md`: software page title, software cards, logos, and media links.
- `publications.md`: publications page title, impact badges, and featured book.
- `cv.md`: CV page title, career map appointments, funding, awards, teaching, and service.
- `coin.md`: COIN page title, buttons, window preview, and cards.
- `writing.md`: sci-fi, poetry, covers, summaries, links, and expandable text.
- `contact.md`: contact page title, email sentence, and contact buttons.

## Automatic Publication List

Edit this BibTeX file when you want the publications list to change:

```text
../assets/cv/references.bib
```

The website reads that BibTeX file directly. You do not need to edit the
publication cards manually.

## Edit Publication Metrics

Edit `publications.md` under `## Impact` to change the large publication
numbers at the top of the Publications page. Each metric uses this shape:

```md
### Metric Name

value: 140+
label: scholarly outputs
url: publications.html
```

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

## Add A Research Highlight

Copy this block into `research.md` under `## Research highlights`:

```md
### Project Title

image: assets/images/research/project-image.png
imageFit:
alt: Short description of the image
tag: Short Topic
summary: One concise sentence about the result.
url: https://project-or-paper-link
```

## Add Software

Copy this block into `software.md` under `## Software`:

```md
### PackageName

year: 2026
tag: Short topic
mark: P
logo: assets/images/software/package-logo.png
featured: false
summary: One concise sentence about what the software does.

links:
- Paper: https://...
- Code: https://...
- ASCL: https://...
```

If there is no logo yet, leave `logo:` empty and the card will use the `mark`
letter instead.

## Add A CV Appointment

Copy this block into `cv.md` under `## Appointments`:

```md
### Institution Name

years: 2026-present
role: Visiting Scholar
place: Institution Name
label: SHORT
city: City, Country
type: work
coordinates: longitude, latitude
url: https://institution-link
image: assets/images/institutions/institution.svg
summary: Optional short note.
```

Use `type: education` for degrees and `type: work` for positions.

## Add A Writing Piece

Copy this block into `writing.md` under `## Writing`. These pieces appear in the
`Sci-fi` filter on `publications.html`; the old `writing.html` page is still kept
as a direct detail page, but it is not in the top navigation.

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

## What Not To Edit

The `.json` files are old fallback files. Leave them alone unless you are doing
a technical recovery.

# Scientific-modernist, multi-axis concept

Status: approved concept and implementation record. These files are not loaded production dependencies.

## Recommendation

Use **Atlas / contour** as the common direction: the present navy/cobalt palette, serif–sans hierarchy, disciplined grid, large captions, and authentic figures. Apply the stricter **Archival plate** treatment to Publications and Software. Use **Literary margin** once on Writing, with Rafael's own published text.

This keeps the visual hierarchy roughly scientific modernism first, research-derived geometry second, and literary detail last. No page uses a Bauhaus-themed palette, Deco display font, ornamental frame system, generated astronomical artwork, invented project mark, or decorative scientific-looking diagram.

## Direction boards

| Direction | Intended pages | Visual decision | Status |
|---|---|---|---|
| Atlas / contour | Home, Research, Selected Contributions | Asymmetric text–image composition; wide reading column; source, caption, and metadata aligned as in a scientific monograph | **Recommended** |
| Archival plate | Publications, Software | Denser baseline, minimal decoration, strict figure/record alignment | Use as the conservative variant inside the common system |
| Literary margin | Writing only | One narrow marginal zone and one verified excerpt from Rafael's own work | Use once; do not make it a site-wide device |

Interactive board: [`index.html`](index.html)

## Research architecture in this concept

The concept replaces exclusive numbered programmes with non-exclusive arrays. Five question families are currently supported by the record:

1. statistical inference and uncertainty;
2. incomplete, selective, and heterogeneous data;
3. scientific representations;
4. geometry and ordered structure;
5. scalable computation and observing decisions.

The five headings are not a fixed claim about the career. Projects can occupy several questions, physical domains, methods, and contribution forms. The six-domain physical taxonomy is unchanged. The illustrative schema is in [`research-model.example.json`](research-model.example.json).

The page remains a scrollable scientific essay. Metadata sits in the margin; there are no filter pills, dashboard panels, matrix, or network diagram.

## Source-derived motifs

| Motif | Source | Type | Permitted purpose | Why it belongs |
|---|---|---|---|---|
| Centre-conditioned path | RadialPaths publication Fig. 1 and the path in the existing `radialpaths-mark.svg` | Line-only geometric abstraction | A low-weight local detail beside centre-conditioned geometry | It follows the real path construction; the rounded-square mark remains exclusive to RadialPaths project identity |
| Ordered spectral trace | `spectropath/site-assets/toy_case_row1.png` | Geometric abstraction of a scientific representation | A thin local rule beside spectropath or spectral-representation content | The source figure explicitly maps line morphology into an ordered representation |

The two code-native line motifs reproduce the topology of the methods, not measured coordinates. They must be identified as abstractions in internal asset records and must never carry a scientific-figure caption. The full source figure should appear whenever evidence, rather than a quiet local reference, is required. No separate CAPIVARA contour motif is approved; production uses the authentic segmentation figure.

## Original-site artwork and existing assets

### Preserve prominently

| Asset | Classification | Use | Condition |
|---|---|---|---|
| `assets/images/backgrounds/home-nebula-contours.jpg` | Site-owner-supplied original-site artistic imagery | Homepage hero only | Added and selected as the homepage background by Rafael S. de Souza in project commit `8e1797b432fabfd555ee6edb3603ca6f9a074ebd`; keep unaltered and distinct from scientific evidence |
| `assets/images/book-cover-bayesian-models.jpg` | Official book cover | Selected Contributions and book record | Preserve cover proportions and Cambridge University Press attribution |
| `assets/images/research/milky-way.png` | Scientific figure | SPICY/Sagittarius contribution | Caption as Kuhn et al. (2021), *A&A* 651, L10, Fig. 3 |
| `assets/images/research/capivara-segmentation.png` | Scientific figure | CAPIVARA contribution and Research thread | Caption as de Souza et al. (2025), *MNRAS*, top and middle rows of Fig. 2 |
| `assets/images/coin-2024.png` | Current project/community mark | COIN/Leadership | Preserve the current Serrapilheira executive-CV version unchanged; do not use the older coin mark |

### Preserve occasionally

| Asset | Classification | Use | Condition |
|---|---|---|---|
| `assets/images/rafael-de-souza.jpg` | Original-site portrait | About only | Confirm image rights; do not move it into the hero |
| `assets/images/writing/cover.jpg` | Existing literary cover, now matched to *Beyond the Rainbow* | Writing | Use with the confirmed title, authors, and Wattpad record |
| Authentic software marks for CAPIVARA, SAGUI, SCONCE, PowerSpectR, Lightstack, GalMOSS, DRACULA, and RESSPECT | Existing project marks | Software Atlas; selected subset on Home | Preserve each identity and proportion; the site supplies common framing only |
| `radialpaths-mark.svg` and `spectropath-logo.png` from their project repositories | Existing project marks | Software Atlas | Preserved from the project repositories as the current release identities |

### Archive only

| Asset | Reason |
|---|---|
| `assets/images/coin.png` | Superseded by the current COIN 2024 mark |
| `assets/images/writing/cover2.jpg` | Appears to read *Beyond the Veil*, but the title/cover relationship remains unresolved |
| `assets/images/research/cosmic-structure.png` | Exact paper panel and crop unresolved |
| `assets/images/research/time-domain.png` | Objects, paper, and figure version unresolved |
| `assets/images/research/spatial-structure.png` | Plotted quantities and source unresolved |
| `assets/images/research/follow-up.png` | Source and meaning unresolved |
| `assets/images/research/spectral-classification.png` | Not yet matched conclusively to a numbered published panel |

### Retire

| Asset | Reason |
|---|---|
| `assets/images/backgrounds/likelihood-manifold.svg` | Invented scientific-looking decoration that could be mistaken for evidence |
| `assets/images/software/capivara.svg`, `sagui.svg`, `powerspectr.svg`, `spectralunmix.svg` | Website-made uniform placeholders, not project-owned marks |
| `assets/images/institutions/*.svg` | Generic site-made institution graphics |
| `CV_rafael_2026/photo.jpg` | Unrelated illustrated portrait without valid site provenance |

## Literary references

No borrowed literary reference is proposed for production in this pass. A repository search did not establish Rafael's affinity with Poincaré, Borges, Lem, Calvino, Le Guin, or Chiang, and the brief explicitly prohibits inventing such affinities.

The names remain possible editorial candidates only if Rafael confirms the author/work and selects the page. They do not appear in any page mockup. The site does not need to reach a quota of three to five references; zero is preferable to an invented intellectual association.

## Rafael's own writing

The Writing mockup uses three consecutive sentences from the supplied text of *Beyond the Rainbow*:

> The hour arrives.<br>
> Rain has passed.<br>
> The air is cool and shimmering with ions.

The excerpt appears once, at modest scale, without quotation marks, with the title and both authors immediately below it. The work catalogue remains factual. No other page borrows the excerpt.

## Page mockups

| Page | File | Scope of the visual change |
|---|---|---|
| Homepage | [`home.html`](home.html) | Retains the original-site hero artwork; replaces four programme boxes with four current questions; retains six physical domains and selected contributions; leaves later layers as short previews |
| Research | [`research.html`](research.html) | Adds question, domain, method, and contribution-form routes through selected threads; uses marginal metadata rather than filters; includes authentic CAPIVARA, RadialPaths, and spectropath figures |
| Writing | [`writing.html`](writing.html) | Uses the matched *Beyond the Rainbow* cover and one exact excerpt; keeps the work list factual |
| Publications | [`publications.html`](publications.html) | Preserves search, categories, full chronological record, bibliographic metadata, and BibTeX actions; adds no artwork or literary material |

## Internal art-element annotations

Every image-bearing element in the mockups has `data-source`, `data-type`, and `data-purpose` attributes. The table below resolves those annotations.

| Mockup element | Source | Purpose | Type | Why it belongs |
|---|---|---|---|---|
| Homepage split-hero image | `assets/images/backgrounds/home-nebula-contours.jpg` | Personal identity and continuity | Original-site artwork | It is established site imagery and is not presented as evidence |
| Homepage book cover | Official Cambridge University Press cover | Identify the 2017 book | Book cover | The cover is part of the bibliographic object |
| Homepage Milky Way map | Kuhn et al. (2021), Fig. 3 | Show the measured Galactic structure | Scientific figure | It is direct evidence for the selected contribution |
| Homepage/Research CAPIVARA image | de Souza et al. (2025), Fig. 2 crop | Show spectro-spatial regions | Scientific figure | It demonstrates the segmentation result |
| Research spectropath image | `spectropath/site-assets/toy_case_row1.png` | Show line profiles and their ordered representation | Scientific figure | It makes the path encoding concrete |
| Research RadialPaths image | `publication_figures/fig1_multicentre_construction.png` | Show one- and multi-centre constructions | Scientific figure | It explains the geometry without an invented diagram |
| Writing cover | `assets/images/writing/cover.jpg` | Identify *Beyond the Rainbow* | Existing literary cover | The title and authors match the supplied work record |
| Writing excerpt | Exact supplied story text | Give Rafael's own writing one typographic moment | Literary text | Own work has priority over borrowed authority |
| Publications | None | Keep the record functional and archival | — | Additional imagery would not clarify the bibliography |

## Production boundary

The concept directory is retained as the review record. The production pages use their own HTML, CSS, structured content, and copied authentic assets.

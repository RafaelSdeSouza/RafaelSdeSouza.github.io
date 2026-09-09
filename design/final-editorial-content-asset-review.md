# Final editorial, content, asset, and publication review

Status: **for approval before implementation**. This document replaces the homepage, Research, Selected Contributions, software-mark, and asset-provenance sections of `final-preimplementation-specification.md` wherever they differ. It also adds the publication-preservation gate. No production HTML, stylesheet, script, or content source has been changed.

## 1. Frozen architecture

The information architecture is approved and will not be redesigned during implementation.

- Four methodological programmes and six astronomical domains remain independent axes.
- Selected Contributions, Current Work, Publications, Software, Leadership & Community, Appointments, Recognition, People & Mentorship, and Writing & Ideas remain separate layers.
- **Selected Contributions interprets a small number of works. Publications preserves the complete scholarly record.**
- The homepage previews the deeper pages; it does not reproduce them.
- The established typography, navigation, section hierarchy, and restrained academic visual language remain unchanged.
- Spectroscopy, survey methodology, astrostatistics, and machine learning are methods or observational settings, not additional physical domains.

## 2. Exact homepage copy

### Hero

**Rafael S. de Souza**  
**Astrophysicist**

Statistical inference for astronomical observations whose likelihoods, calibration samples, representations, or spatial structure limit what can be learned about the underlying physics.

The work connects problems in primordial star formation, cosmology, Galactic structure, galaxies, transients, and nuclear reaction rates.

**Senior Lecturer, University of Hertfordshire · Adjunct Associate Professor, University of North Carolina at Chapel Hill**

Links: **Explore the research · Selected contributions · Publications · Download CV**

### Research programmes

**Four methodological programmes**

The same inferential failures recur in observations of very different physical systems. These four programmes identify what must be modelled, calibrated, preserved, or reconstructed before an astronomical conclusion is warranted.

**Statistical inference from complex astronomical data**  
Match the sampling law to the observable, propagate population and experiment-level uncertainty, and infer physical parameters when the likelihood cannot be evaluated.

**Learning from heterogeneous and incomplete surveys**  
Determine how selection, missing support, and changing measurement errors alter predictions when a labelled sample is transferred to a target survey.

**Representations of spectra, images and populations**  
Construct low-dimensional, graph, and matrix descriptions that retain the variation needed by the scientific question rather than only the dominant variance in the data.

**Geometry and resolved astronomical structure**  
Recover ridges, regions, and ordered profiles when the signal depends on adjacency across a sky map, multiband image, or integral-field data cube.

Link: **Read the research programmes**

### Across astronomy

**Across astronomy**

Navigate the work by physical domain:

**First stars and the early Universe · Cosmology and large-scale structure · Milky Way structure and star formation · Galaxies and stellar systems · Supernovae, transients and multimessenger sources · Nuclear astrophysics**

Link: **Explore by astronomical domain**

### Selected Contributions

**Selected Contributions**

Four examples show how the research changed an analysis, supplied a reusable synthesis, or established an astronomical measurement. They are not a substitute for the complete publication record.

**Generalized linear models in astronomy · 2015**  
Binary events, positive continuous measurements, and overdispersed counts were treated with sampling laws appropriate to each observable, making the corresponding astronomical effects directly estimable.

**Bayesian Models for Astrophysical Data · 2017**  
A 408-page practical synthesis connected generalized, hierarchical, and likelihood-free models to complete astronomical analyses in R/JAGS and Python/Stan. The book received the 2018 PROSE Award in Cosmology & Astronomy.

**SPICY and the Sagittarius arm · 2021**  
A catalogue of roughly 120,000 candidate young stellar objects supported the identification of 25 star-forming regions in a narrow structure about 1 kpc long, with a pitch angle of about 56 degrees.

**CAPIVARA · 2025**  
Spectral similarity grouped IFU spaxels into regions coherent in continuum and emission-line properties without imposing a bulge–disc decomposition or relying only on signal-to-noise binning.

Link: **View all selected contributions**

### Current directions

**Current directions**

These projects are separated from established contributions because their principal conclusions remain in development or because a published method is being extended.

**Incomplete calibration samples · In development**  
Determine which population quantities remain identifiable when a spectroscopic sample omits part of the target population.

**Representation completion · In development**  
Test whether a summary constructed for one target retains the variation required by a later physical parameter.

**RadialPaths · Preprint and released package, 2026**  
Construct centre-conditioned radial profiles that preserve associations with multiple centres and distances measured through the observed source footprint.

**spectropath · Preprint and released package, 2026**  
Represent spectral-line morphology through ordered paths in velocity–flux space.

Link: **See current work in context**

### Software

**Selected software**

Software turns statistical methods into research infrastructure that can be inspected, tested, and applied to new data. The homepage shows six project-owned marks; the complete catalogue records every published package, research system, and active release.

Projects: **DRACULA · SCONCE-SCMS · CAPIVARA · SAGUI · PowerSpectR · Lightstack**

Link: **View the complete software atlas**

### Leadership & Community

**Building scientific communities**

Rafael founded the Cosmostatistics Initiative in 2014. Its project-based collaborations and residence programmes bring astronomers, statisticians, and computer scientists together around problems that require all three disciplines.

Link: **Leadership & Community**

### Appointments and Recognition

**Appointments and Recognition**

Current appointments at the University of Hertfordshire and the University of North Carolina at Chapel Hill follow research positions in China, the United States, Hungary, South Korea, and Japan.

*Bayesian Models for Astrophysical Data* received the 2018 PROSE Award in Cosmology & Astronomy. The 2016 International Astrostatistics Association award recognised the Bayesian negative-binomial analysis of globular-cluster populations.

Link: **Career & Recognition**

### People & Mentorship

**People & Mentorship**

Current and former PhD, MSc, and undergraduate researchers are presented with their scientific projects, institutions, dates, and associated outputs.

Link: **Meet the people**

### Writing & Ideas

**Writing & Ideas**

Science fiction and writing on the history and practice of inference appear here, separate from the scholarly publication record.

Link: **Read Writing & Ideas**

### Footer

**Complete record:** ADS · ORCID · Google Scholar · GitHub · CV  
**Affiliations:** University of Hertfordshire · University of North Carolina at Chapel Hill  
**Contact**

## 3. Exact Research-page copy

### Page introduction

**Research**

Astronomical data constrain physical systems through the way observations are sampled, calibrated, represented, and arranged. The likelihood may be inaccessible; a spectroscopic sample may omit part of the target population; a spectrum may contain variation irrelevant to a given question; a resolved signal may disappear when neighbouring measurements are treated as independent. Each case limits what the data can determine before an estimator is chosen.

Four methodological programmes describe how the work addresses those limits. Six astronomical domains record the physical systems in which the methods have been developed or tested. A paper or software project may connect several entries, and established results remain separate from current work.

Links: **Statistical inference · Heterogeneous and incomplete surveys · Representations · Geometry and resolved structure · Across astronomy · Current work**

### Statistical inference from complex astronomical data

Astronomical responses do not share a common sampling law. Star formation may be represented by a binary outcome, a photometric redshift by a positive continuous response, a cluster population by overdispersed counts, and a cosmological calculation by a simulator whose likelihood cannot be evaluated. Replacing these differences with a generic Gaussian error model can obscure the relation between the physical parameter and the observed quantity.

The generalized-linear-model series linked each response to an explicit sampling distribution. Binomial regression described Population III star formation, gamma regression modelled photometric redshifts, and a Bayesian negative-binomial model separated globular-cluster abundance from excess count variation. COSMOABC addressed a different failure: cluster-count simulations were available, but the likelihood was not. Population Monte Carlo approximate Bayesian computation then compared simulated and observed summaries to constrain the cosmological parameters.

Hierarchical models extend this logic to measurements that share uncertain normalisations or population structure. The thermonuclear-rate analyses modelled experiment-specific systematics jointly with the reaction rate, so the reported uncertainty included variation that a pooled fit would suppress. *Bayesian Models for Astrophysical Data* connected these cases through complete analyses rather than treating generalized, hierarchical, and likelihood-free inference as unrelated techniques.

Established work: **GLM series (2015) · COSMOABC (2015) · Bayesian Models for Astrophysical Data (2017) · hierarchical thermonuclear reaction rates (2019–2022)**

### Learning from heterogeneous and incomplete surveys

Wide photometric surveys contain far more objects than can receive spectroscopic labels. The labelled sample is therefore selected: some colour–magnitude regions may be absent, and the photometric errors within covered regions may differ from those of the target catalogue. A model can perform well on held-out spectra while failing on the population to which its estimates will be applied.

The Teddy and Happy catalogues separated these two mechanisms. Teddy varied colour–magnitude support while controlling the remaining construction; Happy introduced survey-like photometric errors and selection. Their comparison showed which failures followed from extrapolation beyond the calibration support and which followed from a changed conditional measurement distribution.

RESSPECT treated follow-up as a sequential decision rather than a fixed training-set problem. At each step, the candidate pool, class information, observing cost, and remaining telescope budget determine which spectrum should be acquired next. In the reported experiments, uncertainty sampling outperformed random selection, while the tested batch strategies did not produce a significant improvement. Current work asks what population quantities remain identifiable when additional spectroscopy cannot repair the missing support.

Established work: **Teddy and Happy photometric-redshift validation (2017) · active learning and RESSPECT (2019–2020)**

### Representations of spectra, images and populations

A representation is adequate only if it preserves the variation needed by the later scientific inference. Directions that explain the largest variance need not separate transient classes, retain a weak spectral component, or encode the physical parameter of interest. Compression therefore has to be evaluated against the question it will support.

Early work used robust and kernel principal components, transfer learning, and DRACULA to compare and classify supernova spectra when observations were sparse and heterogeneous. A later graph construction ordered 1,595 spectra from 145 Type II supernovae by spectral similarity. The graph exposed continuous variation and outliers without imposing a fixed class boundary; spectra evolved rapidly near maximum light and became more homogeneous toward the end of the plateau.

Matrix methods address related problems in larger arrays. qrpca accelerates principal-component calculations through QR decomposition, while SpectralUnmix estimates non-negative spectral components with optional smoothness regularisation. Representation completion is the current inferential question: if a summary was designed for one target, what evidence shows that it retained the information needed by another?

Established work: **DRACULA (2015–2016) · robust and kernel PCA · qrpca (2022) · graph-based Type II spectral ordering (2023) · SpectralUnmix (2026)**

### Geometry and resolved astronomical structure

Sky maps, galaxy images, and integral-field data cubes are not unordered collections of measurements. Their scientific content can depend on a ridge that bends across a sphere, a faint component that remains contiguous across bands, or neighbouring spaxels whose spectra change coherently. A reduction that ignores adjacency can remove the structure being measured.

The DES analysis adapted subspace-constrained mean shift to trace curvilinear ridges in weak-lensing mass maps. SCONCE extended ridge finding to spherical and conic geometries, where a planar coordinate approximation would distort the paths. These methods identify one-dimensional structure while retaining the geometry of the observed field.

CAPIVARA groups IFU spaxels by spectral similarity and maps the groups back to their spatial positions. In five MaNGA galaxies, the recovered regions were coherent in continuum and emission-line properties without a prescribed bulge–disc model. SAGUI carries the same spectro-spatial principle to multiband images, combining multiscale spatial detection with spectral similarity and a separate treatment of faint diffuse structure. RadialPaths and spectropath extend the programme through centre-conditioned image profiles and ordered spectral-line paths.

Established work: **DES weak-lensing ridges (2020) · SCONCE (2022–2023) · CAPIVARA (2025) · SAGUI (2026)**  
Public preprints and released packages: **RadialPaths (2026) · spectropath (2026)**

### Across astronomy

The methodological programmes cut across six physical domains. This index preserves the breadth of the astronomical record without promoting an observing technique to the same level as a physical system.

**First stars and the early Universe**  
Population III star formation and supernovae, primordial magnetic fields, reionisation, and early minihaloes.

**Cosmology and large-scale structure**  
Cosmological parameter inference, cluster counts, weak-lensing mass maps, cosmic troughs, and the geometry of the cosmic web.

**Milky Way structure and star formation**  
Open clusters, young stellar objects, the Sagittarius arm, stellar trajectories, and eruptive young stars.

**Galaxies and stellar systems**  
Galaxy evolution and environment, globular and nuclear clusters, morphology, stripping, and resolved stellar populations.

**Supernovae, transients and multimessenger sources**  
Type Ia and Type II supernovae, spectroscopic follow-up, broker alert streams, kilonovae, tidal-disruption events, and galaxy catalogues for multimessenger searches.

**Nuclear astrophysics**  
Hierarchical evaluations of Big Bang nucleosynthesis and stellar thermonuclear reaction rates.

Link: **Browse representative papers by domain**

### Current work

The projects below are labelled separately because their main conclusions remain in development or because an established method is being extended to new data.

**Incomplete calibration samples · In development**  
When a target population occupies regions absent from the spectroscopic sample, reweighting can change the mixture only within observed support. The current analysis derives bounds on population quantities under explicit restrictions on the missing conditional law.

**Representation completion · In development**  
A summary learned for one task may discard variation required by another. Controlled experiments test which physical parameters remain recoverable and which losses follow from the representation rather than the estimator.

**RadialPaths · Preprint and released package, 2026**  
Centre-conditioned paths measure distance through the observed source footprint, retain the association between each location and its nearest adopted centre, and avoid a prescribed light-profile law.

**spectropath · Preprint and released package, 2026**  
Ordered velocity–flux paths encode line shape while preserving the sequence along the spectral axis.

**Spectro-spatial segmentation · Published methods under extension**  
CAPIVARA and SAGUI are established methods. Current applications test how their regions behave across new IFU samples, multiband images, and physical questions.

## 4. Exact Selected Contributions copy

### Page introduction

**Selected Contributions**

These works were selected because they changed the statistical formulation of an astronomical problem, produced reusable scientific infrastructure, supplied a substantive synthesis, or established a specific physical result. The list is interpretive and deliberately selective. The Publications page retains the complete scholarly record.

Links: **Complete publications · ADS record**

### Statistical models and inference

**2015 · Generalized linear models matched to astronomical observables**

Binary events, positive measurements, and overdispersed counts encode different relations between an observable and its expected value. The three-paper series used binomial, gamma, and Bayesian negative-binomial models for primordial star formation, photometric redshifts, and globular-cluster populations. Each analysis made the sampling assumption explicit and estimated effects on the scale appropriate to the data.

Records: **[GLM I](https://doi.org/10.1016/j.ascom.2015.04.002) · [GLM II](https://doi.org/10.1016/j.ascom.2015.01.002) · [GLM III](https://doi.org/10.1093/mnras/stv1825)**

**2015 · COSMOABC**

Cosmological simulations can generate cluster-count catalogues even when the corresponding likelihood is impractical to evaluate. COSMOABC used population Monte Carlo approximate Bayesian computation to compare simulated and observed summaries and recover constraints on the cosmological parameters. The software made the likelihood-free calculation reproducible and available beyond the original analysis.

Records: **[Astronomy and Computing](https://doi.org/10.1016/j.ascom.2015.09.001) · [ASCL](https://ui.adsabs.harvard.edu/abs/2015ascl.soft05013I)**

**2017 · Bayesian Models for Astrophysical Data**

The 408-page volume develops generalized, hierarchical, and likelihood-free models through complete astronomical analyses in R/JAGS and Python/Stan. Its contribution is a connected practical treatment of models that are often taught separately, with the assumptions and computation carried through to the scientific interpretation. The book received the 2018 PROSE Award in Cosmology & Astronomy.

Records: **[Cambridge University Press](https://www.cambridge.org/core/books/bayesian-models-for-astrophysical-data/A521B3BB3A2E1621EE1B907E87207218) · [PROSE Award](https://proseawards.com/winners/2018-award-winners/)**

**2020 · Hierarchical Bayesian thermonuclear reaction rates**

Measurements of the same nuclear reaction share the physical rate but carry experiment-specific normalisations and statistical errors. A hierarchical model estimated these terms jointly for the \(^{7}\mathrm{Be}(n,p)^{7}\mathrm{Li}\) reaction. Below 1 GK, the analysis obtained rate uncertainties of 1.5–2.0 per cent and found that commonly used rates were overconfident because they did not propagate all sources of uncertainty.

Record: **[Journal of Physics G / arXiv](https://arxiv.org/abs/1912.06210)**

### Surveys, sampling, and representation

**2017 · Realistic validation of photometric redshifts**

A spectroscopic calibration set can fail in two distinct ways: it may not cover the target colour–magnitude space, or its measurement errors may differ within regions that are covered. Teddy and Happy separated these mechanisms in controlled catalogues. The resulting tests showed where machine-learning photometric-redshift estimates failed through extrapolation and where they failed because the conditional photometric distribution had changed.

Record: **[Monthly Notices of the Royal Astronomical Society](https://doi.org/10.1093/mnras/stx862)**

**2019–2020 · Active learning and RESSPECT**

Spectroscopic follow-up was formulated as sequential label acquisition under a finite telescope budget. The candidate pool and classifier changed after each observation, while the acquisition rule accounted for uncertainty and object-dependent observing cost. In the realistic experiments, uncertainty sampling improved on random selection; the tested batch strategies produced no significant further gain.

Record: **[RESSPECT paper](https://arxiv.org/abs/2010.05941)**

**2023 · Graph-based ordering of Type II supernova spectra**

A graph connected 1,595 spectra from 145 Type II supernovae according to spectral similarity. The resulting organisation exposed outliers and continuous evolution without imposing a fixed class boundary. Spectra changed rapidly near maximum light and became more homogeneous toward the end of the plateau, identifying phases at which a single subtype label conceals different amounts of spectral variation.

Record: **[Astronomy and Computing](https://doi.org/10.1016/j.ascom.2023.100715)**

### Astronomical structure

**2021 · SPICY and a high-pitch-angle structure in the Sagittarius arm**

SPICY assembled roughly 120,000 candidate young stellar objects from infrared photometry. A subsequent analysis used the catalogue to identify 25 star-forming regions in a narrow structure about 1 kpc long. Its pitch angle of about 56 degrees differs from the smaller pitch angle usually assigned to the Sagittarius arm, so the feature cannot be treated as a simple continuation of a low-pitch-angle logarithmic arm.

Records: **[SPICY catalogue](https://authors.library.caltech.edu/records/afsgs-35t81) · [Astronomy & Astrophysics](https://doi.org/10.1051/0004-6361/202141198)**

**2025 · CAPIVARA**

Integral-field spectra vary across a galaxy, but fixed apertures and signal-to-noise bins need not follow changes in the stellar continuum or emission lines. CAPIVARA groups spaxels by spectral similarity and returns the groups to their positions in the galaxy. In five MaNGA systems, the resulting regions were coherent in continuum and emission-line properties without requiring a predetermined morphological decomposition.

Records: **[Monthly Notices of the Royal Astronomical Society](https://doi.org/10.1093/mnras/staf688) · [ASCL](https://ui.adsabs.harvard.edu/abs/2025ascl.soft07023S)**

Additional milestones: **DRACULA and Type Ia spectral diversity · DES weak-lensing ridges · SCONCE on spherical and conic geometries**

Link: **See the complete publication record**

## 5. Publications: exact page copy and preservation audit

### Exact Publications-page copy

**Publications**

This page contains the complete scholarly publication record represented on Rafael's website. The list is generated from one structured bibliography, ordered from newest to oldest, and retains work outside the themes highlighted in Selected Contributions.

Summary links: **All publications · Books · First-author papers · ADS · ORCID · Google Scholar · Download BibTeX**

Search label: **Search publications**  
Search placeholder: **Title, author, year, journal, or identifier**

Filters: **All · Refereed papers · Preprints · Software · Reports · Proceedings · Book chapters · Books · Catalogues**

Count label: **Showing [filtered count] of [complete scholarly count] records**

Each record displays the author list held in the canonical source, year, title, journal or publisher, volume, issue where present, page range or article number, and every available DOI, ADS, and arXiv link. When a journal version exists, it is the principal record and the arXiv identifier remains a secondary link.

Empty-search message: **No publication matches the current search and filters.**

### Current live record

Audit date: **8 September 2026**. The [live Publications page](https://rafaelsdesouza.com.br/publications.html) reports **103 of 143 entries** with its default Papers filter selected. The deployed `assets/cv/references.bib` is byte-for-byte identical to the repository source audited here.

The number 143 does not mean 143 distinct scholarly works:

| Component | Live count | Audit result |
|---|---:|---|
| Records parsed from `assets/cv/references.bib` | 141 | Primary source used by the live browser code |
| Fiction entries appended from `content/writing.md` | 2 | Literary works, not scholarly publications |
| Rendered total | 143 | Current public total |
| Exact duplicate scholarly rows within the BibTeX | 3 | ELMA, galmask, and SpectralUnmix each appear twice |
| Unique scholarly works represented after exact deduplication | 138 | No work removed; duplicate displays collapsed |

Live BibTeX categories before normalisation:

| Type | Records |
|---|---:|
| Paper | 103 |
| Software | 12 |
| Report | 15 |
| Proceeding | 6 |
| Book chapter | 3 |
| Catalogue | 1 |
| Book | 1 |
| **Total BibTeX rows** | **141** |

### Proposed record

| Comparison | Count |
|---|---:|
| Unique scholarly works retained from the live bibliography | 138 |
| Newly added scholarly works | 2 |
| Scholarly works removed | 0 |
| **Proposed complete scholarly record** | **140** |

The proposed page therefore contains **140 unique scholarly records**. Its total is numerically lower than the current rendered total of 143 because three duplicate rows are collapsed and two fiction entries move to Writing & Ideas; two public preprints with released packages are then added. No scholarly work disappears.

### Publication-preservation contract

| Existing capability or record class | Requirement for the redesign |
|---|---|
| Complete chronological list | Render all 140 canonical scholarly records on Rafael's site, newest first; filtering must never be required to establish that the full list exists. |
| Refereed papers | Preserve every refereed paper currently represented. A journal article remains the principal row when a preprint also exists. |
| Books and book chapters | Preserve the book and all three current scholarly chapter records. |
| Proceedings and other outputs | Preserve the six proceedings records, 15 reports, catalogue, software records, and other distinct scholarly outputs. Repeated report titles are not merged without identifier-level evidence. |
| Bibliographic detail | Preserve the source author list, year, journal or publisher, volume, issue, page range or article number, DOI, ADS link, and arXiv link wherever present. |
| BibTeX | Retain BibTeX as the source of truth and add a direct download of the same canonical file. |
| Search and filters | Preserve working search and current categories; add All, Proceedings, Preprints, and First-author views without duplicating records. |
| Historical breadth | Retain work outside the curated four-programme narrative and outside the nine Selected Contributions. |
| External indexes | Keep ADS, ORCID, and Google Scholar links as complements to, not substitutes for, the locally rendered list. |

### Newly added

1. **RadialPaths: Radial profiles in multi-centred astronomical structures** — 2026 preprint and released package; [arXiv:2608.26326](https://arxiv.org/abs/2608.26326).
2. **The Hidden Geometry of Astrophysical Spectra: Path-Signatures of Line Profiles** — 2026 preprint with the released `spectropath` package; [arXiv:2606.27432](https://arxiv.org/abs/2606.27432).

### Duplicate and inconsistent records

| Record | Current inconsistency | Canonical treatment |
|---|---|---|
| ELMA | Two `@article{deLima_2026}` entries have the same DOI, title, authors, year, volume, issue, and article number; only the journal abbreviation differs. | Keep one journal record with DOI `10.3847/2515-5172/ae7d2d`. |
| galmask | `@software{galmask2022}` and `@article{2022arXiv2206.06787}` describe the same RNAAS paper and DOI. | Keep one display record with paper and software facets, plus DOI, ADS, arXiv, repository, documentation, and archive links. |
| SpectralUnmix | `@software{deSouza_2026rnaas}` and `@article{deSouza_2026rnaasb}` have the same RNAAS title and DOI. | Keep one display record with paper and software facets and all available links. |
| SAGUI | The JSON fallback retains the preprint title and arXiv venue, while the BibTeX has the published MNRAS record. | Use the MNRAS article as principal; retain arXiv as a secondary link. |
| JSON fallback | `content/publications.json` contains 137 rows, four fewer than the 141-row BibTeX, and is not synchronized with the deployed list. | Regenerate it from the canonical source during the build or remove it as an independently maintained bibliography. |
| LaTeX display | The current lightweight browser conversion corrupts some accents, formatting commands, and mathematical reaction notation. | Parse BibTeX with a Unicode-aware normalisation step and test names, titles, and formulae against the source. |
| Repeated TNS titles | Reports with the same generic title can look duplicated, but their TNS identifiers, objects, or report dates differ. | Preserve distinct reports unless DOI, ADS bibcode, or another stable identifier proves identity. |

The fallback differs from the current BibTeX through five BibTeX-side rows—Riffel et al. (2026), Lightstack (2026), two ELMA rows, and the published SAGUI record—while retaining one stale SAGUI preprint-style row. This is a four-row net difference, not evidence that the live page has fewer records: the browser loads BibTeX first.

### Version and source-of-truth rules

1. `assets/cv/references.bib` remains the sole hand-maintained bibliography.
2. Derived JSON, indexes, filter facets, counts, and BibTeX downloads are generated from that source; no publication is copied by hand into another page.
3. A stable identifier establishes record identity in this order: DOI, ADS bibcode, arXiv identifier, ISBN, ASCL identifier, then a normalised title–author–year key.
4. A published journal article supersedes an arXiv-only display record. The arXiv URL remains available on the canonical journal row.
5. A scholarly paper and its genuinely distinct ASCL or archived software release remain separate when they have different identifiers. One object does not become two rows merely because it belongs to two filters.
6. Type filters are facets and may be non-exclusive. The visible all-record count is the count of unique works, not the sum of facet counts.
7. The chronological list remains on Rafael's website. ADS, ORCID, and Google Scholar are verification and discovery routes, not replacements for the local record.
8. Existing search and filtering remain. Add an All filter, an explicit Proceedings filter, a first-author view, and a direct BibTeX download.
9. Fiction moves to Writing & Ideas. Books and scholarly book chapters remain in Publications.
10. The three current arXiv-only scholarly records remain unless a journal version is verified. Journal-status resolution is repeated immediately before launch.

## 6. Software identity decisions

The complete Software Atlas retains the 18 published/released packages, six research systems or companion-code projects, and one project in development recorded in the preceding specification. RadialPaths and spectropath remain classified as **preprint and released package, 2026**. SCONCE uses its official mark.

The final identity rule is simpler than the concept-stage rule:

- Preserve official project marks without redrawing, recolouring, cropping them into uniform badges, or forcing a common aspect ratio.
- Use clean typography when no established mark exists.
- A derived glyph may be considered only when the method supplies a precise visual object and Rafael separately approves that asset. No such proposed glyph appears in the first implementation.
- Remove all text that calls attention to provisional glyphs. Design-review status does not belong on the public site.
- Never generate generic neural-network, sparkle, robot, circuit, commercial, or AI-style logos.

The homepage selection is now **DRACULA, SCONCE-SCMS, CAPIVARA, SAGUI, PowerSpectR, and Lightstack**. All six have authentic project marks. The complete atlas uses typography for ELMA, SpectralUnmix, qrpca, galmask, Yonder, LOGIT, cosmoabc, AMADA, CosmoPhotoz, RadialPaths, spectropath, ActSNClass, graph_clustering, ridges, ELEPHANT, the Fink kilonova module, and SpaxNMF unless an official mark is supplied and verified.

## 7. Provenance table for every visible image in the approved concepts

The three visual languages remain distinct:

1. original astronomical or artistic imagery carries personal identity;
2. scientific figures provide evidence for a stated result;
3. software and project marks identify built research infrastructure.

The site's typography, spacing, captions, and status labels provide the common frame. Scientific figures are never used as decoration, and project identities are never redrawn merely to make the catalogue look uniform.

Repeated uses of the same asset across the homepage, Research, Selected Contributions, and Software Atlas are consolidated below. Typographic project names, rules, arrows, and status dots are interface elements rather than image assets.

| Visible image or mark | Visible in concept | Classification | Provenance | Production decision |
|---|---|---|---|---|
| Nebula contour field | Homepage hero | Site-owner-supplied original-site artistic imagery | `assets/images/backgrounds/home-nebula-contours.jpg`; added and selected as the homepage background by Rafael S. de Souza in project commit `8e1797b432fabfd555ee6edb3603ca6f9a074ebd` (`new background`, 21 June 2026). | **Keep** as personal identity, never as scientific evidence. The project record establishes approval for use on this site; no new astronomical artwork is generated. |
| *Bayesian Models for Astrophysical Data* cover | Homepage; Selected Contributions | Book cover | `assets/images/book-cover-bayesian-models.jpg`; official Cambridge University Press cover for the 2017 book. | **Keep** at publication-cover proportions with book and award context. |
| Sagittarius-arm coordinate map | Homepage; Selected Contributions | Scientific figure | `assets/images/research/milky-way.png`; Kuhn et al. (2021), *A&A* 651, L10, DOI `10.1051/0004-6361/202141198`, Fig. 3 or its supplied panel/crop. | **Keep** with paper citation, figure number, and a caption identifying heliocentric coordinates, YSO groups, spiral-arm references, and the fitted high-pitch-angle structure. |
| CAPIVARA galaxy and segmentation mosaic | Homepage; Research; Selected Contributions | Scientific figure | CAPIVARA project asset `research/capivara2/assets/mosaic_segmented.png`; de Souza et al. (2025), *MNRAS*, DOI `10.1093/mnras/staf688`, top and middle rows of Fig. 2. | **Keep** with exact paper and panel attribution. Use the project/paper source rather than a screenshot from the concept. |
| Type II supernova graph | Research | Scientific figure | Current website asset `assets/images/research/spectral-classification.png`; associated with de Souza et al. (2023), *Astronomy and Computing* 44, 100715. The stored vertical graph has not yet been matched conclusively to a numbered published panel. | **Hold**. Replace with an exact permitted crop from the published Fig. 4, 5, or 6, or document the stored asset's original figure/version before use. |
| COIN 2024 mark | Homepage; Leadership & Community | Project/community mark | `assets/images/coin-2024.png`; raster export of the preserved `assets/images/coin-2024-vector.pdf`, copied from `Serrapilheira/cv/overleaf_cv_executivo/assets/candidate/COIN_2024_Logo_blue_vector.pdf`. | **Keep unchanged** as the current COIN identity. Do not treat it as a scientific figure. The previous `assets/images/coin.png` remains archived but is not displayed. |
| CAPIVARA capybara mark | Homepage; Software Atlas | Existing project mark | `assets/images/software/capivara-logo.png`; matches the CAPIVARA project repository identity. | **Keep unchanged**. |
| SAGUI monkey mark | Homepage; Software Atlas | Existing project mark | `assets/images/software/sagui-logo.png`; project-repository identity. | **Keep unchanged**; use the highest-resolution official source available. |
| PowerSpectR mark | Homepage; Software Atlas | Existing project mark | `design/reference-assets/software-marks/powerspectr-official.png`; obtained from the public project repository. | **Keep unchanged** and replace the earlier website-made placeholder. |
| SCONCE-SCMS wordmark and spherical-ridge symbol | Homepage; Software Atlas | Existing project mark | `design/reference-assets/software-marks/sconce-official.png`; official SCONCE project identity. | **Keep unchanged**. This corrects the earlier concept-stage placeholder. |
| Lightstack stacked-image mark | Software Atlas; added to final homepage selection | Existing project mark | `design/reference-assets/software-marks/lightstack-official.png`; public project-repository asset. | **Keep unchanged**, including its monochrome treatment. |
| GalMOSS mark | Software Atlas | Existing project mark | `design/reference-assets/software-marks/galmoss-official.jpg`; public GalMOSS project asset. | **Keep unchanged**; retain its original proportions and background. |
| DRACULA wordmark | Software Atlas; added to final homepage selection | Existing project mark | `design/reference-assets/software-marks/dracula-official.png`; public DRACULA project identity. | **Keep unchanged**. |
| RESSPECT mark | Software Atlas | Existing research-system mark | `design/reference-assets/software-marks/resspect-official.png`; public RESSPECT project identity. | **Keep unchanged**. |
| SpectralUnmix component-curve drawing | Homepage; Software Atlas | Newly invented concept glyph | Website/concept illustration; no project-owned mark was found. | **Remove** from production. Use the project name in clean typography. |
| cosmoabc particle/galaxy drawing | Homepage | Newly invented concept glyph | Website/concept illustration; no project-owned mark was found. | **Remove** from production and from the homepage mark strip. Use typography in the full atlas. |
| ELMA ellipse glyph | Software Atlas | Newly invented concept glyph | Concept-stage ellipse-and-major-axis drawing; not an official project mark. | **Remove** from the first production pass. Use typography. |
| qrpca QR-basis glyph | Software Atlas | Newly invented concept glyph | Concept-stage letter/basis drawing; not an official project mark. | **Remove** from the first production pass. Use typography. |
| LOGIT logistic-curve glyph | Software Atlas | Newly invented concept glyph | Concept-stage curve drawing; not an official package mark. | **Remove** from the first production pass. Use typography. |

### Audited assets not approved for a visible slot

| Asset | Classification and provenance status | Decision |
|---|---|---|
| `assets/images/research/cosmic-structure.png` | Scientific-looking ridge map; likely related to the DES ridge paper, but the exact paper panel and crop are unresolved. | Do not use until matched to a source figure and caption. |
| `assets/images/research/time-domain.png` | Scientific-looking transient plot; objects, paper, and figure version unresolved. | Do not use. |
| `assets/images/research/spatial-structure.png` | Scientific-looking image; plotted quantities and source unresolved. | Do not use. |
| `assets/images/research/spicy.png` | Existing project mark, not a catalogue map or scientific result. | Use only as project identity if its official status is confirmed. |
| `assets/images/research/follow-up.png` | Illustration or project graphic with unresolved source and meaning. | Do not use. |
| `assets/images/rafael-de-souza.jpg` | Personal portrait from the existing site. | Reserve for About or a short biographical section after confirming image rights; do not place it in the hero. |
| `assets/images/writing/cover.jpg`, `cover2.jpg` | Literary cover images from the existing site. | Hold until each cover is matched to a resolved title and URL. |
| `assets/images/software/capivara.svg`, `sagui.svg`, `powerspectr.svg`, `spectralunmix.svg` | Website-created uniform placeholders. | Do not present as official marks. Authentic raster marks supersede the first three; SpectralUnmix uses typography. |
| `assets/images/institutions/*.svg` | Generic site-made institution graphics. | Retire from the career presentation. |
| `assets/images/backgrounds/likelihood-manifold.svg` | Invented decorative geometry that could be mistaken for evidence. | Retire from the redesign. |
| `CV_rafael_2026/photo.jpg` | Unrelated illustrated portrait with no valid site provenance. | Retire from the redesign. |

The concept PNGs are layout references only. No text, figure, or logo will be rasterised from them into production.

## 8. Final implementation gates

Implementation may begin only after this review is approved. Before any production edit:

1. Preserve `assets/cv/references.bib` as the single bibliographic source and make a recoverable copy before normalisation.
2. Add RadialPaths and spectropath to that source with complete authors, venue/status, arXiv, repository, and documentation metadata.
3. Collapse only the three identifier-proven duplicate displays; retain the canonical information and all links.
4. Generate the fallback data, filters, counts, and BibTeX download from the canonical bibliography.
5. Compare the rendered 140-record list against the 138 retained unique live works plus the two additions. Any difference blocks release.
6. Verify the three arXiv-only records once more for published journal versions.
7. Test every author list, accent, formula, DOI, ADS link, arXiv link, volume, page range, and article number after parsing.
8. Use only the assets marked **Keep**. Resolve every **Hold** item before it becomes visible.
9. Use authentic software marks without visual homogenisation; use typography for every project without an approved mark.
10. Keep Current Work visually and verbally separate from established results.
11. Do not introduce UFRGS, an ISI Chair title, unresolved literary identities, unsupported people statuses, or unverified leadership claims.
12. Recheck current appointments and software statuses immediately before launch.

No publication, image, role, or project status may be inferred past an unresolved source during implementation.

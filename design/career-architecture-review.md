# Career architecture review

Status: concept for review. No production pages have been changed.

## Editorial principle

The site should not make one recent methodological problem stand for the whole career. It should use two related structures:

1. four research programmes organised by recurring inferential problems;
2. seven astronomical domains organised by the physical systems and observations to which the work has contributed.

The first structure makes the career intelligible. The second preserves its breadth. Historical contributions, current work, leadership, mentorship, software and writing remain distinct layers rather than being forced into either research taxonomy.

## Homepage information architecture

### 1. Hero

**Content:** name, the professional description “Astrophysicist”, a broad statement of the research, current appointments, and links to Research, Publications and the CV.

**Why it exists:** a first-time visitor should understand the scientific identity before encountering a project, metric or recent theme.

**Visual:** `home-nebula-contours.jpg`, used as **artistic identity** in a bounded image field. It supplies continuity with the original site and does not claim to document a scientific result.

### 2. Research programmes

**Content:** four concise entries for statistical inference; incomplete and heterogeneous surveys; representations; and geometry/resolved structure.

**Why it exists:** recurring methodological questions explain how work in otherwise different astronomical fields belongs to one research career.

**Visual:** typography only. The programme names and descriptions carry the structure; no generic diagrams are needed.

### 3. Selected contributions

**Content:** four homepage previews spanning the career, with the complete curated set on a dedicated page. The proposed homepage set is the 2015 generalized-linear-model series, the 2017 Bayesian book, the 2020–2021 Galactic-structure programme built from SPICY, and CAPIVARA in 2025.

**Why it exists:** visitors need concrete evidence of what changed because of the work, not only a list of interests.

**Visuals:** the book cover is **functional imagery**; the Sagittarius structure plot and CAPIVARA segmentation mosaic are **scientific evidence** and appear only with those contributions. The GLM contribution is text-only because the repository does not contain a figure that is both strong and securely sourced for that series.

### 4. Astronomical domains

**Content:** a compact linked index of the physical fields described under “Astronomical domains” below.

**Why it exists:** the method-led taxonomy alone would conceal the range from the early Universe and nuclear reactions to transients, Galactic structure and resolved galaxies.

**Visual:** typography only. Representative papers, not decorative images, establish the range.

### 5. Current directions

**Content:** partial identification under incomplete calibration; representations that retain parameter-relevant variation; path-based descriptions of resolved structure; and spectro-spatial segmentation of IFU and multiband data. Each item carries a status such as “in development”, “preprint” or “published method under extension”.

**Why it exists:** the emerging convergence matters, but it must not rewrite the motivations or status of earlier work.

**Visual:** no figure until a project has a result suitable for public display. A status label is evidence; an invented conceptual graphic is not.

### 6. Career, leadership and recognition

**Content:** a restrained appointment sequence; COIN as the main institution-building case; verified professional roles; and three to five externally validated awards or fellowships.

**Why it exists:** international appointments, community building and recognition are independent evidence of scientific standing and should not be buried in a PDF.

**Visuals:** the COIN mark is **functional imagery**. Appointments use a typographic chronology rather than a decorative map or generic institution cards.

### 7. People and mentorship

**Content:** a short homepage introduction and a link to current and former PhD, MSc and undergraduate researchers, grouped by status and programme.

**Why it exists:** supervision and the scientific work produced with students are part of a senior researcher’s record, not CV metadata.

**Visual:** text first. Portraits should be added only with permission and reliable files.

### 8. Writing and ideas

**Content:** the existing fiction, followed separately by verified essays or public writing on science when available.

**Why it exists:** literary work is part of Rafael’s intellectual identity but does not belong in the scholarly publication taxonomy.

**Visuals:** the two existing story covers are **functional imagery** attached to the corresponding works.

### 9. Authoritative record and contact

**Content:** one concise footer linking to the complete publication record, ADS, ORCID, Google Scholar, GitHub, downloadable CV, affiliations and contact.

**Why it exists:** the curated pages require direct routes to the complete records from which claims can be checked.

**Visual:** no decorative imagery.

## Full-site sitemap

- **Home** — the hierarchy above, edited to avoid duplicating full subpages.
- **Research** — four methodological essays; current directions; astronomical domains; explicit status and source notes.
- **Selected Contributions** — a career-spanning, source-linked account of what was introduced, demonstrated, discovered, enabled or synthesised.
- **Publications** — the complete scholarly record, generated from one structured source and filterable by papers, books, chapters, proceedings, software and reports. Fiction is excluded.
- **Software** — maintained tools first, with purpose, status, paper, repository, documentation and contributors; archived tools clearly marked.
- **People & Mentorship** — current students, former students, co-supervised researchers and programme collaborators. Alumni destinations appear only when verified.
- **Leadership & Community** — COIN as a substantive case study; professional scientific leadership; survey and programme roles; editorial/service work where it is genuinely selective.
  - **COIN** — retain the existing dedicated route, but rewrite it around purpose, residence programmes, outputs, training and international participation rather than generic promotional copy.
- **Career & Recognition** — current appointments, former positions, education, selected funding, honours and fellowships. This page links to the full CV.
- **Writing & Ideas** — fiction; science and public writing; future poetry or essays only when real material is supplied.
- **About & Contact** — short biography, portrait, affiliations, invitation/contact information and authoritative profile links.

The primary navigation can remain compact: Research, Contributions, Publications, Software, People, and About. Leadership, Career, Writing and Contact can be reached through the About menu or a secondary navigation region without hiding them from the homepage.

## Research taxonomy

### A. Statistical inference from complex astronomical data

This programme covers observation-specific likelihoods, generalized and hierarchical models, simulation-based inference, population inference and uncertainty propagation. Established work includes the GLM series for binary, positive and count data; COSMOABC; hierarchical models of galaxy populations; the Bayesian modelling book; and Bayesian thermonuclear reaction rates. The astronomical problems include first-star formation, photometric redshifts, globular-cluster populations, cosmological cluster counts and Big Bang nucleosynthesis.

### B. Learning from heterogeneous and incomplete surveys

This programme asks what a calibration or training sample permits one to infer about a target survey. Established work includes the Teddy and Happy photometric-redshift benchmarks, active learning for spectroscopic follow-up, RESSPECT and survey-specific validation. Current work develops partial-identification analyses for target populations that are not fully supported by the spectroscopic sample. That work should be labelled “in development” until a public manuscript or result exists.

### C. Representations of spectra, images and populations

This programme studies how high-dimensional observations are converted into coordinates, clusters or components used by later analyses. Established work includes robust and kernel PCA, DRACULA’s low-dimensional organisation of Type Ia supernova spectra, graph-based ordering of Type II spectra, image-domain adaptation, denoising and matrix factorisation. SpectralUnmix and PowerSpectR belong here as 2026 outputs; representation completion belongs under current work and must not be presented as an established result.

### D. Geometry and resolved astronomical structure

This programme treats spatial ordering as part of the observation. Published work includes statistical reconstruction of IFU fields, curvilinear ridges in weak-lensing maps, SCONCE on spherical and conic geometries, and CAPIVARA’s spectral segmentation of IFU data cubes. SAGUI extends spectro-spatial segmentation to multiband images and should retain its exact publication status. Path morphology, radial paths and related ordered descriptors remain current research until their results are published.

Software and community building cut across all four programmes. They are not a fifth scientific programme.

## Astronomical domains

The public label should be **Astronomical domains** rather than a claim of polymathy. Each entry links to two or three representative works.

1. **Early Universe and cosmology** — primordial magnetic fields; Population III stars and gamma-ray bursts; reionisation; likelihood-free cosmological inference.
2. **Galactic structure and star formation** — open clusters, the SPICY young-stellar-object catalogue, the Sagittarius-arm structure, stellar trajectories and eruptive young stars.
3. **Galaxies and stellar systems** — galaxy environments and quenching, globular and nuclear clusters, UV-upturn populations, galaxy morphology and stripping.
4. **Time-domain and multimessenger astronomy** — Type Ia and Type II supernovae, spectroscopic follow-up, Fink alert streams, kilonovae, tidal-disruption events and GLADE/GLADE+.
5. **Large-scale structure and weak lensing** — DES mass-map ridges, cosmic troughs and spherical/conic cosmic-web finding.
6. **Spectroscopy and resolved galaxies** — spectral representations, IFU field reconstruction, CAPIVARA, SAGUI and resolved analyses of jellyfish galaxies.
7. **Nuclear astrophysics** — hierarchical Bayesian evaluations of Big Bang nucleosynthesis and stellar thermonuclear reaction rates.

Astrostatistics, machine learning and survey methodology are the means by which these domains are connected; listing them again as astronomical fields would mix the two axes.

## Proposed Selected Contributions

The dedicated page should group contributions by scientific purpose rather than imitate a CV chronology. Dates remain visible so that the trajectory can still be read.

### Observation-specific statistical models

1. **Generalized linear models in astronomy (2015).** The three-paper series set out binomial, gamma and Bayesian negative-binomial models for astronomical response variables that ordinary least squares does not describe. The applications quantified star formation in primordial minihaloes, derived an interpretable photometric-redshift relation and modelled overdispersed globular-cluster counts. The third paper received the 2016 International Astrostatistics Association award for an outstanding publication in astrostatistics. **Attribution:** Rafael was first author; the work was collaborative.

2. **COSMOABC (2015).** The COIN collaboration released a population-Monte-Carlo approximate-Bayesian-computation sampler that accepts external simulators, priors and distance functions. Coupled to NumCosmo, it recovered cosmological constraints from simulated cluster counts without evaluating a likelihood. This contribution established an early simulator-driven inference strand in the career. **Attribution:** collaborative paper and software; do not describe it as a sole-author invention.

3. **Bayesian Models for Astrophysical Data (2017).** The 408-page Cambridge volume provided complete R/JAGS and Python/Stan analyses of generalized, hierarchical and likelihood-free models. It won the 2018 PROSE category award for Cosmology & Astronomy. The contribution is synthesis and usable exposition, not a new astronomical measurement. **Attribution:** co-authored with Joseph M. Hilbe and Emille E. O. Ishida.

4. **Hierarchical Bayesian thermonuclear rates (2019–2022).** The programme embedded nuclear-reaction models in hierarchical analyses that treat statistical errors, experiment-specific normalisations and other systematic uncertainties jointly. The 2020 first-author evaluation of the 7Be(n,p)7Li reaction found 1.5–2.0 per cent rate uncertainties below 1 GK and showed that commonly used rates had overly optimistic uncertainty estimates. Later papers extended the treatment to reactions governing primordial deuterium and oxygen isotopic ratios. **Attribution:** Rafael led the 2020 paper and collaborated on the subsequent analyses.

### Learning and representation under survey conditions

5. **DRACULA and Type Ia spectral diversity (2016).** Transfer learning, nonlinear dimensionality reduction and clustering organised spectra from irregularly sampled epochs into a low-dimensional representation. The analysis found that established spectroscopic subtypes occupied extremes of largely continuous variation and released the pipeline as the DRACULA package. This is an early, published representation-learning contribution; it should not be rewritten in the vocabulary of current representation-completion work. **Attribution:** collaborative paper; Rafael was a contributing author.

6. **Realistic validation of photometric redshifts (2017).** The Teddy and Happy catalogues separated incomplete colour–magnitude coverage from changes in photometric-error distributions. The experiments showed that most machine-learning estimators failed outside spectroscopic support and that all tested methods failed when coverage and error mismatch occurred together. The contribution was a controlled public benchmark for deciding whether a validation sample matches the survey use case. **Attribution:** collaborative paper.

7. **Active learning and RESSPECT (2019–2020).** This work treated spectroscopic follow-up as sequential label acquisition with an evolving candidate pool, object-dependent observing costs and finite telescope budgets. In the realistic RESSPECT experiments, uncertainty sampling outperformed random selection, while more elaborate batch strategies produced no significant improvement. The contribution joined statistical selection with the operational constraints of transient surveys. **Attribution:** collaborative COIN programme.

8. **Graph-based classification of Type II supernova spectra (2023).** A graph-based heuristic ordered 1,595 spectra of 145 Type II supernovae by spectral similarity, identified outliers and exposed continuous spectral variation: rapid evolution near maximum light and greater homogeneity near the plateau end. The contribution was a representation of spectral diversity that remained inspectable in the original observations. **Attribution:** Rafael was first author.

### Structure in astronomical populations and images

9. **SPICY and a Sagittarius-arm structure (2021).** A tailored classifier produced roughly 120,000 candidate young stellar objects across 613 square degrees of the inner Galactic midplane. Gaia astrometry and molecular-cloud velocities for a subset then identified 25 star-forming regions in a narrow structure about 1 kpc long with a pitch angle of about 56 degrees. Together, the papers show how a statistical catalogue enabled a new measurement of Galactic structure. **Attribution:** collaborative work; do not imply sole discovery.

10. **Ridges in DES and SCONCE (2021–2022).** The first study adapted subspace-constrained mean shift to spherical weak-lensing maps, tested ridge recovery under noise and produced a catalogue of curvilinear structure in DES Year 1 mass maps. SCONCE subsequently generalised the implementation to spherical and conic geometries. The contribution is a geometrically appropriate summary of projected large-scale structure. **Attribution:** collaborative work.

11. **CAPIVARA (2025).** CAPIVARA groups IFU spaxels by spectral similarity rather than imposing a morphological decomposition or relying on signal-to-noise binning alone. In five MaNGA galaxies it recovered regions coherent in continuum and emission-line properties and produced aggregated spectra for physical analysis. The method established the spectro-spatial segmentation programme now being extended to multiband images. **Attribution:** Rafael was first author.

For a shorter public page, retain items 1–4, 6–9 and 11; place DRACULA and DES/SCONCE in an “additional milestones” list. The homepage should preview only four contributions and link to the complete set.

## Leadership, recognition and career structure

### Leadership & Community

1. **COIN case study:** founding in 2014; the scientific purpose of the network; the residence-program model; selected papers and software that arose from it; training and international participation. COIN’s own site verifies that Rafael currently co-leads the initiative. The CV’s “80+ researchers” can be used only after it is reconciled with a current roster or archived source.
2. **Professional leadership:** the University of Hertfordshire profile supports “former Vice-President of the International Astrostatistics Association”. The current ISI page supports committee membership from 2021, but not the site’s current claim that Rafael is Chair; display only the verified role until the discrepancy is resolved.
3. **Survey and programme roles:** Rubin/LSST, Fink, J-PAS and editorial roles should be listed only after an exact role and date are located. Project participation alone should not be promoted to leadership.
4. **Scientific service:** selective programme and editorial work can follow leadership, while journal refereeing remains in the full CV.

### Recognition

Use a plain dated list with one line of context per item:

- **2018 — PROSE Award, Cosmology & Astronomy.** Externally verified for *Bayesian Models for Astrophysical Data*.
- **2016 — International Astrostatistics Association Outstanding Publication in Astrostatistics, Postdoc Award.** Externally verified for the Bayesian negative-binomial GLM paper.
- **2017 — Marie Skłodowska-Curie/AstroFit Fellowship.** Present in the CV; retain in the concept but verify against the programme archive before publication.
- **2022 — Shanghai Astronomical Observatory Excellence in Research Award.** Present in the CV; verify institutionally before publication.
- **2014 — Korea Astronomy and Space Science Institute Excellence in Research Award.** Present in the CV; verify institutionally before publication.

Research funding should be a separate list of selected PI awards. Do not display a total until currencies, award values and the treatment of visiting funds are normalised in one source of truth.

### International trajectory

Use a linear chronology, not a map:

- 2010–2011 — Kavli IPMU, Japan, Postdoctoral Fellow.
- 2012–2014 — KASI, South Korea, Postdoctoral Fellow.
- 2014–2016 — Eötvös Loránd University, Hungary, Postdoctoral Fellow.
- 2017–2020 — UNC Chapel Hill, United States, Postdoctoral Fellow.
- 2020–2022 — Shanghai Astronomical Observatory, China, Associate Professor.
- 2023–present — University of Hertfordshire, United Kingdom, Senior Lecturer (the public Herts profile confirms the affiliation; a 2025 author biography supports the rank).
- 2024–2026 — UNC Chapel Hill, United States, external Associate Professor according to the Herts institutional profile; the local CV uses “Adjunct Associate Professor”. Resolve the preferred public title.
- 2025–present — UFRGS, Brazil, Visiting Scholar according to the local CV. Obtain a public institutional source before launch.

Current appointments must appear first and be visually separated from former positions.

## People & Mentorship structure

- **Current PhD researchers:** Niranjana Prashanth, Suresh Parekh, Andressa Wille, Simran Singh and Mittal Shree Hari, with projects and institutions as recorded in the current CV.
- **Former PhD researcher:** Maria Luiza Dantas. Add her present position only after verification.
- **MSc researchers:** Mi Chen, Quanfeng Xu and Zihao Mu, grouped as former unless a current status is supplied.
- **Undergraduate researchers:** Bruna Lima as current; Yash Gondhalekar, Peng Chen, Renan dos Santos Barbosa, Tan Hong Kiat and Yeoh Jun Kai as former according to the CV dates.
- **Programme collaborators:** show people only within a named project or programme and only after the role can be stated precisely.

The page should explain the scientific problem attached to each supervision rather than present a wall of names. It should not manufacture alumni outcomes from web searches.

## Writing & Ideas structure

1. **Fiction:** *Beyond the Rainbow*; *The City of Endless Time*; and *A Journey into the Void* as recorded in the CV. The repository’s newer “Beyond the Veil” title reuses the same Wattpad story identifier as *A Journey into the Void*; resolve the final title and date before publication.
2. **Science and public writing:** *A Brief History of Inference* and any verified essays, interviews or public pieces that Rafael wants to retain.
3. **Poetry:** do not show this category until actual works are supplied.
4. **Notes or broader reflections:** do not create an empty category merely to imply range.

The fiction covers are functional images. The page may use the nebula palette more freely than the research pages, but it should retain the same typography and navigation.

## Original visual asset inventory

### Preserve

| Asset | Classification | Recommendation |
|---|---|---|
| `assets/images/backgrounds/home-nebula-contours.jpg` | Artistic identity | Preserve as the principal atmospheric asset on the homepage and optionally as a small motif on Writing. Never caption it as scientific evidence. |
| `assets/images/rafael-de-souza.jpg` | Personal/artistic portrait | Preserve for About or a lower homepage biography. It is distinctive but should not compete with the scientific statement in the hero. |
| `assets/images/book-cover-bayesian-models.jpg` | Functional imagery | Preserve with the book contribution, Publications and Recognition. |
| `assets/images/coin-2024.png` | Functional imagery | Current COIN 2024 mark. Preserve on Leadership/COIN and use at modest scale. |
| `assets/images/software/capivara-logo.png`, `sagui-logo.png` and the four software SVG marks | Functional imagery | Preserve on Software and on project-specific links; do not use as scientific figures. |
| `assets/images/writing/cover.jpg`, `cover2.jpg` | Functional imagery | Preserve with their exact stories after the title/link discrepancy is resolved. |

### Scientific-only

| Asset | Claim it may support | Recommendation |
|---|---|---|
| `assets/images/research/cosmic-structure.png` | Ridge structure in DES weak-lensing maps | Use only with the DES ridges paper after the panel and source are confirmed. |
| `assets/images/research/milky-way.png` | The high-pitch-angle Sagittarius-arm structure | Preserve for that result with an explicit paper citation. |
| `assets/images/research/spectral-classification.png` | Graph organisation of Type II supernova spectra | Preserve for the 2023 paper with an explicit citation. |
| `assets/images/research/time-domain.png` | Light-curve comparison involving AT2022zod and related events | Use only on the exact transient result after confirming the figure source/version. |
| `assets/images/research/spatial-structure.png` | Unresolved from the file alone | Do not use until its paper, panel and plotted quantities are documented; its legibility is also weak at web scale. |
| CAPIVARA `mosaic_segmented.png` in the local CAPIVARA repository | MaNGA galaxies and CAPIVARA segmentation maps | Add to V2 only with de Souza et al. (2025) attribution. It is not currently an asset in this website repository. |

### Adapt or restrict

| Asset | Classification | Recommendation |
|---|---|---|
| `assets/images/research/spicy.png` | Project mark, not a catalogue map | Rename/reclassify as functional imagery and use only for SPICY navigation. |
| `assets/images/research/follow-up.png` | Illustrative/project mark, not an active-learning workflow | Remove from scientific-evidence slots. It may be retained only if its origin and project meaning are documented. |
| `assets/images/institutions/*.svg` | Generic institution cards created for the current site | Retire from the career presentation. They are not official marks and turn the international trajectory into decoration. |
| `assets/images/favicon.png` | Personal novelty avatar | Replace in a later identity pass with a simple mark derived from approved artwork; retain untouched during concept review. |
| `CV_rafael_2026/doi.svg`, `wattpad.svg` | CV-only functional icons | Keep inside the CV source. They are service marks, not part of the site’s visual language. |
| `CV_rafael_2026/newCOIN.png` | Legacy functional image | Keep for the CV build. The website uses the newer 2024 blue vector mark exported as `assets/images/coin-2024.png`. |

### Retire from V2

| Asset | Reason |
|---|---|
| `assets/images/backgrounds/likelihood-manifold.svg` | Decorative invented geometry that can be mistaken for a scientific visual. |
| `CV_rafael_2026/photo.jpg` | Appears unrelated to Rafael and should not be used without provenance. |

No asset should be deleted during concept review.

## Revised homepage copy

### Hero

**Rafael S. de Souza**  
**Astrophysicist**

Statistical inference for astronomical observations whose likelihoods, calibration samples, representations, or spatial structure limit what can be learned about the underlying physics.

The work connects problems in primordial star formation, cosmology, Galactic structure, galaxies, transients, and nuclear reaction rates.

Current appointments: Senior Lecturer, University of Hertfordshire; Adjunct Associate Professor, UNC Chapel Hill.

### Research

**Research programmes**

**Statistical inference from complex astronomical data**  
Observation-specific likelihoods, hierarchical models and simulation-based methods for cosmology, galaxy populations and nuclear astrophysics.

**Learning from heterogeneous and incomplete surveys**  
Calibration, validation and follow-up when the spectroscopic or labelled sample differs from the population to which the result will be applied.

**Representations of spectra, images and populations**  
Low-dimensional, graph and matrix representations that retain the variation needed for classification and physical analysis.

**Geometry and resolved astronomical structure**  
Methods that use the spatial and spectral ordering of galaxies, IFU cubes and cosmological maps rather than reducing them immediately to global descriptors.

### Selected contributions

**Selected contributions**

The selected works identify changes in statistical practice, data products or astronomical measurements. The complete publication record remains available separately.

- **Generalized linear models in astronomy, 2015** — Matched binary, positive and overdispersed count responses to statistical models that made the relevant astronomical effects directly estimable.
- **Bayesian Models for Astrophysical Data, 2017** — Co-authored a complete practical treatment of generalized, hierarchical and likelihood-free models; winner of the 2018 PROSE Award in Cosmology & Astronomy.
- **SPICY and the Sagittarius arm, 2021** — A catalogue of roughly 120,000 candidate young stellar objects enabled the identification of a narrow, high-pitch-angle star-forming structure in the Milky Way.
- **CAPIVARA, 2025** — Introduced spectral segmentation of IFU data cubes and demonstrated it on five MaNGA galaxies.

### Astronomical domains

**Astronomical domains**

The methods have been developed and tested in the early Universe and cosmology; Galactic structure and star formation; galaxies and stellar systems; time-domain and multimessenger astronomy; large-scale structure and weak lensing; spectroscopy and resolved galaxies; and nuclear astrophysics. Each domain links to representative papers and projects.

### Current directions

**Current directions**

- **Incomplete calibration samples — in development.** Determine bounds on population quantities when the spectroscopic sample does not support every target population.
- **Representation completion — in development.** Test whether a summary built for one target retains the variation required by a later physical parameter.
- **Path-based galaxy structure — in development.** Describe ordered radial and morphological variation without imposing a fixed bulge–disc decomposition.
- **Spectro-spatial segmentation — published method under extension.** Extend the CAPIVARA analysis from IFU spectra to multiband imaging and larger samples.

### Career and community

**An international research career**  
Appointments in Japan, South Korea, Hungary, the United States, China, the United Kingdom and Brazil are shown as a dated sequence, with current roles separated from former positions.

**Leadership and community**  
Rafael founded COIN in 2014 and continues to co-lead its project-based collaborations and residence programmes in astrostatistics. Other professional roles are listed only at the level supported by current institutional sources.

**Recognition**  
Selected honours include the 2018 PROSE Award in Cosmology & Astronomy and the 2016 International Astrostatistics Association award for an outstanding publication in astrostatistics. Fellowships and institutional awards follow after source verification.

### People and writing

**People & Mentorship**  
Current and former PhD, MSc and undergraduate researchers are organised by research programme, institution and status, with the project attached to each supervision.

**Writing & Ideas**  
Fiction and writing on the history and practice of scientific inference are presented separately from the scholarly publication record.

## Source and data decisions before implementation

- Use `assets/cv/references.bib` as the scholarly source of truth only after duplicate software/paper records and repeated transient reports are given stable, distinct identifiers. Generate the Publications page and all counts from that source.
- Do not hard-code publication or funding totals on the homepage. The repository currently contains conflicting values.
- Reconcile “Senior Lecturer in Astrophysics and Astrostatistics” with the public Herts wording, “Adjunct Associate Professor” with the institutional “external Associate Professor”, and the UFRGS appointment with a public source.
- Reconcile the ISI “Chair” claim with the current ISI committee page before displaying it.
- Resolve the writing title/date/link conflict between *A Journey into the Void* and *Beyond the Veil*.
- Record a source, figure number and permitted crop for every scientific image before it is placed in a page.

## Primary evidence consulted

- University of Hertfordshire institutional profile: <https://researchprofiles.herts.ac.uk/en/persons/rafael-da-silva-de-souza/>
- COIN official site: <https://cosmostatistics-initiative.org/>
- ISI Astrostatistics Special Interest Group: <https://isi-web.org/nl/node/149>
- 2018 PROSE Award winners: <https://proseawards.com/winners/2018-award-winners/>
- 2016 IAA award record: <https://www2.ae-info.org/attach/Acad_Main/Sections/Informatics/News_Archive/Fionn%20Murtagh/IAA-2016AWARDS-14April2016-FINAL.pdf>
- GLM I: <https://www.sciencedirect.com/science/article/abs/pii/S2213133715000360>
- GLM III: <https://academic.oup.com/mnras/article/453/2/1928/1154495>
- COSMOABC: <https://arxiv.org/abs/1504.06129>
- DRACULA: <https://academic.oup.com/mnras/article/461/2/2044/2608377>
- Bayesian book: <https://www.cambridge.org/core/books/bayesian-models-for-astrophysical-data/A521B3BB3A2E1621EE1B907E87207218>
- Photometric-redshift validation: <https://academic.oup.com/mnras/article/468/4/4323/3077192>
- 7Be(n,p)7Li rate: <https://arxiv.org/abs/1912.06210>
- RESSPECT: <https://arxiv.org/abs/2010.05941>
- SPICY: <https://authors.library.caltech.edu/records/afsgs-35t81>
- Sagittarius-arm structure: <https://doi.org/10.1051/0004-6361/202141198>
- DES ridges: <https://academic.oup.com/mnras/article/500/1/859/5924474>
- Type II graph classification: <https://www.sciencedirect.com/science/article/pii/S2213133723000306>
- CAPIVARA: <https://academic.oup.com/mnras/article/539/4/3166/8120522>

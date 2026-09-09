# Final pre-implementation specification

Status: **for approval before implementation**. This document supersedes the earlier career-architecture review wherever the two differ. No production page, stylesheet, script, or content source has been changed.

## 1. Scientific and editorial position

The site presents one career through two independent scientific axes:

1. **methodological programmes**, which identify recurring inferential problems;
2. **astronomical domains**, which identify the physical systems and phenomena in which those problems arise.

Neither axis absorbs the rest of the record. Selected Contributions, Current Work, Publications, Software, Leadership & Community, Appointments, People & Mentorship, Recognition, and Writing & Ideas remain independent layers. Older work keeps the scientific question and terminology of its time; the site must not retrospectively rename it to resemble a current programme.

Software is a first-class part of the scientific record. It is built research infrastructure, not decoration and not a subsidiary of Publications.

## 2. Final sitemap

- **Home** — scientific identity; four programmes; six domains; four selected contributions; current directions; six representative software projects; leadership, appointments, recognition, people, and writing previews; authoritative links.
- **Research** — the four methodological programmes, the six astronomical domains, a representative programme–domain map, and a visibly separate Current Work section.
- **Selected Contributions** — a curated, career-spanning account of what was introduced, measured, enabled, or synthesised, with explicit attribution and primary sources.
- **Publications** — the complete scholarly record generated from one deduplicated source, filterable by publication type. Fiction is excluded.
- **Software** — the complete software atlas: formally published/released packages, research systems and companion code, and projects in development.
- **People & Mentorship** — current and former researchers grouped by stage, status, and scientific project.
- **Leadership & Community** — COIN as a substantive case; verified professional leadership; selective programme, survey, editorial, and community service.
  - **COIN** — its own route, structured around scientific purpose, residence programmes, outputs, training, and participation.
- **Career & Recognition** — current appointments, former positions, education, selected funding, honours, and fellowships, with a link to the full CV.
- **Writing & Ideas** — fiction and verified public/scientific writing, separate from Publications.
- **About & Contact** — short biography, portrait, affiliations, contact, CV, ADS, ORCID, Google Scholar, and GitHub.

Primary navigation: **Research · Contributions · Publications · Software · People · About**. Leadership, Career, Writing, and Contact remain visible on the homepage and in a secondary navigation region under About.

The canonical public domain is **rafaelsdesouza.com.br**.

## 3. Homepage section order

| Order | Section | Public content | Why it deserves homepage space |
|---:|---|---|---|
| 1 | Hero | Name, professional description, governing question, research statement, verified current roles, principal links | A first-time visitor must understand the scientific identity before encountering an individual paper or project. |
| 2 | Research programmes | Four concise method-led entries | The programmes explain the recurring questions that connect work in different astronomical fields. |
| 3 | Astronomical domains | Six physical domains with representative links | The domain index preserves the actual astrophysical range that a method-led taxonomy alone would conceal. |
| 4 | Selected Contributions | Four career-spanning previews and a route to the full curated page | Visitors need direct evidence of what changed because of the work, not only a list of interests. |
| 5 | Current directions | Four projects with status labels | Current work reveals the emerging convergence without rewriting established results or overstating unpublished claims. |
| 6 | Selected software | Six authentic or explicitly provisional project marks and a route to the full atlas | Reusable software is built scientific infrastructure and an independent form of research contribution. |
| 7 | Leadership & Community | COIN and only externally supported professional roles | Institution-building and scientific community leadership are substantive parts of a senior research record. |
| 8 | Appointments & Recognition | Current roles, a compact chronology, and two verified honours | Appointments and external recognition establish career context without turning the homepage into a CV. |
| 9 | People & Mentorship | Short introduction and route to current/former researchers | Supervision and collaborative scientific development are part of the research record rather than administrative metadata. |
| 10 | Writing & Ideas | Fiction plus verified writing on scientific inference | Literary and public writing belong to Rafael's intellectual identity but not to the scholarly publication taxonomy. |
| 11 | Authoritative record & contact | ADS, ORCID, Google Scholar, GitHub, CV, affiliations, and contact | Curated claims require direct routes to complete records and current contact information. |

## 4. Four methodological programmes

### A. Statistical inference from complex astronomical data

Observation-specific likelihoods, generalized and hierarchical models, simulation-based inference, population inference, and uncertainty propagation. Established work includes the generalized-linear-model series, COSMOABC, hierarchical galaxy-population models, the Bayesian modelling book, and Bayesian thermonuclear reaction rates.

### B. Learning from heterogeneous and incomplete surveys

Calibration, validation, and follow-up when the labelled or spectroscopic sample differs from the population to which the result will be applied. Established work includes the Teddy and Happy benchmarks, active learning for spectroscopic follow-up, RESSPECT, and survey-specific validation. Partial identification under incomplete calibration remains current work.

### C. Representations of spectra, images, and populations

Low-dimensional, graph, and matrix representations that retain variation needed for classification and physical analysis. Established work includes robust and kernel PCA, DRACULA, graph-based ordering of Type II supernova spectra, denoising, domain adaptation, and matrix factorisation. Representation completion remains current work.

### D. Geometry and resolved astronomical structure

Methods that retain spatial and spectral ordering in cosmological maps, multiband images, and IFU cubes. Established work includes IFU field reconstruction, curvilinear weak-lensing ridges, SCONCE, CAPIVARA, SAGUI, RadialPaths, and spectropath. Each project retains its actual publication status.

Software and community building cut across these programmes; neither is a fifth programme.

## 5. Six astronomical domains and rationale

The final taxonomy uses six entries at the same conceptual level: each names a physical system or class of phenomena. Spectroscopy, IFU imaging, surveys, astrostatistics, and machine learning are observational or methodological means and therefore do not appear as competing domains.

1. **First stars and the early Universe** — Population III star formation and supernovae, primordial magnetic fields, reionisation, and early minihaloes.
2. **Cosmology and large-scale structure** — cosmological parameter inference, cluster counts, weak-lensing mass maps, cosmic troughs, and spherical/conic cosmic-web structure.
3. **Milky Way structure and star formation** — open clusters, candidate young stellar objects, the Sagittarius-arm structure, stellar trajectories, and eruptive young stars.
4. **Galaxies and stellar systems** — galaxy evolution and environment, globular and nuclear clusters, morphology, stripping, and resolved stellar populations.
5. **Supernovae, transients and multimessenger sources** — Type Ia and Type II supernovae, spectroscopic follow-up, broker alert streams, kilonovae, tidal-disruption events, and galaxy catalogues for multimessenger searches.
6. **Nuclear astrophysics** — hierarchical evaluations of Big Bang nucleosynthesis and stellar thermonuclear reaction rates.

## 6. Representative programme–domain map

The map is many-to-many. A blank programme cell is allowed when the contribution is primarily astrophysical rather than a methodological instance.

| Work | Methodological programme | Astronomical domain | Status shown publicly |
|---|---|---|---|
| Primordial magnetic fields and early theory | — | First stars and the early Universe | Published |
| GLM I: Population III star formation | A | First stars and the early Universe | Published 2015 |
| COSMOABC | A | Cosmology and large-scale structure | Published/released 2015 |
| Gamma-regression photometric redshifts | A, B | Cosmology and large-scale structure; Galaxies and stellar systems | Published 2015 |
| Bayesian negative-binomial globular-cluster counts | A | Galaxies and stellar systems | Published 2015 |
| DRACULA | C | Supernovae, transients and multimessenger sources | Published 2016; software released 2015 |
| Teddy and Happy validation | B | Cosmology and large-scale structure; Galaxies and stellar systems | Published 2017 |
| *Bayesian Models for Astrophysical Data* | A; cross-programme | No single domain | Book 2017 |
| Hierarchical thermonuclear reaction rates | A | Nuclear astrophysics | Published 2019–2022 |
| RESSPECT | B | Supernovae, transients and multimessenger sources | Published research system 2019–2020 |
| DES ridges and SCONCE | D, with A | Cosmology and large-scale structure | Published 2020–2022; software release 2023 |
| SPICY catalogue | B, C | Milky Way structure and star formation | Published 2021 |
| Sagittarius-arm measurement | — | Milky Way structure and star formation | Published 2021 |
| Type II graph ordering | C | Supernovae, transients and multimessenger sources | Published 2023 |
| CAPIVARA | C, D | Galaxies and stellar systems | Published/released 2025 |
| SAGUI | C, D | Galaxies and stellar systems | Published/released 2026 |
| RadialPaths | D | Galaxies and stellar systems | Preprint and released package 2026 |
| spectropath | C, D | Galaxies and stellar systems | Preprint and released package 2026 |

## 7. Selected Contributions shortlist

The dedicated page retains nine main contributions. Each item states the scientific consequence before the method, distinguishes synthesis from measurement, and includes collaboration attribution.

1. **Generalized linear models in astronomy (2015).** Binomial, gamma, and Bayesian negative-binomial models made distinct astronomical response variables directly estimable without treating them as Gaussian. Applications covered primordial star formation, photometric redshifts, and overdispersed globular-cluster counts. Rafael was first author of papers I and III; the series was collaborative. Sources: [GLM I](https://doi.org/10.1016/j.ascom.2015.04.002), [GLM II](https://doi.org/10.1016/j.ascom.2015.01.002), [GLM III](https://doi.org/10.1093/mnras/stv1825).
2. **COSMOABC (2015).** A population-Monte-Carlo approximate-Bayesian-computation sampler recovered cosmological constraints from simulated cluster counts without evaluating a likelihood. This was collaborative software and should not be described as a sole-author invention. Sources: [paper](https://doi.org/10.1016/j.ascom.2015.09.001), [ASCL](https://ui.adsabs.harvard.edu/abs/2015ascl.soft05013I).
3. **Bayesian Models for Astrophysical Data (2017).** The 408-page Cambridge volume gave complete R/JAGS and Python/Stan analyses of generalized, hierarchical, and likelihood-free models. Its contribution is synthesis and usable exposition, not a new astronomical measurement. It was co-authored with Joseph M. Hilbe and Emille E. O. Ishida. Sources: [Cambridge](https://www.cambridge.org/core/books/bayesian-models-for-astrophysical-data/A521B3BB3A2E1621EE1B907E87207218), [PROSE award](https://proseawards.com/winners/2018-award-winners/).
4. **Hierarchical Bayesian thermonuclear rates (2019–2022).** Hierarchical models treated statistical errors and experiment-specific normalisations jointly in nuclear-reaction evaluations. The 2020 first-author analysis found 1.5–2.0 per cent uncertainties for the 7Be(n,p)7Li rate below 1 GK and found that commonly used rates understated the uncertainty. Source: [7Be(n,p)7Li paper](https://arxiv.org/abs/1912.06210).
5. **Realistic validation of photometric redshifts (2017).** Teddy and Happy separated incomplete colour–magnitude support from changed photometric-error distributions, showing where machine-learning estimates failed under each form of mismatch. Source: [MNRAS paper](https://doi.org/10.1093/mnras/stx862).
6. **Active learning and RESSPECT (2019–2020).** Spectroscopic follow-up was formulated as sequential label acquisition with evolving targets, object-dependent costs, and finite telescope budgets. The realistic experiments favoured uncertainty sampling over random selection, with no significant gain from the tested batch strategies. Source: [RESSPECT paper](https://arxiv.org/abs/2010.05941).
7. **SPICY and a Sagittarius-arm structure (2021).** A catalogue of roughly 120,000 candidate young stellar objects enabled a separate analysis to identify 25 star-forming regions in a narrow structure about 1 kpc long with a pitch angle of about 56 degrees. The work was collaborative and must not be described as a sole discovery. Sources: [SPICY record](https://authors.library.caltech.edu/records/afsgs-35t81), [A&A paper](https://doi.org/10.1051/0004-6361/202141198).
8. **Graph-based classification of Type II supernova spectra (2023).** A graph-based ordering of 1,595 spectra from 145 Type II supernovae exposed continuous spectral variation, rapid evolution near maximum light, and greater homogeneity near the plateau end. Rafael was first author. Source: [Astronomy and Computing](https://doi.org/10.1016/j.ascom.2023.100715).
9. **CAPIVARA (2025).** Spectral similarity grouped IFU spaxels into regions coherent in continuum and emission-line properties without imposing a morphological decomposition or relying only on signal-to-noise binning. The paper demonstrated the method on five MaNGA galaxies. Rafael was first author. Sources: [MNRAS](https://doi.org/10.1093/mnras/staf688), [ASCL](https://ui.adsabs.harvard.edu/abs/2025ascl.soft07023S).

**Additional milestones:** DRACULA and Type Ia spectral diversity; DES weak-lensing ridges and SCONCE. These remain source-linked on the full page but do not displace the nine-item public shortlist.

Homepage preview: GLM series (2015), Bayesian book (2017), SPICY/Sagittarius arm (2021), and CAPIVARA (2025).

## 8. Current Work shortlist

Current Work is visually and verbally separate from established contributions.

- **Incomplete calibration samples — in development.** Bound population quantities when the spectroscopic sample does not support every target population. This is a research direction, not an established result.
- **Representation completion — in development.** Test whether a summary built for one target retains the variation needed by a later physical parameter. This is a research direction, not an established result.
- **RadialPaths — preprint and package, 2026.** Centre-conditioned radial profiles for resolved structure. Sources: [preprint](https://arxiv.org/abs/2608.26326), [repository](https://github.com/RafaelSdeSouza/radialpaths), [documentation](https://rafaelsdesouza.com.br/radialpaths/).
- **spectropath — preprint and package, 2026.** Ordered path signatures for spectral-line morphology. Sources: [preprint](https://arxiv.org/abs/2606.27432), [repository](https://github.com/RafaelSdeSouza/spectropath), [documentation](https://rafaelsdesouza.com.br/spectropath/).
- **Spectro-spatial segmentation — published programme under extension.** CAPIVARA and SAGUI are established methods; extensions to new images, IFU samples, and physical problems remain current work.

Only four of these items appear on the homepage; the Research page may show all five.

## 9. Software atlas: scope and page architecture

The catalogue is complete against two public records: named software in the scholarly record and public named research systems with reusable code. It is not a list of every GitHub repository. Course materials, event repositories, forks, private analyses, one-paper notebooks without a reusable interface, and experiments that have not been presented as a package or system remain outside the atlas.

The Software page has three sections:

1. **Published and released** — peer-reviewed software papers, ASCL/CRAN records, DOI-archived releases, or a public package explicitly released with a paper/preprint.
2. **Research systems and companion code** — named public research infrastructure tied to a scientific publication, even when not released as a general package.
3. **In development** — documented, installable projects without a publication or archival release.

Every entry carries: project mark if justified; purpose; associated scientific problem; publication or archival record; repository; documentation; status; and contributors/attribution on the detail view.

## 10. Complete software inventory

### 10.1 Published and released packages — 18 projects

| Project | Purpose and associated scientific problem | Publication / record | Repository | Documentation | Public status | Mark decision |
|---|---|---|---|---|---|---|
| SAGUI | SED-based segmentation of multiband galaxy images; resolved galaxy structure in surveys | [MNRAS 2026](https://doi.org/10.1093/mnras/stag1062) | [GitHub](https://github.com/RafaelSdeSouza/sagui) | Repository documentation | Published and released 2026 | Preserve official monkey mark from the project repository |
| Lightstack | Crop, PSF-match, and stack multiband images into photometric data cubes | [RNAAS 2026](https://doi.org/10.3847/2515-5172/ae7c78); [Zenodo v0.2.1](https://doi.org/10.5281/zenodo.20360028) | [GitHub](https://github.com/AndressaWille/lightstack) | Jupyter tutorial in repository | Published and archived release 2026 | Preserve official grayscale stacked-image mark |
| ELMA | Estimate projected galaxy-bar major axes from fitted ellipses | [RNAAS 2026](https://doi.org/10.3847/2515-5172/ae7d2d) | [GitHub](https://github.com/BrunaLimaa/elma) | Repository documentation | Published and released 2026 | Proposed ellipse-plus-major-axis glyph; provisional, not official |
| PowerSpectR | Compute median radial Fourier power spectra as summaries of image structure | [RNAAS 2026](https://doi.org/10.3847/2515-5172/ae5b93); [Zenodo](https://zenodo.org/records/19400316) | [GitHub](https://github.com/RafaelSdeSouza/PowerSpectR) | Repository documentation | Published and archived release 2026 | Preserve official PowerSpectR mark; retire the website-made circular placeholder |
| SpectralUnmix | Regularised non-negative matrix factorisation of spectra with optional GPU acceleration | [RNAAS 2026](https://doi.org/10.3847/2515-5172/ae5107) | [GitHub](https://github.com/RafaelSdeSouza/SpectralUnmix) | [Project site](https://rafaelsdesouza.github.io/SpectralUnmix/) | Published and released 2026 | Proposed component-sum glyph; provisional, not official |
| CAPIVARA | Segment IFU cubes by spectral similarity for resolved galaxy analysis | [MNRAS 2025](https://doi.org/10.1093/mnras/staf688); [ASCL 2507.023](https://ui.adsabs.harvard.edu/abs/2025ascl.soft07023S) | [GitHub](https://github.com/RafaelSdeSouza/capivara) | Repository/package documentation | Published and released 2025 | Preserve official capybara mark |
| GalMOSS | GPU-accelerated galaxy surface-brightness profile fitting | [Astronomy and Computing 2024](https://doi.org/10.1016/j.ascom.2024.100825); [ASCL 2404.005](https://ui.adsabs.harvard.edu/abs/2024ascl.soft04005M) | [GitHub](https://github.com/Chenmi0619/GALMoss) | Repository documentation | Published and released 2024 | Preserve official GALMOSS wordmark |
| SCONCE-SCMS | Find cosmic-web ridges on spherical and conic geometries | [MNRAS 2022](https://doi.org/10.1093/mnras/stac2504); [ASCL 2306.013](https://ui.adsabs.harvard.edu/abs/2023ascl.soft06013Z) | [GitHub](https://github.com/zhangyk8/sconce-scms) | Repository/PyPI documentation | Published 2022; ASCL release 2023 | Preserve the official SCONCE wordmark and spherical-ridge symbol |
| qrpca | Fast QR-based principal-component analysis with GPU acceleration | [Astronomy and Computing 2022](https://doi.org/10.1016/j.ascom.2022.100633) | [GitHub](https://github.com/RafaelSdeSouza/qrpca) | Repository documentation | Published and released 2022 | Optional QR-basis glyph; provisional, not official |
| galmask | Unsupervised galaxy masking | [RNAAS 2022](https://doi.org/10.3847/2515-5172/ac780b); [Zenodo](https://doi.org/10.5281/zenodo.6626668) | [GitHub](https://github.com/Yash-10/galmask) | [Read the Docs](https://galmask.readthedocs.io/) | Published and released 2022 | Typography only unless the project supplies a mark |
| Yonder | SVD-based denoising and reconstruction with error propagation | [RNAAS 2022](https://doi.org/10.3847/2515-5172/ac5c57) | [GitHub](https://github.com/pengchzn/yonder) | Repository documentation | Published and released 2022 | Typography only |
| LOGIT | R functions, data, and examples for binary and binomial models | [CRAN archive](https://cran.r-project.org/src/contrib/Archive/LOGIT/) | CRAN source archive | Archived package manual | Released 2016; removed from current CRAN in 2018 | Restrained logistic-curve glyph is permissible; label as proposed |
| DRACULA | Dimensionality reduction and clustering of supernova spectra | [ASCL 1512.009](https://ui.adsabs.harvard.edu/abs/2015ascl.soft12009A); [MNRAS 2016](https://doi.org/10.1093/mnras/stw1228) | [GitHub](https://github.com/COINtoolbox/DRACULA) | Repository documentation | ASCL release 2015; paper 2016 | Preserve official purple DRACULA wordmark |
| cosmoabc | Population-Monte-Carlo approximate Bayesian computation for cosmology | [Astronomy and Computing 2015](https://doi.org/10.1016/j.ascom.2015.09.001); [ASCL 1505.013](https://ui.adsabs.harvard.edu/abs/2015ascl.soft05013I) | [GitHub](https://github.com/COINtoolbox/CosmoABC) | Repository documentation | Published and released 2015 | Do not reuse the COIN logo as a package logo; optional posterior-particle glyph remains provisional |
| AMADA | Interactive exploration of multidimensional astronomical catalogues | [Astronomy and Computing 2015](https://doi.org/10.1016/j.ascom.2015.06.006); [ASCL 1503.006](https://ui.adsabs.harvard.edu/abs/2015ascl.soft03006D) | [GitHub](https://github.com/RafaelSdeSouza/AMADA) | Repository documentation | Published and released 2015 | Typography only |
| CosmoPhotoz | Generalized-linear-model photometric-redshift estimation | [ASCL 1408.018](https://ui.adsabs.harvard.edu/abs/2014ascl.soft08018D); [method paper](https://doi.org/10.1016/j.ascom.2015.01.002) | [GitHub](https://github.com/COINtoolbox/CosmoPhotoz) | Repository/archive documentation | ASCL release 2014; method paper 2015 | Typography only |
| RadialPaths | Centre-conditioned radial profiles for resolved structure | [arXiv 2026](https://arxiv.org/abs/2608.26326) | [GitHub](https://github.com/RafaelSdeSouza/radialpaths) | [Project documentation](https://rafaelsdesouza.com.br/radialpaths/) | Preprint and released package 2026 | Use an official mark if one is supplied; otherwise a support-constrained radial-path glyph is permissible and provisional |
| spectropath | Ordered path signatures for spectral-line morphology | [arXiv 2026](https://arxiv.org/abs/2606.27432) | [GitHub](https://github.com/RafaelSdeSouza/spectropath) | [Project documentation](https://rafaelsdesouza.com.br/spectropath/) | Preprint and released R package 2026 | Use an official mark if one is supplied; otherwise an ordered velocity–flux path glyph is permissible and provisional |

### 10.2 Research systems and companion code — 6 projects

| Project | Scientific function | Publication / record | Repository and documentation | Status | Mark decision |
|---|---|---|---|---|---|
| RESSPECT | Resource allocation for spectroscopic follow-up of transients | [paper](https://arxiv.org/abs/2010.05941) | [GitHub](https://github.com/emilleishida/resspect); repository documentation | Published research system | Preserve official RESSPECT mark |
| ActSNClass | Active-learning supernova classification | Publication link to be resolved against final bibliography | [GitHub](https://github.com/COINtoolbox/ActSNClass); repository documentation | Public research system | Typography only unless a project-owned mark is documented |
| graph_clustering | Inspectable graph ordering of Type II supernova spectra | [paper](https://doi.org/10.1016/j.ascom.2023.100715) | Public repository and documentation route to be resolved before implementation | Published companion code | Typography only |
| ridges | Reproduction and extension code for DES weak-lensing ridges | [paper](https://doi.org/10.1093/mnras/staa3257) | Public repository and documentation route to be resolved before implementation | Published companion code | Typography only |
| ELEPHANT | Filter alert streams for hostless extragalactic transients | [A&A 2024](https://doi.org/10.1051/0004-6361/202450535) | Public repository/documentation route to be resolved before implementation | Published research system | Typography only unless the project supplies an official mark |
| Fink kilonova science module | Filter broker alerts for fast kilonova candidates | [A&A 2023](https://doi.org/10.1051/0004-6361/202245340) | [Fink science repository](https://github.com/astrolabsoftware/fink-science); module documentation to be resolved | Published broker module | Use the official Fink identity only under its usage rules; do not invent a subproject logo |

### 10.3 In development — 1 project

| Project | Scientific function | Repository | Documentation | Status | Mark decision |
|---|---|---|---|---|---|
| SpaxNMF | Spatially regularised non-negative matrix factorisation for IFU cubes | [GitHub](https://github.com/RafaelSdeSouza/SpaxNMF) | Repository documentation | In development; no publication or archival release located | Typography only; no established mark located |

### 10.4 Homepage software selection

Show exactly six project marks: **DRACULA, SCONCE-SCMS, CAPIVARA, SAGUI, PowerSpectR, and Lightstack**. This set spans spectral representation, cosmic-web geometry, IFU segmentation, multiband segmentation, Fourier image summaries, and image-display infrastructure. It includes older and current work and does not imply that the homepage is the complete catalogue.

The section ends with **View the complete software atlas**.

### 10.5 Software-mark policy

- Preserve project-owned marks without redrawing, recolouring, enclosing them in a common badge, or forcing them into a uniform aspect ratio.
- The site supplies the common frame: spacing, captions, links, and status labels. Individual projects retain their own visual identity.
- An absent logo is not a defect. Typography is the default.
- When no established mark exists, use clean typography. Do not invent a glyph, mascot, or replacement identity.
- Never create generic neural-network, sparkle, robot, circuit, or commercial/AI-style marks.

## 11. Leadership & Community hierarchy

1. **COIN case study.** State that Rafael founded the Cosmostatistics Initiative in 2014 and currently co-leads it only with the official COIN source attached. Explain the network's scientific purpose, residence model, selected outputs, training, and international participation. Do not publish the local “80+ researchers” count until reconciled with a dated roster.
2. **Professional leadership.** The University of Hertfordshire profile supports “former Vice-President of the International Astrostatistics Association”. The current International Statistical Institute page supports **Member (2021–present)** of the Astrostatistics Special Interest Group; it does not support “Chair”.
3. **Survey and programme roles.** Rubin/LSST, Fink, J-PAS, and editorial work appear only after an exact role, date, and authoritative source are recorded. Participation does not imply leadership.
4. **Scientific service.** Selective programme and editorial work may follow the leadership cases. Routine refereeing belongs in the full CV.

## 12. Appointment timeline

Current appointments appear before the historical chronology.

- **2023–present — Senior Lecturer, University of Hertfordshire, United Kingdom.** The institution and affiliation are public; a 2025 paper biography supports the rank. Recheck the current institutional wording at implementation.
- **2024–present — Adjunct Associate Professor, University of North Carolina at Chapel Hill, United States.** Use this exact title. It is supported by the official UNC graduate catalogue and resolves the earlier “external Associate Professor” ambiguity.

Historical sequence:

- 2020–2022 — Associate Professor, Shanghai Astronomical Observatory, China.
- 2017–2020 — Postdoctoral Fellow, University of North Carolina at Chapel Hill, United States.
- 2014–2016 — Postdoctoral Fellow, Eötvös Loránd University, Hungary.
- 2012–2014 — Postdoctoral Fellow, Korea Astronomy and Space Science Institute, South Korea.
- 2010–2011 — Postdoctoral Fellow, Kavli IPMU, Japan.

The local CV states **Visiting Scholar, UFRGS, 2025–present**. No sufficiently authoritative public source has been resolved, so the role does not appear on the homepage or public timeline until verified.

Use a linear chronology rather than a map or a row of generic institutional marks.

## 13. Recognition shortlist

- **2018 — PROSE Award, Cosmology & Astronomy.** Verified for *Bayesian Models for Astrophysical Data* by the official award record.
- **2016 — International Astrostatistics Association Outstanding Publication in Astrostatistics, Postdoc Award.** Verified by the official award announcement for the Bayesian negative-binomial GLM paper.
- **2017 — Marie Skłodowska-Curie/AstroFit Fellowship.** Present in the local CV; withhold from the public shortlist until a programme or institutional archive is located.
- **2022 — Shanghai Astronomical Observatory Excellence in Research Award.** Present in the local CV; withhold until institutionally verified.
- **2014 — KASI Excellence in Research Award.** Present in the local CV; withhold until institutionally verified.

The homepage displays only the two verified honours. Funding is a separate, sourced list; do not display a total until currencies, values, and visiting funds are normalised.

## 14. Writing inventory

### Fiction

- *Beyond the Rainbow* — Xuenan Cao and Rafael S. de Souza, 14 April 2022; the local CV and current content agree on the Wattpad identifier.
- *The City of Endless Time* — Rafael S. de Souza, 12 December 2022; recorded in the local CV. No cover is currently assigned in the website content.
- *A Journey into the Void* — Rafael S. de Souza, 29 December 2022, in the local CV.
- *Beyond the Veil* — Rafael S. de Souza, 2026, in the current website content.

The final two records use the same Wattpad story identifier and closely matching synopses. Treat them as **one unresolved literary record**, not two independent works, until Rafael supplies the canonical title, date, URL, and cover association.

### Science and public writing

- *A Brief History of Inference in Astronomy* — include as verified science/public writing with DOI [10.1090/noti3267](https://doi.org/10.1090/noti3267).
- Add essays, interviews, or public pieces only when an exact public record is supplied.
- Do not show Poetry or Notes as empty categories.

## 15. People & Mentorship structure

- **Current PhD researchers:** Niranjana Prashanth, Suresh Parekh, Andressa Wille, Simran Singh, and Mittal Shree Hari, with project and institution from the current CV.
- **Former PhD researcher:** Maria Luiza Dantas. Add a current destination only after verification.
- **MSc researchers:** Mi Chen, Quanfeng Xu, and Zihao Mu; treat as former unless a current status is supplied.
- **Current undergraduate researcher:** Bruna Lima.
- **Former undergraduate researchers:** Yash Gondhalekar, Peng Chen, Renan dos Santos Barbosa, Tan Hong Kiat, and Yeoh Jun Kai, according to the CV dates.
- **Programme collaborators:** include a person only within a named project or programme and with a precise role.

Each entry leads with the scientific problem, then gives role, institution, dates, and relevant output. Portraits require permission and a reliable source. Alumni outcomes are not inferred from web searches.

## 16. Visual asset inventory

### Preserve

| Asset | Visual language | Decision |
|---|---|---|
| `assets/images/backgrounds/home-nebula-contours.jpg` | Original astronomical/artistic imagery — personal identity | Keep as the principal bounded hero image. Never caption it as a scientific observation or result. |
| `assets/images/rafael-de-souza.jpg` | Personal portrait | Keep for About or a lower homepage biography; do not let it compete with the scientific statement in the hero. |
| `assets/images/book-cover-bayesian-models.jpg` | Functional publication image | Keep with the book contribution, Publications, and Recognition. |
| `assets/images/coin-2024.png` | Project/community mark | Current COIN 2024 mark; keep at modest scale on Leadership/COIN. Preserve the original vector as `assets/images/coin-2024-vector.pdf`. |
| `assets/images/software/capivara-logo.png` | Official software mark | Preserve unchanged; the project repository copy matches the site asset. |
| `assets/images/software/sagui-logo.png` | Official software mark | Preserve; use the higher-resolution repository source in implementation if needed. |
| `design/reference-assets/software-marks/sconce-official.png` | Official software mark | Preserve the project-owned SCONCE identity; do not substitute a generic ridge glyph. |
| `design/reference-assets/software-marks/powerspectr-official.png` | Official software mark | Preserve and use instead of the website-made circular placeholder. |
| `design/reference-assets/software-marks/lightstack-official.png` | Official software mark | Preserve in monochrome. |
| `design/reference-assets/software-marks/galmoss-official.jpg` | Official software mark | Preserve its violet wordmark and astronomical background. |
| `design/reference-assets/software-marks/dracula-official.png` | Official software mark | Preserve the purple wordmark. |
| `design/reference-assets/software-marks/resspect-official.png` | Official research-system mark | Preserve its crimson/charcoal identity. |
| `assets/images/writing/cover.jpg`, `cover2.jpg` | Functional literary imagery | Preserve, but attach each cover only after the duplicate story identity is resolved. |

### Scientific evidence only

| Asset | Claim it may support | Decision |
|---|---|---|
| `assets/images/research/cosmic-structure.png` | Curvilinear structure in DES weak-lensing mass maps | Use only with the DES-ridges contribution after recording the exact paper panel and permitted crop. |
| `assets/images/research/milky-way.png` | The high-pitch-angle Sagittarius-arm structure | Use with the 2021 A&A result and an explicit citation. |
| `assets/images/research/spectral-classification.png` | Graph ordering of Type II supernova spectra | Use with the 2023 paper and an explicit citation. |
| `assets/images/research/time-domain.png` | A specific transient light-curve comparison | Do not use until the exact source, objects, and figure version are recorded. |
| `assets/images/research/spatial-structure.png` | Unresolved | Do not use until its plotted quantities, paper, and panel are identified. |
| CAPIVARA repository `research/capivara2/assets/mosaic_segmented.png` | MaNGA galaxies and CAPIVARA segmentation maps | Add only with de Souza et al. (2025) attribution; it is not yet a production website asset. |

### Adapt or restrict

| Asset | Decision |
|---|---|
| `assets/images/research/spicy.png` | Reclassify as a project mark, not a scientific catalogue map. |
| `assets/images/research/follow-up.png` | Remove from evidence slots; retain only if its provenance and project meaning are documented. |
| `assets/images/software/capivara.svg`, `sagui.svg`, `powerspectr.svg`, `spectralunmix.svg` | Treat as website-created placeholders, not official marks. The first three are superseded by authentic assets; SpectralUnmix may use a revised provisional scientific glyph only after approval. |
| `assets/images/institutions/*.svg` | Retire from the career presentation; they are generic site-created cards rather than official institutional identities. |
| `assets/images/favicon.png` | Retain during concept review; replace only in a later identity pass using approved artwork. |
| `CV_rafael_2026/doi.svg`, `wattpad.svg` | Keep within the CV; they are service marks, not part of the website's identity. |
| `CV_rafael_2026/newCOIN.png` | Legacy CV-build asset. The website uses the newer 2024 blue vector mark exported as `assets/images/coin-2024.png`. |

### Retire from V2

- `assets/images/backgrounds/likelihood-manifold.svg` — invented decorative geometry that can be mistaken for a scientific visual.
- `CV_rafael_2026/photo.jpg` — unrelated anime portrait with no valid provenance for this site.

No asset is deleted during specification review.

## 17. Exact homepage prose

### Hero

**Rafael S. de Souza**  
**Astrophysicist**

Statistical inference for astronomical observations whose likelihoods, calibration samples, representations, or spatial structure limit what can be learned about the underlying physics.

The work connects problems in primordial star formation, cosmology, Galactic structure, galaxies, transients, and nuclear reaction rates.

**Senior Lecturer, University of Hertfordshire · Adjunct Associate Professor, University of North Carolina at Chapel Hill**

Links: **Explore the research · Selected contributions · Publications · Download CV**

### Research programmes

**Four recurring questions**

The programmes identify methodological problems that recur across different astronomical systems. They are not a chronological division of the work.

**Statistical inference from complex astronomical data**  
Observation-specific likelihoods, hierarchical models and simulation-based methods for cosmology, galaxy populations and nuclear astrophysics.

**Learning from heterogeneous and incomplete surveys**  
Calibration, validation and follow-up when the labelled sample differs from the population to which the result will be applied.

**Representations of spectra, images and populations**  
Low-dimensional, graph and matrix representations that retain the variation needed for classification and physical analysis.

**Geometry and resolved astronomical structure**  
Methods that retain spatial and spectral ordering in galaxies, IFU cubes, multiband images and cosmological maps.

Link: **Read the research programmes**

### Astronomical domains

**Across astronomy**

The methods have been developed and tested in six physical domains: first stars and the early Universe; cosmology and large-scale structure; Milky Way structure and star formation; galaxies and stellar systems; supernovae, transients and multimessenger sources; and nuclear astrophysics.

Link: **Explore by astronomical domain**

### Selected Contributions

**Selected contributions**

These works mark changes in statistical practice, reusable infrastructure, or astronomical measurement. The complete publication record remains separate.

**Generalized linear models in astronomy · 2015**  
Matched binary, positive and overdispersed count responses to models that made the relevant astronomical effects directly estimable.

**Bayesian Models for Astrophysical Data · 2017**  
Co-authored a practical treatment of generalized, hierarchical and likelihood-free models; winner of the 2018 PROSE Award in Cosmology & Astronomy.

**SPICY and the Sagittarius arm · 2021**  
A catalogue of roughly 120,000 candidate young stellar objects enabled the identification of a narrow, high-pitch-angle star-forming structure in the Milky Way.

**CAPIVARA · 2025**  
Introduced spectral segmentation of IFU data cubes and demonstrated it on five MaNGA galaxies.

Link: **View all selected contributions**

### Current directions

**Current directions**

**Incomplete calibration samples · In development**  
Bound population quantities when the spectroscopic sample does not support every target population.

**Representation completion · In development**  
Test whether a summary built for one target retains the variation required by a later physical parameter.

**RadialPaths · Preprint and package, 2026**  
Construct centre-conditioned radial profiles for resolved astronomical structure.

**Spectro-spatial segmentation · Published programme under extension**  
Extend CAPIVARA and SAGUI to new images, IFU samples and physical problems.

Link: **See current work in context**

### Software

**Selected software**

Packages and project systems turn statistical methods into reusable, inspectable research infrastructure. Project-owned marks retain their individual identities; provisional glyphs are used only when a method supplies a natural visual motif.

Projects: **cosmoabc · SCONCE · CAPIVARA · SAGUI · PowerSpectR · SpectralUnmix**

Link: **View the complete software atlas**

### Leadership & Community

**Building scientific communities**

Rafael founded the Cosmostatistics Initiative in 2014 and continues to co-lead its project-based collaborations and residence programmes in astrostatistics. Other professional roles are shown only at the level supported by current institutional sources.

Link: **Leadership & Community**

### Appointments & Recognition

**An international research career**

Current appointments at the University of Hertfordshire and the University of North Carolina at Chapel Hill follow research positions in China, the United States, Hungary, South Korea and Japan.

**Selected recognition**

The 2018 PROSE Award in Cosmology & Astronomy recognised *Bayesian Models for Astrophysical Data*. The 2016 International Astrostatistics Association award recognised the Bayesian negative-binomial GLM paper.

Link: **Career & Recognition**

### People & Mentorship

**People & Mentorship**

Current and former PhD, MSc and undergraduate researchers are organised by scientific project, institution and status, with the relevant output attached to each supervision.

Link: **Meet the people**

### Writing & Ideas

**Writing & Ideas**

Science fiction and writing on the history and practice of inference are presented separately from the scholarly publication record.

Link: **Read Writing & Ideas**

### Footer

**Complete record:** ADS · ORCID · Google Scholar · GitHub · CV  
**Affiliations:** University of Hertfordshire · University of North Carolina at Chapel Hill  
**Contact**

## 18. Exact Research-page introduction

**Research**

Astrophysical measurements are rarely difficult for only one reason. The likelihood may be unavailable, the calibration sample may differ from the target population, the observation may be high-dimensional, or the scientific signal may depend on spatial ordering. My work develops statistical and computational methods for these problems across six physical domains, from the first stars to nuclear reaction rates.

The page is organised along two independent axes. Four methodological programmes describe recurring questions; six astronomical domains record where the methods have been used. Papers, projects and software may connect several entries. Established results and current work are labelled separately, and earlier papers retain the scientific problem and terminology of their time.

## 19. Design principles

1. **Evidence before decoration.** Scientific figures appear only where they support a specific sourced claim.
2. **Three legitimate visual languages.** Original astronomical/artistic imagery expresses personal identity; scientific figures carry evidence; software/project marks identify built research infrastructure.
3. **Explicit classification.** Every image in a concept or production page is recorded as artistic identity, scientific evidence, or functional/project imagery.
4. **Independent identities.** The site's grid, typography, spacing, and labels provide coherence. Project marks are not redrawn to look related.
5. **Status is part of the claim.** Published, released, archived, preprint, research system, and in-development states are visible near project names.
6. **One conceptual level per taxonomy.** Programmes name methodological questions; domains name physical systems or phenomena.
7. **Career breadth without a catalogue homepage.** The homepage selects; dedicated pages complete the record.
8. **Source proximity.** Contribution, appointment, award, and software claims link directly to primary or authoritative records.
9. **Quiet academic hierarchy.** Use a serif display face, readable sans-serif body text, white space, thin rules, and restrained blue. Avoid dashboard cards, generic diagrams, gradients as evidence, and decorative institution walls.
10. **Accessible implementation.** Preserve readable contrast, semantic headings, keyboard navigation, descriptive alt text, responsive layouts, and reduced-motion behaviour.
11. **No invented certainty.** Unresolved titles, roles, counts, image provenance, and literary records remain absent or explicitly unresolved.

## 20. Approved concept set and image classification

### Homepage concept

[Final homepage concept](concepts/career-architecture-review/final-homepage.png)

- Nebula field: **artistic identity**, sourced from `assets/images/backgrounds/home-nebula-contours.jpg`.
- Sagittarius-arm and CAPIVARA panels: **scientific evidence**, tied to the cited A&A 2021 and MNRAS 2025 contributions.
- Bayesian book cover: **functional publication imagery**, sourced from `assets/images/book-cover-bayesian-models.jpg`.
- Software marks: **built research infrastructure**. CAPIVARA, SAGUI, SCONCE, and PowerSpectR use project-owned marks; cosmoabc and SpectralUnmix motifs are provisional concept glyphs.
- COIN mark: **functional/community imagery**, sourced from `assets/images/coin-2024.png`; its vector source is preserved as `assets/images/coin-2024-vector.pdf`.

### Research concept

[Final Research concept](concepts/career-architecture-review/research-final.png)

- DES ridge map, Sagittarius structure, Type II spectral graph, and CAPIVARA segmentation: **scientific evidence** associated with the cited papers.
- Programme diagrams: none. Typographic structure carries the taxonomy.
- RadialPaths and spectropath appear with their exact status as preprint and package.

### Selected Contributions concept

[Final Selected Contributions concept](concepts/career-architecture-review/selected-contributions-final.png)

- Book cover: **functional publication imagery**.
- Paper figures: **scientific evidence** only, with the source attached to each contribution during implementation.
- No generic icons stand in for unsourced results.

### Software-atlas concept

[Final Software atlas concept](concepts/career-architecture-review/software-atlas.png)

- All imagery is **software/project identity** or an explicitly provisional method glyph.
- The concept preserves the official SCONCE mark and classifies RadialPaths and spectropath as published/released preprint packages.
- Authentic Lightstack, GalMOSS, DRACULA, and RESSPECT marks have replaced generic or text-only stand-ins.
- ELEPHANT and the Fink kilonova module appear as research systems rather than formally released packages.
- The concept establishes hierarchy and density; production text and links must come from the structured catalogue, not be rasterised from the mockup.

## 21. Factual ledger

Every public claim below is either **VERIFIED** or **UNRESOLVED**. “Verified” means supported by an authoritative public source or a primary scholarly/software record; it does not imply that a status can never change. Current roles and software status must be checked once more immediately before launch.

### Identity, appointments, leadership, and recognition

| Claim | Status | Evidence / publication rule |
|---|---|---|
| Rafael is an astrophysicist affiliated with the University of Hertfordshire | VERIFIED | [Hertfordshire profile](https://researchprofiles.herts.ac.uk/en/persons/rafael-da-silva-de-souza/) |
| Senior Lecturer, University of Hertfordshire | VERIFIED | Public 2025 author biography supports the rank; recheck current institutional wording at launch |
| Adjunct Associate Professor, University of North Carolina at Chapel Hill | VERIFIED | [Official UNC graduate catalogue PDF](https://catalog.unc.edu/graduate/schools-departments/physics-astronomy/physics-astronomy.pdf) |
| Visiting Scholar, UFRGS, 2025–present | UNRESOLVED | Local CV only; omit publicly until an institutional record is located |
| Founder of COIN in 2014 and current co-lead | VERIFIED | [COIN official site](https://cosmostatistics-initiative.org/) |
| Former Vice-President of the International Astrostatistics Association | VERIFIED | Hertfordshire institutional profile |
| ISI Astrostatistics SIG member, 2021–present | VERIFIED | [ISI current page](https://isi-web.org/nl/node/149) |
| ISI Astrostatistics SIG Chair | UNRESOLVED | Not supported by the current ISI page; do not publish |
| Rubin/LSST, Fink, J-PAS, or editorial leadership roles | UNRESOLVED | Require exact role, date, and authoritative source |
| 2018 PROSE Award, Cosmology & Astronomy | VERIFIED | [Official winners](https://proseawards.com/winners/2018-award-winners/) |
| 2016 IAA outstanding-publication award | VERIFIED | [Official award announcement](https://www2.ae-info.org/attach/Acad_Main/Sections/Informatics/News_Archive/Fionn%20Murtagh/IAA-2016AWARDS-14April2016-FINAL.pdf) |
| 2017 AstroFit fellowship | UNRESOLVED | Local CV only; require programme/institutional archive |
| 2022 SHAO research award | UNRESOLVED | Local CV only; require institutional source |
| 2014 KASI research award | UNRESOLVED | Local CV only; require institutional source |
| Publication and funding totals | UNRESOLVED | Repository values conflict; compute only from cleaned structured sources |

### Research and selected contributions

| Claim group | Status | Evidence |
|---|---|---|
| GLM I–III dates, models, and applications | VERIFIED | The three DOI records linked in section 7 |
| COSMOABC method, 2015 paper, and ASCL release | VERIFIED | Paper and ASCL record linked in section 7 |
| Bayesian book extent, authorship, and PROSE award | VERIFIED | Cambridge and PROSE records linked in section 7 |
| Hierarchical 7Be(n,p)7Li result and 1.5–2.0% uncertainty below 1 GK | VERIFIED | arXiv/paper linked in section 7 |
| Teddy/Happy validation result | VERIFIED | MNRAS paper linked in section 7 |
| RESSPECT experimental result | VERIFIED | Paper linked in section 7 |
| SPICY catalogue size and Sagittarius-arm measurement | VERIFIED | Caltech and A&A records linked in section 7 |
| Type II sample sizes and qualitative spectral ordering | VERIFIED | Astronomy and Computing paper linked in section 7 |
| CAPIVARA method and five-MaNGA-galaxy demonstration | VERIFIED | MNRAS and ASCL records linked in section 7 |
| DES ridge reconstruction and SCONCE geometric extension | VERIFIED | [DES ridges](https://doi.org/10.1093/mnras/staa3257) and [SCONCE](https://doi.org/10.1093/mnras/stac2504) |
| Incomplete-calibration and representation-completion conclusions | UNRESOLVED | Current research directions, not established-result claims |

### Published and released software

| Project claim | Status | Evidence rule |
|---|---|---|
| SAGUI published and released in 2026 | VERIFIED | MNRAS DOI and public repository in section 10 |
| Lightstack v0.2.1 published and archived in 2026 | VERIFIED | RNAAS DOI, GitHub, and Zenodo in section 10 |
| ELMA published/released in 2026 | VERIFIED | RNAAS DOI and public repository in section 10 |
| PowerSpectR published and archived in 2026 | VERIFIED | RNAAS DOI, repository, and Zenodo in section 10 |
| SpectralUnmix is an R package published/released in 2026 | VERIFIED | RNAAS DOI and project site in section 10 |
| CAPIVARA published/released in 2025 | VERIFIED | MNRAS DOI, ASCL, and repository in section 10 |
| GalMOSS published/released in 2024 | VERIFIED | Astronomy and Computing DOI, ASCL, and repository in section 10 |
| SCONCE paper in 2022 and ASCL release in 2023 | VERIFIED | MNRAS DOI, ASCL, and repository in section 10 |
| qrpca published/released in 2022 | VERIFIED | Astronomy and Computing DOI and public repository in section 10 |
| galmask published/released in 2022 | VERIFIED | RNAAS DOI, Zenodo, repository, and documentation in section 10 |
| Yonder published/released in 2022 | VERIFIED | RNAAS DOI and public repository in section 10 |
| LOGIT released in 2016 and removed from current CRAN in 2018 | VERIFIED | CRAN archive and package record; show as archived |
| DRACULA ASCL release 2015 and paper 2016 | VERIFIED | ASCL, MNRAS, and repository in section 10 |
| cosmoabc published/released in 2015 | VERIFIED | Astronomy and Computing DOI, ASCL, and repository in section 10 |
| AMADA published/released in 2015 | VERIFIED | Astronomy and Computing DOI, ASCL, and repository in section 10 |
| CosmoPhotoz ASCL release 2014 and method paper 2015 | VERIFIED | ASCL, DOI, and repository in section 10 |
| RadialPaths is a 2026 preprint and released package | VERIFIED | arXiv, repository, and documentation in sections 8 and 10 |
| spectropath is a 2026 preprint and released R package | VERIFIED | arXiv, repository, and documentation in sections 8 and 10 |

### Research systems, development, marks, and writing

| Claim | Status | Evidence / rule |
|---|---|---|
| RESSPECT is a published public research system | VERIFIED | Paper and repository in section 10 |
| ActSNClass is public named code | VERIFIED | Public repository; exact publication association remains UNRESOLVED |
| graph_clustering accompanies the published Type II method | VERIFIED | Paper; exact repository route is UNRESOLVED |
| ridges accompanies the DES weak-lensing ridge paper | VERIFIED | Paper; exact repository route is UNRESOLVED |
| ELEPHANT is a published transient-alert system | VERIFIED | A&A DOI; exact public repository/documentation route is UNRESOLVED |
| Fink kilonova module is published broker infrastructure | VERIFIED | A&A DOI and Fink science repository; exact module documentation route is UNRESOLVED |
| SpaxNMF is a public installable development repository | VERIFIED | Public GitHub repository; publication/archive status is UNRESOLVED and therefore shown as in development |
| CAPIVARA, SAGUI, PowerSpectR, SCONCE, Lightstack, GalMOSS, DRACULA, and RESSPECT have project-owned marks | VERIFIED | Marks obtained from their public project repositories; preserved as design reference assets |
| Current site circular SVGs are official marks | UNRESOLVED | They were created together for this site and lack project provenance; the specification rejects any claim that they are official |
| *Beyond the Rainbow* identity and URL | VERIFIED | Local CV and current site content agree |
| *The City of Endless Time* record | VERIFIED | Local CV includes title/date/URL; recheck the public link at launch |
| *A Journey into the Void* versus *Beyond the Veil* | UNRESOLVED | Same Wattpad identifier and matching synopsis; require canonical title/date/cover |
| *A Brief History of Inference in Astronomy* | VERIFIED | DOI 10.1090/noti3267 |
| People and supervision statuses | UNRESOLVED | Use current CV as editorial input; confirm before public implementation |
| `cosmic-structure.png`, `time-domain.png`, and `spatial-structure.png` exact figure provenance | UNRESOLVED | Do not publish until paper, figure number, and permitted crop are recorded |

## 22. Implementation gates

Implementation begins only after Rafael approves this specification and the four final concepts.

Before launch:

1. resolve the UFRGS appointment or omit it;
2. retain only ISI membership unless an authoritative Chair record is supplied;
3. resolve the duplicated literary record;
4. deduplicate the bibliography and generate all publication counts from the cleaned source;
5. verify each unresolved research-system repository/documentation route;
6. record source, figure number, and crop for every scientific image;
7. confirm each project-owned mark against its repository and keep its original proportions;
8. label every non-official glyph as provisional until separately approved;
9. recheck current appointments and software statuses immediately before deployment;
10. test semantic structure, keyboard access, contrast, responsive layout, external links, and reduced-motion behaviour.

No production implementation should infer its way past any unresolved item in the factual ledger.

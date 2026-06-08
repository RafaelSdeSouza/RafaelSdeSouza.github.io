const publicationList = document.querySelector("#publication-list");
const filterButtons = document.querySelectorAll(".filter-button");
const publicationSearch = document.querySelector("#publication-search");
const publicationCount = document.querySelector("#publication-count");
const mapPlace = document.querySelector("#map-place");
const mapRole = document.querySelector("#map-role");
const mapCity = document.querySelector("#map-city");
const mapImage = document.querySelector("#map-image");
const mapLink = document.querySelector("#map-link");
const mapStopList = document.querySelector("#map-stop-list");
const mapZoomIn = document.querySelector("#map-zoom-in");
const mapZoomOut = document.querySelector("#map-zoom-out");
const mapReset = document.querySelector("#map-reset");
const researchInterestGrid = document.querySelector("#research-interest-grid");
const researchApplicationGrid = document.querySelector("#research-application-grid");
const softwareGrid = document.querySelector("#software-grid");
const writingGrid = document.querySelector("#writing-grid");
const siteAssetVersion = new URL(
  document.querySelector('script[src*="script.js"]')?.src || window.location.href
).searchParams.toString();
const pageContentVersion = window.location.search.replace(/^\?/, "");

let publications = [];
let activeFilter = "all";
const visitedCountryIds = new Set(["076", "392", "410", "348", "156", "840", "826"]);
const researchIcons = {
  inference: `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path d="M10 32 22 16l9 10 7-12"/><circle cx="10" cy="32" r="4"/><circle cx="22" cy="16" r="4"/><circle cx="31" cy="26" r="4"/><circle cx="38" cy="14" r="4"/></svg>`,
  learning: `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path d="M9 14h30M9 24h30M9 34h30"/><circle cx="16" cy="14" r="4"/><circle cx="30" cy="24" r="4"/><circle cx="22" cy="34" r="4"/></svg>`,
  time: `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path d="M6 28h8l5-13 8 22 5-13h10"/><circle cx="24" cy="24" r="18"/></svg>`,
  image: `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><rect x="8" y="10" width="32" height="28" rx="3"/><path d="m10 34 10-10 7 7 5-5 8 8"/><circle cx="31" cy="18" r="4"/></svg>`,
  spectra: `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path d="M8 34c6-18 10-18 14 0s8 18 20-14"/><path d="M8 18h34M8 26h34"/></svg>`,
  cosmos: `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><circle cx="24" cy="24" r="5"/><path d="M8 25c7-13 25-17 34-8M6 34c12-3 28 2 36 10M14 10c6 12 8 23 4 34"/></svg>`,
  software: `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path d="m18 16-9 8 9 8M30 16l9 8-9 8M26 12l-5 28"/></svg>`,
  community: `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><circle cx="24" cy="14" r="5"/><circle cx="12" cy="32" r="5"/><circle cx="36" cy="32" r="5"/><path d="M21 18 15 28M27 18l6 10M17 32h14"/></svg>`,
};

const careerStops = [
  {
    years: "1999-2004",
    role: "BSc Astronomy",
    place: "Federal University of Rio de Janeiro",
    label: "UFRJ",
    city: "Rio de Janeiro, Brazil",
    type: "education",
    coordinates: [-43.23, -22.86],
    link: "https://ufrj.br/en/",
    image: "assets/images/institutions/ufrj.svg",
  },
  {
    years: "2004-2009",
    role: "Direct-Entry PhD in Astrophysics",
    place: "University of Sao Paulo",
    label: "USP",
    city: "Sao Paulo, Brazil",
    type: "education",
    coordinates: [-46.73, -23.56],
    link: "https://www5.usp.br/",
    image: "assets/images/institutions/usp.svg",
  },
  {
    years: "2010-2011",
    role: "Postdoctoral Fellow",
    place: "Kavli IPMU",
    label: "IPMU",
    city: "Kashiwanoha, Japan",
    type: "work",
    coordinates: [139.94, 35.89],
    link: "https://www.ipmu.jp/en",
    image: "assets/images/institutions/ipmu.svg",
  },
  {
    years: "2012-2014",
    role: "Postdoctoral Fellow",
    place: "Korea Astronomy and Space Science Institute",
    label: "KASI",
    city: "Daejeon, South Korea",
    type: "work",
    coordinates: [127.37, 36.39],
    link: "https://www.kasi.re.kr/eng/index",
    image: "assets/images/institutions/kasi.svg",
  },
  {
    years: "2014-2016",
    role: "Postdoctoral Fellow",
    place: "Eotvos Lorand University",
    label: "ELTE",
    city: "Budapest, Hungary",
    type: "work",
    coordinates: [19.06, 47.47],
    link: "https://www.elte.hu/en/",
    image: "assets/images/institutions/elte.svg",
  },
  {
    years: "2017-2020",
    role: "Postdoctoral Fellow",
    place: "University of North Carolina at Chapel Hill",
    label: "UNC",
    city: "Chapel Hill, USA",
    type: "work",
    coordinates: [-79.05, 35.91],
    link: "https://www.unc.edu/",
    image: "assets/images/institutions/unc.svg",
  },
  {
    years: "2020-2022",
    role: "Associate Professor",
    place: "Shanghai Astronomical Observatory",
    label: "SHAO",
    city: "Shanghai, China",
    type: "work",
    coordinates: [121.19, 31.1],
    link: "https://english.shao.cas.cn/",
    image: "assets/images/institutions/shao.svg",
  },
  {
    years: "2023-present",
    role: "Senior Lecturer, Centre for Astrophysics Research",
    place: "University of Hertfordshire",
    label: "Herts",
    city: "Hatfield, United Kingdom",
    type: "work",
    coordinates: [-0.24, 51.75],
    link: "https://www.herts.ac.uk/research/centres/car",
    image: "assets/images/institutions/herts.svg",
  },
  {
    years: "2024-present",
    role: "Adjunct Associate Professor",
    place: "University of North Carolina at Chapel Hill",
    label: "UNC",
    city: "Chapel Hill, USA",
    type: "work",
    coordinates: [-78.42, 36.38],
    link: "https://www.unc.edu/",
    image: "assets/images/institutions/unc.svg",
  },
  {
    years: "2025-present",
    role: "Visiting Scholar",
    place: "Federal University of Rio Grande do Sul",
    label: "UFRGS",
    city: "Porto Alegre, Brazil",
    type: "work",
    coordinates: [-51.22, -30.03],
    link: "https://www.ufrgs.br/",
    image: "assets/images/institutions/ufrgs.svg",
  },
];

function contentUrl(path) {
  const version = [siteAssetVersion, pageContentVersion].filter(Boolean).join("&");
  return version ? `${path}?${version}` : path;
}

function publicationLinks(links = {}) {
  const entries = Array.isArray(links) ? links.map((link) => [link.label, link.url]) : Object.entries(links);
  return entries
    .map(([label, url]) => `<a href="${url}">${label}</a>`)
    .join("");
}

function renderResearchLinks(links = []) {
  return links.map((link) => `<a href="${link.url}">${link.label}</a>`).join("");
}

function renderSoftwareLinks(links = []) {
  return links.map((link) => `<a href="${link.url}">${link.label}</a>`).join("");
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

async function loadText(path) {
  const response = await fetch(contentUrl(path));
  if (!response.ok) throw new Error(`Could not load ${path}`);
  return response.text();
}

async function loadMarkdownOrJson(markdownPath, jsonPath, parser) {
  try {
    return parser(await loadText(markdownPath));
  } catch (markdownError) {
    const response = await fetch(contentUrl(jsonPath));
    return response.json();
  }
}

function normalizeMarkdownHeading(value = "") {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function parseMarkdownValue(value = "") {
  if (/^(true|false)$/i.test(value)) return value.toLowerCase() === "true";
  if (/^\d+$/.test(value)) return Number(value);
  return value;
}

function markdownParagraphs(lines) {
  return lines
    .join("\n")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\n+/g, " ").trim())
    .filter(Boolean);
}

function parseMarkdownLinks(lines, startIndex) {
  const links = [];
  let index = startIndex;
  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }
    if (/^[A-Za-z][A-Za-z0-9_-]*:\s*/.test(line)) break;

    const markdownLink = line.match(/^-\s*\[([^\]]+)\]\(([^)]+)\)/);
    const pairLink = line.match(/^-\s*([^:]+):\s*(.+)$/);
    if (markdownLink) {
      links.push({ label: markdownLink[1].trim(), url: markdownLink[2].trim() });
    } else if (pairLink) {
      links.push({ label: pairLink[1].trim(), url: pairLink[2].trim() });
    }
    index += 1;
  }
  return { links, index };
}

function parseMarkdownFootnotes(lines, startIndex) {
  const footnotes = [];
  let index = startIndex;
  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }
    if (/^[A-Za-z][A-Za-z0-9_-]*:\s*/.test(line)) break;
    footnotes.push(line.replace(/^-\s*/, ""));
    index += 1;
  }
  return { footnotes, index };
}

function parseMarkdownItem(title, lines) {
  const item = { title };
  const proseLines = [];
  let index = 0;

  while (index < lines.length) {
    const rawLine = lines[index];
    const line = rawLine.trim();
    if (!line) {
      index += 1;
      continue;
    }

    const field = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!field) {
      proseLines.push(rawLine);
      index += 1;
      continue;
    }

    const key = field[1];
    const value = field[2].trim();
    index += 1;

    if (key === "links") {
      const parsed = parseMarkdownLinks(lines, index);
      item.links = parsed.links;
      index = parsed.index;
    } else if (key === "body") {
      const bodyLines = [];
      while (index < lines.length && !/^footnotes:\s*$/i.test(lines[index].trim())) {
        bodyLines.push(lines[index]);
        index += 1;
      }
      item.body = markdownParagraphs(bodyLines);
    } else if (key === "footnotes") {
      const parsed = parseMarkdownFootnotes(lines, index);
      item.footnotes = parsed.footnotes;
      index = parsed.index;
    } else {
      item[key] = parseMarkdownValue(value);
    }
  }

  if (!item.summary && proseLines.length) {
    item.summary = markdownParagraphs(proseLines).join(" ");
  }

  return item;
}

function parseMarkdownSections(markdown) {
  const sections = { default: [] };
  let section = "default";
  let current = null;

  function closeCurrent() {
    if (!current) return;
    sections[section] ||= [];
    sections[section].push(parseMarkdownItem(current.title, current.lines));
    current = null;
  }

  markdown.replace(/\r\n/g, "\n").split("\n").forEach((line) => {
    const sectionMatch = line.match(/^##\s+(.+)$/);
    const itemMatch = line.match(/^###\s+(.+)$/);

    if (sectionMatch) {
      closeCurrent();
      section = normalizeMarkdownHeading(sectionMatch[1]);
      sections[section] ||= [];
    } else if (itemMatch) {
      closeCurrent();
      current = { title: itemMatch[1].trim(), lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  });

  closeCurrent();
  return sections;
}

function firstMarkdownSection(sections, names) {
  for (const name of names) {
    const key = normalizeMarkdownHeading(name);
    if (sections[key]?.length) return sections[key];
  }
  return sections.default || [];
}

function parseSoftwareMarkdown(markdown) {
  return firstMarkdownSection(parseMarkdownSections(markdown), ["Software"]);
}

function parseWritingMarkdown(markdown) {
  return { works: firstMarkdownSection(parseMarkdownSections(markdown), ["Writing", "Works"]) };
}

function parsePublicationsMarkdown(markdown) {
  return firstMarkdownSection(parseMarkdownSections(markdown), ["Publications", "Bibliography"]);
}

function parseResearchMarkdown(markdown) {
  const sections = parseMarkdownSections(markdown);
  return {
    interests: firstMarkdownSection(sections, ["Research interests", "Interests"]),
    applications: firstMarkdownSection(sections, ["Research highlights", "Highlights", "Applications"]),
  };
}

const bibtexTypeMap = {
  article: "paper",
  inproceedings: "proceeding",
  bookchapter: "chapter",
  incatalogues: "catalogue",
  book: "book",
  software: "software",
  tns: "report",
};

function cleanLatex(value = "") {
  const replacements = [
    [/\\textbf\s*\{/g, ""],
    [/\\emph\s*\{/g, ""],
    [/\\&/g, "&"],
    [/~/g, " "],
    [/--/g, "-"],
    [/``/g, '"'],
    [/''/g, '"'],
    [/\\_/g, "_"],
    [/\\%/g, "%"],
    [/\\\$/g, "$"],
    [/\\#/g, "#"],
    [/\\[a-zA-Z]+\s*/g, ""],
    [/[{}]/g, ""],
    [/\s+/g, " "],
  ];
  return replacements.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value).trim();
}

function splitBibtexEntries(text) {
  const entries = [];
  let index = 0;

  while (index < text.length) {
    const at = text.indexOf("@", index);
    if (at < 0) break;

    const header = text.slice(at).match(/^@([A-Za-z]+)\s*\{\s*([^,]+),/);
    if (!header) {
      index = at + 1;
      continue;
    }

    const entryType = header[1].toLowerCase();
    const key = header[2].trim();
    let cursor = at + header[0].length;
    let depth = 1;
    const start = cursor;

    while (cursor < text.length && depth > 0) {
      if (text[cursor] === "{") depth += 1;
      if (text[cursor] === "}") depth -= 1;
      cursor += 1;
    }

    entries.push({ entryType, key, body: text.slice(start, cursor - 1) });
    index = cursor;
  }

  return entries;
}

function splitBibtexFields(body) {
  const fields = {};
  let index = 0;

  while (index < body.length) {
    while (index < body.length && /[\s,]/.test(body[index])) index += 1;

    const nameMatch = body.slice(index).match(/^([A-Za-z][A-Za-z0-9_-]*)\s*=/);
    if (!nameMatch) {
      index += 1;
      continue;
    }

    const name = nameMatch[1].toLowerCase();
    index += nameMatch[0].length;
    while (index < body.length && /\s/.test(body[index])) index += 1;

    let value = "";
    if (body[index] === "{") {
      index += 1;
      const start = index;
      let depth = 1;
      while (index < body.length && depth > 0) {
        if (body[index] === "{") depth += 1;
        if (body[index] === "}") depth -= 1;
        index += 1;
      }
      value = body.slice(start, index - 1);
    } else if (body[index] === '"') {
      index += 1;
      const start = index;
      while (index < body.length && body[index] !== '"') index += 1;
      value = body.slice(start, index);
      index += 1;
    } else {
      const start = index;
      while (index < body.length && body[index] !== ",") index += 1;
      value = body.slice(start, index);
    }

    fields[name] = cleanLatex(value);
  }

  return fields;
}

function bibtexLinks(fields) {
  const links = {};
  if (fields.doi) {
    const doi = fields.doi.replace(/^https?:\/\/doi\.org\//, "");
    links.DOI = `https://doi.org/${doi}`;
  }
  if (fields.adsurl) links.ADS = fields.adsurl;
  if (fields.eprint) links.arXiv = `https://arxiv.org/abs/${fields.eprint}`;
  if (fields.url && !Object.values(links).includes(fields.url)) links.URL = fields.url;
  return links;
}

function publicationFromBibtex(entry) {
  const fields = splitBibtexFields(entry.body);
  const yearText = fields.year || "0";
  const yearMatch = yearText.match(/\d{4}/);

  return {
    id: entry.key,
    year: yearMatch ? Number(yearMatch[0]) : yearText,
    type: bibtexTypeMap[entry.entryType] || entry.entryType,
    bibtex_type: entry.entryType,
    title: fields.title || entry.key,
    authors: fields.author || "",
    venue: fields.journal || fields.booktitle || fields.publisher || "",
    volume: fields.volume || "",
    pages: fields.pages || "",
    links: bibtexLinks(fields),
  };
}

function parseBibtexPublications(bibtex) {
  return splitBibtexEntries(bibtex).map(publicationFromBibtex);
}

async function loadBibtexOrJson(bibPath, jsonPath) {
  try {
    return parseBibtexPublications(await loadText(bibPath));
  } catch (bibtexError) {
    const response = await fetch(contentUrl(jsonPath));
    return response.json();
  }
}

function renderSoftware(items) {
  if (!softwareGrid) return;
  softwareGrid.innerHTML = items
    .map(
      (item) => `
        <article class="project-card${item.featured ? " featured" : ""}">
          <div class="project-mark${item.logo ? " has-logo" : ""}">
            ${item.logo ? `<img src="${item.logo}" alt="${item.name} logo" loading="lazy">` : item.mark || item.name.charAt(0)}
          </div>
          <span>${item.tag} · ${item.year}</span>
          <h3>${item.name}</h3>
          <p>${item.summary}</p>
          <div class="project-links">${renderSoftwareLinks(item.links)}</div>
        </article>
      `
    )
    .join("");
}

async function loadSoftware() {
  if (!softwareGrid) return;
  try {
    renderSoftware(await loadMarkdownOrJson("content/software.md", "content/software.json", parseSoftwareMarkdown));
  } catch (error) {
    softwareGrid.innerHTML = `
      <article class="project-card">
        <div class="project-mark">S</div>
        <span>Software data</span>
        <h3>Could not load content/software.json</h3>
        <p>Check the JSON syntax and refresh the page.</p>
      </article>
    `;
  }
}

function renderWriting(data) {
  if (!writingGrid || !Array.isArray(data.works) || data.works.length === 0) return;
  writingGrid.classList.toggle("is-single", data.works.length === 1);
  writingGrid.innerHTML = data.works
    .map((item) => {
      const body = Array.isArray(item.body)
        ? `
          <details class="writing-reader">
            <summary>${escapeHtml(item.readerLabel || "Read story")}</summary>
            <div class="writing-prose">
              ${item.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
              ${
                Array.isArray(item.footnotes)
                  ? `<div class="writing-footnotes">${item.footnotes
                      .map((note) => `<p>${escapeHtml(note)}</p>`)
                      .join("")}</div>`
                  : ""
              }
            </div>
          </details>
        `
        : "";

      return `
        <article class="writing-card">
          <div class="writing-cover${item.cover ? " has-cover" : " writing-cover-placeholder"}">
            ${item.cover ? `<img src="${escapeHtml(item.cover)}" alt="${escapeHtml(item.title)} cover" loading="lazy">` : ""}
            <span>${escapeHtml(item.type || "Fiction")}</span>
            <strong>${escapeHtml(item.coverLabel || item.title)}</strong>
          </div>
          <div class="writing-card-body">
            <span>${escapeHtml([item.type, item.year].filter(Boolean).join(" · "))}</span>
            <h3>${escapeHtml(item.title)}</h3>
            ${item.authors ? `<p class="writing-authors">By ${escapeHtml(item.authors)}</p>` : ""}
            <p>${escapeHtml(item.summary)}</p>
            ${item.status ? `<p class="writing-status">${escapeHtml(item.status)}</p>` : ""}
            <div class="writing-links">${renderResearchLinks(item.links || [])}</div>
            ${body}
          </div>
        </article>
      `;
    })
    .join("");

  writingGrid.querySelectorAll(".writing-cover.has-cover img").forEach((image) => {
    image.addEventListener("error", () => {
      const cover = image.closest(".writing-cover");
      if (!cover) return;
      cover.classList.remove("has-cover");
      cover.classList.add("writing-cover-placeholder");
      image.remove();
    });
  });
}

async function loadWriting() {
  if (!writingGrid) return;
  try {
    renderWriting(await loadMarkdownOrJson("content/writing.md", "content/writing.json", parseWritingMarkdown));
  } catch (error) {
    return;
  }
}

function renderResearchContent(data) {
  if (researchInterestGrid) {
    researchInterestGrid.innerHTML = data.interests
      .map(
        (item) => `
          <article class="interest-card">
            <div class="interest-icon">${researchIcons[item.icon] || researchIcons.inference}</div>
            <span>${item.tag}</span>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <div class="interest-links">${renderResearchLinks(item.links)}</div>
          </article>
        `
      )
      .join("");
  }

  if (researchApplicationGrid) {
    researchApplicationGrid.innerHTML = data.applications
      .map(
        (item) => `
          <article class="research-card">
            <a href="${item.url}">
              <img class="${item.imageFit === "contain" ? "research-project-mark" : ""}" src="${item.image}" alt="${item.alt}" loading="lazy">
              <div>
                <span>${item.tag}</span>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
              </div>
            </a>
          </article>
        `
      )
      .join("");
  }
}

async function loadResearchContent() {
  if (!researchInterestGrid && !researchApplicationGrid) return;
  try {
    renderResearchContent(await loadMarkdownOrJson("content/research.md", "content/research.json", parseResearchMarkdown));
  } catch (error) {
    if (researchInterestGrid) {
      researchInterestGrid.innerHTML = `
        <article class="interest-card">
          <span>Research data</span>
          <h3>Could not load content/research.json</h3>
          <p>Check the JSON syntax and refresh the page.</p>
        </article>
      `;
    }
  }
}

function matchesSearch(item, query) {
  const haystack = [item.title, item.authors, item.venue, item.year, item.type]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function renderPublications() {
  if (!publicationList || !publicationCount) return;
  const query = publicationSearch?.value.trim() || "";
  const visible = publications.filter((item) => {
    const filterMatch = activeFilter === "all" || item.type === activeFilter;
    const searchMatch = !query || matchesSearch(item, query);
    return filterMatch && searchMatch;
  });

  publicationCount.textContent = `${visible.length} of ${publications.length} entries`;

  publicationList.innerHTML = visible
    .map(
      (item) => `
        <article class="publication-card">
          <div class="publication-meta">
            <span>${item.year}</span>
            <span>${item.type}</span>
          </div>
          <h3>${item.title}</h3>
          ${item.authors ? `<p class="authors">${item.authors}</p>` : ""}
          <p class="venue">${item.venue}</p>
          ${item.summary ? `<p>${item.summary}</p>` : ""}
          <div class="publication-links">${publicationLinks(item.links)}</div>
        </article>
      `
    )
    .join("");
}

async function loadPublications() {
  if (!publicationList) return;
  try {
    publications = await loadMarkdownOrJson("content/publications.md", "content/publications.json", parsePublicationsMarkdown);
    publications.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
    renderPublications();
  } catch (error) {
    publicationList.innerHTML = `
      <article class="publication-card">
        <span>Publication data</span>
        <h3>Could not load content/publications.json</h3>
        <p>Check the JSON syntax and refresh the page.</p>
      </article>
    `;
  }
}

filterButtons?.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    activeFilter = button.dataset.filter;
    renderPublications();
  });
});

publicationSearch?.addEventListener("input", renderPublications);

loadPublications();
loadResearchContent();
loadSoftware();
loadWriting();

function updateMapPanel(stop) {
  if (!mapPlace || !mapRole || !mapLink) return;
  mapPlace.textContent = stop.place;
  mapRole.textContent = `${stop.years} · ${stop.role}.`;
  if (mapCity) mapCity.textContent = stop.city;
  if (mapImage) {
    mapImage.src = stop.image || "assets/images/institutions/herts.svg";
    mapImage.alt = `${stop.place} visual`;
  }
  mapLink.href = stop.link;
}

function setActiveMapStop(stop, pins) {
  updateMapPanel(stop);
  pins?.classed("is-active", (item) => item === stop);
  pins?.select(".pin-halo").attr("r", (item) => (item === stop ? 19 : 12));
  pins?.select(".pin-core").attr("r", (item) => (item === stop ? 6.8 : 4.7));

  mapStopList?.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.place === `${stop.years}-${stop.place}`);
  });
}

function renderMapStopList(pins) {
  if (!mapStopList) return;
  mapStopList.innerHTML = careerStops
    .slice()
    .reverse()
    .map(
      (stop) => `
        <button type="button" data-place="${stop.years}-${stop.place}">
          <span>${stop.years}</span>
          <strong>${stop.label} · ${stop.role}</strong>
        </button>
      `
    )
    .join("");

  mapStopList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const stop = careerStops.find((item) => button.dataset.place === `${item.years}-${item.place}`);
      if (stop) setActiveMapStop(stop, pins);
    });
  });
}

async function initCareerMap() {
  const svgElement = document.querySelector("#career-map");
  if (!svgElement || !window.d3) return;

  const width = 960;
  const height = 520;
  const svg = d3
    .select(svgElement)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  const projection = d3
    .geoNaturalEarth1()
    .scale(188)
    .translate([width / 2, height / 2 + 24]);
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule10();
  const current =
    careerStops.find((stop) => stop.place === "University of Hertfordshire") ||
    careerStops[careerStops.length - 1];
  const routePairs = careerStops.slice(1).map((stop, index) => [careerStops[index], stop]);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  svg.selectAll("*").remove();
  svg
    .append("defs")
    .html(`
      <linearGradient id="route-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
        <stop offset="0%" stop-color="#8fd5cb" stop-opacity="0.92"></stop>
        <stop offset="52%" stop-color="#b9892d" stop-opacity="0.98"></stop>
        <stop offset="100%" stop-color="#e5a083" stop-opacity="0.92"></stop>
      </linearGradient>
      <filter id="map-glow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="3" result="blur"></feGaussianBlur>
        <feMerge>
          <feMergeNode in="blur"></feMergeNode>
          <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
      </filter>
    `);

  const viewport = svg.append("g").attr("class", "map-viewport");
  const zoom = d3
    .zoom()
    .scaleExtent([1, 4])
    .translateExtent([
      [-120, -80],
      [width + 120, height + 80],
    ])
    .on("zoom", (event) => {
      viewport.attr("transform", event.transform);
    });

  svg.call(zoom);

  function zoomToStop(stop) {
    if (!stop || reduceMotion) return;
    const [x, y] = point(stop);
    const scale = 2.2;
    const transform = d3.zoomIdentity.translate(width / 2 - x * scale, height / 2 - y * scale).scale(scale);
    svg.transition().duration(650).ease(d3.easeCubicOut).call(zoom.transform, transform);
  }

  mapZoomIn?.addEventListener("click", () => {
    svg.transition().duration(260).call(zoom.scaleBy, 1.35);
  });
  mapZoomOut?.addEventListener("click", () => {
    svg.transition().duration(260).call(zoom.scaleBy, 0.74);
  });
  mapReset?.addEventListener("click", () => {
    svg.transition().duration(360).call(zoom.transform, d3.zoomIdentity);
  });

  viewport.append("path").datum({ type: "Sphere" }).attr("class", "map-sphere").attr("d", path);
  viewport.append("path").datum(graticule).attr("class", "map-graticule").attr("d", path);

  try {
    const response = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
    const world = await response.json();
    const countries = topojson.feature(world, world.objects.countries).features;
    const borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);

    viewport
      .append("g")
      .attr("aria-hidden", "true")
      .selectAll("path")
      .data(countries)
      .join("path")
      .attr("class", (country) =>
        visitedCountryIds.has(String(country.id).padStart(3, "0")) ? "map-country is-visited" : "map-country"
      )
      .attr("d", path);

    viewport.append("path").datum(borders).attr("class", "map-borders").attr("d", path);
  } catch (error) {
    viewport.append("path").datum(graticule).attr("class", "map-land").attr("d", path);
  }

  function point(stop) {
    return projection(stop.coordinates);
  }

  function routePath(from, to) {
    const [x1, y1] = point(from);
    const [x2, y2] = point(to);
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.max(1, Math.hypot(dx, dy));
    const lift = Math.min(96, Math.max(34, distance * 0.18));
    const curveDirection = x1 < x2 ? -1 : 1;
    const cx = (x1 + x2) / 2 + (-dy / distance) * lift * curveDirection;
    const cy = (y1 + y2) / 2 + (dx / distance) * lift * curveDirection;
    return `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`;
  }

  viewport
    .append("g")
    .attr("aria-hidden", "true")
    .selectAll("path")
    .data(routePairs)
    .join("path")
    .attr("class", "map-route-shadow")
    .attr("d", ([from, to]) => routePath(from, to));

  const routes = viewport
    .append("g")
    .attr("aria-hidden", "true")
    .selectAll("path")
    .data(routePairs)
    .join("path")
    .attr("class", "map-route")
    .attr("d", ([from, to]) => routePath(from, to));

  if (!reduceMotion) {
    routes.each(function (_pair, index) {
      const length = this.getTotalLength();
      d3.select(this)
        .attr("stroke-dasharray", `${length} ${length}`)
        .attr("stroke-dashoffset", length)
        .transition()
        .delay(index * 120)
        .duration(900)
        .ease(d3.easeCubicOut)
        .attr("stroke-dashoffset", 0);
    });
  }

  viewport
    .append("g")
    .attr("aria-hidden", "true")
    .selectAll("text")
    .data(routePairs)
    .join("text")
    .attr("class", "map-year")
    .attr("x", ([, to]) => point(to)[0] + 9)
    .attr("y", ([, to]) => point(to)[1] - 10)
    .text(([, to]) => to.years.replace("-present", "+"));

  const pins = viewport
    .append("g")
    .selectAll("g")
    .data(careerStops)
    .join("g")
    .attr("class", (stop) => `map-pin ${stop.type}${stop === current ? " is-active" : ""}`)
    .attr("transform", (stop) => `translate(${projection(stop.coordinates).join(",")})`)
    .attr("tabindex", 0)
    .attr("role", "button")
    .attr("aria-label", (stop) => `${stop.years}, ${stop.role}, ${stop.place}`)
    .on("click", function (_event, stop) {
      setActiveMapStop(stop, pins);
      zoomToStop(stop);
    })
    .on("keydown", function (event, stop) {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      setActiveMapStop(stop, pins);
      zoomToStop(stop);
    });

  pins.append("circle").attr("class", "pin-halo").attr("r", (stop) => (stop === current ? 19 : 12));
  pins.append("circle").attr("class", "pin-core").attr("r", (stop) => (stop === current ? 6.8 : 4.7));

  if (!reduceMotion) {
    pins
      .filter((stop) => stop === current)
      .select(".pin-halo")
      .transition()
      .duration(1200)
      .ease(d3.easeSinInOut)
      .attr("r", 23)
      .transition()
      .duration(1200)
      .attr("r", 19);
  }

  pins
    .append("text")
    .attr("x", 12)
    .attr("y", 4)
    .text((stop) => stop.label);

  renderMapStopList(pins);
  setActiveMapStop(current, pins);
}

initCareerMap();

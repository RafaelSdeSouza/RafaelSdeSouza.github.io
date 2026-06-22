const publicationList = document.querySelector("#publication-list");
const filterButtons = document.querySelectorAll(".filter-button");
const publicationSearch = document.querySelector("#publication-search");
const publicationCount = document.querySelector("#publication-count");
const publicationCopy = document.querySelector("#publications .section-copy");
const publicationImpact = document.querySelector("#publications .publication-impact");
const featuredBook = document.querySelector("#publications .featured-book");
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
const homeRoot = document.querySelector("#home");
const contactPage = document.querySelector(".contact-page");
const coinHero = document.querySelector(".coin-hero");
const cvPage = document.querySelector(".cv-page");
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

let careerStops = [
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
    .filter(([, url]) => Boolean(url))
    .map(([label, url]) => `<a href="${escapeHtml(url)}">${escapeHtml(label)}</a>`)
    .join("");
}

function publicationPrimaryUrl(links = {}) {
  const entries = Array.isArray(links) ? links.map((link) => [link.label, link.url]) : Object.entries(links);
  const priority = ["DOI", "ADS", "arXiv", "Paper", "Preprint", "URL", "Cambridge"];
  const normalized = entries.filter(([, url]) => Boolean(url));
  const preferred = priority
    .map((label) => normalized.find(([entryLabel]) => String(entryLabel).toLowerCase() === label.toLowerCase()))
    .find(Boolean);
  return (preferred || normalized[0] || [null, ""])[1];
}

function publicationBadge(label, className, url = "") {
  const content = escapeHtml(label);
  const classes = `publication-badge ${className}`;
  return url
    ? `<a class="${classes}" href="${escapeHtml(url)}">${content}</a>`
    : `<span class="${classes}">${content}</span>`;
}

function publicationVenueLabel(item) {
  if (!item.venue) return "";
  const number = item.number ? `(${item.number})` : "";
  const volume = item.volume ? `${item.volume}${number}` : "";
  const page = item.pages || item.eid || "";
  return [item.venue, volume, page].filter(Boolean).join(" · ");
}

function publicationBadges(item, primaryUrl = "") {
  const typeLabel = item.type && item.type !== "paper" ? item.type : "";
  const venueLabel = publicationVenueLabel(item);

  return [
    item.year ? publicationBadge(item.year, "year-badge") : "",
    typeLabel ? publicationBadge(typeLabel, "type-badge") : "",
    venueLabel ? publicationBadge(venueLabel, "venue-badge", primaryUrl) : "",
  ]
    .filter(Boolean)
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

function firstMarkdownItem(sections, names) {
  return firstMarkdownSection(sections, names)[0] || {};
}

function markdownSummary(item) {
  return item.lead || item.summary || "";
}

function renderPlainLinks(links = []) {
  return links.map((link) => `<a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a>`).join("");
}

function renderActionLinks(items = [], primaryClass = "primary") {
  return items
    .map((item) => {
      const isPrimary = item.primary || item.style === primaryClass;
      const classes = ["button", isPrimary ? primaryClass : ""]
        .filter(Boolean)
        .join(" ");
      return `<a class="${classes}" href="${escapeHtml(item.url || "#")}">${escapeHtml(item.label || item.title)}</a>`;
    })
    .join("");
}

function renderGenericCards(items = []) {
  return items
    .map(
      (item) => `
        <article class="project-card${item.featured ? " featured" : ""}">
          <div class="project-mark${item.logo ? " has-logo" : ""}">
            ${item.logo ? `<img src="${escapeHtml(item.logo)}" alt="${escapeHtml(item.title)} logo" loading="lazy">` : escapeHtml(item.mark || item.title.charAt(0))}
          </div>
          <span>${escapeHtml(item.tag || "")}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.summary || "")}</p>
          <div class="project-links">${renderPlainLinks(item.links || [])}</div>
        </article>
      `
    )
    .join("");
}

function parseSoftwareMarkdown(markdown) {
  const sections = parseMarkdownSections(markdown);
  return {
    header: firstMarkdownItem(sections, ["Page", "Header"]),
    software: firstMarkdownSection(sections, ["Software"]).map((item) => ({
      ...item,
      name: item.name || item.title,
    })),
    mediaHeader: firstMarkdownItem(sections, ["Media header", "Media intro"]),
    media: firstMarkdownSection(sections, ["Media", "Selected media"]),
  };
}

function parseWritingMarkdown(markdown) {
  const sections = parseMarkdownSections(markdown);
  return {
    header: firstMarkdownItem(sections, ["Page", "Header"]),
    sectionHeader: firstMarkdownItem(sections, ["Writing section", "Works header"]),
    works: firstMarkdownSection(sections, ["Writing", "Works"]),
  };
}

function parsePublicationsMarkdown(markdown) {
  return firstMarkdownSection(parseMarkdownSections(markdown), ["Publications", "Bibliography"]);
}

function parsePublicationPageMarkdown(markdown) {
  const sections = parseMarkdownSections(markdown);
  return {
    header: firstMarkdownSection(sections, ["Page", "Header"])[0] || {},
    impact: firstMarkdownSection(sections, ["Impact", "Publication impact", "Impact badges"]),
    featuredBook: firstMarkdownSection(sections, ["Featured book", "Book"])[0] || null,
  };
}

function parseResearchMarkdown(markdown) {
  const sections = parseMarkdownSections(markdown);
  return {
    header: firstMarkdownItem(sections, ["Page", "Header"]),
    interestsHeader: firstMarkdownItem(sections, ["Research interests header", "Interests header"]),
    interests: firstMarkdownSection(sections, ["Research interests", "Interests"]),
    highlightsHeader: firstMarkdownItem(sections, ["Research highlights header", "Highlights header"]),
    applications: firstMarkdownSection(sections, ["Research highlights", "Highlights", "Applications"]),
    community: firstMarkdownItem(sections, ["Community", "COIN strip"]),
    communityLinks: firstMarkdownSection(sections, ["Community links", "COIN window links"]),
  };
}

function parseHomeMarkdown(markdown) {
  const sections = parseMarkdownSections(markdown);
  return {
    hero: firstMarkdownItem(sections, ["Hero"]),
    roles: firstMarkdownSection(sections, ["Roles"]),
    actions: firstMarkdownSection(sections, ["Hero actions", "Actions"]),
    impact: firstMarkdownSection(sections, ["Impact", "Highlights"]),
    contact: firstMarkdownItem(sections, ["Contact"]),
    contactLinks: firstMarkdownSection(sections, ["Contact links"]),
  };
}

function parseCVMarkdown(markdown) {
  const sections = parseMarkdownSections(markdown);
  return {
    header: firstMarkdownItem(sections, ["Page", "Header"]),
    map: firstMarkdownItem(sections, ["Map", "Map overlay"]),
    appointments: firstMarkdownSection(sections, ["Appointments", "Career"]),
    fundingHeader: firstMarkdownItem(sections, ["Funding header", "Funding and awards header"]),
    funding: firstMarkdownSection(sections, ["Funding and awards", "Funding"]),
    teachingHeader: firstMarkdownItem(sections, ["Teaching header", "Teaching and service header"]),
    teaching: firstMarkdownSection(sections, ["Teaching and service", "Teaching"]),
  };
}

function parseCoinMarkdown(markdown) {
  const sections = parseMarkdownSections(markdown);
  return {
    hero: firstMarkdownItem(sections, ["Hero"]),
    actions: firstMarkdownSection(sections, ["Hero actions", "Actions"]),
    window: firstMarkdownItem(sections, ["Window", "COIN window"]),
    windowLinks: firstMarkdownSection(sections, ["Window links", "COIN window links"]),
    networkHeader: firstMarkdownItem(sections, ["Network header", "Showcase header"]),
    cards: firstMarkdownSection(sections, ["Cards", "Projects"]),
  };
}

function parseContactMarkdown(markdown) {
  const sections = parseMarkdownSections(markdown);
  return {
    contact: firstMarkdownItem(sections, ["Contact", "Page"]),
    links: firstMarkdownSection(sections, ["Links", "Contact links"]),
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

const latexJournalMap = {
  aap: "A&A",
  aapr: "A&A Rev.",
  aj: "AJ",
  apj: "ApJ",
  apjl: "ApJL",
  apjs: "ApJS",
  mnras: "MNRAS",
  nat: "Nature",
  pasp: "PASP",
  prc: "Phys. Rev. C",
  prd: "Phys. Rev. D",
};

function cleanLatex(value = "") {
  const replacements = [
    [/\\([a-zA-Z]+)/g, (match, name) => latexJournalMap[name.toLowerCase()] || match],
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
    number: fields.number || "",
    pages: fields.pages || "",
    eid: fields.eid || "",
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

function renderSoftwarePage(data) {
  const items = Array.isArray(data) ? data : data.software || [];
  if (data.header?.title) {
    const copy = document.querySelector(".software-showcase .showcase-copy");
    if (copy) {
      copy.querySelector(".eyebrow").textContent = data.header.eyebrow || copy.querySelector(".eyebrow").textContent;
      copy.querySelector("h1").textContent = data.header.title;
      copy.querySelector("p:not(.eyebrow)").textContent = markdownSummary(data.header);
    }
  }

  const mediaBand = document.querySelector(".media-band");
  if (mediaBand && data.mediaHeader?.title) {
    mediaBand.querySelector(".eyebrow").textContent = data.mediaHeader.eyebrow || mediaBand.querySelector(".eyebrow").textContent;
    mediaBand.querySelector("h2").textContent = data.mediaHeader.title;
  }
  const mediaLinks = document.querySelector(".media-links");
  if (mediaLinks && data.media?.length) {
    mediaLinks.innerHTML = data.media
      .map(
        (item) => `
          <a href="${escapeHtml(item.url || "#")}">
            <span>${escapeHtml(item.tag || "")}</span>
            ${escapeHtml(item.summary || item.title)}
          </a>
        `
      )
      .join("");
  }

  renderSoftware(items);
}

async function loadSoftware() {
  if (!softwareGrid) return;
  try {
    renderSoftwarePage(await loadMarkdownOrJson("content/software.md", "content/software.json", parseSoftwareMarkdown));
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
  if (data.header?.title) {
    const hero = document.querySelector(".writing-hero");
    if (hero) {
      hero.querySelector(".eyebrow").textContent = data.header.eyebrow || hero.querySelector(".eyebrow").textContent;
      hero.querySelector("h1").textContent = data.header.title;
      hero.querySelector(".lead").textContent = markdownSummary(data.header);
    }
  }
  if (data.sectionHeader?.eyebrow) {
    const section = document.querySelector(".writing-section");
    section?.querySelector(".eyebrow") && (section.querySelector(".eyebrow").textContent = data.sectionHeader.eyebrow);
  }
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
  const interests = data.interests || [];
  const applications = data.applications || [];

  if (data.header?.title) {
    const hero = document.querySelector(".page-hero");
    if (hero) {
      hero.querySelector(".eyebrow").textContent = data.header.eyebrow || hero.querySelector(".eyebrow").textContent;
      hero.querySelector("h1").textContent = data.header.title;
      hero.querySelector(".lead").textContent = markdownSummary(data.header);
    }
  }

  if (data.interestsHeader?.title) {
    const copy = document.querySelector(".research-interests .section-copy");
    if (copy) {
      copy.querySelector(".eyebrow").textContent = data.interestsHeader.eyebrow || copy.querySelector(".eyebrow").textContent;
      copy.querySelector("h2").textContent = data.interestsHeader.title;
      copy.querySelector("p:not(.eyebrow)").textContent = markdownSummary(data.interestsHeader);
    }
  }

  if (researchInterestGrid) {
    researchInterestGrid.innerHTML = interests
      .map(
        (item) => `
          <article class="interest-card">
            <div class="interest-icon">${researchIcons[item.icon] || researchIcons.inference}</div>
            <span>${escapeHtml(item.tag || "")}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.summary || "")}</p>
            <div class="interest-links">${renderResearchLinks(item.links)}</div>
          </article>
        `
      )
      .join("");
  }

  if (data.highlightsHeader?.title) {
    const copy = document.querySelector(".research-examples .section-copy");
    if (copy) copy.querySelector("h2").textContent = data.highlightsHeader.title;
  }

  if (researchApplicationGrid) {
    researchApplicationGrid.innerHTML = applications
      .map(
        (item) => `
          <article class="research-card">
            <a href="${escapeHtml(item.url || "#")}">
              <img class="${item.imageFit === "contain" ? "research-project-mark" : ""}" src="${escapeHtml(item.image || "")}" alt="${escapeHtml(item.alt || item.title)}" loading="lazy">
              <div>
                <span>${escapeHtml(item.tag || "")}</span>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.summary || "")}</p>
              </div>
            </a>
          </article>
        `
      )
      .join("");
  }

  if (data.community?.title) {
    const strip = document.querySelector(".coin-strip");
    if (strip) {
      strip.querySelector(".coin-copy .eyebrow").textContent = data.community.eyebrow || strip.querySelector(".coin-copy .eyebrow").textContent;
      strip.querySelector(".coin-copy h2").textContent = data.community.title;
      strip.querySelector(".coin-copy p").innerHTML = data.community.summary || "";
      const windowLink = strip.querySelector(".coin-window");
      if (windowLink && data.community.url) windowLink.href = data.community.url;
      const image = strip.querySelector(".coin-window-body img");
      if (image && data.community.logo) image.src = data.community.logo;
      const strong = strip.querySelector(".coin-window-body strong");
      if (strong) strong.textContent = data.community.windowTitle || "COIN";
      const em = strip.querySelector(".coin-window-body em");
      if (em) em.textContent = data.community.windowSubtitle || "Cosmostatistics Initiative";
      const links = strip.querySelector(".coin-window-links");
      if (links && data.communityLinks?.length) {
        links.innerHTML = data.communityLinks.map((item) => `<span>${escapeHtml(item.label || item.title)}</span>`).join("");
      }
    }
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
    .map((item) => {
      const primaryUrl = publicationPrimaryUrl(item.links);
      const title = escapeHtml(item.title || "Untitled");
      const titleHtml = primaryUrl
        ? `<a href="${escapeHtml(primaryUrl)}">${title}</a>`
        : title;

      return `
        <article class="publication-card">
          <div class="publication-meta">${publicationBadges(item, primaryUrl)}</div>
          <h3>${titleHtml}</h3>
          ${item.authors ? `<p class="authors">${escapeHtml(item.authors)}</p>` : ""}
          ${item.summary ? `<p>${escapeHtml(item.summary)}</p>` : ""}
          <div class="publication-links">${publicationLinks(item.links)}</div>
        </article>
      `;
    })
    .join("");
}

async function loadPublications() {
  if (!publicationList) return;
  try {
    publications = await loadBibtexOrJson("assets/cv/references.bib", "content/publications.json");
    publications.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
    renderPublications();
  } catch (error) {
    publicationList.innerHTML = `
      <article class="publication-card">
        <span>Publication data</span>
        <h3>Could not load assets/cv/references.bib</h3>
        <p>Check the BibTeX file and refresh the page.</p>
      </article>
    `;
  }
}

async function loadPublicationPageContent() {
  if (!publicationCopy && !publicationImpact && !featuredBook) return;
  try {
    const data = parsePublicationPageMarkdown(await loadText("content/publications.md"));
    if (publicationCopy && data.header.title) {
      publicationCopy.querySelector("h1").textContent = data.header.title;
      publicationCopy.querySelector("p").textContent = data.header.summary || "";
    }

    if (publicationImpact && data.impact.length) {
      publicationImpact.innerHTML = data.impact
        .map(
          (item) => `
            <a href="${escapeHtml(item.url || "publications.html")}">
              <strong>${escapeHtml(item.value || item.title)}</strong>
              <span>${escapeHtml(item.label || item.summary || "")}</span>
            </a>
          `
        )
        .join("");
    }

    if (featuredBook && data.featuredBook) {
      const book = data.featuredBook;
      featuredBook.innerHTML = `
        <div class="book-cover">
          <img
            src="${escapeHtml(book.cover || "assets/images/book-cover-bayesian-models.jpg")}"
            alt="${escapeHtml(book.alt || `${book.title} cover`)}"
            loading="lazy">
        </div>
        <div>
          <p class="eyebrow">${escapeHtml(book.eyebrow || "Featured Book")}</p>
          <h2>${escapeHtml(book.title)}</h2>
          <p>${escapeHtml(book.summary || "")}</p>
          <div class="featured-book-links">${renderResearchLinks(book.links || [])}</div>
        </div>
      `;
    }
  } catch (error) {
    return;
  }
}

async function loadHomeContent() {
  if (!homeRoot) return;
  try {
    const data = parseHomeMarkdown(await loadText("content/home.md"));
    const hero = homeRoot.querySelector(".hero");
    if (hero && data.hero?.title) {
      hero.querySelector(".eyebrow").textContent = data.hero.eyebrow || hero.querySelector(".eyebrow").textContent;
      hero.querySelector("h1").textContent = data.hero.title;
      hero.querySelector(".lead").innerHTML = markdownSummary(data.hero);
      const portrait = hero.querySelector(".identity-portrait, .portrait");
      if (portrait && data.hero.portrait) portrait.src = data.hero.portrait;
      if (portrait && data.hero.portraitAlt) portrait.alt = data.hero.portraitAlt;
      const caption = hero.querySelector(".portrait-caption");
      if (caption) caption.textContent = data.hero.portraitCaption || caption.textContent;
    }

    const heroMeta = homeRoot.querySelector(".hero-meta");
    if (heroMeta && data.roles.length) {
      heroMeta.innerHTML = data.roles
        .map((item) => {
          const label = escapeHtml(item.label || item.title);
          return `<span>${label}${item.url ? `, <a href="${escapeHtml(item.url)}">${escapeHtml(item.place || item.linkLabel || item.urlLabel || "link")}</a>` : ""}</span>`;
        })
        .join("");
    }

    const heroActions = homeRoot.querySelector(".hero-actions");
    if (heroActions && data.actions.length) heroActions.innerHTML = renderActionLinks(data.actions);

    const impactStrip = homeRoot.querySelector(".impact-strip");
    if (impactStrip && data.impact.length) {
      impactStrip.innerHTML = data.impact
        .map(
          (item) => `
            <a href="${escapeHtml(item.url || "#")}">
              <strong>${escapeHtml(item.value || item.title)}</strong>
              <span>${escapeHtml(item.label || item.summary || "")}</span>
            </a>
          `
        )
        .join("");
    }

    const contact = homeRoot.querySelector(".compact-contact");
    if (contact && data.contact?.title) {
      contact.querySelector(".eyebrow").textContent = data.contact.eyebrow || contact.querySelector(".eyebrow").textContent;
      contact.querySelector("h2").textContent = data.contact.title;
      contact.querySelector("p:not(.eyebrow)").innerHTML = data.contact.summary || "";
    }
    const contactLinks = homeRoot.querySelector(".compact-contact .contact-links");
    if (contactLinks && data.contactLinks.length) {
      contactLinks.innerHTML = data.contactLinks
        .map((item) => `<a href="${escapeHtml(item.url || "#")}">${escapeHtml(item.label || item.title)}</a>`)
        .join("");
    }
  } catch (error) {
    return;
  }
}

async function loadContactContent() {
  if (!contactPage) return;
  try {
    const data = parseContactMarkdown(await loadText("content/contact.md"));
    if (data.contact?.title) {
      contactPage.querySelector(".eyebrow").textContent = data.contact.eyebrow || contactPage.querySelector(".eyebrow").textContent;
      contactPage.querySelector("h1").textContent = data.contact.title;
      contactPage.querySelector("p:not(.eyebrow)").innerHTML = data.contact.summary || "";
    }
    const links = contactPage.querySelector(".contact-links");
    if (links && data.links.length) {
      links.innerHTML = data.links
        .map((item) => `<a href="${escapeHtml(item.url || "#")}">${escapeHtml(item.label || item.title)}</a>`)
        .join("");
    }
  } catch (error) {
    return;
  }
}

async function loadCoinContent() {
  if (!coinHero) return;
  try {
    const data = parseCoinMarkdown(await loadText("content/coin.md"));
    if (data.hero?.title) {
      coinHero.querySelector(".eyebrow").textContent = data.hero.eyebrow || coinHero.querySelector(".eyebrow").textContent;
      coinHero.querySelector("h1").textContent = data.hero.title;
      coinHero.querySelector(".lead").textContent = markdownSummary(data.hero);
    }
    const heroActions = coinHero.querySelector(".hero-actions");
    if (heroActions && data.actions.length) heroActions.innerHTML = renderActionLinks(data.actions);

    const windowLink = coinHero.querySelector(".coin-window");
    if (windowLink && data.window?.url) windowLink.href = data.window.url;
    if (data.window?.title) {
      const image = coinHero.querySelector(".coin-window-body img");
      if (image && data.window.logo) image.src = data.window.logo;
      coinHero.querySelector(".coin-window-body strong").textContent = data.window.title;
      coinHero.querySelector(".coin-window-body em").textContent = data.window.summary || "";
    }
    const windowLinks = coinHero.querySelector(".coin-window-links");
    if (windowLinks && data.windowLinks.length) {
      windowLinks.innerHTML = data.windowLinks.map((item) => `<span>${escapeHtml(item.label || item.title)}</span>`).join("");
    }

    const showcase = document.querySelector(".compact-showcase");
    if (showcase && data.networkHeader?.title) {
      showcase.querySelector(".showcase-copy .eyebrow").textContent =
        data.networkHeader.eyebrow || showcase.querySelector(".showcase-copy .eyebrow").textContent;
      showcase.querySelector(".showcase-copy h2").textContent = data.networkHeader.title;
      showcase.querySelector(".showcase-copy p").textContent = markdownSummary(data.networkHeader);
    }
    const grid = showcase?.querySelector(".project-grid");
    if (grid && data.cards.length) grid.innerHTML = renderGenericCards(data.cards);
  } catch (error) {
    return;
  }
}

function appointmentFromMarkdown(item) {
  const coordinates = String(item.coordinates || "")
    .split(",")
    .map((value) => Number(value.trim()))
    .filter((value) => !Number.isNaN(value));
  return {
    years: item.years || "",
    role: item.role || item.title,
    place: item.place || "",
    label: item.label || item.place || item.title,
    city: item.city || "",
    type: item.type || "work",
    coordinates: coordinates.length === 2 ? coordinates : [0, 0],
    link: item.url || item.link || "#",
    image: item.image || "",
    summary: item.summary || "",
  };
}

async function loadCVContent() {
  if (!cvPage) return;
  try {
    const data = parseCVMarkdown(await loadText("content/cv.md"));
    if (data.header?.title) {
      const copy = cvPage.querySelector(".section-copy");
      copy.querySelector("h1").textContent = data.header.title;
      copy.querySelector("p").textContent = markdownSummary(data.header);
    }

    if (data.map?.title) {
      const overlay = cvPage.querySelector(".map-overlay");
      overlay.querySelector(".eyebrow").textContent = data.map.eyebrow || overlay.querySelector(".eyebrow").textContent;
      overlay.querySelector("strong").textContent = data.map.title;
      overlay.querySelector("span").textContent = markdownSummary(data.map);
    }

    if (data.appointments.length) {
      careerStops = data.appointments.map(appointmentFromMarkdown);
      const timeline = cvPage.querySelector(".career-list");
      if (timeline) {
        timeline.innerHTML = careerStops
          .slice()
          .reverse()
          .map(
            (stop) => `
              <article>
                <span>${escapeHtml(stop.years)}</span>
                <h3>${escapeHtml(stop.role)}</h3>
                <p><a href="${escapeHtml(stop.link)}">${escapeHtml(stop.place)}</a>${stop.summary ? `. ${escapeHtml(stop.summary)}` : ""}</p>
              </article>
            `
          )
          .join("");
      }
    }

    const columns = document.querySelectorAll(".two-column article");
    if (columns[0] && data.fundingHeader?.title) {
      columns[0].querySelector(".eyebrow").textContent = data.fundingHeader.eyebrow || columns[0].querySelector(".eyebrow").textContent;
      columns[0].querySelector("h2").textContent = data.fundingHeader.title;
    }
    if (columns[0] && data.funding.length) {
      columns[0].querySelector("ul").innerHTML = data.funding
        .map((item) => `<li>${item.year ? `<strong>${escapeHtml(item.year)}:</strong> ` : ""}${item.url ? `<a href="${escapeHtml(item.url)}">${escapeHtml(item.title)}</a>` : escapeHtml(item.title)}${item.summary ? `, ${escapeHtml(item.summary)}` : ""}</li>`)
        .join("");
    }
    if (columns[1] && data.teachingHeader?.title) {
      columns[1].querySelector(".eyebrow").textContent =
        data.teachingHeader.eyebrow || columns[1].querySelector(".eyebrow").textContent;
      columns[1].querySelector("h2").textContent = data.teachingHeader.title;
    }
    if (columns[1] && data.teaching.length) {
      columns[1].querySelector("ul").innerHTML = data.teaching
        .map((item) => `<li>${escapeHtml(item.summary || item.title)}</li>`)
        .join("");
    }
  } catch (error) {
    return;
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
loadPublicationPageContent();
loadHomeContent();
loadResearchContent();
loadSoftware();
loadWriting();
loadContactContent();
loadCoinContent();
loadCVContent().finally(initCareerMap);

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

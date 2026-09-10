const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

const slugify = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function initialiseNavigation() {
  const button = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!button || !nav) return;
  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
      button.setAttribute("aria-expanded", "false");
      button.focus();
    }
  });
}

async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response.json();
}

async function loadProfileLinks() {
  const nodes = document.querySelectorAll("[data-profile-link]");
  if (!nodes.length) return;
  const profile = await fetchJson("content/profile.json");
  nodes.forEach(node => {
    const url = profile.links?.[node.dataset.profileLink];
    if (!url) return;
    node.href = url;
    if (/^https?:/.test(url)) node.rel = "me noopener";
  });
}

function formatVenue(record) {
  const parts = [];
  if (record.venue) parts.push(record.venue);
  else if (record.publisher) parts.push(record.publisher);
  if (record.volume) parts.push(`vol. ${record.volume}`);
  if (record.number) parts.push(`no. ${record.number}`);
  if (record.pages) parts.push(record.pages);
  else if (record.eid) parts.push(record.eid);
  return parts.join(", ");
}

function publicationMarkup(record) {
  const primary = (record.links || []).find(link => link.label === "DOI")
    || (record.links || []).find(link => link.label === "ADS")
    || (record.links || []).find(link => link.label === "arXiv")
    || (record.links || [])[0];
  const links = (record.links || []).map(link => `<a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a>`).join("");
  return `<article class="catalogue-row grid publication-row" data-id="${escapeHtml(record.id)}">
    <div class="slot marginal" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:1"><p>${escapeHtml(record.year)}</p><p>${escapeHtml(record.type)}</p></div>
    <div class="slot" style="--col:3;--span:7;--tcol:2;--tspan:5;--mcol:2;--mspan:3">
      <h2 class="catalogue-title">${primary ? `<a href="${escapeHtml(primary.url)}">${escapeHtml(record.title)}</a>` : escapeHtml(record.title)}</h2>
      <p class="catalogue-authors">${escapeHtml(record.authors)}</p>
    </div>
    <div class="slot catalogue-meta" style="--col:10;--span:3;--tcol:7;--tspan:2;--mcol:2;--mspan:3">
      <p>${escapeHtml(formatVenue(record))}</p>
      <nav class="link-line">${links}</nav>
      <details><summary>BibTeX</summary><pre>${escapeHtml(record.bibtex)}</pre></details>
    </div>
  </article>`;
}

async function initialisePublications() {
  const list = document.querySelector("[data-publication-list]");
  if (!list) return;
  const input = document.querySelector("[data-publication-search]");
  const count = document.querySelector("[data-publication-count]");
  const buttons = [...document.querySelectorAll("[data-publication-filter]")];
  const filterLinks = [...document.querySelectorAll("[data-set-filter]")];
  const records = await fetchJson("content/publications.json");
  let filter = "all";
  const render = () => {
    const query = (input?.value || "").trim().toLowerCase();
    const visible = records.filter(record => {
      const matchesFilter = filter === "all" || (filter === "first-author" ? record.firstAuthor : record.facets.includes(filter));
      const haystack = [record.title, record.authors, record.year, record.venue, record.publisher, record.volume, record.number, record.pages, record.eid, ...(record.links || []).map(link => link.url)].join(" ").toLowerCase();
      return matchesFilter && (!query || haystack.includes(query));
    });
    if (count) count.textContent = `Showing ${visible.length} of ${records.length} records`;
    list.innerHTML = visible.length ? visible.map(publicationMarkup).join("") : '<p class="empty-state">No publication matches the current search and filters.</p>';
  };
  const setFilter = next => {
    filter = next;
    buttons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.publicationFilter === filter)));
    render();
  };
  input?.addEventListener("input", render);
  buttons.forEach(button => button.addEventListener("click", () => setFilter(button.dataset.publicationFilter)));
  filterLinks.forEach(link => link.addEventListener("click", event => {
    event.preventDefault();
    setFilter(link.dataset.setFilter);
    document.querySelector("#publication-list")?.scrollIntoView();
  }));
  render();
}

function softwareActions(project) {
  const fields = [
    ["paper_url", "Paper"],
    ["docs_url", "Docs"],
    ["getting_started_url", "Get Started"],
    ["github_url", "GitHub"],
    ["release_url", "Release"]
  ];
  const actions = fields.filter(([field]) => project[field]).map(([field, label]) => ({label, url: project[field]}));
  if (project.registry_url) actions.push({label: project.registry_label || "Registry", url: project.registry_url});
  return actions;
}

function softwareMarkup(project) {
  const displayName = project.display_name || project.name;
  const actions = softwareActions(project);
  const primary = project.docs_url || project.github_url || project.paper_url || project.release_url || project.registry_url;
  const mark = project.logo ? `<img class="project-mark" loading="lazy" src="${escapeHtml(project.logo)}" alt="${escapeHtml(displayName)} project mark">` : "";
  return `<article class="catalogue-row grid software-row" id="${slugify(project.name)}">
    <div class="slot marginal" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:1"><p>${project.year ? escapeHtml(project.year) : "—"}</p><p>${escapeHtml(project.status)}</p></div>
    <div class="slot project-identity" style="--col:3;--span:3;--tcol:2;--tspan:2;--mcol:2;--mspan:3">
      <h2 class="catalogue-title">${primary ? `<a href="${escapeHtml(primary)}">${escapeHtml(displayName)}</a>` : escapeHtml(displayName)}</h2>
      ${mark}
    </div>
    <div class="slot project-purpose" style="--col:6;--span:4;--tcol:4;--tspan:3;--mcol:2;--mspan:3"><p>${escapeHtml(project.purpose)}</p><p class="project-problem">${escapeHtml(project.problem)}</p></div>
    <nav class="slot link-line catalogue-actions" style="--col:10;--span:3;--tcol:7;--tspan:2;--mcol:2;--mspan:3">${actions.map(action => `<a href="${escapeHtml(action.url)}">${escapeHtml(action.label)}</a>`).join("")}</nav>
  </article>`;
}

async function initialiseSoftware() {
  const root = document.querySelector("[data-software-catalogue]");
  if (!root) return;
  const catalogue = await fetchJson("content/software.json");
  const records = [...catalogue.published, ...catalogue.systems, ...catalogue.development];
  root.innerHTML = records.map(softwareMarkup).join("");
  const count = document.querySelector("[data-software-count]");
  if (count) count.textContent = `${records.length} projects · ${catalogue.published.length} published packages · ${catalogue.systems.length} research systems · ${catalogue.development.length} in development`;
}

const peopleGroups = [
  ["currentPhd", "Current doctoral researchers", "PhD", "Current"],
  ["currentUndergraduate", "Current undergraduate research", "Undergraduate", "Current"],
  ["formerPhd", "Former doctoral researchers", "PhD", "Former"],
  ["formerMasters", "Former master's researchers", "Master's", "Former"],
  ["formerUndergraduate", "Former undergraduate research", "Undergraduate", "Former"]
];

function personMarkup(person, degree, status) {
  const details = [degree, person.institution].filter(Boolean);
  if (person.outcome) details.push(person.outcome);
  return `<article class="mentor-row grid">
    <div class="slot marginal mentor-date" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:4"><p>${escapeHtml(person.years)}</p><p>${status}</p></div>
    <h3 class="slot mentor-name" style="--col:3;--span:4;--tcol:2;--tspan:3;--mcol:1;--mspan:4">${escapeHtml(person.name)}</h3>
    <p class="slot mentor-project" style="--col:7;--span:4;--tcol:5;--tspan:3;--mcol:1;--mspan:4">${escapeHtml(person.project)}</p>
    <div class="slot mentor-meta" style="--col:11;--span:2;--tcol:8;--tspan:1;--mcol:1;--mspan:4">${details.map(detail => `<p>${escapeHtml(detail)}</p>`).join("")}</div>
  </article>`;
}

function teachingMarkup(item) {
  return `<article class="catalogue-row grid teaching-row">
    <div class="slot marginal" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:1"><p>${escapeHtml(item.years)}</p><p>${escapeHtml(item.term)}</p></div>
    <h3 class="slot record-name" style="--col:3;--span:5;--tcol:2;--tspan:4;--mcol:2;--mspan:3">${escapeHtml(item.course)}</h3>
    <div class="slot record-detail" style="--col:8;--span:3;--tcol:6;--tspan:2;--mcol:2;--mspan:3"><p>${escapeHtml(item.level)}</p></div>
    <p class="slot metadata" style="--col:11;--span:2;--tcol:8;--tspan:1;--mcol:2;--mspan:3">${escapeHtml(item.enrolment)} students</p>
  </article>`;
}

async function initialiseSiteData() {
  const peopleRoot = document.querySelector("[data-people-catalogue]");
  const teachingRoot = document.querySelector("[data-teaching-catalogue]");
  if (!peopleRoot && !teachingRoot) return;
  const site = await fetchJson("content/site.json");
  if (peopleRoot) {
    peopleRoot.innerHTML = peopleGroups.map(([key, label, degree, status]) => {
      const rows = site.people[key] || [];
      if (!rows.length) return "";
      return `<section class="mentor-group" aria-labelledby="people-${key}"><h2 class="label people-section-label" id="people-${key}">${label}</h2>${rows.map(person => personMarkup(person, degree, status)).join("")}</section>`;
    }).join("");
  }
  if (teachingRoot) teachingRoot.innerHTML = site.teaching.map(teachingMarkup).join("");
}

function writingMarkup(work) {
  const authors = Array.isArray(work.authors) ? work.authors.join(" and ") : work.authors;
  const meta = [work.type, work.year].filter(Boolean).join(" · ");
  const essay = work.type === "Essay";
  const coverStyle = essay ? "--col:10;--span:2;--tcol:7;--tspan:2;--mcol:1;--mspan:2" : "--col:3;--span:2;--tcol:2;--tspan:2;--mcol:1;--mspan:2";
  const cover = work.cover ? `<figure class="slot writing-cover" style="${coverStyle}"><a href="${escapeHtml(work.url)}"><img loading="lazy" src="${escapeHtml(work.cover)}" alt="${escapeHtml(work.cover_alt || `Cover of ${work.title}`)}"></a></figure>` : "";
  const copyStyle = work.cover ? (work.type === "Essay" ? "--col:3;--span:6;--tcol:2;--tspan:5;--mcol:1;--mspan:4" : "--col:6;--span:6;--tcol:4;--tspan:5;--mcol:1;--mspan:4") : "--col:3;--span:7;--tcol:2;--tspan:6;--mcol:1;--mspan:4";
  const copy = `<div class="slot writing-copy" style="${copyStyle}"><h2><a href="${escapeHtml(work.url)}">${escapeHtml(work.title)}</a></h2><p class="writing-authors">${escapeHtml(authors)}</p>${work.excerpt ? `<p>${escapeHtml(work.excerpt).replace(/\n/g, "<br>")}</p>` : ""}${work.summary ? `<p>${escapeHtml(work.summary)}</p>` : ""}<nav class="link-line"><a href="${escapeHtml(work.url)}">Read</a></nav></div>`;
  return `<article class="writing-item ${work.cover ? "writing-object" : "writing-text"}${essay ? " writing-essay" : ""} grid"><p class="slot writing-meta" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:4">${escapeHtml(meta)}</p>${essay ? copy + cover : cover + copy}</article>`;
}

async function initialiseWriting() {
  const root = document.querySelector("[data-writing-archive]");
  if (!root) return;
  const data = await fetchJson("content/writing.json");
  root.innerHTML = data.works.filter(work => !work.featured).map(writingMarkup).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  initialiseNavigation();
  Promise.all([
    loadProfileLinks(),
    initialisePublications(),
    initialiseSoftware(),
    initialiseSiteData(),
    initialiseWriting()
  ]).catch(error => console.error(error));
});

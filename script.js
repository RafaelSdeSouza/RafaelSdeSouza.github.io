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
    nav.dataset.open = String(open);
  });
}

async function loadProfileLinks() {
  const nodes = document.querySelectorAll("[data-profile-link]");
  if (!nodes.length) return;
  try {
    const profile = await fetch("content/profile.json").then(response => response.json());
    nodes.forEach(node => {
      const url = profile.links?.[node.dataset.profileLink];
      if (url) {
        node.href = url;
        if (/^https?:/.test(url)) node.rel = "me noopener";
      }
    });
  } catch (error) {
    console.warn("Profile links could not be loaded.", error);
  }
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
  const links = (record.links || []).map(link => `<a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a>`).join("");
  return `<li class="publication-record">
    <div class="publication-year">${escapeHtml(record.year)}</div>
    <article>
      <h2 class="publication-title">${escapeHtml(record.title)}</h2>
      <p class="publication-authors">${escapeHtml(record.authors)}</p>
      <p class="publication-venue">${escapeHtml(formatVenue(record))}</p>
      <div class="publication-links">${links}</div>
      <details class="bibtex-details"><summary>BibTeX</summary><pre>${escapeHtml(record.bibtex)}</pre></details>
    </article>
  </li>`;
}

async function initialisePublications() {
  const list = document.querySelector("[data-publication-list]");
  if (!list) return;
  const input = document.querySelector("[data-publication-search]");
  const count = document.querySelector("[data-publication-count]");
  const buttons = [...document.querySelectorAll("[data-publication-filter]")];
  try {
    const records = await fetch("content/publications.json").then(response => response.json());
    let filter = "all";
    const render = () => {
      const query = input.value.trim().toLowerCase();
      const visible = records.filter(record => {
        const matchesFilter = filter === "all" || (filter === "first-author" ? record.firstAuthor : record.facets.includes(filter));
        const haystack = [record.title, record.authors, record.year, record.venue, record.publisher, record.volume, record.number, record.pages, record.eid, ...(record.links || []).map(link => link.url)].join(" ").toLowerCase();
        return matchesFilter && (!query || haystack.includes(query));
      });
      count.textContent = `Showing ${visible.length} of ${records.length} records`;
      list.innerHTML = visible.length ? visible.map(publicationMarkup).join("") : '<li class="empty-state">No publication matches the current search and filters.</li>';
    };
    input.addEventListener("input", render);
    buttons.forEach(button => button.addEventListener("click", () => {
      filter = button.dataset.publicationFilter;
      buttons.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
      render();
    }));
    render();
  } catch (error) {
    list.innerHTML = '<li class="empty-state">The publication record could not be loaded.</li>';
    console.error(error);
  }
}

function softwareMarkup(project) {
  const identity = project.logo
    ? `<img loading="lazy" src="${escapeHtml(project.logo)}" alt="${escapeHtml(project.name)}">`
    : `<span class="software-type">${escapeHtml(project.name)}</span>`;
  const projectLinks = project.links || [];
  const labels = new Set(projectLinks.map(link => link.label.toLowerCase()));
  const links = projectLinks.map(link => `<a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a>`).join("")
    + (labels.has("publication") || labels.has("preprint") ? "" : '<span>Publication —</span>')
    + (labels.has("repository") ? "" : '<span>Repository —</span>')
    + (labels.has("documentation") ? "" : '<span>Documentation —</span>');
  return `<article class="software-entry" id="${slugify(project.name)}">
    <div class="software-identity">${identity}</div>
    <div><h3 class="software-type">${escapeHtml(project.name)}</h3><p>${escapeHtml(project.purpose)}</p><p><strong>Scientific problem:</strong> ${escapeHtml(project.problem)}</p><div class="software-links">${links}</div></div>
    <div class="software-status">${escapeHtml(project.status)}${project.year ? ` · ${escapeHtml(project.year)}` : ""}</div>
  </article>`;
}

async function initialiseSoftware() {
  const root = document.querySelector("[data-software-atlas]");
  if (!root) return;
  try {
    const catalogue = await fetch("content/software.json").then(response => response.json());
    root.querySelector("[data-software-published]").innerHTML = catalogue.published.map(softwareMarkup).join("");
    root.querySelector("[data-software-systems]").innerHTML = catalogue.systems.map(softwareMarkup).join("");
    root.querySelector("[data-software-development]").innerHTML = catalogue.development.map(softwareMarkup).join("");
    const total = catalogue.published.length + catalogue.systems.length + catalogue.development.length;
    const count = root.querySelector("[data-software-count]");
    if (count) count.textContent = `${total} projects · ${catalogue.published.length} published packages · ${catalogue.systems.length} research systems · ${catalogue.development.length} in development`;
  } catch (error) {
    root.innerHTML = '<p class="empty-state">The software catalogue could not be loaded.</p>';
    console.error(error);
  }
}

function timelineMarkup(item, kind = "appointment") {
  const title = kind === "education" ? item.degree : item.role;
  return `<article class="timeline-row"><div class="timeline-year">${escapeHtml(item.years)}</div><div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(item.institution)}</p></div><p>${escapeHtml(item.detail || item.location || "")}</p></article>`;
}

function personMarkup(person) {
  const details = [person.institution, person.outcome].filter(Boolean).join(" · ");
  return `<article class="person"><p class="person-meta">${escapeHtml(person.years)}</p><h3>${escapeHtml(person.name)}</h3><p>${escapeHtml(person.project)}</p>${details ? `<p>${escapeHtml(details)}</p>` : ""}</article>`;
}

async function initialiseSiteData() {
  const roots = document.querySelectorAll("[data-site-list]");
  if (!roots.length) return;
  try {
    const site = await fetch("content/site.json").then(response => response.json());
    roots.forEach(root => {
      const key = root.dataset.siteList;
      if (key === "appointments") root.innerHTML = site.appointments.map(item => timelineMarkup(item)).join("");
      else if (key === "education") root.innerHTML = site.education.map(item => timelineMarkup(item, "education")).join("");
      else if (key === "recognition") root.innerHTML = site.recognition.map(item => `<article class="timeline-row"><div class="timeline-year">${escapeHtml(item.year)}</div><div><h3>${escapeHtml(item.name)}</h3></div><p>${escapeHtml(item.detail)}</p></article>`).join("");
      else if (key === "leadership") root.innerHTML = site.leadership.map(item => `<article class="timeline-row"><div class="timeline-year">${escapeHtml(item.years || "")}</div><div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.role)}</p></div><p>${escapeHtml(item.detail || "")}</p></article>`).join("");
      else if (key.startsWith("people.")) root.innerHTML = (site.people[key.split(".")[1]] || []).map(personMarkup).join("");
      else if (key === "teaching") root.innerHTML = site.teaching.map(item => `<article class="timeline-row"><div class="timeline-year">${escapeHtml(item.years)}</div><div><h3>${escapeHtml(item.course)}</h3><p>${escapeHtml(item.level)} · ${escapeHtml(item.term)}</p></div><p>${escapeHtml(item.enrolment)} students</p></article>`).join("");
    });
  } catch (error) {
    console.error(error);
  }
}

async function initialiseWriting() {
  const root = document.querySelector("[data-writing-list]");
  if (!root) return;
  try {
    const data = await fetch("content/writing.json").then(response => response.json());
    root.innerHTML = data.works.map(work => {
      const links = (work.links || []).map(link => `<a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a>`).join(" · ");
      const body = work.body?.length
        ? `<details class="bibtex-details"><summary>${escapeHtml(work.readerLabel || "Read text")}</summary><div class="writing-body">${work.body.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div></details>`
        : "";
      return `<article class="writing-piece"><p class="feature-meta">${escapeHtml(work.type)}${work.date ? ` · ${escapeHtml(work.date)}` : ""}</p><h2>${escapeHtml(work.title)}</h2><p>${escapeHtml(work.authors)}</p><p>${escapeHtml(work.summary)}</p><p class="record-links">${links}</p><p class="status">${escapeHtml(work.status)}</p>${body}</article>`;
    }).join("");
  } catch (error) {
    root.innerHTML = '<p class="empty-state">The writing catalogue could not be loaded.</p>';
    console.error(error);
  }
}

function initialiseFilterLinks() {
  document.querySelectorAll("[data-set-filter]").forEach(link => link.addEventListener("click", () => {
    const button = document.querySelector(`[data-publication-filter="${link.dataset.setFilter}"]`);
    if (button) button.click();
  }));
}

document.addEventListener("DOMContentLoaded", () => {
  initialiseNavigation();
  loadProfileLinks();
  initialisePublications();
  initialiseSoftware();
  initialiseSiteData();
  initialiseWriting();
  initialiseFilterLinks();
});

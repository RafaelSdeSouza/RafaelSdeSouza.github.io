const publicationList = document.querySelector("#publication-list");
const filterButtons = document.querySelectorAll(".filter-button");
const publicationSearch = document.querySelector("#publication-search");
const publicationCount = document.querySelector("#publication-count");

let publications = [];
let activeFilter = "all";

function publicationLinks(links = {}) {
  return Object.entries(links)
    .map(([label, url]) => `<a href="${url}">${label}</a>`)
    .join("");
}

function matchesSearch(item, query) {
  const haystack = [item.title, item.authors, item.venue, item.year, item.type]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function renderPublications() {
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
  try {
    const response = await fetch("content/publications.json");
    publications = await response.json();
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

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    activeFilter = button.dataset.filter;
    renderPublications();
  });
});

publicationSearch?.addEventListener("input", renderPublications);

loadPublications();

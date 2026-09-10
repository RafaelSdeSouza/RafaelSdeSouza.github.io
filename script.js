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

function initialisePublications() {
  const list = document.querySelector("[data-publication-list]");
  if (!list) return;

  const rows = [...list.querySelectorAll(".publication-row")];
  const input = document.querySelector("[data-publication-search]");
  const count = document.querySelector("[data-publication-count]");
  const empty = list.querySelector("[data-publication-empty]");
  const buttons = [...document.querySelectorAll("[data-publication-filter]")];
  const filterLinks = [...document.querySelectorAll("[data-set-filter]")];
  let filter = "all";

  const render = () => {
    const query = (input?.value || "").trim().toLowerCase();
    let visible = 0;

    rows.forEach(row => {
      const facets = (row.dataset.facets || "").split(/\s+/);
      const matchesFilter = filter === "all"
        || (filter === "first-author" ? row.dataset.firstAuthor === "true" : facets.includes(filter));
      const matchesSearch = !query || (row.dataset.search || "").includes(query);
      row.hidden = !(matchesFilter && matchesSearch);
      if (!row.hidden) visible += 1;
    });

    if (count) count.textContent = `Showing ${visible} of ${rows.length} records`;
    if (empty) empty.hidden = visible !== 0;
  };

  const setFilter = next => {
    filter = next;
    buttons.forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.publicationFilter === filter));
    });
    render();
  };

  input?.addEventListener("input", render);
  buttons.forEach(button => button.addEventListener("click", () => {
    setFilter(button.dataset.publicationFilter);
  }));
  filterLinks.forEach(link => link.addEventListener("click", event => {
    event.preventDefault();
    setFilter(link.dataset.setFilter);
    document.querySelector("#publication-list")?.scrollIntoView();
  }));

  render();
}

document.addEventListener("DOMContentLoaded", () => {
  initialiseNavigation();
  initialisePublications();
});

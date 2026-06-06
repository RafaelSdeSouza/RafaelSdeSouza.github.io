const publicationList = document.querySelector("#publication-list");
const filterButtons = document.querySelectorAll(".filter-button");
const publicationSearch = document.querySelector("#publication-search");
const publicationCount = document.querySelector("#publication-count");
const mapPlace = document.querySelector("#map-place");
const mapRole = document.querySelector("#map-role");
const mapLink = document.querySelector("#map-link");
const mapStopList = document.querySelector("#map-stop-list");
const researchInterestGrid = document.querySelector("#research-interest-grid");
const researchApplicationGrid = document.querySelector("#research-application-grid");
const softwareGrid = document.querySelector("#software-grid");

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
  },
];

function publicationLinks(links = {}) {
  return Object.entries(links)
    .map(([label, url]) => `<a href="${url}">${label}</a>`)
    .join("");
}

function renderResearchLinks(links = []) {
  return links.map((link) => `<a href="${link.url}">${link.label}</a>`).join("");
}

function renderSoftwareLinks(links = []) {
  return links.map((link) => `<a href="${link.url}">${link.label}</a>`).join("");
}

function renderSoftware(items) {
  if (!softwareGrid) return;
  softwareGrid.innerHTML = items
    .map(
      (item) => `
        <article class="project-card${item.featured ? " featured" : ""}">
          <div class="project-mark">${item.mark || item.name.charAt(0)}</div>
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
    const response = await fetch("content/software.json");
    renderSoftware(await response.json());
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
              <img src="${item.image}" alt="${item.alt}" loading="lazy">
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
    const response = await fetch("content/research.json");
    renderResearchContent(await response.json());
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

function updateMapPanel(stop) {
  if (!mapPlace || !mapRole || !mapLink) return;
  mapPlace.textContent = stop.place;
  mapRole.textContent = `${stop.years} · ${stop.role}. ${stop.city}.`;
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
    .attr("preserveAspectRatio", "xMidYMid slice");

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

  svg.append("path").datum({ type: "Sphere" }).attr("class", "map-sphere").attr("d", path);
  svg.append("path").datum(graticule).attr("class", "map-graticule").attr("d", path);

  try {
    const response = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
    const world = await response.json();
    const countries = topojson.feature(world, world.objects.countries).features;
    const borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);

    svg
      .append("g")
      .attr("aria-hidden", "true")
      .selectAll("path")
      .data(countries)
      .join("path")
      .attr("class", (country) =>
        visitedCountryIds.has(String(country.id).padStart(3, "0")) ? "map-country is-visited" : "map-country"
      )
      .attr("d", path);

    svg.append("path").datum(borders).attr("class", "map-borders").attr("d", path);
  } catch (error) {
    svg.append("path").datum(graticule).attr("class", "map-land").attr("d", path);
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

  svg
    .append("g")
    .attr("aria-hidden", "true")
    .selectAll("path")
    .data(routePairs)
    .join("path")
    .attr("class", "map-route-shadow")
    .attr("d", ([from, to]) => routePath(from, to));

  const routes = svg
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

  svg
    .append("g")
    .attr("aria-hidden", "true")
    .selectAll("text")
    .data(routePairs)
    .join("text")
    .attr("class", "map-year")
    .attr("x", ([, to]) => point(to)[0] + 9)
    .attr("y", ([, to]) => point(to)[1] - 10)
    .text(([, to]) => to.years.replace("-present", "+"));

  const pins = svg
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
    })
    .on("keydown", function (event, stop) {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      setActiveMapStop(stop, pins);
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

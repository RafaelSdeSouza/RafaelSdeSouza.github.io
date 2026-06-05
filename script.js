const publicationList = document.querySelector("#publication-list");
const filterButtons = document.querySelectorAll(".filter-button");
const publicationSearch = document.querySelector("#publication-search");
const publicationCount = document.querySelector("#publication-count");
const mapPlace = document.querySelector("#map-place");
const mapRole = document.querySelector("#map-role");
const mapLink = document.querySelector("#map-link");
const mapStopList = document.querySelector("#map-stop-list");

let publications = [];
let activeFilter = "all";

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

  svg.append("path").datum({ type: "Sphere" }).attr("class", "map-sphere").attr("d", path);
  svg.append("path").datum(graticule).attr("class", "map-graticule").attr("d", path);

  try {
    const response = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json");
    const world = await response.json();
    const land = topojson.feature(world, world.objects.land);
    svg.append("path").datum(land).attr("class", "map-land").attr("d", path);
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

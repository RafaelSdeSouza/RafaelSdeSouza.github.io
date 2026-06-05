const publicationList = document.querySelector("#publication-list");
const filterButtons = document.querySelectorAll(".filter-button");
const publicationSearch = document.querySelector("#publication-search");
const publicationCount = document.querySelector("#publication-count");
const mapPlace = document.querySelector("#map-place");
const mapRole = document.querySelector("#map-role");
const mapLink = document.querySelector("#map-link");

let publications = [];
let activeFilter = "all";

const careerStops = [
  {
    years: "1999-2004",
    role: "BSc Astronomy",
    place: "Federal University of Rio de Janeiro",
    city: "Rio de Janeiro, Brazil",
    type: "education",
    coordinates: [-43.23, -22.86],
    link: "https://ufrj.br/en/",
  },
  {
    years: "2004-2009",
    role: "Direct-Entry PhD in Astrophysics",
    place: "University of Sao Paulo",
    city: "Sao Paulo, Brazil",
    type: "education",
    coordinates: [-46.73, -23.56],
    link: "https://www5.usp.br/",
  },
  {
    years: "2010-2011",
    role: "Postdoctoral Fellow",
    place: "Kavli IPMU",
    city: "Kashiwanoha, Japan",
    type: "work",
    coordinates: [139.94, 35.89],
    link: "https://www.ipmu.jp/en",
  },
  {
    years: "2012-2014",
    role: "Postdoctoral Fellow",
    place: "Korea Astronomy and Space Science Institute",
    city: "Daejeon, South Korea",
    type: "work",
    coordinates: [127.37, 36.39],
    link: "https://www.kasi.re.kr/eng/index",
  },
  {
    years: "2014-2016",
    role: "Postdoctoral Fellow",
    place: "Eotvos Lorand University",
    city: "Budapest, Hungary",
    type: "work",
    coordinates: [19.06, 47.47],
    link: "https://www.elte.hu/en/",
  },
  {
    years: "2017-2020",
    role: "Postdoctoral Fellow",
    place: "University of North Carolina at Chapel Hill",
    city: "Chapel Hill, USA",
    type: "work",
    coordinates: [-79.05, 35.91],
    link: "https://www.unc.edu/",
  },
  {
    years: "2020-2022",
    role: "Associate Professor",
    place: "Shanghai Astronomical Observatory",
    city: "Shanghai, China",
    type: "work",
    coordinates: [121.19, 31.1],
    link: "https://english.shao.cas.cn/",
  },
  {
    years: "2023-present",
    role: "Senior Lecturer, Centre for Astrophysics Research",
    place: "University of Hertfordshire",
    city: "Hatfield, United Kingdom",
    type: "work",
    coordinates: [-0.24, 51.75],
    link: "https://www.herts.ac.uk/research/centres/car",
  },
  {
    years: "2024-present",
    role: "Adjunct Associate Professor",
    place: "University of North Carolina at Chapel Hill",
    city: "Chapel Hill, USA",
    type: "work",
    coordinates: [-79.05, 35.91],
    link: "https://www.unc.edu/",
  },
  {
    years: "2025-present",
    role: "Visiting Scholar",
    place: "Federal University of Rio Grande do Sul",
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

function initCareerMap() {
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
    .scale(178)
    .translate([width / 2, height / 2 + 18]);
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule10();
  const first = careerStops[0];
  const current =
    careerStops.find((stop) => stop.place === "University of Hertfordshire") ||
    careerStops[careerStops.length - 1];
  const routePairs = careerStops.slice(1).map((stop, index) => [careerStops[index], stop]);

  svg.selectAll("*").remove();

  svg.append("path").datum({ type: "Sphere" }).attr("class", "map-sphere").attr("d", path);
  svg.append("path").datum(graticule).attr("class", "map-graticule").attr("d", path);

  svg
    .append("g")
    .attr("aria-hidden", "true")
    .selectAll("path")
    .data(routePairs)
    .join("path")
    .attr("class", "map-route")
    .attr("d", ([from, to]) =>
      path({
        type: "LineString",
        coordinates: [from.coordinates, to.coordinates],
      })
    );

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
      pins.classed("is-active", (item) => item === stop);
      pins.select("circle").attr("r", (item) => (item === stop ? 7 : 5.2));
      updateMapPanel(stop);
    })
    .on("keydown", function (event, stop) {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      pins.classed("is-active", (item) => item === stop);
      pins.select("circle").attr("r", (item) => (item === stop ? 7 : 5.2));
      updateMapPanel(stop);
    });

  pins.append("circle").attr("r", (stop) => (stop === current ? 7 : 5.2));
  pins
    .append("text")
    .attr("x", 10)
    .attr("y", 4)
    .text((stop) => {
      if (stop === first) return "UFRJ";
      if (stop.place.includes("Sao Paulo")) return "USP";
      if (stop.place.includes("Korea")) return "KASI";
      if (stop.place.includes("Eotvos")) return "ELTE";
      if (stop.place.includes("North Carolina")) return "UNC";
      if (stop.place.includes("Shanghai")) return "SHAO";
      if (stop.place.includes("Hertfordshire")) return "Herts";
      if (stop.place.includes("Rio Grande")) return "UFRGS";
      return "IPMU";
    });

  updateMapPanel(current);
}

initCareerMap();

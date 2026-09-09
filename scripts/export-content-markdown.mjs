import { readFile, writeFile } from "node:fs/promises";

const contentDir = new URL("../content/", import.meta.url);

async function readJson(name) {
  return JSON.parse(await readFile(new URL(name, contentDir), "utf8"));
}

function linesForLinks(links) {
  const entries = Array.isArray(links)
    ? links.map((link) => [link.label, link.url])
    : Object.entries(links || {});
  if (!entries.length) return [];
  return ["links:", ...entries.map(([label, url]) => `- ${label}: ${url}`)];
}

function block(title, fields = {}, prose = []) {
  const lines = [`### ${title}`, ""];
  Object.entries(fields).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    lines.push(`${key}: ${value}`);
  });
  if (prose.length) {
    lines.push("", ...prose);
  }
  lines.push("");
  return lines.join("\n");
}

function researchMarkdown(data) {
  const label = (value) => value.replaceAll("-", " ");
  return [
    "# Research",
    "",
    "## Recurring inferential questions",
    "",
    ...data.questions.map((item) => `- ${label(item)}`),
    "",
    "## Astronomical domains",
    "",
    ...data.domains.map((item) => `- ${label(item)}`),
    "",
    "## Contribution forms",
    "",
    ...data.contribution_forms.map((item) => `- ${label(item)}`),
    "",
    "## Project index",
    "",
    ...data.projects.map((item) =>
      block(item.title, {
        id: item.id,
        questions: item.questions.map(label).join(" · "),
        domains: item.domains.map(label).join(" · "),
        methods: item.methods.map(label).join(" · "),
        contribution_forms: item.contribution_forms.map(label).join(" · "),
      })
    ),
  ].join("\n");
}

function softwareMarkdown(data) {
  const fields = [
    ["paper_url", "Paper"],
    ["docs_url", "Docs"],
    ["getting_started_url", "Get Started"],
    ["github_url", "GitHub"],
    ["release_url", "Release"],
    ["registry_url", null],
  ];
  const groups = [
    ["Published packages", data.published || []],
    ["Research systems and companion code", data.systems || []],
    ["In development", data.development || []],
  ];
  return [
    "# Software",
    "",
    ...groups.flatMap(([title, items]) => [
      `## ${title}`,
      "",
      ...items.map((item) => {
        const links = fields
          .filter(([field]) => item[field])
          .map(([field, label]) => ({
            label: label || item.registry_label || "Registry",
            url: item[field],
          }));
        return block(item.name, {
          year: item.year,
          purpose: item.purpose,
          problem: item.problem,
          status: item.status,
          logo: item.logo || undefined,
          homepage: item.homepage ? true : undefined,
        }, linesForLinks(links));
      }),
    ]),
  ].join("\n");
}

function writingMarkdown(data) {
  return [
    "# Writing",
    "",
    "## Writing",
    "",
    ...data.works.map((item) => {
      const body = Array.isArray(item.body) && item.body.length
        ? ["body:", "", ...item.body.flatMap((paragraph) => [paragraph, ""])]
        : [];
      const footnotes = Array.isArray(item.footnotes) && item.footnotes.length
        ? ["footnotes:", ...item.footnotes.map((note) => `- ${note}`)]
        : [];
      return block(item.title, {
        type: item.type,
        authors: item.authors || "",
        status: item.status || "",
        summary: item.summary || "",
        cover: item.cover || "",
        coverLabel: item.coverLabel || "",
        readerLabel: item.readerLabel || "",
      }, [...linesForLinks(item.links), ...body, ...footnotes]);
    }),
  ].join("\n");
}

const selected = new Set(process.argv.slice(2));
const exportAll = selected.size === 0;

if (exportAll || selected.has("research")) {
  await writeFile(new URL("research.md", contentDir), researchMarkdown(await readJson("research.json")));
}
if (exportAll || selected.has("software")) {
  await writeFile(new URL("software.md", contentDir), softwareMarkdown(await readJson("software.json")));
}
if (exportAll || selected.has("writing")) {
  await writeFile(new URL("writing.md", contentDir), writingMarkdown(await readJson("writing.json")));
}

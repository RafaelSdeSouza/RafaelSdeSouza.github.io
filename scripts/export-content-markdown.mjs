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
    if (value === undefined || value === null) return;
    lines.push(`${key}: ${value}`);
  });
  if (prose.length) {
    lines.push("", ...prose);
  }
  lines.push("");
  return lines.join("\n");
}

function researchMarkdown(data) {
  return [
    "# Research",
    "",
    "## Research interests",
    "",
    ...data.interests.map((item) =>
      block(item.title, {
        icon: item.icon,
        tag: item.tag,
        summary: item.summary,
      }, linesForLinks(item.links))
    ),
    "## Research highlights",
    "",
    ...data.applications.map((item) =>
      block(item.title, {
        image: item.image,
        imageFit: item.imageFit || "",
        alt: item.alt,
        tag: item.tag,
        summary: item.summary,
        url: item.url,
      })
    ),
  ].join("\n");
}

function softwareMarkdown(items) {
  return [
    "# Software",
    "",
    "## Software",
    "",
    ...items.map((item) =>
      block(item.name, {
        year: item.year,
        tag: item.tag,
        mark: item.mark,
        logo: item.logo || "",
        featured: item.featured || false,
        summary: item.summary,
      }, linesForLinks(item.links))
    ),
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

await writeFile(new URL("research.md", contentDir), researchMarkdown(await readJson("research.json")));
await writeFile(new URL("software.md", contentDir), softwareMarkdown(await readJson("software.json")));
await writeFile(new URL("writing.md", contentDir), writingMarkdown(await readJson("writing.json")));

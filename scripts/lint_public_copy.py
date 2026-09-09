#!/usr/bin/env python3
"""Check deployable copy, preserving genuine scientific and bibliographic terms."""
import argparse
import json
import re
from html.parser import HTMLParser
from pathlib import Path

from public_site import ROOT, public_files

FORBIDDEN = (
    "127.0.0.1", "localhost", "/design/", "design/concepts", "authored-atlas",
    "scientific modernism", "authored research", "production unchanged", "internal review",
    "exact revised opening", "typography comparison", "view stix candidate", "view source candidate",
    "view literata candidate", "navigation continuity", "review surfaces", "review surface",
    "implementation notes", "qa commentary", "our design", "concept review", "concept preview",
    "research at the intersection of", "these strands", "taken together", "unlocking",
    "revealing hidden structure", "physical insight", "a more complete picture", "bridging",
    "transforming data into knowledge", "cutting-edge", "innovative framework", "novel paradigm",
    "this page showcases", "this section highlights",
    "demo page", "demo only", "internal demo", "visual comparison", "implementation preview",
    "development preview", "development only", "qa report", "review environment",
)
SEARCH_TERMS = ("127.0.0.1", "localhost", "design/concepts", "authored-atlas", "production unchanged",
                "internal review", "typography", "candidate", "review", "concept", "production", "demo")
SOFTWARE_NAMES = {"spectropath", "radialpaths", "capivara", "sagui", "resspect", "spaxnmf",
                  "cosmoabc", "dracula", "sconce", "sconce-scms", "spectralunmix", "qrpca"}
for group in json.loads((ROOT / "content/software.json").read_text()).values():
    for project in group:
        SOFTWARE_NAMES.add(project["name"].casefold())
        SOFTWARE_NAMES.update(part.strip().casefold() for part in project["name"].split("/"))


class VisibleText(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.skip = 0
        self.units = []
        self.buffer = []
        self.heading = None
        self.heading_parts = []
        self.headings = []

    def flush(self):
        text = " ".join(" ".join(self.buffer).split())
        if text:
            self.units.append(text)
        self.buffer = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag in {"script", "style"}:
            self.skip += 1
        if tag in {"p", "h1", "h2", "h3", "div", "nav", "section", "article", "li", "br", "figcaption"}:
            self.flush()
        if tag in {"h2", "h3"}:
            self.heading, self.heading_parts = tag, []
        for key in ("alt", "title", "aria-label", "placeholder"):
            if values.get(key):
                self.units.append(values[key])
        if tag == "meta" and (values.get("name") == "description" or values.get("property") in {"og:title", "og:description"}):
            self.units.append(values.get("content", ""))

    def handle_endtag(self, tag):
        if tag in {"script", "style"}:
            self.skip = max(0, self.skip - 1)
        if tag == self.heading:
            self.headings.append((tag, " ".join(" ".join(self.heading_parts).split())))
            self.heading = None
        if tag in {"p", "h1", "h2", "h3", "div", "nav", "section", "article", "li", "figcaption"}:
            self.flush()

    def handle_data(self, data):
        if not self.skip:
            self.buffer.append(data)
            if self.heading:
                self.heading_parts.append(data)


def json_strings(value, path=""):
    if isinstance(value, dict):
        for key, item in value.items():
            yield from json_strings(item, f"{path}.{key}")
    elif isinstance(value, list):
        for index, item in enumerate(value):
            yield from json_strings(item, f"{path}[{index}]")
    elif isinstance(value, str):
        yield path, value


def classify(term, text, bibliography=False):
    if bibliography:
        return "scholarly record — original title, author, venue or identifier"
    lower = text.lower()
    if term == "candidate" and re.search(r"candidate (pool|sample|young|yso)|globular.cluster candidate|candidate[s]? (objects|stars)", lower):
        return "scientific — selected astronomical objects or observing pool"
    if term == "review" and re.search(r"peer.review|physical review|review of|reviewing", lower):
        return "scientific — publication or refereeing terminology"
    return None


def lint_tree(root=ROOT, dump_dir=None):
    errors, occurrences = [], []
    files = public_files() if root == ROOT else {p.relative_to(root).as_posix() for p in root.rglob("*") if p.is_file()}
    if root != ROOT:
        for name in sorted(files - public_files()):
            errors.append(f"Unexpected file in the public build: {name}")
    for name in sorted(files):
        file = root / name
        if file.suffix not in {".html", ".md", ".json", ".js", ".css", ".txt", ".bib", ".xml"}:
            continue
        raw = file.read_text()
        # Local/development destinations can never be scientific exceptions.
        for phrase in FORBIDDEN[:5]:
            if phrase in raw.lower():
                errors.append(f"{name}: forbidden destination {phrase!r}")
        parser = None
        bibliography = name == "content/publications.json" or file.suffix == ".bib"
        legal = name.startswith("assets/fonts/") and file.suffix == ".txt"
        if file.suffix == ".html":
            parser = VisibleText()
            parser.feed(raw)
            parser.flush()
            units = parser.units
        elif file.suffix == ".json":
            units = [text for _, text in json_strings(json.loads(raw))]
        elif file.suffix in {".md", ".txt"}:
            units = raw.splitlines()
        elif file.suffix == ".js":
            # Check user-facing strings inside the renderer as well as static HTML.
            units = re.findall(r'"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'|`(?:\\.|[^`\\])*`', raw)
        else:
            units = []
        for text in units:
            for phrase in FORBIDDEN[5:]:
                if phrase in text.lower() and not bibliography and not legal:
                    errors.append(f"{name}: prohibited public phrase {phrase!r}")
            for term in SEARCH_TERMS:
                if re.search(rf"\b{re.escape(term)}\b", text, re.I):
                    reason = "font licence — required legal notice" if legal else classify(term, text, bibliography)
                    occurrences.append({"file": name, "term": term, "text": text, "classification": reason or "unapproved public copy"})
                    if not reason:
                        errors.append(f"{name}: unclassified {term!r}: {text[:150]}")
        if name == "research.html" and parser:
            for tag, text in parser.headings:
                if text.lower().strip() in SOFTWARE_NAMES:
                    errors.append(f"Research {tag} is only a project name: {text}")
        if dump_dir and name in {"index.html", "research.html", "about.html", "writing.html"} and parser:
            dump_dir.mkdir(parents=True, exist_ok=True)
            (dump_dir / name.replace(".html", ".txt")).write_text("\n\n".join(parser.units) + "\n")
    if dump_dir:
        (dump_dir / "term-classification.json").write_text(json.dumps(occurrences, indent=2, ensure_ascii=False) + "\n")
    return sorted(set(errors)), occurrences


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=ROOT)
    parser.add_argument("--dump-dir", type=Path)
    args = parser.parse_args()
    errors, occurrences = lint_tree(args.root.resolve(), args.dump_dir)
    if errors:
        raise SystemExit("Public-copy lint failed:\n- " + "\n- ".join(errors))
    print(f"Public-copy lint passed; {len(occurrences)} scientific/bibliographic/legal occurrences classified")


if __name__ == "__main__":
    main()

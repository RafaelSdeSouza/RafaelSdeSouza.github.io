#!/usr/bin/env python3
"""Render visitor-facing static HTML from the canonical JSON content records."""

from __future__ import annotations

import argparse
import html
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"
VISITOR_PAGES = (
    "index.html", "research.html", "contributions.html", "publications.html",
    "software.html", "coin.html", "people.html", "writing.html", "about.html",
    "contact.html",
)
PAGE_KEYS = {
    "index.html": "home",
    "research.html": "research",
    "contributions.html": "contributions",
    "publications.html": "publications",
    "software.html": "software",
    "coin.html": "coin",
    "people.html": "people",
    "writing.html": "writing",
    "about.html": "about",
    "contact.html": "contact",
}


def load(name: str) -> object:
    return json.loads((CONTENT / name).read_text(encoding="utf-8"))


def esc(value: object) -> str:
    return html.escape("" if value is None else str(value), quote=True)


def slugify(value: object) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", str(value).lower()).strip("-")
    return slug or "record"


def attrs(**values: object) -> str:
    return "".join(
        f' {name.rstrip("_").replace("_", "-")}="{esc(value)}"'
        for name, value in values.items() if value is not None
    )


def links(items: list[dict], *, classes: str = "link-line", aria_label: str | None = None) -> str:
    body = "".join(
        f'<a{attrs(href=item["url"], class_=item.get("class"))}>{esc(item["label"])}</a>'
        for item in items
    )
    label = f' aria-label="{esc(aria_label)}"' if aria_label else ""
    return f'<nav class="{classes}"{label}>{body}</nav>' if items else ""


def paragraphs(items: list[str], *, raw: bool = False) -> str:
    return "".join(f"<p>{item if raw else esc(item)}</p>" for item in items)


def year_range(record: dict) -> str:
    """Return an explicit display range, or derive one from start/end fields."""
    if record.get("years"):
        return str(record["years"])
    start = record.get("start")
    end = record.get("end")
    if start in (None, ""):
        return ""
    if end in (None, ""):
        return f"{start}–present"
    if str(start) == str(end):
        return str(start)
    return f"{start}–{end}"


def replace_generated(path: Path, key: str, body: str, *, check: bool) -> None:
    start = f"<!-- generated:{key}:start -->"
    end = f"<!-- generated:{key}:end -->"
    text = path.read_text(encoding="utf-8")
    pattern = re.compile(rf"{re.escape(start)}.*?{re.escape(end)}", re.DOTALL)
    if not pattern.search(text):
        raise SystemExit(f"{path.name}: missing generated block {key}")
    replacement = (
        f"{start}\n"
        f"<!-- GENERATED FROM content/{key}.json. DO NOT EDIT THIS SECTION DIRECTLY. -->\n"
        f"{body.rstrip()}\n{end}"
    )
    rendered = pattern.sub(lambda _: replacement, text, count=1)
    if check:
        if rendered != text:
            raise SystemExit(f"{path.name}: generated {key} block is stale; run make update")
    elif rendered != text:
        path.write_text(rendered, encoding="utf-8")


def replace_main(
    path: Path,
    key: str,
    body: str,
    *,
    check: bool,
    source: str | None = None,
) -> None:
    text = path.read_text(encoding="utf-8")
    start = f"<!-- generated:{key}:start -->"
    end = f"<!-- generated:{key}:end -->"
    generated = (
        f"{start}\n"
        f"<!-- GENERATED FROM content/{source or key}.json. DO NOT EDIT THIS SECTION DIRECTLY. -->\n"
        f"{body.rstrip()}\n{end}"
    )
    if start in text:
        updated, count = re.subn(
            rf"{re.escape(start)}.*?{re.escape(end)}",
            lambda _: generated,
            text,
            count=1,
            flags=re.DOTALL,
        )
    else:
        updated, count = re.subn(
            r"(<main\b[^>]*>).*?(</main>)",
            lambda match: f"{match.group(1)}\n{generated}\n{match.group(2)}",
            text,
            count=1,
            flags=re.DOTALL,
        )
    if count != 1:
        raise SystemExit(f"{path.name}: missing or duplicate main region")
    if check:
        if updated != text:
            raise SystemExit(f"{path.name}: generated {key} page is stale; run make update")
    elif updated != text:
        path.write_text(updated, encoding="utf-8")


def global_header(site: dict, current: str) -> str:
    nav_items = []
    for item in site["navigation"]:
        current_attr = ' aria-current="page"' if item["page"] == current else ""
        nav_items.append(
            f'<a href="{esc(item["url"])}"{current_attr}>{esc(item["label"])}</a>'
        )
    nav = "".join(nav_items)
    return f'''<header class="site-header frame grid">
<a class="slot site-name" style="--col:1;--span:3;--tcol:1;--tspan:3;--mcol:1;--mspan:3" href="index.html">{esc(site["name"])}</a>
<button class="slot nav-toggle" style="--col:12;--span:1;--tcol:8;--tspan:1;--mcol:4;--mspan:1" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
<nav class="slot site-nav" style="--col:6;--span:7;--tcol:4;--tspan:5;--mcol:1;--mspan:4" id="site-nav" aria-label="Primary">{nav}</nav>
</header>'''


def global_footer(site: dict, profile: dict) -> str:
    resolved = []
    for item in site["footer_links"]:
        resolved.append({
            "label": item["label"],
            "url": item.get("url") or profile["links"][item["profile_key"]],
        })
    nav = "".join(f'<a href="{esc(item["url"])}">{esc(item["label"])}</a>' for item in resolved)
    return f'''<footer class="site-footer frame grid">
<p class="slot" style="--col:1;--span:3;--tcol:1;--tspan:3;--mcol:1;--mspan:4">{esc(site["name"])}</p>
<nav class="slot link-line" style="--col:7;--span:6;--tcol:4;--tspan:5;--mcol:1;--mspan:4" aria-label="Scholarly profiles">{nav}</nav>
</footer>'''


def replace_chrome(path: Path, site: dict, profile: dict, *, check: bool) -> None:
    text = path.read_text(encoding="utf-8")
    current = PAGE_KEYS[path.name]
    for key, tag, markup in (
        ("site-header", "header", global_header(site, current)),
        ("site-footer", "footer", global_footer(site, profile)),
    ):
        start = f"<!-- generated:{key}:start -->"
        end = f"<!-- generated:{key}:end -->"
        generated = (
            f"{start}\n<!-- GENERATED FROM content/site.json. DO NOT EDIT DIRECTLY. -->\n"
            f"{markup}\n{end}"
        )
        if start in text:
            text, count = re.subn(
                rf"{re.escape(start)}.*?{re.escape(end)}",
                lambda _: generated,
                text,
                count=1,
                flags=re.DOTALL,
            )
        else:
            text, count = re.subn(
                rf"<{tag}\b[^>]*class=\"[^\"]*site-{key.split('-')[1]}[^\"]*\"[^>]*>.*?</{tag}>",
                lambda _: generated,
                text,
                count=1,
                flags=re.DOTALL,
            )
        if count != 1:
            raise SystemExit(f"{path.name}: missing or duplicate {key}")
    original = path.read_text(encoding="utf-8")
    if check:
        if text != original:
            raise SystemExit(f"{path.name}: global site chrome is stale; run make update")
    elif text != original:
        path.write_text(text, encoding="utf-8")


def render_home(data: dict, writing: dict, publication_count: int) -> str:
    identity = data["identity"]
    art = identity["art"]
    parts = [
        '<span class="anchor-compat" id="home"></span>',
        '<section class="opening-only grid home-opening refined-home">',
        '<div class="slot identity" style="--col:3;--span:4;--tcol:2;--tspan:3;--mcol:1;--mspan:4">',
        f'<h1 class="exceptional">{esc(identity["name"])}</h1>',
        f'<p class="identity-role">{esc(identity["role"])}</p>',
        f'<p class="home-thesis">{esc(identity["thesis"])}</p>',
        links(identity["links"]),
        '</div>',
        '<figure class="slot home-art" style="--col:7;--span:5;--tcol:5;--tspan:4;--mcol:1;--mspan:4">',
        f'<img src="{esc(art["src"])}" alt="{esc(art["alt"])}">',
        '</figure></section>',
    ]
    for item in data["research_objects"]:
        spread = "primary-spread" if item["layout"] == "scientific-plate" else "secondary-spread"
        figure_style = (
            "--col:3;--span:8;--tcol:2;--tspan:6;--mcol:1;--mspan:4"
            if spread == "primary-spread" else
            "--col:3;--span:5;--tcol:2;--tspan:4;--mcol:1;--mspan:4"
        )
        copy_style = (
            "--col:3;--span:6;--tcol:2;--tspan:6;--mcol:1;--mspan:4"
            if spread == "primary-spread" else
            "--col:9;--span:4;--tcol:6;--tspan:3;--mcol:1;--mspan:4"
        )
        meta = esc(item["metadata"])
        if item.get("metadata_url"):
            meta = f'<a href="{esc(item["metadata_url"])}">{meta}</a>'
        figure = item["figure"]
        parts.append(f'''<article class="object-section grid {spread}" id="{esc(item["id"])}">
<aside class="slot metadata home-citation" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:4"><a href="{esc(item["citation_url"])}">{esc(item["citation"])}</a><span>{meta}</span></aside>
<div class="slot object-heading" style="--col:3;--span:6;--tcol:2;--tspan:6;--mcol:1;--mspan:4"><h2 class="major-title"><a href="{esc(item["title_url"])}">{esc(item["title"])}</a></h2></div>
<figure class="slot" style="{figure_style}" data-role="{'primary' if spread == 'primary-spread' else 'secondary'}"><a href="{esc(figure["src"])}" aria-label="View full-size figure"><img{attrs(width=figure.get("width"), height=figure.get("height"), src=figure["src"], alt=figure["alt"])}></a></figure>
<div class="slot object-copy" style="{copy_style}"><p>{esc(item["body"])}</p></div>
</article>''')
    book = data["book"]
    book_title = esc(book["title"]).replace(" for ", "<br>for ")
    parts.append(f'''<article class="object-section grid documentary-spread" id="{esc(book["id"])}">
<aside class="slot metadata home-citation" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:4">{esc(book["year"])}</aside>
<div class="slot object-heading" style="--col:3;--span:6;--tcol:2;--tspan:6;--mcol:1;--mspan:4"><h2 class="major-title"><a href="{esc(book["url"])}">{book_title}</a></h2></div>
<figure class="slot" style="--col:3;--span:2;--tcol:2;--tspan:2;--mcol:1;--mspan:4" data-role="documentary"><a href="{esc(book["url"])}"><img{attrs(width=book["cover_width"], height=book["cover_height"], src=book["cover"], alt=book["cover_alt"])}></a></figure>
<div class="slot object-copy" style="--col:6;--span:5;--tcol:6;--tspan:3;--mcol:1;--mspan:4"><p>{esc(book["authors"])}</p><p class="citation">{esc(book["citation"]).replace(chr(10), '<br>')}</p><div class="actions">{''.join(f'<a href="{esc(item["url"])}">{esc(item["label"].format(publication_count=publication_count))}</a>' for item in book["links"])}</div></div>
</article>''')
    coin = data["coin"]
    parts.append(f'''<section class="object-section grid"><h2 class="slot label" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:4">{esc(coin["label"])}</h2><div class="slot" style="--col:3;--span:5;--tcol:2;--tspan:4;--mcol:1;--mspan:4"><p>{esc(coin["body"])}</p><p class="link-line"><a href="{esc(coin["url"])}">Cosmostatistics Initiative</a></p></div><figure class="slot" style="--col:9;--span:3;--tcol:6;--tspan:3;--mcol:1;--mspan:4" data-role="documentary"><img src="assets/images/coin-2024.png" alt="Official Cosmostatistics Initiative COIN mark"></figure></section>''')
    work = next(item for item in writing["works"] if item["id"] == data["featured_writing_id"])
    authors = work["authors"] if isinstance(work["authors"], str) else " and ".join(work["authors"])
    parts.append(f'''<section class="object-section grid"><h2 class="slot label" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:4">Writing</h2><div class="slot" style="--col:3;--span:6;--tcol:2;--tspan:5;--mcol:1;--mspan:4"><blockquote class="literary-excerpt">{esc(work["excerpt"]).replace(chr(10), '<br>')}</blockquote><p class="caption"><cite>{esc(work["title"])}</cite><br>{esc(authors)}</p></div><figure class="slot" style="--col:10;--span:2;--tcol:7;--tspan:2;--mcol:1;--mspan:2" data-role="documentary"><img src="{esc(work["cover"])}" alt="{esc(work["cover_alt"])}"></figure></section>''')
    elsewhere = data["elsewhere"]
    parts.append(f'''<section class="object-section grid"><h2 class="slot label" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:4">Elsewhere</h2><div class="slot" style="--col:3;--span:6;--tcol:2;--tspan:6;--mcol:1;--mspan:4"><p>{esc(elsewhere["body"])}</p><p class="caption"><a href="{esc(elsewhere["url"])}">{esc(elsewhere["citation"])}</a></p></div></section>''')
    end_links = "".join(f'<a href="{esc(item["url"])}">{esc(item["label"].format(publication_count=publication_count))}</a>' for item in data["end_links"])
    parts.append(f'<nav class="object-section grid"><div class="slot link-line" style="--col:3;--span:8;--tcol:2;--tspan:6;--mcol:1;--mspan:4">{end_links}</div></nav>')
    return "\n".join(parts)


RESEARCH_LAYOUTS = {
    "scientific-plate": {
        "spread": "primary-spread",
        "figure_class": "slot",
        "figure_style": "--col:3;--span:9;--tcol:2;--tspan:7;--mcol:1;--mspan:4",
        "role": "primary",
        "copy_style": "--col:3;--span:7;--tcol:2;--tspan:6;--mcol:1;--mspan:4",
    },
    "object-left": {
        "spread": "secondary-spread",
        "figure_class": "slot",
        "figure_style": "--col:3;--span:5;--tcol:2;--tspan:4;--mcol:1;--mspan:4",
        "role": "secondary",
        "copy_style": "--col:9;--span:4;--tcol:6;--tspan:3;--mcol:1;--mspan:4",
    },
    "figure-inline": {
        "spread": "text-spread",
        "figure_class": "slot historical-figure",
        "figure_style": None,
        "role": "secondary",
        "copy_style": "--col:3;--span:7;--tcol:2;--tspan:6;--mcol:1;--mspan:4",
    },
    "documentary": {
        "spread": "documentary-spread",
        "figure_class": "slot",
        "figure_style": "--col:3;--span:2;--tcol:2;--tspan:2;--mcol:1;--mspan:4",
        "role": "documentary",
        "copy_style": "--col:6;--span:6;--tcol:6;--tspan:3;--mcol:1;--mspan:4",
    },
    "quiet": {
        "spread": "text-spread", "figure_class": "", "figure_style": None,
        "role": "", "copy_style": "--col:3;--span:7;--tcol:2;--tspan:6;--mcol:1;--mspan:4",
    },
    "compact": {
        "spread": "text-spread", "figure_class": "", "figure_style": None,
        "role": "", "copy_style": "--col:3;--span:7;--tcol:2;--tspan:6;--mcol:1;--mspan:4",
    },
}


def research_figure(figure: dict, config: dict) -> str:
    caption = esc(figure.get("caption", "")).replace(chr(10), "<br>")
    if figure.get("caption_link"):
        link = figure["caption_link"]
        caption += f' <a href="{esc(link["url"])}">{esc(link["label"])}</a>'
    image = f'<img{attrs(src=figure["src"], alt=figure["alt"], width=figure.get("width"), height=figure.get("height"), loading="lazy")}>'
    if figure.get("href"):
        link_class = "scientific" if config["role"] != "documentary" else None
        image = f'<a{attrs(class_=link_class, href=figure["href"], aria_label=figure.get("aria_label"))}>{image}</a>'
    style = f' style="{config["figure_style"]}"' if config["figure_style"] else ""
    return f'<figure class="{config["figure_class"]}"{style} data-role="{config["role"]}">{image}<figcaption class="caption">{caption}</figcaption></figure>'


def research_entry(item: dict) -> str:
    config = RESEARCH_LAYOUTS[item["layout"]]
    figure = research_figure(item["figure"], config) if item.get("figure") else ""
    rendered_body = []
    for paragraph in item["body"]:
        text = esc(paragraph)
        for phrase in item.get("emphasis", []):
            text = text.replace(esc(phrase), f"<em>{esc(phrase)}</em>")
        rendered_body.append(f"<p>{text}</p>")
    return f'''<article class="object-section grid scientific-object {config["spread"]}" id="{esc(item["id"])}">
<p class="slot metadata" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:4">{esc(item.get("metadata", ""))}</p>
<header class="slot object-heading" style="--col:3;--span:7;--tcol:2;--tspan:6;--mcol:1;--mspan:4"><h2 class="major-title">{esc(item["title"])}</h2></header>
{figure}
<div class="slot scientific-prose object-copy" style="{config["copy_style"]}">{''.join(rendered_body)}{links(item.get("links", []), classes="link-line citation-links")}</div>
</article>'''


def render_research(data: dict) -> str:
    opening = paragraphs(data["opening"])
    question_styles = (
        "--col:3;--span:5;--tcol:2;--tspan:4;--mcol:1;--mspan:4",
        "--col:9;--span:4;--tcol:6;--tspan:3;--mcol:1;--mspan:4",
    )
    questions = "".join(
        f'<article class="slot proposition" style="{question_styles[index]}" id="{esc(item["id"])}"><h2 class="ordinary-title">{esc(item["title"])}</h2><p class="metadata">{esc(item["status"])}</p><div class="scientific-prose">{paragraphs(item["body"])}</div></article>'
        for index, item in enumerate(data["current_questions"])
    )
    entries = "\n".join(research_entry(item) for item in data["current_work"])
    trajectory = "\n".join(research_entry(item) for item in data["trajectory"])
    domains = "".join(f'<li><a href="{esc(item["url"])}">{esc(item["label"])}</a></li>' for item in data["domains"])
    return f'''<span class="anchor-compat" id="research-interest-grid"></span><span class="anchor-compat" id="research-application-grid"></span><span class="anchor-compat" id="research-video-grid"></span><span class="anchor-compat" id="videos"></span>
<header class="page-opening grid"><h1 class="slot label" style="--col:1;--span:2;--tcol:1;--tspan:2;--mcol:1;--mspan:4">Research</h1><div class="slot reflection" style="--col:3;--span:7;--tcol:2;--tspan:6;--mcol:1;--mspan:4">{opening}</div></header>
<section class="question-pair grid" id="current-work">{questions}</section>
{entries}
<div class="sequence-marker" aria-label="Recent to early"><span>Recent</span><i aria-hidden="true"></i><span>Early</span></div>
{trajectory}
<section class="object-section grid research-terminal-index"><h2 class="slot label" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:4">Across astronomy</h2><div class="slot" style="--col:3;--span:9;--tcol:2;--tspan:7;--mcol:1;--mspan:4"><ol class="domain-sequence" aria-label="Physical scales and observational settings">{domains}</ol>{links(data["end_links"], classes="link-line citation-links")}</div></section>'''


def appointment_rows(records: list[dict]) -> str:
    return "\n".join(
        f'<article class="archive-record grid appointment"><p class="year slot" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:1">{esc(year_range(item))}</p><h3 class="record-name slot" style="--col:3;--span:4;--tcol:2;--tspan:3;--mcol:2;--mspan:3"><a href="{esc(item["url"])}">{esc(item["institution"])}</a></h3><div class="record-detail slot" style="--col:7;--span:4;--tcol:5;--tspan:3;--mcol:2;--mspan:3"><p>{esc(item["role"])}</p></div><p class="country slot" style="--col:11;--span:2;--tcol:8;--tspan:1;--mcol:2;--mspan:3">{esc(item["country"])}</p></article>'
        for item in records
    )


def render_about(data: dict, writing: dict) -> str:
    opening = data["opening"]
    education = "".join(
        f'<article class="archive-record grid education-record"><p class="year slot" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:1">{esc(item["years"])}</p><h3 class="record-name slot" style="--col:3;--span:4;--tcol:2;--tspan:3;--mcol:2;--mspan:3">{esc(item["institution"])}</h3><div class="record-detail slot" style="--col:7;--span:4;--tcol:5;--tspan:3;--mcol:2;--mspan:3"><p>{esc(item["degree"])}</p><p class="thesis"><em>{esc(item["thesis"])}</em></p></div></article>'
        for item in data["education"]
    )
    recognition = []
    for item in data["recognition"]:
        if item["kind"] == "book-award":
            recognition.append(f'''<article class="recognition-book grid"><p class="year slot" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:1">{esc(item["year"])}</p><figure class="slot" style="--col:3;--span:2;--tcol:2;--tspan:2;--mcol:1;--mspan:2" data-role="documentary"><a href="{esc(item["title_url"])}"><img{attrs(src=item["cover"], alt=item["cover_alt"], width=item["cover_width"], height=item["cover_height"])}></a></figure><div class="slot recognition-book-copy" style="--col:5;--span:6;--tcol:4;--tspan:5;--mcol:3;--mspan:2"><h3 class="ordinary-title"><a href="{esc(item["title_url"])}"><em>{esc(item["title"])}</em></a></h3><p class="book-authors caption">{esc(item["authors"])}</p><p class="caption book-publisher">{esc(item["publisher"])}</p><p class="award-name"><a href="{esc(item["url"])}">{esc(item["name"])}</a><span class="caption">{esc(item["category"])}</span></p></div></article>''')
        else:
            recognition.append(f'<article class="archive-record grid compact-iaa-award"><p class="year slot" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:1">{esc(item["year"])}</p><h3 class="record-name slot" style="--col:3;--span:4;--tcol:2;--tspan:3;--mcol:2;--mspan:3"><a href="{esc(item["url"])}">{esc(item["name"])}</a></h3><div class="record-detail slot" style="--col:7;--span:4;--tcol:5;--tspan:3;--mcol:2;--mspan:3"><p class="scientific-copy">{esc(item["detail"])}</p></div></article>')
    created = data["created"]
    leadership = []
    for index, item in enumerate(data["leadership"]):
        label = '<h2 class="label slot" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:4" id="service-title">Scientific leadership</h2>' if index == 0 else f'<p class="year slot" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:1">{esc(item.get("years"))}</p>'
        name = esc(item["name"])
        if item.get("url"):
            name = f'<a href="{esc(item["url"])}">{name}</a>'
        leadership.append(f'<div class="grid service-record">{label}<h3 class="slot" style="--col:3;--span:5;--tcol:2;--tspan:3;--mcol:2;--mspan:3">{name}</h3><p class="slot" style="--col:8;--span:5;--tcol:5;--tspan:4;--mcol:2;--mspan:3">{esc(item["role"])}</p></div>')
    work = next(item for item in writing["works"] if item["id"] == data["featured_writing_id"])
    authors = work["authors"] if isinstance(work["authors"], str) else " and ".join(work["authors"])
    return f'''<section class="opening grid" aria-labelledby="about-title"><h1 class="label slot" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:4" id="about-title">About</h1><div class="slot opening-copy" style="--col:3;--span:4;--tcol:2;--tspan:3;--mcol:1;--mspan:4"><p class="statement">{esc(opening["statement"])}</p>{links(opening["links"], classes="link-line opening-links", aria_label="Personal links")}</div><figure class="slot image-portrait" style="--col:8;--span:5;--tcol:5;--tspan:4;--mcol:1;--mspan:4" data-role="portrait"><img{attrs(src=opening["portrait"], alt=opening["portrait_alt"], width=opening["portrait_width"], height=opening["portrait_height"])}></figure></section>
<section class="archive-section compact-appointments" id="career" aria-labelledby="appointments-title"><h2 class="label section-label" id="appointments-title">Appointments · 2010—present</h2><div class="archive-list">{appointment_rows(data["appointments"])}</div></section>
<section class="compact-documentary" aria-label="Education and recognition"><section class="compact-education" aria-labelledby="education-title"><h2 class="label section-label" id="education-title">Education</h2><div class="archive-list">{education}</div></section><section class="compact-recognition" aria-labelledby="recognition-title"><h2 class="label section-label" id="recognition-title">Recognition</h2>{''.join(recognition)}</section></section>
<section class="compact-institutions" aria-label="Created institution and scientific service"><section class="compact-created grid" aria-labelledby="created-title"><div class="slot created-marginalia" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:4"><h2 class="label" id="created-title">Created</h2><p class="year">{esc(created["year"])}</p></div><div class="slot created-record" style="--col:3;--span:5;--tcol:2;--tspan:3;--mcol:3;--mspan:2"><h3 class="ordinary-title">{esc(created["name"])}</h3><p class="metadata">{esc(created["role"])}</p><p class="link-line"><a href="{esc(created["url"])}">{esc(created["link_label"])}</a></p></div><figure class="slot compact-coin-mark" style="--col:8;--span:2;--tcol:5;--tspan:2;--mcol:1;--mspan:2" data-role="documentary"><img{attrs(src=created["mark"], alt=created["mark_alt"], width=created["mark_width"], height=created["mark_height"])}></figure></section><section class="compact-service" aria-labelledby="service-title">{''.join(leadership)}</section></section>
<section class="compact-writing grid" aria-labelledby="writing-title"><h2 class="label slot" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:4" id="writing-title">Writing</h2><figure class="slot intimate-cover" style="--col:3;--span:2;--tcol:2;--tspan:2;--mcol:1;--mspan:2" data-role="documentary"><a href="{esc(work["url"])}"><img src="{esc(work["cover"])}" alt="{esc(work["cover_alt"])}" width="256" height="400"></a></figure><div class="slot intimate-copy" style="--col:5;--span:5;--tcol:4;--tspan:4;--mcol:3;--mspan:2"><h3 class="ordinary-title"><a href="{esc(work["url"])}"><em>{esc(work["title"])}</em></a></h3><p class="metadata">{esc(authors)}</p><nav class="link-line"><a href="writing.html">Writing</a></nav></div></section>'''


def mentoring_rows(data: dict) -> tuple[str, int]:
    groups = []
    total = 0
    for group in data["groups"]:
        rows = []
        for person in group["records"]:
            total += 1
            details = [person["degree"]]
            if person.get("institution"):
                details.append(person["institution"])
            if person.get("outcome"):
                details.append(person["outcome"])
            detail_markup = "".join(f"<p>{esc(item)}</p>" for item in details)
            name = esc(person["name"])
            if person.get("url"):
                name = f'<a href="{esc(person["url"])}">{name}</a>'
            rows.append(f'<article class="mentor-row grid"><div class="slot marginal mentor-date" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:4"><p>{esc(year_range(person))}</p><p>{esc(person["status"])}</p></div><h3 class="slot mentor-name" style="--col:3;--span:4;--tcol:2;--tspan:3;--mcol:1;--mspan:4">{name}</h3><p class="slot mentor-project" style="--col:7;--span:4;--tcol:5;--tspan:3;--mcol:1;--mspan:4">{esc(person["project"])}</p><div class="slot mentor-meta" style="--col:11;--span:2;--tcol:8;--tspan:1;--mcol:1;--mspan:4">{detail_markup}</div></article>')
        groups.append(f'<section class="mentor-group" aria-labelledby="people-{esc(group["id"])}"><h2 class="label people-section-label" id="people-{esc(group["id"])}">{esc(group["label"])}</h2>{"".join(rows)}</section>')
    return "".join(groups), total


def teaching_rows(data: dict) -> tuple[str, int]:
    rows = []
    for item in data["teaching"]:
        rows.append(f'<article class="catalogue-row grid teaching-row"><div class="slot marginal" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:1"><p>{esc(item["years"])}</p><p>{esc(item["term"])}</p></div><h3 class="slot record-name" style="--col:3;--span:5;--tcol:2;--tspan:4;--mcol:2;--mspan:3">{esc(item["course"])}</h3><div class="slot record-detail" style="--col:8;--span:3;--tcol:6;--tspan:2;--mcol:2;--mspan:3"><p>{esc(item["level"])}</p></div><p class="slot metadata" style="--col:11;--span:2;--tcol:8;--tspan:1;--mcol:2;--mspan:3">{esc(item["enrolment"])} students</p></article>')
    return "".join(rows), len(rows)


def render_people(data: dict) -> tuple[str, int, int]:
    mentoring, mentoring_count = mentoring_rows(data)
    teaching, teaching_count = teaching_rows(data)
    markup = f'<header class="page-opening archive-opening grid"><h1 class="slot label" style="--col:1;--span:2;--tcol:1;--tspan:2;--mcol:1;--mspan:4">Mentoring</h1><p class="slot archive-summary" style="--col:3;--span:8;--tcol:2;--tspan:6;--mcol:1;--mspan:4">{esc(data["summary"])}</p></header><section class="people-catalogue" data-people-catalogue>{mentoring}</section><h2 class="label people-section-label">Teaching</h2><section class="catalogue teaching-catalogue" data-teaching-catalogue>{teaching}</section>'
    return markup, mentoring_count, teaching_count


SOFTWARE_ACTIONS = (
    ("paper_url", "Paper"), ("docs_url", "Docs"),
    ("getting_started_url", "Get Started"), ("github_url", "GitHub"),
    ("release_url", "Release"),
)


def software_rows(catalogue: dict) -> tuple[str, int]:
    indexed = []
    for group in ("published", "systems", "development"):
        for project in catalogue[group]:
            indexed.append((len(indexed), project))
    indexed.sort(key=lambda pair: (-(int(pair[1]["year"]) if pair[1].get("year") else -1), pair[0]))
    rows = []
    for _, project in indexed:
        display = project.get("display_name") or project["name"]
        actions = [(label, project[field]) for field, label in SOFTWARE_ACTIONS if project.get(field)]
        if project.get("registry_url"):
            actions.append((project.get("registry_label") or "Registry", project["registry_url"]))
        primary = next((project.get(field) for field in ("docs_url", "github_url", "paper_url", "release_url", "registry_url") if project.get(field)), None)
        heading = esc(display)
        if primary:
            heading = f'<a href="{esc(primary)}">{heading}</a>'
        mark = f'<img class="project-mark" loading="lazy" src="{esc(project["logo"])}" alt="{esc(display)} project mark">' if project.get("logo") else ""
        action_markup = "".join(f'<a href="{esc(url)}">{esc(label)}</a>' for label, url in actions)
        rows.append(f'<article class="catalogue-row grid software-row" id="{slugify(project["name"])}"><div class="slot marginal" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:1"><p>{esc(project.get("year") or "—")}</p><p>{esc(project["status"])}</p></div><div class="slot project-identity" style="--col:3;--span:3;--tcol:2;--tspan:2;--mcol:2;--mspan:3"><h2 class="catalogue-title">{heading}</h2>{mark}</div><div class="slot project-purpose" style="--col:6;--span:4;--tcol:4;--tspan:3;--mcol:2;--mspan:3"><p>{esc(project["purpose"])}</p><p class="project-problem">{esc(project["problem"])}</p></div><nav class="slot link-line catalogue-actions" style="--col:10;--span:3;--tcol:7;--tspan:2;--mcol:2;--mspan:3">{action_markup}</nav></article>')
    return "\n".join(rows), len(rows)


def format_venue(record: dict) -> str:
    parts = []
    venue = record.get("venue") or record.get("publisher")
    if venue:
        parts.append(str(venue))
    if record.get("volume"):
        parts.append(f"vol. {record['volume']}")
    if record.get("number"):
        parts.append(f"no. {record['number']}")
    if record.get("pages"):
        parts.append(str(record["pages"]))
    elif record.get("eid"):
        parts.append(str(record["eid"]))
    return ", ".join(parts)


def publication_rows(records: list[dict]) -> str:
    rows = []
    preferred = ("DOI", "ADS", "arXiv")
    for record in records:
        record_links = record.get("links") or []
        primary = next((link for label in preferred for link in record_links if link.get("label") == label), record_links[0] if record_links else None)
        title = esc(record["title"])
        if primary:
            title = f'<a href="{esc(primary["url"])}">{title}</a>'
        link_markup = "".join(f'<a href="{esc(link["url"])}">{esc(link["label"])}</a>' for link in record_links)
        facets = " ".join(str(item) for item in record.get("facets", []))
        search_parts = [record.get(key) for key in ("title", "authors", "year", "venue", "publisher", "volume", "number", "pages", "eid")] + [link.get("url") for link in record_links]
        search = " ".join(str(item) for item in search_parts if item).lower()
        displayed_bibtex = "\n".join(line.rstrip() for line in record["bibtex"].splitlines())
        rows.append(f'<article class="catalogue-row grid publication-row" data-id="{esc(record["id"])}" data-facets="{esc(facets)}" data-first-author="{str(bool(record.get("firstAuthor"))).lower()}" data-search="{esc(search)}"><div class="slot marginal" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:1"><p>{esc(record["year"])}</p><p>{esc(record["type"])}</p></div><div class="slot" style="--col:3;--span:7;--tcol:2;--tspan:5;--mcol:2;--mspan:3"><h2 class="catalogue-title">{title}</h2><p class="catalogue-authors">{esc(record["authors"])}</p></div><div class="slot catalogue-meta" style="--col:10;--span:3;--tcol:7;--tspan:2;--mcol:2;--mspan:3"><p>{esc(format_venue(record))}</p><nav class="link-line">{link_markup}</nav><details><summary>BibTeX</summary><pre>{esc(displayed_bibtex)}</pre></details></div></article>')
    return "\n".join(rows)


def render_publication_summary(path: Path, publication_count: int, *, check: bool) -> None:
    text = path.read_text(encoding="utf-8")
    updated = re.sub(
        r'<p class="archive-count">\d+ scholarly works</p>',
        f'<p class="archive-count">{publication_count} scholarly works</p>',
        text,
        count=1,
    )
    updated = re.sub(
        r'(<p class="metadata" id="publication-count" data-publication-count aria-live="polite">)Showing \d+ of \d+ records(</p>)',
        rf'\1Showing {publication_count} of {publication_count} records\2',
        updated,
        count=1,
    )
    updated = re.sub(
        r'(<meta name="description" content="The complete scholarly publication record of Rafael S\. de Souza: )\d+( unique works\.\">)',
        rf'\g<1>{publication_count}\2',
        updated,
        count=1,
    )
    updated = re.sub(
        r'(<meta property="og:description" content="The complete scholarly publication record of Rafael S\. de Souza: )\d+( unique works\.\">)',
        rf'\g<1>{publication_count}\2',
        updated,
        count=1,
    )
    if check:
        if updated != text:
            raise SystemExit(f"{path.name}: publication summary is stale; run make update")
    elif updated != text:
        path.write_text(updated, encoding="utf-8")


def writing_rows(data: dict) -> tuple[str, int]:
    rows = []
    works = [work for work in data["works"] if not work.get("featured")]
    for work in works:
        authors = work["authors"] if isinstance(work["authors"], str) else " and ".join(work["authors"])
        meta = " · ".join(str(item) for item in (work.get("type"), work.get("date") or work.get("year")) if item)
        essay = work.get("type") == "Essay"
        cover_style = "--col:10;--span:2;--tcol:7;--tspan:2;--mcol:1;--mspan:2" if essay else "--col:3;--span:2;--tcol:2;--tspan:2;--mcol:1;--mspan:2"
        cover = ""
        if work.get("cover"):
            alt = work.get("cover_alt") or f'Cover of {work["title"]}'
            cover = f'<figure class="slot writing-cover" style="{cover_style}"><a href="{esc(work["url"])}"><img loading="lazy" src="{esc(work["cover"])}" alt="{esc(alt)}"></a></figure>'
        if work.get("cover"):
            copy_style = "--col:3;--span:6;--tcol:2;--tspan:5;--mcol:1;--mspan:4" if essay else "--col:6;--span:6;--tcol:4;--tspan:5;--mcol:1;--mspan:4"
        else:
            copy_style = "--col:3;--span:7;--tcol:2;--tspan:6;--mcol:1;--mspan:4"
        excerpt = f'<p>{esc(work["excerpt"]).replace(chr(10), "<br>")}</p>' if work.get("excerpt") else ""
        summary = f'<p>{esc(work["summary"])}</p>' if work.get("summary") else ""
        citation = f'<p class="citation">{esc(work["citation"])}</p>' if work.get("citation") else ""
        copy = f'<div class="slot writing-copy" style="{copy_style}"><h2><a href="{esc(work["url"])}">{esc(work["title"])}</a></h2><p class="writing-authors">{esc(authors)}</p>{excerpt}{summary}{citation}<nav class="link-line"><a href="{esc(work["url"])}">Read</a></nav></div>'
        classes = "writing-item writing-object" if cover else "writing-item writing-text"
        if essay:
            classes += " writing-essay"
        objects = copy + cover if essay else cover + copy
        rows.append(f'<article class="{classes} grid"><p class="slot writing-meta" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:4">{esc(meta)}</p>{objects}</article>')
    return "\n".join(rows), len(works)


def render_writing(data: dict) -> tuple[str, int]:
    featured = next(item for item in data["works"] if item.get("featured"))
    authors = featured["authors"] if isinstance(featured["authors"], str) else " and ".join(featured["authors"])
    archive, count = writing_rows(data)
    return f'''<header class="page-opening writing-feature grid"><h1 class="slot label" style="--col:1;--span:2;--tcol:1;--tspan:2;--mcol:1;--mspan:4">Writing</h1><div class="slot feature-text" style="--col:3;--span:6;--tcol:2;--tspan:5;--mcol:1;--mspan:4"><blockquote class="literary-excerpt">{esc(featured["excerpt"]).replace(chr(10), '<br>')}</blockquote><p class="caption"><cite>{esc(featured["title"])}</cite><br>{esc(authors)}</p><nav class="link-line"><a href="{esc(featured["url"])}">Read</a></nav></div><figure class="slot feature-cover" style="--col:10;--span:2;--tcol:7;--tspan:2;--mcol:2;--mspan:2" data-role="documentary"><img src="{esc(featured["cover"])}" alt="{esc(featured["cover_alt"])}"></figure></header><section class="writing-catalogue" id="writing-grid" aria-labelledby="writing-archive-title"><h2 class="label" id="writing-archive-title">Writing archive</h2><div data-writing-archive>{archive}</div></section>''', count


def render_coin(data: dict) -> str:
    opening = paragraphs(data["opening"])
    residences = "".join(f'<article class="chronology-record"><p class="metadata">{esc(item["country"])} · {esc(item["year"])}</p><h3>{esc(item["city"])}</h3><p>{esc(item["summary"])}</p></article>' for item in data["residences"])
    first = data["first_residence"]
    projects = "".join(f'<a href="{esc(item["url"])}">{esc(item["title"])}</a>' for item in data["projects"])
    return f'''<header class="page-opening coin-feature grid"><h1 class="slot label" style="--col:1;--span:2;--tcol:1;--tspan:2;--mcol:1;--mspan:4">COIN</h1><div class="slot coin-copy" style="--col:3;--span:6;--tcol:2;--tspan:5;--mcol:1;--mspan:4"><h2 class="major-title">{esc(data["name"])}</h2><p class="metadata">Founded {esc(data["founded"])}</p><div class="scientific-prose">{opening}</div>{links(data["links"])}</div><figure class="slot coin-mark" style="--col:10;--span:2;--tcol:7;--tspan:2;--mcol:2;--mspan:2"><img src="{esc(data["mark"])}" alt="{esc(data["mark_alt"])}"></figure></header>
<section class="coin-residences" aria-labelledby="residences-title"><h2 class="label" id="residences-title">Residence programmes</h2><div class="coin-chronology grid">{residences}</div></section>
<section class="coin-first grid" aria-labelledby="first-residence-title"><p class="slot metadata" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:4">{esc(first["label"])}</p><div class="slot coin-first-copy" style="--col:3;--span:7;--tcol:2;--tspan:6;--mcol:1;--mspan:4"><h2 id="first-residence-title">{esc(first["title"])}</h2><p>{esc(first["body"])}</p>{links(first["links"])}</div></section>
<section class="coin-projects grid" aria-labelledby="coin-projects-title"><h2 class="slot label" id="coin-projects-title" style="--col:1;--span:2;--tcol:1;--tspan:2;--mcol:1;--mspan:4">COIN projects</h2><div class="slot project-list" style="--col:3;--span:8;--tcol:2;--tspan:7;--mcol:1;--mspan:4">{projects}{links(data["project_links"])}</div></section>'''


CONTRIBUTION_LAYOUTS = {
    "scientific-plate": ("contribution-plate", "--col:3;--span:3;--tcol:2;--tspan:3;--mcol:1;--mspan:4", "--col:6;--span:7;--tcol:5;--tspan:4;--mcol:1;--mspan:4", "after"),
    "quiet": ("contribution-quiet", "--col:3;--span:7;--tcol:2;--tspan:6;--mcol:1;--mspan:4", None, ""),
    "object-left": ("contribution-map", "--col:9;--span:4;--tcol:6;--tspan:3;--mcol:1;--mspan:4", "--col:3;--span:5;--tcol:2;--tspan:4;--mcol:1;--mspan:4", "before"),
    "compact": ("contribution-compact", "--col:3;--span:6;--tcol:2;--tspan:5;--mcol:1;--mspan:4", None, ""),
    "offset": ("contribution-compact contribution-offset", "--col:5;--span:6;--tcol:3;--tspan:5;--mcol:1;--mspan:4", None, ""),
    "documentary": ("contribution-book", "--col:6;--span:6;--tcol:4;--tspan:5;--mcol:1;--mspan:4", "--col:3;--span:2;--tcol:2;--tspan:2;--mcol:1;--mspan:2", "before"),
}


def render_contributions(data: dict) -> str:
    records = []
    for item in data["items"]:
        css_class, copy_style, figure_style, order = CONTRIBUTION_LAYOUTS[item["layout"]]
        copy = f'<div class="slot contribution-copy" style="{copy_style}"><h2>{esc(item["title"])}</h2><p>{esc(item["body"])}</p>{links(item["links"])}</div>'
        figure = ""
        if item.get("figure"):
            fig = item["figure"]
            figure = f'<figure class="slot contribution-figure" style="{figure_style}"><img{attrs(src=fig["src"], alt=fig["alt"], width=fig.get("width"), height=fig.get("height"))}><figcaption>{esc(fig["caption"])}</figcaption></figure>'
        objects = figure + copy if order == "before" else copy + figure
        records.append(f'<article class="contribution-item {css_class} grid"><p class="slot contribution-year" style="--col:1;--span:2;--tcol:1;--tspan:1;--mcol:1;--mspan:4">{esc(item["year"])}</p>{objects}</article>')
    opening_links = "".join(f'<a href="{esc(item["url"])}">{esc(item["label"])}</a>' for item in data["opening_links"])
    return f'<header class="page-opening grid selected-opening"><h1 class="slot label" style="--col:1;--span:2;--tcol:1;--tspan:2;--mcol:1;--mspan:4">Selected Contributions</h1><nav class="slot link-line" style="--col:3;--span:7;--tcol:2;--tspan:6;--mcol:1;--mspan:4">{opening_links}</nav></header><section class="contribution-sequence" aria-label="Selected scientific contributions">{"".join(records)}</section>'


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="fail if rendered HTML is stale")
    args = parser.parse_args()

    site = load("site.json")
    profile = load("profile.json")
    publications = load("publications.json")
    software = load("software.json")
    writing = load("writing.json")
    home = load("home.json")
    research = load("research.json")
    about = load("about.json")
    people = load("people.json")
    coin = load("coin.json")
    contributions = load("contributions.json")

    software_markup, software_count = software_rows(software)
    people_markup, mentoring_count, teaching_count = render_people(people)
    writing_markup, writing_count = render_writing(writing)

    replace_generated(ROOT / "publications.html", "publications", publication_rows(publications), check=args.check)
    render_publication_summary(ROOT / "publications.html", len(publications), check=args.check)
    replace_generated(ROOT / "software.html", "software", software_markup, check=args.check)
    replace_main(ROOT / "index.html", "home", render_home(home, writing, len(publications)), check=args.check)
    replace_main(ROOT / "research.html", "research", render_research(research), check=args.check)
    replace_main(ROOT / "about.html", "about", render_about(about, writing), check=args.check)
    replace_main(ROOT / "people.html", "people", people_markup, check=args.check)
    # Use a page-level marker distinct from the legacy archive-only `writing`
    # marker so the first migration replaces the complete main region.
    replace_main(
        ROOT / "writing.html", "writing-page", writing_markup,
        check=args.check, source="writing",
    )
    replace_main(ROOT / "coin.html", "coin", render_coin(coin), check=args.check)
    replace_main(ROOT / "contributions.html", "contributions", render_contributions(contributions), check=args.check)

    for page_name in VISITOR_PAGES:
        replace_chrome(ROOT / page_name, site, profile, check=args.check)

    mode = "verified" if args.check else "rendered"
    print(
        f"Static content {mode}: {len(publications)} publications, "
        f"{software_count} software projects, {writing_count + 1} writing works, "
        f"{len(about['appointments'])} appointments, {mentoring_count} mentoring records, "
        f"{teaching_count} teaching records"
    )


if __name__ == "__main__":
    main()

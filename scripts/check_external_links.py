#!/usr/bin/env python3
"""Check external links exposed by production pages and structured catalogues."""

from __future__ import annotations

import json
import ssl
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PAGES = [
    "index.html", "research.html", "contributions.html", "publications.html",
    "software.html", "people.html", "about.html", "writing.html", "coin.html", "contact.html",
]


class LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.urls: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag != "a":
            return
        href = dict(attrs).get("href") or ""
        if href.startswith(("https://", "http://")):
            self.urls.add(href)


def collect_urls() -> list[str]:
    urls: set[str] = set()
    for page_name in PAGES:
        parser = LinkParser()
        parser.feed((ROOT / page_name).read_text(encoding="utf-8"))
        urls.update(parser.urls)
    profile = json.loads((ROOT / "content/profile.json").read_text(encoding="utf-8"))
    urls.update(url for url in profile["links"].values() if url.startswith("http"))
    software = json.loads((ROOT / "content/software.json").read_text(encoding="utf-8"))
    for group in ("published", "systems", "development"):
        for project in software[group]:
            urls.update(link["url"] for link in project.get("links", []))
    writing = json.loads((ROOT / "content/writing.json").read_text(encoding="utf-8"))
    for work in writing["works"]:
        urls.update(link["url"] for link in work.get("links", []))
    return sorted(urls)


def check(url: str) -> tuple[str, int | str]:
    request = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "Rafael-site-link-check/1.0"})
    try:
        with urllib.request.urlopen(request, timeout=15, context=ssl.create_default_context()) as response:
            return url, response.status
    except urllib.error.HTTPError as error:
        if error.code in {403, 405, 429}:
            return url, error.code
        return url, error.code
    except Exception as error:  # network and TLS failures are reported verbatim
        return url, error.__class__.__name__


def main() -> None:
    urls = collect_urls()
    with ThreadPoolExecutor(max_workers=12) as pool:
        results = sorted(pool.map(check, urls))
    failures = [
        (url, status)
        for url, status in results
        if status in {404, 410}
        or (isinstance(status, int) and 500 <= status < 600)
    ]
    restricted = [
        (url, status)
        for url, status in results
        if status in {403, 405, 429, 999}
    ]
    unverified = [(url, status) for url, status in results if not isinstance(status, int)]
    for url, status in results:
        print(f"{status}\t{url}")
    print(
        f"Checked {len(results)} external links; failures: {len(failures)}; "
        f"access-restricted: {len(restricted)}; transient/unverified: {len(unverified)}"
    )
    if failures:
        raise SystemExit(1)


if __name__ == "__main__":
    main()

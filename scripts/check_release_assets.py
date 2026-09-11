#!/usr/bin/env python3
"""Reject mixed or unversioned stylesheet, script and font references."""
import re
from urllib.parse import urlsplit
from public_site import ROOT, References, public_files

RELEASE_TOKEN = "20260911-2"
ASSETS = {"styles.css", "script.js", "assets/css/records.css", "assets/css/home.css",
          "assets/css/research-folio.css", "assets/css/about-folio.css",
          "assets/fonts/stixtwotext.ttf", "assets/fonts/stixtwotext-italic.ttf",
          "assets/fonts/ibmplexsans.ttf"}


def check_references(name, source):
    if name.endswith('.html'):
        parser = References()
        parser.feed(source)
        urls = parser.urls
    else:
        urls = re.findall(r"url\(['\"]?([^)'\"]+)['\"]?\)", source)
    errors = []
    for url in urls:
        parts = urlsplit(url)
        if parts.path.lstrip('/') in ASSETS and parts.query != f'v={RELEASE_TOKEN}':
            errors.append(f'{name}: expected release {RELEASE_TOKEN}: {url}')
    return errors


def main():
    errors = []
    for name in sorted(public_files()):
        if name.endswith(('.html', '.css')):
            errors.extend(check_references(name, (ROOT / name).read_text()))
    if errors:
        raise SystemExit('\n'.join(errors))
    print(f'Stylesheet, script, imported CSS and font references use release {RELEASE_TOKEN}')


if __name__ == '__main__':
    main()

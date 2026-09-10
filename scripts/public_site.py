"""Single inventory of files needed by the public static site."""
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PAGES = ["index.html", "research.html", "publications.html", "software.html",
         "people.html", "writing.html", "about.html", "contact.html", "coin.html",
         "contributions.html"]
DATA = ["content/profile.json", "content/site.json", "content/software.json", "content/publications.json",
        "content/writing.json"]


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key in {"src", "href"} and value:
                self.urls.append(value)


def local_path(source, url):
    parts = urlsplit(url)
    if parts.scheme or parts.netloc or not parts.path:
        return None
    path = Path(parts.path.lstrip("/")) if parts.path.startswith("/") else Path(source).parent / unquote(parts.path)
    resolved = (ROOT / path).resolve()
    if not resolved.is_relative_to(ROOT):
        raise ValueError(f"Reference escapes the public root: {source}: {url}")
    return resolved.relative_to(ROOT).as_posix()


def public_files():
    files = set(PAGES + DATA + ["styles.css", "script.js", "CNAME", "robots.txt", "sitemap.xml",
                              "cv.html", "projects.html", "assets/cv/cv.pdf", "assets/cv/references.bib",
                              "assets/fonts/stixtwotext-OFL.txt", "assets/fonts/ibmplexsans-OFL.txt"])
    files.update(path.relative_to(ROOT).as_posix() for path in (ROOT / "multiradial").rglob("*.html"))
    allowed_html = {name for name in files if name.endswith(".html")}
    catalogue = json.loads((ROOT / "content/software.json").read_text())
    files.update(project["logo"] for group in catalogue.values() for project in group if project.get("logo"))
    writing = json.loads((ROOT / "content/writing.json").read_text())
    files.update(work["cover"] for work in writing["works"] if work.get("cover"))
    checked = set()
    while files - checked:
        name = sorted(files - checked)[0]
        checked.add(name)
        file = ROOT / name
        if not file.is_file():
            raise ValueError(f"Missing public file: {name}")
        urls = []
        if file.suffix == ".html":
            parser = References()
            parser.feed(file.read_text())
            urls = parser.urls
        elif file.suffix == ".css":
            urls = re.findall(r"url\(['\"]?([^)'\"]+)['\"]?\)", file.read_text())
        for url in urls:
            target = local_path(name, url)
            if target:
                if target.endswith(".html") and target not in allowed_html:
                    raise ValueError(f"Unexpected public page in {name}: {url}")
                if target.startswith(("design/", "docs/", "scripts/", "CV_rafael_2026/")):
                    raise ValueError(f"Development reference in {name}: {url}")
                files.add(target)
    return files


def exclusions():
    # Keep source material in Git without publishing it through branch-based Pages.
    fixed = {"design", "docs", "scripts", "CV_rafael_2026", "README.md", ".github",
             "_site", "_jekyll_site", ".gitignore", ".DS_Store"}
    public = public_files()
    for folder in (ROOT / "assets", ROOT / "content"):
        for file in folder.rglob("*"):
            if file.is_file() and not file.name.startswith(".") and file.relative_to(ROOT).as_posix() not in public:
                fixed.add(file.relative_to(ROOT).as_posix())
    for file in ROOT.iterdir():
        if file.is_file() and not file.name.startswith((".", "_")) and file.name not in public:
            fixed.add(file.name)
        elif file.is_dir() and not file.name.startswith((".", "_")) and file.name not in {"assets", "content", "multiradial"}:
            fixed.add(file.name)
    return sorted(fixed)


def config_text():
    return ('url: "https://rafaelsdesouza.com.br"\nbaseurl: ""\n'
            'exclude:\n' + ''.join('  - ' + json.dumps(path) + '\n' for path in exclusions()))

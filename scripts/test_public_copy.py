import unittest
import tempfile
import re
from pathlib import Path
from lint_public_copy import FORBIDDEN, SOFTWARE_NAMES, VisibleText, classify, lint_tree
from public_site import ROOT, config_text, public_files


class PublicCopyTests(unittest.TestCase):
    def test_approved_home_opening_and_selection(self):
        home = (ROOT / 'index.html').read_text()
        opening = re.search(r'<section\b[^>]*\bid="home".*?</section>', home, re.S).group()
        self.assertNotIn('class="intro"', opening)
        self.assertNotIn('class="appointments"', opening)
        self.assertIn('class="role">Astrophysicist</p>', opening)
        self.assertIn('home-nebula-contours.jpg', opening)
        self.assertIn('Spectra as ordered geometric objects', home)
        self.assertIn('https://doi.org/10.1016/j.ecolind.2025.113961', home)
        self.assertIn('All 140 scholarly works', home)

    def test_home_folio_order_and_assets(self):
        home = (ROOT / 'index.html').read_text()
        expected = ['home', 'capivara', 'spectropath', 'milky-way', 'bayesian-models', 'coin', 'writing']
        positions = [home.index(f'id="{anchor}"') for anchor in expected]
        self.assertEqual(positions, sorted(positions))
        self.assertLess(home.index('id="writing"'), home.index('class="elsewhere"'))
        self.assertLess(home.index('class="elsewhere"'), home.index('class="ending"'))
        for old_layout in ('home-domain-index', 'mark-strip', 'home-personal'):
            self.assertNotIn(old_layout, home)
        self.assertIn('Founded 2014', home)
        for asset in ('capivara-segmentation.png', 'spectropath-toy-case.png', 'milky-way.png',
                      'book-cover-bayesian-models.jpg', 'coin-2024.png', 'beyond-the-rainbow-cover.jpg'):
            self.assertIn(asset, home)
        css = (ROOT / 'assets/css/home.css').read_text()
        self.assertNotIn('EB Garamond', css)
        self.assertNotIn('concept-', css)
        self.assertIn('.home-folio .opening h1{font-size:78px}', css)

    def test_research_opening_order_and_scientific_corrections(self):
        research = (ROOT / 'research.html').read_text()
        self.assertIn('<h1 id="research-title">Every observation is selective.</h1>', research)
        self.assertIn('<p class="opening-consequence">What is measured, omitted or compressed constrains what may later be inferred.</p>', research)
        self.assertNotIn('class="research-jumps"', research)
        self.assertNotIn('class="recurring-index"', research)
        self.assertIn('RECENT → EARLY', research)
        expected = ['current-work', 'incomplete-calibration', 'representation-completion',
                    'spectropath', 'radialpaths', 'resolved-current', 'trajectory', 'resolved-galaxies',
                    'galaxy-populations', 'milky-way', 'transients', 'survey-calibration',
                    'nuclear-astrophysics', 'probability-models', 'cosmology',
                    'first-stars', 'cosmic-magnetism', 'across-astronomy']
        positions = [research.index(f'id="{anchor}"') for anchor in expected]
        self.assertEqual(positions, sorted(positions))
        self.assertIn('binomial regression for star-formation activity and metal enrichment', research)
        self.assertNotIn('one or several Population III stars', research)
        self.assertIn('https://doi.org/10.1051/0004-6361/201834453', research)
        self.assertIn('treated spectroscopic follow-up as a sequential decision', research)

    def test_research_folio_is_static_and_uses_existing_figures(self):
        research = (ROOT / 'research.html').read_text()
        self.assertEqual(len(re.findall(r'<article\b', research)), 15)
        self.assertEqual(len(re.findall(r'<figure>', research)), 5)
        for asset in ('spectropath-toy-case.png', 'radialpaths-multicentre-construction.png',
                      'capivara-segmentation.png', 'milky-way.png', 'book-cover-bayesian-models.jpg'):
            self.assertIn(asset, research)
        domain_index = re.search(r'<nav class="domain-index".*?</nav>', research, re.S).group()
        self.assertEqual(len(re.findall(r'<a\b', domain_index)), 6)
        self.assertNotIn('noindex', research)
        self.assertIn('assets/css/research-folio.css?v=', research)
        self.assertNotIn('assets/css/research-folio.css', (ROOT / 'index.html').read_text())

    def test_writing_attribution_and_exact_excerpt(self):
        excerpt = 'The hour arrives.<br>Rain has passed.<br>The air is cool and shimmering with ions.'
        for name in ('index.html', 'writing.html'):
            text = (ROOT / name).read_text()
            # A no-wrap span may control line breaking without changing the excerpt.
            text = re.sub(r'</?span\b[^>]*>', '', text)
            self.assertIn(excerpt, text)
        writing = (ROOT / 'writing.html').read_text()
        self.assertIn('Rafael S. de Souza, Emille E. O. Ishida and Alberto Krone-Martins', writing)
        self.assertIn('72(10), 1137–1145', writing)
        self.assertNotIn('class="writing-lede"', writing)

    def test_coin_content_is_static_and_leadership_remains_on_about(self):
        coin = (ROOT / 'coin.html').read_text()
        self.assertIn('COIN is co-led by Emille E. O. Ishida, Alberto Krone-Martins and me.', coin)
        self.assertIn('The first residence', coin)
        self.assertNotIn('data-site-list="leadership"', coin)
        about = (ROOT / 'about.html').read_text()
        for role in ('Founder · 2014–present', 'Former Vice-President', 'Member · 2021–present'):
            self.assertIn(role, about)

    def test_required_banned_phrases(self):
        for phrase in ("127.0.0.1", "localhost", "authored-atlas", "internal review", "typography comparison"):
            self.assertIn(phrase, FORBIDDEN)

    def test_about_biographical_folio_and_appointment_source(self):
        from render_appointments import render
        about = (ROOT / 'about.html').read_text()
        self.assertIn(render(), about)
        self.assertIn('<h1 class="archival-label" id="about-title">ABOUT</h1>', about)
        self.assertNotIn('About Rafael</h1>', about)
        self.assertIn('I trained as an astrophysicist; statistics became a second language, and literature remained a parallel one.', about)
        self.assertIn('id="career"', about)
        self.assertIn('id="leadership-title"', about)
        for asset in ('rafael-de-souza.jpg', 'coin-2024.png', 'book-cover-bayesian-models.jpg', 'beyond-the-rainbow-cover.jpg'):
            self.assertIn(asset, about)
        for fact in ('Direct-entry PhD in Astrophysics', 'BSc in Astronomy', 'Origin of Cosmic Magnetic Fields',
                     'Cosmic Acceleration', 'PROSE Award', 'Postdoc Award', 'Visiting Professor'):
            self.assertIn(fact, about)
        self.assertNotIn('noindex', about)
        self.assertIn('assets/css/about-folio.css?v=', about)
        for page in ('index.html', 'research.html'):
            self.assertNotIn('assets/css/about-folio.css', (ROOT / page).read_text())

    def test_software_headings_are_detectable(self):
        for name in SOFTWARE_NAMES:
            parser = VisibleText()
            parser.feed(f'<h3><a href="#paper">{name}</a></h3>')
            self.assertEqual(parser.headings, [("h3", name)])

    def test_visible_attributes_are_scanned(self):
        parser = VisibleText()
        parser.feed('<img alt="Internal review"><input placeholder="View STIX candidate"><button aria-label="Typography comparison">Open</button>')
        parser.flush()
        self.assertIn("Internal review", parser.units)
        self.assertIn("View STIX candidate", parser.units)
        self.assertIn("Typography comparison", parser.units)

    def test_scientific_candidate_is_not_blanket_exception(self):
        self.assertIsNotNone(classify("candidate", "an evolving transient candidate pool"))
        self.assertIsNone(classify("candidate", "View STIX candidate"))
        self.assertIsNone(classify("review", "review surfaces"))

    def test_public_inventory_has_no_development_pages(self):
        files = public_files()
        self.assertEqual(len([name for name in files if name.endswith('.html')]), 18)
        self.assertFalse(any(name.startswith(("design/", "docs/", "scripts/", "CV_rafael_2026/")) for name in files))
        self.assertIn("assets/cv/references.bib", files)
        self.assertIn("assets/cv/cv.pdf", files)
        self.assertNotIn("content/writing.json", files)

    def test_pages_exclusions_are_enforced(self):
        self.assertFalse((ROOT / ".nojekyll").exists())
        self.assertEqual((ROOT / "_config.yml").read_text(), config_text())

    def test_lint_rejects_public_review_copy(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            for fragment in ('<p>Internal review</p>', '<img alt="View STIX candidate">',
                             '<a href="http://127.0.0.1:5189">Open</a>',
                             '<p>This page showcases our design.</p>'):
                with self.subTest(fragment=fragment):
                    (root / 'research.html').write_text(fragment)
                    self.assertTrue(lint_tree(root)[0])

    def test_project_heading_rule_is_research_specific(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            for name in SOFTWARE_NAMES:
                with self.subTest(name=name):
                    (root / 'research.html').write_text(f'<h3><a href="#paper">{name}</a></h3>')
                    self.assertTrue(lint_tree(root)[0])
            (root / 'research.html').write_text('<h3>Spectra as ordered geometric objects</h3>')
            (root / 'software.html').write_text('<h3>spectropath</h3>')
            self.assertEqual(lint_tree(root)[0], [])


if __name__ == "__main__":
    unittest.main()

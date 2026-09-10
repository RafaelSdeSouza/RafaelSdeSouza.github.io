import unittest
import tempfile
import re
from pathlib import Path
from lint_public_copy import FORBIDDEN, SOFTWARE_NAMES, VisibleText, classify, lint_tree
from public_site import ROOT, config_text, public_files


class PublicCopyTests(unittest.TestCase):
    def test_approved_home_opening_and_selection(self):
        home = (ROOT / 'index.html').read_text()
        opening = re.search(r'<section id="home".*?</section>', home, re.S).group()
        self.assertNotIn('class="intro"', opening)
        self.assertNotIn('class="appointments"', opening)
        self.assertIn('class="role">Astrophysicist</p>', opening)
        self.assertIn('home-nebula-contours.jpg', opening)
        self.assertIn('Spectra as ordered geometric objects', home)
        self.assertIn('https://doi.org/10.1016/j.ecolind.2025.113961', home)
        self.assertIn('All 140 scholarly works', home)

    def test_research_opening_order_and_scientific_corrections(self):
        research = (ROOT / 'research.html').read_text()
        self.assertIn('<p class="intro">Every observation is selective. What is measured, omitted or compressed constrains what may later be inferred.</p>', research)
        expected = ['current-work', 'across-astronomy', 'trajectory', 'resolved-galaxies',
                    'galaxy-populations', 'milky-way', 'transients', 'survey-calibration',
                    'nuclear-astrophysics', 'probability-models', 'cosmology',
                    'first-stars', 'cosmic-magnetism']
        positions = [research.index(f'id="{anchor}"') for anchor in expected]
        self.assertEqual(positions, sorted(positions))
        self.assertIn('binomial regression for star-formation activity and metal enrichment', research)
        self.assertNotIn('one or several Population III stars', research)
        self.assertIn('https://doi.org/10.1051/0004-6361/201834453', research)
        self.assertIn('treated spectroscopic follow-up as a sequential decision', research)

    def test_writing_attribution_and_exact_excerpt(self):
        excerpt = 'The hour arrives.<br>Rain has passed.<br>The air is cool and shimmering with ions.'
        for name in ('index.html', 'writing.html'):
            self.assertIn(excerpt, (ROOT / name).read_text())
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

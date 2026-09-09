import unittest
import tempfile
from pathlib import Path
from lint_public_copy import FORBIDDEN, SOFTWARE_NAMES, VisibleText, classify, lint_tree
from public_site import ROOT, config_text, public_files


class PublicCopyTests(unittest.TestCase):
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

import unittest
import tempfile
import re
from pathlib import Path
from lint_public_copy import FORBIDDEN, SOFTWARE_NAMES, VisibleText, classify, lint_tree
from public_site import ROOT, config_text, public_files


class PublicCopyTests(unittest.TestCase):
    def test_approved_home_opening_and_selection(self):
        home = (ROOT / 'index.html').read_text()
        opening = re.search(r'<section\b[^>]*class="[^"]*home-opening[^"]*".*?</section>', home, re.S).group()
        self.assertNotIn('class="intro"', opening)
        self.assertNotIn('class="appointments"', opening)
        self.assertIn('class="identity-role">Astrophysicist</p>', opening)
        self.assertIn('home-nebula-contours.jpg', opening)
        self.assertIn('I am an astrophysicist working across astronomy, statistics, mathematics and computation.', opening)
        self.assertIn('I founded the Cosmostatistics Initiative (COIN)', opening)
        self.assertIn('<cite>Bayesian Models for Astrophysical Data</cite>', opening)
        introduction = re.search(r'<section\b[^>]*class="home-introduction grid".*?</section>', home, re.S).group()
        self.assertIn('I have always been drawn to the places where one way of seeing the world becomes another.', introduction)
        self.assertIn('I study what astronomical observations can distinguish when information is incomplete', introduction)
        self.assertIn('what structure in the data are our usual methods failing to see?', introduction)
        self.assertNotIn('About me', introduction)
        css = (ROOT / 'styles.css').read_text()
        self.assertIn('.home-outlook{font:italic 400 clamp(', css)
        self.assertIn('.home-introduction-copy{grid-row:auto;max-width:100%;font-size:18px;line-height:1.55}', css)
        self.assertIn('Spectra as ordered geometric objects', home)
        self.assertIn('https://doi.org/10.1016/j.ecolind.2025.113961', home)
        self.assertIn('All 140 scholarly works', home)

    def test_home_folio_order_and_assets(self):
        home = (ROOT / 'index.html').read_text()
        expected = ['home', 'introduction', 'milky-way', 'capivara', 'spectropath', 'bayesian-models']
        positions = [home.index(f'id="{anchor}"') for anchor in expected]
        self.assertEqual(positions, sorted(positions))
        self.assertLess(home.index('id="bayesian-models"'), home.index('>COIN · 2014—</h2>'))
        writing = home.index('>Writing</h2>')
        elsewhere = home.index('>Ecology</h2>')
        ending = home.index('<nav class="object-section grid">')
        self.assertLess(writing, elsewhere)
        self.assertLess(elsewhere, ending)
        for old_layout in ('home-domain-index', 'mark-strip', 'home-personal'):
            self.assertNotIn(old_layout, home)
        self.assertIn('COIN · 2014—', home)
        for asset in ('milky-way-sagittarius-arm-pia24576.jpg', 'capivara-segmentation.png', 'spectropath-toy-case.png',
                      'book-cover-bayesian-models.jpg', 'coin-2024.png', 'beyond-the-rainbow-cover.jpg'):
            self.assertIn(asset, home)
        self.assertIn('A break in the Milky Way’s Sagittarius Arm', home)
        self.assertIn('NASA/JPL-Caltech · PIA24576', home)
        self.assertIn('https://www.jpl.nasa.gov/images/pia24576-a-break-in-the-milky-ways-sagittarius-arm/', home)
        css = (ROOT / 'styles.css').read_text()
        self.assertNotIn('EB Garamond', css)
        self.assertNotIn('concept-', css)
        self.assertIn('.home-opening .identity{', css)
        self.assertIn('.exceptional{font:400 36px/1.15 var(--serif)}', css)

    def test_home_uses_supplied_decorative_vocabulary(self):
        home = (ROOT / 'index.html').read_text()
        self.assertNotIn('class="home-contour"', home)
        css = (ROOT / 'styles.css').read_text()
        assets = (
            'rio-coast-field.png', 'coral-orbits.png', 'paper-field.png',
            'ordered-wave.png', 'isophote-contours.png',
        )
        for asset in assets:
            self.assertIn(f"assets/images/decorative/{asset}", css)
            self.assertTrue((ROOT / 'assets' / 'images' / 'decorative' / asset).is_file())
        self.assertNotIn('clip-path:', css[css.index('/* Home frontispiece */'):css.index('/* Archive openings')])
        self.assertNotIn('border-radius:52%', css)
        self.assertIn('.home-page #milky-way>figure{grid-column:2/span 4!important}', css)
        self.assertIn('.home-page #bayesian-models::before{width:1150px;height:865px', css)
        self.assertNotIn('.home-page .coin-section::before{width:', css)

    def test_research_opening_order_and_scientific_corrections(self):
        research = (ROOT / 'research.html').read_text()
        self.assertIn('Astronomy asks us to reconstruct causes from systems we cannot manipulate and histories we cannot replay.', research)
        self.assertIn('when observations distinguish between physical explanations', research)
        self.assertNotIn('class="research-jumps"', research)
        self.assertNotIn('class="recurring-index"', research)
        self.assertRegex(research, r'<span>Recent</span>\s*<i[^>]*></i>\s*<span>Early</span>')
        expected = ['current-work', 'incomplete-calibration', 'representation-completion',
                    'spectropath', 'radialpaths', 'resolved-current', 'resolved-galaxies',
                    'galaxy-populations', 'milky-way', 'transients', 'survey-calibration',
                    'nuclear-astrophysics', 'probability-models', 'cosmology',
                    'first-stars', 'cosmic-magnetism']
        positions = [research.index(f'id="{anchor}"') for anchor in expected]
        self.assertEqual(positions, sorted(positions))
        self.assertIn('binomial regression for star-formation activity and metal enrichment', research)
        self.assertNotIn('one or several Population III stars', research)
        self.assertIn('https://doi.org/10.1051/0004-6361/201834453', research)
        self.assertIn('treated spectroscopic follow-up as a sequential decision', research)

    def test_research_folio_is_static_and_uses_existing_figures(self):
        research = (ROOT / 'research.html').read_text()
        self.assertEqual(len(re.findall(r'<article\b', research)), 15)
        self.assertEqual(len(re.findall(r'<figure\b', research)), 7)
        for asset in ('spectropath-toy-case.png', 'radialpaths-multicentre-construction.png',
                      'capivara-segmentation.png', 'milky-way.png', 'book-cover-bayesian-models.jpg',
                      'spectral-classification.png', 'cosmic-structure.png'):
            self.assertIn(asset, research)
        terminal = re.search(r'<section class="object-section grid research-terminal-index">.*?</section>', research, re.S).group()
        domain_index = re.search(r'<ol class="domain-sequence".*?</ol>', terminal, re.S).group()
        self.assertEqual(len(re.findall(r'<a\b', domain_index)), 6)
        self.assertNotIn('noindex', research)
        self.assertIn('styles.css?v=', research)
        self.assertNotIn('assets/css/research-folio.css', research)

    def test_writing_attribution_and_exact_excerpt(self):
        excerpt = 'The hour arrives.<br>Rain has passed.<br>The air is cool and shimmering with ions.'
        for name in ('index.html', 'writing.html'):
            text = (ROOT / name).read_text()
            # A no-wrap span may control line breaking without changing the excerpt.
            text = re.sub(r'</?span\b[^>]*>', '', text)
            self.assertIn(excerpt, text)
        writing = (ROOT / 'writing.html').read_text()
        catalogue = (ROOT / 'content/writing.json').read_text()
        self.assertIn('Rafael S. de Souza', catalogue)
        self.assertIn('Emille E. O. Ishida', catalogue)
        self.assertIn('Alberto Krone-Martins', catalogue)
        self.assertIn('72(10), 1137–1145', catalogue)
        self.assertIn('A Journey into the Void', catalogue)
        self.assertNotIn('class="writing-lede"', writing)

    def test_coin_content_is_static_and_leadership_remains_on_about(self):
        coin = (ROOT / 'coin.html').read_text()
        self.assertIn('COIN is co-led by Emille E. O. Ishida, Alberto Krone-Martins and me.', coin)
        self.assertIn('The first residence', coin)
        self.assertNotIn('data-site-list="leadership"', coin)
        about = (ROOT / 'about.html').read_text()
        for role in ('Founder and Co-Chair', 'Former Vice-President', '2021–present', '>Chair</p>'):
            self.assertIn(role, about)

    def test_required_banned_phrases(self):
        for phrase in ("127.0.0.1", "localhost", "authored-atlas", "internal review", "typography comparison"):
            self.assertIn(phrase, FORBIDDEN)

    def test_about_biographical_folio_and_appointment_source(self):
        import json
        from render_static_content import appointment_rows
        about = (ROOT / 'about.html').read_text()
        about_data = json.loads((ROOT / 'content/about.json').read_text())
        self.assertIn(appointment_rows(about_data['appointments']), about)
        self.assertRegex(about, r'<h1 class="label slot"[^>]*id="about-title">About</h1>')
        self.assertNotIn('About Rafael</h1>', about)
        self.assertIn('Disciplines are useful divisions of labour, not divisions of thought.', about)
        self.assertIn('id="career"', about)
        self.assertIn('id="created-title"', about)
        self.assertIn('id="service-title"', about)
        for asset in ('rafael-de-souza.jpg', 'coin-2024.png', 'book-cover-bayesian-models.jpg', 'beyond-the-rainbow-cover.jpg'):
            self.assertIn(asset, about)
        for fact in ('Direct-entry PhD in Astrophysics', 'BSc in Astronomy', 'Origin of Cosmic Magnetic Fields',
                     'Cosmic Acceleration', 'PROSE Award', 'Postdoc Award', 'Visiting Professor'):
            self.assertIn(fact, about)
        self.assertNotIn('noindex', about)
        self.assertIn('styles.css?v=', about)
        self.assertNotIn('assets/css/about-folio.css', about)
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
        self.assertFalse(any(name.startswith("content/") for name in files))

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

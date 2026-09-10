import unittest
from check_release_assets import RELEASE_TOKEN, check_references


class ReleaseAssetTests(unittest.TestCase):
    def test_unversioned_script_is_rejected(self):
        self.assertTrue(check_references('index.html', '<script src="script.js"></script>'))

    def test_mixed_font_preload_is_rejected(self):
        self.assertTrue(check_references('index.html', '<link rel="preload" href="assets/fonts/stixtwotext.ttf?v=old">'))

    def test_home_stylesheet_is_versioned(self):
        self.assertTrue(check_references('index.html', '<link rel="stylesheet" href="assets/css/home.css">'))
        self.assertEqual(check_references('index.html', f'<link rel="stylesheet" href="assets/css/home.css?v={RELEASE_TOKEN}">'), [])

    def test_import_and_font_urls_are_checked(self):
        self.assertEqual(len(check_references('styles.css', '@import url("assets/css/records.css"); @font-face{src:url(\'assets/fonts/stixtwotext.ttf\')}')), 2)

    def test_research_stylesheet_is_versioned(self):
        self.assertTrue(check_references('research.html', '<link rel="stylesheet" href="assets/css/research-folio.css">'))
        self.assertEqual(check_references('research.html', f'<link rel="stylesheet" href="assets/css/research-folio.css?v={RELEASE_TOKEN}">'), [])

    def test_shared_release_is_accepted(self):
        self.assertEqual(check_references('index.html', f'<link rel="stylesheet" href="styles.css?v={RELEASE_TOKEN}"><script src="script.js?v={RELEASE_TOKEN}"></script>'), [])
        self.assertEqual(check_references('styles.css', f'@import url("assets/css/records.css?v={RELEASE_TOKEN}");'), [])


if __name__ == '__main__':
    unittest.main()

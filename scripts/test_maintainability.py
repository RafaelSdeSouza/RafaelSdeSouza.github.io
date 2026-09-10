import copy
import json
import tempfile
import unittest
from pathlib import Path

from bib_to_publications import build_publications
from render_static_content import (
    publication_rows,
    render_about,
    render_publication_summary,
    render_research,
    render_writing,
)
from validate_content import CONTENT, ContentError, RESEARCH_LAYOUTS, validate_layout


class MaintainabilityTests(unittest.TestCase):
    def load(self, name):
        return json.loads((CONTENT / name).read_text(encoding="utf-8"))

    def test_story_can_be_added_from_one_record(self):
        writing = copy.deepcopy(self.load("writing.json"))
        writing["works"].append({
            "id": "temporary-story",
            "type": "Science fiction",
            "title": "Temporary Story",
            "authors": ["Rafael S. de Souza"],
            "url": "https://example.org/temporary-story",
            "featured": False,
        })
        markup, archive_count = render_writing(writing)
        self.assertEqual(archive_count, 4)
        self.assertIn("Temporary Story", markup)
        self.assertIn("writing-text", markup)

    def test_research_record_uses_semantic_layout_only(self):
        research = copy.deepcopy(self.load("research.json"))
        research["trajectory"].append({
            "id": "temporary-research",
            "layout": "quiet",
            "metadata": "",
            "title": "Temporary scientific question",
            "body": ["A temporary record used only by the maintainability test."],
            "links": [],
        })
        markup = render_research(research)
        self.assertIn('id="temporary-research"', markup)
        self.assertIn("text-spread", markup)
        with self.assertRaisesRegex(ContentError, "unknown layout"):
            validate_layout(
                {"id": "temporary-research", "layout": "wide-ish"},
                RESEARCH_LAYOUTS,
                "content/research.json",
            )

    def test_appointment_can_be_added_from_one_record(self):
        about = copy.deepcopy(self.load("about.json"))
        about["appointments"].append({
            "start": 2027,
            "end": None,
            "role": "Temporary Appointment",
            "appointment_type": "visiting",
            "institution": "Temporary Observatory",
            "country": "Brazil",
            "url": "https://example.org/observatory",
        })
        markup = render_about(about, self.load("writing.json"))
        self.assertIn("Temporary Observatory", markup)
        self.assertIn("Temporary Appointment", markup)

    def test_temporary_bibtex_record_produces_141_works(self):
        source = Path("assets/cv/references.bib").read_text(encoding="utf-8")
        dummy = """

@article{temporaryMaintainability2027,
  author = {de Souza, Rafael S.},
  title = {Temporary Maintainability Record},
  journal = {Temporary Journal},
  year = {2027},
  doi = {10.0000/temporary-maintainability}
}
"""
        with tempfile.TemporaryDirectory() as directory:
            temporary = Path(directory)
            path = temporary / "references.bib"
            path.write_text(source + dummy, encoding="utf-8")
            records = build_publications(path)
            html = temporary / "publications.html"
            html.write_text(
                '<meta name="description" content="The complete scholarly publication record of Rafael S. de Souza: 140 unique works.">'
                '<meta property="og:description" content="The complete scholarly publication record of Rafael S. de Souza: 140 unique works.">'
                '<p class="archive-count">140 scholarly works</p>'
                '<p class="metadata" id="publication-count" data-publication-count aria-live="polite">Showing 140 of 140 records</p>',
                encoding="utf-8",
            )
            render_publication_summary(html, len(records), check=False)
            rendered_summary = html.read_text(encoding="utf-8")
        self.assertEqual(len(records), 141)
        self.assertEqual(records[0]["id"], "temporaryMaintainability2027")
        self.assertIn("Temporary Maintainability Record", publication_rows(records))
        self.assertIn("temporary maintainability record", publication_rows(records))
        self.assertIn("141 scholarly works", rendered_summary)
        self.assertIn("Showing 141 of 141 records", rendered_summary)


if __name__ == "__main__":
    unittest.main()

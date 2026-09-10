.PHONY: update check

update:
	python3 scripts/update_site.py

check:
	python3 -m unittest discover -s scripts -p 'test_*.py'
	python3 scripts/build_site.py

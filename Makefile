.PHONY: update check

update:
	python3 scripts/render_appointments.py
	python3 scripts/check_writing.py
	python3 scripts/build_site.py --write-config

check:
	python3 scripts/build_site.py

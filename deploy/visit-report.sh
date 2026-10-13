#!/bin/sh
# Builds a visit report for the brand hub from the NAS web server logs.
# No cookies, no tracking script on the site, and visitor IP addresses are
# anonymised in the report. Run on the NAS (see deploy/visit-counting.md).
#
# Usage: sh visit-report.sh /path/to/access.log [/path/to/output-folder]
set -eu

LOG="${1:?Give the path to the web server access log}"
OUT="${2:-/volume1/web/ss_assets_reports}"

mkdir -p "$OUT"

# Pages only: drop images, fonts, scripts, styles and downloads from the counts.
grep -v -E '\.(svg|png|jpe?g|webp|gif|ico|css|js|json|woff2?|ttf|otf|zip|pdf|map|txt|xml)( |\?)' "$LOG" \
  | docker run --rm -i allinurl/goaccess - \
      --log-format=COMBINED \
      --anonymize-ip \
      --ignore-crawlers \
      --no-query-string \
      --ignore-panel=HOSTS \
      -o html > "$OUT/visits.html"

echo "Report written to $OUT/visits.html"

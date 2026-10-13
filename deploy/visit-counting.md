# Counting visits (without tracking anyone)

We count visits from the NAS web server log. Nothing is added to the website: no cookies, no tracking script, no consent banner. The report shows page views, unique visitors, most-visited pages, referrers, browsers and countries. Visitor IP addresses are anonymised and the "hosts" panel is switched off.

## What you need

- Container Manager (Docker) installed on the NAS.
- The path to the access log for `assets.suamisihat.myds.me`. In DSM, open Web Station > Web Service Portal, select the site and look for the log settings. If access logging is off, switch it on there. The log is usually under `/volume1/web/log/` or `/var/log/nginx/`.

## Run it

1. Copy `deploy/visit-report.sh` to the NAS, for example into `/volume1/web/tools/`.
2. Run it by SSH: `sh visit-report.sh /path/to/access.log`.
3. Open `/volume1/web/ss_assets_reports/visits.html` in a browser. Do not put this folder inside `ss_assets`, because the site is public and the deploy replaces that folder.

To keep it fresh, add a daily task in Control Panel > Task Scheduler > Create > Scheduled Task > User-defined script, with the same command.

## Good to know

- Logs rotate, so the report only covers the dates the log still holds. Ask DSM to keep at least 90 days.
- Only pages are counted. Images, fonts, downloads and scripts are filtered out. To count PDF or ZIP downloads, remove `zip|pdf` from the filter in the script.
- Counts are rough: visitors behind one office network can look like one person, and crawlers that hide themselves are counted.
- This is enough to compare "before" and "after" a page change. A/B tests need a reliable per-visitor split. Revisit if you want those.

## Status

The script and these steps have not been run on the NAS yet. Test on one log file and check the numbers against a few visits you make yourself.

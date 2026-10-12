# QA Report v3.6.0

Date: 12 October 2026
Scope: whole repository and the built site (`build/`), branch `release/v3.6.0`.
Method: automated checks run in a clean environment (Node 22, Chromium) plus manual review of brand pages in light and dark theme.

## Result

All automated checks pass. Open items below are content and brand decisions, not code defects.

| Check | Command | Result |
| --- | --- | --- |
| Content lint (emoji, entities, mojibake, icon set, file names, product schema) | `npm run lint` | Pass |
| Icon names exist in Fluent | `npm run build` | Pass (196 icons bundled) |
| Build output smoke test | `npm run test:smoke` | 38 / 38 |
| Page structure (incl. seven product sections on 9 brands) | `npm run test:dom` | 152 / 152 |
| Colour token matrix and product pairings | `npm run test:contrast` | 82 / 82 |
| axe-core WCAG 2.2 A/AA, 18 pages x 2 themes | `npm run test:a11y` | 36 / 36 pages, 0 violations |
| Console errors and failed requests (spot check of 7 pages) | manual script | 0 errors, 0 failed requests, mermaid renders |

Baseline before this release (same axe test on v3.5.1): every page failed in both themes, with 74 rule violations across hundreds of elements, mainly colour contrast.

## Findings fixed in this release

| ID | Severity | Finding | Fix |
| --- | --- | --- | --- |
| SEC-01 | Critical | NPRA formula PDF for MENSS Care Cream in the public repository and on the web server | Removed; history purged |
| SEC-02 | Critical | Whole repository, including `.git`, served from the NAS web root | Deploy only `build/` with rsync; CI checks `/.git/config` is not served |
| SEC-03 | High | Client-side puzzle was the only access control | Server-side Basic Auth in `.htaccess` (activates with the password file) |
| SEC-04 | High | Deploy used an SSH password | SSH deploy key; password to be rotated |
| SEC-05 | Medium | `robots.txt` not deployed; no `noindex` header | Both deployed |
| SEC-06 | Medium | Third-party CDNs (Bootstrap, fonts, iconify, marked, mermaid, unpinned unpkg) | All self-hosted; strict CSP |
| A11Y-01 | Critical | Gatekeeper component overrode text tokens on `:root`, breaking contrast site-wide | Scoped to the overlay |
| A11Y-02 | High | White on Azure buttons (2.8:1) and Azure, Lion and Malibu text on light | Contrast-safe tokens |
| A11Y-03 | High | Dark mode: white inputs, tables and cards with light text | Theme-aware overrides; missing tokens defined |
| A11Y-04 | Medium | Name mismatches, small targets, unfocusable code, no reduced motion | Fixed |
| ARCH-01 | High | Three copies of assets (root, `static/`, committed build) already drifted | `static/` only |
| ARCH-02 | Medium | Stylesheets containing pasted HTML, Svelte `:global()` and unclosed blocks | Repaired |
| ARCH-03 | Medium | Eight icon names that do not exist in Fluent (blank icons in production) | Replaced; build fails on unknown names |
| ARCH-04 | Medium | Signature page tabs relied on Bootstrap JS that was never loaded | Svelte tabs |
| CONT-01 | Medium | Emoji in UI and docs | Fluent icons and shortcodes; lint guard |
| CONT-02 | Medium | Version 3.5.1 vs 3.6.0 vs hard-coded strings; wrong domain in README and signature | Single version source; correct domain |
| CONT-03 | Medium | Banana Yellow `#F7E143` vs token `#FCE53D` | Unified on `#FCE53D` |
| CONT-04 | Medium | REJAL described three ways; Dr Mit Ring copy contradicted its packaging; product galleries pointed at missing files | Seven-section product pages from one metadata file per brand |
| LIC-01 | Medium | MIT licence covered brand assets | `LICENSE-ASSETS` for brand assets |

## Open items

| ID | Owner | Item |
| --- | --- | --- |
| OPEN-01 | Regulatory | Review the claims flagged on product pages (REJAL, Dr Mit Ring, ANDROLAB RX, MENSS devices) and catalogue copy for partner ingredients such as Physta |
| OPEN-02 | Brand | Typography: Brand System section 04 lists Poppins, Montserrat, Helvetica Neue and Calibri; older docs and the email signature use Outfit |
| OPEN-03 | Brand | Product photography for Mensculine, nuCaffe, Husband Clinic, Isteri Sihat and Dr Mit Ring |
| OPEN-04 | Brand | Xprimal is described as replaced by "MENSS Care Cream" in the catalogue, while the Mensculine page lists Mensculine Care Cream; confirm the product name |
| OPEN-05 | IT | Create the NAS password file and deploy key, rotate the old NAS password (see `deploy/README.md`) |
| OPEN-06 | Dev | Split the largest page files and move inline styles to classes (roadmap v3.7) |
| OPEN-07 | Dev | Product folders use mixed case (`static/products/Rejal`) next to lower-case page routes (`/products/rejal/`); works, but rename to slugs in a later release |

## Archive

Reports for v3.4 (static HTML site) are in `QA/archive/` for reference.

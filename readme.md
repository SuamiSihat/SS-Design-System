# SuamiSihat Design System

The single source of truth for the SuamiSihat brand: logos, colour and type tokens, Fluent 2 based UI components, and the brand guideline for every SuamiSihat product.

| | |
| --- | --- |
| Live site | https://assets.suamisihat.myds.me/ (internal, login required) |
| Repository | https://github.com/SuamiSihat/SS-Design-System |
| Version | 3.6.2 (October 2026) |
| Stack | SvelteKit 2, Svelte 5, static adapter |
| Accessibility | WCAG 2.2 AA in light and dark theme, checked on every build |
| Licence | Code: MIT ([LICENSE](LICENSE)). Brand assets: proprietary ([LICENSE-ASSETS](LICENSE-ASSETS)) |

---

## What is in the hub

| Page | Path | Purpose |
| --- | --- | --- |
| Home | `/` | Overview, palette explorer, quick links |
| Brand System | `/brand-system/` | Logos, colour tokens, typography, logomark rules, sub-brand architecture |
| Guidelines | `/brand-guidelines/` | Printable brand guideline PDFs |
| Components | `/components/` | Live Fluent 2 component library (buttons, cards, alerts, tokens) |
| Products | `/products/` | Product catalogue and one guideline page per brand |
| Docs | `/doc/?doc=<name>` | Markdown documentation (voice, colour composition, positioning, changelog, roadmap) |
| Tools, Signature, Onboarding | `/tools/`, `/signature/`, `/onboarding/` | WCAG and APCA contrast checker, icon explorer, email signature generator, staff onboarding |

---

## Brand rules in one page

### 60:30:10 colour allocation

Every layout uses colour in three layers.

| Layer | Share | SuamiSihat colours | Role |
| --- | --- | --- | --- |
| Foundation | 60% | Porcelain `#FCFAF6`, White `#FFFFFF`, Void Dark `#090D16` | Canvas and space |
| Structure | 30% | Prussian Blue `#022057`, SS Blue `#043388` | Navigation, headers, cards, footer |
| Accent | 10% | Azure `#21A1F7`, Banana Yellow `#FCE53D` | The one primary action, focus, highlights |

Only the single most important action on a screen gets the accent treatment. Each product brand has its own 60:30:10 scheme on its product page.

### Contrast-safe colour tokens

Brand hexes are not always readable as text. Use the semantic tokens in `static/assets/css/fluent.css`; they are verified by `npm run test:contrast`.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--color-action-bg` / `--color-on-action` | `#0B6BC4` / white (5.4:1) | same | Filled primary buttons |
| `--color-cta-bg` / `--color-on-cta` | `#FCE53D` / `#1C1C1C` (13.3:1) | same | Banana conversion CTA |
| `--color-link` | `#0B6BC4` | `#6CB4FF` | Links |
| `--color-text-accent` | `#0B6BC4` | `#21A1F7` | Azure-coloured text |
| `--color-text-warm` | `#8A6538` | `#BD9A73` | Lion-coloured text |
| `--color-focus-ring` | `#0B6BC4` | `#6DC6EC` | Focus outlines (3:1 non-text) |

Azure `#21A1F7` stays the brand accent for icons, focus on dark, decorative fills and dark surfaces. White text on Azure is 2.8:1 and is not allowed.

### Text hierarchy

| Level | Token | Light | Dark |
| --- | --- | --- | --- |
| Strong | `--text-strong` | `#000000` | `#FFFFFF` |
| Primary | `--text-primary` | `#19191A` | `#FCFAF6` |
| Secondary | `--text-secondary` | `rgba(25,25,26,0.65)` | `rgba(252,250,246,0.65)` |
| Disabled | `--text-disabled` | `rgba(25,25,26,0.35)` | `rgba(252,250,246,0.35)` |

Do not lower text contrast with `opacity`; use the next tier instead.

### Icons, not emoji

All UI icons come from Fluent System Icons through `<iconify-icon icon="fluent:name-24-regular">`. Emoji and pictographic symbols are not allowed anywhere: in the UI, in docs, or in commit-facing files. Markdown docs use `{{icon:name}}` shortcodes (`{{icon:yes}}`, `{{icon:no}}`, `{{icon:warning}}`), rendered as Fluent icons by the doc viewer. `npm run lint` enforces this.

### Logos

- Light backgrounds: `logo_suamisihat_primary_light.svg`. Dark or saturated backgrounds: `logo_suamisihat_primary_dark.svg` (white wordmark).
- Standalone mark: `ss-logomark-light.svg` on light, `ss-logomark-dark.svg` on dark.
- Files: `static/public/brand/logos/`. Full rules: `.agents/AGENTS.md` and the Brand System page.

---

## Product brand pages

Every product brand has a guideline page at `/products/<slug>/` with the same seven sections:

1. Product definition
2. Product images
3. Brand positioning
4. Colour scheme with its 60:30:10 split and contrast-checked text pairings
5. Brand pattern
6. Brand guideline (logos, clear space, minimum size, do and don't, typography)
7. Assets to download

The page is generated from `static/products/<Brand>/metadata.json` (schema 2). The build fails if a section is missing, a colour role is not 60/30/10, a declared text pairing is below WCAG AA, or a referenced file does not exist. See [Product page standard](static/content/product-page-standard.md).

Each brand also has a guideline PDF in `static/brand-guidelines/pdf/`, rendered from the same `metadata.json` by `npm run generate:pdfs` (Python with `playwright`, `pypdf` and `reportlab`; set `CHROME_PATH` to use an installed Chrome). `manifest.json` records which metadata each PDF was built from, and `npm run lint` fails when a brand's metadata changes without its PDF being regenerated: run `npm run generate:pdfs -- --brand <slug>` and commit the PDF with the metadata change.

| Brand | Slug | Status |
| --- | --- | --- |
| ANDROLAB | `androlab` | Active |
| MENSS | `menss` | Active |
| Mensculine | `mensculine` | Active (photography pending) |
| Dr. MIT Ring | `drmitring` | Active |
| REJAL | `rejal` | Active |
| nuCaffe | `nucaffe` | While stocks last (photography pending) |
| PERTABI | `pertabi` | Partner |
| Husband Clinic | `husbandclinic` | Partner (photography pending) |
| Isteri Sihat | `isterisihat` | Partner (photography pending) |

---

## Repository layout

```text
SS-Design-System/
  src/
    app.html                    HTML shell (self-hosted CSS only, no CDNs)
    lib/
      components/               Navbar, Footer, SSHero, CodeBox, ColorSwatch ...
        home/, brand-system/, components-library/   Section components for the three large pages
      products/index.js         Loads product metadata for the catalogue and brand pages
      utils/                    contrast.js (WCAG and APCA maths), markdown-icons.js ({{icon:}} shortcodes)
      stores/                   theme store (light/dark mode)
      version.js                Version shown in the UI (read from package.json)
    routes/                     One folder per page; products/[slug] is the brand page template
  static/                       Everything here is copied to the site root
    assets/css/                 fluent.css (tokens, Tier 1-5), style.css, components.css ...
    assets/tokens/              tokens.json, design-tokens.json, ss_tokens.ts
    content/                    Markdown docs shown at /doc/
    products/<Brand>/           metadata.json, pattern.svg, logos/, gallery/, downloads/, sub-products/
    public/brand/               Master and sub-brand logos, app icons, favicons, logo packs
    vendor/bootstrap/           Bootstrap 5.3.0 CSS (layout utilities)
    .htaccess                   Apache config: security headers, CSP, access control, routing
  scripts/
    build-icons.mjs             Bundles the Fluent icons the site uses
    lint-content.mjs            Emoji, mojibake, icon set, file names, product schema, stale brand PDFs
    product-schema.mjs          Product page standard (schema 2) validator
    make_brand_pdfs.py          Renders the per-brand guideline PDFs from metadata.json
    contrast-test.mjs           Token and product colour pairing matrix, APCA reference values
    a11y-test.mjs               axe-core in Chromium on every page, light and dark
    smoke-test.mjs, dom-test.mjs Build output and page structure checks
    minify-css.mjs              Post-build CSS minification
    remote-smoke-test.mjs       Checks the live site
  deploy/                       nginx.conf reference and NAS deployment guide
  .agents/AGENTS.md             Rules for AI agents and contributors
  .github/workflows/deploy.yml  Lint, build, test, deploy
```

---

## Working on the project

Requirements: Node.js 22 and npm.

```bash
git clone https://github.com/SuamiSihat/SS-Design-System.git
cd SS-Design-System
npm ci
npm run dev          # http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Bundles icons and starts the dev server |
| `npm run lint` | Emoji, mojibake, icon set, file names, product schema, stale brand PDFs |
| `npm run build` | Bundles icons, builds the static site into `build/`, minifies CSS |
| `npm run generate:pdfs -- --brand rejal` | Regenerates one brand guideline PDF (omit `--brand` for all) |
| `npm test` | Smoke, DOM, contrast matrix and accessibility tests (needs a build) |
| `npm run test:a11y -- --route /products/rejal/` | Accessibility test for one page |
| `npm run test:remote` | Checks the live site |

The accessibility test needs Chromium: run `npx playwright install chromium` once.

### Making a change

1. Branch from `main` (`feat/...`, `fix/...`, `docs/...`).
2. Make the change. Use tokens, Fluent icons and the 60:30:10 rule.
3. Run `npm run lint && npm run build && npm test`.
4. Open a pull request. CI runs the same checks; `main` deploys automatically after merge.

---

## Deployment

`main` is deployed by GitHub Actions (`.github/workflows/deploy.yml`):

1. Install, lint, build, test.
2. Upload `build/` to the Synology NAS web root (`/volume1/web/ss_assets`) with `rsync` over SSH, using a deploy key.
3. Check that the live site responds and that `/.git/config` is not served.

Only the built site is published. Source files, `.git`, QA reports and agent files never reach the web server. Access is protected by a server-side login (HTTP Basic Auth in `.htaccess`, enabled when the password file exists on the NAS) in front of the in-page welcome puzzle. Setup steps: [deploy/README.md](deploy/README.md).

---

## Documentation

| Document | Location |
| --- | --- |
| Changelog | [static/content/changelog.md](static/content/changelog.md) |
| Roadmap | [static/content/roadmap.md](static/content/roadmap.md) |
| Contribution guide | [static/content/contribution-guide.md](static/content/contribution-guide.md) |
| Product page standard | [static/content/product-page-standard.md](static/content/product-page-standard.md) |
| Brand x Fluent 2 contract | [static/content/brand-fluent2.md](static/content/brand-fluent2.md) |
| Colour composition (60:30:10) | [static/content/color-composition-guide.md](static/content/color-composition-guide.md) |
| Text colour guide | [static/content/text-color-guide.md](static/content/text-color-guide.md) |
| Brand voice | [static/content/brand-voice.md](static/content/brand-voice.md) |
| Agent and contributor rules | [.agents/AGENTS.md](.agents/AGENTS.md) |
| Latest QA report | [QA/QA-REPORT-v3.6.0.md](QA/QA-REPORT-v3.6.0.md) |
| Security policy | [SECURITY.md](SECURITY.md) |

---

## Contact

Brand and design system: branding@suamisihat.com. Report security issues privately to the same address (see [SECURITY.md](SECURITY.md)).

Copyright 2026 SuamiSihat Holding Sdn. Bhd.

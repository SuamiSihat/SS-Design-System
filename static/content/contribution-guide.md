# Contribution and Governance Guide

The SuamiSihat Design System is shared by designers, developers, marketers and clinical teams. This guide explains how to propose a change, where each kind of change lives, and the checks every change must pass.

---

## How to propose a change

### Brand review (no repository access needed)

Email **branding@suamisihat.com** with:

- **Scope:** the page, component, document or brand affected.
- **Reason:** the business, clinical or user need.
- **Proposal:** a mock-up, screenshot or suggested wording.

The brand team replies within two working days.

### Pull request (repository access)

1. Create a branch from `main`: `feat/...`, `fix/...` or `docs/...`.
2. Make the change following the rules below.
3. Run the checks:

```bash
npm ci
npm run lint
npm run build
npm test
```

4. Open a pull request using the template. CI runs the same checks. After merge, `main` deploys to https://assets.suamisihat.myds.me/ automatically.

---

## Who approves what

| Change | Review | Approver |
| --- | --- | --- |
| Copy and documentation | Pull request review | Editorial team |
| New UI component | Design review and accessibility test | Lead UI/UX designer |
| Colour or token change | 60:30:10 check and contrast test | Brand director |
| Logo or trademark asset | Brand board approval | Brand governance board |
| Product brand page | Product owner and brand director; claims reviewed by regulatory | Brand director |

---

## Where to make changes

| Change | Location |
| --- | --- |
| Documentation | `static/content/*.md`, shown at `/doc/?doc=<name>` |
| Product brand pages | `static/products/<Brand>/metadata.json` (see [Product Page Standard](/doc/?doc=product-page-standard)) |
| Design tokens | `static/assets/css/fluent.css` and `static/assets/tokens/*.json` |
| UI components | `src/lib/components/` and the showcase in `src/routes/components/` |
| Pages | `src/routes/<page>/+page.svelte` |
| Agent and contributor rules | `.agents/AGENTS.md` |

All files people can open or download live under `static/`. Do not create copies anywhere else.

---

## Rules every change must follow

### Colour

- Use semantic tokens, not raw hex values, for text, buttons and links: `--text-*`, `--color-action-bg` / `--color-on-action`, `--color-cta-bg` / `--color-on-cta`, `--color-link`, `--color-text-accent`, `--color-text-warm`.
- Keep the 60:30:10 allocation: one accent action per view.
- Never put white text on Azure `#21A1F7`, Malibu, Lion or Banana.
- Do not lower text contrast with `opacity`.

### Text hierarchy

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--text-strong` | `#000000` | `#FFFFFF` | Headlines, key figures |
| `--text-primary` | `#19191A` | `#FCFAF6` | Body text, headings, forms |
| `--text-secondary` | `rgba(25,25,26,0.65)` | `rgba(252,250,246,0.65)` | Metadata, captions |
| `--text-disabled` | `rgba(25,25,26,0.35)` | `rgba(252,250,246,0.35)` | Disabled controls only |

### Icons and emoji

- Icons: Fluent System Icons only (`<iconify-icon icon="fluent:...">`), with `aria-hidden="true"` when decorative.
- Markdown: `{{icon:yes}}`, `{{icon:no}}`, `{{icon:warning}}`, `{{icon:info}}` or `{{icon:<fluent-name>}}`.
- No emoji, pictographic symbols or emoji HTML entities anywhere.

### Svelte

- Svelte 5 runes (`$state`, `$derived`, `$props`).
- Theme: use `src/lib/stores/theme.js`; do not toggle classes yourself.
- Versions shown in the UI come from `src/lib/version.js`.
- No third-party CDN scripts, styles or fonts.

### Files

- Names: letters, digits, `.`, `_` and `-` only. No spaces, apostrophes, brackets or ellipses.
- Web images about 1600 px wide; keep print originals in `downloads/`.

### Content

- No health, medical or performance claims on product or brand pages unless approved for that product. Record open questions in the product's `definition.claimsReview`.
- Never publish regulatory submissions, formulas or other confidential documents in the repository.
- Demo data and screenshots must not contain real patient information.

---

## Checks

| Command | Checks |
| --- | --- |
| `npm run lint` | Emoji, emoji entities, mojibake, non-Fluent icons, unsafe file names, product page schema |
| `npm run build` | Icon names exist, site builds |
| `npm run test:smoke` | Build output, tokens, docs present |
| `npm run test:dom` | Page structure, including the seven product page sections |
| `npm run test:contrast` | Token pairings in both themes and every product pairing |
| `npm run test:a11y` | axe-core WCAG 2.2 A/AA on every page, light and dark (needs `npx playwright install chromium`) |

A pull request is merged only when all checks pass.

---

## Not allowed

- Hard-coded hex colours for text or buttons in components.
- Altered, recoloured or stretched logos.
- `#000000` for body paragraphs in light mode (use `--text-primary`).
- Committing `build/`, `node_modules/` or generated files.
- Force-pushing to `main`.

Questions: branding@suamisihat.com

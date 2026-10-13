# Suggesting a change

Designers, developers, marketers and clinical teams all share this hub. This page explains how to ask for a change, who approves it, and the rules every change must follow.

The first two parts are for everyone. The rest, from "For people who edit the site", is for the people who change the files.

---

## How to ask for a change

You do not need any technical access. Email **branding@suamisihat.com** and tell us:

- **What:** the page, document, logo or brand you want changed.
- **Why:** the business, clinical or customer need.
- **Your idea:** a sketch, screenshot or suggested wording helps.

The brand team replies within two working days.

---

## Who approves what

| What you want to change | How it is checked | Who approves |
| --- | --- | --- |
| Wording and documents | Read through | Editorial team |
| A new button, card or other screen part | Design review and an accessibility check | Lead UI/UX designer |
| A colour or text style | Colour balance and readability check | Brand director |
| A logo or trademark file | Brand board approval | Brand governance board |
| A product brand page | Product owner and brand director. The regulatory team checks any claims | Brand director |

---

## For people who edit the site

### Making the change

1. Create a branch from `main`, named `feat/...`, `fix/...` or `docs/...`.
2. Make your change, following the rules below.
3. Run the checks:

```bash
npm ci
npm run lint
npm run build
npm test
```

4. Open a pull request using the template. The same checks run automatically. After it is merged, the site updates at https://assets.suamisihat.myds.me/ by itself.

### Where each kind of change lives

| Change | Where |
| --- | --- |
| Documents | `static/content/*.md`, shown at `/doc/?doc=<name>` |
| Product brand pages | `static/products/<Brand>/metadata.json` (see [Product brand pages](/doc/?doc=product-page-standard)) |
| Colours and fonts as code | `static/assets/css/fluent.css` and `static/assets/tokens/*.json` |
| Buttons, cards and other parts | `src/lib/components/`, shown in `src/routes/components/` |
| Pages | `src/routes/<page>/+page.svelte` |
| Rules for contributors and AI agents | `.agents/AGENTS.md` |

Every file people can open or download lives under `static/`. Please do not keep copies anywhere else.

---

## Rules every change must follow

### Colour

- Use the named colour tokens, not raw hex codes, for text, buttons and links: `--text-*`, `--color-action-bg` / `--color-on-action`, `--color-cta-bg` / `--color-on-cta`, `--color-link`, `--color-text-accent`, `--color-text-warm`.
- Keep the 60:30:10 balance: one main action per screen.
- Never put white text on Azure `#21A1F7`, Malibu, Lion or Banana. It is hard to read.
- Do not lighten text with `opacity`.

### Text colours

| Token | Light | Dark | Use for |
| --- | --- | --- | --- |
| `--text-strong` | `#000000` | `#FFFFFF` | Headlines and key figures |
| `--text-primary` | `#19191A` | `#FCFAF6` | Body text, headings, forms |
| `--text-secondary` | `rgba(25,25,26,0.65)` | `rgba(252,250,246,0.65)` | Captions and small notes |
| `--text-disabled` | `rgba(25,25,26,0.35)` | `rgba(252,250,246,0.35)` | Switched-off controls only |

### Icons and emoji

- Use Fluent System Icons only (`<iconify-icon icon="fluent:...">`). Add `aria-hidden="true"` when an icon is only decoration.
- In documents, write `{{icon:yes}}`, `{{icon:no}}`, `{{icon:warning}}`, `{{icon:info}}` or `{{icon:<fluent-name>}}`.
- No emoji or picture symbols anywhere.

### Code style

- Svelte 5 style (`$state`, `$derived`, `$props`).
- Switch themes with `src/lib/stores/theme.js`. Do not change classes by hand.
- Version numbers shown on screen come from `src/lib/version.js`.
- No scripts, styles or fonts loaded from other websites.

### Files

- File names use letters, digits, `.`, `_` and `-` only. No spaces, apostrophes, brackets or ellipses.
- Web images should be about 1600 px wide. Keep print originals in `downloads/`.

### Content

- No health, medical or performance claims on product or brand pages unless approved for that product. Record open questions in the product's `definition.claimsReview`.
- Never publish regulatory submissions, formulas or other confidential papers in the repository.
- Sample data and screenshots must never contain real patient information.

---

## The automatic checks

| Command | What it checks |
| --- | --- |
| `npm run lint` | Emoji, garbled text, non-Fluent icons, unsafe file names, product page structure |
| `npm run build` | The site builds and every icon name exists |
| `npm run test:smoke` | Build output, colour tokens and documents are present |
| `npm run test:dom` | Page structure, including the seven sections on each product page |
| `npm run test:contrast` | Every text and background pair is easy to read, in both themes |
| `npm run test:a11y` | Accessibility check (WCAG 2.2 AA) on every page, light and dark. Needs `npx playwright install chromium` |

A change is merged only when every check passes.

---

## Not allowed

- Hard-coded hex colours for text or buttons in components.
- Changed, recoloured or stretched logos.
- `#000000` for body text in light mode. Use `--text-primary`.
- Committing `build/`, `node_modules/` or generated files.
- Force-pushing to `main`.

Questions: branding@suamisihat.com

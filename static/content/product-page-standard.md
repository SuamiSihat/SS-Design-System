# Product brand pages

*For product owners, designers and developers.*

Every SuamiSihat® product brand has one guide page at `/products/<name>/`. All pages follow the same seven sections, so designers, marketers and agencies find the same thing in the same place for every brand.

The seven sections are: what the product is, pictures, how the brand is positioned, colours, pattern, logo rules, and downloads. The table below says what each one must contain.

> [!IMPORTANT]
> This standard is enforced automatically. The check fails if a brand is missing a section, its colours are not split 60:30:10, a text and background pair is hard to read (below WCAG 2.2 AA), or a file it points to does not exist.

---

## The seven sections

| # | Section | What it must contain |
| --- | --- | --- |
| 1 | Product definition | A one-paragraph summary, at least three facts (category, entity, audience, format), the product range, and any claims that need regulatory review |
| 2 | Product images | At least one image with descriptive alt text. Brands without photography use a brand card and are marked "Photography pending" |
| 3 | Brand positioning | A positioning statement, three pillars, at least three voice traits and at least two things to avoid |
| 4 | Colour scheme | Foundation 60%, Structure 30%, Accent 10%, each with named hex colours, plus at least three text and background pairings that pass WCAG AA |
| 5 | Pattern | An SVG pattern file, a description and at least two usage rules |
| 6 | Brand guideline | Logo files, clear space, minimum size, at least three do and three don't rules, display and body typography |
| 7 | Assets to download | Every file people may download: logos, pattern, packaging and label artwork |

---

## Where the data lives

Each brand has one file: `static/products/<Brand>/metadata.json` with `"schema": 2`. The page template is `src/routes/products/[slug]/+page.svelte`; it contains no brand-specific content.

```text
static/products/Rejal/
  metadata.json        All seven sections
  pattern.svg          Brand pattern tile
  logos/               Logo files
  gallery/             Product images (web-sized)
  downloads/           Files offered for download
  sub-products/<name>/ gallery/, downloads/, logos/ for each product in the range
```

### Minimal example

```json
{
  "schema": 2,
  "slug": "rejal",
  "name": "REJAL",
  "folder": "Rejal",
  "status": "Active",
  "tagline": "Heritage superfoods from Malaysian forests, made for today's table",
  "entity": "05-SSE · SuamiSihat E-Commerce",
  "category": "Heritage functional food",
  "hero": { "from": "#1C1C1C", "to": "#3A2E14", "accent": "#C8A14A" },
  "definition": { "summary": "...", "facts": [], "range": [], "claimsReview": "..." },
  "images": [{ "src": "/products/Rejal/...jpeg", "alt": "...", "caption": "..." }],
  "positioning": { "statement": "...", "pillars": [], "voice": [], "avoid": [] },
  "colorScheme": {
    "foundation": { "share": 60, "role": "...", "colors": [{ "name": "Rejal Black", "hex": "#1C1C1C", "use": "..." }] },
    "structure": { "share": 30, "role": "...", "colors": [] },
    "accent": { "share": 10, "role": "...", "colors": [] },
    "pairings": [{ "text": "#FCFAF6", "background": "#1C1C1C", "use": "Body text on black" }],
    "note": "..."
  },
  "pattern": { "name": "...", "file": "/products/Rejal/pattern.svg", "description": "...", "usage": [] },
  "guideline": { "logos": [], "clearSpace": "...", "minimumSize": "...", "do": [], "dont": [], "typography": { "display": "...", "body": "..." } },
  "downloads": [{ "label": "...", "file": "/products/Rejal/...pdf", "format": "PDF" }]
}
```

---

## Rules for the content

### Colour

- Use upper-case `#RRGGBB` values.
- A pairing below 4.5:1 is only allowed with `"largeTextOnly": true`, and must still reach 3:1.
- If a brand colour fails as text on light backgrounds, add a darker "text" variant (for example REJAL Heritage Gold Deep `#7A5C1E`) instead of using the brand hex.

### Claims

Product pages are brand guidelines, not adverts. Do not publish health, medical or performance claims unless they are approved for that product's category (Food Regulations 1985, Medicines Advertisements Board, Medical Device Authority). Put anything that needs checking in `definition.claimsReview`; the page shows it as a warning.

### Images

- Web images go in `gallery/`, about 1600 px wide, JPEG quality 80 to 85. Keep large originals in `downloads/` only if people need them.
- File names: lower case, letters, digits and hyphens. No spaces, apostrophes, brackets or ellipses.
- Alt text describes what is in the picture.

### Icons

Fluent System Icons only. No emoji.

---

## Adding a new brand

1. Create `static/products/<Brand>/` with `logos/`, `gallery/` and `downloads/`.
2. Write `metadata.json` (copy an existing brand).
3. Add a `pattern.svg`.
4. Add the slug to the display order in `src/lib/products/index.js` and to `productSlugs` in `scripts/dom-test.mjs`.
5. Add the brand card to the catalogue in `src/routes/products/+page.svelte` with `href: '/products/<slug>/'`.
6. Run `npm run lint && npm run build && npm test`.

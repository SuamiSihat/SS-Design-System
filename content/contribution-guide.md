# Contribution Guide

The **SuamiSihat™ Design System** is a living ecosystem. It evolves continuously with clinical feedback, UI/UX innovations, and multi-platform app requirements. We welcome contributions from developers, designers, brand custodians, and medical stakeholders.

---

## How to Request a Change

Whether you've identified a bug, require a new UI component, or want to enhance copy or clinical guides, here is the standard workflow:

### Option 1 — Open an Issue or Email

For general proposals or questions:

- **Email**: [branding@suamisihat.com](mailto:branding@suamisihat.com)
- **Details to Include**:
  - **What**: Exact component, token, or documentation section.
  - **Why**: Clinical use case, user feedback, or platform requirement.
  - **Proposed Solution**: Mockup, code snippet, or suggested copy.

### Option 2 — Direct Pull Request

If you have repository access and wish to contribute code or documentation directly:

1. Create a feature branch: `git checkout -b feat/your-feature-name`
2. Implement your changes following our [Architecture and Coding Standards](#architecture-and-coding-standards).
3. Verify that the full automated test suite passes: `npm test`
4. Submit a Pull Request targeting `main`.

---

## Architecture and Coding Standards

### 1. The 60:30:10 Visual Allocation Standard

Every screen and component must adhere strictly to the 60:30:10 proportion:

- **60% Clinical Canvas**: Light surfaces (`#F8FAFC`, `#FFFFFF`) or dark void (`#090D16`, `#141414`).
- **30% Structural Trust**: Prussian Blue (`#022057`) and SS Blue (`#043388`) for headers, container cards, and navbars.
- **10% Conversion Accent**: Azure Blue (`#21A1F7`) and Banana Yellow (`#F7E143`) strictly for primary conversion CTAs.

### 2. 4-Tier Text Hierarchy Standards

Never use arbitrary hex values for text colors. Always use the 4 standard tokens:

- `--text-strong`: `#000000` (Light) / `#FFFFFF` (Dark) — Critical headlines and key figures.
- `--text-primary`: `#19191A` (Carbon Black) / `#FCFAF6` (Porcelain) — Body text, standard headings, and forms.
- `--text-secondary`: `rgba(25, 25, 26, 0.65)` / `rgba(252, 250, 246, 0.65)` — Metadata, subtitles, and captions.
- `--text-disabled`: `rgba(25, 25, 26, 0.35)` / `rgba(252, 250, 246, 0.35)` — Inactive and disabled states.

### 3. SvelteKit and Svelte 5 Conventions

- All living components use **Svelte 5 Runes** (`$state`, `$derived`, `$props`).
- Styles must prioritize CSS Custom Properties defined in `assets/css/fluent.css` and `assets/tokens/tokens.json`.
- When designing responsive layouts with sidebars, ensure the container uses CSS Grid with `minmax(0, 1fr)` and conditionally mounts sidebar content to prevent column squishing on collapse.

---

## Where to Make Changes

| Contribution Type | Target Directory or File | Process |
| :--- | :--- | :--- |
| **Markdown Documentation** | `static/content/*.md` & `static/content/sub-brands/*.md` | Edit markdown directly; rendered dynamically via `/doc/?doc=[id]` |
| **Product Brand Hubs** | `src/routes/products/[slug]/` & `src/routes/products/[slug]/+page.js` | Update product data map or brand narrative markdown |
| **Design Tokens** | `assets/tokens/tokens.json` & `assets/css/fluent.css` | Update W3C tokens; requires brand team sign-off |
| **UI Components** | `src/lib/components/` & `src/routes/components/` | Add Svelte components; include interactive playground swatch |
| **Global Brand Rules** | `.agents/AGENTS.md` | Single canonical rule file for AI agents and developer workflows |

---

## Testing and Validation Requirements

Before submitting any code changes, you **must** run the local test suite:

```bash
# 1. Build and verify static generation
npm run build

# 2. Run automated validation suite (Smoke + DOM Tests)
npm test
```

A Pull Request will only be merged if **all 118 automated test assertions** pass with 100% success:

- **Smoke Tests**: 29/29 assertions (bundle validation, token integrity, SSG file existence).
- **DOM Tests**: 89/89 assertions (semantic HTML, contrast rules, unique IDs, navigation anchors).

---

## Prohibited Practices

- **Do not** introduce hardcoded `#hex` colors in component templates; always use design tokens.
- **Do not** modify or distort official vector SVG brand logos.
- **Do not** use plain black (`#000000`) for standard body paragraphs in light mode (use `--text-primary` `#19191A`).
- **Do not** bypass `ThemeManager` with inline theme toggles.
- **Do not** commit unminified bundle artifacts without running `npm run build`.

---

*Questions or governance inquiries? Reach out to [branding@suamisihat.com](mailto:branding@suamisihat.com).*

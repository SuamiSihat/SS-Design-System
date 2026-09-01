# Design System Contribution & Governance Guide

The **SuamiSihat™ Design System** is an evolving ecosystem asset. We welcome contributions, bug reports, and enhancement proposals from designers, software engineers, clinical practitioners, and operational teams.

---

## How to Propose Changes

### 1. Brand Review Submission (Fast Track)
For new component requests, asset updates, or copy refinements, email the brand governance team at **[branding@suamisihat.com](mailto:branding@suamisihat.com)** including:
- **Scope of Change:** Specify the affected component, route, or documentation section.
- **Business or Clinical Rationale:** Detail the use case, clinical requirement, or user feedback.
- **Proposed Solution:** Provide mockups, screenshots, or suggested wording.

*The Brand Governance team reviews all submissions within 24–48 business hours.*

### 2. Direct Documentation Contributions
Approved contributors with repository access may propose editorial and documentation changes directly within the `/content/` directory:

```text
content/
├── vision-mission.md        # Corporate vision, mission, and design principles
├── introduction.md          # System scope and stakeholder guide
├── brand-voice.md           # Editorial standards and approved terminology
├── roadmap.md               # Strategic release milestones
├── changelog.md             # Authoritative release history
└── sub-brands/              # Entity and subsidiary brand kits
```

> **Governance Note:** Markdown edits update the dynamic documentation engine. Visual token modifications, component changes, and logo updates must pass the official Brand Governance review.

---

## Contribution & Approval Matrix

| Contribution Type | Review Pathway | Gatekeeper |
|---|---|---|
| **Editorial & Copy Updates** | Direct documentation PR or email review | Editorial Team |
| **New UI Component Proposals** | Design review + accessibility audit (WCAG AA) | Lead UI/UX Architect |
| **Color & Token Adjustments** | 60:30:10 verification & token pipeline update | Brand Director |
| **Logo & Trademark Assets** | Executive brand board approval required | Brand Governance Board |

---

## Brand Integrity Guardrails

To protect SuamiSihat™ brand equity:
- **Never alter official logos:** Do not rotate, recolor, add drop shadows, or distort vector logomarks.
- **Preserve typography discipline:** Strictly maintain Neutral Black (`#1C1C1C`) for body text and headers.
- **Enforce the 60:30:10 rule:** Avoid multiple competing high-intensity accent buttons on a single view.
- **Respect patient confidentiality:** Ensure demo assets, screenshots, and test data use simulated, non-identifiable information.

---

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

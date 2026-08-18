# Changelog

> **SuamiSihat™ Design System** is the **master project, master documentation, and master guideline** for the entire SS ecosystem — web, Expo/React Native mobile apps, and all internal tools. This changelog is the authoritative record of every change. All platforms derive from this system.

---

## v3.3 — August 2026

**QA Audit & Production Hardening**

Full independent QA audit conducted across all 14 audit domains. Two P2 defects identified and remediated before release declaration.

### Bug Fixes

- **INL-01 (P2)**: Removed an inline `classList.toggle('dark-mode')` event listener from `pages/components.html` (line 1212) that was duplicating and partially overriding `ThemeManager`. The inline handler bypassed logo variant swaps, `localStorage` persistence, `aria-pressed` state, and `FluentThemeSync.syncAllButtons()`. `ThemeManager` in `main.js` is now the sole theme handler on every page, as required by AGENTS.md.

- **CSS-VER-01 (P2)**: Updated CSS cache-buster query string from `?v=8` to `?v=9` in all four product sub-pages (`products/Androlab`, `products/MENSS`, `products/Mensculine`, `products/Rejal`). These pages were inadvertently left on the previous version during the v3.1 release, causing browsers to serve stale stylesheet builds on those routes.

- **FOOTER-LOGO-01**: Fixed `--footer-background` token override in `style.css` which was overriding light mode `#6DC6EC` with dark navy `#022057`. Updated all footer logo images to default to `logo_suamisihat_primary_light.svg` on light backgrounds as per AGENTS.md Rule 2.

### Feature Additions & Documentation Updates

- **Interactive Roadmap Page**: Added `content/roadmap.md` and integrated interactive Mermaid milestone diagrams in `doc.html?doc=roadmap` and navbar dropdown links across all pages.
- **SSCAM WPF Windows App Integration**: Updated `pages/tools.html` with official WPF Windows app screenshots from `github.com/SuamiSihat/ss_cam`, added GitHub repository release and source code links.
- **Logo Preview Scaling**: Increased logo preview sizes in `pages/brand-system.html` (variant cards 56px → 96px, color picker display 64px → 110px, background preview 80px → 160px) for improved visual clarity.
- **Trademark Standardization**: Standardized all text occurrences of "SuamiSihat" to trademark "SuamiSihat™" across all HTML files and documentation.

### QA Documentation

- 14 QA audit reports added to `/QA/` directory covering: Reconnaissance, Functional, Brand Assets, Design System, UI/UX, Accessibility, Responsive, Content, Navigation, Performance, Security, Deployment, Duplication, Fix Log.
- `QA/FINAL-QA-REPORT.md` — formal **RELEASE READY** declaration.
- `readme.md` — updated with QA status table and Roadmap section.

---

## v3.1 — August 2026

**Multi-Platform Token System + Expo React Native Foundation**

Establishes the design token infrastructure and Expo/React Native integration layer. This version makes the design system the official single source of truth for all SuamiSihat™ platforms.

### New: Token System

- **`assets/tokens/design-tokens.json`** — Master W3C Design Token format file covering:
  - Full SS brand colour palette (8 brand colours)
  - Fluent 2 neutral ramp (11 stops)
  - Semantic tokens for light and dark mode (fg, bg, stroke, brand, focus)
  - Status tokens (success / warning / error / info)
  - Spacing scale (4px grid, 12 sizes + 44px touch minimum)
  - Border radius scale (none → full, 8 values)
  - Typography scale (8 levels: Display → Label, with size/weight/tracking/lineHeight)
  - Icon sizes (xs → 2xl, Fluent UI System Icons spec)
  - Motion tokens (6 durations, 4 easing curves with Expo Easing mappings)
  - Z-index scale (sticky → tooltip, 6 layers)
  - Breakpoints (5 breakpoints, web + Expo Dimensions API)

- **`assets/tokens/ss_tokens.ts`** — Expo/React Native TypeScript token file:
  - `SSColors` — all semantic colours (light + dark)
  - `SSColorsDark` — dark mode overrides
  - `useSSColors(colorScheme)` — helper hook for dynamic theming
  - `SSSpacing` — 4px grid constants
  - `SSRadius` — border radius constants
  - `SSFont` — Inter font family refs + 8-level type scale
  - `SSIcon` — icon size constants
  - `SSShadow` — Platform.select iOS/Android shadow presets (6 levels)
  - `SSMotion` — duration constants + Easing presets + spring config
  - `SSBase` — StyleSheet presets: buttons (4 variants + sm/lg/disabled), cards, inputs, badges, avatars, divider, progress, screen container

### New: Component Library Page

- **`pages/components.html`** — Live interactive component showcase (656 lines, 62 KB):
  - 7 foundation sections: Color, Typography, Spacing, Elevation, Radius, Motion, Icons
  - 8 component sections: Buttons, Badges & Chips, Inputs & Forms, Cards, Alerts, Avatars, Progress & Skeleton, Tabs
  - 2 platform sections: Token JSON export, Flutter/Expo code snippets
  - Click-to-copy for icons and code blocks
  - Sticky sidebar with IntersectionObserver active link tracking
  - Full dark mode support
- **`index.html`** — Component Library portal card added (card 8)

### Platform: Expo / React Native

- **Mobile platform**: Confirmed as **Expo** (managed workflow)
- **Icon library**: **`@fluentui/react-native-icons`** — same icon vocabulary as web Iconify Fluent set (`home-24-regular` → `Home24Regular`)
- **Font**: **`@expo-google-fonts/inter`** — matches web Inter typeface
- **Token naming**: Mirrors CSS variable names for cross-platform consistency

### Architecture

- Design system elevated to **master project status** — authoritative source for all SS platforms
- Changelog is now the canonical record of all system changes
- Contribution workflow: edit `design-tokens.json` → update `ss_tokens.ts` → update `fluent.css` → update components page → record in changelog

---

## v3.0 — August 2026

**Fluent 2 Design System Overhaul**

A complete visual and architectural rebirth of the SuamiSihat™ Design System, built on Microsoft's Fluent 2 design language — adapted to the SuamiSihat™ brand palette.

### Design Foundation

- **`fluent.css`** — New source-of-truth token file with three tiers:
  - **Tier 1** — Global raw tokens: SS brand palette, Fluent neutral ramp (16 stops), spacing (4px grid), radius, shadows, motion curves, stroke widths
  - **Tier 2** — Semantic tokens for light and dark mode: backgrounds, strokes, foreground, brand, status, gradients
  - **Tier 3** — Global reset, focus ring, scrollbar, skeleton shimmer, fade-up/fade-in animations, stagger delay helpers
- **`ss_theme.css`** — Bridge layer that re-aliases all legacy variables (`--primary-color`, `--card-background`, etc.) to Fluent semantic tokens, ensuring all existing sub-pages receive Fluent colours without markup changes

### New Pages

| Page | Description |
|---|---|
| `pages/signature.html` | Live Mail Signature Generator — preview + copy HTML for all entities |
| `pages/tools.html` | SS CAM Download Hub + SSNAS Dashboard launchpad |
| `pages/onboarding.html` | Interactive Staff Onboarding Guide with localStorage-persistent checklist |

### CSS Upgrades

- **`style.css`** — Fluent 2 override layer appended: legacy vars aliased, glassmorphic navbar (acrylic blur), card shadows tokenised, dropdown/footer/badge all Fluent-aware
- **`markdown.css`** — Fluent 2 prose layer: Inter font, tokenised headings/links/code blocks/tables, brand gradient table headers, TOC active-pill transition
- **`onboarding.css`** — New companion stylesheet for onboarding checklist components

### JavaScript Upgrades (`main.js`)

- `FluentNavManager` — Scroll shadow + active-link detection on Fluent navbars
- `FluentThemeSync` — Patches `ThemeManager` to keep all theme buttons in sync across all page types
- Portal card click ripple animation
- Scroll-reveal: `f-animate-up`/`f-animate-in` elements play on viewport entry

### Infrastructure

- **CSS load order** fixed site-wide: `fluent.css → ss_theme.css → style.css → markdown.css`
- **`fluent.css`** injected into all legacy pages that were missing it
- **Cache busting** bumped to `?v=4` across all 12 HTML files
- **Navigation** — Onboarding + Mail Signature links added to all page navbars
- Version badge updated to `v3.0` site-wide

### New Files

```
assets/css/
├── fluent.css          ← NEW: Fluent 2 token foundation
└── onboarding.css      ← NEW: onboarding component styles

pages/
├── signature.html      ← NEW
├── tools.html          ← NEW
└── onboarding.html     ← NEW
```

---

## v2.1 — June 2026

**Hub Upgrade & Markdown Integration**

This release transforms the design system homepage into the core hub of the SuamiSihat™ design ecosystem, and introduces dynamic markdown-powered documentation.

### What Changed

- **New Hero** — Stronger headline, clearer positioning, and CTA buttons for a better first impression
- **Vision & Mission** — Added as a first-class section in the About page, and as a standalone doc (`/pages/doc.html?doc=vision-mission`)
- **Docs Section** — Introduced the `/pages/doc.html` shell and `/content/` markdown directory for editable documentation without touching HTML
- **Navbar** — Added version badge (`v2.1`) and Docs dropdown with links to changelog, contribution guide, and Vision & Mission
- **Footer** — Upgraded from a single copyright line to a full 3-column layout with Quick Links, Docs, and Contact
- **Copywriting** — Refined across all sections to a professional-casual tone; removed redundant welcome text, added punchy section intros
- **Section titles** — Fixed stray backtick in download section; updated "Introduction" to "About This System"

### New Files

```
content/
├── vision-mission.md
├── introduction.md
├── changelog.md          ← you are here
├── contribution-guide.md
└── sub-brands/
    ├── ss-health.md
    ├── ss-clinic.md
    ├── ss-wellness.md
    ├── ss-ecom.md
    └── ss-tech.md

pages/
└── doc.html              ← generic markdown shell

assets/
├── css/markdown.css      ← prose styles for rendered markdown
└── js/markdown-loader.js ← fetch + render .md via marked.js
```

---

## v2.0 — Early 2026

**Interactive Design System**

- Introduced glassmorphism navbar with ScrollSpy
- Added interactive logo preview with colour background switcher
- Added sub-brand card gallery with Toggle Bg feature
- Introduced full dark mode with system preference detection
- Added scroll-based staggered animations via `IntersectionObserver`
- Added click-to-copy HEX values on colour cards

---

## v1.0 — 2025

**Initial Release**

- SS Health brand guidelines in web format
- Logo, colour, typography, and download sections
- Basic Bootstrap 5 layout
- Light/dark mode toggle

---

*To request a change or report an issue, see the [Contribution Guide](doc.html?doc=contribution-guide) or email [branding@suamisihat.com](mailto:branding@suamisihat.com).*


# Changelog

> **SuamiSihat™ Design System** is the **master project, master documentation, and master guideline** for the entire SS ecosystem — web, Expo/React Native mobile apps, and all internal tools. This changelog is the authoritative record of every change. All platforms derive from this system.

## v3.6.0 — August 2026

### Medium.com Editorial Documentation Suite, 3-Column Layout & Outline TOC

Major documentation engine upgrade transforming the documentation viewer into a modern 3-column architecture featuring a Medium.com editorial aesthetic, sticky Right Pane Outline TOC, live scroll position tracking, and full-width center column alignment.

### New Features & Improvements in v3.6.0

- **3-Column Documentation Architecture (`/doc/`)**:
  - Implemented 3-column layout grid (`Left Navigation Sidebar (260px) | Full-Width Center Article (Flex) | Sticky Right Outline TOC Pane (250px)`).
  - Created dedicated sticky Right Pane Outline (`.f-toc-right-pane`) with scroll position tracking (`activeHeadingId`) that automatically highlights the current section as the user reads down the page.
  - Smooth 1-click offset navigation when clicking any outline heading item.

- **Medium.com Editorial Aesthetic & Meta Header Bar**:
  - Added Medium-style Article Metadata Header Bar (`.medium-article-meta`) featuring the official SuamiSihat logomark badge, `SuamiSihat™ Art Direction` publisher name, `Official Standard` pill, dynamic word count read time (e.g. `4 min read`), date (`August 2026`), and system version.
  - Implemented 1-click **Share** button that copies the direct article URL with live toast confirmation (`Copied Link!`).
  - Upgraded prose typography to Medium publication standards: 800-weight editorial headlines (`font-size: clamp(2.2rem, 4vw, 3.15rem)`), Georgia/serif pull quotes with left brand accent bar (`blockquote:not(.callout-card)`), and generous 1.8 line height.

- **Pixel-Perfect 100% Full-Width Alignment**:
  - Wrapped breadcrumb, Medium metadata bar, title, callout alert cards, code copy toolbars, responsive tables, and prose paragraphs in a unified `.doc-article-container`.
  - Expanded center column to 100% full width (`max-width: 100%`) for maximum reading legibility and content space between sidebars.

- **Clean Navigation Sidebar**:
  - Focused the documentation sidebar strictly on Core Documentation standards, removing legacy operating subsidiary items.

---

## v3.5.1 — August 2026

### Brand × Fluent 2 Architectural Contract, Dedicated System Documentation & Prompt Hardening

Architectural refinement and source-of-truth standardization introducing the formal **Brand × Fluent 2 Integration Contract**, structured 3-tier Information Architecture (`01. Foundation`, `02. Brand`, `03. Design System`), and prompt optimization rules to eliminate prompt dilution and brand drift across all platforms and AI workflows.

### New Features & Improvements in v3.5.1

- **Brand × Fluent 2 Architectural Integration Contract (`/content/brand-fluent2.md`)**:
  - Established the foundational axiom: *"Fluent 2 provides the interaction system and structural logic. SuamiSihat provides the soul, visual identity, and clinical authority."*
  - Formulated the authoritative **Boundary & Decision Matrix** explicitly demarcating SuamiSihat brand ownership (Personality, Logos, Colors, Typography, Packshots, Voice) vs. Fluent 2 interaction ownership (Component Anatomy, State Machines, WCAG 2.2 AA Accessibility, Motion Curves, 8px Spatial Grid).
  - Defined the 4-tier System Precedence: SuamiSihat Brand DNA > SuamiSihat Design Tokens > Fluent 2 Component Anatomy > Page Content.
  - Added dedicated documentation page to the interactive documentation suite at `/doc/?doc=brand-fluent2`.
  - Added Section `00 · Architectural Contract` (`#brand-fluent2`) and sidebar navigation directly to the Brand System portal (`/brand-system/#brand-fluent2`).

- **Colour Composition Standard (`/content/color-composition-guide.md`)**:
  - Published authoritative guideline **"Colour Composition: Why SuamiSihat Should Standardise on 60:30:10"**.
  - Established **60:30:10 as the primary colour-composition rule** for brand communications, campaigns, marketing, packaging, and editorial layouts.
  - Retained **80:20 as a secondary composition model** for dense UI, health dashboards, and minimal functional interfaces.
  - Mapped SuamiSihat brand semantics to composition roles (60% Canvas/Void Foundation, 30% SS Prussian/SS Blue Structure, 10% Azure/Banana/Lion Accents).
  - Integrated full decision matrix, quadrant chart, failure mode prevention, and art direction frameworks.
  - Registered in documentation navigation (`/doc/?doc=color-composition-guide`) and global Spotlight search (`Ctrl+K`).

- **Agent Rules & Prompt Hardening (`.agents/AGENTS.md`)**:
  - Added **Rule 7 (Brand × Fluent 2 Integration Contract)** to the design system agent instructions.
  - Added **Rule 8 (Mandatory Source of Truth Block)** providing a standardized, concise prompt snippet for future landing pages, product hubs, and campaign funnels to eliminate prompt dilution and prevent brand drift.

- **Information Architecture (IA) Alignment (`assets.suamisihat.myds.me`)**:
  - Structured the system into three logical tiers: `01. Foundation` (Principles, Contract, Colors, Typography, Spacing, Elevation, Motion, Accessibility), `02. Brand` (Positioning, Architecture, Logos, Guidelines, Art Direction), and `03. Design System` (Tokens, Components, Patterns, Templates).

- **Global Navigation & Search Upgrades (`Navbar.svelte`)**:
  - Added `Brand × Fluent 2` to the Docs navigation dropdown menu and the Command Palette (`Ctrl+K`) search index.
  - Updated system version references to `v3.5.1` across the ecosystem.

---

## v3.5 — August 2026

### SvelteKit 2 and Svelte 5 Migration, Living Component Hub and Art Direction Restoration

Major architectural and art direction release migrating the design system to SvelteKit 2 and Svelte 5, while restoring full parity with the master design system specification across all product catalogues, documentation engines, and navigation components.

### New Features and Restorations in v3.5

- **Default Hero Component Standard (`ss-hero`)**:
  - Standardized `.ss-hero` and `<SSHero />` as the official default background and container component for all hero banners, landing headers, and product master headers across SuamiSihat™.
  - Embedded the interactive 2D kinetic vitality wave canvas (`#heroWaveCanvas` / `.hero-wave-canvas`) featuring floating Mars `♂` symbols, radiant Azure (`#21A1F7`) and Gold (`#F7E143`) energy nodes, and ambient pulsing glow (`.ss-hero-ambient-glow`).
  - Added full multi-framework integration guides (SvelteKit, Vanilla HTML/CSS, Expo React Native, Flutter) to the Component Library (`/components/#ss-hero`) and Brand System (`/brand-system/#patterns`).
  - Added Agent Rule 6 (`ss-hero` Hero Standard) enforcing the 60% brand vertical gradient, 30% ambient glow bloom, and 10% kinetic vitality wave canvas.

- **Product Catalogue Full Restoration (`/products/`)**:
  - Restored full 14-product portfolio across 3 authoritative sections: **SS Products & Global Lines** (8 lines including archived MFX & Xprimal), **Partner Brands** (4 partner networks), and **Bioactives, Ingredients & Science Partners** (2 assets).
  - Restored 4-group sidebar navigation: All Products (IntersectionObserver scroll-spy), Brand Hubs (direct sub-product links), By Category filter buttons, and Site Navigation.
  - Enriched product cards with comprehensive clinical formulations, NPRA registration numbers, corporate entity tags (`01-SSH · 02-SSC · 05-SSE`), and custom `--card-accent` gradients.
  - Standardized high-contrast white logo tile containers across light and dark modes for 100% brand mark legibility.

- **Dynamic Sub-Product Brand Hubs (`/products/[slug]/`)**:
  - Implemented parameterized `[slug]` routing with SSR data loader (`+page.js`) supporting 8 initial brand hubs (ANDROLAB, MENSS, Mensculine, Dr Mit Ring®, REJAL, PERTABI, Husband Clinic, Isteri Sihat).
  - Designed full-width master hero banners with brand gradient palettes, white logo showcase tiles, and direct action CTAs.
  - Integrated sticky 5-section sub-navigation, portfolio sidebar switcher, and dynamic markdown narrative loader (`/content/products/[slug].md`).
  - Added structured sub-product SKU cards with category tags and direct vector asset download capabilities.

- **Authoritative Markdown & Diagram Engine (`/doc/`)**:
  - Integrated global `marked@9.1.6` for full CommonMark and GitHub Flavored Markdown (GFM) tables, code fences, and blockquotes.
  - Embedded `mermaid@10` for dynamic architecture and roadmap flowchart rendering.
  - Built real-time dynamic Table of Contents (TOC) sidebar auto-generated from rendered `<h2>` and `<h3>` headings with smooth scrolling.
  - Added animated skeleton loading states and 3-level breadcrumb navigation.

- **Global Navigation & Dropdown System (`Navbar.svelte`)**:
  - Upgraded desktop navbar with interactive 7-item "Docs" dropdown menu with Fluent icons and dark mode acrylic styling.
  - Standardized brand title to `SS Design System v3.5` matching layout rhythm.
  - Added click-outside and Escape key dismissal handling.

- **Multi-Format Color Space Specification Standard**:
  - Defined certified mathematical conversion values across all 15 official brand, secondary, and semantic tokens for **HEX, RGB, CMYK, CIE-Lab, BAL / RAL Standards, and Pantone (PMS)**.
  - Built interactive, copy-ready Master Color Specification Matrix Table and dynamic swatches in `/brand-system/` and `/components/`.

- **4-Tier Text Color Hierarchy & Surface Pairing Standard**:
  - Codified the definitive 4-level text hierarchy across light and dark modes: `--text-strong` (`#000000` / `#FFFFFF`), `--text-primary` (`#19191A` Carbon Black / `#FCFAF6` Porcelain), `--text-secondary` (`rgba(..., 0.65)`), and `--text-disabled` (`rgba(..., 0.35)`).
  - Defined official surface tokens: `--surface-canvas` (`#FCFAF6` / `#1C1C1C`) and `--surface-elevated` (`#FFFFFF` / `#000000`).
  - Authored dedicated **Text Color Usage Guide** (`/content/text-color-guide.md`) and added to the interactive documentation suite (`/doc/?doc=text-color-guide`).
  - Enforced art direction rule: *"Black and white create emphasis. Carbon Black and Porcelain create readability."*

- **Sidebar Collapse Layout Resilience**:
  - Overhauled `.f-page-layout` CSS Grid architecture using `minmax(0, 1fr)` column definitions and Svelte `{#if !isSidebarMinimized}` unmount semantics.
  - Eliminated conflicting vanilla event listeners from `main.js`, resolving grid column squishing on sidebar collapse across all pages.

- **Standalone Logomark Surface Contrast Hardening**:
  - Enforced mandatory high-contrast logomark pairing: Dark Prussian Blue surfaces (`#022057`) strictly render `ss-logomark-dark.svg` (white arc), while Light Porcelain surfaces (`#FCFAF6`) render `ss-logomark-light.svg` (navy arc).
  - Updated live Interactive Logomark Surface Contrast Tester in `/brand-system/` with real-time contrast ratios (16.2:1 and 15.8:1).

- **Deprecation Clean-Up & Zero-Orphan Static Pipeline**:
  - Removed deprecated `pages/` directory and obsolete static product HTMLs, routing all traffic to SvelteKit SSG.
  - Enhanced `scripts/sync-build.mjs` with automatic directory purge to prevent accumulation of orphaned hash chunks.
  - Modernized `nginx.conf` and `.htaccess` for clean, extensionless SSG routing and robust 404 handling.

- **118-Point Automated QA Test Suite**:
  - Shipped automated 29-assertion Smoke Test Suite (`smoke-test.mjs`) and 89-assertion DOM Validation Suite (`dom-test.mjs`) executed via `npm test`.

---

## v3.4 — August 2026

### AI Agent Skill Systems, Client Representation Standards and Ecosystem Governance

Major release introducing production-grade AI Agent Skill systems, formal client representation standards, healthcare YMYL E-E-A-T copywriting frameworks, and performance asset optimizations.

### New Features and Agent Systems in v3.4

- **SuamiSihat™ AI Brand Director (`suamisihat-brand-director`)**:
  - Full modular brand governance and art direction system featuring 30 specialist sub-skills across Foundation, Visual Identity, Design System, Communication, Compliance, AI Production, and Intelligence.
  - Formal 100-point Brand Audit scorecard and Release Gate pipeline (`PASS`, `PASS WITH MINOR CHANGES`, `REVISE`, `REJECT`).
  - Strict 5-tier correction hierarchy: `REMOVE` → `REBALANCE` → `REFINE` → `REPLACE` → `REDESIGN`.

- **SuamiSihat™ Copywriting & SEO Optimization Agent (`suamisihat-copy-seo`)**:
  - Comprehensive clinical narrative and search optimization system with 20 specialist sub-skills.
  - Google Healthcare YMYL & E-E-A-T compliance with doctor author bylines and verified citations.
  - Structured JSON-LD schema generators (`MedicalClinic`, `MedicalWebPage`, `Physician`, `FAQPage`).
  - Bilingual Malaysian localization guidelines (authentic English & Bahasa Malaysia code-switching).
  - Ministry of Health (MOH) Malaysia & NPRA advertising compliance screening.

- **Client Representation & 60:30:10 Standards Module**:
  - Added Section 08 to `pages/brand-system.html` with direct sidebar navigation.
  - Formalizes rules for how staff and developers represent SuamiSihat™ to patients and clients across teleconsultation funnels, clinics, and packaging.

### Optimizations and Fixes in v3.4

- **Script Deduplication**: Standardized on modern deferred `iconify-icon/2.1.0` loader across `index.html` and `pages/brand-system.html`, removing redundant bundle overhead.
- **Brand Casing Hardening**: Fixed footer casing in `pages/brand-system.html` from `Suamisihat` to mandatory `SuamiSihat™`.
- **Token Synchronization**: Synchronized master token specifications in `design-tokens.json` to version 3.4.0.

---

## v3.3 — August 2026

### QA Audit and Production Hardening

Full independent QA audit conducted across all 14 audit domains. Two P2 defects identified and remediated before release declaration.

### Bug Fixes in v3.3

- **INL-01 (P2)**: Removed an inline `classList.toggle('dark-mode')` event listener from `pages/components.html` (line 1212) that was duplicating and partially overriding `ThemeManager`. The inline handler bypassed logo variant swaps, `localStorage` persistence, `aria-pressed` state, and `FluentThemeSync.syncAllButtons()`. `ThemeManager` in `main.js` is now the sole theme handler on every page, as required by AGENTS.md.
- **CSS-VER-01 (P2)**: Updated CSS cache-buster query string from `?v=8` to `?v=9` in all four product sub-pages (`products/Androlab`, `products/MENSS`, `products/Mensculine`, `products/Rejal`). These pages were inadvertently left on the previous version during the v3.1 release, causing browsers to serve stale stylesheet builds on those routes.
- **FOOTER-LOGO-01**: Fixed `--footer-background` token override in `style.css` which was overriding light mode `#6DC6EC` with dark navy `#022057`. Updated all footer logo images to default to `logo_suamisihat_primary_light.svg` on light backgrounds as per AGENTS.md Rule 2.

### Feature Additions and Documentation Updates in v3.3

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

### Multi-Platform Token System and Expo React Native Foundation

Establishes the design token infrastructure and Expo/React Native integration layer. This version makes the design system the official single source of truth for all SuamiSihat™ platforms.

### Token System in v3.1

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

### Component Library in v3.1

- **`pages/components.html`** — Live interactive component showcase (656 lines, 62 KB):
  - 7 foundation sections: Color, Typography, Spacing, Elevation, Radius, Motion, Icons
  - 8 component sections: Buttons, Badges & Chips, Inputs & Forms, Cards, Alerts, Avatars, Progress & Skeleton, Tabs
  - 2 platform sections: Token JSON export, Flutter/Expo code snippets
  - Click-to-copy for icons and code blocks
  - Sticky sidebar with IntersectionObserver active link tracking
  - Full dark mode support
- **`index.html`** — Component Library portal card added (card 8)

### Platform Integration for Expo and React Native

- **Mobile platform**: Confirmed as **Expo** (managed workflow)
- **Icon library**: **`@fluentui/react-native-icons`** — same icon vocabulary as web Iconify Fluent set (`home-24-regular` → `Home24Regular`)
- **Font**: **`@expo-google-fonts/inter`** — matches web Inter typeface
- **Token naming**: Mirrors CSS variable names for cross-platform consistency

### Architecture Updates in v3.1

- Design system elevated to **master project status** — authoritative source for all SS platforms
- Changelog is now the canonical record of all system changes
- Contribution workflow: edit `design-tokens.json` → update `ss_tokens.ts` → update `fluent.css` → update components page → record in changelog

---

## v3.0 — August 2026

### Fluent 2 Design System Overhaul

A complete visual and architectural rebirth of the SuamiSihat™ Design System, built on Microsoft's Fluent 2 design language — adapted to the SuamiSihat™ brand palette.

### Design Foundation in v3.0

- **`fluent.css`** — New source-of-truth token file with three tiers:
  - **Tier 1** — Global raw tokens: SS brand palette, Fluent neutral ramp (16 stops), spacing (4px grid), radius, shadows, motion curves, stroke widths
  - **Tier 2** — Semantic tokens for light and dark mode: backgrounds, strokes, foreground, brand, status, gradients
  - **Tier 3** — Global reset, focus ring, scrollbar, skeleton shimmer, fade-up/fade-in animations, stagger delay helpers
- **`ss_theme.css`** — Bridge layer that re-aliases all legacy variables (`--primary-color`, `--card-background`, etc.) to Fluent semantic tokens, ensuring all existing sub-pages receive Fluent colours without markup changes

### New Pages in v3.0

| Page | Description |
| :--- | :--- |
| `pages/signature.html` | Live Mail Signature Generator — preview + copy HTML for all entities |
| `pages/tools.html` | SS CAM Download Hub + SSNAS Dashboard launchpad |
| `pages/onboarding.html` | Interactive Staff Onboarding Guide with localStorage-persistent checklist |

### CSS Upgrades in v3.0

- **`style.css`** — Fluent 2 override layer appended: legacy vars aliased, glassmorphic navbar (acrylic blur), card shadows tokenised, dropdown/footer/badge all Fluent-aware
- **`markdown.css`** — Fluent 2 prose layer: Inter font, tokenised headings/links/code blocks/tables, brand gradient table headers, TOC active-pill transition
- **`onboarding.css`** — New companion stylesheet for onboarding checklist components

### JavaScript Upgrades in v3.0

- `FluentNavManager` — Scroll shadow + active-link detection on Fluent navbars
- `FluentThemeSync` — Patches `ThemeManager` to keep all theme buttons in sync across all page types
- Portal card click ripple animation
- Scroll-reveal: `f-animate-up`/`f-animate-in` elements play on viewport entry

### Infrastructure in v3.0

- **CSS load order** fixed site-wide: `fluent.css → ss_theme.css → style.css → markdown.css`
- **`fluent.css`** injected into all legacy pages that were missing it
- **Cache busting** bumped to `?v=4` across all 12 HTML files
- **Navigation** — Onboarding + Mail Signature links added to all page navbars
- Version badge updated to `v3.0` site-wide

### New Files in v3.0

```text
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

### Hub Upgrade and Markdown Integration

This release transforms the design system homepage into the core hub of the SuamiSihat™ design ecosystem, and introduces dynamic markdown-powered documentation.

### Changes in v2.1

- **New Hero** — Stronger headline, clearer positioning, and CTA buttons for a better first impression
- **Vision & Mission** — Added as a first-class section in the About page, and as a standalone doc (`/pages/doc.html?doc=vision-mission`)
- **Docs Section** — Introduced the `/pages/doc.html` shell and `/content/` markdown directory for editable documentation without touching HTML
- **Navbar** — Added version badge (`v2.1`) and Docs dropdown with links to changelog, contribution guide, and Vision & Mission
- **Footer** — Upgraded from a single copyright line to a full 3-column layout with Quick Links, Docs, and Contact
- **Copywriting** — Refined across all sections to a professional-casual tone; removed redundant welcome text, added punchy section intros
- **Section titles** — Fixed stray backtick in download section; updated "Introduction" to "About This System"

### New Files in v2.1

```text
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

### Interactive Design System

- Introduced glassmorphism navbar with ScrollSpy
- Added interactive logo preview with colour background switcher
- Added sub-brand card gallery with Toggle Bg feature
- Introduced full dark mode with system preference detection
- Added scroll-based staggered animations via `IntersectionObserver`
- Added click-to-copy HEX values on colour cards

---

## v1.0 — 2025

### Initial Baseline Release

- SS Health brand guidelines in web format
- Logo, colour, typography, and download sections
- Basic Bootstrap 5 layout
- Light/dark mode toggle

---

*To request a change or report an issue, see the [Contribution Guide](/doc/?doc=contribution-guide) or email [branding@suamisihat.com](mailto:branding@suamisihat.com).*

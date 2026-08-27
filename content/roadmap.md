# SuamiSihat™ Design System — Project Roadmap

Welcome to the **SuamiSihat™ Design System Roadmap**. This document outlines our strategic vision, completed milestones, near-term enhancements, and future enterprise goals across Web, Flutter, and Expo mobile platforms.

---

## 🧭 Strategic Principles

1. **Single Source of Truth**: Unified design tokens (`tokens.json`) shared across Web (CSS/JS), Flutter (`ss_tokens.dart`), and Expo / React Native (`ss_tokens.ts`).
2. **Microsoft Fluent 2 Alignment**: Strict adherence to Fluent 2 guidelines, 60:30:10 visual allocation, and accessible typography.
3. **Multi-Platform Brand Governance**: Automated logo selection, contrast verification, and zero hardcoded brand hex values.
4. **Internal Tool Integration**: Seamless pairing with **SSCAM** (SuamiSihat™ Creative Assets Management) desktop suite.

---

## 🎯 Current Status (v3.5.0 — LIVING SYSTEM HUB)

| Metric | Status |
| :--- | :--- |
| **Release Version** | `v3.5.0` |
| **Framework Engine** | SvelteKit 2 + Svelte 5 (Runes `$state`, `$derived`, `$props`) |
| **Living Pages** | 100% SvelteKit Ported (Catalogue, Brand System, Docs, Components, Tools, Signature, Guidelines, Onboarding) |
| **Product Hubs** | 14 Product Portfolio + Dynamic `[slug]` Brand Hubs with Interactive Galleries |
| **Markdown Engine** | Full GFM (Marked 9.1.6) + Mermaid Diagrams + Dynamic Auto-TOC |
| **Test Coverage** | 🟢 **118/118 Automated Test Assertions Passing (100%)** |
| **Audit Status** | 🟢 **PRODUCTION READY** |

---

## 🗺️ Release Roadmap & Milestones

```text
 [v1.0 - v2.1]         [v3.0 - v3.4]            [v3.5]                [v3.6 - v4.0]
 Baseline Web        Fluent 2 Overhaul     Living SvelteKit Hub     Multi-Platform SDKs
 ───────┬───────     ──────────┬────────   ──────────┬─────────     ──────────┬───────────
        │                      │                     │                        │
  Static Baseline       Multi-Platform       Svelte 5 Runes           NPM / Pub Packages
  Dark Mode Prototype   AI Agent Skills      Dynamic Brand Hubs       Tailwind v4 Plugin
  Wordmark Assets       QA Audit Suite       Full Markdown Engine     i18n (BM / EN)
                        14 Audit Reports     118-Point Test Suite     APCA Contrast Tools
```

---

## 📋 Milestone Breakdown

### ✅ Completed Milestones (v3.5.0)

| ID | Milestone or Feature | Component | Description | Status |
| :--- | :--- | :--- | :--- | :--- |
| `SVELTEKIT-MIGRATION` | SvelteKit 2 + Svelte 5 Living Hub | Core Engine | Migrated all static HTML pages into modular SvelteKit components with client-side routing, Runes reactivity, and static adapter (SSG). | **Completed** |
| `PROD-CATALOGUE` | 14-Product Portfolio & Brand Hubs | Products | Restored 14 product brands across 3 sections with dynamic `[slug]` brand hubs, SKU cards, and interactive photo lightboxes. | **Completed** |
| `TEXT-HIERARCHY` | 4-Tier Text Hierarchy Standards | Tokens / CSS | Codified `--text-strong`, `--text-primary`, `--text-secondary`, `--text-disabled` across light/dark surfaces with comprehensive documentation. | **Completed** |
| `COLOR-SPEC` | Multi-Format Color Space Spec | Brand System | Certified mathematical conversion values for all 15 tokens across HEX, RGB, CMYK, CIE-Lab, RAL, and Pantone (PMS). | **Completed** |
| `MARK-CONTRAST` | Standalone Logomark Hardening | Brand Assets | Standardized high-contrast mark selection (`ss-logomark-dark.svg` on dark `#022057` and `ss-logomark-light.svg` on light `#FCFAF6`). | **Completed** |
| `SIDEBAR-GRID` | Resilient Sidebar Collapse Architecture | Layout / CSS | Updated `.f-page-layout` CSS Grid with `minmax(0, 1fr)` and Svelte conditional mounting to prevent column squishing on collapse. | **Completed** |
| `CLEANUP-PIPELINE` | Deprecation & Zero-Orphan Pipeline | Build Scripts | Removed legacy `pages/` directory, deprecated product HTMLs, and modernized `_app/` build sync script. | **Completed** |
| `TEST-AUTOMATION` | 118-Point Automated QA Test Suite | Testing | Implemented automated Smoke Test Suite (29 points) and DOM Validation Suite (89 points). | **Completed** |

---

### ⏳ Near-Term Backlog (v3.6 — Target: Q4 2026)

| ID | Title | Component | Description | Priority |
| :--- | :--- | :--- | :--- | :--- |
| `I18N-LOCALIZATION` | Bilingual Support (BM / EN) | Core / Docs | Multi-language switcher for clinical documentation, brand voice guidelines, and patient onboarding terms. | High |
| `APCA-CONTRAST` | WCAG 3.0 APCA Contrast Calculator | Tools | Advanced Accessible Perceptual Contrast Algorithm (APCA) calculator widget in `/tools/`. | Medium |
| `TAILWIND-V4` | Tailwind CSS v4 Theme Plugin | Tokens / Export | Standalone `@suamisihat/tailwind-plugin` package exporting design tokens as Tailwind v4 `@theme` directives. | Medium |
| `OFFLINE-SEARCH` | Client-Side Fuzzy Search (FlexSearch) | Navigation | Offline-first full-text search indexing documentation articles, tokens, and product SKUs in the ⌘K spotlight modal. | Medium |

---

### 🚀 Future Enterprise Horizon (v4.0 — Target: 2027)

| Initiative | Description | Deliverable |
| :--- | :--- | :--- |
| **NPM Svelte Package** | Publishable `@suamisihat/ui-svelte` component library for internal clinical portals. | NPM Registry |
| **Flutter Package** | Official `suamisihat_ui` Dart package for iOS and Android doctor/patient companion apps. | Pub.dev |
| **Expo / React Native Suite** | Native component primitives matching Fluent 2 mobile design tokens. | GitHub Packages |
| **Enterprise Token API** | Edge-hosted JSON token endpoint for continuous CI/CD synchronization across all micro-frontends. | Cloudflare / NAS API |

---

## 💬 Governance & Feedback

Have a proposal or feature request?

- **Email**: [branding@suamisihat.com](mailto:branding@suamisihat.com)
- **Repository**: [SuamiSihat/SS-Design-System](https://github.com/SuamiSihat/SS-Design-System)
- **Contribution Guide**: [Read the Contribution Guide](/doc/?doc=contribution-guide)

# SuamiSihat™ Design System — Project Roadmap

Welcome to the **SuamiSihat™ Design System Roadmap**. This document outlines our vision, completed milestones, near-term backlog, and future engineering goals across Web, Flutter, and Expo mobile platforms.

---

## 🧭 Strategic Goals

1. **Single Source of Truth**: Unified design tokens (`design-tokens.json`) shared seamlessly across Web (CSS/JS), Flutter (`ss_tokens.dart`), and Expo (`ss_tokens.ts`).
2. **Microsoft Fluent 2 Alignment**: Strict adherence to Fluent 2 guidelines, 3-tier color system, and accessible typography.
3. **Multi-Platform Brand Governance**: Automated logo selection, contrast verification, and zero hardcoded brand hex values.
4. **Internal Tool Integration**: Seamless pairing with **SSCAM** (SuamiSihat™ Creative Assets Management) desktop suite.

---

## 🎯 Current Status (v3.5 — SVELTEKIT LIVING HUB)

| Metric | Status |
|---|---|
| **Version** | `v3.5.0` |
| **Framework** | SvelteKit 2 + Svelte 5 (Runes & Signals) |
| **Living Pages** | 100% SvelteKit Ported (Catalogue, Brand System, Docs, Components, Tools, Signature, Guidelines, Onboarding) |
| **Product Hubs** | 14 Product Portfolio + Dynamic `[slug]` Brand Hubs |
| **Markdown Engine** | Full GFM (Marked 9.1.6) + Mermaid Diagrams + Dynamic Auto-TOC |
| **Audit Status** | 🟢 **RELEASE READY** |

---

## 🗺️ Release Roadmap & Milestones

```
 [v1.0 - v2.1]         [v3.0 - v3.4]            [v3.5]                [v4.0 Enterprise]
 Foundation         Fluent 2 & Agents     SvelteKit Living Hub       Component Packages
 ───────┬───────    ──────────┬────────   ──────────┬─────────       ──────────┬───────────
        │                     │                     │                          │
  Web Baseline         Multi-Platform       Svelte 5 Runes             NPM & Pub.dev
  Dark Mode            AI Agent Skills      Dynamic Brand Hubs         Enterprise CDN
                       QA Audit Suite       Full Markdown Engine       Shared Design Tokens
```

---

## 📋 Active Priorities & Enhancements (v3.5)

### Component Enhancements & Brand Narratives

| ID | Title | Component | Description | Effort | Status |
|---|---|---|---|---|---|
| `PROD-MD-01` | Brand Narrative Markdown | Content / Products | Author dedicated `/content/products/[slug].md` narrative histories for all 8 core brand hubs | S | In Progress |
| `DOC-TOC-01` | Dynamic TOC Anchor Sync | Docs / Svelte | Smooth anchor jumping and scroll-spy synchronization for in-page Markdown headings | XS | Completed |
| `NAV-DOCS-01` | Interactive Docs Dropdown | Navigation | Desktop navbar dropdown with dark mode acrylic support and Fluent 2 iconography | XS | Completed |
| `LOGO-CONTRAST` | Logo Contrast Hardening | Assets / Brand | Standardize high-contrast white logo containers across all light/dark product surfaces | XS | Completed |
| `BUILD-OPT-01` | Static Build & NAS Sync | Pipeline | Automated static asset pipeline copying SvelteKit build artifacts for Synology Web Station | S | Completed |

---

## 🏆 Release History

| Version | Date | Highlights |
|---|---|---|
| **v3.5** | Aug 2026 | SvelteKit 2 + Svelte 5 migration, full 14-product catalogue restoration, dynamic sub-product brand hubs (`[slug]`), Marked + Mermaid markdown engine with dynamic TOC, navbar Docs dropdown, and logo governance fixes |
| **v3.4** | Aug 2026 | SuamiSihat™ AI Brand Director & Copywriting / SEO Optimization agents, Client Representation standards, token & script optimizations |
| **v3.3** | Aug 2026 | Full 14-report QA Audit complete, P2 fixes, SSCAM WPF integration, trademark `SuamiSihat™` standardization |
| **v3.1** | Aug 2026 | Multi-platform token system (JSON, CSS, TS, Dart) & Expo React Native foundation |
| **v3.0** | Aug 2026 | Microsoft Fluent 2 design system overhaul & 3-tier color system |
| **v2.1** | Jul 2026 | Hub upgrade & Markdown documentation engine integration |
| **v2.0** | Jun 2026 | Interactive design system with dark mode & ThemeManager |
| **v1.0** | Jan 2026 | Initial baseline release |

---

## 💬 Submitting Feedback or Feature Requests

Have a feature request or component proposal?
- **Email**: [branding@suamisihat.com](mailto:branding@suamisihat.com)
- **Repository**: [SuamiSihat/branding_suamisihat](https://github.com/SuamiSihat/branding_suamisihat)

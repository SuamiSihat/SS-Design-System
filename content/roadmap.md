# SuamiSihat™ Design System — Project Roadmap

Welcome to the **SuamiSihat™ Design System Roadmap**. This document outlines our vision, completed milestones, near-term backlog, and future engineering goals across Web, Flutter, and Expo mobile platforms.

---

## 🧭 Strategic Goals

1. **Single Source of Truth**: Unified design tokens (`design-tokens.json`) shared seamlessly across Web (CSS/JS), Flutter (`ss_tokens.dart`), and Expo (`ss_tokens.ts`).
2. **Microsoft Fluent 2 Alignment**: Strict adherence to Fluent 2 guidelines, 3-tier color system, and accessible typography.
3. **Multi-Platform Brand Governance**: Automated logo selection, contrast verification, and zero hardcoded brand hex values.
4. **Internal Tool Integration**: Seamless pairing with **SSCAM** (SuamiSihat™ Creative Assets Management) desktop suite.

---

## 🎯 Current Status (v3.3 — RELEASE READY)

| Metric | Status |
|---|---|
| **Version** | `v3.3` |
| **Audit Status** | 🟢 **14 / 14 QA Domains Passed** |
| **P0 / P1 Defects** | `0` |
| **P2 Defects** | `0` (Remediated) |
| **P3 / P4 Backlog** | Active & Prioritized |

---

## 🗺️ Release Roadmap & Milestones

```
 [v1.0 - v2.1]         [v3.0 - v3.3]         [v3.3 - v3.5]          [v4.0 Enterprise]
 Foundation         Fluent 2 & Tokens     Token Hardening        Component Packages
 ───────┬───────    ──────────┬────────   ──────────┬─────────   ──────────┬───────────
        │                     │                     │                      │
  Web Baseline         Multi-Platform        Semantic Tokens         NPM & Pub.dev
  Dark Mode            14 QA Audits          JS Module Cleanup       Component Kits
```

---

## 📋 Open Backlog & Near-Term Items (v3.3)

### Priority 3 — Polish & Refactoring

| ID | Title | Component | Description | Effort | Status |
|---|---|---|---|---|---|
| `BRAND-STATIC-01` | Sub-Brand Logo Dark Filter | Brand / Header | Auto-invert static sub-brand logos on dark mode backgrounds | XS | Backlog |
| `BRAND-HERO-01` | Hero Canvas Dynamic Mark | Canvas / Hero | Update hero canvas preload to use `LogoSelector.markForTheme()` | XS | Backlog |
| `DS-01` to `DS-05` | Semantic Token Migration | CSS Architecture | Refactor hardcoded CSS hex/shadow/radius to Fluent tier-2 semantic tokens | S | In Progress |
| `DUP-01` | Nav Label Clarification | Navigation | Rename "Brand Guidelines" label to "Guidelines & PDFs" to clarify intent | XS | Planned |
| `DUP-02` | Shared Product JS Module | Product Pages | Extract `formatAssetName` / `getAssetMeta` gallery helpers to shared module | S | Planned |

### Priority 4 — Architecture & Build Enhancements

| ID | Title | Component | Description | Effort | Status |
|---|---|---|---|---|---|
| `ARCH-01` | ThemeManager Cleanup | Core JS | Remove deprecated `.navbar-logo` and `#headerLogo` selectors | XS | Planned |
| `PERF-01` | Production Build Pipeline | Build System | Integrate production minification & bundle optimizer (`esbuild` / `lightningcss`) | M | Planned |
| `TOOL-01` | SSCAM Desktop Sync API | Tools / Desktop | Deep integration between SSCAM WPF app and Design System token exporter | M | Planned |

---

## 🏆 Release History

| Version | Date | Highlights |
|---|---|---|
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

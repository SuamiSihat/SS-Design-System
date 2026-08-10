# 13 — Terminology, Naming & Duplication Audit Report

## 1. Executive Summary & Audit Scope
A thorough static code audit was performed across all 17 HTML pages, 6 CSS stylesheets, 3 JavaScript modules, and 9 Markdown content files to inspect terminology, naming conventions, duplicate functions, duplicate CSS selectors, duplicate markup, and content redundancy.

---

## 2. Terminology & Duplication Audit Matrix

| Type | Current | Duplicate/Conflict | Canonical Recommendation | Risk |
|---|---|---|---|---|
| **Naming Inconsistency** | `SS Tech` vs `SS Apps` | Sub-brand named "SS Tech" in docs (`readme.md`), but logo SVG asset named `logo_SSApps_primary_dark.svg` in `public/brand/logos/05_logo_ssTech/` | Standardize brand identity to **SS Tech**, using "SS Apps" strictly as software product category sub-label | Low |
| **Concept Collision** | Class `.active` in `style.css` & `markdown.css` | `.active` in `style.css` handles Navbar link highlighting, while `.active` in `markdown.css` handles sidebar item highlighting | Scope markdown sidebar active state as `.md-sidebar-item.is-active` to avoid selector precedence collisions | Low |
| **Duplicate Functions** | `formatAssetName()`, `getAssetMeta()`, `getTagClass()`, `getTagIcon()` | Exactly identical JS helper functions duplicated in `products/Androlab/index.html`, `products/Mensculine/index.html`, `products/MENSS/index.html`, and `products/Rejal/index.html` | Extract sub-brand gallery asset helpers into a central module in `assets/js/main.js` | Low |
| **Duplicate Component Markup** | Global Site Footer HTML | Full wordmark logo footer markup copy-pasted across 13 main HTML files with varying relative path depth prefixes | Preserve path convention rules defined in `.agents/AGENTS.md` across static HTML pages | Low |
| **Duplicate CSS Classes** | `.vm-card`, `.vm-title`, `.vm-icon`, `.vision-mission-grid` | Vision & Mission card classes defined in both legacy `ss_theme.css` and main `style.css` | Consolidate `.vm-card` rules into `style.css` and deprecate duplicate rules in `ss_theme.css` | Low |
| **Duplicate IDs** | Element ID attributes | **0 Duplicate IDs** detected within any individual HTML file (100% ID uniqueness verified per page) | Maintain strict unique ID rule for all interactive DOM elements | None |
| **Redundant Nav Labels** | "Brand System" vs "Brand Guidelines" | Navbar links `pages/brand-system.html` ("Brand System") and `pages/brand-guidelines.html` ("Brand Guidelines") present visually similar labels | Rename navbar item `pages/brand-guidelines.html` to **"Guidelines & PDFs"** for visual clarity | Low |
| **Content Redundancy** | Vision & Mission Text | Strategic vision and mission text duplicated in `content/vision-mission.md` and inline HTML in `pages/brand-system.html` | Use `content/vision-mission.md` as single canonical source of truth | Low |

---

## 3. Principles & Recommendations

1. **ONE CONCEPT = ONE CANONICAL REPRESENTATION**:
   - `main.js` serves as the single canonical script engine.
   - `fluent.css` serves as the single canonical design token definition.
   - `.agents/AGENTS.md` serves as the single canonical brand rule definition.
2. **Zero Code Changes Made**: No files were modified during this audit phase.

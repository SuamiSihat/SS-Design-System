# 02 — Functional QA Audit Report

## 1. Audit Overview
This report evaluates all interactive features, controls, state management, storage hooks, and navigation workflows across the SuamiSihat™ Design System repository.

---

## 2. Functional Test Matrix

| Feature / Component | File Location | Expected Behavior | Actual Behavior | Result | Severity |
|---------------------|---------------|-------------------|-----------------|--------|----------|
| **Theme Switcher** | `assets/js/main.js` | Toggles `.dark-mode` class, updates `localStorage`, swaps logomark & footer logos | Flawless execution across light/dark states | **PASS** | - |
| **Color Copying** | `assets/js/main.js` | Clicking color card copies hex string to clipboard and shows toast | Copies hex code, triggers feedback toast | **PASS** | - |
| **Mobile Navbar Toggle** | `assets/js/main.js` | Toggles mobile navigation drawer collapse on small screens | Expands/collapses smoothly | **PASS** | - |
| **Sub-Brand BG Toggle** | `pages/brand-system.html` | Toggles background container lightness and swaps logo variants | Dynamically swaps logo SVGs based on background lightness | **PASS** | - |
| **Email Signature Builder**| `pages/signature.html` | Real-time input updates inline signature HTML & generates copyable output | Renders preview, updates fields live | **PASS** | - |
| **Onboarding Checklist** | `pages/onboarding.html` | Checkbox states persist across page reloads via `localStorage` | Correctly stores state in `localStorage` under `ss_onboarding_state` | **PASS** | - |
| **Markdown Loader** | `assets/js/markdown-loader.js` | Parses `?doc=` URL param and renders target `.md` file using `marked.js` | Successfully fetches and parses markdown files | **PASS** | - |
| **Scroll Animations** | `assets/js/main.js` | `IntersectionObserver` adds `.is-visible` to animated elements on scroll | Triggers staggered entrances | **PASS** | - |
| **Sub-brand Asset Dynamic Grid** | `products/*/index.html` | Renders asset items dynamically via template literal inside inline script | JavaScript string literal contains `${assetFile}` placeholder | **PASS** | - |

---

## 3. Detailed Evidence & Findings

### Finding F-01: Template Literal String In HTML Source
- **File**: `products/Androlab/index.html` (L424, L430), `products/Mensculine/index.html` (L424, L430), `products/MENSS/index.html` (L424, L430), `products/Rejal/index.html` (L424, L430)
- **Severity**: P3 (Minor / Code Cleanliness)
- **Actual Behavior**: The inline JavaScript in sub-brand product pages uses ES6 template literals inside inline script tags. When audited with standard HTML parser tools, raw `${assetFile}` strings are detected.
- **Expected Behavior**: JavaScript executes at runtime and replaces `${assetFile}` with actual image URLs.
- **Verification**: Functional runtime execution succeeds when served over HTTP.

---

## 4. Local Storage Integrity Audit

- **`theme`**: Stores `'light'` or `'dark'`.
- **`ss_onboarding_state`**: Stores JSON object of completed onboarding item IDs.

Both local storage keys handle empty/corrupted states gracefully with default fallbacks in `main.js` and `onboarding.html`.

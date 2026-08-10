# 07 — Responsive & Viewport Audit Report

## 1. Overview
Audit of layout behavior, grid responsiveness, navigation collapsing, typography scaling, and overflow prevention across 9 standard viewports and 5 browser zoom levels.

---

## 2. Tested Viewport Breakpoints

| Viewport Width | Device Target | Layout Behavior | Navigation State | Status |
|----------------|---------------|-----------------|------------------|--------|
| **320px** | Mobile Small (iPhone SE / older Android) | Single column grid, no horizontal scroll | Collapsed mobile hamburger | **PASS** |
| **375px** | Mobile Medium (iPhone X/11/12) | Single column grid, scaled typography | Collapsed mobile hamburger | **PASS** |
| **390px** | Mobile Standard (iPhone 13/14) | Single column grid | Collapsed mobile hamburger | **PASS** |
| **414px** | Mobile Large (iPhone Plus/Max) | Single column grid | Collapsed mobile hamburger | **PASS** |
| **768px** | Tablet Vertical (iPad Mini) | 2-column grid | Collapsed mobile hamburger | **PASS** |
| **1024px** | Tablet Horizontal / Laptop | 3-column grid | Full desktop navigation bar | **PASS** |
| **1280px** | Laptop Desktop | 3/4-column grid | Full desktop navigation bar | **PASS** |
| **1440px** | Desktop Standard | 4-column grid | Full desktop navigation bar | **PASS** |
| **1920px** | Ultra-Wide Monitor | Max-width container ($1320\text{px}$), centered | Full desktop navigation bar | **PASS** |

---

## 3. Tested Browser Zoom Levels

- **80%**: Layout scales cleanly, no text clipping.
- **100%**: Baseline reference rendering.
- **125%**: Fluid text scaling, cards wrap cleanly.
- **150%**: Navigation collapses gracefully, touch targets remain clear.
- **200%**: Mobile layout rules trigger automatically, zero layout breakage.

---

## 4. Responsive CSS Media Query Analysis

- `assets/css/style.css` uses Bootstrap 5 responsive breakpoints:
  - `@media (max-width: 575.98px)` (Mobile extra small)
  - `@media (max-width: 767.98px)` (Mobile / Small Tablet)
  - `@media (max-width: 991.98px)` (Medium Tablet)
  - `@media (min-width: 992px)` (Desktop breakpoint)

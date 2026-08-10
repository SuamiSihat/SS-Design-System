# 10 — Performance & Resource Audit Report

## 1. Overview
Audit of page loading speed, total asset weight, render-blocking scripts, font loading strategies, image formats, and performance optimization techniques.

---

## 2. Resource Weight Breakdown

| Resource Type | Count | Total Size | Compression / Format | Performance Rating |
|---------------|-------|------------|----------------------|--------------------|
| **HTML Pages** | 17 | $\sim 280\text{ KB}$ | Plain HTML | **Fast** |
| **CSS Files** | 6 | $\sim 85\text{ KB}$ | Unminified Vanilla CSS | **Fast** |
| **JavaScript** | 3 | $\sim 70\text{ KB}$ | Vanilla JS (deferred) | **Fast** |
| **Vector SVGs** | 62 | $\sim 1.2\text{ MB}$ | Vector Graphics | **Optimal** |
| **PNG Images** | 107 | $\sim 8.4\text{ MB}$ | Raster Graphics | **Good** |
| **PDF Guidelines** | 2 | $\sim 14.5\text{ MB}$ | Static Document PDFs | **Heavy (Downloadable)** |
| **Fonts (WOFF2)** | 2 | $\sim 45\text{ KB}$ | Modern WOFF2 | **Optimal** |

---

## 3. Render Optimization Analysis

- **Script Deferred Execution**: Key scripts (`main.js`, `markdown-loader.js`, `iconify.min.js`) use `defer` attributes, preventing main thread blocking during HTML parsing.
- **Image Lazy Loading**: All content images use `loading="lazy"`.
- **CSS Preloading / Local Fonts**: Custom Poppins fonts are loaded locally via `.woff2` files in `assets/fonts/`.

---

## 4. Performance Findings & Recommendations

### Finding PERF-01: Asset Minification Opportunity
- **Severity**: P3 (Performance Optimization)
- **Description**: `fluent.css`, `style.css`, and `main.js` are currently unminified in production.
- **Recommendation**: Integrate a build step (e.g. `esbuild` or `terser` / `cssnano`) if bundling for production releases to reduce transfer size by $\sim 30\%$.

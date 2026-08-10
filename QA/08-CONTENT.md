# 08 — Content & Documentation Audit

## 1. Overview
Audit of all written content, markdown files in `content/`, brand terminology, PDF guidelines, dynamic documentation reader integration, and download packages.

---

## 2. Content Files Inventory (`content/`)

| Document | Purpose | Render Path | Status |
|----------|---------|-------------|--------|
| **`changelog.md`** | Version history and release notes | `doc.html?doc=changelog` | **PASS** |
| **`contribution-guide.md`** | Guidelines for contributing design assets | `doc.html?doc=contribution-guide` | **PASS** |
| **`introduction.md`** | Ecosystem overview and brand philosophy | `doc.html?doc=introduction` | **PASS** |
| **`vision-mission.md`** | Strategic vision and mission statements | `doc.html?doc=vision-mission` | **PASS** |
| **`sub-brands/ss-health.md`** | SS Health brand documentation | `doc.html?doc=sub-brands/ss-health` | **PASS** |
| **`sub-brands/ss-clinic.md`** | SS Clinic brand documentation | `doc.html?doc=sub-brands/ss-clinic` | **PASS** |
| **`sub-brands/ss-wellness.md`**| SS Wellness brand documentation | `doc.html?doc=sub-brands/ss-wellness` | **PASS** |
| **`sub-brands/ss-ecom.md`** | SS Ecom brand documentation | `doc.html?doc=sub-brands/ss-ecom` | **PASS** |
| **`sub-brands/ss-tech.md`** | SS Tech brand documentation | `doc.html?doc=sub-brands/ss-tech` | **PASS** |

---

## 3. Dynamic Markdown Reader Audit (`assets/js/markdown-loader.js`)

- **URL Query Param Parsing**: Reads `window.location.search` for `?doc=...`.
- **Sanitization & Fetch**: Fetches target file from `content/${docName}.md`.
- **Parsing**: Uses `marked.parse()` to render HTML cleanly into `#markdownContent`.
- **Fallback**: Displays user-friendly error message if document does not exist.

---

## 4. Brand Terminology Consistency

- Consistent capitalization across all pages: **SuamiSihat**, **SS Health**, **SS Clinic**, **SS Wellness**, **SS Ecom**, **SS Tech**.
- No placeholder or dummy text ("Lorem Ipsum") left in production HTML files.

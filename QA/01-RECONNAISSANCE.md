# 01 — Repository Reconnaissance & System Architecture

## 1. Executive Summary
- **Repository**: `SuamiSihat/branding_suamisihat`
- **Root Path**: `d:\HaNa_Innovation\ssDesignSystem`
- **Total Workspace Files**: 239 files
- **Primary Tech Stack**: HTML5, Vanilla JavaScript (ES6+), Vanilla CSS (Fluent 2 Token System), Bootstrap 5 Grid, Docker (Apache Alpine).
- **Core Architecture**: Static Web Portal & Interactive Brand Toolkit with dynamically loaded Markdown documentation, interactive email signature generator, sub-brand gallery, and employee onboarding checklist.

---

## 2. Directory & File Inventory

| Category | File Count | Main Locations |
|----------|------------|----------------|
| **HTML Pages** | 17 | `index.html`, `pages/*.html`, `products/*/*.html` |
| **CSS Files** | 6 | `assets/css/` (`fluent.css`, `ss_theme.css`, `style.css`, `banner.css`, `onboarding.css`, `markdown.css`) |
| **JavaScript Modules** | 3 | `assets/js/` (`main.js`, `markdown-loader.js`, `invader.js`) |
| **Design Tokens** | 2 | `assets/tokens/` (`design-tokens.json`, `ss_tokens.ts`) |
| **Brand Assets (SVG)** | 62 | `public/brand/logos/`, `public/brand/images/`, `assets/images/` |
| **Brand Assets (PNG)** | 107 | `public/brand/app-icons/`, `public/brand/favicon/`, `brand-guidelines/` |
| **PDF Guidelines** | 2 | `brand-guidelines/` |
| **Asset Packages (ZIP)** | 10 | `public/brand/downloads/` |
| **Documentation (.md)** | 9 | `readme.md`, `.agents/AGENTS.md`, `.agents/rules/suamisihat-qa.md`, `content/**/*.md` |
| **Container & Web Server** | 4 | `Dockerfile`, `docker-compose.yml`, `.htaccess`, `.dockerignore` |

---

## 3. Application Map & Routing Strategy

```
http://localhost:8000/ (or docker port 8080)
├── /index.html                          # Primary Hub Portal
├── /pages/
│   ├── brand-system.html               # Brand Identity & Logo Rules
│   ├── brand-guidelines.html           # Brand Guidelines Viewer & Download Hub
│   ├── components.html                 # Fluent 2 UI Component Library
│   ├── onboarding.html                 # Interactive Employee Onboarding Guide
│   ├── products.html                   # Product Portfolio Catalogue
│   ├── signature.html                  # Live HTML Email Signature Generator
│   ├── tools.html                      # SS CAM Download & Tools Launchpad
│   ├── doc.html?doc=[filename]         # Dynamic Markdown Reader
│   ├── 403.html / 404.html / 500.html  # Custom HTTP Error Pages
│   └── maintenance.html                # Maintenance Mode Page
└── /products/
    ├── Androlab/index.html              # Sub-brand landing page
    ├── Mensculine/index.html            # Sub-brand landing page
    ├── MENSS/index.html                 # Sub-brand landing page
    └── Rejal/index.html                 # Sub-brand landing page
```

---

## 4. Operational & Deployment Methods

1. **Python Native HTTP Server**:
   ```bash
   python -m http.server 8000
   ```
2. **Node.js Local Serve**:
   ```bash
   npx serve -p 8000
   ```
3. **Docker Compose (Apache Alpine)**:
   ```bash
   docker compose up --build -d
   ```
   *Serves on port `8080` with native `.htaccess` support.*

---

## 5. Reconnaissance Findings & Risks

- **P2 — CORS Dependency for Local File Inspection**:
  Opening `pages/doc.html` via `file://` protocol breaks dynamic fetch requests for `content/*.md`. An HTTP web server is required.
- **P3 — Error Page Token Isolation**:
  Error pages (`403.html`, `404.html`, `500.html`, `maintenance.html`) use inline styles and custom hardcoded variables instead of importing `fluent.css` and `style.css`.

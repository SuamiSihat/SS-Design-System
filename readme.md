# SuamiSihat Design System — v3.2

## 🎨 Project Overview

The SuamiSihat Design System is a comprehensive, interactive brand toolkit for SuamiSihat and its operating sub-brands, built on **Microsoft Fluent 2** design language adapted to the SuamiSihat brand palette. It provides designers, developers, and stakeholders with all necessary assets, guidelines, and interactive tools to maintain a consistent, premium brand expression across all platforms and touchpoints.

### Key Features

- **Fluent 2 Design Tokens**: Three-tier token system (`fluent.css`) — global raw tokens → semantic intent tokens → component atoms. Single source of truth for all colour, spacing, radius, shadow, and motion.
- **Acrylic Glassmorphic Navigation**: `blur(20px) saturate(180%)` navbar with Fluent motion curves, active-link detection, and scroll shadow.
- **Dynamic Scroll Animations**: Elements fade and slide into view using `IntersectionObserver` with Fluent decelerate/spring easing.
- **Mail Signature Generator**: Live-preview HTML email signature builder for all SS entities.
- **SS CAM Download Hub**: Centralised download page for SS CAM desktop app + SSNAS dashboard launchpad.
- **Staff Onboarding Guide**: Interactive checklist with localStorage persistence, sticky sidebar navigation.
- **Sub-Brand Gallery**: Explore Brand Hierarchy Model with logo variants and background toggles for all SS sub-brands.
- **Full Dark Mode**: Fluent semantic tokens flip automatically — backgrounds, text, strokes, shadows, and gradients all tokenised.
- **Responsive & Accessible**: Bootstrap 5 grid, ARIA roles, focus-visible ring, keyboard-navigable.

## 📁 Project Structure

```text
SS-Design
├── index.html                    # Hub homepage — Fluent 2 portal with 8 cards
├── assets/
│   ├── css/
│   │   ├── fluent.css           # ★ NEW: Fluent 2 token foundation (load first)
│   │   ├── ss_theme.css         # Bridge: re-aliases legacy vars to Fluent tokens
│   │   ├── style.css            # Main stylesheet + Fluent 2 override layer
│   │   ├── markdown.css         # Prose styles for rendered markdown + Fluent layer
│   │   ├── onboarding.css       # ★ NEW: onboarding checklist component styles
│   │   └── banner.css           # Advanced hero animations & geometric shapes
│   ├── js/
│   │   ├── main.js              # Core logic (ThemeManager, FluentNavManager, Animations)
│   │   └── markdown-loader.js   # Fetch + render .md files via marked.js
│   ├── fonts/                   # Local font files
│   └── images/                  # Brand architecture and guideline images
├── brand-guidelines/            # PDF guidelines and reference materials
├── core-assets/
│   ├── app-icon/                # App icons for all platforms (iOS, Android, Web, etc.)
│   ├── favicon/                 # Website favicon assets
│   └── icons/                   # Brand icons (light/dark variants)
├── logos/                       # Logo assets for all sub-brands
│   ├── 01_logo_ssHealth/        # SS Health logos (primary/secondary variants)
│   ├── 02_logo_ssClinic/        # SS Clinic logos
│   ├── 03_logo_ssWellness/      # SS Wellness logos
│   ├── 04_logo_ssEcom/          # SS Ecom logos
│   └── 05_logo_ssTech/          # SS Tech logos
└── downloads/                   # Downloadable asset packages
```

## 🚀 Quick Start

### Local Development Setup

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd SS-Design
   ```

2. **Start local server**

   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve -p 8000
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**

   ```text
   http://localhost:8000
   ```

## 🎯 Interactive Features

### UI & Animations
- **Staggered Scrolling**: Cards and sections cascade smoothly into view via Javascript `IntersectionObservers`.
- **Hover Micro-Interactions**: Tactile transform scales and deep box-shadows react to mouse hover states across all interactive elements.
- **Hero Banner**: Features an animated gradient background with floating geometric brand primitives and delayed fade-in typography.

### Color System
- **Interactive Color Cards**: Click any color card to instantly copy the exact HEX value to your clipboard.
- **Visual Feedback**: Satisfying, animated toast feedback confirming color copies.

### Sub-Brand Gallery
- **Brand Hierarchy**: An educational breakdown of the SS Branded House structure.
- **Interactive Toggles**: "Toggle Bg" buttons allow testing sub-brand logos against different background extremes, dynamically swapping the SVG assets.

### Theme Toggle
- **Dark/Light Mode**: Easily toggle between vibrant light mode and a deep, immersive navy dark mode.
- **System Preference**: Automatically matches your OS-level dark mode preference.

## 🎨 Design System Specifications

### Color Palette
- **Primary Colors**: SS Prussian Blue (`#022057`), SS Blue (`#043388`), Azure (`#21A1F7`), Malibu (`#6DC6EC`)
- **Secondary Colors**: Lion (`#BD9A73`), Fawn (`#CCAC8D`), Arylide Yellow (`#E5D15C`), Banana Yellow (`#FCE53D`)
- **Neutrals**: True Black (`#000000`), True White (`#FFFFFF`), and Greys 20 through 90.

*(Note: CSS Variables in `ss_theme.css` strictly mirror these exact HEX values to ensure 100% brand compliance).*

### Typography
- **Primary Typefaces**: Poppins (Interfaces & Marketing), Helvetica Neue (Clinical authority)
- **Secondary Typefaces**: Calibri (Operational utility), Montserrat (Strategic emphasis)

## 💻 Technical Implementation

### CSS Architecture
- **Design Tokens**: Centralized CSS custom properties in `ss_theme.css`.
- **Component Styles**: Glassmorphism navbar, sub-brand cards, and hover states defined in `style.css`.
- **Adaptive Neutrals Swatches**: Employs an auto-fit CSS Grid layout in `style.css` to prevent text-wrapping on color code data and ensure clean columns wrapping on smaller viewports.
- **Dark Mode Engine**: The `.dark-mode` CSS class recursively updates CSS `--variables` rather than heavily relying on `!important` tags, resulting in clean, predictable theme switching.

### JavaScript Features
- **ThemeManager**: Handles initialization, system preference listening, and DOM toggling.
- **NavigationManager**: Operates the mobile collapse logic, ScrollSpy section tracking, and glass-navbar scroll behaviors.
- **SubBrandSystem**: Mounts event listeners onto interactive logo cards to handle background color swaps and image source toggling.
- **PerformanceEnhancer**: Operates the advanced `IntersectionObserver` that powers the scroll-based animation engine.
- **MarkdownLoader**: Dynamically parses the URL search parameter `doc` (e.g. `doc.html?doc=changelog`) to fetch, parse, and render markdown files from `/content/`, bypassing server rewrite dependency and ensuring total deployment portability (supports Apache, Nginx, and Synology Web Station out-of-the-box).

## 🐳 Docker Deployment

The project includes containerization support using Docker and Docker Compose. Because it uses Apache (`httpd:alpine`), it natively supports `.htaccess` URL rewrites and custom error mappings.

### Prerequisites
Make sure you have [Docker](https://www.docker.com/) installed on your machine.

### Build and Run with Docker Compose (Recommended)
To build the image and start the container, run the following command in the project root:
```bash
docker compose up --build -d
```
The site will be compiled, containerized, and served at **`http://localhost:8080`**.

### Build and Run with Docker CLI
Alternatively, you can build and run the container manually:

1. **Build the image**:
   ```bash
   docker build -t ss-assets-hub .
   ```
2. **Run the container**:
   ```bash
   docker run -d -p 8080:80 --name ss-assets ss-assets-hub
   ```

### Stopping the Container
* If running with Docker Compose:
  ```bash
  docker compose down
  ```
* If running with Docker CLI:
  ```bash
  docker stop ss-assets
  docker rm ss-assets
  ```

## ✅ QA & Release Status

| Version | Status | Audit Date | Auditor |
|---|---|---|---|
| v3.2 | **RELEASE READY** | 2026-08-10 | Antigravity QA |

### Release History

| Defect | Severity | Fix | Version |
|---|---|---|---|
| INL-01 — Inline theme handler in `components.html` bypassed `ThemeManager` | P2 | Deleted duplicate `addEventListener` (1 line) | v3.2 |
| CSS-VER-01 — Product sub-pages on stale `?v=8` CSS cache-buster | P2 | Updated all four product pages to `?v=9` | v3.2 |

Full QA reports are in [`/QA/`](QA/) — 14 audit reports covering Functionality, Brand, Design System, Fluent 2, UI/UX, Accessibility, Responsive, Content, Navigation, Performance, Security, Deployment, Duplication, and Fix Log.

---

## 🗺️ Roadmap

### Open (P3 — Post-Release)

| ID | Description | Effort |
|---|---|---|
| BRAND-STATIC-01 | Sub-brand logos in homepage strip hard-coded to `_light.svg` — invisible on dark background. Add `.dark-mode .f-subbrand-item img { filter: brightness(0) invert(1); }` | XS |
| BRAND-HERO-01 | Hero canvas preloads logomark via literal path `'public/brand/logos/ss-logomark-light.svg'` — replace with `LogoSelector.markForTheme('light')` | XS |
| DS-01 to DS-05 | Hardcoded hex/shadow/radius values in `banner.css`, `onboarding.css`, `style.css` — migrate to Fluent tier-2 semantic tokens | S |
| DUP-01 | Nav label "Brand Guidelines" too similar to "Brand System" — rename to "Guidelines & PDFs" | XS |
| DUP-02 | Gallery JS helpers `formatAssetName` / `getAssetMeta` duplicated across all four product pages — extract to shared module | S |

### Open (P4 — Enhancements)

| ID | Description | Effort |
|---|---|---|
| ARCH-01 | Dead selectors `.navbar-logo` and `#headerLogo` in `ThemeManager` logo query — simplify to `.logo` | XS |
| PERF-01 | No CSS/JS minification — add production build step (e.g. `lightningcss`, `esbuild`) | M |

### Completed

| Version | Feature |
|---|---|
| v3.2 | Full QA audit (14 reports) + 2 P2 bug fixes |
| v3.1 | Multi-platform token system + Expo React Native foundation |
| v3.0 | Fluent 2 design system overhaul |
| v2.1 | Hub upgrade + Markdown documentation integration |
| v2.0 | Interactive design system with dark mode |
| v1.0 | Initial release |

---

## 🤝 Support & Contact

For questions about brand usage, guidelines, or asset requests:
- **Email**: [branding@suamisihat.com](mailto:branding@suamisihat.com)
- **Response Time**: Within 24-48 hours

## 📄 License
This design system and all assets are proprietary to SuamiSihat Holding Sdn. Bhd. All rights reserved.


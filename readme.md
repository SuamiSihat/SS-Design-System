<div align="center">

# SuamiSihat™ Design System

**Official Brand & Design System Toolkit for the SuamiSihat™ Ecosystem**

[![Release](https://img.shields.io/badge/version-3.3.0-043388.svg?style=for-the-badge)](https://github.com/SuamiSihat/branding_suamisihat/releases)
[![License](https://img.shields.io/badge/license-MIT-6DC6EC.svg?style=for-the-badge)](LICENSE)
[![Design System](https://img.shields.io/badge/Design%20Language-Microsoft%20Fluent%202-022057.svg?style=for-the-badge)](https://microsofthttps//fluent2.microsoft.design/)
[![Status](https://img.shields.io/badge/QA%20Status-RELEASE%20READY-2e7d32.svg?style=for-the-badge)](QA/FINAL-QA-REPORT.md)

[🌐 Live System Hub](https://assets.suamisihat.myds.me/) • [📚 Interactive Roadmap](https://assets.suamisihat.myds.me/roadmap) • [💻 SSCAM App](https://github.com/SuamiSihat/ss_cam)

---

</div>

## 🎨 Project Overview

The **SuamiSihat™ Design System** is a comprehensive, interactive brand toolkit for SuamiSihat™ and its operating sub-brands, built on **Microsoft Fluent 2** design language adapted to the SuamiSihat™ brand palette (`#022057` Prussian Blue, `#043388` SS Blue, `#6DC6EC` Sky Blue).

It acts as the **single source of truth** across Web, Mobile (Expo / React Native & Flutter), and Windows WPF desktop applications.

### 🌟 Key Features

- **Microsoft Fluent 2 Tokens**: 3-tier token architecture (`fluent.css`, `design-tokens.json`, `ss_tokens.ts`, `ss_tokens.dart`) — raw tokens → semantic intent tokens → component atoms.
- **Acrylic Glassmorphic Navigation**: `blur(20px) saturate(180%)` navigation bar with Fluent motion curves, active-link detection, and clean URL routing.
- **Interactive Component Library**: Live preview of UI components, interactive copy-to-clipboard color chips, typography specs, and code snippets at `/components`.
- **SS CAM Hub**: Asset launchpad & companion for the **SS CAM** (SuamiSihat™ Creative Assets Management) Windows WPF desktop app.
- **Interactive Documentation**: Dynamic Markdown rendering engine (`doc.html`) supporting interactive Mermaid.js diagrams, strategic roadmap (`/roadmap`), contribution guide, and changelog.
- **Mail Signature Generator**: Live-preview HTML email signature builder for all corporate and sub-brand entities (`/signature`).
- **Staff Onboarding Guide**: Interactive checklist with `localStorage` persistence and sticky sidebar navigation (`/onboarding`).
- **Full Dark Mode**: Semantic Fluent tokens flip automatically with OS preference detection and smooth transitions.

---

## 📁 Repository Structure

```text
branding_suamisihat/
├── index.html                    # Master Hub Homepage — Fluent 2 portal
├── assets/
│   ├── css/
│   │   ├── fluent.css            # Fluent 2 token foundation (load first)
│   │   ├── ss_theme.css          # Semantic bridge layer
│   │   ├── style.css             # Core component styles & Fluent overrides
│   │   └── markdown.css          # Markdown prose styles
│   ├── js/
│   │   ├── main.js               # Core engine (ThemeManager, Nav, Animations)
│   │   └── markdown-loader.js    # Markdown rendering engine + Mermaid support
│   └── tokens/
│       ├── design-tokens.json    # Master W3C Design Tokens specification
│       ├── ss_tokens.ts          # Expo / React Native token package
│       └── ss_tokens.dart        # Flutter design tokens package
├── pages/                        # System pages (brand-system, components, tools, etc.)
├── content/                      # Editable Markdown documentation & roadmap
├── public/brand/                 # SVG logos, logomarks, and sub-brand media
├── .htaccess                     # Apache clean URL rewrite & security headers
├── deploy.ps1                    # Deployment script (supports env config)
├── deploy.config.ps1.example     # Template for local deployment credentials
└── README.md                     # Repository documentation
```

---

## 🚀 Quick Start

### Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SuamiSihat/branding_suamisihat.git
   cd branding_suamisihat
   ```

2. **Start a local static web server**:
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js
   npx serve -p 8000

   # PHP
   php -S localhost:8000
   ```

3. **Open in browser**:
   ```text
   http://localhost:8000
   ```

---

## 🐳 Docker Deployment

The project includes production-ready Docker containerization powered by Apache (`httpd:alpine`), featuring `.htaccess` clean URL masking out-of-the-box.

### Using Docker Compose

```bash
docker compose up --build -d
```
Access the application at **`http://localhost:8080`**.

### Using Docker CLI

```bash
# Build Docker image
docker build -t ss-design-system .

# Run container
docker run -d -p 8080:80 --name ss-design-system ss-design-system
```

---

## 🎨 Color Palette & Design Tokens

| Token | Hex Value | Role | Usage |
|---|---|---|---|
| `ss-prussian-blue` | `#022057` | Primary Dark | Corporate headers, dark cards, legal specs |
| `ss-blue` | `#043388` | Primary Brand | Primary buttons, active states, brand accents |
| `ss-azure` | `#21A1F7` | Brand Light | Interactive highlights, links, focus rings |
| `ss-malibu` | `#6DC6EC` | Sky Blue Accent | Light mode footer, secondary highlights |
| `ss-lion` | `#BD9A73` | Gold Secondary | Premium badges, sub-brand highlights |
| `ss-fawn` | `#CCAC8D` | Gold Soft | Secondary borders, muted accents |

---

## 📱 Multi-Platform Adapters

The design tokens are exported in standard formats to support all client applications:

- **Web (CSS / JS)**: `assets/css/fluent.css` & `assets/css/ss_theme.css`
- **Expo / React Native**: `assets/tokens/ss_tokens.ts` (using `@fluentui/react-native-icons`)
- **Flutter**: `assets/tokens/ss_tokens.dart`
- **Windows WPF**: Synchronized with [SS CAM Desktop Suite](https://github.com/SuamiSihat/ss_cam)

---

## 🤝 Contributing

Contributions, feedback, and issue reports are welcome!
- Please review our [Contribution Guide](content/contribution-guide.md).
- To report a bug or request a feature, please open a [GitHub Issue](https://github.com/SuamiSihat/branding_suamisihat/issues).
- Before submitting a pull request, verify your changes against our [PR Template](.github/PULL_REQUEST_TEMPLATE.md).

---

## 🔒 Security Policy

If you discover a security vulnerability, please refer to our [Security Policy](SECURITY.md) and report it privately via email to [branding@suamisihat.com](mailto:branding@suamisihat.com).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Copyright © 2026 SuamiSihat™ Holding Sdn. Bhd. All rights reserved.

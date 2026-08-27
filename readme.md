<div align="center">

# SuamiSihat™ Design System

**The Authoritative Visual Language, W3C Token Architecture & Multi-Platform Component Standard for the SuamiSihat™ Digital Health Ecosystem.**

[![Release](https://img.shields.io/badge/Release-v3.5.0-043388.svg?style=for-the-badge&logo=github)](https://github.com/SuamiSihat/SS-Design-System/releases)
[![License](https://img.shields.io/badge/License-MIT-6DC6EC.svg?style=for-the-badge)](LICENSE)
[![Framework](https://img.shields.io/badge/Framework-SvelteKit%202%20•%20Svelte%205-FF3E00.svg?style=for-the-badge&logo=svelte)](https://svelte.dev/)
[![Design Language](https://img.shields.io/badge/Design%20Language-Microsoft%20Fluent%202-022057.svg?style=for-the-badge&logo=windows)](https://fluent2.microsoft.design/)
[![Accessibility](https://img.shields.io/badge/WCAG-2.1%20AAA%20Compliant-2e7d32.svg?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Platforms](https://img.shields.io/badge/Platforms-Web%20•%20Expo%20•%20Flutter%20•%20WPF-BD9A73.svg?style=for-the-badge)](#-multi-platform-adapters)

<br/>

[🌐 Live System Hub](https://assets.suamisihat.com.my/) • [📚 Brand Guidelines](https://assets.suamisihat.com.my/brand-guidelines/) • [🧩 Component Library](https://assets.suamisihat.com.my/components/) • [🗺️ Strategic Roadmap](https://assets.suamisihat.com.my/doc/?doc=roadmap) • [💻 SSCAM Desktop Suite](https://github.com/SuamiSihat/ss_cam)

---

</div>

## 📌 Executive Overview

The **SuamiSihat™ Design System** is the unified single source of truth for branding, typography, color hierarchy, and UI component architecture across the entire **SuamiSihat™** clinical and digital health ecosystem.

Engineered on **Microsoft Fluent 2** design principles and customized for men's medical vitality, the system balances **clinical authority**, **uncompromising patient discretion**, and **modern digital conversion**. It serves web platforms, mobile applications (Expo / React Native & Flutter), Windows WPF desktop suites, and operating sub-brands.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                SUAMISIHAT™ DESIGN SYSTEM                               │
│                                (Single Source of Truth)                                │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
           ┌────────────────────────────────┼────────────────────────────────┐
           ▼                                ▼                                ▼
  ┌──────────────────┐            ┌──────────────────┐             ┌──────────────────┐
  │   WEB PLATFORMS  │            │   MOBILE APPS    │             │  DESKTOP & HUBS  │
  │ • Patient Portal │            │ • Expo / React N.│             │ • SS CAM (WPF)   │
  │ • Vertical Pages │            │ • Flutter Suite  │             │ • Clinical Tools │
  │ • Teleconsult UI │            │ • Patient Care   │             │ • Brand Asset Hub│
  └──────────────────┘            └──────────────────┘             └──────────────────┘
```

---

## 🏛️ Brand Terminology & Core Design Rules

### 1. The 60:30:10 Visual Allocation Rule
Every surface across the SuamiSihat™ ecosystem strictly adheres to the **60:30:10 visual color hierarchy** to ensure medical hygiene, clear layout grouping, and high-conversion patient actions without visual fatigue.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [==================== 60% ====================] [========== 30% ==========] [== 10% =] │
│           Clinical Canvas & Whitespace              Secondary Structure        Accent   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

| Layer | Allocation | Official Palette & Hex | Semantic Role & Hierarchy |
|---|---|---|---|
| **Foundation** | **60%** | `#F8FAFC` (Canvas Light) / `#FFFFFF` (Surface) / `#090D16` (Void Dark) | **Calm Clinical Canvas**: Establishes spacious breathing room, medical cleanliness, and patient comfort. Used for page backgrounds, section canvases, and structural spacing. |
| **Secondary** | **30%** | `#022057` (Prussian Blue) & `#043388` (SS Blue) | **Structural Anchors & Trust**: Organizes layout hierarchy, card containers, navigation topbars, section headers, and corporate footer blocks. |
| **Accent** | **10%** | `#21A1F7` (Azure Blue) & `#F7E143` (Banana Yellow) | **Primary Conversion Focal Action**: High-potency focal color strictly reserved for primary conversion CTAs (`BOOK APPOINTMENT`), active nav pills, and focus rings. |

---

### 2. Strict Typography Neutral Rule (`#1C1C1C`)
- **Digital Typography Standard**: Body copy, article text, labels, table content, and headings must **strictly use Neutral Black (`#1C1C1C`)** (`--ss-neutral-black`).
- **Never Full Black for Text**: Pure black (`#000000`) causes harsh contrast strain and is **strictly prohibited for typography**. Pure black is reserved exclusively for dark surface backgrounds and high-contrast dark canvas modes.

```css
/* ✅ CORRECT */
body, h1, h2, p, .ss-label {
    color: #1C1C1C; /* var(--ss-neutral-black) */
}

/* ❌ PROHIBITED */
body, p {
    color: #000000; /* Causes visual vibration on clinical white canvases */
}
```

---

### 3. Elimination of CTA Competition
- Service category cards, informational modules, and secondary list items must **never** use solid accent backgrounds or full accent-filled buttons.
- Only the single dominant conversion action on a screen (e.g. `BOOK APPOINTMENT` or `ACCESS PORTAL`) receives the uncompromised **10% Accent** treatment.

---

### 4. Background & Logo Pairing Rule
- On all vibrant, saturated, or dark surfaces (**Malibu `#6DC6EC`**, **Azure `#21A1F7`**, **SS Blue `#043388`**, **Prussian Blue `#022057`**, and **Void Dark `#090D16`**), interfaces must strictly display the **Primary Dark Logo** (`logo_suamisihat_primary_dark.svg` featuring the white wordmark).

---

## 🎨 Curated 60:30:10 Color Schemes

The design system provides 3 production-certified color patterns engineered for clinical trust, digital conversion, and accessibility:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 1. THE CLINICAL CONVERSION (Flagship Light — Main Web & Service Verticals)             │
│ • 60% Foundation: #F8FAFC (Body Canvas) & #FFFFFF (Card Surface)                       │
│ • 30% Secondary:  #022057 (Prussian Blue) & #043388 (SS Blue Structures)               │
│ • 10% Accent:     #21A1F7 (Azure Primary Booking Action)                               │
│ • Typography:     #1C1C1C (Neutral Black body copy & headings)                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. THE EXECUTIVE DISCRETION (Signature Dark — VIP Portals & Sensitive Health Records)  │
│ • 60% Foundation: #090D16 (Void Dark) & #141414 (Surface Canvas)                       │
│ • 30% Secondary:  #0F172A (Slate 900) & #022057 (Prussian Blue Containers)             │
│ • 10% Accent:     #21A1F7 (Luminous Azure Focal Points)                                │
│ • Typography:     #FFFFFF (Pure White) & #ABABAB (Slate Muted)                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. THE CLINICAL WARMTH (Wellness & Couples Fertility Journeys)                         │
│ • 60% Foundation: #FDFCFB (Warm Ivory Canvas) & #FFFFFF (Card Surface)                 │
│ • 30% Secondary:  #022057 (Prussian Blue) & #BD9A73 (Lion Gold Trust Badges)           │
│ • 10% Accent:     #21A1F7 (Azure Primary Consultation Action)                          │
│ • Typography:     #1C1C1C (Neutral Black text)                                         │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 💼 Ecosystem Use Cases

### 1. Web & Patient Telehealth Portals
- **Doctor Consultation Booking**: High-conversion patient onboarding with frictionless scheduling flows.
- **Clinical Service Verticals**: Purpose-built visual identities for treatment funnels:
  - *Erectile Dysfunction (ED) Clinical Protocol*
  - *Men's Testosterone & Hormone Optimization*
  - *Premature Ejaculation (PE) Delay Therapy*
  - *Discreet STD / STI Screening & Lab Services*
  - *Fertility & Semen Quality Biomarkers*

### 2. Mobile Applications (Expo / React Native & Flutter)
- **Daily Vitality Companion**: Private biometric tracking, medication intake reminders, and treatment progress graphs.
- **Secure Encrypted Consultation**: End-to-end discreet messaging with certified medical practitioners.
- **Touch Targets**: Standardized 44px minimum hit targets adhering to iOS HIG and Android Material guidelines.

### 3. Windows WPF Desktop ([SS CAM Hub](https://github.com/SuamiSihat/ss_cam))
- **Creative Assets Management**: Offline-first desktop suite for internal clinic operators, designers, and marketing teams to export vector logos, generate branded collateral, and inspect token values.

### 4. Operating Sub-Brands Governance
All operating entities inherit the central token architecture while expressing unique vertical roles:
- **Androlab**: Advanced male health biomarker diagnostics and laboratory services.
- **Mensculine**: Premium wellness lifestyle, stamina formulations, and vitality nutrition.
- **MENSS**: Clinical prescription treatments and physician-guided protocols.
- **Rejal**: Traditional herbal vitality backed by modern clinical validation.
- **SS Wellness**: Holistic men's wellness, pelvic rehabilitation, and lifestyle recovery.

---

## 🎨 Master Brand Palette & Tokens

| Swatch | Color Name | Hex Code | Token | Usage |
|:---:|---|---|---|---|
| 🟦 | **Prussian Blue** | `#022057` | `--ss-prussian-blue` | Primary corporate headers, dark cards, clinical authority |
| 🔵 | **SS Blue** | `#043388` | `--ss-blue` | Primary brand identity, structural elements, nav headers |
| 🌐 | **Azure** | `#21A1F7` | `--ss-azure` | Primary 10% conversion CTA (`BOOK APPOINTMENT`), focus rings |
| 🧊 | **Malibu** | `#6DC6EC` | `--ss-malibu` | Soft highlights, active chip outlines, secondary accents |
| ⚫ | **Neutral Black** | `#1C1C1C` | `--ss-neutral-black` | **Mandatory text color** for all headings, body, and UI labels |
| 🦁 | **Lion Gold** | `#BD9A73` | `--ss-lion` | Premium certifications, doctor rating badges, warmth |
| 🍌 | **Banana Yellow** | `#F7E143` | `--ss-banana-yellow` | Dedicated high-intent CTA button background (`.ss-btn-cta`) |
| 🟡 | **Arylide Yellow** | `#E5D15C` | `--ss-arylide` | Status indicators, pending appointment tags, warnings |

---

## 🧩 UI Component Primitives

The system includes standardized Fluent 2 component primitives with WCAG AAA contrast:

### 1. Primary Action Button (`.ss-btn-primary`)
```html
<button class="ss-btn ss-btn-primary">
    <iconify-icon icon="fluent:calendar-ltr-24-filled"></iconify-icon>
    <span>Primary Action</span>
</button>
```

### 2. High-Intent Banana Yellow CTA (`.ss-btn-cta`)
```html
<button class="ss-btn ss-btn-cta">
    <iconify-icon icon="fluent:flash-24-filled"></iconify-icon>
    <span>BOOK APPOINTMENT</span>
</button>
```

### 3. Secondary & Ghost Actions
```html
<button class="ss-btn ss-btn-secondary">Secondary Action</button>
<button class="ss-btn ss-btn-ghost">Ghost Link</button>
```

---

## 📱 Multi-Platform Adapters

Design tokens follow the **W3C Design Token Community Group** standard and are exported to:

- **Web / CSS**: [`assets/css/fluent.css`](assets/css/fluent.css) & [`assets/css/dist/fluent.css`](assets/css/dist/fluent.css)
- **Design Tokens (JSON)**: [`assets/tokens/design-tokens.json`](assets/tokens/design-tokens.json)
- **TypeScript / Expo**: [`assets/tokens/ss_tokens.ts`](assets/tokens/ss_tokens.ts)
- **Flutter / Dart**: [`assets/tokens/ss_tokens.dart`](assets/tokens/ss_tokens.dart)
- **Windows WPF**: Integrated via XAML Resource Dictionaries in [SS CAM](https://github.com/SuamiSihat/ss_cam)

---

## 📁 Repository Architecture (SvelteKit 2 + Svelte 5)

```text
SS-Design-System/
├── src/                          # SvelteKit 2 / Svelte 5 Application
│   ├── app.html                  # Global HTML shell (Fonts, marked.js, mermaid.js, Iconify)
│   ├── lib/
│   │   └── components/           # Reusable living components
│   │       ├── Navbar.svelte     # Acrylic navigation with 7-item Docs dropdown & dark mode
│   │       ├── Footer.svelte     # Corporate footer with correct dark logo variant
│   │       ├── HeroBackground.svelte # Interactive particle & floating logomark canvas
│   │       ├── ColorSwatch.svelte# Interactive 60:30:10 token swatch inspector
│   │       └── BrandAssetCard.svelte # Vector asset preview & download tile
│   └── routes/                   # File-based routes & living pages
│       ├── +page.svelte          # System Home & Executive Overview
│       ├── brand-system/         # Living Brand Identity, 60:30:10 & Token Governance
│       ├── brand-guidelines/     # Clinical Brand Guidelines & PDF Catalogues
│       ├── components/           # Live Fluent 2 UI Component Library & Playground
│       ├── products/             # Product Portfolio (14 brands across 3 sections)
│       │   ├── +page.svelte      # 4-group sidebar, scroll-spy, search, & category filter
│       │   └── [slug]/           # Dynamic Sub-Product Brand Hubs (ANDROLAB, MENSS, etc.)
│       ├── doc/                  # Markdown & Interactive Mermaid Documentation Engine
│       ├── onboarding/           # Interactive Staff Onboarding Guide
│       ├── signature/            # Dynamic Email Signature Generator
│       └── tools/                # SS CAM Windows Desktop Integration
├── content/                      # Canonical Markdown Documentation Source
│   ├── changelog.md              # Authoritative System Changelog (v1.0 → v3.5)
│   ├── roadmap.md                # Strategic Milestone Roadmap
│   ├── brand-voice.md            # Clinical Tone & Copywriting Standards
│   └── vision-mission.md         # Corporate Governance & Clinical Pillars
├── static/                       # Static Public Assets (served at web root)
│   ├── public/brand/             # Official SVG logos & sub-brand marks
│   ├── products/                 # Product vector marks & packaging renders
│   └── content/                  # Synced markdown documents for client fetching
├── assets/                       # Legacy & CSS token stylesheets (fluent.css, ss_theme.css)
├── scripts/                      # Build automation & Synology NAS sync scripts
├── svelte.config.js              # SvelteKit static adapter configuration
├── vite.config.js                # Vite build configuration
└── package.json                  # Dependencies (SvelteKit, Svelte 5, Tailwind)
```

---

## 🚀 Quick Start & Build Pipeline

### 1. Local Development
```bash
# Clone the repository
git clone https://github.com/SuamiSihat/SS-Design-System.git
cd SS-Design-System

# Install build dependencies
npm install

# Start development watcher (auto-minifies CSS & JS on save)
npm run watch
```

### 2. Build for Production
```bash
# Rebuild all minified production assets
npm run build
```

### 3. Deploy to Production NAS
```bash
# Execute deployment script
powershell -ExecutionPolicy Bypass -File deploy.ps1 -Message "feat: release update"
```

---

## 🤝 Contributing & Governance

1. All new components must adhere strictly to the **60:30:10 Visual Allocation Rule** and use **Neutral Black (`#1C1C1C`)** for typography.
2. Review our [Contribution Guide](pages/doc.html?doc=contribution-guide) before opening a Pull Request.
3. Report vulnerabilities privately to **[branding@suamisihat.com](mailto:branding@suamisihat.com)**.

---

## 📄 License & Legal

Copyright © 2026 **SuamiSihat™ Holding Sdn. Bhd.** All rights reserved.  
Licensed under the [MIT License](LICENSE).

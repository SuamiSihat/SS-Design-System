# SuamiSihat™ Design System — Agent Rules

## Logo Selection Rules

### Rule 1 — Theme Mode
Always select the logo variant that matches the active UI theme:

| Theme mode | Logo file to use |
|------------|------------------|
| `light` (light mode, white/pale background) | `logo_suamisihat_primary_light.svg` |
| `dark`  (dark mode, dark/navy background)   | `logo_suamisihat_primary_dark.svg`  |

The full paths (relative to workspace root):
- Light: `public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg`
- Dark:  `public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg`

The JavaScript `ThemeManager` in `assets/js/main.js` automatically switches footer logos
when the user toggles theme. Do NOT hard-code a single logo path for any themed element.

---

### Rule 2 — Background Brightness
When placing a logo on a **static** surface (e.g. a banner, card, section hero, printed asset,
or an area that does not change with the theme toggle), choose the variant based on the
perceived brightness of the background colour:

| Background brightness | Logo file to use |
|-----------------------|------------------|
| **Light / bright** — HSL Lightness >= 50%, or colours such as white #fff, pale grey #f5f5f5, light blue #e8f0fe, etc. | `logo_suamisihat_primary_light.svg` |
| **Dark / low-brightness** — HSL Lightness < 50%, or colours such as navy #043388, dark slate #021A40, black #000, dark grey #1e1e1e, etc. | `logo_suamisihat_primary_dark.svg` |

#### How to determine brightness quickly
- **CSS custom properties**: if the surface uses `var(--color-neutral-bg-1)` or similar light-mode tokens -> use `_light.svg`. If it uses `var(--color-brand-primary)`, `var(--color-neutral-bg-dark)`, or similar dark tokens -> use `_dark.svg`.
- **Hex colour**: convert to HSL. If `L < 50` -> dark background -> use `_dark.svg`.
- **Utility function** (available in `main.js`): call `LogoSelector.forBackground('#hexColour')` which returns the correct logo path string.

---

## Logomark (Icon-only) Rules

The standalone S-shaped icon also follows brightness conventions:

| Background | Icon file |
|------------|-----------|
| Dark or coloured backgrounds | `ss-logomark-dark.svg` |
| Light or white backgrounds   | `ss-logomark-light.svg`  |

---

## Path Conventions

| Page depth | Relative prefix to `public/` |
|------------|-------------------------------|
| Root `index.html` | `public/brand/logos/...` |
| `pages/*.html` | `../public/brand/logos/...` |
| `products/*/*.html` | `../../public/brand/logos/...` |

---

## Text Color & Surface Pairing Rules

### Rule 3 — 4-Tier Text Hierarchy
The design system enforces **four levels of text emphasis** across light and dark interfaces:

| Level | Token | Light Mode HEX | Dark Mode HEX | Primary Role |
|-------|-------|----------------|---------------|--------------|
| **Level 1 — Strong** | `--text-strong` | `#000000` | `#FFFFFF` | Maximum emphasis — H1, key numbers, prices, critical CTAs. Never set long paragraphs in text-strong. |
| **Level 2 — Primary** | `--text-primary` | `#19191A` (Carbon Black) | `#FCFAF6` (Porcelain) | Default readable content — body text, H2–H6, navigation, form labels. Default to this when unsure. |
| **Level 3 — Secondary** | `--text-secondary` | `rgba(25, 25, 26, 0.65)` | `rgba(252, 250, 246, 0.65)` | Supporting metadata, timestamps, helper text, subtitles. |
| **Level 4 — Disabled** | `--text-disabled` | `rgba(25, 25, 26, 0.35)` | `rgba(252, 250, 246, 0.35)` | Inactive buttons, disabled inputs, unavailable state. |
| **Inverse** | `--text-inverse` | `#FFFFFF` | `#000000` | Text placed on inverted buttons or contrasting overlays. |

### Rule 4 — Surface & Text Pairing Matrix
Always adhere strictly to the approved surface and text pairings:

| Surface Background | Surface Role | Strong Text | Primary Text |
|--------------------|--------------|-------------|--------------|
| `#FCFAF6` | Light Mode Canvas Background | `#000000` | `#19191A` |
| `#FFFFFF` | Light Mode Elevated Card Surface | `#000000` | `#19191A` |
| `#1C1C1C` | Dark Mode Canvas Background | `#FFFFFF` | `#FCFAF6` |
| `#000000` | Dark Mode Deep Surface | `#FFFFFF` | `#FCFAF6` |

### Rule 5 — Core Art Direction Principle
> *"Black and white create emphasis. Carbon Black and Porcelain create readability."*
- Never pick an arbitrary random grey for secondary text; always use derived opacity tokens (`rgba(..., 0.65)` / `rgba(..., 0.35)`).
- Never use full black `#000000` for body paragraphs in light mode (use `#19191A`).
- Never use `#1C1C1C` text on `#1C1C1C` dark background.

---

## General Design System Rules

- All pages must use `assets/css/style.css` for global tokens and layout.
- All pages must include `assets/js/main.js` **exactly once** — never twice.
- The global site footer always uses the **full wordmark** (`logo_suamisihat_primary_*.svg`), not the logomark icon.
- The navbar/header uses the **logomark icon** (`ss-logomark-*.svg`).
- Theme switching is handled globally by `ThemeManager` in `main.js` — do not re-implement it inline.
- All typography must follow the 4-tier text token hierarchy (`--text-strong`, `--text-primary`, `--text-secondary`, `--text-disabled`).

---

## Hero & Motion Component Rules

### Rule 6 — Default Hero Component Standard (`ss-hero`)
The `ss-hero` component is the **official default background and container standard** for all hero-type banners, landing headers, and product master headers across SuamiSihat™:

| Attribute | Specification |
|-----------|---------------|
| **Component Name** | `ss-hero` (CSS: `.ss-hero` / `.f-hero`, Svelte: `<SSHero />`) |
| **60% Base Background** | Vertical / diagonal brand gradient (`--gradient-brand-vertical`: `#022057` ➔ `#043388` in light mode; `#021440` ➔ `#022057` in dark mode) |
| **30% Structure & Glow** | Ambient radial glow aura (`.f-hero-ambient-glow` with 60px blur, pulsing at 8s intervals) |
| **10% Kinetic Motion** | 2D interactive canvas wave (`#heroWaveCanvas` / `.hero-wave-canvas`) featuring floating Mars `♂` symbols, radiant Azure `#21A1F7` & Gold `#F7E143` energy nodes, and gentle cursor parallax responsiveness |
| **Motion Accessibility** | Respects `prefers-reduced-motion`; renders static glowing gradient if reduced motion is preferred |

---

## Architectural Contract & Build Rules

### Rule 7 — Brand × Fluent 2 Integration Contract
The SuamiSihat™ Design System follows a strict two-layer architectural hierarchy:

> *"Fluent 2 provides the interaction system and structural logic. SuamiSihat provides the soul, visual identity, and clinical authority."*

#### Boundary & Decision Matrix

| Design Decision | Source of Truth | Implementation Rule |
|---|---|---|
| **Brand Personality** | SuamiSihat™ | Confident, clinical, masculine, premium, discreet. |
| **Logo & Brand Marks** | SuamiSihat™ | Brightness-aware selection (`_light.svg` on HSL L ≥ 50%, `_dark.svg` on HSL L < 50%). |
| **Colour Palette** | SuamiSihat™ | Prussian Blue `#022057`, SS Blue `#043388`, Azure `#21A1F7`, Banana Yellow `#FCE53D`. |
| **Typography** | SuamiSihat™ | Outfit (Headings) + Inter (Body/UI) with 4-tier text tokens. |
| **Component Anatomy** | Fluent 2 | Standard compound slots (icon start/end, content, action, badge). |
| **Interaction States** | Fluent 2 | Rest, Hover, Pressed, Selected, Focused, Disabled state machines. |
| **Accessibility (a11y)**| Fluent 2 + WCAG | WCAG 2.2 AA compliant, 2px high-contrast offset focus rings. |
| **Motion Principles** | Fluent 2 | Fast 150ms / Medium 250ms with `cubic-bezier(0.1, 0.9, 0.2, 1.0)`. |
| **Spatial Grid** | Fluent 2 | 8px base spatial grid (`--f-space-*`) and 12-column responsive layout. |

#### System Precedence
1. **SuamiSihat Brand System** (Highest priority — colours, marks, typography, voice)
2. **SuamiSihat Design Tokens** (Semantic CSS custom properties)
3. **Fluent 2 Interaction and Component Principles** (State transitions, elevation, focus rings, accessibility)
4. **Page-Specific Requirements** (Content layouts, form flows, marketing blocks)

---

### Rule 8 — Mandatory Source of Truth Block for AI & Page Prompts
When prompting or implementing any new landing page, campaign funnel, product hub, or feature, always enforce this concise standard block to prevent prompt dilution and brand drift:

```markdown
### Design System — Mandatory Source of Truth
This page must be designed and built using the **SuamiSihat™ Brand & Design System** (`assets.suamisihat.myds.me`):
- **Visual Identity (SuamiSihat)**: Use established brand colours (`#043388`, `#022057`, `#21A1F7`, `#F7E143`), Outfit/Inter typography, 4-tier text contrast hierarchy (`--text-strong`, `--text-primary`, `--text-secondary`, `--text-disabled`), and brightness-aware SVG logo selection.
- **Interaction Layer (Fluent 2)**: All components, states (`hover`, `pressed`, `focus`), elevation levels, and spatial layouts follow Fluent 2 component specifications and accessibility contracts.
- **System Precedence**: SuamiSihat Brand DNA > Design Tokens > Fluent 2 Component Anatomy > Page Content.
```



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
| Dark or coloured backgrounds | `ss-logomark-light.svg` |
| Light or white backgrounds   | `ss-logomark-dark.svg`  |

---

## Path Conventions

| Page depth | Relative prefix to `public/` |
|------------|-------------------------------|
| Root `index.html` | `public/brand/logos/...` |
| `pages/*.html` | `../public/brand/logos/...` |
| `products/*/*.html` | `../../public/brand/logos/...` |

---

## General Design System Rules

- All pages must use `assets/css/style.css` for global tokens and layout.
- All pages must include `assets/js/main.js` **exactly once** — never twice.
- The global site footer always uses the **full wordmark** (`logo_suamisihat_primary_*.svg`), not the logomark icon.
- The navbar/header uses the **logomark icon** (`ss-logomark-*.svg`).
- Theme switching is handled globally by `ThemeManager` in `main.js` — do not re-implement it inline.

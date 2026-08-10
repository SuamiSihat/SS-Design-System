# SS Brand Logos

Official SuamiSihat brand assets. See https://suamisihat.com.my/brand-assets/ for the full kit.

---

## Logo Selection Rules

### Rule 1 — Theme Mode

Use this rule for any element that changes when the user toggles the site theme.
The `ThemeManager` in `assets/js/main.js` handles this automatically.
You can also call it manually: `LogoSelector.forTheme('dark')`.

| Theme mode | Logo file to use |
|------------|------------------|
| `light` (white / pale background) | `logo_suamisihat_primary_light.svg` |
| `dark` (dark / navy background) | `logo_suamisihat_primary_dark.svg` |

### Rule 2 — Background Brightness

Use this rule for **static surfaces** (banners, cards, heroes, print) that do not react to the theme toggle.
You can call the utility: `LogoSelector.forBackground('#hexColour')`.

| Background | HSL Lightness | Logo file to use |
|------------|---------------|------------------|
| Light / bright — white `#fff`, pale grey `#f5f5f5`, light blue `#e8f0fe` | L ≥ 50% | `logo_suamisihat_primary_light.svg` |
| Dark / dim — navy `#043388`, dark slate `#021A40`, black `#000` | L < 50% | `logo_suamisihat_primary_dark.svg` |

---

## Full Wordmark Files

| File | Background | Usage |
|------|-----------|-------|
| `00_logo_suamisihat/logo_suamisihat_primary_light.svg` | Light / white | Default for light-mode surfaces |
| `00_logo_suamisihat/logo_suamisihat_primary_dark.svg` | Dark / navy | Default for dark-mode & dark footers |
| `00_logo_suamisihat/logo_suamisihat_primary_mono.svg` | Any (monochrome) | Print / single-colour contexts |

## Logomark (Icon-only) Files

| File | Background | Usage |
|------|-----------|-------|
| `ss-logomark-light.svg` | Dark or coloured backgrounds | Navbar (dark mode), dark banners |
| `ss-logomark-dark.svg`  | Light or white backgrounds   | Navbar (light mode), white headers |

## Path Prefix by Page Depth

| Page location | Prefix |
|---------------|--------|
| Root `index.html` | `public/brand/logos/` |
| `pages/*.html` | `../public/brand/logos/` |
| `products/*/*.html` | `../../public/brand/logos/` |

---

## Sub-brand logos

Download full kits from the brand portal:
- SS Health: downloads/01_logo_ssHealth.zip
- SS Clinic: downloads/02_logo_ssClinic.zip
- SS Wellness: downloads/03_logo_ssWellness.zip
- SS Ecom: downloads/04_logo_ssEcom.zip
- SS Tech: downloads/05_logo_ssTech.zip

Contact: branding@suamisihat.com

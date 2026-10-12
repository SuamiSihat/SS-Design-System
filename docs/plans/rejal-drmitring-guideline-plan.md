# Rejal + Dr Mit Ring — Brand Master Specification

Rev. 6 · 12 Oct 2026 · Owner: SS Ecom (SSE) · v3.6.0 Phase 4 · Branch `release/v3.6.0`
This is the master spec for both product brands. Actions, regulatory risks and rollout are in `rejal-drmitring-fix-plan.md`.

## 1. Decisions log
| Date | Decision |
|---|---|
| 12 Oct | Guidelines live as site pages `/products/rejal` and `/products/drmitring` (Phase 4 standard, 7 sections). |
| 12 Oct | Rejal and Dr Mit Ring both sit under **SS Ecom (SSE)**; distributor SuamiSihat Ecommerce Sdn Bhd. |
| 12 Oct | Rejal palette follows the packaging: black, white, Rejal Blue. **Heritage Gold is a finish only** (foil, cap, seal). **No green** (would imply "organic" without certification; green belongs to Dr Mit Ring). No flat yellow. |
| 12 Oct | Rejal foil: **gold** (replaces silver; matches the gold caps and quality-seal band). |
| 12 Oct | Dr Mit Ring = **condom accessory (Path A)**; all erection/ejaculation claims removed. |
| 12 Oct | Dr Ismail Tambi removed from all assets; no individual doctor endorsement. |
| 12 Oct | Official house brand: **SuamiSihat®** (TM2023038418); symbol rules in fix plan §7. |
| 12 Oct | Unverified health/spec claims are excluded until evidenced. |
| 12 Oct | **Rejal keeps the existing packaging design**; only compliance fixes. Gold foil = optional premium finish. |
| 12 Oct | Dr Mit Ring credit line: **"Direka oleh SuamiSihat"**. |
| 12 Oct | REJAL trademark objection handled by HR. |
| 12 Oct | **Brand Guidelines v1.0 PDF** published: `static/brand-guidelines/rejal-drmitring-brand-guidelines-v1.0.pdf`. Site work: `site-update-plan.md`. |

## 2. Trademarks
| Mark | Status | Symbol |
|---|---|---|
| SS SuamiSihat (logo) | Registered, classes 16/35/41, to 17 Dec 2033; word "SuamiSihat" disclaimed; colour-limited | ® on the registered logo |
| DR MIT RING | Registered, class 10, to 20 Oct 2033 | ® |
| REJAL | Class 30, provisional refusal – hearing | ™ only |

## 3. Rejal

### 3.1 Products (print files are the source of truth for net content)
| Product | Internal name | Label / print file |
|---|---|---|
| Bawang Lanang + Madu Tualang | 35ml | RBL35, 80×26mm, "35ml" (declare net weight in g) |
| Bawang Lanang + Madu Tualang | "450ml" = 500ml jar | No print file yet; declare filled net weight in g |
| Bawang Lanang + Madu Tualang | 240G | RBL240, 200×60mm |
| Madu Tualang Asli (Hutan Pahang) | 500 | Label "500G" |
| Madu Tualang Asli (Hutan Pahang) | 1kg | RBL1K, 200×150mm, "1KG" |
| Stevia | 10ml | Box 43×43×83mm + label 73×27mm (202609_0050P V3) |

### 3.2 Visual system
- **Wordmark:** bold condensed caps "REJAL" (as filed at MyIPO), with the faint brush mark behind it on packaging.
- **Emblem:** tengkolok in a Rejal Blue disc, double white ring, Jawi arc "Kesihatan itu satu pelaburan", ribbon QUALITY | ORIGINAL (honey, Stevia) or QUALITY | NATURAL (Bawang Lanang). Premium tier: tengkolok redrawn as a vector line engraving.
- **Type:** condensed display (wordmark, product names) · wide-tracked caps (section labels) · Poppins (body).
- **Devices:** REJAL repeat texture, boxed size label with icon, cut-out ingredient photography.
- **Label layout:** left = Cara Makan / ingredients / nutrition · centre = brand · right = distributor, certificates, benefits.
- **Finishes:** matte black soft-touch stock + **gold foil emblem** on all products; premium tier (1KG honey, 500ml Bawang Lanang jar, gift box) adds spot-UV wordmark and a rigid gift box with debossed emblem; small labels (35ml, Stevia) foil only.

### 3.3 Colour — primitives
| Token | Hex | Role | Pantone (nearest Coated) | ΔE2000 |
|---|---|---|---|---|
| `rejal.black` | `#231F20` | Base of all labels | **Neutral Black C** · print as rich black 60/40/40/100 (solids), K100 (small text) | 2.8 |
| `rejal.white` | `#FFFFFF` | Type on black | Paper white / opaque white | — |
| `rejal.blue` | `#4480C2` | Emblem disc, ribbon | **PANTONE 660 C** | 1.1 |
| `rejal.blue-deep` | `#2F6DB0` | Accessible blue for text/buttons on light | **PANTONE 7683 C** | 2.5 |
| `rejal.blue-light` | `#7FAEE0` | Blue text/links on black | **PANTONE 284 C** | 3.0 |
| `rejal.gold` | `#C9A24A` | **Finish only**: foil, cap, seal, decorative rules | Foil matched to **PANTONE 871 C** (metallic); flat fallback **7407 C** | 2.4 |
| `rejal.gold-deep` | `#8A6A1F` | Gold text on light only | — | — |
| `rejal.black-raised` | `#2E2A2B` | Raised surface on black (web) | — | — |

Ratio (packaging): Black 60 · White 30 · Blue 10 · Gold = finish accent, not counted.

### 3.4 Colour — semantic (web)
| Semantic | Light | Dark | Contrast (light / dark) |
|---|---|---|---|
| `bg-canvas` | white | `rejal.black` | — |
| `bg-surface` | white | `rejal.black-raised` | — |
| `bg-inverse` | `rejal.black` | white | — |
| `fg-primary` | `rejal.black` | white | 16.3 / 16.3 |
| `fg-secondary` | black 70% | white 72% | — |
| `brand-fill` + `on-brand` | blue-deep + white | blue-deep + white | 5.34 / 5.34 |
| `link` | `blue-deep` | `blue-light` | 5.34 / 7.01 |
| `accent-graphic` | `blue` (graphics, ≥24px text only) | `blue` | 3.97 on black |
| `accent-text-gold` | `gold-deep` | `gold` | 5.05 / 6.79 |
| `finish-gold` | `gold`, decoration only, never text on light (2.4:1) | `gold` | — |
| `focus-ring` | `blue-deep` | `blue-light` | 5.34 / 7.01 |

## 4. Dr Mit Ring

### 4.1 Product
Condom accessory ("Condom Fastener"), 2 rings per pack, lime silicone ring in a foil sachet ("Asian Size"), reusable 3–5 times. Credit line: "Direka oleh SuamiSihat" (approved). Leaflet: `Dr MIT RING PACKAGING_20260520.pdf` (to be rewritten without medical claims). Box artwork file still needed.

### 4.2 Visual system
- **Wordmark:** lowercase rounded "dr mit ring", white on a black pill with a white outline; "CONDOM FASTENER" eyebrow.
- **Premium direction:** discreet matte off-white or black box, lime as the signal colour only; clean ring line drawing or macro photo replaces the cartoon fist and camouflage blobs; "2 Rings" as a small lime chip.
- **Ads:** Poppins Black headlines, black or deep-green type on off-white, real photography, pill CTAs. No brush script, no red cross layout, no yellow on lime.

### 4.3 Colour — primitives
| Token | Hex | Role | Pantone (nearest Coated) | ΔE2000 |
|---|---|---|---|---|
| `drmitring.lime` | `#6AB845` | Signal colour: ring, pill outline, accent band | **PANTONE 360 C** | 2.7 |
| `drmitring.lime-light` | `#ACCF6A` | Tints, illustration | **PANTONE 367 C** | 3.2 |
| `drmitring.green` | `#23963B` | Packaging shapes; white text large only | **PANTONE 355 C** (alt. 7740 C) | 2.2 |
| `drmitring.green-aa` | `#1A7A30` | White text, buttons, links on light | **PANTONE 356 C** | 1.4 |
| `drmitring.black` | `#1C1C1C` | Text, wordmark pill | **Neutral Black C** | 2.1 |
| `drmitring.canvas` | `#FBFBFB` | Off-white canvas | Paper white | — |
| `drmitring.yellow` | `#FFE53B` | Count chip / highlight on dark only | **PANTONE 102 C** | 2.1 |

Ratio (web): Canvas 60 · Black 30 · Lime 10.

### 4.4 Colour — semantic (web)
| Semantic | Light | Dark | Contrast (light / dark) |
|---|---|---|---|
| `bg-canvas` | canvas | black | — |
| `fg-primary` | black | canvas | 16.47 / 16.47 |
| `brand-fill` + `on-brand` | lime + black | lime + black | 6.94 / 6.94 |
| `brand-fill-strong` + `on-brand-strong` | green-aa + white | green-aa + white | 5.43 / 5.43 |
| `link` | `green-aa` | `lime` | 5.24 / 6.94 |
| `accent-graphic` | lime | lime | — |
| `highlight` | yellow, on black only | yellow | — / 13.41 |
| `focus-ring` | `green-aa` | `lime` | 5.24 / 6.94 |

Never: white on lime (2.45:1), yellow on lime (1.93:1), small white text on `green` (3.82:1).

## 5. Tokens file
`static/assets/tokens/product-brands.tokens.json` (DTCG format, same conventions as `tokens.json`): primitives under `color.product.{rejal|drmitring}`, semantic sets under `.semantic.{light|dark}` as aliases, with Pantone/ΔE in `$extensions.com.suamisihat.print` and contrast in `$extensions.com.suamisihat.contrast`. To do: wire it into the build alongside `tokens.json` and generate CSS variables (`--rejal-fg-primary`, etc.).

**Pantone note:** matches are nearest Coated values by ΔE2000 against Pantone's published sRGB. Confirm against a physical Pantone Formula Guide and a printer drawdown on the actual label stock before production. ΔE under 2 is generally an indistinguishable match; 2–3.5 is close.

## 6. Logo assets
`static/products/Rejal/logos/`: `rejal-wordmark-white.svg`, `rejal-wordmark-black.svg` (vector, from RBL1K), `rejal-emblem-quality-original-on-dark.svg` (vector frame + raster tengkolok; dark backgrounds only), plus low-res PNGs (tengkolok 227×154, badge, background mark). Needed: high-res/vector tengkolok, QUALITY | NATURAL variant, light-background emblem, Dr Mit Ring box artwork and vector wordmark.

## 7. Page sections (both brands, required)
1. Product definition · 2. Product images · 3. Positioning and voice · 4. Colour (primitives, semantic, Pantone, 60:30:10) · 5. Pattern / graphic device · 6. Brand guideline (logo variants, clear space, minimum size, do/don't, type, packaging layout, finishes) · 7. Downloads.

## 8. Open items
- Filled net weights (g): Bawang Lanang 35ml and 500ml jar.
- High-res tengkolok; Dr Mit Ring box artwork; font names.

# assets.suamisihat.myds.me — Site Update Plan (Rejal + Dr Mit Ring)

12 Oct 2026 · Release v3.6.0 · Branch `release/v3.6.0` · Repo SuamiSihat/SS-Design-System (SvelteKit)
Source of truth: `rejal-drmitring-guideline-plan.md` (master spec) and the PDF `static/brand-guidelines/rejal-drmitring-brand-guidelines-v1.0.pdf`. This plan slots into Phase 4 of `v3.6.0-remediation-plan.md`.

## Decisions applied
- Rejal: **existing packaging design retained**; site documents it as-is. Gold foil is an optional premium finish only.
- Dr Mit Ring: condom accessory (Path A); credit line **"Direka oleh SuamiSihat"**; Dr Ismail Tambi removed.
- House brand: **SuamiSihat®** (logo), **Dr Mit Ring®**, **Rejal™**.
- REJAL trademark objection: handled by HR (no site work).
- Bawang Lanang net weights: shown as "TBC" until weighed.

## Step 1 — Urgent content clean-up (day 1, can ship as a hotfix)
| File | Change |
|---|---|
| `static/products/DrMitRing/description.md` | Rewrite as condom accessory; remove Dr Ismail Tambi, "Mechanical Erection Support", "6–7 sessions", "Bukan Ubat" claims |
| `static/products/DrMitRing/metadata.json` | tagline "Condom Fastener · Direka oleh SuamiSihat"; ownership tags `["SS Ecom"]`; remove "Dr. Ismail Tambi Lineage"; colours from tokens |
| `static/products/DrMitRing/banner.svg` | Remove "By Dr. Ismail Tambi"; black text on lime (white on lime fails) |
| `static/content/products/drmitring.md` | Remove patent/medical-silicone/erection/venous copy |
| `static/products/Rejal/metadata.json` | tagline "Heritage superfoods · Kesihatan itu satu pelaburan"; ownership `["SS Ecom"]`; remove "Clinical Aesthetic" + SS Clinic; black/blue hero |
| `static/products/Rejal/description.md`, `static/content/products/rejal.md` | Correct sizes (35ml mini jar, 240 g, 500ml jar, 500 g, 1 kg, Stevia 10 ml); remove SAC 600%, LDL, TPC/diastase, "Apple-grade", gold foil/holographic seal claims |
| Root duplicates (`products/`, `content/`, `public/`) and `src/routes/products/[slug]/+page.js` | Same edits, or delete duplicates per remediation step 3 |
| Repo-wide | `grep -ri "ismail\|tambi"` must return 0 hits (excluding git history) |

## Step 2 — Tokens wired into the build (days 2–3)
- Add `static/assets/tokens/product-brands.tokens.json` to the token build next to `tokens.json`.
- Generate CSS custom properties scoped by brand and theme:
  `[data-brand="rejal"]{--fg-primary:…;--brand-fill:…}` and `[data-brand="rejal"][data-theme="dark"]{…}`; same for `drmitring`.
- Product page root sets `data-brand` from the slug, so components keep using semantic names (`--fg-primary`, `--brand-fill`, `--link`, `--focus-ring`).
- CI contrast matrix (remediation step 13) includes both brand scopes in light and dark.

## Step 3 — Product page template (days 3–6)
`src/routes/products/[slug]/+page.svelte` renders 7 required sections; the build fails if any is missing in `metadata.json`:
1. **Product definition**: what it is / is not, range table (sizes, net content, print file), owner SSE.
2. **Product images**: real photos only (gallery from `metadata.json`); remove AI renders.
3. **Positioning & voice**: personality tags, Use / Never copy lists.
4. **Colour**: swatches with hex, RGB, Pantone, ΔE, 60:30:10 bar, approved and forbidden pairings (rendered from tokens, not hard-coded).
5. **Pattern / graphic devices**: Rejal label anatomy, size box, repeat texture; Dr Mit Ring pill, descriptor, lime band.
6. **Brand guideline**: logo variants, clear space, minimum size, don'ts, typography, trademark symbol rule, finishes.
7. **Downloads**: logo zip, label PDFs, brand guideline PDF.

Add a **"Claims & compliance"** callout block (both brands) linking to the PDF's A10 / B8 pages.

## Step 4 — Assets & downloads (days 4–6)
| Brand | Add | Remove / rename |
|---|---|---|
| Rejal | `rejal-wordmark-white.svg`, `rejal-wordmark-black.svg`, `rejal-emblem-quality-original-on-dark.svg` (in repo), label PDFs RBL35 / RBL240 / RBL1K / Stevia 0050P V3, product cut-outs (honey bottles, mini jar, 250g jar) | Old `logo_rejal.svg` (replace), `[product]` filename, old RBL25/RBL250/RBL500 if superseded, AI renders |
| Dr Mit Ring | Product photos (concrete flat-lay, box, ring + sachet), `logo_drmitring.svg` | Old leaflet PDF from public downloads until rewritten |
| Both | `rejal-drmitring-brand-guidelines-v1.0.pdf` (in `static/brand-guidelines/`) | — |
- Generate WebP display variants (remediation step 9); keep originals for download.
- Logo zips: `rejal-logos.zip`, `drmitring-logos.zip`.

## Step 5 — Site-wide brand updates (days 5–7)
- Replace "SuamiSihat™" with the ® rules: ® on the registered colour logo and at first text mention per page; no ® on mono/reversed logos or sub-brand logos.
- Products index (`/products`): Rejal and Dr Mit Ring cards under **SS Ecom**, correct taglines, brand colours from tokens.
- Brand architecture diagram: show SSE → Rejal, Dr Mit Ring.
- Changelog v3.6.0 entry: "Rejal & Dr Mit Ring guidelines v1.0; product tokens; Dr Mit Ring repositioned as condom accessory; Ismail Tambi references removed".

## Step 6 — Verify & release (days 7–8)
- [ ] `grep -ri "ismail\|tambi\|erection\|ereksi\|ejaculat\|pancut\|organic\|SAC\|LDL"` on content returns 0 (except the guideline "Never" lists)
- [ ] Both product pages pass axe / pa11y, light and dark
- [ ] Contrast matrix passes for `rejal` and `drmitring` scopes
- [ ] All 7 sections present; build guard works (remove one section, so the build fails)
- [ ] Downloads open; PDF and SVGs served with correct MIME types
- [ ] ® / ™ usage spot-check on home, products, product pages
- [ ] Manual review on the live URL (desktop + mobile), then tag v3.6.0

## Dependencies / waiting on
- Filled net weights (g) for Bawang Lanang mini jar and 500ml jar (shown as TBC until then).
- Vector tengkolok + light-background emblem (Rejal page shows dark-only emblem meanwhile).
- Dr Mit Ring box artwork source + rewritten leaflet (page shows current box photo with "update in progress" note).
- Device shell on the dev PC: the local shell (device_bash) has been failing; repo-wide grep and build need it working or a local run.

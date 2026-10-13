# SS Clinic drafts (Phase 2, workstream G)

Status: draft, 13 Oct 2026. Nothing here is served or built. Files:

- `metadata.draft.json`: schema 2 draft for `static/products/SsClinic/metadata.json`.
- This README: exposure audit, what is blocked and why.

## What the draft covers

| Section | State |
| --- | --- |
| 1 Definition | Drafted from `content/sub-brands/ss-clinic.md`. Registration and mark status TBC. |
| 2 Images | Logo kit (primary and secondary, light and dark). Real clinic photography TBC (consent). |
| 3 Positioning | Core directive, promise, tagline ladder levels 1, 2 and 4. Level 3 held back: several lines imply performance outcomes. Whole section waits on regulatory review (decision 10). |
| 4 Colour | Placeholder using the clinic file palette. Blocked on decision 8. |
| 5 Pattern | TBC. No approved pattern. |
| 6 Guideline | Do/don't, grid, photography drafted. Typeface set to Poppins. Clear space and minimum size TBC. |
| 7 Downloads | Logo ZIP exists. Guideline PDF TBC. |

Validator result on the draft (`validateProduct`): fails only on the pattern (no file, no usage rules) and the not-yet-existing PDF. So publishing needs either an approved pattern or a schema change that allows a TBC pattern.

## Findings that need a decision

1. **Colour sources: SETTLED (decision 8, 13 Oct 2026).** Foundation 60% Prussian Navy `#022057`; Structure 30% Pure White `#FFFFFF` and Clinical Navy `#0F4C75`; Accent 10% Warm Clinic Gold `#F4A261` (7.56:1 AAA on Prussian Navy) and Azure Energy `#21A1F7`. Both `static/content/clinic-positioning.md` and `docs/drafts/ss-clinic/metadata.draft.json` are synchronized to this palette.
2. **Typeface: resolved.** Decision 1 is Poppins (13 Oct 2026). The playbook, brand-system page, signatures and markdown CSS now say Poppins.
3. **Tagline level 3** (treatment-specific lines) reads as performance claims. Hold for regulatory.

## Playbook split: applied (decision 9, 13 Oct 2026)

`static/content/clinic-positioning.md` is now brand-level only: brand summary, tagline table (levels 1, 2 and 4), core verbal assets, the designer's field guide (colour, type, grid, photography, with doctor names removed) and the voice matrix.

Everything else moved to `docs/staff/clinic-playbook-staff.md`, which is outside `static/`, so it is not built, served, indexed or put in a PDF: competitor table with ad volumes and tracking IDs, positioning map, market moats, tagline level 3 and the empathy and outro hooks, regulatory guardrails, regional playbooks, swipe files, brand chorus, video playbook and the 100-point review gate.

Open: how staff reach the staff-only file (repo access only today). A gated route or separate share is a follow-up.

The colour hex values in the public field guide (`#022057`, `#0F4C75`, `#F4A261`) are now locked per decision 8.

## Current status

- Per-brand PDF generator: delivered via `scripts/make_brand_pdfs.py` (`npm run generate:pdfs`).
- SS Clinic PDF: after regulatory review.
- Marks sweep: blocked on decision 3.
- Catalogue card and ANDROLAB RX and MENSS links: implemented per decision 11.

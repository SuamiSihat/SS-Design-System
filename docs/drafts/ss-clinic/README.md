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
| 6 Guideline | Do/don't, grid, photography drafted. Typeface TBC (decision 1). Clear space and minimum size TBC. |
| 7 Downloads | Logo ZIP exists. Guideline PDF TBC. |

Validator result on the draft (`validateProduct`): fails only on the pattern (no file, no usage rules) and the not-yet-existing PDF. So publishing needs either an approved pattern or a schema change that allows a TBC pattern.

## Findings that need a decision

1. **Colour sources disagree.** The clinic file says Deep Navy `#0F4C75`. The playbook says Prussian `#022057` as the 60% base, with `#0F4C75` as an alternate. Warm Gold `#F4A261` on `#0F4C75` is 4.41:1, which fails AA for body text (fine for large text and shapes). On `#022057` it is 7.56:1. Decision 8 should settle one set.
2. **Typeface conflict.** The playbook names Outfit as display font; decision 1 recommends Poppins, which is what the site already loads.
3. **Tagline level 3** (treatment-specific lines) reads as performance claims. Hold for regulatory.

## Exposure audit: `static/content/clinic-positioning.md` is public

The Docs reader serves this whole file at `/doc/?doc=clinic-positioning` and it is listed in the doc index and search. Content that decision 9 says must be staff-only is currently visible:

| What | Where (line) |
| --- | --- |
| Competitor table: 8 named competitors, ad volumes, GTM and Google Ads tracking IDs, including SS Clinic's own ID | 23 to 40 |
| Positioning map naming competitors | 44 to 66 |
| Doctor names (Dr Amir, Dr Rak, Dr Zakwan, Hafizzul) in photography, regional playbooks, scripts and Brand Chorus | 253, 311 to 355, 367, 413, 440 to 480 |
| Regional playbooks, swipe files, video playbook, 100-point review gate | 307 to 548, 548 to 622 |

This is already live in v3.6.0 (and v3.6.1). The site sits behind the server login, so exposure is to staff and partners with that login, not the open web. Still, the plan's rule is that none of this reaches an open page or PDF.

Proposed split, to apply once decision 9 is confirmed:

- Public `clinic-positioning.md`: executive summary without the table, tagline ladder (after review), designer's field guide with doctor names removed.
- Staff-only `clinic-playbook-staff.md`, kept outside `static/` (for example under `docs/staff/`) and not in the doc index or search index: competitor table, positioning map, regional playbooks, swipe files, video playbook, review gate.

I have not moved anything yet because decision 9 is open.

## Not drafted, and why

- Per-brand PDF generator: the plan says it was delivered in the audit session, but it is not in this repo. Needs to be added from that session.
- SS Clinic PDF: after regulatory review.
- Marks sweep: blocked on decision 3.
- Catalogue card and ANDROLAB RX and MENSS links: blocked on decision 11.

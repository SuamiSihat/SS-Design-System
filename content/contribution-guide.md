# Contribution Guide

The SS Design System is a living document. It grows with us — and we genuinely welcome input from the people who use it every day.

---

## How to Request a Change

Whether you've spotted an inconsistency, need a new component, or want to update copy — here's how to flag it.

### Option 1 — Email Us

The quickest way. Drop us a note at [branding@suamisihat.com](mailto:branding@suamisihat.com) with:

- **What** needs to change (be specific — include a section name or screenshot)
- **Why** it matters (design rationale, user feedback, new use case)
- **What you suggest** (rough idea is fine — we'll refine together)

We aim to respond within 24–48 hours.

### Option 2 — Edit a Markdown File

If you have access to the repository, content-only changes (copy, descriptions, examples) can be made directly in the `/content/` directory.

```
content/
├── vision-mission.md
├── introduction.md
├── changelog.md
├── contribution-guide.md   ← you are here
└── sub-brands/
    ├── ss-health.md
    ├── ss-clinic.md
    └── ...
```

> **Note:** Markdown files are for documentation and copy only. Visual/structural changes to the design system itself require review by the brand team.

---

## What We Accept

| Type | Process |
|---|---|
| Copy edits, typo fixes | Direct edit to `/content/*.md` |
| New section content | Email + review |
| New colour tokens | Brand team approval required |
| New components | Design review + implementation |
| Logo variants | Strict brand approval — do not create without sign-off |

---

## What to Avoid

- **Do not** create new logo files, colour swatches, or type treatments without brand team approval
- **Do not** apply logo modifications, effects, or distortions — ever
- **Do not** use brand assets outside approved formats or contexts
- **Do not** share internal design files or source assets externally

---

## Code Contributions

For developers working within SuamiSihat systems:

- All design token changes must be made in `assets/css/ss_theme.css`
- Component styles live in `assets/css/style.css`
- New markdown docs go in `/content/` — register the slug in `markdown-loader.js`'s `ALLOWED_DOCS` array

---

*Questions? [branding@suamisihat.com](mailto:branding@suamisihat.com)*

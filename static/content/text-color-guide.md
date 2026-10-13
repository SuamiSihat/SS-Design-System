# Text colours

Which colour should my text be? This page gives a simple answer. There are four levels of text, and each has one job.

**If you are unsure, use the Normal text colour.**

---

## The four levels

| Level | Light background | Dark background | Use it for |
|---|---|---|---|
| **Strong** | `#000000` | `#FFFFFF` | Main headlines, key figures, prices. Short and important only |
| **Normal** | `#19191A` | `#FCFAF6` | Almost everything else: body text, smaller headings, menus, buttons, form labels |
| **Quiet** | Normal at 65% strength | Normal at 65% strength | Dates, captions, helper notes, supporting lines |
| **Switched off** | Normal at 35% strength | Normal at 35% strength | Buttons and fields that cannot be used right now |

One more case: **text on a dark button or dark panel** is white (`#FFFFFF`), and **text on a light button on a dark page** is black (`#000000`).

**Do not** set a whole article or long paragraph in Strong. When everything is shouting, nothing stands out.

---

## Approved pairs

Use only these text and background pairs. Each one is checked so it is easy to read.

| Background | Strong text | Normal text |
|---|---|---|
| `#FCFAF6` (page, light) | `#000000` | `#19191A` |
| `#FFFFFF` (cards, light) | `#000000` | `#19191A` |
| `#1C1C1C` (page, dark) | `#FFFFFF` | `#FCFAF6` |
| `#000000` (deep panels, dark) | `#FFFFFF` | `#FCFAF6` |

Never use a page colour as text colour on its own background. For example, do not put `#FCFAF6` text on a light page or `#1C1C1C` text on a dark page.

**The art direction rule:** black and white give emphasis. The softer Carbon Black and Porcelain give comfortable reading.

---

## Light and dark pages

| | Light page | Dark page |
|---|---|---|
| Page background | `#FCFAF6` | `#1C1C1C` |
| Raised surface (cards) | `#FFFFFF` | `#000000` |
| Strong text | `#000000` | `#FFFFFF` |
| Normal text | `#19191A` | `#FCFAF6` |

---

## For developers

These are the same rules as CSS names. Use the names, not the raw colour codes.

```css
:root {
  /* Light */
  --text-strong: #000000;
  --text-primary: #19191a;
  --text-secondary: rgba(25, 25, 26, 0.65);
  --text-disabled: rgba(25, 25, 26, 0.35);
  --surface-canvas: #fcfaf6;
  --surface-elevated: #ffffff;
}

[data-theme="dark"] {
  --text-strong: #ffffff;
  --text-primary: #fcfaf6;
  --text-secondary: rgba(252, 250, 246, 0.65);
  --text-disabled: rgba(252, 250, 246, 0.35);
  --surface-canvas: #1c1c1c;
  --surface-elevated: #000000;
}
```

| Name | Level |
|---|---|
| `--text-strong` | Strong |
| `--text-primary` | Normal |
| `--text-secondary` | Quiet. Do not pick another grey. Use this name |
| `--text-disabled` | Switched off |
| `--text-inverse` | Text on dark buttons and panels (white in light mode, black in dark mode) |

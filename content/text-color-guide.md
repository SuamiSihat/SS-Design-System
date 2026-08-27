# Text Color Usage Guide

## Purpose

This palette uses **four levels of text emphasis** across light and dark interfaces.

**Core rule:** Do not treat every colour as a text colour. Each token has a specific hierarchy role.

---

# 1. Text Color Tokens

| Token | Hex (Light / Dark) | Primary Role |
|---|---|---|
| `--text-strong` | `#000000` / `#FFFFFF` | Maximum emphasis — H1, key numbers, critical CTAs |
| `--text-primary` | `#19191A` / `#FCFAF6` | Standard readable content — body, labels, navigation |
| `--text-inverse` | `#FFFFFF` / `#000000` | Text on inverse surfaces (dark buttons, light overlays) |
| `--text-disabled` | Derived token (35% opacity) | Disabled or unavailable actions / fields |

---

# 2. Light Mode

### Base Surfaces

- **Background (Canvas):** `#FCFAF6`  
- **Elevated Surface:** `#FFFFFF`

| Hierarchy | Color | Usage |
|---|---|---|
| **Strong** | `#000000` | H1, key numbers, critical emphasis |
| **Primary** | `#19191A` | Body text, navigation, labels |
| **Inverse** | `#FFFFFF` | Text on black buttons or dark surfaces |
| **Avoid** | `#FCFAF6` | Normal text on light backgrounds |

### Recommended hierarchy

```text
#000000  TEXT STRONG
#19191A  Text Primary

#FCFAF6  Surface / Canvas
#FFFFFF  Elevated Surface
```

### Example

# Heading in `#000000`

Body text uses `#19191A` for comfortable reading and reduced visual aggression.

---

# 3. Dark Mode

### Base Surfaces

- **Background (Canvas):** `#1C1C1C`  
- **Deep Surface:** `#000000`

| Hierarchy | Color | Usage |
|---|---|---|
| **Strong** | `#FFFFFF` | H1, key numbers, critical emphasis |
| **Primary** | `#FCFAF6` | Body text, navigation, labels |
| **Inverse** | `#000000` | Text on light buttons or surfaces |
| **Avoid** | `#1C1C1C` | Normal text on dark backgrounds |

### Recommended hierarchy

```text
#FFFFFF  TEXT STRONG
#FCFAF6  Text Primary

#1C1C1C  Surface / Canvas
#000000  Deep Surface
```

---

# 4. Hierarchy Rules

## Level 1 — Strong

Use only when the content needs immediate attention.

- **Light:** `#000000`  
- **Dark:** `#FFFFFF`

### Use for:
- H1 and major headings
- Key statistics
- Prices
- Important numbers
- Critical actions
- Short emphasis

**Do not:** Set an entire article or long paragraph in `text-strong`. It destroys hierarchy.

---

## Level 2 — Primary

This is the default reading colour.

- **Light:** `#19191A`  
- **Dark:** `#FCFAF6`

### Use for:
- Body text
- H2–H6
- Navigation
- Buttons
- Form labels
- Descriptions
- Long-form content

**Rule:**
> If you're unsure which text colour to use, use `text-primary`.

---

## Level 3 — Inverse

Used when text sits on the opposite tonal environment.

| Surface | Text |
|---|---|
| `#000000` | `#FFFFFF` or `#FCFAF6` |
| `#FFFFFF` | `#19191A` or `#000000` |
| `#1C1C1C` | `#FCFAF6` |
| `#FCFAF6` | `#19191A` |

### Example

```text
BLACK BUTTON
──────────────────
Continue
#FFFFFF
──────────────────
#000000
```

---

# 5. Text Pairing Matrix

| Background | Strong Text | Primary Text |
|---|---|---|
| `#FCFAF6` | `#000000` | `#19191A` |
| `#FFFFFF` | `#000000` | `#19191A` |
| `#1C1C1C` | `#FFFFFF` | `#FCFAF6` |
| `#000000` | `#FFFFFF` | `#FCFAF6` |

This should be treated as the **approved pairing matrix**.

---

# 6. Recommended Design Tokens

```css
:root {
  /* LIGHT MODE */
  --text-strong: #000000;
  --text-primary: #19191a;
  --surface-canvas: #fcfaf6;
  --surface-elevated: #ffffff;
}

[data-theme="dark"] {
  /* DARK MODE */
  --text-strong: #ffffff;
  --text-primary: #fcfaf6;
  --surface-canvas: #1c1c1c;
  --surface-elevated: #000000;
}
```

---

# 7. Missing Layer: Secondary Text

## Failure mode

Your current palette does **not** provide a proper secondary text colour.

Do **not** solve this by randomly selecting another grey.

Use opacity or derived semantic tokens.

### Recommended starting point

```css
/* Light */
--text-secondary: rgba(25, 25, 26, 0.65);

/* Dark */
--text-secondary: rgba(252, 250, 246, 0.65);
```

### Use for:
- Metadata
- Dates
- Helper text
- Secondary labels
- Supporting descriptions

### Disabled

```css
/* Light */
--text-disabled: rgba(25, 25, 26, 0.35);

/* Dark */
--text-disabled: rgba(252, 250, 246, 0.35);
```

---

# 8. The System in One Diagram

```text
LIGHT MODE
════════════════════════════════

#000000  ████  Strong
#19191A  ████  Primary
────────────────────────────────
#FCFAF6        Canvas
#FFFFFF        Elevated Surface


DARK MODE
════════════════════════════════

#FFFFFF  ████  Strong
#FCFAF6  ████  Primary
────────────────────────────────
#1C1C1C        Canvas
#000000        Deep Surface
```

## Final Art Direction Rule

> **Black and white create emphasis. Carbon Black and Porcelain create readability.**

This gives the system a clean hierarchy:

- **Strong → `#000000 / #FFFFFF`**  
- **Primary → `#19191A / #FCFAF6`**  
- **Secondary → Derived from Primary (65% opacity)**  
- **Disabled → Derived from Primary (35% opacity)**

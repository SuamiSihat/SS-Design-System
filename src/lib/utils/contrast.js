/**
 * WCAG 2.x contrast helpers shared by the UI and the contrast test.
 */

/** Relative luminance of a #RRGGBB colour. */
export function luminance(hex) {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Contrast ratio between two #RRGGBB colours (1 to 21). */
export function contrastRatio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * APCA lightness contrast (Lc) of text on a background, both #RGB or #RRGGBB.
 * Implements APCA-W3 0.0.98G-4g. Positive for dark text on a light background,
 * negative for light text on a dark background; compare Math.abs(Lc) with the levels below.
 * Returns null for an invalid colour.
 */
export function apcaContrast(textHex, bgHex) {
  const Y = (hex) => {
    const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
    if (!m) return null;
    const h = m[1].length === 3 ? [...m[1]].map((c) => c + c).join('') : m[1];
    const [r, g, b] = [0, 2, 4].map((i) => (parseInt(h.slice(i, i + 2), 16) / 255) ** 2.4);
    const y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
    return y > 0.022 ? y : y + (0.022 - y) ** 1.414; // soft clamp near black
  };
  const txt = Y(textHex);
  const bg = Y(bgHex);
  if (txt === null || bg === null) return null;
  if (Math.abs(bg - txt) < 0.0005) return 0;
  if (bg > txt) {
    const sapc = (bg ** 0.56 - txt ** 0.57) * 1.14;
    return sapc < 0.1 ? 0 : (sapc - 0.027) * 100;
  }
  const sapc = (bg ** 0.65 - txt ** 0.62) * 1.14;
  return sapc > -0.1 ? 0 : (sapc + 0.027) * 100;
}

/**
 * APCA Bronze (simple mode) use levels, highest first. A level applies when
 * Math.abs(Lc) is at least its min.
 */
export const APCA_LEVELS = [
  { min: 90, label: 'Preferred for body text' },
  { min: 75, label: 'Body text (minimum)' },
  { min: 60, label: 'Content text, 24px or 16px bold and up' },
  { min: 45, label: 'Headlines and large text only' },
  { min: 30, label: 'Placeholder, disabled and spot text only' },
  { min: 15, label: 'Non-text elements only' },
  { min: 0, label: 'Not readable' }
];

/**
 * Text colour for a solid background: Neutral Black or white, whichever
 * has the higher contrast. Used for colour swatches and brand tiles.
 */
export function readableTextOn(bg, dark = '#1C1C1C', light = '#FFFFFF') {
  return contrastRatio(bg, dark) >= contrastRatio(bg, light) ? dark : light;
}

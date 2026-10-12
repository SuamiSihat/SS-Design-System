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
 * Text colour for a solid background: Neutral Black or white, whichever
 * has the higher contrast. Used for colour swatches and brand tiles.
 */
export function readableTextOn(bg, dark = '#1C1C1C', light = '#FFFFFF') {
  return contrastRatio(bg, dark) >= contrastRatio(bg, light) ? dark : light;
}

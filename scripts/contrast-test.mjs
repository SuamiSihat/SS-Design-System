/**
 * Token contrast matrix.
 * Resolves the semantic colour tokens in static/assets/css/fluent.css for light and
 * dark theme and checks every text/surface pairing the design system promises.
 * Product brand pairings declared in static/products/<Brand>/metadata.json are checked too.
 *
 * Usage: node scripts/contrast-test.mjs
 */

import { readFileSync } from 'fs';
import { contrastRatio, apcaContrast } from '../src/lib/utils/contrast.js';
import { loadProducts } from './product-schema.mjs';

const css = readFileSync(new URL('../static/assets/css/fluent.css', import.meta.url), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '');

function vars(text) {
  const out = {};
  for (const m of text.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

// Every :root block, merged in order, is the light theme. Dark adds its overrides.
const light = {};
let from = 0;
while (true) {
  const i = css.indexOf(':root', from);
  if (i < 0) break;
  Object.assign(light, vars(blockAt(i)));
  from = i + 5;
}
const dark = { ...light, ...vars(blockAt(css.indexOf('[data-theme="dark"] {'))) };

function blockAt(i) {
  const open = css.indexOf('{', i);
  let depth = 0;
  for (let j = open; j < css.length; j++) {
    if (css[j] === '{') depth++;
    if (css[j] === '}' && --depth === 0) return css.slice(open + 1, j);
  }
  return '';
}

function resolve(theme, value, seen = new Set()) {
  const v = value.trim();
  const ref = v.match(/^var\((--[\w-]+)(?:\s*,\s*(.+))?\)$/);
  if (ref) {
    if (seen.has(ref[1])) throw new Error(`Cycle at ${ref[1]}`);
    seen.add(ref[1]);
    if (theme[ref[1]] !== undefined) return resolve(theme, theme[ref[1]], seen);
    if (ref[2]) return resolve(theme, ref[2], seen);
    throw new Error(`Undefined token ${ref[1]}`);
  }
  return v;
}

function toRgba(c) {
  if (c.startsWith('#')) {
    const h = c.slice(1).length === 3 ? c.slice(1).split('').map((x) => x + x).join('') : c.slice(1, 7);
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), 1];
  }
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (!m) throw new Error(`Unsupported colour: ${c}`);
  const [r, g, b, a = '1'] = m[1].split(',').map((s) => s.trim());
  return [Number(r), Number(g), Number(b), Number(a)];
}

const hex = ([r, g, b]) => '#' + [r, g, b].map((n) => Math.round(n).toString(16).padStart(2, '0')).join('');
function flatten(color, under) {
  const [r, g, b, a] = toRgba(color);
  const [R, G, B] = toRgba(under);
  return hex([r * a + R * (1 - a), g * a + G * (1 - a), b * a + B * (1 - a)]);
}

// [text token, surface token, minimum ratio, note]
const PAIRS = [
  ['--text-strong', '--surface-canvas', 4.5],
  ['--text-primary', '--surface-canvas', 4.5],
  ['--text-secondary', '--surface-canvas', 4.5],
  ['--color-neutral-fg-1', '--color-neutral-bg-2', 4.5],
  ['--color-neutral-fg-2', '--color-neutral-bg-2', 4.5],
  ['--color-neutral-fg-3', '--color-neutral-bg-2', 4.5],
  ['--color-neutral-fg-3', '--surface-canvas', 4.5],
  ['--color-link', '--surface-canvas', 4.5],
  ['--color-link', '--color-neutral-bg-2', 4.5],
  ['--color-text-accent', '--surface-canvas', 4.5],
  ['--color-text-warm', '--surface-canvas', 4.5],
  ['--color-on-action', '--color-action-bg', 4.5],
  ['--color-on-action', '--color-action-bg-hover', 4.5],
  ['--color-on-cta', '--color-cta-bg', 4.5],
  ['--color-success-fg', '--color-success-bg', 4.5],
  ['--color-warning-fg', '--color-warning-bg', 4.5],
  ['--color-error-fg', '--color-error-bg', 4.5],
  ['--color-info-fg', '--color-info-bg', 4.5],
  ['--color-brand-primary', '--color-brand-subtle', 4.5],
  ['--color-focus-ring', '--surface-canvas', 3.0]
];

let failed = 0;
let total = 0;

function check(themeName, theme) {
  const canvas = resolve(theme, theme['--surface-canvas']);
  for (const [fgTok, bgTok, min] of PAIRS) {
    total++;
    const bgRaw = resolve(theme, theme[bgTok] ?? `var(${bgTok})`);
    const bg = flatten(bgRaw, canvas);
    const fg = flatten(resolve(theme, theme[fgTok] ?? `var(${fgTok})`), bg);
    const ratio = contrastRatio(fg, bg);
    const ok = ratio >= min;
    if (!ok) failed++;
    console.log(`${ok ? 'PASS' : 'FAIL'} [${themeName}] ${fgTok} on ${bgTok}: ${fg} / ${bg} = ${ratio.toFixed(2)} (min ${min})`);
  }
}

check('light', light);
check('dark', dark);

// Product brand pairings
for (const p of loadProducts()) {
  for (const pair of p.data.colorScheme?.pairings ?? []) {
    total++;
    const ratio = contrastRatio(pair.text, pair.background);
    const min = pair.largeTextOnly ? 3 : 4.5;
    const ok = ratio >= min;
    if (!ok) failed++;
    console.log(`${ok ? 'PASS' : 'FAIL'} [${p.slug}] ${pair.text} on ${pair.background}: ${ratio.toFixed(2)} (min ${min}) ${pair.use ?? ''}`);
  }
}

// APCA implementation against the APCA-W3 0.0.98G-4g reference values
for (const [text, bg, expected] of [
  ['#000000', '#FFFFFF', 106.04],
  ['#FFFFFF', '#000000', -107.88],
  ['#888888', '#FFFFFF', 63.06],
  ['#FFFFFF', '#888888', -68.54],
  ['#000000', '#AAAAAA', 58.15],
  ['#AAAAAA', '#000000', -56.24],
  ['#112233', '#DDEEFF', 91.67],
  ['#DDEEFF', '#112233', -93.07]
]) {
  total++;
  const lc = apcaContrast(text, bg);
  const ok = Math.abs(lc - expected) < 0.01;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'} [apca] ${text} on ${bg}: Lc ${lc.toFixed(2)} (expected ${expected})`);
}

console.log(`\n[contrast] ${total - failed}/${total} pairings pass.`);
process.exit(failed ? 1 : 0);

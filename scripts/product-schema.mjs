/**
 * Product brand page standard (schema 2).
 *
 * Every brand in static/products/<Folder>/metadata.json must provide the seven
 * sections below. The build lint fails if any are missing, if the colour scheme
 * does not follow 60:30:10, if a declared text pairing fails WCAG 2.2 AA, or if a
 * referenced file does not exist.
 *
 *   1. definition   What the product is, who it is for, formats, sub-products
 *   2. images       Product imagery (at least one)
 *   3. positioning  Statement, pillars, voice, words to avoid
 *   4. colorScheme  60 / 30 / 10 roles with hex values and checked text pairings
 *   5. pattern      Brand pattern asset and usage rules
 *   6. guideline    Logo files, clear space, minimum size, do and don't, typography
 *   7. downloads    Files people can download
 */

import { readdirSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { contrastRatio } from '../src/lib/utils/contrast.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PRODUCTS = join(ROOT, 'static', 'products');
const HEX = /^#[0-9A-F]{6}$/;

export const SECTIONS = ['definition', 'images', 'positioning', 'colorScheme', 'pattern', 'guideline', 'downloads'];

export function loadProducts() {
  return readdirSync(PRODUCTS, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(PRODUCTS, d.name, 'metadata.json')))
    .map((d) => {
      const data = JSON.parse(readFileSync(join(PRODUCTS, d.name, 'metadata.json'), 'utf8'));
      return { folder: d.name, slug: data.slug, data };
    })
    .filter((p) => p.data.schema === 2);
}

function fileExists(webPath) {
  return existsSync(join(ROOT, 'static', decodeURIComponent(webPath)));
}

export function validateProduct({ folder, data }) {
  const at = `static/products/${folder}/metadata.json`;
  const errors = [];
  const need = (cond, msg) => {
    if (!cond) errors.push(`${at}: ${msg}`);
  };

  for (const key of ['slug', 'name', 'tagline', 'entity', 'status']) need(typeof data[key] === 'string' && data[key], `missing "${key}"`);
  for (const s of SECTIONS) need(data[s] !== undefined, `missing section "${s}"`);
  if (errors.length) return errors;

  // 1. Definition
  const d = data.definition;
  need(d.summary?.length > 40, 'definition.summary must be a full sentence');
  need(Array.isArray(d.facts) && d.facts.length >= 3, 'definition.facts needs at least 3 label/value rows');
  need(Array.isArray(d.range), 'definition.range must be a list (can be empty for service brands)');

  // 2. Images
  need(Array.isArray(data.images) && data.images.length >= 1, 'images needs at least one entry');
  for (const img of data.images ?? []) {
    need(img.src && fileExists(img.src), `image not found: ${img.src}`);
    need(img.alt?.length > 10, `image needs descriptive alt text: ${img.src}`);
  }

  // 3. Positioning
  const p = data.positioning;
  need(p.statement?.length > 30, 'positioning.statement is required');
  need(Array.isArray(p.pillars) && p.pillars.length >= 3, 'positioning.pillars needs 3 entries');
  need(Array.isArray(p.voice) && p.voice.length >= 3, 'positioning.voice needs at least 3 traits');
  need(Array.isArray(p.avoid) && p.avoid.length >= 2, 'positioning.avoid needs at least 2 entries');

  // 4. Colour scheme: 60:30:10
  const c = data.colorScheme;
  const roles = [
    ['foundation', 60],
    ['structure', 30],
    ['accent', 10]
  ];
  for (const [role, pct] of roles) {
    const r = c[role];
    need(r && r.share === pct, `colorScheme.${role}.share must be ${pct}`);
    need(Array.isArray(r?.colors) && r.colors.length >= 1, `colorScheme.${role}.colors needs at least one colour`);
    for (const col of r?.colors ?? []) need(HEX.test(col.hex ?? ''), `colorScheme.${role}: "${col.name}" needs an upper-case #RRGGBB hex`);
  }
  need(Array.isArray(c.pairings) && c.pairings.length >= 3, 'colorScheme.pairings needs at least 3 text/background pairs');
  for (const pair of c.pairings ?? []) {
    const ok = HEX.test(pair.text ?? '') && HEX.test(pair.background ?? '');
    need(ok, `pairing needs hex text and background: ${JSON.stringify(pair)}`);
    if (ok) {
      const ratio = contrastRatio(pair.text, pair.background);
      const min = pair.largeTextOnly ? 3 : 4.5;
      need(ratio >= min, `pairing ${pair.text} on ${pair.background} is ${ratio.toFixed(2)}:1, needs ${min}:1`);
    }
  }

  // 5. Pattern (a brand with no approved pattern yet may mark it "pending" and say what to use instead)
  if (data.pattern.status === 'pending') {
    need(data.pattern.description?.length > 30, 'a pending pattern needs a description of what to use until one is approved');
  } else {
    need(data.pattern.file && fileExists(data.pattern.file), `pattern file not found: ${data.pattern.file}`);
    need(Array.isArray(data.pattern.usage) && data.pattern.usage.length >= 2, 'pattern.usage needs at least 2 rules');
  }

  // 6. Guideline
  const g = data.guideline;
  need(Array.isArray(g.logos) && g.logos.length >= 1, 'guideline.logos needs at least one logo');
  for (const l of g.logos ?? []) need(l.file && fileExists(l.file), `logo not found: ${l.file}`);
  need(typeof g.clearSpace === 'string', 'guideline.clearSpace is required');
  need(typeof g.minimumSize === 'string', 'guideline.minimumSize is required');
  need(Array.isArray(g.do) && g.do.length >= 3, 'guideline.do needs 3 rules');
  need(Array.isArray(g.dont) && g.dont.length >= 3, "guideline.dont needs 3 rules");
  need(g.typography?.display && g.typography?.body, 'guideline.typography needs display and body');

  // 7. Downloads
  need(Array.isArray(data.downloads) && data.downloads.length >= 1, 'downloads needs at least one file');
  for (const f of data.downloads ?? []) need(f.file && fileExists(f.file), `download not found: ${f.file}`);

  return errors;
}

export function validateAllProducts() {
  const products = loadProducts();
  const errors = [];
  if (products.length === 0) errors.push('static/products: no schema 2 metadata.json found');
  const slugs = new Set();
  for (const p of products) {
    if (slugs.has(p.slug)) errors.push(`duplicate product slug "${p.slug}"`);
    slugs.add(p.slug);
    errors.push(...validateProduct(p));
  }
  return errors;
}

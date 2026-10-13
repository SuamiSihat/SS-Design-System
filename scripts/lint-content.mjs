/**
 * Content lint. Fails CI when the brand rules below are broken.
 *
 *  1. No emoji or pictographic symbols in source, docs or UI copy.
 *     Use Fluent System Icons instead: <iconify-icon icon="fluent:..."> in Svelte,
 *     {{icon:name}} shortcodes in markdown (see src/lib/utils/markdown-icons.js).
 *  2. No mojibake (double-encoded UTF-8) or U+FFFD replacement characters.
 *  3. Only the Fluent icon set (no lucide:, mdi:, ph: ...).
 *  4. Web-safe file names under static/ (letters, digits, . _ - only).
 *  5. Every product brand passes the 7-section product page standard (scripts/product-schema.mjs).
 *  6. Brand guideline PDFs are not stale: each static/products/<Brand>/metadata.json must match
 *     the hash recorded in static/brand-guidelines/pdf/manifest.json by scripts/make_brand_pdfs.py.
 *
 * Usage: node scripts/lint-content.mjs
 */

import { execSync } from 'child_process';
import { createHash } from 'crypto';
import { readFileSync } from 'fs';
import { validateAllProducts } from './product-schema.mjs';

const files = execSync('git ls-files -z --cached --others --exclude-standard', { encoding: 'utf8' })
  .split('\0')
  .filter(Boolean);

const TEXT_EXT = /\.(svelte|md|js|mjs|ts|json|html|css|yml|yaml)$/;
const SKIP = /^(package-lock\.json|QA\/archive\/)/;

// Pictographs, dingbats, misc symbols and the variation selector that turns text into emoji.
const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B50}\u{2B55}\u{FE0F}]/u;
// Typical UTF-8-read-as-cp1252 artefacts.
const cp = (...n) => String.fromCodePoint(...n);
const MOJIBAKE = new RegExp(
  `(${cp(0xc3)}[${cp(0x80)}-${cp(0xbf)}]|${cp(0xe2, 0x20ac)}|${cp(0xc2)}[${cp(0xa0)}-${cp(0xbf)}]|${cp(0xf0, 0x178)}|${cp(0xfffd)})`
);
const FOREIGN_ICON = /icon[=:]\s*["'](?!fluent:)(lucide|mdi|ph|material-symbols|heroicons|tabler|bi|fa\d?)[:]/;
// Apple icon catalogues use @2x and ~ipad by platform convention.
const SAFE_NAME = /^[A-Za-z0-9._-]+$/;
const APPLE_ICON = /^static\/public\/brand\/app-icons\/(ios|watchos)\/AppIcon[A-Za-z0-9.@~-]*\.png$/;

const problems = [];

for (const file of files) {
  if (file.startsWith('static/')) {
    const base = file.split('/').pop();
    if (!SAFE_NAME.test(base) && !APPLE_ICON.test(file)) {
      problems.push(`${file}: unsafe file name (use letters, digits, '.', '_' or '-')`);
    }
  }
  if (!TEXT_EXT.test(file) || SKIP.test(file)) continue;
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  text.split('\n').forEach((line, i) => {
    const at = `${file}:${i + 1}`;
    const e = line.match(EMOJI);
    if (e) problems.push(`${at}: emoji/pictograph "${e[0]}" (U+${e[0].codePointAt(0).toString(16).toUpperCase()}); use a Fluent icon`);
    const ent = line.match(/&#(x[0-9a-f]+|\d+);/i);
    if (ent) {
      const cpv = ent[1][0].toLowerCase() === 'x' ? parseInt(ent[1].slice(1), 16) : parseInt(ent[1], 10);
      if ((cpv >= 0x1f000 && cpv <= 0x1faff) || (cpv >= 0x2600 && cpv <= 0x27bf) || cpv === 0x2b50) {
        problems.push(`${at}: emoji HTML entity "${ent[0]}"; use a Fluent icon or plain text`);
      }
    }
    const m = line.match(MOJIBAKE);
    if (m) problems.push(`${at}: mojibake "${m[0]}"`);
    if (FOREIGN_ICON.test(line)) problems.push(`${at}: non-Fluent icon set; use fluent:*`);
  });
}

problems.push(...validateAllProducts());

// Hash with LF line endings so Windows (autocrlf) and CI checkouts agree; matches make_brand_pdfs.py.
const PDF_MANIFEST = 'static/brand-guidelines/pdf/manifest.json';
const sha256 = (file) => createHash('sha256').update(readFileSync(file, 'utf8').replace(/\r\n/g, '\n')).digest('hex');
const pdfManifest = JSON.parse(readFileSync(PDF_MANIFEST, 'utf8'));
const recorded = new Set(Object.values(pdfManifest).map((e) => e.source));
for (const [slug, { source, sha256: hash }] of Object.entries(pdfManifest)) {
  if (sha256(source) !== hash) {
    problems.push(`${source}: changed since the ${slug} brand guideline PDF was generated; run npm run generate:pdfs -- --brand ${slug}`);
  }
}
for (const file of files) {
  if (/^static\/products\/[^/]+\/metadata\.json$/.test(file) && !recorded.has(file)) {
    problems.push(`${file}: no brand guideline PDF recorded in ${PDF_MANIFEST}; add the brand to BRANDS in scripts/make_brand_pdfs.py`);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  console.error(`\n[lint] ${problems.length} problem(s).`);
  process.exit(1);
}
console.log('[lint] No emoji, mojibake, foreign icon sets or unsafe file names. Product schema OK. Brand PDFs up to date.');

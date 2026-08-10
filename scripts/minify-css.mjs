/**
 * PERF-01 — CSS Minification Script
 * Uses lightningcss to minify all CSS files in assets/css/
 * Outputs to assets/css/dist/ preserving filenames.
 *
 * Run: node scripts/minify-css.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { transform } from 'lightningcss';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const CSS_FILES = [
  'assets/css/fluent.css',
  'assets/css/style.css',
  'assets/css/ss_theme.css',
  'assets/css/banner.css',
  'assets/css/markdown.css',
  'assets/css/onboarding.css',
];

const OUT_DIR = join(ROOT, 'assets/css/dist');
mkdirSync(OUT_DIR, { recursive: true });

let totalSaved = 0;

for (const relPath of CSS_FILES) {
  const inPath  = join(ROOT, relPath);
  const outName = relPath.replace('assets/css/', '');
  const outPath = join(OUT_DIR, outName);

  const source = readFileSync(inPath);
  const originalSize = source.length;

  const { code } = transform({
    filename: inPath,
    code: source,
    minify: true,
    sourceMap: false,
    targets: {
      chrome: 95,
      firefox: 95,
      safari: 15,
    },
  });

  writeFileSync(outPath, code);
  const saved = originalSize - code.length;
  totalSaved += saved;
  console.log(`✓ ${relPath}  ${originalSize}B → ${code.length}B  (-${Math.round(saved / originalSize * 100)}%)`);
}

console.log(`\n🎉 Total saved: ${(totalSaved / 1024).toFixed(1)} kB`);

/**
 * PERF-01 — JS Minification Script
 * Uses terser to minify JS files in assets/js/
 * Outputs to assets/js/dist/ preserving filenames.
 *
 * Run: node scripts/minify-js.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { minify } from 'terser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const JS_FILES = [
  'assets/js/main.js',
  'assets/js/gallery-helpers.js',
];

const OUT_DIR = join(ROOT, 'assets/js/dist');
mkdirSync(OUT_DIR, { recursive: true });

let totalSaved = 0;

for (const relPath of JS_FILES) {
  const inPath  = join(ROOT, relPath);
  const outName = relPath.replace('assets/js/', '');
  const outPath = join(OUT_DIR, outName);

  const source = readFileSync(inPath, 'utf8');
  const originalSize = Buffer.byteLength(source, 'utf8');

  const result = await minify(source, {
    compress: {
      drop_console: false,   // keep console.error/warn for production debugging
      passes: 2,
    },
    mangle: true,
    format: {
      comments: false,
    },
  });

  const minified = result.code;
  writeFileSync(outPath, minified, 'utf8');

  const saved = originalSize - Buffer.byteLength(minified, 'utf8');
  totalSaved += saved;
  console.log(`✓ ${relPath}  ${originalSize}B → ${Buffer.byteLength(minified, 'utf8')}B  (-${Math.round(saved / originalSize * 100)}%)`);
}

console.log(`\n🎉 Total saved: ${(totalSaved / 1024).toFixed(1)} kB`);

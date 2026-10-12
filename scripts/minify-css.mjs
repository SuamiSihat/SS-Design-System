/**
 * Post-build CSS minification.
 * Minifies every stylesheet in build/assets/css/ in place with lightningcss.
 * Source files in static/assets/css/ stay readable; only the deployed copy is minified.
 *
 * Run after `vite build`: node scripts/minify-css.mjs
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { transform } from 'lightningcss';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSS_DIR = join(__dirname, '..', 'build', 'assets', 'css');

if (!existsSync(CSS_DIR)) {
  console.error(`[minify-css] ${CSS_DIR} not found. Run vite build first.`);
  process.exit(1);
}

let before = 0;
let after = 0;

for (const name of readdirSync(CSS_DIR).filter((f) => f.endsWith('.css'))) {
  const path = join(CSS_DIR, name);
  const source = readFileSync(path);
  const { code } = transform({
    filename: path,
    code: source,
    minify: true,
    sourceMap: false,
    targets: { chrome: 95 << 16, firefox: 95 << 16, safari: 15 << 16 }
  });
  writeFileSync(path, code);
  before += source.length;
  after += code.length;
  console.log(`[minify-css] ${name}: ${source.length} B -> ${code.length} B`);
}

console.log(`[minify-css] total ${(before / 1024).toFixed(1)} kB -> ${(after / 1024).toFixed(1)} kB`);

/**
 * Build a self-hosted subset of Fluent System Icons.
 * Scans source, docs and product metadata for "fluent:<name>" references and the
 * {{icon:...}} markdown shortcodes, then writes only those icons to
 * src/lib/icons/fluent-subset.json. The layout registers the subset with
 * iconify-icon, so no icon is fetched from a third-party API at runtime.
 *
 * Runs automatically before `vite dev` and `vite build` (see package.json).
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const full = JSON.parse(readFileSync(require.resolve('@iconify-json/fluent/icons.json'), 'utf8'));

const SHORTCODE_ALIASES = {
  yes: 'checkmark-circle-16-filled',
  no: 'dismiss-circle-16-filled',
  warning: 'warning-16-filled',
  info: 'info-16-filled',
  star: 'star-16-filled',
  arrow: 'arrow-right-16-regular'
};

function walk(dir, exts, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, exts, out);
    else if (exts.some((e) => name.endsWith(e))) out.push(p);
  }
  return out;
}

const files = [
  ...walk(join(ROOT, 'src'), ['.svelte', '.js', '.html']),
  ...walk(join(ROOT, 'static', 'content'), ['.md']),
  ...walk(join(ROOT, 'static', 'products'), ['.json', '.md'])
];

const names = new Set(Object.values(SHORTCODE_ALIASES));
for (const f of files) {
  if (f.endsWith('fluent-subset.json')) continue;
  const text = readFileSync(f, 'utf8');
  for (const m of text.matchAll(/fluent:([a-z0-9]+(?:-[a-z0-9]+)*)/g)) names.add(m[1]);
  for (const m of text.matchAll(/\{\{icon:([a-z0-9-]+)\}\}/g)) names.add(SHORTCODE_ALIASES[m[1]] ?? m[1]);
  // Bare icon ids in data (for example the tools icon explorer): name-<size>-<regular|filled>
  for (const m of text.matchAll(/['"]([a-z0-9]+(?:-[a-z0-9]+)*-(?:12|16|20|24|28|32|48)-(?:regular|filled))['"]/g)) names.add(m[1]);
}

const subset = { prefix: 'fluent', icons: {}, aliases: {}, width: full.width ?? 24, height: full.height ?? 24 };
const missing = [];
for (const n of [...names].sort()) {
  if (full.icons[n]) subset.icons[n] = full.icons[n];
  else if (full.aliases?.[n]) {
    subset.aliases[n] = full.aliases[n];
    const parent = full.aliases[n].parent;
    if (full.icons[parent]) subset.icons[parent] = full.icons[parent];
  } else missing.push(n);
}

mkdirSync(join(ROOT, 'src', 'lib', 'icons'), { recursive: true });
writeFileSync(join(ROOT, 'src', 'lib', 'icons', 'fluent-subset.json'), JSON.stringify(subset));
console.log(`[icons] ${Object.keys(subset.icons).length} Fluent icons bundled.`);
if (missing.length) {
  console.error(`[icons] Unknown Fluent icon name(s): ${missing.join(', ')}`);
  process.exit(1);
}

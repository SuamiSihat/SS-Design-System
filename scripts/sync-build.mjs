/**
 * Sync SvelteKit Build to Web Root
 * Copies static build artifacts from build/ to the repository root
 * so that static hosts (like Synology NAS Web Station) serve SvelteKit directly.
 */

import { cpSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BUILD = join(ROOT, 'build');

const itemsToCopy = [
  'index.html',
  '404.html',
  '_app',
  'brand-guidelines',
  'brand-system',
  'components',
  'products',
  'tools',
  'signature',
  'onboarding',
  'doc'
];

console.log('\n🚀 Syncing SvelteKit build artifacts to repository root...');

for (const item of itemsToCopy) {
  const src = join(BUILD, item);
  const dest = join(ROOT, item);
  if (existsSync(src)) {
    cpSync(src, dest, { recursive: true, force: true });
    console.log(`  ✓ Synced ${item}`);
  }
}

console.log('🎉 SvelteKit web root successfully updated for NAS deployment!\n');

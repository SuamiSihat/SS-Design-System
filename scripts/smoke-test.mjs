/**
 * SuamiSihat™ Design System — Production Smoke Test Suite (v3.5.0)
 * Validates SvelteKit SSG outputs, routing integrity, raw asset CDN delivery, and token exports.
 *
 * Usage: node scripts/smoke-test.mjs
 */

import { existsSync, readFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BUILD_DIR = join(ROOT, 'build');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, description) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  \x1b[32m✔\x1b[0m [PASS] ${description}`);
  } else {
    failedTests++;
    console.error(`  \x1b[31m✖\x1b[0m [FAIL] ${description}`);
  }
}

function checkFileExists(relPath, minBytes = 1) {
  const fullPath = join(ROOT, relPath);
  const exists = existsSync(fullPath);
  if (!exists) {
    assert(false, `File exists: ${relPath}`);
    return false;
  }
  const size = statSync(fullPath).size;
  const validSize = size >= minBytes;
  assert(validSize, `File exists & non-empty (${size} bytes): ${relPath}`);
  return validSize;
}

function checkFileContains(relPath, searchStr, desc) {
  const fullPath = join(ROOT, relPath);
  if (!existsSync(fullPath)) {
    assert(false, `${desc} (File missing: ${relPath})`);
    return;
  }
  const content = readFileSync(fullPath, 'utf8');
  const found = content.includes(searchStr);
  assert(found, `${desc}`);
}

console.log('\n======================================================');
console.log('  🧪 SuamiSihat™ Design System — Smoke Test Suite (v3.5.0)');
console.log('======================================================\n');

// -----------------------------------------------------------------------------
// Test Group 1: SvelteKit Pre-rendered Static HTML Pages (SSG)
// -----------------------------------------------------------------------------
console.log('📄 1. Validating SvelteKit SSG Routes & HTML Pages:');
checkFileExists('build/index.html', 500);
checkFileExists('build/brand-guidelines/index.html', 500);
checkFileExists('build/brand-system/index.html', 500);
checkFileExists('build/components/index.html', 500);
checkFileExists('build/products/index.html', 500);
checkFileExists('build/tools/index.html', 500);
checkFileExists('build/signature/index.html', 500);
checkFileExists('build/onboarding/index.html', 500);
checkFileExists('build/doc/index.html', 500);
checkFileExists('build/404.html', 200);

// -----------------------------------------------------------------------------
// Test Group 2: SvelteKit Runtime & Hydration Output
// -----------------------------------------------------------------------------
console.log('\n⚡ 2. Validating SvelteKit Runtime & Client Bundles:');
checkFileContains('build/index.html', '_app/immutable/', 'Index contains SvelteKit immutable bundle references');
checkFileContains('build/index.html', 'SuamiSihat', 'Index contains SuamiSihat brand title in rendered DOM');
checkFileContains('build/brand-guidelines/index.html', '60:30:10', 'Brand guidelines contains 60:30:10 rule');
checkFileContains('build/signature/index.html', 'Live Signature Preview', 'Signature page contains preview component');

// -----------------------------------------------------------------------------
// Test Group 3: Raw Static Asset CDN Delivery (Multi-Platform Consumers)
// -----------------------------------------------------------------------------
console.log('\n🌐 3. Validating Raw Static Asset CDN & Multi-Platform Delivery:');
checkFileExists('build/assets/css/fluent.css', 5000);
checkFileExists('build/assets/css/ss_theme.css', 2000);
checkFileExists('build/assets/css/style.css', 5000);
checkFileExists('build/assets/tokens/tokens.json', 500);
checkFileExists('build/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg', 100);
checkFileExists('build/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg', 100);
checkFileExists('build/public/brand/logos/ss-logomark-light.svg', 100);
checkFileExists('build/public/brand/favicon/favicon.ico', 100);
checkFileExists('build/content/roadmap.md', 100);
checkFileExists('build/content/brand-voice.md', 100);
checkFileExists('build/content/changelog.md', 100);

// -----------------------------------------------------------------------------
// Test Group 4: JSON Token Syntax Integrity
// -----------------------------------------------------------------------------
console.log('\n📐 4. Validating W3C Token JSON Validity:');
try {
  const tokenPath = join(ROOT, 'build/assets/tokens/tokens.json');
  if (existsSync(tokenPath)) {
    const json = JSON.parse(readFileSync(tokenPath, 'utf8'));
    assert(typeof json === 'object' && json !== null, 'tokens.json is valid parseable JSON');
    assert(Boolean(json.color || json.brand || json.colors), 'tokens.json contains color token definitions');
  } else {
    assert(false, 'tokens.json exists for parsing');
  }
} catch (e) {
  assert(false, `tokens.json JSON parse error: ${e.message}`);
}

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('\n======================================================');
console.log(`  📊 Smoke Test Results: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
console.log('======================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('\x1b[32m🎉 All smoke test assertions PASSED with 100% success! SvelteKit v3.5.0 is healthy and production-ready.\x1b[0m\n');
  process.exit(0);
}

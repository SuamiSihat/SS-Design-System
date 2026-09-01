/**
 * SuamiSihat™ Design System — Remote Production Smoke Test Suite
 * Tests live Synology NAS endpoint: https://assets.suamisihat.myds.me/
 *
 * Usage: node scripts/remote-smoke-test.mjs
 */

const BASE_URL = 'https://assets.suamisihat.myds.me';

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

async function checkUrl(path, expectedStatus = 200, minBytes = 100) {
  const url = `${BASE_URL}${path}`;
  try {
    const res = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'SuamiSihat-SmokeTest/3.5' } });
    const isStatusOk = res.status === expectedStatus;
    const text = await res.text();
    const isSizeOk = text.length >= minBytes;
    
    assert(isStatusOk && isSizeOk, `HTTP ${res.status} (${text.length} bytes): ${path}`);
    return { ok: isStatusOk && isSizeOk, status: res.status, text };
  } catch (err) {
    assert(false, `Network error on ${path}: ${err.message}`);
    return { ok: false, error: err };
  }
}

async function checkPageContent(path, searchStrings = []) {
  const url = `${BASE_URL}${path}`;
  try {
    const res = await fetch(url);
    const text = await res.text();
    for (const str of searchStrings) {
      const found = text.includes(str);
      assert(found, `Page ${path} contains: "${str.slice(0, 45)}..."`);
    }
  } catch (err) {
    assert(false, `Failed content check on ${path}: ${err.message}`);
  }
}

async function run() {
  console.log('\n================================================================');
  console.log(`  🌐 LIVE PRODUCTION SMOKE TEST: ${BASE_URL}`);
  console.log('================================================================\n');

  console.log('📄 1. Testing Live Production Routes & SSG HTML Pages:');
  await checkUrl('/', 200, 500);
  await checkUrl('/brand-system/', 200, 500);
  await checkUrl('/brand-guidelines/', 200, 500);
  await checkUrl('/components/', 200, 500);
  await checkUrl('/products/', 200, 500);
  await checkUrl('/products/Androlab/', 200, 500);
  await checkUrl('/tools/', 200, 500);
  await checkUrl('/signature/', 200, 500);
  await checkUrl('/onboarding/', 200, 500);
  await checkUrl('/doc/', 200, 500);
  await checkUrl('/404.html', 200, 200);

  console.log('\n🌐 2. Testing CDN Static Assets & Multi-Platform Delivery:');
  await checkUrl('/assets/css/style.css', 200, 5000);
  await checkUrl('/assets/css/fluent.css', 200, 5000);
  await checkUrl('/assets/css/ss_theme.css', 200, 2000);
  await checkUrl('/assets/tokens/tokens.json', 200, 500);
  await checkUrl('/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg', 200, 100);
  await checkUrl('/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg', 200, 100);
  await checkUrl('/public/brand/logos/ss-logomark-light.svg', 200, 100);
  await checkUrl('/public/brand/favicon/favicon.ico', 200, 100);

  console.log('\n🔍 3. Testing Real-time DOM Content & Brand Standards:');
  await checkPageContent('/', [
    'SuamiSihat',
    'fluent2-footer',
    'https://suamisihat.myds.me'
  ]);
  await checkPageContent('/components/', [
    '60:30:10',
    '--text-strong',
    'buttons'
  ]);
  await checkPageContent('/brand-system/', [
    '00_logo_suamisihat',
    '#043388',
    '#FCFAF6'
  ]);
  await checkPageContent('/signature/', [
    'Signature Studio',
    'SSH'
  ]);
  await checkPageContent('/onboarding/', [
    'https://suamisihat.myds.me',
    'First Week Checklist'
  ]);

  console.log('\n================================================================');
  console.log(`  📊 Remote Smoke Test Results: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
  console.log('================================================================\n');

  if (failedTests === 0) {
    console.log('🎉 All live remote smoke tests PASSED on https://assets.suamisihat.myds.me/ !\n');
  } else {
    console.error(`⚠️  ${failedTests} tests failed on remote server.\n`);
    process.exit(1);
  }
}

run();

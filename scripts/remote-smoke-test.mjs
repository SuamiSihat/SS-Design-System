/**
 * SuamiSihat Design System — live site smoke test
 * Tests https://assets.suamisihat.myds.me/ (override with SS_SITE_URL).
 *
 * The site is behind HTTP Basic Auth once the NAS password file exists.
 * Provide credentials with SS_SITE_USER and SS_SITE_PASSWORD.
 *
 * Usage: SS_SITE_USER=... SS_SITE_PASSWORD=... node scripts/remote-smoke-test.mjs
 */

const BASE_URL = (process.env.SS_SITE_URL || 'https://assets.suamisihat.myds.me').replace(/\/$/, '');
const AUTH = process.env.SS_SITE_USER
  ? { Authorization: 'Basic ' + Buffer.from(`${process.env.SS_SITE_USER}:${process.env.SS_SITE_PASSWORD ?? ''}`).toString('base64') }
  : {};
const HEADERS = { 'User-Agent': 'SuamiSihat-SmokeTest', ...AUTH };

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, description) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  \x1b[32mPASS\x1b[0m [PASS] ${description}`);
  } else {
    failedTests++;
    console.error(`  \x1b[31mFAIL\x1b[0m [FAIL] ${description}`);
  }
}

async function checkUrl(path, expectedStatus = 200, minBytes = 100) {
  const url = `${BASE_URL}${path}`;
  try {
    const res = await fetch(url, { method: 'GET', headers: HEADERS });
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
    const res = await fetch(url, { headers: HEADERS });
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
  console.log(`   LIVE PRODUCTION SMOKE TEST: ${BASE_URL}`);
  console.log('================================================================\n');

  console.log(' 1. Testing Live Production Routes & SSG HTML Pages:');
  await checkUrl('/', 200, 500);
  await checkUrl('/brand-system/', 200, 500);
  await checkUrl('/brand-guidelines/', 200, 500);
  await checkUrl('/components/', 200, 500);
  await checkUrl('/products/', 200, 500);
  for (const slug of ['androlab', 'menss', 'mensculine', 'drmitring', 'rejal', 'nucaffe', 'pertabi', 'husbandclinic', 'isterisihat']) {
    await checkUrl(`/products/${slug}/`, 200, 500);
  }
  await checkUrl('/tools/', 200, 500);
  await checkUrl('/signature/', 200, 500);
  await checkUrl('/onboarding/', 200, 500);
  await checkUrl('/doc/', 200, 500);
  await checkUrl('/404.html', 200, 200);

  console.log('\n 2. Testing CDN Static Assets & Multi-Platform Delivery:');
  await checkUrl('/assets/css/style.css', 200, 5000);
  await checkUrl('/assets/css/fluent.css', 200, 5000);
  await checkUrl('/assets/css/ss_theme.css', 200, 2000);
  await checkUrl('/assets/tokens/tokens.json', 200, 500);
  await checkUrl('/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg', 200, 100);
  await checkUrl('/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg', 200, 100);
  await checkUrl('/public/brand/logos/ss-logomark-light.svg', 200, 100);
  await checkUrl('/public/brand/favicon/favicon.ico', 200, 100);

  console.log('\n 3. Security: source and repository files must not be served');
  for (const path of ['/.git/config', '/.htaccess', '/package.json', '/readme.md', '/.agents/AGENTS.md', '/QA/', '/src/app.html']) {
    try {
      const res = await fetch(`${BASE_URL}${path}`, { headers: HEADERS, redirect: 'manual' });
      assert(res.status !== 200, `Not served (HTTP ${res.status}): ${path}`);
    } catch (err) {
      assert(true, `Not reachable: ${path}`);
    }
  }
  try {
    const res = await fetch(`${BASE_URL}/`, { redirect: 'manual' });
    assert(res.status === 200, `Home page loads without a login (HTTP ${res.status})`);
    // These come from static/.htaccess; missing means the server is not reading it (e.g. nginx back-end).
    assert((res.headers.get('content-security-policy') || '').includes("frame-ancestors 'none'"), 'Content-Security-Policy header sent');
    assert(res.headers.get('x-frame-options') === 'DENY', 'X-Frame-Options: DENY header sent');
    assert((res.headers.get('x-robots-tag') || '').includes('noindex'), 'X-Robots-Tag: noindex header sent');
  } catch (err) {
    assert(false, `Home page check failed: ${err.message}`);
  }

  console.log('\n 4. Testing Real-time DOM Content & Brand Standards:');
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
  console.log(`   Remote Smoke Test Results: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
  console.log('================================================================\n');

  if (failedTests === 0) {
    console.log(' All live remote smoke tests PASSED on https://assets.suamisihat.myds.me/ !\n');
  } else {
    console.error(`  ${failedTests} tests failed on remote server.\n`);
    process.exit(1);
  }
}

run();

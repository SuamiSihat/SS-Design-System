/**
 * Accessibility test: runs axe-core in a real Chromium against every built page,
 * in both light and dark theme. Fails (exit 1) on any WCAG 2.2 A/AA violation,
 * including colour contrast, which jsdom cannot evaluate.
 *
 * Usage: npm run build && node scripts/a11y-test.mjs [--route /products/rejal/]
 * Env:   CHROME_PATH  optional Chromium executable (otherwise Playwright's own)
 */

import { createServer } from 'http';
import { readFileSync, existsSync, statSync, readdirSync } from 'fs';
import { join, extname, dirname, relative, sep } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = join(ROOT, 'build');
const AXE_SOURCE = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.md': 'text/markdown; charset=utf-8',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.pdf': 'application/pdf'
};

function listRoutes(dir) {
  const routes = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (['_app', 'assets', 'public', 'content'].includes(name) && dir === BUILD) continue;
      routes.push(...listRoutes(p));
    } else if (name === 'index.html') {
      const rel = relative(BUILD, dir).split(sep).join('/');
      routes.push(rel ? `/${rel}/` : '/');
    }
  }
  return routes;
}

const server = createServer((req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = join(BUILD, path);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) file = join(BUILD, '404.html');
  res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});

const onlyIdx = process.argv.indexOf('--route');
const routes = onlyIdx > -1 ? [process.argv[onlyIdx + 1]] : listRoutes(BUILD);

await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });

let failures = 0;
for (const theme of ['light', 'dark']) {
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 }, reducedMotion: 'reduce' });
  await context.addInitScript((t) => {
    localStorage.setItem('ss-theme', t);
    localStorage.setItem('ss_gate_unlocked', JSON.stringify({ verified: true, timestamp: Date.now() }));
  }, theme);
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
    await page.waitForTimeout(400);
    await page.addScriptTag({ content: AXE_SOURCE });
    const result = await page.evaluate(async () =>
      // eslint-disable-next-line no-undef
      axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
        resultTypes: ['violations']
      })
    );
    const v = result.violations;
    if (v.length) {
      failures += v.length;
      console.log(`FAIL [${theme}] ${route}`);
      for (const item of v) {
        console.log(`  - ${item.id} (${item.impact}): ${item.nodes.length} node(s)`);
        for (const n of item.nodes.slice(0, 4)) {
          console.log(`      ${n.target.join(' ')} :: ${(n.any[0]?.message || n.failureSummary || '').split('\n')[0]}`);
        }
      }
    } else {
      console.log(`PASS [${theme}] ${route}`);
    }
  }
  await context.close();
}

await browser.close();
server.close();
console.log(failures ? `\n${failures} accessibility rule violation(s).` : '\nAll pages pass WCAG 2.2 A/AA in light and dark theme.');
process.exit(failures ? 1 : 0);

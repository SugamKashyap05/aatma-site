/**
 * AATMA Site — Browser Smoke Test (all public routes × 5 viewports)
 *
 * Serves the BUILT site (dist/, via `npm run preview` on :4173) and drives it
 * with Playwright, capturing per route×viewport combination:
 *   - HTTP status of the main document
 *   - <title>
 *   - whether visible content rendered (non-blank)
 *   - console errors / console warnings / uncaught page errors
 *   - failed network requests (requestfailed + HTTP >= 400), split into
 *     INTERNAL (same-origin, hard failure) and EXTERNAL (third-party, warning)
 *   - broken <img> elements (complete && naturalWidth === 0)
 *   - horizontal overflow (scrollWidth > clientWidth) — responsive signal
 *   - presence of #main-content (layout contract documented in src/App.tsx)
 *
 * Run:  npm run preview            (terminal 1, port 4173)
 *       node scripts/smoke-test.mjs (terminal 2)
 * Env:
 *   SMOKE_BASE_URL   target origin (default http://localhost:4173)
 *   SMOKE_SHOTS      "1" to screenshot every combination (default: failures only)
 *
 * Writes scripts/smoke-test-results.json and prints ===RESULTS_JSON===.
 */
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..');

const BASE_URL = (process.env.SMOKE_BASE_URL || 'http://localhost:4173').replace(/\/$/, '');
const SHOT_DIR = join(REPO, 'scripts', 'smoke-screenshots');
const OUT_JSON = join(HERE, `smoke-test-${process.env.SMOKE_TAG || 'results'}.json`);
const ALWAYS_SHOTS = process.env.SMOKE_SHOTS === '1';

/** Public routes, per src/App.tsx (8 top-level + 3 published news slugs). */
const PUBLIC_ROUTES = [
  { path: '/', label: 'Home' },
  { path: '/books', label: 'Books' },
  { path: '/press', label: 'Press' },
  { path: '/history', label: 'History' },
  { path: '/policy', label: 'Policy' },
  { path: '/research', label: 'Research' },
  { path: '/news', label: 'News index' },
  { path: '/news/aatma-thanks-cm-sarma-2023', label: 'News article 1' },
  { path: '/news/winds-of-change-2023', label: 'News article 2' },
  { path: '/news/prospects-assam-agarwood-2024', label: 'News article 3' },
  { path: '/resources', label: 'Resources' },
];

/** Non-public probes — reported separately, never counted in the public matrix. */
const PROBE_ROUTES = [
  { path: '/nonexistent-page-404-test', label: 'Unknown path (404 handling)', expectNotFound: true },
  { path: '/news/does-not-exist-slug', label: 'Unknown news slug', expectNotFound: true },
  { path: '/__challenges-probe', label: 'Internal dev probe route' },
];

// Optional comma-separated route filter (SMOKE_ONLY=/,/books,...) so long runs
// can be executed in foreground chunks under a command timeout. Default: all.
const ONLY = (process.env.SMOKE_ONLY || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const matchesOnly = (route) =>
  ONLY.length === 0 || ONLY.some((p) => route.path === p || route.path.startsWith(p + '/'));
const FILTERED_PUBLIC = PUBLIC_ROUTES.filter(matchesOnly);
const FILTERED_PROBES = PROBE_ROUTES.filter(matchesOnly);

const VIEWPORTS = [
  { name: 'mobile', width: 360, height: 390 },
  { name: 'mobile-large', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'desktop', width: 1920, height: 1080 },
];

const CONTENT_MIN_CHARS = 50;

async function launchBrowser() {
  try {
    return await chromium.launch({ headless: true });
  } catch (err) {
    console.warn(`[smoke] bundled chromium launch failed (${err.message}); retrying with channel:"chrome"`);
    return await chromium.launch({ headless: true, channel: 'chrome' });
  }
}

async function checkServer() {
  const res = await fetch(`${BASE_URL}/`);
  if (!res.ok) throw new Error(`preview server responded ${res.status} at ${BASE_URL}`);
  const html = await res.text();
  if (!html.includes('<div id="root"')) {
    throw new Error(`${BASE_URL} did not return the built index.html (no #root mount node)`);
  }
}

async function measure(page) {
  return page.evaluate(() => {
    const root = document.getElementById('root');
    const rootText = root ? (root.innerText || '').trim() : '';
    const main = document.getElementById('main-content');
    const imgs = Array.from(document.querySelectorAll('img'));
    const broken = imgs
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.currentSrc || img.src || img.getAttribute('src') || '(no src)');
    const pending = imgs.filter((img) => !img.complete).length;
    const de = document.documentElement;
    return {
      rootTextLength: rootText.length,
      rootSnippet: rootText.slice(0, 160).replace(/\s+/g, ' '),
      hasMainContent: !!main,
      mainTextLength: main ? (main.innerText || '').trim().length : 0,
      imgCount: imgs.length,
      brokenImages: broken,
      pendingImages: pending,
      h1: Array.from(document.querySelectorAll('h1')).map((h) => (h.innerText || '').trim().slice(0, 100)),
      navLinkCount: document.querySelectorAll('header a, nav a').length,
      scrollWidth: de.scrollWidth,
      clientWidth: de.clientWidth,
      bodyScrollHeight: document.body.scrollHeight,
    };
  });
}

async function scrollThrough(page) {
  // Trigger lazy-loaded images and scroll-reveal animations before measuring.
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 150));
  });
}

const isInternal = (url) => url.startsWith(BASE_URL) || url.startsWith('/');

async function runCombination(browser, route, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  const consoleErrors = [];
  const consoleWarnings = [];
  const pageErrors = [];
  const failedRequests = [];
  const httpErrors = [];
  let httpStatus = null;
  let navError = null;

  page.on('console', (msg) => {
    const t = msg.type();
    const text = msg.text().slice(0, 300);
    if (t === 'error') consoleErrors.push(text);
    else if (t === 'warning') consoleWarnings.push(text);
  });
  page.on('pageerror', (err) => pageErrors.push(String(err.message || err).slice(0, 300)));
  page.on('requestfailed', (req) => {
    failedRequests.push({
      url: req.url().slice(0, 200),
      resourceType: req.resourceType(),
      failure: req.failure()?.errorText || 'unknown',
    });
  });
  page.on('response', (res) => {
    if (res.status() >= 400) {
      httpErrors.push({
        url: res.url().slice(0, 200),
        status: res.status(),
        resourceType: res.request().resourceType(),
      });
    }
  });

  const record = {
    route: route.path,
    label: route.label,
    viewport: `${viewport.width}x${viewport.height}`,
    viewportName: viewport.name,
    httpStatus: null,
    title: '',
    hasContent: false,
    rootTextLength: 0,
    snippet: '',
    hasMainContent: false,
    h1: [],
    navLinkCount: 0,
    imgCount: 0,
    brokenImages: [],
    pendingImages: 0,
    horizontalOverflowPx: 0,
    pageScrollHeight: 0,
    consoleErrors: [],
    consoleWarnings: [],
    pageErrors: [],
    failedRequests: [],
    httpErrors: [],
    internalFailures: [],
    externalFailures: [],
    screenshot: null,
    verdict: 'FAIL',
    notes: [],
  };

  try {
    const response = await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'load', timeout: 45000 });
    httpStatus = response ? response.status() : null;
    record.httpStatus = httpStatus;

    // Wait for React to mount and paint actual text (SPA: content appears post-load).
    await page
      .waitForFunction(
        (min) => {
          const el = document.getElementById('root');
          return !!el && (el.innerText || '').trim().length >= min;
        },
        CONTENT_MIN_CHARS,
        { timeout: 15000 },
      )
      .catch(() => {});

    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await scrollThrough(page);

    const m = await measure(page);
    record.title = (await page.title()).slice(0, 120);
    record.hasContent = m.rootTextLength >= CONTENT_MIN_CHARS;
    record.rootTextLength = m.rootTextLength;
    record.snippet = m.rootSnippet;
    record.hasMainContent = m.hasMainContent;
    record.h1 = m.h1;
    record.navLinkCount = m.navLinkCount;
    record.imgCount = m.imgCount;
    record.brokenImages = m.brokenImages.slice(0, 10);
    record.pendingImages = m.pendingImages;
    record.horizontalOverflowPx = Math.max(0, m.scrollWidth - m.clientWidth);
    record.pageScrollHeight = m.bodyScrollHeight;
  } catch (err) {
    navError = err.message;
  }

  record.consoleErrors = consoleErrors.slice(0, 10);
  record.pageErrors = pageErrors.slice(0, 10);
  record.consoleWarnings = consoleWarnings.slice(0, 10);
  record.failedRequests = failedRequests.slice(0, 10);
  record.httpErrors = httpErrors.slice(0, 10);

  // Same-origin failures are real site bugs; third-party (Google Fonts, CDNs)
  // failures are recorded but do not fail the page.
  const allNetProblems = [
    ...failedRequests.map((f) => ({ ...f, kind: 'requestfailed' })),
    ...httpErrors.map((h) => ({ ...h, kind: 'http' })),
  ];
  record.internalFailures = allNetProblems.filter((p) => isInternal(p.url));
  record.externalFailures = allNetProblems.filter((p) => !isInternal(p.url));

  // ---- verdict -------------------------------------------------------------
  const notes = [];
  const expect404 = !!route.expectNotFound;

  if (navError) notes.push(`navigation error: ${navError}`);
  if (httpStatus === null) notes.push('no HTTP status (navigation failed)');
  else if (expect404) {
    // SPA fallback serves index.html with 200 and the app renders NotFoundPage.
    // Both 200 (SPA fallback) and 404 (static 404.html) are acceptable here.
    if (httpStatus !== 200 && httpStatus !== 404) notes.push(`unexpected HTTP ${httpStatus} for unknown path`);
    else notes.push(`unknown path served HTTP ${httpStatus} (SPA fallback -> NotFoundPage)`);
  } else if (httpStatus !== 200) notes.push(`HTTP ${httpStatus}`);

  if (!record.hasContent) notes.push(`no visible content (root text ${record.rootTextLength} chars)`);
  if (!record.hasMainContent) notes.push('missing #main-content wrapper');
  if (record.pageErrors.length) notes.push(`${record.pageErrors.length} uncaught page error(s)`);
  if (record.consoleErrors.length) notes.push(`${record.consoleErrors.length} console error(s)`);
  if (record.internalFailures.length) notes.push(`${record.internalFailures.length} same-origin request failure(s)`);
  if (record.brokenImages.length) notes.push(`${record.brokenImages.length} broken image(s)`);
  if (record.externalFailures.length) notes.push(`${record.externalFailures.length} third-party request failure(s)`);
  if (record.horizontalOverflowPx > 2) notes.push(`horizontal overflow +${record.horizontalOverflowPx}px`);

  const hardFail =
    !!navError ||
    (expect404 ? httpStatus !== 200 && httpStatus !== 404 : httpStatus !== 200) ||
    !record.hasContent ||
    record.pageErrors.length > 0 ||
    record.consoleErrors.length > 0 ||
    record.internalFailures.length > 0 ||
    record.brokenImages.length > 0;

  record.verdict = hardFail ? 'FAIL' : notes.length ? 'PASS (warn)' : 'PASS';
  record.notes = notes.length ? notes : ['OK'];

  // ---- evidence ------------------------------------------------------------
  if (ALWAYS_SHOTS || hardFail) {
    try {
      await mkdir(SHOT_DIR, { recursive: true });
      const safe = route.path.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'root';
      const file = join(SHOT_DIR, `${safe}__${viewport.width}x${viewport.height}.png`);
      await page.screenshot({ path: file, fullPage: false });
      record.screenshot = file;
    } catch (err) {
      record.notes.push(`screenshot failed: ${err.message}`);
    }
  }

  await context.close();
  return record;
}

async function main() {
  await checkServer();
  console.log(`[smoke] target: ${BASE_URL}`);
  console.log(
    `[smoke] public routes: ${FILTERED_PUBLIC.length}, probes: ${FILTERED_PROBES.length}, viewports: ${VIEWPORTS.length}`,
  );

  const browser = await launchBrowser();
  const started = Date.now();
  const publicResults = [];
  const probeResults = [];

  const all = [
    ...FILTERED_PUBLIC.map((r) => ({ r, bucket: publicResults })),
    ...FILTERED_PROBES.map((r) => ({ r, bucket: probeResults })),
  ];

  let done = 0;
  const total = all.length * VIEWPORTS.length;
  for (const { r, bucket } of all) {
    for (const vp of VIEWPORTS) {
      const rec = await runCombination(browser, r, vp);
      bucket.push(rec);
      done += 1;
      if (rec.verdict === 'FAIL') {
        console.log(`[smoke] ${done}/${total} FAIL  ${r.path} @ ${rec.viewport} — ${rec.notes.join('; ')}`);
      } else if (rec.verdict === 'PASS (warn)') {
        console.log(`[smoke] ${done}/${total} warn  ${r.path} @ ${rec.viewport} — ${rec.notes.join('; ')}`);
      } else if (done % 15 === 0) {
        console.log(`[smoke] ${done}/${total} ok`);
      }
    }
  }

  await browser.close();

  const allResults = [...publicResults, ...probeResults];
  const payload = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    durationSeconds: Math.round((Date.now() - started) / 1000),
    viewports: VIEWPORTS,
    publicRoutes: FILTERED_PUBLIC.map((r) => r.path),
    probeRoutes: FILTERED_PROBES.map((r) => r.path),
    totals: {
      combinations: allResults.length,
      publicCombinations: publicResults.length,
      pass: allResults.filter((r) => r.verdict === 'PASS').length,
      warn: allResults.filter((r) => r.verdict === 'PASS (warn)').length,
      fail: allResults.filter((r) => r.verdict === 'FAIL').length,
    },
    publicResults,
    probeResults,
  };

  await writeFile(OUT_JSON, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`[smoke] wrote ${OUT_JSON}`);
  console.log(`[smoke] totals: ${JSON.stringify(payload.totals)}`);
  console.log('\n===RESULTS_JSON===');
  console.log(JSON.stringify(payload));
}

main().catch((err) => {
  console.error('[smoke] Fatal error:', err);
  process.exit(1);
});

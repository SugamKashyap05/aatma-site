/**
 * About spine smoke — fidelity of the /about brief reader.
 *
 * The rendered page is compared, paragraph by paragraph, against
 * src/data/about-spine.ts (parsed from source at runtime, so a broken render
 * pipeline OR a edited data file both fail), and the data module itself is
 * checked against the fidelity pins from the plan appendix: 10 sections,
 * 31 paragraphs, 3,880 words, the six source slips (Achivement, Augast,
 * Occtober, Thiland, Combodia, abumdantly) and the four office-bearer names.
 * Also checks the contents panel, the deep-dive link map, the agar-token
 * colors, mobile overflow, and that the homepage About section carries
 * exactly one link to /about.
 *
 * Usage: npm run build && npm run preview, then
 *   node scripts/about-spine-smoke.mjs
 * Env: ABOUT_SMOKE_BASE_URL (default http://127.0.0.1:4174),
 *      ABOUT_SMOKE_TAG (default about-spine-2026-10-21).
 */
import assert from "node:assert/strict";
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const baseUrl = process.env.ABOUT_SMOKE_BASE_URL ?? "http://127.0.0.1:4174";
const tag = process.env.ABOUT_SMOKE_TAG ?? "about-spine-2026-10-21";
const here = path.dirname(fileURLToPath(import.meta.url));

// Fidelity pins — .hermes/plans/2026-10-21_200619-about-brief-spine.md Appendix B
const SECTION_WORDS = [147, 315, 172, 203, 203, 1405, 236, 200, 687, 312];
const SECTION_PARAS = [1, 4, 1, 1, 1, 9, 2, 4, 6, 2];
const TOTAL_WORDS = 3880;
const SLIPS = ["Achivement", "Augast", "Occtober", "Thiland", "Combodia", "abumdantly"];
const NAMES = ["Hazi Anfar Ali", "Hazi Samsul Islam", "Binay Kumar Paul", "Humayun Chaudhury"];
const DEEP_DIVE_HREFS = {
  I: ["/#sanchi-paat", "/history"],
  II: ["/#agar-story", "/history"],
  III: ["/#agar-story"],
  IV: ["/#formation"],
  V: ["/history", "/resources"],
  VI: ["/#critical-era", "/history"],
  VII: ["/#achievement"],
  VIII: ["/#ndf-findings"],
  IX: ["/#rules", "/policy"],
  X: ["/#challenges"],
};

/** Parse the data module straight from source (keeps this test honest). */
function readSpine() {
  const src = fs.readFileSync(path.resolve(here, "../src/data/about-spine.ts"), "utf8");
  const sectionRe =
    /num:\s*"(I|II|III|IV|V|VI|VII|VIII|IX|X)",\s*heading:\s*("(?:[^"\\]|\\.)*"),\s*paragraphs:\s*\[([\s\S]*?)\],\s*deepDives:\s*\[([\s\S]*?)\]/g;
  const stringRe = /"((?:[^"\\]|\\.)*)"/g;
  const out = [];
  let match;
  while ((match = sectionRe.exec(src)) !== null) {
    const [, num, heading, parasBlock, divesBlock] = match;
    const paragraphs = [...parasBlock.matchAll(stringRe)].map((m) => JSON.parse(`"${m[1]}"`));
    const dives = [...divesBlock.matchAll(/href:\s*("(?:[^"\\]|\\.)*")/g)].map(
      (m) => JSON.parse(m[1]),
    );
    out.push({ num, heading: JSON.parse(heading), paragraphs, dives });
  }
  return out;
}

const SPINE = readSpine();
const allText = SPINE.map((s) => `${s.heading} ${s.paragraphs.join(" ")}`).join(" ");

// 1. The data module still carries the complete brief, uncorrected.
assert.equal(SPINE.length, 10, "spine module has ten sections");
for (const [i, section] of SPINE.entries()) {
  assert.equal(
    section.paragraphs.length,
    SECTION_PARAS[i],
    `section ${section.num} paragraph count drift`,
  );
  const words = section.paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
  assert.equal(words, SECTION_WORDS[i], `section ${section.num} word count drift`);
  assert.deepEqual(
    section.dives,
    DEEP_DIVE_HREFS[section.num],
    `section ${section.num} deep-dive map drift`,
  );
}
assert.equal(
  SPINE.flatMap((s) => s.paragraphs).join(" ").split(/\s+/).filter(Boolean).length,
  TOTAL_WORDS,
  "total word count drift",
);
for (const slip of SLIPS) {
  assert.ok(allText.includes(slip), `source slip missing: "${slip}" — do not correct client text`);
}
for (const name of NAMES) {
  assert.ok(allText.includes(name), `office-bearer name missing: "${name}"`);
}

const browser = await chromium.launch({ headless: true, channel: "chrome" });
const context = await browser.newContext({ viewport: { width: 1366, height: 768 } });
const page = await context.newPage();
const passed = [];

try {
  await page.goto(`${baseUrl}/about`, { waitUntil: "domcontentloaded" });
  await page.locator('article[id^="spine-"]').last().scrollIntoViewIfNeeded();

  // 2. Rendered DOM matches the data module exactly (order, headings, text, links).
  const rendered = await page.evaluate(() => {
    return [...document.querySelectorAll('article[id^="spine-"]')].map((article) => ({
      id: article.id,
      heading: article.querySelector("h2")?.textContent?.trim() ?? "",
      paragraphs: [...article.querySelectorAll(":scope > div > p")].map((p) =>
        p.textContent?.trim() ?? "",
      ),
      dives: [...article.querySelectorAll("a[href^='/']")].map((a) => a.getAttribute("href")),
    }));
  });
  assert.equal(rendered.length, 10, "page renders ten spine blocks");
  for (const [i, block] of rendered.entries()) {
    const section = SPINE[i];
    assert.equal(block.id, `spine-${section.num.toLowerCase()}`, `block ${i} id`);
    assert.equal(block.heading, section.heading, `block ${section.num} heading`);
    assert.deepStrictEqual(block.paragraphs, section.paragraphs, `block ${section.num} text`);
    assert.deepStrictEqual(block.dives, section.dives, `block ${section.num} deep dives`);
  }
  passed.push("spine blocks: rendered text matches src/data/about-spine.ts exactly");

  // 3. Title / metadata.
  assert.ok((await page.title()).includes("About"), "route title is About");
  passed.push("route metadata: title present");

  // 4. Contents panel: ten anchors, each resolving to a block on the page.
  const contents = await page.evaluate(() => {
    const nav = document.querySelector('nav[aria-label^="Contents"]');
    const links = [...nav?.querySelectorAll("a[href^='#spine-']") ?? []];
    return links.map((a) => ({
      href: a.getAttribute("href"),
      resolves: document.querySelector(a.getAttribute("href")) !== null,
    }));
  });
  assert.equal(contents.length, 10, "contents panel lists ten sections");
  assert.ok(contents.every((c) => c.resolves), "every contents anchor resolves");
  assert.deepEqual(
    contents.map((c) => c.href),
    SPINE.map((s) => `#spine-${s.num.toLowerCase()}`),
    "contents order matches the brief",
  );
  passed.push("contents panel: ten anchors in brief order, all resolve");

  // 5. Contents click scrolls to the block (deep-linking works in-page).
  await page.locator('a[href="#spine-vi"]').first().click();
  await page.waitForTimeout(1200);
  const Vi = await page.locator("#spine-vi").boundingBox();
  assert.ok(Vi && Vi.y >= 0 && Vi.y < 200, "clicking contents scrolls to section VI");
  passed.push("contents deep-link: #spine-vi scroll lands under the navbar");

  // 6. Agar tokens on the cards, verified as computed values.
  const tokens = await page.evaluate(() => {
    const article = document.querySelector('article[id^="spine-"]');
    return {
      heading: getComputedStyle(article.querySelector("h2")).color,
      card: getComputedStyle(article).backgroundColor,
    };
  });
  assert.equal(tokens.heading, "rgb(245, 241, 228)", "headings use agar-title");
  assert.equal(tokens.card, "rgba(26, 60, 42, 0.88)", "cards use bg-glass-card");
  passed.push("color tokens: agar-title headings on bg-glass-card cards");

  // 7. Touch targets reach 44px and no horizontal overflow at mobile widths.
  for (const width of [320, 390, 768, 1366]) {
    await page.setViewportSize({ width, height: 768 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    assert.equal(overflow, false, `page has horizontal overflow at ${width}px`);
  }
  await page.setViewportSize({ width: 1366, height: 768 });
  const chipHeight = await page.evaluate(() => {
    const chip = document.querySelector('article[id^="spine-"] a[href^="/"]');
    return chip ? chip.getBoundingClientRect().height : 0;
  });
  assert.ok(chipHeight >= 44, "deep-dive chips meet the 44px touch target");
  passed.push("responsive: no overflow 320–1366px, deep-dive chips ≥44px");

  // 8. Homepage About section carries exactly one link to /about.
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  const homeLinks = await page.evaluate(() => {
    const section = document.querySelector("#about");
    return [...section?.querySelectorAll("a") ?? []]
      .filter((a) => a.getAttribute("href") === "/about")
      .map((a) => a.textContent?.trim() ?? "");
  });
  assert.equal(homeLinks.length, 1, "homepage About has exactly one /about link");
  assert.ok(homeLinks[0].includes("Read the complete brief"), "link label is the brief CTA");
  passed.push("homepage About: exactly one /about link (Read the complete brief)");

  console.log(JSON.stringify({ tag, passed, count: passed.length }, null, 2));
} finally {
  await browser.close();
}

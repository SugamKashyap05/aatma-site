/**
 * About spine smoke — fidelity of the /about brief reader.
 *
 * The rendered page is compared, paragraph by paragraph, against
 * src/data/about-spine.ts plus ABOUT_EDITORIAL (parsed from source at runtime).
 * The source PDF has an opening editorial, byline, ten headed sections, 33
 * section paragraphs, 36 paragraphs overall, and 4,343 words; source spelling
 * and errors remain deliberate. Also checks contents, deep-dive links, theme
 * tokens, mobile overflow, and the homepage About control.
 *
 * Usage: npm run build && npm run preview, then
 *   node scripts/about-spine-smoke.mjs
 * Env: ABOUT_SMOKE_BASE_URL (default http://127.0.0.1:4174),
 *      ABOUT_SMOKE_TAG (default about-spine-final-pdf).
 */
import assert from "node:assert/strict";
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const baseUrl = process.env.ABOUT_SMOKE_BASE_URL ?? "http://127.0.0.1:4174";
const tag = process.env.ABOUT_SMOKE_TAG ?? "about-spine-final-pdf";
const here = path.dirname(fileURLToPath(import.meta.url));

const SECTION_WORDS = [147, 312, 172, 203, 203, 1626, 236, 312, 200, 687];
const SECTION_PARAS = [1, 4, 1, 1, 1, 10, 2, 3, 4, 6];
const EDITORIAL_WORDS = 245;
const TOTAL_WORDS = 4098;
const TOTAL_BRIEF_WORDS = 4343;
const TOTAL_BRIEF_PARAGRAPHS = 36;
const SLIPS = [
  "Achivement",
  "Augast",
  "Occtober",
  "Thiland",
  "Combodia",
  "abumdantly",
  "DIMENTIN",
  "Aquilqriq",
  "discimated",
];
const NAMES = [
  "Hazi Anfar Ali",
  "Hazi Samsul Islam",
  "Binay Kumar Paul",
  "Humayun Chaudhury",
  "A. Rahman",
];
const DEEP_DIVE_HREFS = {
  I: ["/#sanchi-paat", "/history"],
  II: ["/#agar-story", "/history"],
  III: ["/#agar-story"],
  IV: ["/#formation"],
  V: ["/history", "/resources"],
  VI: ["/#critical-era", "/history"],
  VII: ["/#achievement"],
  VIII: ["/#challenges"],
  IX: ["/#ndf-findings"],
  X: ["/#rules", "/policy"],
};
const FINAL_PDF_SECTION_ORDER = ["I", "II", "III", "IV", "V", "VI", "VII", "X", "VIII", "IX"];
const DISPLAY_SECTION_NUMBERS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

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
  return FINAL_PDF_SECTION_ORDER.map((sourceNum, index) => {
    const section = out.find((candidate) => candidate.num === sourceNum);
    assert.ok(section, `source section ${sourceNum} exists`);
    return { ...section, num: DISPLAY_SECTION_NUMBERS[index] };
  });
}

function readEditorial() {
  const src = fs.readFileSync(path.resolve(here, "../src/data/about-spine.ts"), "utf8");
  const block = src.slice(src.indexOf("export const ABOUT_EDITORIAL"), src.indexOf("const SOURCE_SPINE"));
  const paragraphsBlock = block.match(/paragraphs:\s*\[([\s\S]*?)\],\s*author:/)?.[1] ?? "";
  const strings = [...paragraphsBlock.matchAll(/"((?:[^"\\]|\\.)*)"\s*,?/g)].map((match) =>
    JSON.parse(`"${match[1]}"`),
  );
  const heading = block.match(/heading:\s*("(?:[^"\\]|\\.)*")/)?.[1];
  const author = block.match(/author:\s*("(?:[^"\\]|\\.)*")/)?.[1];
  const role = block.match(/role:\s*("(?:[^"\\]|\\.)*")/)?.[1];
  assert.ok(heading && author && role, "editorial heading and byline exist");
  return { heading: JSON.parse(heading), paragraphs: strings, author: JSON.parse(author), role: JSON.parse(role) };
}

const SPINE = readSpine();
const EDITORIAL = readEditorial();
const allText = [EDITORIAL.heading, ...EDITORIAL.paragraphs, EDITORIAL.author, EDITORIAL.role,
  ...SPINE.flatMap((section) => [section.heading, ...section.paragraphs])].join(" ");

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
assert.equal(EDITORIAL.heading, "Editorial", "opening heading matches the PDF");
assert.equal(EDITORIAL.paragraphs.length, 3, "editorial paragraph count drift");
assert.equal(
  EDITORIAL.paragraphs.join(" ").split(/\s+/).filter(Boolean).length,
  EDITORIAL_WORDS,
  "editorial word count drift",
);
assert.equal(SPINE.flatMap((section) => section.paragraphs).length, 33, "section paragraph count drift");
assert.equal(
  SPINE.flatMap((section) => section.paragraphs).join(" ").split(/\s+/).filter(Boolean).length,
  TOTAL_WORDS,
  "section word count drift",
);
assert.equal(
  EDITORIAL.paragraphs.concat(SPINE.flatMap((section) => section.paragraphs)).length,
  TOTAL_BRIEF_PARAGRAPHS,
  "total paragraph count drift",
);
assert.equal(EDITORIAL_WORDS + TOTAL_WORDS, TOTAL_BRIEF_WORDS, "full-brief word count pin drift");
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

  // 2. The opening editorial and source byline are rendered before the contents.
  const renderedEditorial = await page.locator("#brief-editorial").evaluate((article) => ({
    heading: article.querySelector("h2")?.textContent?.trim() ?? "",
    paragraphs: [...article.querySelectorAll("[data-about-editorial-paragraph]")].map((p) => p.textContent?.trim() ?? ""),
    byline: [...article.querySelectorAll("footer div")].map((node) => node.textContent?.trim() ?? ""),
  }));
  assert.equal(renderedEditorial.heading, EDITORIAL.heading, "editorial heading renders");
  assert.deepStrictEqual(renderedEditorial.paragraphs, EDITORIAL.paragraphs, "editorial text matches source");
  assert.deepStrictEqual(renderedEditorial.byline, [EDITORIAL.author, EDITORIAL.role], "editorial byline matches source");
  passed.push("opening editorial: all paragraphs and the byline match the final PDF data");

  // 3. Rendered section DOM matches the data module exactly (order, text, links).
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

  // 5. Contents panel: editorial plus ten anchors, all resolving.
  const contents = await page.evaluate(() => {
    const nav = document.querySelector('nav[aria-label^="Contents"]');
    const links = [...nav?.querySelectorAll("a[href^='#']") ?? []];
    return links.map((a) => ({
      href: a.getAttribute("href"),
      resolves: document.querySelector(a.getAttribute("href")) !== null,
    }));
  });
  assert.equal(contents.length, 11, "contents panel lists the editorial and ten sections");
  assert.ok(contents.every((item) => item.resolves), "every contents anchor resolves");
  assert.deepEqual(
    contents.map((item) => item.href),
    ["#brief-editorial", ...SPINE.map((section) => `#spine-${section.num.toLowerCase()}`)],
    "contents order matches the final PDF",
  );
  passed.push("contents panel: editorial plus ten section anchors in PDF order, all resolve");

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

  // 8. Homepage About exposes the in-place sequence, not a route-away CTA.
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  const aboutToggle = page.locator("#about [data-about-read-more]");
  assert.equal(await aboutToggle.count(), 1, "homepage About has one Read more control");
  assert.equal((await aboutToggle.textContent())?.trim(), "Read more");
  assert.equal(await aboutToggle.getAttribute("aria-expanded"), "false");
  assert.equal(await page.locator("#about a[href='/about']").count(), 0, "About does not route away to the brief reader");
  passed.push("homepage About: collapsed Read more control; no route-away CTA");

  console.log(JSON.stringify({ tag, passed, count: passed.length }, null, 2));
} finally {
  await browser.close();
}

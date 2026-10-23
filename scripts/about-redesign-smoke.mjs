import assert from "node:assert/strict";
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const baseUrl = process.env.ABOUT_SMOKE_BASE_URL ?? "http://127.0.0.1:4174";
const here = path.dirname(fileURLToPath(import.meta.url));
const source = fs.readFileSync(path.resolve(here, "../src/data/about-spine.ts"), "utf8");
const stringPattern = /"((?:[^"\\]|\\.)*)"/g;
const sectionPattern = /num:\s*"(I|II|III|IV|V|VI|VII|VIII|IX|X)",\s*heading:\s*("(?:[^"\\]|\\.)*"),\s*paragraphs:\s*\[([\s\S]*?)\],\s*deepDives:\s*\[/g;
const parsedSections = [...source.matchAll(sectionPattern)].map((match) => ({
  num: match[1],
  heading: JSON.parse(match[2]),
  paragraphs: [...match[3].matchAll(stringPattern)].map((paragraph) => JSON.parse(`"${paragraph[1]}"`)),
}));
const sectionOrder = ["I", "II", "III", "IV", "V", "VI", "VII", "X", "VIII", "IX"];
const expectedSections = sectionOrder.map((sourceNum, index) => {
  const section = parsedSections.find((candidate) => candidate.num === sourceNum);
  assert.ok(section, `source section ${sourceNum} exists`);
  return { ...section, displayNum: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][index] };
});
const expectedItems = expectedSections.map((section) => ({
  id: `section-${section.displayNum.toLowerCase()}`,
  title: section.heading,
  paragraphs: section.paragraphs,
}));
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));

try {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  const about = page.locator("#about");
  await about.waitFor();
  assert.equal(await about.locator("h2").first().textContent(), "From agar heritage to collective action");
  assert.equal(await about.getByRole("button", { name: /অসমীয়াত পঢ়ক/ }).count(), 1);
  assert.equal(await about.locator("[data-about-story-trigger]").count(), 0, "story sequence starts collapsed");
  const readMore = about.locator("[data-about-read-more]");
  assert.equal(await readMore.count(), 1, "About exposes an in-place Read more control");
  assert.equal((await readMore.textContent())?.trim(), "Read more");
  const initialUrl = page.url();
  await readMore.click();
  assert.equal(page.url(), initialUrl, "Read more does not navigate away");
  const triggers = about.locator("[data-about-story-trigger]");
  const allSourceParagraphs = expectedItems.flatMap((item) => item.paragraphs);
  assert.equal(allSourceParagraphs.length, 33, "complete About sequence contains every brief section paragraph");
  assert.equal(allSourceParagraphs.join(" ").split(/\s+/).filter(Boolean).length, 4098, "complete About sequence preserves the brief section word count");
  assert.equal(await readMore.getAttribute("aria-expanded"), "true");
  assert.equal((await readMore.textContent())?.trim(), "Show less");
  assert.equal(await triggers.count(), expectedItems.length, "expanded sequence contains the ten brief sections");
  assert.deepEqual(
    await triggers.evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-about-story-trigger"))),
    expectedItems.map((item) => item.id),
  );

  for (const [index, trigger] of (await triggers.all()).entries()) {
    const expected = expectedItems[index];
    await trigger.click();
    const dialog = page.locator('[data-about-story-dialog][role="dialog"]');
    await dialog.waitFor();
    assert.equal((await dialog.locator("h2").textContent())?.trim(), expected.title);
    assert.equal(Number(await dialog.getAttribute("data-about-story-index")), index);
    assert.equal(await dialog.locator("h2").evaluate((node) => node === document.activeElement), true, "focus enters dialog title");
    assert.deepEqual(await dialog.locator("[data-about-source-paragraph]").allTextContents(), expected.paragraphs);
    assert.equal(await dialog.locator("[data-about-source-paragraph]").count(), Number(await trigger.getAttribute("data-paragraph-count")));
    if (expected.author && expected.role) {
      assert.deepEqual(await dialog.locator("[data-about-story-byline] p").allTextContents(), [expected.author, expected.role]);
    }
    assert.equal(await page.locator("body").evaluate((node) => getComputedStyle(node).overflow), "hidden");
    assert.equal(await page.locator("#root").evaluate((node) => node.inert), true);
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "detached" });
    assert.equal(await trigger.evaluate((node) => node === document.activeElement), true);
  }

  await triggers.first().click();
  const sequenceDialog = page.locator('[data-about-story-dialog][role="dialog"]');
  assert.equal(await sequenceDialog.locator("[data-about-story-previous]").isDisabled(), true, "first story has no previous step");
  await sequenceDialog.locator("[data-about-story-next]").click();
  assert.equal(Number(await sequenceDialog.getAttribute("data-about-story-index")), 1, "Next advances without closing the modal");
  assert.deepEqual(await sequenceDialog.locator("[data-about-source-paragraph]").allTextContents(), expectedItems[1].paragraphs);
  assert.equal(await page.locator("body").evaluate((node) => getComputedStyle(node).overflow), "hidden", "scroll lock persists while advancing");
  await sequenceDialog.locator("[data-about-story-previous]").click();
  assert.equal(Number(await sequenceDialog.getAttribute("data-about-story-index")), 0, "Previous returns to prior story");
  await page.keyboard.press("Escape");
  await sequenceDialog.waitFor({ state: "detached" });

  await triggers.last().click();
  const lastDialog = page.locator('[data-about-story-dialog][role="dialog"]');
  assert.equal(await lastDialog.locator("[data-about-story-next]").isDisabled(), true, "last story has no next step");
  await page.locator("[data-about-story-backdrop]").click({ position: { x: 5, y: 5 } });
  await lastDialog.waitFor({ state: "detached" });

  for (const width of [320, 375, 390, 768, 900, 1024, 1366]) {
    await page.setViewportSize({ width, height: 768 });
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth),
      false,
      `expanded About sequence has no horizontal overflow at ${width}px`,
    );
  }
  await page.setViewportSize({ width: 320, height: 768 });
  await triggers.nth(6).click();
  const narrowDialog = page.locator('[data-about-story-dialog][role="dialog"]');
  const dialogBounds = await narrowDialog.evaluate((node) => {
    const { left, right, top, bottom } = node.getBoundingClientRect();
    return { left, right, top, bottom, width: window.innerWidth, height: window.innerHeight };
  });
  assert.ok(dialogBounds.left >= 0 && dialogBounds.right <= dialogBounds.width, "dialog fits the narrow viewport horizontally");
  assert.ok(dialogBounds.top >= 0 && dialogBounds.bottom <= dialogBounds.height, "dialog fits the narrow viewport vertically");
  const narrowContent = narrowDialog.locator("[data-about-story-content]");
  assert.ok(await narrowContent.evaluate((node) => node.scrollHeight > node.clientHeight), "long story scrolls inside dialog");
  await narrowContent.evaluate((node) => { node.scrollTop = node.scrollHeight; });
  await narrowDialog.locator("[data-about-story-next]").click();
  assert.equal(Number(await narrowDialog.getAttribute("data-about-story-index")), 7);
  assert.equal(await narrowContent.evaluate((node) => node.scrollTop), 0, "next story resets its scroll position");
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 1366, height: 768 });

  await readMore.click();
  assert.equal(await about.locator("[data-about-story-trigger]").count(), 0, "Read more collapses the sequence");
  assert.equal(await readMore.getAttribute("aria-expanded"), "false");
  assert.equal(await readMore.evaluate((node) => node === document.activeElement), true, "collapse returns focus to toggle");
  assert.equal(await about.locator('a[href="/about"]').count(), 0, "About overview has no route-away CTA");
  assert.equal(await about.getByText("Shri A. Rahman").count(), 0);
  assert.equal(await about.getByText("Humayun Chaudhury").count(), 0);

  await page.goto(`${baseUrl}/about`, { waitUntil: "domcontentloaded" });
  // The brief's opening editorial is no longer rendered here; the client
  // replaced it with the President's message, which closes the homepage.
  assert.equal(await page.locator("#brief-editorial").count(), 0);
  assert.equal(await page.locator('article[id^="spine-"]').count(), 10);
  assert.ok(await page.getByText(/Conservation of Agarwood in India/).count());
  assert.ok(await page.getByText(/AATMA recently participated in a one-day stakeholders' workshop/).count());
  assert.deepEqual(
    await page.locator('article[id^="spine-"] h2').allTextContents(),
    [
      "A BRIEF HISTORY OF AGAR",
      "ABOUT THE TRADE",
      "NEW DIMENSION TO AGAR TRADE DUE TO DISCOVERY OF WILD AGARWOOD IN THE FAR EAST ASIAN COUNTRIES .",
      "FORMATION OF AATMA",
      "NATIONAL SEMINAR ON SCOPE & DIMENTIN OF AGAR (Aquilqriq spp.) PLANTATION IN N.E.REGION",
      "CRITICAL ERA OF AGAR TRADE (Year 2001 to 2016)",
      "Achivement",
      "ONGOING CHALLENGES & THE WAY FORWARD",
      "NON-DETRIMENT FINDINGS OF AGAR TREES (AQULARIA MALACCENSIS)",
      "NOTIFICATION OF ASSAM WOOD BASED INDUSTRIES (PROMOTION AND DEVELOPMENT) RULES 2022",
    ],
  );

  for (const width of [320, 390, 768, 1366]) {
    await page.setViewportSize({ width, height: 768 });
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth),
      false,
      `no horizontal overflow at ${width}px`,
    );
  }
  assert.deepEqual(errors, [], "no browser runtime errors");
  console.log("About redesign smoke passed: cards, dialogs, focus, brief fidelity, responsive widths.");
} finally {
  await browser.close();
}

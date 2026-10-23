import assert from "node:assert/strict";
import { chromium } from "playwright";

const baseUrl = process.env.CRITICAL_ERA_BASE_URL ?? "http://127.0.0.1:5173";
const cards = [
  { id: "rules-notified", title: "Rules Notified", expected: ["Legal Procurement Certificate"] },
  { id: "verification-denied", title: "Verification Denied", expected: ["W.P.(c) No. 6284/2007"] },
  {
    id: "trade-under-siege",
    title: "The Trade Targeted",
    expected: ["2010", "Guwahati Airport authorities", "hotels in Maharashtra", "agar dealers based in Mumbai", "unlawful seizures"],
  },
  {
    id: "national-appeal",
    title: "National Meeting on Agarwood Conservation",
    expected: ["December 20, 2011", "Paryavaran Bhawan", "Additional Director General (Wildlife)", "Shri A. Rahman", "strictly a State matter"],
  },
  {
    id: "minister-conference-2016",
    title: "Minister Initiative and National Conference",
    expected: ["Humayun Chaudhury", "August 24, 2016", "October 28, 2016", "NEDFi House", "Secondary Wood Based Industry"],
  },
];
const expectedCardOrder = cards.map((card) => card.id);

const browser = await chromium.launch({ headless: true, channel: "chrome" });
const context = await browser.newContext({
  viewport: { width: 1366, height: 768 },
  hasTouch: true,
});
const page = await context.newPage();
const failures = [];

try {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  const section = page.locator("#critical-era");
  await section.scrollIntoViewIfNeeded();

  const renderedCardIds = await section.locator("[data-critical-era-trigger]").evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute("data-critical-era-trigger")),
  );
  assert.deepEqual(renderedCardIds, expectedCardOrder, "Critical Era should show the five incidents in chronological order: 2000, 2005, 2010, 2011, 2016");
  assert.equal(await section.locator('[data-critical-era-trigger="national-conference"]').count(), 0);

  const agarStory = page.locator("#agar-story");
  assert.equal(await agarStory.getByRole("heading", { name: "Legal Procurement Certificate" }).count(), 0, "standalone LPC card should be removed from Agar Trade");
  assert.equal(await agarStory.getByText(/Local forest authorities used to issue 'Legal Procurement Certificate/).count(), 0, "LPC copy should be absent from Agar Trade");

  await page.emulateMedia({ reducedMotion: "reduce" });
  const firstTrigger = page.locator('[data-critical-era-trigger="rules-notified"]');
  await firstTrigger.hover();
  const reducedMotionStyles = await firstTrigger.evaluate((el) => ({
    enabled: matchMedia("(prefers-reduced-motion: reduce)").matches,
    transform: getComputedStyle(el).transform,
  }));
  assert.equal(reducedMotionStyles.enabled, true);
  assert.equal(reducedMotionStyles.transform, "none", "card still moves with reduced motion enabled");
  await page.emulateMedia({ reducedMotion: "no-preference" });

  for (const width of [320, 390, 768, 1366]) {
    await page.setViewportSize({ width, height: 768 });
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    assert.equal(hasHorizontalOverflow, false, `page has horizontal overflow at ${width}px`);
  }
  await page.setViewportSize({ width: 1366, height: 768 });

  for (const [index, card] of cards.entries()) {
    const trigger = page.locator(`[data-critical-era-trigger="${card.id}"]`);
    await trigger.waitFor({ state: "visible" });
    assert.equal(await trigger.getAttribute("aria-haspopup"), "dialog");
    if (index === 0) {
      await trigger.focus();
      await page.keyboard.press("Enter");
    } else if (index === 1) {
      await trigger.tap();
    } else if (index === 2) {
      await trigger.focus();
      await page.keyboard.press("Space");
    } else {
      await trigger.click();
    }

    const dialog = page.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });
    assert.equal(await page.getByRole("dialog").count(), 1, "more than one dialog is open");
    assert.equal(await dialog.getAttribute("aria-modal"), "true");
    assert.equal(await dialog.getAttribute("aria-labelledby"), "critical-era-dialog-title");
    assert.equal(await page.locator("#critical-era-dialog-title").innerText(), card.title);
    const body = dialog.locator("[data-critical-era-dialog-content]");
    const bodyText = await body.innerText();
    for (const expected of card.expected) {
      assert.ok(bodyText.includes(expected), `${card.id} is missing expected client detail: ${expected}`);
    }
    assert.equal(await page.evaluate(() => document.body.style.overflow), "hidden");

    if (index === 0) {
      assert.equal(
        await page.evaluate(() => document.activeElement?.id),
        "critical-era-dialog-title",
        "dialog should initially focus its title for the long-form content",
      );
      await body.click({ position: { x: 16, y: 16 } });
      assert.equal(await dialog.isVisible(), true, "clicking dialog content should not dismiss it");
      await page.locator("#critical-era-dialog-title").focus();
      await page.keyboard.press("Shift+Tab");
      assert.equal(
        await body.evaluate((el) => document.activeElement === el),
        true,
        "Shift+Tab from the title should wrap to the last dialog tab stop",
      );
      await page.keyboard.press("Tab");
      assert.equal(
        await dialog.getByRole("button", { name: "Close critical era details" }).evaluate((el) => document.activeElement === el),
        true,
        "Tab from the last dialog tab stop should wrap to the first",
      );
      await page.keyboard.press("Escape");
    } else if (index === 1) {
      for (const width of [320, 390, 768, 1366]) {
        await page.setViewportSize({ width, height: 568 });
        const bounds = await dialog.boundingBox();
        assert.ok(bounds && bounds.x >= 0 && bounds.x + bounds.width <= width, `dialog exceeds ${width}px viewport`);
        const closeBounds = await dialog.getByRole("button", { name: "Close critical era details" }).boundingBox();
        assert.ok(closeBounds && closeBounds.y >= 0 && closeBounds.y + closeBounds.height <= 568, `close control is clipped at ${width}px`);
        const hasHorizontalOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        );
        assert.equal(hasHorizontalOverflow, false, `modal page has horizontal overflow at ${width}px`);
      }
      await page.setViewportSize({ width: 320, height: 568 });
      const overflow = await body.evaluate((el) => el.scrollHeight > el.clientHeight);
      assert.ok(overflow, "long detail body should scroll inside the dialog on mobile");
      await body.evaluate((el) => { el.scrollTop = el.scrollHeight; });
      assert.ok(await body.evaluate((el) => el.scrollTop > 0), "dialog detail body did not scroll");
      await page.keyboard.press("Escape");
    } else if (index === 2) {
      await page.locator("[data-critical-era-backdrop]").click({ position: { x: 4, y: 4 } });
    } else {
      await dialog.getByRole("button", { name: "Close critical era details" }).click();
    }

    await dialog.waitFor({ state: "detached" });
    assert.equal(await page.evaluate(() => document.body.style.overflow), "");
    assert.equal(await trigger.evaluate((el) => document.activeElement === el), true, "focus did not return to the card");
    failures.push(`${card.title}: open/content/close/focus passed`);
  }

  await page.setViewportSize({ width: 320, height: 568 });
  const link = section.getByRole("link", { name: /Read the full story/ });
  await link.scrollIntoViewIfNeeded();
  await link.click();
  await page.waitForURL((url) => url.pathname.endsWith("/history"));
  const historyHeading = page.locator("h1");
  await historyHeading.waitFor({ state: "visible" });
  assert.ok((await historyHeading.innerText()).includes("The story of Agar in Assam"));
  failures.push("full-story link: /history navigation passed");

  console.log(JSON.stringify({ passed: failures, count: failures.length }, null, 2));
} finally {
  await browser.close();
}

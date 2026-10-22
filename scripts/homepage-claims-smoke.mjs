import assert from "node:assert/strict";
import { chromium } from "playwright";

const baseUrl = process.env.HOMEPAGE_CLAIMS_BASE_URL ?? "http://127.0.0.1:5173";
const unsupportedLegacyClaims = [
  "~2 Lakh",
  "112 kg to Saudi Arabia",
  "1.51 Lakh kg",
  "1,51,080 kg",
  "7,050 kg",
  "USD 32,000",
  "₹2.35 crore",
  "First Legal Export",
  "global markets of the Middle East",
  "50+ Years of Legacy",
  "50 years of advocacy",
  "resin that forms only in wounded trees",
  "tens of thousands of dollars",
];

const browser = await chromium.launch({ headless: true, channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const pageErrors = [];
page.on("pageerror", (error) => pageErrors.push(error.message));

try {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.locator("#achievement h2").waitFor({ state: "visible" });
  await page.locator("#achievement").scrollIntoViewIfNeeded();
  const achievement = await page.locator("#achievement").innerText();

  assert.match(achievement, />800\s+Agarwood cottage industries on the ground/i);
  assert.match(achievement, /22\s+Years of Struggle/i);
  assert.match(achievement, /1976\s+AATMA formed/i);
  assert.match(achievement, /Dr\. Himanta Biswa Sarma/);
  assert.doesNotMatch(achievement, /Himanta Biswa Sharma/);
  assert.match(achievement, /WBI Rules 2022 Notified/);
  assert.doesNotMatch(achievement, /WBI Rules 2022 Enacted/);

  await page.locator("[data-about-read-more]").click();
  await page.locator("[data-about-story-sequence]").waitFor({ state: "visible" });
  const homepageText = await page.locator("body").innerText();
  const unsupportedFound = unsupportedLegacyClaims.filter((claim) =>
    homepageText.toLowerCase().includes(claim.toLowerCase()),
  );
  assert.deepEqual(unsupportedFound, [], "unsupported legacy claims still render on the homepage");

  assert.deepEqual(pageErrors, [], "homepage raised browser errors");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  assert.equal(overflow, false, "homepage has horizontal overflow at 390px");

  console.log("Homepage claim smoke passed: sourced achievement wording, retired unsupported claims absent, About expands, no page errors, 390px layout fits.");
} finally {
  await browser.close();
}

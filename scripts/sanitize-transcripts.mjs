/**
 * Sanitize transcript markdown files for web display.
 * Strips named individuals from spoken content — speaker labels S1/S2/S3 only.
 * Reads from docs/, writes sanitized copies to docs/web/.
 */
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsDir = join(__dirname, "..", "docs");
const outDir = join(__dirname, "..", "docs", "web");

const NAMED_INDIVIDUALS = [
  // English variants
  "Ataur Rahman",
  "Helal Uddin",
  "Anwar Hussain",
  "Ramesh Nath",
  // Assamese variants
  "আতাউৰ ৰহমান",
  "হেলালুদ্দিন",
  "আনোৱাৰ হুছেইন",
  "ৰমেশ নাথ",
  // Hindi variants
  "अताउर रहमान",
  "हेलालुद्दीन",
  "अंवार हुसैन",
  "रमेश नाथ",
];

function sanitizeNames(text) {
  let result = text;
  for (const name of NAMED_INDIVIDUALS) {
    result = result.replace(
      new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
      "[name withheld]"
    );
  }
  return result;
}

const files = readdirSync(docsDir).filter((f) =>
  f.startsWith("TRANSCRIPT_PRESS_MEET_2023-01-14") && f.endsWith(".md")
);

for (const file of files) {
  const raw = readFileSync(join(docsDir, file), "utf-8");
  const sanitized = sanitizeNames(raw);
  const outPath = join(outDir, file);
  writeFileSync(outPath, sanitized, "utf-8");

  // Report
  const remaining = NAMED_INDIVIDUALS.filter((name) =>
    sanitized.toLowerCase().includes(name.toLowerCase())
  );
  console.log(
    `${file}: ${raw.length} -> ${sanitized.length} chars` +
      (remaining.length ? ` (REMAINING: ${remaining.join(", ")})` : " [clean]")
  );
}

console.log(`\nWrote ${files.length} sanitized files to docs/web/`);

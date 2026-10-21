/**
 * Sanitize transcript markdown files for web display.
 * Keeps only speaker transcript blocks, strips named individuals, and omits
 * internal research notes. Reads from docs/, writes public-safe copies to docs/web/.
 */
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsDir = join(__dirname, "..", "docs");
const outDir = join(__dirname, "..", "docs", "web");

const NAMED_INDIVIDUALS = [
  // English variants
  "[REDACTED: AATMA member]",
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

function extractSpeakerTranscript(text) {
  const output = [];
  let inSpeakerBlock = false;

  for (const line of text.split(/\r?\n/)) {
    if (/^#{1,6}\s+(?:Facts extracted|Verification summary|Speaker attribution|File locations|Still outstanding|Files|What this changes|Notes on this translation)/i.test(line)) {
      break;
    }

    if (/^#{2,4}\s+(?:Speaker|वक्ता)\s*\d+\s*[—–-]/.test(line)) {
      inSpeakerBlock = true;
      output.push(line);
      continue;
    }

    if (/^#{1,6}\s+/.test(line)) {
      inSpeakerBlock = false;
      continue;
    }

    if (inSpeakerBlock) output.push(line);
  }

  const transcript = output.join("\n").trim();
  if (!transcript) throw new Error("No speaker transcript found; refusing to write empty public file.");
  return `${transcript}\n`;
}

const files = readdirSync(docsDir).filter((f) =>
  f.startsWith("TRANSCRIPT_PRESS_MEET_2023-01-14") && f.endsWith(".md")
);

for (const file of files) {
  const raw = readFileSync(join(docsDir, file), "utf-8");
  const sanitized = extractSpeakerTranscript(sanitizeNames(raw));
  const outPath = join(outDir, file);
  writeFileSync(outPath, sanitized, "utf-8");

  const remaining = NAMED_INDIVIDUALS.filter((name) =>
    sanitized.toLowerCase().includes(name.toLowerCase())
  );
  console.log(
    `${file}: ${raw.length} -> ${sanitized.length} transcript chars` +
      (remaining.length ? ` (REMAINING: ${remaining.join(", ")})` : " [clean]")
  );
}

console.log(`\nWrote ${files.length} transcript-only files to docs/web/`);

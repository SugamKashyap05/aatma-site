import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = (relativePath) => path.join(root, relativePath);
const read = (relativePath) => readFile(file(relativePath));
const text = async (relativePath) => (await read(relativePath)).toString("utf8");

const sanchi = await text("src/features/home/SanchiPaatSection.tsx");
assert.match(sanchi, /history\/sanchi-paat-original\.png/, "homepage should use the supplied book scan");
assert.match(sanchi, /taken in the year 2000/, "book caption should preserve the supplied photo year note");
const sanchiBytes = await read("public/history/sanchi-paat-original.png");
assert.deepEqual([...sanchiBytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], "Sanchi scan should be a PNG");

for (const relativePath of [
  "src/components/ui/Navbar.tsx",
  "src/components/ui/ImmersiveNavbar.tsx",
  "src/features/footer/Footer.tsx",
  "src/features/about/AboutOverview.tsx",
  "src/features/about/About.tsx",
]) {
  const source = await text(relativePath);
  assert.match(source, /AatmaLogo/, `${relativePath} should use the supplied organization logo`);
  assert.doesNotMatch(source, /viewBox="0 0 100 100"/, `${relativePath} should not draw a substitute seal`);
}

const index = await text("index.html");
assert.match(index, /rel="icon"[^>]*href="%BASE_URL%favicon\.png"/, "tab icon should use the supplied-logo favicon");
assert.match(index, /og:image[^>]*aatma-logo\.jpg/, "external link previews should use the supplied logo");
assert.match(index, /twitter:image[^>]*aatma-logo\.jpg/, "social previews should use the supplied logo");
for (const asset of ["public/brand/aatma-logo.jpg", "public/favicon.png", "public/favicon.ico", "public/apple-touch-icon.png"]) {
  assert.ok((await read(asset)).length > 0, `${asset} should exist`);
}

const gallery = await text("src/features/agarStory/ClientAgarwoodPhotos.tsx");
const photoPaths = [...gallery.matchAll(/path:\s*"(client-images\/agarwood\/[^"]+\.(?:jpg|jpeg|png|webp))"/g)].map((match) => match[1]);
assert.equal(photoPaths.length, 5, "agarwood gallery should retain five distinct photographs");
const hashes = [];
for (const relativePath of photoPaths) {
  const bytes = await read(`public/${relativePath}`);
  hashes.push(createHash("sha256").update(bytes).digest("hex"));
}
assert.equal(new Set(photoPaths).size, 5, "agarwood gallery paths should be unique");
assert.equal(new Set(hashes).size, 5, "agarwood gallery files should not contain duplicate photos");
assert.ok(photoPaths.includes("client-images/agarwood/agarwood-liquid-dark-sample.jpg"), "dark liquid-sample photo should replace a duplicate");
assert.ok(photoPaths.includes("client-images/agarwood/agarwood-liquid-amber-samples.jpg"), "amber liquid-sample photo should replace a duplicate");

console.log(`Client asset smoke passed: original Sanchi scan, five unique agarwood photos, and all supplied-logo placements.`);

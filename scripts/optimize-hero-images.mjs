/**
 * Phase 1 hero image optimization.
 *
 * Downloads the 17 parallax hero PNGs from the 21st.dev CDN and converts them
 * to responsive WebP + AVIF.
 *
 * Key detail: each layer in ParallaxHero has a FIXED CSS width, so a 408px
 * layer must not be served a 1920px file. We generate exactly the variants
 * each layer can actually use:
 *   1x = min(displayWidth, sourceWidth)
 *   2x = min(displayWidth * 2, sourceWidth)
 * The full-bleed background layer is viewport-sized instead (1920 / 3840).
 *
 * Soft, low-opacity fog layers get a lower quality than detailed mountains.
 *
 * Run: node scripts/optimize-hero-images.mjs
 */
import sharp from "sharp";
import { mkdir, writeFile, readFile, rm, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CACHE = path.join(ROOT, "scripts", ".hero-cache");
const OUT = path.join(ROOT, "src", "assets", "hero");

/**
 * `display` = the CSS width from ParallaxHero's style.width.
 * `kind`    = "bg" (viewport-sized) | "soft" (fog, low detail) | "detail" (mountain)
 * Order matches ParallaxHero.defaultLayers.
 */
const LAYERS = [
  { name: "bg",         display: null, kind: "bg",     url: "https://cdn.21st.dev/assets/mirror/bf/bfb8ca258f591d2b7388d05d79ac2332b695867281627c1bc8c7165ca6429a6d.png" },
  { name: "fog-7",      display: 1900, kind: "soft",   url: "https://cdn.21st.dev/assets/mirror/c8/c878e14d1f8e481f6f70b31fb01de352338db5353f5b8852a241062bb251b558.png" },
  { name: "mountain-10",display: 1200, kind: "detail", url: "https://cdn.21st.dev/assets/mirror/e9/e94a2247aa54feee12cd1580a7c3abf97d6f55bbe7e50006d8dda6e4dffbe921.png" },
  { name: "fog-6",      display: 2200, kind: "soft",   url: "https://cdn.21st.dev/assets/mirror/99/9955626de3f10d97d27b7b89f7be180c02e1700f288db28e0c6824142871523f.png" },
  { name: "mountain-9", display: 670,  kind: "detail", url: "https://cdn.21st.dev/assets/mirror/dd/dd999609be149c46fcb65fce4d267cad8d5651b0c31901b399054da5146cb46e.png" },
  { name: "fog-5",      display: 650,  kind: "soft",   url: "https://cdn.21st.dev/assets/mirror/d5/d579e64ddeb3a32d04dff5391980b827eb4d6d4aafa2cc3231e2cbe02d66a7c7.png" },
  { name: "mountain-7", display: 738,  kind: "detail", url: "https://cdn.21st.dev/assets/mirror/b7/b74be54427fd5b9568571ba97684bc8a4334d366a3f3b32c353d31fd1501c09b.png" },
  { name: "mountain-6", display: 408,  kind: "detail", url: "https://cdn.21st.dev/assets/mirror/ed/edf306a4225b6188283aa94ecec1553b2e0855038a3acaed402001f38c64af1d.png" },
  { name: "fog-4",      display: 590,  kind: "soft",   url: "https://cdn.21st.dev/assets/mirror/8d/8d12582b7eac71f981eca3a8bb19157fb57fc4b05c14f9ef80fd029e5fecfab5.png" },
  { name: "mountain-5", display: 725,  kind: "detail", url: "https://cdn.21st.dev/assets/mirror/9c/9c1a1b7f4b165011788c27d440d920e407d70f148cbc9a01eacfecb49126efcb.png" },
  { name: "fog-3",      display: 1600, kind: "soft",   url: "https://cdn.21st.dev/assets/mirror/0e/0e7888cc6d1732222b5c1f38b925cf1ecdb7fec02fd1193dd1cfef280a453c5a.png" },
  { name: "mountain-4", display: 1100, kind: "detail", url: "https://cdn.21st.dev/assets/mirror/fa/fa0946f924ad025b207616cfe20ce022bcccd22ac9db4038a584ace23b7d9721.png" },
  { name: "mountain-3", display: 630,  kind: "detail", url: "https://cdn.21st.dev/assets/mirror/90/90863919566208c1eb7a78136d1dd493dd402f4d5a5efe2fc890a288a6b07449.png" },
  { name: "fog-2",      display: 1100, kind: "soft",   url: "https://cdn.21st.dev/assets/mirror/b2/b2d0ba5c7f17d038a04475b8f36563aea22cfee00983db3b5477f1ac4c9a5097.png" },
  { name: "mountain-2", display: 800,  kind: "detail", url: "https://cdn.21st.dev/assets/mirror/c4/c4ae700b3a0070eae9f3c005a17572ae68fcb8373d322f279d28c5bf19cd501d.png" },
  { name: "mountain-1", display: 1100, kind: "detail", url: "https://cdn.21st.dev/assets/mirror/41/414097ad4507410ac1dc884afcc92bb3f4f45763fd17b2986bf82dd43c31da97.png" },
  { name: "fog-1",      display: 1900, kind: "soft",   url: "https://cdn.21st.dev/assets/mirror/aa/aa8ace86d9779fcccce3a1a28b8ac0cb86336b5980706659f2c8889c3daaf5a1.png" },
];

/**
 * Quality per layer kind. These are soft, low-contrast parallax layers painted
 * behind a heavy radial vignette (see ParallaxHero's overlay), and they are
 * frequently scaled up by the browser to fill their CSS width — so fine detail
 * is both invisible and lost. Aggressive AVIF settings cut the payload roughly
 * in half with no perceptible difference.
 */
const QUALITY = {
  bg:     { webp: 70, avif: 50 },
  soft:   { webp: 60, avif: 32 },
  detail: { webp: 72, avif: 45 },
};

/** Background is full-bleed, so size it to the viewport, not its CSS width. */
const BG_WIDTHS = [640, 1280, 1920, 3840];

async function download(url, dest) {
  if (existsSync(dest)) return await readFile(dest);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return buf;
}

/**
 * Every layer is absolutely positioned at a FIXED CSS width that is often wider
 * than the viewport, so the honest `sizes` for a phone is the viewport width,
 * not the layer's CSS width. We therefore always offer a small variant plus a
 * mid variant, then the layer's own 1x/2x.
 *
 * Without the small/mid entries a phone's `sizes="100vw"` at DPR 3 resolves to
 * ~1170px, which forces the largest variant to be downloaded.
 */
const COMMON_WIDTHS = [640, 1280];

/**
 * The largest useful variant. Beyond this the browser scales layers up to fill
 * their CSS width anyway (they are soft, low-contrast, and behind a vignette),
 * so source-resolution variants at 2700–3400px are pure waste: never selected
 * on a real device, but they bloat the repo and the build output.
 */
const MAX_WIDTH = 1920;

function widthsFor(layer, sourceWidth) {
  const candidates =
    layer.kind === "bg"
      ? BG_WIDTHS
      : [...COMMON_WIDTHS, layer.display, layer.display * 2];

  // Dedupe, never upscale past the source, cap at MAX_WIDTH, keep ascending.
  const capped = candidates
    .map((w) => Math.min(Math.round(w), sourceWidth, MAX_WIDTH))
    .filter((w, i, a) => a.indexOf(w) === i);
  return capped.sort((a, b) => a - b);
}

async function main() {
  await mkdir(CACHE, { recursive: true });
  await mkdir(OUT, { recursive: true });

  // Remove only previously generated image variants — NOT the hand-written
  // index.ts / manifest.ts that live in the same directory. A blanket rm -rf
  // on OUT would delete them.
  const existing = await readdir(OUT).catch(() => []);
  await Promise.all(
    existing
      .filter((f) => /\.(webp|avif)$/.test(f))
      .map((f) => rm(path.join(OUT, f), { force: true }))
  );

  const manifest = [];
  let totalBefore = 0;
  let webpAfter = 0;
  let avifAfter = 0;

  for (const layer of LAYERS) {
    const png = await download(layer.url, path.join(CACHE, `${layer.name}.png`));
    totalBefore += png.length;

    const meta = await sharp(png).metadata();
    const widths = widthsFor(layer, meta.width);
    const q = QUALITY[layer.kind];

    const row = {
      name: layer.name,
      kind: layer.kind,
      aspect: +(meta.width / meta.height).toFixed(4),
      sourceWxH: `${meta.width}x${meta.height}`,
      sourceKB: +(png.length / 1024).toFixed(0),
      variants: [],
    };

    let layerWebp = 0;
    let layerAvif = 0;

    for (const w of widths) {
      const resized = () => sharp(png).resize({ width: w, withoutEnlargement: true });

      const webp = await resized().webp({ quality: q.webp, effort: 6 }).toBuffer();
      const avif = await resized().avif({ quality: q.avif, effort: 5 }).toBuffer();

      const webpName = `${layer.name}-${w}.webp`;
      const avifName = `${layer.name}-${w}.avif`;
      await writeFile(path.join(OUT, webpName), webp);
      await writeFile(path.join(OUT, avifName), avif);

      layerWebp += webp.length;
      layerAvif += avif.length;
      row.variants.push({ w, webp: webpName, avif: avifName, webpKB: +(webp.length / 1024).toFixed(0) });
    }

    webpAfter += layerWebp;
    avifAfter += layerAvif;
    manifest.push(row);

    console.log(
      `${layer.name.padEnd(12)} ${row.sourceWxH.padEnd(11)} ${String(row.sourceKB).padStart(6)} KB -> ` +
      `[${widths.join(", ")}]px  webp ${String((layerWebp / 1024).toFixed(0)).padStart(4)} KB  ` +
      `avif ${String((layerAvif / 1024).toFixed(0)).padStart(4)} KB`
    );
  }

  await writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));

  const mb = (b) => (b / 1024 / 1024).toFixed(2);
  console.log("\n" + "=".repeat(66));
  console.log(`ORIGINAL  : ${mb(totalBefore)} MB  (17 PNGs, uncompressed)`);
  console.log(`WEBP      : ${mb(webpAfter)} MB  (all variants)`);
  console.log(`AVIF      : ${mb(avifAfter)} MB  (all variants)`);
  console.log(`REDUCTION : ${(100 - (webpAfter / totalBefore) * 100).toFixed(1)}% (webp) / ${(100 - (avifAfter / totalBefore) * 100).toFixed(1)}% (avif)`);
  console.log("=".repeat(66));
}

main().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});

// Composes the Torchsnap favicon at 128 px:
//   1. Fills a 128×128 canvas with the orange linear gradient
//      sampled from the desktop app icon
//      (src-tauri/icons/app-icon-source.png in upstream).
//   2. Uses the upstream tray template (snappy-tray-template-2-128px)
//      as a mask: gradient pixels stay where the source owl is dark,
//      go fully transparent where it is bright. Edges retain the
//      template's anti-aliased silhouette via the same luminance →
//      alpha synthesis used by every other path here.
//
// Result: a transparent PNG whose only visible pixels form the owl
// shape, painted with the orange gradient flowing top-to-bottom
// through it. No bounding rectangle, no rounded square — the owl
// itself is the mark.
//
// Output: web/public/favicon-128.png. Larger sizes (180/192/512)
// remain a separate, future job, planned to use the detailed
// mascot on the same gradient with a proper rounded-square frame
// (matching how the desktop and tray icons are produced upstream).

import sharp from "sharp";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
// `web/tools/` → `web/` → repo root.
const WEB_ROOT = resolve(HERE, "..");
const REPO_ROOT = resolve(WEB_ROOT, "..");
// Brand-level source asset, shared with anything that may need the
// same iconography in the future (lives outside the web project).
const SRC_OWL = resolve(REPO_ROOT, "assets/favicon/owl-source-128.png");
const OUT = resolve(WEB_ROOT, "public/favicon-128.png");

const SIZE = 128;
// Stops chosen to give a visible top-to-bottom shift inside the
// silhouette at small favicon sizes: a light, warm peach at the top
// and a deeper red-orange at the bottom. Original desktop-icon
// source was #f87316 / #da7707 (much narrower contrast).
const TOP_COLOR = "#ffb060"; // rgb(255,176,96)  — light peach
const BOT_COLOR = "#e0600a"; // rgb(224,96,10)   — deep red-orange

// Layer 1: full-canvas linear gradient, no rounded corners — the
// owl silhouette in layer 2 is the actual visible boundary.
const gradientSvg = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${TOP_COLOR}"/>
        <stop offset="1" stop-color="${BOT_COLOR}"/>
      </linearGradient>
    </defs>
    <rect width="${SIZE}" height="${SIZE}" fill="url(#g)"/>
  </svg>
`);

// Layer 2: alpha mask synthesised from the source's inverted
// luminance. Source is RGB-only, drawn as black-on-white. Inverting
// the red channel (≡ luminance for a grayscale source) gives a
// single-channel alpha map: 255 inside the silhouette, 0 outside,
// proportional values along the anti-aliased edge.
const { data: owlRgb } = await sharp(SRC_OWL)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const maskRgba = Buffer.alloc(SIZE * SIZE * 4);
for (let i = 0, j = 0; i < owlRgb.length; i += 3, j += 4) {
  // Mask colour is irrelevant — `dest-in` only consumes the source's
  // alpha. Leave RGB at zero for cleanliness.
  maskRgba[j] = 0;
  maskRgba[j + 1] = 0;
  maskRgba[j + 2] = 0;
  maskRgba[j + 3] = 255 - owlRgb[i];
}
const owlMask = await sharp(maskRgba, {
  raw: { width: SIZE, height: SIZE, channels: 4 },
})
  .png()
  .toBuffer();

// `dest-in` keeps the destination (gradient) wherever the source
// (mask) has alpha. Pixels outside the owl become fully transparent
// in the output.
await sharp(gradientSvg)
  .ensureAlpha()
  .composite([{ input: owlMask, blend: "dest-in" }])
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(`wrote ${OUT}`);

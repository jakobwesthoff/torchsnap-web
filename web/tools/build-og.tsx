// Composes the Torchsnap social-share (Open Graph) card at 1200×630.
//
// Pipeline:
//   1. Satori takes a JSX tree built with Flexbox layout and resolves
//      every position / size — no manual x/y math, the composition
//      centres itself.
//   2. Resvg renders the resulting SVG to a PNG.
//   3. Oxipng squeezes the final asset (skipped silently if not on
//      PATH).
//
// Fonts: Satori needs static-font buffers (its bundled opentype.js
// fork cannot parse fvar tables, so the project's variable Inter
// woff2 is a non-starter here). Two Latin-only static TTFs from
// Fontsource live in `assets/fonts/` for SemiBold (600, used by the
// wordmark) and Bold (700, used by the eyebrow). They are used only
// by this build — the website itself still serves the variable
// woff2 to the browser.
//
// JSX without React: Bun runs .tsx natively, and Satori accepts
// React-style elements regardless of the framework. The
// `jsx-runtime` shim below wires the JSX factory to a small node
// constructor that produces Satori's expected `{ type, props }`
// shape.
//
// Output: web/public/og.png. Layout.astro emits the matching
// og:image / twitter:image meta tags.

/** @jsx jsx */
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Minimal JSX factory that produces the {type, props} shape Satori
// consumes. Children flatten and pass through unchanged.
function jsx(type: string, props: Record<string, unknown> | null, ...children: unknown[]) {
  const flat = children.flat(Infinity);
  return {
    type,
    props: {
      ...(props ?? {}),
      children: flat.length === 1 ? flat[0] : flat,
    },
  };
}

const HERE = dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = resolve(HERE, "..");
const REPO_ROOT = resolve(WEB_ROOT, "..");

const FONT_SEMIBOLD_PATH = resolve(REPO_ROOT, "assets/fonts/Inter-SemiBold.ttf");
const FONT_BOLD_PATH = resolve(REPO_ROOT, "assets/fonts/Inter-Bold.ttf");
// Pre-trimmed Snappy: the marketing PNG at
// web/src/assets/mascots/snappy-original-1024.png ships with built-in
// transparent padding, so its layout box is much bigger than the
// visible figure and Satori would mis-centre it. The trimmed copy
// below has the alpha-empty borders stripped exactly once and the
// resulting native dimensions baked in here. Re-trim only if the
// upstream mascot artwork ever changes.
const SNAPPY_PATH = resolve(REPO_ROOT, "assets/og/snappy-trimmed.png");
const SNAPPY_NATIVE_W = 614;
const SNAPPY_NATIVE_H = 729;
const OUT = resolve(WEB_ROOT, "public/og.png");

// Canvas — Open Graph standard 1.91:1 aspect.
const W = 1200;
const H = 630;

// Dark-mode surface from the design tokens (theme.css). The whole
// canvas is filled with this — OG cards stay opaque so the asset
// looks identical across Slack / Discord / Twitter / LinkedIn /
// Bluesky chrome (all of which composite transparent PNGs against
// platform-specific backgrounds in inconsistent ways).
const SURFACE = "#1c1c1e";

// Orange app-icon gradient — used for the eyebrow text fill via
// background-clip: text.
const TOP = "#f87316"; // rgb(248,115,22)
const BOT = "#da7707"; // rgb(218,119,7)

const [semibold, bold, snappyPng] = await Promise.all([
  readFile(FONT_SEMIBOLD_PATH),
  readFile(FONT_BOLD_PATH),
  readFile(SNAPPY_PATH),
]);
const snappyDataUrl = `data:image/png;base64,${snappyPng.toString("base64")}`;

// Display the mascot at 80 % of the canvas height; width follows
// from the trimmed PNG's native aspect ratio. The trimmed source
// has no transparent padding so this height is the actual rendered
// figure.
const SNAPPY_VISIBLE_HEIGHT = Math.round(H * 0.65);
const snappyW = Math.round(SNAPPY_VISIBLE_HEIGHT * (SNAPPY_NATIVE_W / SNAPPY_NATIVE_H));
const snappyH = SNAPPY_VISIBLE_HEIGHT;

// Site-mirror typography:
//   - Eyebrow follows the global `.eyebrow` utility — bold (700),
//     uppercase, 0.2 em tracking — but recoloured here from the flat
//     accent into the orange gradient via background-clip: text so
//     it carries the brand colours visibly on the dark surface.
//   - Wordmark mirrors the hero <h1> — semibold (600), tight
//     tracking (-0.025 em), tight line-height (1.05). Sized roughly
//     2× the live page's 64 px for the OG canvas.
//
// Eyebrow font size below was measured once (resvg innerBBox of each
// rendered text) so its rendered width matches the wordmark's width
// exactly: 30 → 455 px, 124 → 613 px, ratio 1.347 → 40.4 px.
const EYEBROW_FONT = 40;
const WORDMARK_FONT = 124;

const tree = (
  <div
    style={{
      display: "flex",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      gap: 86,
      padding: "0 60px",
      backgroundColor: SURFACE,
    }}
  >
    <img src={snappyDataUrl} width={snappyW} height={snappyH} style={{ display: "block" }} />
    {/* Text column laid out as block flow rather than a flex gap so
        the eyebrow's bottom margin (typographic spacing) does the
        work, not an out-of-band layout property. The rhythm mirrors
        the live hero: eyebrow `.mb-5` (20 px) above an h1 sized
        roughly 5× the eyebrow — here the wordmark is ~3× so the
        margin scales proportionally. */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          fontSize: EYEBROW_FONT,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: EYEBROW_FONT * 0.2,
          textTransform: "uppercase",
          marginBottom: Math.round(EYEBROW_FONT * 0.6),
          backgroundImage: `linear-gradient(180deg, ${TOP} 0%, ${BOT} 100%)`,
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Light · Find · Launch
      </div>
      <div
        style={{
          fontSize: WORDMARK_FONT,
          fontWeight: 600,
          color: "#ffffff",
          letterSpacing: WORDMARK_FONT * -0.025,
          lineHeight: 1.05,
        }}
      >
        Torchsnap
      </div>
    </div>
  </div>
);

const svg = await satori(tree as Parameters<typeof satori>[0], {
  width: W,
  height: H,
  fonts: [
    { name: "Inter", data: semibold, weight: 600, style: "normal" },
    { name: "Inter", data: bold, weight: 700, style: "normal" },
  ],
});

const resvg = new Resvg(svg, { font: { loadSystemFonts: false } });
await writeFile(OUT, resvg.render().asPng());
console.log(`wrote ${OUT}`);

// Compress with oxipng if available. Skips silently when not on PATH.
const oxipng = Bun.spawn(
  ["oxipng", "-o", "max", "--strip", "safe", "--alpha", OUT],
  { stdout: "pipe", stderr: "pipe" },
);
const exitCode = await oxipng.exited;
if (exitCode === 0) {
  console.log("oxipng: compressed");
} else {
  const stderr = await new Response(oxipng.stderr).text();
  console.warn(`oxipng skipped (exit ${exitCode}): ${stderr.trim()}`);
}

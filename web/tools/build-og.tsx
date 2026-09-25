// Composes the Torchsnap social-share (Open Graph) card at 1200×630.
//
// KEEP IN SYNC: docs.torchsnap.app has its own variant of this card,
// built by tools/build-og.tsx in the torchsnap-docs repository. Both
// cards share colours, typography, pipeline and the vertical,
// square-safe layout. The docs card uses the reading owl, adds "Docs"
// to the wordmark and has smaller sizes to fit the longer wordmark.
// A change to the shared design here likely needs the same change
// there, and the other way round.
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
// React-style elements regardless of the framework. The pragmas
// below wire the JSX factory to a small node constructor that
// produces Satori's expected `{ type, props }` shape. Bun honors
// `@jsx` only under the classic runtime. Under the automatic runtime
// it imports `react/jsx-dev-runtime`, which this project does not
// install.
//
// Output: web/public/og.png. Layout.astro emits the matching
// og:image / twitter:image meta tags.

/** @jsxRuntime classic */
/** @jsx jsx */
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

// Minimal JSX factory that produces the {type, props} shape Satori
// consumes. Children flatten and pass through unchanged.
export function jsx(type: string, props: Record<string, unknown> | null, ...children: unknown[]) {
  const flat = children.flat(Infinity);
  return {
    type,
    props: {
      ...(props ?? {}),
      children: flat.length === 1 ? flat[0] : flat,
    },
  };
}

// TypeScript looks up the JSX types on the classic factory's namespace
// before the global one, so declaring them here keeps them out of every
// other file. Satori takes any HTML tag with arbitrary props.
export declare namespace jsx {
  namespace JSX {
    type Element = ReturnType<typeof jsx>;
    interface IntrinsicElements {
      [tag: string]: Record<string, unknown>;
    }
  }
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

// Slack shows link-card images in a square slot and centre-crops the
// 1200×630 card to its middle 630×630. Mascot, eyebrow and wordmark
// are therefore stacked vertically and sized so the whole group fits
// that square: the rendered group measures 504×534 px, leaving about
// 60 px at the sides and 48 px above and below. Wider platforms (X,
// LinkedIn, Discord) show the full card with the same group centred.
//
// The trimmed source has no transparent padding, so this height is
// the rendered figure; width follows from its native aspect ratio.
const SNAPPY_VISIBLE_HEIGHT = 340;
const snappyW = Math.round(SNAPPY_VISIBLE_HEIGHT * (SNAPPY_NATIVE_W / SNAPPY_NATIVE_H));
const snappyH = SNAPPY_VISIBLE_HEIGHT;

// Site-mirror typography:
//   - Eyebrow follows the global `.eyebrow` utility — bold (700),
//     uppercase, 0.2 em tracking — but recoloured here from the flat
//     accent into the orange gradient via background-clip: text so
//     it carries the brand colours visibly on the dark surface.
//   - Wordmark mirrors the hero <h1> — semibold (600), tight
//     tracking (-0.025 em), tight line-height (1.05).
//
// The wordmark size is the largest that keeps the group inside the
// square. The eyebrow size aligns it optically with the wordmark. At
// 33.3 px both rows measure exactly 504 px of ink, but the eyebrow's
// square "L" and "H" then look wider than the wordmark's round "p"
// ending. At 32.6 px the eyebrow sits about 5 px inside the wordmark
// on each side, which reads as flush.
const EYEBROW_FONT = 32.6;
const WORDMARK_FONT = 104;

export interface CardAssets {
  semibold: Buffer;
  bold: Buffer;
  snappyPng: Buffer;
}

export async function renderCard({ semibold, bold, snappyPng }: CardAssets): Promise<Buffer> {
  const snappyDataUrl = `data:image/png;base64,${snappyPng.toString("base64")}`;

  const tree = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: SURFACE,
      }}
    >
      <img
        src={snappyDataUrl}
        width={snappyW}
        height={snappyH}
        style={{ display: "block", marginBottom: 28 }}
      />
      {/* Text block laid out as block flow rather than a flex gap so
          the eyebrow's bottom margin (typographic spacing) does the
          work, not an out-of-band layout property. */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
          {/* Satori applies letter-spacing to non-breaking spaces but
              not to regular ones, and the separators need the same
              tracking as the letters around them. */}
          {"Light · Find · Launch"}
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
  return resvg.render().asPng();
}

// Compress with oxipng if available. Skips silently when not on PATH.
export async function compressWithOxipng(path: string, command = "oxipng"): Promise<boolean> {
  try {
    await promisify(execFile)(command, ["-o", "max", "--strip", "safe", "--alpha", path]);
    return true;
  } catch (error) {
    const { code, stderr } = error as { code?: unknown; stderr?: string };
    if (typeof code !== "number") throw error;
    console.warn(`oxipng skipped (exit ${code}): ${stderr?.trim()}`);
    return false;
  }
}

async function main(): Promise<void> {
  const [semibold, bold, snappyPng] = await Promise.all([
    readFile(FONT_SEMIBOLD_PATH),
    readFile(FONT_BOLD_PATH),
    readFile(SNAPPY_PATH),
  ]);
  await writeFile(OUT, await renderCard({ semibold, bold, snappyPng }));
  console.log(`wrote ${OUT}`);

  if (await compressWithOxipng(OUT)) {
    console.log("oxipng: compressed");
  }
}

if (import.meta.main) {
  await main();
}

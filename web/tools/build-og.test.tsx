/** @jsxRuntime classic */
/** @jsx jsx */
import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import sharp from "sharp";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { compressWithOxipng, jsx, renderCard } from "./build-og";

const WEB_ROOT = resolve(import.meta.dirname, "..");
const REPO_ROOT = resolve(WEB_ROOT, "..");

let dir: string;

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), "build-og-"));
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

// The test build compiles JSX in development mode, which adds `__self`
// and `__source` props. Satori ignores them, so the assertions below
// check only the props the factory itself produces.
describe("jsx", () => {
  it("builds the { type, props } node Satori expects", () => {
    const node = <div style={{ display: "flex" }} />;
    expect(node.type).toBe("div");
    expect(node.props).toMatchObject({ style: { display: "flex" }, children: [] });
  });

  it("passes a single child through unwrapped", () => {
    expect((<span>Torchsnap</span>).props.children).toBe("Torchsnap");
  });

  it("builds a node without props", () => {
    expect(jsx("br", null)).toEqual({ type: "br", props: { children: [] } });
  });

  it("flattens nested child lists", () => {
    const items = ["a", ["b", ["c"]]];
    expect((<p>{items}</p>).props.children).toEqual(["a", "b", "c"]);
  });
});

describe("renderCard", () => {
  it("renders the committed og.png pixel for pixel", async () => {
    const [semibold, bold, snappyPng] = await Promise.all([
      readFile(join(REPO_ROOT, "assets/fonts/Inter-SemiBold.ttf")),
      readFile(join(REPO_ROOT, "assets/fonts/Inter-Bold.ttf")),
      readFile(join(REPO_ROOT, "assets/og/snappy-trimmed.png")),
    ]);

    const card = await renderCard({ semibold, bold, snappyPng });

    // og.png is committed after lossless oxipng compression, so the
    // decoded pixels, not the bytes, have to match.
    const rendered = await sharp(card).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const committed = await sharp(join(WEB_ROOT, "public/og.png"))
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    expect(rendered.info).toMatchObject({ width: 1200, height: 630 });
    expect(rendered.info.width).toBe(committed.info.width);
    expect(rendered.info.height).toBe(committed.info.height);
    expect(rendered.data.equals(committed.data)).toBe(true);
  });
});

describe("compressWithOxipng", () => {
  // Small and uncompressed, so oxipng has work to do yet finishes fast.
  async function samplePng() {
    const path = join(dir, "card.png");
    await sharp({
      create: { width: 64, height: 32, channels: 4, background: "#1c1c1e" },
    })
      .png({ compressionLevel: 0 })
      .toFile(path);
    return path;
  }

  // oxipng is optional outside of asset regeneration, and CI runners do
  // not ship it, so this test runs only where it is installed.
  const oxipngInstalled = !spawnSync("oxipng", ["--version"]).error;

  it.skipIf(!oxipngInstalled)("compresses the file in place when oxipng is installed", async () => {
    const path = await samplePng();
    const pixelsBefore = await sharp(path).ensureAlpha().raw().toBuffer();
    const sizeBefore = (await stat(path)).size;

    expect(await compressWithOxipng(path)).toBe(true);
    expect((await stat(path)).size).toBeLessThan(sizeBefore);
    // oxipng may drop the alpha channel of an opaque image; the pixels stay.
    expect((await sharp(path).ensureAlpha().raw().toBuffer()).equals(pixelsBefore)).toBe(true);
  });

  it("fails when oxipng cannot be started for another reason", async () => {
    const notExecutable = join(dir, "oxipng");
    await writeFile(notExecutable, "not a program", { mode: 0o644 });

    await expect(compressWithOxipng(await samplePng(), notExecutable)).rejects.toMatchObject({
      code: "EACCES",
    });
  });

  it("skips compression when oxipng fails", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    // `false` stands in for an oxipng run that exits with status 1.
    expect(await compressWithOxipng(await samplePng(), "false")).toBe(false);
    expect(warn).toHaveBeenCalledWith(expect.stringMatching(/^oxipng skipped \(exit 1\)/));
  });
});

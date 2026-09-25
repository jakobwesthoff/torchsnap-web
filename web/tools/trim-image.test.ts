import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { promisify } from "node:util";
import sharp from "sharp";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { formatBytes, parseArgs, trimImage } from "./trim-image";

let dir: string;

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), "trim-image-"));
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

// A 40×30 transparent PNG with an opaque 12×8 block whose top-left
// corner sits at (10, 6).
async function framedImage(name = "shot.png") {
  const path = join(dir, name);
  const block = await sharp({
    create: { width: 12, height: 8, channels: 4, background: { r: 200, g: 80, b: 20, alpha: 1 } },
  })
    .png()
    .toBuffer();
  await sharp({
    create: { width: 40, height: 30, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: block, left: 10, top: 6 }])
    .png()
    .toFile(path);
  return path;
}

describe("parseArgs", () => {
  it("writes <name>.trimmed.<ext> next to the input by default", () => {
    expect(parseArgs(["shots/launcher.png"])).toEqual({
      input: resolve("shots/launcher.png"),
      output: resolve("shots/launcher.trimmed.png"),
      padding: 0,
    });
  });

  it("takes an explicit output path", () => {
    expect(parseArgs(["in.png", "out/final.png"]).output).toBe(resolve("out/final.png"));
  });

  it("overwrites the input with --in-place", () => {
    const args = parseArgs(["--in-place", "in.png"]);
    expect(args.output).toBe(args.input);
  });

  it.each([
    [["in.png", "--padding", "16"]],
    [["--padding", "16", "in.png"]],
    [["in.png", "--padding=16"]],
  ])("reads the padding from %j", (argv) => {
    expect(parseArgs(argv).padding).toBe(16);
  });

  it.each([
    [[], /missing input path/],
    [["a.png", "b.png", "c.png"], /too many positional arguments: a.png b.png c.png/],
    [["in.png", "out.png", "--in-place"], /--in-place cannot be combined/],
    [["in.png", "--padding"], /--padding requires a value/],
    [["in.png", "--padding", "-1"], /non-negative number, got: -1/],
    [["in.png", "--padding", "wide"], /non-negative number, got: wide/],
    [["in.png", "--padding=-3"], /non-negative number, got: --padding=-3/],
    [["in.png", "--quality", "9"], /unknown flag: --quality/],
  ])("rejects %j", (argv, message) => {
    expect(() => parseArgs(argv)).toThrow(message);
  });
});

describe("trimImage", () => {
  it("cuts the image down to its non-transparent pixels", async () => {
    const input = await framedImage();
    const output = join(dir, "out.png");

    const result = await trimImage({ input, output, padding: 0 });

    expect(result).toMatchObject({ width: 12, height: 8 });
    expect(await sharp(output).metadata()).toMatchObject({ width: 12, height: 8 });
  });

  it("adds a transparent margin of the requested padding", async () => {
    const input = await framedImage();
    const output = join(dir, "out.png");

    const result = await trimImage({ input, output, padding: 5 });

    expect(result).toMatchObject({ width: 22, height: 18 });
    const { data, info } = await sharp(output).raw().toBuffer({ resolveWithObject: true });
    const alphaAt = (x: number, y: number) => data[(y * info.width + x) * info.channels + 3];
    expect(alphaAt(0, 0)).toBe(0);
    expect(alphaAt(4, 4)).toBe(0);
    expect(alphaAt(5, 5)).toBe(255);
  });

  it("reports the sizes of the input and the written output", async () => {
    const input = await framedImage();
    const output = join(dir, "out.png");

    const result = await trimImage({ input, output, padding: 0 });

    expect(result.inputBytes).toBe((await stat(input)).size);
    expect(result.outputBytes).toBe((await stat(output)).size);
  });

  it("fails clearly when the input does not exist", async () => {
    const input = join(dir, "missing.png");

    await expect(trimImage({ input, output: join(dir, "out.png"), padding: 0 })).rejects.toThrow(
      `input not found: ${input}`,
    );
  });
});

describe("formatBytes", () => {
  it.each([
    [0, "0 B"],
    [1023, "1023 B"],
    [1024, "1.0 KB"],
    [1536, "1.5 KB"],
    [1024 * 1024, "1.00 MB"],
    [5 * 1024 * 1024 + 512 * 1024, "5.50 MB"],
  ])("formats %i bytes as %s", (bytes, text) => {
    expect(formatBytes(bytes)).toBe(text);
  });
});

describe("command line", () => {
  const run = promisify(execFile);
  const script = resolve(import.meta.dirname, "trim-image.ts");

  it("trims and prints what it did", async () => {
    const input = await framedImage();

    const { stdout } = await run("bun", ["run", script, input]);

    const output = join(dir, "shot.trimmed.png");
    expect(stdout).toContain(`trimmed ${input} → ${output} (12×8,`);
    expect(await readFile(output)).not.toHaveLength(0);
  });

  it("exits with 1 and a message on bad arguments", async () => {
    const error = await run("bun", ["run", script]).catch((e: unknown) => e);

    expect(error).toMatchObject({ code: 1 });
    expect((error as { stderr: string }).stderr).toContain("trim-image: missing input path");
  });
});

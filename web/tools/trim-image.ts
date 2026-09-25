// Trim fully-transparent margins from a PNG (or other RGBA
// image), so screenshots of the launcher dropped onto the
// landing page sit flush against their bounding box without
// the macOS window-shadow halo or the empty space above the
// mascot leaking into the layout.
//
// Built on `sharp` because the rest of this `tools/` directory
// already uses it (see build-favicon.ts, build-og.tsx) and the
// dependency is therefore free. `sharp.trim()` understands
// alpha natively — we tell it the background is "transparent
// black" and it removes every fully-transparent edge row /
// column without touching the meaningful pixels.
//
// Usage:
//   bun run tools/trim-image.ts <input>                  # writes <name>.trimmed.<ext>
//   bun run tools/trim-image.ts <input> <output>         # explicit output
//   bun run tools/trim-image.ts <input> --in-place       # overwrite input
//   bun run tools/trim-image.ts <input> --padding 16     # leave 16 px of transparent margin
//
// Flags can come in any order after the input path.

import sharp from "sharp";
import { resolve, dirname, basename, extname, join } from "node:path";
import { stat, writeFile } from "node:fs/promises";

export interface ParsedArgs {
  input: string;
  output: string;
  padding: number;
}

export function parseArgs(argv: string[]): ParsedArgs {
  const positionals: string[] = [];
  let inPlace = false;
  let padding = 0;

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--in-place") {
      inPlace = true;
    } else if (a === "--padding") {
      const next = argv[i + 1];
      if (next === undefined) {
        throw new Error("--padding requires a value (e.g. --padding 16)");
      }
      const n = Number(next);
      if (!Number.isFinite(n) || n < 0) {
        throw new Error(`--padding expects a non-negative number, got: ${next}`);
      }
      padding = n;
      i++;
    } else if (a.startsWith("--padding=")) {
      const n = Number(a.slice("--padding=".length));
      if (!Number.isFinite(n) || n < 0) {
        throw new Error(`--padding expects a non-negative number, got: ${a}`);
      }
      padding = n;
    } else if (a.startsWith("--")) {
      throw new Error(`unknown flag: ${a}`);
    } else {
      positionals.push(a);
    }
  }

  if (positionals.length === 0) {
    throw new Error(
      "missing input path.\n" +
        "usage: bun run tools/trim-image.ts <input> [output] [--in-place] [--padding N]",
    );
  }
  if (positionals.length > 2) {
    throw new Error(`too many positional arguments: ${positionals.join(" ")}`);
  }

  const input = resolve(positionals[0]);

  // Output resolution rules:
  //   --in-place wins if set (incompatible with explicit output).
  //   Else, an explicit second positional is the output path.
  //   Else, default to <dir>/<name>.trimmed<ext> next to the input.
  let output: string;
  if (inPlace) {
    if (positionals[1] !== undefined) {
      throw new Error("--in-place cannot be combined with an explicit output path");
    }
    output = input;
  } else if (positionals[1] !== undefined) {
    output = resolve(positionals[1]);
  } else {
    const dir = dirname(input);
    const ext = extname(input);
    const base = basename(input, ext);
    output = join(dir, `${base}.trimmed${ext}`);
  }

  return { input, output, padding };
}

export interface TrimResult {
  width: number;
  height: number;
  inputBytes: number;
  outputBytes: number;
}

export async function trimImage({ input, output, padding }: ParsedArgs): Promise<TrimResult> {
  // Verify the input exists up front so we can give a clear
  // error rather than the cryptic message sharp throws when
  // it tries to decode a missing file. Its size is taken here,
  // because `--in-place` overwrites the file below.
  let inputBytes: number;
  try {
    inputBytes = (await stat(input)).size;
  } catch {
    throw new Error(`input not found: ${input}`);
  }

  // Sharp's `.trim()` infers the background colour from the
  // top-left pixel by default. For our launcher screenshots
  // the top-left is transparent, so this would already work,
  // but we pin it explicitly to "transparent black" so the
  // tool behaves identically for any future image that
  // happens to have a non-transparent corner pixel by accident.
  let pipeline = sharp(input).trim({
    background: { r: 0, g: 0, b: 0, alpha: 0 },
    threshold: 0,
  });

  // Optional padding: re-extend the canvas with fully-
  // transparent pixels after trimming. Useful when the eventual
  // CSS shadow needs room to breathe outside the opaque content.
  if (padding > 0) {
    pipeline = pipeline.extend({
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });
  }

  // `toBuffer()` first, then write — sharp refuses to read and
  // write the same path in a single pipeline call, but writing
  // a buffer afterwards is fine and lets `--in-place` work.
  const buf = await pipeline.toBuffer();
  await writeFile(output, buf);

  const meta = await sharp(buf).metadata();
  return { width: meta.width, height: meta.height, inputBytes, outputBytes: buf.byteLength };
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const result = await trimImage(args);

  // Tiny status line so the caller can see what happened
  // without asking — same style as the other tools/ scripts.
  console.log(
    `trimmed ${args.input} → ${args.output}` +
      ` (${result.width}×${result.height},` +
      ` ${formatBytes(result.inputBytes)} → ${formatBytes(result.outputBytes)})`,
  );
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(`trim-image: ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  });
}

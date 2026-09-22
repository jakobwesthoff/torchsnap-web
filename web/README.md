# Torchsnap website

The marketing site for Torchsnap, published at <https://torchsnap.app>.
It is a static Astro site styled with Tailwind CSS. The site itself lives
in this `web/` directory. The repository root holds the OG card sources
in `assets/`, the ADRs in `docs/adr/`, and the copywriting guide in
`docs/copywriting-guide.md`.

## Requirements

- [Bun](https://bun.sh) as the package manager and script runner
  (ADR 0004). `bun.lock` is the committed lockfile.
- Node.js 22.12 or newer. `bun run` starts the Astro CLI, and the CLI
  runs on Node. Astro 7 requires at least that version.
- [oxipng](https://github.com/shssoichiro/oxipng) on your `PATH` if you
  regenerate the favicons. `build:favicon` fails without it. `build:og`
  uses it when present and skips compression otherwise.

## Development

All commands run from `web/`.

```sh
bun install
bun run dev
```

The dev server listens on <http://localhost:4321>. It also accepts
requests through `*.trycloudflare.com` hosts, so
`cloudflared tunnel --url http://localhost:4321` exposes it publicly for
testing OG cards and share previews.

## Building

```sh
bun install --frozen-lockfile
bun run build
bun run preview
```

`bun run build` writes the static site to `web/dist/`, and
`bun run preview` serves that folder on <http://localhost:4321>.

The build output contains:

- `index.html` and `impressum/index.html`.
- `sitemap-index.xml` and `sitemap-0.xml`. The Impressum page is left out
  of the sitemap because it carries `<meta name="robots" content="noindex">`.
- Everything in `web/public/`, including `robots.txt`, the favicons,
  `manifest.json`, and the OG card `og.png`.

Absolute URLs in the output (canonical links, OG tags, sitemap entries)
come from `site` in `astro.config.mjs`, which is `https://torchsnap.app`.
`robots.txt` names the same origin for its sitemap.

### Expected build warnings

The build prints one warning that needs no action:

- `[astro-icon] Failed to load icons from "src/icons"`. The site uses
  only Iconify icon sets and has no local icon directory.

## Generated assets

These files are committed. Regenerate them only when their sources
change, and commit the results.

| Command | Source | Output |
| --- | --- | --- |
| `bun run build:favicon` | `src/assets/mascots/snappy-original-1024.png` | `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-192-maskable.png` in `public/` |
| `bun run build:og` | `assets/og/snappy-trimmed.png` and the Inter TTFs in `assets/fonts/` (repository root) | `public/og.png` |

`build:og` renders the card with satori. The eyebrow's font size is
calibrated so its width matches the wordmark. After a satori upgrade,
compare the new `og.png` with the committed one, and re-measure the
width as described in `tools/build-og.tsx` if it no longer matches.

`bun run trim:image` removes fully transparent margins from an image,
for screenshots placed on the landing page:

```sh
bun run trim:image <input>                  # writes <name>.trimmed.<ext>
bun run trim:image <input> <output>
bun run trim:image <input> --in-place
bun run trim:image <input> --padding 16     # keeps 16 px of margin
```

## Releasing

1. Start from a clean checkout of the commit you want to release.
2. Run `bun install --frozen-lockfile`.
3. Run `bun run build` and confirm it finishes with only the expected
   warning listed above.
4. Run `bun run preview` and check both pages in a browser, in light and
   dark mode.
5. Publish the contents of `web/dist/`.

Publishing is not set up yet. No hosting target has been chosen and the
repository has no deploy workflow. The open todo
`todos/01kqq3e80xkpwmrfrwvkggf1rd-decide-and-document-hosting.md` covers
that decision.

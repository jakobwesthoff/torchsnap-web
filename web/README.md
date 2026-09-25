# Torchsnap website

The marketing site for Torchsnap, published at <https://torchsnap.app>.
It is a static Astro site styled with Tailwind CSS. The site itself lives
in this `web/` directory. The repository root holds the OG card sources
in `assets/`, the ADRs in `docs/adr/`, and the copywriting guide in
`docs/copywriting-guide.md`.

## Requirements

- [just](https://github.com/casey/just). The `justfile` at the
  repository root is the entrypoint for every task below. Its recipes
  run in `web/` and call the Bun scripts from `package.json`.
- [Bun](https://bun.sh) as the package manager and script runner
  (ADR 0004). `bun.lock` is the committed lockfile.
- Node.js 22.12 or newer. `bun run` starts the Astro CLI, and the CLI
  runs on Node. Astro 7 requires at least that version.
- [oxipng](https://github.com/shssoichiro/oxipng) on your `PATH` if you
  regenerate the favicons. `build:favicon` fails without it. `build:og`
  uses it when present and skips compression otherwise.

## Development

```sh
just install
just dev
```

The dev server and the build download the latest Torchsnap release's
`release.json` (see "The update feed" below). Until a release carries
one, point them at a local file:

```sh
TORCHSNAP_RELEASE_FEED=/path/to/release.json just dev
```

The dev server listens on <http://localhost:4321>. It also accepts
requests through `*.trycloudflare.com` hosts, so
`cloudflared tunnel --url http://localhost:4321` exposes it publicly for
testing OG cards and share previews.

## Building

```sh
just install
just build
just preview
```

`just install` installs exactly the versions in `bun.lock`.
`just build` writes the static site to `web/dist/`, and `just preview`
serves that folder on <http://localhost:4321>.

`just fullcycle` is the quality gate: it installs, runs every check and
builds the site. It must pass before every push, and the deploy workflow
runs it as well.

The build output contains:

- `index.html` and `impressum/index.html`.
- `updates/latest.json`, the update feed (see below).
- `sitemap-index.xml` and `sitemap-0.xml`. The Impressum page is left out
  of the sitemap because it carries `<meta name="robots" content="noindex">`.
- Everything in `web/public/`, including `robots.txt`, the favicons,
  `manifest.json`, and the OG card `og.png`.

Absolute URLs in the output (canonical links, OG tags, sitemap entries)
come from `site` in `astro.config.mjs`, which is `https://torchsnap.app`.
`robots.txt` names the same origin for its sitemap.

### The update feed

Every Torchsnap release carries `release.json`, the feed installed apps
read to find updates (torchsnap ADR 0053). The build downloads it from
`https://github.com/jakobwesthoff/torchsnap/releases/latest/download/release.json`,
serves it unchanged as `https://torchsnap.app/updates/latest.json`, and
shows its version in the hero's macOS pill, linked to the release notes
(ADR 0009). GitHub's `releases/latest` skips prereleases.

The build fails when the download fails or the file has no stable
version, so the previous deployment and its feed stay online.
`TORCHSNAP_RELEASE_FEED` replaces the source with another URL or a local
path.

`just release-publish` in the torchsnap repository starts the deploy
workflow after publishing a stable release, so the feed and the version
follow each release.

### Expected build warnings

The build prints one warning that needs no action:

- `[astro-icon] Failed to load icons from "src/icons"`. The site uses
  only Iconify icon sets and has no local icon directory.

## Generated assets

These files are committed. Regenerate them only when their sources
change, and commit the results.

| Command | Source | Output |
| --- | --- | --- |
| `just build-favicon` | `src/assets/mascots/snappy-original-1024.png` | `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-192-maskable.png` in `public/` |
| `just build-og` | `assets/og/snappy-trimmed.png` and the Inter TTFs in `assets/fonts/` (repository root) | `public/og.png` |

`build-og` renders the card with satori. The eyebrow's font size is
calibrated so its width matches the wordmark. After a satori upgrade,
compare the new `og.png` with the committed one, and re-measure the
width as described in `tools/build-og.tsx` if it no longer matches.

`just trim-image` removes fully transparent margins from an image, for
screenshots placed on the landing page. It runs in `web/`, so pass
absolute paths or paths relative to `web/`:

```sh
just trim-image <input>                  # writes <name>.trimmed.<ext>
just trim-image <input> <output>
just trim-image <input> --in-place
just trim-image <input> --padding 16     # keeps 16 px of margin
```

## Releasing

The site is published with GitHub Pages under the custom domain
`torchsnap.app` (ADR 0007). The workflow `.github/workflows/deploy.yml`
at the repository root runs `just fullcycle` on every push to `main`, on
pull requests, and on manual runs. It deploys `web/dist/` only from
`main`, and only while the repository is public. A private repository
gets the checks and the build as CI and no deployment.

Before pushing a change to `main`:

1. Run `just fullcycle` and confirm it passes and the build prints only
   the expected warning listed above.
2. Run `just preview` and check both pages in a browser, in light and
   dark mode.

The first deployment needs these repository settings:

1. The repository is public.
2. Under Settings, Pages, the source is "GitHub Actions" and the custom
   domain is `torchsnap.app`. The workflow does not write a `CNAME`
   file, and GitHub ignores one for workflow deployments.
3. The apex `torchsnap.app` has A records for `185.199.108.153`,
   `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`, and AAAA
   records for `2606:50c0:8000::153`, `2606:50c0:8001::153`,
   `2606:50c0:8002::153`, and `2606:50c0:8003::153`.
4. Once GitHub offers it, "Enforce HTTPS" is on. GitHub says this can
   take up to 24 hours after the domain is set.

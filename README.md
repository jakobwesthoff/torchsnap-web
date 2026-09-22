# Torchsnap website

The source of <https://torchsnap.app>, the marketing site for the
[Torchsnap](https://github.com/jakobwesthoff/torchsnap) launcher. The
documentation site at <https://docs.torchsnap.app> lives in its own
repository,
[torchsnap-docs](https://github.com/jakobwesthoff/torchsnap-docs).

The site builds from this repository alone. It imports nothing from the
Torchsnap repository, and anything it reuses from there is copied in
(ADR 0005).

## Repository layout

| Path | Contents |
| --- | --- |
| `web/` | The Astro site. Its [README](web/README.md) covers requirements, development, building, generated assets, and releasing. |
| `assets/` | Sources for the OG card: the static Inter fonts and the trimmed mascot. |
| `docs/adr/` | Architecture decision records, managed with the `adrs` tool. |
| `docs/copywriting-guide.md` | Voice, character, and structure decisions for the site's copy. |
| `design/` | HTML/CSS/JS prototypes from the first design iteration. |
| `todos/` | Open work items that have been deferred. |

## Quick start

```sh
cd web
bun install
bun run dev
```

The dev server listens on <http://localhost:4321>. See
[web/README.md](web/README.md) for the full build and release process.

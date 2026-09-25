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
| `todos/` | Open work items that have been deferred. |

## Quick start

The `justfile` at the repository root is the entrypoint for installing,
developing, building and checking the site. `just --list` shows every
recipe.

```sh
just install
just dev
```

The dev server listens on <http://localhost:4321>. `just fullcycle` runs
all quality gates and the build. See [web/README.md](web/README.md) for
the full build and release process.

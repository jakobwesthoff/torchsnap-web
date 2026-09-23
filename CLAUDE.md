# torchsnap-web: project rules

## Layout

- `web/`: the Astro site. Run all `bun` commands there.
- `web/src/`: vertical slices per concern (<https://tkdodo.eu/blog/the-vertical-codebase>):
  - `web/src/<concern>/` (`landing/`, `site/`, `theme/`): components,
    scripts and styles of one concern together.
  - `web/src/design-system/`: non-domain shared visuals, utilities, global
    stylesheet entry, design tokens.
  - `web/src/pages/`: Astro routes.
  - Promote code from a page into its own folder once it is shared or
    grows past one file.
- `assets/`: OG card sources (fonts, trimmed mascot).
- `docs/adr/`: ADRs. `docs/copywriting-guide.md`: voice rules.
- Nothing is imported from the torchsnap repo; reused code is copied
  (ADR 0005).

## Commands (in `web/`)

- `bun install`, `bun run dev`, `bun run build`, `bun run preview`.
- `bun run build:favicon`, `bun run build:og`: regenerate committed
  assets. Details in `web/README.md`.

## Copy

All text on the site follows `docs/copywriting-guide.md`.

## ADRs

- Create: `EDITOR=true adrs new "<title>"` (also `link`, `status`,
  `list`). Set Status to `Accepted` when decided.
- Cover context, decision, consequences. Only what was decided; no
  speculation about CI, tooling or alternatives that were never on the
  table; no filler.

## Deployment

GitHub Pages via `.github/workflows/deploy.yml`; deploys only while the
repository is public (ADR 0007). Go-live settings: `web/README.md`,
"Releasing".

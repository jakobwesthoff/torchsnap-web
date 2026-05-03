# Project conventions

## ADRs

ADRs live in `docs/adr/` and are managed with the `adrs` tool
(`EDITOR=true adrs ...` for create / link / status / list).

Write every ADR plain and to the point:

- Cover the context, decision, and consequences with enough detail
  that the decision is understandable later — but no more.
- Document only what has actually been decided. Do not speculate
  about CI setups, future tooling, or alternatives that were never
  on the table.
- No marketing prose, no padding, no content added just to fill a
  section.

## Source layout

`web/src/` is organized as **vertical slices** per
<https://tkdodo.eu/blog/the-vertical-codebase>: group code by what
it accomplishes, not by technical type. Components, hooks, types,
utilities, and styles for one concern live together in one folder.

- Verticals live at `web/src/<concern>/` (e.g. `theme/`).
- `web/src/design-system/` holds non-domain shared visuals,
  utilities, the global stylesheet entry, and the design tokens.
- Astro-conventional folders stay where Astro expects them:
  `web/src/pages/`, `web/src/layouts/`.
- A vertical may be promoted from inline-in-a-page to its own
  folder once it is shared across pages or grows past a single
  file. No "rule of three" — promote when the grouping makes
  reading the code easier.

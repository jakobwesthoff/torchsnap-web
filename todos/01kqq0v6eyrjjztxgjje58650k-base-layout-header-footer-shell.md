# Base layout: page shell + Header + Footer

Build the surrounding chrome that every section will render inside.
Reference: `design/iteration01/project/Torchsnap V1b - standalone source.html`
plus `src/V1bClassicHeroSnappy.standalone.jsx` (header and
`FooterStrip`).

## Scope

- `web/src/layouts/Layout.astro` — `<html>`/`<head>`/`<body>` with
  meta, title slot, global stylesheet import, dark-theme attribute
  (per the choice made in the theme-wiring todo), and a `<slot />`
  for page body.
- `web/src/components/Header.astro` — wordmark (Snappy mascot +
  "Torchsnap" text) on the left; nav (`Features`, `Plugins`,
  `For developers`, `Download`, `GitHub`) on the right. Bottom
  border using `--color-border-divider`.
- `web/src/components/Footer.astro` — wordmark + copyright on the
  left; secondary nav (`Documentation`, `Plugin SDK`, `Changelog`,
  `GitHub`) on the right. Top border, inset background.
- Responsive: build desktop-first to match the design at `lg`/`xl`,
  then collapse the nav into a mobile menu (hamburger or simple
  stacked) at `sm`/`md` in the same todo.
- Wire the layout into `index.astro` so the page renders an empty
  body between Header and Footer.

## Out of scope

- Mobile nav drawer animations beyond a simple show/hide.
- Real section content — sections come in subsequent todos.
- Final favicon / OG metadata (separate todos).

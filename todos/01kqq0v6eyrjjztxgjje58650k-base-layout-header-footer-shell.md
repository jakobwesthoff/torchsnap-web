# Base layout: page shell + Header + Footer

Build the surrounding chrome that every section will render inside.
Reference: `design/iteration01/project/Torchsnap V1b - standalone source.html`
plus `src/V1bClassicHeroSnappy.standalone.jsx` (header and
`FooterStrip`).

## Scope

- `web/src/layouts/Layout.astro` — `<html>`/`<head>`/`<body>` with
  meta, title slot, global stylesheet import, the inline pre-paint
  theme-init script from the theme-wiring todo, and a `<slot />`
  for page body.
- `web/src/components/Header.astro` — wordmark (Snappy mascot from
  `web/public/mascots/` + "Torchsnap" text) on the left; nav
  (`Features`, `Plugins`, `For developers`, `Download`, `GitHub`)
  on the right. Bottom border using `--color-border-divider`.
- `web/src/components/Footer.astro` — wordmark + copyright on the
  left; secondary nav (`Documentation`, `Plugin SDK`, `Changelog`,
  `GitHub`, `Impressum`) on the right. Mounts the `ThemeToggle`
  React island from the theme-wiring todo. Top border, inset
  background.
- The Impressum link points to the page built in its own todo.
- Responsive: build desktop-first to match the design at `lg`/`xl`,
  then collapse the nav into a hamburger menu at `sm`/`md` in the
  same todo. Hamburger toggles a panel that slides down from the
  header; vanilla `<script>` in the component, no React island.
- Wire the layout into `index.astro` so the page renders an empty
  body between Header and Footer.
- Cap content at a 1280px max-width container so larger viewports
  show side margins (parity with the design).

## Out of scope

- Real section content — sections come in subsequent todos.
- Final favicon / OG metadata (separate todos).

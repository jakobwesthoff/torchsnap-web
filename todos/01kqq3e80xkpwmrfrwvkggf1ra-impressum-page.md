# Impressum page

Single legal page reachable from the footer. German "Impressum"
plus, if applicable, a privacy notice. Content is borrowed from
`/Users/jakob/Development/github/jakobwesthoff/squirly/assets/minimal-landing/impressum.html`
and adapted to Torchsnap's branding.

## Scope

- `web/src/pages/impressum.astro` — uses the base layout so it
  inherits header/footer/theme.
- Lift the textual content from the squirly impressum, replacing
  product/brand strings with Torchsnap.
- Footer link to `/impressum` (added in the base-layout todo).
- Verify `astro build` produces `dist/impressum/index.html` and the
  link resolves under the chosen hosting setup.

## Open

- Whether the page should also include a separate Datenschutz
  section, or whether one combined page is enough — depends on
  what the squirly impressum actually contains. Decide on read.

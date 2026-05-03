# robots.txt and sitemap.xml

Standard discovery files for search engines.

## Scope

- `web/public/robots.txt` — allow all crawlers, point at the
  generated `sitemap-index.xml`.
- Install the `@astrojs/sitemap` integration; wire it in
  `astro.config.mjs`. The integration generates
  `sitemap-index.xml` + `sitemap-0.xml` automatically from the
  `pages/` routes at build time.
- Set the canonical `site` URL in `astro.config.mjs` so the
  sitemap entries are absolute. URL depends on the hosting todo;
  use a placeholder until that lands and update once known.

## Out of scope

- Per-page `lastmod` overrides, custom priorities — Astro's
  defaults are fine for a small marketing site.

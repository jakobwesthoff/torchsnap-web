# Open Graph / social card image

The site needs an Open Graph image and the matching `<meta>` tags
so links shared on Slack, Discord, GitHub, Mastodon, Bluesky, etc.
render a branded preview.

## Scope

- Design a 1200×630 OG image. Likely candidates: hero composition
  (Snappy + launcher card on the orange-gradient background) or a
  cleaner wordmark-only variant. Decide before designing.
- Place at `web/public/og.png` (or `.jpg` if file size matters).
- Add the OG and Twitter Card meta tags to the base layout
  (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`,
  `twitter:card=summary_large_image`). Per-page overrides via the
  layout's title/description props.
- Verify with the Twitter / Facebook / LinkedIn preview validators
  once the site is deployed.

## Open

- Whether to render the OG image dynamically per-page (Astro
  supports this via Satori) or stick with a single static image.
  For a single-page site, static is enough.

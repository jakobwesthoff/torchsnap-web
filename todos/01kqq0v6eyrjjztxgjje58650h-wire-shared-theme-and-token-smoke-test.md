# Wire shared theme.css and render a token-driven smoke-test page

Per ADR-0002, the website must consume the same design tokens as the
Torchsnap app, sourced from
`../torchsnap/packages/plugin-sdk/theme.css`.

## Scope

- Decide on the integration mechanism (direct relative `@import` from
  `web/src/styles/global.css` vs. vendoring a copy at build time).
  Direct `@import` is the obvious first choice; vendoring becomes
  attractive only if CI cannot check out both repos.
- Make Tailwind v4 utility classes resolve against the imported
  `@theme` tokens (`bg-surface`, `text-text-primary`, `text-accent`,
  `font-sans`, etc.).
- Replace the current placeholder `index.astro` with a minimal
  boilerplate page that exercises a handful of token-driven utilities
  (background, text colors, accent, border) so the wiring is visibly
  correct in `bun run dev`.
- Decide and apply the dark-mode strategy: the app drives dark via
  `data-theme="dark"` on `<html>`. Choose between forcing dark for
  the marketing site, following the system preference, or shipping a
  toggle.

## Out of scope

- Custom typography (Inter font ships in the next todo).
- Real page sections (hero, features, footer come later).

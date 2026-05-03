# Section: Feature row

A four-column grid of feature cards. Each card has a tinted square
icon, a title, and a short body. Items from the design:

- Instant — hotkey + ready focus
- Plugins, sandboxed — WebAssembly + manifest capabilities
- Cross-platform — macOS now, Windows/Linux as alpha widens
- Build your own — `.torchsnap` archives in any wasm32-wasip2 language

## Scope

- `web/src/components/FeatureRow.astro` containing the grid plus
  data-driven card rendering.
- A `FeatureCard.astro` component (or inline) for the icon tile +
  title + body.
- Icons via `astro-icon` with `@iconify-json/heroicons` (the
  project-wide convention for static glyphs — `@heroicons/react`
  is reserved for use inside React islands). The integration and
  the heroicons icon set are already installed and wired in
  `astro.config.mjs`; just `import { Icon } from "astro-icon/components"`
  and use `<Icon name="heroicons:bolt" />` etc.
- Responsive: 4 columns at `lg`+, 2 columns at `md`, 1 column at
  `sm`. Top border on the section per the design.

## Reference

`design/iteration01/project/src/V1bClassicHeroSnappy.standalone.jsx`,
the `#features` `<section>`.

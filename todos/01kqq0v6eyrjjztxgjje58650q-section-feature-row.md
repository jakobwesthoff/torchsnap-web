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
- Heroicons (`bolt`, `puzzle-piece`, `computer-desktop`,
  `code-bracket`) inlined as SVG.
- Responsive: 4 columns at `lg`+, 2 columns at `md`, 1 column at
  `sm`. Top border on the section per the design.

## Reference

`design/iteration01/project/src/V1bClassicHeroSnappy.standalone.jsx`,
the `#features` `<section>`.

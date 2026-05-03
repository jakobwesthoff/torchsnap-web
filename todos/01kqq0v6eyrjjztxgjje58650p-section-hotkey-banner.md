# Section: Hotkey banner

A single centered row reading: "Press [⌘] [Space] anywhere — that's
the whole interaction model." The two key caps are visible chrome,
not text.

## Scope

- `web/src/components/HotkeyBanner.astro`.
- Reuse a `KeyCap` Astro component (a small, static version — the
  real React `KeyCap` arrives with the launcher leaves vendoring
  todo, but this banner is static text and doesn't need the React
  one).
- Responsive: stacks naturally; ensure the keys + text wrap
  acceptably at narrow widths.

## Reference

`design/iteration01/project/src/V1bClassicHeroSnappy.standalone.jsx`,
the "Hotkey banner" `<section>`.

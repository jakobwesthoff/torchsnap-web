# Build bespoke launcher demo components

Per ADR-0003, the hero launcher demo is built as bespoke marketing
UI shaped to what the animation actually renders, not a copy of the
real launcher's component tree. This todo covers the static
component layer; the animation driver is the next todo.

## Components to build

Under `web/src/launcher/`, written against the design bundle in
`design/iteration01/`:

- Card shell (rounded surface, border, shadows, header search row,
  result list area, footer hint row).
- Search row with magnifying-glass icon, query text + blinking
  caret, `Esc` keycap on the right.
- Result row: leading icon slot, title with highlighted match
  segments, subtitle, selected-state left border + background.
- Footer hint: `↵` keycap + action label, sized to match the design.
- Keycap visual primitive shared between the search row and footer.

Each component exposes only the props the demo needs. No support
for keybinding pills, action records, plugin contexts, footer
modes, or any of the real launcher's surface area beyond what the
hero animation shows.

## Reuse from `../torchsnap`

Reuse is per-piece, by copy, only when the fragment is small,
host-decoupled, and matches what we would have written anyway.
Likely candidates:

- `lib/cn.ts` — trivial classname helper.
- The highlight-segment data shape (`{ t: string; m?: boolean }`
  style) used by `ResultRow` titles.

Anything beyond that is written fresh. Each reused fragment gets a
header comment pointing back to its source path in `../torchsnap`.

## Data

The canned result snapshots live with the demo and mirror what the
real launcher would produce for the scripted queries (titles,
subtitles, icons, highlight ranges), so the demo stays truthful
even though the rendering is bespoke. Pulling these from a real
Torchsnap session is fine; they are data, not code.

## Notes

- The page-wide `body { font-feature-settings: ... }` rule in
  `web/src/design-system/global.css` enables Inter's `cv11`, `ss01`,
  `ss03` features for the marketing copy. The launcher demo must
  override this back to `normal` at its root container so it
  matches the real Torchsnap app, which does not enable these
  features.
- The current static `HeroLauncher.astro` placeholder already
  renders the target visual at rest. The bespoke components should
  reproduce that resting state pixel-for-pixel so the swap to the
  dynamic island in the next todo is invisible.

## Out of scope

- The animation driver (typed query, scripted snapshots, cadence) —
  next todo.
- The mascot cosplay cycler — separate todo.

# Dynamic: Mascot perch + cosplay cycler

Replace the static mascot above the launcher card with the
auto-rotating cosplay cycler from the design: random initial
variant, periodic auto-cycle (paused on hover), hover-revealed
prev/next chevrons, small name-tag badge that cross-fades on
change. Mounted as an Astro React island.

## Scope

- `web/src/launcher/MascotCycler.tsx` (or similar) — list of
  available cosplay variants, state machine for current index +
  paused flag, auto-advance interval matching the design (~2.6s),
  cross-fade animation on variant change.
- Cosplay assets: copy the same set the design bundle references
  from `design/iteration01/project/assets/mascots/` into
  `web/public/mascots/` (or import as static assets — decide based
  on whether we want hashed filenames).
- Hover chevrons for manual prev/next — appear on hover, hide
  otherwise; clicking them stops the auto-advance until the user
  leaves the area, matching the design behavior.
- Name-tag pill below the mascot showing the current variant name
  and a small `NN/NN` index, cross-faded on change. Match the
  design's surface/border styling.
- Wire the cycler into the hero so it sits perched on top of the
  launcher card.

## Reference

`design/iteration01/project/src/V1bClassicHeroSnappy.standalone.jsx`
— `V1B_COSPLAY` list, the auto-cycle effect, `CosplayNameTag`,
`ChevronBtn`.

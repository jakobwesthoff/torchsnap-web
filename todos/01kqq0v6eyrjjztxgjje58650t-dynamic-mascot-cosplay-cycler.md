# Dynamic: Mascot perch + cosplay cycler

Replace the static mascot above the launcher card with the
auto-rotating cosplay cycler from the design: random initial
variant, periodic auto-cycle, small name-tag badge that cross-fades
on change. No manual prev/next controls — the design relies on
auto-rotation only. Mounted as an Astro React island.

## Scope

- `web/src/launcher/MascotCycler.tsx` (or similar) — list of
  available cosplay variants, state machine for current index,
  auto-advance interval matching the design (~2.6s), cross-fade
  animation on variant change.
- Cosplay assets: copy the cosplay set from
  `design/iteration01/project/assets/mascots/` into
  `web/public/mascots/` so it shares the stable public URL space
  used by the header logo and footer wordmark.
- Name-tag pill below the mascot showing the current variant name
  and a small `NN/NN` index, cross-faded on change. Match the
  design's surface/border styling.
- Honor `prefers-reduced-motion: reduce` — pause auto-rotation and
  show a single (random) variant statically.
- Wire the cycler into the hero so it sits perched on top of the
  launcher card.

## Reference

`design/iteration01/project/src/V1bClassicHeroSnappy.standalone.jsx`
— `V1B_COSPLAY` list, the auto-cycle effect, `CosplayNameTag`.

# Dynamic: AnimatedLauncher demo

Replace the static hero launcher placeholder with the live demo:
typed query with blinking caret, results that update as the query
changes, footer hint derived from the selected entry. Mounted as
an Astro React island (`client:visible`).

Composes the bespoke demo components from the previous todo; per
ADR-0003 this is marketing UI, not a port of the real launcher.

## Scope

- `web/src/launcher/DemoLauncher.tsx` — composes the bespoke card
  shell, search row, result list, and footer hint. Renders against
  a small in-memory state (current query, current results,
  selected index).
- `web/src/launcher/useScriptedDemo.ts` — drives the state machine:
  cycles through a small list of canned `(query, results)`
  snapshots with realistic typing cadence, pauses at the end of
  each query, then transitions to the next. No real search code.
- Blinking caret behavior matches the design CSS animation.
- Pause-on-hover so people can read the current query.
- Honor `prefers-reduced-motion: reduce` — show a single static
  snapshot instead of cycling.
- Replace the static `HeroLauncher.astro` placeholder with this
  island; keep the same outer card chrome so the swap is invisible
  at rest.

## Reference

- `design/iteration01/project/src/Shared.standalone.jsx` —
  `AnimatedLauncher` and `DEMO_QUERIES_SLOW` for the script and
  cadence baseline.
- The canned snapshots should mirror what the real launcher in
  `../torchsnap` would produce for the scripted queries, so the
  demo stays truthful.

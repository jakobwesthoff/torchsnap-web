# Dynamic: AnimatedLauncher demo

Replace the static hero launcher placeholder with the live demo:
typed query with blinking caret, results that update as the query
changes, footer state derived from the selected entry. Mounted as
an Astro React island (`client:visible`).

## Scope

- `web/src/launcher/DemoLauncher.tsx` — composes the vendored
  card shell, search row, `ResultRow` list, and `LauncherFooter`.
  Renders against a small in-memory state (current query,
  current results, selected index).
- `web/src/launcher/useScriptedDemo.ts` — drives the state
  machine: cycles through a small list of canned `(query, results)`
  snapshots with realistic typing cadence, pauses at the end of
  each query, then transitions to the next. No real search code.
- Blinking caret behavior matches the design CSS animation.
- Pause-on-hover so people can read the current query.
- Replace the static placeholder from the hero-launcher todo with
  this island; keep the same outer card chrome so the swap is
  invisible at rest.

## Reference

- `design/iteration01/project/src/Shared.standalone.jsx` —
  `AnimatedLauncher` and `DEMO_QUERIES_SLOW` for the script and
  cadence baseline.
- `../torchsnap/src/launcher/Launcher.tsx` — outer card markup
  (already copied as part of the vendoring todo).

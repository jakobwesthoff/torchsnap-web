# 3. Build the launcher demo as bespoke marketing UI

Date: 2026-05-02

## Status

Accepted

Refines [2. Use Astro with React islands and Tailwind v4](0002-use-astro-with-react-islands-and-tailwind-v4.md)

## Context

The hero island is an animated demo of the Torchsnap launcher. The
real `../torchsnap/src/launcher/Launcher.tsx` is tightly coupled to
Tauri, the WASM plugin runtime, and the settings store, and is not
directly reusable. The presentational leaves (`KeyCap`,
`KeyBindingPill`, `Mascot`, `ResultRow`, `LauncherFooter`,
`highlightText`, the heroicons branch of `Icon`, and the launcher
card shell) are decoupled enough to copy, but copying them imports
generality the marketing demo does not need: prop shapes that cover
keybinding pills, action records, footer states for modes the demo
never enters, and an icon system with asset / emoji / data-url
branches. Adapting copies down to the demo's actual surface ends up
roughly the same effort as writing demo-shaped components against
the design files in `design/iteration01/`, and leaves a clearer
codebase.

## Decision

The launcher demo is built as bespoke marketing UI, shaped to what
the hero animation actually renders. It is not a copy or port of
the real launcher's component tree.

- The demo's components live under `web/src/launcher/` and are
  written against the design bundle in `design/iteration01/`. They
  expose only the props the demo needs.
- Code from `../torchsnap` is reused only when a specific piece is
  small, host-decoupled, and matches what we would have written for
  the demo anyway (e.g. a `cn()` helper, a highlight-segment data
  shape). Reuse is by copy, consistent with [ADR-0005](0005-website-is-independent-of-torchsnap-reused-code-is-copied.md);
  no path or workspace imports into `../torchsnap`.
- The *data* the demo renders mirrors what the real launcher would
  produce for the scripted queries (titles, subtitles, icons,
  highlight ranges), so the demo stays truthful even though the
  rendering is bespoke. The canned `(query, results)` snapshots
  live alongside the demo.
- Demo state (typed query with caret, scripted result snapshots,
  mascot rotation) is driven by a small local hook. Nothing from
  the real search / keyboard / control-channel layers is reused.

## Consequences

- The demo can drift visually from the real launcher. Keeping it
  faithful is a manual review step when the app's visuals change,
  not something the build enforces.
- Reuse decisions are made per-piece rather than wholesale. Each
  reused fragment carries a header comment pointing back to its
  source path in `../torchsnap`.

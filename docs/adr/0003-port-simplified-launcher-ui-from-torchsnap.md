# 3. Port simplified launcher UI from torchsnap

Date: 2026-05-02

## Status

Accepted

Refines [2. Use Astro with React islands and Tailwind v4](0002-use-astro-with-react-islands-and-tailwind-v4.md)

## Context

The hero island is an animated demo of the Torchsnap launcher. We can
either rebuild it from the design-bundle JSX in `design/iteration01/`
or base it on the real launcher code in `../torchsnap`. Reusing the
real code keeps the marketing demo visually faithful to the product.

The real `src/launcher/Launcher.tsx` is tightly coupled to Tauri, the
WASM plugin runtime, and the settings store, and is not directly
reusable. The presentational leaves (`KeyCap`, `KeyBindingPill`,
`Mascot`, `ResultRow`, `LauncherFooter`, `cn`, `highlightText`, the
heroicons branch of `Icon`) and the launcher card's Tailwind shell
have no host coupling and are reusable.

## Decision

Copy the presentational components and the launcher card shell from
`../torchsnap` into the website source tree and adapt them as needed
for the demo. Do not import `Launcher.tsx` or any Tauri / plugin /
settings code.

- The copied files may be modified freely to fit the demo's needs.
- The demo's state (typed query, scripted result snapshots, mascot
  rotation) is driven by a small local hook; nothing from the real
  search / keyboard / control-channel layers is reused.
- Refreshing from upstream is a manual copy when the app's visuals
  change.

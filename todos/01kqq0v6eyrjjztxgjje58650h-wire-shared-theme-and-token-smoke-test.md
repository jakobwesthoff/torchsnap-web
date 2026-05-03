# Wire theme tokens, dark-mode toggle, and a token-driven smoke-test page

Per ADR-0005, the website is independent of `../torchsnap`. The
design tokens are copied in, not imported across project boundaries.

## Scope

- Copy `../torchsnap/packages/plugin-sdk/theme.css` into
  `web/src/styles/` (e.g. as `theme.css`) and `@import` it from
  `web/src/styles/global.css` after the Tailwind import.
- Confirm Tailwind v4 utility classes resolve against the copied
  `@theme` tokens (`bg-surface`, `text-text-primary`, `text-accent`,
  `font-sans`, etc.).
- Initial theme defaults to the system preference
  (`prefers-color-scheme`). User selection overrides the system
  default and persists in `localStorage`. Apply the chosen theme as
  `data-theme="dark"` / removed on `<html>` (matches the app).
- Apply the initial theme inline in `<head>` before first paint to
  avoid flash-of-wrong-theme.
- Copy `../torchsnap/src/components/Switch.tsx` and
  `../torchsnap/src/components/ThemeToggle.tsx` into the website
  (per ADR-0005), strip any settings-store / Tauri coupling, and
  back the toggle with the localStorage-persisted state. The toggle
  itself lands in the footer in the base-layout todo; this todo
  only ships the working component and the persistence logic.
  **Order:** finish the static parts of this todo first (theme.css
  copy, global.css wiring, pre-paint init, smoke-test page); the
  dynamic Switch/ThemeToggle copy and persistence wiring come last
  so the foundation is verifiable on its own.
- Replace the placeholder `index.astro` with a minimal boilerplate
  page that exercises a handful of token-driven utilities so the
  wiring is visibly correct in `bun run dev` and the toggle works.

## Out of scope

- Inter font (next todo).
- Real page sections.
- Final visual placement of the toggle (covered by the base-layout
  todo).

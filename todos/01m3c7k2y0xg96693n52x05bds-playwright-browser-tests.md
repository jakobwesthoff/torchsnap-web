---
kind: investigation
status: open
tags: [testing]
---

# Evaluate Playwright browser tests for the site

`just test` runs Vitest with jsdom. jsdom does no layout, has no
IntersectionObserver or `matchMedia`, and never executes inline
scripts, so the tests stub all of that. This leaves behavior that only
a real browser shows:

- `AutoCarousel`: actual scroll snapping and auto-advance, with real
  slide widths and gaps.
- The star nudge's arrow geometry against the real header layout, and
  its hiding below the `md` breakpoint.
- The theme across a reload: the pre-paint `is:inline` script in
  `web/src/site/Layout.astro` runs before first paint and is not
  covered by any test.
- The Impressum contact decoding, a `define:vars` script in
  `web/src/pages/impressum.astro`.
- Accessibility of the rendered pages beyond the ESLint jsx-a11y rules,
  e.g. with `@axe-core/playwright`.

The docs site (torchsnap-docs) has the same kind of gaps: the pre-paint
script in `src/components/ThemeSelect.astro` and the Impressum's
`define:vars` script.

## Direction

Playwright against `just preview`, as a recipe in the root `justfile`
and a step in `just fullcycle`. To decide first: whether the browser
download and run time belong in every `fullcycle` and in the deploy
workflow, or in a separate recipe.

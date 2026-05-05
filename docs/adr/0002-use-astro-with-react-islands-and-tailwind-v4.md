# 2. Use Astro with React islands and Tailwind v4

Date: 2026-05-02

## Status

Accepted

Refined by [3. Build the launcher demo as bespoke marketing UI](0003-build-the-launcher-demo-as-bespoke-marketing-ui.md)

Refined by [5. Website is independent of torchsnap; reused code is copied](0005-website-is-independent-of-torchsnap-reused-code-is-copied.md)

## Context

The site is a marketing/landing page for Torchsnap (`../torchsnap`).
The V1b design (`design/iteration01/project/`) is mostly static markup
with two localized interactive surfaces: an animated launcher demo and
an auto-cycling mascot carousel. The design canvas is 1280px wide;
the production site must be responsive across mobile, tablet, and
desktop.

The Torchsnap app uses React 19, Vite, Tailwind v4, and a shared
design-token file (`packages/plugin-sdk/theme.css`). The website must
reuse those tokens so the two never drift visually.

## Decision

Build the website with Astro, using React components as client-side
islands for the interactive pieces, and Tailwind v4 for styling.

- Static chrome (header, hero markup, feature grid, footer) is authored
  as `.astro` components and rendered to HTML at build time.
- Interactive pieces (animated launcher demo, mascot cycler) are
  React components hydrated as Astro islands.
- Tailwind v4 resolves utility classes against the same `@theme`
  tokens used by the Torchsnap app. The token file is copied into
  this repository (see ADR-0005), not imported across project
  boundaries.
- Output is a fully static bundle.

## Consequences

- The static majority of the page ships zero JS.
- Two component flavors coexist (`.astro` for static, `.tsx` for
  islands).
- Design tokens have a single source of truth shared with the app.

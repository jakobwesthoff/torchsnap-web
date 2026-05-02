# 2. Use Astro with React islands and Tailwind v4

Date: 2026-05-02

## Status

Accepted

## Context

We are building a marketing/landing website for Torchsnap (`../torchsnap`).
The source design (see `design/iteration01/project/Torchsnap (V1b standalone).html`)
is overwhelmingly static — header, hero copy, hotkey banner, four-column
feature grid, footer — with a small number of localized interactive surfaces:

- An animated launcher demo (live-typing search query, blinking caret,
  result list rendering).
- An auto-cycling Snappy mascot "cosplay" carousel with hover chevrons.

The design was authored on a fixed 1280px canvas, but the production site
must be **responsive across mobile, tablet and desktop** — the 1280px
canvas is a reference layout, not a target viewport.

The Torchsnap app itself is built with React 19, Vite, Tailwind v4, and a
shared design-token file (`packages/plugin-sdk/theme.css`) consumed via
Tailwind's `@theme` directive. Reusing the existing tokens is a hard
requirement so the site cannot drift from the app's visual language.

A non-trivial stretch goal is to **port simplified versions of the real
launcher rendering components from `../torchsnap`** into the website
(rather than recreating the design-bundle's JSX prototypes). That keeps
the site's "live demo" pieces honest to the actual product UI.

## Decision

The website will be built with **Astro**, using **React** components as
client-side islands for the interactive pieces, and **Tailwind v4** for
styling. Design tokens are sourced by importing the same `theme.css`
that the Torchsnap app uses, so the website inherits the app's color,
typography, and spacing system without duplication.

Concretely:

- Static chrome (header, hero markup, feature grid, footer) is authored
  as `.astro` components and rendered to plain HTML at build time.
- Interactive pieces (animated launcher demo, mascot cycler) are React
  components hydrated as Astro islands (`client:visible` / `client:idle`).
- Tailwind v4 is wired in via Astro's first-party Vite plugin. The same
  `@theme` token file from `../torchsnap/packages/plugin-sdk/theme.css`
  is imported so utility classes resolve to identical values.
- Responsive layout is implemented with Tailwind's breakpoint utilities;
  the 1280px design canvas is treated as the `lg`/`xl` reference and
  re-flowed for `md`/`sm` viewports.
- The site builds to a fully static bundle, deployable to any static
  host (Cloudflare Pages, GitHub Pages, Netlify) with no SSR runtime.

## Consequences

**Easier:**

- Zero JavaScript ships for the static majority of the page → fast LCP,
  good SEO for a marketing surface.
- Interactive React components from the design bundle (and, ideally,
  simplified ports of the real Torchsnap launcher components) drop in
  almost verbatim as islands.
- Single source of truth for design tokens — no parallel Tailwind config
  to keep in sync with the app.
- Static output simplifies hosting and CI; no server runtime to manage.

**Harder / trade-offs:**

- Two component flavors coexist: `.astro` for static chrome and `.tsx`
  for hydrated islands. Contributors need to know which to reach for.
- Astro adds a small amount of build tooling on top of Vite that the
  team would not need if the site were a plain Vite + React SPA.
- If the site ever grows into a heavily interactive multi-page app,
  the islands model may feel constraining and a migration to a
  React-first framework (Next.js, plain Vite SPA) could become
  attractive. For a primarily static landing site this is not a
  near-term concern.

**Rejected alternatives:**

- *Plain Vite + React + Tailwind* — matches the app stack exactly, but
  ships a full React bundle for what is mostly static marketing copy
  and offers no SSG out of the box.
- *Next.js* — overkill for a single landing page; pulls in a server
  runtime story we do not need.
- *Plain HTML + Tailwind CLI + vanilla JS* — leanest option, but
  re-implementing the typing/cycling demo without React discards the
  existing JSX components and the future option of porting real
  Torchsnap UI code.

# 6. Drop React; render the launcher statically and the theme toggle in vanilla JS

Date: 2026-05-05

## Status

Accepted

Supersedes [2. Use Astro with React islands and Tailwind v4](0002-use-astro-with-react-islands-and-tailwind-v4.md)

## Context

ADR-0002 picked Astro + React islands because the V1b design called for
two interactive surfaces: an animated launcher demo and an auto-cycling
mascot carousel. The mascot carousel was never built. The animated
launcher was prototyped (commit `78615bf`) and removed (commit
`1e02fd0`) — the motion read as visually noisy on a marketing hero, so
the launcher stays static.

That leaves `ThemeToggle` as the only React island in `web/src/`. It is
a three-segment radio group with a sliding pill, localStorage
persistence, and a `prefers-color-scheme` listener — mechanical DOM
work that does not benefit from a virtual DOM or hooks.

The pre-paint theme initialiser in `web/src/site/Layout.astro` is
already plain inline JS and is not affected by this decision.

## Decision

Drop React from the website. The site is Astro + Tailwind only, with
small vanilla TypeScript scripts where client interactivity is needed.

* The hero launcher is rendered statically as `.astro` markup and
  ships no JS.
* `ThemeToggle` is rewritten as `ThemeToggle.astro` plus a small
  vanilla TS handler (`web/src/theme/toggle.client.ts`) loaded via an
  Astro `<script>` tag. The handler reuses the existing
  framework-agnostic helpers in `web/src/theme/preference.ts`.
* Heroicons in the toggle move from `@heroicons/react` to
  `astro-icon`, matching the icon system already used everywhere else
  in the project.
* The pre-paint script in `Layout.astro` additionally writes the
  current preference to `document.documentElement.dataset.themePreference`
  so `ThemeToggle.astro` can position the active pill correctly on
  first paint without a client-side reflow.
* `@astrojs/react`, `react`, `react-dom`, `@types/react`,
  `@types/react-dom`, and `@heroicons/react` are removed from
  `web/package.json`. The `react()` integration is removed from
  `web/astro.config.mjs`.

## Consequences

* No JavaScript framework runtime ships to the client. The only
  client JS is the Layout pre-paint init and the toggle handler.
* `web/src/` has one component flavor (`.astro`) and one icon system
  (`astro-icon`).
* Reintroducing React later costs one `bun add @astrojs/react react
  react-dom` and reinstating the integration entry — cheap to
  reverse if a future feature genuinely needs it.

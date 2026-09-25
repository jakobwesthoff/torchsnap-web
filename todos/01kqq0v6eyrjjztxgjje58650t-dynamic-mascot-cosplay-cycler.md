---
kind: feature
status: open
area: [web/src/landing/hero/LauncherPreview.astro]
---

# Cycle Snappy's costumes on the hero launcher card

The mascot perched on the hero's launcher card is a static
`snappy-original-1024.png` (`web/src/landing/hero/LauncherPreview.astro`).
The design replaces it with an auto-rotating costume cycler: a random
initial costume, an automatic advance every 2.6 s, and a small name-tag
pill below the mascot showing the costume name and an `NN/NN` index,
cross-faded on each change. There are no manual prev/next controls.

## Scope

- Costume images: `web/src/assets/mascots/`, already bound by id in
  `MASCOTS` in `web/src/landing/mascot-theater/cast.ts`. The current
  mascot goes through `astro:assets` (webp, densities 1/2/3, eager,
  high fetch priority); the cycler must not lose that.
- Name-tag pill styled with the site's surface and border tokens.
- With `prefers-reduced-motion: reduce`, show one random costume and do
  not rotate.

## Design reference

The design was removed from the repo in `aa6e2b7`. Read it from the
commit before:

    git show aa6e2b7^:design/iteration01/project/src/V1bClassicHeroSnappy.standalone.jsx

It has the `V1B_COSPLAY` list, the auto-cycle effect and
`CosplayNameTag`.

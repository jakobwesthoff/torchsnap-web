# Design and add a favicon

The default Astro `favicon.ico` / `favicon.svg` were removed during
scaffolding (see `web/public/`). The site currently ships without a
favicon and `index.astro` no longer references one.

## What's needed

A real Torchsnap favicon set in `web/public/` and the corresponding
`<link>` tags wired into the base layout.

## Direction (to confirm before designing)

Pair the Torchsnap orange gradient (the same one used on the app icon)
with one of two foreground motifs:

- The tray-icon glyph (`../torchsnap-web/design/iteration01/project/assets/tray-icon-template.png`).
- The classic Snappy mascot (`../torchsnap-web/design/iteration01/project/assets/snappy-original-1024.png`,
  also at `../torchsnap/...` in the app's mascot set).

The tray glyph reads better at 16/32px; Snappy reads better at
larger sizes (180px Apple touch icon, 512px PWA). A two-asset set
(small glyph for tiny sizes, Snappy for large sizes) is likely the
right answer — needs a final call.

## Deliverables

- `favicon.svg` (vector, both light/dark backgrounds in mind).
- `favicon.ico` (multi-size: 16, 32, 48).
- `apple-touch-icon.png` (180×180).
- Optional PWA icons (192, 512) if/when we add a manifest.
- `<link>` tags in the base layout.

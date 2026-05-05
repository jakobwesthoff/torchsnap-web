# Gadget showcase screenshots

Drop launcher captures here, one per featured Gadget in
`web/src/landing/gadgets/`. Each Gadget needs both a
light- and a dark-theme capture under matching basenames in
`light/` and `dark/`; the page swaps between them based on
`data-theme` on `<html>`.

Before committing, trim the empty transparent border so the
content sits flush against the bounding box (otherwise the
macOS window-shadow halo or the snappy mascot's empty headroom
above the launcher pushes the image around in the layout):

```sh
bun run trim:image src/assets/gadgets/light/calculator.png --in-place
bun run trim:image src/assets/gadgets/dark/calculator.png --in-place
```

Add `--padding 16` if you want to keep a small transparent
margin (e.g. for a CSS shadow that needs room to breathe).

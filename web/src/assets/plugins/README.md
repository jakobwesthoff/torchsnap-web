# Plugin showcase screenshots

Drop launcher captures here, one per featured plugin in the
`web/src/landing/plugin-universe/`.

Before committing, trim the empty transparent border so the
content sits flush against the bounding box (otherwise the
macOS window-shadow halo or the snappy mascot's empty headroom
above the launcher pushes the image around in the layout):

```sh
bun run trim:image src/assets/plugins/calculator.png --in-place
```

Add `--padding 16` if you want to keep a small transparent
margin (e.g. for a CSS shadow that needs room to breathe).

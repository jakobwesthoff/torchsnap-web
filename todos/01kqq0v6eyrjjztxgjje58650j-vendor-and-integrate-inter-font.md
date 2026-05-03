# Vendor and integrate the Inter font

The Torchsnap app ships Inter Variable as a self-hosted woff2
(`../torchsnap/src/index.css` + `../torchsnap/public/fonts/`) and
defines `--font-sans` to use it. The website must do the same so its
typography matches.

## Scope

- Copy `Inter-Variable.woff2` into `web/public/fonts/`.
- Add the `@font-face` declaration (matching the app's: weight range
  `100 900`, `font-display: swap`) to `web/src/styles/global.css`.
- Confirm `--font-sans` from `theme.css` already lists `"Inter"` as
  the preferred family — no override needed.
- Verify `font-feature-settings` matches the app where it matters
  (the app uses `"cv11", "ss01", "ss03"` on the body in places).
  Decide whether the marketing site adopts the same.
- Verify in `bun run dev` that Inter renders (no FOUT to a system
  fallback after first load).

## Out of scope

- Mono font (only needed once we render code-style elements; revisit
  when a section needs it).
- Variable axis customization (italic axis, etc.) unless a section
  specifically calls for it.

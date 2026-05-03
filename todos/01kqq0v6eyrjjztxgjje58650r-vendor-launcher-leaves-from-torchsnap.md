# Vendor launcher leaf components from ../torchsnap

Per ADR-0003, the dynamic launcher demo is built from copied &
adapted versions of the presentational components in
`../torchsnap/src`, not from the design-bundle JSX.

## Files to copy

From `../torchsnap/src` into `web/src/launcher/` (or similar):

- `components/KeyCap.tsx`
- `components/KeyBindingPill.tsx`
- `components/Mascot.tsx`
- `launcher/ResultRow.tsx`
- `launcher/LauncherFooter.tsx`
- `lib/cn.ts`
- `lib/highlightText.tsx`
- `components/Icon.tsx` — trim to the heroicons branch only;
  drop the asset/emoji/data-url cases the website does not need.

Plus the relevant type fragments from `src/types.ts` (`SourcedEntry`,
`EntryIcon`, `Action`, `FooterState`).

## Adaptation

- Each copied file gets a header comment pointing back to its
  source path so future re-syncs are obvious.
- Strip imports that pull in app-only modules (settings, plugin
  context, Tauri). Anything that cannot be cleanly cut means the
  component is not actually presentational and belongs in the demo
  layer instead.
- Make the components accept the smaller, demo-shaped props; they
  do not need to support everything the real Launcher passes.

## Out of scope

- The animated demo itself — that is the next todo and consumes
  these components.
- Building a sync script. Refresh is manual per ADR-0003.

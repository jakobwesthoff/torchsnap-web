# Theme switcher unresponsive on iPhone / mobile

The `ThemeToggle` React island in `web/src/theme/ThemeToggle.tsx` does
not react to touch on iPhone / mobile browsers. Tapping the
System / Light / Dark segments has no effect; the active selection
does not change and the theme does not switch.

Desktop (mouse click) works as expected.

## To investigate

- Are the segment buttons receiving the `click` / `pointerup` event
  at all on iOS Safari? (devtools remote inspect)
- Is something on the page intercepting the touch — e.g. a parent
  with `pointer-events: none`, a `touch-action` rule, or an overlay
  from the sticky header / footer area?
- Is the island actually hydrating on mobile? `client:idle` plus a
  slow connection could delay hydration; verify with a
  `console.log` in the component body.
- Does the sliding-pill layout swallow the tap? The visual pill
  might sit above the buttons in the stacking order and block
  pointer events. If so, add `pointer-events: none` to the pill.
- iOS Safari sometimes needs `cursor: pointer` on an element for
  the synthesized click event to fire reliably on non-button
  elements — verify the underlying elements are real `<button>`s.

## Fix

Once root cause is identified, fix and verify on a real iPhone
(or at minimum iOS Simulator Safari), not just Chrome devtools
device emulation.

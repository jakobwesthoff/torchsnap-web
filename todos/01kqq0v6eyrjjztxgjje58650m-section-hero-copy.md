# Section: Hero copy (left column)

Implement the left half of the hero from V1b: eyebrow, two-line
headline with accent-colored second line, supporting paragraph,
primary + ghost CTA buttons, platform availability pills, and the
"Free, forever · MPL-2.0" license note.

## Scope

- `web/src/components/Hero.astro` (or equivalent) containing the
  left column. The right column (launcher card) is the next todo;
  leave it as an empty placeholder slot for now so the grid layout
  is already correct.
- Reusable bits authored as small Astro components where they will
  appear elsewhere: `PrimaryButton`, `GhostButton`, `PlatformPill`.
- Heroicons: use `@heroicons/react` (already aligned with the app)
  via React island, or render the needed SVGs inline as Astro —
  decide based on how many icons end up here. Inline SVG is likely
  enough for buttons and pills; islands are wasteful for static
  glyphs.
- Responsive: desktop two-column grid at `lg`+, single column
  stacked at `sm`/`md` with the headline and copy first, CTAs
  below.

## Reference

`design/iteration01/project/src/V1bClassicHeroSnappy.standalone.jsx`,
the hero `<section>` block.

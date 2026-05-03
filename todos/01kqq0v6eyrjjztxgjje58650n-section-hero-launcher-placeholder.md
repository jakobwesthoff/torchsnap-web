# Section: Hero launcher card (static placeholder)

The right hero column is the launcher card with Snappy perched on
top. The animated demo and live cosplay cycler are dynamic and land
in their own todos at the end. This todo builds the static visual:
the card chrome (rounded corners, shadow stack, border), a static
search row, a static result list with a few canned entries, and a
static mascot image perched at the top.

## Scope

- `web/src/components/HeroLauncher.astro` rendering the card with
  Tailwind classes that match the real launcher's outer shell
  (`rounded-2xl bg-surface`, layered shadow). This shell is what
  the dynamic demo will later swap into.
- Static search input row with magnifier icon, placeholder text,
  and the `Esc` key pill on the right.
- Static result list: 3–5 hard-coded entries with icon, title,
  subtitle.
- Static footer row with `↵ Open` (or similar) hint.
- Static mascot image (classic Snappy) positioned above the card.
- Responsive: at `sm`/`md`, the card sits below the hero copy at
  full container width; at `lg`+, it sits in the right grid column
  at the design's anchored position.

## Out of scope

- Any animation, typing, or cosplay rotation — those replace this
  placeholder later.
- Vendoring the real launcher leaves from `../torchsnap` (separate
  todo); this placeholder is hand-written markup.

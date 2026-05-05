# Torchsnap Copywriting Guide

This guide is the durable record of voice, character, and structural
decisions made for the Torchsnap marketing site under `web/src/`. Its
audience is future copywriters — human or AI — drafting page content
for that site. Its scope is the public marketing pages only: it does
not cover API documentation, README files, commit messages, in-app
strings, or ADRs. Every claim below is either cited from the codebase
by `file:line` or marked **(established in copywriting session)** with
the rationale that produced it.

The voice has three axes you should hold simultaneously: **joyful**,
**defiant**, and **precise**. None of the three on its own produces a
sentence that fits this page. Drop the joy and you sound like every
other launcher's marketing site. Drop the defiance and you become
generic-friendly SaaS. Drop the precision and the copy reads as
performative whimsy. All three at once, all the time.

## Contents

1. [Who Torchsnap is](#who-torchsnap-is)
2. [Snappy](#snappy)
3. [Positioning against the established launchers](#positioning-against-the-established-launchers)
4. [Voice principles](#voice-principles)
5. [Structural patterns](#structural-patterns)
6. [Term branding](#term-branding)
7. [Anti-patterns](#anti-patterns)
8. [Workflow guidance](#workflow-guidance)
9. [When in doubt](#when-in-doubt)

---

## Who Torchsnap is

Before you write any sentence on this site, internalise what the
product *is* and what it *refuses to be*. Voice flows from character;
character does not flow from voice.

**What Torchsnap is.** A keyboard-first launcher. A tiny window, a
single hotkey, a Gadget ecosystem. Cross-platform from day one. Free,
forever. Source on GitHub. See the Hero pitch at
`web/src/landing/Hero.astro:21-24`.

**What Torchsnap refuses to be.** A feature-checklist product. A
matrix of capabilities. An account-gated tool. A telemetry vehicle. A
big launcher with a few extension points bolted on. The page states
those refusals as *positions*, not as marketing copy:

- *"No feature checklist. No matrix. Just three opinions about what a
  launcher should be, and a refusal to be anything else."* —
  `web/src/landing/FeatureRow.astro:80-82`
- *"No account. No telemetry. No catch."* —
  `web/src/landing/FeatureRow.astro:39`
- *"Torchsnap is a small launcher with a plugin system. Not a big
  launcher with a few extension points bolted on."* —
  `web/src/landing/plugin-universe/EcosystemBeat.astro:38-40`

**Three convictions, named and held.** The FeatureRow cards make
these explicit and a copywriter should treat them as load-bearing
positions: **Speed** (the launcher does not interrupt), **Everywhere**
(one launcher across three operating systems), **Open** (no account,
no telemetry, MPL-2.0). Find them at
`web/src/landing/FeatureRow.astro:21-44`. New copy that contradicts
any of these three should not ship.

**The character is joyful, defiant, and observed.** This product is
allowed to be funny, weird, and sentimental — about apps, about
typing, about the hotkey. *"Snappy is, frankly, a little weird about
cosplay. The good kind of weird. We've stopped trying to talk Snappy
out of it."* —
`web/src/landing/mascot-theater/MascotTheater.astro:42-45`. That tone
is not contained to the cast section — it is the through-line of the
page. New copy needs to feel like it could have been written by the
same hand.

---

## Snappy

Snappy is the page's affective heart and a competitive moat. No other
launcher has Snappy. Treat the character as load-bearing brand IP, not
decoration.

### What Snappy is

- **The mascot.** A small, hand-drawn character that perches on top
  of the launcher window. The original design appears at
  `web/src/assets/mascots/snappy-original-1024.png`.
- **A wardrobe-collecting eccentric.** Snappy owns 150-plus costumes
  and picks a different one every time the launcher is summoned —
  *"saves the bunny for Easter, the witch for Halloween, and
  something with claws for the full moon."* —
  `web/src/landing/mascot-theater/MascotTheater.astro:40-43`.
- **The personality of the software.** Where Torchsnap *runs*,
  Snappy *helps*. Where Torchsnap *ships*, Snappy *carries*.

### Snappy's character voice

The Mascot Theater cast in `web/src/landing/mascot-theater/cast.ts:56-66`
is the canonical Snappy voice. Read all seven cast bodies before
drafting Snappy-adjacent copy. The voice has three load-bearing moves:

**1. Cultural-reference-as-launcher-pun.** Each cast body lands a
recognisable cinematic / pop-culture line on a launching/app punchline:

- Dino card: *"Snappy gone prehistoric. Life, uh, finds a way to
  launch."* — `cast.ts:58`. Jurassic Park.
- Vampire card: *"Centuries of thirst. I vant to launch your
  applications."* — `cast.ts:59`. Lugosi.
- Wanderer card: *"Snappy as an ever-changing time traveller. Four
  pockets, all full of jelly babies and launch configs."* —
  `cast.ts:60`. Doctor Who.
- Adventurer card: *"Swapping the idol for a sandbag. It belongs in
  the app catalogue."* — `cast.ts:61`. Indiana Jones.
- Minion card: *"Snappy armed with a banana. LAUNCH! BA-NA-NA!"* —
  `cast.ts:63`. Despicable Me.
- Slasher card: *"Haunting your dreams. It knows what apps you want
  to launch next."* — `cast.ts:64`. Nightmare on Elm Street.
- Werewolf card: *"Hear that howl? Something hairy this way comes."*
  — `cast.ts:65`. Macbeth.

**(Established in copywriting session.)** The pattern: a recognisable
genre quote, redirected to *launching* / *apps* / *the catalogue*. The
joke lands because the reference is honoured (the cadence of the
original is preserved) and then *bent* to the product's domain. Do
not write a Snappy-flavoured sentence that gestures at a reference
without committing to it; half-references read as smirking.

**2. Affectionate weirdness, owned.** Snappy is not embarrassed about
being strange. The page declares this directly: *"Snappy is, frankly,
a little weird about cosplay. The good kind of weird. We've stopped
trying to talk Snappy out of it."* —
`web/src/landing/mascot-theater/MascotTheater.astro:42-45`. New
Snappy-adjacent copy is allowed to lean into the weirdness; do not
sand it off.

**3. Anthropomorphic refusals and preferences.** Snappy *refuses*,
*saves*, *picks*. The H2 of the cast section is *"Snappy refuses to
wear / the same thing twice."* —
`web/src/landing/mascot-theater/MascotTheater.astro:36-37`. Snappy
having opinions and small obstinacies is part of the character.

### Verb assignment: Snappy vs. Torchsnap

| Subject | Verbs | Why |
|---|---|---|
| **Snappy** | *carries, hands, fetches, reaches, refuses, picks, saves, summons, knows* | Helper-character verbs. Things a fictional character with feelings would do. |
| **Torchsnap** | *runs, ships, loads, ranks, opens, supports, compiles, sandboxes* | Software-process verbs. Things a piece of code does. |

A line like *"Snappy ships gadgets"* mis-attributes a software action
to the mascot — wrong. *"Snappy hands you gadgets"* is right.
**(Established in copywriting session.)**

The PluginUniverse H2 is the canonical right-side example for Snappy:
*"Snappy's gadgets. / Every one of them a plugin."* —
`web/src/landing/plugin-universe/PluginUniverse.astro:40-42`. Snappy
*owns* the gadgets, the system *is* a plugin system. The "We use what
we ship" beat at `web/src/landing/plugin-universe/EcosystemBeat.astro:113-119`
is the canonical right-side example for Torchsnap: it ships, the
mascot does not.

### Snappy is the brand moat

The competitors (see [Positioning against the established
launchers](#positioning-against-the-established-launchers)) do not
have a character. They have brands, logos, marketing colours. They do
not have a *figure* the user can point at and feel something about.
Snappy is the durable affective hook. Copy that protects, extends,
and uses Snappy is doing brand-strategic work. Copy that drains
Snappy of personality — generic-mascot lines, sand-off-the-edges
"professional" rewrites — should be rejected at review.

---

## Positioning against the established launchers

Torchsnap is competing in a category that already has Spotlight (Mac,
free, lightweight, locked to Apple), Alfred (Mac, mature, paid for
Powerpack), and Raycast (Mac, polished, account-gated, telemetry,
extensions as bolt-ons). The page does not name them, but every
section makes a position against them. Knowing that lets you write
copy that hits these positions on purpose, instead of blandly.

### What Torchsnap implicitly contrasts itself with

| Established norm | Torchsnap's position | Where the page says this |
|---|---|---|
| Closed / proprietary launcher | Open ecosystem, MPL-2.0, source on GitHub | `web/src/landing/FeatureRow.astro:38-44` (Open card); `web/src/landing/plugin-universe/EcosystemBeat.astro` (whole closing card) |
| Account / sign-up required | No account, no telemetry, no catch | `web/src/landing/FeatureRow.astro:39-41` |
| Extensions bolted onto an app launcher | Plugin system the launcher itself is built on | *"a small launcher with a plugin system. Not a big launcher with a few extension points bolted on."* — `web/src/landing/plugin-universe/EcosystemBeat.astro:38-40` |
| Built-in features privileged over third-party | Built-in and third-party use the same way in | *"there's nothing a third-party Gadget can't reach for that a built-in one can"* — `web/src/landing/plugin-universe/EcosystemBeat.astro:42-43`; *"We use what we ship"* — `:113` |
| macOS-only / platform-locked | Cross-platform from day one, same hotkey, same fuzzy ranker, same Gadget format | `web/src/landing/FeatureRow.astro:31-34` (Everywhere card) |
| Slow system pickers (macOS emoji picker, Spotlight latency) | Pops up; no menu hunt; no app switch; no break in writing | `web/src/landing/plugin-universe/plugins.ts:48` (emoji card body) |
| Search-engine-then-click | Browser opens already on the answer page | `web/src/landing/plugin-universe/plugins.ts:70-71` (bangs card body) |
| Open-app-just-to-do-quick-math | Calculator inside the launcher, history persists | `web/src/landing/plugin-universe/plugins.ts:58-59` |
| Spotlight lingers (menu bar, dock, afterimage) | Esc and it's gone | `web/src/landing/FeatureRow.astro:25` |

**(Established in copywriting session.)** The competitors are never
named on the page. Do not name them in copy either — the position is
made stronger by being read between the lines.

### How to use this in new copy

When a section needs a lift, ask: *what is the established norm this
section is implicitly refusing?* The answer points you at the
sentence. Three working examples from current copy:

- The Open card lands by negation against account-gated norms.
- The Everywhere card lands by claiming consistency where users
  expect platform divergence.
- The EcosystemBeat lands by reversing the
  launcher-with-plugins-bolted-on architecture into
  plugins-all-the-way-down.

If a draft reads as if the category did not exist — as if Torchsnap
were the first launcher anyone ever wrote about — the draft is
floating. Anchor it to the category's defaults and push.

---

## Voice principles

### Joyful precision

The page is *funny*, but the wit is dry, observational, and earned by
specificity. It is not stand-up; it is an aside. The pattern is:
state the thing precisely, then the wit lands as the implication.

Examples:

- *"A calculator that doesn't need its own window."* —
  `web/src/landing/plugin-universe/plugins.ts:60`. The whole joke is
  the *doesn't need its own window* — a quiet rebuttal of the
  Calculator-as-an-app convention. Specific, precise, funny by
  implication.
- *"An emoji picker that keeps up with the keyboard."* —
  `web/src/landing/plugin-universe/plugins.ts:49`. Same move: states
  what most emoji pickers fail at, lets the reader complete the
  comparison.
- *"Search the web without first opening the web."* —
  `web/src/landing/plugin-universe/plugins.ts:71`. Two beats; the
  twist is in the second clause. Precise, almost koan-like.
- *"We've stopped trying to talk Snappy out of it."* —
  `web/src/landing/mascot-theater/MascotTheater.astro:45`. Throwaway
  closer; admits defeat to the mascot's eccentricity. The fondness is
  the joke.

The pattern is the *understated* part — the line stops just before
the laugh and trusts the reader to bring it. Avoid the inverse:
preamble, set-up, joke spelled out. **(Established in copywriting
session.)**

### Specificity as warmth

Generic copy reads cold. Specific copy reads warm — because
specificity is the texture of having paid attention. The page reaches
for concrete moments, named occasions, named glyphs, named keystroke
counts.

- *"saves the bunny for Easter, the witch for Halloween, and
  something with claws for the full moon"* —
  `web/src/landing/mascot-theater/MascotTheater.astro:42-43`. Three
  costumes named, three occasions named.
- *"Four pockets, all full of jelly babies and launch configs."* —
  `web/src/landing/mascot-theater/cast.ts:60`. Pockets, count;
  contents, named.
- *"Two letters of what you meant"* (earlier draft) /
  *"two letters away"* (current) —
  `web/src/landing/plugin-universe/plugins.ts:47`. Specific keystroke
  count; not "a few letters".
- *"the emoji your sentence is missing, the math you'd have opened a
  tab for"* — `web/src/landing/plugin-universe/PluginUniverse.astro:48-49`.
  Each item has its own anchor — the specific situation that
  triggered it.

If a sentence reaches for *some, several, various, a range of*, it is
generic. Replace the vague quantifier with a specific moment, item,
or count. **(Established in copywriting session.)**

### Stab-sentence rhythm

Short, declarative, often verb-first or fragment. Two- and three-word
sentences are normal and expected. Longer sentences earn their
length; every clause does work.

- *"Esc and it's gone."* — `web/src/landing/FeatureRow.astro:25`
- *"No menu hunt. No app switch. No break in the writing."* —
  `web/src/landing/plugin-universe/plugins.ts:48`
- *"Nothing leaves your machine. Nothing to sign up for."* —
  `web/src/landing/FeatureRow.astro:41`
- *"That's the whole interaction model."* —
  `web/src/landing/HotkeyBanner.astro:54`

When a paragraph runs more than three sentences without a fragment
breaking the rhythm, it is too smooth. Cut.

### Triplets for cadence

Three-beat patterns — three nouns, three verbs, three negations —
recur across the page and are the load-bearing rhythmic device.

- Eyebrow triplet: *"Light · Find · Launch"* —
  `web/src/landing/Hero.astro:12`. Middle dots, not commas.
- Negation triplet: *"No account. No telemetry. No catch."* —
  `web/src/landing/FeatureRow.astro:39`; same shape in *"No menu
  bar, no dock, no afterimage."* — `web/src/landing/FeatureRow.astro:25`.
- Sentence-internal triplet:
  *"the apps, files, and small tasks you reach for all day"* —
  `web/src/landing/Hero.astro:21-22`.

A triplet is a chosen rhythm, not a coincidence. If a sentence has
three commas, count the items; either commit to the triplet (parallel
forms, same lengths) or break it.

### Sensory and tactile verbs

The launcher is treated as a physical object — something you strike,
that lights, that hands you things. The page voice prefers verbs you
can feel.

Approved verbs in current copy: *strike, light, hunt, pop, reveal,
open, drop, fall, land, settle, reach, hand, fetch, carry, summon,
crunch.*

- *"Strike a key, light the way."* —
  `web/src/landing/Hero.astro:16-17`
- *"Pressing the hotkey reveals more than an app launcher."* —
  `web/src/landing/plugin-universe/PluginUniverse.astro:47`
- *"the search that lands already on the answer page"* —
  `web/src/landing/plugin-universe/PluginUniverse.astro:49-50`
- *"wherever it falls out of your fingers"* —
  `web/src/landing/plugin-universe/plugins.ts:70`

If a sentence reaches for an abstract motion verb (*deliver, provide,
enable, support, integrate*), rewrite it concrete.

### Defiant negation as a stance device

Negation is not a softener here, it is the stance. The site states
what Torchsnap refuses, and that refusal is the value proposition.

- *"No feature checklist. No matrix. Just three opinions..."* —
  `web/src/landing/FeatureRow.astro:80-82`
- The eyebrow *"Lines in the sand"* —
  `web/src/landing/FeatureRow.astro:72` — frames the section as
  positions held, not features listed.
- *"Not a big launcher with a few extension points bolted on."* —
  `web/src/landing/plugin-universe/EcosystemBeat.astro:39-40`

### Anti-disruption is the core promise

The launcher's value proposition is *not breaking flow*. This must
remain the through-line of any new copy.

- *"ranking results before your finger leaves the key"* —
  `web/src/landing/FeatureRow.astro:25`
- *"No menu hunt. No app switch. No break in the writing."* —
  `web/src/landing/plugin-universe/plugins.ts:48`
- *"None of it breaks the thing you were doing."* —
  `web/src/landing/plugin-universe/PluginUniverse.astro:50`
- *"Mid-thought, you need a number. Type the expression, the
  answer's already underneath it."* —
  `web/src/landing/plugin-universe/plugins.ts:58-59`

Any new section should be auditable against this promise: does the
copy reinforce that the launcher does not interrupt the user's
current task?

### No corporate filler

Words that must not appear in body copy: *powerful, seamless,
intuitive, gateway, leverage, robust, comprehensive, enterprise-grade,
unlock, empower, supercharge, elegant, frictionless, delightful,
streamlined, lightning-fast.* **(Established in copywriting session.)**
Rationale: these adjectives carry no information that the reader can
picture. If a sentence needs one of them to feel finished, the
sentence is wrong; rewrite the claim concrete.

The current copy contains none of these words. Audit a draft for them
before submitting.

### No quantitative claims unless measured

A previous Speed-card title read *"From thought to result in 80
milliseconds."* The figure was never measured and was removed; the
current title is *"From thought to result. No detour."* —
`web/src/landing/FeatureRow.astro:23`. **(Established in copywriting
session.)**

The replacement strategy is a **physical-anchor claim** — a phrase
the reader can feel rather than verify with a stopwatch:

- *"ranking results before your finger leaves the key"* —
  `web/src/landing/FeatureRow.astro:25`
- *"two letters away"* —
  `web/src/landing/plugin-universe/plugins.ts:47`
- *"already underneath it"* —
  `web/src/landing/plugin-universe/plugins.ts:59`

Use this pattern for any performance, latency, or "instantness"
claim. Numbers go on the page only when there is a measurement behind
them that the team will defend.

---

## Structural patterns

### Section head triplet

Every major landing section opens with the same three-part head:

1. **Eyebrow** — small uppercase tag, 3–5 words.
2. **H2** — two-line setup, second line italicised in `text-accent`.
3. **Sub-paragraph** — body lede, max-width column, centred under the H2.

Example, in full, from
`web/src/landing/plugin-universe/PluginUniverse.astro:35-51`:

```astro
<p class="eyebrow mb-3">Open the drawer</p>
<h2 ...>
  Snappy's gadgets.
  <br />
  <span class="font-medium italic text-accent">Every one of them a plugin.</span>
</h2>
<p ...>
  Pressing the hotkey reveals more than an app launcher. The
  emoji your sentence is missing, the math you'd have opened
  a tab for, the search that lands already on the answer
  page. None of it breaks the thing you were doing.
</p>
```

The same triplet appears in `MascotTheater.astro:31-46` and
`FeatureRow.astro:70-83`. New sections must follow it.

### Eyebrow shapes that work

Three observed eyebrow shapes. Pick one; do not invent a fourth
without a reason.

1. **Imperative inviter.** A small instruction to the reader.
   - *"Meet the cast"* —
     `web/src/landing/mascot-theater/MascotTheater.astro:33`
   - *"Open the drawer"* —
     `web/src/landing/plugin-universe/PluginUniverse.astro:36`
2. **Idiomatic stance phrase.** A figure of speech that frames the
   section as a position.
   - *"Lines in the sand"* — `web/src/landing/FeatureRow.astro:72`
   - *"Already in the box"* —
     `web/src/landing/plugin-universe/BuiltInRail.astro:9`
   - *"Open ecosystem"* —
     `web/src/landing/plugin-universe/EcosystemBeat.astro:29`
3. **Verbal triplet with middle dots.** Reserved for high-bandwidth
   eyebrows like the hero.
   - *"Light · Find · Launch"* — `web/src/landing/Hero.astro:12`

### H2 two-line accent pattern

The H2 is a two-line phrase: a setup line, a `<br />`, then an
italic-accent payoff. The italic span uses the exact class string
`font-medium italic text-accent`.

- *"Strike a key, / light the way."* —
  `web/src/landing/Hero.astro:16-17`
- *"Snappy refuses to wear / the same thing twice."* —
  `web/src/landing/mascot-theater/MascotTheater.astro:36-37`
- *"Snappy's gadgets. / Every one of them a plugin."* —
  `web/src/landing/plugin-universe/PluginUniverse.astro:40-42`
- *"Three things. / Done with conviction."* —
  `web/src/landing/FeatureRow.astro:75-77`

The Hero H1 wraps the accent line in `<span class="text-accent">`
without the italic — the italicised payoff is an H2-tier convention,
not an H1-tier one. See `web/src/landing/Hero.astro:17`.

### Section H2 sizing tiers

The page has three deliberate type-size tiers:

- **H1 — Hero only.** `text-5xl ... md:text-6xl lg:text-[64px]` —
  `web/src/landing/Hero.astro:15`.
- **H2 — major peer sections.** `text-4xl md:text-5xl lg:text-[56px]`
  — `web/src/landing/FeatureRow.astro:74` and
  `web/src/landing/plugin-universe/PluginUniverse.astro:38`. The
  Mascot Theater H2 reaches `lg:text-[64px]` because it is the
  page's character-anchored playful moment; treat that tier as
  reserved for character-anchored sections, not a default —
  `web/src/landing/mascot-theater/MascotTheater.astro:35`.
- **H3 — card-internal.** `text-3xl md:text-4xl` for the
  closing-beat H3 *"Gadgets all the way down."* —
  `web/src/landing/plugin-universe/EcosystemBeat.astro:31-33`.
  Slab-card H3s in `FeatureRow.astro:102` use
  `text-2xl md:text-[32px] lg:text-[40px]`, one notch smaller again
  because they sit inside a card.

When introducing a new section, pick the existing tier that matches
its job. Do not reach for a custom size.

### Centered head pattern

Section heads are centred. The wrapper carries `text-center` and the
sub-paragraph uses `mx-auto` against its own `max-w-[...]`.

- `web/src/landing/FeatureRow.astro:70` (`text-center`) and
  `:79` (`mx-auto ... max-w-[640px]`).
- `web/src/landing/mascot-theater/MascotTheater.astro:31`
  (`text-center`) and `:39` (`mx-auto ... max-w-[680px]`).
- `web/src/landing/plugin-universe/PluginUniverse.astro:35`
  (`text-center`) and `:44-45` (`mx-auto ... max-w-[640px]`).

The Hero is the deliberate exception. It uses an asymmetric
two-column grid with the launcher card on the right — see
`web/src/landing/Hero.astro:8` (`lg:grid-cols-2`) — and so the copy on
the left stays left-aligned inside its `max-w-xl` column
(`web/src/landing/Hero.astro:10`).

### Definite-article-with-anchor pattern

The page uses *"the X you Y"* fragments to evoke breadth without
listing exhaustively. The pattern is a definite article + concrete
noun + an anchor clause that lets the reader infer the rest.

- *"the bunny for Easter, the witch for Halloween, and something
  with claws for the full moon"* —
  `web/src/landing/mascot-theater/MascotTheater.astro:42-44`.
  Anchors: *for Easter*, *for Halloween*, *for the full moon*.
- *"The emoji your sentence is missing, the math you'd have opened
  a tab for, the search that lands already on the answer page."* —
  `web/src/landing/plugin-universe/PluginUniverse.astro:48-50`.
  Anchors: *your sentence is missing*, *you'd have opened a tab
  for*, *that lands already on the answer page*.

**Critical rule:** the elision only works when each item carries an
anchor that makes inference automatic. *"The emoji, the lookup, the
bit of math"* — without anchors — fails: the reader has nothing to
fill in and the line reads as a vague gesture. **(Established in
copywriting session.)** If you reach for this pattern, write the
anchor first; if no anchor naturally fits, use a different pattern.

---

## Term branding

### Gadget vs. plugin

**Gadget** is the user-facing term for a feature. **plugin** is the
technical/architectural term — the system, the SDK, the build target.
The two terms cohabit deliberately, and the page bridges them once at
the PluginUniverse opening so downstream copy can use either.

The bridge happens in the H2 itself:

- *"Snappy's gadgets. / Every one of them a plugin."* —
  `web/src/landing/plugin-universe/PluginUniverse.astro:40-42`.

After that bridge, the two words are used by job:

- **Gadget = user-facing instances.** *"All those bundled Gadgets
  are written the way you'd write your own"* —
  `web/src/landing/plugin-universe/EcosystemBeat.astro:41-42`. *"a
  third-party Gadget can't reach for that a built-in one can"* —
  same file, `:42-43`. The header nav label *"Gadgets"* —
  `web/src/site/Header.astro:14`. The Hero body's *"a Gadget
  ecosystem to make it your own"* — `web/src/landing/Hero.astro:23`.
- **plugin = system / architecture / SDK.** *"a small launcher with
  a plugin system"* —
  `web/src/landing/plugin-universe/EcosystemBeat.astro:38-39`. The
  H2 italic *"Every one of them a plugin"* sits at the pivot from
  user view to architectural view.

The capitalisation pattern in current copy is **Gadget** capitalised
when used as the product term, **plugin** lower-case as a common-noun
technical term. See the contrast at
`web/src/landing/plugin-universe/EcosystemBeat.astro:38-43`.

(For the Snappy / Torchsnap split — also a brand decision — see
[Snappy](#snappy) above.)

---

## Anti-patterns

### Comparative without an established baseline

A draft eyebrow read *"The hotkey is for more than apps."* It was
rejected because the page never establishes a *"the hotkey is for
apps"* baseline that the comparative could push against.
**(Established in copywriting session.)** Comparatives need a salient
prior reading the visitor has actually formed; without one, *"more
than X"* lands as a non-sequitur.

Test before using: can the reader name the thing the comparative is
contrasting against, from copy they have already seen on this page?

### Half-formed metaphors

A draft EcosystemBeat phrasing read *"What we eat ourselves."* The
intended dog-food metaphor was cut down to a fragment that leaves the
reader without the colourful payoff. **(Established in copywriting
session.)** The replacement was the literal *"We use what we ship"* —
`web/src/landing/plugin-universe/EcosystemBeat.astro:113`.

Rule: realise the metaphor fully or replace it with a literal claim.
Half a metaphor is worse than none.

### Generic SaaS verbs

A draft PluginUniverse sub-paragraph read *"Drop in an emoji, run a
quick calculation, jump straight to a search result."* The verbs
*drop in, run, jump* are correct in a generic SaaS register but file
the edges off the page voice. **(Established in copywriting session.)**
The shipping line uses page-voice verbs: *"reveals"*, *"the math
you'd have opened a tab for"*, *"the search that lands already on
the answer page"* —
`web/src/landing/plugin-universe/PluginUniverse.astro:47-50`.

When choosing a verb, prefer the sensory list under [Sensory and
tactile verbs](#sensory-and-tactile-verbs) over the generic-tech
default.

### Corporate-cliché eyebrows

A draft FeatureRow eyebrow read *"Where we stand."* Rejected as
About-Us-page-y; it does not match the imperative-inviter or
idiomatic-stance shapes the page uses. **(Established in copywriting
session.)** The shipping eyebrow is *"Lines in the sand"* —
`web/src/landing/FeatureRow.astro:72`. Same job, different register.

### Em-dashes in body copy

Most punctuation in the body copy is `.` and `,`, not `—`. Use those.
**(Established in copywriting session.)**

Em-dashes are acceptable inside *headings* when they are
load-bearing — e.g. the page title *"Torchsnap — Strike a key, light
the way."* in `web/src/site/Layout.astro:26`. They are not acceptable
as a casual substitute for a period or comma in body paragraphs.

### Self-editorialising language

Avoid *for clarity, the cleanest, elegantly, simply, just (as a
softener), basically, literally* in body copy. **(Established in
copywriting session; mirrors the global anti-self-editorialising rule
in `~/.claude/CLAUDE.md`'s literate-programming section.)** If a
phrase needs *for clarity* to defend its existence, the phrasing is
wrong; rewrite it until it defends itself.

A current-copy *"Just three opinions"* at
`web/src/landing/FeatureRow.astro:81` is allowed because the *just*
there reads as *only* — the rhetorical hinge of the negation triplet.
It is part of the rhythm, not editorialising. The test is whether the
word would survive being replaced with *only*.

### Half-references and smirking jokes

Snappy's voice uses cultural references that *commit* — they preserve
the cadence of the original and bend the punchline. A reference that
gestures without committing reads as smirking. *"Some kind of
Jurassic launcher situation"* would be wrong; *"Life, uh, finds a way
to launch."* is right because it honours the source.
**(Established in copywriting session, derived from the cast.ts
voice.)**

### Sanding off Snappy's eccentricity

A draft instinct on review may be to "professionalise" Snappy's
voice — drop the all-caps *BA-NA-NA*, drop the *frankly*, drop the
*good kind of weird*. Reject those edits. The eccentricity is the
brand differentiator; smoothing it out turns Torchsnap into a
generic launcher with a logo. **(Established in copywriting
session.)**

---

## Workflow guidance

### Lead with what the section claims, then sharpen

When drafting, write the load-bearing claim first as a flat
sentence, then rewrite it into the page voice. Do not start with the
rhetoric and try to retrofit a claim. **(Established in copywriting
session.)**

### A title is load-bearing only if removing it loses information

If the H2 or card title can be deleted and every fact it carries
still appears in the body, the title is decoration. **(Established
in copywriting session.)** Either rewrite the title to add
information or drop it.

The retired *"From thought to result in 80 milliseconds"* title is
the canonical failure case: the body already covered the latency
point in felt terms, so the unmeasured number was the only thing the
title added — and it was wrong. The current title at
`web/src/landing/FeatureRow.astro:23` carries the *"No detour"*
framing, which is not in the body — load-bearing.

### Prefer physical-anchor claims over numbers

For any performance, latency, or "instant" claim that has not been
measured: write a sensation the reader can feel.

- *"before your finger leaves the key"* —
  `web/src/landing/FeatureRow.astro:25`
- *"two letters away"* —
  `web/src/landing/plugin-universe/plugins.ts:47`
- *"already underneath it"* —
  `web/src/landing/plugin-universe/plugins.ts:59`

A measured number, when one exists, is fine. An invented number is
not.

### Bridge overlapping terms once at the section opening

When introducing a new term that overlaps with an existing one,
equate them once in the section head and let downstream copy use
both naturally. The PluginUniverse H2 does exactly this for *Gadget*
and *plugin* —
`web/src/landing/plugin-universe/PluginUniverse.astro:40-42` — and
the EcosystemBeat body that follows uses both terms freely without
re-defining either: see the *"plugin system"* / *"bundled Gadgets"* /
*"third-party Gadget"* sequence at
`web/src/landing/plugin-universe/EcosystemBeat.astro:38-43`.

If a draft section needs to redefine a term every time it appears,
the bridge sentence is missing or in the wrong place.

### Read cast.ts and EcosystemBeat before drafting Snappy-adjacent copy

The richest concentration of Snappy's voice in the codebase is
`web/src/landing/mascot-theater/cast.ts:56-66` (seven cast bodies).
The richest defiant-position copy is
`web/src/landing/plugin-universe/EcosystemBeat.astro` (the closing
beat). Re-reading both before drafting calibrates the ear.

---

## When in doubt

Run a draft sentence through these questions, in order. If any
answer is *no* or *not sure*, rewrite before submitting.

1. **Does this sound like Snappy could have said it?** If the
   sentence has no warmth, no specificity, no character — and it is
   not a deliberately defiant convictions line — it does not belong
   on this page.
2. **Can I picture the verb?** If the verb is *deliver, enable,
   leverage, support, integrate*, or any other generic-tech default
   — rewrite with one from [Sensory and tactile
   verbs](#sensory-and-tactile-verbs).
3. **What established-launcher norm is this implicitly contrasting
   against?** If you cannot answer — see [Positioning against the
   established launchers](#positioning-against-the-established-launchers)
   — the sentence is floating outside the category.
4. **Is every number on this page something the team will defend
   under questioning?** If not — replace it with a physical-anchor
   claim per [No quantitative claims unless
   measured](#no-quantitative-claims-unless-measured).
5. **If I delete this title, does the body still carry every fact
   the title carried?** If yes — the title is decoration. Rewrite or
   drop.
6. **Is this sentence about the launcher *not* breaking the user's
   flow?** Or about Snappy's character? Or about a refusal? If it is
   none of those, check whether it earns its place on this page.
7. **Have I used *Snappy* for a software action, or *Torchsnap* for
   a character action?** If yes — swap, per the verb table in
   [Snappy](#snappy).
8. **Does this comparative point at a baseline the reader has
   already formed from earlier on the page?** If not — drop the
   comparative or write the baseline first.
9. **Did I sand any edges off Snappy?** If the rewrite "feels more
   professional" than the original, that is the warning sign — put
   the original back.

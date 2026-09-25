# torchsnap-web: project rules

## Source layout

`web/src/` is organized in vertical slices per concern
(<https://tkdodo.eu/blog/the-vertical-codebase>):

- `web/src/<concern>/` (`landing/`, `site/`, `theme/`): components,
  scripts and styles of one concern together.
- `web/src/design-system/`: non-domain shared visuals, utilities, global
  stylesheet entry, design tokens.
- `web/src/pages/`: Astro routes only.
- Promote code from a page into its own folder once it is shared or
  grows past one file.
- Import nothing from the torchsnap repo; copy what is reused (ADR 0005).

## Copy

All text on the site follows `docs/copywriting-guide.md`.

## Tests and quality gates

- The root `justfile` is the entrypoint for every task. Add new tasks
  there as recipes.
- The quality gate is `just fullcycle`. It must pass, and the build must
  print only the warnings listed in `web/README.md`, "Expected build
  warnings". Fix any other warning or error.
- At the start of a session, before the first change that can affect
  the gate's outcome, run it once to get a baseline. If the baseline
  already fails, tell the user what fails and propose fixing it before
  starting the other work.
- Code that runs on its own, such as the scripts in `web/tools/` and
  helpers like `web/src/design-system/cn.ts`, gets thorough tests with
  `bun test` whenever you touch it, edited code as much as new code.
  Cover the error and edge cases, not just the happy path.
- Work test-first there. For a bug, write a regression test that
  reproduces it, run it and see it fail, then fix the code until it
  passes.

## Todos

Todos live in `todos/`. `todos/README.md` describes their format.

- Once a todo is implemented, delete its file and every reference to it
  (find them with `rg <ulid> . ../torchsnap ../torchsnap-docs`). If a
  referencing file needs information from the todo, copy just that part
  into it, compact and precise.
- After a large work package is done, have Sonnet or Haiku agents
  (choose per scan) check all todos for work that is already done.
  Delete todos that are fully done and rewrite partly done ones so they
  cover only the remaining work.

## ADRs

- Create: `EDITOR=true adrs new "<title>"` (also `adrs link`, `status`,
  `list`). Set Status to `Accepted` when decided.
- Cover context, decision, consequences. Only what was decided; no
  speculation about CI, tooling or alternatives that were never on the
  table; no filler.

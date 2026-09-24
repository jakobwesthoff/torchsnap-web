# Show the latest release version near the download button

Show the version of the latest Torchsnap release (for example
"v0.10.0") next to the primary download button in
`web/src/landing/hero/Hero.astro`, without maintaining the number by
hand in the source.

How to get the number onto the page is **not decided**. Discuss the
options below when this is picked up.

## Facts

- The button links to
  `https://github.com/jakobwesthoff/torchsnap/releases/latest/download/Torchsnap.dmg`.
  GitHub resolves `latest` to the newest release that is not a
  prerelease.
- `https://api.github.com/repos/jakobwesthoff/torchsnap/releases/latest`
  returns that same release, with the version in `tag_name` (for
  example `v0.10.0`) and the date in `published_at`. It skips
  prereleases as well, so the shown version and the downloaded file
  match.
- The API answers with `access-control-allow-origin: *`, so browser
  JavaScript on torchsnap.app may call it. Without a token it allows
  60 requests per hour per IP address (`x-ratelimit-limit: 60`).
- The site is a static Astro build, deployed to GitHub Pages by
  `.github/workflows/deploy.yml` on pushes to `main`; the workflow also
  has a `workflow_dispatch` trigger.
- The site makes no request to a third party today (see option A).
- Releases are published locally with `just release-publish <version>`
  in the torchsnap repository, which runs with the GitHub CLI logged in.

## Options

### A. Fetch in the visitor's browser

A small script next to the button calls the API and fills in the
version.

- Always current, no rebuild needed.
- Many visitors behind one IP address (offices, schools, carrier NAT)
  share the 60 requests per hour. Cache the result, for example in
  `sessionStorage`, and hide the version when the call fails; the
  button must work without it.
- Reserve space for the version so the layout does not shift when it
  arrives.
- Every visitor's browser contacts GitHub, which sees the visitor's IP
  address. The site avoids third-party requests on purpose so far:
  fonts are self-hosted because of German case law on embedded remote
  fonts (`web/src/design-system/global.css`), and the Datenschutz
  section in `web/src/pages/impressum.astro` rests on the site having
  no third-party data flows. Option A would change that and needs the
  Datenschutz text updated.

### B. Fetch at build time and rebuild on every release

Astro frontmatter calls the API during `bun run build`, and the
version is part of the generated HTML.

- No JavaScript, no rate limit for visitors, no layout shift, no
  request to GitHub from the visitor's browser.
- The site must be rebuilt after each release. Possible triggers:
  - `release-publish` in the torchsnap repository starts the deploy
    workflow, for example with
    `gh workflow run deploy.yml -R jakobwesthoff/torchsnap-web`;
  - a daily `schedule:` trigger in `deploy.yml` as a fallback for
    releases published another way.
- A failed API call during the build should leave the version out
  rather than fail the build.

## To decide

- Option A or B.
- The wording and placement next to the button (for example "v0.10.0 ·
  macOS, Apple silicon" under it), following
  `docs/copywriting-guide.md`.
- Whether to show the release date as well.
- For B: which rebuild triggers, and whether the torchsnap release
  recipe may reach into this repository's workflow.

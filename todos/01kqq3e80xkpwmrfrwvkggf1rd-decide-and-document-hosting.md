# Decide and document the hosting target

Until this is settled, work proceeds under the assumption that the
site is deployed via **GitHub Pages** out of this repository.

## Scope

- Confirm or change the hosting target (GitHub Pages, Cloudflare
  Pages, Netlify, self-hosted, …).
- Capture the decision in an ADR.
- Configure the project for the chosen target:
  - Astro `site` (and `base`, if hosted under a path) in
    `astro.config.mjs`.
  - Deploy workflow (e.g. `.github/workflows/deploy.yml` for GitHub
    Pages) building with `bun run build` and publishing `web/dist/`.
  - Custom domain handling if applicable (`CNAME` file, DNS).
- Make sure the sitemap, robots.txt, and OG meta URLs match the
  resolved canonical URL.

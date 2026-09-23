# 7. Host the website on GitHub Pages at torchsnap.app

Date: 2026-09-23

## Status

Accepted

## Context

The site is static. `bun run build` writes it to `web/dist/`, and its
absolute URLs come from `site` in `web/astro.config.mjs`, which is
`https://torchsnap.app`. The documentation at `https://docs.torchsnap.app`
is built from the separate torchsnap-docs repository.

When this decision was made, this repository, torchsnap-docs, and
torchsnap were private. GitHub only publishes Pages sites from public
repositories on the GitHub Free plan.

## Decision

The site is published with GitHub Pages from this repository, under the
custom domain `torchsnap.app`.

This repository, torchsnap-docs, and torchsnap are made public before
the site is published for the first time.

`.github/workflows/deploy.yml` builds the site on every push to `main`,
on pull requests, and on manual runs. Its `deploy` job publishes
`web/dist/` to Pages only for `main`, never for pull requests, and only
while the repository is public.

The Pages source is "GitHub Actions". The custom domain is set in the
repository's Pages settings. GitHub ignores a `CNAME` file when a
workflow publishes the site, so the repository has none.

## Consequences

- While the repository is private, the workflow runs the build as CI
  and skips the deployment.
- Once the repository is public, every push to `main` deploys the site.

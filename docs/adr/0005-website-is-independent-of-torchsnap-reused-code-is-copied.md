# 5. Website is independent of torchsnap; reused code is copied

Date: 2026-05-03

## Status

Accepted

Refines [2. Use Astro with React islands and Tailwind v4](0002-use-astro-with-react-islands-and-tailwind-v4.md)

## Context

ADR-0002 originally suggested importing the design-token file
directly from `../torchsnap/packages/plugin-sdk/theme.css`. ADR-0003
already established that launcher UI is copied rather than imported,
but limited that rule to launcher leaves.

The website must build and deploy without `../torchsnap` being
checked out. CI hosts, contributors, and downstream forks should be
able to clone this repo alone and get a working site.

## Decision

The website does not import any source from `../torchsnap`. Anything
the website needs from there — design tokens, fonts, presentational
components, mascot assets — is copied into this repository and may
be adapted to fit the site.

The original Torchsnap files remain the visual reference; refreshes
are manual and reviewed.

## Consequences

- The repository is fully self-contained.
- Visual drift between the app and the website is possible and must
  be caught by review when copies are refreshed.

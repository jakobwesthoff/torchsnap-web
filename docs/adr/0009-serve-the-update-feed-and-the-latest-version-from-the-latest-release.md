# 9. Serve the update feed and the latest version from the latest release

Date: 2026-09-24

## Status

Accepted

Amends [8. Link the download button to the latest release's Torchsnap.dmg](0008-link-the-download-button-to-the-latest-release-s-torchsnap-dmg.md)

## Context

Torchsnap updates itself from a feed at
`https://torchsnap.app/updates/latest.json` (torchsnap ADR 0053). Each
torchsnap release uploads that feed as `release.json`, whose `version`
field names the release. The hero showed no version next to the
download button.

The site is static and deployed from GitHub Actions. torchsnap's
`just release-publish` starts the site's deploy workflow after a stable
release.

## Decision

The build downloads `release.json` of the latest torchsnap release from
`https://github.com/jakobwesthoff/torchsnap/releases/latest/download/release.json`
once and uses it twice:

- `/updates/latest.json` serves it unchanged.
- The hero's macOS pill reads "macOS · Apple silicon · v<version>", the
  version linking to that release's page on GitHub. No release date.

The build fails when the download fails or the version is not a stable
`major.minor.patch`. `TORCHSNAP_RELEASE_FEED` replaces the source with
another URL or a local file.

The browser makes no request to GitHub for the version.

## Consequences

- The site cannot be built before a torchsnap release carries
  `release.json`, except with `TORCHSNAP_RELEASE_FEED`.
- A failed build leaves the previous deployment, and its feed, online.
- Feed and version change only when the site is rebuilt.

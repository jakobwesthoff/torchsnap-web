# 8. Link the download button to the latest release's Torchsnap.dmg

Date: 2026-09-23

## Status

Accepted

Amended by [9. Serve the update feed and the latest version from the latest release](0009-serve-the-update-feed-and-the-latest-version-from-the-latest-release.md)

## Context

The hero's "Download for macOS" button needs a target that always serves
the newest Torchsnap build without an edit to the site per release.

GitHub redirects
`https://github.com/<owner>/<repo>/releases/latest/download/<name>` to
the asset called `<name>` in the latest release of that repository.
Tauri names its DMGs with version and architecture, for example
`torchsnap_0.9.3_aarch64.dmg`.

## Decision

The button links
`https://github.com/jakobwesthoff/torchsnap/releases/latest/download/Torchsnap.dmg`.

Every torchsnap release carries one DMG under the name `Torchsnap.dmg`.
It runs on Macs with Apple silicon only. The site offers no Intel
download.

The hero's macOS platform pill reads "macOS · Apple silicon".

## Consequences

- The torchsnap release process has to upload `Torchsnap.dmg` with every
  release. If the latest release lacks that asset, GitHub answers the
  link with a 404.
- When this decision was made, torchsnap had no release, so no
  `Torchsnap.dmg` existed yet.
- Macs with an Intel processor cannot run the downloaded app.

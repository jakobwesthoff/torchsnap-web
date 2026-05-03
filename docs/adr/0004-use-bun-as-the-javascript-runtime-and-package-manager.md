# 4. Use Bun as the JavaScript runtime and package manager

Date: 2026-05-03

## Status

Accepted

## Context

The website needs a JavaScript runtime and package manager for installs,
script execution, and local tooling. The companion project
`../torchsnap` already uses Bun.

## Decision

Use Bun as the JavaScript runtime and package manager for the website.

- `bun install` for dependencies; `bun.lock` is the committed lockfile.
- `bun run <script>` for `package.json` scripts.
- Local TypeScript helper scripts are executed directly with `bun`.

## Consequences

- Tooling matches `../torchsnap`.
- Contributors must have Bun installed.

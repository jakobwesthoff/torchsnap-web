// The latest Torchsnap release, read once per build.
//
// Every Torchsnap release carries a `release.json` (torchsnap ADR 0053):
// the update feed installed apps read, with the version at its top. The
// build downloads the one of the newest release that is not a
// prerelease (GitHub's `releases/latest` skips those), serves it as
// `/updates/latest.json` and shows its version next to the download
// button. The site is rebuilt after every release, so both stay current.
//
// A failed download fails the build: a deployed site without the feed
// would answer every installed app with a 404, while a failed build
// leaves the previous deployment, and its still valid feed, online.
//
// `TORCHSNAP_RELEASE_FEED` replaces the source for testing, as a URL or
// a path to a local file.

import { readFile } from "node:fs/promises";

const FEED_URL = "https://github.com/jakobwesthoff/torchsnap/releases/latest/download/release.json";

export interface LatestRelease {
  /** Version without a leading `v`, e.g. `0.12.0`. */
  version: string;
  /** The release page with its notes. */
  url: string;
  /** `release.json` exactly as published, for `/updates/latest.json`. */
  feed: string;
}

let latest: Promise<LatestRelease> | undefined;

export function latestRelease(): Promise<LatestRelease> {
  latest ??= load();
  return latest;
}

async function load(): Promise<LatestRelease> {
  const source = process.env.TORCHSNAP_RELEASE_FEED || FEED_URL;
  const feed = await download(source);

  let version: unknown;
  try {
    version = JSON.parse(feed).version;
  } catch (e) {
    throw new Error(`release.json from ${source} is not JSON: ${e}`, { cause: e });
  }
  if (typeof version !== "string" || !/^\d+\.\d+\.\d+$/.test(version)) {
    throw new Error(`release.json from ${source} has no stable version: ${String(version)}`);
  }

  return {
    version,
    url: `https://github.com/jakobwesthoff/torchsnap/releases/tag/v${version}`,
    feed,
  };
}

async function download(source: string): Promise<string> {
  if (!/^https?:\/\//.test(source)) {
    return readFile(source, "utf8");
  }
  const response = await fetch(source);
  if (!response.ok) {
    throw new Error(`downloading ${source} answered ${response.status}`);
  }
  return response.text();
}

import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const FEED_URL = "https://github.com/jakobwesthoff/torchsnap/releases/latest/download/release.json";

// `latestRelease()` caches its result for the whole build, so every test
// loads a fresh copy of the module.
async function loadLatestRelease() {
  vi.resetModules();
  return (await import("./latest")).latestRelease;
}

function stubFetch(response: { ok: boolean; status?: number; body?: string }) {
  const fetch = vi.fn(async () => ({
    ok: response.ok,
    status: response.status ?? 200,
    text: async () => response.body ?? "",
  }));
  vi.stubGlobal("fetch", fetch);
  return fetch;
}

let dir: string;

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), "latest-release-"));
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

async function feedFile(content: string) {
  const path = join(dir, "release.json");
  await writeFile(path, content);
  return path;
}

describe("latestRelease", () => {
  it("downloads the feed of the latest GitHub release by default", async () => {
    vi.stubEnv("TORCHSNAP_RELEASE_FEED", undefined);
    const fetch = stubFetch({ ok: true, body: '{"version":"0.12.0"}' });

    const release = await (await loadLatestRelease())();

    expect(fetch).toHaveBeenCalledWith(FEED_URL);
    expect(release.version).toBe("0.12.0");
  });

  it("treats an empty TORCHSNAP_RELEASE_FEED as unset", async () => {
    vi.stubEnv("TORCHSNAP_RELEASE_FEED", "");
    const fetch = stubFetch({ ok: true, body: '{"version":"0.12.0"}' });

    await (
      await loadLatestRelease()
    )();

    expect(fetch).toHaveBeenCalledWith(FEED_URL);
  });

  it("downloads from a URL given in TORCHSNAP_RELEASE_FEED", async () => {
    vi.stubEnv("TORCHSNAP_RELEASE_FEED", "http://localhost:8000/release.json");
    const fetch = stubFetch({ ok: true, body: '{"version":"1.0.0"}' });

    await (
      await loadLatestRelease()
    )();

    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/release.json");
  });

  it("reads a local file given in TORCHSNAP_RELEASE_FEED", async () => {
    const fetch = stubFetch({ ok: true });
    vi.stubEnv("TORCHSNAP_RELEASE_FEED", await feedFile('{"version":"0.12.3"}'));

    const release = await (await loadLatestRelease())();

    expect(fetch).not.toHaveBeenCalled();
    expect(release.version).toBe("0.12.3");
  });

  it("links the release page and keeps the feed byte for byte", async () => {
    const feed = '{\n  "version": "0.12.0",\n  "notes": "Grüße"\n}\n';
    vi.stubEnv("TORCHSNAP_RELEASE_FEED", await feedFile(feed));

    const release = await (await loadLatestRelease())();

    expect(release).toEqual({
      version: "0.12.0",
      url: "https://github.com/jakobwesthoff/torchsnap/releases/tag/v0.12.0",
      feed,
    });
  });

  it("loads the feed only once per build", async () => {
    vi.stubEnv("TORCHSNAP_RELEASE_FEED", undefined);
    const fetch = stubFetch({ ok: true, body: '{"version":"0.12.0"}' });
    const latestRelease = await loadLatestRelease();

    const first = latestRelease();
    const second = latestRelease();

    expect(second).toBe(first);
    await first;
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("fails when the download is not successful", async () => {
    vi.stubEnv("TORCHSNAP_RELEASE_FEED", undefined);
    stubFetch({ ok: false, status: 404 });

    await expect((await loadLatestRelease())()).rejects.toThrow(
      `downloading ${FEED_URL} answered 404`,
    );
  });

  it("fails when the local file does not exist", async () => {
    vi.stubEnv("TORCHSNAP_RELEASE_FEED", join(dir, "missing.json"));

    await expect((await loadLatestRelease())()).rejects.toThrow(/ENOENT/);
  });

  it("fails with the parse error as cause when the feed is not JSON", async () => {
    const path = await feedFile("<html>Not Found</html>");
    vi.stubEnv("TORCHSNAP_RELEASE_FEED", path);

    const error = await (await loadLatestRelease())().catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toMatch(`release.json from ${path} is not JSON`);
    expect((error as Error).cause).toBeInstanceOf(SyntaxError);
  });

  it.each([
    ["no version", "{}"],
    ["a numeric version", '{"version":12}'],
    ["a prerelease", '{"version":"0.13.0-beta.1"}'],
    ["a leading v", '{"version":"v0.12.0"}'],
    ["a two-part version", '{"version":"0.12"}'],
  ])("fails for a feed with %s", async (_case, feed) => {
    vi.stubEnv("TORCHSNAP_RELEASE_FEED", await feedFile(feed));

    await expect((await loadLatestRelease())()).rejects.toThrow(/has no stable version/);
  });
});

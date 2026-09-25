import { describe, expect, it, vi } from "vitest";

vi.mock("./latest", () => ({
  latestRelease: async () => ({
    version: "0.12.0",
    url: "https://github.com/jakobwesthoff/torchsnap/releases/tag/v0.12.0",
    feed: '{ "version": "0.12.0" }\n',
  }),
}));

const { GET } = await import("../pages/updates/latest.json");

describe("GET /updates/latest.json", () => {
  it("serves the release feed unchanged as JSON", async () => {
    const response = await GET({} as Parameters<typeof GET>[0]);

    expect(response.headers.get("Content-Type")).toBe("application/json");
    expect(await response.text()).toBe('{ "version": "0.12.0" }\n');
  });
});

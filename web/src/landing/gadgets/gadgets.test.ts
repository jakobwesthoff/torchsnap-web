import { describe, expect, it } from "vitest";
import { FEATURED, GADGET_DOCS } from "./gadgets";

const DOCS_BASE = "https://docs.torchsnap.app/start/gadgets/";

describe("GADGET_DOCS", () => {
  it("points every entry at a gadget page on docs.torchsnap.app", () => {
    for (const url of Object.values(GADGET_DOCS)) {
      expect(url.startsWith(DOCS_BASE)).toBe(true);
      // The docs build writes every page as `<slug>/index.html`, so page
      // URLs end in a slash.
      expect(url.endsWith("/")).toBe(true);
    }
  });

  it("has a distinct URL per gadget", () => {
    const urls = Object.values(GADGET_DOCS);
    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe("FEATURED", () => {
  it("shows emoji picker, calculator and bangs in that order", () => {
    expect(FEATURED.map((g) => g.name)).toEqual(["Emoji Picker", "Calculator", "Bangs"]);
  });

  it("alternates the screenshot tilt row by row", () => {
    FEATURED.forEach((gadget, index) => {
      expect(gadget.tilt).toBe(index % 2 === 0 ? "left" : "right");
    });
  });

  it("links each gadget to its own docs page", () => {
    const docsPages = new Set<string>(Object.values(GADGET_DOCS));
    for (const gadget of FEATURED) {
      expect(docsPages.has(gadget.docs)).toBe(true);
    }
    expect(new Set(FEATURED.map((g) => g.docs)).size).toBe(FEATURED.length);
  });

  it("gives every gadget copy, an icon and alt text", () => {
    for (const gadget of FEATURED) {
      expect(gadget.hook.trim()).not.toBe("");
      expect(gadget.body.trim()).not.toBe("");
      expect(gadget.alt.trim()).not.toBe("");
      expect(gadget.icon).toMatch(/^heroicons:[a-z-]+$/);
    }
  });

  it("has a light and a dark screenshot of the same size for every gadget", () => {
    for (const { screenshot } of FEATURED) {
      expect(screenshot.light.width).toBe(screenshot.dark.width);
      expect(screenshot.light.height).toBe(screenshot.dark.height);
    }
  });
});

import { describe, expect, it } from "vitest";
import { CAST, MASCOTS, TINTS } from "./cast";

describe("CAST", () => {
  it("fills the four-card top row and the three-card bottom row", () => {
    expect(CAST).toHaveLength(7);
  });

  it("uses each mascot at most once", () => {
    const ids = CAST.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("only uses mascots that have an image and a tint", () => {
    for (const { id } of CAST) {
      expect(MASCOTS[id]).toBeDefined();
      expect(TINTS[id]).toBeDefined();
    }
  });

  it("labels costumes as #NNN · Name and the silhouette as #???", () => {
    for (const entry of CAST) {
      if (entry.silhouette) {
        expect(entry.eyebrow).toBe("#???");
      } else {
        expect(entry.eyebrow).toMatch(/^#\d{3} · \S.*$/);
      }
    }
  });

  it("has exactly one mystery silhouette, as the last card", () => {
    expect(CAST.filter((entry) => entry.silhouette)).toHaveLength(1);
    expect(CAST.at(-1)?.silhouette).toBe(true);
  });

  it("gives every card a headline and a body", () => {
    for (const entry of CAST) {
      expect(entry.headline.trim()).not.toBe("");
      expect(entry.body.trim()).not.toBe("");
    }
  });
});

describe("TINTS", () => {
  it("has a valid hue for every mascot", () => {
    expect(Object.keys(TINTS).sort()).toEqual(Object.keys(MASCOTS).sort());
    for (const hue of Object.values(TINTS)) {
      expect(hue).toBeGreaterThanOrEqual(0);
      expect(hue).toBeLessThan(360);
    }
  });
});

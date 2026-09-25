import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("flex", "items-center")).toBe("flex items-center");
  });

  it("drops falsy values and honours conditional objects", () => {
    expect(cn("base", false, null, undefined, "", { active: true, hidden: false })).toBe(
      "base active",
    );
  });

  it("flattens arrays", () => {
    expect(cn(["px-2", ["py-1"]], "rounded")).toBe("px-2 py-1 rounded");
  });

  it("lets a later Tailwind utility override a conflicting earlier one", () => {
    expect(cn("px-2 text-sm", "px-4")).toBe("text-sm px-4");
    expect(cn("text-text-muted", { "text-accent": true })).toBe("text-accent");
  });

  it("keeps utilities for different variants", () => {
    expect(cn("text-sm", "md:text-lg")).toBe("text-sm md:text-lg");
  });
});

// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { installFakeMatchMedia } from "../test/fakeMatchMedia";
import {
  THEME_STORAGE_KEY,
  applyTheme,
  readPreference,
  resolvePreference,
  writePreference,
} from "./preference";

beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});

afterEach(() => {
  localStorage.clear();
});

describe("readPreference", () => {
  it("defaults to system when nothing is stored", () => {
    expect(readPreference()).toBe("system");
  });

  it.each(["light", "dark", "system"] as const)("returns a stored %s", (value) => {
    localStorage.setItem(THEME_STORAGE_KEY, value);
    expect(readPreference()).toBe(value);
  });

  it("falls back to system for an unknown stored value", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "sepia");
    expect(readPreference()).toBe("system");
  });
});

describe("writePreference", () => {
  it.each(["light", "dark"] as const)("stores %s", (value) => {
    writePreference(value);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(value);
  });

  it("removes the key for system, so a later read defaults to system", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    writePreference("system");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
    expect(readPreference()).toBe("system");
  });
});

describe("resolvePreference", () => {
  it.each(["light", "dark"] as const)("returns an explicit %s unchanged", (value) => {
    installFakeMatchMedia(value === "light" ? "dark" : "light");
    expect(resolvePreference(value)).toBe(value);
  });

  it.each(["light", "dark"] as const)("follows the OS for system when it is %s", (scheme) => {
    installFakeMatchMedia(scheme);
    expect(resolvePreference("system")).toBe(scheme);
  });
});

describe("applyTheme", () => {
  it("sets data-theme to dark", () => {
    applyTheme("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("removes data-theme for light, the stylesheet's default", () => {
    document.documentElement.dataset.theme = "dark";
    applyTheme("light");
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });
});

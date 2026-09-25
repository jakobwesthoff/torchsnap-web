// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from "vitest";
import { installFakeMatchMedia } from "../test/fakeMatchMedia";
import { THEME_STORAGE_KEY } from "./preference";
import { initThemeToggle } from "./toggle.client";

// The markup ThemeToggle.astro renders, reduced to what the handler reads.
function renderToggle() {
  document.body.innerHTML = `
    <div class="theme-toggle" role="radiogroup" aria-label="Theme">
      <button type="button" role="radio" data-value="system" aria-checked="false"></button>
      <button type="button" role="radio" data-value="light" aria-checked="false"></button>
      <button type="button" role="radio" data-value="dark" aria-checked="false"></button>
    </div>
  `;
  const [system, light, dark] = Array.from(document.querySelectorAll("button"));
  return { system, light, dark };
}

function checked() {
  return Array.from(document.querySelectorAll("button"))
    .filter((b) => b.getAttribute("aria-checked") === "true")
    .map((b) => b.dataset.value);
}

function press(button: HTMLElement, key: string) {
  const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });
  button.dispatchEvent(event);
  return event;
}

const html = document.documentElement;

beforeEach(() => {
  localStorage.clear();
  delete html.dataset.theme;
  delete html.dataset.themePreference;
  document.body.innerHTML = "";
});

describe("initThemeToggle", () => {
  it("does nothing without a toggle on the page", () => {
    installFakeMatchMedia("light");
    expect(() => initThemeToggle()).not.toThrow();
  });

  it("does nothing when the toggle has no options", () => {
    const media = installFakeMatchMedia("light");
    document.body.innerHTML = `<div class="theme-toggle"></div>`;
    initThemeToggle();
    expect(media.listenerCount()).toBe(0);
  });

  it("checks the stored preference on load", () => {
    installFakeMatchMedia("light");
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    renderToggle();
    initThemeToggle();
    expect(checked()).toEqual(["dark"]);
  });

  it("checks system on load when nothing is stored", () => {
    installFakeMatchMedia("light");
    renderToggle();
    initThemeToggle();
    expect(checked()).toEqual(["system"]);
  });
});

describe("selecting with the mouse", () => {
  it("stores, applies and marks the clicked option", () => {
    installFakeMatchMedia("light");
    const { dark } = renderToggle();
    initThemeToggle();

    dark.click();

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(html.dataset.theme).toBe("dark");
    expect(html.dataset.themePreference).toBe("dark");
    expect(checked()).toEqual(["dark"]);
  });

  it("resolves system through the OS setting", () => {
    installFakeMatchMedia("dark");
    localStorage.setItem(THEME_STORAGE_KEY, "light");
    const { system } = renderToggle();
    initThemeToggle();

    system.click();

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
    expect(html.dataset.theme).toBe("dark");
    expect(html.dataset.themePreference).toBe("system");
  });

  it("ignores an option with an unknown value", () => {
    installFakeMatchMedia("light");
    const { light } = renderToggle();
    light.dataset.value = "sepia";
    initThemeToggle();

    light.click();

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
    expect(html.dataset.themePreference).toBeUndefined();
  });
});

describe("selecting with the keyboard", () => {
  it.each([
    ["ArrowRight", "system", "light"],
    ["ArrowDown", "light", "dark"],
    ["ArrowRight", "dark", "system"],
    ["ArrowLeft", "light", "system"],
    ["ArrowUp", "system", "dark"],
    ["Home", "dark", "system"],
    ["End", "system", "dark"],
  ] as const)("%s from %s selects and focuses %s", (key, from, to) => {
    installFakeMatchMedia("light");
    const buttons = renderToggle();
    initThemeToggle();

    const event = press(buttons[from], key);

    expect(event.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(buttons[to]);
    expect(checked()).toEqual([to]);
    expect(html.dataset.themePreference).toBe(to);
  });

  it("moves focus but selects nothing when landing on an unknown value", () => {
    installFakeMatchMedia("light");
    const { system, light } = renderToggle();
    light.dataset.value = "sepia";
    initThemeToggle();

    press(system, "ArrowRight");

    expect(document.activeElement).toBe(light);
    expect(checked()).toEqual(["system"]);
    expect(html.dataset.themePreference).toBeUndefined();
  });

  it("leaves other keys to the browser", () => {
    installFakeMatchMedia("light");
    const { light } = renderToggle();
    initThemeToggle();

    const event = press(light, "Enter");

    expect(event.defaultPrevented).toBe(false);
    expect(checked()).toEqual(["system"]);
  });
});

describe("following the OS in system mode", () => {
  it("re-applies the theme when the OS scheme changes", () => {
    const media = installFakeMatchMedia("light");
    renderToggle();
    initThemeToggle();

    media.setScheme("dark");
    expect(html.dataset.theme).toBe("dark");

    media.setScheme("light");
    expect(html.dataset.theme).toBeUndefined();
  });

  it("stops following the OS once an explicit theme is picked", () => {
    const media = installFakeMatchMedia("light");
    const { light } = renderToggle();
    initThemeToggle();

    light.click();
    media.setScheme("dark");

    expect(media.listenerCount()).toBe(0);
    expect(html.dataset.theme).toBeUndefined();
  });

  it("does not listen when an explicit theme is stored", () => {
    const media = installFakeMatchMedia("light");
    localStorage.setItem(THEME_STORAGE_KEY, "light");
    renderToggle();
    initThemeToggle();
    expect(media.listenerCount()).toBe(0);
  });

  it("keeps a single listener when system is picked again", () => {
    const media = installFakeMatchMedia("light");
    const { system } = renderToggle();
    initThemeToggle();

    system.click();
    system.click();

    expect(media.listenerCount()).toBe(1);
  });
});

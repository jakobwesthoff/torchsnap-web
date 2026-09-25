// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";
import { initHeader } from "./header.client";

function render() {
  document.body.innerHTML = `
    <header data-site-header>
      <button type="button" aria-expanded="false" aria-controls="mobile-nav" data-mobile-nav-toggle>
        Menu
      </button>
    </header>
    <nav id="mobile-nav" class="hidden"></nav>
  `;
  return {
    header: document.querySelector<HTMLElement>("[data-site-header]")!,
    toggle: document.querySelector<HTMLButtonElement>("[data-mobile-nav-toggle]")!,
    panel: document.getElementById("mobile-nav")!,
  };
}

function scrollTo(y: number) {
  vi.stubGlobal("scrollY", y);
  window.dispatchEvent(new Event("scroll"));
}

beforeEach(() => {
  document.body.innerHTML = "";
  vi.stubGlobal("scrollY", 0);
});

describe("sticky header state", () => {
  it("is not marked scrolled at the top of the page", () => {
    const { header } = render();
    initHeader();
    expect(header.hasAttribute("data-scrolled")).toBe(false);
  });

  it("is marked scrolled when the page loads already scrolled", () => {
    vi.stubGlobal("scrollY", 300);
    const { header } = render();
    initHeader();
    expect(header.hasAttribute("data-scrolled")).toBe(true);
  });

  it("switches only once the scroll passes 8 px", () => {
    const { header } = render();
    initHeader();

    scrollTo(8);
    expect(header.hasAttribute("data-scrolled")).toBe(false);

    scrollTo(9);
    expect(header.hasAttribute("data-scrolled")).toBe(true);

    scrollTo(0);
    expect(header.hasAttribute("data-scrolled")).toBe(false);
  });
});

describe("mobile navigation toggle", () => {
  it("opens and closes the panel and reports it through aria-expanded", () => {
    const { toggle, panel } = render();
    initHeader();

    toggle.click();
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(panel.classList.contains("hidden")).toBe(false);

    toggle.click();
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(panel.classList.contains("hidden")).toBe(true);
  });
});

describe("pages without parts of the header", () => {
  it("still wires the mobile toggle without the sticky header", () => {
    const { header, toggle, panel } = render();
    header.removeAttribute("data-site-header");
    initHeader();

    toggle.click();

    expect(panel.classList.contains("hidden")).toBe(false);
  });

  it("still tracks scrolling without the mobile toggle", () => {
    const { header, panel } = render();
    panel.remove();
    initHeader();

    scrollTo(100);

    expect(header.hasAttribute("data-scrolled")).toBe(true);
  });

  it("does nothing on an empty page", () => {
    expect(() => initHeader()).not.toThrow();
  });
});

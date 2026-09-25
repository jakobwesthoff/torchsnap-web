// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";
import { initStarNudge } from "./starNudge.client";

// jsdom does no layout, so the anchor's box is whatever the test says.
function placeAnchor(anchor: HTMLElement, box: { left: number; width: number; bottom: number }) {
  const height = box.width === 0 ? 0 : 20;
  anchor.getBoundingClientRect = () =>
    ({
      left: box.left,
      width: box.width,
      height,
      bottom: box.bottom,
      top: box.bottom - height,
      right: box.left + box.width,
      x: box.left,
      y: box.bottom - height,
    }) as DOMRect;
}

// jsdom has no ResizeObserver. The fake keeps the callback so a test can
// fire it the way a real layout change would.
let resizeCallbacks: Array<() => void> = [];
class FakeResizeObserver {
  constructor(callback: () => void) {
    resizeCallbacks.push(callback);
  }
  observe() {}
}

function render() {
  document.body.innerHTML = `
    <div data-star-nudge-host>
      <svg class="hidden" data-star-nudge>
        <text data-star-nudge-text>Star it on GitHub!</text>
        <path data-star-nudge-shaft></path>
        <path data-star-nudge-head></path>
      </svg>
    </div>
    <a href="https://github.com/jakobwesthoff/torchsnap" data-star-nudge-anchor>GitHub</a>
  `;
  return {
    svg: document.querySelector<SVGSVGElement>("[data-star-nudge]")!,
    text: document.querySelector("[data-star-nudge-text]")!,
    shaft: document.querySelector("[data-star-nudge-shaft]")!,
    head: document.querySelector("[data-star-nudge-head]")!,
    anchor: document.querySelector<HTMLElement>("[data-star-nudge-anchor]")!,
  };
}

beforeEach(() => {
  document.body.innerHTML = "";
  resizeCallbacks = [];
  vi.stubGlobal("ResizeObserver", FakeResizeObserver);
  vi.stubGlobal("scrollY", 0);
});

describe("initStarNudge", () => {
  it("does nothing without the nudge or its anchor", () => {
    expect(() => initStarNudge()).not.toThrow();
    expect(resizeCallbacks).toHaveLength(0);
  });

  it("does nothing when the SVG lacks one of its parts", () => {
    const { head } = render();
    head.remove();
    initStarNudge();
    expect(resizeCallbacks).toHaveLength(0);
  });

  it("stays hidden while the anchor has no box", () => {
    const { svg, anchor, text } = render();
    placeAnchor(anchor, { left: 0, width: 0, bottom: 0 });

    initStarNudge();

    expect(svg.classList.contains("hidden")).toBe(true);
    expect(text.hasAttribute("x")).toBe(false);
  });

  it("draws the label and arrow from the anchor's bottom centre", () => {
    const { svg, anchor, text, shaft, head } = render();
    placeAnchor(anchor, { left: 100, width: 40, bottom: 50 });

    initStarNudge();

    // Tip: centre 120, 3 px below the anchor. Label end: 92 px left of
    // the tip and 60 px below it.
    expect(text.getAttribute("x")).toBe("28");
    expect(text.getAttribute("y")).toBe("113");
    expect(text.getAttribute("transform")).toBe("rotate(-4 28 113)");
    expect(shaft.getAttribute("d")).toBe("M 40 109 C 78 115, 114 87, 120 53");
    expect(head.getAttribute("d")).toBe("M 112 66 L 120 53 L 129 65");
    expect(svg.style.height).toBe("143px");
    expect(svg.classList.contains("hidden")).toBe(false);
  });

  it("hides again when the anchor collapses on resize", () => {
    const { svg, anchor } = render();
    placeAnchor(anchor, { left: 100, width: 40, bottom: 50 });
    initStarNudge();

    placeAnchor(anchor, { left: 0, width: 0, bottom: 0 });
    window.dispatchEvent(new Event("resize"));

    expect(svg.classList.contains("hidden")).toBe(true);
  });

  it("redraws when the document's layout changes", () => {
    const { anchor, text } = render();
    placeAnchor(anchor, { left: 100, width: 40, bottom: 50 });
    initStarNudge();

    placeAnchor(anchor, { left: 200, width: 40, bottom: 50 });
    for (const callback of resizeCallbacks) callback();

    expect(text.getAttribute("x")).toBe("128");
  });

  it("redraws once the web fonts have loaded", async () => {
    const { anchor, text } = render();
    placeAnchor(anchor, { left: 100, width: 40, bottom: 50 });
    let fontsLoaded!: () => void;
    Object.defineProperty(document, "fonts", {
      configurable: true,
      value: { ready: new Promise<void>((resolve) => (fontsLoaded = resolve)) },
    });

    initStarNudge();
    placeAnchor(anchor, { left: 300, width: 40, bottom: 50 });
    fontsLoaded();
    await Promise.resolve();
    await Promise.resolve();

    expect(text.getAttribute("x")).toBe("228");
    Reflect.deleteProperty(document, "fonts");
  });
});

describe("fonts that fail to load", () => {
  it("keeps the fallback-font measurement", async () => {
    const { anchor, text } = render();
    placeAnchor(anchor, { left: 100, width: 40, bottom: 50 });
    Object.defineProperty(document, "fonts", {
      configurable: true,
      value: { ready: Promise.reject(new Error("font blocked")) },
    });

    initStarNudge();
    await Promise.resolve();
    await Promise.resolve();

    expect(text.getAttribute("x")).toBe("28");
    Reflect.deleteProperty(document, "fonts");
  });
});

describe("fading on scroll", () => {
  it.each([
    [0, "1"],
    [45, "0.5"],
    [90, "0"],
    [400, "0"],
    [-20, "1"],
  ])("at scrollY %i the opacity is %s", (scrollY, opacity) => {
    const { svg, anchor } = render();
    placeAnchor(anchor, { left: 100, width: 40, bottom: 50 });
    initStarNudge();

    vi.stubGlobal("scrollY", scrollY);
    window.dispatchEvent(new Event("scroll"));

    expect(svg.style.opacity).toBe(opacity);
  });

  it("starts faded when the page loads already scrolled", () => {
    vi.stubGlobal("scrollY", 90);
    const { svg, anchor } = render();
    placeAnchor(anchor, { left: 100, width: 40, bottom: 50 });

    initStarNudge();

    expect(svg.style.opacity).toBe("0");
  });
});

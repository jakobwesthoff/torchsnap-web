// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { initAutoCarousels } from "./autoCarousel.client";

// =========================================================
// Browser stand-ins
// =========================================================
//
// jsdom does no layout and has neither IntersectionObserver nor
// `matchMedia`. The fakes below give each strip a fixed geometry, let a
// test move it in and out of view, and decide the motion preference.

const SLIDE_WIDTH = 300;
const GAP = 16;
const STEP = SLIDE_WIDTH + GAP;

let reduceMotion = false;
let observers: Array<{ callback: IntersectionObserverCallback; targets: Element[] }> = [];
let visibility: DocumentVisibilityState = "visible";

class FakeIntersectionObserver {
  private entry: { callback: IntersectionObserverCallback; targets: Element[] };
  constructor(callback: IntersectionObserverCallback) {
    this.entry = { callback, targets: [] };
    observers.push(this.entry);
  }
  observe(target: Element) {
    this.entry.targets.push(target);
  }
}

function setInView(strip: HTMLElement, isIntersecting: boolean) {
  for (const { callback, targets } of observers) {
    if (targets.includes(strip)) {
      callback(
        [{ isIntersecting, target: strip } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    }
  }
}

function setTabVisibility(state: DocumentVisibilityState) {
  visibility = state;
  document.dispatchEvent(new Event("visibilitychange"));
}

// A strip with `slides` slides, each SLIDE_WIDTH wide, showing one slide
// at a time.
function renderStrip(options: { slides?: number; interval?: string; pause?: string } = {}) {
  const { slides = 4, interval = "1000", pause = "5000" } = options;
  const strip = document.createElement("ol");
  strip.setAttribute("data-auto-carousel", "");
  if (interval !== "") strip.dataset.interval = interval;
  if (pause !== "") strip.dataset.pauseMs = pause;
  strip.style.columnGap = `${GAP}px`;
  for (let i = 0; i < slides; i++) {
    const slide = document.createElement("li");
    slide.getBoundingClientRect = () => ({ width: SLIDE_WIDTH }) as DOMRect;
    strip.append(slide);
  }
  document.body.append(strip);

  let scrollLeft = 0;
  Object.defineProperty(strip, "scrollLeft", {
    get: () => scrollLeft,
    set: (value: number) => (scrollLeft = value),
  });
  Object.defineProperty(strip, "clientWidth", { get: () => SLIDE_WIDTH });
  Object.defineProperty(strip, "scrollWidth", {
    get: () => slides * SLIDE_WIDTH + Math.max(0, slides - 1) * GAP,
  });
  const scrollTo = vi.fn(({ left }: ScrollToOptions) => {
    scrollLeft = left ?? scrollLeft;
  });
  strip.scrollTo = scrollTo as unknown as HTMLElement["scrollTo"];

  return { strip, scrollTo };
}

function maxScroll(slides: number) {
  return slides * SLIDE_WIDTH + (slides - 1) * GAP - SLIDE_WIDTH;
}

beforeEach(() => {
  vi.useFakeTimers();
  document.body.innerHTML = "";
  reduceMotion = false;
  observers = [];
  visibility = "visible";
  vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)" && reduceMotion,
    })),
  );
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    get: () => visibility,
  });
});

afterEach(() => {
  vi.useRealTimers();
  Reflect.deleteProperty(document, "visibilityState");
});

// =========================================================
// Setup
// =========================================================

describe("initAutoCarousels", () => {
  it("marks every strip so a second run skips it", () => {
    const first = renderStrip();
    const second = renderStrip();

    initAutoCarousels();
    initAutoCarousels();

    expect(first.strip.hasAttribute("data-auto-carousel-init")).toBe(true);
    expect(second.strip.hasAttribute("data-auto-carousel-init")).toBe(true);
    expect(observers).toHaveLength(2);
  });

  it("does not autoplay when the visitor prefers reduced motion", () => {
    reduceMotion = true;
    const { strip, scrollTo } = renderStrip();

    initAutoCarousels();
    vi.advanceTimersByTime(10_000);

    expect(strip.hasAttribute("data-auto-carousel-init")).toBe(true);
    expect(observers).toHaveLength(0);
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("does not autoplay with an interval of 0", () => {
    const { scrollTo } = renderStrip({ interval: "0" });

    initAutoCarousels();
    vi.advanceTimersByTime(10_000);

    expect(observers).toHaveLength(0);
    expect(scrollTo).not.toHaveBeenCalled();
  });
});

// =========================================================
// Auto-advance
// =========================================================

describe("auto-advance", () => {
  it("waits until the strip scrolls into view", () => {
    const { scrollTo } = renderStrip();
    initAutoCarousels();

    vi.advanceTimersByTime(5_000);

    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("moves one slide plus gap per interval while in view", () => {
    const { strip, scrollTo } = renderStrip();
    initAutoCarousels();
    setInView(strip, true);

    vi.advanceTimersByTime(1_000);
    expect(scrollTo).toHaveBeenLastCalledWith({ left: STEP, behavior: "smooth" });

    vi.advanceTimersByTime(1_000);
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 2 * STEP, behavior: "smooth" });
  });

  it("uses a 4 s interval when the strip names none", () => {
    const { strip, scrollTo } = renderStrip({ interval: "" });
    initAutoCarousels();
    setInView(strip, true);

    vi.advanceTimersByTime(3_999);
    expect(scrollTo).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(scrollTo).toHaveBeenCalledTimes(1);
  });

  it("stops at the last slide before wrapping back to the first", () => {
    const { strip, scrollTo } = renderStrip({ slides: 3 });
    initAutoCarousels();
    setInView(strip, true);
    strip.scrollLeft = maxScroll(3) - 100;

    vi.advanceTimersByTime(1_000);
    expect(scrollTo).toHaveBeenLastCalledWith({ left: maxScroll(3), behavior: "smooth" });

    vi.advanceTimersByTime(1_000);
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: "smooth" });
  });

  it("treats a position within 4 px of the end as the end", () => {
    const { strip, scrollTo } = renderStrip({ slides: 3 });
    initAutoCarousels();
    setInView(strip, true);
    strip.scrollLeft = maxScroll(3) - 4;

    vi.advanceTimersByTime(1_000);

    expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: "smooth" });
  });

  it("does nothing for an empty strip", () => {
    const { strip, scrollTo } = renderStrip({ slides: 0 });
    initAutoCarousels();
    setInView(strip, true);

    vi.advanceTimersByTime(5_000);

    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("runs a single timer when the strip is reported in view twice", () => {
    const { strip, scrollTo } = renderStrip();
    initAutoCarousels();
    setInView(strip, true);
    setInView(strip, true);

    vi.advanceTimersByTime(1_000);

    expect(scrollTo).toHaveBeenCalledTimes(1);
  });
});

// =========================================================
// Pausing
// =========================================================

describe("pausing", () => {
  it.each(["pointerdown", "touchstart", "wheel", "scroll"])(
    "holds still for the pause time after %s",
    (type) => {
      const { strip, scrollTo } = renderStrip({ interval: "1000", pause: "5000" });
      initAutoCarousels();
      setInView(strip, true);

      strip.dispatchEvent(new Event(type));
      vi.advanceTimersByTime(4_000);
      expect(scrollTo).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1_000);
      expect(scrollTo).toHaveBeenCalledTimes(1);
    },
  );

  it("uses a 6 s pause when the strip names none", () => {
    const { strip, scrollTo } = renderStrip({ interval: "1000", pause: "" });
    initAutoCarousels();
    setInView(strip, true);

    strip.dispatchEvent(new Event("pointerdown"));
    vi.advanceTimersByTime(5_000);
    expect(scrollTo).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1_000);
    expect(scrollTo).toHaveBeenCalledTimes(1);
  });

  it("stops while the strip is out of view", () => {
    const { strip, scrollTo } = renderStrip();
    initAutoCarousels();
    setInView(strip, true);
    setInView(strip, false);

    vi.advanceTimersByTime(5_000);

    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("stops while the tab is hidden and resumes when it returns", () => {
    const { strip, scrollTo } = renderStrip();
    initAutoCarousels();
    setInView(strip, true);

    setTabVisibility("hidden");
    vi.advanceTimersByTime(5_000);
    expect(scrollTo).not.toHaveBeenCalled();

    setTabVisibility("visible");
    vi.advanceTimersByTime(1_000);
    expect(scrollTo).toHaveBeenCalledTimes(1);
  });

  it("does not start when the tab returns while the strip is out of view", () => {
    const { scrollTo } = renderStrip();
    initAutoCarousels();

    setTabVisibility("hidden");
    setTabVisibility("visible");
    vi.advanceTimersByTime(5_000);

    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("does not start when the strip enters view in a hidden tab", () => {
    const { strip, scrollTo } = renderStrip();
    initAutoCarousels();

    setTabVisibility("hidden");
    setInView(strip, true);
    vi.advanceTimersByTime(5_000);

    expect(scrollTo).not.toHaveBeenCalled();
  });
});

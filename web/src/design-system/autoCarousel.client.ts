// Client wiring for AutoCarousel.astro: auto-advance for every
// `[data-auto-carousel]` strip, pausing on interaction, while offscreen
// and while the tab is hidden. Swiping and snapping are native CSS and
// need none of this.

const DEFAULT_INTERVAL_MS = 4000;
const DEFAULT_PAUSE_MS = 6000;

// Scroll positions this close to the end count as the end. Snapping
// and sub-pixel widths can leave the strip a few pixels short of it.
const END_TOLERANCE_PX = 4;

export function initAutoCarousels(): void {
  // Idempotent across HMR / multiple module evaluations: each strip
  // gets `data-auto-carousel-init` once it's wired, and we skip it on
  // re-runs.
  const strips = document.querySelectorAll<HTMLElement>(
    "[data-auto-carousel]:not([data-auto-carousel-init])",
  );

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  for (const strip of strips) {
    strip.dataset.autoCarouselInit = "";

    const intervalMs = Number(strip.dataset.interval ?? DEFAULT_INTERVAL_MS);
    const pauseMs = Number(strip.dataset.pauseMs ?? DEFAULT_PAUSE_MS);

    // No autoplay when the user has asked for reduced motion or the
    // caller explicitly set 0. The strip stays swipeable either way —
    // nothing else in this script is required for that.
    if (reduceMotion || intervalMs <= 0) continue;

    let visible = false;
    let pausedUntil = 0;
    let timer: ReturnType<typeof setInterval> | null = null;

    const slideStep = (): number => {
      const first = strip.firstElementChild as HTMLElement | null;
      if (!first) return 0;
      const gap = parseFloat(getComputedStyle(strip).columnGap || "0");
      return first.getBoundingClientRect().width + gap;
    };

    const advance = () => {
      if (Date.now() < pausedUntil) return;
      const step = slideStep();
      if (step <= 0) return;
      const max = strip.scrollWidth - strip.clientWidth;
      // Wrap only when we're *already* at the last slide. Advancing
      // from the second-to-last must land on the last (clamped to
      // max), not skip back to the start.
      const atEnd = strip.scrollLeft >= max - END_TOLERANCE_PX;
      const target = atEnd ? 0 : Math.min(strip.scrollLeft + step, max);
      strip.scrollTo({ left: target, behavior: "smooth" });
    };

    const start = () => {
      if (timer != null) return;
      timer = setInterval(advance, intervalMs);
    };

    const stop = () => {
      if (timer == null) return;
      clearInterval(timer);
      timer = null;
    };

    const pause = () => {
      pausedUntil = Date.now() + pauseMs;
    };

    // Any user interaction with the strip pushes the next auto-advance
    // out by `pauseMs`. Includes manual scroll (mouse-drag of the
    // scrollbar, trackpad swipe, pinch — all surface as `scroll`).
    strip.addEventListener("pointerdown", pause, { passive: true });
    strip.addEventListener("touchstart", pause, { passive: true });
    strip.addEventListener("wheel", pause, { passive: true });
    strip.addEventListener("scroll", pause, { passive: true });

    // Don't burn timers when the section is offscreen or the tab is
    // hidden.
    new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visible = e.isIntersecting;
          if (visible && document.visibilityState === "visible") start();
          else stop();
        }
      },
      { threshold: 0.3 },
    ).observe(strip);

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && visible) start();
      else stop();
    });
  }
}

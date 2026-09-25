// Client wiring for StarNudge.astro. The component renders an empty
// SVG skeleton; this module measures the header's GitHub link, writes
// the arrow geometry that connects the label to it, and fades the
// whole thing out as the visitor scrolls away from the top.

// Distance over which the nudge fades to nothing. It has done its job
// once the visitor starts reading, so it clears out well before the
// first section reaches the header.
const FADE_DISTANCE_PX = 90;

// Arrow shape, expressed as offsets from the anchor's bottom-centre.
// Kept as named constants because every path coordinate below is
// derived from them, and nudging the layout means editing these
// rather than hunting through the path strings.
const TIP_GAP_PX = 3; // clearance between anchor and arrowhead
const TEXT_DX_PX = -92; // label baseline end, relative to anchor centre
const TEXT_DY_PX = 60; // label baseline, below the arrow tip
const TEXT_ROTATION_DEG = -4;

export function initStarNudge(): void {
  const svg = document.querySelector<SVGSVGElement>("[data-star-nudge]");
  const anchor = document.querySelector<HTMLElement>("[data-star-nudge-anchor]");
  if (!svg || !anchor) return;

  const text = svg.querySelector<SVGTextElement>("[data-star-nudge-text]");
  const shaft = svg.querySelector<SVGPathElement>("[data-star-nudge-shaft]");
  const head = svg.querySelector<SVGPathElement>("[data-star-nudge-head]");
  if (!text || !shaft || !head) return;

  function measure() {
    const rect = anchor!.getBoundingClientRect();

    // A hidden anchor reports a zero-sized box. That is the case below
    // the `md` breakpoint, where the desktop nav collapses into the
    // mobile panel: there is nothing to point at, so draw nothing.
    if (rect.width === 0 || rect.height === 0) {
      svg!.classList.add("hidden");
      return;
    }

    const tipX = rect.left + rect.width / 2;
    const tipY = rect.bottom + TIP_GAP_PX;
    const textX = tipX + TEXT_DX_PX;
    const textY = tipY + TEXT_DY_PX;

    // The shaft leaves the label just past its start, bows outward to
    // the right, then comes back in to meet the tip from below. Both
    // control points are offset from the endpoints rather than being
    // absolute, so the curve keeps its shape wherever the anchor sits.
    const shaftX = textX + 12;
    const shaftY = textY - 4;

    text!.setAttribute("x", String(textX));
    text!.setAttribute("y", String(textY));
    text!.setAttribute("transform", `rotate(${TEXT_ROTATION_DEG} ${textX} ${textY})`);

    shaft!.setAttribute(
      "d",
      `M ${shaftX} ${shaftY} C ${shaftX + 38} ${shaftY + 6}, ${tipX - 6} ${tipY + 34}, ${tipX} ${tipY}`,
    );
    head!.setAttribute(
      "d",
      `M ${tipX - 8} ${tipY + 13} L ${tipX} ${tipY} L ${tipX + 9} ${tipY + 12}`,
    );

    // The host is zero-height, so the SVG needs an explicit height to
    // contain the label. Strokes and the rotated text still spill past
    // this box, which `overflow: visible` on the element permits.
    svg!.style.height = `${textY + 30}px`;
    svg!.classList.remove("hidden");
  }

  function fade() {
    const progress = 1 - window.scrollY / FADE_DISTANCE_PX;
    svg!.style.opacity = String(Math.max(0, Math.min(1, progress)));
  }

  measure();
  fade();

  window.addEventListener("resize", measure);
  window.addEventListener("scroll", fade, { passive: true });

  // The header is sticky, so the anchor holds its viewport position
  // while scrolling and only needs remeasuring when layout itself
  // changes: a resize, a reflow anywhere in the document, or the
  // webfonts landing (the anchor's box depends on Inter, the label's
  // on Caveat).
  new ResizeObserver(measure).observe(document.documentElement);
  document.fonts?.ready.then(measure).catch(() => {});
}

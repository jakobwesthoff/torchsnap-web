// Featured Gadget trio for the alternating-row showcase.
//
// The order is deliberate. The emoji picker leads because its
// custom React grid replaces the standard result list and is
// therefore the strongest visual proof that a Gadget can ship
// its own frontend. The calculator sits in the middle: its
// capture is the shortest of the three (no result list, just
// the inline-eval row), so flanking it with the two taller
// shots avoids a vertical-rhythm dip at either end of the
// section. Bangs anchors the close, with the most "list-like"
// chrome of the three.

import type { ImageMetadata } from "astro";
import emojiPickerScreenshotLight from "../../assets/gadgets/light/emoji-picker.png";
import emojiPickerScreenshotDark from "../../assets/gadgets/dark/emoji-picker.png";
import bangsScreenshotLight from "../../assets/gadgets/light/bangs.png";
import bangsScreenshotDark from "../../assets/gadgets/dark/bangs.png";
import calculatorScreenshotLight from "../../assets/gadgets/light/calculator.png";
import calculatorScreenshotDark from "../../assets/gadgets/dark/calculator.png";

export interface FeaturedGadget {
  /** Display name on the row, also used in the heading. */
  name: string;
  /** Category badge text. "Bundled" for now; future: "Community". */
  badge: string;
  /** Headline-ish hook that sits above the body copy. */
  hook: string;
  /** 2–4 sentence marketing body. */
  body: string;
  /** astro-icon name for the small leading glyph beside the badge. */
  icon: string;
  /** Tilt direction for the screenshot. Alternated row-by-row. */
  tilt: "left" | "right";
  /** Captured launcher screenshot for this Gadget, one variant per theme. */
  screenshot: { light: ImageMetadata; dark: ImageMetadata };
  /** Alt text describing what the screenshot actually shows. Each
   *  capture is different enough that a generic "launcher with X
   *  Gadget active" template would lose accessibility value. */
  alt: string;
}

export const FEATURED: FeaturedGadget[] = [
  {
    name: "Emoji Picker",
    badge: "Bundled",
    hook: "An emoji picker that keeps up with the keyboard.",
    body:
      "The emoji your sentence is missing, two letters away. No menu hunt. No app switch. No break in the writing.",
    icon: "heroicons:face-smile",
    tilt: "left",
    screenshot: { light: emojiPickerScreenshotLight, dark: emojiPickerScreenshotDark },
    alt: "Torchsnap launcher in emoji-picker mode: the search field reads ':part', a grid of emojis fills the body, and the footer labels the selected glyph as 'partying_face — partying face'.",
  },
  {
    name: "Calculator",
    badge: "Bundled",
    hook: "A calculator that doesn't need its own window.",
    body:
      "Mid-thought, you need a number. Type the expression, the answer's already underneath it. The same expression, tomorrow morning, still one keystroke away.",
    icon: "heroicons:calculator",
    tilt: "right",
    screenshot: { light: calculatorScreenshotLight, dark: calculatorScreenshotDark },
    alt: "Torchsnap launcher with the expression '2^32 - 1' typed; the calculator's inline row shows the result 4294967295 above the standard footer.",
  },
  {
    name: "Bangs",
    badge: "Bundled",
    hook: "Search the web without first opening the web.",
    body:
      "`!gh torchsnap`. `keyboard !wiki`. `!yt synth wave`. Every DuckDuckGo bang, recognized at the start, the end, wherever it falls out of your fingers. The browser skips the search engine entirely and opens on the answer page.",
    icon: "heroicons:arrow-top-right-on-square",
    tilt: "left",
    screenshot: { light: bangsScreenshotLight, dark: bangsScreenshotDark },
    alt: "Torchsnap launcher with 'pantine !crates' typed; the top result opens 'pantine' in the Rust community's crate host, with several System Settings results listed below.",
  },
];

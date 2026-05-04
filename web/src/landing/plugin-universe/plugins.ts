// Featured plugin trio for the alternating-row showcase.
//
// The order is deliberate. The emoji picker leads because its
// custom React grid replaces the standard result list and is
// therefore the strongest visual proof that plugins can ship
// their own frontend. The calculator sits in the middle: its
// capture is the shortest of the three (no result list, just
// the inline-eval row), so flanking it with the two taller
// shots avoids a vertical-rhythm dip at either end of the
// section. Bangs anchors the close, with the most "list-like"
// chrome of the three.

import type { ImageMetadata } from "astro";
import emojiPickerScreenshot from "../../assets/plugins/emoji-picker.png";
import bangsScreenshot from "../../assets/plugins/bangs.png";
import calculatorScreenshot from "../../assets/plugins/calculator.png";

export interface FeaturedPlugin {
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
  /** Captured launcher screenshot for this plugin. */
  screenshot: ImageMetadata;
  /** Alt text describing what the screenshot actually shows. Each
   *  capture is different enough that a generic "launcher with X
   *  plugin active" template would lose accessibility value. */
  alt: string;
}

export const FEATURED: FeaturedPlugin[] = [
  {
    name: "Emoji Picker",
    badge: "Bundled",
    hook: "An emoji picker that keeps up with the keyboard.",
    body:
      "Two letters of what you meant, copy, back to typing. No hunt. No menu. No break in the sentence you were already writing.",
    icon: "heroicons:face-smile",
    tilt: "left",
    screenshot: emojiPickerScreenshot,
    alt: "Torchsnap launcher in emoji-picker mode: the search field reads ':part', a grid of emojis fills the body, and the footer labels the selected glyph as 'partying_face — partying face'.",
  },
  {
    name: "Calculator",
    badge: "Bundled",
    hook: "A calculator that doesn't need its own window.",
    body:
      "Type the math, the answer's already there. Trig, exponents, parentheses, whatever the moment asks for. The numbers you crunched yesterday are still one keystroke away today.",
    icon: "heroicons:calculator",
    tilt: "right",
    screenshot: calculatorScreenshot,
    alt: "Torchsnap launcher with the expression '2^32 - 1' typed; the calculator's inline row shows the result 4294967295 above the standard footer.",
  },
  {
    name: "Bangs",
    badge: "Bundled",
    hook: "Search the web without first opening the web.",
    body:
      "`!gh torchsnap`. `keyboard !wiki`. `!yt synth wave`. Every DuckDuckGo bang you know, three keystrokes away from a real search. At the start, the end, wherever it falls out of your fingers. The browser opens already on the answer page.",
    icon: "heroicons:arrow-top-right-on-square",
    tilt: "left",
    screenshot: bangsScreenshot,
    alt: "Torchsnap launcher with 'pantine !crates' typed; the top result opens 'pantine' in the Rust community's crate host, with several System Settings results listed below.",
  },
];

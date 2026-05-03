// Single source of truth for the mascot cast: image bindings, per-mascot
// tint hue, the entry type, and the seven hand-pinned cards rendered by
// `MascotTheater.astro`. Imported by both `CastCard.astro` (single
// polaroid) and `CastCarousel.astro` (mobile swipeable strip).

import original from "../../assets/mascots/snappy-original-1024.png";
import dino from "../../assets/mascots/snappy-dino-kigurumi-1024.png";
import vampire from "../../assets/mascots/snappy-cape-and-fangs-1024.png";
import wanderer from "../../assets/mascots/snappy-time-wanderer-striped-scarf-2-1024.png";
import adventurer from "../../assets/mascots/snappy-relic-hunter-idol-1024.png";
import minion from "../../assets/mascots/snappy-banana-goggle-minion-1024.png";
import slasher from "../../assets/mascots/snappy-striped-sweater-fedora-1024.png";
import werewolf from "../../assets/mascots/snappy-werewolf-1024.png";

export const MASCOTS = {
  original,
  "dino-kigurumi": dino,
  "cape-and-fangs": vampire,
  "time-wanderer-striped-scarf-2": wanderer,
  "relic-hunter-idol": adventurer,
  "banana-goggle-minion": minion,
  "striped-sweater-fedora": slasher,
  werewolf,
} as const;

export type MascotId = keyof typeof MASCOTS;

// HSL hue per mascot. Drives the radial glow inside each polaroid frame
// so the color reads as belonging to that costume rather than being a
// generic accent. Hand-picked; if/when we scale to all 150+ mascots we
// can swap to a build-time sharp.stats() extraction.
export const TINTS: Record<MascotId, number> = {
  original: 30, // orange — Snappy's natural color
  "dino-kigurumi": 140, // leaf green
  "cape-and-fangs": 350, // deep blood red
  "time-wanderer-striped-scarf-2": 220, // cosmic blue (long stripey scarf is rainbow; tint stays neutral)
  "relic-hunter-idol": 35, // warm tan / leather
  "banana-goggle-minion": 50, // banana yellow
  "striped-sweater-fedora": 15, // rusty red (sweater)
  werewolf: 270, // unused: silhouette card uses its own night gradient
};

export interface CastEntry {
  id: MascotId;
  // Small uppercase tag at the top of the card. Catalog-style:
  // `#NNN · Costume` (or `#???` for the mystery silhouette).
  eyebrow: string;
  // Card headline — the playful label (e.g. "Night shift").
  headline: string;
  // One short sentence under the headline.
  body: string;
  rot: number;
  silhouette?: boolean;
}

export const CAST: CastEntry[] = [
  // Top row (4)
  { id: "dino-kigurumi",         eyebrow: "#042 · Dino",       headline: "Prehistoric run", body: "Snappy gone prehistoric. Life, uh, finds a way to launch.",        rot: -3 },
  { id: "cape-and-fangs",        eyebrow: "#013 · Vampire",    headline: "Night shift",     body: "Centuries of thirst. I vant to launch your applications.",         rot: -2 },
  { id: "time-wanderer-striped-scarf-2", eyebrow: "#091 · Wanderer", headline: "Loop edition", body: "Snappy as an ever-changing time traveller. Four pockets, all full of jelly babies and launch configs.", rot: 4 },
  { id: "relic-hunter-idol",     eyebrow: "#077 · Adventurer", headline: "Field expedition",body: "Swapping the idol for a sandbag. It belongs in the app catalogue.", rot: -5 },
  // Bottom row (3)
  { id: "banana-goggle-minion",  eyebrow: "#055 · Banana",     headline: "Peel & launch",   body: "Snappy armed with a banana. LAUNCH! BA-NA-NA!",                     rot: -4 },
  { id: "striped-sweater-fedora",eyebrow: "#031 · Slasher",    headline: "Dream layer",     body: "Haunting your dreams. It knows what apps you want to launch next.", rot: 2 },
  { id: "werewolf",              eyebrow: "#???",              headline: "Lunar edition",   body: "Hear that howl? Something hairy this way comes.",                   rot: 5,  silhouette: true },
];

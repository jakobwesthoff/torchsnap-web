// Single source of truth for the mascot cast: image bindings, per-mascot
// tint hue, the entry type, and the seven hand-pinned cards rendered by
// `MascotTheater.astro`. Imported by both `CastCard.astro` (single
// polaroid) and `CastCarousel.astro` (mobile swipeable strip).

import original from "../../assets/mascots/snappy-original-1024.png";
import dino from "../../assets/mascots/snappy-dino-kigurumi-1024.png";
import minion from "../../assets/mascots/snappy-banana-goggle-minion-1024.png";
import werewolf from "../../assets/mascots/snappy-werewolf-1024.png";

export const MASCOTS = {
  original,
  "dino-kigurumi": dino,
  "banana-goggle-minion": minion,
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
  "banana-goggle-minion": 50, // banana yellow
  werewolf: 270, // unused: silhouette card uses its own night gradient
};

export interface CastEntry {
  id: MascotId;
  name: string;
  role: string;
  body: string;
  rot: number;
  silhouette?: boolean;
}

export const CAST: CastEntry[] = [
  // Top row (4)
  { id: "original",             name: "Snappy",       role: "Origin story",   body: "Snappy. Just Snappy.",                                          rot: -3 },
  { id: "dino-kigurumi",        name: "Dino Snap",    role: "Jurassic issue", body: "Snappy gone prehistoric. Life, uh, finds a way to launch.",   rot: -2 },
  { id: "original",             name: "Snappy",       role: "Origin story",   body: "Snappy. Just Snappy.",                                          rot: 4 },
  { id: "original",             name: "Snappy",       role: "Origin story",   body: "Snappy. Just Snappy.",                                          rot: -5 },
  // Bottom row (3)
  { id: "banana-goggle-minion", name: "Bananappy",    role: "Peel & launch",  body: "Snappy armed with a banana. LAUNCH! BA-NA-NA!",                rot: -4 },
  { id: "original",             name: "Snappy",       role: "Origin story",   body: "Snappy. Just Snappy.",                                          rot: 2 },
  { id: "werewolf",             name: "Snappy the …?", role: "Lunar edition", body: "Something hairy this way comes.",                              rot: 5,  silhouette: true },
];

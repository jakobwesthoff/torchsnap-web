import type { Scenario } from "./types";

export const SCENARIOS: Scenario[] = [
  { id: "gho", query: "gho", recognizer: "fuzzy" },
  { id: "zen", query: "zen", recognizer: "fuzzy" },
  { id: "url", query: "westhoffswelt.de", recognizer: "url" },
  { id: "bang", query: "pulp fiction !g", recognizer: "bang" },
];

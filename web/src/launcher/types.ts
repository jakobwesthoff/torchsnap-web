import type { ComponentType, SVGProps } from "react";

// Pre-segmented title with match runs marked. The `m: true` segments
// render in the accent color; everything else is plain.
export type Segment = { t: string; m?: boolean };

export interface DemoResult {
  title: Segment[];
  subtitle: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface Candidate {
  title: string;
  subtitle: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  // Per-candidate baseline added to the matcher's structural score.
  // Higher values let frequently-used entries outrank less-relevant
  // matches that would otherwise win on word-boundary position alone.
  score: number;
}

export type Recognizer = "fuzzy" | "url" | "bang";

export interface Scenario {
  id: string;
  query: string;
  recognizer: Recognizer;
}

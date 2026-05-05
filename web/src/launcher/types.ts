import type { ComponentType, SVGProps } from "react";

// Pre-segmented title with match runs marked. The `m: true` segments
// render in the accent color; everything else is plain. Authoring
// snapshots by hand is easier with pre-segmented runs than with the
// real launcher's (text, positions[]) pair.
export type Segment = { t: string; m?: boolean };

export interface DemoResult {
  title: Segment[];
  subtitle: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface DemoSnapshot {
  query: string;
  results: DemoResult[];
  selectedIndex: number;
}

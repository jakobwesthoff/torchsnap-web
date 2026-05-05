import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { cn } from "../design-system/cn";
import { SNAPSHOT_GHO } from "./snapshots";
import type { DemoResult, DemoSnapshot, Segment } from "./types";

interface DemoLauncherProps {
  snapshot?: DemoSnapshot;
}

export function DemoLauncher({ snapshot = SNAPSHOT_GHO }: DemoLauncherProps) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-surface shadow-[0_0_0_1px_var(--color-border),inset_0_1px_0_0_rgb(255_255_255/0.06),0_4px_16px_rgb(0_0_0/0.12),0_16px_48px_rgb(0_0_0/0.16)]"
      style={{ fontFeatureSettings: "normal" }}
    >
      <SearchRow query={snapshot.query} />

      <div className="border-t border-border" />

      <div>
        {snapshot.results.map((result, i) => (
          <ResultRow
            key={i}
            result={result}
            selected={i === snapshot.selectedIndex}
          />
        ))}
      </div>

      <FooterHint />
    </div>
  );
}

function SearchRow({ query }: { query: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-accent" />
      <input
        type="text"
        value={query}
        readOnly
        tabIndex={-1}
        aria-label="Demo search"
        // Controlled input requires `onChange`; the demo never accepts
        // typed input from the user (the value is driven by the
        // snapshot prop), so the handler is a no-op.
        onChange={() => {}}
        className="flex-1 bg-transparent text-lg text-text-primary outline-none placeholder:text-text-muted"
      />
      <span className="keycap rounded px-2 py-0.5 text-[11px] text-text-secondary">
        Esc
      </span>
    </div>
  );
}

function ResultRow({
  result,
  selected,
}: {
  result: DemoResult;
  selected: boolean;
}) {
  const Icon = result.icon;
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-l-2 py-2.5 pl-3 pr-5",
        selected ? "border-accent bg-selection" : "border-transparent",
      )}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center">
        <Icon className="h-7 w-7 text-text-secondary" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm text-text-primary">
          {result.title.map((seg, i) => renderSegment(seg, i))}
        </div>
        <div className="truncate text-xs text-text-muted">{result.subtitle}</div>
      </div>
    </div>
  );
}

function renderSegment(seg: Segment, key: number) {
  if (seg.m) {
    return (
      <span key={key} className="text-accent">
        {seg.t}
      </span>
    );
  }
  return <span key={key}>{seg.t}</span>;
}

function FooterHint() {
  return (
    <div className="flex items-center gap-2 border-t border-border px-5 py-2.5 text-xs text-text-secondary">
      <span className="keycap h-5 min-w-[20px] rounded px-1 text-[11px] font-normal text-text-secondary">
        ↵
      </span>
      <span>Open</span>
    </div>
  );
}

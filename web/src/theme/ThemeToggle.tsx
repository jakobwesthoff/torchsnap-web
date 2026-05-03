// Adapted from ../torchsnap/src/components/ThemeToggle.tsx per
// ADR-0005. Backed by a localStorage-persisted preference instead of
// the app's settings store.

import { SunIcon, MoonIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { useTheme } from "./useTheme";
import { cn } from "../design-system/cn";
import type { ThemePreference } from "./preference";

const THEME_OPTIONS: {
  value: ThemePreference;
  icon: typeof SunIcon;
  label: string;
}[] = [
  { value: "system", icon: ComputerDesktopIcon, label: "System" },
  { value: "light", icon: SunIcon, label: "Light" },
  { value: "dark", icon: MoonIcon, label: "Dark" },
];

export function ThemeToggle() {
  const { preference, setPreference } = useTheme();

  const activeIndex = THEME_OPTIONS.findIndex((o) => o.value === preference);

  return (
    <div
      className="relative flex items-center rounded-full bg-surface-inset p-1"
      role="radiogroup"
      aria-label="Theme"
    >
      <div
        className="absolute rounded-full bg-surface transition-transform duration-200 ease-out shadow-sm"
        style={{
          width: 28,
          height: 28,
          transform: `translateX(${activeIndex * 28}px)`,
        }}
      />

      {THEME_OPTIONS.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          role="radio"
          aria-checked={preference === value}
          aria-label={label}
          onClick={() => setPreference(value)}
          className={cn(
            "relative z-10 cursor-pointer rounded-full p-1.5 transition-colors",
            preference === value
              ? "text-text-primary"
              : "text-text-muted hover:text-text-secondary",
          )}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}

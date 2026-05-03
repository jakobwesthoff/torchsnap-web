// Theme persistence shared by the pre-paint inline init and the
// React ThemeToggle island.
//
// The user picks one of three preferences (System / Light / Dark).
// "system" follows `prefers-color-scheme`; "light" / "dark" force
// the corresponding mode regardless of the OS setting.

export type ThemePreference = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

export function readPreference(): ThemePreference {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
}

export function writePreference(value: ThemePreference): void {
  if (value === "system") {
    localStorage.removeItem(THEME_STORAGE_KEY);
  } else {
    localStorage.setItem(THEME_STORAGE_KEY, value);
  }
}

export function resolvePreference(preference: ThemePreference): ResolvedTheme {
  if (preference === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return preference;
}

export function applyTheme(resolved: ResolvedTheme): void {
  if (resolved === "dark") {
    document.documentElement.dataset.theme = "dark";
  } else {
    delete document.documentElement.dataset.theme;
  }
}

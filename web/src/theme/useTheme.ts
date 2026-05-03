import { useCallback, useEffect, useState } from "react";
import {
  applyTheme,
  readPreference,
  resolvePreference,
  writePreference,
  type ThemePreference,
} from "./preference";

export function useTheme() {
  // The pre-paint inline script in the layout has already applied the
  // correct theme; mirror that state into React without a re-apply on
  // mount to avoid a redundant DOM write.
  const [preference, setPreferenceState] = useState<ThemePreference>(() =>
    typeof window === "undefined" ? "system" : readPreference(),
  );

  // When the preference is "system", react to OS-level changes live.
  useEffect(() => {
    if (preference !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme(resolvePreference("system"));
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [preference]);

  const setPreference = useCallback((next: ThemePreference) => {
    writePreference(next);
    applyTheme(resolvePreference(next));
    setPreferenceState(next);
  }, []);

  return { preference, setPreference };
}

import { useCallback, useEffect, useState } from "react";
import {
  applyTheme,
  readPreference,
  resolvePreference,
  writePreference,
  type ThemePreference,
} from "./preference";

export function useTheme() {
  // SSR has no access to localStorage, so the server always renders the
  // "system" default. To avoid a hydration mismatch (and the resulting
  // "this won't be patched up" event handler loss that breaks the
  // toggle on mobile) we mirror that on the client's first render and
  // sync the real preference in a mount effect. The pre-paint inline
  // script in the layout has already applied the correct *visual*
  // theme, so the only flash is the active-pill position inside the
  // toggle itself.
  const [preference, setPreferenceState] = useState<ThemePreference>("system");

  useEffect(() => {
    setPreferenceState(readPreference());
  }, []);

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

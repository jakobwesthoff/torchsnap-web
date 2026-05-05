// Client wiring for ThemeToggle.astro. The component renders static
// markup; this module attaches the click + keyboard handlers,
// keeps `data-theme-preference` on <html> in sync (which the CSS
// rules in ThemeToggle.astro use to position the active pill), and
// listens for OS-level color-scheme changes when in "system" mode.

import {
  applyTheme,
  readPreference,
  resolvePreference,
  writePreference,
  type ThemePreference,
} from "./preference";

const ORDER: ThemePreference[] = ["system", "light", "dark"];

export function initThemeToggle(): void {
  const root = document.querySelector<HTMLElement>(".theme-toggle");
  if (!root) return;

  const buttons = Array.from(
    root.querySelectorAll<HTMLButtonElement>("button[role='radio'][data-value]"),
  );
  if (buttons.length === 0) return;

  // The system-mode listener is only attached while the active
  // preference is "system" — track its disposer so we can detach
  // when the user picks an explicit Light/Dark.
  let detachSystemListener: (() => void) | null = null;

  function attachSystemListener() {
    detachSystemListener?.();
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme(resolvePreference("system"));
    mql.addEventListener("change", handler);
    detachSystemListener = () => mql.removeEventListener("change", handler);
  }

  function setPreference(next: ThemePreference) {
    writePreference(next);
    applyTheme(resolvePreference(next));
    document.documentElement.dataset.themePreference = next;
    for (const btn of buttons) {
      btn.setAttribute("aria-checked", String(btn.dataset.value === next));
    }
    if (next === "system") {
      attachSystemListener();
    } else {
      detachSystemListener?.();
      detachSystemListener = null;
    }
  }

  // Initial sync: the pre-paint script in Layout.astro already wrote
  // dataset.themePreference, but we still need to mirror it onto the
  // buttons' aria-checked attributes (which start at "false") and
  // attach the system-mode listener if appropriate.
  const initial = readPreference();
  for (const btn of buttons) {
    btn.setAttribute("aria-checked", String(btn.dataset.value === initial));
  }
  if (initial === "system") attachSystemListener();

  // Click selects the option. Arrow Left/Right move focus and
  // selection between options, matching the WAI-ARIA radiogroup
  // pattern. Home/End jump to the first/last option.
  for (const btn of buttons) {
    btn.addEventListener("click", () => {
      const value = btn.dataset.value as ThemePreference | undefined;
      if (value && ORDER.includes(value)) setPreference(value);
    });

    btn.addEventListener("keydown", (event) => {
      const idx = buttons.indexOf(btn);
      let target: number | null = null;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          target = (idx + 1) % buttons.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          target = (idx - 1 + buttons.length) % buttons.length;
          break;
        case "Home":
          target = 0;
          break;
        case "End":
          target = buttons.length - 1;
          break;
      }
      if (target === null) return;
      event.preventDefault();
      const next = buttons[target];
      next.focus();
      const value = next.dataset.value as ThemePreference | undefined;
      if (value && ORDER.includes(value)) setPreference(value);
    });
  }
}

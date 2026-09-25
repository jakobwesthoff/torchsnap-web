// Client wiring for Header.astro: the sticky header's scrolled state and
// the mobile navigation toggle.

// Scroll distance after which the header counts as scrolled.
const SCROLL_THRESHOLD_PX = 8;

export function initHeader(): void {
  // Sticky header state: add `data-scrolled` once the user has
  // scrolled past a small threshold; CSS handles the rest.
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  if (header) {
    const update = () => {
      if (window.scrollY > SCROLL_THRESHOLD_PX) {
        header.dataset.scrolled = "";
      } else {
        delete header.dataset.scrolled;
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  // Mobile nav toggle: only flips aria-expanded and panel visibility.
  // Icon swap is pure CSS (group-aria-expanded:* on the button).
  const toggle = document.querySelector<HTMLButtonElement>("[data-mobile-nav-toggle]");
  const panel = document.getElementById("mobile-nav");
  if (toggle && panel) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      panel.classList.toggle("hidden", !open);
    });
  }
}

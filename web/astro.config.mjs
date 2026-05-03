// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  // Canonical site origin — used by Astro to build absolute URLs for
  // social-share meta tags (og:url, og:image) and, eventually, the
  // sitemap. Update if/when the production domain changes.
  site: "https://torchsnap.app",

  integrations: [react(), icon()],

  vite: {
    plugins: [tailwindcss()],
  },
});

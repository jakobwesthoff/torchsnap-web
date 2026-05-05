// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  // Canonical site origin — used by Astro to build absolute URLs for
  // social-share meta tags (og:url, og:image) and the sitemap.
  // Update if/when the production domain changes.
  site: "https://torchsnap.app",

  integrations: [
    icon(),
    // Generates sitemap-index.xml + sitemap-0.xml at build time from
    // the routes under src/pages/. The /impressum page is excluded
    // because Layout.astro emits `<meta name="robots" content="noindex">`
    // for it — it shouldn't appear in the public sitemap.
    sitemap({
      filter: (page) => !page.endsWith("/impressum/"),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    // Vite blocks dev requests with unfamiliar Host headers as a
    // CSRF / DNS-rebinding precaution. Each new tunnel session
    // (`cloudflared tunnel --url http://localhost:4321`) hands out
    // a random subdomain, so we whitelist the providers we use to
    // smoke-test OG cards / share previews against the dev server.
    // Production builds are unaffected.
    server: {
      allowedHosts: [".trycloudflare.com"],
    },
  },
});

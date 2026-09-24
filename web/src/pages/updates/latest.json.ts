// The update feed installed Torchsnap apps read
// (`https://torchsnap.app/updates/latest.json`): the latest release's
// `release.json`, byte for byte. See `src/release/latest.ts`.

import type { APIRoute } from "astro";
import { latestRelease } from "../../release/latest";

export const GET: APIRoute = async () => {
  const { feed } = await latestRelease();
  return new Response(feed, {
    headers: { "Content-Type": "application/json" },
  });
};

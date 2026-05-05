import {
  CommandLineIcon,
  GlobeAltIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

import type { DemoSnapshot } from "./types";

export const SNAPSHOT_GHO: DemoSnapshot = {
  query: "gho",
  selectedIndex: 0,
  results: [
    {
      title: [{ t: "Gho", m: true }, { t: "stty" }],
      subtitle: "/Applications/Ghostty.app",
      icon: CommandLineIcon,
    },
    {
      title: [
        { t: "Tog" },
        { t: "g", m: true },
        { t: "le Dark / Li" },
        { t: "gh", m: true },
        { t: "t M" },
        { t: "o", m: true },
        { t: "de" },
      ],
      subtitle: "Switch system appearance between dark and light",
      icon: MoonIcon,
    },
    {
      title: [
        { t: "G", m: true },
        { t: "oogle C" },
        { t: "h", m: true },
        { t: "r" },
        { t: "o", m: true },
        { t: "me" },
      ],
      subtitle: "/Applications/Google Chrome.app",
      icon: GlobeAltIcon,
    },
  ],
};

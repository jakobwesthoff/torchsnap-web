import {
  CloudIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  GlobeAltIcon,
  LinkIcon,
  LockClosedIcon,
  MoonIcon,
  PrinterIcon,
  SpeakerWaveIcon,
  Squares2X2Icon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

import type { Candidate } from "./types";

export const CANDIDATES: Candidate[] = [
  // Apps
  {
    title: "Ghostty",
    subtitle: "/Applications/Ghostty.app",
    icon: CommandLineIcon,
    score: 50,
  },
  {
    title: "Google Chrome",
    subtitle: "/Applications/Google Chrome.app",
    icon: GlobeAltIcon,
    score: 45,
  },
  {
    title: "ZeroTier",
    subtitle: "/Applications/ZeroTier.app",
    icon: LinkIcon,
    score: 30,
  },
  {
    title: "Zen",
    subtitle: "/Applications/Zen.app",
    icon: GlobeAltIcon,
    score: 35,
  },
  {
    title: "zoom.us",
    subtitle: "/Applications/zoom.us.app",
    icon: VideoCameraIcon,
    score: 35,
  },
  {
    title: "WezTerm",
    subtitle: "/Applications/WezTerm.app",
    icon: CommandLineIcon,
    score: 30,
  },
  {
    title: "1Password",
    subtitle: "/Applications/1Password.app",
    icon: LockClosedIcon,
    score: 70,
  },
  {
    title: "Windows App",
    subtitle: "/Applications/Windows App.app",
    icon: Squares2X2Icon,
    score: 25,
  },
  {
    title: "Weather",
    subtitle: "/System/Applications/Weather.app",
    icon: CloudIcon,
    score: 30,
  },
  // Torchsnap built-in commands
  {
    title: "Toggle Dark / Light Mode",
    subtitle: "Switch system appearance between dark and light",
    icon: MoonIcon,
    score: 60,
  },
  {
    title: "Settings",
    subtitle: "Open Torchsnap preferences",
    icon: Cog6ToothIcon,
    score: 50,
  },
  // System Settings panes
  {
    title: "Sound",
    subtitle: "System Settings",
    icon: SpeakerWaveIcon,
    score: 35,
  },
  {
    title: "Printers & Scanners",
    subtitle: "System Settings",
    icon: PrinterIcon,
    score: 30,
  },
];

/* Shared bits used across all 6 landing page variations:
 * - Heroicons (inline outline)
 * - KeyCap, KeyBindingPill
 * - Launcher subcomponents (SearchInput, ResultRow, mini Launcher)
 * - Logo wordmark (torch glyph + Torchsnap)
 * - Platform pills (macOS available, Win/Linux soon)
 * - Section heading helpers
 *
 * All visual tokens come from colors_and_type.css (via CSS vars). */

const { useState, useEffect, useMemo, useRef } = React;

// ─── Heroicons (24px outline, 1.5 stroke) ───
const HERO_PATHS = {
  "magnifying-glass": "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  "command-line": "M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z",
  "document-text": "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  "folder": "M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776",
  "globe-alt": "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
  "calculator": "M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.773 4.773zM21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  "clipboard-document-list": "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z",
  "puzzle-piece": "M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z",
  "swatch": "M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z",
  "x-mark": "M6 18L18 6M6 6l12 12",
  "arrow-uturn-left": "M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3",
  "bolt": "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  "lock-closed": "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
  "cog-6-tooth": "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.759 6.759 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.213-1.28z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  "cube": "M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9",
  "bolt-slash": "M20.25 6.75L3.75 17.25M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  "rocket-launch": "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
  "arrow-down-tray": "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5",
  "arrow-right": "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3",
  "arrow-up-right": "M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25",
  "play": "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z",
  "sparkles": "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z",
  "shield-check": "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.063 2.522-.187 3.757a11.96 11.96 0 01-3.527 3.527A11.96 11.96 0 0112 21a11.96 11.96 0 01-5.286-1.716 11.96 11.96 0 01-3.527-3.527A48.49 48.49 0 013 12c0-2.392.273-4.722.79-6.962A11.954 11.954 0 0112 2.714c2.998 0 5.74 1.1 7.843 2.918.243.214.482.434.715.66.51 2.245.79 4.575.79 6.962z",
  "code-bracket": "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
  "device-phone-mobile": "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
  "computer-desktop": "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25",
  "github": "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.96-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.94 10.94 0 015.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.26 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.66.79.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z",
  "x-twitter": "M18.244 2H21.5l-7.51 8.59L23 22h-6.83l-5.34-6.99L4.5 22H1.24l8.04-9.2L1 2h6.94l4.83 6.4L18.244 2zm-1.2 18h1.84L7.04 4H5.07l11.97 16z",
  "cursor-arrow-rays": "M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59",
};

const HeroIcon = ({ name, size = 20, className = "", style }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
       strokeWidth="1.5" className={className} style={style}>
    <path strokeLinecap="round" strokeLinejoin="round" d={HERO_PATHS[name] || HERO_PATHS["command-line"]}/>
  </svg>
);

// Brand glyphs (filled)
const BrandIcon = ({ name, size = 20, style }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" style={style}>
    <path d={HERO_PATHS[name]}/>
  </svg>
);

// ─── Logo: torch-flame glyph + "Torchsnap" wordmark ───
const TorchGlyph = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    {/* Stylized torch flame in brand orange. */}
    <path
      d="M12 2.5c1.6 2.6 3.4 4.4 3.4 7 0 1.7-1.5 3.1-3.4 3.1S8.6 11.2 8.6 9.5c0-2.6 1.8-4.4 3.4-7z"
      fill="var(--color-accent)"
    />
    <path
      d="M11.6 6.2c.6 1.3 1.6 2.2 1.6 3.5 0 .9-.7 1.6-1.6 1.6s-1.6-.7-1.6-1.6c0-1.3 1-2.2 1.6-3.5z"
      fill="#fff7ec" opacity="0.85"
    />
    {/* Torch handle */}
    <rect x="10.5" y="13" width="3" height="6.5" rx="0.5" fill="var(--color-text-primary)" opacity="0.85"/>
    <rect x="9.5" y="19" width="5" height="1.5" rx="0.5" fill="var(--color-text-primary)"/>
  </svg>
);

const Wordmark = ({ size = 18 }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
    <TorchGlyph size={size + 4}/>
    <span style={{
      fontSize: size, fontWeight: 600, letterSpacing: "-0.015em",
      color: "var(--color-text-primary)",
    }}>Torchsnap</span>
  </span>
);

// ─── KeyCap & KeyBindingPill (matches the launcher) ───
const KeyCap = ({ children, size = "sm" }) => {
  const dim = size === "lg" ? { h: 28, font: 13, pad: "0 8px" } : { h: 20, font: 11, pad: "0 5px" };
  return (
    <span style={{
      display: "inline-flex", height: dim.h, minWidth: dim.h, padding: dim.pad,
      alignItems: "center", justifyContent: "center",
      borderRadius: 4,
      border: "1px solid var(--color-border)",
      background: "var(--color-surface-inset)",
      fontFamily: "var(--font-mono)", fontSize: dim.font,
      color: "var(--color-text-muted)",
      boxShadow: "0 1px 0 var(--color-border)",
    }}>{children}</span>
  );
};

const KeyBindingPill = ({ keys, label }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--color-text-muted)" }}>
    <span style={{ display: "inline-flex", gap: 2 }}>
      {keys.map((k, i) => <KeyCap key={i}>{k}</KeyCap>)}
    </span>
    <span>{label}</span>
  </span>
);

// ─── Mini launcher (used inside hero shots) ───
const MOCK_RESULTS = [
  { id: 1, title: "Terminal",         subtitle: "Application · /Applications",                  icon: "command-line",          kind: "App" },
  { id: 2, title: "Translate to…",    subtitle: "Plugin · DeepL · Cmd-driven translation",      icon: "globe-alt",             kind: "Plugin" },
  { id: 3, title: "Tab management",   subtitle: "Plugin · Switch and group browser tabs",       icon: "puzzle-piece",          kind: "Plugin" },
  { id: 4, title: "Theme",            subtitle: "Setting · Choose appearance",                  icon: "swatch",                kind: "Setting" },
  { id: 5, title: "Clipboard history",subtitle: "Plugin · Recent copies, pinned snippets",      icon: "clipboard-document-list", kind: "Plugin" },
  { id: 6, title: "Open in Finder",   subtitle: "Action · ~/Projects/torchsnap",                icon: "folder",                kind: "Action" },
];

const highlight = (text, match) => {
  if (!match) return text;
  const i = text.toLowerCase().indexOf(match.toLowerCase());
  if (i < 0) return text;
  return (
    <React.Fragment>
      {text.slice(0, i)}
      <span style={{ color: "var(--color-accent)", fontWeight: 600 }}>{text.slice(i, i + match.length)}</span>
      {text.slice(i + match.length)}
    </React.Fragment>
  );
};

const SearchInput = ({ value, caret = false, placeholder = "Type to search" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px" }}>
    <HeroIcon name="magnifying-glass" size={20} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
    <div style={{
      flex: 1, fontSize: 18, color: value ? "var(--color-text-primary)" : "var(--color-text-muted)",
      letterSpacing: "-0.005em",
      whiteSpace: "nowrap", overflow: "hidden",
    }}>
      {value || placeholder}
      {caret && <span className="ts-caret"></span>}
    </div>
    <span style={{
      display: "inline-flex", height: 20, padding: "0 6px",
      alignItems: "center", borderRadius: 4,
      border: "1px solid var(--color-border)",
      background: "var(--color-surface-inset)",
      fontFamily: "var(--font-mono)", fontSize: 11,
      color: "var(--color-text-muted)",
      boxShadow: "0 1px 0 var(--color-border)",
    }}>Esc</span>
  </div>
);

const ResultRow = ({ result, selected, query }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 12,
    padding: "10px 20px 10px 12px",
    borderLeft: `2px solid ${selected ? "var(--color-accent)" : "transparent"}`,
    background: selected ? "var(--color-selection)" : "transparent",
  }}>
    <div style={{
      width: 36, height: 36, flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: selected ? "var(--color-text-primary)" : "var(--color-text-secondary)",
    }}>
      <HeroIcon name={result.icon} size={28}/>
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        fontSize: 13, color: "var(--color-text-primary)",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>{highlight(result.title, query)}</div>
      <div style={{
        fontSize: 12, color: "var(--color-text-muted)",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>{result.subtitle}</div>
    </div>
    {result.kind && (
      <span style={{
        fontSize: 11, fontFamily: "var(--font-mono)",
        color: "var(--color-text-tertiary)", flexShrink: 0,
      }}>{result.kind}</span>
    )}
  </div>
);

const LauncherFooter = ({ left = [], right = [] }) => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    borderTop: "1px solid var(--color-border)",
    padding: "10px 20px",
  }}>
    <div style={{ display: "flex", gap: 16 }}>
      {left.map((b, i) => <KeyBindingPill key={i} {...b} />)}
    </div>
    <div style={{ display: "flex", gap: 16 }}>
      {right.map((b, i) => <KeyBindingPill key={i} {...b} />)}
    </div>
  </div>
);

// ─── The animated launcher (typing demo). Loops through queries forever. ───
// Each cycle: type a query char-by-char, settle, optional cursor-down sweep,
// then erase. Fully self-contained; no props beyond queries[].
const DEMO_QUERIES = [
  { q: "term", ms: 90, hold: 1400, downs: 0 },
  { q: "translate", ms: 80, hold: 1400, downs: 1 },
  { q: "clip", ms: 100, hold: 1400, downs: 0 },
  { q: "theme", ms: 90, hold: 1400, downs: 0 },
];

// Slower variant — generous hold so you can read each result set.
const DEMO_QUERIES_SLOW = [
  { q: "term",       ms: 110, hold: 3200, downs: 0 },
  { q: "translate",  ms: 95,  hold: 3400, downs: 1 },
  { q: "clip",       ms: 120, hold: 3200, downs: 0 },
  { q: "theme",      ms: 110, hold: 3200, downs: 0 },
];

function useTypingDemo(queries = DEMO_QUERIES) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | hold | erasing
  const [qi, setQi] = useState(0);
  const [downs, setDowns] = useState(0); // selection offset within results
  const target = queries[qi].q;

  useEffect(() => {
    let t;
    if (phase === "typing") {
      if (text.length < target.length) {
        t = setTimeout(() => setText(target.slice(0, text.length + 1)), queries[qi].ms);
      } else {
        // Once typed, schedule any down-arrow sweeps then hold.
        let ds = queries[qi].downs;
        if (ds > 0) {
          t = setTimeout(() => {
            setDowns(d => d + 1);
            // re-enter typing branch (no-op) -> loop again
            if (ds - 1 > 0) {
              // Decrement queries.downs visually by advancing downs count;
              // since we hit hold next, just go to hold and keep downs.
            }
            setPhase("hold");
          }, 350);
        } else {
          t = setTimeout(() => setPhase("hold"), 60);
        }
      }
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("erasing"), queries[qi].hold);
    } else if (phase === "erasing") {
      if (text.length > 0) {
        t = setTimeout(() => setText(text.slice(0, -1)), 35);
      } else {
        t = setTimeout(() => {
          setDowns(0);
          setQi((qi + 1) % queries.length);
          setPhase("typing");
        }, 250);
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, qi, target, queries]);

  return { text, downs };
}

// Filtered results given a query string. `q` is matched as substring, OR
// the kind in lowercase, OR title prefix.
const filterResults = (q) => {
  if (!q.trim()) return [];
  const needle = q.trim().toLowerCase();
  return MOCK_RESULTS.filter(r =>
    r.title.toLowerCase().includes(needle) ||
    r.kind.toLowerCase().includes(needle) ||
    r.subtitle.toLowerCase().includes(needle)
  ).slice(0, 6);
};

// ─── Snappy mascot perched on top, like in the real launcher ───
const SnappyPerch = ({ variant = "original", size = 156 }) => (
  <img
    src={`assets/mascots/snappy-${variant}-384.webp`}
    alt={`Snappy — ${variant.replace(/-/g, " ")}`}
    style={{
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      bottom: `calc(100% - ${Math.round(size * 0.21)}px)`,
      width: size, height: size,
      objectFit: "contain",
      pointerEvents: "none",
      filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.18))",
      zIndex: 2,
    }}
  />
);

// ─── Animated launcher card (used as hero shot) ───
const AnimatedLauncher = ({ width = 620, mascotVariant = null, mascotSize = 156, queries }) => {
  const { text, downs } = useTypingDemo(queries || DEMO_QUERIES);
  const results = filterResults(text);
  // selection cycles when there's a "downs" requirement
  const sel = Math.min(results.length - 1, downs);
  return (
    <div style={{ position: "relative", width }}>
      {mascotVariant && <SnappyPerch variant={mascotVariant} size={mascotSize}/>}
      <div className="launcher-card" style={{
        width,
        borderRadius: 16,
        background: "var(--color-surface)",
        boxShadow: "var(--shadow-launcher)",
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
      }}>
        <SearchInput value={text} caret/>
        {results.length > 0 && (
          <React.Fragment>
            <div style={{ borderTop: "1px solid var(--color-border)" }} />
            <div style={{ padding: "6px 0", maxHeight: 300, overflow: "hidden" }}>
              {results.map((r, i) => (
                <ResultRow key={r.id} result={r} selected={i === sel} query={text}/>
              ))}
            </div>
          </React.Fragment>
        )}
        <LauncherFooter
          left={results.length ? [{ keys: ["↵"], label: results[sel]?.kind === "App" ? "Open" : "Run" }] : [{ keys: ["⌘", "Space"], label: "Open Torchsnap" }]}
          right={[
            { keys: ["⌘", "↵"], label: "Show actions" },
            { keys: ["⌘", ","],  label: "Settings" },
          ]}
        />
      </div>
    </div>
  );
};

// ─── Buttons ───
const PrimaryButton = ({ children, icon, ...p }) => (
  <button {...p} style={{
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "12px 20px",
    background: "var(--color-accent)",
    color: "white",
    border: "none",
    borderRadius: 10,
    fontSize: 14, fontWeight: 600,
    fontFamily: "var(--font-sans)",
    cursor: "pointer",
    boxShadow: "0 1px 2px rgba(0,0,0,.06), inset 0 1px 0 rgba(255,255,255,.15)",
    transition: "background .15s, transform .12s",
    ...p.style,
  }}
    onMouseDown={(e) => e.currentTarget.style.transform = "translateY(1px)"}
    onMouseUp={(e) => e.currentTarget.style.transform = "translateY(0)"}
    onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
  >
    {icon && <HeroIcon name={icon} size={16}/>}
    {children}
  </button>
);

const GhostButton = ({ children, icon, disabled, hint, ...p }) => (
  <button {...p} disabled={disabled} style={{
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "12px 18px",
    background: "var(--color-surface)",
    color: "var(--color-text-primary)",
    border: "1px solid var(--color-border)",
    borderRadius: 10,
    fontSize: 14, fontWeight: 500,
    fontFamily: "var(--font-sans)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "background .15s, border-color .15s",
    ...p.style,
  }}>
    {icon && <HeroIcon name={icon} size={16}/>}
    {children}
    {hint && <span style={{
      fontSize: 11, color: "var(--color-text-muted)",
      marginLeft: 4, fontFamily: "var(--font-mono)",
    }}>{hint}</span>}
  </button>
);

// ─── Platform availability pill ───
// Uses real OS glyph icons (Apple / Windows / Linux/Tux-style) instead of a
// generic dot. Apple + Windows are widely-recognized brand glyphs; Linux uses
// a simple penguin silhouette.
const PlatformOSIcon = ({ os, size = 12 }) => {
  if (os === "mac") {
    // Apple logo (filled, single path)
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.365 1.43c0 1.14-.466 2.232-1.222 3.022-.81.847-2.114 1.5-3.182 1.42-.13-1.107.42-2.255 1.13-2.998.79-.83 2.16-1.46 3.274-1.444zM20.5 17.27c-.55 1.27-.81 1.84-1.52 2.96-.99 1.56-2.39 3.5-4.12 3.51-1.54.02-1.94-1-4.03-.99-2.09.01-2.52 1.01-4.06 1-1.73-.02-3.06-1.78-4.05-3.34-2.78-4.36-3.07-9.48-1.36-12.21 1.22-1.95 3.14-3.09 4.95-3.09 1.84 0 3 .99 4.51.99 1.47 0 2.36-1 4.49-1 1.61 0 3.32.88 4.54 2.4-3.99 2.18-3.34 7.86.65 9.77z"/>
      </svg>
    );
  }
  if (os === "win") {
    // Windows 4-pane logo
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3 5.46L11 4.36V11.5H3V5.46zM12 4.22L22 3v8.5H12V4.22zM3 12.5h8v7.14L3 18.54V12.5zM12 12.5h10V21l-10-1.36V12.5z"/>
      </svg>
    );
  }
  if (os === "linux") {
    // Tux-ish penguin silhouette, simplified
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2c-2.2 0-3.5 1.9-3.5 4.2 0 1 .25 1.95.7 2.7-1.4 1.1-2.7 2.7-3.4 4.5-.6 1.6-.7 3-.4 4 .3.9 1 1.4 1.5 1.7.4.2.5.5.4 1-.1.4-.4.7-.7 1-.3.3-.5.7-.4 1.1.2.5.7.7 1.3.7.8 0 1.7-.4 2.5-.9.5-.3 1-.5 1.5-.5h2c.5 0 1 .2 1.5.5.8.5 1.7.9 2.5.9.6 0 1.1-.2 1.3-.7.1-.4-.1-.8-.4-1.1-.3-.3-.6-.6-.7-1-.1-.5 0-.8.4-1 .5-.3 1.2-.8 1.5-1.7.3-1 .2-2.4-.4-4-.7-1.8-2-3.4-3.4-4.5.45-.75.7-1.7.7-2.7C15.5 3.9 14.2 2 12 2zm-1.3 4.2c.4 0 .7.4.7 1s-.3 1-.7 1-.7-.4-.7-1 .3-1 .7-1zm2.6 0c.4 0 .7.4.7 1s-.3 1-.7 1-.7-.4-.7-1 .3-1 .7-1zM12 9.5c.6 0 1.2.3 1.6.8.2.3.1.6-.2.7-.4.2-.9.3-1.4.3s-1-.1-1.4-.3c-.3-.1-.4-.4-.2-.7.4-.5 1-.8 1.6-.8z"/>
      </svg>
    );
  }
  return null;
};

const PlatformPill = ({ os, available }) => {
  const labels = { mac: "macOS", win: "Windows", linux: "Linux" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 7,
      padding: "5px 11px",
      borderRadius: 999,
      border: "1px solid var(--color-border)",
      background: available ? "var(--color-surface)" : "transparent",
      fontSize: 12,
      color: available ? "var(--color-text-primary)" : "var(--color-text-muted)",
      fontWeight: 500,
    }}>
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        color: available ? "var(--color-accent)" : "var(--color-text-muted)",
      }}>
        <PlatformOSIcon os={os} size={12}/>
      </span>
      {labels[os]}
      {!available && <span style={{ fontSize: 10, color: "var(--color-text-muted)" }}>· soon</span>}
    </span>
  );
};

// ─── Section eyebrow + title ───
const SectionHead = ({ eyebrow, title, sub, align = "left" }) => (
  <div style={{ textAlign: align, maxWidth: align === "center" ? 640 : "none", margin: align === "center" ? "0 auto" : undefined }}>
    {eyebrow && <div className="eyebrow" style={{ marginBottom: 12, color: "var(--color-accent)" }}>{eyebrow}</div>}
    <h2 style={{
      margin: 0,
      fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em",
      lineHeight: 1.1, color: "var(--color-text-primary)",
      textWrap: "balance",
    }}>{title}</h2>
    {sub && <p style={{
      margin: "16px 0 0",
      fontSize: 16, lineHeight: 1.55,
      color: "var(--color-text-secondary)",
      textWrap: "pretty",
      maxWidth: 600,
      ...(align === "center" ? { marginLeft: "auto", marginRight: "auto" } : {}),
    }}>{sub}</p>}
  </div>
);

Object.assign(window, {
  HeroIcon, BrandIcon, TorchGlyph, Wordmark,
  KeyCap, KeyBindingPill,
  SearchInput, ResultRow, LauncherFooter,
  AnimatedLauncher, SnappyPerch,
  PrimaryButton, GhostButton, PlatformPill, PlatformOSIcon, SectionHead,
  MOCK_RESULTS, filterResults, useTypingDemo, DEMO_QUERIES, DEMO_QUERIES_SLOW, highlight,
});

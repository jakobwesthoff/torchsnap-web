/* Launcher UI kit JSX components.
 * Cosmetic recreation of src/launcher/* — minimal logic, faithful visuals. */

const { useState, useMemo } = React;

// ---------- Heroicons (inline outline, 1.5 stroke) ----------
const Icon = ({ name, className = "" }) => {
  const paths = {
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
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
         className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[name] || paths["command-line"]}/>
    </svg>
  );
};

// ---------- KeyCap & KeyBindingPill ----------
const KeyCap = ({ children }) => (
  <span style={{
    display: "inline-flex", height: 20, minWidth: 20, padding: "0 5px",
    alignItems: "center", justifyContent: "center",
    borderRadius: 4, border: "1px solid var(--color-border)",
    background: "var(--color-surface-inset)",
    fontFamily: "var(--font-mono)", fontSize: 11,
    color: "var(--color-text-muted)",
    boxShadow: "0 1px 0 var(--color-border)",
  }}>{children}</span>
);

const KeyBindingPill = ({ keys, label }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--color-text-muted)" }}>
    <span style={{ display: "inline-flex", gap: 2 }}>
      {keys.map((k, i) => <KeyCap key={i}>{k}</KeyCap>)}
    </span>
    <span>{label}</span>
  </span>
);

// ---------- Search input ----------
const SearchInput = ({ value, onChange, onClear }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 12,
    padding: "14px 20px",
  }}>
    <Icon name="magnifying-glass" className="icon-accent" />
    <input
      autoFocus
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type to search"
      style={{
        flex: 1, border: "none", outline: "none", background: "transparent",
        font: "400 18px var(--font-sans)", color: "var(--color-text-primary)",
      }}
    />
    {value ? (
      <button onClick={onClear} aria-label="Clear" style={{
        background: "transparent", border: "none", padding: 4, cursor: "pointer",
        color: "var(--color-text-muted)", borderRadius: 4,
      }}>
        <Icon name="x-mark" className="icon-16" />
      </button>
    ) : (
      <span style={{
        display: "inline-flex", height: 20, padding: "0 6px",
        alignItems: "center", borderRadius: 4,
        border: "1px solid var(--color-border)",
        background: "var(--color-surface-inset)",
        fontFamily: "var(--font-mono)", fontSize: 11,
        color: "var(--color-text-muted)",
        boxShadow: "0 1px 0 var(--color-border)",
      }}>Esc</span>
    )}
  </div>
);

// ---------- Result row ----------
const ResultRow = ({ result, selected, onSelect, onClick }) => (
  <div
    onMouseEnter={onSelect}
    onClick={onClick}
    style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "10px 20px 10px 12px",
      borderLeft: `2px solid ${selected ? "var(--color-accent)" : "transparent"}`,
      background: selected ? "var(--color-selection)" : "transparent",
      cursor: "pointer",
    }}>
    <div style={{
      width: 36, height: 36, flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: selected ? "var(--color-text-primary)" : "var(--color-text-secondary)",
    }}>
      <Icon name={result.icon} className="icon-28" />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        fontSize: 13, color: "var(--color-text-primary)",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>{highlight(result.title, result.match)}</div>
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

// ---------- Footer ----------
const LauncherFooter = ({ left, right }) => (
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

// ---------- Mascot perched on top of the launcher (center mode) ----------
// Source: src/launcher/LauncherMascot.tsx (size = 192) and layout.ts
// (CENTER_FEET_Y = 10.1 — visible feet land 10px below card top).
// 192px is exactly the production size against the 680px card.
const SnappyPerch = ({ variant = "original" }) => (
  <img
    src={`../../assets/snappy-${variant}-1024.png`}
    alt={`Snappy ${variant}`}
    style={{
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      // The 1024×1024 source has ~15.6% transparent bottom margin.
      // Visible feet should land ~10px below card top → bottom of <img> at ~10 + 192*0.156 ≈ 40px below card top.
      bottom: "calc(100% - 40px)",
      width: 192, height: 192,
      objectFit: "contain",
      pointerEvents: "none",
      filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.18))",
      zIndex: 2,
    }}
  />
);

// ---------- Launcher card ----------
const LauncherCard = ({ children, hasMascot = false, mascotVariant = "original" }) => (
  <div style={{ position: "relative", width: 680 }}>
    {hasMascot && <SnappyPerch variant={mascotVariant} />}
    <div className="launcher-card" style={{
      width: 680,
      borderRadius: 16,
      background: "var(--color-surface)",
      boxShadow: "var(--shadow-launcher)",
      overflow: "hidden",
      position: "relative",
      zIndex: 1,
    }}>
      {children}
    </div>
  </div>
);

Object.assign(window, {
  Icon, KeyCap, KeyBindingPill,
  SearchInput, ResultRow, LauncherFooter, SnappyPerch, LauncherCard,
});

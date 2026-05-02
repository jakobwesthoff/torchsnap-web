/* Variation 6 — "The Whole Page Is The Launcher"
 * Adventurous metaphor: the entire landing page IS a giant Torchsnap result list.
 * Each section is presented as a "result row" you can navigate to with arrow keys.
 * Selection moves on hover/click. Top is a fixed search input that's permanently
 * showing the marketing tagline.
 */

const PAGE_RESULTS = [
  {
    id: "what",
    icon: "magnifying-glass",
    kind: "Overview",
    title: "What is Torchsnap?",
    subtitle: "Keyboard launcher · Plugin sandbox · Cross-platform",
    body: (
      <div>
        <p style={resultBodyP}>
          A single window that opens with one keystroke, finds the thing
          you're after, and either runs it or hands the result area to a
          plugin that knows what to do next. Like Spotlight or Raycast,
          but with a WebAssembly sandbox instead of a trust fall.
        </p>
      </div>
    ),
  },
  {
    id: "see",
    icon: "play",
    kind: "Demo",
    title: "See it in motion",
    subtitle: "Type a query — watch results filter in real time",
    body: <AnimatedLauncher width={560}/>,
  },
  {
    id: "plugins",
    icon: "puzzle-piece",
    kind: "Plugins",
    title: "Sandboxed plugins, by default",
    subtitle: "WebAssembly · wasm32-wasip2 · Single-file .torchsnap archive",
    body: (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, paddingTop: 8 }}>
        {[
          ["Translate", "globe-alt", "DeepL-driven word and phrase translation."],
          ["Clipboard history", "clipboard-document-list", "Recent copies, pinned snippets, regex filters."],
          ["Tab management", "puzzle-piece", "Switch and group browser tabs without leaving the keyboard."],
        ].map(([n, ic, d], i) => (
          <div key={i} style={{
            padding: 14, borderRadius: 10,
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <HeroIcon name={ic} size={16} style={{ color: "var(--color-accent)" }}/>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{n}</span>
            </div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.45 }}>{d}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "build",
    icon: "code-bracket",
    kind: "For developers",
    title: "Build your own plugin",
    subtitle: "Any wasm32-wasip2 language · Permission manifest · cargo-style CLI",
    body: (
      <pre style={{
        margin: 0, padding: 14,
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 10,
        fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.7,
        color: "var(--color-text-secondary)",
      }}>
{`$ `}<span style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>torchsnap new</span>{` weather
$ `}<span style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>cd</span>{` weather && cargo build --release
$ `}<span style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>torchsnap pack</span>{` ./
   `}<span style={{ color: "var(--color-text-muted)" }}>↳ writes weather.torchsnap (drop into the launcher)</span>
      </pre>
    ),
  },
  {
    id: "platforms",
    icon: "computer-desktop",
    kind: "Platforms",
    title: "macOS today. Windows & Linux next.",
    subtitle: "Same app, same plugins, same .torchsnap archives",
    body: (
      <div style={{ display: "flex", gap: 10 }}>
        <PlatformPill os="mac" available/>
        <PlatformPill os="win" available={false}/>
        <PlatformPill os="linux" available={false}/>
      </div>
    ),
  },
  {
    id: "snappy",
    icon: "sparkles",
    kind: "Mascot",
    title: "Meet Snappy",
    subtitle: "A torch with opinions. Optional. Many cosplay outfits.",
    body: (
      <div style={{ display: "flex", gap: 16, alignItems: "center", paddingTop: 4 }}>
        {["original", "cloak-and-torch", "astronaut", "dashing-captain", "dino-kigurumi"].map(v => (
          <img key={v}
            src={(window.__resources && window.__resources["mascot-" + v]) || `assets/mascots/snappy-${v}-384.webp`}
            alt={v}
            style={{
              width: 80, height: 80, objectFit: "contain",
              filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.12))",
            }}/>
        ))}
        <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>+ many more</span>
      </div>
    ),
  },
  {
    id: "download",
    icon: "arrow-down-tray",
    kind: "Action",
    title: "Download · ⌘ ↵ Run",
    subtitle: "Free · MPL-2.0 · Alpha for macOS",
    body: (
      <div style={{ display: "flex", gap: 12, alignItems: "center", paddingTop: 4 }}>
        <PrimaryButton icon="arrow-down-tray">Download for macOS</PrimaryButton>
        <GhostButton icon="github">Star on GitHub</GhostButton>
      </div>
    ),
  },
];

const resultBodyP = {
  margin: 0, fontSize: 14, lineHeight: 1.55,
  color: "var(--color-text-secondary)", maxWidth: 640,
  textWrap: "pretty",
};

const V6PageAsLauncher = () => {
  const [sel, setSel] = React.useState(0);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown") { setSel(s => Math.min(PAGE_RESULTS.length - 1, s + 1)); e.preventDefault(); }
      if (e.key === "ArrowUp")   { setSel(s => Math.max(0, s - 1)); e.preventDefault(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div style={{
      width: 1280, minHeight: 880,
      background: "var(--color-surface-inset)",
      fontFamily: "var(--font-sans)",
      color: "var(--color-text-primary)",
      padding: "32px",
      boxSizing: "border-box",
      position: "relative",
    }}>
      {/* Top strip — wordmark + fake window controls */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 8px 14px",
      }}>
        <Wordmark size={16}/>
        <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>
          torchsnap.app — this entire page is one giant launcher window
        </span>
        <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <KeyCap>↑</KeyCap><KeyCap>↓</KeyCap>
          <span style={{ fontSize: 11, color: "var(--color-text-muted)", marginLeft: 6 }}>to navigate</span>
        </span>
      </div>

      {/* The big "launcher" container */}
      <div className="launcher-card" style={{
        borderRadius: 20,
        background: "var(--color-surface)",
        boxShadow: "var(--shadow-launcher)",
        overflow: "hidden",
      }}>
        {/* Search input — but it's the marketing slogan */}
        <div style={{
          display: "flex", alignItems: "center", gap: 14,
          padding: "22px 28px",
        }}>
          <HeroIcon name="magnifying-glass" size={26} style={{ color: "var(--color-accent)", flexShrink: 0 }}/>
          <div style={{
            flex: 1, fontSize: 28, fontWeight: 500, letterSpacing: "-0.015em",
            color: "var(--color-text-primary)",
          }}>
            Light. Find. Launch.
            <span className="ts-caret" style={{ height: 28, marginLeft: 4 }}></span>
          </div>
          <span style={{
            display: "inline-flex", height: 28, padding: "0 10px",
            alignItems: "center", borderRadius: 6,
            border: "1px solid var(--color-border)",
            background: "var(--color-surface-inset)",
            fontFamily: "var(--font-mono)", fontSize: 12,
            color: "var(--color-text-muted)",
          }}>⌘ Space</span>
        </div>

        <div style={{ borderTop: "1px solid var(--color-border)" }}/>

        {/* Big result rows */}
        <div>
          {PAGE_RESULTS.map((r, i) => (
            <BigResultRow key={r.id} result={r} selected={i === sel} onSelect={() => setSel(i)} />
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderTop: "1px solid var(--color-border)",
          padding: "12px 24px",
        }}>
          <KeyBindingPill keys={["↵"]} label="Open this section"/>
          <div style={{ display: "flex", gap: 16 }}>
            <KeyBindingPill keys={["⌘", "↵"]} label="Show actions"/>
            <KeyBindingPill keys={["⌘", ","]} label="Settings"/>
          </div>
        </div>
      </div>

      {/* meta-footer */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 8px 0",
        fontSize: 12, color: "var(--color-text-muted)",
      }}>
        <span>© 2026 Torchsnap · MPL-2.0</span>
        <span style={{ display: "flex", gap: 18 }}>
          <a href="#" style={navLinkStyle}>Docs</a>
          <a href="#" style={navLinkStyle}>SDK</a>
          <a href="#" style={navLinkStyle}>GitHub</a>
        </span>
      </div>
    </div>
  );
};

const BigResultRow = ({ result, selected, onSelect }) => (
  <div
    onMouseEnter={onSelect}
    style={{
      display: "flex", gap: 18,
      padding: "20px 28px 20px 24px",
      borderLeft: `3px solid ${selected ? "var(--color-accent)" : "transparent"}`,
      background: selected ? "var(--color-selection)" : "transparent",
      borderBottom: "1px solid var(--color-border-divider)",
      cursor: "pointer",
      transition: "background .12s",
    }}>
    <div style={{
      width: 44, height: 44, flexShrink: 0,
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      paddingTop: 4,
      color: selected ? "var(--color-accent)" : "var(--color-text-secondary)",
    }}>
      <HeroIcon name={result.icon} size={28}/>
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        marginBottom: 6,
      }}>
        <span style={{ fontSize: 18, fontWeight: 600, color: "var(--color-text-primary)" }}>
          {result.title}
        </span>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 11,
          color: "var(--color-text-tertiary)",
          padding: "2px 8px",
          borderRadius: 999,
          background: "var(--color-surface-inset)",
          border: "1px solid var(--color-border)",
        }}>{result.kind}</span>
      </div>
      <div style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: selected ? 14 : 0 }}>
        {result.subtitle}
      </div>
      {selected && (
        <div style={{ marginTop: 8 }}>{result.body}</div>
      )}
    </div>
  </div>
);

window.V6PageAsLauncher = V6PageAsLauncher;

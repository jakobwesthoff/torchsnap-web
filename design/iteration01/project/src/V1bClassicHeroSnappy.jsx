/* Variation 1.5 — "Classic Hero, refined"
 * - No background halo / rings — the launcher just sits on the surface.
 * - Snappy is perched ON TOP of the launcher, centered on the search bar.
 * - Subtle inline cosplay switcher under the launcher.
 * - On first paint, picks a random Snappy variant unless one is forced via prop.
 * - Logo (top-left) uses the classic Snappy mascot as its glyph.
 * - Animation runs on the slower DEMO_QUERIES_SLOW timing.
 * - Launcher anchored to TOP of a fixed-height stage so it doesn't jump.
 */

const V1B_COSPLAY = [
  { id: "original",             name: "Original" },
  { id: "cloak-and-torch",      name: "Cloak & Torch" },
  { id: "astronaut",            name: "Astronaut" },
  { id: "dashing-captain",      name: "Dashing Captain" },
  { id: "dino-kigurumi",        name: "Dino Kigurumi" },
  { id: "deep-sea-diver",       name: "Deep Sea Diver" },
  { id: "banana-goggle-minion", name: "Banana Minion" },
];

// Logo using the Snappy mascot photo + wordmark.
const SnappyWordmark = ({ size = 18 }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
    <img
      src="assets/mascots/snappy-original-384.webp"
      alt="Snappy"
      style={{ width: size + 14, height: size + 14, objectFit: "contain", display: "block" }}
    />
    <span style={{
      fontSize: size, fontWeight: 600, letterSpacing: "-0.015em",
      color: "var(--color-text-primary)",
    }}>Torchsnap</span>
  </span>
);

const V1bClassicHeroSnappy = ({ snappyVariant }) => {
  // If the parent didn't force a variant, pick a random one once on mount.
  const [variant, setVariant] = React.useState(() => {
    if (snappyVariant) return snappyVariant;
    return V1B_COSPLAY[Math.floor(Math.random() * V1B_COSPLAY.length)].id;
  });
  // If the controlled prop changes (Tweak panel), follow it and stop auto-cycling.
  const controlled = !!snappyVariant;
  React.useEffect(() => {
    if (snappyVariant) setVariant(snappyVariant);
  }, [snappyVariant]);

  const idx = Math.max(0, V1B_COSPLAY.findIndex(v => v.id === variant));
  const cycle = (delta) => {
    setVariant(prev => {
      const i = Math.max(0, V1B_COSPLAY.findIndex(v => v.id === prev));
      const next = (i + delta + V1B_COSPLAY.length) % V1B_COSPLAY.length;
      return V1B_COSPLAY[next].id;
    });
  };

  // Auto-cycle through cosplays (paused if a variant is forced via Tweaks).
  // Pauses on hover so people can read the current name.
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (controlled || paused) return;
    const t = setInterval(() => cycle(1), 2600);
    return () => clearInterval(t);
  }, [controlled, paused]);

  return (
    <div style={{
      width: 1280, minHeight: 820,
      background: "var(--color-surface)",
      fontFamily: "var(--font-sans)",
      color: "var(--color-text-primary)",
      overflow: "hidden",
      position: "relative",
    }}>
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 64px",
        borderBottom: "1px solid var(--color-border-divider)",
      }}>
        <SnappyWordmark size={18}/>
        <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <a href="#features" style={navLinkStyle}>Features</a>
          <a href="#plugins" style={navLinkStyle}>Plugins</a>
          <a href="#developers" style={navLinkStyle}>For developers</a>
          <a href="#download" style={navLinkStyle}>Download</a>
          <a href="#" style={{ ...navLinkStyle, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <BrandIcon name="github" size={16} style={{ color: "var(--color-text-secondary)" }}/>
            GitHub
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 64, alignItems: "start",
        padding: "80px 64px 60px",
      }}>
        {/* LEFT — copy */}
        <div>
          <div className="eyebrow" style={{
            color: "var(--color-accent)",
            marginBottom: 20,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.18em",
          }}>
            Light · Find · Launch
          </div>
          <h1 style={{
            margin: 0,
            fontSize: 64, fontWeight: 600, letterSpacing: "-0.025em",
            lineHeight: 1.02, color: "var(--color-text-primary)",
            textWrap: "balance",
          }}>
            Strike a key,<br/>
            <span style={{ color: "var(--color-accent)" }}>light the way.</span>
          </h1>
          <p style={{
            margin: "24px 0 0",
            fontSize: 18, lineHeight: 1.55,
            color: "var(--color-text-secondary)",
            maxWidth: 520, textWrap: "pretty",
          }}>
            Torchsnap is a keyboard-first launcher for the apps, files,
            and small tasks you reach for all day. A tiny window, a single
            hotkey, and a plugin ecosystem to make it your own.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 36, alignItems: "center" }}>
            <PrimaryButton icon="arrow-down-tray">Download for macOS</PrimaryButton>
            <GhostButton icon="github">Star on GitHub</GhostButton>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 28, alignItems: "center", flexWrap: "wrap" }}>
            <PlatformPill os="mac" available/>
            <PlatformPill os="win" available={false}/>
            <PlatformPill os="linux" available={false}/>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            marginTop: 14,
            fontSize: 12, color: "var(--color-text-muted)",
          }}>
            <span>Free, forever.</span>
            <span aria-hidden="true" style={{ opacity: 0.5 }}>·</span>
            <a href="#" style={{
              color: "var(--color-text-muted)",
              textDecoration: "none",
              borderBottom: "1px dashed var(--color-border)",
            }}>MPL-2.0 licensed</a>
          </div>
        </div>

        {/* RIGHT — fixed-height stage. No halo. Launcher anchored top.
            Snappy is perched ON TOP of the launcher and auto-cycles
            through cosplays in the background. No visible selector. */}
        <div style={{ position: "relative", height: 580 }}>
          <div style={{
            position: "absolute",
            top: 90, left: "50%",
            transform: "translateX(-50%)",
          }}>
            <AnimatedLauncher
              width={520}
              queries={DEMO_QUERIES_SLOW}
              mascotVariant={variant}
              mascotSize={170}
            />
          </div>
        </div>
      </section>

      {/* Hotkey banner */}
      <section style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 16, padding: "20px 64px 60px",
        color: "var(--color-text-secondary)", fontSize: 14,
      }}>
        <span>Press</span>
        <span style={{ display: "inline-flex", gap: 4 }}>
          <KeyCap size="lg">⌘</KeyCap>
          <KeyCap size="lg">Space</KeyCap>
        </span>
        <span>anywhere — that's the whole interaction model.</span>
      </section>

      {/* Feature row */}
      <section id="features" style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        gap: 24, padding: "48px 64px 80px",
        borderTop: "1px solid var(--color-border-divider)",
      }}>
        {[
          { icon: "bolt", title: "Instant", body: "One global hotkey. The window appears already focused, ready for the next keystroke." },
          { icon: "puzzle-piece", title: "Plugins, sandboxed", body: "WebAssembly components run isolated by default — every capability is declared in a manifest." },
          { icon: "computer-desktop", title: "Cross-platform", body: "macOS today. Windows and Linux as the alpha widens — the same app, the same plugins." },
          { icon: "code-bracket", title: "Build your own", body: "Ship a .torchsnap archive in any wasm32-wasip2 language. SDK ergonomics included." },
        ].map((f, i) => (
          <div key={i}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: "color-mix(in srgb, var(--color-accent) 12%, transparent)",
              color: "var(--color-accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 14,
            }}><HeroIcon name={f.icon} size={20}/></div>
            <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 600 }}>{f.title}</h3>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)" }}>{f.body}</p>
          </div>
        ))}
      </section>

      <FooterStrip/>
    </div>
  );
};

// Cosplay name-tag — sits centered just under the mascot, above the
// launcher card. Renders as a quiet caption (no border/box) so it reads
// as the character's label, not a piece of UI chrome. Cross-fades the
// name as it auto-cycles. Tiny chevrons appear on hover for manual nav.
const CosplayNameTag = ({ current, idx, total, onPrev, onNext, paused }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "absolute",
        // SnappyPerch is positioned above the launcher (top: -mascotSize/2-ish).
        // We place the tag right at the launcher's top edge, so it
        // sits between mascot feet and the search bar.
        top: -16, left: "50%",
        transform: "translateX(-50%)",
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "4px 8px",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      <ChevronBtn dir="left" onClick={onPrev} visible={hover}/>
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "3px 10px",
        borderRadius: 999,
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-card-1)",
        fontSize: 11,
        color: "var(--color-text-secondary)",
      }}>
        <span style={{
          width: 5, height: 5, borderRadius: 999,
          background: "var(--color-accent)",
          opacity: paused ? 0.25 : 1,
          transition: "opacity 200ms ease",
        }} aria-hidden="true"/>
        <span
          key={current.id}
          style={{
            fontWeight: 600,
            color: "var(--color-text-primary)",
            letterSpacing: "0.01em",
            animation: "tsCosplayFade 320ms ease",
          }}
        >{current.name}</span>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 9,
          color: "var(--color-text-muted)",
        }}>{String(idx + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}</span>
      </span>
      <ChevronBtn dir="right" onClick={onNext} visible={hover}/>
      <style>{`
        @keyframes tsCosplayFade {
          from { opacity: 0; transform: translateY(-2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const ChevronBtn = ({ dir, onClick, visible = true }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={dir === "left" ? "Previous Snappy" : "Next Snappy"}
    style={{
      width: 22, height: 22,
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      border: "1px solid var(--color-border)",
      background: "var(--color-surface)",
      borderRadius: 999, cursor: "pointer",
      color: "var(--color-text-secondary)",
      padding: 0,
      opacity: visible ? 1 : 0,
      transform: visible ? "scale(1)" : "scale(0.85)",
      transition: "opacity 160ms ease, transform 160ms ease, color 160ms ease, background 160ms ease",
      boxShadow: "var(--shadow-card-1)",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-text-primary)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-secondary)"; }}
  >
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {dir === "left"
        ? <polyline points="15 18 9 12 15 6"/>
        : <polyline points="9 18 15 12 9 6"/>}
    </svg>
  </button>
);

window.V1bClassicHeroSnappy = V1bClassicHeroSnappy;

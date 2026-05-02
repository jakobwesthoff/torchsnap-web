/* Variation 1 — "Classic Hero"
 * Marketing-polished. Big tagline left, animated launcher right,
 * supporting feature row underneath. The safe, conventional pick.
 */

const V1ClassicHero = () => (
  <div style={{
    width: 1280, minHeight: 820,
    background: "var(--color-surface)",
    fontFamily: "var(--font-sans)",
    color: "var(--color-text-primary)",
    overflow: "hidden",
    position: "relative",
  }}>
    {/* Top nav */}
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "24px 64px",
      borderBottom: "1px solid var(--color-border-divider)",
    }}>
      <Wordmark size={18}/>
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
      gap: 64, alignItems: "center",
      padding: "80px 64px 60px",
    }}>
      <div>
        <div className="eyebrow" style={{ color: "var(--color-accent)", marginBottom: 20 }}>
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
          hotkey — and a plugin sandbox warm enough to actually trust.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 36, alignItems: "center" }}>
          <PrimaryButton icon="arrow-down-tray">Download for macOS</PrimaryButton>
          <GhostButton icon="github">Star on GitHub</GhostButton>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 18, alignItems: "center" }}>
          <PlatformPill os="mac" available/>
          <PlatformPill os="win" available={false}/>
          <PlatformPill os="linux" available={false}/>
          <span style={{ fontSize: 12, color: "var(--color-text-muted)", marginLeft: 6 }}>
            Free · MPL-2.0 · Alpha
          </span>
        </div>
      </div>

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
        {/* Soft warm halo behind the card */}
        <div style={{
          position: "absolute", inset: -40,
          background: "radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 65%)",
          pointerEvents: "none",
        }}/>
        <AnimatedLauncher width={560}/>
      </div>
    </section>

    {/* Hotkey banner — the singular interaction */}
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

    {/* Footer */}
    <FooterStrip/>
  </div>
);

const navLinkStyle = {
  fontSize: 13, fontWeight: 500,
  color: "var(--color-text-secondary)",
  textDecoration: "none",
};

const FooterStrip = () => (
  <footer style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "20px 64px",
    borderTop: "1px solid var(--color-border-divider)",
    background: "var(--color-surface-inset)",
    fontSize: 12, color: "var(--color-text-muted)",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Wordmark size={13}/>
      <span style={{ marginLeft: 4 }}>© 2026 · MPL-2.0</span>
    </div>
    <div style={{ display: "flex", gap: 20 }}>
      <a href="#" style={navLinkStyle}>Documentation</a>
      <a href="#" style={navLinkStyle}>Plugin SDK</a>
      <a href="#" style={navLinkStyle}>Changelog</a>
      <a href="#" style={navLinkStyle}>GitHub</a>
    </div>
  </footer>
);

window.V1ClassicHero = V1ClassicHero;
window.FooterStrip = FooterStrip;
window.navLinkStyle = navLinkStyle;

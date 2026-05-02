/* Variation 3 — "Live Demo"
 * Animated launcher dominates above-the-fold, minimal copy floating around it.
 * Centered, single-screen feel.
 */

const V3LiveDemo = () => (
  <div style={{
    width: 1280, minHeight: 820,
    background: "var(--color-surface)",
    fontFamily: "var(--font-sans)",
    color: "var(--color-text-primary)",
    position: "relative",
    overflow: "hidden",
  }}>
    {/* Top nav (very thin) */}
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "20px 48px", position: "absolute", top: 0, left: 0, right: 0, zIndex: 5,
    }}>
      <Wordmark size={16}/>
      <nav style={{ display: "flex", gap: 22, alignItems: "center" }}>
        <a href="#" style={navLinkStyle}>Plugins</a>
        <a href="#" style={navLinkStyle}>Developers</a>
        <a href="#" style={{ ...navLinkStyle, display: "inline-flex", gap: 6 }}>
          <BrandIcon name="github" size={14}/>GitHub
        </a>
      </nav>
    </header>

    {/* Soft warm radial bg */}
    <div style={{
      position: "absolute", inset: 0,
      background: "radial-gradient(circle at 50% 38%, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 55%)",
      pointerEvents: "none",
    }}/>

    {/* Floating annotations around the launcher */}
    <section style={{
      position: "relative", zIndex: 1,
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "120px 48px 40px",
    }}>
      <div className="eyebrow" style={{ color: "var(--color-accent)", marginBottom: 16 }}>
        Light · Find · Launch
      </div>
      <h1 style={{
        margin: 0, textAlign: "center",
        fontSize: 56, fontWeight: 600, letterSpacing: "-0.025em",
        lineHeight: 1.05, textWrap: "balance", maxWidth: 820,
      }}>
        One key. Whatever you're<br/>about to do, faster.
      </h1>
      <p style={{
        margin: "20px 0 56px", textAlign: "center",
        fontSize: 17, lineHeight: 1.5, color: "var(--color-text-secondary)",
        maxWidth: 580, textWrap: "pretty",
      }}>
        Watch it work. Type a query, run an action, install a sandboxed
        plugin — Torchsnap is the same window doing all of it.
      </p>

      {/* Launcher with annotations */}
      <div style={{ position: "relative", width: 720, display: "flex", justifyContent: "center" }}>
        <AnimatedLauncher width={640}/>

        {/* Left annotation: hotkey */}
        <Annotation side="left" top={-30} text="Global hotkey opens it from anywhere">
          <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
            <KeyCap>⌘</KeyCap><KeyCap>Space</KeyCap>
          </span>
        </Annotation>

        {/* Right annotation: result kinds */}
        <Annotation side="right" top={120} text="Apps · Files · Plugins · Actions — all one list">
          <HeroIcon name="cursor-arrow-rays" size={16} style={{ color: "var(--color-accent)" }}/>
        </Annotation>

        {/* Bottom annotation: keyboard footer */}
        <Annotation side="left" top={280} text="Footer hints adapt to the selected result">
          <HeroIcon name="bolt" size={16} style={{ color: "var(--color-accent)" }}/>
        </Annotation>
      </div>

      {/* Big CTA row */}
      <div style={{ display: "flex", gap: 12, marginTop: 56, alignItems: "center" }}>
        <PrimaryButton icon="arrow-down-tray">Download for macOS</PrimaryButton>
        <GhostButton icon="github">Star on GitHub</GhostButton>
        <span style={{ marginLeft: 8, fontSize: 12, color: "var(--color-text-muted)" }}>
          Free · MPL-2.0 · Alpha
        </span>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <PlatformPill os="mac" available/>
        <PlatformPill os="win" available={false}/>
        <PlatformPill os="linux" available={false}/>
      </div>
    </section>

    {/* Compact strip of three points */}
    <section style={{
      display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0,
      padding: "0 48px 60px", marginTop: 30,
    }}>
      {[
        { k: "01", title: "Open it", body: "Press the hotkey from any app. The window appears already focused." },
        { k: "02", title: "Type it", body: "Search apps, files, system actions, and any installed plugin in one ranked list." },
        { k: "03", title: "Send it", body: "Hit ↵. Or ⌘↵ for an action menu when you want options." },
      ].map((s, i) => (
        <div key={i} style={{
          padding: "32px 28px",
          borderLeft: i === 0 ? "1px solid var(--color-border-divider)" : "none",
          borderRight: "1px solid var(--color-border-divider)",
        }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-accent)", marginBottom: 8 }}>{s.k}</div>
          <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>{s.title}</h3>
          <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{s.body}</p>
        </div>
      ))}
    </section>

    <FooterStrip/>
  </div>
);

const Annotation = ({ side, top, text, children }) => (
  <div style={{
    position: "absolute",
    top, [side]: -200,
    width: 200,
    display: "flex", flexDirection: "column",
    alignItems: side === "left" ? "flex-end" : "flex-start",
    gap: 8,
    pointerEvents: "none",
  }}>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>{children}</div>
    <div style={{
      fontSize: 12, color: "var(--color-text-secondary)",
      textAlign: side === "left" ? "right" : "left",
      lineHeight: 1.4, maxWidth: 180,
    }}>{text}</div>
    {/* dotted line stub pointing inward */}
    <div style={{
      position: "absolute",
      [side]: -50, top: 8,
      width: 50, height: 1,
      borderTop: "1px dashed var(--color-border)",
    }}/>
  </div>
);

window.V3LiveDemo = V3LiveDemo;

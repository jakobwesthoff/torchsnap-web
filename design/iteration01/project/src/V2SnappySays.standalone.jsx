/* Variation 2 — "Snappy Says Hi"
 * Mascot-led. Big Snappy on the right, talkative copy on the left,
 * launcher tucked underneath. Friendly, brand-forward.
 */

const V2SnappySays = ({ snappyVariant = "original" }) => (
  <div style={{
    width: 1280, minHeight: 820,
    background: "var(--color-surface-sidebar)", /* warm cream */
    fontFamily: "var(--font-sans)",
    color: "var(--color-text-primary)",
    position: "relative",
    overflow: "hidden",
  }}>
    {/* parchment dot pattern overlay */}
    <div style={{
      position: "absolute", inset: 0, opacity: 0.5,
      backgroundImage: "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 14%, transparent) 1px, transparent 1.5px)",
      backgroundSize: "22px 22px",
      pointerEvents: "none",
      maskImage: "radial-gradient(ellipse at 80% 30%, black 30%, transparent 70%)",
      WebkitMaskImage: "radial-gradient(ellipse at 80% 30%, black 30%, transparent 70%)",
    }}/>

    {/* Top nav */}
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "22px 56px", position: "relative", zIndex: 1,
    }}>
      <Wordmark size={18}/>
      <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <a href="#" style={navLinkStyle}>Plugins</a>
        <a href="#" style={navLinkStyle}>For developers</a>
        <a href="#" style={navLinkStyle}>Snappy</a>
        <PrimaryButton icon="arrow-down-tray" style={{ padding: "8px 14px", fontSize: 13 }}>Download</PrimaryButton>
      </nav>
    </header>

    {/* Hero — speech-bubble style */}
    <section style={{
      display: "grid", gridTemplateColumns: "1.05fr 1fr",
      gap: 40, alignItems: "center",
      padding: "40px 56px 0",
      position: "relative", zIndex: 1,
    }}>
      <div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 12px",
          borderRadius: 999,
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          fontSize: 12, color: "var(--color-text-secondary)",
          marginBottom: 24,
        }}>
          <HeroIcon name="sparkles" size={14} style={{ color: "var(--color-accent)" }}/>
          Hi, I'm Snappy. I help you find things.
        </div>

        <h1 style={{
          margin: 0,
          fontSize: 72, fontWeight: 600, letterSpacing: "-0.03em",
          lineHeight: 0.98, color: "var(--color-text-primary)",
          textWrap: "balance",
        }}>
          A launcher<br/>
          with a little<br/>
          <span style={{
            background: "linear-gradient(to right, var(--color-accent), #ea580c)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>warmth.</span>
        </h1>
        <p style={{
          margin: "24px 0 0",
          fontSize: 18, lineHeight: 1.5,
          color: "var(--color-text-secondary)",
          maxWidth: 480, textWrap: "pretty",
        }}>
          Torchsnap opens with a keystroke and gets out of your way.
          Your apps, your files, a sandboxed plugin for whatever you're
          missing. Snappy's just along for the ride.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 32, alignItems: "center" }}>
          <PrimaryButton icon="arrow-down-tray">Download for macOS</PrimaryButton>
          <GhostButton icon="github">View on GitHub</GhostButton>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <PlatformPill os="mac" available/>
          <PlatformPill os="win" available={false}/>
          <PlatformPill os="linux" available={false}/>
        </div>
      </div>

      <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
        {/* Speech bubble pointing at Snappy */}
        <div style={{
          position: "absolute", left: 0, top: 60,
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: 16,
          padding: "12px 16px",
          fontSize: 13, color: "var(--color-text-primary)",
          boxShadow: "var(--shadow-card-2)",
          maxWidth: 220, lineHeight: 1.4,
          zIndex: 3,
        }}>
          <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginBottom: 4 }}>SNAPPY SAYS</div>
          Press <KeyCap>⌘</KeyCap> <KeyCap>Space</KeyCap> and just start typing. I'll figure it out.
          <span style={{
            position: "absolute", right: -8, top: 24,
            width: 14, height: 14,
            background: "var(--color-surface)",
            borderRight: "1px solid var(--color-border)",
            borderTop: "1px solid var(--color-border)",
            transform: "rotate(45deg)",
          }}/>
        </div>
        <img
          src={(window.__resources && window.__resources["mascot-" + snappyVariant]) || `assets/mascots/snappy-${snappyVariant}-384.webp`}
          alt={`Snappy — ${snappyVariant}`}
          style={{
            width: 460, height: 460, objectFit: "contain",
            filter: "drop-shadow(0 24px 48px rgba(249,115,22,0.18))",
          }}
        />
      </div>
    </section>

    {/* Launcher tucked under */}
    <section style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "0 56px 60px", marginTop: -40,
      position: "relative", zIndex: 0,
    }}>
      <AnimatedLauncher width={620}/>
      <div style={{ marginTop: 14, fontSize: 12, color: "var(--color-text-muted)" }}>
        ↑↓ to move · ↵ to run · ⌘, for settings
      </div>
    </section>

    {/* Three-up: who Torchsnap is for */}
    <section style={{
      display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20, padding: "20px 56px 60px",
      position: "relative", zIndex: 1,
    }}>
      {[
        { icon: "rocket-launch", title: "If you live on the keyboard", body: "Replace the Dock, the Start menu, and half your muscle memory." },
        { icon: "puzzle-piece", title: "If you tinker", body: "Drop a .torchsnap file into the launcher. New capability — same window." },
        { icon: "code-bracket", title: "If you build", body: "WASM SDK in any wasm32-wasip2 language. Ship a plugin in an afternoon." },
      ].map((f, i) => (
        <div key={i} style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: 12,
          padding: 20,
          boxShadow: "var(--shadow-card-1)",
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "color-mix(in srgb, var(--color-accent) 12%, transparent)",
            color: "var(--color-accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 12,
          }}><HeroIcon name={f.icon} size={18}/></div>
          <h3 style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 600 }}>{f.title}</h3>
          <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{f.body}</p>
        </div>
      ))}
    </section>

    <FooterStrip/>
  </div>
);

window.V2SnappySays = V2SnappySays;

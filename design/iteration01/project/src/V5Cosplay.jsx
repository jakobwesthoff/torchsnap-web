/* Variation 5 — "Cosplay Carousel"
 * Adventurous: Snappy variants rotate through the right side as a
 * marquee. Editorial split layout. Heavy on personality.
 */

const COSPLAY_VARIANTS = [
  { id: "original", name: "Original" },
  { id: "cloak-and-torch", name: "Cloak & Torch" },
  { id: "astronaut", name: "Astronaut" },
  { id: "dashing-captain", name: "Dashing Captain" },
  { id: "dino-kigurumi", name: "Dino Kigurumi" },
  { id: "deep-sea-diver", name: "Deep Sea Diver" },
  { id: "banana-goggle-minion", name: "Banana Minion" },
];

const V5Cosplay = () => {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % COSPLAY_VARIANTS.length), 2400);
    return () => clearInterval(t);
  }, []);
  const cur = COSPLAY_VARIANTS[idx];

  return (
    <div style={{
      width: 1280, minHeight: 880,
      background: "var(--color-surface)",
      fontFamily: "var(--font-sans)",
      color: "var(--color-text-primary)",
      position: "relative",
      overflow: "hidden",
      display: "grid",
      gridTemplateColumns: "1.05fr 1fr",
    }}>
      {/* LEFT — content side */}
      <div style={{
        padding: "32px 56px 56px",
        display: "flex", flexDirection: "column",
        position: "relative", zIndex: 2,
      }}>
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 80,
        }}>
          <Wordmark size={18}/>
          <nav style={{ display: "flex", gap: 22 }}>
            <a href="#" style={navLinkStyle}>Plugins</a>
            <a href="#" style={navLinkStyle}>Developers</a>
            <a href="#" style={navLinkStyle}>GitHub</a>
          </nav>
        </header>

        <div className="eyebrow" style={{ color: "var(--color-accent)", marginBottom: 16 }}>
          Light · Find · Launch
        </div>
        <h1 style={{
          margin: 0, fontSize: 76, fontWeight: 600, letterSpacing: "-0.03em",
          lineHeight: 0.95, textWrap: "balance",
        }}>
          Your launcher.<br/>
          <span style={{ fontStyle: "italic", color: "var(--color-accent)" }}>Many faces.</span>
        </h1>
        <p style={{
          margin: "24px 0 0", fontSize: 17, lineHeight: 1.55,
          color: "var(--color-text-secondary)",
          maxWidth: 480, textWrap: "pretty",
        }}>
          Torchsnap is a keyboard launcher with a sandboxed plugin
          system and a torch-shaped mascot named Snappy who shows up
          in different outfits because the world is grim enough already.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 40, alignItems: "center" }}>
          <PrimaryButton icon="arrow-down-tray">Download for macOS</PrimaryButton>
          <GhostButton icon="github">GitHub</GhostButton>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <PlatformPill os="mac" available/>
          <PlatformPill os="win" available={false}/>
          <PlatformPill os="linux" available={false}/>
        </div>

        <div style={{ marginTop: "auto", paddingTop: 60 }}>
          <AnimatedLauncher width={520}/>
        </div>
      </div>

      {/* RIGHT — Snappy stage */}
      <div style={{
        position: "relative",
        background: "linear-gradient(160deg, color-mix(in srgb, var(--color-accent) 18%, var(--color-surface-sidebar)), var(--color-surface-sidebar) 60%)",
        borderLeft: "1px solid var(--color-border)",
        overflow: "hidden",
      }}>
        {/* Torch-flame backdrop */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--color-accent) 28%, transparent), transparent 55%)",
          pointerEvents: "none",
        }}/>
        {/* Concentric rings */}
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{
            position: "absolute",
            top: "38%", left: "50%",
            width: 280 + i * 120, height: 280 + i * 120,
            transform: "translate(-50%, -50%)",
            border: "1px dashed color-mix(in srgb, var(--color-accent) 25%, transparent)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}/>
        ))}

        {/* The current Snappy */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 460, height: 460,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <img
            key={cur.id}
            src={`assets/mascots/snappy-${cur.id}-384.webp`}
            alt={`Snappy — ${cur.name}`}
            className="ts-cosplay-img"
            style={{
              width: 420, height: 420, objectFit: "contain",
              filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.18))",
            }}
          />
        </div>

        {/* Cosplay name card */}
        <div style={{
          position: "absolute", bottom: 40, left: "50%",
          transform: "translateX(-50%)",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: 12,
          padding: "12px 18px",
          boxShadow: "var(--shadow-card-2)",
          display: "flex", flexDirection: "column", alignItems: "center",
          minWidth: 240,
        }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 11,
            color: "var(--color-text-muted)", letterSpacing: "0.06em",
          }}>
            COSPLAY · {String(idx + 1).padStart(2, "0")} / {String(COSPLAY_VARIANTS.length).padStart(2, "0")}
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>{cur.name}</div>
        </div>

        {/* Tiny dot pagination */}
        <div style={{
          position: "absolute", bottom: 16, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", gap: 6,
        }}>
          {COSPLAY_VARIANTS.map((_, i) => (
            <span key={i} style={{
              width: i === idx ? 16 : 6, height: 6, borderRadius: 3,
              background: i === idx ? "var(--color-accent)" : "color-mix(in srgb, var(--color-accent) 25%, transparent)",
              transition: "width .35s",
            }}/>
          ))}
        </div>

        {/* Editorial pull-quote */}
        <div style={{
          position: "absolute", top: 32, right: 32,
          maxWidth: 220, fontSize: 12, color: "var(--color-text-secondary)",
          textAlign: "right", lineHeight: 1.5,
        }}>
          <div className="eyebrow" style={{ color: "var(--color-accent)", marginBottom: 6 }}>OPT-IN</div>
          A different Snappy each time the launcher opens — or pick one
          and keep it. Or hide him entirely.
        </div>
      </div>

      {/* Bottom strip — features */}
      <div style={{
        gridColumn: "1 / -1",
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        borderTop: "1px solid var(--color-border)",
      }}>
        {[
          ["Hotkey", "⌘ Space"],
          ["Runtime", "wasmtime"],
          ["Plugins", ".torchsnap"],
          ["License", "MPL-2.0"],
        ].map(([k, v], i) => (
          <div key={i} style={{
            padding: "20px 28px",
            borderRight: i < 3 ? "1px solid var(--color-border)" : "none",
          }}>
            <div className="eyebrow" style={{ color: "var(--color-text-muted)", marginBottom: 4 }}>{k}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--color-text-primary)" }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
        <FooterStrip/>
      </div>
    </div>
  );
};

window.V5Cosplay = V5Cosplay;

/* Variation 01b (full page) — extended Classic Hero with all the
 * supporting sections a launch page needs:
 *  - Hero (unchanged from 01b: random Snappy auto-cycles on the launcher)
 *  - Hotkey strip
 *  - Features grid (6-up, with one "spanning" tile that doubles as a
 *    visual anchor)
 *  - Plugins section with left/right interleaved rows (3 plugins,
 *    image alternating sides)
 *  - For-developers section (code snippet + capability bullets)
 *  - Final CTA band
 *  - Footer
 *
 * Reuses every bit of the existing 01b hero so the file stays the
 * single source of truth for the chosen direction.
 */

const V1B_FULL_COSPLAY = [
  { id: "original",             name: "Original" },
  { id: "cloak-and-torch",      name: "Cloak & Torch" },
  { id: "astronaut",            name: "Astronaut" },
  { id: "dashing-captain",      name: "Dashing Captain" },
  { id: "dino-kigurumi",        name: "Dino Kigurumi" },
  { id: "deep-sea-diver",       name: "Deep Sea Diver" },
  { id: "banana-goggle-minion", name: "Banana Minion" },
];

const V1bFull = ({ snappyVariant }) => {
  const [variant, setVariant] = React.useState(() => {
    if (snappyVariant) return snappyVariant;
    return V1B_FULL_COSPLAY[Math.floor(Math.random() * V1B_FULL_COSPLAY.length)].id;
  });
  const controlled = !!snappyVariant;
  React.useEffect(() => { if (snappyVariant) setVariant(snappyVariant); }, [snappyVariant]);
  React.useEffect(() => {
    if (controlled) return;
    const t = setInterval(() => {
      setVariant(prev => {
        const i = Math.max(0, V1B_FULL_COSPLAY.findIndex(v => v.id === prev));
        return V1B_FULL_COSPLAY[(i + 1) % V1B_FULL_COSPLAY.length].id;
      });
    }, 2600);
    return () => clearInterval(t);
  }, [controlled]);

  return (
    <div style={{
      width: 1280,
      background: "var(--color-surface)",
      fontFamily: "var(--font-sans)",
      color: "var(--color-text-primary)",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* ── Header ─────────────────────────────────── */}
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

      {/* ── Hero ───────────────────────────────────── */}
      <section style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 64, alignItems: "start",
        padding: "80px 64px 60px",
      }}>
        <div>
          <div className="eyebrow" style={{
            color: "var(--color-accent)", marginBottom: 20,
            fontSize: 14, fontWeight: 700, letterSpacing: "0.18em",
          }}>Light · Find · Launch</div>
          <h1 style={{
            margin: 0, fontSize: 64, fontWeight: 600, letterSpacing: "-0.025em",
            lineHeight: 1.02, color: "var(--color-text-primary)", textWrap: "balance",
          }}>
            Strike a key,<br/>
            <span style={{ color: "var(--color-accent)" }}>light the way.</span>
          </h1>
          <p style={{
            margin: "24px 0 0", fontSize: 18, lineHeight: 1.55,
            color: "var(--color-text-secondary)", maxWidth: 520, textWrap: "pretty",
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
            marginTop: 14, fontSize: 12, color: "var(--color-text-muted)",
          }}>
            <span>Free, forever.</span>
            <span aria-hidden="true" style={{ opacity: 0.5 }}>·</span>
            <a href="#" style={{
              color: "var(--color-text-muted)", textDecoration: "none",
              borderBottom: "1px dashed var(--color-border)",
            }}>MPL-2.0 licensed</a>
          </div>
        </div>

        <div style={{ position: "relative", height: 580 }}>
          <div style={{ position: "absolute", top: 90, left: "50%", transform: "translateX(-50%)" }}>
            <AnimatedLauncher
              width={520}
              queries={DEMO_QUERIES_SLOW}
              mascotVariant={variant}
              mascotSize={170}
            />
          </div>
        </div>
      </section>

      {/* ── Hotkey strip ──────────────────────────── */}
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

      {/* ── Mascot circus (just-for-fun marketing) ─ */}
      <SnappyCircus/>

      {/* ── Features ─────────────────────────────── */}
      <section id="features" style={{
        padding: "120px 64px 140px",
        borderTop: "1px solid var(--color-border-divider)",
        background: "var(--color-surface-inset)",
        position: "relative",
      }}>
        <div style={{ maxWidth: 800, marginBottom: 80 }}>
          <SectionHead
            eyebrow="What's in the box"
            title="Three things. Done with conviction."
            sub="No feature checklist. No matrix. Just three opinions about what a launcher should be — and a refusal to be anything else."
          />
        </div>
        <FeatureManifesto/>
      </section>

      {/* ── Plugins (grand gallery) ──────────────── */}
      <section id="plugins" style={{
        padding: "120px 0 140px",
        borderTop: "1px solid var(--color-border-divider)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Faint accent glow behind the section */}
        <div aria-hidden="true" style={{
          position: "absolute",
          top: -200, left: "50%",
          width: 1200, height: 600,
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse at center, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 70%)",
          pointerEvents: "none",
        }}/>

        <div style={{ padding: "0 64px", position: "relative" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr auto",
            alignItems: "end", gap: 48, marginBottom: 80,
          }}>
            <div style={{ maxWidth: 720 }}>
              <div className="eyebrow" style={{
                color: "var(--color-accent)", marginBottom: 16,
                fontSize: 13, fontWeight: 700, letterSpacing: "0.18em",
              }}>The plugin universe</div>
              <h2 style={{
                margin: 0,
                fontSize: 72, fontWeight: 600, letterSpacing: "-0.03em",
                lineHeight: 0.98, textWrap: "balance",
              }}>
                Plug in <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>anything.</span><br/>
                Trust it like a built-in.
              </h2>
            </div>
            <div style={{
              fontSize: 14, lineHeight: 1.55, color: "var(--color-text-secondary)",
              maxWidth: 320, textWrap: "pretty",
            }}>
              Sandboxed WebAssembly with declared capabilities. A plugin can't touch your clipboard, your network, or your files unless it asked — and you said yes.
            </div>
          </div>
        </div>

        {/* Hero plugin — full bleed */}
        <PluginHero plugin={PLUGIN_ROWS[0]}/>

        {/* Two stacked plugin cards */}
        <div style={{
          padding: "0 64px", marginTop: 64,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32,
        }}>
          <PluginCard plugin={PLUGIN_ROWS[1]}/>
          <PluginCard plugin={PLUGIN_ROWS[2]}/>
        </div>

        {/* Marquee of plugin names — suggests the wider universe */}
        <PluginMarquee/>

        <div style={{ padding: "0 64px", marginTop: 56, display: "flex", justifyContent: "center" }}>
          <PrimaryButton icon="puzzle-piece">Browse the plugin directory</PrimaryButton>
        </div>
      </section>

      {/* ── For developers ───────────────────────── */}
      <section id="developers" style={{
        padding: "96px 64px",
        borderTop: "1px solid var(--color-border-divider)",
        background: "var(--color-surface-inset)",
      }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.1fr",
          gap: 80, alignItems: "center",
        }}>
          <div>
            <SectionHead
              eyebrow="For developers"
              title="Ship a plugin in an afternoon."
              sub="Any language that compiles to wasm32-wasip2 works. The SDK gives you results, actions, and a typed manifest for every capability you ask for."
            />
            <ul style={{
              margin: "32px 0 0", padding: 0, listStyle: "none",
              display: "flex", flexDirection: "column", gap: 14,
            }}>
              {[
                "Typed Rust, Go, JS or Zig SDKs — pick your stack.",
                "Capability manifest declares clipboard, fs, network up front.",
                "Hot-reload during dev; signed bundle for release.",
                "Publish a single .torchsnap archive to the directory.",
              ].map((line, i) => (
                <li key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  fontSize: 15, lineHeight: 1.5, color: "var(--color-text-secondary)",
                }}>
                  <span style={{
                    flex: "0 0 auto", marginTop: 4,
                    width: 18, height: 18, borderRadius: 999,
                    background: "color-mix(in srgb, var(--color-accent) 14%, transparent)",
                    color: "var(--color-accent)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
              <PrimaryButton icon="book-open">Read the SDK docs</PrimaryButton>
              <GhostButton icon="code-bracket">Starter template</GhostButton>
            </div>
          </div>

          <CodeMockup/>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────── */}
      <section id="download" style={{
        padding: "96px 64px 88px",
        borderTop: "1px solid var(--color-border-divider)",
        textAlign: "center",
        position: "relative",
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{
            margin: 0, fontSize: 48, fontWeight: 600, letterSpacing: "-0.025em",
            lineHeight: 1.05, textWrap: "balance",
          }}>
            Try it. <span style={{ color: "var(--color-accent)" }}>One keystroke from now.</span>
          </h2>
          <p style={{
            margin: "20px auto 0", maxWidth: 540,
            fontSize: 17, lineHeight: 1.55,
            color: "var(--color-text-secondary)", textWrap: "pretty",
          }}>
            macOS today, Windows and Linux on the way. Free, open source, and very small.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 36, justifyContent: "center" }}>
            <PrimaryButton icon="arrow-down-tray">Download for macOS</PrimaryButton>
            <GhostButton icon="github">Star on GitHub</GhostButton>
          </div>
          <div style={{
            marginTop: 22, fontSize: 12, color: "var(--color-text-muted)",
          }}>Universal binary · Apple Silicon &amp; Intel · 14 MB</div>
        </div>
      </section>

      <FooterStrip/>
    </div>
  );
};

// ── Snappy cast — trading-card grid ──────────
// 4×2 grid, no rotation, no overlap. Each card is a "trading card"
// portrait of one Snappy: tinted spotlight backdrop, name plate,
// number ("No. 014"), and a one-liner role. Last cell is the
// werewolf "next full moon" mystery card. Headline avoids fixed counts
// — the closet keeps growing.
const SNAPPY_CAST = [
  { id: "original",             name: "Snappy",            no: "001", title: "Patient zero",                body: "Started the whole closet. Refuses to wear shoes.",          tint: 38 /* warm yellow */ },
  { id: "cloak-and-torch",      name: "Snappy the Bold",   no: "008", title: "Carries the torch",           body: "Knows every dark corner of your filesystem by name.",        tint: 18 /* burnt orange */ },
  { id: "astronaut",            name: "Major Snap",        no: "021", title: "Far-flung file finder",       body: "Once filed an expense report from low orbit.",               tint: 230 /* indigo */ },
  { id: "dashing-captain",      name: "Captain Snappy",    no: "034", title: "Master of the open tab",      body: "Sails the seven monitors. Flag never matches the ship.",     tint: 200 /* cyan */ },
  { id: "dino-kigurumi",        name: "Dino Snap",         no: "057", title: "Extinction-proof shortcut",   body: "Outlived three launcher trends and one office plant.",       tint: 140 /* leaf */ },
  { id: "deep-sea-diver",       name: "Snappy McFathom",   no: "082", title: "Excavator of lost paths",     body: "Found the file you swore was deleted. Didn't peek. Promise.", tint: 195 /* deep teal */ },
  { id: "banana-goggle-minion", name: "Bananappy",         no: "119", title: "Bringer of mild chaos",       body: "Mainly here for snacks. Surprisingly good at fuzzy match.",  tint: 50 /* banana */ },
];

const SnappyCircus = () => (
  <section id="cast" style={{
    position: "relative",
    padding: "120px 0 140px",
    borderTop: "1px solid var(--color-border-divider)",
    overflow: "hidden",
    background: "var(--color-surface)",
  }}>
    {/* Header — centered, like the original */}
    <div style={{ padding: "0 64px", textAlign: "center", marginBottom: 80, position: "relative" }}>
      <div className="eyebrow" style={{
        color: "var(--color-accent)", marginBottom: 18,
        fontSize: 13, fontWeight: 700, letterSpacing: "0.22em",
      }}>★ MEET THE CAST ★</div>
      <h2 style={{
        margin: 0,
        fontSize: 84, fontWeight: 600, letterSpacing: "-0.035em",
        lineHeight: 0.95, textWrap: "balance",
      }}>
        One Snappy.<br/>
        <span style={{
          color: "var(--color-accent)", fontStyle: "italic", fontWeight: 500,
        }}>more&nbsp;outfits than&nbsp;weekdays.</span>
      </h2>
      <p style={{
        margin: "24px auto 0", maxWidth: 580,
        fontSize: 18, lineHeight: 1.5,
        color: "var(--color-text-secondary)", textWrap: "pretty",
      }}>
        Captain on Monday, astronaut on Tuesday, banana minion when nobody's looking. Here's a slice of the wardrobe.
      </p>
    </div>

    {/* Bento sticker-wall: mixed cell sizes, no overlap, varied rhythm.
        Grid: 12 cols × ~5 rows of 220px. Each card claims its own footprint.
        Werewolf is the wide finale at the bottom. */}
    <div style={{
      padding: "0 56px",
      maxWidth: 1280, margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gridAutoRows: "220px",
      gap: 20,
      position: "relative",
    }}>
      {/* Hero card — Captain (largest, top-left) */}
      <BentoCard s={SNAPPY_CAST.find(x => x.id === "dashing-captain")}
        size="hero"
        style={{ gridColumn: "1 / span 5", gridRow: "1 / span 2" }}/>

      {/* Astronaut — tall portrait */}
      <BentoCard s={SNAPPY_CAST.find(x => x.id === "astronaut")}
        size="tall"
        style={{ gridColumn: "6 / span 3", gridRow: "1 / span 2" }}/>

      {/* OG Snappy — square */}
      <BentoCard s={SNAPPY_CAST.find(x => x.id === "original")}
        size="square"
        style={{ gridColumn: "9 / span 4", gridRow: "1 / span 1" }}/>

      {/* Banana minion — square */}
      <BentoCard s={SNAPPY_CAST.find(x => x.id === "banana-goggle-minion")}
        size="square"
        style={{ gridColumn: "9 / span 4", gridRow: "2 / span 1" }}/>

      {/* Cloak & Torch — wide landscape */}
      <BentoCard s={SNAPPY_CAST.find(x => x.id === "cloak-and-torch")}
        size="wide"
        style={{ gridColumn: "1 / span 4", gridRow: "3 / span 1" }}/>

      {/* Dino — square */}
      <BentoCard s={SNAPPY_CAST.find(x => x.id === "dino-kigurumi")}
        size="square"
        style={{ gridColumn: "5 / span 4", gridRow: "3 / span 1" }}/>

      {/* Diver — square */}
      <BentoCard s={SNAPPY_CAST.find(x => x.id === "deep-sea-diver")}
        size="square"
        style={{ gridColumn: "9 / span 4", gridRow: "3 / span 1" }}/>

      {/* Werewolf finale — full-bleed wide */}
      <WerewolfCard
        style={{ gridColumn: "1 / span 12", gridRow: "4 / span 1" }}/>
    </div>

    {/* Footer line */}
    <div style={{
      marginTop: 56, textAlign: "center",
      fontFamily: "var(--font-mono)", fontSize: 12,
      color: "var(--color-text-muted)", letterSpacing: "0.12em",
    }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 32, height: 1, background: "currentColor", opacity: 0.5 }}/>
        AND&nbsp;PLENTY&nbsp;MORE&nbsp;ON&nbsp;THE&nbsp;HANGER
        <span style={{ width: 32, height: 1, background: "currentColor", opacity: 0.5 }}/>
      </span>
    </div>
  </section>
);

// Bento card — variable size. The `size` prop tunes which parts get
// emphasized: hero gets a giant portrait + huge name; tall gets a tall
// portrait + name+role stacked; square is the standard; wide is a
// landscape with the portrait on the left and text on the right.
const BentoCard = ({ s, size = "square", style }) => {
  const isHero  = size === "hero";
  const isWide  = size === "wide";
  const isTall  = size === "tall";

  // Wide: side-by-side layout
  if (isWide) {
    return (
      <article style={{
        position: "relative",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 18,
        padding: 14,
        boxShadow: "0 1px 0 var(--color-border-divider) inset, 0 12px 32px -18px rgba(0,0,0,0.25)",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: 18,
        alignItems: "center",
        ...style,
      }}>
        <CastNo no={s.no}/>
        <Portrait s={s} style={{ width: 168, height: 168, borderRadius: 12 }}/>
        <div style={{ paddingRight: 14 }}>
          <div className="cast-role">{s.title}</div>
          <h3 style={{ margin: "4px 0 8px", fontSize: 24, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.1 }}>{s.name}</h3>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)", textWrap: "pretty" }}>{s.body}</p>
        </div>
      </article>
    );
  }

  // Hero / Tall / Square: stacked layout, varying portrait sizes
  return (
    <article style={{
      position: "relative",
      background: "var(--color-surface)",
      border: "1px solid var(--color-border)",
      borderRadius: 18,
      padding: 16,
      boxShadow: "0 1px 0 var(--color-border-divider) inset, 0 12px 32px -18px rgba(0,0,0,0.25)",
      overflow: "hidden",
      display: "flex", flexDirection: "column",
      gap: isHero ? 18 : 12,
      ...style,
    }}>
      <CastNo no={s.no}/>
      <Portrait s={s} style={{ flex: 1, minHeight: 0, borderRadius: 12 }}/>
      <div>
        <div className="cast-role" style={isHero ? { fontSize: 11 } : undefined}>{s.title}</div>
        <h3 style={{
          margin: "4px 0 8px",
          fontSize: isHero ? 32 : 22,
          fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.05,
        }}>{s.name}</h3>
        {(isHero || isTall) && (
          <p style={{
            margin: 0,
            fontSize: isHero ? 15 : 13, lineHeight: 1.5,
            color: "var(--color-text-secondary)", textWrap: "pretty",
            maxWidth: 520,
          }}>{s.body}</p>
        )}
      </div>
    </article>
  );
};

// Catalog number top-right
const CastNo = ({ no }) => (
  <div style={{
    position: "absolute", top: 14, right: 16,
    fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
    letterSpacing: "0.14em",
    color: "var(--color-text-muted)",
    zIndex: 2,
  }}>№&nbsp;{no}</div>
);

// Tinted portrait with spotlight + drop-shadow
const Portrait = ({ s, style }) => (
  <div style={{
    background: `
      radial-gradient(ellipse 70% 90% at 50% 110%,
        oklch(0.78 0.18 ${s.tint}) 0%,
        oklch(0.92 0.08 ${s.tint}) 45%,
        oklch(0.97 0.03 ${s.tint}) 100%)
    `,
    display: "flex", alignItems: "flex-end", justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    ...style,
  }}>
    <div aria-hidden="true" style={{
      position: "absolute", inset: 0,
      background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,0.45), transparent 60%)",
    }}/>
    <img
      src={`assets/mascots/snappy-${s.id}-384.webp`}
      alt={s.name}
      style={{
        maxHeight: "94%", maxWidth: "94%",
        objectFit: "contain",
        filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.22))",
        position: "relative", zIndex: 1,
      }}
    />
  </div>
);

// Werewolf finale — wide horizontal "next drop" card with moonlit
// scene on the right and giant tease copy on the left.
const WerewolfCard = ({ style }) => (
  <article style={{
    position: "relative",
    border: "1px dashed color-mix(in srgb, oklch(0.95 0.18 80) 35%, transparent)",
    borderRadius: 18,
    padding: 24,
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
    alignItems: "stretch",
    background: `linear-gradient(180deg, oklch(0.22 0.04 270) 0%, oklch(0.14 0.05 270) 100%)`,
    color: "rgba(255,255,255,0.92)",
    ...style,
  }}>
    {/* Catalog ??? */}
    <div style={{
      position: "absolute", top: 16, right: 18,
      fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700,
      letterSpacing: "0.16em", color: "rgba(255,255,255,0.55)",
    }}>№&nbsp;???</div>

    {/* Left: copy */}
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 14, paddingLeft: 16 }}>
      <div style={{
        display: "inline-flex", alignSelf: "flex-start", gap: 8, alignItems: "center",
        padding: "5px 12px",
        borderRadius: 999,
        background: "color-mix(in srgb, oklch(0.95 0.18 80) 18%, transparent)",
        color: "oklch(0.92 0.18 85)",
        fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
        letterSpacing: "0.18em",
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "oklch(0.92 0.18 85)", boxShadow: "0 0 10px oklch(0.92 0.18 85)" }}/>
        WHEN&nbsp;THE&nbsp;SKY&nbsp;GOES&nbsp;SILVER
      </div>
      <h3 style={{
        margin: 0, fontSize: 44, fontWeight: 600, letterSpacing: "-0.025em",
        lineHeight: 1.0, color: "rgba(255,255,255,0.97)", textWrap: "balance",
      }}>Snappy&nbsp;the&nbsp;<span style={{ color: "oklch(0.92 0.18 85)", fontStyle: "italic", fontWeight: 500 }}>…howler.</span></h3>
      <p style={{
        margin: 0, maxWidth: 460,
        fontSize: 15, lineHeight: 1.5,
        color: "rgba(255,255,255,0.7)", textWrap: "pretty",
      }}>
        Something hairy is coming to the closet. We won't say more — only that you'll know when the sky goes silver.
      </p>
    </div>

    {/* Right: moonlit scene */}
    <div style={{
      position: "relative",
      borderRadius: 12,
      overflow: "hidden",
      background: `
        radial-gradient(ellipse 50% 50% at 78% 28%, rgba(255,240,200,0.85), transparent 38%),
        radial-gradient(ellipse 90% 60% at 50% 110%, oklch(0.30 0.08 270), oklch(0.16 0.06 270) 70%)
      `,
    }}>
      {/* Moon */}
      <svg aria-hidden="true" viewBox="0 0 100 100" style={{
        position: "absolute", top: "16%", right: "14%",
        width: 90, height: 90,
        filter: "drop-shadow(0 0 22px rgba(255,240,200,0.6))",
      }}>
        <defs>
          <mask id="moonMaskWide">
            <rect width="100" height="100" fill="black"/>
            <circle cx="50" cy="50" r="36" fill="white"/>
            <circle cx="64" cy="42" r="32" fill="black"/>
          </mask>
        </defs>
        <rect width="100" height="100" fill="oklch(0.97 0.06 90)" mask="url(#moonMaskWide)"/>
      </svg>
      {/* Stars */}
      {[[12, 18], [22, 36], [10, 62], [70, 70], [50, 82], [86, 50], [40, 14]].map(([x, y], i) => (
        <span key={i} aria-hidden="true" style={{
          position: "absolute", left: `${x}%`, top: `${y}%`,
          width: 3, height: 3, borderRadius: 999,
          background: "rgba(255,255,255,0.9)",
          boxShadow: "0 0 6px rgba(255,255,255,0.8)",
        }}/>
      ))}
      {/* Mountains silhouette */}
      <svg aria-hidden="true" viewBox="0 0 400 120" preserveAspectRatio="none" style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        width: "100%", height: "55%",
      }}>
        <path d="M0 120 L 0 80 L 50 50 L 110 90 L 160 60 L 220 100 L 270 70 L 330 95 L 400 65 L 400 120 Z"
          fill="oklch(0.12 0.04 270)"/>
        <path d="M0 120 L 0 100 L 60 85 L 130 110 L 200 92 L 270 108 L 340 95 L 400 105 L 400 120 Z"
          fill="oklch(0.08 0.03 270)"/>
      </svg>
      {/* Howling silhouette, anchored bottom-left of the panel */}
      <svg aria-hidden="true" viewBox="0 0 200 200" style={{
        position: "absolute", left: "8%", bottom: 0,
        height: "85%", width: "auto",
        filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.55))",
      }}>
        <path
          d="M100 28
             C 78 28 60 46 60 70
             C 60 82 64 90 70 98
             L 58 132
             C 56 144 62 156 76 158
             L 124 158
             C 138 156 144 144 142 132
             L 130 98
             C 136 90 140 82 140 70
             C 140 46 122 28 100 28 Z"
          fill="oklch(0.06 0.03 270)"
        />
        <path d="M68 36 L 74 10 L 88 38 Z" fill="oklch(0.06 0.03 270)"/>
        <path d="M132 36 L 126 10 L 112 38 Z" fill="oklch(0.06 0.03 270)"/>
        <circle cx="86" cy="74" r="3.5" fill="oklch(0.95 0.18 80)"/>
        <circle cx="114" cy="74" r="3.5" fill="oklch(0.95 0.18 80)"/>
        <ellipse cx="100" cy="96" rx="5" ry="7" fill="oklch(0.10 0.03 270)" stroke="oklch(0.40 0.04 270)" strokeWidth="1"/>
      </svg>
    </div>
  </article>
);

// Cast role label — used by all bento cards
const _castStyles = `
.cast-role {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
}
`;
if (typeof document !== "undefined" && !document.getElementById("__cast_styles")) {
  const tag = document.createElement("style");
  tag.id = "__cast_styles";
  tag.textContent = _castStyles;
  document.head.appendChild(tag);
}


// Three large statements. Each is a slab with a giant tracked-out
// numeral, a punchy headline, a supporting sentence, and a small
// visual anchor on the right (key combo / lock icon / fade-out lines).
const MANIFESTO_ITEMS = [
  {
    n: "01",
    kicker: "Speed",
    title: "From thought to result in 80 milliseconds.",
    body: "One global hotkey. The window appears already focused, ranking results before your finger leaves the key. Esc and it's gone — no menu bar, no dock, no afterimage.",
    visual: "speed",
  },
  {
    n: "02",
    kicker: "Trust",
    title: "Nothing leaves your machine until you say so.",
    body: "Every plugin is a sandboxed WebAssembly bundle with a written-down capability list. Clipboard, filesystem, network — each one is opt-in, revocable, and visible at a glance.",
    visual: "trust",
  },
  {
    n: "03",
    kicker: "Yours",
    title: "Theme it, extend it, ship your own plugin tonight.",
    body: "Any language that compiles to wasm32-wasip2. A typed SDK. A directory that's a folder of files, not a marketplace. Bring your own keys, bindings, themes, and tools.",
    visual: "yours",
  },
];

const FeatureManifesto = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
    {MANIFESTO_ITEMS.map((m, i) => (
      <article key={m.n} style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 56,
        alignItems: "center",
        padding: "44px 48px",
        borderRadius: 20,
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-card-1)",
      }}>
        {/* Numeral */}
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: 14, fontWeight: 600,
          letterSpacing: "0.2em",
          color: "var(--color-accent)",
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          alignSelf: "stretch",
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <span>{m.n}</span>
          <span style={{
            display: "inline-block",
            width: 1, flex: 1,
            background: "color-mix(in srgb, var(--color-accent) 35%, transparent)",
          }}/>
          <span style={{
            color: "var(--color-text-muted)",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>{m.kicker}</span>
        </div>

        {/* Statement */}
        <div style={{ minWidth: 0 }}>
          <h3 style={{
            margin: 0,
            fontSize: 40, fontWeight: 600, letterSpacing: "-0.025em",
            lineHeight: 1.1, textWrap: "balance",
          }}>{m.title}</h3>
          <p style={{
            margin: "16px 0 0", maxWidth: 620,
            fontSize: 16, lineHeight: 1.55,
            color: "var(--color-text-secondary)", textWrap: "pretty",
          }}>{m.body}</p>
        </div>

        {/* Visual anchor */}
        <ManifestoVisual kind={m.visual}/>
      </article>
    ))}
  </div>
);

const ManifestoVisual = ({ kind }) => {
  if (kind === "speed") {
    // Big ⌘+Space combo, tilted
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        transform: "rotate(-4deg)", padding: "0 8px",
      }}>
        <KeyCap size="lg">⌘</KeyCap>
        <KeyCap size="lg">Space</KeyCap>
      </div>
    );
  }
  if (kind === "trust") {
    // Capability list mini-card
    return (
      <div style={{
        padding: 14, borderRadius: 12,
        border: "1px solid var(--color-border)",
        background: "var(--color-surface-inset)",
        fontFamily: "var(--font-mono)", fontSize: 11,
        color: "var(--color-text-secondary)",
        minWidth: 200,
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
          color: "var(--color-text-muted)", textTransform: "uppercase",
          marginBottom: 8,
        }}>capabilities</div>
        {[
          { name: "clipboard", on: true },
          { name: "fs.read", on: true },
          { name: "fs.write", on: false },
          { name: "network", on: false },
        ].map(c => (
          <div key={c.name} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "3px 0",
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: 999,
              background: c.on ? "var(--color-accent)" : "var(--color-border)",
            }}/>
            <span style={{ color: c.on ? "var(--color-text-primary)" : "var(--color-text-muted)" }}>
              {c.name}
            </span>
            <span style={{
              marginLeft: "auto", fontSize: 9,
              color: c.on ? "var(--color-accent)" : "var(--color-text-muted)",
            }}>{c.on ? "ALLOW" : "DENY"}</span>
          </div>
        ))}
      </div>
    );
  }
  // "yours" — chip of language icons
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 6,
      padding: "12px 14px", borderRadius: 12,
      border: "1px solid var(--color-border)",
      background: "var(--color-surface-inset)",
      fontFamily: "var(--font-mono)", fontSize: 11,
      minWidth: 180,
    }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
        color: "var(--color-text-muted)", textTransform: "uppercase",
        marginBottom: 4,
      }}>build with</div>
      {[
        { name: "Rust",       v: "rustc 1.78" },
        { name: "TypeScript", v: "node 22" },
        { name: "Go",         v: "go 1.23" },
        { name: "Zig",        v: "zig 0.13" },
      ].map(l => (
        <div key={l.name} style={{
          display: "flex", justifyContent: "space-between", gap: 12,
          color: "var(--color-text-primary)",
        }}>
          <span>{l.name}</span>
          <span style={{ color: "var(--color-text-muted)" }}>{l.v}</span>
        </div>
      ))}
    </div>
  );
};

// ── Plugin showcase data ──────────────────────
const PLUGIN_ROWS = [
  {
    id: "translate",
    badge: "Built-in",
    name: "Translate",
    tagline: "Type anything, get it in another language without leaving the launcher.",
    body: "Detects source language, lists target candidates, copies on Enter. Runs offline with a small model; a network hop only when you ask for it.",
    accent: "translate",
    sample: { input: "translate good morning →", output: "Guten Morgen", lang: "DE" },
  },
  {
    id: "clipboard",
    badge: "Built-in",
    name: "Clipboard history",
    tagline: "Last 200 things you copied — searchable, pinnable, never logged.",
    body: "Lives entirely on disk, encrypted with the OS keychain. Pin items you reuse, blank everything with one shortcut.",
    accent: "clipboard",
    sample: { input: "clip", output: "ssh-rsa AAAAB3Nz...", lang: "PIN" },
  },
  {
    id: "themes",
    badge: "Community",
    name: "Themes",
    tagline: "Match your OS, your editor, or your mood. The launcher adopts it instantly.",
    body: "Pure tokens — colors, radii, type weight. Themes are 4 KB JSON files; preview live as you type.",
    accent: "themes",
    sample: { input: "theme tokyo", output: "Tokyo Night · 12 vars", lang: "OK" },
  },
];

// ── Plugin hero — full-bleed feature ──────────
// One large, dramatic showcase. Big screenshot placeholder on one side,
// editorial copy on the other. Numbered "01 / 03". Sets the tone.
const PluginHero = ({ plugin }) => (
  <div style={{ padding: "0 64px" }}>
    <div style={{
      display: "grid", gridTemplateColumns: "1.1fr 1fr",
      gap: 64, alignItems: "stretch",
      background: "var(--color-surface-inset)",
      border: "1px solid var(--color-border)",
      borderRadius: 28, overflow: "hidden",
      minHeight: 520,
    }}>
      {/* Image placeholder */}
      <ScreenshotPlaceholder
        label={`${plugin.name} — hero shot`}
        sublabel="1600 × 1000 · drop final screenshot here"
        ratio="hero"
      />
      {/* Editorial copy */}
      <div style={{
        padding: "56px 56px",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10, marginBottom: 24,
        }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600,
            letterSpacing: "0.18em", color: "var(--color-accent)",
          }}>FEATURED · 01 / 03</span>
        </div>
        <h3 style={{
          margin: 0, fontSize: 56, fontWeight: 600, letterSpacing: "-0.03em",
          lineHeight: 1.0, textWrap: "balance",
        }}>{plugin.name}.</h3>
        <p style={{
          margin: "20px 0 0", fontSize: 20, lineHeight: 1.45,
          color: "var(--color-text-primary)", textWrap: "pretty", maxWidth: 460,
        }}>{plugin.tagline}</p>
        <p style={{
          margin: "20px 0 0", fontSize: 14, lineHeight: 1.6,
          color: "var(--color-text-secondary)", textWrap: "pretty", maxWidth: 460,
        }}>{plugin.body}</p>
        <div style={{
          marginTop: 36, display: "flex", alignItems: "center", gap: 16,
          fontFamily: "var(--font-mono)", fontSize: 12,
          color: "var(--color-text-muted)",
        }}>
          <span>torchsnap-{plugin.id}</span>
          <span aria-hidden="true">·</span>
          <span>v1.4.0</span>
          <span aria-hidden="true">·</span>
          <span>{plugin.badge}</span>
        </div>
      </div>
    </div>
  </div>
);

// ── Plugin card — for stacked smaller entries ──
const PluginCard = ({ plugin }) => (
  <div style={{
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: 24, overflow: "hidden",
    display: "flex", flexDirection: "column",
  }}>
    <ScreenshotPlaceholder
      label={`${plugin.name}`}
      sublabel="1200 × 700 · drop screenshot"
      ratio="card"
    />
    <div style={{ padding: "28px 32px 32px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "3px 8px", borderRadius: 999,
          background: plugin.badge === "Built-in"
            ? "color-mix(in srgb, var(--color-accent) 14%, transparent)"
            : "var(--color-surface-inset)",
          color: plugin.badge === "Built-in" ? "var(--color-accent)" : "var(--color-text-secondary)",
          border: "1px solid var(--color-border)",
        }}>{plugin.badge}</span>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 11,
          color: "var(--color-text-muted)",
        }}>torchsnap-{plugin.id}</span>
      </div>
      <h3 style={{
        margin: 0, fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em",
        lineHeight: 1.1,
      }}>{plugin.name}</h3>
      <p style={{
        margin: "10px 0 0", fontSize: 15, lineHeight: 1.5,
        color: "var(--color-text-secondary)", textWrap: "pretty",
      }}>{plugin.tagline}</p>
    </div>
  </div>
);

// ── Screenshot placeholder ────────────────────
// A clear, on-brand "drop image here" block. Diagonal hatch + label.
// Two variants: hero (taller, bigger label) / card (shorter).
const ScreenshotPlaceholder = ({ label, sublabel, ratio = "card" }) => {
  const minHeight = ratio === "hero" ? 520 : 320;
  return (
    <div style={{
      position: "relative",
      minHeight,
      background: `
        repeating-linear-gradient(
          135deg,
          color-mix(in srgb, var(--color-accent) 6%, transparent) 0 12px,
          transparent 12px 24px
        ),
        var(--color-surface)
      `,
      borderRight: ratio === "hero" ? "1px solid var(--color-border)" : "none",
      borderBottom: ratio === "card" ? "1px solid var(--color-border)" : "none",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 10,
      color: "var(--color-text-muted)",
      overflow: "hidden",
    }}>
      {/* Big monogram */}
      <div style={{
        position: "absolute",
        top: 16, left: 18,
        fontFamily: "var(--font-mono)",
        fontSize: 11, fontWeight: 600,
        letterSpacing: "0.18em",
        color: "var(--color-accent)",
        opacity: 0.7,
      }}>SCREENSHOT</div>

      {/* Center icon */}
      <div style={{
        width: 72, height: 72, borderRadius: 16,
        background: "var(--color-surface)",
        border: "1.5px dashed color-mix(in srgb, var(--color-accent) 50%, transparent)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--color-accent)",
      }}>
        <HeroIcon name="photo" size={32}/>
      </div>
      <div style={{
        fontSize: ratio === "hero" ? 16 : 14,
        fontWeight: 600, color: "var(--color-text-secondary)",
      }}>{label}</div>
      <div style={{
        fontSize: 12, color: "var(--color-text-muted)",
        fontFamily: "var(--font-mono)",
      }}>{sublabel}</div>
    </div>
  );
};

// ── Plugin marquee — wider universe ──────────
const PluginMarquee = () => {
  const names = [
    "Translate", "Clipboard", "Themes", "Window manager", "Calendar",
    "Calculator", "Snippets", "Spotify", "1Password", "GitHub",
    "Linear", "Notion", "Figma", "Color picker", "Emoji",
    "Unit convert", "DNS lookup", "Lorem ipsum", "QR code", "Timezone",
  ];
  return (
    <div style={{
      marginTop: 80,
      padding: "32px 0",
      borderTop: "1px solid var(--color-border-divider)",
      borderBottom: "1px solid var(--color-border-divider)",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Edge fades */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, var(--color-surface) 0%, transparent 8%, transparent 92%, var(--color-surface) 100%)",
        pointerEvents: "none",
        zIndex: 1,
      }}/>
      <div style={{
        display: "flex", gap: 16,
        whiteSpace: "nowrap",
        animation: "tsMarquee 60s linear infinite",
        width: "max-content",
      }}>
        {[...names, ...names].map((n, i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 16px",
            borderRadius: 999,
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            fontSize: 14, fontWeight: 500,
            color: "var(--color-text-primary)",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: 999,
              background: "var(--color-accent)", opacity: 0.7,
            }}/>
            {n}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes tsMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

// ── Code mockup (used in For-developers) ──────
const CodeMockup = () => (
  <div style={{
    background: "var(--color-code-bg, #0f172a)",
    color: "var(--color-code-fg, #e2e8f0)",
    borderRadius: 16,
    padding: 0,
    border: "1px solid var(--color-border)",
    boxShadow: "var(--shadow-card-2, 0 12px 32px rgba(0,0,0,0.12))",
    overflow: "hidden",
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    lineHeight: 1.65,
  }}>
    {/* Window chrome */}
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "10px 14px",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      background: "rgba(255,255,255,0.04)",
    }}>
      <span style={{ width: 10, height: 10, borderRadius: 999, background: "#ff5f57" }}/>
      <span style={{ width: 10, height: 10, borderRadius: 999, background: "#febc2e" }}/>
      <span style={{ width: 10, height: 10, borderRadius: 999, background: "#28c840" }}/>
      <span style={{ marginLeft: 14, fontSize: 11, color: "rgba(255,255,255,0.55)" }}>plugin.rs · cargo run --release</span>
    </div>
    <pre style={{ margin: 0, padding: "20px 22px", whiteSpace: "pre", overflowX: "auto" }}>
{`use torchsnap_sdk::{plugin, Result, Query, Action};

#[plugin(name = "weather", capabilities = ["network"])]
fn handle(q: Query) -> Result<Vec<Action>> {
    let city = q.text();
    let temp = fetch_temp(&city)?;
    Ok(vec![
        Action::result(format!("{}°C in {}", temp, city))
            .icon("☀")
            .on_enter(|| copy(format!("{}", temp))),
    ])
}`}
    </pre>
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 14px",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      background: "rgba(255,255,255,0.04)",
      fontSize: 11, color: "rgba(255,255,255,0.55)",
    }}>
      <span>weather.torchsnap · 38 KB · capabilities: network</span>
      <span style={{ color: "#7ee787" }}>● compiled</span>
    </div>
  </div>
);

window.V1bFull = V1bFull;

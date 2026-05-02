/* Cast section — 3 variations side-by-side for comparison.
 *
 * All three share the SAME (current, approved) title block — eyebrow,
 * tagline, supporting copy, footer line. They differ only in how the
 * mascot cards are presented:
 *
 *   A · Tilted polaroids  — original loose/casual style with rotation
 *                            and accent stamps. 4-up + 3-up rows.
 *   B · Trading cards     — clean 4×2 grid, tinted spotlights,
 *                            werewolf in the 8th cell.
 *   C · Bento wall        — variable-size cards on a 12-col bento,
 *                            werewolf as full-bleed finale.
 *
 * Each variation lives inside its own labelled section so they read
 * as a comparison sheet. Pulls cast data + werewolf imagery from
 * V1bFull's window-exported helpers (Portrait, CastNo, etc).
 */

const CAST_DATA = [
  { id: "original",             name: "Snappy",            no: "001", title: "Patient zero",              body: "Started the whole closet. Refuses to wear shoes.",            tint: 38,  rot: -3, stamp: "OG" },
  { id: "cloak-and-torch",      name: "Snappy the Bold",   no: "008", title: "Carries the torch",         body: "Knows every dark corner of your filesystem by name.",         tint: 18,  rot: 4,  stamp: "BRAVE" },
  { id: "astronaut",            name: "Major Snap",        no: "021", title: "Far-flung file finder",     body: "Once filed an expense report from low orbit.",                tint: 230, rot: -5, stamp: "ORBIT" },
  { id: "dashing-captain",      name: "Captain Snappy",    no: "034", title: "Master of the open tab",    body: "Sails the seven monitors. Flag never matches the ship.",      tint: 200, rot: 2,  stamp: "AHOY" },
  { id: "dino-kigurumi",        name: "Dino Snap",         no: "057", title: "Extinction-proof shortcut", body: "Outlived three launcher trends and one office plant.",        tint: 140, rot: -2, stamp: "RAWR" },
  { id: "deep-sea-diver",       name: "Snappy McFathom",   no: "082", title: "Excavator of lost paths",   body: "Found the file you swore was deleted. Didn't peek. Promise.", tint: 195, rot: 5,  stamp: "DEEP" },
  { id: "banana-goggle-minion", name: "Bananappy",         no: "119", title: "Bringer of mild chaos",     body: "Mainly here for snacks. Surprisingly good at fuzzy match.",   tint: 50,  rot: -4, stamp: "BANANA" },
];

// Shared title block — exactly as in V1bFull
const CastTitle = () => (
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
);

const CastFooter = () => (
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
);

// Variation label — pinned to top-left of each section
const VariantLabel = ({ letter, title, subtitle }) => (
  <div style={{
    position: "absolute", top: 28, left: 32, zIndex: 5,
    display: "flex", gap: 14, alignItems: "center",
  }}>
    <div style={{
      width: 44, height: 44, borderRadius: 12,
      background: "var(--color-accent)",
      color: "var(--color-on-accent, #fff)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: 18,
      letterSpacing: "0.04em",
      boxShadow: "0 6px 18px -6px color-mix(in srgb, var(--color-accent) 60%, transparent)",
    }}>{letter}</div>
    <div>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
        letterSpacing: "0.18em", color: "var(--color-text-muted)",
      }}>VARIATION&nbsp;{letter}</div>
      <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</div>
      {subtitle && (
        <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 2 }}>{subtitle}</div>
      )}
    </div>
  </div>
);

// ─────────────────────────────────────────────
// A · Tilted polaroids
// ─────────────────────────────────────────────
const VariantA = () => (
  <section style={{
    position: "relative",
    padding: "120px 0 140px",
    borderTop: "1px solid var(--color-border-divider)",
    overflow: "hidden",
    background: `
      radial-gradient(ellipse 900px 500px at 15% 0%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 60%),
      radial-gradient(ellipse 800px 500px at 85% 100%, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 60%),
      var(--color-surface)
    `,
  }}>
    <VariantLabel letter="A" title="Tilted polaroids" subtitle="loose, casual, hand-pinned"/>

    <CastTitle/>

    {/* 4-up + 3-up rows of rotated cards */}
    <div style={{
      padding: "0 48px",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 40,
      maxWidth: 1280, margin: "0 auto",
      position: "relative",
    }}>
      {CAST_DATA.slice(0, 4).map(s => <TiltedCard key={s.id} s={s}/>)}
    </div>
    <div style={{
      padding: "40px 48px 0",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 40, maxWidth: 1100, margin: "0 auto",
      position: "relative",
    }}>
      {CAST_DATA.slice(4).map(s => <TiltedCard key={s.id} s={s}/>)}
    </div>

    <CastFooter/>
  </section>
);

const TiltedCard = ({ s }) => (
  <div style={{
    position: "relative",
    transform: `rotate(${s.rot}deg)`,
    background: "transparent",
    border: "none",
    borderRadius: 20,
    padding: "24px 22px 26px",
    transition: "transform 220ms ease",
  }}>
    {/* Stamp */}
    <span style={{
      position: "absolute", top: -10, right: -10,
      transform: `rotate(${-s.rot * 2}deg)`,
      padding: "5px 10px",
      borderRadius: 999,
      background: "var(--color-accent)",
      color: "var(--color-on-accent, #fff)",
      fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 800,
      letterSpacing: "0.14em",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    }}>{s.stamp}</span>

    <div style={{
      height: 180,
      borderRadius: 14,
      background: `
        radial-gradient(circle at 50% 60%, color-mix(in srgb, var(--color-accent) 24%, transparent), transparent 70%),
        var(--color-surface-inset, color-mix(in srgb, var(--color-accent) 6%, var(--color-surface)))
      `,
      border: "1px dashed color-mix(in srgb, var(--color-accent) 35%, transparent)",
      display: "flex", alignItems: "center", justifyContent: "center",
      marginBottom: 16, overflow: "hidden",
    }}>
      <img
        src={`assets/mascots/snappy-${s.id}-384.webp`}
        alt={s.name}
        style={{
          maxHeight: "92%", maxWidth: "92%", objectFit: "contain",
          filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.18))",
        }}
      />
    </div>

    <div style={{
      fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700,
      letterSpacing: "0.16em", textTransform: "uppercase",
      color: "var(--color-accent)", marginBottom: 6,
    }}>{s.title}</div>
    <h3 style={{
      margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em",
      lineHeight: 1.1,
    }}>{s.name}</h3>
    <p style={{
      margin: "10px 0 0", fontSize: 13, lineHeight: 1.5,
      color: "var(--color-text-secondary)", textWrap: "pretty",
    }}>{s.body}</p>
  </div>
);

// ─────────────────────────────────────────────
// B · Trading-card grid
// ─────────────────────────────────────────────
const VariantB = () => (
  <section style={{
    position: "relative",
    padding: "120px 0 140px",
    borderTop: "1px solid var(--color-border-divider)",
    overflow: "hidden",
    background: "var(--color-surface)",
  }}>
    <VariantLabel letter="B" title="Trading-card grid" subtitle="clean 4×2 with tinted portraits"/>

    <CastTitle/>

    <div style={{
      padding: "0 56px",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 24,
      maxWidth: 1280, margin: "0 auto",
      position: "relative",
    }}>
      {CAST_DATA.map(s => <TradingCard key={s.id} s={s}/>)}
      <WerewolfSquare/>
    </div>

    <CastFooter/>
  </section>
);

const TradingCard = ({ s }) => (
  <article style={{
    position: "relative",
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: 18,
    padding: 16,
    boxShadow: "0 1px 0 var(--color-border-divider) inset, 0 12px 32px -18px rgba(0,0,0,0.25)",
    overflow: "hidden",
    display: "flex", flexDirection: "column", gap: 14,
  }}>
    <CastNo no={s.no}/>
    <Portrait s={s} style={{ aspectRatio: "1 / 1", borderRadius: 12 }}/>
    <div className="cast-role">{s.title}</div>
    <h3 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.1 }}>{s.name}</h3>
    <p style={{ margin: "10px 0 0", fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)", textWrap: "pretty" }}>{s.body}</p>
  </article>
);

// Square werewolf for variant B's 8th grid cell
const WerewolfSquare = () => (
  <article style={{
    position: "relative",
    border: "1px dashed color-mix(in srgb, oklch(0.95 0.18 80) 35%, transparent)",
    borderRadius: 18,
    padding: 16,
    overflow: "hidden",
    display: "flex", flexDirection: "column", gap: 12,
    background: `linear-gradient(180deg, oklch(0.22 0.04 270) 0%, oklch(0.16 0.05 270) 100%)`,
    color: "rgba(255,255,255,0.92)",
  }}>
    <div style={{
      position: "absolute", top: 14, right: 16,
      fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
      letterSpacing: "0.14em", color: "rgba(255,255,255,0.55)", zIndex: 2,
    }}>№&nbsp;???</div>
    <MoonScene compact/>
    <div style={{
      fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700,
      letterSpacing: "0.16em", textTransform: "uppercase",
      color: "oklch(0.85 0.18 80)",
    }}>When the sky goes silver</div>
    <h3 style={{ margin: 0, fontSize: 22, fontWeight: 600, lineHeight: 1.1, color: "rgba(255,255,255,0.95)" }}>Snappy the&nbsp;…?</h3>
    <p style={{ margin: "6px 0 0", fontSize: 13, lineHeight: 1.5, color: "rgba(255,255,255,0.65)" }}>
      Something hairy this way comes.
    </p>
  </article>
);

// ─────────────────────────────────────────────
// C · Bento wall (current)
// ─────────────────────────────────────────────
const VariantC = () => (
  <section style={{
    position: "relative",
    padding: "120px 0 140px",
    borderTop: "1px solid var(--color-border-divider)",
    overflow: "hidden",
    background: "var(--color-surface)",
  }}>
    <VariantLabel letter="C" title="Bento wall" subtitle="variable-size cards, full-bleed finale"/>

    <CastTitle/>

    <div style={{
      padding: "0 56px",
      maxWidth: 1280, margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gridAutoRows: "220px",
      gap: 20,
      position: "relative",
    }}>
      <BentoCard s={find("dashing-captain")}      size="hero"   style={{ gridColumn: "1 / span 5", gridRow: "1 / span 2" }}/>
      <BentoCard s={find("astronaut")}            size="tall"   style={{ gridColumn: "6 / span 3", gridRow: "1 / span 2" }}/>
      <BentoCard s={find("original")}             size="square" style={{ gridColumn: "9 / span 4", gridRow: "1 / span 1" }}/>
      <BentoCard s={find("banana-goggle-minion")} size="square" style={{ gridColumn: "9 / span 4", gridRow: "2 / span 1" }}/>
      <BentoCard s={find("cloak-and-torch")}      size="wide"   style={{ gridColumn: "1 / span 4", gridRow: "3 / span 1" }}/>
      <BentoCard s={find("dino-kigurumi")}        size="square" style={{ gridColumn: "5 / span 4", gridRow: "3 / span 1" }}/>
      <BentoCard s={find("deep-sea-diver")}       size="square" style={{ gridColumn: "9 / span 4", gridRow: "3 / span 1" }}/>
      <WerewolfWide style={{ gridColumn: "1 / span 12", gridRow: "4 / span 1" }}/>
    </div>

    <CastFooter/>
  </section>
);

const find = (id) => CAST_DATA.find(x => x.id === id);

const BentoCard = ({ s, size = "square", style }) => {
  if (size === "wide") {
    return (
      <article style={{
        position: "relative",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 18, padding: 14,
        boxShadow: "0 1px 0 var(--color-border-divider) inset, 0 12px 32px -18px rgba(0,0,0,0.25)",
        overflow: "hidden",
        display: "grid", gridTemplateColumns: "auto 1fr", gap: 18, alignItems: "center",
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

  const isHero = size === "hero";
  const isTall = size === "tall";

  return (
    <article style={{
      position: "relative",
      background: "var(--color-surface)",
      border: "1px solid var(--color-border)",
      borderRadius: 18, padding: 16,
      boxShadow: "0 1px 0 var(--color-border-divider) inset, 0 12px 32px -18px rgba(0,0,0,0.25)",
      overflow: "hidden",
      display: "flex", flexDirection: "column", gap: isHero ? 18 : 12,
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
            margin: 0, fontSize: isHero ? 15 : 13, lineHeight: 1.5,
            color: "var(--color-text-secondary)", textWrap: "pretty",
            maxWidth: 520,
          }}>{s.body}</p>
        )}
      </div>
    </article>
  );
};

const CastNo = ({ no }) => (
  <div style={{
    position: "absolute", top: 14, right: 16,
    fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
    letterSpacing: "0.14em",
    color: "var(--color-text-muted)",
    zIndex: 2,
  }}>№&nbsp;{no}</div>
);

const Portrait = ({ s, style }) => (
  <div className="ts-cast-portrait" style={{
    background: `
      radial-gradient(ellipse 70% 90% at 50% 110%,
        oklch(0.78 0.18 ${s.tint}) 0%,
        oklch(0.92 0.08 ${s.tint}) 45%,
        oklch(0.97 0.03 ${s.tint}) 100%)
    `,
    display: "flex", alignItems: "flex-end", justifyContent: "center",
    overflow: "hidden", position: "relative",
    ...style,
  }}>
    {/* Dark-mode dimmer — a CSS-controlled overlay that's invisible
        in light mode and darkens the bright tint in dark mode. */}
    <div aria-hidden="true" className="ts-cast-portrait__dim"/>
    <div aria-hidden="true" style={{
      position: "absolute", inset: 0,
      background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,0.45), transparent 60%)",
    }}/>
    <img
      src={`assets/mascots/snappy-${s.id}-384.webp`}
      alt={s.name}
      style={{
        maxHeight: "94%", maxWidth: "94%", objectFit: "contain",
        filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.22))",
        position: "relative", zIndex: 1,
      }}
    />
  </div>
);

// Wide moonlit werewolf finale (variant C)
const WerewolfWide = ({ style }) => (
  <article style={{
    position: "relative",
    border: "1px dashed color-mix(in srgb, oklch(0.95 0.18 80) 35%, transparent)",
    borderRadius: 18, padding: 24,
    overflow: "hidden",
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "stretch",
    background: `linear-gradient(180deg, oklch(0.22 0.04 270) 0%, oklch(0.14 0.05 270) 100%)`,
    color: "rgba(255,255,255,0.92)",
    ...style,
  }}>
    <div style={{
      position: "absolute", top: 16, right: 18,
      fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700,
      letterSpacing: "0.16em", color: "rgba(255,255,255,0.55)",
    }}>№&nbsp;???</div>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 14, paddingLeft: 16 }}>
      <div style={{
        display: "inline-flex", alignSelf: "flex-start", gap: 8, alignItems: "center",
        padding: "5px 12px", borderRadius: 999,
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
      <p style={{ margin: 0, maxWidth: 460, fontSize: 15, lineHeight: 1.5, color: "rgba(255,255,255,0.7)", textWrap: "pretty" }}>
        Something hairy is coming to the closet. We won't say more — only that you'll know when the sky goes silver.
      </p>
    </div>
    <MoonScene/>
  </article>
);

// Reusable moonlit night scene — moon, stars, mountains, howling silhouette
const MoonScene = ({ compact }) => (
  <div style={{
    position: "relative",
    flex: compact ? "1 1 auto" : undefined,
    aspectRatio: compact ? "1 / 1" : undefined,
    minHeight: compact ? undefined : 240,
    borderRadius: 12,
    overflow: "hidden",
    background: `
      radial-gradient(ellipse 50% 50% at 78% 28%, rgba(255,240,200,0.85), transparent 38%),
      radial-gradient(ellipse 90% 60% at 50% 110%, oklch(0.30 0.08 270), oklch(0.16 0.06 270) 70%)
    `,
  }}>
    <svg aria-hidden="true" viewBox="0 0 100 100" style={{
      position: "absolute", top: "14%", right: "14%",
      width: compact ? 56 : 90, height: compact ? 56 : 90,
      filter: "drop-shadow(0 0 22px rgba(255,240,200,0.6))",
    }}>
      <defs>
        <mask id={`moonMask-${compact ? "c" : "w"}`}>
          <rect width="100" height="100" fill="black"/>
          <circle cx="50" cy="50" r="36" fill="white"/>
          <circle cx="64" cy="42" r="32" fill="black"/>
        </mask>
      </defs>
      <rect width="100" height="100" fill="oklch(0.97 0.06 90)" mask={`url(#moonMask-${compact ? "c" : "w"})`}/>
    </svg>
    {[[12, 18], [22, 36], [10, 62], [70, 70], [50, 82], [86, 50], [40, 14]].map(([x, y], i) => (
      <span key={i} aria-hidden="true" style={{
        position: "absolute", left: `${x}%`, top: `${y}%`,
        width: 3, height: 3, borderRadius: 999,
        background: "rgba(255,255,255,0.9)",
        boxShadow: "0 0 6px rgba(255,255,255,0.8)",
      }}/>
    ))}
    <svg aria-hidden="true" viewBox="0 0 400 120" preserveAspectRatio="none" style={{
      position: "absolute", left: 0, right: 0, bottom: 0,
      width: "100%", height: "55%",
    }}>
      <path d="M0 120 L 0 80 L 50 50 L 110 90 L 160 60 L 220 100 L 270 70 L 330 95 L 400 65 L 400 120 Z" fill="oklch(0.12 0.04 270)"/>
      <path d="M0 120 L 0 100 L 60 85 L 130 110 L 200 92 L 270 108 L 340 95 L 400 105 L 400 120 Z" fill="oklch(0.08 0.03 270)"/>
    </svg>
    <svg aria-hidden="true" viewBox="0 0 200 200" style={{
      position: "absolute", left: "8%", bottom: 0,
      height: "85%", width: "auto",
      filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.55))",
    }}>
      <path d="M100 28 C 78 28 60 46 60 70 C 60 82 64 90 70 98 L 58 132 C 56 144 62 156 76 158 L 124 158 C 138 156 144 144 142 132 L 130 98 C 136 90 140 82 140 70 C 140 46 122 28 100 28 Z" fill="oklch(0.06 0.03 270)"/>
      <path d="M68 36 L 74 10 L 88 38 Z" fill="oklch(0.06 0.03 270)"/>
      <path d="M132 36 L 126 10 L 112 38 Z" fill="oklch(0.06 0.03 270)"/>
      <circle cx="86" cy="74" r="3.5" fill="oklch(0.95 0.18 80)"/>
      <circle cx="114" cy="74" r="3.5" fill="oklch(0.95 0.18 80)"/>
      <ellipse cx="100" cy="96" rx="5" ry="7" fill="oklch(0.10 0.03 270)" stroke="oklch(0.40 0.04 270)" strokeWidth="1"/>
    </svg>
  </div>
);

// ─────────────────────────────────────────────
// Top-level: stack all three
// ─────────────────────────────────────────────
const CastVariations = () => (
  <div style={{
    width: 1280,
    background: "var(--color-surface)",
    fontFamily: "var(--font-sans)",
    color: "var(--color-text-primary)",
  }}>
    {/* Cast role label CSS — same as in V1bFull, scoped here in case
        this artboard is viewed without V1bFull mounted. */}
    <style>{`
      .cast-role {
        font-family: var(--font-mono);
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--color-accent);
      }
      /* Dark-mode dimmer for tinted mascot portraits.
         Invisible in light mode; in dark mode adds a translucent
         dark-blue wash + reduces overall lightness so the bright
         oklch backgrounds settle into the surrounding surface. */
      .ts-cast-portrait__dim {
        position: absolute;
        inset: 0;
        background: transparent;
        mix-blend-mode: multiply;
        opacity: 0;
        pointer-events: none;
        transition: opacity 200ms ease;
      }
      [data-theme="dark"] .ts-cast-portrait__dim {
        background: rgba(28, 28, 30, 0.55);
        mix-blend-mode: normal;
        opacity: 1;
      }
      /* Pull the saturated tints down a notch in dark mode, too. */
      [data-theme="dark"] .ts-cast-portrait {
        filter: brightness(0.78) saturate(0.85);
      }
    `}</style>

    <VariantA/>
    <VariantB/>
    <VariantC/>
  </div>
);

// Shared CSS for all cast variants — injected once, reused by both
// the combined component and per-variant wrappers.
const CAST_STYLES = `
  .cast-role {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-accent);
  }
  .ts-cast-portrait__dim {
    position: absolute;
    inset: 0;
    background: transparent;
    mix-blend-mode: multiply;
    opacity: 0;
    pointer-events: none;
    transition: opacity 200ms ease;
  }
  [data-theme="dark"] .ts-cast-portrait__dim {
    background: rgba(28, 28, 30, 0.55);
    mix-blend-mode: normal;
    opacity: 1;
  }
  [data-theme="dark"] .ts-cast-portrait {
    filter: brightness(0.78) saturate(0.85);
  }
`;

window.CastVariations = CastVariations;
window.CastVariantA = () => (
  <div style={{ width: 1280, background: "var(--color-surface)", fontFamily: "var(--font-sans)", color: "var(--color-text-primary)" }}>
    <style>{CAST_STYLES}</style>
    <VariantA/>
  </div>
);
window.CastVariantB = () => (
  <div style={{ width: 1280, background: "var(--color-surface)", fontFamily: "var(--font-sans)", color: "var(--color-text-primary)" }}>
    <style>{CAST_STYLES}</style>
    <VariantB/>
  </div>
);
window.CastVariantC = () => (
  <div style={{ width: 1280, background: "var(--color-surface)", fontFamily: "var(--font-sans)", color: "var(--color-text-primary)" }}>
    <style>{CAST_STYLES}</style>
    <VariantC/>
  </div>
);

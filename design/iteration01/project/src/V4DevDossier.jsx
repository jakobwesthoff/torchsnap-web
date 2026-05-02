/* Variation 4 — "Developer Dossier"
 * Dev-tool serious. Mono type, terminal aesthetics, real plugin manifest.
 * For the developer audience — but still includes a "you don't need to be a dev" note.
 */

const V4DevDossier = () => (
  <div style={{
    width: 1280, minHeight: 880,
    background: "var(--color-surface)",
    fontFamily: "var(--font-sans)",
    color: "var(--color-text-primary)",
    overflow: "hidden",
    position: "relative",
  }}>
    {/* Top bar — terminal-window style */}
    <header style={{
      display: "flex", alignItems: "center",
      padding: "14px 24px",
      borderBottom: "1px solid var(--color-border)",
      background: "var(--color-surface-inset)",
      gap: 14,
    }}>
      <div style={{ display: "flex", gap: 6 }}>
        <span style={dotStyle("#ff5f57")}/>
        <span style={dotStyle("#febc2e")}/>
        <span style={dotStyle("#28c840")}/>
      </div>
      <div style={{
        flex: 1, textAlign: "center", fontSize: 12, fontFamily: "var(--font-mono)",
        color: "var(--color-text-muted)",
      }}>~/torchsnap — bash — 120×40</div>
      <Wordmark size={13}/>
    </header>

    {/* Hero */}
    <section style={{
      display: "grid", gridTemplateColumns: "1.1fr 1fr",
      gap: 48, padding: "56px 56px 0",
    }}>
      <div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          fontFamily: "var(--font-mono)", fontSize: 12,
          color: "var(--color-accent)", marginBottom: 24,
        }}>
          <span>$</span>
          <span style={{ color: "var(--color-text-secondary)" }}>echo "Light. Find. Launch."</span>
          <span className="ts-caret"></span>
        </div>
        <h1 style={{
          margin: 0,
          fontSize: 56, fontWeight: 600, letterSpacing: "-0.025em",
          lineHeight: 1.04, textWrap: "balance",
        }}>
          A launcher you can<br/>
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)", fontWeight: 500 }}>
            cargo build
          </span> on.
        </h1>
        <p style={{
          margin: "22px 0 0", fontSize: 16, lineHeight: 1.55,
          color: "var(--color-text-secondary)",
          maxWidth: 540, textWrap: "pretty",
        }}>
          Torchsnap is a Tauri 2 app with a WebAssembly plugin runtime.
          Plugins are <code style={inlineCodeStyle}>wasm32-wasip2</code> components,
          sandboxed by <code style={inlineCodeStyle}>wasmtime</code>, gated by a
          declarative permission manifest. Distributed as a single
          <code style={inlineCodeStyle}>.torchsnap</code> archive.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 32, alignItems: "center" }}>
          <PrimaryButton icon="arrow-down-tray">Download for macOS</PrimaryButton>
          <GhostButton icon="github">Read the architecture doc</GhostButton>
        </div>
        <p style={{
          margin: "24px 0 0", fontSize: 13, color: "var(--color-text-muted)",
          maxWidth: 480, lineHeight: 1.5,
        }}>
          ↳ <span style={{ color: "var(--color-text-secondary)" }}>Don't write code? You don't have to.</span>
          {" "}Drop in any <code style={inlineCodeStyle}>.torchsnap</code> plugin built by
          someone else and Torchsnap will sandbox it for you.
        </p>
      </div>

      <div>
        {/* Plugin manifest */}
        <CodeBlock
          title="hello.torchsnap / plugin.toml"
          lang="toml"
          lines={[
            ['comment', '# A torchsnap plugin manifest'],
            ['', '[plugin]'],
            ['', 'id      = '], ['str', '"com.torchsnap.weather"', ' newline'],
            ['', 'name    = '], ['str', '"Weather"', ' newline'],
            ['', 'version = '], ['str', '"0.3.1"', ' newline'],
            ['', ''],
            ['', '[runtime]'],
            ['', 'target  = '], ['str', '"wasm32-wasip2"', ' newline'],
            ['', 'binary  = '], ['str', '"weather.wasm"', ' newline'],
            ['', ''],
            ['comment', '# Caps the host will allow.'],
            ['', '[permissions]'],
            ['', 'network = ['], ['str', '"https://api.weather.com/*"'], ['', ']'],
            ['', 'storage = '], ['str', '"plugin-private"'],
          ]}
        />
      </div>
    </section>

    {/* Mid: launcher + key facts */}
    <section style={{
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48,
      padding: "60px 56px", alignItems: "center",
    }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <AnimatedLauncher width={520}/>
      </div>
      <div>
        <SectionHead
          eyebrow="ARCHITECTURE"
          title="Sandboxed plugins, by default."
          sub="Plugins declare every capability — network hosts, filesystem paths, clipboard reads. The host enforces. No plugin sees more than it asked for."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginTop: 32 }}>
          {[
            ["wasm32-wasip2", "Compile from any language with a wasip2 target."],
            ["wasmtime", "Industry-standard runtime. CVE-tracked, audited."],
            ["Single-file .torchsnap", "Drop into the launcher. No package manager."],
            ["MPL-2.0", "Source-available. Fork it, audit it, ship a build."],
          ].map(([t, d], i) => (
            <div key={i}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-accent)",
                marginBottom: 4,
              }}>{t}</div>
              <div style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.45 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Quickstart */}
    <section style={{
      padding: "0 56px 60px",
    }}>
      <SectionHead eyebrow="QUICKSTART" title="Build your first plugin." sub="Three commands. The SDK does the rest."/>
      <div style={{ marginTop: 24 }}>
        <CodeBlock
          title="bash"
          lang="bash"
          lines={[
            ['comment', '# Scaffold from the official template'],
            ['', '$ '], ['cmd', 'cargo install', ' '], ['arg', 'torchsnap-cli', ' newline'],
            ['', '$ '], ['cmd', 'torchsnap new', ' '], ['arg', 'my-plugin', ' newline'],
            ['', '$ '], ['cmd', 'torchsnap pack', ' '], ['arg', './my-plugin', ' newline'],
            ['', '   '], ['comment', '↳ writes my-plugin.torchsnap'],
          ]}
        />
      </div>
    </section>

    <FooterStrip/>
  </div>
);

const dotStyle = (color) => ({
  width: 12, height: 12, borderRadius: 999, background: color, display: "inline-block",
});

const inlineCodeStyle = {
  fontFamily: "var(--font-mono)", fontSize: "0.92em",
  background: "var(--color-surface-inset)",
  padding: "1px 5px", borderRadius: 4,
  color: "var(--color-text-primary)",
  border: "1px solid var(--color-border)",
};

// Lightweight code block. `lines` is a flat list of [kind, text, flag?].
// kind: comment | str | cmd | arg | '' (plain). flag === ' newline' ends a line.
const CodeBlock = ({ title, lang, lines }) => {
  const colors = {
    comment: "var(--color-text-muted)",
    str: "var(--color-accent)",
    cmd: "var(--color-text-primary)",
    arg: "#0ea5e9",
    "": "var(--color-text-secondary)",
  };
  // Render: walk tokens, break on ' newline'.
  const out = [];
  let buf = [];
  let lineNo = 1;
  lines.forEach((tok, idx) => {
    const [kind, text, flag] = tok;
    buf.push(<span key={idx} style={{ color: colors[kind], fontWeight: kind === "cmd" ? 600 : 400 }}>{text}</span>);
    if (flag === " newline") {
      out.push(<div key={`l${lineNo}`} style={lineStyle}>
        <span style={lineNoStyle}>{lineNo}</span>
        <span>{buf}</span>
      </div>);
      buf = [];
      lineNo += 1;
    }
  });
  if (buf.length) out.push(
    <div key={`l${lineNo}`} style={lineStyle}>
      <span style={lineNoStyle}>{lineNo}</span>
      <span>{buf}</span>
    </div>
  );

  return (
    <div style={{
      borderRadius: 12,
      border: "1px solid var(--color-border)",
      background: "var(--color-surface-inset)",
      overflow: "hidden",
      boxShadow: "var(--shadow-card-1)",
    }}>
      <div style={{
        padding: "8px 14px", borderBottom: "1px solid var(--color-border)",
        fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-text-muted)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span>{title}</span>
        <span style={{ color: "var(--color-accent)" }}>{lang}</span>
      </div>
      <pre style={{
        margin: 0, padding: "14px 0",
        fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.7,
      }}>{out}</pre>
    </div>
  );
};
const lineStyle = { display: "flex", paddingLeft: 14, paddingRight: 14 };
const lineNoStyle = {
  width: 28, color: "var(--color-text-muted)", textAlign: "right",
  marginRight: 16, userSelect: "none", flexShrink: 0,
};

window.V4DevDossier = V4DevDossier;

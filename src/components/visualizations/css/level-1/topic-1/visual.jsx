// ...existing code...
import React, { useState } from "react";
import "./visual.css";

const MODES = {
  none: {
    title: "No CSS applied",
    description:
      "This is raw HTML with no CSS. Everything uses the browser’s default styles.",
    code: `<!-- No CSS -->
<h1>DevLeap</h1>
<p>CSS controls colors, fonts, layout and more.</p>`,
  },
  inline: {
    title: "Inline CSS",
    description:
      "Inline CSS uses the style attribute on each element. OK for quick tests, not for real projects.",
    code: `<h1 style="color: red;">DevLeap</h1>
<p style="font-size: 16px; color: #374151;">
  CSS controls colors, fonts, layout and more.
</p>`,
  },
  internal: {
    title: "Internal CSS (&lt;style&gt; in the HTML file)",
    description:
      "Internal CSS lives inside a <style> tag in the same HTML file. Good for small, single‑page projects.",
    code: `<style>
  h1 {
    color: red;
  }
  p {
    color: #374151;
    font-size: 16px;
  }
</style>

<h1>DevLeap</h1>
<p>CSS controls colors, fonts, layout and more.</p>`,
  },
  external: {
    title: "External CSS (recommended)",
    description:
      "The CSS lives in its own .css file and is linked from the HTML. Best for real websites.",
    code: `<!-- index.html -->
<link rel="stylesheet" href="style.css" />

<h1>DevLeap</h1>
<p>CSS controls colors, fonts, layout and more.</p>

/* style.css */
h1 {
  color: red;
}
p {
  color: #374151;
  font-size: 16px;
}`,
  },
};

const CssIntroVisualization = () => {
  const [mode, setMode] = useState("none");
  const info = MODES[mode];

  return (
    <div className="cssv-container">
      <header className="cssv-header">
        <h2>CSS – How Styles Attach to HTML</h2>
        <p className="cssv-tagline">
          Switch between no CSS, inline, internal and external styles.
        </p>
      </header>

      <div className="cssv-layout">
        {/* LEFT: live preview */}
        <section className="cssv-panel cssv-left">
          <div className="cssv-mode-buttons">
            <button
              type="button"
              className={`cssv-mode-btn ${
                mode === "none" ? "cssv-mode-btn-active" : ""
              }`}
              onClick={() => setMode("none")}
            >
              No CSS
            </button>
            <button
              type="button"
              className={`cssv-mode-btn ${
                mode === "inline" ? "cssv-mode-btn-active" : ""
              }`}
              onClick={() => setMode("inline")}
            >
              Inline CSS
            </button>
            <button
              type="button"
              className={`cssv-mode-btn ${
                mode === "internal" ? "cssv-mode-btn-active" : ""
              }`}
              onClick={() => setMode("internal")}
            >
              Internal CSS
            </button>
            <button
              type="button"
              className={`cssv-mode-btn ${
                mode === "external" ? "cssv-mode-btn-active" : ""
              }`}
              onClick={() => setMode("external")}
            >
              External CSS
            </button>
          </div>

          <p className="cssv-panel-sub">
            Imagine this mini web page. Changing how CSS is attached only
            changes the styles, not the HTML content.
          </p>

          <div className={`cssv-preview cssv-preview-${mode}`}>
            <h1 className="cssv-heading">DevLeap</h1>
            <p className="cssv-paragraph">
              CSS (Cascading Style Sheets) controls colors, fonts, spacing and
              layout. HTML gives the structure, CSS gives the look.
            </p>
          </div>
          <br/>
          <h3 className="cssv-info-title">{info.title}</h3>
          <p className="cssv-info-text">{info.description}</p>

          <pre className="cssv-code-block">
            <code>{info.code}</code>
          </pre>

          <ul className="cssv-hints">
            <li>
              Use <strong>inline CSS</strong> only for quick experiments.
            </li>
            <li>
              Use <strong>internal CSS</strong> for very small or single‑page
              projects.
            </li>
            <li>
              Use <strong>external CSS</strong> files for real, maintainable
              websites.
            </li>
          </ul>
        </section>

        {/* RIGHT: explanation + code */}
        <section className="cssv-panel cssv-right">
          <div className="cssv-rule-card">
            <div className="cssv-rule-title">Anatomy of a CSS rule</div>
            <pre className="cssv-rule-code">
              <code>
                <span className="cssv-selector">h1</span>{" "}
                <span>{"{"}</span>
                {"\n  "}
                <span className="cssv-property">color</span>
                <span>: </span>
                <span className="cssv-value">red</span>
                <span>;</span>
                {"\n"}
                <span>{"}"}</span>
              </code>
            </pre>
            <div className="cssv-rule-explain">
              <span className="cssv-pill cssv-pill-selector">selector</span>
              <span className="cssv-pill cssv-pill-property">property</span>
              <span className="cssv-pill cssv-pill-value">value</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CssIntroVisualization;
// ...existing code...
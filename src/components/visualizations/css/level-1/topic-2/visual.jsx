import React, { useState } from "react";
import "./visual.css";

const MODE_INFO = {
  named: {
    title: "Named colors",
    text: "Use built‑in color names like red, blue, teal, pink… Easy to remember, limited palette.",
  },
  rgb: {
    title: "RGB colors",
    text: "rgb(r, g, b) where each value is 0–255. Mix red, green and blue to create any color.",
  },
  hex: {
    title: "Hex colors",
    text: "Hex uses base‑16 (#RRGGBB). First two digits = red, next = green, last = blue.",
  },
};

const CssColorsVisualization = () => {
  const [mode, setMode] = useState("named");
  const [named, setNamed] = useState("purple");
  const [rgb, setRgb] = useState({ r: 214, g: 122, b: 127 });
  const [hex, setHex] = useState("#181818");
  const [useBackground, setUseBackground] = useState(false);

  const currentCssValue =
    mode === "named"
      ? named || "purple"
      : mode === "rgb"
      ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
      : hex || "#181818";

  const propertyName = useBackground ? "background-color" : "color";

  const previewStyle = useBackground
    ? { backgroundColor: currentCssValue, color: "#ffffff" }
    : { color: currentCssValue };

  const info = MODE_INFO[mode];

  return (
    <div className="ccl-container">
      <header className="ccl-header">
        <h2>Play with CSS Colors</h2>
        <p className="ccl-tagline">
          Change the inputs and see how <code>color</code> and{" "}
          <code>background-color</code> really work.
        </p>
      </header>

      <div className="ccl-layout">
        {/* LEFT: controls + preview */}
        <section className="ccl-panel ccl-left">
          <div className="ccl-mode-buttons">
            <button
              type="button"
              className={`ccl-mode-btn ${
                mode === "named" ? "ccl-mode-btn-active" : ""
              }`}
              onClick={() => setMode("named")}
            >
              Named
            </button>
            <button
              type="button"
              className={`ccl-mode-btn ${
                mode === "rgb" ? "ccl-mode-btn-active" : ""
              }`}
              onClick={() => setMode("rgb")}
            >
              RGB
            </button>
            <button
              type="button"
              className={`ccl-mode-btn ${
                mode === "hex" ? "ccl-mode-btn-active" : ""
              }`}
              onClick={() => setMode("hex")}
            >
              Hex
            </button>
          </div>

          <label className="ccl-toggle">
            <input
              type="checkbox"
              checked={useBackground}
              onChange={(e) => setUseBackground(e.target.checked)}
            />
            Apply color to background instead of text
          </label>

          {mode === "named" && (
            <div className="ccl-section">
              <label className="ccl-label">
                Type a named color (red, blue, teal, pink, violet…)
                <input
                  className="ccl-input"
                  type="text"
                  value={named}
                  onChange={(e) => setNamed(e.target.value)}
                  placeholder="purple"
                />
              </label>

              <div className="ccl-chip-row">
                {["red", "blue", "teal", "pink", "violet", "black"].map(
                  (c) => (
                    <button
                      key={c}
                      type="button"
                      className="ccl-chip"
                      onClick={() => setNamed(c)}
                    >
                      {c}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {mode === "rgb" && (
            <div className="ccl-section">
              <div className="ccl-slider-row">
                <label>
                  R: {rgb.r}
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.r}
                    onChange={(e) =>
                      setRgb({ ...rgb, r: Number(e.target.value) })
                    }
                  />
                </label>
                <label>
                  G: {rgb.g}
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.g}
                    onChange={(e) =>
                      setRgb({ ...rgb, g: Number(e.target.value) })
                    }
                  />
                </label>
                <label>
                  B: {rgb.b}
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.b}
                    onChange={(e) =>
                      setRgb({ ...rgb, b: Number(e.target.value) })
                    }
                  />
                </label>
              </div>

              <p className="ccl-small">
                Current value: <code>{currentCssValue}</code>
              </p>

              <div className="ccl-chip-row">
                <button
                  type="button"
                  className="ccl-chip"
                  onClick={() => setRgb({ r: 255, g: 0, b: 0 })}
                >
                  Red (255,0,0)
                </button>
                <button
                  type="button"
                  className="ccl-chip"
                  onClick={() => setRgb({ r: 0, g: 255, b: 0 })}
                >
                  Green (0,255,0)
                </button>
                <button
                  type="button"
                  className="ccl-chip"
                  onClick={() => setRgb({ r: 0, g: 0, b: 255 })}
                >
                  Blue (0,0,255)
                </button>
              </div>
            </div>
          )}

          {mode === "hex" && (
            <div className="ccl-section">
              <label className="ccl-label">
                Hex value (#RRGGBB or #RGB)
                <input
                  className="ccl-input"
                  type="text"
                  value={hex}
                  onChange={(e) => setHex(e.target.value)}
                  placeholder="#181818"
                />
              </label>

              <label className="ccl-label ccl-inline">
                Or pick a color
                <input
                  type="color"
                  value={hex.startsWith("#") ? hex : "#181818"}
                  onChange={(e) => setHex(e.target.value)}
                />
              </label>

              <div className="ccl-chip-row">
                {["#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff"].map(
                  (c) => (
                    <button
                      key={c}
                      type="button"
                      className="ccl-chip"
                      onClick={() => setHex(c)}
                    >
                      {c}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          <div className="ccl-preview" style={previewStyle}>
            <h3 className="ccl-preview-title">Live preview</h3>
            <p>
              This text is styled with{" "}
              <code>
                {propertyName}: {currentCssValue}
              </code>
              .
            </p>
          </div>
        </section>

        {/* RIGHT: explanation + code */}
        <section className="ccl-panel ccl-right">
          <h3 className="ccl-info-title">{info.title}</h3>
          <p className="ccl-info-text">{info.text}</p>

          <pre className="ccl-code-block">
            <code>{`h1 {
  ${propertyName}: ${currentCssValue};
}`}</code>
          </pre>

          <ul className="ccl-hints">
            <li>
              Try different values and watch the preview change immediately.
            </li>
            <li>
              The only thing that changes is the <code>{propertyName}</code>{" "}
              value.
            </li>
            <li>
              Same rule, different formats → same visual result if the color is
              equal.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CssColorsVisualization;
import React, { useState } from "react";
import "./visual.css";

const ENTITY_ROWS = [
  { char: "<", name: "Less than", entity: "&lt;" },
  { char: ">", name: "Greater than", entity: "&gt;" },
  { char: "&", name: "Ampersand", entity: "&amp;" },
  { char: " ", name: "Space", entity: "&nbsp;" },
  { char: '"', name: "Double quote", entity: "&quot;" },
  { char: "♥", name: "Heart", entity: "&hearts;" },
  { char: "©", name: "Copyright", entity: "&#169;" },
  { char: "®", name: "Registered", entity: "&#174;" },
  { char: "₹", name: "Indian Rupee", entity: "&#8377;" },
];

const UNICODE_ROWS = [
  { code: "&#169;", char: "©", description: "Copyright symbol" },
  { code: "&#174;", char: "®", description: "Registered trademark" },
  { code: "&#8377;", char: "₹", description: "Indian Rupee sign" },
];

const EMMET_EXAMPLES = [
  {
    id: "p3",
    abbr: "p*3",
    title: "Three paragraphs",
    explanation: "Repeat the <p> tag 3 times.",
    code: `<p></p>
<p></p>
<p></p>`,
  },
  {
    id: "ul5",
    abbr: "ul>li*5",
    title: "List with 5 items",
    explanation: "Create a <ul> with 5 <li> items inside.",
    code: `<ul>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>`,
  },
  {
    id: "container",
    abbr: ".container",
    title: "Div with class",
    explanation: `Create a <div> with class="container".`,
    code: `<div class="container"></div>`,
  },
  {
    id: "box",
    abbr: "#box",
    title: "Div with id",
    explanation: `Create a <div> with id="box".`,
    code: `<div id="box"></div>`,
  },
];

const HtmlEntitiesEmmetVisualization = () => {
  const [tab, setTab] = useState("entities"); // 'entities' | 'unicode' | 'emmet'
  const [activeEntity, setActiveEntity] = useState(ENTITY_ROWS[0]);
  const [activeEmmet, setActiveEmmet] = useState(EMMET_EXAMPLES[0]);

  return (
    <div className="he1-container">
      <header className="he1-header">
        <h2>Quick Visual Guide</h2>
        <p className="he1-instruction">
          Switch tabs to see how special characters and Emmet shortcuts work.
        </p>
      </header>

      <div className="he1-tabs" role="tablist">
        <button
          type="button"
          className={`he1-tab ${tab === "entities" ? "he1-tab-active" : ""}`}
          onClick={() => setTab("entities")}
        >
          HTML Entities (symbols)
        </button>
        <button
          type="button"
          className={`he1-tab ${tab === "unicode" ? "he1-tab-active" : ""}`}
          onClick={() => setTab("unicode")}
        >
          Unicode codes
        </button>
        <button
          type="button"
          className={`he1-tab ${tab === "emmet" ? "he1-tab-active" : ""}`}
          onClick={() => setTab("emmet")}
        >
          Emmet shortcuts
        </button>
      </div>

      {tab === "entities" && (
        <section className="he1-panel">
          <p className="he1-panel-sub">
            These entities let you safely show special characters inside HTML
            code.
          </p>

          <div className="he1-entity-layout">
            <div className="he1-entity-list">
              <div className="he1-entity-list-header">
                <span>Character</span>
                <span>Entity</span>
              </div>
              {ENTITY_ROWS.map((row) => (
                <button
                  key={row.entity}
                  type="button"
                  className={`he1-entity-row ${
                    activeEntity.entity === row.entity
                      ? "he1-entity-row-active"
                      : ""
                  }`}
                  onClick={() => setActiveEntity(row)}
                >
                  <span className="he1-entity-char">{row.char || "␣"}</span>
                  <span className="he1-entity-code">{row.entity}</span>
                </button>
              ))}
            </div>

            <div className="he1-entity-detail">
              <h3 className="he1-detail-title">{activeEntity.name}</h3>
              <p className="he1-detail-text">
                To show this character in HTML, you write the{" "}
                <strong>entity</strong> instead of typing it directly.
              </p>

              <div className="he1-box">
                <p className="he1-box-label">In your HTML file:</p>
                <pre className="he1-code-block">
                  <code>{activeEntity.entity}</code>
                </pre>
                <p className="he1-box-label">What the browser shows:</p>
                <div className="he1-preview-char">{activeEntity.char}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {tab === "unicode" && (
        <section className="he1-panel">
          <p className="he1-panel-sub">
            Numeric codes are another way to display special characters.
          </p>

          <div className="he1-unicode-grid">
            {UNICODE_ROWS.map((row) => (
              <div key={row.code} className="he1-unicode-card">
                <div className="he1-unicode-char">{row.char}</div>
                <div className="he1-unicode-code">{row.code}</div>
                <p className="he1-unicode-desc">{row.description}</p>
              </div>
            ))}
          </div>

          <div className="he1-box">
            <p className="he1-box-label">Example HTML:</p>
            <pre className="he1-code-block">
              <code>
{`&copy; 2025 My Site
&#169; 2025 My Site
&#8377; 999`}
              </code>
            </pre>
            <p className="he1-box-label">Rendered output:</p>
            <p className="he1-unicode-output">
              © 2025 My Site
              <br />
              © 2025 My Site
              <br />₹ 999
            </p>
          </div>
        </section>
      )}

      {tab === "emmet" && (
        <section className="he1-panel">
          <p className="he1-panel-sub">
            Emmet expands short abbreviations into full HTML. It&apos;s built
            into VS Code.
          </p>

          <div className="he1-emmet-layout">
            <div className="he1-emmet-list">
              {EMMET_EXAMPLES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`he1-emmet-row ${
                    activeEmmet.id === item.id ? "he1-emmet-row-active" : ""
                  }`}
                  onClick={() => setActiveEmmet(item)}
                >
                  <span className="he1-emmet-abbr">{item.abbr}</span>
                  <span className="he1-emmet-title">{item.title}</span>
                </button>
              ))}
            </div>

            <div className="he1-emmet-detail">
              <h3 className="he1-detail-title">
                {activeEmmet.abbr} → {activeEmmet.title}
              </h3>
              <p className="he1-detail-text">{activeEmmet.explanation}</p>

              <div className="he1-box">
                <p className="he1-box-label">You type (Emmet):</p>
                <pre className="he1-code-block he1-code-inline">
                  <code>{activeEmmet.abbr}</code>
                </pre>

                <p className="he1-box-label">Emmet expands to:</p>
                <pre className="he1-code-block">
                  <code>{activeEmmet.code}</code>
                </pre>
              </div>

              <p className="he1-tip">
                Tip: In VS Code, type an Emmet abbreviation, then press{" "}
                <strong>Tab</strong> or <strong>Enter</strong> to expand it.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HtmlEntitiesEmmetVisualization;
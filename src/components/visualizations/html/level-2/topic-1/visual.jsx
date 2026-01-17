import React, { useState } from "react";
import "./visual.css";

const InlineBlockElementsVisualization = () => {
  const [activeTab, setActiveTab] = useState("flow"); // 'flow' | 'div-span' | 'hr' | 'supsub'
  const [flowView, setFlowView] = useState("compare"); // 'block' | 'inline' | 'compare'
  const [highlightDivSpan, setHighlightDivSpan] = useState("both"); // 'div' | 'span' | 'both'
  const [hrStyle, setHrStyle] = useState("default"); // 'default' | 'thin' | 'bold'
  const [supExample, setSupExample] = useState("math"); // 'math' | 'chem'

  // Flow tab: explanations
  const flowExplanation =
    flowView === "block"
      ? "Block-level elements start on a new line and stretch across the container. They are used to build the main structure of a page."
      : flowView === "inline"
      ? "Inline elements sit inside a line of text and only take up as much width as they need. They are great for styling words inside a sentence."
      : "Here you can see both: block elements stacking vertically, and inline elements flowing across the same line.";

  // HR style class
  const hrClass =
    hrStyle === "thin"
      ? "hb7-hr hb7-hr-thin"
      : hrStyle === "bold"
      ? "hb7-hr hb7-hr-bold"
      : "hb7-hr";

  const renderFlowTab = () => (
    <>
      <div className="hb7-controls-section">
        <h3 className="hb7-controls-title">How block and inline elements flow</h3>
        <p className="hb7-controls-hint">
          Switch the view to see how block-level elements stack and inline
          elements sit in the same line.
        </p>
        <div className="hb7-toggle-group">
          <button
            type="button"
            className={`hb7-toggle-btn ${
              flowView === "block" ? "hb7-toggle-btn-active" : ""
            }`}
            onClick={() => setFlowView("block")}
          >
            Only block elements
          </button>
          <button
            type="button"
            className={`hb7-toggle-btn ${
              flowView === "inline" ? "hb7-toggle-btn-active" : ""
            }`}
            onClick={() => setFlowView("inline")}
          >
            Only inline elements
          </button>
          <button
            type="button"
            className={`hb7-toggle-btn ${
              flowView === "compare" ? "hb7-toggle-btn-active" : ""
            }`}
            onClick={() => setFlowView("compare")}
          >
            Compare both
          </button>
        </div>
      </div>

      <div className="hb7-preview-card">
        <div className="hb7-preview-header">Layout flow demo</div>
        <div className="hb7-preview-body hb7-flow-preview">
          {(flowView === "block" || flowView === "compare") && (
            <div className="hb7-flow-column">
              <div className="hb7-flow-label">Block elements</div>
              <div className="hb7-block-line">
                <div className="hb7-block-chip">&lt;h1&gt;</div>
              </div>
              <div className="hb7-block-line">
                <div className="hb7-block-chip">&lt;p&gt;</div>
              </div>
              <div className="hb7-block-line">
                <div className="hb7-block-chip">&lt;section&gt;</div>
              </div>
              <div className="hb7-block-line">
                <div className="hb7-block-chip">&lt;div&gt;</div>
              </div>
            </div>
          )}

          {(flowView === "inline" || flowView === "compare") && (
            <div className="hb7-flow-column">
              <div className="hb7-flow-label">Inline elements</div>
              <div className="hb7-inline-line">
                <span className="hb7-inline-chip">&lt;a&gt;</span>
                <span className="hb7-inline-chip">&lt;span&gt;</span>
                <span className="hb7-inline-chip">&lt;img&gt;</span>
                <span className="hb7-inline-chip">&lt;strong&gt;</span>
                <span className="hb7-inline-chip">&lt;em&gt;</span>
              </div>
            </div>
          )}
        </div>

        <p className="hb7-preview-sub">{flowExplanation}</p>

        <div className="hb7-code-explainer">
          <pre className="hb7-code-block">
            <code>
{`<!-- Block-level examples -->
<h1>Heading</h1>
<p>This is a paragraph.</p>
<div>Wrapper box</div>

<!-- Inline examples -->
<p>This is a <span>highlighted</span> word and a <a href="#">link</a>.</p>`}
            </code>
          </pre>
        </div>
      </div>
    </>
  );

  const renderDivSpanTab = () => (
    <>
      <div className="hb7-controls-section">
        <h3 className="hb7-controls-title">&lt;div&gt; vs &lt;span&gt;</h3>
        <p className="hb7-controls-hint">
          Highlight what each element is doing: grouping a whole section, or just
          part of a sentence.
        </p>
        <div className="hb7-toggle-group">
          <button
            type="button"
            className={`hb7-toggle-btn ${
              highlightDivSpan === "div" ? "hb7-toggle-btn-active" : ""
            }`}
            onClick={() => setHighlightDivSpan("div")}
          >
            Focus on &lt;div&gt;
          </button>
          <button
            type="button"
            className={`hb7-toggle-btn ${
              highlightDivSpan === "span" ? "hb7-toggle-btn-active" : ""
            }`}
            onClick={() => setHighlightDivSpan("span")}
          >
            Focus on &lt;span&gt;
          </button>
          <button
            type="button"
            className={`hb7-toggle-btn ${
              highlightDivSpan === "both" ? "hb7-toggle-btn-active" : ""
            }`}
            onClick={() => setHighlightDivSpan("both")}
          >
            Show both
          </button>
        </div>
      </div>

      <div className="hb7-preview-card">
        <div className="hb7-preview-header">&lt;div&gt; groups blocks, &lt;span&gt; highlights text</div>

        <div className="hb7-preview-body">
          <div
            className={`hb7-div-demo ${
              highlightDivSpan === "div" || highlightDivSpan === "both"
                ? "hb7-div-demo-highlight"
                : ""
            }`}
          >
            <div className="hb7-div-label">&lt;div&gt; (block container)</div>
            <h2 className="hb7-div-title">Title inside a div</h2>
            <p className="hb7-div-text">
              This whole section, including the title and paragraph, is grouped
              together by a single <code>&lt;div&gt;</code>.
            </p>
          </div>

          <p className="hb7-span-sentence">
            My name is{" "}
            <span
              className={`hb7-span-highlight ${
                highlightDivSpan === "span" || highlightDivSpan === "both"
                  ? "hb7-span-highlight-on"
                  : ""
              }`}
            >
              Pramod
            </span>
            . Only this word is wrapped in <code>&lt;span&gt;</code> to style it.
          </p>
        </div>

        <div className="hb7-code-explainer">
          <pre className="hb7-code-block">
            <code>
{`<div>
  <h2>Title</h2>
  <p>This is grouped inside a div.</p>
</div>

<p>My name is <span style="color: blue;">Pramod</span>.</p>`}
            </code>
          </pre>
        </div>
      </div>
    </>
  );

  const renderHrTab = () => (
    <>
      <div className="hb7-controls-section">
        <h3 className="hb7-controls-title">&lt;hr&gt; – Horizontal rule</h3>
        <p className="hb7-controls-hint">
          Change the style of the divider line between two paragraphs.
        </p>
        <div className="hb7-toggle-group">
          <button
            type="button"
            className={`hb7-toggle-btn ${
              hrStyle === "default" ? "hb7-toggle-btn-active" : ""
            }`}
            onClick={() => setHrStyle("default")}
          >
            Default
          </button>
          <button
            type="button"
            className={`hb7-toggle-btn ${
              hrStyle === "thin" ? "hb7-toggle-btn-active" : ""
            }`}
            onClick={() => setHrStyle("thin")}
          >
            Thin line
          </button>
          <button
            type="button"
            className={`hb7-toggle-btn ${
              hrStyle === "bold" ? "hb7-toggle-btn-active" : ""
            }`}
            onClick={() => setHrStyle("bold")}
          >
            Strong divider
          </button>
        </div>
      </div>

      <div className="hb7-preview-card">
        <div className="hb7-preview-header">Section separator</div>
        <div className="hb7-preview-body">
          <p className="hb7-hr-text">Paragraph 1 — above the divider.</p>
          <div className={hrClass} />
          <p className="hb7-hr-text">Paragraph 2 — below the divider.</p>
        </div>

        <div className="hb7-code-explainer">
          <pre className="hb7-code-block">
            <code>
{`<p>Paragraph 1</p>
<hr>
<p>Paragraph 2</p>`}
            </code>
          </pre>
          <p className="hb7-preview-sub">
            <code>&lt;hr&gt;</code> is a block-level element that visually
            separates content sections.
          </p>
        </div>
      </div>
    </>
  );

  const renderSupSubTab = () => {
    const mathExample = "a² = a^2 (using <sup>)";
    const chemExample = "H₂O = H2O (using <sub>)";

    return (
      <>
        <div className="hb7-controls-section">
          <h3 className="hb7-controls-title">
            Superscript &amp; subscript: &lt;sup&gt; and &lt;sub&gt;
          </h3>
          <p className="hb7-controls-hint">
            Switch between a math exponent and a chemical formula.
          </p>
          <div className="hb7-toggle-group">
            <button
              type="button"
              className={`hb7-toggle-btn ${
                supExample === "math" ? "hb7-toggle-btn-active" : ""
              }`}
              onClick={() => setSupExample("math")}
            >
              Exponent (superscript)
            </button>
            <button
              type="button"
              className={`hb7-toggle-btn ${
                supExample === "chem" ? "hb7-toggle-btn-active" : ""
              }`}
              onClick={() => setSupExample("chem")}
            >
              Chemical formula (subscript)
            </button>
          </div>
        </div>

        <div className="hb7-preview-card">
          <div className="hb7-preview-header">Baseline vs. above/below</div>
          <div className="hb7-preview-body hb7-supsub-preview">
            <div className="hb7-supsub-row">
              <span className="hb7-supsub-label">Normal text line:</span>
              <span className="hb7-supsub-baseline">
                a2 &nbsp; / &nbsp; H2O
              </span>
            </div>
            <div className="hb7-supsub-row hb7-supsub-row-active">
              <span className="hb7-supsub-label">
                With {supExample === "math" ? "superscript" : "subscript"}:
              </span>
              <span className="hb7-supsub-baseline">
                {supExample === "math" ? (
                  <>
                    a<sup>2</sup>
                  </>
                ) : (
                  <>
                    H<sub>2</sub>O
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="hb7-code-explainer">
            <pre className="hb7-code-block">
              <code>
                {supExample === "math"
                  ? `a<sup>2</sup>`
                  : `H<sub>2</sub>O`}
              </code>
            </pre>
            <p className="hb7-preview-sub">
              <code>&lt;sup&gt;</code> raises text above the baseline (for
              exponents), while <code>&lt;sub&gt;</code> drops text below (for
              chemical formulas and indices).
            </p>
          </div>
        </div>
      </>
    );
  };

  const renderActiveTab = () => {
    if (activeTab === "flow") return renderFlowTab();
    if (activeTab === "div-span") return renderDivSpanTab();
    if (activeTab === "hr") return renderHrTab();
    return renderSupSubTab();
  };

  return (
    <div className="hb7-container">
      <header className="hb7-header">
        <h2>Layout Playground</h2>
        <p className="hb7-instruction">
          Explore how different HTML elements behave in layout, and how special
          tags like &lt;div&gt;, &lt;span&gt;, &lt;hr&gt;, &lt;sup&gt; and
          &lt;sub&gt; work.
        </p>
      </header>

      <div className="hb7-layout">
        <div className="hb7-tabs" role="tablist">
          <button
            type="button"
            className={`hb7-tab-btn ${
              activeTab === "flow" ? "hb7-tab-btn-active" : ""
            }`}
            onClick={() => setActiveTab("flow")}
          >
            Block vs Inline flow
          </button>
          <button
            type="button"
            className={`hb7-tab-btn ${
              activeTab === "div-span" ? "hb7-tab-btn-active" : ""
            }`}
            onClick={() => setActiveTab("div-span")}
          >
            &lt;div&gt; vs &lt;span&gt;
          </button>
          <button
            type="button"
            className={`hb7-tab-btn ${
              activeTab === "hr" ? "hb7-tab-btn-active" : ""
            }`}
            onClick={() => setActiveTab("hr")}
          >
            &lt;hr&gt; divider
          </button>
          <button
            type="button"
            className={`hb7-tab-btn ${
              activeTab === "supsub" ? "hb7-tab-btn-active" : ""
            }`}
            onClick={() => setActiveTab("supsub")}
          >
            Superscript &amp; subscript
          </button>
        </div>

        <div className="hb7-panels">
          {/* On mobile this stacks; on desktop it's side by side */}
          <section className="hb7-panel hb7-panel-main">
            {renderActiveTab()}
          </section>
        </div>
      </div>
    </div>
  );
};

export default InlineBlockElementsVisualization;
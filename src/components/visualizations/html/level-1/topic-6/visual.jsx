import React, { useState } from "react";
import "./visual.css";

const HtmlLinksImagesBasicsVisualization = () => {
  const [activeTab, setActiveTab] = useState("links"); // 'links' | 'images' | 'format' | 'other'
  const [linkType, setLinkType] = useState("absolute"); // 'absolute' | 'relative'
  const [imageBroken, setImageBroken] = useState(false);
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [caseStyle, setCaseStyle] = useState("lower"); // 'lower' | 'upper' | 'mixed'
  const [showComment, setShowComment] = useState(true);

  const linkHref =
    linkType === "absolute" ? "https://www.youtube.com" : "/about.html";
  const linkLabel =
    linkType === "absolute" ? "Visit YouTube" : "Go to About page";
  const linkCode = `<a href="${linkHref}">${linkLabel}</a>`;

  const imgSrc = "car.png";
  const imgAlt = "A red sports car";
  const imgCode = `<img src="${imgSrc}" alt="${imgAlt}">`;

  const formatText = "This text can be bold, italic, and underlined.";
  const formatClassNames = [
    "ha6-format-text",
    bold ? "ha6-format-bold" : "",
    italic ? "ha6-format-italic" : "",
    underline ? "ha6-format-underline" : "",
  ]
    .filter(Boolean)
    .join(" ");

  let htmlTagExample = "<html>";
  if (caseStyle === "upper") htmlTagExample = "<HTML>";
  if (caseStyle === "mixed") htmlTagExample = "<Html>";

  const renderControls = () => {
    if (activeTab === "links") {
      return (
        <div className="ha6-controls-section">
          <h3 className="ha6-controls-title">Link type</h3>
          <p className="ha6-controls-hint">
            Switch between an external website (absolute URL) and an internal
            page (relative URL).
          </p>
          <div className="ha6-toggle-group">
            <button
              type="button"
              className={`ha6-toggle-btn ${
                linkType === "absolute" ? "ha6-toggle-btn-active" : ""
              }`}
              onClick={() => setLinkType("absolute")}
            >
              External site (absolute URL)
            </button>
            <button
              type="button"
              className={`ha6-toggle-btn ${
                linkType === "relative" ? "ha6-toggle-btn-active" : ""
              }`}
              onClick={() => setLinkType("relative")}
            >
              Internal page (relative URL)
            </button>
          </div>
        </div>
      );
    }

    if (activeTab === "images") {
      return (
        <div className="ha6-controls-section">
          <h3 className="ha6-controls-title">Image loading</h3>
          <p className="ha6-controls-hint">
            Toggle between a normal image and a broken image to see when{" "}
            <code>alt</code> text appears.
          </p>
          <div className="ha6-toggle-group">
            <button
              type="button"
              className={`ha6-toggle-btn ${
                !imageBroken ? "ha6-toggle-btn-active" : ""
              }`}
              onClick={() => setImageBroken(false)}
            >
              Image loads
            </button>
            <button
              type="button"
              className={`ha6-toggle-btn ${
                imageBroken ? "ha6-toggle-btn-active" : ""
              }`}
              onClick={() => setImageBroken(true)}
            >
              Image fails to load
            </button>
          </div>
        </div>
      );
    }

    if (activeTab === "format") {
      return (
        <div className="ha6-controls-section">
          <h3 className="ha6-controls-title">Text formatting</h3>
          <p className="ha6-controls-hint">
            Turn bold, italic, and underline on or off and watch the text and
            code change.
          </p>
          <div className="ha6-toggle-group ha6-toggle-group-multi">
            <button
              type="button"
              className={`ha6-toggle-btn ${
                bold ? "ha6-toggle-btn-active" : ""
              }`}
              onClick={() => setBold((v) => !v)}
            >
              Bold (&lt;b&gt;)
            </button>
            <button
              type="button"
              className={`ha6-toggle-btn ${
                italic ? "ha6-toggle-btn-active" : ""
              }`}
              onClick={() => setItalic((v) => !v)}
            >
              Italic (&lt;i&gt;)
            </button>
            <button
              type="button"
              className={`ha6-toggle-btn ${
                underline ? "ha6-toggle-btn-active" : ""
              }`}
              onClick={() => setUnderline((v) => !v)}
            >
              Underline (&lt;u&gt;)
            </button>
          </div>
        </div>
      );
    }

    // other tab
    return (
      <div className="ha6-controls-section">
        <h3 className="ha6-controls-title">Other HTML basics</h3>
        <p className="ha6-controls-hint">
          Change the case of the <code>&lt;html&gt;</code> tag and toggle a
          comment.
        </p>
        <div className="ha6-toggle-group">
          <button
            type="button"
            className={`ha6-toggle-btn ${
              caseStyle === "lower" ? "ha6-toggle-btn-active" : ""
            }`}
            onClick={() => setCaseStyle("lower")}
          >
            &lt;html&gt; (lowercase)
          </button>
          <button
            type="button"
            className={`ha6-toggle-btn ${
              caseStyle === "upper" ? "ha6-toggle-btn-active" : ""
            }`}
            onClick={() => setCaseStyle("upper")}
          >
            &lt;HTML&gt; (uppercase)
          </button>
          <button
            type="button"
            className={`ha6-toggle-btn ${
              caseStyle === "mixed" ? "ha6-toggle-btn-active" : ""
            }`}
            onClick={() => setCaseStyle("mixed")}
          >
            &lt;Html&gt; (mixed)
          </button>
        </div>
        <div className="ha6-toggle-group ha6-toggle-group-single">
          <button
            type="button"
            className={`ha6-toggle-btn ${
              showComment ? "ha6-toggle-btn-active" : ""
            }`}
            onClick={() => setShowComment((v) => !v)}
          >
            {showComment ? "Hide comment" : "Show comment"}
          </button>
        </div>
      </div>
    );
  };

  const renderPreview = () => {
    if (activeTab === "links") {
      return (
        <>
          <div className="ha6-preview-header">Link preview</div>
          <div className="ha6-preview-body">
            <p className="ha6-preview-label">Simulated link:</p>
            <button
              type="button"
              className="ha6-link-preview"
              onClick={() => {}}
            >
              {linkLabel}
            </button>
            <p className="ha6-preview-sub">
              href="<span className="ha6-preview-url">{linkHref}</span>"
            </p>
          </div>
          <div className="ha6-code-explainer">
            <pre className="ha6-code-block">
              <code>{linkCode}</code>
            </pre>
            <p>
              An <strong>absolute URL</strong> includes the full website
              address. A <strong>relative URL</strong> points to a file inside
              your own project.
            </p>
          </div>
        </>
      );
    }

    if (activeTab === "images") {
      return (
        <>
          <div className="ha6-preview-header">Image and alt text</div>
          <div className="ha6-preview-body">
            <div
              className={`ha6-image-frame ${
                imageBroken ? "ha6-image-broken" : "ha6-image-ok"
              }`}
            >
              {imageBroken ? (
                <span className="ha6-alt-preview">Alt: "{imgAlt}"</span>
              ) : (
                <span className="ha6-image-label">Image</span>
              )}
            </div>
            <p className="ha6-preview-sub">
              When the image fails to load, the browser shows the{" "}
              <code>alt</code> text instead.
            </p>
          </div>
          <div className="ha6-code-explainer">
            <pre className="ha6-code-block">
              <code>{imgCode}</code>
            </pre>
            <p>
              <code>src</code> tells the browser where to find the image file.
              <code>alt</code> describes the image for screen readers and when
              the image cannot be displayed.
            </p>
          </div>
        </>
      );
    }

    if (activeTab === "format") {
      const openTags = [
        bold && "<b>",
        italic && "<i>",
        underline && "<u>",
      ]
        .filter(Boolean)
        .join("");
      const closeTags = [
        underline && "</u>",
        italic && "</i>",
        bold && "</b>",
      ]
        .filter(Boolean)
        .join("");
      const formatCode = `${openTags || ""}${formatText}${closeTags || ""}`;

      return (
        <>
          <div className="ha6-preview-header">Text formatting</div>
          <div className="ha6-preview-body">
            <p className={formatClassNames}>{formatText}</p>
            <p className="ha6-preview-sub">
              Combine <code>&lt;b&gt;</code>, <code>&lt;i&gt;</code>, and{" "}
              <code>&lt;u&gt;</code> to style text.
            </p>
          </div>
          <div className="ha6-code-explainer">
            <pre className="ha6-code-block">
              <code>{formatCode}</code>
            </pre>
            <p>
              These tags change only the visual style. They do not change the
              meaning of the text.
            </p>
          </div>
        </>
      );
    }

    const commentCode = "<!-- This is a comment -->";
    const htmlCaseBlock = `<HTML>
<Html>
<html>`;

    return (
      <>
        <div className="ha6-preview-header">Comments &amp; HTML rules</div>
        <div className="ha6-preview-body">
          <p className="ha6-preview-label">Current html tag example:</p>
          <pre className="ha6-code-block ha6-code-inline">
            <code>{htmlTagExample}</code>
          </pre>

          <p className="ha6-preview-sub">
            Browsers treat all of these forms the same, but using lowercase{" "}
            <code>&lt;html&gt;</code> is the recommended style.
          </p>

          <div className="ha6-comment-preview-wrapper">
            <p className="ha6-preview-label">Comment preview:</p>
            <pre
              className={`ha6-code-block ha6-code-inline ${
                showComment ? "" : "ha6-comment-muted"
              }`}
            >
              <code>{commentCode}</code>
            </pre>
            <p className="ha6-preview-sub">
              Comments are ignored by the browser. Use them to explain or
              organize your code.
            </p>
          </div>
        </div>
        <div className="ha6-code-explainer">
          <pre className="ha6-code-block">
            <code>{htmlCaseBlock}</code>
          </pre>
          <p>
            HTML follows the <strong>HTML Living Standard</strong>, maintained
            by WHATWG. It is always evolving so that browsers behave
            consistently and new features can be added over time.
          </p>
        </div>
      </>
    );
  };

  return (
    <div className="ha6-container">
      <header className="ha6-header">
        <h2>Play with Links, Images, and HTML Basics</h2>
        <p className="ha6-instruction">
          Use the controls to change the code and see what happens in the
          preview.
        </p>
      </header>

      <div className="ha6-layout">
        <div className="ha6-tabs" role="tablist">
          <button
            type="button"
            className={`ha6-tab-btn ${
              activeTab === "links" ? "ha6-tab-btn-active" : ""
            }`}
            onClick={() => setActiveTab("links")}
          >
            Links (&lt;a&gt; / href)
          </button>
          <button
            type="button"
            className={`ha6-tab-btn ${
              activeTab === "images" ? "ha6-tab-btn-active" : ""
            }`}
            onClick={() => setActiveTab("images")}
          >
            Images (&lt;img&gt; / src / alt)
          </button>
          <button
            type="button"
            className={`ha6-tab-btn ${
              activeTab === "format" ? "ha6-tab-btn-active" : ""
            }`}
            onClick={() => setActiveTab("format")}
          >
            Text formatting
          </button>
          <button
            type="button"
            className={`ha6-tab-btn ${
              activeTab === "other" ? "ha6-tab-btn-active" : ""
            }`}
            onClick={() => setActiveTab("other")}
          >
            Comments &amp; rules
          </button>
        </div>

        <div className="ha6-panels">
          <section className="ha6-controls-panel">{renderControls()}</section>

          {/* <section className="ha6-preview-panel"> */}
            <div className="ha6-preview-card">{renderPreview()}</div>
          {/* </section> */}
        </div>
      </div>
    </div>
  );
};

export default HtmlLinksImagesBasicsVisualization;
import React, { useState } from "react";
import "./visual.css";

const TAGS = [
  {
    id: "header",
    label: "<header>",
    title: "<header> – Top area",
    description: [
      "Usually at the very top of the page or a section.",
      "Often contains logo, title, intro text, or navigation.",
    ],
    code: `<header>
  <h1>My Website</h1>
  <p>Learning semantic HTML</p>
</header>`,
  },
  {
    id: "nav",
    label: "<nav>",
    title: "<nav> – Navigation",
    description: [
      "Holds the main navigation links.",
      "Screen readers can quickly jump to this area.",
    ],
    code: `<nav>
  <a href="#home">Home</a>
  <a href="#blog">Blog</a>
  <a href="#contact">Contact</a>
</nav>`,
  },
  {
    id: "main",
    label: "<main>",
    title: "<main> – Main content",
    description: [
      "Wraps the primary content of the page.",
      "There should be only one <main> per page.",
    ],
    code: `<main>
  <h2>Welcome!</h2>
  <p>This is the main content of the page.</p>
</main>`,
  },
  {
    id: "section",
    label: "<section>",
    title: "<section> – Group of related content",
    description: [
      "Groups content under one theme or heading.",
      "Think of it like a chapter inside the main content.",
    ],
    code: `<section>
  <h2>Latest Tutorials</h2>
  <p>Start learning HTML, CSS, and JavaScript.</p>
</section>`,
  },
  {
    id: "article",
    label: "<article>",
    title: "<article> – Independent piece",
    description: [
      "A self‑contained unit like a blog post or news item.",
      "Can be shared or reused on its own.",
    ],
    code: `<article>
  <h3>Semantic HTML Basics</h3>
  <p>Semantic tags describe the meaning of content.</p>
</article>`,
  },
  {
    id: "aside",
    label: "<aside>",
    title: "<aside> – Side info",
    description: [
      "Holds extra, related content such as tips or ads.",
      "Not the main story, but related to it.",
    ],
    code: `<aside>
  <h4>Did you know?</h4>
  <p>Semantic HTML improves accessibility and SEO.</p>
</aside>`,
  },
  {
    id: "footer",
    label: "<footer>",
    title: "<footer> – Bottom area",
    description: [
      "Bottom part of a page or section.",
      "Often contains contact info, copyright, or links.",
    ],
    code: `<footer>
  <p>&copy; 2025 My Website</p>
  <a href="/privacy">Privacy</a>
</footer>`,
  },
];

const SemanticMarkupVisualization = () => {
  const [activeId, setActiveId] = useState("header");
  const activeTag = TAGS.find((t) => t.id === activeId) ?? TAGS[0];

  return (
    <div className="sm1-container">
      <header className="sm1-header">
        <h2>Simple Page Map</h2>
        <p className="sm1-instruction">
          Tap a colored area or a tag button to learn what it does.
        </p>
      </header>

      <div className="sm1-layout">
        {/* Left: simple layout diagram */}
        <section className="sm1-panel sm1-panel-left">
          <p className="sm1-panel-sub">
            This is a tiny &quot;web page&quot; with the most common semantic
            tags.
          </p>

          <div className="sm1-page-outline">
            <button
              type="button"
              className={`sm1-region sm1-region-header ${
                activeId === "header" ? "sm1-region-active" : ""
              }`}
              onClick={() => setActiveId("header")}
            >
              &lt;header&gt;
            </button>

            <button
              type="button"
              className={`sm1-region sm1-region-nav ${
                activeId === "nav" ? "sm1-region-active" : ""
              }`}
              onClick={() => setActiveId("nav")}
            >
              &lt;nav&gt;
            </button>

            <div className="sm1-main-wrapper">
              <button
                type="button"
                className={`sm1-region sm1-region-main ${
                  activeId === "main" ? "sm1-region-active" : ""
                }`}
                onClick={() => setActiveId("main")}
              >
                &lt;main&gt;
              </button>

              <div className="sm1-main-grid">
                <button
                  type="button"
                  className={`sm1-region sm1-region-section ${
                    activeId === "section" ? "sm1-region-active" : ""
                  }`}
                  onClick={() => setActiveId("section")}
                >
                  &lt;section&gt;
                </button>

                <button
                  type="button"
                  className={`sm1-region sm1-region-article ${
                    activeId === "article" ? "sm1-region-active" : ""
                  }`}
                  onClick={() => setActiveId("article")}
                >
                  &lt;article&gt;
                </button>

                <button
                  type="button"
                  className={`sm1-region sm1-region-aside ${
                    activeId === "aside" ? "sm1-region-active" : ""
                  }`}
                  onClick={() => setActiveId("aside")}
                >
                  &lt;aside&gt;
                </button>
              </div>
            </div>

            <button
              type="button"
              className={`sm1-region sm1-region-footer ${
                activeId === "footer" ? "sm1-region-active" : ""
              }`}
              onClick={() => setActiveId("footer")}
            >
              &lt;footer&gt;
            </button>
          </div>

          <p className="sm1-small-note">
            Non‑semantic elements like <code>&lt;div&gt;</code> and{" "}
            <code>&lt;span&gt;</code> don&apos;t tell browsers what an area
            means. Semantic tags do.
          </p>
        </section>

        {/* Right: explanation */}
        {/* <section className="sm1-panel sm1-panel-right"> */}
          {/* <div className="sm1-tag-buttons">
            {TAGS.map((tag) => (
              <button
                key={tag.id}
                type="button"
                className={`sm1-tag-btn ${
                  activeId === tag.id ? "sm1-tag-btn-active" : ""
                }`}
                onClick={() => setActiveId(tag.id)}
              >
                {tag.label}
              </button>
            ))}
          </div> */}

          <div className="sm1-panel sm1-panel-right sm1-details-card">
            <h3 className="sm1-details-title">{activeTag.title}</h3>
            <ul className="sm1-details-list">
              {activeTag.description.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>

            <pre className="sm1-code-block">
              <code>{activeTag.code}</code>
            </pre>

            {/* <div className="sm1-hint-box">
              <p className="sm1-hint-title">Why semantic HTML matters</p>
              <ul className="sm1-hint-list">
                <li>Search engines understand your page better (SEO).</li>
                <li>Screen readers can jump to important regions.</li>
                <li>Code is easier to read and maintain.</li>
              </ul>
            </div> */}
          </div>
        {/* </section> */}
      </div>
    </div>
  );
};

export default SemanticMarkupVisualization;
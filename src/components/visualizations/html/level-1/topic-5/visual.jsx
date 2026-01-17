import React, { useState } from "react";
import "./visual.css";

// List of possible line IDs for attributes
const lineIds = [
  "intro",
  "syntax",
  "lang",
  "why",
  "type",
  "id",
  "class",
  "src",
  "href",
  "alt",
  "placeholder",
];

const detailsContent = {
  intro: {
    title: "What are HTML Attributes?",
    body: (
      <div className="ha5-details-body">
        <p>
          HTML attributes add extra information to a tag. They are written inside
          the <strong>opening tag</strong> and follow the pattern{" "}
          <code>name="value"</code>.
        </p>
        <p>
          They control how an element <strong>looks</strong>,{" "}
          <strong>behaves</strong>, or is <strong>described</strong>.
        </p>
      </div>
    ),
  },
  syntax: {
    title: "Attribute Syntax",
    body: (
      <div className="ha5-details-body">
        <p>
          Attributes always go inside the <strong>opening tag</strong>:
        </p>
        <pre className="ha5-code-font">
          {`<tagname attribute="value">Content</tagname>`}
        </pre>
        <ul>
          <li>
            <code>tagname</code> → the HTML element (like <code>p</code> or{" "}
            <code>a</code>)
          </li>
          <li>
            <code>attribute</code> → the setting name (like{" "}
            <code>id</code> or <code>href</code>)
          </li>
          <li>
            <code>value</code> → what you set it to
          </li>
        </ul>
      </div>
    ),
  },
  lang: {
    title: "The lang Attribute",
    body: (
      <div className="ha5-details-body">
        <p>
          <code>lang</code> tells the browser and assistive tools what language
          the page is written in.
        </p>
        <pre className="ha5-code-font">{`<html lang="en">`}</pre>
        <ul>
          <li>
            <code>en</code> → English
          </li>
          <li>
            <code>fr</code> → French
          </li>
          <li>
            <code>hi</code> → Hindi
          </li>
        </ul>
        <p>
          This helps with <strong>screen readers</strong>,{" "}
          <strong>spell check</strong>, and <strong>search engines</strong>.
        </p>
      </div>
    ),
  },
  why: {
    title: "Why Attributes Matter",
    body: (
      <div className="ha5-details-body">
        <ul>
          <li>
            <strong>Add meaning</strong> – like <code>lang="en"</code> or{" "}
            <code>alt="A red car"</code>
          </li>
          <li>
            <strong>Control behavior</strong> – like{" "}
            <code>type="a"</code> on an ordered list
          </li>
          <li>
            <strong>Improve accessibility</strong> – like{" "}
            <code>alt</code> on images
          </li>
          <li>
            <strong>Style elements</strong> – via <code>class</code> and{" "}
            <code>id</code>
          </li>
          <li>
            <strong>Link resources</strong> – like <code>href</code> and{" "}
            <code>src</code>
          </li>
        </ul>
      </div>
    ),
  },
  type: {
    title: "The type Attribute on <ol>",
    body: (
      <div className="ha5-details-body">
        <p>
          The <code>type</code> attribute on <code>&lt;ol&gt;</code> controls
          how list items are numbered.
        </p>
        <pre className="ha5-code-font">
          {`<ol type="a">
  <li>Bread</li>
  <li>Butter</li>
  <li>Jam</li>
</ol>`}
        </pre>
        <ul>
          <li>
            <code>type="1"</code> → <code>1, 2, 3</code>
          </li>
          <li>
            <code>type="a"</code> → <code>a, b, c</code>
          </li>
          <li>
            <code>type="A"</code> → <code>A, B, C</code>
          </li>
          <li>
            <code>type="i"</code> → <code>i, ii, iii</code>
          </li>
          <li>
            <code>type="I"</code> → <code>I, II, III</code>
          </li>
        </ul>
      </div>
    ),
  },
  id: {
    title: "The id Attribute",
    body: (
      <div className="ha5-details-body">
        <p>
          <code>id</code> gives an element a <strong>unique name</strong> on the
          page.
        </p>
        <pre className="ha5-code-font">
          {`<p id="intro">Hello!</p>`}
        </pre>
        <ul>
          <li>
            Used to target elements with <strong>CSS</strong> or{" "}
            <strong>JavaScript</strong>
          </li>
          <li>
            Must be <strong>unique</strong> – no two elements should share the
            same <code>id</code>
          </li>
        </ul>
      </div>
    ),
  },
  class: {
    title: "The class Attribute",
    body: (
      <div className="ha5-details-body">
        <p>
          <code>class</code> lets you group elements so you can style them
          together.
        </p>
        <pre className="ha5-code-font">
          {`<p class="highlight">Important</p>`}
        </pre>
        <p>
          Many elements can share the same <code>class</code>, so one CSS rule
          can style them all.
        </p>
      </div>
    ),
  },
  src: {
    title: "The src Attribute",
    body: (
      <div className="ha5-details-body">
        <p>
          <code>src</code> tells the browser where to load a file from, like an{" "}
          image or script.
        </p>
        <pre className="ha5-code-font">
          {`<img src="photo.jpg" />`}
        </pre>
        <p>
          The value can be a <strong>file path</strong> or a{" "}
          <strong>full URL</strong>.
        </p>
      </div>
    ),
  },
  href: {
    title: "The href Attribute",
    body: (
      <div className="ha5-details-body">
        <p>
          <code>href</code> is the destination URL for a link.
        </p>
        <pre className="ha5-code-font">
          {`<a href="https://google.com">Google</a>`}
        </pre>
        <p>
          Clicking the text sends the user to the <code>href</code> address.
        </p>
      </div>
    ),
  },
  alt: {
    title: "The alt Attribute",
    body: (
      <div className="ha5-details-body">
        <p>
          <code>alt</code> provides <strong>alternative text</strong> for an
          image.
        </p>
        <pre className="ha5-code-font">
          {`<img src="car.png" alt="A red car" />`}
        </pre>
        <ul>
          <li>Read out by screen readers</li>
          <li>Shown if the image cannot load</li>
          <li>Helps search engines understand images</li>
        </ul>
      </div>
    ),
  },
  placeholder: {
    title: "The placeholder Attribute",
    body: (
      <div className="ha5-details-body">
        <p>
          <code>placeholder</code> shows a light hint text inside an input
          field.
        </p>
        <pre className="ha5-code-font">
          {`<input type="text" placeholder="Enter name" />`}
        </pre>
        <p>
          It disappears when the user starts typing, helping them understand
          what to enter.
        </p>
      </div>
    ),
  },
};

const HtmlAttributesVisualization = () => {
  const [activeLine, setActiveLine] = useState("intro");

  const isActive = (id) => activeLine === id;

  return (
    <div className="ha5-container">
      <header className="ha5-header">
        <h2>Explore HTML Attributes</h2>
        <p className="ha5-instruction">
          👇 Tap a line of code to see what that attribute does.
        </p>
      </header>

      <div className="ha5-interactive-layout">
        {/* Code Panel */}
        <section className="ha5-code-panel">
          <div className="ha5-code-window-controls">
            <span className="ha5-dot ha5-dot-red" />
            <span className="ha5-dot ha5-dot-yellow" />
            <span className="ha5-dot ha5-dot-green" />
            <span className="ha5-filename">attributes.html</span>
          </div>

          <div className="ha5-code-block">
            {/* Intro concept */}
            <button
              type="button"
              className={`ha5-code-line ha5-indent-0 ${
                isActive("intro") ? "ha5-active" : ""
              }`}
              onClick={() => setActiveLine("intro")}
            >
              <span className="ha5-line-number">1</span>
              <span className="ha5-line-content ha5-code-font">
                &lt;!-- Attributes add extra information to HTML tags --&gt;
              </span>
            </button>

            {/* Syntax pattern */}
            <button
              type="button"
              className={`ha5-code-line ha5-indent-0 ${
                isActive("syntax") ? "ha5-active" : ""
              }`}
              onClick={() => setActiveLine("syntax")}
            >
              <span className="ha5-line-number">2</span>
              <span className="ha5-line-content ha5-code-font">
                &lt;tagname attribute="value"&gt;Content&lt;/tagname&gt;
              </span>
            </button>

            {/* lang attribute */}
            <button
              type="button"
              className={`ha5-code-line ha5-indent-0 ${
                isActive("lang") ? "ha5-active" : ""
              }`}
              onClick={() => setActiveLine("lang")}
            >
              <span className="ha5-line-number">3</span>
              <span className="ha5-line-content ha5-code-font">
                &lt;html <strong>lang="en"</strong>&gt;
              </span>
            </button>

            {/* Why attributes matter */}
            <button
              type="button"
              className={`ha5-code-line ha5-indent-1 ${
                isActive("why") ? "ha5-active" : ""
              }`}
              onClick={() => setActiveLine("why")}
            >
              <span className="ha5-line-number">4</span>
              <span className="ha5-line-content ha5-code-font">
                &lt;!-- Attributes add meaning, control behavior, and help
                accessibility --&gt;
              </span>
            </button>

            {/* type on ordered list */}
            <button
              type="button"
              className={`ha5-code-line ha5-indent-0 ${
                isActive("type") ? "ha5-active" : ""
              }`}
              onClick={() => setActiveLine("type")}
            >
              <span className="ha5-line-number">5</span>
              <span className="ha5-line-content ha5-code-font">
                &lt;ol <strong>type="a"</strong>&gt;
              </span>
            </button>
            <div className="ha5-code-line ha5-indent-1">
              <span className="ha5-line-number">6</span>
              <span className="ha5-line-content ha5-code-font">
                &lt;li&gt;Bread&lt;/li&gt;
              </span>
            </div>
            <div className="ha5-code-line ha5-indent-1">
              <span className="ha5-line-number">7</span>
              <span className="ha5-line-content ha5-code-font">
                &lt;li&gt;Butter&lt;/li&gt;
              </span>
            </div>
            <div className="ha5-code-line ha5-indent-1">
              <span className="ha5-line-number">8</span>
              <span className="ha5-line-content ha5-code-font">
                &lt;li&gt;Jam&lt;/li&gt;
              </span>
            </div>
            <div className="ha5-code-line ha5-indent-0">
              <span className="ha5-line-number">9</span>
              <span className="ha5-line-content ha5-code-font">
                &lt;/ol&gt;
              </span>
            </div>

            {/* id */}
            <button
              type="button"
              className={`ha5-code-line ha5-indent-0 ${
                isActive("id") ? "ha5-active" : ""
              }`}
              onClick={() => setActiveLine("id")}
            >
              <span className="ha5-line-number">10</span>
              <span className="ha5-line-content ha5-code-font">
                &lt;p <strong>id="intro"</strong>&gt;Hello!&lt;/p&gt;
              </span>
            </button>

            {/* class */}
            <button
              type="button"
              className={`ha5-code-line ha5-indent-0 ${
                isActive("class") ? "ha5-active" : ""
              }`}
              onClick={() => setActiveLine("class")}
            >
              <span className="ha5-line-number">11</span>
              <span className="ha5-line-content ha5-code-font">
                &lt;p <strong>class="highlight"</strong>&gt;Important&lt;/p&gt;
              </span>
            </button>

            {/* src */}
            <button
              type="button"
              className={`ha5-code-line ha5-indent-0 ${
                isActive("src") ? "ha5-active" : ""
              }`}
              onClick={() => setActiveLine("src")}
            >
              <span className="ha5-line-number">12</span>
              <span className="ha5-line-content ha5-code-font">
                &lt;img <strong>src="photo.jpg"</strong> /&gt;
              </span>
            </button>

            {/* href */}
            <button
              type="button"
              className={`ha5-code-line ha5-indent-0 ${
                isActive("href") ? "ha5-active" : ""
              }`}
              onClick={() => setActiveLine("href")}
            >
              <span className="ha5-line-number">13</span>
              <span className="ha5-line-content ha5-code-font">
                &lt;a <strong>href="https://google.com"</strong>&gt;Google&lt;/a&gt;
              </span>
            </button>

            {/* alt */}
            <button
              type="button"
              className={`ha5-code-line ha5-indent-0 ${
                isActive("alt") ? "ha5-active" : ""
              }`}
              onClick={() => setActiveLine("alt")}
            >
              <span className="ha5-line-number">14</span>
              <span className="ha5-line-content ha5-code-font">
                &lt;img src="car.png" <strong>alt="A red car"</strong> /&gt;
              </span>
            </button>

            {/* placeholder */}
            <button
              type="button"
              className={`ha5-code-line ha5-indent-0 ${
                isActive("placeholder") ? "ha5-active" : ""
              }`}
              onClick={() => setActiveLine("placeholder")}
            >
              <span className="ha5-line-number">15</span>
              <span className="ha5-line-content ha5-code-font">
                &lt;input type="text"{" "}
                <strong>placeholder="Enter name"</strong> /&gt;
              </span>
            </button>
          </div>
        </section>

        {/* Details Panel */}
        <aside
          className={`ha5-details-panel ${activeLine ? "ha5-is-open" : ""}`}
        >
          {activeLine ? (
            <div className="ha5-fadeIn">
              <h3 className="ha5-details-title">
                {detailsContent[activeLine].title}
              </h3>
              {detailsContent[activeLine].body}
              <button
                type="button"
                className="ha5-close-mobile-btn"
                onClick={() => setActiveLine(null)}
              >
                Close
              </button>
            </div>
          ) : (
            <div className="ha5-details-placeholder">
              <div className="ha5-placeholder-icon">☝️</div>
              <p>Tap any attribute in the code to learn what it does.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default HtmlAttributesVisualization;
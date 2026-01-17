import React, { useState } from "react";
import "./visual.css";

const EXPLAIN = {
  structure: {
    title: "Form structure: <form>, action, labels, inputs, button",
    text: "A form wraps inputs and buttons. The action attribute tells the browser where to send the data when the user clicks Submit.",
    code: `<form action="/action.php">
  <label for="username">Username</label>
  <input id="username" name="user" type="text" placeholder="Enter username" />

  <label for="password">Password</label>
  <input id="password" name="pass" type="password" placeholder="Enter password" />

  <button type="submit">Login</button>
</form>`,
  },
  label: {
    title: "<label> – connects text to an input",
    text: "Clicking the label focuses the input. Use for + id so screen readers and users know which text belongs to which field.",
    code: `<label for="username">Username</label>
<input id="username" name="user" type="text" />`,
  },
  placeholder: {
    title: "placeholder – hint text inside the box",
    text: "placeholder shows a light hint before the user types. It disappears when the user starts typing.",
    code: `<input type="text" placeholder="Enter Name" />`,
  },
  name: {
    title: "name – the key sent to the server",
    text: "Whatever the user types is sent as key=value where key is the name attribute. The server reads that key.",
    code: `<input type="text" id="username" name="user" />  <!-- sends user=... -->`,
  },
  types: {
    title: "Different input types",
    text: "Use different input types to help the browser show the right UI: text, password, number, time, color, checkbox, radio, range, etc.",
    code: `<input type="text" placeholder="Name" />
<input type="password" placeholder="Password" />
<input type="number" min="0" max="100" />
<input type="time" />
<input type="color" />
<input type="range" min="0" max="100" />`,
  },
  youtube: {
    title: "Real example: YouTube search form",
    text: "This form sends the search_query field to YouTube. The value is added to the URL as a query string.",
    code: `<form action="https://www.youtube.com/results">
  <input type="text" name="search_query" placeholder="search" />
  <button>Search</button>
</form>

<!-- If you type: HTML tutorials
https://www.youtube.com/results?search_query=HTML+tutorials -->`,
  },
};

const HtmlFormsVisualization = () => {
  const [tab, setTab] = useState("structure"); // 'structure' | 'types' | 'youtube'
  const [focusKey, setFocusKey] = useState("structure");
  const [ytQuery, setYtQuery] = useState("HTML tutorials");

  const info = EXPLAIN[focusKey];
  const queryParam = ytQuery.trim().split(/\s+/).join("+");
  const youtubeUrl = `https://www.youtube.com/results${
    queryParam ? `?search_query=${queryParam}` : ""
  }`;

  return (
    <div className="hf1-container">
      <header className="hf1-header">
        <h2>Interactive Visual Guide</h2>
        <p className="hf1-instruction">
          Explore how form tags, inputs, names and actions work together.
        </p>
      </header>

      <div className="hf1-tabs">
        <button
          type="button"
          className={`hf1-tab ${tab === "structure" ? "hf1-tab-active" : ""}`}
          onClick={() => {
            setTab("structure");
            setFocusKey("structure");
          }}
        >
          Basic form
        </button>
        <button
          type="button"
          className={`hf1-tab ${tab === "types" ? "hf1-tab-active" : ""}`}
          onClick={() => {
            setTab("types");
            setFocusKey("types");
          }}
        >
          Input types
        </button>
        <button
          type="button"
          className={`hf1-tab ${tab === "youtube" ? "hf1-tab-active" : ""}`}
          onClick={() => {
            setTab("youtube");
            setFocusKey("youtube");
          }}
        >
          YouTube search form
        </button>
      </div>

      <div className="hf1-layout">
        {/* Left: visual playground */}
        <section className="hf1-panel hf1-panel-left">
          {tab === "structure" && (
            <>
              <p className="hf1-panel-sub">
                Click different parts to see how labels, placeholders and names
                work inside a form.
              </p>

              <div className="hf1-form-card">
                <div className="hf1-form-tag">&lt;form action="/login"&gt;</div>

                <label
                  htmlFor="hf1-username"
                  className={`hf1-field-label ${
                    focusKey === "label" ? "hf1-highlight" : ""
                  }`}
                  onClick={() => setFocusKey("label")}
                >
                  Username
                  <input
                    id="hf1-username"
                    name="user"
                    type="text"
                    placeholder="Enter username"
                    className={`hf1-input ${
                      focusKey === "placeholder" ? "hf1-highlight-soft" : ""
                    } ${focusKey === "name" ? "hf1-highlight-name" : ""}`}
                  />
                </label>

                <label
                  htmlFor="hf1-password"
                  className={`hf1-field-label ${
                    focusKey === "label" ? "hf1-highlight" : ""
                  }`}
                  onClick={() => setFocusKey("label")}
                >
                  Password
                  <input
                    id="hf1-password"
                    name="pass"
                    type="password"
                    placeholder="Enter password"
                    className={`hf1-input ${
                      focusKey === "placeholder" ? "hf1-highlight-soft" : ""
                    } ${focusKey === "name" ? "hf1-highlight-name" : ""}`}
                  />
                </label>

                <div className="hf1-hint-row">
                  <span
                    className={`hf1-chip ${
                      focusKey === "structure" ? "hf1-chip-active" : ""
                    }`}
                    onClick={() => setFocusKey("structure")}
                  >
                    form + action
                  </span>
                  <span
                    className={`hf1-chip ${
                      focusKey === "label" ? "hf1-chip-active" : ""
                    }`}
                    onClick={() => setFocusKey("label")}
                  >
                    label
                  </span>
                  <span
                    className={`hf1-chip ${
                      focusKey === "placeholder" ? "hf1-chip-active" : ""
                    }`}
                    onClick={() => setFocusKey("placeholder")}
                  >
                    placeholder
                  </span>
                  <span
                    className={`hf1-chip ${
                      focusKey === "name" ? "hf1-chip-active" : ""
                    }`}
                    onClick={() => setFocusKey("name")}
                  >
                    name attribute
                  </span>
                </div>

                <button type="submit" className="hf1-button">
                  Login (type="submit")
                </button>

                <div className="hf1-form-tag hf1-form-tag-close">
                  &lt;/form&gt;
                </div>
              </div>
            </>
          )}

          {tab === "types" && (
            <>
              <p className="hf1-panel-sub">
                Different <code>type</code> values give different controls.
              </p>

              <div className="hf1-types-grid">
                <div className="hf1-type-item">
                  <span className="hf1-type-label">Text</span>
                  <input
                    type="text"
                    placeholder="Enter text"
                    className="hf1-input"
                  />
                  <code className="hf1-mini-code">&lt;input type="text" /&gt;</code>
                </div>

                <div className="hf1-type-item">
                  <span className="hf1-type-label">Password</span>
                  <input
                    type="password"
                    placeholder="Secret"
                    className="hf1-input"
                  />
                  <code className="hf1-mini-code">
                    &lt;input type="password" /&gt;
                  </code>
                </div>

                <div className="hf1-type-item">
                  <span className="hf1-type-label">Number</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="hf1-input"
                  />
                  <code className="hf1-mini-code">
                    &lt;input type="number" /&gt;
                  </code>
                </div>

                <div className="hf1-type-item">
                  <span className="hf1-type-label">Time</span>
                  <input type="time" className="hf1-input" />
                  <code className="hf1-mini-code">&lt;input type="time" /&gt;</code>
                </div>

                <div className="hf1-type-item">
                  <span className="hf1-type-label">Color</span>
                  <input type="color" className="hf1-input hf1-input-color" />
                  <code className="hf1-mini-code">
                    &lt;input type="color" /&gt;
                  </code>
                </div>

                <div className="hf1-type-item">
                  <span className="hf1-type-label">Range</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="hf1-input-range"
                  />
                  <code className="hf1-mini-code">
                    &lt;input type="range" /&gt;
                  </code>
                </div>

                <div className="hf1-type-item">
                  <span className="hf1-type-label">Checkbox</span>
                  <label className="hf1-inline-label">
                    <input type="checkbox" /> I agree
                  </label>
                  <code className="hf1-mini-code">
                    &lt;input type="checkbox" /&gt;
                  </code>
                </div>

                <div className="hf1-type-item">
                  <span className="hf1-type-label">Radio group</span>
                  <label className="hf1-inline-label">
                    <input type="radio" name="gender" /> Male
                  </label>
                  <label className="hf1-inline-label">
                    <input type="radio" name="gender" /> Female
                  </label>
                  <code className="hf1-mini-code">
                    &lt;input type="radio" name="gender" /&gt;
                  </code>
                </div>
              </div>
            </>
          )}

          {tab === "youtube" && (
            <>
              <p className="hf1-panel-sub">
                Type a query to see the exact URL that would be sent to YouTube.
              </p>

              <form
                className="hf1-form-card"
                onSubmit={(e) => {
                  e.preventDefault();
                  setFocusKey("youtube");
                }}
              >
                <div className="hf1-form-tag">
                  &lt;form action="https://www.youtube.com/results"&gt;
                </div>

                <label className="hf1-field-label">
                  Search YouTube
                  <input
                    type="text"
                    name="search_query"
                    placeholder="search"
                    value={ytQuery}
                    onChange={(e) => setYtQuery(e.target.value)}
                    className="hf1-input"
                  />
                </label>

                <button type="submit" className="hf1-button">
                  Search
                </button>

                <div className="hf1-form-tag hf1-form-tag-close">
                  &lt;/form&gt;
                </div>

                <div className="hf1-url-box">
                  <p className="hf1-url-label">Resulting URL:</p>
                  <code className="hf1-url-value">{youtubeUrl}</code>
                </div>
              </form>
            </>
          )}
        </section>

        {/* Right: explanation + code */}
        <section className="hf1-panel hf1-panel-right">
          <div className="hf1-explain-header">
            <h3 className="hf1-explain-title">{info.title}</h3>
            <p className="hf1-explain-text">{info.text}</p>
          </div>

          <pre className="hf1-code-block">
            <code>{info.code}</code>
          </pre>

          <ul className="hf1-hints">
            <li>
              Use <code>action</code> to say where the form should send data.
            </li>
            <li>
              Always pair <code>&lt;label&gt;</code> with an input (
              <code>for</code> + <code>id</code>).
            </li>
            <li>
              Give every input a meaningful <code>name</code> so servers can read
              the values.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default HtmlFormsVisualization;
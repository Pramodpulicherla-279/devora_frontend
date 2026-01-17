import React, { useMemo, useState } from "react";
import "./visual.css";

const HIGHLIGHT_INFO = {
  table: {
    title: "<table> – Whole table",
    text: "Wraps the entire grid: caption, header row and all data rows.",
  },
  caption: {
    title: "<caption> – Table title",
    text: "Gives the table a title that is read before the data (good for accessibility).",
  },
  headerRow: {
    title: "<tr> with <th> – Header row",
    text: "The first <tr> usually contains <th> cells that label each column.",
  },
  dataRows: {
    title: "<tr> with <td> – Data rows",
    text: "Each data <tr> holds one record (one student here) using <td> cells.",
  },
  th: {
    title: "<th> – Header cells",
    text: "Header cells are bold and centered by default and describe the data below them.",
  },
  td: {
    title: "<td> – Data cells",
    text: "Data cells contain the actual values like names, marks, prices, etc.",
  },
};

const baseRows = [
  { name: "John", marks: 85 },
  { name: "Sarah", marks: 92 },
];

const HtmlTablesVisualization = () => {
  const [highlight, setHighlight] = useState("table"); // keys of HIGHLIGHT_INFO
  const [extraRow, setExtraRow] = useState(false);

  const rows = useMemo(
    () =>
      extraRow
        ? [...baseRows, { name: "Amit", marks: 90 }]
        : baseRows,
    [extraRow]
  );

  const codeSnippet = useMemo(() => {
    const rowLines = rows
      .map(
        (row) =>
          `  <tr>\n    <td>${row.name}</td>\n    <td>${row.marks}</td>\n  </tr>`
      )
      .join("\n\n");

    return `<table>
  <caption>Student Information</caption>

  <tr>
    <th>Name</th>
    <th>Marks</th>
  </tr>

${rowLines}
</table>`;
  }, [rows]);

  const info = HIGHLIGHT_INFO[highlight];

  return (
    <div className="ht2-container">
      <header className="ht2-header">
        <h2>Interactive Builder</h2>
        <p className="ht2-instruction">
          Highlight different parts and add a student to see how the table grows.
        </p>
      </header>

      <div className="ht2-layout">
        {/* Left: interactive table */}
        <section className="ht2-panel ht2-panel-left">
          <p className="ht2-panel-sub">
            This is how the browser displays the table’s rows and columns.
          </p>

          <div className="ht2-controls-row">
            <div className="ht2-highlight-group">
              <span className="ht2-controls-label">Highlight:</span>
              <button
                type="button"
                className={`ht2-chip ${
                  highlight === "table" ? "ht2-chip-active" : ""
                }`}
                onClick={() => setHighlight("table")}
              >
                &lt;table&gt;
              </button>
              <button
                type="button"
                className={`ht2-chip ${
                  highlight === "caption" ? "ht2-chip-active" : ""
                }`}
                onClick={() => setHighlight("caption")}
              >
                &lt;caption&gt;
              </button>
              <button
                type="button"
                className={`ht2-chip ${
                  highlight === "headerRow" ? "ht2-chip-active" : ""
                }`}
                onClick={() => setHighlight("headerRow")}
              >
                Header &lt;tr&gt;
              </button>
              <button
                type="button"
                className={`ht2-chip ${
                  highlight === "dataRows" ? "ht2-chip-active" : ""
                }`}
                onClick={() => setHighlight("dataRows")}
              >
                Data &lt;tr&gt; rows
              </button>
              <button
                type="button"
                className={`ht2-chip ${
                  highlight === "th" ? "ht2-chip-active" : ""
                }`}
                onClick={() => setHighlight("th")}
              >
                &lt;th&gt; cells
              </button>
              <button
                type="button"
                className={`ht2-chip ${
                  highlight === "td" ? "ht2-chip-active" : ""
                }`}
                onClick={() => setHighlight("td")}
              >
                &lt;td&gt; cells
              </button>
            </div>

            <label className="ht2-toggle-extra">
              <input
                type="checkbox"
                checked={extraRow}
                onChange={(e) => setExtraRow(e.target.checked)}
              />
              <span>Add another student row</span>
            </label>
          </div>

          <div
            className={`ht2-table-shell ${
              highlight === "table" ? "ht2-highlight-outline" : ""
            }`}
          >
            <div
              className={`ht2-caption ${
                highlight === "caption" ? "ht2-highlight-fill" : ""
              }`}
            >
              Student Information
            </div>

            <div
              className={`ht2-row ht2-header-row ${
                highlight === "headerRow" ? "ht2-highlight-row" : ""
              }`}
            >
              <div
                className={`ht2-cell ht2-cell-header ${
                  highlight === "th" ? "ht2-highlight-fill" : ""
                }`}
              >
                Name
              </div>
              <div
                className={`ht2-cell ht2-cell-header ${
                  highlight === "th" ? "ht2-highlight-fill" : ""
                }`}
              >
                Marks
              </div>
            </div>

            {rows.map((row, index) => (
              <div
                key={`${row.name}-${index}`}
                className={`ht2-row ht2-data-row ${
                  highlight === "dataRows" ? "ht2-highlight-row" : ""
                }`}
              >
                <div
                  className={`ht2-cell ${
                    highlight === "td" ? "ht2-highlight-fill" : ""
                  }`}
                >
                  {row.name}
                </div>
                <div
                  className={`ht2-cell ${
                    highlight === "td" ? "ht2-highlight-fill" : ""
                  }`}
                >
                  {row.marks}
                </div>
              </div>
            ))}
          </div>

          <p className="ht2-note">
            Right now there are <strong>{rows.length}</strong> student rows
            inside the table (each one is its own <code>&lt;tr&gt;</code>).
          </p>
        </section>

        {/* Right: explanation + live code */}
        <section className="ht2-panel ht2-panel-right">
          <div className="ht2-info-card">
            <h3 className="ht2-info-title">{info.title}</h3>
            <p className="ht2-info-text">{info.text}</p>

            <div className="ht2-code-box">
              <p className="ht2-code-label">HTML code for this table:</p>
              <pre className="ht2-code-block">
                <code>{codeSnippet}</code>
              </pre>
            </div>

            <ul className="ht2-hints">
              <li>
                Each <code>&lt;tr&gt;</code> is one row in the grid.
              </li>
              <li>
                Use <code>&lt;th&gt;</code> for headings and{" "}
                <code>&lt;td&gt;</code> for data, so screen readers know what
                each column means.
              </li>
              <li>
                <code>&lt;caption&gt;</code> gives the table a clear, accessible
                title.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HtmlTablesVisualization;
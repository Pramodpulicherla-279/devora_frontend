import React, { useState } from "react";
import "./visual.css";

const INFO = {
  overview: {
    title: "Semantic table sections + merged cells",
    text: "Use <caption>, <thead>, <tbody>, and <tfoot> to split a table into a title, header, body, and footer. Use colspan and rowspan to merge cells for more complex layouts.",
    code: `<table>
  <caption>Product Prices</caption>

  <thead> ... </thead>
  <tbody> ... </tbody>
  <tfoot> ... </tfoot>
</table>`,
  },
  caption: {
    title: "<caption> – Table title",
    text: "The <caption> gives the whole table a short title. Screen readers read it out before the data, so users know what the table is about.",
    code: `<table>
  <caption>Product Prices</caption>
  ...
</table>`,
  },
  thead: {
    title: "<thead> – Header section",
    text: "Wraps the header row(s). Usually contains column titles in <th> cells.",
    code: `<table>
  <thead>
    <tr>
      <th>Product</th>
      <th>Price</th>
    </tr>
  </thead>
  ...
</table>`,
  },
  tbody: {
    title: "<tbody> – Body section",
    text: "Wraps the main data rows of the table. Most records live here.",
    code: `<table>
  ...
  <tbody>
    <tr>
      <td>Notebook</td>
      <td>$5</td>
    </tr>
    <tr>
      <td>Pencil</td>
      <td>$1</td>
    </tr>
  </tbody>
  ...
</table>`,
  },
  tfoot: {
    title: "<tfoot> – Footer section",
    text: "Wraps footer rows, often with totals or summary information. When printing long tables, the footer can repeat at the bottom of each page.",
    code: `<table>
  ...
  <tfoot>
    <tr>
      <td>Total</td>
      <td>$6</td>
    </tr>
  </tfoot>
</table>`,
  },
  colspan: {
    title: `colspan="n" – Merge columns`,
    text: 'colspan merges cells horizontally. For example, colspan="2" makes one cell stretch across 2 columns.',
    code: `<tr>
  <th>Name</th>
  <th colspan="2">Marks</th>
</tr>`,
  },
  rowspan: {
    title: `rowspan="n" – Merge rows`,
    text: 'rowspan merges cells vertically. For example, rowspan="2" makes one cell stretch across 2 rows.',
    code: `<tr>
  <td rowspan="2">John</td>
  <td>Math</td>
  <td>90</td>
</tr>
<tr>
  <td>Science</td>
  <td>85</td>
</tr>`,
  },
};

const TableSemantic3DVisualization = () => {
  const [activeKey, setActiveKey] = useState("overview");
  const info = INFO[activeKey];

  return (
    <div className="ts1-container">
      <header className="ts1-header">
        <h2>Simple Visual Guide</h2>
        <p className="ts1-instruction">
          Click a colored area or a button to see what each part does.
        </p>
      </header>

      <div className="ts1-layout">
        {/* Left: visual table */}
        <section className="ts1-panel ts1-panel-left">
          <p className="ts1-panel-sub">
            This mini table is split into caption, header, body, footer and a
            merged-cells example.
          </p>

          <div className="ts1-table-card">
            <div
              className={`ts1-caption-row ${
                activeKey === "caption" ? "ts1-caption-active" : ""
              }`}
              onClick={() => setActiveKey("caption")}
            >
              <span className="ts1-tag-label">&lt;caption&gt;</span>
              Product Prices
            </div>

            <div
              className={`ts1-band ts1-band-thead ${
                activeKey === "thead" ? "ts1-band-active" : ""
              }`}
              onClick={() => setActiveKey("thead")}
            >
              <span className="ts1-band-tag">&lt;thead&gt;</span>
              <div className="ts1-row ts1-row-header">
                <div className="ts1-cell ts1-cell-header">Product</div>
                <div className="ts1-cell ts1-cell-header">Price</div>
              </div>
            </div>

            <div
              className={`ts1-band ts1-band-tbody ${
                activeKey === "tbody" ? "ts1-band-active" : ""
              }`}
              onClick={() => setActiveKey("tbody")}
            >
              <span className="ts1-band-tag">&lt;tbody&gt;</span>
              <div className="ts1-row">
                <div className="ts1-cell">Notebook</div>
                <div className="ts1-cell">$5</div>
              </div>
              <div className="ts1-row">
                <div className="ts1-cell">Pencil</div>
                <div className="ts1-cell">$1</div>
              </div>
            </div>

            <div
              className={`ts1-band ts1-band-tfoot ${
                activeKey === "tfoot" ? "ts1-band-active" : ""
              }`}
              onClick={() => setActiveKey("tfoot")}
            >
              <span className="ts1-band-tag">&lt;tfoot&gt;</span>
              <div className="ts1-row">
                <div className="ts1-cell">Total</div>
                <div className="ts1-cell">$6</div>
              </div>
            </div>
          </div>

          <div className="ts1-span-card">
            <div className="ts1-span-title">Merged cells (colspan / rowspan)</div>
            <div className="ts1-span-table">
              <div className="ts1-span-row ts1-span-header-row">
                <div className="ts1-span-cell ts1-span-cell-header">Name</div>
                <div
                  className={`ts1-span-cell ts1-span-cell-header ts1-span-colspan ${
                    activeKey === "colspan" ? "ts1-span-active" : ""
                  }`}
                  onClick={() => setActiveKey("colspan")}
                >
                  Marks (colspan="2")
                </div>
              </div>

              <div className="ts1-span-row">
                <div
                  className={`ts1-span-cell ts1-span-rowspan ${
                    activeKey === "rowspan" ? "ts1-span-active" : ""
                  }`}
                  onClick={() => setActiveKey("rowspan")}
                >
                  John (rowspan="2")
                </div>
                <div className="ts1-span-cell">Math</div>
                <div className="ts1-span-cell">90</div>
              </div>
             <div className="ts1-span-row">
                <div className="ts1-span-cell"></div>
                <div className="ts1-span-cell">Science</div>
                <div className="ts1-span-cell">85</div>
              </div>

              <div className="ts1-span-row">
                <div className="ts1-span-cell">Joy</div>
                <div className="ts1-span-cell">Science</div>
                <div className="ts1-span-cell">85</div>
              </div>
            </div>
          </div>
        </section>

        {/* Right: explanation + code */}
        <section className="ts1-panel ts1-panel-right">
          <div className="ts1-buttons-row">
            <button
              type="button"
              className={`ts1-btn ${
                activeKey === "overview" ? "ts1-btn-active" : ""
              }`}
              onClick={() => setActiveKey("overview")}
            >
              Overview
            </button>
            <button
              type="button"
              className={`ts1-btn ${
                activeKey === "caption" ? "ts1-btn-active" : ""
              }`}
              onClick={() => setActiveKey("caption")}
            >
              &lt;caption&gt;
            </button>
            <button
              type="button"
              className={`ts1-btn ${
                activeKey === "thead" ? "ts1-btn-active" : ""
              }`}
              onClick={() => setActiveKey("thead")}
            >
              &lt;thead&gt;
            </button>
            <button
              type="button"
              className={`ts1-btn ${
                activeKey === "tbody" ? "ts1-btn-active" : ""
              }`}
              onClick={() => setActiveKey("tbody")}
            >
              &lt;tbody&gt;
            </button>
            <button
              type="button"
              className={`ts1-btn ${
                activeKey === "tfoot" ? "ts1-btn-active" : ""
              }`}
              onClick={() => setActiveKey("tfoot")}
            >
              &lt;tfoot&gt;
            </button>
            <button
              type="button"
              className={`ts1-btn ${
                activeKey === "colspan" ? "ts1-btn-active" : ""
              }`}
              onClick={() => setActiveKey("colspan")}
            >
              colspan
            </button>
            <button
              type="button"
              className={`ts1-btn ${
                activeKey === "rowspan" ? "ts1-btn-active" : ""
              }`}
              onClick={() => setActiveKey("rowspan")}
            >
              rowspan
            </button>
          </div>

          <div className="ts1-info-card">
            <h3 className="ts1-info-title">{info.title}</h3>
            <p className="ts1-info-text">{info.text}</p>

            <pre className="ts1-code-block">
              <code>{info.code}</code>
            </pre>

            <ul className="ts1-hints">
              <li>
                <code>&lt;caption&gt;</code> gives the table a clear, accessible
                title.
              </li>
              <li>
                <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, and{" "}
                <code>&lt;tfoot&gt;</code> make the table structure clear.
              </li>
              <li>
                Use <code>colspan</code> to merge cells across columns.
              </li>
              <li>
                Use <code>rowspan</code> to merge cells down rows.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TableSemantic3DVisualization;
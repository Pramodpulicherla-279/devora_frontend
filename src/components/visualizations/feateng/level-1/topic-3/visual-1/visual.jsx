import { useState } from "react";
import "./visual.css";

const cities = ["Mumbai", "Delhi", "Pune", "Mumbai", "Delhi"];
const targetVals = [1, 0, 1, 1, 0];

const encodings = {
  label: {
    label: "Label Encoding",
    note: "Assigns an integer to each category. Fast but implies ordinal order.",
    columns: ["city_encoded"],
    rows: cities.map(c => [c === "Mumbai" ? 0 : c === "Delhi" ? 1 : 2]),
  },
  onehot: {
    label: "One-Hot Encoding",
    note: "Creates a binary column per category. No ordinal assumption.",
    columns: ["city_Mumbai", "city_Delhi", "city_Pune"],
    rows: cities.map(c => [c === "Mumbai" ? 1 : 0, c === "Delhi" ? 1 : 0, c === "Pune" ? 1 : 0]),
  },
  target: {
    label: "Target Encoding",
    note: "Replaces category with mean target value. Risk: leakage if not done carefully.",
    columns: ["city_target_enc"],
    rows: cities.map((c, i) => {
      const same = cities.map((cc, ii) => cc === c ? targetVals[ii] : null).filter(v => v !== null);
      return [+(same.reduce((a, b) => a + b, 0) / same.length).toFixed(2)];
    }),
  },
};

export default function FeEncodingVisualization() {
  const [tab, setTab] = useState("label");
  const enc = encodings[tab];

  return (
    <div className="feenc-wrap">
      <h3 className="feenc-title">Encoding Categorical Variables</h3>
      <div className="feenc-tabs">
        {Object.keys(encodings).map(k => (
          <button key={k} className={`feenc-tab ${tab === k ? "feenc-tab--on" : ""}`} onClick={() => setTab(k)}>{encodings[k].label}</button>
        ))}
      </div>
      <div className="feenc-tables">
        <div className="feenc-side">
          <div className="feenc-col-head">Original</div>
          <table className="feenc-table">
            <thead><tr><th>City</th></tr></thead>
            <tbody>{cities.map((c, i) => <tr key={i}><td className="feenc-cell-orig">{c}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="feenc-arrow-col">
          <svg viewBox="0 0 32 80" width="32" height="80">
            <path d="M4 40 H22 M16 32 L26 40 L16 48" stroke="#f97316" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="feenc-side">
          <div className="feenc-col-head">Encoded</div>
          <table className="feenc-table">
            <thead><tr>{enc.columns.map(c => <th key={c}>{c}</th>)}</tr></thead>
            <tbody>{enc.rows.map((row, i) => (
              <tr key={i}>{row.map((v, j) => <td key={j} className={v === 1 ? "feenc-cell--hot" : "feenc-cell--enc"}>{v}</td>)}</tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      <p className="feenc-note">{enc.note}</p>
    </div>
  );
}

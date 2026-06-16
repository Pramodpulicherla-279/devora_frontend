import { useState } from "react";
import "./visual.css";

const raw = [
  { name: "Age", val: 28 },
  { name: "Salary", val: 75000 },
  { name: "Score", val: 87 },
  { name: "Years Exp", val: 5 },
];

function standardize(arr) {
  const vals = arr.map(r => r.val);
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  const std = Math.sqrt(vals.map(v => (v - mean) ** 2).reduce((a, b) => a + b, 0) / vals.length);
  return arr.map(r => ({ name: r.name, val: +((r.val - mean) / std).toFixed(2) }));
}

function minmax(arr) {
  const vals = arr.map(r => r.val);
  const min = Math.min(...vals), max = Math.max(...vals);
  return arr.map(r => ({ name: r.name, val: +((r.val - min) / (max - min)).toFixed(2) }));
}

const modes = { raw: { label: "Raw", fn: r => r, color: "#6b7785", formula: "No scaling applied" },
  standard: { label: "StandardScaler", fn: standardize, color: "#58a6ff", formula: "z = (x − μ) / σ" },
  minmax: { label: "MinMaxScaler", fn: minmax, color: "#56d364", formula: "x′ = (x − min) / (max − min)" } };

export default function FeScalingVisualization() {
  const [mode, setMode] = useState("raw");
  const m = modes[mode];
  const data = m.fn(raw);
  const allVals = data.map(r => r.val);
  const maxAbs = Math.max(...allVals.map(Math.abs), 1);

  return (
    <div className="fescale-wrap">
      <h3 className="fescale-title">Feature Scaling</h3>
      <div className="fescale-formula">{m.formula}</div>
      <div className="fescale-btns">
        {Object.entries(modes).map(([k, v]) => (
          <button key={k} className={`fescale-btn ${mode === k ? "fescale-btn--on" : ""}`} onClick={() => setMode(k)}>{v.label}</button>
        ))}
      </div>
      <div className="fescale-chart">
        {data.map((r, i) => {
          const pct = (Math.abs(r.val) / maxAbs) * 80;
          const neg = r.val < 0;
          return (
            <div key={i} className="fescale-row">
              <div className="fescale-feat">{r.name}</div>
              <div className="fescale-track">
                {neg ? (
                  <div className="fescale-bar fescale-bar--neg" style={{ width: `${pct}%`, background: m.color }} />
                ) : (
                  <div className="fescale-bar" style={{ width: `${pct}%`, background: m.color }} />
                )}
              </div>
              <div className="fescale-val" style={{ color: m.color }}>{r.val}</div>
            </div>
          );
        })}
      </div>
      <p className="fescale-note">
        {mode === "raw" && "Raw values span wildly different ranges — this biases distance-based models."}
        {mode === "standard" && "Values centred at 0 with unit variance. Best for SVM, logistic regression, PCA."}
        {mode === "minmax" && "Values squashed to [0, 1]. Best for neural networks and algorithms sensitive to magnitude."}
      </p>
    </div>
  );
}

import { useState } from "react";
import "./visual.css";

const rawFeatures = [
  { name: "Age", values: [23, 45, 31, 60], unit: "years" },
  { name: "Salary", values: [35000, 120000, 55000, 90000], unit: "$" },
  { name: "Score", values: [0.72, 0.91, 0.65, 0.88], unit: "" },
];

const scalers = {
  standard: {
    label: "StandardScaler",
    formula: "z = (x − μ) / σ",
    useCase: "Data is roughly Gaussian. Most common choice.",
    transform: (vals) => {
      const mean = vals.reduce((a, b) => a + b) / vals.length;
      const std = Math.sqrt(vals.map(v => (v - mean) ** 2).reduce((a, b) => a + b) / vals.length);
      return vals.map(v => ((v - mean) / (std || 1)).toFixed(2));
    },
  },
  minmax: {
    label: "MinMaxScaler",
    formula: "x' = (x − min) / (max − min)",
    useCase: "Need values in [0, 1] range. Sensitive to outliers.",
    transform: (vals) => {
      const mn = Math.min(...vals), mx = Math.max(...vals);
      return vals.map(v => ((v - mn) / (mx - mn || 1)).toFixed(2));
    },
  },
  robust: {
    label: "RobustScaler",
    formula: "x' = (x − median) / IQR",
    useCase: "Data has outliers. Uses median and IQR instead of mean/std.",
    transform: (vals) => {
      const sorted = [...vals].sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)];
      const q1 = sorted[Math.floor(sorted.length * 0.25)];
      const q3 = sorted[Math.floor(sorted.length * 0.75)];
      const iqr = q3 - q1 || 1;
      return vals.map(v => ((v - median) / iqr).toFixed(2));
    },
  },
};

export default function SvScalingVisualization() {
  const [scaler, setScaler] = useState("standard");
  const s = scalers[scaler];

  return (
    <div className="svscale-wrap">
      <h2 className="svscale-title">Feature Scaling & Preprocessing</h2>
      <div className="svscale-tabs">
        {Object.entries(scalers).map(([k, v]) => (
          <button key={k} className={`svscale-tab ${scaler === k ? "svscale-tab--active" : ""}`}
            onClick={() => setScaler(k)}>{v.label}</button>
        ))}
      </div>

      <div className="svscale-formula">{s.formula}</div>

      <div className="svscale-table-wrap">
        <table className="svscale-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th className="svscale-th-raw">Raw Values</th>
              <th className="svscale-th-scaled">After {s.label}</th>
            </tr>
          </thead>
          <tbody>
            {rawFeatures.map(f => {
              const scaled = s.transform(f.values);
              return (
                <tr key={f.name}>
                  <td className="svscale-td-name">{f.name}</td>
                  <td className="svscale-td-raw">
                    <div className="svscale-vals">
                      {f.values.map((v, i) => (
                        <span key={i} className="svscale-val svscale-val--raw">
                          {v}{f.unit}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="svscale-td-scaled">
                    <div className="svscale-vals">
                      {scaled.map((v, i) => (
                        <span key={i} className="svscale-val svscale-val--scaled">{v}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="svscale-usecase">
        <span className="svscale-usecase-icon">💡</span>
        <span>{s.useCase}</span>
      </div>
    </div>
  );
}

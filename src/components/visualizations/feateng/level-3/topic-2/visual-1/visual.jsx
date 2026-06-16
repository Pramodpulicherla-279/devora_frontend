import { useState } from "react";
import "./visual.css";

const features = ["age", "salary", "score", "exp_yrs", "dept"];

const corrMatrix = [
  [1.00,  0.85,  0.32, 0.91, 0.15],
  [0.85,  1.00,  0.48, 0.79, 0.22],
  [0.32,  0.48,  1.00, 0.28, 0.61],
  [0.91,  0.79,  0.28, 1.00, 0.18],
  [0.15,  0.22,  0.61, 0.18, 1.00],
];

const vif = [8.2, 6.5, 2.1, 7.9, 1.8];

function corrColor(v) {
  const abs = Math.abs(v);
  if (v === 1) return "#21262d";
  if (abs >= 0.8) return `rgba(248,81,73,${0.2 + abs * 0.5})`;
  if (abs >= 0.5) return `rgba(249,115,22,${0.15 + abs * 0.4})`;
  return `rgba(88,166,255,${0.1 + abs * 0.3})`;
}

function textColor(v) {
  return Math.abs(v) >= 0.8 && v !== 1 ? "#f85149" : Math.abs(v) >= 0.5 ? "#f97316" : "#58a6ff";
}

export default function FeCorrelationVisualization() {
  const [threshold, setThreshold] = useState(0.8);

  return (
    <div className="fecorr-wrap">
      <h3 className="fecorr-title">Correlation & Multicollinearity</h3>

      <div className="fecorr-control">
        <span className="fecorr-label">Highlight threshold: <strong style={{ color: "#f85149" }}>|r| ≥ {threshold}</strong></span>
        <input type="range" min={0.4} max={0.95} step={0.05} value={threshold}
          onChange={e => setThreshold(+e.target.value)} className="fecorr-slider" />
      </div>

      <div className="fecorr-heatmap-wrap">
        <table className="fecorr-heatmap">
          <thead>
            <tr><th></th>{features.map(f => <th key={f}>{f}</th>)}</tr>
          </thead>
          <tbody>
            {corrMatrix.map((row, i) => (
              <tr key={i}>
                <td className="fecorr-feat-label">{features[i]}</td>
                {row.map((v, j) => (
                  <td key={j} className="fecorr-cell"
                    style={{ background: corrColor(v), color: textColor(v), outline: Math.abs(v) >= threshold && v !== 1 ? "2px solid #f85149" : "none" }}>
                    {v.toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="fecorr-vif">
        <div className="fecorr-vif-title">VIF Scores</div>
        {features.map((f, i) => (
          <div key={f} className="fecorr-vif-row">
            <span className="fecorr-vif-name">{f}</span>
            <div className="fecorr-vif-bar-track">
              <div className="fecorr-vif-bar" style={{ width: `${Math.min(vif[i] / 10 * 100, 100)}%`, background: vif[i] > 5 ? "#f85149" : "#56d364" }} />
            </div>
            <span className="fecorr-vif-val" style={{ color: vif[i] > 5 ? "#f85149" : "#56d364" }}>{vif[i]}</span>
          </div>
        ))}
      </div>

      <p className="fecorr-note">Red cells and VIF &gt; 5 indicate multicollinearity — consider dropping one of the correlated pair.</p>
    </div>
  );
}

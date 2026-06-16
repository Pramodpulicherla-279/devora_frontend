import { useState } from "react";
import "./visual.css";

const W = 260, H = 140, PX = 22, PY = 14;

function svgX(x, xmin, xmax) { return PX + ((x - xmin) / (xmax - xmin)) * (W - 2 * PX); }
function svgY(y, ymin, ymax) { return H - PY - ((y - ymin) / (ymax - ymin)) * (H - 2 * PY); }

function makePath(fn, xmin, xmax, ymin, ymax, steps = 80) {
  const pts = Array.from({ length: steps + 1 }, (_, i) => {
    const x = xmin + ((xmax - xmin) * i) / steps;
    const y = Math.max(ymin, Math.min(ymax, fn(x)));
    return `${svgX(x, xmin, xmax)},${svgY(y, ymin, ymax)}`;
  });
  return "M" + pts.join(" L");
}

const LOSSES = {
  MSE: {
    fn: p => (p - 1) ** 2,
    xmin: 0, xmax: 2, ymin: 0, ymax: 1.5,
    formula: "L = (1/n) Σ (ŷ − y)²",
    use: "Regression tasks — predicting house prices, temperatures",
    note: "Penalises large errors heavily due to squaring. Sensitive to outliers.",
    xLabel: "Predicted ŷ (true=1)", yLabel: "Loss",
  },
  "Cross-Entropy": {
    fn: p => p > 0.001 ? -Math.log(Math.max(0.001, p)) : 7,
    xmin: 0.01, xmax: 1, ymin: 0, ymax: 5,
    formula: "L = −Σ yᵢ log(ŷᵢ)",
    use: "Classification — softmax output, logistic regression",
    note: "Pushes predicted probability toward 1 for the true class. Undefined at 0.",
    xLabel: "Predicted prob (true class)", yLabel: "Loss",
  },
  "Hinge Loss": {
    fn: p => Math.max(0, 1 - p),
    xmin: -1, xmax: 2, ymin: 0, ymax: 2.5,
    formula: "L = max(0, 1 − y·ŷ)",
    use: "SVMs and margin-based classifiers",
    note: "Zero loss once prediction is correct with margin ≥ 1. Ignores very confident correct predictions.",
    xLabel: "y·ŷ (margin)", yLabel: "Loss",
  },
};
const TABS = Object.keys(LOSSES);

export default function NnLossVisualization() {
  const [tab, setTab] = useState("MSE");
  const cfg = LOSSES[tab];

  return (
    <div className="nnloss-wrap">
      <div className="nnloss-title">Loss Functions for Neural Networks</div>
      <div className="nnloss-tabs">
        {TABS.map(t => (
          <button key={t} className={`nnloss-tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className="nnloss-grid">
        <div className="nnloss-svg-box">
          <svg viewBox={`0 0 ${W} ${H}`} width="100%">
            <line x1={PX} y1={svgY(0, cfg.ymin, cfg.ymax)} x2={W - PX} y2={svgY(0, cfg.ymin, cfg.ymax)} stroke="#30363d" strokeWidth={1} />
            {cfg.xmin <= 0 && cfg.xmax >= 0 && (
              <line x1={svgX(0, cfg.xmin, cfg.xmax)} y1={PY} x2={svgX(0, cfg.xmin, cfg.xmax)} y2={H - PY} stroke="#30363d" strokeWidth={1} />
            )}
            <path d={makePath(cfg.fn, cfg.xmin, cfg.xmax, cfg.ymin, cfg.ymax)} fill="none" stroke="#a78bfa" strokeWidth={2.5} />
            <text x={W / 2} y={H - 1} fontSize={8} fill="#6b7785" textAnchor="middle">{cfg.xLabel}</text>
            <text x={6} y={PY + 8} fontSize={8} fill="#6b7785" transform={`rotate(-90,6,${H / 2})`}>{cfg.yLabel}</text>
          </svg>
        </div>
        <div className="nnloss-meta">
          <div className="nnloss-formula">{cfg.formula}</div>
          <div>
            <div className="nnloss-use-label">Best used for</div>
            <div className="nnloss-use">{cfg.use}</div>
          </div>
          <div className="nnloss-note">{cfg.note}</div>
        </div>
      </div>
    </div>
  );
}

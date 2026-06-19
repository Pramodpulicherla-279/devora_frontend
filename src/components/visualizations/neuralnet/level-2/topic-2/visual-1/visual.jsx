import { useState } from "react";
import "./visual.css";

const W = 260, H = 150, PX = 20, PY = 14;
const EPOCHS = 40;

function genPath(noise, color) {
  let loss = 2.5;
  const pts = [];
  for (let i = 0; i < EPOCHS; i++) {
    const x = PX + (i / (EPOCHS - 1)) * (W - 2 * PX);
    const t = i / (EPOCHS - 1);
    const target = 2.5 * Math.exp(-3 * t) + 0.1;
    loss = loss * 0.92 + target * 0.08 + (Math.random() - 0.5) * noise;
    loss = Math.max(0.05, loss);
    const y = H - PY - (loss / 2.5) * (H - 2 * PY);
    pts.push(`${x},${y}`);
  }
  return pts.join(" L");
}

const VARIANTS = {
  "Batch GD": {
    cls: "batch",
    color: "#56d364",
    lr: "0.1",
    batch: "All N samples",
    noise: 0.01,
    pros: "Smooth, stable convergence. Reliable gradient direction.",
    cons: "Slow on large datasets — one update per epoch.",
  },
  SGD: {
    cls: "sgd",
    color: "#f85149",
    lr: "0.01 (smaller to compensate)",
    batch: "1 sample",
    noise: 0.35,
    pros: "Very fast updates. Can escape local minima.",
    cons: "Noisy loss curve. May never converge tightly.",
  },
  "Mini-Batch": {
    cls: "mini",
    color: "#58a6ff",
    lr: "0.05",
    batch: "32–256 samples",
    noise: 0.08,
    pros: "Best of both — GPU-friendly, moderate noise.",
    cons: "Adds batch size as a hyperparameter to tune.",
  },
};
const TABS = Object.keys(VARIANTS);

export default function NnGdVariantsVisualization() {
  const [tab, setTab] = useState("Mini-Batch");
  const cfg = VARIANTS[tab];
  const path = genPath(cfg.noise, cfg.color);

  return (
    <div className="nngdv-wrap">
      <div className="nngdv-title">Gradient Descent Variants</div>
      <div className="nngdv-tabs">
        {TABS.map(t => (
          <button key={t} className={`nngdv-tab ${VARIANTS[t].cls}${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className="nngdv-grid">
        <div className="nngdv-svg-box">
          <svg viewBox={`0 0 ${W} ${H}`} width="100%">
            <line x1={PX} y1={PY} x2={PX} y2={H - PY} stroke="#30363d" strokeWidth={1} />
            <line x1={PX} y1={H - PY} x2={W - PX} y2={H - PY} stroke="#30363d" strokeWidth={1} />
            <polyline points={path} fill="none" stroke={cfg.color} strokeWidth={2} />
            <text x={W / 2} y={H - 2} textAnchor="middle" fontSize={10} fill="#8b949e">Epochs →</text>
            <text x={PX + 4} y={PY + 8} fontSize={10} fill="#8b949e">Loss ↑</text>
            <text x={W / 2} y={10} textAnchor="middle" fontSize={11} fill={cfg.color} fontWeight="600">{tab} Path</text>
          </svg>
        </div>
        <div className="nngdv-meta">
          <div className="nngdv-prop">
            <div className="nngdv-prop-label">Learning rate</div>
            <div className="nngdv-prop-val" style={{ color: cfg.color }}>{cfg.lr}</div>
          </div>
          <div className="nngdv-prop">
            <div className="nngdv-prop-label">Batch size</div>
            <div className="nngdv-prop-val" style={{ color: cfg.color }}>{cfg.batch}</div>
          </div>
          <div className="nngdv-pros-cons">
            <div style={{ color: "#56d364", marginBottom: "0.25rem" }}>+ {cfg.pros}</div>
            <div style={{ color: "#f85149" }}>− {cfg.cons}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

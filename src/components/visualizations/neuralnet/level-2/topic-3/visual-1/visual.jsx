import { useState } from "react";
import "./visual.css";

const INITS = {
  Random: {
    color: "#f85149",
    formula: "W ~ N(0, 0.01)",
    std: 0.8,
    desc: "Large random weights cause exploding gradients; tiny weights cause vanishing gradients. Not recommended for deep nets.",
    best: "Shallow nets only",
    warn: "Exploding / vanishing gradients",
  },
  Xavier: {
    color: "#58a6ff",
    formula: "W ~ N(0, √(2/(nᵢₙ+nₒᵤₜ)))",
    std: 0.45,
    desc: "Keeps variance stable across layers. Works well with sigmoid and tanh activations where the derivative peaks at 0.",
    best: "Sigmoid / Tanh",
    warn: null,
  },
  He: {
    color: "#56d364",
    formula: "W ~ N(0, √(2/nᵢₙ))",
    std: 0.62,
    desc: "Accounts for ReLU's zeroing of negative half. The factor of 2 compensates for the halved variance. Standard choice for deep ReLU nets.",
    best: "ReLU / Leaky ReLU",
    warn: null,
  },
};
const TABS = Object.keys(INITS);
const BW = 120, BH = 70, BINS = 20;

function makeHist(std, color) {
  const samples = Array.from({ length: 400 }, () => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return std * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  });
  const range = 2.5;
  const counts = new Array(BINS).fill(0);
  samples.forEach(s => {
    const b = Math.floor(((s + range) / (2 * range)) * BINS);
    if (b >= 0 && b < BINS) counts[b]++;
  });
  const maxCount = Math.max(...counts);
  return counts.map((c, i) => ({
    x: 8 + (i / BINS) * (BW - 16),
    w: (BW - 16) / BINS - 1,
    h: (c / maxCount) * (BH - 16),
    color,
  }));
}

export default function NnWeightInitVisualization() {
  const [sel, setSel] = useState("He");

  return (
    <div className="nnwinit-wrap">
      <div className="nnwinit-title">Weight Initialization</div>
      <div className="nnwinit-subtitle">Click an initialization strategy to compare</div>
      <div className="nnwinit-cards">
        {TABS.map(t => {
          const cfg = INITS[t];
          const bars = makeHist(cfg.std, cfg.color);
          return (
            <div key={t} className={`nnwinit-card${sel === t ? " selected" : ""}`} onClick={() => setSel(t)} style={{ borderTopColor: cfg.color }}>
              <div className="nnwinit-card-name" style={{ color: cfg.color }}>{t}</div>
              <svg viewBox={`0 0 ${BW} ${BH}`} width="100%" className="nnwinit-card-svg">
                {bars.map((b, i) => (
                  <rect key={i} x={b.x} y={BH - 8 - b.h} width={b.w} height={b.h} fill={b.color} opacity={0.7} rx={1} />
                ))}
                <line x1={8} y1={BH - 8} x2={BW - 8} y2={BH - 8} stroke="#30363d" strokeWidth={1} />
                <text x={BW / 2} y={BH - 1} textAnchor="middle" fontSize={7} fill="#6b7785">weight value</text>
              </svg>
              <div className="nnwinit-card-formula">{cfg.formula}</div>
            </div>
          );
        })}
      </div>
      <div className="nnwinit-info">
        <div className="nnwinit-info-top">
          <span style={{ color: INITS[sel].color, fontWeight: 700 }}>{sel} Initialization</span>
          <span className="nnwinit-info-best">Best for: {INITS[sel].best}</span>
          {INITS[sel].warn && <span className="nnwinit-warn">⚠ {INITS[sel].warn}</span>}
        </div>
        <div className="nnwinit-desc">{INITS[sel].desc}</div>
      </div>
    </div>
  );
}

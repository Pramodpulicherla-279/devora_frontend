import { useState } from "react";
import "./visual.css";

const BW = 280, BH = 110, BINS = 24;

function gaussian(mean, std, n = 600) {
  return Array.from({ length: n }, () => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return mean + std * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  });
}

function makeHist(samples, range, color) {
  const bins = new Array(BINS).fill(0);
  samples.forEach(s => {
    const b = Math.floor(((s - range[0]) / (range[1] - range[0])) * BINS);
    if (b >= 0 && b < BINS) bins[b]++;
  });
  const max = Math.max(...bins);
  return bins.map((c, i) => ({
    x: 10 + (i / BINS) * (BW - 20),
    w: (BW - 20) / BINS - 1,
    h: (c / max) * (BH - 20),
    color,
  }));
}

const LAYERS_DATA = [
  { name: "Layer 1", without: { mean: 0.5, std: 1.8 }, with: { mean: 0, std: 1 } },
  { name: "Layer 2", without: { mean: 2.1, std: 3.2 }, with: { mean: 0, std: 1 } },
  { name: "Layer 3", without: { mean: -1.4, std: 5.5 }, with: { mean: 0, std: 1 } },
];

export default function NnBatchNormVisualization() {
  const [withBN, setWithBN] = useState(false);
  const [layer, setLayer] = useState(0);
  const ld = LAYERS_DATA[layer];
  const cfg = withBN ? ld.with : ld.without;
  const range = withBN ? [-3.5, 3.5] : [-12, 16];
  const color = withBN ? "#a78bfa" : "#f85149";
  const bars = makeHist(gaussian(cfg.mean, cfg.std), range, color);

  const BN_STEPS = [
    { op: "1. Compute mean", eq: "μ_B = (1/m) Σ xᵢ", color: "#58a6ff" },
    { op: "2. Compute variance", eq: "σ²_B = (1/m) Σ (xᵢ − μ_B)²", color: "#a78bfa" },
    { op: "3. Normalize", eq: "x̂ᵢ = (xᵢ − μ_B) / √(σ²_B + ε)", color: "#56d364" },
    { op: "4. Scale & shift", eq: "yᵢ = γ x̂ᵢ + β  (learnable γ, β)", color: "#f97316" },
  ];

  return (
    <div className="nnbn-wrap">
      <div className="nnbn-title">Batch Normalization & Training Stability</div>
      <div className="nnbn-subtitle">Internal covariate shift: activations drift across layers, slowing training</div>

      <div className="nnbn-toggle-row">
        <button className={`nnbn-toggle-btn${!withBN ? " active" : ""}`} onClick={() => setWithBN(false)}>Without BatchNorm</button>
        <button className={`nnbn-toggle-btn${withBN ? " active" : ""}`} onClick={() => setWithBN(true)}>With BatchNorm</button>
        <span style={{ marginLeft: "auto", fontSize: "0.78rem", color: "#6b7785" }}>Layer:</span>
        {LAYERS_DATA.map((l, i) => (
          <button key={i} className={`nnbn-toggle-btn${layer === i ? " active" : ""}`} onClick={() => setLayer(i)} style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem" }}>{l.name}</button>
        ))}
      </div>

      <div className="nnbn-panels">
        <div className="nnbn-panel">
          <div className="nnbn-panel-title" style={{ color }}>
            {withBN ? "With BatchNorm — stable N(0,1)" : `Without BatchNorm — ${ld.name} drifts`}
          </div>
          <svg viewBox={`0 0 ${BW} ${BH}`} width="100%">
            {bars.map((b, i) => (
              <rect key={i} x={b.x} y={BH - 12 - b.h} width={b.w} height={b.h} fill={b.color} opacity={0.75} rx={1} />
            ))}
            <line x1={10} y1={BH - 12} x2={BW - 10} y2={BH - 12} stroke="#30363d" strokeWidth={1} />
            <text x={BW / 2} y={BH - 2} textAnchor="middle" fontSize={8} fill="#6b7785">Activation value</text>
            {!withBN && <text x={BW / 2} y={14} textAnchor="middle" fontSize={8} fill="#f85149">Wide spread → unstable gradients</text>}
            {withBN && <text x={BW / 2} y={14} textAnchor="middle" fontSize={8} fill="#56d364">Tight, centered → stable training</text>}
          </svg>
        </div>
        <div className="nnbn-panel">
          <div className="nnbn-panel-title" style={{ color: "#a78bfa" }}>BatchNorm Algorithm</div>
          <div className="nnbn-steps">
            {BN_STEPS.map((s, i) => (
              <div key={i} className="nnbn-step" style={{ borderLeftColor: s.color }}>
                <div className="nnbn-step-op" style={{ color: s.color }}>{s.op}</div>
                <div className="nnbn-step-eq">{s.eq}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import "./visual.css";

const W = 620, H = 140, PX = 30, PY = 14;
const EP = 50;

function makeLossCurves() {
  let train = 2.3, val = 2.3;
  return Array.from({ length: EP }, (_, i) => {
    const t = i / (EP - 1);
    train = Math.max(0.05, 2.3 * Math.exp(-4 * t) + 0.04);
    const overfit = i > 20 ? (i - 20) * 0.035 : 0;
    val = Math.max(0.28, 2.3 * Math.exp(-3 * t) + 0.28 + overfit);
    return { train, val, ep: i };
  });
}

const FIXES = {
  Dropout: {
    code: `nn.Dropout(p=0.5)  # kills 50% of neurons randomly\n# during training — forces robustness`,
    desc: "Randomly zeros activations during training, preventing co-adaptation of neurons. At inference, all neurons are active (scaled).",
  },
  "L2 Reg": {
    code: `optimizer = torch.optim.Adam(\n  model.parameters(), weight_decay=1e-4\n)`,
    desc: "Adds λ·||W||² to the loss, penalising large weights. Keeps weights small and the model simpler.",
  },
  "Early Stopping": {
    code: `if val_loss > best_val_loss:\n    patience_count += 1\nif patience_count >= patience:\n    break  # stop training`,
    desc: "Monitor validation loss. Stop when it stops improving. Saves the model from the epoch with lowest val loss.",
  },
};

const curves = makeLossCurves();

function pts(key) {
  return curves.map((d, i) => {
    const x = PX + (i / (EP - 1)) * (W - 2 * PX);
    const y = H - PY - (d[key] / 2.3) * (H - 2 * PY);
    return `${x},${y}`;
  }).join(" L");
}

const bestEp = 22;

export default function NnOverfitVisualization() {
  const [fix, setFix] = useState("Dropout");
  const cfg = FIXES[fix];

  return (
    <div className="nnoverfit-wrap">
      <div className="nnoverfit-title">Overfitting in Neural Networks</div>
      <div className="nnoverfit-subtitle">Training loss keeps falling — validation loss rises. The gap is overfitting.</div>

      <div className="nnoverfit-svg-box">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%">
          <line x1={PX} y1={PY} x2={PX} y2={H - PY} stroke="#30363d" strokeWidth={1} />
          <line x1={PX} y1={H - PY} x2={W - PX} y2={H - PY} stroke="#30363d" strokeWidth={1} />
          <polyline points={pts("train")} fill="none" stroke="#56d364" strokeWidth={2} />
          <polyline points={pts("val")} fill="none" stroke="#f85149" strokeWidth={2} />
          <line x1={PX + (bestEp / (EP - 1)) * (W - 2 * PX)} y1={PY} x2={PX + (bestEp / (EP - 1)) * (W - 2 * PX)} y2={H - PY}
            stroke="#a78bfa" strokeWidth={1.5} strokeDasharray="4 3" />
          <text x={PX + (bestEp / (EP - 1)) * (W - 2 * PX) + 4} y={PY + 10} fontSize={8} fill="#a78bfa">Best model</text>
          <text x={W / 2} y={H - 2} textAnchor="middle" fontSize={8} fill="#6b7785">Epochs →</text>
        </svg>
      </div>

      <div className="nnoverfit-legend">
        <div className="nnoverfit-legend-item"><div className="nnoverfit-legend-line" style={{ background: "#56d364" }} />Training loss</div>
        <div className="nnoverfit-legend-item"><div className="nnoverfit-legend-line" style={{ background: "#f85149" }} />Validation loss</div>
        <div className="nnoverfit-legend-item"><div className="nnoverfit-legend-line" style={{ background: "#a78bfa" }} />Early stop point</div>
      </div>

      <div style={{ fontSize: "0.8rem", color: "#a3adbb", marginBottom: "0.75rem" }}>Regularization solutions:</div>
      <div className="nnoverfit-tabs">
        {Object.keys(FIXES).map(t => (
          <button key={t} className={`nnoverfit-tab${fix === t ? " active" : ""}`} onClick={() => setFix(t)}>{t}</button>
        ))}
      </div>
      <div className="nnoverfit-fix">
        <div className="nnoverfit-fix-title">{fix}</div>
        <div className="nnoverfit-fix-code"><pre style={{ margin: 0 }}>{cfg.code}</pre></div>
        <div className="nnoverfit-fix-desc">{cfg.desc}</div>
      </div>
    </div>
  );
}

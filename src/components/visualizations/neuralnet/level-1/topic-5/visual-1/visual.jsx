import { useState } from "react";
import "./visual.css";

const STEPS = [
  { label: "Loss", op: "Compute Loss", eq: "L = (ŷ − y)² = (0.645 − 1)² = 0.126", res: "We overestimated. Gradient of L w.r.t. ŷ = 2(ŷ−y) = −0.71", color: "#f85149" },
  { label: "∂L/∂W₂", op: "Output layer gradient", eq: "∂L/∂W₂ = δ_out · a₁ᵀ = −0.71 × [0.78, 0.52]", res: "∂L/∂W₂ = [−0.554, −0.369] — W₂ needs to increase", color: "#f97316" },
  { label: "δ₁", op: "Propagate error to hidden layer", eq: "δ₁ = (W₂ᵀ · δ_out) ⊙ ReLU′(z₁)", res: "δ₁ = [−0.213, −0.497] — gradient flows back through weights", color: "#f97316" },
  { label: "∂L/∂W₁", op: "Input layer gradient", eq: "∂L/∂W₁ = δ₁ · xᵀ — using input values [0.5, 0.8]", res: "∂L/∂W₁ computed — all weights now have their gradients", color: "#a78bfa" },
  { label: "Update", op: "Gradient descent weight update", eq: "W = W − η · ∂L/∂W  (η = 0.01)", res: "Weights updated. Network will make a better prediction next time.", color: "#56d364" },
];

const NODES = [
  { x: 60, ys: [80, 170] },
  { x: 220, ys: [60, 135, 200] },
  { x: 370, ys: [130] },
];

export default function NnBackpropVisualization() {
  const [step, setStep] = useState(0);
  const cfg = STEPS[step];

  function activeLayer() {
    if (step === 0) return "out";
    if (step <= 2) return "h";
    if (step <= 3) return "in";
    return "all";
  }
  const al = activeLayer();

  return (
    <div className="nnback-wrap">
      <div className="nnback-title">Backpropagation</div>
      <div className="nnback-subtitle">Gradients flow backwards — click through to trace the error signal</div>

      <div className="nnback-svg-box">
        <svg viewBox="0 0 430 250" width="100%">
          {NODES[0].ys.flatMap((y0) => NODES[1].ys.map((y1) => {
            const lit = al === "in" || al === "all";
            return <line key={`${y0}-${y1}-l0`} x1={NODES[0].x} y1={y0} x2={NODES[1].x} y2={y1} stroke={lit ? "#f97316" : "#30363d"} strokeWidth={lit ? 1.8 : 0.8} strokeDasharray={lit ? "6 3" : "none"} />;
          }))}
          {NODES[1].ys.flatMap((y0) => NODES[2].ys.map((y1) => {
            const lit = al === "h" || al === "out" || al === "all";
            return <line key={`${y0}-${y1}-l1`} x1={NODES[1].x} y1={y0} x2={NODES[2].x} y2={y1} stroke={lit ? "#f85149" : "#30363d"} strokeWidth={lit ? 1.8 : 0.8} strokeDasharray={lit ? "6 3" : "none"} />;
          }))}
          {/* Arrow direction markers (left-pointing for backprop) */}
          {(al === "h" || al === "out" || al === "all") && (
            <polygon points={`${NODES[1].x + 18},125 ${NODES[1].x + 10},120 ${NODES[1].x + 10},130`} fill="#f85149" />
          )}
          {(al === "in" || al === "all") && (
            <polygon points={`${NODES[0].x + 18},120 ${NODES[0].x + 10},115 ${NODES[0].x + 10},125`} fill="#f97316" />
          )}
          {NODES.map((layer, li) =>
            layer.ys.map((y) => {
              const lit = (li === 2 && (al === "out" || al === "all")) || (li === 1 && (al === "h" || al === "all")) || (li === 0 && (al === "in" || al === "all"));
              return (
                <circle key={`${li}-${y}`} cx={layer.x} cy={y} r={18}
                  fill={lit ? `${cfg.color}33` : "#161b22"}
                  stroke={lit ? cfg.color : "#30363d"}
                  strokeWidth={lit ? 2 : 1.2}
                />
              );
            })
          )}
          {[["Input", 60, 220], ["Hidden", 220, 230], ["Output", 370, 220]].map(([l, x, y]) => (
            <text key={l} x={x} y={y} textAnchor="middle" fontSize={9} fill="#6b7785">{l}</text>
          ))}
          <text x={215} y={18} textAnchor="middle" fontSize={10} fill="#f85149">← Gradient Flow</text>
        </svg>
      </div>

      <div className="nnback-steps">
        {STEPS.map((s, i) => (
          <div key={i} className={`nnback-step-dot ${i < step ? "done" : i === step ? "current" : ""}`}>{i + 1}. {s.label}</div>
        ))}
      </div>

      <div className="nnback-info">
        <div className="nnback-info-op" style={{ color: cfg.color }}>{cfg.op}</div>
        <div className="nnback-info-eq">{cfg.eq}</div>
        <div className="nnback-info-res">{cfg.res}</div>
      </div>

      <div className="nnback-btn-row">
        <button className="nnback-btn reset" onClick={() => setStep(0)}>Reset</button>
        <button className="nnback-btn" disabled={step >= STEPS.length - 1} onClick={() => setStep(s => s + 1)}>Step Back ←</button>
      </div>
    </div>
  );
}

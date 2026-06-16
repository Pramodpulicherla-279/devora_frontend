import { useState } from "react";
import "./visual.css";

const STEPS = [
  { label: "Input", op: "Input values", eq: "x = [0.5, 0.8]", res: "2 input features passed in", color: "#58a6ff" },
  { label: "× W₁", op: "Multiply weights", eq: "z₁ = W₁ · x = [0.5×0.4 + 0.8×0.6]", res: "z₁ = [0.68, 0.42]", color: "#a78bfa" },
  { label: "+ b₁", op: "Add bias", eq: "z₁ = z₁ + b₁ = [0.68+0.1, 0.42+0.1]", res: "z₁ = [0.78, 0.52]", color: "#a78bfa" },
  { label: "ReLU", op: "Apply activation (ReLU)", eq: "a₁ = max(0, z₁) = max(0, [0.78, 0.52])", res: "a₁ = [0.78, 0.52] — all positive, unchanged", color: "#f97316" },
  { label: "× W₂", op: "Multiply output weights", eq: "z₂ = W₂ · a₁ = [0.78×0.3 + 0.52×0.7]", res: "z₂ = [0.598]", color: "#a78bfa" },
  { label: "Output", op: "Final prediction", eq: "ŷ = sigmoid(z₂) = 1 / (1 + e⁻⁰·⁵⁹⁸)", res: "ŷ ≈ 0.645 — 64.5% probability", color: "#56d364" },
];

const NODES = [
  { x: 60, ys: [70, 170] },
  { x: 210, ys: [60, 140, 200] },
  { x: 360, ys: [120] },
];

export default function NnForwardPropVisualization() {
  const [step, setStep] = useState(0);

  const cfg = STEPS[step];

  function activeEdges() {
    if (step === 0) return [];
    if (step <= 3) return ["l0"];
    if (step <= 5) return ["l1"];
    return ["l0", "l1"];
  }
  const ae = activeEdges();

  return (
    <div className="nnfwd-wrap">
      <div className="nnfwd-title">Forward Propagation</div>
      <div className="nnfwd-subtitle">Step through a forward pass to see how inputs become predictions</div>

      <div className="nnfwd-svg-box">
        <svg viewBox="0 0 420 240" width="100%">
          {NODES[0].ys.flatMap((y0) => NODES[1].ys.map((y1) => (
            <line key={`${y0}-${y1}`} x1={NODES[0].x} y1={y0} x2={NODES[1].x} y2={y1}
              stroke={ae.includes("l0") ? "#a78bfa" : "#30363d"} strokeWidth={ae.includes("l0") ? 1.8 : 0.8} strokeOpacity={0.7} />
          )))}
          {NODES[1].ys.flatMap((y0) => NODES[2].ys.map((y1) => (
            <line key={`${y0}-${y1}`} x1={NODES[1].x} y1={y0} x2={NODES[2].x} y2={y1}
              stroke={ae.includes("l1") ? "#a78bfa" : "#30363d"} strokeWidth={ae.includes("l1") ? 1.8 : 0.8} strokeOpacity={0.7} />
          )))}
          {NODES.map((layer, li) =>
            layer.ys.map((y) => {
              const lit = (li === 0 && step === 0) || (li === 1 && step >= 1 && step <= 3) || (li === 2 && step >= 4);
              return (
                <circle key={`${li}-${y}`} cx={layer.x} cy={y} r={18}
                  fill={lit ? `${cfg.color}33` : "#161b22"}
                  stroke={lit ? cfg.color : "#30363d"}
                  strokeWidth={lit ? 2 : 1.2}
                />
              );
            })
          )}
          {[["Input\nLayer", 60, 210], ["Hidden\nLayer", 210, 220], ["Output\nLayer", 360, 210]].map(([l, x, y]) => (
            <text key={l} x={x} y={y} textAnchor="middle" fontSize={9} fill="#6b7785">{l.replace("\n", " ")}</text>
          ))}
          {step > 0 && (
            <g>
              <polygon points={`${NODES[step > 3 ? 2 : 1].x - 30},115 ${NODES[step > 3 ? 2 : 1].x - 18},110 ${NODES[step > 3 ? 2 : 1].x - 18},120`} fill={cfg.color} opacity={0.8} />
            </g>
          )}
        </svg>
      </div>

      <div className="nnfwd-steps">
        {STEPS.map((s, i) => (
          <div key={i} className={`nnfwd-step-dot ${i < step ? "done" : i === step ? "current" : ""}`}>{i + 1}. {s.label}</div>
        ))}
      </div>

      <div className="nnfwd-info">
        <div className="nnfwd-info-op" style={{ color: cfg.color }}>{cfg.op}</div>
        <div className="nnfwd-info-eq">{cfg.eq}</div>
        <div className="nnfwd-info-res">{cfg.res}</div>
      </div>

      <div className="nnfwd-btn-row">
        <button className="nnfwd-btn reset" onClick={() => setStep(0)}>Reset</button>
        <button className="nnfwd-btn" disabled={step >= STEPS.length - 1} onClick={() => setStep(s => s + 1)}>Next Step →</button>
      </div>
    </div>
  );
}

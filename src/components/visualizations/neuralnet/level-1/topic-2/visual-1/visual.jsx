import { useState } from "react";
import "./visual.css";

const W = 260, H = 140, PX = 20, PY = 15;

function toSvgX(x) { return PX + ((x + 3) / 6) * (W - 2 * PX); }
function toSvgY(y, min, max) { return H - PY - ((y - min) / (max - min)) * (H - 2 * PY); }

function makePath(fn, min, max, steps = 80) {
  const pts = Array.from({ length: steps + 1 }, (_, i) => {
    const x = -3 + (6 * i) / steps;
    return `${toSvgX(x)},${toSvgY(Math.max(min, Math.min(max, fn(x))), min, max)}`;
  });
  return "M" + pts.join(" L");
}

const FNS = {
  ReLU: { fn: x => Math.max(0, x), min: 0, max: 3, formula: "f(x) = max(0, x)", deriv: "f′(x) = 0 if x<0, else 1", range: "Range: [0, ∞)", warn: "Dead neuron: if x≤0, gradient = 0. Neurons can get stuck never activating." },
  Sigmoid: { fn: x => 1 / (1 + Math.exp(-x)), min: 0, max: 1, formula: "f(x) = 1 / (1 + e⁻ˣ)", deriv: "f′(x) = f(x)(1 - f(x))", range: "Range: (0, 1)", warn: "Vanishing gradient: saturates at 0 & 1, killing gradients in deep nets." },
  Tanh: { fn: x => Math.tanh(x), min: -1, max: 1, formula: "f(x) = (eˣ − e⁻ˣ) / (eˣ + e⁻ˣ)", deriv: "f′(x) = 1 − tanh²(x)", range: "Range: (−1, 1)", warn: null },
  "Leaky ReLU": { fn: x => x >= 0 ? x : 0.1 * x, min: -0.4, max: 3, formula: "f(x) = x if x≥0, else αx (α=0.1)", deriv: "f′(x) = α if x<0, else 1", range: "Range: (−∞, ∞)", warn: "Fixes dead neuron by allowing small negative gradient (α=0.01–0.3)." },
};
const TABS = Object.keys(FNS);

export default function NnActivationVisualization() {
  const [tab, setTab] = useState("ReLU");
  const cfg = FNS[tab];

  return (
    <div className="nnact-wrap">
      <div className="nnact-title">Activation Functions</div>
      <div className="nnact-tabs">
        {TABS.map(t => (
          <button key={t} className={`nnact-tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className="nnact-body">
        <div className="nnact-svg-box">
          <svg viewBox={`0 0 ${W} ${H}`} width="100%">
            <line x1={PX} y1={toSvgY(0, cfg.min, cfg.max)} x2={W - PX} y2={toSvgY(0, cfg.min, cfg.max)} stroke="#30363d" strokeWidth={1} />
            <line x1={toSvgX(0)} y1={PY} x2={toSvgX(0)} y2={H - PY} stroke="#30363d" strokeWidth={1} />
            <path d={makePath(cfg.fn, cfg.min, cfg.max)} fill="none" stroke="#a78bfa" strokeWidth={2.5} />
            <text x={W - PX} y={PY + 4} fontSize={9} fill="#6b7785" textAnchor="end">x</text>
            <text x={toSvgX(0) + 4} y={PY + 10} fontSize={9} fill="#6b7785">f(x)</text>
          </svg>
        </div>
        <div className="nnact-meta">
          <div className="nnact-formula">{cfg.formula}</div>
          <div>
            <div className="nnact-deriv-label">Derivative</div>
            <div className="nnact-deriv">{cfg.deriv}</div>
          </div>
          <div className="nnact-range">Output → <span>{cfg.range.replace("Range: ", "")}</span></div>
          {cfg.warn && <div className="nnact-warn">⚠ {cfg.warn}</div>}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import "./visual.css";

const W = 200, H = 140, P = 20;
const xs = Array.from({ length: 30 }, (_, i) => (i / 29) * 6 + 0.5);
const noise = [0.3,-0.2,0.4,-0.1,0.5,-0.3,0.2,-0.4,0.3,-0.2,0.4,-0.1,0.5,-0.3,0.2,-0.4,0.3,-0.2,0.4,-0.1,0.5,-0.3,0.2,-0.4,0.3,-0.2,0.4,-0.1,0.5,-0.3];
const trueY = (x) => 0.5 * x + Math.sin(x) * 0.6 + 2;
const points = xs.map((x, i) => ({ x, y: trueY(x) + noise[i] * 0.7 }));

const models = {
  under: {
    label: "Underfitting",
    color: "#f97316",
    trainAcc: "62%",
    testAcc: "60%",
    desc: "Too simple — high bias, misses real pattern.",
    fn: (x) => 0.4 * x + 2.2,
  },
  good: {
    label: "Good Fit",
    color: "#56d364",
    trainAcc: "90%",
    testAcc: "88%",
    desc: "Captures the trend without chasing noise.",
    fn: (x) => 0.5 * x + Math.sin(x * 0.8) * 0.5 + 2,
  },
  over: {
    label: "Overfitting",
    color: "#a78bfa",
    trainAcc: "99%",
    testAcc: "54%",
    desc: "Too complex — high variance, memorizes noise.",
    fn: (x) => trueY(x) + Math.sin(x * 3.5) * 0.45 + noise[Math.floor(x * 3) % 30] * 0.6,
  },
};

function toSx(x) { return P + ((x - 0.5) / 6) * (W - 2 * P); }
function toSy(y) { return H - P - ((y - 0) / 7) * (H - 2 * P); }

function CurvePlot({ model }) {
  const m = models[model];
  const curvePts = xs.map(x => `${toSx(x).toFixed(1)},${toSy(m.fn(x)).toFixed(1)}`).join(" ");
  return (
    <div className="svoverfit-plot">
      <div className="svoverfit-plot-label" style={{ color: m.color }}>{m.label}</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="svoverfit-svg">
        <line x1={P} y1={P} x2={P} y2={H-P} stroke="#30363d" strokeWidth="1"/>
        <line x1={P} y1={H-P} x2={W-P} y2={H-P} stroke="#30363d" strokeWidth="1"/>
        {points.map((pt, i) => (
          <circle key={i} cx={toSx(pt.x)} cy={toSy(pt.y)} r="2.5" fill="#a3adbb" opacity="0.6"/>
        ))}
        <polyline points={curvePts} fill="none" stroke={m.color} strokeWidth="2"/>
      </svg>
      <div className="svoverfit-acc-row">
        <span className="svoverfit-acc-item">
          <span style={{color:"#56d364"}}>Train:</span> {m.trainAcc}
        </span>
        <span className="svoverfit-acc-item">
          <span style={{color:"#f97316"}}>Test:</span> {m.testAcc}
        </span>
      </div>
      <div className="svoverfit-desc">{m.desc}</div>
    </div>
  );
}

export default function SvOverfitVisualization() {
  const [active, setActive] = useState("good");
  return (
    <div className="svoverfit-wrap">
      <h2 className="svoverfit-title">Overfitting & Underfitting</h2>
      <div className="svoverfit-tabs">
        {Object.keys(models).map(k => (
          <button key={k}
            className={`svoverfit-tab ${active === k ? "svoverfit-tab--active" : ""}`}
            style={active === k ? {borderColor: models[k].color, color: models[k].color} : {}}
            onClick={() => setActive(k)}>
            {models[k].label}
          </button>
        ))}
      </div>
      <div className="svoverfit-plots">
        {Object.keys(models).map(k => (
          <CurvePlot key={k} model={k} />
        ))}
      </div>
      <div className="svoverfit-complexity">
        <div className="svoverfit-complexity-bar">
          <span style={{color:"#f97316"}}>Low complexity</span>
          <div className="svoverfit-bar-track">
            <div className="svoverfit-bar-fill"/>
          </div>
          <span style={{color:"#a78bfa"}}>High complexity</span>
        </div>
        <div className="svoverfit-sweet">↑ Sweet spot: low bias + low variance</div>
      </div>
    </div>
  );
}

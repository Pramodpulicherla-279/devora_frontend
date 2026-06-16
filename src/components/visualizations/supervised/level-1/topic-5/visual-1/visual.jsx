import { useState } from "react";
import "./visual.css";

const scenarios = {
  good: {
    label: "Good Model",
    color: "#56d364",
    points: [
      {actual:1,pred:1.1},{actual:2,pred:1.9},{actual:3,pred:3.1},{actual:4,pred:3.8},
      {actual:5,pred:5.2},{actual:6,pred:5.9},{actual:7,pred:7.1},{actual:8,pred:8.0},
    ],
    mse: "0.04", mae: "0.13", r2: "0.99"
  },
  bad: {
    label: "Poor Model",
    color: "#f97316",
    points: [
      {actual:1,pred:3.5},{actual:2,pred:1.0},{actual:3,pred:5.5},{actual:4,pred:2.0},
      {actual:5,pred:7.0},{actual:6,pred:3.5},{actual:7,pred:9.0},{actual:8,pred:4.5},
    ],
    mse: "6.84", mae: "2.19", r2: "0.21"
  }
};

const W = 260, H = 180, P = 28;
const sc = (v) => P + ((v - 0) / 9) * (W - 2 * P);

export default function SvRegrEvalVisualization() {
  const [model, setModel] = useState("good");
  const s = scenarios[model];

  return (
    <div className="svregreval-wrap">
      <h2 className="svregreval-title">Evaluating Regression Models</h2>
      <div className="svregreval-tabs">
        {["good","bad"].map(k => (
          <button key={k} className={`svregreval-tab ${model === k ? "svregreval-tab--active" : ""}`}
            style={model === k ? {borderColor: scenarios[k].color, color: scenarios[k].color, background: k === "good" ? "#0f2a1a" : "#2a1600"} : {}}
            onClick={() => setModel(k)}>
            {scenarios[k].label}
          </button>
        ))}
      </div>

      <div className="svregreval-plot">
        <div className="svregreval-plot-label">Actual vs Predicted</div>
        <svg viewBox={`0 0 ${W} ${H}`} className="svregreval-svg">
          <line x1={P} y1={P} x2={P} y2={H-P} stroke="#30363d" strokeWidth="1"/>
          <line x1={P} y1={H-P} x2={W-P} y2={H-P} stroke="#30363d" strokeWidth="1"/>
          <line x1={P} y1={H-P} x2={W-P} y2={P} stroke="#21262d" strokeWidth="1" strokeDasharray="3 3"/>
          {s.points.map((pt, i) => (
            <circle key={i} cx={sc(pt.actual)} cy={H - P - ((pt.pred / 9) * (H - 2 * P))} r="5"
              fill={s.color} opacity="0.85"/>
          ))}
          <text x={W-P} y={H-P+14} textAnchor="end" fill="#6b7785" fontSize="9">Actual</text>
          <text x={P-2} y={P} textAnchor="end" fill="#6b7785" fontSize="9" transform={`rotate(-90,${P-12},${P+20})`}>Pred</text>
        </svg>
        <div className="svregreval-ideal">Dashed = perfect predictions</div>
      </div>

      <div className="svregreval-metrics">
        {[
          { label: "MSE", value: s.mse, desc: "Mean Squared Error — penalizes large errors" },
          { label: "MAE", value: s.mae, desc: "Mean Absolute Error — average magnitude" },
          { label: "R²", value: s.r2, desc: "Variance explained (1.0 = perfect)" },
        ].map(m => (
          <div key={m.label} className="svregreval-card" style={{borderColor: s.color}}>
            <div className="svregreval-card-label">{m.label}</div>
            <div className="svregreval-card-val" style={{color: s.color}}>{m.value}</div>
            <div className="svregreval-card-desc">{m.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

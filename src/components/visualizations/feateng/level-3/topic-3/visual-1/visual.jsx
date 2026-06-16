import { useState } from "react";
import "./visual.css";

const features = [
  { name: "age",            safe: true,  desc: "Collected before loan decision" },
  { name: "income",         safe: true,  desc: "Known at application time" },
  { name: "credit_score",   safe: true,  desc: "Pre-existing credit bureau data" },
  { name: "loan_amount",    safe: true,  desc: "Requested amount — known upfront" },
  { name: "days_to_default",safe: false, desc: "Derived from target (default event)" },
  { name: "final_balance",  safe: false, desc: "Known only after outcome" },
];

const pipelines = {
  leak: {
    label: "Leaky Pipeline",
    steps: ["All Features → Model", "Test set sees future data", "Artificially high accuracy"],
    color: "#f85149",
  },
  safe: {
    label: "Safe Pipeline",
    steps: ["Remove leaked features", "Train / Test split FIRST", "FE only on train set"],
    color: "#56d364",
  },
};

export default function FeLeakageVisualization() {
  const [mode, setMode] = useState("leak");
  const pipe = pipelines[mode];

  return (
    <div className="feleak-wrap">
      <h3 className="feleak-title">Target Leakage</h3>

      <div className="feleak-toggle">
        {Object.entries(pipelines).map(([k, v]) => (
          <button key={k} className={`feleak-btn ${mode === k ? "feleak-btn--on" : ""}`}
            style={mode === k ? { borderColor: v.color, color: v.color, background: `${v.color}14` } : {}}
            onClick={() => setMode(k)}>{v.label}</button>
        ))}
      </div>

      <div className="feleak-features">
        {features.map(f => {
          const isLeaked = !f.safe;
          const show = mode === "safe" && isLeaked;
          return (
            <div key={f.name} className={`feleak-feat ${isLeaked ? "feleak-feat--leak" : "feleak-feat--safe"} ${show ? "feleak-feat--removed" : ""}`}>
              <div className="feleak-feat-left">
                <span className="feleak-feat-icon">{isLeaked ? "⚠" : "✓"}</span>
                <span className="feleak-feat-name">{f.name}</span>
              </div>
              <span className="feleak-feat-desc">{f.desc}</span>
              {show && <span className="feleak-removed-badge">REMOVED</span>}
            </div>
          );
        })}
      </div>

      <div className="feleak-pipeline" style={{ borderColor: pipe.color }}>
        <div className="feleak-pipe-title" style={{ color: pipe.color }}>{pipe.label}</div>
        {pipe.steps.map((s, i) => (
          <div key={i} className="feleak-pipe-step">
            <span className="feleak-pipe-num" style={{ background: pipe.color }}>{i + 1}</span>
            <span className="feleak-pipe-text">{s}</span>
          </div>
        ))}
      </div>

      <p className="feleak-note">
        {mode === "leak" ? "Leaky features inflate training accuracy — model fails completely in production." : "Removing leaked features gives honest evaluation and production-ready models."}
      </p>
    </div>
  );
}

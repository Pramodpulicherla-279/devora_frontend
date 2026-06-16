import { useState } from "react";
import "./visual.css";

const W = 340, H = 180, PX = 30, PY = 20;

function sigmoid(z) { return 1 / (1 + Math.exp(-z)); }

const code = `from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(X_train, y_train)
proba = model.predict_proba(X_test)[:, 1]`;

export default function SvLogisticVisualization() {
  const [threshold, setThreshold] = useState(0.5);
  const [showCode, setShowCode] = useState(false);

  const xs = Array.from({ length: 100 }, (_, i) => -6 + i * 0.12);
  const pts = xs.map(x => ({
    x: PX + ((x + 6) / 12) * (W - 2 * PX),
    y: H - PY - sigmoid(x) * (H - 2 * PY),
  }));

  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const threshX = PX + ((Math.log(threshold / (1 - threshold)) + 6) / 12) * (W - 2 * PX);
  const threshY = H - PY - threshold * (H - 2 * PY);

  return (
    <div className="svlogit-wrap">
      <h2 className="svlogit-title">Logistic Regression</h2>
      <div className="svlogit-subtitle">Sigmoid function: σ(z) = 1 / (1 + e<sup>−z</sup>)</div>

      <svg viewBox={`0 0 ${W} ${H}`} className="svlogit-svg">
        <line x1={PX} y1={PY} x2={PX} y2={H-PY} stroke="#30363d" strokeWidth="1"/>
        <line x1={PX} y1={H-PY} x2={W-PX} y2={H-PY} stroke="#30363d" strokeWidth="1"/>
        <line x1={PX} y1={H-PY-0.5*(H-2*PY)} x2={W-PX} y2={H-PY-0.5*(H-2*PY)} stroke="#21262d" strokeWidth="0.5" strokeDasharray="3 3"/>
        <path d={pathD} fill="none" stroke="#58a6ff" strokeWidth="2.5"/>
        <line x1={threshX} y1={PY} x2={threshX} y2={H-PY} stroke="#f97316" strokeWidth="1.5" strokeDasharray="4 3"/>
        <circle cx={threshX} cy={threshY} r="5" fill="#f97316"/>
        <text x={threshX+5} y={PY+14} fill="#f97316" fontSize="8">Threshold: {threshold.toFixed(2)}</text>
        <text x={PX+4} y={H-PY-0.8*(H-2*PY)} fill="#56d364" fontSize="8">→ Class 1</text>
        <text x={PX+4} y={H-PY-0.15*(H-2*PY)} fill="#a3adbb" fontSize="8">→ Class 0</text>
        <text x={W-PX} y={H-PY+14} textAnchor="end" fill="#6b7785" fontSize="9">z (log-odds)</text>
        <text x={PX+2} y={PY+8} fill="#6b7785" fontSize="9">P(y=1)</text>
      </svg>

      <label className="svlogit-label">
        Decision threshold: <strong style={{color:"#f97316"}}>{threshold.toFixed(2)}</strong>
        <input type="range" min="0.1" max="0.9" step="0.01" value={threshold}
          onChange={e => setThreshold(parseFloat(e.target.value))} className="svlogit-slider"/>
      </label>

      <div className="svlogit-classes">
        <div className="svlogit-cls" style={{borderColor:"#a78bfa"}}>
          <span className="svlogit-cls-val" style={{color:"#a78bfa"}}>P ≥ {threshold.toFixed(2)}</span>
          <span className="svlogit-cls-lbl">Predict Class 1</span>
        </div>
        <div className="svlogit-cls" style={{borderColor:"#6b7785"}}>
          <span className="svlogit-cls-val" style={{color:"#6b7785"}}>P &lt; {threshold.toFixed(2)}</span>
          <span className="svlogit-cls-lbl">Predict Class 0</span>
        </div>
      </div>

      <button className="svlogit-code-btn" onClick={() => setShowCode(!showCode)}>
        {showCode ? "Hide" : "Show"} scikit-learn code
      </button>
      {showCode && <pre className="svlogit-code">{code}</pre>}
    </div>
  );
}

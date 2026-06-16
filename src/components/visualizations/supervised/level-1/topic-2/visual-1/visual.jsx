import { useState } from "react";
import "./visual.css";

const regressionPoints = [
  [30,180],[45,220],[60,260],[75,310],[90,340],[105,380],[120,420]
];
const classPoints = [
  {x:40,y:80,c:0},{x:60,y:100,c:0},{x:55,y:60,c:0},{x:80,y:90,c:0},
  {x:140,y:160,c:1},{x:160,y:140,c:1},{x:155,y:180,c:1},{x:175,y:155,c:1},
];

const toSvg = (x, y, xMin, xMax, yMin, yMax, w, h, pad) => ({
  cx: pad + ((x - xMin) / (xMax - xMin)) * (w - 2 * pad),
  cy: h - pad - ((y - yMin) / (yMax - yMin)) * (h - 2 * pad),
});

export default function SvRvsCVisualization() {
  const [tab, setTab] = useState("regression");

  const W = 200, H = 160, PAD = 20;

  const regLine = { x1: PAD, y1: H - PAD - 20, x2: W - PAD, y2: PAD + 10 };

  return (
    <div className="svrvc-wrap">
      <h2 className="svrvc-title">Regression vs. Classification</h2>
      <div className="svrvc-tabs">
        {["regression", "classification"].map(t => (
          <button key={t} className={`svrvc-tab ${tab === t ? "svrvc-tab--active" : ""}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="svrvc-plots">
        <div className="svrvc-plot-card">
          <div className="svrvc-plot-label" style={{ color: "#56d364" }}>Regression</div>
          <svg viewBox={`0 0 ${W} ${H}`} className="svrvc-svg">
            <line x1={PAD} y1={PAD} x2={PAD} y2={H-PAD} stroke="#30363d" strokeWidth="1"/>
            <line x1={PAD} y1={H-PAD} x2={W-PAD} y2={H-PAD} stroke="#30363d" strokeWidth="1"/>
            {regressionPoints.map(([px, py], i) => {
              const p = toSvg(px, py, 20, 130, 160, 440, W, H, PAD);
              return <circle key={i} cx={p.cx} cy={p.cy} r="4" fill={tab === "regression" ? "#56d364" : "#21262d"} stroke="#56d364" strokeWidth="1"/>;
            })}
            <line {...regLine} stroke={tab === "regression" ? "#58a6ff" : "#21262d"} strokeWidth="2" strokeDasharray="4 2"/>
            <text x={W/2} y={H-4} textAnchor="middle" fill="#6b7785" fontSize="9">→ continuous output</text>
          </svg>
          <div className="svrvc-caption">Predicts a <strong style={{color:"#56d364"}}>number</strong> (e.g. house price)</div>
        </div>

        <div className="svrvc-plot-card">
          <div className="svrvc-plot-label" style={{ color: "#a78bfa" }}>Classification</div>
          <svg viewBox={`0 0 ${W} ${H}`} className="svrvc-svg">
            <line x1={PAD} y1={PAD} x2={PAD} y2={H-PAD} stroke="#30363d" strokeWidth="1"/>
            <line x1={PAD} y1={H-PAD} x2={W-PAD} y2={H-PAD} stroke="#30363d" strokeWidth="1"/>
            {classPoints.map((p, i) => {
              const sv = toSvg(p.x, p.y, 30, 190, 50, 200, W, H, PAD);
              return <circle key={i} cx={sv.cx} cy={sv.cy} r="5" fill={p.c === 0 ? "#56d364" : "#a78bfa"} opacity="0.85"/>;
            })}
            <line x1={W/2} y1={PAD} x2={W/2-10} y2={H-PAD} stroke={tab === "classification" ? "#f97316" : "#21262d"} strokeWidth="2" strokeDasharray="4 2"/>
            <text x={W/2} y={H-4} textAnchor="middle" fill="#6b7785" fontSize="9">→ discrete class label</text>
          </svg>
          <div className="svrvc-caption">Predicts a <strong style={{color:"#a78bfa"}}>category</strong> (e.g. spam/not spam)</div>
        </div>
      </div>

      <div className="svrvc-info">
        {tab === "regression" ? (
          <p>Output is a <span className="svrvc-hl hl-green">continuous value</span>. Loss function: Mean Squared Error. Common algorithms: Linear Regression, SVR, Gradient Boosting.</p>
        ) : (
          <p>Output is a <span className="svrvc-hl hl-violet">discrete label</span>. Loss function: Cross-Entropy. Common algorithms: Logistic Regression, Decision Tree, SVM.</p>
        )}
      </div>
    </div>
  );
}

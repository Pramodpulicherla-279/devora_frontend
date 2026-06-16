import { useState } from "react";
import "./visual.css";

const points = [
  [1,2.1],[1.5,3.2],[2,3.8],[2.5,5.1],[3,4.7],[3.5,6.2],[4,6.9],[4.5,7.8],[5,8.3]
];

const W = 300, H = 200, PX = 30, PY = 20;
const xMin = 0, xMax = 6, yMin = 0, yMax = 10;

function toSx(x) { return PX + ((x - xMin) / (xMax - xMin)) * (W - 2 * PX); }
function toSy(y) { return H - PY - ((y - yMin) / (yMax - yMin)) * (H - 2 * PY); }

function linePts(slope, intercept) {
  const x0 = 0.5, x1 = 5.5;
  return `${toSx(x0)},${toSy(slope * x0 + intercept)} ${toSx(x1)},${toSy(slope * x1 + intercept)}`;
}

function calcMSE(slope, intercept) {
  const errors = points.map(([x, y]) => {
    const pred = slope * x + intercept;
    return (y - pred) ** 2;
  });
  return (errors.reduce((a, b) => a + b, 0) / errors.length).toFixed(2);
}

export default function SvLinearRegrVisualization() {
  const [slope, setSlope] = useState(1.5);
  const [intercept, setIntercept] = useState(0.5);

  const mse = calcMSE(slope, intercept);
  const optMSE = calcMSE(1.56, 0.55);

  return (
    <div className="svlinregr-wrap">
      <h2 className="svlinregr-title">Linear Regression</h2>
      <div className="svlinregr-formula">
        y = {slope.toFixed(2)}x + {intercept.toFixed(2)}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="svlinregr-svg">
        <line x1={PX} y1={PY} x2={PX} y2={H-PY} stroke="#30363d" strokeWidth="1"/>
        <line x1={PX} y1={H-PY} x2={W-PX} y2={H-PY} stroke="#30363d" strokeWidth="1"/>
        {[2,4,6,8].map(v => (
          <line key={v} x1={PX} y1={toSy(v)} x2={W-PX} y2={toSy(v)} stroke="#21262d" strokeWidth="0.5"/>
        ))}
        <polyline points={linePts(slope, intercept)} fill="none" stroke="#58a6ff" strokeWidth="2"/>
        {points.map(([x, y], i) => {
          const pred = slope * x + intercept;
          const sx = toSx(x), sy = toSy(y), spy = toSy(pred);
          return (
            <g key={i}>
              <line x1={sx} y1={sy} x2={sx} y2={spy} stroke="#f97316" strokeWidth="1" strokeDasharray="2 2" opacity="0.6"/>
              <circle cx={sx} cy={sy} r="4" fill="#56d364"/>
            </g>
          );
        })}
        <text x={W-PX} y={H-PY+14} textAnchor="end" fill="#6b7785" fontSize="9">x</text>
        <text x={PX-4} y={PY+4} textAnchor="end" fill="#6b7785" fontSize="9">y</text>
      </svg>

      <div className="svlinregr-controls">
        <label className="svlinregr-label">
          Slope (m): <strong style={{color:"#58a6ff"}}>{slope.toFixed(2)}</strong>
          <input type="range" min="0" max="3" step="0.05" value={slope}
            onChange={e => setSlope(parseFloat(e.target.value))} className="svlinregr-slider"/>
        </label>
        <label className="svlinregr-label">
          Intercept (b): <strong style={{color:"#a78bfa"}}>{intercept.toFixed(2)}</strong>
          <input type="range" min="-2" max="3" step="0.05" value={intercept}
            onChange={e => setIntercept(parseFloat(e.target.value))} className="svlinregr-slider"/>
        </label>
      </div>

      <div className="svlinregr-metrics">
        <div className="svlinregr-metric">
          <span className="svlinregr-metric-lbl">MSE (yours)</span>
          <span className="svlinregr-metric-val" style={{color: mse <= optMSE * 1.3 ? "#56d364" : "#f97316"}}>{mse}</span>
        </div>
        <div className="svlinregr-metric">
          <span className="svlinregr-metric-lbl">MSE (optimal)</span>
          <span className="svlinregr-metric-val" style={{color:"#56d364"}}>{optMSE}</span>
        </div>
      </div>
      <p className="svlinregr-hint">Dashed orange lines show <strong>residuals</strong> — the errors the model minimizes.</p>
    </div>
  );
}

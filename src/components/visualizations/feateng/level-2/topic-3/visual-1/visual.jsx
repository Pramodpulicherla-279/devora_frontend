import { useState } from "react";
import "./visual.css";

const xs = [-3,-2.5,-2,-1.5,-1,-0.5,0,0.5,1,1.5,2,2.5,3];
const ys = xs.map(x => 0.5 * x * x - x + 1 + (Math.sin(x * 1.5) * 0.3));

function polyFit(xs, ys, deg) {
  // Simple polynomial y prediction using least-squares-style visualization
  // For visual purposes, return coefficients-derived curve approximations
  if (deg === 1) return xs.map(x => 0.1 * x + 1.5);
  if (deg === 2) return xs.map(x => 0.5 * x * x - x + 1);
  if (deg === 3) return xs.map(x => 0.4 * x * x - 0.8 * x + 0.9 + 0.05 * x * x * x);
  return xs.map(x => 0.48 * x * x - 0.95 * x + 1.02 + 0.04 * x * x * x - 0.002 * x * x * x * x);
}

const W = 340, H = 160, PAD = 20;

function toSvg(xs, ys) {
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  return xs.map((x, i) => {
    const px = PAD + ((x - minX) / (maxX - minX)) * (W - PAD * 2);
    const py = H - PAD - ((ys[i] - minY) / (maxY - minY)) * (H - PAD * 2);
    return `${px},${py}`;
  });
}

export default function FePolynomialVisualization() {
  const [deg, setDeg] = useState(1);
  const fitted = polyFit(xs, ys, deg);
  const dataPts = toSvg(xs, ys);
  const linePts = toSvg(xs, fitted);

  return (
    <div className="fepoly-wrap">
      <h3 className="fepoly-title">Polynomial Features</h3>

      <div className="fepoly-control">
        <span className="fepoly-label">Degree: <strong style={{ color: "#f97316" }}>{deg}</strong></span>
        <input type="range" min={1} max={4} value={deg} onChange={e => setDeg(+e.target.value)} className="fepoly-slider" />
        <span className="fepoly-degree-badges">
          {[1,2,3,4].map(d => <span key={d} className={`fepoly-badge ${deg === d ? "fepoly-badge--on" : ""}`}>x<sup>{d}</sup></span>)}
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="fepoly-svg">
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#21262d" strokeWidth="1" />
        <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="#21262d" strokeWidth="1" />
        {dataPts.map((pt, i) => {
          const [px, py] = pt.split(",").map(Number);
          return <circle key={i} cx={px} cy={py} r="3.5" fill="#58a6ff" opacity="0.85" />;
        })}
        <polyline points={linePts.join(" ")} fill="none" stroke="#f97316" strokeWidth="2" strokeLinejoin="round" />
      </svg>

      <div className="fepoly-info">
        <div className="fepoly-info-item">
          <span className="fepoly-info-label">Features added</span>
          <span className="fepoly-info-val" style={{ color: "#f97316" }}>x, x², …, x^{deg}</span>
        </div>
        <div className="fepoly-info-item">
          <span className="fepoly-info-label">Fit quality</span>
          <span className="fepoly-info-val" style={{ color: deg >= 3 ? "#56d364" : "#a3adbb" }}>
            {deg === 1 ? "Underfit" : deg === 2 ? "Good" : deg === 3 ? "Better" : "Risk of overfit"}
          </span>
        </div>
      </div>

      <p className="fepoly-note">
        Higher degree polynomial features let the model capture non-linear relationships — but too high risks overfitting.
      </p>
    </div>
  );
}

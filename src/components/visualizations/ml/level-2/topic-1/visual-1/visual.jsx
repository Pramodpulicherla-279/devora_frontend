/* Lesson: Linear Regression — Predicting a Number
 * Visual type: INTERACTIVE
 * Reason: The lesson covers predicting a continuous target (order value) from
 * a feature. Dragging the slope and intercept of the fit line while watching
 * residuals shrink teaches "least squares" better than any equation. */
import React, { useState, useMemo } from 'react';
import './visual.css';

const W = 300, H = 130, PAD = 22;
const POINTS = [
  [0.15,0.22],[0.22,0.30],[0.30,0.38],[0.38,0.42],[0.45,0.50],
  [0.52,0.55],[0.58,0.62],[0.65,0.70],[0.72,0.73],[0.80,0.82],
].map(([x, y]) => ({
  x: PAD + x * (W - 2 * PAD),
  y: H - PAD - y * (H - 2 * PAD),
  xv: (x * 30000 + 5000).toFixed(0),
  yv: (y * 24000 + 2000).toFixed(0),
}));

function px(v, lo, hi) { return PAD + ((v - lo) / (hi - lo)) * (W - 2 * PAD); }
function py(v, lo, hi) { return H - PAD - ((v - lo) / (hi - lo)) * (H - 2 * PAD); }

const MlLinearRegressionVisualization = () => {
  const [slope, setSlope] = useState(0.8);
  const [intercept, setIntercept] = useState(0.1);

  const lineY = (xFrac) => intercept + slope * xFrac;
  const mse = useMemo(() => {
    const errs = POINTS.map(p => {
      const xFrac = (p.x - PAD) / (W - 2 * PAD);
      const yPred = lineY(xFrac);
      const yFrac = (H - PAD - p.y) / (H - 2 * PAD);
      return (yFrac - yPred) ** 2;
    });
    return (errs.reduce((a, b) => a + b, 0) / errs.length * 1000).toFixed(1);
  }, [slope, intercept]);

  const x0 = PAD, x1 = W - PAD;
  const y0 = H - PAD - lineY(0) * (H - 2 * PAD);
  const y1 = H - PAD - lineY(1) * (H - 2 * PAD);

  return (
    <div className="mllreg-wrap">
      <header className="mllreg-head">
        <span className="mllreg-badge">Machine Learning</span>
        <h2>Linear Regression</h2>
        <p>Predict a number — drag to minimise residuals</p>
      </header>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="mllreg-svg">
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#30363d" strokeWidth={1} />
        <line x1={PAD} y1={PAD / 2} x2={PAD} y2={H - PAD} stroke="#30363d" strokeWidth={1} />
        <text x={W - PAD} y={H - PAD + 11} textAnchor="end" fill="#6b7785" fontSize={8}>Feature (items)</text>
        <text x={PAD - 2} y={PAD / 2 + 4} textAnchor="end" fill="#6b7785" fontSize={8}>₹</text>
        <line x1={x0} y1={Math.max(PAD / 2, Math.min(H - PAD, y0))} x2={x1} y2={Math.max(PAD / 2, Math.min(H - PAD, y1))} stroke="#a78bfa" strokeWidth={2} />
        {POINTS.map((p, i) => {
          const xFrac = (p.x - PAD) / (W - 2 * PAD);
          const yPredPx = H - PAD - lineY(xFrac) * (H - 2 * PAD);
          return (
            <g key={i}>
              <line x1={p.x} y1={p.y} x2={p.x} y2={yPredPx} stroke="#f85149" strokeWidth={1} opacity={0.6} />
              <circle cx={p.x} cy={p.y} r={4} fill="#f0883e" opacity={0.85} />
            </g>
          );
        })}
      </svg>

      <div className="mllreg-controls">
        <label className="mllreg-lbl">Slope β₁ = {slope.toFixed(2)}
          <input type="range" min={0} max={1.5} step={0.05} value={slope} onChange={e => setSlope(+e.target.value)} className="mllreg-slider" />
        </label>
        <label className="mllreg-lbl">Intercept β₀ = {intercept.toFixed(2)}
          <input type="range" min={-0.3} max={0.5} step={0.05} value={intercept} onChange={e => setIntercept(+e.target.value)} className="mllreg-slider" />
        </label>
      </div>

      <div className="mllreg-stats">
        <div className="mllreg-stat"><span>MSE (×10⁻³)</span><strong style={{ color: +mse < 5 ? '#56d364' : '#f0883e' }}>{mse}</strong></div>
        <div className="mllreg-stat"><span>Residuals</span><strong>Red lines</strong></div>
        <div className="mllreg-stat"><span>OLS goal</span><strong>Minimise MSE</strong></div>
      </div>

      <div className="mllreg-note">
        OLS finds the slope and intercept that minimise the sum of squared residuals automatically. <code>LinearRegression().fit(X, y)</code> does this in one call — the drag slider shows what it's optimising.
      </div>
    </div>
  );
};

export default MlLinearRegressionVisualization;

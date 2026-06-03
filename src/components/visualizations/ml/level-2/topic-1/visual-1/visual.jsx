/* Lesson: Linear Regression
 * Visual type: INTERACTIVE
 * Reason: "Fitting a line that minimizes error" is best learned by dragging the
 * slope/intercept and watching the residuals and MSE shrink toward the best fit. */
import React, { useState } from 'react';
import './visual.css';

const PTS = [[10,25],[22,30],[35,42],[48,45],[60,58],[72,62],[85,78]];
const BEST = { m: 0.62, b: 18 }; // approx least-squares

const MlLinearRegressionVisualization = () => {
  const [m, setM] = useState(0.3);
  const [b, setB] = useState(30);
  const W = 300, H = 180, pad = 26;
  const X = (x) => pad + (x / 100) * (W - 2 * pad);
  const Y = (y) => H - pad - (y / 100) * (H - 2 * pad);
  const predict = (x) => m * x + b;
  const mse = PTS.reduce((s, [x, y]) => s + (y - predict(x)) ** 2, 0) / PTS.length;
  const bestMse = PTS.reduce((s, [x, y]) => s + (y - (BEST.m * x + BEST.b)) ** 2, 0) / PTS.length;
  const near = mse < bestMse * 1.15;

  return (
    <div className="mllr-wrap">
      <header className="mllr-head">
        <span className="mllr-badge">Machine Learning</span>
        <h2>Linear Regression</h2>
        <p>Find the line that minimizes squared error</p>
      </header>
      <div className="mllr-chart-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="mllr-svg" preserveAspectRatio="xMidYMid meet">
          <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} className="mllr-axis" />
          <line x1={pad} y1={pad} x2={pad} y2={H - pad} className="mllr-axis" />
          {PTS.map(([x, y], i) => (
            <line key={`r${i}`} x1={X(x)} y1={Y(y)} x2={X(x)} y2={Y(Math.max(0, Math.min(100, predict(x))))} className="mllr-residual" />
          ))}
          <line x1={X(0)} y1={Y(Math.max(0, Math.min(100, predict(0))))} x2={X(100)} y2={Y(Math.max(0, Math.min(100, predict(100))))} className="mllr-line" />
          {PTS.map(([x, y], i) => <circle key={i} cx={X(x)} cy={Y(y)} r="4.5" className="mllr-pt" />)}
        </svg>
      </div>
      <div className="mllr-controls">
        <label>Slope (m) = {m.toFixed(2)}
          <input type="range" min="0" max="1.2" step="0.02" value={m} onChange={(e) => setM(Number(e.target.value))} className="mllr-slider" />
        </label>
        <label>Intercept (b) = {b.toFixed(0)}
          <input type="range" min="0" max="50" value={b} onChange={(e) => setB(Number(e.target.value))} className="mllr-slider" />
        </label>
      </div>
      <div className={`mllr-mse ${near ? 'mllr-mse--good' : ''}`}>
        MSE = {mse.toFixed(1)} {near ? '✓ near best fit!' : '— keep minimizing'}
      </div>
      <div className="mllr-eq">ŷ = {m.toFixed(2)}·x + {b.toFixed(0)}</div>
      <div className="mllr-note">The red lines are <strong>residuals</strong> (errors). Regression finds m &amp; b that make the sum of squared residuals smallest.</div>
    </div>
  );
};
export default MlLinearRegressionVisualization;

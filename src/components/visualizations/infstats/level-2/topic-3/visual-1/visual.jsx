/* Lesson: t-Tests and z-Tests
 * Visual type: INTERACTIVE
 * Reason: The t vs z distinction (sample size & fatter tails) is best shown by
 * overlaying the two curves and shrinking the sample size to watch t spread out. */
import React, { useState } from 'react';
import './visual.css';

const InfStatsTZVisualization = () => {
  const [n, setN] = useState(8);
  const df = n - 1;
  const W = 320, H = 140, pad = 16, midY = H - 24;
  const xOf = (x) => W / 2 + (x / 4) * (W / 2 - pad);
  // normal
  const norm = (x) => Math.exp(-x * x / 2);
  // crude t-density (fatter tails for small df)
  const tdens = (x) => Math.pow(1 + (x * x) / df, -(df + 1) / 2);
  const tMax = tdens(0) || 1;
  const build = (fn, max) => { const p = []; for (let i = -40; i <= 40; i++) { const x = i / 10; p.push(`${xOf(x)},${(midY - (fn(x) / max) * (H - 44)).toFixed(1)}`); } return p.join(' '); };

  return (
    <div className="istz-wrap">
      <header className="istz-head">
        <span className="istz-badge">Inferential</span>
        <h2>t-Tests &amp; z-Tests</h2>
        <p>Small sample? Use t — its fatter tails are more cautious</p>
      </header>
      <div className="istz-chart-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="istz-svg" preserveAspectRatio="xMidYMid meet">
          <polyline className="istz-norm" points={build(norm, 1)} />
          <polyline className="istz-t" points={build(tdens, tMax)} />
          <line x1={pad} y1={midY} x2={W - pad} y2={midY} className="istz-axis" />
        </svg>
        <div className="istz-legend">
          <span className="istz-leg istz-leg--z">z (normal)</span>
          <span className="istz-leg istz-leg--t">t (df = {df})</span>
        </div>
      </div>
      <div className="istz-control">
        <label>Sample size n = {n}
          <input type="range" min="2" max="40" value={n} onChange={(e) => setN(Number(e.target.value))} className="istz-slider" />
        </label>
      </div>
      <div className="istz-cards">
        <div className="istz-card"><strong>z-test</strong><p>Population σ known, or large n (&gt;30). Standard normal.</p></div>
        <div className="istz-card"><strong>t-test</strong><p>σ unknown &amp; small n. Fatter tails account for extra uncertainty.</p></div>
      </div>
      <div className="istz-note">{n > 30 ? 'With n > 30 the t-curve nearly matches the normal — z is fine.' : 'Small n → the t-curve is noticeably wider (more conservative).'}</div>
    </div>
  );
};
export default InfStatsTZVisualization;

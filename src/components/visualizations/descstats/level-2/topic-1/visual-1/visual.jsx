/* Lesson: Covariance and Correlation
 * Visual type: INTERACTIVE
 * Reason: The correlation coefficient r is an abstract number until you slide it
 * and watch a scatter plot tighten from a cloud (r≈0) to a line (r≈±1). */
import React, { useState } from 'react';
import './visual.css';

function scatter(r, n = 40) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const x = Math.random();
    const noise = Math.random() - 0.5;
    const y = r * (x - 0.5) + (1 - Math.abs(r)) * noise + 0.5;
    pts.push({ x, y: Math.max(0, Math.min(1, y)) });
  }
  return pts;
}

const DescStatsCorrelationVisualization = () => {
  const [r, setR] = useState(0.7);
  const [seed, setSeed] = useState(0);
  const pts = React.useMemo(() => scatter(r, 40), [r, seed]);
  const W = 260, H = 180, pad = 22;
  const X = (x) => pad + x * (W - 2 * pad);
  const Y = (y) => H - pad - y * (H - 2 * pad);
  const strength = Math.abs(r) > 0.8 ? 'Strong' : Math.abs(r) > 0.4 ? 'Moderate' : Math.abs(r) > 0.1 ? 'Weak' : 'None';
  const dir = r > 0.1 ? 'positive' : r < -0.1 ? 'negative' : 'no';
  return (
    <div className="dscc-wrap">
      <header className="dscc-head">
        <span className="dscc-badge">Statistics</span>
        <h2>Covariance &amp; Correlation</h2>
        <p>How tightly do two variables move together?</p>
      </header>
      <div className="dscc-chart-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="dscc-svg" preserveAspectRatio="xMidYMid meet">
          <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} className="dscc-axis" />
          <line x1={pad} y1={pad} x2={pad} y2={H - pad} className="dscc-axis" />
          {Math.abs(r) > 0.1 && (<line x1={X(0)} y1={Y(0.5 + r * -0.5)} x2={X(1)} y2={Y(0.5 + r * 0.5)} className="dscc-trend" />)}
          {pts.map((p, i) => <circle key={i} cx={X(p.x)} cy={Y(p.y)} r="3.5" className="dscc-pt" />)}
          <text x={W / 2} y={H - 4} className="dscc-axis-label">ad spend →</text>
        </svg>
      </div>
      <div className="dscc-control">
        <label>Correlation r = {r.toFixed(2)}
          <input type="range" min="-1" max="1" step="0.05" value={r} onChange={e => setR(Number(e.target.value))} className="dscc-slider" />
        </label>
        <button className="dscc-reroll" onClick={() => setSeed(s => s + 1)}>↻</button>
      </div>
      <div className="dscc-readout" style={{ '--rc': r > 0.1 ? '#56d364' : r < -0.1 ? '#f0883e' : '#a3adbb' }}>
        <strong>{strength}</strong> {dir} correlation
      </div>
      <div className="dscc-note"><strong>r</strong> ranges −1…+1 (direction &amp; strength, unit-free). <strong>Covariance</strong> is the same idea in raw units, so it's hard to compare across datasets. ⚠️ Correlation ≠ causation.</div>
    </div>
  );
};

export default DescStatsCorrelationVisualization;

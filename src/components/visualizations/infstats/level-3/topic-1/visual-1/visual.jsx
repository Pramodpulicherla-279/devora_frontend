/* Lesson: Confidence Intervals
 * Visual type: INTERACTIVE
 * Reason: The trade-off "higher confidence → wider interval" is best felt by
 * sliding the confidence level and watching the interval band stretch. */
import React, { useState } from 'react';
import './visual.css';

const Z = { 80: 1.28, 90: 1.645, 95: 1.96, 99: 2.576 };

const InfStatsCIVisualization = () => {
  const [conf, setConf] = useState(95);
  const [n, setN] = useState(100);
  const mean = 50, sd = 15;
  const se = sd / Math.sqrt(n);
  const z = Z[conf] || 1.96;
  const margin = z * se;
  const lo = mean - margin, hi = mean + margin;
  const W = 320, pad = 24;
  const x = (v) => pad + ((v - 30) / 40) * (W - 2 * pad);

  return (
    <div className="isci-wrap">
      <header className="isci-head">
        <span className="isci-badge">Inferential</span>
        <h2>Confidence Intervals</h2>
        <p>A range that likely contains the true value</p>
      </header>
      <div className="isci-chart-wrap">
        <svg viewBox={`0 0 ${W} 70`} className="isci-svg" preserveAspectRatio="xMidYMid meet">
          <line x1={pad} y1="44" x2={W - pad} y2="44" className="isci-axis" />
          <rect x={x(lo)} y="26" width={Math.max(2, x(hi) - x(lo))} height="16" className="isci-band" rx="3" />
          <line x1={x(mean)} y1="20" x2={x(mean)} y2="48" className="isci-mean" />
          <circle cx={x(mean)} cy="34" r="4" className="isci-pt" />
          <text x={x(lo)} y="60" className="isci-edge">{lo.toFixed(1)}</text>
          <text x={x(hi)} y="60" className="isci-edge">{hi.toFixed(1)}</text>
          <text x={x(mean)} y="16" className="isci-mean-label">x̄ = {mean}</text>
        </svg>
      </div>
      <div className="isci-controls">
        <label>Confidence level: {conf}%
          <input type="range" min="0" max="3" step="1" value={[80, 90, 95, 99].indexOf(conf)} onChange={(e) => setConf([80, 90, 95, 99][Number(e.target.value)])} className="isci-slider" />
        </label>
        <label>Sample size n = {n}
          <input type="range" min="10" max="500" step="10" value={n} onChange={(e) => setN(Number(e.target.value))} className="isci-slider" />
        </label>
      </div>
      <div className="isci-stats">
        <div className="isci-stat"><span>Margin of error</span><strong>± {margin.toFixed(2)}</strong></div>
        <div className="isci-stat"><span>Interval width</span><strong>{(2 * margin).toFixed(2)}</strong></div>
      </div>
      <div className="isci-note">
        “{conf}% confident” means: if we repeated this study many times, ~{conf}% of the intervals would contain the true mean. Higher confidence <strong>or</strong> smaller n → wider interval.
      </div>
    </div>
  );
};
export default InfStatsCIVisualization;

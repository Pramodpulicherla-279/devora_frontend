/* Lesson: Normal Distribution and Z-Scores
 * Visual type: INTERACTIVE
 * Reason: The 68-95-99.7 rule and "how many std devs from the mean" land best
 * when you slide a z-score and watch the shaded tail area + percentile update. */
import React, { useState } from 'react';
import './visual.css';

// standard normal CDF (Abramowitz-Stegun approximation)
function cdf(z) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

const DescStatsNormalZVisualization = () => {
  const [z, setZ] = useState(1);
  const W = 320, H = 150, pad = 18, midY = H - 26;
  const xOf = (zz) => W / 2 + (zz / 4) * (W / 2 - pad);
  const yOf = (zz) => midY - Math.exp(-zz * zz / 2) * (H - 52);
  const curve = [];
  for (let i = -40; i <= 40; i++) curve.push(`${xOf(i / 10)},${yOf(i / 10)}`);
  // shaded area left of z
  const shade = [`${xOf(-4)},${midY}`];
  for (let i = -40; i <= z * 10; i++) shade.push(`${xOf(i / 10)},${yOf(i / 10)}`);
  shade.push(`${xOf(z)},${midY}`);
  const pct = cdf(z) * 100;

  return (
    <div className="dsnz-wrap">
      <header className="dsnz-head">
        <span className="dsnz-badge">Statistics</span>
        <h2>Normal Distribution &amp; Z-Scores</h2>
        <p>A z-score = how many std devs a value sits from the mean</p>
      </header>

      <div className="dsnz-chart-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="dsnz-svg" preserveAspectRatio="xMidYMid meet">
          {/* 68-95-99.7 bands */}
          {[1, 2, 3].map((s) => (
            <rect key={s} x={xOf(-s)} y="14" width={xOf(s) - xOf(-s)} height={midY - 14} className={`dsnz-band dsnz-band--${s}`} />
          ))}
          <polygon className="dsnz-shade" points={shade.join(' ')} />
          <polyline className="dsnz-curve" points={curve.join(' ')} />
          <line x1={W / 2} y1="14" x2={W / 2} y2={midY} className="dsnz-mean" />
          <line x1={xOf(z)} y1="20" x2={xOf(z)} y2={midY} className="dsnz-zline" />
          <line x1={pad} y1={midY} x2={W - pad} y2={midY} className="dsnz-axis" />
          {[-3, -2, -1, 0, 1, 2, 3].map((t) => (
            <text key={t} x={xOf(t)} y={midY + 14} className="dsnz-tick">{t}σ</text>
          ))}
        </svg>
      </div>

      <div className="dsnz-control">
        <label>z-score: {z.toFixed(1)}
          <input type="range" min="-3" max="3" step="0.1" value={z} onChange={(e) => setZ(Number(e.target.value))} className="dsnz-slider" />
        </label>
      </div>

      <div className="dsnz-stats">
        <div className="dsnz-stat"><span>Percentile</span><strong>{pct.toFixed(1)}%</strong><em>area to the left</em></div>
        <div className="dsnz-stat"><span>Beats</span><strong>{pct.toFixed(0)}%</strong><em>of the population</em></div>
      </div>
      <div className="dsnz-rule">
        <span className="dsnz-rule-chip dsnz-rule-chip--1">±1σ ≈ 68%</span>
        <span className="dsnz-rule-chip dsnz-rule-chip--2">±2σ ≈ 95%</span>
        <span className="dsnz-rule-chip dsnz-rule-chip--3">±3σ ≈ 99.7%</span>
      </div>
    </div>
  );
};

export default DescStatsNormalZVisualization;

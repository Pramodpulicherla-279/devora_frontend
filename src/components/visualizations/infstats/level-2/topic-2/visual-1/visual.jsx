/* Lesson: p-Values and Significance
 * Visual type: INTERACTIVE
 * Reason: A p-value is the shaded tail area beyond your statistic. Sliding the
 * statistic and the α threshold and watching reject/fail-to-reject flip makes
 * the abstract "p < 0.05" rule tangible. */
import React, { useState } from 'react';
import './visual.css';

function tailP(z) { // two-tailed approx p-value from |z|
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return 2 * p;
}

const InfStatsPValueVisualization = () => {
  const [z, setZ] = useState(2.2);
  const [alpha, setAlpha] = useState(0.05);
  const p = Math.min(1, tailP(z));
  const reject = p < alpha;
  const W = 320, H = 140, pad = 16, midY = H - 26;
  const xOf = (zz) => W / 2 + (zz / 4) * (W / 2 - pad);
  const yOf = (zz) => midY - Math.exp(-zz * zz / 2) * (H - 52);
  const curve = []; for (let i = -40; i <= 40; i++) curve.push(`${xOf(i / 10)},${yOf(i / 10)}`);
  const tail = (sign) => { const pts = [`${xOf(sign * z)},${midY}`]; for (let i = sign * z * 10; Math.abs(i) <= 40; i += sign) pts.push(`${xOf(i / 10)},${yOf(i / 10)}`); pts.push(`${xOf(sign * 4)},${midY}`); return pts.join(' '); };

  return (
    <div className="ispval-wrap">
      <header className="ispval-head">
        <span className="ispval-badge">Inferential</span>
        <h2>p-Values &amp; Significance</h2>
        <p>How surprising is your result, if H₀ were true?</p>
      </header>
      <div className="ispval-chart-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="ispval-svg" preserveAspectRatio="xMidYMid meet">
          <polygon className="ispval-tail" points={tail(1)} />
          <polygon className="ispval-tail" points={tail(-1)} />
          <polyline className="ispval-curve" points={curve.join(' ')} />
          <line x1={xOf(z)} y1="18" x2={xOf(z)} y2={midY} className="ispval-stat" />
          <line x1={xOf(-z)} y1="18" x2={xOf(-z)} y2={midY} className="ispval-stat" />
          <line x1={pad} y1={midY} x2={W - pad} y2={midY} className="ispval-axis" />
          <text x={xOf(z)} y="14" className="ispval-stat-label">your stat</text>
        </svg>
      </div>
      <div className="ispval-controls">
        <label>Test statistic |z| = {z.toFixed(1)}
          <input type="range" min="0.2" max="3.5" step="0.1" value={z} onChange={(e) => setZ(Number(e.target.value))} className="ispval-slider" />
        </label>
        <label>Significance α = {alpha}
          <input type="range" min="0.01" max="0.2" step="0.01" value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} className="ispval-slider ispval-slider--a" />
        </label>
      </div>
      <div className={`ispval-verdict ${reject ? 'ispval-verdict--rej' : 'ispval-verdict--fail'}`}>
        p ≈ {p.toFixed(3)} {reject ? '<' : '≥'} α = {alpha} → {reject ? 'REJECT H₀ (significant)' : 'fail to reject H₀'}
      </div>
      <div className="ispval-note">A small p-value means: "if H₀ were true, data this extreme would be rare." It is <strong>not</strong> the probability that H₀ is true.</div>
    </div>
  );
};
export default InfStatsPValueVisualization;

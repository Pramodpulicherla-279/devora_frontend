/* Lesson: Skewness and Kurtosis
 * Visual type: INTERACTIVE
 * Reason: Skew (lean) and kurtosis (tailedness/peak) are shape concepts — a
 * slider that morphs the curve from left-skew to right-skew and flat to peaked
 * makes the vocabulary stick far better than two static pictures. */
import React, { useState } from 'react';
import './visual.css';

const DescStatsSkewKurtosisVisualization = () => {
  const [skew, setSkew] = useState(0);     // -1 .. 1
  const [kurt, setKurt] = useState(0);     // -1 (flat) .. 1 (peaked)
  const W = 320, H = 140, pad = 16, midY = H - 24;

  // build an asymmetric bell using a skew-normal-ish shape
  const s = 1 + kurt * 0.9;        // peak sharpness
  const a = skew * 4;              // skew strength
  const pts = [];
  for (let i = 0; i <= 100; i++) {
    const xN = (i / 100) * 6 - 3;             // -3..3
    const base = Math.exp(-(xN * xN) / (2 / (s)));
    const skewFactor = 1 + 0.5 * a * xN / Math.sqrt(1 + xN * xN);
    const y = Math.max(0, base * skewFactor);
    pts.push({ x: pad + (i / 100) * (W - 2 * pad), y, raw: y });
  }
  const maxY = Math.max(...pts.map((p) => p.raw), 0.01);
  const poly = pts.map((p) => `${p.x.toFixed(1)},${(midY - (p.raw / maxY) * (H - 46)).toFixed(1)}`).join(' ');

  const skewLabel = skew < -0.15 ? 'Left-skewed (negative)' : skew > 0.15 ? 'Right-skewed (positive)' : 'Symmetric';
  const kurtLabel = kurt < -0.15 ? 'Platykurtic (flat)' : kurt > 0.15 ? 'Leptokurtic (peaked)' : 'Mesokurtic (normal)';

  return (
    <div className="dssk-wrap">
      <header className="dssk-head">
        <span className="dssk-badge">Statistics</span>
        <h2>Skewness &amp; Kurtosis</h2>
        <p>The lean and the peak of a distribution</p>
      </header>

      <div className="dssk-chart-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="dssk-svg" preserveAspectRatio="xMidYMid meet">
          <polyline className="dssk-curve" points={poly} />
          <line x1={pad} y1={midY} x2={W - pad} y2={midY} className="dssk-axis" />
        </svg>
      </div>

      <div className="dssk-controls">
        <label>Skewness: <strong className="dssk-tag">{skewLabel}</strong>
          <input type="range" min="-1" max="1" step="0.05" value={skew} onChange={(e) => setSkew(Number(e.target.value))} className="dssk-slider" />
        </label>
        <label>Kurtosis: <strong className="dssk-tag">{kurtLabel}</strong>
          <input type="range" min="-1" max="1" step="0.05" value={kurt} onChange={(e) => setKurt(Number(e.target.value))} className="dssk-slider" />
        </label>
      </div>

      <div className="dssk-cards">
        <div className="dssk-card"><strong>Skewness</strong><p>Direction &amp; amount of asymmetry. Right-skew → long right tail (mean &gt; median).</p></div>
        <div className="dssk-card"><strong>Kurtosis</strong><p>Tailedness. High kurtosis → sharp peak &amp; fat tails (more outliers).</p></div>
      </div>
    </div>
  );
};

export default DescStatsSkewKurtosisVisualization;

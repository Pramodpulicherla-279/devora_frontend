/* Lesson: Skewness & kurtosis
 * Visual type: INTERACTIVE
 * Reason: Shape is invisible in summary numbers — two datasets share a mean and SD
 * yet differ wildly. Morphing a curve from left-skew to right-skew and watching the
 * mean/median swap places shows exactly what skew does to "typical". */
import React, { useState } from 'react';
import './visual.css';

const DescStatsSkewKurtosisVisualization = () => {
  const [skew, setSkew] = useState(0.6);
  const W = 300, H = 150, pad = 20;
  const pts = [];
  for (let i = 0; i <= 60; i++) {
    const x = i / 60;
    const c = 0.5 - skew * 0.26;
    const w = 0.13;
    const y = Math.exp(-((x - c) ** 2) / (2 * w * w));
    pts.push([pad + x * (W - 2 * pad), H - pad - y * (H - 2 * pad)]);
  }
  const path = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const meanX = pad + (0.5 + skew * 0.17) * (W - 2 * pad);
  const medX = pad + (0.5 + skew * 0.02) * (W - 2 * pad);
  const dir = skew > 0.1 ? 'Right-skewed (positive)' : skew < -0.1 ? 'Left-skewed (negative)' : 'Symmetric';
  return (
    <div className="dssk-wrap">
      <header className="dssk-head">
        <span className="dssk-badge">Statistics</span>
        <h2>Skewness &amp; Kurtosis</h2>
        <p>The shape behind the numbers</p>
      </header>
      <div className="dssk-chart">
        <svg viewBox={`0 0 ${W} ${H}`} className="dssk-svg" preserveAspectRatio="xMidYMid meet">
          <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} className="dssk-axis" />
          <path d={`${path} L ${W - pad} ${H - pad} L ${pad} ${H - pad} Z`} className="dssk-area" />
          <path d={path} className="dssk-curve" />
          <line x1={meanX} y1={pad} x2={meanX} y2={H - pad} className="dssk-mean" />
          <line x1={medX} y1={pad} x2={medX} y2={H - pad} className="dssk-med" />
        </svg>
      </div>
      <div className="dssk-legend"><span className="dssk-k dssk-k--mean">▮ mean</span><span className="dssk-k dssk-k--med">▮ median</span></div>
      <div className="dssk-control">
        <label>Skew = {skew.toFixed(2)}
          <input type="range" min="-1" max="1" step="0.05" value={skew} onChange={e => setSkew(Number(e.target.value))} className="dssk-slider" />
        </label>
      </div>
      <div className="dssk-readout"><strong>{dir}</strong></div>
      <div className="dssk-note">Right-skew (income, order values) pulls the <strong>mean above the median</strong> — report the median. <strong>Kurtosis</strong> measures tail heaviness: high kurtosis = more extreme outliers than a normal curve.</div>
    </div>
  );
};

export default DescStatsSkewKurtosisVisualization;

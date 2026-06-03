/* Lesson: Spread and Variance
 * Visual type: INTERACTIVE
 * Reason: Variance/std-dev are abstract until you can widen or tighten a
 * dataset's spread and watch the numbers (and the spread band) respond live. */
import React, { useState } from 'react';
import './visual.css';

const BASE = [-2, -1, -1, 0, 0, 0, 1, 1, 2];

const DescStatsSpreadVarianceVisualization = () => {
  const [spread, setSpread] = useState(12);
  const center = 50;
  const data = BASE.map((z) => center + z * spread);
  const mean = data.reduce((s, x) => s + x, 0) / data.length;
  const variance = data.reduce((s, x) => s + (x - mean) ** 2, 0) / data.length;
  const std = Math.sqrt(variance);
  const range = Math.max(...data) - Math.min(...data);

  const W = 320, pad = 16;
  const x = (v) => pad + (v / 100) * (W - 2 * pad);

  return (
    <div className="dssv-wrap">
      <header className="dssv-head">
        <span className="dssv-badge">Statistics</span>
        <h2>Spread &amp; Variance</h2>
        <p>How far do values sit from the mean?</p>
      </header>

      <div className="dssv-plot-wrap">
        <svg viewBox={`0 0 ${W} 90`} className="dssv-svg" preserveAspectRatio="xMidYMid meet">
          {/* ±1 std band */}
          <rect x={x(mean - std)} y="30" width={Math.max(0, x(mean + std) - x(mean - std))} height="34" className="dssv-band" />
          <line x1={pad} y1="64" x2={W - pad} y2="64" className="dssv-axis" />
          {data.map((v, i) => (
            <circle key={i} cx={x(Math.max(0, Math.min(100, v)))} cy="47" r="5" className="dssv-dot" />
          ))}
          <line x1={x(mean)} y1="22" x2={x(mean)} y2="64" className="dssv-mean" />
          <text x={x(mean)} y="16" className="dssv-mean-label">mean</text>
          <text x={x(mean)} y="80" className="dssv-band-label">±1 std dev</text>
        </svg>
      </div>

      <div className="dssv-control">
        <label>Spread {spread <= 8 ? '(tight)' : spread >= 18 ? '(wide)' : '(medium)'}
          <input type="range" min="3" max="24" value={spread} onChange={(e) => setSpread(Number(e.target.value))} className="dssv-slider" />
        </label>
      </div>

      <div className="dssv-stats">
        <div className="dssv-stat"><span>Range</span><strong>{range.toFixed(0)}</strong><em>max − min</em></div>
        <div className="dssv-stat"><span>Variance</span><strong>{variance.toFixed(0)}</strong><em>avg squared distance</em></div>
        <div className="dssv-stat dssv-stat--std"><span>Std Dev</span><strong>{std.toFixed(1)}</strong><em>√variance (same units)</em></div>
      </div>

      <pre className="dssv-code"><code>{`variance = Σ(xᵢ − mean)² / n   = ${variance.toFixed(0)}
std_dev  = √variance           = ${std.toFixed(1)}`}</code></pre>
      <div className="dssv-note">Std dev is in the <strong>same units</strong> as your data, which is why it's the most-used measure of spread.</div>
    </div>
  );
};

export default DescStatsSpreadVarianceVisualization;

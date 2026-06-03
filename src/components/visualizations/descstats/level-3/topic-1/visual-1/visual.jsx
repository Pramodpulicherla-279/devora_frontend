/* Lesson: Outlier Detection
 * Visual type: INTERACTIVE
 * Reason: The IQR rule (1.5×IQR fences) is procedural — a live box plot that
 * flags points as you drag a candidate value across the fence is the clearest
 * way to show "inside vs outside the whiskers". */
import React, { useState } from 'react';
import './visual.css';

const DATA = [22, 28, 30, 33, 35, 38, 40, 42, 45, 48, 52, 58];

function quantile(sorted, q) {
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos), rest = pos - base;
  return sorted[base + 1] !== undefined ? sorted[base] + rest * (sorted[base + 1] - sorted[base]) : sorted[base];
}

const DescStatsOutliersVisualization = () => {
  const [candidate, setCandidate] = useState(85);
  const all = [...DATA, candidate].sort((a, b) => a - b);
  const q1 = quantile(all, 0.25), q3 = quantile(all, 0.75), iqr = q3 - q1;
  const lo = q1 - 1.5 * iqr, hi = q3 + 1.5 * iqr;
  const isOutlier = candidate < lo || candidate > hi;
  const W = 320, pad = 18;
  const minV = 0, maxV = 100;
  const x = (v) => pad + ((v - minV) / (maxV - minV)) * (W - 2 * pad);

  return (
    <div className="dsod-wrap">
      <header className="dsod-head">
        <span className="dsod-badge">Statistics</span>
        <h2>Outlier Detection</h2>
        <p>The 1.5 × IQR rule, drawn as a box plot</p>
      </header>

      <div className="dsod-plot-wrap">
        <svg viewBox={`0 0 ${W} 96`} className="dsod-svg" preserveAspectRatio="xMidYMid meet">
          {/* fences */}
          <rect x={x(lo)} y="20" width={x(hi) - x(lo)} height="40" className="dsod-fence" />
          {/* whiskers */}
          <line x1={x(lo)} y1="40" x2={x(q1)} y2="40" className="dsod-whisker" />
          <line x1={x(q3)} y1="40" x2={x(hi)} y2="40" className="dsod-whisker" />
          {/* box */}
          <rect x={x(q1)} y="28" width={x(q3) - x(q1)} height="24" className="dsod-box" />
          <line x1={x(quantile(all, 0.5))} y1="28" x2={x(quantile(all, 0.5))} y2="52" className="dsod-median" />
          {/* points */}
          {DATA.map((v, i) => <circle key={i} cx={x(v)} cy="40" r="3.5" className="dsod-pt" />)}
          <circle cx={x(candidate)} cy="40" r="6" className={`dsod-cand ${isOutlier ? 'dsod-cand--out' : 'dsod-cand--in'}`} />
          <line x1={pad} y1="74" x2={W - pad} y2="74" className="dsod-axis" />
          {[0, 25, 50, 75, 100].map((t) => <text key={t} x={x(t)} y="88" className="dsod-tick">{t}</text>)}
        </svg>
      </div>

      <div className="dsod-control">
        <label>Test value: {candidate}
          <input type="range" min="0" max="100" value={candidate} onChange={(e) => setCandidate(Number(e.target.value))} className="dsod-slider" />
        </label>
      </div>

      <div className={`dsod-verdict ${isOutlier ? 'dsod-verdict--out' : 'dsod-verdict--in'}`}>
        {isOutlier ? `✗ ${candidate} is an OUTLIER (outside ${lo.toFixed(0)}–${hi.toFixed(0)})` : `✓ ${candidate} is normal (within the fences)`}
      </div>
      <div className="dsod-stats">
        <span>Q1 = {q1.toFixed(0)}</span><span>Q3 = {q3.toFixed(0)}</span><span>IQR = {iqr.toFixed(0)}</span>
        <span>Fences = [{lo.toFixed(0)}, {hi.toFixed(0)}]</span>
      </div>
    </div>
  );
};

export default DescStatsOutliersVisualization;

/* Lesson: Outlier Detection — IQR Method and Z-Scores
 * Visual type: INTERACTIVE
 * Reason: Outliers are defined by a rule, not a feeling — toggling between the IQR
 * fence method and the z-score (±2σ) method and dragging a point past the boundary
 * shows exactly when a value gets flagged, and how the two rules disagree. */
import React, { useState } from 'react';
import './visual.css';

const BASE = [900, 1000, 1050, 1100, 1150, 1200, 1300, 1500, 1800, 2200];
function quart(arr, p) { const s = [...arr].sort((a, b) => a - b); const i = p * (s.length - 1); const lo = Math.floor(i); return s[lo] + (s[Math.ceil(i)] - s[lo]) * (i - lo); }

const DescStatsOutliersVisualization = () => {
  const [method, setMethod] = useState('iqr');
  const [extreme, setExtreme] = useState(3000);
  const data = [...BASE, extreme];
  const q1 = quart(data, .25), q3 = quart(data, .75), iqr = q3 - q1;
  const hiF = q3 + 1.5 * iqr, loF = q1 - 1.5 * iqr;
  const mean = data.reduce((s, v) => s + v, 0) / data.length;
  const sd = Math.sqrt(data.reduce((s, v) => s + (v - mean) ** 2, 0) / data.length);
  const isOut = (v) => method === 'iqr' ? (v < loF || v > hiF) : Math.abs((v - mean) / sd) > 2;
  const lo = 700, hi = 12000; const X = (v) => Math.min(100, Math.max(0, ((v - lo) / (hi - lo)) * 100));
  const flagged = data.filter(isOut).length;
  return (
    <div className="dsod-wrap">
      <header className="dsod-head">
        <span className="dsod-badge">Statistics</span>
        <h2>Outlier Detection</h2>
        <p>IQR fences vs Z-scores</p>
      </header>
      <div className="dsod-toggle">
        <button className={method === 'iqr' ? 'dsod-t dsod-t--on' : 'dsod-t'} onClick={() => setMethod('iqr')}>IQR (1.5×)</button>
        <button className={method === 'z' ? 'dsod-t dsod-t--on' : 'dsod-t'} onClick={() => setMethod('z')}>Z-score (&gt;2σ)</button>
      </div>
      <div className="dsod-track">
        {method === 'iqr' && <span className="dsod-fence" style={{ left: `${X(hiF)}%` }} />}
        {method === 'z' && <span className="dsod-fence" style={{ left: `${X(mean + 2 * sd)}%` }} />}
        {data.map((v, i) => (<span key={i} className={`dsod-dot ${isOut(v) ? 'dsod-dot--out' : ''}`} style={{ left: `${X(v)}%` }} />))}
      </div>
      <div className="dsod-control">
        <label>Suspicious order = ₹{extreme.toLocaleString('en-IN')}
          <input type="range" min="2000" max="12000" step="100" value={extreme} onChange={e => setExtreme(Number(e.target.value))} className="dsod-slider" />
        </label>
      </div>
      <div className="dsod-readout">{flagged} point{flagged !== 1 ? 's' : ''} flagged · {method === 'iqr' ? `upper fence ₹${Math.round(hiF).toLocaleString('en-IN')}` : `mean+2σ ₹${Math.round(mean + 2 * sd).toLocaleString('en-IN')}`}</div>
      <div className="dsod-note"><strong>IQR</strong> is robust — the fence barely moves when the outlier grows. <strong>Z-score</strong> uses mean &amp; SD, which the outlier itself inflates, so extreme points can mask themselves. Prefer IQR for skewed data.</div>
    </div>
  );
};

export default DescStatsOutliersVisualization;

/* Lesson: Mean, median, mode
 * Visual type: INTERACTIVE
 * Reason: The lesson's core point is that mean, median and mode answer "typical"
 * differently — dragging one order value larger lets you watch the mean chase the
 * outlier while the median holds steady, which no static figure conveys. */
import React, { useState } from 'react';
import './visual.css';

const BASE = [900, 950, 1000, 1050, 1075, 1100, 1200];

function median(a) { const s = [...a].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; }
function mode(a) { const c = {}; let best = a[0], bc = 0; a.forEach(v => { c[v] = (c[v] || 0) + 1; if (c[v] > bc) { bc = c[v]; best = v; } }); return bc > 1 ? best : null; }

const DescStatsCentralTendencyVisualization = () => {
  const [big, setBig] = useState(1300);
  const data = [...BASE, big];
  const mean = data.reduce((s, v) => s + v, 0) / data.length;
  const med = median(data);
  const mo = mode(data);
  const lo = 800, hi = 20000;
  const X = (v) => Math.min(100, Math.max(0, ((v - lo) / (hi - lo)) * 100));
  return (
    <div className="dsct-wrap">
      <header className="dsct-head">
        <span className="dsct-badge">Statistics</span>
        <h2>Mean, Median &amp; Mode</h2>
        <p>Three valid answers to "what's typical?"</p>
      </header>
      <div className="dsct-track">
        {data.map((v, i) => (<span key={i} className="dsct-dot" style={{ left: `${X(v)}%` }} />))}
        <span className="dsct-mark dsct-mark--mean" style={{ left: `${X(mean)}%` }}><span>x̄</span></span>
        <span className="dsct-mark dsct-mark--med" style={{ left: `${X(med)}%` }}><span>M</span></span>
      </div>
      <div className="dsct-control">
        <label>Largest order = ₹{big.toLocaleString('en-IN')}
          <input type="range" min="1300" max="20000" step="100" value={big} onChange={e => setBig(Number(e.target.value))} className="dsct-slider" />
        </label>
      </div>
      <div className="dsct-stats">
        <div className="dsct-stat dsct-stat--mean"><span>Mean</span><strong>₹{Math.round(mean).toLocaleString('en-IN')}</strong></div>
        <div className="dsct-stat dsct-stat--med"><span>Median</span><strong>₹{med.toLocaleString('en-IN')}</strong></div>
        <div className="dsct-stat dsct-stat--mode"><span>Mode</span><strong>{mo ? `₹${mo.toLocaleString('en-IN')}` : '—'}</strong></div>
      </div>
      <div className="dsct-note">Drag the largest order up. The <strong>mean</strong> chases the outlier; the <strong>median</strong> barely moves. For skewed money data, the median is usually the honest "typical".</div>
    </div>
  );
};

export default DescStatsCentralTendencyVisualization;

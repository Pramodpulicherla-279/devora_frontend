/* Lesson: Spread: std, IQR, CV
 * Visual type: INTERACTIVE
 * Reason: Two teams can share an identical mean yet need totally different
 * management — only by widening one team's spread and watching range, std and CV
 * climb (while the mean stays put) does "spread" become tangible. */
import React, { useState } from 'react';
import './visual.css';

function stats(arr) {
  const n = arr.length, mean = arr.reduce((s, v) => s + v, 0) / n;
  const sd = Math.sqrt(arr.reduce((s, v) => s + (v - mean) ** 2, 0) / n);
  const s = [...arr].sort((a, b) => a - b);
  const q = (p) => { const i = p * (n - 1); const lo = Math.floor(i); return s[lo] + (s[Math.ceil(i)] - s[lo]) * (i - lo); };
  return { mean, sd, range: s[n - 1] - s[0], iqr: q(0.75) - q(0.25), cv: (sd / mean) * 100 };
}

const DescStatsSpreadVisualization = () => {
  const [spread, setSpread] = useState(20);
  const mean = 50000;
  const teamA = [48, 49, 50, 51, 52].map(v => v * 1000);
  const f = spread / 100;
  const teamB = [1 - 2 * f, 1 - f, 1, 1 + f, 1 + 2 * f].map(v => Math.round(mean * v));
  const A = stats(teamA), B = stats(teamB);
  const lo = 0, hi = 120000; const X = (v) => Math.min(100, Math.max(0, ((v - lo) / (hi - lo)) * 100));
  return (
    <div className="dssprd-wrap">
      <header className="dssprd-head">
        <span className="dssprd-badge">Statistics</span>
        <h2>Measures of Spread</h2>
        <p>Same mean, very different stories</p>
      </header>
      {[['Team A', teamA, A, '#56d364'], ['Team B', teamB, B, '#f0883e']].map(([name, arr, st, c]) => (
        <div key={name} className="dssprd-row">
          <div className="dssprd-row-head"><span style={{ color: c }}>{name}</span><em>mean ₹{Math.round(st.mean / 1000)}k</em></div>
          <div className="dssprd-track">
            <span className="dssprd-mean" style={{ left: `${X(st.mean)}%` }} />
            {arr.map((v, i) => (<span key={i} className="dssprd-dot" style={{ left: `${X(v)}%`, background: c }} />))}
          </div>
        </div>
      ))}
      <div className="dssprd-control">
        <label>Team B spread = {spread}%
          <input type="range" min="2" max="48" value={spread} onChange={e => setSpread(Number(e.target.value))} className="dssprd-slider" />
        </label>
      </div>
      <div className="dssprd-stats">
        <div className="dssprd-stat"><span>Range</span><strong>₹{Math.round(B.range / 1000)}k</strong></div>
        <div className="dssprd-stat"><span>Std dev</span><strong>₹{Math.round(B.sd / 1000)}k</strong></div>
        <div className="dssprd-stat"><span>IQR</span><strong>₹{Math.round(B.iqr / 1000)}k</strong></div>
        <div className="dssprd-stat"><span>CV</span><strong>{B.cv.toFixed(0)}%</strong></div>
      </div>
      <div className="dssprd-note">Both teams average ₹50k. <strong>Std dev</strong> &amp; <strong>range</strong> grow with spread; <strong>CV</strong> (std ÷ mean) lets you compare variability across different scales. Low spread = predictable, high = risky.</div>
    </div>
  );
};

export default DescStatsSpreadVisualization;

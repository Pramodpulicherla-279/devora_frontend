/* Lesson: Percentiles & quartiles
 * Visual type: INTERACTIVE
 * Reason: Percentiles are positional — sliding a marker across a box plot and
 * reading off "this order beats 80% of orders" makes the five-number summary and
 * quartile boundaries concrete in a way a formula cannot. */
import React, { useState } from 'react';
import './visual.css';

const DATA = [800, 950, 1000, 1050, 1100, 1200, 1300, 1500, 1800, 2400, 3200, 8000];
function pct(arr, p) { const s = [...arr].sort((a, b) => a - b); const i = p * (s.length - 1); const lo = Math.floor(i); return s[lo] + (s[Math.ceil(i)] - s[lo]) * (i - lo); }
function rankOf(arr, v) { const below = arr.filter(x => x < v).length; return Math.round((below / arr.length) * 100); }

const DescStatsPercentilesVisualization = () => {
  const [val, setVal] = useState(1500);
  const s = [...DATA].sort((a, b) => a - b);
  const min = s[0], max = s[s.length - 1], q1 = pct(DATA, .25), med = pct(DATA, .5), q3 = pct(DATA, .75);
  const lo = 600, hi = 8500; const X = (v) => Math.min(100, Math.max(0, ((v - lo) / (hi - lo)) * 100));
  const rank = rankOf(DATA, val);
  return (
    <div className="dspct-wrap">
      <header className="dspct-head">
        <span className="dspct-badge">Statistics</span>
        <h2>Percentiles &amp; Quartiles</h2>
        <p>Where does a value rank?</p>
      </header>
      <div className="dspct-box">
        <div className="dspct-whisker" style={{ left: `${X(min)}%`, width: `${X(q1) - X(min)}%` }} />
        <div className="dspct-iqr" style={{ left: `${X(q1)}%`, width: `${X(q3) - X(q1)}%` }} />
        <div className="dspct-whisker" style={{ left: `${X(q3)}%`, width: `${X(max) - X(q3)}%` }} />
        <div className="dspct-median" style={{ left: `${X(med)}%` }} />
        <div className="dspct-marker" style={{ left: `${X(val)}%` }}><span>{rank}th</span></div>
      </div>
      <div className="dspct-control">
        <label>Order value = ₹{val.toLocaleString('en-IN')} → <strong>{rank}th percentile</strong>
          <input type="range" min="600" max="8500" step="50" value={val} onChange={e => setVal(Number(e.target.value))} className="dspct-slider" />
        </label>
      </div>
      <div className="dspct-five">
        <div className="dspct-f"><span>Min</span><strong>₹{min}</strong></div>
        <div className="dspct-f"><span>Q1</span><strong>₹{Math.round(q1)}</strong></div>
        <div className="dspct-f"><span>Median</span><strong>₹{Math.round(med)}</strong></div>
        <div className="dspct-f"><span>Q3</span><strong>₹{Math.round(q3)}</strong></div>
        <div className="dspct-f"><span>Max</span><strong>₹{max}</strong></div>
      </div>
      <div className="dspct-note">The <strong>IQR</strong> (Q1→Q3) holds the middle 50% of orders. A value at the 80th percentile beats 80% of the data — robust to the ₹8,000 outlier that would wreck the mean.</div>
    </div>
  );
};

export default DescStatsPercentilesVisualization;

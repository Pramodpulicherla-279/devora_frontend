/* Lesson: Working with Dates and Times
 * Visual type: ILLUSTRATION
 * Reason: Datetime parsing turns a string into a rich object you can extract
 * parts from — a string → parsed → .dt accessors map communicates it best. */
import React, { useState } from 'react';
import './visual.css';

const ACCESSORS = [
  { call: '.dt.year', out: '2024' },
  { call: '.dt.month', out: '3' },
  { call: '.dt.day_name()', out: 'Friday' },
  { call: '.dt.quarter', out: '1' },
  { call: '.dt.is_month_end', out: 'False' },
];

const PdDatesVisualization = () => {
  const [acc, setAcc] = useState(0);
  return (
    <div className="pddates-wrap">
      <header className="pddates-head">
        <span className="pddates-badge">Pandas</span>
        <h2>Dates &amp; Times</h2>
        <p>Parse strings into datetimes, then extract anything</p>
      </header>
      <div className="pddates-flow">
        <div className="pddates-box pddates-box--str"><span className="pddates-l">string</span><code>"2024-03-15"</code></div>
        <div className="pddates-arrow">→ to_datetime →</div>
        <div className="pddates-box pddates-box--dt"><span className="pddates-l">datetime64</span><code>2024-03-15 00:00:00</code></div>
      </div>
      <pre className="pddates-code"><code>{`df['date'] = pd.to_datetime(df['date'])
df['date']${ACCESSORS[acc].call}   # → ${ACCESSORS[acc].out}`}</code></pre>
      <div className="pddates-accessors">
        {ACCESSORS.map((a, i) => (
          <button key={i} className={`pddates-acc ${acc === i ? 'pddates-acc--on' : ''}`} onClick={() => setAcc(i)}>
            <code>{a.call}</code><span className="pddates-out">{a.out}</span>
          </button>
        ))}
      </div>
      <div className="pddates-note">Always <code>pd.to_datetime()</code> first — then the <code>.dt</code> accessor unlocks year, month, weekday, and time-based resampling/grouping.</div>
    </div>
  );
};
export default PdDatesVisualization;

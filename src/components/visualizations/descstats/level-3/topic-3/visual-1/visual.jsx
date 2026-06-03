/* Lesson: Summary Statistics in Python
 * Visual type: ILLUSTRATION (code → output mapping)
 * Reason: This lesson is about reading what df.describe() / pandas methods
 * return. The best aid is a clear annotated map from each method call to the
 * row it produces — interactivity adds little, clarity is everything. */
import React, { useState } from 'react';
import './visual.css';

const ROWS = [
  { stat: 'count', val: '6', method: 'df.count()', desc: 'non-null values' },
  { stat: 'mean', val: '42.5', method: 'df.mean()', desc: 'average' },
  { stat: 'std', val: '13.2', method: 'df.std()', desc: 'standard deviation' },
  { stat: 'min', val: '22', method: 'df.min()', desc: 'smallest' },
  { stat: '25%', val: '33.0', method: 'df.quantile(.25)', desc: 'Q1' },
  { stat: '50%', val: '41.0', method: 'df.median()', desc: 'median / Q2' },
  { stat: '75%', val: '48.0', method: 'df.quantile(.75)', desc: 'Q3' },
  { stat: 'max', val: '58', method: 'df.max()', desc: 'largest' },
];

const DescStatsSummaryPyVisualization = () => {
  const [active, setActive] = useState(null);
  return (
    <div className="dssp-wrap">
      <header className="dssp-head">
        <span className="dssp-badge">Pandas</span>
        <h2>Summary Statistics in Python</h2>
        <p>One call, the whole picture — <code>df.describe()</code></p>
      </header>

      <pre className="dssp-code"><code>{`import pandas as pd
df = pd.DataFrame({"score": [22, 35, 41, 45, 52, 58]})
df.describe()`}</code></pre>

      <div className="dssp-grid">
        <div className="dssp-output">
          <div className="dssp-out-head">describe() output</div>
          {ROWS.map((r) => (
            <button key={r.stat} className={`dssp-row ${active === r.stat ? 'dssp-row--on' : ''}`} onClick={() => setActive(active === r.stat ? null : r.stat)}>
              <span className="dssp-stat">{r.stat}</span>
              <span className="dssp-val">{r.val}</span>
            </button>
          ))}
        </div>
        <div className="dssp-detail">
          {active ? (() => { const r = ROWS.find((x) => x.stat === active); return (
            <>
              <div className="dssp-detail-stat">{r.stat}</div>
              <p className="dssp-detail-desc">{r.desc}</p>
              <pre className="dssp-code dssp-code--sm"><code>{r.method}</code></pre>
            </>
          ); })() : <p className="dssp-hint">Click any row to see the equivalent method &amp; meaning.</p>}
          <div className="dssp-tip">💡 <code>describe()</code> works per-column and skips NaN automatically.</div>
        </div>
      </div>
    </div>
  );
};

export default DescStatsSummaryPyVisualization;

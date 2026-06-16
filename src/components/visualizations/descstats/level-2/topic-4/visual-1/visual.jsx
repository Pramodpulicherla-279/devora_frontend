/* Lesson: Descriptive Stats in Python — scipy.stats and pandas .describe()
 * Visual type: ILLUSTRATION
 * Reason: The lesson is about workflow — mapping pandas' .describe() output to what
 * each row means. An annotated, clickable describe() table connects the code output
 * back to every concept learned across the course. */
import React, { useState } from 'react';
import './visual.css';

const ROWS = [
  { k: 'count', v: '500', d: 'Non-null values — your sample size after cleaning.' },
  { k: 'mean', v: '1,937', d: 'Arithmetic average. Pulled up by the big orders.' },
  { k: 'std', v: '2,140', d: 'Standard deviation — typical distance from the mean.' },
  { k: 'min', v: '299', d: 'Smallest order value in the column.' },
  { k: '25%', v: '1,050', d: 'Q1 — a quarter of orders fall below this.' },
  { k: '50%', v: '1,300', d: 'Median — the robust "typical" order value.' },
  { k: '75%', v: '1,900', d: 'Q3 — three-quarters of orders fall below this.' },
  { k: 'max', v: '24,000', d: 'Largest order — the source of the right skew.' },
];

const DescStatsPythonVisualization = () => {
  const [sel, setSel] = useState('50%');
  const row = ROWS.find(r => r.k === sel);
  return (
    <div className="dspy-wrap">
      <header className="dspy-head">
        <span className="dspy-badge">Statistics</span>
        <h2>Descriptive Stats in Python</h2>
        <p>One line, every summary number</p>
      </header>
      <pre className="dspy-code"><code>{`df['order_value'].describe()
# shape too:
from scipy.stats import skew, kurtosis`}</code></pre>
      <div className="dspy-out">
        {ROWS.map(r => (
          <button key={r.k} className={`dspy-row ${sel === r.k ? 'dspy-row--on' : ''}`} onClick={() => setSel(r.k)}>
            <span className="dspy-k">{r.k}</span><span className="dspy-v">{r.v}</span>
          </button>
        ))}
      </div>
      <div className="dspy-detail"><strong>{row.k}</strong><p>{row.d}</p></div>
      <div className="dspy-note">Tap any row. <strong>.describe()</strong> returns count, mean, std and the five-number summary in one call; <strong>scipy.stats</strong> adds skew &amp; kurtosis for distribution shape.</div>
    </div>
  );
};

export default DescStatsPythonVisualization;

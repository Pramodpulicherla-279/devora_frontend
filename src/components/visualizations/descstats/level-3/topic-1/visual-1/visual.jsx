/* Lesson: Choosing the Right Summary Statistic
 * Visual type: INTERACTIVE
 * Reason: Three analysts reported three different "average order values" — all
 * correct. A scenario picker that maps the data's shape to the right centre and
 * spread measure turns that ambiguity into a clear decision rule. */
import React, { useState } from 'react';
import './visual.css';

const CASES = {
  symmetric:   { label: 'Symmetric, no outliers', center: 'Mean',   spread: 'Std dev',   why: 'Every value contributes; mean and SD are efficient and familiar.', aov: '₹8,200' },
  skewed:      { label: 'Skewed / has outliers',  center: 'Median', spread: 'IQR',       why: 'A few huge orders distort the mean — median and IQR resist them.', aov: '₹4,850' },
  categorical: { label: 'Categorical data',       center: 'Mode',   spread: 'Frequency', why: 'You cannot average "Mumbai" — report the most common value and counts.', aov: '—' },
  scales:      { label: 'Comparing two scales',   center: 'Mean',   spread: 'CV',        why: 'CV (SD ÷ mean) is unit-free, so ₹ and kg variability compare directly.', aov: '₹16,165' },
};

const DescStatsChoosingVisualization = () => {
  const [k, setK] = useState('skewed');
  const c = CASES[k];
  return (
    <div className="dschoose-wrap">
      <header className="dschoose-head">
        <span className="dschoose-badge">Statistics</span>
        <h2>Choosing the Right Statistic</h2>
        <p>Same data, three "averages" — which is honest?</p>
      </header>
      <div className="dschoose-opts">
        {Object.keys(CASES).map(key => (
          <button key={key} className={`dschoose-opt ${k === key ? 'dschoose-opt--on' : ''}`} onClick={() => setK(key)}>{CASES[key].label}</button>
        ))}
      </div>
      <div className="dschoose-result">
        <div className="dschoose-pick"><span>Centre</span><strong>{c.center}</strong></div>
        <div className="dschoose-pick"><span>Spread</span><strong>{c.spread}</strong></div>
        <div className="dschoose-pick"><span>Reported AOV</span><strong>{c.aov}</strong></div>
      </div>
      <div className="dschoose-why">{c.why}</div>
      <div className="dschoose-note">None of the three analysts lied — they measured different things. State which statistic you used and <strong>why</strong>, and your "average" stops misleading.</div>
    </div>
  );
};

export default DescStatsChoosingVisualization;

/* Lesson: Feature Engineering
 * Visual type: ILLUSTRATION (interactive toggles)
 * Reason: Feature engineering is about transforming raw columns into model-ready
 * features. A before/after table where you toggle each transform shows the craft. */
import React, { useState } from 'react';
import './visual.css';

const TRANSFORMS = {
  encode: { label: 'One-Hot Encode', col: 'city', before: '"Mumbai"', after: 'city_Mumbai=1, city_Delhi=0', why: 'Models need numbers, not text categories.' },
  scale: { label: 'Normalize', col: 'income', before: '95000', after: '0.72', why: 'Put features on the same scale so none dominates.' },
  bin: { label: 'Bin', col: 'age', before: '34', after: '"30-40"', why: 'Group continuous values into meaningful buckets.' },
  extract: { label: 'Extract from date', col: 'signup', before: '2024-03-15', after: 'month=3, weekday=Fri', why: 'Pull signal out of raw timestamps.' },
};

const MlFeatureEngVisualization = () => {
  const [active, setActive] = useState('encode');
  const t = TRANSFORMS[active];
  return (
    <div className="mlfeat-wrap">
      <header className="mlfeat-head">
        <span className="mlfeat-badge">Machine Learning</span>
        <h2>Feature Engineering</h2>
        <p>Turning raw data into signal a model can use</p>
      </header>
      <div className="mlfeat-tabs">
        {Object.entries(TRANSFORMS).map(([k, t]) => (
          <button key={k} className={`mlfeat-tab ${active === k ? 'mlfeat-tab--on' : ''}`} onClick={() => setActive(k)}>{t.label}</button>
        ))}
      </div>
      <div className="mlfeat-transform">
        <div className="mlfeat-box mlfeat-box--raw">
          <div className="mlfeat-box-label">Raw: <code>{t.col}</code></div>
          <div className="mlfeat-val">{t.before}</div>
        </div>
        <div className="mlfeat-arrow">→</div>
        <div className="mlfeat-box mlfeat-box--feat">
          <div className="mlfeat-box-label">Feature</div>
          <div className="mlfeat-val mlfeat-val--out">{t.after}</div>
        </div>
      </div>
      <div className="mlfeat-why">💡 {t.why}</div>
      <div className="mlfeat-note">"Better features beat fancier algorithms." Feature engineering is often where most ML value is created.</div>
    </div>
  );
};
export default MlFeatureEngVisualization;

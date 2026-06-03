/* Lesson: scikit-learn API
 * Visual type: ILLUSTRATION
 * Reason: scikit-learn's power is its consistent fit/predict/transform contract.
 * A code→step map showing the same 4 calls for any model communicates the
 * pattern; interactivity isn't needed. */
import React, { useState } from 'react';
import './visual.css';

const STEPS = [
  { call: 'model = RandomForestClassifier()', label: '1. Instantiate', desc: 'Pick an estimator and set hyperparameters.' },
  { call: 'model.fit(X_train, y_train)', label: '2. Fit', desc: 'Learn patterns from the training data.' },
  { call: 'preds = model.predict(X_test)', label: '3. Predict', desc: 'Apply the learned model to new inputs.' },
  { call: 'score = model.score(X_test, y_test)', label: '4. Evaluate', desc: 'Measure performance on held-out data.' },
];

const MlSklearnApiVisualization = () => {
  const [active, setActive] = useState(0);
  return (
    <div className="mlskl-wrap">
      <header className="mlskl-head">
        <span className="mlskl-badge">scikit-learn</span>
        <h2>The scikit-learn API</h2>
        <p>One consistent pattern for every model</p>
      </header>
      <div className="mlskl-steps">
        {STEPS.map((s, i) => (
          <button key={i} className={`mlskl-step ${active === i ? 'mlskl-step--on' : ''}`} onClick={() => setActive(i)}>
            <span className="mlskl-num">{i + 1}</span>
            <span className="mlskl-label">{s.label.replace(/^\d+\. /, '')}</span>
          </button>
        ))}
      </div>
      <pre className="mlskl-code"><code>{STEPS.map((s, i) => (i === active ? `▶ ${s.call}` : `  ${s.call}`)).join('\n')}</code></pre>
      <div className="mlskl-detail">{STEPS[active].desc}</div>
      <div className="mlskl-note">Swap <code>RandomForestClassifier</code> for <code>LogisticRegression</code>, <code>SVC</code>, anything — the <code>fit / predict / score</code> contract stays identical. That consistency is sklearn's superpower.</div>
    </div>
  );
};
export default MlSklearnApiVisualization;

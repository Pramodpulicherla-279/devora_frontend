/* Lesson: Supervised vs Unsupervised Learning — The Core Distinction
 * Visual type: ILLUSTRATION
 * Reason: The lesson hinges on one contrast: labelled data → predict a specific
 * output vs unlabelled data → discover structure. Two parallel flow diagrams
 * showing the same 10,000-order dataset taking two different paths makes the
 * distinction immediate. */
import React, { useState } from 'react';
import './visual.css';

const FLOWS = {
  supervised: {
    label: 'Supervised',
    color: '#a78bfa',
    steps: [
      { id: 'data', label: 'Labelled dataset', sub: '10,000 orders\n"returned: yes/no"' },
      { id: 'split', label: 'Train / Test split', sub: '80% train · 20% test' },
      { id: 'model', label: 'Train model', sub: 'Learns label → features mapping' },
      { id: 'eval', label: 'Evaluate on test set', sub: 'Accuracy · Precision · Recall' },
      { id: 'pred', label: 'Predict on new orders', sub: 'P(return) = 0.73 → flag' },
    ],
    algorithms: ['Logistic Regression', 'Decision Tree', 'Random Forest'],
  },
  unsupervised: {
    label: 'Unsupervised',
    color: '#56d364',
    steps: [
      { id: 'data', label: 'Unlabelled dataset', sub: '10,000 orders\nno target column' },
      { id: 'feat', label: 'Feature selection', sub: 'amount · category · city · freq' },
      { id: 'algo', label: 'Run algorithm', sub: 'k-means: find k=4 clusters' },
      { id: 'label', label: 'Interpret clusters', sub: 'Analyst names: "big spenders"…' },
      { id: 'use', label: 'Act on segments', sub: 'Personalised campaigns per group' },
    ],
    algorithms: ['K-Means', 'DBSCAN', 'PCA'],
  },
};

const MlSupervisedUnsupervisedVisualization = () => {
  const [mode, setMode] = useState('supervised');
  const f = FLOWS[mode];

  return (
    <div className="mlsup-wrap">
      <header className="mlsup-head">
        <span className="mlsup-badge">Machine Learning</span>
        <h2>Supervised vs Unsupervised</h2>
        <p>Same dataset — two completely different goals</p>
      </header>

      <div className="mlsup-toggle">
        {Object.keys(FLOWS).map(k => (
          <button key={k} className={`mlsup-t ${mode === k ? 'mlsup-t--on' : ''}`} style={mode === k ? { borderColor: FLOWS[k].color, color: FLOWS[k].color, background: `${FLOWS[k].color}18` } : {}} onClick={() => setMode(k)}>
            {FLOWS[k].label}
          </button>
        ))}
      </div>

      <div className="mlsup-flow">
        {f.steps.map((s, i) => (
          <div key={s.id} className="mlsup-step-wrap">
            <div className="mlsup-step" style={{ borderColor: f.color }}>
              <span className="mlsup-step-label" style={{ color: f.color }}>{s.label}</span>
              <span className="mlsup-step-sub">{s.sub}</span>
            </div>
            {i < f.steps.length - 1 && <div className="mlsup-arr" style={{ color: f.color }}>↓</div>}
          </div>
        ))}
      </div>

      <div className="mlsup-algos">
        <span className="mlsup-algo-hd">Common algorithms</span>
        <div className="mlsup-algo-list">
          {f.algorithms.map(a => <span key={a} className="mlsup-algo" style={{ borderColor: f.color, color: f.color }}>{a}</span>)}
        </div>
      </div>

      <div className="mlsup-note">
        The key question: <strong>Do you have a target column?</strong> Yes → supervised. No → unsupervised. The wrong choice doesn't just pick the wrong algorithm — it frames the wrong problem.
      </div>
    </div>
  );
};

export default MlSupervisedUnsupervisedVisualization;

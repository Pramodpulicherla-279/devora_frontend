/* Lesson: End-to-End ML Pipeline
 * Visual type: ILLUSTRATION (animated stage walk)
 * Reason: An ML project is a pipeline of stages from raw data to deployment.
 * A clickable horizontal pipeline with each stage's job is the clearest mental
 * model — process structure over interactivity. */
import React, { useState } from 'react';
import './visual.css';

const STAGES = [
  { icon: '📥', label: 'Collect', d: 'Gather raw data from databases, APIs, files.' },
  { icon: '🧹', label: 'Clean', d: 'Handle missing values, duplicates, bad types.' },
  { icon: '🔧', label: 'Engineer', d: 'Create & scale features; encode categories.' },
  { icon: '✂️', label: 'Split', d: 'Train / validation / test partitions.' },
  { icon: '🎓', label: 'Train', d: 'Fit the model; tune hyperparameters.' },
  { icon: '📊', label: 'Evaluate', d: 'Score on held-out data; check metrics.' },
  { icon: '🚀', label: 'Deploy', d: 'Serve predictions; monitor for drift.' },
];

const MlPipelineVisualization = () => {
  const [active, setActive] = useState(0);
  return (
    <div className="mlpipe-wrap">
      <header className="mlpipe-head">
        <span className="mlpipe-badge">Machine Learning</span>
        <h2>End-to-End ML Pipeline</h2>
        <p>From raw data to a deployed model</p>
      </header>
      <div className="mlpipe-track">
        {STAGES.map((s, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className={`mlpipe-conn ${i <= active ? 'mlpipe-conn--on' : ''}`} />}
            <button className={`mlpipe-stage ${active === i ? 'mlpipe-stage--on' : ''} ${i < active ? 'mlpipe-stage--done' : ''}`} onClick={() => setActive(i)}>
              <span className="mlpipe-icon">{s.icon}</span>
              <span className="mlpipe-label">{s.label}</span>
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className="mlpipe-detail">
        <strong>{STAGES[active].icon} {STAGES[active].label}</strong>
        <p>{STAGES[active].d}</p>
      </div>
      <pre className="mlpipe-code"><code>{`from sklearn.pipeline import Pipeline
pipe = Pipeline([
  ("scale", StandardScaler()),
  ("model", RandomForestClassifier()),
])
pipe.fit(X_train, y_train)   # whole pipeline, one call`}</code></pre>
      <div className="mlpipe-note">scikit-learn's <code>Pipeline</code> chains these steps so preprocessing &amp; modeling travel together — no train/test leakage.</div>
    </div>
  );
};
export default MlPipelineVisualization;

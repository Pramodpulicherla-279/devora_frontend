/* Lesson: Saving and Loading Models with joblib
 * Visual type: ILLUSTRATION
 * Reason: Model persistence is a workflow — fit once, save, ship, load, predict.
 * An annotated 5-step pipeline with code at each step makes the lesson's practical
 * goal concrete without needing interactivity. */
import React, { useState } from 'react';
import './visual.css';

const STEPS = [
  {
    id: 'fit',
    icon: '🏋',
    label: 'Train the model',
    code: 'clf = RandomForestClassifier()\nclf.fit(X_train, y_train)',
    note: 'Done once — possibly takes minutes on large data.',
  },
  {
    id: 'save',
    icon: '💾',
    label: 'Save with joblib',
    code: "import joblib\njoblib.dump(clf, 'model.pkl')",
    note: 'Serialises the entire fitted model to disk, including learned parameters.',
  },
  {
    id: 'pipeline',
    icon: '🔗',
    label: 'Save as a Pipeline',
    code: "pipe = Pipeline([('scaler', scaler),\n  ('clf', clf)])\njoblib.dump(pipe, 'pipe.pkl')",
    note: 'Always save preprocessing + model together — prevents train/serve skew.',
  },
  {
    id: 'load',
    icon: '📂',
    label: 'Load in production',
    code: "model = joblib.load('pipe.pkl')\n# runs in the API / Flask / FastAPI",
    note: 'One call, model is ready. No retraining.',
  },
  {
    id: 'predict',
    icon: '🎯',
    label: 'Predict on new data',
    code: "proba = model.predict_proba(new_order)\nreturn_risk = proba[0][1]",
    note: 'Returns probabilities. Apply your threshold from the evaluation phase.',
  },
];

const MlSaveLoadVisualization = () => {
  const [sel, setSel] = useState('save');
  const s = STEPS.find(x => x.id === sel);

  return (
    <div className="mlsave-wrap">
      <header className="mlsave-head">
        <span className="mlsave-badge">Machine Learning</span>
        <h2>Saving &amp; Loading Models</h2>
        <p>Train once, predict forever — the production workflow</p>
      </header>

      <div className="mlsave-pipeline">
        {STEPS.map((st, i) => (
          <React.Fragment key={st.id}>
            <button className={`mlsave-step ${sel === st.id ? 'mlsave-step--on' : ''}`} onClick={() => setSel(st.id)}>
              <span className="mlsave-icon">{st.icon}</span>
              <span className="mlsave-step-label">{st.label}</span>
            </button>
            {i < STEPS.length - 1 && <span className="mlsave-arr">→</span>}
          </React.Fragment>
        ))}
      </div>

      <div className="mlsave-detail">
        <pre className="mlsave-code"><code>{s.code}</code></pre>
        <p className="mlsave-note-inline">{s.note}</p>
      </div>

      <div className="mlsave-warning">
        <strong>⚠ Train/serve skew:</strong> if you fit StandardScaler on training data but load the <em>raw model</em> (not the scaler) in production, predictions are wrong. Always save the full Pipeline.
      </div>
    </div>
  );
};

export default MlSaveLoadVisualization;

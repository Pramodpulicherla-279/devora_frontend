/* Lesson: Your First End-to-End ML Project in scikit-learn
 * Visual type: ILLUSTRATION
 * Reason: The capstone lesson is a workflow — 7 phases from data loading to
 * prediction in production. A progress tracker where each phase reveals its
 * key code and output reinforces the lesson's assembly metaphor. */
import React, { useState } from 'react';
import './visual.css';

const PHASES = [
  { id: 'load',    num: '01', label: 'Load & Inspect', code: "df = pd.read_csv('orders.csv')\ndf.head(); df.dtypes; df.isnull().sum()", output: '500 rows × 8 cols · 2 nulls in city' },
  { id: 'clean',   num: '02', label: 'Clean', code: "df['city'].fillna('Unknown', inplace=True)\ndf.dropna(subset=['amount'], inplace=True)", output: '499 rows · 0 nulls remaining' },
  { id: 'feat',    num: '03', label: 'Engineer Features', code: "X = df[['amount','num_items','cat_elec']]\ny = df['returned']", output: '3 features + 1 binary target' },
  { id: 'split',   num: '04', label: 'Train/Test Split', code: "X_tr,X_te,y_tr,y_te = train_test_split(\n  X, y, test_size=0.2, stratify=y)", output: '399 train · 100 test · stratified' },
  { id: 'train',   num: '05', label: 'Train & Tune', code: "pipe = Pipeline([('sc',StandardScaler()),\n  ('clf',RandomForestClassifier())])\npipe.fit(X_tr, y_tr)", output: 'CV score: 0.81 ± 0.03' },
  { id: 'eval',    num: '06', label: 'Evaluate', code: "print(classification_report(y_te,pipe.predict(X_te)))\nprint('AUC:', roc_auc_score(y_te, pipe.predict_proba(X_te)[:,1]))", output: 'Precision: 0.74 · Recall: 0.68 · AUC: 0.84' },
  { id: 'save',    num: '07', label: 'Save & Deploy', code: "joblib.dump(pipe,'return_model.pkl')\n# → Flask/FastAPI predict endpoint", output: 'Model ready for inference' },
];

const MlEndToEndVisualization = () => {
  const [active, setActive] = useState('train');
  const phase = PHASES.find(p => p.id === active);

  return (
    <div className="mlend-wrap">
      <header className="mlend-head">
        <span className="mlend-badge">Machine Learning</span>
        <h2>End-to-End ML Project</h2>
        <p>Seven phases — one production-ready pipeline</p>
      </header>

      <div className="mlend-phases">
        {PHASES.map(p => (
          <button key={p.id} className={`mlend-phase ${active === p.id ? 'mlend-phase--on' : ''}`} onClick={() => setActive(p.id)}>
            <span className="mlend-num">{p.num}</span>
            <span className="mlend-label">{p.label}</span>
          </button>
        ))}
      </div>

      <div className="mlend-detail">
        <pre className="mlend-code"><code>{phase.code}</code></pre>
        <div className="mlend-output"><span>Output</span>{phase.output}</div>
      </div>

      <div className="mlend-progress">
        {PHASES.map((p, i) => (
          <div key={p.id} className={`mlend-pip ${active === p.id ? 'mlend-pip--on' : PHASES.indexOf(PHASES.find(x => x.id === active)) > i ? 'mlend-pip--done' : ''}`} onClick={() => setActive(p.id)}>{p.num}</div>
        ))}
      </div>

      <div className="mlend-note">
        This is the full loop. Every lesson in the course is one of these seven phases. In real projects you'll iterate — cleaning reveals issues that need new features, evaluation reveals issues that need more data — but the sequence never changes.
      </div>
    </div>
  );
};

export default MlEndToEndVisualization;

/* Lesson: Your First ML Pipeline — Train, Test, Evaluate
 * Visual type: INTERACTIVE
 * Reason: The lesson's core warning is "a model that fits training data perfectly
 * is worthless on new data." A train/test split slider that shows the training
 * score staying high while the test score fluctuates teaches the principle
 * through direct manipulation. */
import React, { useState } from 'react';
import './visual.css';

const MlFirstPipelineVisualization = () => {
  const [split, setSplit] = useState(80);
  const trainPct = split, testPct = 100 - split;

  const fakeTrainScore = 0.88 + (split - 70) * 0.002;
  const fakeTestScore = 0.79 - (split - 70) * 0.003 + (split < 60 ? (60 - split) * 0.01 : 0);

  const steps = [
    { n: '01', label: 'Load data', code: "df = pd.read_csv('orders.csv')", done: true },
    { n: '02', label: 'Select features + target', code: "X = df[features]; y = df['returned']", done: true },
    { n: '03', label: 'Train / test split', code: `train_test_split(X, y, test_size=${testPct/100})`, done: true },
    { n: '04', label: 'Train model', code: "clf.fit(X_train, y_train)", done: true },
    { n: '05', label: 'Evaluate on test set', code: "clf.score(X_test, y_test)", done: false },
  ];

  return (
    <div className="mlpipe-wrap">
      <header className="mlpipe-head">
        <span className="mlpipe-badge">Machine Learning</span>
        <h2>Your First ML Pipeline</h2>
        <p>Train on past, evaluate on future — never peek at the test set</p>
      </header>

      <div className="mlpipe-steps">
        {steps.map((s, i) => (
          <div key={i} className={`mlpipe-step ${s.done ? 'mlpipe-step--done' : 'mlpipe-step--eval'}`}>
            <span className="mlpipe-step-n">{s.n}</span>
            <div className="mlpipe-step-body">
              <span className="mlpipe-step-label">{s.label}</span>
              <code className="mlpipe-step-code">{s.code}</code>
            </div>
          </div>
        ))}
      </div>

      <div className="mlpipe-split">
        <label className="mlpipe-lbl">Train/test split — {trainPct}% train · {testPct}% test
        </label>
        <input type="range" min={50} max={90} value={split} onChange={e => setSplit(+e.target.value)} className="mlpipe-slider" />
        <div className="mlpipe-bar-row">
          <div className="mlpipe-train-bar" style={{ width: `${trainPct}%` }}><span>Train</span></div>
          <div className="mlpipe-test-bar" style={{ width: `${testPct}%` }}><span>Test</span></div>
        </div>
      </div>

      <div className="mlpipe-scores">
        <div className="mlpipe-score"><span>Train accuracy</span><strong style={{ color: '#a78bfa' }}>{(fakeTrainScore * 100).toFixed(1)}%</strong></div>
        <div className="mlpipe-score"><span>Test accuracy</span><strong style={{ color: fakeTestScore > 0.78 ? '#56d364' : '#f0883e' }}>{(fakeTestScore * 100).toFixed(1)}%</strong></div>
        <div className="mlpipe-score"><span>Gap (overfit?)</span><strong style={{ color: (fakeTrainScore - fakeTestScore) > 0.1 ? '#f85149' : '#56d364' }}>{((fakeTrainScore - fakeTestScore) * 100).toFixed(1)}pp</strong></div>
      </div>

      <div className="mlpipe-note">
        Never tune your model by looking at the test set — that turns the "held-out" data into training data. Use a <strong>validation set</strong> or <strong>cross-validation</strong> for tuning; the test set is for one final honest evaluation only.
      </div>
    </div>
  );
};

export default MlFirstPipelineVisualization;

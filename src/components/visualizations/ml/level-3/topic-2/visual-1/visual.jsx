/* Lesson: Cross-Validation — Testing Models Honestly
 * Visual type: ILLUSTRATION
 * Reason: K-fold CV is a spatial operation — which rows go into which fold.
 * An animated diagram showing 5 folds rotating through train/test roles
 * makes the "every row is tested exactly once" guarantee visible. */
import React, { useState } from 'react';
import './visual.css';

const K = 5;
const ROWS = 20;

const MlCrossValidationVisualization = () => {
  const [activeFold, setActiveFold] = useState(0);
  const [scores] = useState([0.82, 0.79, 0.84, 0.81, 0.83]);

  const foldSize = ROWS / K;

  const getRole = (rowIdx, fold) => {
    const foldIdx = Math.floor(rowIdx / foldSize);
    return foldIdx === fold ? 'test' : 'train';
  };

  const mean = (scores.reduce((a, b) => a + b, 0) / K).toFixed(3);
  const std = Math.sqrt(scores.reduce((s, v) => s + (v - +mean) ** 2, 0) / K).toFixed(3);

  return (
    <div className="mlcv-wrap">
      <header className="mlcv-head">
        <span className="mlcv-badge">Machine Learning</span>
        <h2>Cross-Validation</h2>
        <p>Every row is tested exactly once</p>
      </header>

      <div className="mlcv-grid-label">
        <span>Fold →</span>
        <div className="mlcv-fold-tabs">
          {Array.from({ length: K }, (_, i) => (
            <button key={i} className={`mlcv-fold-tab ${activeFold === i ? 'mlcv-fold-tab--on' : ''}`} onClick={() => setActiveFold(i)}>
              Fold {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="mlcv-grid">
        {Array.from({ length: ROWS }, (_, rowIdx) => {
          const role = getRole(rowIdx, activeFold);
          return (
            <div key={rowIdx} className={`mlcv-cell mlcv-cell--${role}`} title={`Row ${rowIdx + 1}: ${role}`} />
          );
        })}
      </div>

      <div className="mlcv-legend">
        <span><span className="mlcv-swatch mlcv-swatch--train" />Training data</span>
        <span><span className="mlcv-swatch mlcv-swatch--test" />Test data (this fold)</span>
      </div>

      <div className="mlcv-fold-scores">
        {scores.map((s, i) => (
          <div key={i} className={`mlcv-fold-score ${activeFold === i ? 'mlcv-fold-score--on' : ''}`} onClick={() => setActiveFold(i)}>
            <span>Fold {i + 1}</span>
            <strong>{(s * 100).toFixed(0)}%</strong>
          </div>
        ))}
      </div>

      <div className="mlcv-summary">
        <div className="mlcv-sum-stat"><span>Mean accuracy</span><strong style={{ color: '#56d364' }}>{(+mean * 100).toFixed(1)}%</strong></div>
        <div className="mlcv-sum-stat"><span>Std deviation</span><strong style={{ color: '#a78bfa' }}>±{(+std * 100).toFixed(1)}%</strong></div>
        <div className="mlcv-sum-stat"><span>Report as</span><strong>{(+mean * 100).toFixed(1)}% ± {(+std * 100).toFixed(1)}%</strong></div>
      </div>

      <div className="mlcv-note">
        Always report the mean ± std. "84% accuracy on the test set" is a single lucky split. "82% ± 2% (5-fold CV)" is a reliable estimate. <code>cross_val_score(clf, X, y, cv=5)</code>
      </div>
    </div>
  );
};

export default MlCrossValidationVisualization;

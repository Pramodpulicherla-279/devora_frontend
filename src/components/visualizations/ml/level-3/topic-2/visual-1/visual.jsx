/* Lesson: Model Evaluation and Cross Validation
 * Visual type: ANIMATION (stepped)
 * Reason: k-fold CV is a rotating process — each fold takes a turn as the
 * validation set. Stepping through the folds and accumulating scores shows
 * exactly how CV averages out luck. */
import React, { useState, useEffect } from 'react';
import './visual.css';

const K = 5;

const MlCrossValidationVisualization = () => {
  const [fold, setFold] = useState(0);
  const [playing, setPlaying] = useState(false);
  const scores = [0.82, 0.79, 0.85, 0.81, 0.83];

  useEffect(() => {
    if (!playing) return;
    if (fold >= K - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setFold((f) => f + 1), 900);
    return () => clearTimeout(t);
  }, [playing, fold]);

  const avg = scores.slice(0, fold + 1).reduce((a, b) => a + b, 0) / (fold + 1);

  return (
    <div className="mlcv-wrap">
      <header className="mlcv-head">
        <span className="mlcv-badge">Machine Learning</span>
        <h2>Cross Validation</h2>
        <p>Every fold takes a turn as the validation set</p>
      </header>
      <div className="mlcv-folds">
        {Array.from({ length: K }).map((_, row) => (
          <div key={row} className={`mlcv-row ${row === fold ? 'mlcv-row--active' : ''}`}>
            <span className="mlcv-row-label">Fold {row + 1}</span>
            <div className="mlcv-blocks">
              {Array.from({ length: K }).map((_, col) => (
                <div key={col} className={`mlcv-block ${col === row ? 'mlcv-block--val' : 'mlcv-block--train'}`}>
                  {col === row ? 'val' : 'train'}
                </div>
              ))}
            </div>
            <span className={`mlcv-score ${row <= fold ? 'mlcv-score--on' : ''}`}>{row <= fold ? scores[row].toFixed(2) : '—'}</span>
          </div>
        ))}
      </div>
      <div className="mlcv-controls">
        <button className="mlcv-btn" onClick={() => { setFold(0); setPlaying(true); }} disabled={playing}>▶ Run {K}-fold CV</button>
        <button className="mlcv-btn mlcv-btn--reset" onClick={() => { setFold(0); setPlaying(false); }}>Reset</button>
      </div>
      <div className="mlcv-avg">Mean CV score: <strong>{avg.toFixed(3)}</strong> ({fold + 1}/{K} folds)</div>
      <div className="mlcv-note">A single train/test split can get lucky. k-fold CV trains k times on different splits and averages — a far more reliable estimate.</div>
    </div>
  );
};
export default MlCrossValidationVisualization;

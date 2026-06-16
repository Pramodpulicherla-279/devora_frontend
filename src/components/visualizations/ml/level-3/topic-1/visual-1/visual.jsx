/* Lesson: Model Evaluation — Accuracy, Precision, Recall, F1, RMSE
 * Visual type: INTERACTIVE
 * Reason: The lesson's key point is "95% accuracy can be worthless." A confusion
 * matrix toggle that computes precision/recall/F1 from it, and lets the learner
 * change the matrix values, makes the trade-off between metrics concrete. */
import React, { useState } from 'react';
import './visual.css';

const SCENARIOS = {
  balanced: { label: 'Balanced dataset', tp: 80, fp: 10, fn: 15, tn: 95 },
  imbalanced: { label: 'Imbalanced (95% negative)', tp: 3, fp: 2, fn: 2, tn: 93 },
  recall: { label: 'High recall (catch returns)', tp: 18, fp: 25, fn: 2, tn: 55 },
  precision: { label: 'High precision (few FP)', tp: 12, fp: 3, fn: 8, tn: 77 },
};

const MlModelEvalVisualization = () => {
  const [scenario, setScenario] = useState('imbalanced');
  const { tp, fp, fn, tn } = SCENARIOS[scenario];
  const total = tp + fp + fn + tn;
  const accuracy = ((tp + tn) / total * 100).toFixed(1);
  const precision = tp ? (tp / (tp + fp) * 100).toFixed(1) : 0;
  const recall = tp ? (tp / (tp + fn) * 100).toFixed(1) : 0;
  const f1 = (precision && recall) ? (2 * precision * recall / (+precision + +recall)).toFixed(1) : 0;

  return (
    <div className="mleval-wrap">
      <header className="mleval-head">
        <span className="mleval-badge">Machine Learning</span>
        <h2>Model Evaluation</h2>
        <p>Why accuracy alone misleads</p>
      </header>

      <div className="mleval-toggle">
        {Object.keys(SCENARIOS).map(k => (
          <button key={k} className={`mleval-t ${scenario === k ? 'mleval-t--on' : ''}`} onClick={() => setScenario(k)}>{SCENARIOS[k].label}</button>
        ))}
      </div>

      <div className="mleval-matrix">
        <div></div>
        <div className="mleval-hd">Pred: Positive</div>
        <div className="mleval-hd">Pred: Negative</div>
        <div className="mleval-hd">Actual: Positive</div>
        <div className="mleval-cell mleval-cell--tp"><strong style={{ color: '#56d364' }}>TP = {tp}</strong><span>True Positive</span></div>
        <div className="mleval-cell mleval-cell--fn"><strong style={{ color: '#f85149' }}>FN = {fn}</strong><span>False Negative</span></div>
        <div className="mleval-hd">Actual: Negative</div>
        <div className="mleval-cell mleval-cell--fp"><strong style={{ color: '#f0883e' }}>FP = {fp}</strong><span>False Positive</span></div>
        <div className="mleval-cell mleval-cell--tn"><strong style={{ color: '#56d364' }}>TN = {tn}</strong><span>True Negative</span></div>
      </div>

      <div className="mleval-metrics">
        <div className="mleval-metric"><span>Accuracy</span><strong style={{ color: +accuracy > 90 ? '#56d364' : '#f0883e' }}>{accuracy}%</strong><em>Correct overall</em></div>
        <div className="mleval-metric"><span>Precision</span><strong style={{ color: '#a78bfa' }}>{precision}%</strong><em>Of predicted +, actually +</em></div>
        <div className="mleval-metric"><span>Recall</span><strong style={{ color: '#f0883e' }}>{recall}%</strong><em>Of actual +, caught</em></div>
        <div className="mleval-metric"><span>F1 Score</span><strong style={{ color: '#56d364' }}>{f1}%</strong><em>Harmonic mean</em></div>
      </div>

      <div className="mleval-note">
        On the imbalanced scenario: 95% accuracy, but 0 returns caught. A model that always predicts "not returned" scores 95% accuracy — useless. Precision and recall reveal the truth.
      </div>
    </div>
  );
};

export default MlModelEvalVisualization;

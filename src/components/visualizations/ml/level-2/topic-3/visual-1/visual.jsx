/* Lesson: Classification Metrics
 * Visual type: INTERACTIVE
 * Reason: Precision/recall/F1 are derived from the confusion matrix. Letting the
 * learner edit TP/FP/FN/TN and watch the metrics recompute makes the formulas
 * stop being abstract. */
import React, { useState } from 'react';
import './visual.css';

const MlClassMetricsVisualization = () => {
  const [cm, setCm] = useState({ tp: 70, fp: 20, fn: 15, tn: 95 });
  const { tp, fp, fn, tn } = cm;
  const precision = tp / (tp + fp) || 0;
  const recall = tp / (tp + fn) || 0;
  const f1 = (2 * precision * recall) / (precision + recall) || 0;
  const accuracy = (tp + tn) / (tp + fp + fn + tn) || 0;
  const set = (k, v) => setCm((c) => ({ ...c, [k]: Math.max(0, Number(v) || 0) }));

  return (
    <div className="mlcm-wrap">
      <header className="mlcm-head">
        <span className="mlcm-badge">Machine Learning</span>
        <h2>Classification Metrics</h2>
        <p>Confusion matrix → precision, recall &amp; F1</p>
      </header>
      <div className="mlcm-matrix">
        <div className="mlcm-corner" />
        <div className="mlcm-colh">Predicted +</div>
        <div className="mlcm-colh">Predicted −</div>
        <div className="mlcm-rowh">Actual +</div>
        <div className="mlcm-cell mlcm-cell--tp"><input value={tp} onChange={(e) => set('tp', e.target.value)} /><span>TP</span></div>
        <div className="mlcm-cell mlcm-cell--fn"><input value={fn} onChange={(e) => set('fn', e.target.value)} /><span>FN</span></div>
        <div className="mlcm-rowh">Actual −</div>
        <div className="mlcm-cell mlcm-cell--fp"><input value={fp} onChange={(e) => set('fp', e.target.value)} /><span>FP</span></div>
        <div className="mlcm-cell mlcm-cell--tn"><input value={tn} onChange={(e) => set('tn', e.target.value)} /><span>TN</span></div>
      </div>
      <div className="mlcm-metrics">
        <div className="mlcm-metric"><span>Precision</span><strong>{(precision * 100).toFixed(0)}%</strong><em>TP/(TP+FP)</em></div>
        <div className="mlcm-metric"><span>Recall</span><strong>{(recall * 100).toFixed(0)}%</strong><em>TP/(TP+FN)</em></div>
        <div className="mlcm-metric mlcm-metric--f1"><span>F1</span><strong>{(f1 * 100).toFixed(0)}%</strong><em>harmonic mean</em></div>
        <div className="mlcm-metric"><span>Accuracy</span><strong>{(accuracy * 100).toFixed(0)}%</strong><em>all correct</em></div>
      </div>
      <div className="mlcm-note">⚠️ Accuracy lies on imbalanced data. Precision = "of predicted positives, how many were right". Recall = "of actual positives, how many did we catch".</div>
    </div>
  );
};
export default MlClassMetricsVisualization;

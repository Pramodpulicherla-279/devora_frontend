/* Lesson: Logistic Regression — Predicting a Category
 * Visual type: INTERACTIVE
 * Reason: The S-shaped sigmoid curve IS logistic regression. Sliding the
 * threshold shows how the same probabilities produce different yes/no
 * classifications — teaching the "threshold as a tunable decision rule" idea. */
import React, { useState } from 'react';
import './visual.css';

const W = 300, H = 100, PAD = 20;

function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }

const ORDERS = [
  { x: -2.5, label: 0 }, { x: -1.8, label: 0 }, { x: -1.0, label: 0 },
  { x: -0.3, label: 0 }, { x: 0.2, label: 1 },  { x: 0.8, label: 0 },
  { x: 1.3, label: 1 },  { x: 1.9, label: 1 },  { x: 2.4, label: 1 },
  { x: 3.0, label: 1 },
];

const MlLogisticRegressionVisualization = () => {
  const [threshold, setThreshold] = useState(0.5);

  const toX = (v) => PAD + ((v + 3.5) / 7) * (W - 2 * PAD);
  const toY = (p) => H - PAD - p * (H - 2 * PAD) * 0.9;

  const sigPath = Array.from({ length: 60 }, (_, i) => {
    const v = -3.5 + i * (7 / 59);
    const x = toX(v);
    const y = toY(sigmoid(v));
    return `${i === 0 ? 'M' : 'L'}${x},${y}`;
  }).join(' ');

  const thX1 = PAD, thX2 = W - PAD;
  const thY = toY(threshold);

  const preds = ORDERS.map(o => ({ ...o, pred: sigmoid(o.x) >= threshold ? 1 : 0 }));
  const accuracy = (preds.filter(o => o.pred === o.label).length / preds.length * 100).toFixed(0);

  return (
    <div className="mllogreg-wrap">
      <header className="mllogreg-head">
        <span className="mllogreg-badge">Machine Learning</span>
        <h2>Logistic Regression</h2>
        <p>P(return) → threshold → yes or no</p>
      </header>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="mllogreg-svg">
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#30363d" strokeWidth={1} />
        <line x1={PAD} y1={PAD / 2} x2={PAD} y2={H - PAD} stroke="#30363d" strokeWidth={1} />
        <text x={W - PAD} y={H - PAD + 11} textAnchor="end" fill="#6b7785" fontSize={7.5}>Model score →</text>
        <text x={PAD - 2} y={PAD / 2 + 3} textAnchor="end" fill="#6b7785" fontSize={7.5}>P=1</text>
        <text x={PAD - 2} y={H - PAD + 3} textAnchor="end" fill="#6b7785" fontSize={7.5}>P=0</text>

        <path d={sigPath} stroke="#a78bfa" strokeWidth={2} fill="none" />

        <line x1={thX1} y1={thY} x2={thX2} y2={thY} stroke="#f0883e" strokeWidth={1.5} strokeDasharray="4 3" />
        <text x={thX2 + 2} y={thY + 4} fill="#f0883e" fontSize={8}>{threshold}</text>

        {preds.map((o, i) => {
          const ox = toX(o.x);
          const oy = toY(sigmoid(o.x));
          const correct = o.pred === o.label;
          return (
            <g key={i}>
              <circle cx={ox} cy={H - PAD - (o.label === 1 ? 8 : 0)} r={4} fill={o.label === 1 ? '#56d364' : '#f85149'} opacity={0.9} />
              {!correct && <circle cx={ox} cy={H - PAD - (o.label === 1 ? 8 : 0)} r={6} fill="none" stroke="#f0883e" strokeWidth={1.5} />}
            </g>
          );
        })}
      </svg>

      <div className="mllogreg-control">
        <label className="mllogreg-lbl">Decision threshold = <strong style={{ color: '#f0883e' }}>{threshold}</strong></label>
        <input type="range" min={0.2} max={0.8} step={0.05} value={threshold} onChange={e => setThreshold(+e.target.value)} className="mllogreg-slider" />
      </div>

      <div className="mllogreg-stats">
        <div className="mllogreg-stat"><span>Threshold</span><strong style={{ color: '#f0883e' }}>{threshold}</strong></div>
        <div className="mllogreg-stat"><span>Predicted returns</span><strong style={{ color: '#a78bfa' }}>{preds.filter(o => o.pred === 1).length}/{preds.length}</strong></div>
        <div className="mllogreg-stat"><span>Accuracy</span><strong style={{ color: +accuracy > 75 ? '#56d364' : '#f0883e' }}>{accuracy}%</strong></div>
      </div>

      <div className="mllogreg-legend">
        <span><span className="mllogreg-dot" style={{ background: '#56d364' }} />Actually returned</span>
        <span><span className="mllogreg-dot" style={{ background: '#f85149' }} />Not returned</span>
        <span><span className="mllogreg-ring" />Misclassified</span>
      </div>

      <div className="mllogreg-note">
        The sigmoid maps any input to 0–1. The threshold is your decision rule — lower it to catch more returns (higher recall); raise it to avoid false alarms (higher precision). Both are valid depending on business cost.
      </div>
    </div>
  );
};

export default MlLogisticRegressionVisualization;

/* Lesson: Interpreting Results — Building the Profitability Predictor (Capstone Q5)
 * Visual: model metrics + feature importances mapped back to the Q1–Q4 findings they confirm */
import React, { useState } from 'react';
import './visual.css';

const METRICS = [
  { k: 'Accuracy', v: 0.86 }, { k: 'Precision', v: 0.83 }, { k: 'Recall', v: 0.79 }, { k: 'F1', v: 0.81 },
];

const IMPORTANCES = [
  { name: 'discount_pct', imp: 0.34, confirms: 'Q3 finding: high discounts destroy margin — now the model\'s #1 predictor.' },
  { name: 'sub_category', imp: 0.27, confirms: 'Q1 finding: Tables are chronic loss-makers — sub-category drives profitability.' },
  { name: 'order_quarter', imp: 0.18, confirms: 'Q2 finding: Q4 spike — seasonality matters to the model too.' },
  { name: 'segment', imp: 0.12, confirms: 'Q4 finding: customer segment affects profit, but less than discount.' },
  { name: 'region', imp: 0.09, confirms: 'Extends earlier work: region was NOT statistically significant, and the model agrees it is weak.' },
];

export default function CapResultsVisualization() {
  const [sel, setSel] = useState('discount_pct');
  const f = IMPORTANCES.find(x => x.name === sel);
  const max = Math.max(...IMPORTANCES.map(x => x.imp));

  return (
    <div className="capres-wrap">
      <div className="capres-head">
        <span className="capres-badge">CAPSTONE · STEP 8</span>
        <h2>Interpreting Results</h2>
        <p>Building the profitability predictor (Q5) — and reading what it tells you</p>
      </div>

      <div className="capres-model">Random Forest · predicts <strong>is_profitable</strong> before an order ships</div>

      <div className="capres-metrics">
        {METRICS.map(m => (
          <div className="capres-metric" key={m.k}>
            <span className="capres-metric-v">{(m.v * 100).toFixed(0)}%</span>
            <small>{m.k}</small>
          </div>
        ))}
      </div>

      <div className="capres-imp-label">Feature importances — click to see what each confirms</div>
      <div className="capres-bars">
        {IMPORTANCES.map(x => (
          <button key={x.name} className={`capres-bar-row ${sel === x.name ? 'capres-bar-row--on' : ''}`} onClick={() => setSel(x.name)}>
            <span className="capres-bar-name">{x.name}</span>
            <span className="capres-bar-track"><span className="capres-bar-fill" style={{ width: `${(x.imp / max) * 100}%` }} /></span>
            <span className="capres-bar-val">{x.imp.toFixed(2)}</span>
          </button>
        ))}
      </div>

      <div className="capres-confirm">
        <span className="capres-confirm-tag">🔗 Connects to earlier analysis</span>
        <p>{f.confirms}</p>
      </div>

      <div className="capres-note">Feature importances aren't just model trivia — they validate or extend the Q1–Q4 findings, turning description into prediction.</div>
    </div>
  );
}

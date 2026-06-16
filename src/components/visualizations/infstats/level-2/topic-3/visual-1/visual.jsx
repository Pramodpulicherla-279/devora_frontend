/* Lesson: Chi-Square Test — Are These Categories Independent?
 * Visual type: INTERACTIVE
 * Reason: χ² is fundamentally about comparing observed counts to expected counts.
 * An interactive 3×2 contingency table that toggles between Observed / Expected /
 * Contribution columns makes the "deviation from expectation" calculation tactile. */
import React, { useState } from 'react';
import './visual.css';

const CATS = ['Electronics', 'Accessories', 'Furniture'];
const OUTCOMES = ['Returned', 'Kept'];

const OBS = [
  [45, 30, 25],
  [155, 120, 125],
];

function computeExpected(obs) {
  const rowTotals = obs.map(r => r.reduce((a, b) => a + b, 0));
  const colTotals = CATS.map((_, j) => obs.reduce((s, r) => s + r[j], 0));
  const grand = rowTotals.reduce((a, b) => a + b, 0);
  return obs.map((r, i) => r.map((_, j) => (rowTotals[i] * colTotals[j]) / grand));
}

function computeContribs(obs, exp) {
  return obs.map((r, i) => r.map((v, j) => ((v - exp[i][j]) ** 2) / exp[i][j]));
}

const EXP = computeExpected(OBS);
const CONTRIB = computeContribs(OBS, EXP);
const chiSq = CONTRIB.flat().reduce((a, b) => a + b, 0);
const df = (OUTCOMES.length - 1) * (CATS.length - 1);

const InfStatsChiSquareVisualization = () => {
  const [view, setView] = useState('observed');

  const data = view === 'observed' ? OBS : view === 'expected' ? EXP : CONTRIB;
  const fmt = v => view === 'contribution' ? v.toFixed(2) : view === 'expected' ? v.toFixed(1) : v;
  const maxContrib = Math.max(...CONTRIB.flat());

  const cellStyle = (i, j) => {
    if (view !== 'contribution') return {};
    const intensity = CONTRIB[i][j] / maxContrib;
    return { background: `rgba(248,81,73,${intensity * 0.5})`, borderColor: `rgba(248,81,73,${intensity * 0.6})` };
  };

  return (
    <div className="ischi-wrap">
      <header className="ischi-head">
        <span className="ischi-badge">Inferential</span>
        <h2>Chi-Square Test</h2>
        <p>Are return rates independent of product category?</p>
      </header>

      <div className="ischi-toggle">
        {['observed', 'expected', 'contribution'].map(v => (
          <button key={v} className={`ischi-t ${view === v ? 'ischi-t--on' : ''}`} onClick={() => setView(v)}>
            {v === 'observed' ? 'Observed' : v === 'expected' ? 'Expected (H₀)' : 'χ² contribution'}
          </button>
        ))}
      </div>

      <div className="ischi-table-wrap">
        <table className="ischi-table">
          <thead>
            <tr>
              <th></th>
              {CATS.map(c => <th key={c}>{c}</th>)}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {OUTCOMES.map((out, i) => (
              <tr key={out}>
                <td className="ischi-row-hd">{out}</td>
                {data[i].map((v, j) => (
                  <td key={j} className="ischi-cell" style={cellStyle(i, j)}>{fmt(v)}</td>
                ))}
                <td className="ischi-total">{OBS[i].reduce((a, b) => a + b, 0)}</td>
              </tr>
            ))}
            <tr>
              <td className="ischi-row-hd">Total</td>
              {CATS.map((_, j) => <td key={j} className="ischi-total">{OBS.reduce((s, r) => s + r[j], 0)}</td>)}
              <td className="ischi-total">{OBS.flat().reduce((a, b) => a + b, 0)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="ischi-result">
        <div className="ischi-stat"><span>χ² statistic</span><strong>{chiSq.toFixed(2)}</strong></div>
        <div className="ischi-stat"><span>df</span><strong>{df}</strong></div>
        <div className="ischi-stat"><span>Critical (α=0.05)</span><strong>5.99</strong></div>
        <div className="ischi-stat"><span>Verdict</span><strong style={{ color: chiSq > 5.99 ? '#56d364' : '#f85149' }}>{chiSq > 5.99 ? 'Reject H₀' : 'Fail to reject'}</strong></div>
      </div>

      <div className="ischi-note">
        H₀: return rate is the same across all categories. The χ² contribution cells show <em>where</em> the data deviates most from that assumption — the biggest contributors drive the test statistic.
      </div>
    </div>
  );
};

export default InfStatsChiSquareVisualization;

/* Lesson: Chi-Square Test
 * Visual type: INTERACTIVE
 * Reason: χ² compares observed vs expected counts. An editable contingency table
 * that live-computes the χ² statistic and per-cell contribution shows exactly
 * where "observed deviates from expected". */
import React, { useState } from 'react';
import './visual.css';

const InfStatsChiSquareVisualization = () => {
  const [obs, setObs] = useState([[30, 10], [20, 40]]);
  const rowT = obs.map((r) => r[0] + r[1]);
  const colT = [obs[0][0] + obs[1][0], obs[0][1] + obs[1][1]];
  const total = rowT[0] + rowT[1];
  const exp = obs.map((r, i) => r.map((_, j) => (rowT[i] * colT[j]) / total));
  let chi = 0; const contrib = obs.map((r, i) => r.map((o, j) => { const c = (o - exp[i][j]) ** 2 / exp[i][j]; chi += c; return c; }));
  const significant = chi > 3.841; // df=1, α=0.05
  const set = (i, j, v) => { const next = obs.map((r) => [...r]); next[i][j] = Math.max(0, Number(v) || 0); setObs(next); };

  return (
    <div className="ischi-wrap">
      <header className="ischi-head">
        <span className="ischi-badge">Inferential</span>
        <h2>Chi-Square Test</h2>
        <p>Are two categorical variables related?</p>
      </header>
      <div className="ischi-table-wrap">
        <table className="ischi-table">
          <thead><tr><th></th><th>Group X</th><th>Group Y</th></tr></thead>
          <tbody>
            {obs.map((r, i) => (
              <tr key={i}>
                <th>Row {i + 1}</th>
                {r.map((o, j) => (
                  <td key={j}>
                    <input className="ischi-input" type="number" value={o} onChange={(e) => set(i, j, e.target.value)} />
                    <span className="ischi-exp">exp {exp[i][j].toFixed(1)}</span>
                    <span className="ischi-contrib" style={{ opacity: 0.4 + Math.min(0.6, contrib[i][j] / 10) }}>χ² +{contrib[i][j].toFixed(1)}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ischi-stats">
        <div className="ischi-stat"><span>χ² statistic</span><strong>{chi.toFixed(2)}</strong></div>
        <div className="ischi-stat"><span>Critical (df=1)</span><strong>3.84</strong></div>
      </div>
      <div className={`ischi-verdict ${significant ? 'ischi-verdict--rej' : 'ischi-verdict--fail'}`}>
        {significant ? '✓ χ² > 3.84 → variables ARE associated (reject H₀)' : 'χ² ≤ 3.84 → no evidence of association'}
      </div>
      <div className="ischi-note">χ² sums <code>(observed − expected)² / expected</code> across cells. Bigger gaps between what you saw and what independence predicts → bigger χ².</div>
    </div>
  );
};
export default InfStatsChiSquareVisualization;

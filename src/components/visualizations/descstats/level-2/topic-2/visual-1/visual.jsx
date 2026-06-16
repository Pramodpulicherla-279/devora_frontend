/* Lesson: Contingency Tables and Frequency Distributions
 * Visual type: INTERACTIVE
 * Reason: Categorical data is about counting cross-tabs — a live contingency table
 * where you flip between raw counts and row-% (conditional distribution) and
 * highlight marginal totals shows how cross-tabulation reveals hidden patterns. */
import React, { useState } from 'react';
import './visual.css';

const ROWS = ['Mumbai', 'Delhi', 'Bengaluru'];
const COLS = ['Returned', 'Kept'];
const COUNTS = [[28, 172], [44, 156], [18, 232]];

const DescStatsContingencyVisualization = () => {
  const [mode, setMode] = useState('count');
  const [hl, setHl] = useState(null);
  const rowTot = COUNTS.map(r => r[0] + r[1]);
  const colTot = COLS.map((_, c) => COUNTS.reduce((s, r) => s + r[c], 0));
  const grand = rowTot.reduce((s, v) => s + v, 0);
  const cell = (r, c) => mode === 'count' ? COUNTS[r][c] : `${Math.round(COUNTS[r][c] / rowTot[r] * 100)}%`;
  return (
    <div className="dscon-wrap">
      <header className="dscon-head">
        <span className="dscon-badge">Statistics</span>
        <h2>Contingency Tables</h2>
        <p>Counting two categories at once</p>
      </header>
      <div className="dscon-toggle">
        <button className={mode === 'count' ? 'dscon-t dscon-t--on' : 'dscon-t'} onClick={() => setMode('count')}>Counts</button>
        <button className={mode === 'rowpct' ? 'dscon-t dscon-t--on' : 'dscon-t'} onClick={() => setMode('rowpct')}>Row %</button>
      </div>
      <div className="dscon-tablewrap">
        <table className="dscon-table">
          <thead>
            <tr>
              <th></th>
              {COLS.map((c, ci) => <th key={c} className={hl && hl.c === ci ? 'dscon-on' : ''} onClick={() => setHl({ c: ci })}>{c}</th>)}
              <th className="dscon-tot">Total</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((rn, r) => (
              <tr key={rn} className={hl && hl.r === r ? 'dscon-on-row' : ''}>
                <th onClick={() => setHl({ r })}>{rn}</th>
                {COLS.map((_, c) => <td key={c} className={(hl && (hl.r === r || hl.c === c)) ? 'dscon-cell-hl' : ''}>{cell(r, c)}</td>)}
                <td className="dscon-tot">{mode === 'count' ? rowTot[r] : '100%'}</td>
              </tr>
            ))}
            <tr className="dscon-totrow">
              <th>Total</th>
              {colTot.map((t, c) => <td key={c}>{mode === 'count' ? t : `${Math.round(t / grand * 100)}%`}</td>)}
              <td className="dscon-tot">{mode === 'count' ? grand : '100%'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="dscon-note">Tap a city or column to highlight its <strong>marginal totals</strong>. Switch to <strong>Row %</strong> to compare return rates fairly — Delhi returns 22% vs Bengaluru's 7%, invisible in raw counts.</div>
    </div>
  );
};

export default DescStatsContingencyVisualization;

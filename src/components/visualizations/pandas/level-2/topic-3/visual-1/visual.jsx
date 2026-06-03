/* Lesson: Missing Data
 * Visual type: INTERACTIVE
 * Reason: NaN handling strategies (drop vs fill) are best shown by toggling each
 * on a table with holes and watching rows vanish or gaps fill. */
import React, { useState } from 'react';
import './visual.css';

const RAW = [
  { name: 'Alice', age: 28, score: 90 },
  { name: 'Bob', age: null, score: 75 },
  { name: 'Carol', age: 22, score: null },
  { name: 'Dan', age: 41, score: 88 },
];

const PdNaVisualization = () => {
  const [op, setOp] = useState('raw');
  let rows = RAW.map((r) => ({ ...r }));
  let code = '# original with NaN';
  if (op === 'dropna') { rows = rows.filter((r) => r.age !== null && r.score !== null); code = 'df.dropna()'; }
  else if (op === 'fillna') {
    const meanAge = Math.round(RAW.filter((r) => r.age).reduce((s, r) => s + r.age, 0) / RAW.filter((r) => r.age).length);
    rows = rows.map((r) => ({ ...r, age: r.age ?? meanAge, score: r.score ?? 0, _fa: r.age === null, _fs: r.score === null }));
    code = "df.fillna({'age': df['age'].mean(), 'score': 0})";
  }
  return (
    <div className="pdna-wrap">
      <header className="pdna-head">
        <span className="pdna-badge">Pandas</span>
        <h2>Missing Data</h2>
        <p>Handle the NaN holes every real dataset has</p>
      </header>
      <div className="pdna-tabs">
        <button className={`pdna-tab ${op === 'raw' ? 'pdna-tab--on' : ''}`} onClick={() => setOp('raw')}>Raw (NaN)</button>
        <button className={`pdna-tab ${op === 'dropna' ? 'pdna-tab--on' : ''}`} onClick={() => setOp('dropna')}>dropna()</button>
        <button className={`pdna-tab ${op === 'fillna' ? 'pdna-tab--on' : ''}`} onClick={() => setOp('fillna')}>fillna()</button>
      </div>
      <pre className="pdna-code"><code>{code}</code></pre>
      <div className="pdna-table-wrap">
        <table className="pdna-table">
          <thead><tr><th>name</th><th>age</th><th>score</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <td>{r.name}</td>
                <td className={r.age === null ? 'pdna-nan' : r._fa ? 'pdna-filled' : ''}>{r.age === null ? 'NaN' : r.age}</td>
                <td className={r.score === null ? 'pdna-nan' : r._fs ? 'pdna-filled' : ''}>{r.score === null ? 'NaN' : r.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pdna-note">
        {op === 'dropna' && 'dropna() removes any row with a hole — simple but you lose data.'}
        {op === 'fillna' && 'fillna() imputes values (mean, 0, forward-fill…) — keeps rows but introduces estimates.'}
        {op === 'raw' && 'First detect: df.isnull().sum() shows missing counts per column.'}
      </div>
    </div>
  );
};
export default PdNaVisualization;

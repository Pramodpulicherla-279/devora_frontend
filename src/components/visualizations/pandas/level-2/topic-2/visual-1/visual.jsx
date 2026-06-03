/* Lesson: Adding and Transforming Columns
 * Visual type: INTERACTIVE
 * Reason: Creating derived columns is best shown by toggling a transform and
 * watching a new column appear in the table, computed from existing ones. */
import React, { useState } from 'react';
import './visual.css';

const BASE = [
  { name: 'Alice', price: 100, qty: 2 },
  { name: 'Bob', price: 80, qty: 5 },
  { name: 'Carol', price: 60, qty: 1 },
];

const PdColsVisualization = () => {
  const [op, setOp] = useState('total');
  const TRANSFORMS = {
    total: { code: "df['total'] = df['price'] * df['qty']", col: 'total', fn: (r) => r.price * r.qty },
    tax: { code: "df['with_tax'] = df['price'] * 1.18", col: 'with_tax', fn: (r) => Math.round(r.price * 1.18) },
    tier: { code: "df['tier'] = df['qty'].apply(lambda q: 'bulk' if q >= 3 else 'single')", col: 'tier', fn: (r) => (r.qty >= 3 ? 'bulk' : 'single') },
  };
  const t = TRANSFORMS[op];
  return (
    <div className="pdcols-wrap">
      <header className="pdcols-head">
        <span className="pdcols-badge">Pandas</span>
        <h2>Adding &amp; Transforming Columns</h2>
        <p>Derive new columns from existing data</p>
      </header>
      <div className="pdcols-tabs">
        {Object.keys(TRANSFORMS).map((k) => (
          <button key={k} className={`pdcols-tab ${op === k ? 'pdcols-tab--on' : ''}`} onClick={() => setOp(k)}>{TRANSFORMS[k].col}</button>
        ))}
      </div>
      <pre className="pdcols-code"><code>{t.code}</code></pre>
      <div className="pdcols-table-wrap">
        <table className="pdcols-table">
          <thead><tr><th>name</th><th>price</th><th>qty</th><th className="pdcols-new">{t.col}</th></tr></thead>
          <tbody>
            {BASE.map((r) => (
              <tr key={r.name}><td>{r.name}</td><td>{r.price}</td><td>{r.qty}</td><td className="pdcols-newcell">{t.fn(r)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pdcols-note">Vectorized math (<code>df['a'] * df['b']</code>) runs on whole columns at once — far faster than Python loops. Use <code>.apply()</code> for custom row logic.</div>
    </div>
  );
};
export default PdColsVisualization;

/* Lesson: Selecting Rows and Columns — loc, iloc, and Boolean Indexing
 * Visual type: INTERACTIVE
 * Three-tab selector: loc / iloc / Boolean — each shows syntax and the rows it returns */
import React, { useState } from 'react';
import './visual.css';

const ROWS = [
  { i: 0, city: 'Mumbai',    amount: 4200, cat: 'Electronics' },
  { i: 1, city: 'Pune',      amount: 1850, cat: 'Accessories' },
  { i: 2, city: 'Delhi',     amount: 6700, cat: 'Electronics' },
  { i: 3, city: 'Bengaluru', amount: 980,  cat: 'Accessories' },
  { i: 4, city: 'Mumbai',    amount: 12400,cat: 'Electronics' },
  { i: 5, city: 'Hyderabad', amount: 2300, cat: 'Electronics' },
];

const MODES = [
  {
    id: 'bool',
    label: 'Boolean',
    code: "df[df['city'] == 'Mumbai']",
    desc: 'Returns every row where the condition is True.',
    highlight: r => r.city === 'Mumbai',
  },
  {
    id: 'loc',
    label: '.loc[]',
    code: "df.loc[1:3, ['city','amount']]",
    desc: '.loc uses labels. 1:3 is inclusive on both ends.',
    highlight: r => r.i >= 1 && r.i <= 3,
    cols: ['city', 'amount'],
  },
  {
    id: 'iloc',
    label: '.iloc[]',
    code: 'df.iloc[0:3, 0:2]',
    desc: '.iloc uses integer positions. 0:3 stops BEFORE index 3 (exclusive).',
    highlight: r => r.i >= 0 && r.i < 3,
    cols: ['i', 'city'],
  },
];

const PdSelectLocVisualization = () => {
  const [sel, setSel] = useState('bool');
  const m = MODES.find(x => x.id === sel);

  return (
    <div className="pdselloc-wrap">
      <header className="pdselloc-head">
        <span className="pdselloc-badge">Pandas &amp; NumPy</span>
        <h2>Selecting Rows &amp; Columns</h2>
        <p>Highlighted rows = what your query returns</p>
      </header>

      <div className="pdselloc-tabs">
        {MODES.map(m => (
          <button key={m.id} className={`pdselloc-tab ${sel === m.id ? 'pdselloc-tab--on' : ''}`} onClick={() => setSel(m.id)}>
            {m.label}
          </button>
        ))}
      </div>

      <pre className="pdselloc-code"><code>{m.code}</code></pre>

      <div className="pdselloc-table-wrap">
        <table className="pdselloc-table">
          <thead>
            <tr>
              <th>idx</th>
              <th>city</th>
              <th>amount</th>
              <th>category</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(r => (
              <tr key={r.i} className={m.highlight(r) ? 'pdselloc-tr--on' : ''}>
                <td>{r.i}</td>
                <td>{r.city}</td>
                <td>₹{r.amount.toLocaleString()}</td>
                <td>{r.cat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pdselloc-note">{m.desc}</div>
    </div>
  );
};

export default PdSelectLocVisualization;

/* Lesson: Selecting, Filtering, Sorting
 * Visual type: INTERACTIVE
 * Reason: These operations are best learned by applying them to a live table and
 * watching rows/columns appear, disappear, or reorder. */
import React, { useState } from 'react';
import './visual.css';

const DATA = [
  { name: 'Alice', age: 28, city: 'Mumbai', salary: 95 },
  { name: 'Bob', age: 34, city: 'Delhi', salary: 72 },
  { name: 'Carol', age: 22, city: 'Pune', salary: 58 },
  { name: 'Dan', age: 41, city: 'Mumbai', salary: 110 },
  { name: 'Eve', age: 29, city: 'Delhi', salary: 88 },
];

const PdSelectVisualization = () => {
  const [op, setOp] = useState('filter');
  let rows = [...DATA];
  let code = '';
  if (op === 'filter') { rows = rows.filter((r) => r.salary > 80); code = "df[df['salary'] > 80]"; }
  else if (op === 'sort') { rows = rows.sort((a, b) => b.age - a.age); code = "df.sort_values('age', ascending=False)"; }
  else if (op === 'select') { code = "df[['name', 'salary']]"; }
  const cols = op === 'select' ? ['name', 'salary'] : ['name', 'age', 'city', 'salary'];

  return (
    <div className="pdselect-wrap">
      <header className="pdselect-head">
        <span className="pdselect-badge">Pandas</span>
        <h2>Select, Filter &amp; Sort</h2>
        <p>Slice your DataFrame to the rows &amp; columns you need</p>
      </header>
      <div className="pdselect-tabs">
        <button className={`pdselect-tab ${op === 'select' ? 'pdselect-tab--on' : ''}`} onClick={() => setOp('select')}>Select columns</button>
        <button className={`pdselect-tab ${op === 'filter' ? 'pdselect-tab--on' : ''}`} onClick={() => setOp('filter')}>Filter rows</button>
        <button className={`pdselect-tab ${op === 'sort' ? 'pdselect-tab--on' : ''}`} onClick={() => setOp('sort')}>Sort</button>
      </div>
      <pre className="pdselect-code"><code>{code}</code></pre>
      <div className="pdselect-table-wrap">
        <table className="pdselect-table">
          <thead><tr><th></th>{cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.name} className="pdselect-row-in">
                <td>{DATA.indexOf(r)}</td>
                {cols.map((c) => <td key={c} className={op === 'filter' && c === 'salary' ? 'pdselect-hl' : ''}>{r[c]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pdselect-count">{rows.length} of {DATA.length} rows · {cols.length} columns</div>
      <div className="pdselect-note">Boolean filtering (<code>df[df['x'] &gt; n]</code>) is the workhorse. Combine conditions with <code>&amp;</code> / <code>|</code> and wrap each in parentheses.</div>
    </div>
  );
};
export default PdSelectVisualization;

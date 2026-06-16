/* Lesson: Renaming, Reordering, and Dropping Columns
 * Visual type: ILLUSTRATION
 * Before/after table for each operation — rename, reorder, drop */
import React, { useState } from 'react';
import './visual.css';

const ORIGINAL = ['order_amt_usd', 'cust_city', 'prod_cat', 'rep_name', 'order_dt', 'is_rtrn'];

const OPS = [
  {
    id: 'rename',
    label: 'rename()',
    code: `df.rename(columns={
    'order_amt_usd': 'amount',
    'cust_city': 'city',
    'prod_cat': 'category',
    'rep_name': 'rep',
    'order_dt': 'date',
    'is_rtrn': 'returned'
}, inplace=True)`,
    after: ['amount', 'city', 'category', 'rep', 'date', 'returned'],
    note: 'rename() takes a dict of old → new. Only columns listed get renamed; others stay.',
  },
  {
    id: 'reorder',
    label: 'Reorder columns',
    code: `cols = ['city', 'rep', 'date', 'category', 'amount', 'returned']
df = df[cols]`,
    after: ['city', 'rep', 'date', 'category', 'amount', 'returned'],
    note: 'Select columns in the order you want. This creates a new DataFrame — assign it back.',
  },
  {
    id: 'drop',
    label: 'drop()',
    code: `df.drop(columns=['returned', 'order_dt'],
         inplace=True)`,
    after: ['order_amt_usd', 'cust_city', 'prod_cat', 'rep_name'],
    note: "Use columns= to drop by name. Add errors='ignore' if the column might not exist.",
  },
];

const PdColManageVisualization = () => {
  const [sel, setSel] = useState('rename');
  const op = OPS.find(x => x.id === sel);

  return (
    <div className="pdcol-wrap">
      <header className="pdcol-head">
        <span className="pdcol-badge">Pandas &amp; NumPy</span>
        <h2>Column Management</h2>
        <p>Rename, reorder, and drop columns cleanly</p>
      </header>

      <div className="pdcol-tabs">
        {OPS.map(o => (
          <button key={o.id} className={`pdcol-tab ${sel===o.id?'pdcol-tab--on':''}`} onClick={()=>setSel(o.id)}>{o.label}</button>
        ))}
      </div>

      <div className="pdcol-compare">
        <div className="pdcol-side">
          <div className="pdcol-side-label">Before</div>
          <div className="pdcol-cols">
            {ORIGINAL.map(c => (
              <div key={c} className={`pdcol-pill ${op.after.includes(c) ? '' : 'pdcol-pill--gone'}`}>{c}</div>
            ))}
          </div>
        </div>
        <div className="pdcol-arrow">→</div>
        <div className="pdcol-side">
          <div className="pdcol-side-label">After</div>
          <div className="pdcol-cols">
            {op.after.map(c => (
              <div key={c} className="pdcol-pill pdcol-pill--new">{c}</div>
            ))}
          </div>
        </div>
      </div>

      <pre className="pdcol-code"><code>{op.code}</code></pre>

      <div className="pdcol-note">{op.note}</div>
    </div>
  );
};

export default PdColManageVisualization;

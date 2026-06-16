/* Lesson: NULL Values — The Invisible Trap in Your Data
 * Visual type: INTERACTIVE
 * Show how IS NULL / IS NOT NULL / COALESCE work on a dataset with NULLs */
import React, { useState } from 'react';
import './visual.css';

const DATA = [
  { id:1, city:'Mumbai',    amount:4200,  rep:'Aisha' },
  { id:2, city:'Pune',      amount:null,  rep:'Ravi'  },
  { id:3, city:'Delhi',     amount:6700,  rep:null    },
  { id:4, city:'Bengaluru', amount:null,  rep:'Aisha' },
  { id:5, city:'Mumbai',    amount:12400, rep:'Ravi'  },
  { id:6, city:null,        amount:2300,  rep:'Priya' },
];

const MODES = [
  {
    id:'raw',   label:'Raw (with NULLs)',
    code:'SELECT * FROM orders;',
    filter: () => true,
    coalesce: false,
    note:'2 NULLs in amount, 1 in rep, 1 in city. COUNT(*) = 6 but SUM(amount) = 25,600 — the 2 NULLs are skipped.',
  },
  {
    id:'isnull', label:'IS NULL',
    code:"SELECT * FROM orders\nWHERE amount IS NULL;",
    filter: r => r.amount === null,
    coalesce: false,
    note:'IS NULL finds rows where the column has no value. You cannot use = NULL — SQL ignores that comparison.',
  },
  {
    id:'notnull', label:'IS NOT NULL',
    code:"SELECT * FROM orders\nWHERE amount IS NOT NULL;",
    filter: r => r.amount !== null,
    coalesce: false,
    note:'IS NOT NULL excludes the missing-value rows. Use this before aggregating to avoid silent data drops.',
  },
  {
    id:'coalesce', label:'COALESCE',
    code:"SELECT id, city,\n  COALESCE(amount, 0) AS amount,\n  COALESCE(rep, 'Unassigned') AS rep\nFROM orders;",
    filter: () => true,
    coalesce: true,
    note:'COALESCE(col, fallback) returns the first non-NULL value. Fills in defaults without removing rows.',
  },
];

const SqlFzNullVisualization = () => {
  const [mode, setMode] = useState('raw');
  const m = MODES.find(x=>x.id===mode);
  const rows = DATA.filter(m.filter);
  const fmt = (col, val) => {
    if (m.coalesce) {
      if (col==='amount' && val===null) return '₹0 (COALESCE)';
      if (col==='rep'    && val===null) return 'Unassigned (COALESCE)';
    }
    if (val === null) return <span className="sqlfznull-null">NULL</span>;
    return col==='amount' ? `₹${val.toLocaleString()}` : val;
  };

  return (
    <div className="sqlfznull-wrap">
      <header className="sqlfznull-head">
        <span className="sqlfznull-badge">SQL</span>
        <h2>NULL Values</h2>
        <p>The invisible trap — and how to handle it</p>
      </header>

      <div className="sqlfznull-tabs">
        {MODES.map(md=><button key={md.id} className={`sqlfznull-tab ${mode===md.id?'sqlfznull-tab--on':''}`} onClick={()=>setMode(md.id)}>{md.label}</button>)}
      </div>

      <pre className="sqlfznull-code"><code>{m.code}</code></pre>

      <div className="sqlfznull-count">{rows.length} row{rows.length!==1?'s':''} returned</div>

      <div className="sqlfznull-table-wrap">
        <table className="sqlfznull-table">
          <thead><tr><th>id</th><th>city</th><th>amount</th><th>rep</th></tr></thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{fmt('city',r.city)}</td>
                <td>{fmt('amount',r.amount)}</td>
                <td>{fmt('rep',r.rep)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sqlfznull-note">{m.note}</div>
    </div>
  );
};

export default SqlFzNullVisualization;

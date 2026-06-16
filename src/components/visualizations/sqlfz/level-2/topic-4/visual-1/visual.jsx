/* Lesson: Aliases + Calculated Columns with AS
 * Visual type: ILLUSTRATION
 * Show column aliasing and calculated columns in a result table */
import React, { useState } from 'react';
import './visual.css';

const DATA = [
  { id:1, city:'Mumbai',    amount:4200,  category:'Electronics' },
  { id:2, city:'Pune',      amount:1850,  category:'Accessories' },
  { id:3, city:'Delhi',     amount:6700,  category:'Electronics' },
  { id:4, city:'Bengaluru', amount:980,   category:'Accessories' },
  { id:5, city:'Mumbai',    amount:12400, category:'Electronics' },
];

const EXAMPLES = [
  {
    id:'alias_col',
    label:'Column alias',
    code:`SELECT city AS customer_city,
       amount AS order_value
FROM orders;`,
    cols: [
      { header:'customer_city', key:'city' },
      { header:'order_value',   key:'amount', fmt: v=>`₹${v.toLocaleString()}` },
    ],
    note:'AS renames the column header in results. The underlying table column is unchanged. Aliases make reports more readable.',
  },
  {
    id:'calc',
    label:'Calculated column',
    code:`SELECT city, amount,
       ROUND(amount * 0.18, 2) AS gst,
       amount + ROUND(amount * 0.18, 2) AS total_with_gst
FROM orders;`,
    cols: [
      { header:'city',           key:'city' },
      { header:'amount',         key:'amount',  fmt: v=>`₹${v.toLocaleString()}` },
      { header:'gst',            key:'gst',     fmt: v=>`₹${v.toLocaleString()}`, calc: r=>Math.round(r.amount*0.18) },
      { header:'total_with_gst', key:'total',   fmt: v=>`₹${v.toLocaleString()}`, calc: r=>r.amount+Math.round(r.amount*0.18) },
    ],
    note:'You can do arithmetic directly in SELECT. ROUND(val, 2) rounds to 2 decimal places. The result column only exists in the output.',
  },
  {
    id:'alias_table',
    label:'Table alias',
    code:`SELECT o.city, o.amount
FROM orders AS o
WHERE o.amount > 3000;`,
    cols: [
      { header:'city',   key:'city'   },
      { header:'amount', key:'amount', fmt: v=>`₹${v.toLocaleString()}` },
    ],
    filter: r => r.amount > 3000,
    note:"Table aliases (o = orders) save typing in long queries. Becomes essential once you start JOINing multiple tables.",
  },
];

const SqlFzAliasVisualization = () => {
  const [sel, setSel] = useState('calc');
  const ex = EXAMPLES.find(e=>e.id===sel);
  const rows = (ex.filter ? DATA.filter(ex.filter) : DATA).map(r=>({...r,gst:Math.round(r.amount*0.18),total:r.amount+Math.round(r.amount*0.18)}));

  return (
    <div className="sqlfzals-wrap">
      <header className="sqlfzals-head">
        <span className="sqlfzals-badge">SQL</span>
        <h2>Aliases &amp; Calculated Columns</h2>
        <p>Rename columns and compute new ones on the fly</p>
      </header>

      <div className="sqlfzals-tabs">
        {EXAMPLES.map(e=><button key={e.id} className={`sqlfzals-tab ${sel===e.id?'sqlfzals-tab--on':''}`} onClick={()=>setSel(e.id)}>{e.label}</button>)}
      </div>

      <pre className="sqlfzals-code"><code>{ex.code}</code></pre>

      <div className="sqlfzals-table-wrap">
        <table className="sqlfzals-table">
          <thead>
            <tr>{ex.cols.map(c=><th key={c.header}>{c.header}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id}>
                {ex.cols.map(c=>{
                  const val = c.calc ? c.calc(r) : r[c.key];
                  return <td key={c.header} className={c.calc?'sqlfzals-calc':''}>{c.fmt ? c.fmt(val) : val}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sqlfzals-note">{ex.note}</div>
    </div>
  );
};

export default SqlFzAliasVisualization;

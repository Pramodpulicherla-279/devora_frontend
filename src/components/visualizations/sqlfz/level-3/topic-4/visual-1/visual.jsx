/* Lesson: Window Functions — Rank & Running Totals Without GROUP BY
 * Visual type: INTERACTIVE
 * Show ROW_NUMBER, RANK, SUM OVER with partition selector */
import React, { useState } from 'react';
import './visual.css';

const ROWS = [
  {dept:'Sales',   name:'Aisha',    salary:72000},
  {dept:'Sales',   name:'Ravi',     salary:65000},
  {dept:'Sales',   name:'Priya',    salary:72000},
  {dept:'Tech',    name:'Meera',    salary:95000},
  {dept:'Tech',    name:'Arjun',    salary:88000},
  {dept:'Tech',    name:'Divya',    salary:95000},
  {dept:'HR',      name:'Vikram',   salary:58000},
  {dept:'HR',      name:'Sunita',   salary:61000},
];

const computeRows = (fn) => {
  if (fn === 'row_number') {
    const counters = {};
    return ROWS.map(r => {
      counters[r.dept] = (counters[r.dept]||0) + 1;
      return {...r, val: counters[r.dept]};
    });
  }
  if (fn === 'rank') {
    const sorted = {};
    ROWS.forEach(r=>{if(!sorted[r.dept])sorted[r.dept]=[];sorted[r.dept].push(r.salary);});
    Object.keys(sorted).forEach(d=>sorted[d].sort((a,b)=>b-a));
    return ROWS.map(r=>{
      const idx = sorted[r.dept].indexOf(r.salary);
      return {...r, val: idx+1};
    });
  }
  if (fn === 'running') {
    const totals = {};
    return ROWS.map(r => {
      totals[r.dept] = (totals[r.dept]||0) + r.salary;
      return {...r, val: totals[r.dept]};
    });
  }
  return ROWS.map(r=>({...r,val:'?'}));
};

const FNS = [
  {
    id:'row_number',
    label:'ROW_NUMBER()',
    code:`SELECT dept, name, salary,
  ROW_NUMBER() OVER (
    PARTITION BY dept
    ORDER BY salary DESC
  ) AS row_num
FROM employees;`,
    col:'row_num',
    note:'ROW_NUMBER() assigns a unique sequential number within each partition (dept). Even ties get different numbers.',
  },
  {
    id:'rank',
    label:'RANK()',
    code:`SELECT dept, name, salary,
  RANK() OVER (
    PARTITION BY dept
    ORDER BY salary DESC
  ) AS rnk
FROM employees;`,
    col:'rnk',
    note:'RANK() gives tied salaries the same rank and skips numbers. Aisha and Priya both get rank 1; next rank is 3.',
  },
  {
    id:'running',
    label:'SUM() OVER (running total)',
    code:`SELECT dept, name, salary,
  SUM(salary) OVER (
    PARTITION BY dept
    ORDER BY name
    ROWS UNBOUNDED PRECEDING
  ) AS running_total
FROM employees;`,
    col:'running_total',
    note:'SUM OVER with ROWS UNBOUNDED PRECEDING keeps a running total that resets per department — no GROUP BY needed.',
  },
];

const SqlFzWindowVisualization = () => {
  const [sel, setSel] = useState('row_number');
  const fn = FNS.find(f=>f.id===sel);
  const data = computeRows(sel);

  const fmtVal = (fn, val) => fn === 'running' ? `₹${val.toLocaleString()}` : val;

  return (
    <div className="sqlfzwin-wrap">
      <header className="sqlfzwin-head">
        <span className="sqlfzwin-badge">SQL</span>
        <h2>Window Functions</h2>
        <p>Calculations across related rows — without collapsing them</p>
      </header>

      <div className="sqlfzwin-tabs">
        {FNS.map(f=><button key={f.id} className={`sqlfzwin-tab ${sel===f.id?'sqlfzwin-tab--on':''}`} onClick={()=>setSel(f.id)}>{f.label}</button>)}
      </div>

      <pre className="sqlfzwin-code"><code>{fn.code}</code></pre>

      <div className="sqlfzwin-table-wrap">
        <table className="sqlfzwin-table">
          <thead>
            <tr>
              <th>dept</th>
              <th>name</th>
              <th>salary</th>
              <th className="sqlfzwin-th-hi">{fn.col}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r,i)=>(
              <tr key={i} className={i>0&&data[i-1].dept!==r.dept?'sqlfzwin-tr-sep':''}>
                <td>{r.dept}</td>
                <td>{r.name}</td>
                <td>₹{r.salary.toLocaleString()}</td>
                <td className="sqlfzwin-td-hi">{fmtVal(sel,r.val)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sqlfzwin-note">{fn.note}</div>
    </div>
  );
};

export default SqlFzWindowVisualization;

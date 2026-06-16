/* Lesson: Merging and Joining DataFrames — The Pandas JOIN
 * Visual type: ILLUSTRATION
 * Click join type — see which rows from each table appear in result */
import React, { useState } from 'react';
import './visual.css';

const LEFT = [
  { rep: 'Aisha',  amount: 16180 },
  { rep: 'Ravi',   amount: 14300 },
  { rep: 'Priya',  amount: 9000  },
  { rep: 'Karan',  amount: 5200  },
];
const RIGHT = [
  { rep: 'Aisha', target: 500000, region: 'West'  },
  { rep: 'Ravi',  target: 420000, region: 'South' },
  { rep: 'Priya', target: 380000, region: 'North' },
  { rep: 'Meera', target: 300000, region: 'East'  },
];

const JOINS = [
  {
    id: 'inner',
    label: 'inner (default)',
    code: "pd.merge(orders, targets, on='rep', how='inner')",
    leftIn:  ['Aisha','Ravi','Priya'],
    rightIn: ['Aisha','Ravi','Priya'],
    desc: 'Only rows present in BOTH tables. Karan (no target) and Meera (no orders) are dropped.',
  },
  {
    id: 'left',
    label: 'left',
    code: "pd.merge(orders, targets, on='rep', how='left')",
    leftIn:  ['Aisha','Ravi','Priya','Karan'],
    rightIn: ['Aisha','Ravi','Priya'],
    desc: 'All rows from the LEFT table. Karan gets NaN for target/region. Meera is excluded.',
  },
  {
    id: 'right',
    label: 'right',
    code: "pd.merge(orders, targets, on='rep', how='right')",
    leftIn:  ['Aisha','Ravi','Priya'],
    rightIn: ['Aisha','Ravi','Priya','Meera'],
    desc: 'All rows from the RIGHT table. Meera gets NaN for amount. Karan is excluded.',
  },
  {
    id: 'outer',
    label: 'outer',
    code: "pd.merge(orders, targets, on='rep', how='outer')",
    leftIn:  ['Aisha','Ravi','Priya','Karan'],
    rightIn: ['Aisha','Ravi','Priya','Meera'],
    desc: 'ALL rows from both tables. Karan has NaN target; Meera has NaN amount.',
  },
];

const PdMergeJoinVisualization = () => {
  const [sel, setSel] = useState('inner');
  const j = JOINS.find(x => x.id === sel);

  const matched = LEFT.filter(l => j.leftIn.includes(l.rep)).map(l => {
    const r = RIGHT.find(x => x.rep === l.rep);
    return { rep: l.rep, amount: l.amount, target: r?.target ?? null, region: r?.region ?? null };
  });
  const rightOnly = j.rightIn.filter(r => !j.leftIn.includes(r));
  rightOnly.forEach(rep => {
    const r = RIGHT.find(x => x.rep === rep);
    matched.push({ rep, amount: null, target: r.target, region: r.region });
  });

  return (
    <div className="pdmerge-wrap">
      <header className="pdmerge-head">
        <span className="pdmerge-badge">Pandas &amp; NumPy</span>
        <h2>Merging DataFrames</h2>
        <p>Highlighted cells = matched · grey = NaN</p>
      </header>

      <div className="pdmerge-source-row">
        <div className="pdmerge-src">
          <div className="pdmerge-src-label">orders</div>
          <table className="pdmerge-src-table">
            <thead><tr><th>rep</th><th>amount</th></tr></thead>
            <tbody>{LEFT.map(r=><tr key={r.rep} className={j.leftIn.includes(r.rep)?'pdmerge-tr--in':'pdmerge-tr--out'}><td>{r.rep}</td><td>₹{r.amount.toLocaleString()}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="pdmerge-plus">⊕</div>
        <div className="pdmerge-src">
          <div className="pdmerge-src-label">targets</div>
          <table className="pdmerge-src-table">
            <thead><tr><th>rep</th><th>target</th><th>region</th></tr></thead>
            <tbody>{RIGHT.map(r=><tr key={r.rep} className={j.rightIn.includes(r.rep)?'pdmerge-tr--in':'pdmerge-tr--out'}><td>{r.rep}</td><td>₹{r.target.toLocaleString()}</td><td>{r.region}</td></tr>)}</tbody>
          </table>
        </div>
      </div>

      <div className="pdmerge-tabs">
        {JOINS.map(jj=><button key={jj.id} className={`pdmerge-tab ${sel===jj.id?'pdmerge-tab--on':''}`} onClick={()=>setSel(jj.id)}>{jj.label}</button>)}
      </div>

      <pre className="pdmerge-code"><code>{j.code}</code></pre>

      <div className="pdmerge-result-label">Result →</div>
      <div className="pdmerge-table-wrap">
        <table className="pdmerge-table">
          <thead><tr><th>rep</th><th>amount</th><th>target</th><th>region</th></tr></thead>
          <tbody>
            {matched.map(r=>(
              <tr key={r.rep}>
                <td>{r.rep}</td>
                <td className={r.amount===null?'pdmerge-nan':''}>{r.amount===null?'NaN':`₹${r.amount.toLocaleString()}`}</td>
                <td className={r.target===null?'pdmerge-nan':''}>{r.target===null?'NaN':`₹${r.target.toLocaleString()}`}</td>
                <td className={r.region===null?'pdmerge-nan':''}>{r.region??'NaN'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pdmerge-note">{j.desc}</div>
    </div>
  );
};

export default PdMergeJoinVisualization;

/* Lesson: COUNT, SUM, AVG, MIN, MAX
 * Visual type: INTERACTIVE
 * Select an aggregate function — see the query and numeric result */
import React, { useState } from 'react';
import './visual.css';

const AMOUNTS = [4200, 1850, 6700, 980, 12400, 2300, 7800, 450];
const CITIES  = ['Mumbai','Pune','Delhi','Bengaluru','Mumbai','Hyderabad','Pune','Delhi'];
const DATA    = AMOUNTS.map((a,i)=>({id:i+1,city:CITIES[i],amount:a}));

const FUNCS = [
  { id:'count', fn:'COUNT(*)',      label:'Count rows',       result: DATA.length,                                        fmt: v=>`${v} rows`,              note:'Counts all rows including NULLs. COUNT(amount) skips NULLs.' },
  { id:'sum',   fn:'SUM(amount)',   label:'Total revenue',    result: AMOUNTS.reduce((s,a)=>s+a,0),                       fmt: v=>`₹${v.toLocaleString()}`,  note:'Adds all non-NULL values. The most common aggregate for revenue analysis.' },
  { id:'avg',   fn:'AVG(amount)',   label:'Average order',    result: Math.round(AMOUNTS.reduce((s,a)=>s+a,0)/AMOUNTS.length), fmt: v=>`₹${v.toLocaleString()}`, note:'Mean of non-NULL values. Be careful — outliers skew AVG significantly.' },
  { id:'min',   fn:'MIN(amount)',   label:'Smallest order',   result: Math.min(...AMOUNTS),                               fmt: v=>`₹${v.toLocaleString()}`,  note:'Returns the lowest value. Works on numbers, strings, and dates.' },
  { id:'max',   fn:'MAX(amount)',   label:'Largest order',    result: Math.max(...AMOUNTS),                               fmt: v=>`₹${v.toLocaleString()}`,  note:'Returns the highest value. Use both MIN and MAX to understand the range.' },
];

const SqlFzAggVisualization = () => {
  const [sel, setSel] = useState('sum');
  const f = FUNCS.find(x=>x.id===sel);
  const code = `SELECT ${f.fn} AS result\nFROM orders;`;

  const max = Math.max(...AMOUNTS);
  return (
    <div className="sqlfzagg-wrap">
      <header className="sqlfzagg-head">
        <span className="sqlfzagg-badge">SQL</span>
        <h2>Aggregate Functions</h2>
        <p>Turn a column of numbers into a single answer</p>
      </header>

      <div className="sqlfzagg-fns">
        {FUNCS.map(fn=>(
          <button key={fn.id} className={`sqlfzagg-fn ${sel===fn.id?'sqlfzagg-fn--on':''}`} onClick={()=>setSel(fn.id)}>
            <code className="sqlfzagg-fn-name">{fn.fn}</code>
            <span className="sqlfzagg-fn-label">{fn.label}</span>
          </button>
        ))}
      </div>

      <pre className="sqlfzagg-code"><code>{code}</code></pre>

      <div className="sqlfzagg-chart">
        {DATA.map((row,i)=>{
          const highlighted = sel==='min' ? row.amount===Math.min(...AMOUNTS) :
                              sel==='max' ? row.amount===Math.max(...AMOUNTS) : true;
          return (
            <div key={row.id} className="sqlfzagg-bar-item">
              <div className="sqlfzagg-bar-wrap">
                <div className={`sqlfzagg-bar ${highlighted?'sqlfzagg-bar--hi':''}`} style={{height:`${(row.amount/max)*80}px`}} />
              </div>
              <div className="sqlfzagg-bar-city">{row.city.substring(0,3)}</div>
            </div>
          );
        })}
      </div>

      <div className="sqlfzagg-result">
        <span className="sqlfzagg-result-label">Result</span>
        <span className="sqlfzagg-result-value">{f.fmt(f.result)}</span>
      </div>

      <div className="sqlfzagg-note">{f.note}</div>
    </div>
  );
};

export default SqlFzAggVisualization;

/* Lesson: Subqueries — Queries Inside Queries
 * Visual type: ILLUSTRATION
 * Show 3 uses: WHERE subquery, FROM subquery, SELECT scalar subquery */
import React, { useState } from 'react';
import './visual.css';

const AMOUNTS = [4200, 1850, 6700, 980, 12400, 2300, 7800];
const CITIES  = ['Mumbai','Pune','Delhi','Bengaluru','Mumbai','Hyderabad','Pune'];
const DATA = AMOUNTS.map((a,i)=>({id:i+1,city:CITIES[i],amount:a}));
const AVG = Math.round(AMOUNTS.reduce((s,v)=>s+v,0)/AMOUNTS.length);

const EXAMPLES = [
  {
    id: 'where',
    label: 'Subquery in WHERE',
    code: `SELECT city, amount
FROM orders
WHERE amount > (
    SELECT AVG(amount) FROM orders
);
-- Inner query first: AVG = ₹${AVG.toLocaleString()}
-- Then outer query filters on that`,
    rows: DATA.filter(r=>r.amount>AVG),
    note: `The inner query runs first and returns ₹${AVG.toLocaleString()}. The outer query then uses that as a threshold. You can't write WHERE amount > AVG(amount) directly.`,
  },
  {
    id: 'from',
    label: 'Subquery in FROM',
    code: `SELECT city, city_total
FROM (
    SELECT city, SUM(amount) AS city_total
    FROM orders
    GROUP BY city
) AS city_summary
WHERE city_total > 5000;`,
    rows: (() => {
      const g = {};
      DATA.forEach(r=>{if(!g[r.city])g[r.city]=0;g[r.city]+=r.amount;});
      return Object.entries(g).filter(([,t])=>t>5000).map(([city,total])=>({id:city,city,amount:total}));
    })(),
    note: "The subquery in FROM (a 'derived table') creates a temporary result set. You then query that result set as if it were a table.",
  },
  {
    id: 'scalar',
    label: 'Scalar subquery',
    code: `SELECT city, amount,
  amount - (SELECT AVG(amount) FROM orders) AS vs_avg
FROM orders
ORDER BY vs_avg DESC;`,
    rows: DATA.map(r=>({...r,vs_avg:r.amount-AVG})).sort((a,b)=>b.vs_avg-a.vs_avg),
    note: 'A scalar subquery returns exactly one value and can appear in SELECT. Here it computes how each order compares to the average.',
  },
];

const SqlFzSubqueriesVisualization = () => {
  const [sel, setSel] = useState('where');
  const ex = EXAMPLES.find(e=>e.id===sel);

  return (
    <div className="sqlfzsub-wrap">
      <header className="sqlfzsub-head">
        <span className="sqlfzsub-badge">SQL</span>
        <h2>Subqueries</h2>
        <p>A query inside another query — three ways to use it</p>
      </header>

      <div className="sqlfzsub-tabs">
        {EXAMPLES.map(e=><button key={e.id} className={`sqlfzsub-tab ${sel===e.id?'sqlfzsub-tab--on':''}`} onClick={()=>setSel(e.id)}>{e.label}</button>)}
      </div>

      <pre className="sqlfzsub-code"><code>{ex.code}</code></pre>

      <div className="sqlfzsub-table-wrap">
        <table className="sqlfzsub-table">
          <thead>
            <tr>
              <th>city</th>
              <th>{sel==='scalar'?'amount':'amount / total'}</th>
              {sel==='scalar' && <th>vs avg</th>}
            </tr>
          </thead>
          <tbody>
            {ex.rows.map((r,i)=>(
              <tr key={i}>
                <td>{r.city}</td>
                <td>₹{r.amount.toLocaleString()}</td>
                {sel==='scalar' && <td className={r.vs_avg>=0?'sqlfzsub-pos':'sqlfzsub-neg'}>{r.vs_avg>=0?'+':''}₹{r.vs_avg.toLocaleString()}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sqlfzsub-note">{ex.note}</div>
    </div>
  );
};

export default SqlFzSubqueriesVisualization;

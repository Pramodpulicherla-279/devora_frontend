/* Lesson: CTEs — Common Table Expressions, Readable Complex Queries
 * Visual type: BUILDER
 * Toggle each CTE step, show what it produces, then show final query */
import React, { useState } from 'react';
import './visual.css';

const RAW = [
  {order_id:1, customer:'Aisha',  product:'Laptop',  amount:45000, status:'completed'},
  {order_id:2, customer:'Ravi',   product:'Phone',   amount:18000, status:'cancelled'},
  {order_id:3, customer:'Priya',  product:'Laptop',  amount:45000, status:'completed'},
  {order_id:4, customer:'Meera',  product:'Tablet',  amount:22000, status:'completed'},
  {order_id:5, customer:'Aisha',  product:'Headset', amount: 5500, status:'completed'},
  {order_id:6, customer:'Arjun',  product:'Phone',   amount:18000, status:'refunded'},
  {order_id:7, customer:'Priya',  product:'Tablet',  amount:22000, status:'completed'},
  {order_id:8, customer:'Meera',  product:'Laptop',  amount:45000, status:'completed'},
];

const STEPS = [
  {
    id:'cte1',
    name:'completed_orders',
    title:'Step 1 — CTE: completed_orders',
    code:`WITH completed_orders AS (
  SELECT *
  FROM orders
  WHERE status = 'completed'
)`,
    result: RAW.filter(r=>r.status==='completed'),
    cols:['order_id','customer','product','amount'],
    note:"First CTE: filter to completed orders only. This becomes a named temporary table.",
  },
  {
    id:'cte2',
    name:'customer_totals',
    title:'Step 2 — CTE: customer_totals',
    code:`customer_totals AS (
  SELECT customer,
    SUM(amount) AS total_spent
  FROM completed_orders
  GROUP BY customer
)`,
    result:(() => {
      const g={};
      RAW.filter(r=>r.status==='completed').forEach(r=>{g[r.customer]=(g[r.customer]||0)+r.amount;});
      return Object.entries(g).map(([customer,total_spent])=>({customer,total_spent}));
    })(),
    cols:['customer','total_spent'],
    note:'Second CTE references the first. It totals spending per customer — built on top of the filtered data.',
  },
  {
    id:'final',
    name:'Final query',
    title:'Step 3 — Final SELECT',
    code:`SELECT customer, total_spent
FROM customer_totals
WHERE total_spent > 40000
ORDER BY total_spent DESC;`,
    result:(() => {
      const g={};
      RAW.filter(r=>r.status==='completed').forEach(r=>{g[r.customer]=(g[r.customer]||0)+r.amount;});
      return Object.entries(g).filter(([,t])=>t>40000).map(([customer,total_spent])=>({customer,total_spent})).sort((a,b)=>b.total_spent-a.total_spent);
    })(),
    cols:['customer','total_spent'],
    note:'The final SELECT queries customer_totals as if it were a real table. Clean, readable, no nesting.',
  },
];

const FULL_CODE = `WITH completed_orders AS (
  SELECT *
  FROM orders
  WHERE status = 'completed'
),
customer_totals AS (
  SELECT customer,
    SUM(amount) AS total_spent
  FROM completed_orders
  GROUP BY customer
)
SELECT customer, total_spent
FROM customer_totals
WHERE total_spent > 40000
ORDER BY total_spent DESC;`;

const SqlFzCteVisualization = () => {
  const [sel, setSel] = useState('cte1');
  const [full, setFull] = useState(false);
  const step = STEPS.find(s=>s.id===sel);

  return (
    <div className="sqlfzcte-wrap">
      <header className="sqlfzcte-head">
        <span className="sqlfzcte-badge">SQL</span>
        <h2>CTEs — Common Table Expressions</h2>
        <p>Break complex queries into named, readable steps</p>
      </header>

      <div className="sqlfzcte-tabs">
        {STEPS.map(s=><button key={s.id} className={`sqlfzcte-tab ${sel===s.id?'sqlfzcte-tab--on':''}`} onClick={()=>setSel(s.id)}>{s.name}</button>)}
        <button className={`sqlfzcte-tab sqlfzcte-tab-full ${full?'sqlfzcte-tab--on':''}`} onClick={()=>setFull(f=>!f)}>full query</button>
      </div>

      {full ? (
        <pre className="sqlfzcte-code"><code>{FULL_CODE}</code></pre>
      ) : (
        <>
          <div className="sqlfzcte-step-title">{step.title}</div>
          <pre className="sqlfzcte-code"><code>{step.code}</code></pre>
          <div className="sqlfzcte-table-wrap">
            <table className="sqlfzcte-table">
              <thead><tr>{step.cols.map(c=><th key={c}>{c}</th>)}</tr></thead>
              <tbody>
                {step.result.map((r,i)=>(
                  <tr key={i}>
                    {step.cols.map(c=>(
                      <td key={c}>
                        {c==='total_spent'||c==='amount' ? `₹${r[c].toLocaleString()}` : r[c]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="sqlfzcte-note">{step.note}</div>
        </>
      )}
    </div>
  );
};

export default SqlFzCteVisualization;

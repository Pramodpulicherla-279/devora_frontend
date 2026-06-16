/* Lesson: Feature Engineering and SQL Analysis
 * Visual: Tabs showing SQL queries and result preview */
import React, { useState } from 'react';
import './visual.css';

const ANALYSES = [
  {
    id:'revenue',
    label:'Q1: Revenue by category',
    sql:`SELECT category,
  SUM(amount) AS total_revenue,
  ROUND(AVG(amount),0) AS avg_order,
  COUNT(*) AS num_orders
FROM orders
WHERE STRFTIME('%Y', date) = '2024'
GROUP BY category
ORDER BY total_revenue DESC;`,
    result:[
      {category:'Electronics',total_revenue:'₹8,42,000',avg_order:'₹4,210',num_orders:200},
      {category:'Furniture',  total_revenue:'₹5,31,000',avg_order:'₹2,950',num_orders:180},
      {category:'Clothing',   total_revenue:'₹3,18,000',avg_order:'₹1,590',num_orders:200},
    ],
    insight:'Electronics generates 47% of revenue on 33% of orders — highest AOV. Focus marketing here.',
  },
  {
    id:'monthly',
    label:'Q2: Monthly trend',
    sql:`SELECT STRFTIME('%Y-%m', date) AS month,
  SUM(amount) AS revenue,
  COUNT(*) AS orders
FROM orders
GROUP BY month
ORDER BY month;`,
    result:[
      {month:'2024-01',revenue:'₹1,42,000',orders:85},{month:'2024-02',revenue:'₹1,38,000',orders:81},
      {month:'2024-03',revenue:'₹1,61,000',orders:92},{month:'2024-04',revenue:'₹1,79,000',orders:99},
    ],
    insight:'Revenue grows month-over-month in 2024. March spike aligns with end-of-quarter corporate orders.',
  },
  {
    id:'feature',
    label:'Feature: is_high_value',
    sql:`ALTER TABLE orders ADD COLUMN is_high_value INTEGER;

UPDATE orders
SET is_high_value = CASE
  WHEN amount > (SELECT AVG(amount)*1.5 FROM orders) THEN 1
  ELSE 0
END;

-- Feature: 1 if order > 1.5× mean amount`,
    result:[
      {id:1,amount:'₹6,200',is_high_value:1},{id:2,amount:'₹1,800',is_high_value:0},
      {id:3,amount:'₹9,100',is_high_value:1},{id:4,amount:'₹2,400',is_high_value:0},
    ],
    insight:'is_high_value flags the top ~22% of orders. This becomes a target variable for the prediction model in Q5.',
  },
];

const CapSqlAnalysisVisualization = () => {
  const [sel, setSel] = useState('revenue');
  const a = ANALYSES.find(x=>x.id===sel);
  const cols = Object.keys(a.result[0]);
  return (
    <div className="capsql-wrap">
      <header className="capsql-head">
        <span className="capsql-badge">Capstone</span>
        <h2>Feature Engineering & SQL</h2>
        <p>Queries that answer business questions + create model features</p>
      </header>
      <div className="capsql-tabs">
        {ANALYSES.map(a=><button key={a.id} className={`capsql-tab ${sel===a.id?'capsql-tab--on':''}`} onClick={()=>setSel(a.id)}>{a.label}</button>)}
      </div>
      <pre className="capsql-code"><code>{a.sql}</code></pre>
      <div className="capsql-table-wrap">
        <table className="capsql-table">
          <thead><tr>{cols.map(c=><th key={c}>{c}</th>)}</tr></thead>
          <tbody>{a.result.map((r,i)=><tr key={i}>{cols.map(c=><td key={c}>{r[c]}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <div className="capsql-insight"><strong>Insight:</strong> {a.insight}</div>
    </div>
  );
};
export default CapSqlAnalysisVisualization;

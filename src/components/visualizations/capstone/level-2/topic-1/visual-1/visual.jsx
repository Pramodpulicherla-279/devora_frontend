/* Lesson: Feature Engineering and SQL Analysis (Capstone — answering Q1 & Q2)
 * Visual: Two-stage workflow — engineer features from raw columns, then run SQL aggregations */
import React, { useState } from 'react';
import './visual.css';

const RAW = [
  { order: 1001, sales: 240, profit: 36, discount: 0.0, date: '2023-11-04' },
  { order: 1002, sales: 90, profit: -12, discount: 0.4, date: '2023-07-21' },
  { order: 1003, sales: 520, profit: 130, discount: 0.1, date: '2023-12-15' },
];

const FEATURES = [
  { name: 'profit_margin', expr: 'profit / sales', why: 'Normalises profit so orders are comparable' },
  { name: 'discount_band', expr: "cut(discount, [0,.1,.3,1])", why: 'Buckets discounts for group analysis' },
  { name: 'order_quarter', expr: 'QUARTER(date)', why: 'Enables the Q1 "by time" question' },
  { name: 'is_profitable', expr: 'profit > 0', why: 'Target label for the later ML model' },
];

const QUERIES = [
  {
    id: 'q1', label: 'Q1 · Profitability by category',
    sql: `SELECT category,
       ROUND(SUM(profit), 0)        AS total_profit,
       ROUND(AVG(profit_margin), 3) AS avg_margin
FROM   orders
GROUP  BY category
ORDER  BY total_profit DESC;`,
    rows: [['Electronics', '+48,200', '0.182'], ['Furniture', '+9,400', '0.061'], ['Tables', '-3,100', '-0.042']],
    cols: ['category', 'total_profit', 'avg_margin'],
    finding: 'Tables lose money on average — a chronic loss-maker.',
  },
  {
    id: 'q2', label: 'Q2 · Profitability by time',
    sql: `SELECT order_quarter,
       ROUND(SUM(sales), 0)  AS revenue,
       ROUND(SUM(profit), 0) AS profit
FROM   orders
GROUP  BY order_quarter
ORDER  BY order_quarter;`,
    rows: [['Q1', '120,400', '14,900'], ['Q2', '131,800', '15,600'], ['Q3', '128,500', '9,200'], ['Q4', '188,300', '31,700']],
    cols: ['quarter', 'revenue', 'profit'],
    finding: 'Q4 revenue and profit spike well above the other quarters.',
  },
];

export default function CapSqlAnalysisVisualization() {
  const [stage, setStage] = useState('engineer');
  const [q, setQ] = useState('q1');
  const query = QUERIES.find(x => x.id === q);

  return (
    <div className="capsql-wrap">
      <div className="capsql-head">
        <span className="capsql-badge">CAPSTONE · STEP 5</span>
        <h2>Feature Engineering &amp; SQL Analysis</h2>
        <p>Turn a raw transaction table into structured findings (Q1 &amp; Q2)</p>
      </div>

      <div className="capsql-tabs" style={{ flexDirection: 'row' }}>
        <button className={`capsql-tab ${stage === 'engineer' ? 'capsql-tab--on' : ''}`} onClick={() => setStage('engineer')}>1 · Engineer features</button>
        <button className={`capsql-tab ${stage === 'sql' ? 'capsql-tab--on' : ''}`} onClick={() => setStage('sql')}>2 · SQL analysis</button>
      </div>

      {stage === 'engineer' ? (
        <>
          <div className="capsql-label">Raw transactions</div>
          <div className="capsql-table">
            <div className="capsql-row capsql-row--head"><span>order</span><span>sales</span><span>profit</span><span>discount</span><span>date</span></div>
            {RAW.map(r => (
              <div className="capsql-row" key={r.order}><span>{r.order}</span><span>{r.sales}</span><span>{r.profit}</span><span>{r.discount}</span><span>{r.date}</span></div>
            ))}
          </div>
          <div className="capsql-arrow">↓ derive features</div>
          <div className="capsql-features">
            {FEATURES.map(f => (
              <div className="capsql-feat" key={f.name}>
                <code className="capsql-feat-name">{f.name}</code>
                <code className="capsql-feat-expr">= {f.expr}</code>
                <span className="capsql-feat-why">{f.why}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="capsql-tabs" style={{ flexDirection: 'row' }}>
            {QUERIES.map(x => (
              <button key={x.id} className={`capsql-tab ${q === x.id ? 'capsql-tab--on' : ''}`} onClick={() => setQ(x.id)}>{x.label}</button>
            ))}
          </div>
          <pre className="capsql-code">{query.sql}</pre>
          <div className="capsql-table">
            <div className="capsql-row capsql-row--head">{query.cols.map(c => <span key={c}>{c}</span>)}</div>
            {query.rows.map((r, i) => (
              <div className="capsql-row" key={i}>{r.map((cell, j) => <span key={j}>{cell}</span>)}</div>
            ))}
          </div>
          <div className="capsql-finding">📌 {query.finding}</div>
        </>
      )}
    </div>
  );
}

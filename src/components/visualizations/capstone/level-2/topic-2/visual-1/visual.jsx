/* Lesson: Python + Pandas Analysis
 * Visual: 4 analysis cards with code + chart/table result */
import React, { useState } from 'react';
import './visual.css';

const ANALYSES = [
  {
    id:'q3',
    label:'Q3: Regional breakdown',
    code:`region_rev = (df.groupby('region')['amount']\n  .agg(['sum','mean','count'])\n  .round(0)\n  .sort_values('sum', ascending=False))`,
    result:[
      {region:'North',sum:'₹4,21,000',mean:'₹2,800',count:150},
      {region:'South',sum:'₹3,89,000',mean:'₹2,430',count:160},
      {region:'East', sum:'₹2,71,000',mean:'₹2,260',count:120},
      {region:'West', sum:'₹2,10,000',mean:'₹2,100',count:100},
    ],
    insight:'North leads on total revenue but South has the most orders — North has higher AOV.',
  },
  {
    id:'q4',
    label:'Q4: Discount impact',
    code:`df['discount_band'] = pd.cut(df['discount_pct'],\n  bins=[0,5,15,30,100],\n  labels=['0-5%','5-15%','15-30%','>30%'])\n\ndf.groupby('discount_band')['amount'].mean()`,
    result:[
      {discount_band:'0-5%',  mean_amount:'₹4,200'},
      {discount_band:'5-15%', mean_amount:'₹3,600'},
      {discount_band:'15-30%',mean_amount:'₹2,900'},
      {discount_band:'>30%',  mean_amount:'₹1,800'},
    ],
    insight:'Steeper discounts correlate with lower order amounts — discounts may attract lower-value orders, not grow existing ones.',
  },
];

const CapPandasVisualization = () => {
  const [sel, setSel] = useState('q3');
  const a = ANALYSES.find(x=>x.id===sel);
  const cols = Object.keys(a.result[0]);
  return (
    <div className="cappd-wrap">
      <header className="cappd-head">
        <span className="cappd-badge">Capstone</span>
        <h2>Python + Pandas Analysis</h2>
        <p>GroupBy, cut, and aggregation to answer deeper questions</p>
      </header>
      <div className="cappd-tabs">
        {ANALYSES.map(a=><button key={a.id} className={`cappd-tab ${sel===a.id?'cappd-tab--on':''}`} onClick={()=>setSel(a.id)}>{a.label}</button>)}
      </div>
      <pre className="cappd-code"><code>{a.code}</code></pre>
      <div className="cappd-table-wrap">
        <table className="cappd-table">
          <thead><tr>{cols.map(c=><th key={c}>{c}</th>)}</tr></thead>
          <tbody>{a.result.map((r,i)=><tr key={i}>{cols.map(c=><td key={c}>{r[c]}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <div className="cappd-insight"><strong>Insight:</strong> {a.insight}</div>
    </div>
  );
};
export default CapPandasVisualization;

/* Lesson: Scatter Plots — Finding Relationships
 * Visual: Toggle correlation pattern, see scatter + trend label */
import React, { useState } from 'react';
import './visual.css';

const PATTERNS = [
  {
    id:'positive', label:'Positive', color:'#56d364',
    points: [[30,120],[60,100],[90,80],[110,68],[140,50],[165,40],[195,28],[220,18],[250,10]],
    trend:'r ≈ +0.95 — Strong positive correlation',
    note:'As ad spend increases, revenue increases too. Scatter + trend line reveals this pattern instantly.',
    code:`plt.scatter(ad_spend, revenue, alpha=0.6, color='mediumseagreen')\nplt.xlabel('Ad Spend (₹)')\nplt.ylabel('Revenue (₹)')`,
  },
  {
    id:'negative', label:'Negative', color:'#f85149',
    points: [[30,18],[60,28],[90,40],[110,55],[140,65],[165,80],[195,100],[220,112],[250,125]],
    trend:'r ≈ −0.91 — Strong negative correlation',
    note:'As support tickets increase, customer satisfaction drops. Scatter shows this inverse relationship clearly.',
    code:`plt.scatter(tickets, satisfaction, alpha=0.6, color='salmon')\nplt.xlabel('Support Tickets')\nplt.ylabel('Satisfaction Score')`,
  },
  {
    id:'none', label:'No correlation', color:'#a78bfa',
    points: [[40,80],[80,40],[120,110],[155,30],[180,90],[210,55],[240,100],[270,45],[295,75]],
    trend:'r ≈ 0.03 — No correlation',
    note:"The points scatter randomly — no pattern. You can't predict one variable from the other.",
    code:`plt.scatter(shoe_size, iq, alpha=0.6, color='mediumpurple')\nplt.xlabel('Shoe Size')\nplt.ylabel('IQ Score')`,
  },
];

const DvScatterVisualization = () => {
  const [sel, setSel] = useState('positive');
  const p = PATTERNS.find(x=>x.id===sel);
  return (
    <div className="dvsc-wrap">
      <header className="dvsc-head">
        <span className="dvsc-badge">Matplotlib</span>
        <h2>Scatter Plots</h2>
        <p>See the shape of the relationship between two variables</p>
      </header>
      <div className="dvsc-tabs">
        {PATTERNS.map(x=><button key={x.id} className={`dvsc-tab ${sel===x.id?'dvsc-tab--on':''}`} style={sel===x.id?{borderColor:x.color,color:x.color}:{}} onClick={()=>setSel(x.id)}>{x.label}</button>)}
      </div>
      <svg viewBox="0 0 310 145" xmlns="http://www.w3.org/2000/svg" className="dvsc-svg">
        {p.points.map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="5" fill={p.color} opacity="0.75"/>)}
        {sel!=='none' && (
          <line
            x1={p.points[0][0]} y1={p.points[0][1]}
            x2={p.points[p.points.length-1][0]} y2={p.points[p.points.length-1][1]}
            stroke={p.color} strokeWidth="1.5" strokeDasharray="5 3" opacity="0.5"/>
        )}
        <line x1="25" y1="5" x2="25" y2="135" stroke="#30363d"/>
        <line x1="25" y1="135" x2="305" y2="135" stroke="#30363d"/>
      </svg>
      <div className="dvsc-label" style={{color:p.color}}>{p.trend}</div>
      <pre className="dvsc-code"><code>{p.code}</code></pre>
      <div className="dvsc-note">{p.note}</div>
    </div>
  );
};
export default DvScatterVisualization;

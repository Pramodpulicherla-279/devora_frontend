/* Lesson: Line and Bar Charts
 * Visual: Toggle chart type with Python code snippet */
import React, { useState } from 'react';
import './visual.css';

const DATA = [
  {month:'Jan',revenue:42000},{month:'Feb',revenue:38000},{month:'Mar',revenue:51000},
  {month:'Apr',revenue:47000},{month:'May',revenue:29000},{month:'Jun',revenue:62000},
];
const MAX = 65000;

const TYPES = [
  {
    id:'bar', label:'Bar chart', color:'#58a6ff',
    code:`import matplotlib.pyplot as plt

months  = ['Jan','Feb','Mar','Apr','May','Jun']
revenue = [42000,38000,51000,47000,29000,62000]

plt.figure(figsize=(8, 5))
plt.bar(months, revenue, color='steelblue')
plt.title('Monthly Revenue')
plt.ylabel('Revenue (₹)')
plt.tight_layout()
plt.show()`,
    note:"plt.bar() — great for comparing discrete categories. Use when the order doesn't imply a sequence.",
  },
  {
    id:'line', label:'Line chart', color:'#56d364',
    code:`import matplotlib.pyplot as plt

months  = ['Jan','Feb','Mar','Apr','May','Jun']
revenue = [42000,38000,51000,47000,29000,62000]

plt.figure(figsize=(8, 5))
plt.plot(months, revenue, marker='o', color='mediumseagreen', linewidth=2)
plt.title('Revenue Trend')
plt.ylabel('Revenue (₹)')
plt.tight_layout()
plt.show()`,
    note:"plt.plot() — emphasizes trend and direction. Use when the x-axis represents time or an ordered sequence.",
  },
  {
    id:'hbar', label:'Horizontal bar', color:'#a78bfa',
    code:`import matplotlib.pyplot as plt

months  = ['Jan','Feb','Mar','Apr','May','Jun']
revenue = [42000,38000,51000,47000,29000,62000]

plt.figure(figsize=(8, 5))
plt.barh(months, revenue, color='mediumpurple')
plt.title('Revenue by Month')
plt.xlabel('Revenue (₹)')
plt.tight_layout()
plt.show()`,
    note:"plt.barh() — horizontal bars for long category names. Better readability when labels would overlap vertically.",
  },
];

const DvLineBarVisualization = () => {
  const [sel, setSel] = useState('bar');
  const t = TYPES.find(x=>x.id===sel);
  const pts = DATA.map((d,i)=>`${30+i*52+11},${155-Math.round(d.revenue/MAX*130)}`).join(' ');

  return (
    <div className="dvlb-wrap">
      <header className="dvlb-head">
        <span className="dvlb-badge">Matplotlib</span>
        <h2>Line & Bar Charts</h2>
        <p>plt.plot() vs plt.bar() — when to use which</p>
      </header>
      <div className="dvlb-tabs">
        {TYPES.map(t=><button key={t.id} className={`dvlb-tab ${sel===t.id?'dvlb-tab--on':''}`} style={sel===t.id?{borderColor:t.color,color:t.color}:{}} onClick={()=>setSel(t.id)}>{t.label}</button>)}
      </div>
      <svg viewBox="0 0 360 175" xmlns="http://www.w3.org/2000/svg" className="dvlb-svg">
        {sel==='hbar' ? DATA.map((d,i)=>(
          <g key={i}>
            <rect x={28} y={10+i*26} width={Math.round(d.revenue/MAX*290)} height={18} fill={t.color} rx="3" opacity="0.85"/>
            <text x="22" y={24+i*26} textAnchor="end" fontSize="8.5" fill="#6b7785">{d.month}</text>
            <text x={32+Math.round(d.revenue/MAX*290)} y={24+i*26} fontSize="7.5" fill="#a3adbb">₹{(d.revenue/1000).toFixed(0)}k</text>
          </g>
        )) : sel==='bar' ? DATA.map((d,i)=>(
          <g key={i}>
            <rect x={30+i*52} y={155-Math.round(d.revenue/MAX*130)} width={22} height={Math.round(d.revenue/MAX*130)} fill={t.color} rx="2" opacity="0.85"/>
            <text x={30+i*52+11} y="170" textAnchor="middle" fontSize="8.5" fill="#6b7785">{d.month}</text>
          </g>
        )) : (
          <>
            <polyline points={pts} fill="none" stroke={t.color} strokeWidth="2.5" strokeLinejoin="round"/>
            {DATA.map((d,i)=>(
              <g key={i}>
                <circle cx={30+i*52+11} cy={155-Math.round(d.revenue/MAX*130)} r="4" fill={t.color}/>
                <text x={30+i*52+11} y="170" textAnchor="middle" fontSize="8.5" fill="#6b7785">{d.month}</text>
              </g>
            ))}
          </>
        )}
        {sel!=='hbar' && <>
          <line x1="28" y1="15" x2="28" y2="158" stroke="#30363d"/>
          <line x1="28" y1="158" x2="345" y2="158" stroke="#30363d"/>
        </>}
      </svg>
      <pre className="dvlb-code"><code>{t.code}</code></pre>
      <div className="dvlb-note">{t.note}</div>
    </div>
  );
};
export default DvLineBarVisualization;

/* Lesson: Categorical Plots — boxplot, violinplot, barplot
 * Visual: Toggle chart type with SVG for each */
import React, { useState } from 'react';
import './visual.css';

const CATS = ['Electronics','Clothing','Furniture'];
const COLOR = ['#58a6ff','#56d364','#a78bfa'];
const STATS = [
  {min:15,q1:35,med:58,q3:80,max:120},
  {min:8, q1:18,med:28,q3:38,max:55},
  {min:20,q1:38,med:50,q3:68,max:90},
];
const MAX_V = 130;

const PLOTS = [
  {
    id:'barplot', label:'barplot', color:'#58a6ff',
    code:`sns.barplot(data=df, x='category', y='revenue',\n  palette='Set2', errorbar='sd')`,
    note:"barplot shows the mean with a confidence interval bar. 'sd' shows standard deviation — you see both average and spread.",
  },
  {
    id:'boxplot', label:'boxplot', color:'#56d364',
    code:`sns.boxplot(data=df, x='category', y='revenue',\n  palette='Set2', width=0.4)`,
    note:'boxplot shows 5 stats: min, Q1, median, Q3, max. The box is the IQR. Whiskers are 1.5×IQR. Dots beyond are outliers.',
  },
  {
    id:'violin', label:'violinplot', color:'#a78bfa',
    code:`sns.violinplot(data=df, x='category', y='revenue',\n  palette='Set2', inner='box')`,
    note:'violinplot = boxplot + mirrored KDE. Shows not just spread but the shape of the distribution at each category.',
  },
];

const scale = v => Math.round(v/MAX_V*120);

const DvCatplotVisualization = () => {
  const [sel, setSel] = useState('barplot');
  const p = PLOTS.find(x=>x.id===sel);
  return (
    <div className="dvcat-wrap">
      <header className="dvcat-head">
        <span className="dvcat-badge">Seaborn</span>
        <h2>Categorical Plots</h2>
        <p>barplot, boxplot, violinplot — pick based on what you need to show</p>
      </header>
      <div className="dvcat-tabs">
        {PLOTS.map(x=><button key={x.id} className={`dvcat-tab ${sel===x.id?'dvcat-tab--on':''}`} style={sel===x.id?{borderColor:x.color,color:x.color}:{}} onClick={()=>setSel(x.id)}>{x.label}</button>)}
      </div>
      <svg viewBox="0 0 360 145" className="dvcat-svg">
        {CATS.map((cat,i)=>{
          const cx = 55+i*105;
          const s = STATS[i];
          if(sel==='barplot'){
            const h=scale(s.med);
            return (
              <g key={i}>
                <rect x={cx-18} y={130-h} width={36} height={h} fill={COLOR[i]} rx="2" opacity="0.85"/>
                <line x1={cx} y1={130-h-scale((s.q3-s.med)/2)} x2={cx} y2={130-h+scale((s.med-s.q1)/2)} stroke="white" strokeWidth="2"/>
                <text x={cx} y="142" textAnchor="middle" fontSize="8.5" fill="#6b7785">{cat.substring(0,6)}</text>
              </g>
            );
          }
          if(sel==='boxplot'){
            return (
              <g key={i}>
                <line x1={cx} y1={130-scale(s.max)} x2={cx} y2={130-scale(s.q3)} stroke={COLOR[i]} strokeWidth="1.5"/>
                <line x1={cx} y1={130-scale(s.min)} x2={cx} y2={130-scale(s.q1)} stroke={COLOR[i]} strokeWidth="1.5"/>
                <rect x={cx-16} y={130-scale(s.q3)} width={32} height={scale(s.q3)-scale(s.q1)} fill={COLOR[i]} opacity="0.4" stroke={COLOR[i]} strokeWidth="1.5" rx="1"/>
                <line x1={cx-16} y1={130-scale(s.med)} x2={cx+16} y2={130-scale(s.med)} stroke={COLOR[i]} strokeWidth="2"/>
                <text x={cx} y="142" textAnchor="middle" fontSize="8.5" fill="#6b7785">{cat.substring(0,6)}</text>
              </g>
            );
          }
          // violin
          const w=22;
          return (
            <g key={i}>
              <ellipse cx={cx} cy={130-scale(s.med)} rx={w} ry={scale((s.q3-s.q1)/1.5)} fill={COLOR[i]} opacity="0.35" stroke={COLOR[i]} strokeWidth="1.5"/>
              <line x1={cx-6} y1={130-scale(s.q3)} x2={cx+6} y2={130-scale(s.q3)} stroke={COLOR[i]} strokeWidth="1.5"/>
              <line x1={cx-6} y1={130-scale(s.q1)} x2={cx+6} y2={130-scale(s.q1)} stroke={COLOR[i]} strokeWidth="1.5"/>
              <circle cx={cx} cy={130-scale(s.med)} r="3" fill={COLOR[i]}/>
              <text x={cx} y="142" textAnchor="middle" fontSize="8.5" fill="#6b7785">{cat.substring(0,6)}</text>
            </g>
          );
        })}
        <line x1="10" y1="8" x2="10" y2="132" stroke="#30363d"/>
        <line x1="10" y1="132" x2="350" y2="132" stroke="#30363d"/>
      </svg>
      <pre className="dvcat-code"><code>{p.code}</code></pre>
      <div className="dvcat-note">{p.note}</div>
    </div>
  );
};
export default DvCatplotVisualization;

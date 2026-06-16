/* Lesson: Pivot Charts — Visualizing Summaries Instantly
 * Visual: Grouped bar chart derived from pivot data, toggle metric */
import React, { useState } from 'react';
import './visual.css';

const DATA = {
  Electronics: {Q1: 80000, Q2: 102000},
  Clothing:    {Q1: 39000, Q2:  41000},
  Furniture:   {Q1: 59000, Q2:  64000},
};
const CATS = Object.keys(DATA);
const QS   = ['Q1','Q2'];
const COLORS = { Q1:'#58a6ff', Q2:'#56d364' };
const MAX = 110000;

const CHART_TYPES = [
  {id:'bar',    label:'Clustered bar', note:'Best for comparing categories side by side. Each quarter is a different color.'},
  {id:'stacked',label:'Stacked bar',   note:'Shows total revenue per category AND the quarter breakdown within each bar.'},
  {id:'line',   label:'Line chart',    note:'Better for showing trends over time. Useful when quarters represent a long series.'},
];

const XlPivotChartVisualization = () => {
  const [type, setType] = useState('bar');
  const ct = CHART_TYPES.find(c=>c.id===type);
  const barW = 28;
  const gap  = 10;

  return (
    <div className="xlpchart-wrap">
      <header className="xlpchart-head">
        <span className="xlpchart-badge">Spreadsheets</span>
        <h2>Pivot Charts</h2>
        <p>Same pivot data — different chart types for different stories</p>
      </header>
      <div className="xlpchart-tabs">
        {CHART_TYPES.map(c=><button key={c.id} className={`xlpchart-tab ${type===c.id?'xlpchart-tab--on':''}`} onClick={()=>setType(c.id)}>{c.label}</button>)}
      </div>
      <div className="xlpchart-legend">
        {QS.map(q=><span key={q} className="xlpchart-leg"><span className="xlpchart-dot" style={{background:COLORS[q]}}></span>{q}</span>)}
      </div>

      {type==='line' ? (
        <svg className="xlpchart-svg" viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg">
          {QS.map((q,qi)=>{
            const pts = CATS.map((cat,ci)=>`${40+ci*110},${160-Math.round(DATA[cat][q]/MAX*130)}`).join(' ');
            return <polyline key={q} points={pts} fill="none" stroke={COLORS[q]} strokeWidth="2.5" strokeLinejoin="round"/>;
          })}
          {CATS.map((cat,ci)=>(
            <g key={cat}>
              <text x={40+ci*110} y="175" textAnchor="middle" fontSize="9" fill="#6b7785">{cat.substring(0,8)}</text>
              {QS.map((q,qi)=>(
                <circle key={q} cx={40+ci*110} cy={160-Math.round(DATA[cat][q]/MAX*130)} r="4" fill={COLORS[q]}/>
              ))}
            </g>
          ))}
          <line x1="30" y1="20" x2="30" y2="160" stroke="#30363d" strokeWidth="1"/>
          <line x1="30" y1="160" x2="350" y2="160" stroke="#30363d" strokeWidth="1"/>
        </svg>
      ) : (
        <svg className="xlpchart-svg" viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg">
          {CATS.map((cat,ci)=>{
            const gx = 30+ci*110;
            const q1h=Math.round(DATA[cat].Q1/MAX*140);
            const q2h=Math.round(DATA[cat].Q2/MAX*140);
            if(type==='stacked'){
              const tot=q1h+q2h;
              return (
                <g key={cat}>
                  <rect x={gx+10} y={160-tot} width={barW*2+gap} height={q1h} fill={COLORS.Q1} rx="2"/>
                  <rect x={gx+10} y={160-tot+q1h} width={barW*2+gap} height={q2h} fill={COLORS.Q2} rx="2"/>
                  <text x={gx+barW+gap} y="175" textAnchor="middle" fontSize="8.5" fill="#6b7785">{cat.substring(0,8)}</text>
                </g>
              );
            }
            return (
              <g key={cat}>
                <rect x={gx+5}          y={160-q1h} width={barW} height={q1h} fill={COLORS.Q1} rx="2"/>
                <rect x={gx+5+barW+gap} y={160-q2h} width={barW} height={q2h} fill={COLORS.Q2} rx="2"/>
                <text x={gx+barW+gap} y="175" textAnchor="middle" fontSize="8.5" fill="#6b7785">{cat.substring(0,8)}</text>
              </g>
            );
          })}
          <line x1="30" y1="15" x2="30" y2="165" stroke="#30363d" strokeWidth="1"/>
          <line x1="30" y1="165" x2="350" y2="165" stroke="#30363d" strokeWidth="1"/>
        </svg>
      )}
      <div className="xlpchart-note">{ct.note}</div>
    </div>
  );
};
export default XlPivotChartVisualization;

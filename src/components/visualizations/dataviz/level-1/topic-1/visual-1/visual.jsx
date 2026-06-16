/* Lesson: Why Visualization Matters
 * Visual: Same data as table vs chart — toggle to show the "aha" difference */
import React, { useState } from 'react';
import './visual.css';

const DATA = [
  {month:'Jan', sales:42000, target:40000},
  {month:'Feb', sales:38000, target:40000},
  {month:'Mar', sales:51000, target:45000},
  {month:'Apr', sales:47000, target:45000},
  {month:'May', sales:29000, target:50000},
  {month:'Jun', sales:62000, target:50000},
];
const MAX = 65000;

const DvWhyVisualization = () => {
  const [view, setView] = useState('table');
  return (
    <div className="dvwhy-wrap">
      <header className="dvwhy-head">
        <span className="dvwhy-badge">Data Viz</span>
        <h2>Why Visualization Matters</h2>
        <p>Same data — radically different impact</p>
      </header>
      <div className="dvwhy-tabs">
        <button className={`dvwhy-tab ${view==='table'?'dvwhy-tab--on':''}`} onClick={()=>setView('table')}>Raw table</button>
        <button className={`dvwhy-tab ${view==='chart'?'dvwhy-tab--on':''}`} onClick={()=>setView('chart')}>Chart</button>
      </div>
      {view==='table' ? (
        <div className="dvwhy-table-wrap">
          <table className="dvwhy-table">
            <thead><tr><th>Month</th><th>Sales (₹)</th><th>Target (₹)</th><th>Vs Target</th></tr></thead>
            <tbody>
              {DATA.map((r,i)=>(
                <tr key={i}>
                  <td>{r.month}</td>
                  <td>{r.sales.toLocaleString()}</td>
                  <td>{r.target.toLocaleString()}</td>
                  <td className={r.sales>=r.target?'dvwhy-pos':'dvwhy-neg'}>{r.sales>=r.target?'▲':'▼'} {Math.abs(r.sales-r.target).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="dvwhy-note">How long did it take you to spot May's drop? How is the trend overall?</div>
        </div>
      ) : (
        <div className="dvwhy-chart-wrap">
          <svg viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg" className="dvwhy-svg">
            {DATA.map((r,i)=>{
              const x = 30+i*52;
              const sh = Math.round(r.sales/MAX*140);
              const th = Math.round(r.target/MAX*140);
              return (
                <g key={i}>
                  <rect x={x} y={155-sh} width={22} height={sh} fill={r.sales>=r.target?'#56d364':'#f85149'} rx="2"/>
                  <line x1={x-2} x2={x+24} y1={155-th} y2={155-th} stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 2"/>
                  <text x={x+11} y="170" textAnchor="middle" fontSize="8.5" fill="#6b7785">{r.month}</text>
                </g>
              );
            })}
            <line x1="28" y1="10" x2="28" y2="158" stroke="#30363d"/>
            <line x1="28" y1="158" x2="345" y2="158" stroke="#30363d"/>
            <line x1="0" y1="0" x2="14" y2="0" stroke="#56d364" strokeWidth="2"/>
            <text x="16" y="4" fontSize="7.5" fill="#56d364">Sales</text>
            <line x1="60" y1="0" x2="74" y2="0" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 2"/>
            <text x="76" y="4" fontSize="7.5" fill="#a78bfa">Target</text>
          </svg>
          <div className="dvwhy-note">The May dip and June recovery are <em>immediately visible</em>. That's the power of visualization — it turns data into decisions.</div>
        </div>
      )}
    </div>
  );
};
export default DvWhyVisualization;

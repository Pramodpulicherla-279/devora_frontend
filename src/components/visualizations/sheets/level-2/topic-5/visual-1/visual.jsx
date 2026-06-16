/* Lesson: Conditional Formatting — Spotting Patterns Visually
 * Visual: Pick a rule, see colored table output */
import React, { useState } from 'react';
import './visual.css';

const DATA = [
  {name:'Aisha',  score:87, revenue:72000, change:12},
  {name:'Ravi',   score:54, revenue:38000, change:-8},
  {name:'Priya',  score:91, revenue:95000, change:24},
  {name:'Meera',  score:67, revenue:52000, change:-3},
  {name:'Arjun',  score:45, revenue:29000, change:-15},
  {name:'Divya',  score:78, revenue:61000, change:7},
];

const RULES = [
  {
    id:'highlight',
    label:'Highlight: score < 60',
    col:'score',
    cellStyle: r => r.score<60 ? {background:'rgba(248,81,73,0.2)',color:'#f85149',fontWeight:700} : {},
    note:'Simple threshold: cells below 60 turn red. Used for pass/fail, below-target, or overdue alerts.',
  },
  {
    id:'colorscale',
    label:'Color scale: revenue',
    col:'revenue',
    cellStyle: r => {
      const mn=29000,mx=95000; const pct=(r.revenue-mn)/(mx-mn);
      const g=Math.round(80+pct*135); return {background:`rgba(0,${g},30,0.3)`,color:'#e6edf3'};
    },
    note:'Color scale maps the full range of values to a gradient — low = red/dark, high = green/bright. Shows distribution at a glance.',
  },
  {
    id:'databar',
    label:'Data bars: revenue',
    col:'revenue',
    isBar:true,
    cellStyle: r => ({}),
    note:'Data bars turn numeric cells into mini bar charts inside each cell. No formulas needed — just select the column.',
  },
  {
    id:'arrows',
    label:'Icon set: % change',
    col:'change',
    cellStyle: r => r.change>0 ? {color:'#56d364'} : r.change<0 ? {color:'#f85149'} : {color:'#a3adbb'},
    icon: r => r.change>0 ? '▲' : r.change<0 ? '▼' : '●',
    note:'Icon sets replace numbers with arrows, traffic lights, or stars. Great for executive summaries — the trend is obvious without reading the value.',
  },
];

const mn=29000,mx=95000;

const XlCfVisualization = () => {
  const [sel, setSel] = useState('highlight');
  const rule = RULES.find(r=>r.id===sel);
  return (
    <div className="xlcf-wrap">
      <header className="xlcf-head">
        <span className="xlcf-badge">Spreadsheets</span>
        <h2>Conditional Formatting</h2>
        <p>Rules that colour cells automatically based on their values</p>
      </header>
      <div className="xlcf-tabs">
        {RULES.map(r=><button key={r.id} className={`xlcf-tab ${sel===r.id?'xlcf-tab--on':''}`} onClick={()=>setSel(r.id)}>{r.label}</button>)}
      </div>
      <div className="xlcf-table-wrap">
        <table className="xlcf-table">
          <thead><tr><th>Name</th><th>Score</th><th>Revenue</th><th>Change %</th></tr></thead>
          <tbody>
            {DATA.map((r,i)=>(
              <tr key={i}>
                <td>{r.name}</td>
                <td style={rule.col==='score'?rule.cellStyle(r):{}}>{r.score}</td>
                <td style={rule.col==='revenue'&&!rule.isBar?rule.cellStyle(r):{}}>
                  {rule.isBar
                    ? <div className="xlcf-bar-wrap">
                        <div className="xlcf-bar" style={{width:`${Math.round((r.revenue-mn)/(mx-mn)*100)}%`}}></div>
                        <span>₹{r.revenue.toLocaleString()}</span>
                      </div>
                    : `₹${r.revenue.toLocaleString()}`}
                </td>
                <td style={rule.col==='change'?rule.cellStyle(r):{}}>
                  {rule.icon ? `${rule.icon(r)} ${r.change}%` : `${r.change>0?'+':''}${r.change}%`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="xlcf-note">{rule.note}</div>
    </div>
  );
};
export default XlCfVisualization;

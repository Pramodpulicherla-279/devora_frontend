/* Lesson: SUM, AVERAGE, COUNT, MIN, MAX
 * Visual: Pick a formula, see it applied to a live column with result */
import React, { useState } from 'react';
import './visual.css';

const VALUES = [42000, 18500, 9200, 4100, 27000, 33600, 15800];
const LABELS = ['Laptop','Phone','Tablet','Headset','Monitor','Keyboard','Mouse'];

const FNS = [
  { id:'sum',   label:'SUM',     color:'#56d364', compute: v => v.reduce((a,b)=>a+b,0),     formula: '=SUM(C2:C8)', note:'Adds every value in the range. The most-used formula in any spreadsheet.' },
  { id:'avg',   label:'AVERAGE', color:'#58a6ff', compute: v => Math.round(v.reduce((a,b)=>a+b,0)/v.length), formula: '=AVERAGE(C2:C8)', note:'Sum divided by count. Watch out for blank cells — they are skipped, but zeros are counted.' },
  { id:'count', label:'COUNT',   color:'#a78bfa', compute: v => v.length,                    formula: '=COUNT(C2:C8)', note:'Counts cells that contain numbers. Use COUNTA to count non-empty cells including text.' },
  { id:'min',   label:'MIN',     color:'#f97316', compute: v => Math.min(...v),               formula: '=MIN(C2:C8)',  note:'Returns the smallest value. Useful for finding the lowest price, date, or score.' },
  { id:'max',   label:'MAX',     color:'#e879f9', compute: v => Math.max(...v),               formula: '=MAX(C2:C8)',  note:'Returns the largest value. Often paired with MIN to understand the spread of data.' },
];

const XlFormulasVisualization = () => {
  const [sel, setSel] = useState('sum');
  const fn = FNS.find(f=>f.id===sel);
  const result = fn.compute(VALUES);
  return (
    <div className="xlform-wrap">
      <header className="xlform-head">
        <span className="xlform-badge">Spreadsheets</span>
        <h2>Your First Formulas</h2>
        <p>SUM · AVERAGE · COUNT · MIN · MAX</p>
      </header>
      <div className="xlform-tabs">
        {FNS.map(f=>(
          <button key={f.id} className={`xlform-tab ${sel===f.id?'xlform-tab--on':''}`}
            style={sel===f.id?{borderColor:f.color,color:f.color}:{}} onClick={()=>setSel(f.id)}>{f.label}</button>
        ))}
      </div>
      <div className="xlform-layout">
        <div className="xlform-table-wrap">
          <table className="xlform-table">
            <thead><tr><th>Product</th><th>Sales</th></tr></thead>
            <tbody>
              {LABELS.map((l,i)=><tr key={i}><td>{l}</td><td>₹{VALUES[i].toLocaleString()}</td></tr>)}
              <tr className="xlform-result-row">
                <td><code>{fn.formula}</code></td>
                <td style={{color:fn.color,fontWeight:700}}>{sel==='count'?result:`₹${result.toLocaleString()}`}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="xlform-bar-wrap">
          {VALUES.map((v,i)=>(
            <div key={i} className="xlform-bar-row">
              <div className="xlform-bar-label">{LABELS[i].substring(0,7)}</div>
              <div className="xlform-bar-track">
                <div className="xlform-bar" style={{width:`${Math.round(v/Math.max(...VALUES)*100)}%`,background:fn.color}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="xlform-note">{fn.note}</div>
    </div>
  );
};
export default XlFormulasVisualization;

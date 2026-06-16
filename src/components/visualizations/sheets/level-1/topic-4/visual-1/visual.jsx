/* Lesson: Relative vs Absolute References
 * Visual: Show what formula gets pasted into each cell when copied right or down */
import React, { useState } from 'react';
import './visual.css';

const PRICES = [120,250,89,310];
const QTY    = [5,3,8,2];
const TAX    = 0.18;

const genRelative = (r,c) => {
  const row = r+2; const col = c===0 ? 'B' : 'C';
  return `=${col==='B'?`B${row}`:`C${row}`}*${col==='B'?`C${row}`:`B${row}`}`;
};

const MODES = [
  {
    id:'relative', label:'Relative: =B2*C2',
    desc:'When you copy =B2*C2 down, the row numbers shift automatically. Row 3 gets =B3*C3. This is usually what you want.',
    cells: (r) => `=B${r+2}*C${r+2}`,
    formula: (r) => `=B${r+2}*C${r+2}`,
    result: (r) => PRICES[r]*QTY[r],
  },
  {
    id:'absolute', label:'Absolute: =B2*$E$1',
    desc:'$E$1 never shifts when copied. The $ before both E and 1 locks the column and row. Perfect for a shared tax rate or discount.',
    cells: (r) => `=B${r+2}*$E$1`,
    formula: (r) => `=B${r+2}*$E$1`,
    result: (r) => Math.round(PRICES[r]*TAX),
  },
  {
    id:'mixed', label:'Mixed: =B2*$F$1',
    desc:'$F$1 locks the referenced cell; B2 shifts. You can also lock just the column ($B2) or just the row (B$2) independently.',
    cells: (r) => `=B${r+2}*$F$1`,
    formula: (r) => `=B${r+2}*$F$1`,
    result: (r) => Math.round(PRICES[r]*1.1),
  },
];

const XlReferencesVisualization = () => {
  const [mode, setMode] = useState('relative');
  const m = MODES.find(x=>x.id===mode);
  return (
    <div className="xlref-wrap">
      <header className="xlref-head">
        <span className="xlref-badge">Spreadsheets</span>
        <h2>Relative vs Absolute References</h2>
        <p>The $ sign — what it locks and why it matters</p>
      </header>
      <div className="xlref-tabs">
        {MODES.map(md=><button key={md.id} className={`xlref-tab ${mode===md.id?'xlref-tab--on':''}`} onClick={()=>setMode(md.id)}>{md.label}</button>)}
      </div>
      <div className="xlref-table-wrap">
        <table className="xlref-table">
          <thead><tr><th>Product</th><th>Price (B)</th><th>Qty (C)</th><th>Formula (D)</th><th>Result</th></tr></thead>
          <tbody>
            {['Laptop','Phone','Tablet','Monitor'].map((p,i)=>(
              <tr key={i}>
                <td>{p}</td>
                <td>₹{PRICES[i]}</td>
                <td>{QTY[i]}</td>
                <td className="xlref-formula"><code>{m.formula(i)}</code></td>
                <td className="xlref-result">₹{m.result(i).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="xlref-note">{m.desc}</div>
    </div>
  );
};
export default XlReferencesVisualization;

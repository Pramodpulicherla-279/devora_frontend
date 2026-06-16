/* Lesson: Rows, columns, cells, ranges
 * Visual: Interactive grid — click cells to highlight row/col/range */
import React, { useState } from 'react';
import './visual.css';

const COLS = ['A','B','C','D','E'];
const ROWS = [1,2,3,4,5];
const HEADERS = ['Product','Region','Q1','Q2','Total'];
const DATA = [
  ['Laptop','North',42000,38000,80000],
  ['Phone','South',18500,21000,39500],
  ['Tablet','East',9200,11400,20600],
  ['Headset','West',4100,5300,9400],
  ['Monitor','North',27000,29000,56000],
];

const MODES = [
  {id:'cell',  label:'Cell (A1)',    sel:{type:'cell',  r:0,c:0}},
  {id:'row',   label:'Row 3',        sel:{type:'row',   r:2}},
  {id:'col',   label:'Column C',     sel:{type:'col',   c:2}},
  {id:'range', label:'Range B2:D4',  sel:{type:'range', r1:1,c1:1,r2:3,c2:3}},
];

const isHit = (sel,r,c) => {
  if(!sel) return false;
  if(sel.type==='cell')  return r===sel.r && c===sel.c;
  if(sel.type==='row')   return r===sel.r;
  if(sel.type==='col')   return c===sel.c;
  if(sel.type==='range') return r>=sel.r1&&r<=sel.r2&&c>=sel.c1&&c<=sel.c2;
  return false;
};

const REFS = {
  cell: 'A1',
  row:  '3:3',
  col:  'C:C',
  range:'B2:D4',
};

const XlGridVisualization = () => {
  const [mode, setMode] = useState('cell');
  const sel = MODES.find(m=>m.id===mode).sel;
  return (
    <div className="xlgrid-wrap">
      <header className="xlgrid-head">
        <span className="xlgrid-badge">Spreadsheets</span>
        <h2>Rows, Columns, Cells & Ranges</h2>
        <p>Click a selection type to highlight it on the grid</p>
      </header>
      <div className="xlgrid-tabs">
        {MODES.map(m=><button key={m.id} className={`xlgrid-tab ${mode===m.id?'xlgrid-tab--on':''}`} onClick={()=>setMode(m.id)}>{m.label}</button>)}
      </div>
      <div className="xlgrid-ref">Reference: <code>{REFS[mode]}</code></div>
      <div className="xlgrid-table-wrap">
        <table className="xlgrid-table">
          <thead>
            <tr><th className="xlgrid-corner"></th>{COLS.map((c,ci)=><th key={c} className={`xlgrid-colh ${isHit(sel,-1,ci)?'xlgrid-colh--on':''}`}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {ROWS.map((rn,ri)=>(
              <tr key={rn}>
                <td className={`xlgrid-rowh ${isHit(sel,ri,-1)||sel.type==='row'&&sel.r===ri?'xlgrid-rowh--on':''}`}>{rn}</td>
                {COLS.map((_,ci)=>(
                  <td key={ci} className={`xlgrid-cell ${isHit(sel,ri,ci)?'xlgrid-cell--on':''}`}>
                    {ri===0 ? HEADERS[ci] : (ci>=2 ? DATA[ri-1]?.[ci]?.toLocaleString() : DATA[ri-1]?.[ci]) ?? ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="xlgrid-note">A <strong>range</strong> like B2:D4 includes everything from the top-left cell (B2) to the bottom-right cell (D4) — 9 cells total.</div>
    </div>
  );
};
export default XlGridVisualization;

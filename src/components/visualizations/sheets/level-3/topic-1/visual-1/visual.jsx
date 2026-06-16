/* Lesson: Pivot Tables — Summarize Thousands of Rows in 30 Seconds
 * Visual: Row/Column/Value pickers with live pivot grid */
import React, { useState, useMemo } from 'react';
import './visual.css';

const RAW = [
  {category:'Electronics',city:'Mumbai', q:'Q1',revenue:42000},
  {category:'Electronics',city:'Delhi',  q:'Q1',revenue:38000},
  {category:'Clothing',   city:'Mumbai', q:'Q1',revenue:18000},
  {category:'Clothing',   city:'Delhi',  q:'Q1',revenue:21000},
  {category:'Electronics',city:'Mumbai', q:'Q2',revenue:55000},
  {category:'Electronics',city:'Delhi',  q:'Q2',revenue:47000},
  {category:'Clothing',   city:'Mumbai', q:'Q2',revenue:22000},
  {category:'Clothing',   city:'Delhi',  q:'Q2',revenue:19000},
  {category:'Furniture',  city:'Mumbai', q:'Q1',revenue:31000},
  {category:'Furniture',  city:'Delhi',  q:'Q1',revenue:28000},
  {category:'Furniture',  city:'Mumbai', q:'Q2',revenue:35000},
  {category:'Furniture',  city:'Delhi',  q:'Q2',revenue:29000},
];

const AGG_FNS = {
  SUM:  arr => arr.reduce((a,b)=>a+b,0),
  AVG:  arr => Math.round(arr.reduce((a,b)=>a+b,0)/arr.length),
  COUNT:arr => arr.length,
};

const ROWS_OPTS  = ['category','city','q'];
const COLS_OPTS  = ['q','city','category'];
const AGG_OPTS   = ['SUM','AVG','COUNT'];

const XlPivotVisualization = () => {
  const [rowField, setRowField] = useState('category');
  const [colField, setColField] = useState('q');
  const [aggFn, setAggFn]       = useState('SUM');

  const rowVals = useMemo(()=>[...new Set(RAW.map(r=>r[rowField]))].sort(),[rowField]);
  const colVals = useMemo(()=>[...new Set(RAW.map(r=>r[colField]))].sort(),[colField]);
  const agg = AGG_FNS[aggFn];

  const cell = (rv,cv) => {
    const vals = RAW.filter(r=>r[rowField]===rv&&r[colField]===cv).map(r=>r.revenue);
    return vals.length ? agg(vals) : null;
  };
  const rowTotal = rv => agg(RAW.filter(r=>r[rowField]===rv).map(r=>r.revenue));
  const colTotal = cv => agg(RAW.filter(r=>r[colField]===cv).map(r=>r.revenue));
  const grand    = () => agg(RAW.map(r=>r.revenue));
  const fmt = v => aggFn==='COUNT'?v:`₹${v?.toLocaleString()}`;

  return (
    <div className="xlpvt-wrap">
      <header className="xlpvt-head">
        <span className="xlpvt-badge">Spreadsheets</span>
        <h2>Pivot Tables</h2>
        <p>Drag fields, change aggregation — summarise instantly</p>
      </header>
      <div className="xlpvt-controls">
        <div className="xlpvt-ctrl">
          <label>Rows</label>
          <select value={rowField} onChange={e=>setRowField(e.target.value)}>
            {ROWS_OPTS.map(o=><option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="xlpvt-ctrl">
          <label>Columns</label>
          <select value={colField} onChange={e=>setColField(e.target.value)}>
            {COLS_OPTS.filter(o=>o!==rowField).map(o=><option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="xlpvt-ctrl">
          <label>Values</label>
          <select value={aggFn} onChange={e=>setAggFn(e.target.value)}>
            {AGG_OPTS.map(o=><option key={o} value={o}>{o}(revenue)</option>)}
          </select>
        </div>
      </div>
      <div className="xlpvt-table-wrap">
        <table className="xlpvt-table">
          <thead>
            <tr>
              <th>{rowField}</th>
              {colVals.map(cv=><th key={cv}>{cv}</th>)}
              <th className="xlpvt-total">Total</th>
            </tr>
          </thead>
          <tbody>
            {rowVals.map(rv=>(
              <tr key={rv}>
                <td className="xlpvt-rowlabel">{rv}</td>
                {colVals.map(cv=>{
                  const v=cell(rv,cv);
                  return <td key={cv} className="xlpvt-val">{v!=null?fmt(v):'-'}</td>;
                })}
                <td className="xlpvt-total">{fmt(rowTotal(rv))}</td>
              </tr>
            ))}
            <tr className="xlpvt-foot">
              <td className="xlpvt-rowlabel">Grand Total</td>
              {colVals.map(cv=><td key={cv} className="xlpvt-total">{fmt(colTotal(cv))}</td>)}
              <td className="xlpvt-total">{fmt(grand())}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="xlpvt-note">Pivot tables never modify your raw data — they create a separate summary view you can refresh any time.</div>
    </div>
  );
};
export default XlPivotVisualization;

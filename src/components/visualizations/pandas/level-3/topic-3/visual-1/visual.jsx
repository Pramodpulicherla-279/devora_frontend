/* Lesson: Pivot Tables in Pandas
 * Visual type: INTERACTIVE
 * User picks rows / columns / values / aggfunc — pivot table updates */
import React, { useState, useMemo } from 'react';
import './visual.css';

const DATA = [
  { city:'Mumbai',    category:'Electronics', rep:'Aisha', amount:4200  },
  { city:'Pune',      category:'Accessories', rep:'Ravi',  amount:1850  },
  { city:'Delhi',     category:'Electronics', rep:'Priya', amount:6700  },
  { city:'Bengaluru', category:'Accessories', rep:'Aisha', amount:980   },
  { city:'Mumbai',    category:'Electronics', rep:'Ravi',  amount:12400 },
  { city:'Hyderabad', category:'Electronics', rep:'Priya', amount:2300  },
  { city:'Pune',      category:'Electronics', rep:'Aisha', amount:7800  },
  { city:'Delhi',     category:'Accessories', rep:'Ravi',  amount:450   },
  { city:'Mumbai',    category:'Accessories', rep:'Priya', amount:3100  },
];

const AGGS = [
  { id:'sum',   label:'sum',   fn:(vals)=>vals.reduce((s,v)=>s+v,0) },
  { id:'mean',  label:'mean',  fn:(vals)=>Math.round(vals.reduce((s,v)=>s+v,0)/vals.length) },
  { id:'count', label:'count', fn:(vals)=>vals.length },
];
const COLS_OPT  = ['category','rep'];
const ROWS_OPT  = ['city','rep','category'];

const PdPivotTableVisualization = () => {
  const [rowField,  setRowField]  = useState('city');
  const [colField,  setColField]  = useState('category');
  const [aggFn,     setAggFn]     = useState('sum');

  const agg = AGGS.find(a => a.id === aggFn);

  const { rowKeys, colKeys, grid, rowTotals, colTotals, grandTotal } = useMemo(() => {
    const rowKeys = [...new Set(DATA.map(d=>d[rowField]))].sort();
    const colKeys = [...new Set(DATA.map(d=>d[colField]))].sort();
    const grid = {};
    rowKeys.forEach(r => { grid[r] = {}; colKeys.forEach(c => { grid[r][c] = []; }); });
    DATA.forEach(d => {
      if (grid[d[rowField]] && grid[d[rowField]][d[colField]] !== undefined)
        grid[d[rowField]][d[colField]].push(d.amount);
    });
    const cell = (r,c) => grid[r][c].length ? agg.fn(grid[r][c]) : 0;
    const rowTotals = {};
    rowKeys.forEach(r => { rowTotals[r] = agg.fn(colKeys.flatMap(c=>grid[r][c]).filter(Boolean)) || 0; });
    const colTotals = {};
    colKeys.forEach(c => { colTotals[c] = agg.fn(rowKeys.flatMap(r=>grid[r][c]).filter(Boolean)) || 0; });
    const grandTotal = agg.fn(DATA.map(d=>d.amount));
    return { rowKeys, colKeys, grid, rowTotals, colTotals, grandTotal, cell };
  }, [rowField, colField, aggFn, agg]);

  const cell = (r,c) => grid[r][c].length ? agg.fn(grid[r][c]) : '-';

  const code = `pd.pivot_table(df,\n  values='amount',\n  index='${rowField}',\n  columns='${colField}',\n  aggfunc='${aggFn}',\n  fill_value=0)`;

  const fmt = v => v === '-' ? '-' : aggFn === 'count' ? v : `₹${(+v).toLocaleString()}`;

  return (
    <div className="pdpvt-wrap">
      <header className="pdpvt-head">
        <span className="pdpvt-badge">Pandas &amp; NumPy</span>
        <h2>Pivot Tables</h2>
        <p>Spreadsheet pivot in code — fully reproducible</p>
      </header>

      <div className="pdpvt-controls">
        <div className="pdpvt-ctrl">
          <div className="pdpvt-ctrl-label">Index (rows)</div>
          <div className="pdpvt-chips">{ROWS_OPT.map(o=><button key={o} className={`pdpvt-chip ${rowField===o?'pdpvt-chip--on':''}`} onClick={()=>setRowField(o)}>{o}</button>)}</div>
        </div>
        <div className="pdpvt-ctrl">
          <div className="pdpvt-ctrl-label">Columns</div>
          <div className="pdpvt-chips">{COLS_OPT.map(o=><button key={o} className={`pdpvt-chip ${colField===o?'pdpvt-chip--on':''}`} onClick={()=>setColField(o)}>{o}</button>)}</div>
        </div>
        <div className="pdpvt-ctrl">
          <div className="pdpvt-ctrl-label">aggfunc</div>
          <div className="pdpvt-chips">{AGGS.map(a=><button key={a.id} className={`pdpvt-chip ${aggFn===a.id?'pdpvt-chip--on':''}`} onClick={()=>setAggFn(a.id)}>{a.label}</button>)}</div>
        </div>
      </div>

      <pre className="pdpvt-code"><code>{code}</code></pre>

      <div className="pdpvt-table-wrap">
        <table className="pdpvt-table">
          <thead>
            <tr>
              <th>{rowField} ╲ {colField}</th>
              {colKeys.map(c=><th key={c}>{c}</th>)}
              <th className="pdpvt-total">Total</th>
            </tr>
          </thead>
          <tbody>
            {rowKeys.map(r=>(
              <tr key={r}>
                <td className="pdpvt-rowlabel">{r}</td>
                {colKeys.map(c=><td key={c}>{fmt(cell(r,c))}</td>)}
                <td className="pdpvt-total">{fmt(rowTotals[r])}</td>
              </tr>
            ))}
            <tr className="pdpvt-totrow">
              <td className="pdpvt-total">Total</td>
              {colKeys.map(c=><td key={c} className="pdpvt-total">{fmt(colTotals[c])}</td>)}
              <td className="pdpvt-total">{fmt(grandTotal)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="pdpvt-note">Pivot tables are GroupBy + unstack in one call. They're best for summary grids — one field as rows, another as columns, a metric in the cells.</div>
    </div>
  );
};

export default PdPivotTableVisualization;

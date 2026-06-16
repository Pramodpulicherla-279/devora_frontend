/* Lesson: Filtering and Sorting DataFrames
 * Visual type: INTERACTIVE
 * Build a compound filter visually — toggle conditions, see which rows survive */
import React, { useState } from 'react';
import './visual.css';

const DATA = [
  { id:1, city:'Mumbai',    amount:4200,  cat:'Electronics', rep:'Aisha'  },
  { id:2, city:'Pune',      amount:1850,  cat:'Accessories', rep:'Ravi'   },
  { id:3, city:'Delhi',     amount:6700,  cat:'Electronics', rep:'Priya'  },
  { id:4, city:'Bengaluru', amount:980,   cat:'Accessories', rep:'Aisha'  },
  { id:5, city:'Mumbai',    amount:12400, cat:'Electronics', rep:'Ravi'   },
  { id:6, city:'Hyderabad', amount:2300,  cat:'Electronics', rep:'Priya'  },
  { id:7, city:'Pune',      amount:7800,  cat:'Electronics', rep:'Aisha'  },
  { id:8, city:'Delhi',     amount:450,   cat:'Accessories', rep:'Ravi'   },
];

const PdFilterSortVisualization = () => {
  const [cityFilter, setCityFilter] = useState('All');
  const [catFilter, setCatFilter]   = useState('All');
  const [minAmt, setMinAmt]         = useState(0);
  const [sortCol, setSortCol]       = useState('id');
  const [sortAsc, setSortAsc]       = useState(true);

  const cities = ['All', 'Mumbai', 'Pune', 'Delhi', 'Bengaluru', 'Hyderabad'];
  const cats   = ['All', 'Electronics', 'Accessories'];
  const sorts  = ['id', 'amount', 'city'];

  let rows = DATA.filter(r =>
    (cityFilter === 'All' || r.city === cityFilter) &&
    (catFilter === 'All'  || r.cat  === catFilter)  &&
    r.amount >= minAmt
  );
  rows = [...rows].sort((a,b) => sortAsc ? (a[sortCol] > b[sortCol] ? 1 : -1) : (a[sortCol] < b[sortCol] ? 1 : -1));

  const codeLines = [
    `df_filtered = df[`,
    cityFilter !== 'All' ? `    (df['city'] == '${cityFilter}') &` : null,
    catFilter !== 'All'  ? `    (df['category'] == '${catFilter}') &` : null,
    minAmt > 0           ? `    (df['amount'] >= ${minAmt}) &` : null,
    `    (pd.Series([True]*len(df)))`,
    `].sort_values('${sortCol}', ascending=${sortAsc})`,
  ].filter(Boolean).join('\n');

  return (
    <div className="pdfilt-wrap">
      <header className="pdfilt-head">
        <span className="pdfilt-badge">Pandas &amp; NumPy</span>
        <h2>Filtering &amp; Sorting</h2>
        <p>Adjust filters — the code and table update live</p>
      </header>

      <div className="pdfilt-controls">
        <div className="pdfilt-ctrl-group">
          <label className="pdfilt-label">City</label>
          <div className="pdfilt-chips">
            {cities.map(c => <button key={c} className={`pdfilt-chip ${cityFilter===c?'pdfilt-chip--on':''}`} onClick={()=>setCityFilter(c)}>{c}</button>)}
          </div>
        </div>
        <div className="pdfilt-ctrl-group">
          <label className="pdfilt-label">Category</label>
          <div className="pdfilt-chips">
            {cats.map(c => <button key={c} className={`pdfilt-chip ${catFilter===c?'pdfilt-chip--on':''}`} onClick={()=>setCatFilter(c)}>{c}</button>)}
          </div>
        </div>
        <div className="pdfilt-ctrl-group">
          <label className="pdfilt-label">Min amount ₹{minAmt.toLocaleString()}</label>
          <input type="range" min="0" max="5000" step="500" value={minAmt} onChange={e=>setMinAmt(+e.target.value)} className="pdfilt-range" />
        </div>
        <div className="pdfilt-ctrl-group">
          <label className="pdfilt-label">Sort by</label>
          <div className="pdfilt-chips">
            {sorts.map(s => <button key={s} className={`pdfilt-chip ${sortCol===s?'pdfilt-chip--on':''}`} onClick={()=>{if(sortCol===s)setSortAsc(!sortAsc);else setSortCol(s)}}>{s} {sortCol===s?(sortAsc?'↑':'↓'):''}</button>)}
          </div>
        </div>
      </div>

      <pre className="pdfilt-code"><code>{codeLines}</code></pre>

      <div className="pdfilt-count">{rows.length} row{rows.length!==1?'s':''} match</div>

      <div className="pdfilt-table-wrap">
        <table className="pdfilt-table">
          <thead><tr><th>city</th><th>amount</th><th>category</th><th>rep</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}><td>{r.city}</td><td>₹{r.amount.toLocaleString()}</td><td>{r.cat}</td><td>{r.rep}</td></tr>
            ))}
            {rows.length === 0 && <tr><td colSpan="4" className="pdfilt-empty">No rows match</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PdFilterSortVisualization;

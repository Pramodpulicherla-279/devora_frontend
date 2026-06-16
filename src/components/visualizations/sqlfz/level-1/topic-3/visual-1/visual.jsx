/* Lesson: Your First SELECT — Reading Data Like a Pro
 * Visual type: INTERACTIVE
 * Build a SELECT query by toggling columns and table — see query update live */
import React, { useState } from 'react';
import './visual.css';

const ALL_COLS = ['id','city','amount','category','rep','returned'];
const DATA = [
  { id:1, city:'Mumbai',    amount:4200,  category:'Electronics', rep:'Aisha',  returned:false },
  { id:2, city:'Pune',      amount:1850,  category:'Accessories', rep:'Ravi',   returned:false },
  { id:3, city:'Delhi',     amount:6700,  category:'Electronics', rep:'Priya',  returned:true  },
  { id:4, city:'Bengaluru', amount:980,   category:'Accessories', rep:'Aisha',  returned:false },
  { id:5, city:'Mumbai',    amount:12400, category:'Electronics', rep:'Ravi',   returned:false },
];

const SqlFzSelectVisualization = () => {
  const [selCols, setSelCols] = useState(['city','amount','category']);
  const [star, setStar]       = useState(false);

  const toggleCol = c => {
    setStar(false);
    setSelCols(prev => prev.includes(c) ? prev.filter(x=>x!==c) : [...prev, c]);
  };

  const displayCols = star ? ALL_COLS : (selCols.length ? selCols : ALL_COLS);
  const colStr = star ? '*' : (selCols.length ? selCols.join(', ') : '*');
  const query = `SELECT ${colStr}\nFROM orders;`;

  const fmt = (col, val) => col === 'returned' ? (val ? 'TRUE' : 'FALSE') :
              col === 'amount' ? `₹${val.toLocaleString()}` : String(val);

  return (
    <div className="sqlfzsel-wrap">
      <header className="sqlfzsel-head">
        <span className="sqlfzsel-badge">SQL</span>
        <h2>SELECT — Read Data</h2>
        <p>Toggle columns — see the query change live</p>
      </header>

      <div className="sqlfzsel-controls">
        <div className="sqlfzsel-ctrl-label">Choose columns</div>
        <div className="sqlfzsel-cols">
          <button className={`sqlfzsel-col sqlfzsel-col--star ${star?'sqlfzsel-col--on':''}`} onClick={()=>{setStar(!star);setSelCols([]);}} >
            * (all)
          </button>
          {ALL_COLS.map(c=>(
            <button key={c} className={`sqlfzsel-col ${selCols.includes(c)?'sqlfzsel-col--on':''}`} onClick={()=>toggleCol(c)} disabled={star}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <pre className="sqlfzsel-code"><code>{query}</code></pre>

      <div className="sqlfzsel-table-wrap">
        <table className="sqlfzsel-table">
          <thead><tr>{displayCols.map(c=><th key={c}>{c}</th>)}</tr></thead>
          <tbody>
            {DATA.map(row=>(
              <tr key={row.id}>
                {displayCols.map(c=><td key={c}>{fmt(c,row[c])}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sqlfzsel-note">
        <code>SELECT *</code> returns every column — useful for exploration. In production, always name the columns you need: it's faster and your code won't break if someone adds a new column.
      </div>
    </div>
  );
};

export default SqlFzSelectVisualization;

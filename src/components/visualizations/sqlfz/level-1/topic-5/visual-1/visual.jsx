/* Lesson: Sorting and Limiting Results with ORDER BY and LIMIT
 * Visual type: INTERACTIVE
 * Sort by column asc/desc, set limit — see result update */
import React, { useState, useMemo } from 'react';
import './visual.css';

const DATA = [
  { id:1, city:'Mumbai',    amount:4200,  rep:'Aisha' },
  { id:2, city:'Pune',      amount:1850,  rep:'Ravi'  },
  { id:3, city:'Delhi',     amount:6700,  rep:'Priya' },
  { id:4, city:'Bengaluru', amount:980,   rep:'Aisha' },
  { id:5, city:'Mumbai',    amount:12400, rep:'Ravi'  },
  { id:6, city:'Hyderabad', amount:2300,  rep:'Priya' },
  { id:7, city:'Pune',      amount:7800,  rep:'Aisha' },
];

const SqlFzOrderByVisualization = () => {
  const [orderCol, setOrderCol] = useState('amount');
  const [asc, setAsc]           = useState(false);
  const [limit, setLimit]       = useState(5);

  const sorted = useMemo(() => {
    return [...DATA]
      .sort((a,b)=> asc ? (a[orderCol]>b[orderCol]?1:-1) : (a[orderCol]<b[orderCol]?1:-1))
      .slice(0, limit);
  }, [orderCol, asc, limit]);

  const code = `SELECT id, city, amount, rep\nFROM orders\nORDER BY ${orderCol} ${asc?'ASC':'DESC'}\nLIMIT ${limit};`;

  return (
    <div className="sqlfzord-wrap">
      <header className="sqlfzord-head">
        <span className="sqlfzord-badge">SQL</span>
        <h2>ORDER BY &amp; LIMIT</h2>
        <p>Sort any column, set how many rows you want</p>
      </header>

      <div className="sqlfzord-controls">
        <div className="sqlfzord-ctrl">
          <div className="sqlfzord-ctrl-label">ORDER BY</div>
          <div className="sqlfzord-chips">
            {['amount','city','rep','id'].map(c=>(
              <button key={c} className={`sqlfzord-chip ${orderCol===c?'sqlfzord-chip--on':''}`} onClick={()=>setOrderCol(c)}>{c}</button>
            ))}
          </div>
        </div>
        <div className="sqlfzord-ctrl">
          <div className="sqlfzord-ctrl-label">Direction</div>
          <div className="sqlfzord-chips">
            {[{label:'DESC (highest first)',v:false},{label:'ASC (lowest first)',v:true}].map(d=>(
              <button key={String(d.v)} className={`sqlfzord-chip ${asc===d.v?'sqlfzord-chip--on':''}`} onClick={()=>setAsc(d.v)}>{d.label}</button>
            ))}
          </div>
        </div>
        <div className="sqlfzord-ctrl">
          <div className="sqlfzord-ctrl-label">LIMIT: {limit}</div>
          <input type="range" min="1" max="7" value={limit} onChange={e=>setLimit(+e.target.value)} className="sqlfzord-range" />
        </div>
      </div>

      <pre className="sqlfzord-code"><code>{code}</code></pre>

      <div className="sqlfzord-table-wrap">
        <table className="sqlfzord-table">
          <thead><tr><th>id</th><th>city</th><th>amount</th><th>rep</th></tr></thead>
          <tbody>
            {sorted.map((r,i)=>(
              <tr key={r.id}>
                <td><span className="sqlfzord-rank">#{i+1}</span> {r.id}</td>
                <td>{r.city}</td>
                <td>₹{r.amount.toLocaleString()}</td>
                <td>{r.rep}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sqlfzord-note">
        <code>LIMIT 5</code> is how you answer "show me the top 5 orders" — pair it with <code>ORDER BY amount DESC</code> for highest-first, or <code>ASC</code> for lowest-first. Without ORDER BY, LIMIT rows are non-deterministic.
      </div>
    </div>
  );
};

export default SqlFzOrderByVisualization;

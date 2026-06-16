/* Lesson: Filtering Rows with WHERE — Asking Better Questions
 * Visual type: INTERACTIVE
 * Build compound WHERE conditions with toggles — highlighted rows = matches */
import React, { useState } from 'react';
import './visual.css';

const DATA = [
  { id:1, city:'Mumbai',    amount:4200,  category:'Electronics' },
  { id:2, city:'Pune',      amount:1850,  category:'Accessories' },
  { id:3, city:'Delhi',     amount:6700,  category:'Electronics' },
  { id:4, city:'Bengaluru', amount:980,   category:'Accessories' },
  { id:5, city:'Mumbai',    amount:12400, category:'Electronics' },
  { id:6, city:'Hyderabad', amount:2300,  category:'Electronics' },
];

const OPS = [
  { id:'eq',   label:"city = 'Mumbai'",    fn: r => r.city === 'Mumbai' },
  { id:'gt',   label:'amount > 3000',       fn: r => r.amount > 3000 },
  { id:'cat',  label:"category = 'Electronics'", fn: r => r.category === 'Electronics' },
  { id:'like', label:"city LIKE 'B%'",     fn: r => r.city.startsWith('B') },
];

const SqlFzWhereVisualization = () => {
  const [active, setActive] = useState(['eq']);
  const [logic, setLogic]   = useState('AND');

  const toggle = id => setActive(p => p.includes(id) ? p.filter(x=>x!==id) : [...p, id]);
  const filters = OPS.filter(o => active.includes(o.id));
  const match = r => filters.length === 0 ? true :
    logic === 'AND' ? filters.every(f=>f.fn(r)) : filters.some(f=>f.fn(r));

  const whereClause = filters.length
    ? `WHERE ${filters.map(f=>f.label).join(`\n  ${logic} `)}`
    : '-- (no filter)';
  const query = `SELECT * FROM orders\n${whereClause};`;

  return (
    <div className="sqlfzwhere-wrap">
      <header className="sqlfzwhere-head">
        <span className="sqlfzwhere-badge">SQL</span>
        <h2>WHERE Clause</h2>
        <p>Toggle conditions — highlighted rows match</p>
      </header>

      <div className="sqlfzwhere-controls">
        <div className="sqlfzwhere-ctrl-label">Conditions</div>
        <div className="sqlfzwhere-conds">
          {OPS.map(o=>(
            <button key={o.id} className={`sqlfzwhere-cond ${active.includes(o.id)?'sqlfzwhere-cond--on':''}`} onClick={()=>toggle(o.id)}>
              {o.label}
            </button>
          ))}
        </div>
        {active.length > 1 && (
          <div className="sqlfzwhere-logic">
            <span className="sqlfzwhere-ctrl-label">Combine with</span>
            {['AND','OR'].map(l=>(
              <button key={l} className={`sqlfzwhere-logic-btn ${logic===l?'sqlfzwhere-logic-btn--on':''}`} onClick={()=>setLogic(l)}>{l}</button>
            ))}
          </div>
        )}
      </div>

      <pre className="sqlfzwhere-code"><code>{query}</code></pre>

      <div className="sqlfzwhere-count">{DATA.filter(match).length} row{DATA.filter(match).length!==1?'s':''} match</div>

      <div className="sqlfzwhere-table-wrap">
        <table className="sqlfzwhere-table">
          <thead><tr><th>id</th><th>city</th><th>amount</th><th>category</th></tr></thead>
          <tbody>
            {DATA.map(r=>(
              <tr key={r.id} className={match(r)?'sqlfzwhere-tr--on':''}>
                <td>{r.id}</td>
                <td>{r.city}</td>
                <td>₹{r.amount.toLocaleString()}</td>
                <td>{r.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SqlFzWhereVisualization;

/* Lesson: HAVING vs WHERE — Filtering Groups
 * Visual type: ILLUSTRATION
 * Show the two-stage filter: WHERE filters rows BEFORE grouping, HAVING filters AFTER */
import React, { useState } from 'react';
import './visual.css';

const DATA = [
  { city:'Mumbai',    amount:4200  },
  { city:'Pune',      amount:1850  },
  { city:'Delhi',     amount:6700  },
  { city:'Bengaluru', amount:980   },
  { city:'Mumbai',    amount:12400 },
  { city:'Hyderabad', amount:2300  },
  { city:'Pune',      amount:7800  },
  { city:'Delhi',     amount:450   },
];

const EXAMPLES = [
  {
    id:'where',
    label:'WHERE only',
    code: `SELECT city, SUM(amount) AS total
FROM orders
WHERE city != 'Bengaluru'
GROUP BY city;`,
    rowFilter: r => r.city !== 'Bengaluru',
    groupFilter: () => true,
    note:"WHERE runs BEFORE GROUP BY — it removes individual rows. Here it excludes Bengaluru before totalling.",
  },
  {
    id:'having',
    label:'HAVING only',
    code: `SELECT city, SUM(amount) AS total
FROM orders
GROUP BY city
HAVING SUM(amount) > 5000;`,
    rowFilter: () => true,
    groupFilter: (_, total) => total > 5000,
    note:"HAVING runs AFTER GROUP BY — it filters entire groups. You can't use WHERE for this because the total doesn't exist until after grouping.",
  },
  {
    id:'both',
    label:'WHERE + HAVING',
    code: `SELECT city, SUM(amount) AS total
FROM orders
WHERE city != 'Bengaluru'
GROUP BY city
HAVING SUM(amount) > 5000;`,
    rowFilter: r => r.city !== 'Bengaluru',
    groupFilter: (_, total) => total > 5000,
    note:"Use both together: WHERE shrinks the dataset first (faster), then HAVING filters the groups.",
  },
];

const SqlFzHavingVisualization = () => {
  const [sel, setSel] = useState('having');
  const ex = EXAMPLES.find(e=>e.id===sel);

  const filteredRows = DATA.filter(ex.rowFilter);
  const groups = {};
  filteredRows.forEach(r => { if(!groups[r.city]) groups[r.city]=0; groups[r.city]+=r.amount; });
  const groupRows = Object.entries(groups)
    .map(([city,total])=>({city,total}))
    .filter(g => ex.groupFilter(g.city, g.total))
    .sort((a,b)=>b.total-a.total);

  return (
    <div className="sqlfzhav-wrap">
      <header className="sqlfzhav-head">
        <span className="sqlfzhav-badge">SQL</span>
        <h2>HAVING vs WHERE</h2>
        <p>WHERE filters rows · HAVING filters groups</p>
      </header>

      <div className="sqlfzhav-tabs">
        {EXAMPLES.map(e=><button key={e.id} className={`sqlfzhav-tab ${sel===e.id?'sqlfzhav-tab--on':''}`} onClick={()=>setSel(e.id)}>{e.label}</button>)}
      </div>

      <pre className="sqlfzhav-code"><code>{ex.code}</code></pre>

      <div className="sqlfzhav-pipeline">
        <div className="sqlfzhav-stage">
          <div className="sqlfzhav-stage-label">All rows ({DATA.length})</div>
          <div className="sqlfzhav-pills">
            {DATA.map((r,i)=><span key={i} className={`sqlfzhav-pill ${ex.rowFilter(r)?'sqlfzhav-pill--keep':'sqlfzhav-pill--drop'}`}>{r.city}</span>)}
          </div>
        </div>
        <div className="sqlfzhav-arrow">↓ GROUP BY city</div>
        <div className="sqlfzhav-stage">
          <div className="sqlfzhav-stage-label">Groups → result ({groupRows.length} cities)</div>
          <div className="sqlfzhav-result-table">
            {groupRows.map(g=>(
              <div key={g.city} className="sqlfzhav-result-row">
                <span>{g.city}</span>
                <span>₹{g.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sqlfzhav-note">{ex.note}</div>
    </div>
  );
};

export default SqlFzHavingVisualization;

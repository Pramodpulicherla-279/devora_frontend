/* Lesson: GROUP BY — Turning Rows into Summaries
 * Visual type: INTERACTIVE
 * Pick group-by column + aggregate — live result with bar visualization */
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
];
const AGG_FNS = [
  {id:'sum',   label:'SUM(amount)',    fn:vals=>vals.reduce((s,v)=>s+v,0), fmt:v=>`₹${v.toLocaleString()}`},
  {id:'count', label:'COUNT(*)',       fn:vals=>vals.length,               fmt:v=>`${v} orders`},
  {id:'avg',   label:'AVG(amount)',    fn:vals=>Math.round(vals.reduce((s,v)=>s+v,0)/vals.length), fmt:v=>`₹${v.toLocaleString()}`},
];

const SqlFzGroupByVisualization = () => {
  const [groupCol, setGroupCol] = useState('city');
  const [aggFn,    setAggFn]    = useState('sum');
  const agg = AGG_FNS.find(a=>a.id===aggFn);

  const rows = useMemo(()=>{
    const g = {};
    DATA.forEach(r=>{const k=r[groupCol];if(!g[k])g[k]=[];g[k].push(r.amount);});
    return Object.entries(g).map(([k,vals])=>({key:k,val:agg.fn(vals)})).sort((a,b)=>b.val-a.val);
  },[groupCol,aggFn,agg]);

  const max = rows[0]?.val || 1;
  const code = `SELECT ${groupCol}, ${agg.label}\nFROM orders\nGROUP BY ${groupCol}\nORDER BY ${agg.label.replace('(','').replace(')','')} DESC;`;

  return (
    <div className="sqlfzgrp-wrap">
      <header className="sqlfzgrp-head">
        <span className="sqlfzgrp-badge">SQL</span>
        <h2>GROUP BY</h2>
        <p>Collapse many rows into one summary row per group</p>
      </header>

      <div className="sqlfzgrp-row">
        <div className="sqlfzgrp-ctrl">
          <div className="sqlfzgrp-ctrl-label">GROUP BY</div>
          <div className="sqlfzgrp-chips">
            {['city','category','rep'].map(c=><button key={c} className={`sqlfzgrp-chip ${groupCol===c?'sqlfzgrp-chip--on':''}`} onClick={()=>setGroupCol(c)}>{c}</button>)}
          </div>
        </div>
        <div className="sqlfzgrp-ctrl">
          <div className="sqlfzgrp-ctrl-label">Aggregate</div>
          <div className="sqlfzgrp-chips">
            {AGG_FNS.map(a=><button key={a.id} className={`sqlfzgrp-chip ${aggFn===a.id?'sqlfzgrp-chip--on':''}`} onClick={()=>setAggFn(a.id)}>{a.label}</button>)}
          </div>
        </div>
      </div>

      <pre className="sqlfzgrp-code"><code>{code}</code></pre>

      <div className="sqlfzgrp-result">
        {rows.map(r=>(
          <div key={r.key} className="sqlfzgrp-result-row">
            <span className="sqlfzgrp-key">{r.key}</span>
            <div className="sqlfzgrp-bar-wrap">
              <div className="sqlfzgrp-bar" style={{width:`${(r.val/max)*100}%`}} />
            </div>
            <span className="sqlfzgrp-val">{agg.fmt(r.val)}</span>
          </div>
        ))}
      </div>

      <div className="sqlfzgrp-note">
        GROUP BY collapses all rows with the same value into one. Every column in SELECT that isn't an aggregate function MUST appear in GROUP BY — this is the most common SQL beginner error.
      </div>
    </div>
  );
};

export default SqlFzGroupByVisualization;

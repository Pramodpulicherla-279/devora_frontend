/* Lesson: GroupBy — The Pandas Equivalent of SQL's GROUP BY
 * Visual type: INTERACTIVE
 * Choose group-by column + aggregation — see result table update */
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

const GROUP_COLS = ['city', 'category', 'rep'];
const AGG_FNS = [
  { id:'sum',   label:'sum()',   fn: vals => vals.reduce((s,v)=>s+v,0)          },
  { id:'mean',  label:'mean()',  fn: vals => Math.round(vals.reduce((s,v)=>s+v,0)/vals.length) },
  { id:'count', label:'count()', fn: vals => vals.length                        },
  { id:'max',   label:'max()',   fn: vals => Math.max(...vals)                  },
];

const PdGroupByVisualization = () => {
  const [groupCol, setGroupCol] = useState('city');
  const [aggFn, setAggFn]       = useState('sum');

  const agg = AGG_FNS.find(a => a.id === aggFn);
  const result = useMemo(() => {
    const groups = {};
    DATA.forEach(row => {
      const key = row[groupCol];
      if (!groups[key]) groups[key] = [];
      groups[key].push(row.amount);
    });
    return Object.entries(groups).map(([key, vals]) => ({ key, value: agg.fn(vals) })).sort((a,b)=>b.value-a.value);
  }, [groupCol, aggFn, agg]);

  const code = `df.groupby('${groupCol}')['amount'].${aggFn}()`;

  return (
    <div className="pdgrp-wrap">
      <header className="pdgrp-head">
        <span className="pdgrp-badge">Pandas &amp; NumPy</span>
        <h2>GroupBy</h2>
        <p>Split → Apply → Combine on the Zephyr dataset</p>
      </header>

      <div className="pdgrp-row">
        <div className="pdgrp-ctrl-group">
          <div className="pdgrp-ctrl-label">Group by</div>
          <div className="pdgrp-chips">
            {GROUP_COLS.map(c => <button key={c} className={`pdgrp-chip ${groupCol===c?'pdgrp-chip--on':''}`} onClick={()=>setGroupCol(c)}>{c}</button>)}
          </div>
        </div>
        <div className="pdgrp-ctrl-group">
          <div className="pdgrp-ctrl-label">Aggregation</div>
          <div className="pdgrp-chips">
            {AGG_FNS.map(a => <button key={a.id} className={`pdgrp-chip ${aggFn===a.id?'pdgrp-chip--on':''}`} onClick={()=>setAggFn(a.id)}>{a.label}</button>)}
          </div>
        </div>
      </div>

      <pre className="pdgrp-code"><code>{code}</code></pre>

      <div className="pdgrp-table-wrap">
        <table className="pdgrp-table">
          <thead><tr><th>{groupCol}</th><th>amount ({aggFn})</th></tr></thead>
          <tbody>
            {result.map(r => {
              const pct = (r.value / result[0].value) * 100;
              return (
                <tr key={r.key}>
                  <td>{r.key}</td>
                  <td>
                    <div className="pdgrp-bar-wrap">
                      <div className="pdgrp-bar" style={{width:`${pct}%`}} />
                      <span className="pdgrp-val">{aggFn==='count' ? r.value : `₹${r.value.toLocaleString()}`}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pdgrp-note">
        GroupBy has three phases: <strong>Split</strong> (data into groups) → <strong>Apply</strong> (the aggregation function) → <strong>Combine</strong> (into a result Series). You can also group by multiple columns: <code>df.groupby(['city','category'])</code>.
      </div>
    </div>
  );
};

export default PdGroupByVisualization;

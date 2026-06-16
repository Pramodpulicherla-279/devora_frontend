/* Lesson: Handling Missing Data — dropna, fillna, and When to Use Each
 * Visual type: INTERACTIVE
 * Dataset with NaN values; toggle strategy (dropna / fillna mean / fillna forward / fillna 0) */
import React, { useState } from 'react';
import './visual.css';

const RAW = [
  { id:1, city:'Mumbai',    amount:4200,  rep:'Aisha'  },
  { id:2, city:'Pune',      amount:null,  rep:'Ravi'   },
  { id:3, city:'Delhi',     amount:6700,  rep:null     },
  { id:4, city:'Bengaluru', amount:null,  rep:'Aisha'  },
  { id:5, city:'Mumbai',    amount:12400, rep:'Ravi'   },
  { id:6, city:null,        amount:2300,  rep:'Priya'  },
  { id:7, city:'Pune',      amount:7800,  rep:null     },
];

const MEAN = Math.round(RAW.filter(r=>r.amount!==null).reduce((s,r)=>s+r.amount,0) / RAW.filter(r=>r.amount!==null).length);
const LAST_REP = ['Aisha','Ravi',null,'Aisha','Ravi','Priya',null];
const FFILL_REP = ['Aisha','Ravi','Ravi','Aisha','Ravi','Priya','Priya'];
const FFILL_CITY = ['Mumbai','Pune','Delhi','Bengaluru','Mumbai','Mumbai','Pune'];

const STRATEGIES = [
  { id:'raw',    label:'Raw (NaN)',    code: `# df.isnull().sum()\namount    2\nrep       2\ncity      1`, desc:'3 rows have at least one NaN. You must decide what to do before any aggregation.', apply: r => r },
  { id:'dropna', label:'dropna()',     code: `df.dropna()          # drop any row with NaN\n# df.dropna(subset=['amount'])  # only if amount is NaN`, desc:'Safest when missing rows are random & few. Here we lose 3/7 rows — too many.', apply: r => r.amount !== null && r.rep !== null && r.city !== null },
  { id:'mean',   label:'fillna(mean)', code: `df['amount'].fillna(df['amount'].mean(), inplace=True)\n# mean = ₹${MEAN.toLocaleString()}`, desc:'Good for numeric columns with random gaps. Preserves row count without introducing bias.', apply: r => ({ ...r, amount: r.amount ?? MEAN }), keepAll: true },
  { id:'ffill',  label:'ffill()',      code: `df['rep'].fillna(method='ffill', inplace=True)\ndf['city'].fillna(method='ffill', inplace=True)`, desc:'Forward fill copies the last valid value downward. Works for time-ordered data where the previous value is a reasonable substitute.', apply: r => ({ ...r, rep: FFILL_REP[r.id-1], city: FFILL_CITY[r.id-1] }), keepAll: true },
];

const PdMissingDataVisualization = () => {
  const [sel, setSel] = useState('raw');
  const strat = STRATEGIES.find(s => s.id === sel);

  const rows = strat.keepAll
    ? RAW.map(strat.apply)
    : strat.id === 'raw'
      ? RAW
      : RAW.filter(strat.apply);

  const fmt = v => v === null ? <span className="pdna-null">NaN</span> : typeof v === 'number' ? `₹${v.toLocaleString()}` : v;

  return (
    <div className="pdna-wrap">
      <header className="pdna-head">
        <span className="pdna-badge">Pandas &amp; NumPy</span>
        <h2>Handling Missing Data</h2>
        <p>Pick a strategy and see how the DataFrame changes</p>
      </header>

      <div className="pdna-tabs">
        {STRATEGIES.map(s => (
          <button key={s.id} className={`pdna-tab ${sel===s.id?'pdna-tab--on':''}`} onClick={()=>setSel(s.id)}>{s.label}</button>
        ))}
      </div>

      <pre className="pdna-code"><code>{strat.code}</code></pre>

      <div className="pdna-table-wrap">
        <table className="pdna-table">
          <thead><tr><th>id</th><th>city</th><th>amount</th><th>rep</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{fmt(r.city)}</td>
                <td>{fmt(r.amount)}</td>
                <td>{fmt(r.rep)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pdna-row-count">{rows.length} row{rows.length!==1?'s':''} remaining</div>
      </div>

      <div className="pdna-note">{strat.desc}</div>
    </div>
  );
};

export default PdMissingDataVisualization;

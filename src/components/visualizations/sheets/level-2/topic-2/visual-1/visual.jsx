/* Lesson: VLOOKUP — Finding Data Across Sheets
 * Visual: Two-table VLOOKUP trace — click a sales row, see which lookup table row gets matched */
import React, { useState } from 'react';
import './visual.css';

const REPS = [
  {id:101, rep:'Aisha'},
  {id:102, rep:'Ravi'},
  {id:103, rep:'Priya'},
  {id:104, rep:'Meera'},
];
const LOOKUP = [
  {id:101, region:'North', target:80000},
  {id:102, region:'South', target:60000},
  {id:103, region:'North', target:90000},
  {id:105, region:'East',  target:70000},
];
const SALES = [
  {order:1, rep_id:101, amount:72000},
  {order:2, rep_id:103, amount:95000},
  {order:3, rep_id:102, amount:58000},
  {order:4, rep_id:104, amount:43000},
];

const XlVlookupVisualization = () => {
  const [sel, setSel] = useState(0);
  const row = SALES[sel];
  const match = LOOKUP.find(l=>l.id===row.rep_id);
  const repName = REPS.find(r=>r.id===row.rep_id)?.rep ?? '?';
  return (
    <div className="xlvlook-wrap">
      <header className="xlvlook-head">
        <span className="xlvlook-badge">Spreadsheets</span>
        <h2>VLOOKUP</h2>
        <p>Click a sales row — trace how VLOOKUP finds the region</p>
      </header>
      <pre className="xlvlook-code"><code>{`=VLOOKUP(B${sel+2}, $G$2:$I$5, 2, FALSE)\n-- lookup B${sel+2}=${row.rep_id} in the rep table\n-- return column 2 (region) — exact match`}</code></pre>
      <div className="xlvlook-tables">
        <div className="xlvlook-tbl">
          <div className="xlvlook-tbl-label">Sales table (left)</div>
          <table className="xlvlook-table">
            <thead><tr><th>order</th><th>rep_id</th><th>amount</th></tr></thead>
            <tbody>
              {SALES.map((s,i)=>(
                <tr key={i} className={`xlvlook-tr ${sel===i?'xlvlook-tr--on':''}`} onClick={()=>setSel(i)}>
                  <td>{s.order}</td>
                  <td className="xlvlook-key">{s.rep_id}</td>
                  <td>₹{s.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="xlvlook-arrow">→</div>
        <div className="xlvlook-tbl">
          <div className="xlvlook-tbl-label">Lookup table (right)</div>
          <table className="xlvlook-table">
            <thead><tr><th>rep_id</th><th>region</th><th>target</th></tr></thead>
            <tbody>
              {LOOKUP.map((l,i)=>(
                <tr key={i} className={`xlvlook-tr ${l.id===row.rep_id?'xlvlook-tr--match':''}`}>
                  <td className="xlvlook-key">{l.id}</td>
                  <td>{l.region}</td>
                  <td>₹{l.target.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="xlvlook-result">
        <span>VLOOKUP result for rep_id {row.rep_id} ({repName}):</span>
        {match
          ? <strong className="xlvlook-found">region = "{match.region}"</strong>
          : <strong className="xlvlook-notfound">#N/A — rep_id not in lookup table</strong>}
      </div>
      <div className="xlvlook-note">VLOOKUP always searches the <em>first column</em> of the lookup range and returns a column to the right. It can't look left — that's why INDEX-MATCH is more flexible.</div>
    </div>
  );
};
export default XlVlookupVisualization;

/* Lesson: Data Validation & Sheet Protection
 * Visual: Dropdown validation demo + protection layer illustration */
import React, { useState } from 'react';
import './visual.css';

const REGIONS   = ['North','South','East','West'];
const STATUSES  = ['Pending','Approved','Rejected'];

const INITIAL = [
  {id:1, name:'Aisha Sharma',  region:'North',  status:'Approved', budget:50000},
  {id:2, name:'Ravi Kumar',    region:'',       status:'Pending',  budget:-1000},
  {id:3, name:'Priya Nair',    region:'SOUTH',  status:'Approved', budget:35000},
];

const validate = (row) => {
  const errs = [];
  if(!REGIONS.includes(row.region))   errs.push(`region "${row.region}" not in list`);
  if(!STATUSES.includes(row.status))  errs.push(`status "${row.status}" invalid`);
  if(row.budget < 0)                  errs.push('budget cannot be negative');
  return errs;
};

const PROTECTION_LEVELS = [
  {id:'none',   label:'No protection',   desc:'Anyone can edit any cell. Easy to accidentally overwrite formulas.'},
  {id:'lock',   label:'Lock formulas',   desc:'Formula cells are locked (grey). Users can still edit input cells (white).'},
  {id:'full',   label:'Sheet protected', desc:'Only designated input cells are editable. Formulas and structure are safe.'},
];

const XlValidateVisualization = () => {
  const [rows, setRows] = useState(INITIAL.map(r=>({...r})));
  const [activeTab, setActiveTab] = useState('validation');
  const [protection, setProtection] = useState('none');
  const [newRegion, setNewRegion] = useState('');
  const [newStatus, setNewStatus] = useState('Pending');

  const pl = PROTECTION_LEVELS.find(p=>p.id===protection);

  return (
    <div className="xlval-wrap">
      <header className="xlval-head">
        <span className="xlval-badge">Spreadsheets</span>
        <h2>Data Validation & Sheet Protection</h2>
        <p>Stop bad data entering — before it causes a problem</p>
      </header>
      <div className="xlval-tabs">
        <button className={`xlval-tab ${activeTab==='validation'?'xlval-tab--on':''}`} onClick={()=>setActiveTab('validation')}>Data Validation</button>
        <button className={`xlval-tab ${activeTab==='protect'?'xlval-tab--on':''}`} onClick={()=>setActiveTab('protect')}>Sheet Protection</button>
      </div>

      {activeTab==='validation' && (
        <>
          <div className="xlval-subtitle">Raw input — select valid values using dropdowns</div>
          <div className="xlval-input-row">
            <select className="xlval-select" value={newRegion} onChange={e=>setNewRegion(e.target.value)}>
              <option value="">-- pick region --</option>
              {REGIONS.map(r=><option key={r} value={r}>{r}</option>)}
            </select>
            <select className="xlval-select" value={newStatus} onChange={e=>setNewStatus(e.target.value)}>
              {STATUSES.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="xlval-table-wrap">
            <table className="xlval-table">
              <thead><tr><th>#</th><th>name</th><th>region</th><th>status</th><th>budget</th><th>issues</th></tr></thead>
              <tbody>
                {rows.map((r,i)=>{
                  const errs=validate(r);
                  return (
                    <tr key={i}>
                      <td>{r.id}</td>
                      <td>{r.name}</td>
                      <td className={!REGIONS.includes(r.region)?'xlval-err':''}>{r.region||'(blank)'}</td>
                      <td className={!STATUSES.includes(r.status)?'xlval-err':''}>{r.status}</td>
                      <td className={r.budget<0?'xlval-err':''}>₹{r.budget.toLocaleString()}</td>
                      <td>{errs.length?<span className="xlval-errtag">{errs.length} issue{errs.length>1?'s':''}</span>:<span className="xlval-ok">✓</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="xlval-note">Data validation lets you attach a dropdown list to any cell. If the user types something not in the list, spreadsheet shows a warning or blocks the entry entirely.</div>
        </>
      )}

      {activeTab==='protect' && (
        <>
          <div className="xlval-prot-tabs">
            {PROTECTION_LEVELS.map(p=><button key={p.id} className={`xlval-ptab ${protection===p.id?'xlval-ptab--on':''}`} onClick={()=>setProtection(p.id)}>{p.label}</button>)}
          </div>
          <div className="xlval-prot-grid">
            {[['Name (input)','input'],['Region (input)','input'],['Budget (input)','input'],['Total (formula)','formula'],['% Share (formula)','formula'],['Status (input)','input']].map(([label,type],i)=>(
              <div key={i} className={`xlval-cell xlval-cell--${type} ${protection==='none'?'xlval-cell--editable':protection==='lock'&&type==='input'?'xlval-cell--editable':protection==='full'&&type==='input'?'xlval-cell--editable':'xlval-cell--locked'}`}>
                {label}
                {protection!=='none'&&type==='formula'&&<span className="xlval-lock">🔒</span>}
              </div>
            ))}
          </div>
          <div className="xlval-note">{pl.desc}</div>
        </>
      )}
    </div>
  );
};
export default XlValidateVisualization;

/* Lesson: Data Cleaning — Remove Duplicates, Fix Formats, Handle Blanks
 * Visual: Toggle cleaning step, show before/after table */
import React, { useState } from 'react';
import './visual.css';

const RAW = [
  {name:'  Aisha Sharma  ', email:'AISHA@GMAIL.COM',  date:'01/15/2024', amount:'45,000'},
  {name:'Ravi Kumar',        email:'ravi@gmail.com',   date:'2024-01-20', amount:'18000'},
  {name:'Aisha Sharma',      email:'aisha@gmail.com',  date:'January 22', amount:''},
  {name:'PRIYA NAIR',        email:'PRIYA@GMAIL.COM',  date:'01/28/2024', amount:'22,500'},
  {name:'Ravi Kumar',        email:'ravi@gmail.com',   date:'2024-01-20', amount:'18000'},
  {name:'Meera Das',         email:'meera@gmail.com',  date:'02/03/2024', amount:'9,800'},
];

const STEPS = [
  {
    id:'raw',  label:'Raw data',
    rows: RAW,
    issues:['Extra spaces in names','Inconsistent email casing','Mixed date formats','Commas in numbers','Blank amount','Duplicate row 2 & 5'],
  },
  {
    id:'dedup', label:'Remove duplicates',
    rows: RAW.filter((_,i)=>i!==4),
    issues:['Extra spaces in names','Inconsistent email casing','Mixed date formats','Commas in numbers','Blank amount'],
  },
  {
    id:'trim', label:'Trim & lowercase',
    rows: RAW.filter((_,i)=>i!==4).map(r=>({...r,name:r.name.trim(),email:r.email.toLowerCase()})),
    issues:['Mixed date formats','Commas in numbers','Blank amount'],
  },
  {
    id:'blanks', label:'Fill blanks',
    rows: RAW.filter((_,i)=>i!==4).map(r=>({...r,name:r.name.trim(),email:r.email.toLowerCase(),amount:r.amount||'0'})),
    issues:['Mixed date formats','Commas in numbers'],
  },
  {
    id:'clean', label:'Fully clean',
    rows: RAW.filter((_,i)=>i!==4).map(r=>({...r,name:r.name.trim(),email:r.email.toLowerCase(),amount:r.amount?Number(r.amount.replace(/,/g,'')):0,date:'2024-01-01'})),
    issues:[],
  },
];

const isDirty = (step,field,value,i) => {
  if(step==='raw'){
    if(field==='name' && (value!==value.trim()||value!==value.trim().replace(/  +/g,' '))) return true;
    if(field==='email' && value!==value.toLowerCase()) return true;
    if(field==='amount' && (value===''||value.includes(','))) return true;
  }
  return false;
};

const XlCleanVisualization = () => {
  const [step, setStep] = useState('raw');
  const s = STEPS.find(x=>x.id===step);
  return (
    <div className="xlclean-wrap">
      <header className="xlclean-head">
        <span className="xlclean-badge">Spreadsheets</span>
        <h2>Data Cleaning</h2>
        <p>Click each step to clean the dataset progressively</p>
      </header>
      <div className="xlclean-tabs">
        {STEPS.map((st,i)=>(
          <button key={st.id} className={`xlclean-tab ${step===st.id?'xlclean-tab--on':''}`} onClick={()=>setStep(st.id)}>
            <span className="xlclean-step-n">{i+1}</span> {st.label}
          </button>
        ))}
      </div>
      <div className="xlclean-table-wrap">
        <table className="xlclean-table">
          <thead><tr><th>name</th><th>email</th><th>date</th><th>amount</th></tr></thead>
          <tbody>
            {s.rows.map((r,i)=>(
              <tr key={i}>
                {['name','email','date','amount'].map(f=>(
                  <td key={f} className={isDirty(step,f,r[f],i)?'xlclean-dirty':''}>{String(r[f])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {s.issues.length>0 && (
        <div className="xlclean-issues">
          <div className="xlclean-issues-label">Remaining issues:</div>
          {s.issues.map((iss,i)=><div key={i} className="xlclean-issue">{iss}</div>)}
        </div>
      )}
      {s.issues.length===0 && <div className="xlclean-done">Dataset is clean.</div>}
    </div>
  );
};
export default XlCleanVisualization;

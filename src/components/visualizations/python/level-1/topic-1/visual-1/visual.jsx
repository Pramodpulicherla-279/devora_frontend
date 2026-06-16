/* Lesson: Why Python Won the Data World (And How to Set It Up)
 * Visual type: ILLUSTRATION
 * Shows why Python dominates data work — ecosystem map + setup steps */
import React, { useState } from 'react';
import './visual.css';

const REASONS = [
  { id:'libs',   icon:'📦', title:'Rich ecosystem', body:'pandas, NumPy, scikit-learn, matplotlib, seaborn — all free, all interoperable. No other language has this density of data tooling.' },
  { id:'read',   icon:'📖', title:'Readable syntax', body:'df[df["amount"] > 5000] reads almost like English. Data code you write today stays understandable in six months.' },
  { id:'glue',   icon:'🔗', title:'Connects everything', body:'Call a database, fetch an API, parse CSV, export to Excel, deploy a model — all in one script. Python is the glue of the data stack.' },
  { id:'jobs',   icon:'💼', title:'Market demand', body:'90% of Data Analyst job listings in India mention Python (2024, Naukri). It is the de-facto requirement, not a differentiator.' },
];

const SETUP = [
  { step:'1', cmd:'Download Python 3.11+', note:'python.org → Downloads. Check "Add to PATH" during install.' },
  { step:'2', cmd:'pip install pandas numpy', note:'In terminal. This installs pandas + NumPy (its engine).' },
  { step:'3', cmd:'pip install jupyter', note:'Optional but recommended — gives you the interactive notebook environment.' },
  { step:'4', cmd:'jupyter notebook', note:'Opens browser interface. Create a .ipynb file and start writing.' },
];

const PySetupVisualization = () => {
  const [tab, setTab] = useState('why');
  const [selReason, setSelReason] = useState('libs');
  const reason = REASONS.find(r=>r.id===selReason);

  return (
    <div className="pysetup-wrap">
      <header className="pysetup-head">
        <span className="pysetup-badge">Python Basics</span>
        <h2>Why Python for Data?</h2>
        <p>The case for learning it + how to get started</p>
      </header>

      <div className="pysetup-tabs">
        <button className={`pysetup-tab ${tab==='why'?'pysetup-tab--on':''}`} onClick={()=>setTab('why')}>Why Python</button>
        <button className={`pysetup-tab ${tab==='setup'?'pysetup-tab--on':''}`} onClick={()=>setTab('setup')}>Setup</button>
      </div>

      {tab==='why' ? (
        <div>
          <div className="pysetup-reasons">
            {REASONS.map(r=>(
              <button key={r.id} className={`pysetup-reason-btn ${selReason===r.id?'pysetup-reason-btn--on':''}`} onClick={()=>setSelReason(r.id)}>
                <span className="pysetup-reason-icon">{r.icon}</span>
                <span className="pysetup-reason-title">{r.title}</span>
              </button>
            ))}
          </div>
          <div className="pysetup-reason-body">{reason.body}</div>
        </div>
      ) : (
        <div className="pysetup-steps">
          {SETUP.map(s=>(
            <div key={s.step} className="pysetup-step">
              <div className="pysetup-step-num">{s.step}</div>
              <div className="pysetup-step-content">
                <code className="pysetup-step-cmd">{s.cmd}</code>
                <div className="pysetup-step-note">{s.note}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PySetupVisualization;

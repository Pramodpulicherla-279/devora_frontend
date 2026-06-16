/* Lesson: The Capstone Brief — portfolio project overview
 * Visual: 8-course journey map leading to capstone */
import React, { useState } from 'react';
import './visual.css';

const COURSES = [
  {name:'Python Basics', icon:'🐍', done:true},
  {name:'Pandas & NumPy', icon:'🐼', done:true},
  {name:'SQL Queries', icon:'🗄️', done:true},
  {name:'Spreadsheets', icon:'📊', done:true},
  {name:'Desc. Statistics', icon:'📐', done:true},
  {name:'Inf. Statistics', icon:'📈', done:true},
  {name:'ML Intro', icon:'🤖', done:true},
  {name:'Data Viz', icon:'🎨', done:true},
];

const DELIVERABLES = [
  {label:'Clean dataset', desc:'Processed CSV/DataFrame, reproducible cleaning script'},
  {label:'Analysis code', desc:'SQL queries + Python notebooks with findings'},
  {label:'Dashboard', desc:'Power BI or Matplotlib multi-chart summary'},
  {label:'Stakeholder report', desc:'PDF/doc with findings written for a non-technical reader'},
  {label:'GitHub repo', desc:'Public portfolio piece with README, code, and data'},
];

const CapBriefVisualization = () => {
  const [sel, setSel] = useState(null);
  return (
    <div className="capbrief-wrap">
      <header className="capbrief-head">
        <span className="capbrief-badge">Capstone</span>
        <h2>The Capstone Brief</h2>
        <p>Eight courses → one complete analyst project</p>
      </header>
      <div className="capbrief-journey">
        {COURSES.map((c,i)=>(
          <React.Fragment key={c.name}>
            <div className="capbrief-course">
              <div className="capbrief-icon">{c.icon}</div>
              <div className="capbrief-cname">{c.name}</div>
            </div>
            {i<COURSES.length-1 && <div className="capbrief-arrow">→</div>}
          </React.Fragment>
        ))}
        <div className="capbrief-arrow">→</div>
        <div className="capbrief-course capbrief-course--cap">
          <div className="capbrief-icon">🏆</div>
          <div className="capbrief-cname">Capstone</div>
        </div>
      </div>
      <div className="capbrief-subtitle">What you'll deliver:</div>
      <div className="capbrief-deliverables">
        {DELIVERABLES.map((d,i)=>(
          <div key={i} className={`capbrief-del ${sel===i?'capbrief-del--on':''}`} onClick={()=>setSel(sel===i?null:i)}>
            <div className="capbrief-del-label">{i+1}. {d.label}</div>
            {sel===i && <div className="capbrief-del-desc">{d.desc}</div>}
          </div>
        ))}
      </div>
      <div className="capbrief-note">The capstone doesn't teach new tools — it shows you can combine everything you've learned to answer real business questions and communicate findings clearly.</div>
    </div>
  );
};
export default CapBriefVisualization;

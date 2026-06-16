/* Lesson: Why spreadsheets still matter
 * Visual: Tool comparison — when Excel/Sheets beats Python/SQL/BI */
import React, { useState } from 'react';
import './visual.css';

const TOOLS = [
  { id:'sheets', label:'Spreadsheet', color:'#56d364',
    strengths:['Instant, no setup', 'Non-technical stakeholders edit too', 'Visual pivot tables in 3 clicks', 'Formula auditing is visual', 'Email a single file'],
    weaknesses:['Slow past ~500k rows','Error-prone manual updates','Hard to version-control'] },
  { id:'python', label:'Python/Pandas', color:'#58a6ff',
    strengths:['Handles millions of rows','Reproducible scripts','Automation & scheduling','Complex transformations'],
    weaknesses:['Setup required','Stakeholders can\'t edit','Steep learning curve'] },
  { id:'sql',    label:'SQL', color:'#a78bfa',
    strengths:['Native database queries','Joins across huge tables','Consistent source of truth'],
    weaknesses:['Read-only analysis flow','No built-in charts','Needs DB access'] },
  { id:'bi',     label:'BI Tools', color:'#f97316',
    strengths:['Beautiful dashboards','Role-based sharing','Live data refresh'],
    weaknesses:['License cost','Limited ad-hoc queries','Rigid report templates'] },
];

const XlWhyVisualization = () => {
  const [sel, setSel] = useState('sheets');
  const t = TOOLS.find(x=>x.id===sel);
  return (
    <div className="xlwhy-wrap">
      <header className="xlwhy-head">
        <span className="xlwhy-badge">Spreadsheets</span>
        <h2>Why Spreadsheets Still Matter</h2>
        <p>Every tool has its moment — know when to reach for which one</p>
      </header>
      <div className="xlwhy-tabs">
        {TOOLS.map(t=><button key={t.id} className={`xlwhy-tab ${sel===t.id?'xlwhy-tab--on':''}`} style={sel===t.id?{borderColor:t.color,color:t.color}:{}} onClick={()=>setSel(t.id)}>{t.label}</button>)}
      </div>
      <div className="xlwhy-body">
        <div className="xlwhy-col">
          <div className="xlwhy-col-label xlwhy-green">Strengths</div>
          {t.strengths.map((s,i)=><div key={i} className="xlwhy-item xlwhy-item--pos">{s}</div>)}
        </div>
        <div className="xlwhy-col">
          <div className="xlwhy-col-label xlwhy-red">Watch out for</div>
          {t.weaknesses.map((w,i)=><div key={i} className="xlwhy-item xlwhy-item--neg">{w}</div>)}
        </div>
      </div>
      <div className="xlwhy-note">Pick the tool that matches the <strong>audience</strong> and <strong>data size</strong> — not the flashiest option.</div>
    </div>
  );
};
export default XlWhyVisualization;

/* Lesson: Writing the Stakeholder Report
 * Visual: Report section template — click sections to see what each contains */
import React, { useState } from 'react';
import './visual.css';

const SECTIONS = [
  {id:'exec', title:'Executive Summary', pages:'½ page', color:'#f97316',
   content:`1–3 bullet point findings (no jargon)\nTop recommendation with dollar impact\nWhat action you're requesting\n\nWrite this last, read first.`,
   rule:"If a busy executive reads only this section, do they know what to do? If not, rewrite it."},
  {id:'context', title:'Business Context', pages:'½ page', color:'#58a6ff',
   content:`Why this analysis was needed\nThe 5 questions you set out to answer\nDataset description (rows, timeframe, source)`,
   rule:"Remind the reader what problem prompted this work — they may have forgotten since the brief."},
  {id:'findings', title:'Key Findings', pages:'2–3 pages', color:'#56d364',
   content:`One finding per section\nChart + one paragraph interpretation\nStat significance if applicable\nBusiness impact in £/₹/$ where possible`,
   rule:"Lead with the insight, not the methodology. 'Category X drives 47% of revenue' beats 'We ran a GroupBy aggregation'."},
  {id:'recs', title:'Recommendations', pages:'1 page', color:'#a78bfa',
   content:`3–5 concrete actions\nOwner + timeline for each\nExpected impact (quantified if possible)\nRisk or caveats`,
   rule:"Every recommendation should link to a finding. If you can't trace it, cut it."},
  {id:'appendix', title:'Appendix', pages:'optional', color:'#6b7785',
   content:`Full methodology details\nSQL queries and Python code\nModel performance tables\nData quality report`,
   rule:"Put technical depth here. Stakeholders who want it can find it. Stakeholders who don't won't be confused by it."},
];

const CapReportVisualization = () => {
  const [sel, setSel] = useState('exec');
  const s = SECTIONS.find(x=>x.id===sel);
  return (
    <div className="caprep-wrap">
      <header className="caprep-head">
        <span className="caprep-badge">Capstone</span>
        <h2>Stakeholder Report Structure</h2>
        <p>Click each section to see what goes inside</p>
      </header>
      <div className="caprep-nav">
        {SECTIONS.map((sc,i)=>(
          <React.Fragment key={sc.id}>
            <button className={`caprep-section ${sel===sc.id?'caprep-section--on':''}`}
              style={sel===sc.id?{borderColor:sc.color,background:sc.color+'20'}:{}} onClick={()=>setSel(sc.id)}>
              <span className="caprep-section-title" style={sel===sc.id?{color:sc.color}:{}}>{sc.title}</span>
              <span className="caprep-section-pages">{sc.pages}</span>
            </button>
            {i<SECTIONS.length-1 && <div className="caprep-divider"></div>}
          </React.Fragment>
        ))}
      </div>
      <div className="caprep-detail" style={{borderLeftColor:s.color}}>
        <pre className="caprep-content"><code>{s.content}</code></pre>
        <div className="caprep-rule"><strong>Rule:</strong> {s.rule}</div>
      </div>
    </div>
  );
};
export default CapReportVisualization;

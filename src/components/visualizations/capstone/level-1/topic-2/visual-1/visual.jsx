/* Lesson: Defining the Business Question
 * Visual: Bad question → refined question → measurable KPIs */
import React, { useState } from 'react';
import './visual.css';

const SCENARIOS = [
  {
    id:'vague',
    label:'Vague question (bad)',
    q:'"How is sales doing?"',
    problems:['No time period specified','No metric defined','No comparison baseline','No actionable output'],
    color:'#f85149',
  },
  {
    id:'better',
    label:'Specific question (better)',
    q:'"Which product categories had below-target revenue in Q4 2024?"',
    problems:['Time: Q4 2024 ✓','Metric: revenue vs target ✓','Scope: by category ✓','Actionable: yes ✓'],
    color:'#f97316',
  },
  {
    id:'best',
    label:'Analytical question (best)',
    q:'"What factors (category, discount %, region, AOV) predict whether an order contributes to a profitable month — and how strong is each factor\'s effect?"',
    problems:['Specific variables listed ✓','Causal framing ✓','Statistical rigor possible ✓','Maps to ML or regression ✓'],
    color:'#56d364',
  },
];

const FRAMEWORK = [
  {letter:'W', word:'Who', example:'Sales team? Finance? Operations?'},
  {letter:'W', word:'What', example:'Revenue? Units? Margin? Retention?'},
  {letter:'W', word:'When', example:'Q4? Last 12 months? YoY?'},
  {letter:'W', word:'Where', example:'Region? Product? Channel?'},
  {letter:'W', word:'Why', example:'Cost cut? Strategy? Stakeholder ask?'},
];

const CapQuestionVisualization = () => {
  const [sel, setSel] = useState('best');
  const s = SCENARIOS.find(x=>x.id===sel);
  return (
    <div className="capq-wrap">
      <header className="capq-head">
        <span className="capq-badge">Capstone</span>
        <h2>Defining the Business Question</h2>
        <p>Before touching data — know exactly what you're answering</p>
      </header>
      <div className="capq-tabs">
        {SCENARIOS.map(sc=><button key={sc.id} className={`capq-tab ${sel===sc.id?'capq-tab--on':''}`}
          style={sel===sc.id?{borderColor:sc.color,color:sc.color}:{}} onClick={()=>setSel(sc.id)}>{sc.label}</button>)}
      </div>
      <div className="capq-question" style={{borderLeftColor:s.color}}>{s.q}</div>
      <div className="capq-checks">
        {s.problems.map((p,i)=>(
          <div key={i} className="capq-check" style={{color:sel==='vague'?'#f85149':'#56d364'}}>{p}</div>
        ))}
      </div>
      <div className="capq-fw-label">5W Framework:</div>
      <div className="capq-fw">
        {FRAMEWORK.map((fw,i)=>(
          <div key={i} className="capq-fw-item">
            <span className="capq-fw-letter">{fw.word}</span>
            <span className="capq-fw-example">{fw.example}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CapQuestionVisualization;

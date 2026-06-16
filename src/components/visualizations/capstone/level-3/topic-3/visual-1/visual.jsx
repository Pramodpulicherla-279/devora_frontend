/* Lesson: Structuring the Data Story
 * Visual: 3-act narrative builder for analyst findings */
import React, { useState } from 'react';
import './visual.css';

const ACTS = [
  {
    id:'setup',
    act:'Act 1: Setup',
    subtitle:'Situation & Complication',
    color:'#58a6ff',
    template:`SITUATION: [Company/team] wanted to understand [topic].
We analysed [X rows, Y months] of order data.

COMPLICATION: Initial review revealed [surprising finding].
This matters because [business impact — £/₹/$].`,
    example:`SITUATION: The sales team wanted to understand what drives
profitable orders. We analysed 1,791 orders from 2024.

COMPLICATION: Discounts above 15% correlate with a 43%
drop in average order value — yet the team is currently
offering 20-30% discounts to acquire new customers.`,
  },
  {
    id:'rising',
    act:'Act 2: Analysis',
    subtitle:'What we found',
    color:'#a78bfa',
    template:`FINDING 1: [Category/region/time insight]
FINDING 2: [Correlation or trend]
FINDING 3: [Statistical significance]

Each finding directly answers the business question.`,
    example:`FINDING 1: Electronics drives 47% of revenue on 33% of orders
— AOV is ₹4,210 vs ₹1,590 for Clothing.

FINDING 2: Q4 revenue is 28% above average (p=0.0008) —
a statistically significant seasonal effect.

FINDING 3: Our model predicts profitable orders at 83% accuracy;
discount % and order amount are the top predictors.`,
  },
  {
    id:'resolution',
    act:'Act 3: Recommendation',
    subtitle:'What to do',
    color:'#56d364',
    template:`RECOMMENDATION: [Specific action]
OWNER: [Team/person]
TIMELINE: [When]
EXPECTED IMPACT: [Quantified benefit]`,
    example:`RECOMMENDATION: Cap new-customer discounts at 10%.
OWNER: Sales Director
TIMELINE: Next quarter rollout
EXPECTED IMPACT: +₹2.4L annual revenue based on model
(assuming discount elasticity holds at current levels).`,
  },
];

const CapStoryVisualization = () => {
  const [sel, setSel] = useState('setup');
  const [view, setView] = useState('template');
  const a = ACTS.find(x=>x.id===sel);
  return (
    <div className="capstory-wrap">
      <header className="capstory-head">
        <span className="capstory-badge">Capstone</span>
        <h2>The Data Story</h2>
        <p>Three acts — every good analyst presentation has them</p>
      </header>
      <div className="capstory-acts">
        {ACTS.map((ac,i)=>(
          <React.Fragment key={ac.id}>
            <button className={`capstory-act ${sel===ac.id?'capstory-act--on':''}`}
              style={sel===ac.id?{borderColor:ac.color,background:ac.color+'18'}:{}} onClick={()=>setSel(ac.id)}>
              <span className="capstory-act-name" style={sel===ac.id?{color:ac.color}:{}}>{ac.act}</span>
              <span className="capstory-act-sub">{ac.subtitle}</span>
            </button>
            {i<2 && <span className="capstory-connector">→</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="capstory-view-tabs">
        <button className={`capstory-vtab ${view==='template'?'capstory-vtab--on':''}`} onClick={()=>setView('template')}>Template</button>
        <button className={`capstory-vtab ${view==='example'?'capstory-vtab--on':''}`} onClick={()=>setView('example')}>Example</button>
      </div>
      <pre className="capstory-text" style={{borderLeftColor:a.color}}><code>{view==='template'?a.template:a.example}</code></pre>
    </div>
  );
};
export default CapStoryVisualization;

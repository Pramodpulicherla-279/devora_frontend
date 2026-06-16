/* Lesson: Statistical Analysis
 * Visual: Hypothesis test walkthrough — 5 steps */
import React, { useState } from 'react';
import './visual.css';

const STEPS = [
  {
    id:1, title:'State hypotheses',
    content:`H₀ (null): Q4 mean revenue = Q1-Q3 mean revenue\nH₁ (alternative): Q4 mean revenue > Q1-Q3 mean revenue\n\nThis is a one-tailed t-test (we believe Q4 is higher)`,
  },
  {
    id:2, title:'Choose significance level',
    content:`α = 0.05 (standard for business analysis)\n\nMeaning: we accept a 5% chance of a false positive\n(rejecting H₀ when it's actually true)`,
  },
  {
    id:3, title:'Run the test',
    content:`from scipy import stats\n\nq4 = df[df['quarter']=='Q4']['revenue']\nrest = df[df['quarter']!='Q4']['revenue']\n\nt_stat, p_value = stats.ttest_ind(q4, rest,\n  alternative='greater')\nprint(f't={t_stat:.2f}, p={p_value:.4f}')`,
  },
  {
    id:4, title:'Interpret results',
    content:`t-statistic = 3.41\np-value = 0.0008\n\np < 0.05 → reject H₀\nQ4 revenue IS statistically significantly higher`,
  },
  {
    id:5, title:'Business interpretation',
    content:`Result: Q4 revenue is ~28% higher than other quarters\n(p=0.0008, 99.9% confidence)\n\nRecommendation: increase inventory and staff in Q3\nto prepare for Q4 demand surge.`,
  },
];

const CapStatsVisualization = () => {
  const [step, setStep] = useState(1);
  const s = STEPS.find(x=>x.id===step);
  return (
    <div className="capstat-wrap">
      <header className="capstat-head">
        <span className="capstat-badge">Capstone</span>
        <h2>Statistical Analysis</h2>
        <p>Hypothesis test walkthrough — 5 steps</p>
      </header>
      <div className="capstat-stepper">
        {STEPS.map(st=>(
          <button key={st.id} className={`capstat-step-btn ${step===st.id?'capstat-step-btn--on':''} ${st.id<step?'capstat-step-btn--done':''}`} onClick={()=>setStep(st.id)}>
            <span className="capstat-step-n">{st.id<step?'✓':st.id}</span>
          </button>
        ))}
        <div className="capstat-step-label">{s.title}</div>
      </div>
      <pre className="capstat-content"><code>{s.content}</code></pre>
      <div className="capstat-nav">
        {step>1 && <button className="capstat-btn" onClick={()=>setStep(step-1)}>← Prev</button>}
        {step<5 && <button className="capstat-btn capstat-btn--next" onClick={()=>setStep(step+1)}>Next →</button>}
      </div>
      <div className="capstat-note">Statistical significance doesn't mean business importance. p=0.0008 tells you the effect is real; the 28% difference tells you it's large enough to act on.</div>
    </div>
  );
};
export default CapStatsVisualization;

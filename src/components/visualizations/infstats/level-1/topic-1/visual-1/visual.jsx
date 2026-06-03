/* Lesson: What is Inferential Statistics
 * Visual type: ILLUSTRATION
 * Reason: The core idea is the population → sample → inference relationship —
 * a structural diagram communicates it instantly; interactivity adds nothing. */
import React, { useState } from 'react';
import './visual.css';

const InfStatsIntroVisualization = () => {
  const [step, setStep] = useState(0);
  const stages = [
    { k: 'population', icon: '🌍', label: 'Population', sub: 'Everyone (often unmeasurable)', detail: 'The entire group you want to know about — e.g. all 1.4 billion people.' },
    { k: 'sample', icon: '🎯', label: 'Sample', sub: 'A measurable subset', detail: 'A random, representative slice you actually collect — e.g. 1,000 people.' },
    { k: 'inference', icon: '🔮', label: 'Inference', sub: 'Conclusion + uncertainty', detail: 'Use the sample to estimate the population — with a margin of error.' },
  ];
  return (
    <div className="isintro-wrap">
      <header className="isintro-head">
        <span className="isintro-badge">Inferential</span>
        <h2>What is Inferential Statistics?</h2>
        <p>Drawing conclusions about a whole from a part</p>
      </header>
      <div className="isintro-flow">
        {stages.map((s, i) => (
          <React.Fragment key={s.k}>
            {i > 0 && <div className="isintro-arrow">→</div>}
            <button className={`isintro-node ${step === i ? 'isintro-node--on' : ''}`} onClick={() => setStep(i)}>
              <span className="isintro-icon">{s.icon}</span>
              <span className="isintro-label">{s.label}</span>
              <span className="isintro-sub">{s.sub}</span>
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className="isintro-detail">{stages[step].detail}</div>
      <div className="isintro-compare">
        <div className="isintro-card"><strong>Descriptive</strong><p>Summarizes the data you <em>have</em>.</p></div>
        <div className="isintro-card isintro-card--hl"><strong>Inferential</strong><p>Generalizes to data you <em>don't</em> have.</p></div>
      </div>
    </div>
  );
};
export default InfStatsIntroVisualization;

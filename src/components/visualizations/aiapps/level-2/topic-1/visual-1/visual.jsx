/* Lesson: Chains & Prompts
 * Visual type: ANIMATION (stepped chain)
 * Reason: A chain pipes one prompt's output into the next. Animating data flowing
 * through each link shows composition far better than static code. */
import React, { useState, useEffect } from 'react';
import './visual.css';

const CHAIN = [
  { label: 'Input', io: 'Long article text…', color: '#7d8590' },
  { label: 'Summarize', io: '3-sentence summary', color: '#38bdf8' },
  { label: 'Translate', io: 'Summary in Spanish', color: '#34d399' },
  { label: 'Format', io: 'Bullet points', color: '#f59e0b' },
  { label: 'Output', io: '✓ Final result', color: '#a78bfa' },
];

const AiAppChainsVisualization = () => {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    if (step >= CHAIN.length - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setStep((s) => s + 1), 850);
    return () => clearTimeout(t);
  }, [playing, step]);
  return (
    <div className="aichain-wrap">
      <header className="aichain-head">
        <span className="aichain-badge">LangChain</span>
        <h2>Chains &amp; Prompts</h2>
        <p>Pipe one LLM step's output into the next</p>
      </header>
      <div className="aichain-flow">
        {CHAIN.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className={`aichain-pipe ${i <= step ? 'aichain-pipe--on' : ''}`}>▼</div>}
            <div className={`aichain-link ${step === i ? 'aichain-link--on' : ''} ${i < step ? 'aichain-link--done' : ''}`} style={step >= i ? { borderColor: c.color } : {}} onClick={() => setStep(i)}>
              <span className="aichain-link-label" style={step >= i ? { color: c.color } : {}}>{c.label}</span>
              <span className="aichain-link-io">{c.io}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="aichain-controls">
        <button className="aichain-btn" onClick={() => { setStep(0); setPlaying(true); }} disabled={playing}>▶ Run chain</button>
        <button className="aichain-btn aichain-btn--reset" onClick={() => { setStep(0); setPlaying(false); }}>Reset</button>
      </div>
      <pre className="aichain-code"><code>{`chain = summarize | translate | format
result = chain.invoke(article)`}</code></pre>
      <div className="aichain-note">Each link is a prompt+LLM step. Chaining composes simple steps into complex behavior — and lets you swap, test, or reorder links independently.</div>
    </div>
  );
};
export default AiAppChainsVisualization;

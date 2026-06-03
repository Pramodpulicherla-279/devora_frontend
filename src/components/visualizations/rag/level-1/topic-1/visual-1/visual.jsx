/* Lesson: Intro to RAG
 * Visual type: ANIMATION (stepped pipeline)
 * Reason: RAG is fundamentally a flow: query → retrieve → augment → generate.
 * Animating a question moving through each stage shows how external knowledge
 * gets injected before generation. */
import React, { useState, useEffect } from 'react';
import './visual.css';

const STEPS = [
  { icon: '❓', label: 'User query', d: '"What is our refund policy?"' },
  { icon: '🔎', label: 'Retrieve', d: 'Embed query → search vector DB → top-k relevant chunks' },
  { icon: '➕', label: 'Augment', d: 'Stuff retrieved chunks into the prompt as context' },
  { icon: '🤖', label: 'Generate', d: 'LLM answers using YOUR documents, not just training data' },
  { icon: '✅', label: 'Grounded answer', d: '"Refunds within 30 days, per policy §4.2" + citation' },
];

const RagIntroVisualization = () => {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    if (step >= STEPS.length - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setStep((s) => s + 1), 1000);
    return () => clearTimeout(t);
  }, [playing, step]);
  return (
    <div className="ragintro-wrap">
      <header className="ragintro-head">
        <span className="ragintro-badge">RAG</span>
        <h2>Intro to RAG</h2>
        <p>Retrieval-Augmented Generation: give the LLM your knowledge</p>
      </header>
      <div className="ragintro-pipe">
        {STEPS.map((s, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className={`ragintro-arrow ${i <= step ? 'ragintro-arrow--on' : ''}`}>▶</div>}
            <div className={`ragintro-stage ${step === i ? 'ragintro-stage--on' : ''} ${i < step ? 'ragintro-stage--done' : ''}`} onClick={() => setStep(i)}>
              <span className="ragintro-icon">{s.icon}</span>
              <span className="ragintro-label">{s.label}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="ragintro-detail"><strong>{STEPS[step].label}</strong><p>{STEPS[step].d}</p></div>
      <div className="ragintro-controls">
        <button className="ragintro-btn" onClick={() => { setStep(0); setPlaying(true); }} disabled={playing}>▶ Run pipeline</button>
        <button className="ragintro-btn ragintro-btn--reset" onClick={() => { setStep(0); setPlaying(false); }}>Reset</button>
      </div>
      <div className="ragintro-note">RAG fixes two LLM weaknesses: <strong>stale knowledge</strong> (it can't know your private/recent data) and <strong>hallucination</strong> (grounding in real sources keeps it honest).</div>
    </div>
  );
};
export default RagIntroVisualization;

/* Lesson: Fine-Tune vs Prompt
 * Visual type: ILLUSTRATION (decision guide)
 * Reason: This is a "which approach when" decision — a comparison + interactive
 * decision helper communicates the trade-offs better than prose. */
import React, { useState } from 'react';
import './visual.css';

const QUESTIONS = [
  { q: 'Do you need new knowledge/facts?', yes: 'rag', no: null },
  { q: 'Do you need a consistent style/format every time?', yes: 'finetune', no: null },
  { q: 'Just need it to follow instructions well?', yes: 'prompt', no: null },
];
const REC = {
  prompt: { label: 'Prompt Engineering', d: 'Cheapest & fastest. Iterate on instructions/examples. Try this FIRST.', color: '#34d399' },
  rag: { label: 'RAG', d: 'Inject knowledge at query time. Best for changing/private facts.', color: '#60a5fa' },
  finetune: { label: 'Fine-Tuning', d: 'Bake behavior/style into the weights. Costly; needs a quality dataset.', color: '#f59e0b' },
};

const RagFineTuneVisualization = () => {
  const [rec, setRec] = useState('prompt');
  return (
    <div className="ragft-wrap">
      <header className="ragft-head">
        <span className="ragft-badge">Fine-Tuning</span>
        <h2>Fine-Tune vs Prompt vs RAG</h2>
        <p>Three ways to adapt an LLM — pick the cheapest that works</p>
      </header>
      <div className="ragft-picker">
        {Object.entries(REC).map(([k, v]) => (
          <button key={k} className={`ragft-pick ${rec === k ? 'ragft-pick--on' : ''}`} style={rec === k ? { borderColor: v.color, color: v.color } : {}} onClick={() => setRec(k)}>{v.label}</button>
        ))}
      </div>
      <div className="ragft-rec" style={{ borderColor: REC[rec].color }}>
        <strong style={{ color: REC[rec].color }}>{REC[rec].label}</strong>
        <p>{REC[rec].d}</p>
      </div>
      <div className="ragft-table">
        <div className="ragft-trow ragft-trow--head"><span></span><span>Cost</span><span>New facts?</span><span>New behavior?</span></div>
        <div className="ragft-trow"><span>Prompt</span><span>$</span><span>✗</span><span>limited</span></div>
        <div className="ragft-trow"><span>RAG</span><span>$$</span><span>✓✓</span><span>✗</span></div>
        <div className="ragft-trow"><span>Fine-tune</span><span>$$$</span><span>✗</span><span>✓✓</span></div>
      </div>
      <div className="ragft-note">Golden rule: <strong>Prompt → RAG → Fine-tune</strong>, in that order. Only fine-tune when prompting &amp; RAG genuinely can't get you there — it's the most expensive and least flexible option.</div>
    </div>
  );
};
export default RagFineTuneVisualization;

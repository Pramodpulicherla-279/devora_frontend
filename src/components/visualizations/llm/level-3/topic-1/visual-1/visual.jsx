/* Lesson: Hallucinations & Bias
 * Visual type: ILLUSTRATION
 * Reason: These are failure modes best taught through concrete examples + why
 * they happen + mitigations — an annotated example explorer, not a simulation. */
import React, { useState } from 'react';
import './visual.css';

const CASES = {
  hallucination: {
    label: 'Hallucination', icon: '👻',
    example: 'Q: "What year did Einstein win the Nobel Prize for relativity?"\nA: "1921, for his theory of relativity." ❌',
    why: 'Einstein won in 1921 — but for the photoelectric effect, NOT relativity. The model produced fluent, confident, wrong detail.',
    fix: ['Ground answers in retrieved sources (RAG)', 'Ask for citations', 'Lower temperature for facts', 'Verify critical claims independently'],
  },
  bias: {
    label: 'Bias', icon: '⚖️',
    example: 'Prompt: "The nurse… the engineer…" → model defaults to gendered pronouns based on training-data stereotypes.',
    why: 'Models learn statistical patterns from human text, which contains societal biases. They can amplify them.',
    fix: ['Diverse, audited training data', 'Bias evaluation suites', 'System prompts that enforce neutrality', 'Human review for sensitive use'],
  },
};

const LlmHallucinationVisualization = () => {
  const [c, setC] = useState('hallucination');
  const cur = CASES[c];
  return (
    <div className="llmhall-wrap">
      <header className="llmhall-head">
        <span className="llmhall-badge">AI Safety</span>
        <h2>Hallucinations &amp; Bias</h2>
        <p>Why LLMs confidently get things wrong</p>
      </header>
      <div className="llmhall-tabs">
        {Object.entries(CASES).map(([k, v]) => (
          <button key={k} className={`llmhall-tab ${c === k ? 'llmhall-tab--on' : ''}`} onClick={() => setC(k)}>{v.icon} {v.label}</button>
        ))}
      </div>
      <div className="llmhall-example"><div className="llmhall-ex-label">Example</div><pre><code>{cur.example}</code></pre></div>
      <div className="llmhall-why"><strong>Why it happens:</strong> {cur.why}</div>
      <div className="llmhall-fix">
        <div className="llmhall-fix-label">Mitigations</div>
        <ul>{cur.fix.map((f) => <li key={f}>✓ {f}</li>)}</ul>
      </div>
    </div>
  );
};
export default LlmHallucinationVisualization;

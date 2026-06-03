/* Lesson: Red-Teaming & Hallucination Detection
 * Visual type: ILLUSTRATION
 * Reason: This is about categories of adversarial tests + detection tactics — an
 * explorable catalog of attack types and how to catch failures fits best. */
import React, { useState } from 'react';
import './visual.css';

const TESTS = {
  jailbreak: { icon: '🔓', label: 'Jailbreaks', d: 'Try to bypass safety rules ("pretend you have no restrictions").', defense: 'System prompts, refusal training, output filters.' },
  injection: { icon: '💉', label: 'Prompt Injection', d: 'Hide instructions in user data to hijack behavior.', defense: 'Separate instructions from data; sanitize inputs.' },
  hallucination: { icon: '👻', label: 'Hallucination', d: 'Probe for confident-but-false facts.', defense: 'Ground in sources; check claims vs retrieved context.' },
  pii: { icon: '🔐', label: 'PII Leakage', d: 'Coax the model into revealing private/training data.', defense: 'Output scanning, redaction, access controls.' },
};

const AiAppRedTeamVisualization = () => {
  const [t, setT] = useState('jailbreak');
  return (
    <div className="aired-wrap">
      <header className="aired-head">
        <span className="aired-badge">AI Safety</span>
        <h2>Red-Teaming &amp; Hallucination Detection</h2>
        <p>Attack your own app before users (or attackers) do</p>
      </header>
      <div className="aired-tabs">
        {Object.entries(TESTS).map(([k, v]) => (
          <button key={k} className={`aired-tab ${t === k ? 'aired-tab--on' : ''}`} onClick={() => setT(k)}>{v.icon} {v.label}</button>
        ))}
      </div>
      <div className="aired-detail">
        <div className="aired-attack"><span className="aired-l">Attack</span><p>{TESTS[t].d}</p></div>
        <div className="aired-defense"><span className="aired-l">Defense</span><p>{TESTS[t].defense}</p></div>
      </div>
      <div className="aired-detection">
        <h3>Hallucination detection tactics</h3>
        <div className="aired-tactics">
          <div className="aired-tactic">Cross-check answer against retrieved sources</div>
          <div className="aired-tactic">Ask the model to cite — then verify citations exist</div>
          <div className="aired-tactic">Self-consistency: sample N times, flag disagreement</div>
          <div className="aired-tactic">Confidence thresholds + human review for high-stakes</div>
        </div>
      </div>
      <div className="aired-note">Red-teaming is continuous, not one-off. Maintain a growing suite of adversarial test cases and run it on every prompt/model change.</div>
    </div>
  );
};
export default AiAppRedTeamVisualization;

/* Lesson: Building Responsible AI Features
 * Visual: Safeguard checklist → responsibility score */
import { useState } from 'react';
import './visual.css';

const SAFEGUARDS = [
  { k: 'disclose', label: 'Disclose AI use to users', why: 'People should know they\'re talking to AI.' },
  { k: 'human', label: 'Human oversight on high-stakes output', why: 'Keep a person in the loop for consequential decisions.' },
  { k: 'moderate', label: 'Moderate inputs & outputs', why: 'Filter harmful content both ways.' },
  { k: 'privacy', label: 'Protect user data & PII', why: "Don't log or leak sensitive data into prompts." },
  { k: 'bias', label: 'Test for bias across groups', why: 'Check outputs are fair across demographics.' },
  { k: 'fallback', label: 'Graceful fallback on failure', why: 'Handle refusals, errors, and low confidence.' },
];

export default function LlmResponsibleAiVisualization() {
  const [on, setOn] = useState({});
  const score = Object.values(on).filter(Boolean).length;
  const pct = Math.round((score / SAFEGUARDS.length) * 100);

  return (
    <div className="llmresp-wrap">
      <h3 className="llmresp-title">Building Responsible AI Features</h3>
      <p className="llmresp-sub">Ship AI that's safe, fair, and trustworthy — tick the safeguards</p>

      <div className="llmresp-score">
        <div className="llmresp-score-bar"><div className="llmresp-score-fill" style={{ width: pct + '%', background: pct === 100 ? '#56d364' : pct >= 50 ? '#f0883e' : '#f85149' }} /></div>
        <div className="llmresp-score-num">{score}/{SAFEGUARDS.length} safeguards{pct === 100 ? ' — production-responsible ✅' : ''}</div>
      </div>

      <div className="llmresp-list">
        {SAFEGUARDS.map(s => (
          <button key={s.k} className={`llmresp-item ${on[s.k] ? 'llmresp-item-on' : ''}`} onClick={() => setOn(p => ({ ...p, [s.k]: !p[s.k] }))}>
            <span className="llmresp-box">{on[s.k] ? '✓' : ''}</span>
            <span className="llmresp-item-body">
              <span className="llmresp-item-label">{s.label}</span>
              <span className="llmresp-item-why">{s.why}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* Lesson: What Is Probability and Why It Matters for Analysts
 * Visual type: ILLUSTRATION
 * Reason: The lesson's hook is "Feb revenue is down 18% — is this noise or a real
 * trend?" That question is the gap between descriptive and inferential stats. A
 * bridging diagram showing: observed difference → probability model → inference
 * conclusion makes the entire course's purpose click in one glance. */
import React, { useState } from 'react';
import './visual.css';

const SCENARIOS = [
  {
    id: 'noise',
    label: 'Random noise',
    prob: 0.32,
    verdict: 'Fail to reject H₀',
    color: '#56d364',
    msg: 'A drop this large happens ~32% of the time by chance alone. Not convincing evidence of a real trend.',
  },
  {
    id: 'borderline',
    label: 'Borderline',
    prob: 0.06,
    verdict: 'Borderline (p ≈ 0.06)',
    color: '#f0883e',
    msg: 'Rare but not rare enough. With α = 0.05, we cannot confidently say this is a real effect.',
  },
  {
    id: 'real',
    label: 'Real effect',
    prob: 0.008,
    verdict: 'Reject H₀ — real drop',
    color: '#f85149',
    msg: 'Less than 1% chance of seeing this under normal variation. Strong evidence of a genuine decline.',
  },
];

const InfStatsProbIntroVisualization = () => {
  const [sel, setSel] = useState('noise');
  const sc = SCENARIOS.find(s => s.id === sel);

  return (
    <div className="isfpi-wrap">
      <header className="isfpi-head">
        <span className="isfpi-badge">Inferential</span>
        <h2>What Is Probability?</h2>
        <p>"Is this drop real — or just noise?"</p>
      </header>

      <div className="isfpi-bridge">
        <div className="isfpi-node isfpi-node--obs">
          <span className="isfpi-node-label">Observed</span>
          <strong>−18%</strong>
          <span className="isfpi-node-sub">Feb vs Jan</span>
        </div>
        <div className="isfpi-arrow">→</div>
        <div className="isfpi-node isfpi-node--prob">
          <span className="isfpi-node-label">Probability model</span>
          <strong>P = {sc.prob}</strong>
          <span className="isfpi-node-sub">under H₀</span>
        </div>
        <div className="isfpi-arrow">→</div>
        <div className="isfpi-node" style={{ borderColor: sc.color }}>
          <span className="isfpi-node-label">Inference</span>
          <strong style={{ color: sc.color }}>{sc.verdict}</strong>
        </div>
      </div>

      <div className="isfpi-toggle">
        {SCENARIOS.map(s => (
          <button key={s.id} className={`isfpi-t ${sel === s.id ? 'isfpi-t--on' : ''}`} style={sel === s.id ? { borderColor: s.color, color: s.color } : {}} onClick={() => setSel(s.id)}>{s.label}</button>
        ))}
      </div>

      <div className="isfpi-msg">{sc.msg}</div>

      <div className="isfpi-pillars">
        <div className="isfpi-pillar">
          <span className="isfpi-pillar-h">Descriptive stats</span>
          <span className="isfpi-pillar-b">What happened<br/><em>in the sample</em></span>
        </div>
        <div className="isfpi-vs">VS</div>
        <div className="isfpi-pillar isfpi-pillar--inf">
          <span className="isfpi-pillar-h">Inferential stats</span>
          <span className="isfpi-pillar-b">What it means<br/><em>for the population</em></span>
        </div>
      </div>

      <div className="isfpi-note">
        Probability is the bridge. Every p-value, confidence interval, and hypothesis test is a probability calculation dressed up for a business question.
      </div>
    </div>
  );
};

export default InfStatsProbIntroVisualization;

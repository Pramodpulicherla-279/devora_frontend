/* Lesson: Hypothesis Testing
 * Visual type: INTERACTIVE (stepped flow)
 * Reason: Hypothesis testing is a decision procedure — stepping through H0 → test
 * statistic → decision, with a worked example, teaches the workflow better than prose. */
import React, { useState } from 'react';
import './visual.css';

const STEPS = [
  { t: 'State hypotheses', d: 'H₀ (null): no effect — "the coin is fair". H₁ (alternative): there is an effect.', code: 'H₀: p = 0.5\nH₁: p ≠ 0.5' },
  { t: 'Choose α', d: 'The significance level — the risk of a false positive you\'ll tolerate (usually 0.05).', code: 'α = 0.05' },
  { t: 'Collect data & compute statistic', d: 'Gather the sample and calculate a test statistic (z, t, χ²…).', code: 'flips = 100, heads = 65\nz = 3.0' },
  { t: 'Compare to threshold', d: 'Find the p-value. If p < α, the result is too surprising under H₀.', code: 'p = 0.003  <  α = 0.05' },
  { t: 'Decide', d: 'Reject H₀ (evidence of an effect) or fail to reject (not enough evidence).', code: '→ Reject H₀: coin looks biased' },
];

const InfStatsHypothesisVisualization = () => {
  const [step, setStep] = useState(0);
  return (
    <div className="ishyp-wrap">
      <header className="ishyp-head">
        <span className="ishyp-badge">Inferential</span>
        <h2>Hypothesis Testing</h2>
        <p>A 5-step decision procedure under uncertainty</p>
      </header>
      <div className="ishyp-track">
        {STEPS.map((s, i) => (
          <button key={i} className={`ishyp-dot ${step === i ? 'ishyp-dot--on' : ''} ${i < step ? 'ishyp-dot--done' : ''}`} onClick={() => setStep(i)}>{i + 1}</button>
        ))}
      </div>
      <div className="ishyp-card">
        <div className="ishyp-step-title">Step {step + 1}: {STEPS[step].t}</div>
        <p className="ishyp-step-desc">{STEPS[step].d}</p>
        <pre className="ishyp-code"><code>{STEPS[step].code}</code></pre>
      </div>
      <div className="ishyp-nav">
        <button className="ishyp-btn" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>← Prev</button>
        <button className="ishyp-btn ishyp-btn--next" disabled={step === STEPS.length - 1} onClick={() => setStep((s) => s + 1)}>Next →</button>
      </div>
      <div className="ishyp-warn">⚠️ You never "prove" H₀ — you either reject it or fail to reject it.</div>
    </div>
  );
};
export default InfStatsHypothesisVisualization;

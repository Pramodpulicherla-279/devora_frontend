/* Lesson: A/B Testing
 * Visual type: INTERACTIVE
 * Reason: A/B testing is conversion-rate comparison + significance. Letting the
 * learner set each variant's conversions and sample size and seeing the "winner"
 * verdict (with a significance check) mirrors a real experiment dashboard. */
import React, { useState } from 'react';
import './visual.css';

const InfStatsABVisualization = () => {
  const [aConv, setAConv] = useState(100);
  const [bConv, setBConv] = useState(125);
  const n = 1000;
  const pA = aConv / n, pB = bConv / n;
  const se = Math.sqrt(pA * (1 - pA) / n + pB * (1 - pB) / n);
  const z = se ? Math.abs(pB - pA) / se : 0;
  const significant = z > 1.96;
  const lift = pA ? ((pB - pA) / pA) * 100 : 0;

  return (
    <div className="isab-wrap">
      <header className="isab-head">
        <span className="isab-badge">Inferential</span>
        <h2>A/B Testing</h2>
        <p>Is variant B really better, or just luck?</p>
      </header>
      <div className="isab-variants">
        <div className="isab-variant isab-variant--a">
          <div className="isab-vtag">A (control)</div>
          <div className="isab-rate">{(pA * 100).toFixed(1)}%</div>
          <div className="isab-vsub">{aConv} / {n} converted</div>
          <input type="range" min="50" max="300" value={aConv} onChange={(e) => setAConv(Number(e.target.value))} className="isab-slider" />
        </div>
        <div className="isab-vs">VS</div>
        <div className="isab-variant isab-variant--b">
          <div className="isab-vtag">B (variant)</div>
          <div className="isab-rate">{(pB * 100).toFixed(1)}%</div>
          <div className="isab-vsub">{bConv} / {n} converted</div>
          <input type="range" min="50" max="300" value={bConv} onChange={(e) => setBConv(Number(e.target.value))} className="isab-slider isab-slider--b" />
        </div>
      </div>
      <div className={`isab-verdict ${significant ? (pB > pA ? 'isab-verdict--win' : 'isab-verdict--lose') : 'isab-verdict--none'}`}>
        {significant ? `${pB > pA ? 'B wins' : 'A wins'} — statistically significant (z = ${z.toFixed(2)})` : `No significant difference yet (z = ${z.toFixed(2)} < 1.96)`}
      </div>
      <div className="isab-stats">
        <div className="isab-stat"><span>Lift</span><strong style={{ color: lift >= 0 ? '#34d399' : '#f85149' }}>{lift >= 0 ? '+' : ''}{lift.toFixed(1)}%</strong></div>
        <div className="isab-stat"><span>z-score</span><strong>{z.toFixed(2)}</strong></div>
      </div>
      <div className="isab-note">A difference isn't real until it's <strong>significant</strong> — small samples produce noisy "winners". Bigger n → more reliable verdicts.</div>
    </div>
  );
};
export default InfStatsABVisualization;

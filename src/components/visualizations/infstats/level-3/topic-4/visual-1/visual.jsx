/* Lesson: A/B Testing for Analysts — Designing and Interpreting Experiments
 * Visual type: INTERACTIVE
 * Reason: A/B testing is the capstone of the course. A mini experiment dashboard
 * where the analyst sets conversion rates and sample sizes and then sees whether
 * the result is significant mirrors a real experiment workflow end-to-end. */
import React, { useState } from 'react';
import './visual.css';

function zTest(cA, nA, cB, nB) {
  if (!nA || !nB) return 0;
  const pA = cA / nA, pB = cB / nB;
  const pp = (cA + cB) / (nA + nB);
  const se = Math.sqrt(pp * (1 - pp) * (1 / nA + 1 / nB));
  if (!se) return 0;
  return (pB - pA) / se;
}

const InfStatsABTestVisualization = () => {
  const [nA, setNA] = useState(500);
  const [nB, setNB] = useState(500);
  const [cA, setCA] = useState(21);
  const [cB, setCB] = useState(28);

  const pA = nA ? ((cA / nA) * 100).toFixed(1) : 0;
  const pB = nB ? ((cB / nB) * 100).toFixed(1) : 0;
  const lift = pA > 0 ? (((pB - pA) / pA) * 100).toFixed(1) : 0;
  const z = zTest(cA, nA, cB, nB);
  const sig = Math.abs(z) >= 1.96;
  const pVal = sig ? (2 * (1 - 0.9772)) : (2 * (0.5 + Math.min(Math.abs(z), 1.5) * 0.15));

  return (
    <div className="isab-wrap">
      <header className="isab-head">
        <span className="isab-badge">Inferential</span>
        <h2>A/B Testing</h2>
        <p>Design → measure → decide</p>
      </header>

      <div className="isab-variants">
        <div className="isab-variant">
          <div className="isab-var-hd isab-var-hd--a">Variant A (Control)</div>
          <label className="isab-field"><span>Visitors</span>
            <input type="number" value={nA} min={50} max={5000} onChange={e => setNA(+e.target.value)} className="isab-input" />
          </label>
          <label className="isab-field"><span>Conversions</span>
            <input type="number" value={cA} min={0} max={nA} onChange={e => setCA(+e.target.value)} className="isab-input" />
          </label>
          <div className="isab-rate isab-rate--a">{pA}%</div>
        </div>
        <div className="isab-vs">VS</div>
        <div className="isab-variant">
          <div className="isab-var-hd isab-var-hd--b">Variant B (Test)</div>
          <label className="isab-field"><span>Visitors</span>
            <input type="number" value={nB} min={50} max={5000} onChange={e => setNB(+e.target.value)} className="isab-input" />
          </label>
          <label className="isab-field"><span>Conversions</span>
            <input type="number" value={cB} min={0} max={nB} onChange={e => setCB(+e.target.value)} className="isab-input" />
          </label>
          <div className="isab-rate isab-rate--b">{pB}%</div>
        </div>
      </div>

      <div className="isab-bar-wrap">
        <div className="isab-bar-row"><span>A</span><div className="isab-bar-bg"><div className="isab-bar isab-bar--a" style={{ width: `${Math.min(pA, 30) / 30 * 100}%` }} /></div><span>{pA}%</span></div>
        <div className="isab-bar-row"><span>B</span><div className="isab-bar-bg"><div className="isab-bar isab-bar--b" style={{ width: `${Math.min(pB, 30) / 30 * 100}%` }} /></div><span>{pB}%</span></div>
      </div>

      <div className="isab-result">
        <div className="isab-stat"><span>Lift</span><strong style={{ color: +lift > 0 ? '#56d364' : '#f85149' }}>{+lift > 0 ? '+' : ''}{lift}%</strong></div>
        <div className="isab-stat"><span>z-score</span><strong style={{ color: sig ? '#56d364' : '#a3adbb' }}>{z.toFixed(2)}</strong></div>
        <div className="isab-stat"><span>p-value</span><strong style={{ color: sig ? '#56d364' : '#f85149' }}>~{pVal < 0.05 ? '<0.05' : pVal.toFixed(2)}</strong></div>
        <div className="isab-stat"><span>Decision</span><strong style={{ color: sig ? '#56d364' : '#f85149' }}>{sig ? 'Ship B ✓' : 'Keep A'}</strong></div>
      </div>

      <div className="isab-note">
        Never peek mid-experiment and stop early when p &lt; 0.05 — that inflates α. Set your n via a power analysis <em>before</em> you start, run the full experiment, then read the result once.
      </div>
    </div>
  );
};

export default InfStatsABTestVisualization;

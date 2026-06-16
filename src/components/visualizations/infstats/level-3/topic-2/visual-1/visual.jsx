/* Lesson: Type I and Type II Errors — False Positives and False Negatives
 * Visual type: ILLUSTRATION
 * Reason: The 2×2 decision matrix (Reality × Decision) is the canonical way to
 * teach this. Making it clickable — selecting a cell to see the real-world
 * consequence — connects abstract error names to the A/B test story from the lesson. */
import React, { useState } from 'react';
import './visual.css';

const CELLS = {
  tp: { label: 'True Positive', sub: 'Correct Rejection', color: '#56d364', desc: 'You shipped the new checkout flow. It really does convert better. Evidence and reality agree. ✓', cost: 'No cost' },
  fp: { label: 'Type I Error', sub: 'False Positive (α)', color: '#f85149', desc: 'You shipped the new checkout flow — but the original test was a fluke. Six weeks later: no real lift. This is the error α controls.', cost: 'Wasted engineering + bad decision' },
  fn: { label: 'Type II Error', sub: 'False Negative (β)', color: '#f0883e', desc: 'You ran the pricing page test. p = 0.12 — "not significant." You reverted. But the new page really did convert better. You missed a real win.', cost: 'Missed opportunity' },
  tn: { label: 'True Negative', sub: 'Correct Acceptance', color: '#56d364', desc: 'Your test found no effect, and there was no effect. You correctly kept the original. ✓', cost: 'No cost' },
};

const InfStatsErrorTypesVisualization = () => {
  const [sel, setSel] = useState('fp');
  const c = CELLS[sel];

  return (
    <div className="iserr-wrap">
      <header className="iserr-head">
        <span className="iserr-badge">Inferential</span>
        <h2>Type I &amp; Type II Errors</h2>
        <p>Four possible outcomes — two of them are wrong</p>
      </header>

      <div className="iserr-matrix">
        <div className="iserr-col-hd"></div>
        <div className="iserr-col-hd">H₀ True (no effect)</div>
        <div className="iserr-col-hd">H₀ False (real effect)</div>

        <div className="iserr-row-hd">Reject H₀</div>
        <button className={`iserr-cell iserr-cell--fp ${sel === 'fp' ? 'iserr-cell--sel' : ''}`} onClick={() => setSel('fp')}>
          <strong>Type I Error</strong><span>α = P(FP)</span>
        </button>
        <button className={`iserr-cell iserr-cell--tp ${sel === 'tp' ? 'iserr-cell--sel' : ''}`} onClick={() => setSel('tp')}>
          <strong>True Positive</strong><span>Power = 1−β</span>
        </button>

        <div className="iserr-row-hd">Fail to Reject</div>
        <button className={`iserr-cell iserr-cell--tn ${sel === 'tn' ? 'iserr-cell--sel' : ''}`} onClick={() => setSel('tn')}>
          <strong>True Negative</strong><span>1 − α</span>
        </button>
        <button className={`iserr-cell iserr-cell--fn ${sel === 'fn' ? 'iserr-cell--sel' : ''}`} onClick={() => setSel('fn')}>
          <strong>Type II Error</strong><span>β = P(FN)</span>
        </button>
      </div>

      <div className="iserr-detail" style={{ borderColor: c.color }}>
        <div className="iserr-detail-hd">
          <strong style={{ color: c.color }}>{c.label}</strong>
          <span>({c.sub})</span>
        </div>
        <p className="iserr-desc">{c.desc}</p>
        <div className="iserr-cost"><span>Business cost:</span> {c.cost}</div>
      </div>

      <div className="iserr-trade">
        <div className="iserr-trade-item">Reducing α → raises β</div>
        <div className="iserr-trade-arrow">⟺</div>
        <div className="iserr-trade-item">Reducing β → raises α</div>
      </div>

      <div className="iserr-note">
        You can't eliminate both errors at once. The trade-off is managed by choosing α, running a power analysis, and collecting enough data — not by hoping the test comes out significant.
      </div>
    </div>
  );
};

export default InfStatsErrorTypesVisualization;

import { useState } from 'react';
import './visual.css';

export default function MfBayesVisualization() {
  const [pSpam, setPSpam] = useState(0.3);
  const [pWordSpam, setPWordSpam] = useState(0.8);
  const pWordHam = 0.1;

  const pWord = pWordSpam * pSpam + pWordHam * (1 - pSpam);
  const pSpamWord = (pWordSpam * pSpam) / pWord;

  const fmt = v => (v * 100).toFixed(1) + '%';

  return (
    <div className="mfbayes-root">
      <h3 className="mfbayes-title">Bayes' Theorem</h3>

      <div className="mfbayes-formula">
        <span className="mfbayes-term" style={{ color: '#58a6ff' }}>P(spam|word)</span>
        <span className="mfbayes-eq"> = </span>
        <div className="mfbayes-fraction">
          <span className="mfbayes-num">
            <span style={{ color: '#a78bfa' }}>P(word|spam)</span>
            &nbsp;·&nbsp;
            <span style={{ color: '#56d364' }}>P(spam)</span>
          </span>
          <span className="mfbayes-line" />
          <span className="mfbayes-den">P(word)</span>
        </div>
      </div>

      <div className="mfbayes-controls">
        <div className="mfbayes-ctrl">
          <label className="mfbayes-lbl">P(spam) = <b style={{ color: '#56d364' }}>{fmt(pSpam)}</b></label>
          <input type="range" min={0.05} max={0.95} step={0.05} value={pSpam}
            onChange={e => setPSpam(Number(e.target.value))} className="mfbayes-slider" />
        </div>
        <div className="mfbayes-ctrl">
          <label className="mfbayes-lbl">P(word|spam) = <b style={{ color: '#a78bfa' }}>{fmt(pWordSpam)}</b></label>
          <input type="range" min={0.1} max={1.0} step={0.05} value={pWordSpam}
            onChange={e => setPWordSpam(Number(e.target.value))} className="mfbayes-slider" />
        </div>
        <div className="mfbayes-fixed">P(word|ham) = 10% (fixed)</div>
      </div>

      <div className="mfbayes-steps">
        <div className="mfbayes-step">
          <span className="mfbayes-step-label">P(word)</span>
          <span className="mfbayes-step-calc">
            = {fmt(pWordSpam)} × {fmt(pSpam)} + {fmt(pWordHam)} × {fmt(1 - pSpam)}
          </span>
          <span className="mfbayes-step-val">= {fmt(pWord)}</span>
        </div>
        <div className="mfbayes-step">
          <span className="mfbayes-step-label">P(spam|word)</span>
          <span className="mfbayes-step-calc">
            = ({fmt(pWordSpam)} × {fmt(pSpam)}) / {fmt(pWord)}
          </span>
          <span className="mfbayes-step-val mfbayes-result">{fmt(pSpamWord)}</span>
        </div>
      </div>

      <div className="mfbayes-bar-wrap">
        <div className="mfbayes-bar-inner" style={{ width: `${pSpamWord * 100}%` }} />
        <span className="mfbayes-bar-label">Probability this email is spam: {fmt(pSpamWord)}</span>
      </div>
    </div>
  );
}

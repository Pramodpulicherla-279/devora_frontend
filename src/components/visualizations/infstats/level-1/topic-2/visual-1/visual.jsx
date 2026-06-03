/* Lesson: Probability Basics
 * Visual type: INTERACTIVE
 * Reason: Probability becomes concrete when you run many trials and watch the
 * observed frequency converge to the theoretical probability (law of large numbers). */
import React, { useState } from 'react';
import './visual.css';

const InfStatsProbabilityVisualization = () => {
  const [heads, setHeads] = useState(0);
  const [total, setTotal] = useState(0);
  const flip = (n) => {
    let h = 0; for (let i = 0; i < n; i++) if (Math.random() < 0.5) h++;
    setHeads((p) => p + h); setTotal((p) => p + n);
  };
  const reset = () => { setHeads(0); setTotal(0); };
  const pct = total ? (heads / total) * 100 : 50;

  return (
    <div className="isprob-wrap">
      <header className="isprob-head">
        <span className="isprob-badge">Inferential</span>
        <h2>Probability Basics</h2>
        <p>Theoretical 50% vs observed — watch them converge</p>
      </header>
      <div className="isprob-gauge">
        <div className="isprob-bar">
          <div className="isprob-fill" style={{ width: `${pct}%` }} />
          <div className="isprob-target" style={{ left: '50%' }} />
        </div>
        <div className="isprob-readout">
          <span>Heads: <strong>{heads}</strong> / {total}</span>
          <span className="isprob-pct">{pct.toFixed(1)}%</span>
        </div>
      </div>
      <div className="isprob-btns">
        <button className="isprob-btn" onClick={() => flip(1)}>Flip 1</button>
        <button className="isprob-btn" onClick={() => flip(10)}>Flip 10</button>
        <button className="isprob-btn isprob-btn--big" onClick={() => flip(1000)}>Flip 1,000</button>
        <button className="isprob-btn isprob-btn--reset" onClick={reset}>Reset</button>
      </div>
      <div className="isprob-rules">
        <div className="isprob-rule"><code>P(event)</code> = favorable ÷ total outcomes</div>
        <div className="isprob-rule"><code>0 ≤ P ≤ 1</code> — impossible to certain</div>
        <div className="isprob-rule">Law of large numbers: more trials → observed ≈ theoretical</div>
      </div>
      {total >= 1000 && <div className="isprob-insight">⚡ With {total} flips, the observed rate is hugging the true 50%.</div>}
    </div>
  );
};
export default InfStatsProbabilityVisualization;

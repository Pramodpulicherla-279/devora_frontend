import { useState } from 'react';
import './visual.css';

const GUARDS = [
  { code: "if (typeof x === 'string')", narrows: 'string', removes: ['number', 'null'] },
  { code: "else if (x === null)", narrows: 'null', removes: ['number'] },
  { code: 'else', narrows: 'number', removes: [] },
];

export default function TsNarrowingVisualization() {
  const [step, setStep] = useState(0);

  const remaining = ['string', 'number', 'null'].filter(t => {
    for (let i = 0; i < step; i++) {
      if (GUARDS[i].narrows === t && i < step) return false;
    }
    return true;
  });

  const currentType = step === 0 ? 'string | number | null' : GUARDS[step - 1].narrows;

  return (
    <div className="tsnarrow-wrap">
      <h3 className="tsnarrow-title">Type Narrowing & Assertions</h3>
      <p className="tsnarrow-sub">Guards progressively narrow a union to a single type</p>

      <div className="tsnarrow-start">
        <span className="tsnarrow-start-label">Starting type:</span>
        <code className="tsnarrow-union">string | number | null</code>
      </div>

      <div className="tsnarrow-flow">
        {GUARDS.map((g, i) => (
          <button key={i} className={`tsnarrow-guard ${step > i ? 'tsnarrow-guard-applied' : ''} ${step === i + 1 ? 'tsnarrow-guard-current' : ''}`}
            onClick={() => setStep(i + 1)}>
            <code className="tsnarrow-guard-code">{g.code}</code>
            <span className="tsnarrow-guard-narrows">→ narrows to <strong>{g.narrows}</strong></span>
          </button>
        ))}
      </div>

      <div className="tsnarrow-typebox">
        <span className="tsnarrow-typebox-label">Type at this point:</span>
        <code className="tsnarrow-typebox-val">{currentType}</code>
      </div>

      <div className="tsnarrow-controls">
        <button className="tsnarrow-ctrl" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>← Back</button>
        <span className="tsnarrow-step">Step {step} / {GUARDS.length}</span>
        <button className="tsnarrow-ctrl" onClick={() => setStep(s => Math.min(GUARDS.length, s + 1))} disabled={step === GUARDS.length}>Next →</button>
      </div>

      <div className="tsnarrow-assert">
        <span className="tsnarrow-assert-tag">⚠️ Assertion</span>
        <code>value as string</code> skips the check entirely — you're telling TS "trust me". Use sparingly; it can hide real bugs.
      </div>
    </div>
  );
}

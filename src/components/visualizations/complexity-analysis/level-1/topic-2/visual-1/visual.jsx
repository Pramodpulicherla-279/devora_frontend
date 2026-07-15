/* Lesson: Big O Notation Explained — Reading O(n), O(1), and Beyond
 * 2D animated: an operation-count expression is simplified to Big-O by dropping constants
 * and lower-order terms — the non-dominant terms fade out step by step. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const EXAMPLES = [
  { terms: [{ t: '3n²', keep: true }, { t: '5n', keep: false }, { t: '10', keep: false }], bigO: 'O(n²)' },
  { terms: [{ t: '2n', keep: true }, { t: '100', keep: false }], bigO: 'O(n)' },
  { terms: [{ t: '7', keep: true }], bigO: 'O(1)' },
  { terms: [{ t: 'n', keep: true }, { t: 'log n', keep: false }], bigO: 'O(n)' },
];

export default function CaBigONotationVisualization() {
  const [ex, setEx] = useState(0);
  const [step, setStep] = useState(0); // 0 full, 1 drop constants, 2 keep dominant
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => { if (step < 2) setStep(s => s + 1); else { setStep(0); setEx(e => (e + 1) % EXAMPLES.length); } }, 1.4, auto, [step, ex]);
  const e = EXAMPLES[ex];

  return (
    <Stage2D
      title="Big O: keep the dominant term"
      subtitle="Big O describes growth as n → ∞. Two rules: drop constant coefficients, then keep only the fastest-growing term."
      accent="#a78bfa"
      viewBox="0 0 640 220"
      controls={
        <>
          <div className="dsa2d-group">{EXAMPLES.map((x, i) => <button key={i} className={`dsa2d-btn ${ex === i ? 'dsa2d-btn--on' : ''}`} onClick={() => { setEx(i); setStep(0); }}>{x.terms.map(t => t.t).join(' + ')}</button>)}</div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">→ {e.bigO}</span>
        </>
      }
      legend={<>Step 1: drop constant multipliers (<code>3n²</code> → <code>n²</code>). Step 2: keep only the dominant term as n grows — <code>{e.terms.map(t => t.t).join(' + ')}</code> becomes <strong>{e.bigO}</strong>. Constants and small terms are irrelevant at scale.</>}
    >
      <text x="24" y="50" fill="#8b949e" fontSize="13" fontFamily="system-ui">operation count:</text>
      {e.terms.map((t, i) => {
        const faded = (step >= 2 && !t.keep) || (step >= 1 && !t.keep && /^\d/.test(t.t));
        return (
          <g key={i}>
            <text x={60 + i * 130} y="110" fill={faded ? '#30363d' : t.keep ? '#a78bfa' : '#c9d1d9'} fontSize="34" fontFamily="Consolas" fontWeight="700" className="dsa2d-fade" style={{ textDecoration: faded ? 'line-through' : 'none' }}>{t.t}</text>
            {i < e.terms.length - 1 && <text x={125 + i * 130} y="108" fill="#8b949e" fontSize="28" fontFamily="Consolas">+</text>}
          </g>
        );
      })}
      <text x="24" y="175" fill="#8b949e" fontSize="13" fontFamily="system-ui">{step === 0 ? 'full expression' : step === 1 ? '1. drop constants →' : '2. keep dominant term →'}</text>
      <text x="360" y="180" fill="#a78bfa" fontSize="34" fontFamily="Consolas" fontWeight="700" className="dsa2d-fade">{step >= 1 ? e.bigO : ''}</text>
    </Stage2D>
  );
}

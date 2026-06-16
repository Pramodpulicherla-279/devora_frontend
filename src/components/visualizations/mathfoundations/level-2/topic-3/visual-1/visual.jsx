import { useState } from 'react';
import './visual.css';

const EXAMPLES = [
  {
    label: 'f(g(x)) = (x²)³',
    g: 'g(x) = x²',
    f: 'f(u) = u³',
    gp: "g'(x) = 2x",
    fp: "f'(u) = 3u²",
    chain: "f'(g(x)) · g'(x) = 3(x²)² · 2x = 6x⁵",
    eval: x => ({ gx: x ** 2, fgx: x ** 6, deriv: 6 * x ** 5 }),
  },
  {
    label: 'f(g(x)) = sin(2x)',
    g: 'g(x) = 2x',
    f: 'f(u) = sin(u)',
    gp: "g'(x) = 2",
    fp: "f'(u) = cos(u)",
    chain: "cos(2x) · 2 = 2cos(2x)",
    eval: x => ({ gx: 2 * x, fgx: Math.sin(2 * x).toFixed(3), deriv: (2 * Math.cos(2 * x)).toFixed(3) }),
  },
  {
    label: 'f(g(x)) = (3x+1)⁴',
    g: 'g(x) = 3x + 1',
    f: 'f(u) = u⁴',
    gp: "g'(x) = 3",
    fp: "f'(u) = 4u³",
    chain: "4(3x+1)³ · 3 = 12(3x+1)³",
    eval: x => ({ gx: 3 * x + 1, fgx: (3 * x + 1) ** 4, deriv: (12 * (3 * x + 1) ** 3).toFixed(1) }),
  },
];

export default function MfChainRuleVisualization() {
  const [ex, setEx] = useState(0);
  const [xv, setXv] = useState(1);
  const e = EXAMPLES[ex];
  const { gx, fgx, deriv } = e.eval(xv);

  return (
    <div className="mfchain-root">
      <h3 className="mfchain-title">Chain Rule</h3>
      <div className="mfchain-tabs">
        {EXAMPLES.map((e, i) => (
          <button key={i} onClick={() => setEx(i)}
            className={`mfchain-tab ${ex === i ? 'mfchain-tab-active' : ''}`}>
            {e.label}
          </button>
        ))}
      </div>

      <div className="mfchain-flow">
        <div className="mfchain-node">x = {xv}</div>
        <div className="mfchain-arrow">→ <span className="mfchain-fn">{e.g}</span> →</div>
        <div className="mfchain-node">g(x) = {typeof gx === 'number' && !Number.isInteger(gx) ? gx.toFixed(2) : gx}</div>
        <div className="mfchain-arrow">→ <span className="mfchain-fn">{e.f}</span> →</div>
        <div className="mfchain-node mfchain-output">f(g(x)) = {typeof fgx === 'number' ? Number(fgx).toFixed(2) : fgx}</div>
      </div>

      <div className="mfchain-rule-box">
        <div className="mfchain-rule-title">Chain Rule: <code>(f ∘ g)′(x) = f′(g(x)) · g′(x)</code></div>
        <div className="mfchain-step"><span>{e.gp}</span></div>
        <div className="mfchain-step"><span>{e.fp}</span></div>
        <div className="mfchain-result">d/dx [{e.label.split('=')[1].trim()}] = {e.chain}</div>
        <div className="mfchain-eval">At x = {xv}: derivative ≈ <b>{deriv}</b></div>
      </div>

      <div className="mfchain-xrow">
        <span className="mfchain-xlabel">x =</span>
        <input type="range" min={-2} max={2} step={0.5} value={xv}
          onChange={e => setXv(Number(e.target.value))} className="mfchain-slider" />
        <span className="mfchain-xval">{xv}</span>
      </div>
    </div>
  );
}

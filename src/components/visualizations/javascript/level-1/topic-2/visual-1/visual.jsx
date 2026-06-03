import React, { useState } from 'react';
import './visual.css';

const GROUPS = {
  Arithmetic: [
    { op: '+', label: 'Add' }, { op: '-', label: 'Subtract' },
    { op: '*', label: 'Multiply' }, { op: '/', label: 'Divide' },
    { op: '%', label: 'Modulus' }, { op: '**', label: 'Power' },
  ],
  Comparison: [
    { op: '==', label: 'Loose equal' }, { op: '===', label: 'Strict equal' },
    { op: '!=', label: 'Not equal' }, { op: '>', label: 'Greater' },
    { op: '<', label: 'Less' }, { op: '>=', label: 'Greater or equal' },
  ],
  Logical: [
    { op: '&&', label: 'AND (both true)' }, { op: '||', label: 'OR (either true)' },
  ],
};

function compute(a, b, op) {
  const na = parseFloat(a), nb = parseFloat(b);
  if (isNaN(na) || isNaN(nb)) return 'NaN';
  switch (op) {
    case '+': return na + nb;
    case '-': return na - nb;
    case '*': return na * nb;
    case '/': return nb === 0 ? 'Infinity' : na / nb;
    case '%': return na % nb;
    case '**': return na ** nb;
    case '==': return na == nb;   // eslint-disable-line
    case '===': return na === nb;
    case '!=': return na != nb;   // eslint-disable-line
    case '>': return na > nb;
    case '<': return na < nb;
    case '>=': return na >= nb;
    case '&&': return Boolean(na) && Boolean(nb);
    case '||': return Boolean(na) || Boolean(nb);
    default: return '?';
  }
}

const JsOperatorsConditionsVisualization = () => {
  const [valA, setValA] = useState('10');
  const [valB, setValB] = useState('3');
  const [group, setGroup] = useState('Arithmetic');
  const [op, setOp] = useState('+');

  const result = compute(valA, valB, op);
  const resStr = String(result);
  const isBool = typeof result === 'boolean';
  const resClass = isBool ? (result ? 'jsoc-res--true' : 'jsoc-res--false') : '';

  const code = `const a = ${valA};
const b = ${valB};

console.log(a ${op} b); // → ${resStr}`;

  return (
    <div className="jsoc-wrap">
      <header className="jsoc-head">
        <span className="jsoc-js-badge">JS</span>
        <h2>Operators &amp; Conditions</h2>
      </header>

      {/* ─── Calculator Row ─── */}
      <div className="jsoc-calc">
        <div className="jsoc-calc-input">
          <label>Value A</label>
          <input className="jsoc-numbox" type="number" value={valA} onChange={(e) => setValA(e.target.value)} />
        </div>
        <div className="jsoc-calc-op">{op}</div>
        <div className="jsoc-calc-input">
          <label>Value B</label>
          <input className="jsoc-numbox" type="number" value={valB} onChange={(e) => setValB(e.target.value)} />
        </div>
        <div className="jsoc-equals">=</div>
        <div className={`jsoc-result ${resClass}`}>{resStr}</div>
      </div>

      {/* ─── Operator Picker ─── */}
      <div className="jsoc-picker">
        <div className="jsoc-tabs">
          {Object.keys(GROUPS).map((g) => (
            <button
              key={g}
              className={`jsoc-tab ${group === g ? 'jsoc-tab--active' : ''}`}
              onClick={() => { setGroup(g); setOp(GROUPS[g][0].op); }}
            >
              {g}
            </button>
          ))}
        </div>
        <div className="jsoc-ops">
          {GROUPS[group].map(({ op: o, label }) => (
            <button
              key={o}
              className={`jsoc-op-btn ${op === o ? 'jsoc-op-btn--active' : ''}`}
              onClick={() => setOp(o)}
            >
              <span className="jsoc-op-sym">{o}</span>
              <span className="jsoc-op-lbl">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── Code Output ─── */}
      <pre className="jsoc-code"><code>{code}</code></pre>

      {/* ─── If / Else Flow ─── */}
      <div className="jsoc-flow">
        <h3>Condition flow</h3>
        <div className="jsoc-flow-row">
          <div className="jsoc-diamond">
            {valA} {op} {valB} ?
          </div>
          <div className="jsoc-branches">
            <div className={`jsoc-branch jsoc-branch--true ${result ? 'jsoc-branch--lit' : ''}`}>
              <div className="jsoc-branch-tag">true</div>
              <div className="jsoc-branch-body">run the <code>if</code> block</div>
            </div>
            <div className={`jsoc-branch jsoc-branch--false ${!result ? 'jsoc-branch--lit' : ''}`}>
              <div className="jsoc-branch-tag">false</div>
              <div className="jsoc-branch-body">run the <code>else</code> block</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsOperatorsConditionsVisualization;

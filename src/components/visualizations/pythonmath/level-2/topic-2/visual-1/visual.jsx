import { useState } from 'react';
import './visual.css';

const DICT = { name: 'Alice', age: 30, role: 'engineer', lang: 'Python' };

const SET_A = new Set([1, 2, 3, 4, 5]);
const SET_B = new Set([3, 4, 5, 6, 7]);

const setOps = [
  { label: 'A ∪ B  (union)', fn: () => [...new Set([...SET_A, ...SET_B])], color: '#a78bfa' },
  { label: 'A ∩ B  (intersection)', fn: () => [...SET_A].filter(x => SET_B.has(x)), color: '#58a6ff' },
  { label: 'A − B  (difference)', fn: () => [...SET_A].filter(x => !SET_B.has(x)), color: '#f97316' },
  { label: 'A △ B  (symmetric diff)', fn: () => [...SET_A, ...SET_B].filter(x => !(SET_A.has(x) && SET_B.has(x))), color: '#56d364' },
];

export default function PyMathDictsVisualization() {
  const [selKey, setSelKey] = useState(null);
  const [selOp, setSelOp] = useState(null);

  return (
    <div className="pymdicts-root">
      <h3 className="pymdicts-title">Dicts & Sets</h3>
      <div className="pymdicts-body">
        <div className="pymdicts-section">
          <div className="pymdicts-section-label">Dictionary — click a key</div>
          <div className="pymdicts-dict">
            {Object.entries(DICT).map(([k, v]) => (
              <div key={k} className={`pymdicts-kv ${selKey === k ? 'pymdicts-kv--active' : ''}`}
                onClick={() => setSelKey(selKey === k ? null : k)}>
                <span className="pymdicts-key">'{k}'</span>
                <span className="pymdicts-colon">:</span>
                <span className="pymdicts-val">{typeof v === 'string' ? `'${v}'` : v}</span>
              </div>
            ))}
          </div>
          {selKey && (
            <div className="pymdicts-result">
              <code>d['{selKey}']</code> → <span style={{ color: '#56d364' }}>{typeof DICT[selKey] === 'string' ? `'${DICT[selKey]}'` : DICT[selKey]}</span>
            </div>
          )}
        </div>
        <div className="pymdicts-section">
          <div className="pymdicts-section-label">Set Operations</div>
          <div className="pymdicts-sets-row">
            <div className="pymdicts-set-box">A = {`{${[...SET_A].join(', ')}}`}</div>
            <div className="pymdicts-set-box">B = {`{${[...SET_B].join(', ')}}`}</div>
          </div>
          <div className="pymdicts-ops">
            {setOps.map((op, i) => (
              <button key={i} className={`pymdicts-op-btn ${selOp === i ? 'pymdicts-op-btn--active' : ''}`}
                style={{ '--oc': op.color }} onClick={() => setSelOp(selOp === i ? null : i)}>
                {op.label}
              </button>
            ))}
          </div>
          {selOp !== null && (
            <div className="pymdicts-set-result" style={{ color: setOps[selOp].color }}>
              {`{${setOps[selOp].fn().join(', ')}}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

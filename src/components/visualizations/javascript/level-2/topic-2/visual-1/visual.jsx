import React, { useState } from 'react';
import './visual.css';

const SAMPLE_OBJ = {
  name: 'Alice',
  age: 28,
  role: 'Developer',
  skills: ['JS', 'React', 'CSS'],
  address: { city: 'Mumbai', country: 'India' },
};

const MATH_METHODS = [
  { name: 'Math.round(4.7)', result: '5', desc: 'Rounds to nearest integer' },
  { name: 'Math.floor(4.9)', result: '4', desc: 'Rounds down always' },
  { name: 'Math.ceil(4.1)', result: '5', desc: 'Rounds up always' },
  { name: 'Math.abs(-7)', result: '7', desc: 'Absolute (positive) value' },
  { name: 'Math.max(3, 9, 1)', result: '9', desc: 'Largest of the values' },
  { name: 'Math.min(3, 9, 1)', result: '1', desc: 'Smallest of the values' },
  { name: 'Math.pow(2, 10)', result: '1024', desc: 'Base raised to exponent' },
  { name: 'Math.sqrt(144)', result: '12', desc: 'Square root' },
  { name: 'Math.random()', result: '0.xyz…', desc: 'Random number 0–1' },
  { name: 'Math.PI', result: '3.14159…', desc: 'Mathematical constant π' },
];

function renderValue(val, depth = 0) {
  if (Array.isArray(val)) {
    return (
      <span className="jsob-arr">
        {'['}{val.map((v, i) => (
          <span key={i}><span className="jsob-str">"{v}"</span>{i < val.length - 1 ? ', ' : ''}</span>
        ))}{']'}
      </span>
    );
  }
  if (typeof val === 'object' && val !== null) {
    return <span className="jsob-nested">{'{…}'}</span>;
  }
  if (typeof val === 'string') return <span className="jsob-str">"{val}"</span>;
  if (typeof val === 'number') return <span className="jsob-num">{val}</span>;
  return <span>{String(val)}</span>;
}

const JsObjectsMathVisualization = () => {
  const [expanded, setExpanded] = useState(null);
  const [accessMode, setAccessMode] = useState('dot');
  const [activeKey, setActiveKey] = useState('name');
  const [activeMath, setActiveMath] = useState(MATH_METHODS[0]);

  const accessCode = accessMode === 'dot'
    ? `user.${activeKey}  // → ${JSON.stringify(SAMPLE_OBJ[activeKey])}`
    : `user["${activeKey}"]  // → ${JSON.stringify(SAMPLE_OBJ[activeKey])}`;

  return (
    <div className="jsob-wrap">
      <header className="jsob-head">
        <span className="jsob-badge">JS</span>
        <h2>Objects &amp; Math Methods</h2>
      </header>

      <div className="jsob-grid">
        {/* ─── Object panel ─── */}
        <div className="jsob-panel">
          <h3>Object Explorer</h3>
          <div className="jsob-obj-card">
            <div className="jsob-obj-brace">{'{'}</div>
            {Object.entries(SAMPLE_OBJ).map(([key, val]) => (
              <div
                key={key}
                className={`jsob-prop ${activeKey === key ? 'jsob-prop--active' : ''}`}
                onClick={() => setActiveKey(key)}
              >
                <span className="jsob-key">{key}</span>
                <span className="jsob-colon">: </span>
                {renderValue(val)}
                <span className="jsob-comma">,</span>
              </div>
            ))}
            <div className="jsob-obj-brace">{'}'}</div>
          </div>

          <div className="jsob-access-section">
            <div className="jsob-access-tabs">
              <button
                className={`jsob-access-tab ${accessMode === 'dot' ? 'jsob-access-tab--on' : ''}`}
                onClick={() => setAccessMode('dot')}
              >Dot notation</button>
              <button
                className={`jsob-access-tab ${accessMode === 'bracket' ? 'jsob-access-tab--on' : ''}`}
                onClick={() => setAccessMode('bracket')}
              >Bracket notation</button>
            </div>
            <pre className="jsob-code"><code>{accessCode}</code></pre>
          </div>
        </div>

        {/* ─── Math panel ─── */}
        <div className="jsob-panel">
          <h3>Math Methods</h3>
          <div className="jsob-math-list">
            {MATH_METHODS.map((m) => (
              <button
                key={m.name}
                className={`jsob-math-btn ${activeMath.name === m.name ? 'jsob-math-btn--on' : ''}`}
                onClick={() => setActiveMath(m)}
              >
                <code>{m.name}</code>
              </button>
            ))}
          </div>
          <div className="jsob-math-detail">
            <div className="jsob-math-result">
              <span className="jsob-math-label">Result</span>
              <span className="jsob-math-val">{activeMath.result}</span>
            </div>
            <p className="jsob-math-desc">{activeMath.desc}</p>
            <pre className="jsob-code"><code>{`console.log(${activeMath.name});\n// → ${activeMath.result}`}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsObjectsMathVisualization;

import React, { useState } from 'react';
import './visual.css';

const FN_TYPES = {
  declaration: {
    label: 'Declaration',
    code: `function greet(name, age) {
  const msg = \`Hi \${name}, you are \${age}!\`;
  return msg;
}

greet("Ali", 25);
// → "Hi Ali, you are 25!"`,
    parts: [
      { label: 'function keyword', color: '#C678DD', text: 'function' },
      { label: 'Function name', color: '#61AFEF', text: 'greet' },
      { label: 'Parameters', color: '#E5C07B', text: '(name, age)' },
      { label: 'Function body', color: '#98C379', text: '{ … }' },
      { label: 'Return value', color: '#E06C75', text: 'return msg' },
    ],
    tip: 'Hoisted — can be called before it is defined in the file.',
  },
  expression: {
    label: 'Expression',
    code: `const greet = function(name) {
  return \`Hello \${name}!\`;
};

greet("Sam");
// → "Hello Sam!"`,
    parts: [
      { label: 'Stored in variable', color: '#61AFEF', text: 'const greet' },
      { label: 'Anonymous function', color: '#C678DD', text: 'function(name)' },
      { label: 'Body & return', color: '#98C379', text: '{ return … }' },
    ],
    tip: 'Not hoisted — must be defined before it is called.',
  },
  arrow: {
    label: 'Arrow (→)',
    code: `const greet = (name) => \`Hello \${name}!\`;

greet("Mia");
// → "Hello Mia!"`,
    parts: [
      { label: 'Arrow syntax', color: '#F7DF1E', text: '=>' },
      { label: 'Implicit return', color: '#98C379', text: '(no braces needed)' },
      { label: 'Inherits this', color: '#E06C75', text: 'from parent scope' },
    ],
    tip: 'Shorter syntax. Does NOT have its own `this` — inherits from where it was defined.',
  },
};

const STACK_SCENARIO = [
  { fn: 'main()', depth: 0, color: '#21262d' },
  { fn: 'processOrder()', depth: 1, color: '#2d333b' },
  { fn: 'calculateTotal()', depth: 2, color: '#373e47' },
  { fn: 'applyDiscount()', depth: 3, color: '#444c56' },
];

const JsFunctionsVisualization = () => {
  const [fnType, setFnType] = useState('declaration');
  const [stackStep, setStackStep] = useState(0);
  const [name, setName] = useState('Ali');
  const [age, setAge] = useState('25');

  const fn = FN_TYPES[fnType];
  const visibleStack = STACK_SCENARIO.slice(0, stackStep + 1);

  return (
    <div className="jsfn-wrap">
      <header className="jsfn-head">
        <span className="jsfn-badge">JS</span>
        <h2>Functions</h2>
        <p>Declaration · Expression · Arrow · Call Stack</p>
      </header>

      <div className="jsfn-grid">
        {/* ─── Function Types ─── */}
        <div className="jsfn-panel">
          <div className="jsfn-tabs">
            {Object.entries(FN_TYPES).map(([key, { label }]) => (
              <button
                key={key}
                className={`jsfn-tab ${fnType === key ? 'jsfn-tab--on' : ''}`}
                onClick={() => setFnType(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <pre className="jsfn-code"><code>{fn.code}</code></pre>

          <div className="jsfn-parts">
            {fn.parts.map((p) => (
              <div key={p.label} className="jsfn-part" style={{ '--pc': p.color }}>
                <span className="jsfn-part-text">{p.text}</span>
                <span className="jsfn-part-label">{p.label}</span>
              </div>
            ))}
          </div>

          <div className="jsfn-tip">{fn.tip}</div>
        </div>

        {/* ─── Live Call + Call Stack ─── */}
        <div className="jsfn-panel">
          <h3>Live function call</h3>
          <div className="jsfn-live">
            <label>name: <input className="jsfn-input" value={name} onChange={(e) => setName(e.target.value)} /></label>
            <label>age: <input className="jsfn-input" type="number" value={age} onChange={(e) => setAge(e.target.value)} /></label>
          </div>
          <pre className="jsfn-code jsfn-code--result">
            <code>{`greet("${name}", ${age})\n// → "Hi ${name}, you are ${age}!"`}</code>
          </pre>

          <h3 style={{ marginTop: '20px' }}>Call Stack</h3>
          <p className="jsfn-stack-desc">JS uses a call stack (LIFO). Each function call adds a frame. When done, it's removed.</p>
          <div className="jsfn-stack">
            {[...STACK_SCENARIO].reverse().map((frame, idx) => {
              const isVisible = visibleStack.find((f) => f.fn === frame.fn);
              return (
                <div
                  key={frame.fn}
                  className={`jsfn-frame ${isVisible ? 'jsfn-frame--on' : 'jsfn-frame--off'}`}
                  style={{ background: frame.color }}
                >
                  {frame.fn}
                  {frame.depth === stackStep && isVisible && <span className="jsfn-frame-arrow">← currently executing</span>}
                </div>
              );
            })}
          </div>
          <div className="jsfn-stack-controls">
            <button className="jsfn-btn" onClick={() => setStackStep(Math.min(3, stackStep + 1))} disabled={stackStep === 3}>Call next</button>
            <button className="jsfn-btn jsfn-btn--pop" onClick={() => setStackStep(Math.max(0, stackStep - 1))} disabled={stackStep === 0}>Return (pop)</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsFunctionsVisualization;

import React, { useState } from 'react';
import './visual.css';

const INITIAL = [3, 7, 1, 9, 4, 6, 2, 8];

const METHODS = {
  map: {
    label: '.map()',
    desc: 'Creates a NEW array by transforming each element.',
    transform: (arr) => arr.map((x) => x * 2),
    code: `const doubled = nums.map(n => n * 2);\n// doubles every number`,
    color: '#61AFEF',
  },
  filter: {
    label: '.filter()',
    desc: 'Returns a NEW array with only elements that pass the test.',
    transform: (arr) => arr.filter((x) => x > 4),
    code: `const big = nums.filter(n => n > 4);\n// keeps numbers greater than 4`,
    color: '#98C379',
  },
  reduce: {
    label: '.reduce()',
    desc: 'Reduces the array to a single value (sum, product, etc.).',
    transform: (arr) => [arr.reduce((acc, x) => acc + x, 0)],
    code: `const sum = nums.reduce((acc, n) => acc + n, 0);\n// sums all numbers`,
    color: '#E5C07B',
  },
  find: {
    label: '.find()',
    desc: 'Returns the FIRST element that matches the condition.',
    transform: (arr) => { const r = arr.find((x) => x > 5); return r !== undefined ? [r] : []; },
    code: `const first = nums.find(n => n > 5);\n// first number > 5`,
    color: '#C678DD',
  },
  sort: {
    label: '.sort()',
    desc: 'Sorts elements. Provide a comparator for numbers.',
    transform: (arr) => [...arr].sort((a, b) => a - b),
    code: `const sorted = [...nums].sort((a, b) => a - b);\n// ascending order`,
    color: '#E06C75',
  },
};

const SPREAD_EXAMPLES = [
  { label: 'Spread into new array', code: `const a = [1, 2, 3];\nconst b = [4, 5];\nconst c = [...a, ...b];\n// [1, 2, 3, 4, 5]` },
  { label: 'Spread in function call', code: `const nums = [4, 9, 16];\nMath.max(...nums);\n// 16` },
  { label: 'Rest parameters', code: `function sum(...args) {\n  return args.reduce((a, b) => a + b, 0);\n}\nsum(1, 2, 3, 4); // 10` },
  { label: 'Destructuring', code: `const [first, second, ...rest] = [1,2,3,4,5];\n// first=1, second=2, rest=[3,4,5]` },
];

const JsArrayMethodsSpreadVisualization = () => {
  const [method, setMethod] = useState('map');
  const [spreadIdx, setSpreadIdx] = useState(0);

  const m = METHODS[method];
  const result = m.transform(INITIAL);

  return (
    <div className="jsam-wrap">
      <header className="jsam-head">
        <span className="jsam-badge">JS</span>
        <h2>Array Methods, Spread &amp; Destructuring</h2>
      </header>

      <div className="jsam-grid">
        {/* ─── Array Methods ─── */}
        <div className="jsam-panel">
          <h3>Array Methods</h3>
          <div className="jsam-method-tabs">
            {Object.entries(METHODS).map(([key, { label, color }]) => (
              <button
                key={key}
                className={`jsam-mtab ${method === key ? 'jsam-mtab--on' : ''}`}
                style={{ '--mc': color }}
                onClick={() => setMethod(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <p className="jsam-desc">{m.desc}</p>

          {/* Pipeline */}
          <div className="jsam-pipeline">
            <div className="jsam-arr-row">
              <span className="jsam-arr-label">Input</span>
              <div className="jsam-boxes">
                {INITIAL.map((n, i) => (
                  <div key={i} className="jsam-box jsam-box--in">{n}</div>
                ))}
              </div>
            </div>
            <div className="jsam-arrow" style={{ color: m.color }}>
              {m.label} →
            </div>
            <div className="jsam-arr-row">
              <span className="jsam-arr-label">Output</span>
              <div className="jsam-boxes">
                {result.map((n, i) => (
                  <div key={i} className="jsam-box jsam-box--out" style={{ borderColor: m.color }}>
                    {String(n)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <pre className="jsam-code"><code>{m.code}</code></pre>
        </div>

        {/* ─── Spread / Rest / Destructuring ─── */}
        <div className="jsam-panel">
          <h3>Spread, Rest &amp; Destructuring</h3>
          <div className="jsam-spread-tabs">
            {SPREAD_EXAMPLES.map((ex, i) => (
              <button
                key={i}
                className={`jsam-stab ${spreadIdx === i ? 'jsam-stab--on' : ''}`}
                onClick={() => setSpreadIdx(i)}
              >
                {ex.label}
              </button>
            ))}
          </div>
          <pre className="jsam-code jsam-code--spread">
            <code>{SPREAD_EXAMPLES[spreadIdx].code}</code>
          </pre>
          <div className="jsam-spread-tip">
            <strong>...</strong> (three dots) is the spread/rest operator.
            When used before an array in an expression, it <em>spreads</em> the items out.
            When used in a function parameter, it <em>collects</em> remaining args (rest).
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsArrayMethodsSpreadVisualization;

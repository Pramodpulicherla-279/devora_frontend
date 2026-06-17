import { useState } from 'react';
import './visual.css';

const SCENARIOS = {
  happy: { label: 'Happy path', code: `test('adds two numbers', () => {\n  expect(add(2, 3)).toBe(5);\n});`, result: '✓ pass' },
  edge: { label: 'Edge case', code: `test('handles zero', () => {\n  expect(add(0, 0)).toBe(0);\n});`, result: '✓ pass' },
  error: { label: 'Error case', code: `test('rejects non-numbers', () => {\n  expect(() => add('a', 2)).toThrow();\n});`, result: '✓ pass' },
};

export default function TstUnitTestingVisualization() {
  const [sc, setSc] = useState('happy');
  const s = SCENARIOS[sc];

  return (
    <div className="tstunit-wrap">
      <h3 className="tstunit-title">Unit Testing</h3>
      <p className="tstunit-sub">Test one function in isolation — no DB, no network</p>

      <div className="tstunit-diagram">
        <div className="tstunit-boundary">
          <div className="tstunit-boundary-label">isolated unit</div>
          <div className="tstunit-fn">
            <span className="tstunit-io tstunit-in">inputs →</span>
            <span className="tstunit-fn-box">add(a, b)</span>
            <span className="tstunit-io tstunit-out">→ output</span>
          </div>
          <div className="tstunit-excluded">🚫 database · 🚫 network · 🚫 filesystem</div>
        </div>
      </div>

      <div className="tstunit-scenarios">
        {Object.entries(SCENARIOS).map(([k, v]) => (
          <button key={k} className={`tstunit-sc ${sc === k ? 'tstunit-sc-active' : ''}`} onClick={() => setSc(k)}>{v.label}</button>
        ))}
      </div>

      <pre className="tstunit-code">{s.code}</pre>
      <div className="tstunit-result">{s.result}</div>
    </div>
  );
}

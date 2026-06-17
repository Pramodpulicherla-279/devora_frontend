import { useState } from 'react';
import './visual.css';

const METRICS = ['statements', 'branches', 'functions', 'lines'];
const THRESHOLD = 80;

export default function TstCoverageVisualization() {
  const [vals, setVals] = useState({ statements: 92, branches: 74, functions: 88, lines: 90 });

  const blocked = Object.values(vals).some(v => v < THRESHOLD);

  const adjust = (k, d) => setVals(s => ({ ...s, [k]: Math.max(0, Math.min(100, s[k] + d)) }));

  const arc = (pct) => {
    const r = 26, c = 2 * Math.PI * r;
    return { c, off: c - (c * pct) / 100 };
  };

  return (
    <div className="tstcov-wrap">
      <h3 className="tstcov-title">Coverage Thresholds</h3>
      <p className="tstcov-sub">Below the line ({THRESHOLD}%) the pipeline blocks the merge</p>

      <div className="tstcov-gauges">
        {METRICS.map(m => {
          const { c, off } = arc(vals[m]);
          const low = vals[m] < THRESHOLD;
          return (
            <div key={m} className="tstcov-gauge">
              <svg viewBox="0 0 64 64" className="tstcov-svg">
                <circle cx="32" cy="32" r="26" fill="none" stroke="#21262d" strokeWidth="6" />
                <circle cx="32" cy="32" r="26" fill="none" stroke={low ? '#f85149' : '#56d364'} strokeWidth="6"
                  strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} transform="rotate(-90 32 32)" />
                <text x="32" y="36" textAnchor="middle" fontSize="13" fill="#e6edf3" fontWeight="700">{vals[m]}</text>
              </svg>
              <div className="tstcov-label">{m}</div>
              <div className="tstcov-adjust">
                <button onClick={() => adjust(m, -5)}>−</button>
                <button onClick={() => adjust(m, 5)}>+</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`tstcov-status ${blocked ? 'tstcov-blocked' : 'tstcov-ok'}`}>
        {blocked ? '🚫 Pipeline blocked — coverage below threshold' : '✅ All metrics pass the threshold'}
      </div>

      <pre className="tstcov-code">{`// jest.config.js
coverageThreshold: {
  global: { statements: 80, branches: 80, functions: 80, lines: 80 },
}`}</pre>
    </div>
  );
}

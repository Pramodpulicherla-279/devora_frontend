import { useState } from 'react';
import './visual.css';

const STAGES = ['Push', 'Lint', 'Unit Tests', 'Integration', 'Coverage Gate', 'Deploy'];

export default function TstCiTestingVisualization() {
  const [failAt, setFailAt] = useState(null);

  const statusOf = (i) => {
    if (failAt === null) return 'pass';
    if (i < failAt) return 'pass';
    if (i === failAt) return 'fail';
    return 'skipped';
  };

  return (
    <div className="tstci-wrap">
      <h3 className="tstci-title">CI Testing Pipeline</h3>
      <p className="tstci-sub">Tests run on every push — a failure stops the line</p>

      <div className="tstci-controls">
        <span className="tstci-controls-label">Simulate failure at:</span>
        <button className={`tstci-ctrl ${failAt === null ? 'tstci-ctrl-active' : ''}`} onClick={() => setFailAt(null)}>none</button>
        <button className={`tstci-ctrl ${failAt === 2 ? 'tstci-ctrl-active' : ''}`} onClick={() => setFailAt(2)}>Unit Tests</button>
        <button className={`tstci-ctrl ${failAt === 4 ? 'tstci-ctrl-active' : ''}`} onClick={() => setFailAt(4)}>Coverage</button>
      </div>

      <div className="tstci-pipeline">
        {STAGES.map((s, i) => (
          <div key={i} className="tstci-stage-wrap">
            <div className={`tstci-stage tstci-${statusOf(i)}`}>
              <span className="tstci-stage-icon">{statusOf(i) === 'pass' ? '✓' : statusOf(i) === 'fail' ? '✗' : '○'}</span>
              <span className="tstci-stage-label">{s}</span>
            </div>
            {i < STAGES.length - 1 && <span className="tstci-arrow">→</span>}
          </div>
        ))}
      </div>

      {failAt !== null && <div className="tstci-msg">🛑 Pipeline halted at "{STAGES[failAt]}" — deploy never runs.</div>}
      {failAt === null && <div className="tstci-msg tstci-msg-ok">✅ All green — auto-deploys to production.</div>}

      <pre className="tstci-code">{`# .github/workflows/ci.yml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage`}</pre>
    </div>
  );
}

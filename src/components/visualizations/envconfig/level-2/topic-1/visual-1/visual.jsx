import { useState } from 'react';
import './visual.css';

const SCENARIOS = [
  { id: 'same', label: 'Same origin', origin: 'https://app.com', result: 'allow', note: 'Same origin — CORS not even involved.' },
  { id: 'allowed', label: 'Allowed cross-origin', origin: 'https://app.com', result: 'allow', note: 'Origin is in the allowlist → header sent.' },
  { id: 'blocked', label: 'Blocked cross-origin', origin: 'https://evil.com', result: 'block', note: 'Origin not allowed → browser blocks the response.' },
];

const ALLOWED = ['https://app.com', 'https://admin.app.com'];

export default function EnvCorsVisualization() {
  const [idx, setIdx] = useState(0);
  const s = SCENARIOS[idx];
  const allowed = s.result === 'allow';
  const headerVal = allowed ? s.origin : '(none — request blocked)';

  return (
    <div className="envcors-wrap">
      <h3 className="envcors-title">CORS Request Simulator</h3>
      <p className="envcors-sub">The browser enforces CORS — the server just declares who's allowed</p>

      <div className="envcors-allow">
        <span className="envcors-allow-label">Server allowlist:</span>
        {ALLOWED.map(o => <code key={o} className="envcors-allow-item">{o}</code>)}
      </div>

      <div className="envcors-tabs">
        {SCENARIOS.map((sc, i) => (
          <button key={sc.id} className={`envcors-tab ${idx === i ? 'envcors-tab-active' : ''}`}
            onClick={() => setIdx(i)}>{sc.label}</button>
        ))}
      </div>

      <div className="envcors-flow">
        <div className="envcors-node envcors-browser">
          🌐 Browser<br /><span className="envcors-origin">Origin: {s.origin}</span>
        </div>
        <div className="envcors-step">
          <div className="envcors-preflight">OPTIONS preflight →</div>
          <div className={`envcors-verdict ${allowed ? 'envcors-ok' : 'envcors-no'}`}>
            {allowed ? '✅ allowed' : '🚫 blocked'}
          </div>
        </div>
        <div className="envcors-node envcors-server">🖥️ Server</div>
      </div>

      <div className="envcors-header">
        <span className="envcors-h-key">Access-Control-Allow-Origin:</span>
        <span className={`envcors-h-val ${allowed ? '' : 'envcors-h-none'}`}>{headerVal}</span>
      </div>
      <div className="envcors-note">{s.note}</div>

      <pre className="envcors-code">{`app.use(cors({
  origin: ['https://app.com', 'https://admin.app.com'],
  credentials: true,
}));`}</pre>
    </div>
  );
}

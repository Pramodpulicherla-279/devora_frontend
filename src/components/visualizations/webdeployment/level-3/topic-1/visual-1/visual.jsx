import { useState, useMemo } from 'react';
import './visual.css';

const CATEGORIES = [
  { name: 'Security', icon: '🔒', items: ['HTTPS enforced everywhere', 'Secrets in env vars, not code', 'CORS locked to known origins', 'Helmet security headers on'] },
  { name: 'Performance', icon: '⚡', items: ['Gzip/Brotli compression', 'Static assets cached + CDN', 'JS/CSS minified & split', 'Images optimised'] },
  { name: 'Reliability', icon: '🛡️', items: ['Health check endpoint', 'Global error handling', 'Graceful shutdown', 'DB connection retries'] },
  { name: 'Monitoring', icon: '📡', items: ['Sentry error tracking', 'Uptime checks', 'Structured logging', 'Alerts configured'] },
];

const TOTAL = CATEGORIES.reduce((n, c) => n + c.items.length, 0);

export default function DepProdChecklistVisualization() {
  const [checked, setChecked] = useState({});
  const count = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);
  const pct = Math.round((count / TOTAL) * 100);
  const live = count === TOTAL;

  const key = (ci, ii) => `${ci}-${ii}`;
  const toggle = (k) => setChecked(c => ({ ...c, [k]: !c[k] }));

  const circ = 2 * Math.PI * 26;

  return (
    <div className="depprod-wrap">
      <h3 className="depprod-title">Production Launch Checklist</h3>
      <p className="depprod-sub">Tick every box before you flip the switch</p>

      <div className="depprod-top">
        <svg viewBox="0 0 64 64" className="depprod-ring">
          <circle cx="32" cy="32" r="26" fill="none" stroke="#21262d" strokeWidth="6" />
          <circle cx="32" cy="32" r="26" fill="none" stroke={live ? '#56d364' : '#818cf8'} strokeWidth="6"
            strokeLinecap="round" strokeDasharray={circ}
            strokeDashoffset={circ - (circ * pct) / 100}
            transform="rotate(-90 32 32)" style={{ transition: 'stroke-dashoffset .4s' }} />
          <text x="32" y="36" textAnchor="middle" fontSize="14" fill="#e6edf3" fontWeight="700">{pct}%</text>
        </svg>
        <button className={`depprod-golive ${live ? 'depprod-golive-on' : ''}`} disabled={!live}>
          {live ? '🚀 Go Live!' : `${count}/${TOTAL} done`}
        </button>
      </div>

      <div className="depprod-cats">
        {CATEGORIES.map((cat, ci) => (
          <div key={ci} className="depprod-cat">
            <div className="depprod-cat-h">{cat.icon} {cat.name}</div>
            {cat.items.map((item, ii) => (
              <button key={ii} className={`depprod-item ${checked[key(ci, ii)] ? 'depprod-item-on' : ''}`}
                onClick={() => toggle(key(ci, ii))}>
                <span className="depprod-box">{checked[key(ci, ii)] ? '✓' : ''}</span>
                <span className="depprod-text">{item}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

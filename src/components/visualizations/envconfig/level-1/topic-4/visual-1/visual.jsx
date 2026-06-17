import { useState } from 'react';
import './visual.css';

const TIERS = [
  {
    name: '.env file',
    icon: '📄',
    scope: 'Local development only',
    good: 'Quick, simple, zero setup',
    bad: 'Never commit it; not for production secrets',
    color: '#8b949e',
  },
  {
    name: 'CI/CD Secrets',
    icon: '⚙️',
    scope: 'GitHub Actions / GitLab CI',
    good: 'Injected at build/deploy time, encrypted at rest',
    bad: 'Scoped to pipelines, not runtime apps',
    color: '#58a6ff',
  },
  {
    name: 'Cloud Secret Manager',
    icon: '🔐',
    scope: 'AWS Secrets Manager / Vault',
    good: 'Rotation, audit logs, fine-grained access',
    bad: 'More setup, small cost',
    color: '#a78bfa',
  },
  {
    name: 'Managed Platform Vars',
    icon: '☁️',
    scope: 'Render / Vercel env vars',
    good: 'Built-in, easy, encrypted, per-environment',
    bad: 'Tied to that platform',
    color: '#56d364',
  },
];

export default function EnvSecretMgmtVisualization() {
  const [idx, setIdx] = useState(0);
  const t = TIERS[idx];

  return (
    <div className="envsec-wrap">
      <h3 className="envsec-title">Secret Management Tiers</h3>
      <p className="envsec-sub">Where should secrets live as you move from laptop to production?</p>

      <div className="envsec-ladder">
        {TIERS.map((tier, i) => (
          <button key={i} className={`envsec-tier ${idx === i ? 'envsec-tier-active' : ''}`}
            onClick={() => setIdx(i)} style={idx === i ? { borderColor: tier.color } : {}}>
            <span className="envsec-tier-icon">{tier.icon}</span>
            <span className="envsec-tier-name" style={idx === i ? { color: tier.color } : {}}>{tier.name}</span>
            <span className="envsec-tier-arrow">{i < TIERS.length - 1 ? '→' : '🏁'}</span>
          </button>
        ))}
      </div>

      <div className="envsec-detail" style={{ borderTopColor: t.color }}>
        <div className="envsec-detail-head">{t.icon} {t.name}</div>
        <div className="envsec-row"><span className="envsec-k">Use for</span><span className="envsec-v">{t.scope}</span></div>
        <div className="envsec-row"><span className="envsec-k">✅ Good</span><span className="envsec-v">{t.good}</span></div>
        <div className="envsec-row"><span className="envsec-k">⚠️ Watch</span><span className="envsec-v">{t.bad}</span></div>
      </div>

      <p className="envsec-note">🔑 Golden rule: secrets flow <em>into</em> the app via environment variables at runtime — they're never hard-coded or committed to git.</p>
    </div>
  );
}

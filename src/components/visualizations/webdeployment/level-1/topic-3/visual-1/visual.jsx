import { useState } from 'react';
import './visual.css';

const platforms = ['Local (.env)', 'Render', 'Vercel'];

const envVars = [
  {
    name: 'NODE_ENV',
    required: true,
    values: { 'Local (.env)': 'development', 'Render': 'production', 'Vercel': 'production' },
    differs: true,
  },
  {
    name: 'MONGODB_URI',
    required: true,
    values: {
      'Local (.env)': 'mongodb://localhost:27017/devora',
      'Render': 'mongodb+srv://user:pass@cluster.mongodb.net/devora',
      'Vercel': 'mongodb+srv://user:pass@cluster.mongodb.net/devora',
    },
    differs: true,
  },
  {
    name: 'JWT_SECRET',
    required: true,
    values: {
      'Local (.env)': 'dev-secret-change-me',
      'Render': '••••••••••••••••••••••',
      'Vercel': '••••••••••••••••••••••',
    },
    differs: false,
    sensitive: true,
  },
  {
    name: 'PORT',
    required: false,
    values: { 'Local (.env)': '5000', 'Render': '10000', 'Vercel': 'N/A (auto)' },
    differs: true,
  },
  {
    name: 'CLIENT_URL',
    required: false,
    values: {
      'Local (.env)': 'http://localhost:5173',
      'Render': 'https://devora.web.app',
      'Vercel': 'https://devora.web.app',
    },
    differs: true,
  },
  {
    name: 'SENTRY_DSN',
    required: false,
    values: { 'Local (.env)': '', 'Render': 'https://abc@sentry.io/123', 'Vercel': 'https://abc@sentry.io/123' },
    differs: false,
  },
];

const platformInstructions = {
  'Local (.env)': {
    icon: '📄',
    where: 'Create a .env file in your project root.',
    note: 'NEVER commit .env to git — add it to .gitignore!',
    color: '#3fb950',
  },
  'Render': {
    icon: '🟣',
    where: 'Render Dashboard → Your Service → Environment → Add Environment Variable',
    note: 'Render encrypts these at rest. Changes trigger a redeploy.',
    color: '#818cf8',
  },
  'Vercel': {
    icon: '▲',
    where: 'Vercel Dashboard → Project → Settings → Environment Variables',
    note: 'You can scope vars to Production, Preview, or Development.',
    color: '#e6edf3',
  },
};

export default function DepProdEnvVisualization() {
  const [platform, setPlatform] = useState('Local (.env)');
  const [showMissing, setShowMissing] = useState(false);

  const info = platformInstructions[platform];
  const missingRequired = envVars.filter(v => v.required && !v.values[platform]);

  return (
    <div className="deppenv-root">
      <div className="deppenv-header">
        <span className="deppenv-title">Environment Variable Manager</span>
        <button
          className={`deppenv-warn-btn${showMissing ? ' deppenv-warn-active' : ''}`}
          onClick={() => setShowMissing(v => !v)}
        >
          ⚠ Show Missing Required
        </button>
      </div>

      <div className="deppenv-platform-tabs">
        {platforms.map(p => (
          <button
            key={p}
            className={`deppenv-tab${platform === p ? ' deppenv-tab-active' : ''}`}
            onClick={() => setPlatform(p)}
          >
            {platformInstructions[p].icon} {p}
          </button>
        ))}
      </div>

      <div className="deppenv-platform-info" style={{ borderColor: info.color + '55' }}>
        <span className="deppenv-platform-where">{info.where}</span>
        <span className="deppenv-platform-note">{info.note}</span>
      </div>

      {showMissing && missingRequired.length > 0 && (
        <div className="deppenv-missing-banner">
          <span className="deppenv-missing-icon">⚠</span>
          Missing required vars: {missingRequired.map(v => v.name).join(', ')}
        </div>
      )}

      <div className="deppenv-table">
        <div className="deppenv-table-head">
          <span>Name</span>
          <span>Value</span>
          <span>Required</span>
          <span>Note</span>
        </div>
        {envVars.map(v => {
          const val = v.values[platform];
          const isMissing = showMissing && v.required && !val;
          return (
            <div
              key={v.name}
              className={`deppenv-table-row${v.differs ? ' deppenv-row-differs' : ''}${isMissing ? ' deppenv-row-missing' : ''}`}
            >
              <span className="deppenv-var-name">{v.name}</span>
              <span className={`deppenv-var-val${v.sensitive && platform !== 'Local (.env)' ? ' deppenv-masked' : ''}`}>
                {val || <span className="deppenv-empty">—</span>}
              </span>
              <span className={`deppenv-required${v.required ? ' deppenv-req-yes' : ''}`}>
                {v.required ? '✓ Yes' : 'No'}
              </span>
              <span className="deppenv-var-note">
                {v.differs ? <span className="deppenv-differs-badge">Differs per env</span> : null}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

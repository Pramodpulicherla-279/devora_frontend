import { useState } from 'react';
import './visual.css';

const stages = [
  {
    id: 'repo',
    label: 'Connect GitHub',
    icon: '🔗',
    title: 'Connect GitHub Repository',
    desc: 'Authorize Render to access your GitHub account and select the repository you want to deploy.',
    log: null,
    snippet: null,
  },
  {
    id: 'env',
    label: 'Set Env Vars',
    icon: '🔑',
    title: 'Set Environment Variables',
    desc: 'Add your secrets here — Render stores them encrypted. Never commit .env files to GitHub.',
    log: null,
    envVars: [
      { key: 'NODE_ENV', value: 'production' },
      { key: 'MONGODB_URI', value: 'mongodb+srv://...' },
      { key: 'JWT_SECRET', value: '••••••••••••••••' },
      { key: 'PORT', value: '10000' },
    ],
    snippet: null,
  },
  {
    id: 'build',
    label: 'Build Command',
    icon: '⚙️',
    title: 'Configure Build Command',
    desc: 'This runs once during deploy to install dependencies. For a Node.js backend, npm install is all you need.',
    log: null,
    snippet: { label: 'Build Command', value: 'npm install' },
  },
  {
    id: 'start',
    label: 'Start Command',
    icon: '▶️',
    title: 'Set Start Command',
    desc: 'This is what Render runs to start your server. It restarts automatically if it crashes.',
    log: null,
    snippet: { label: 'Start Command', value: 'node src/index.js' },
  },
  {
    id: 'deploy',
    label: 'Deploy',
    icon: '🚀',
    title: 'Deploying to Render',
    desc: 'Render builds and starts your service. Watch the live build log below.',
    log: [
      { t: '12:00:01', msg: 'Cloning repository...', type: 'info' },
      { t: '12:00:03', msg: 'Running npm install', type: 'info' },
      { t: '12:00:11', msg: 'added 312 packages in 8s', type: 'ok' },
      { t: '12:00:12', msg: 'Build completed successfully', type: 'ok' },
      { t: '12:00:13', msg: 'Starting node src/index.js', type: 'info' },
      { t: '12:00:14', msg: 'Server listening on port 10000', type: 'ok' },
      { t: '12:00:15', msg: 'Deploy live at https://devora-api.onrender.com', type: 'success' },
    ],
    snippet: null,
    healthUrl: 'https://devora-api.onrender.com/health',
  },
];

export default function DepRenderVisualization() {
  const [activeStage, setActiveStage] = useState(0);
  const [autoDeploy, setAutoDeploy] = useState(true);

  const stage = stages[activeStage];

  return (
    <div className="deprender-root">
      <div className="deprender-header">
        <span className="deprender-logo">Render</span>
        <span className="deprender-subtitle">Backend Deploy Flow</span>
      </div>

      <div className="deprender-stages">
        {stages.map((s, i) => (
          <button
            key={s.id}
            className={`deprender-stage-btn${i === activeStage ? ' deprender-stage-active' : ''}${i < activeStage ? ' deprender-stage-done' : ''}`}
            onClick={() => setActiveStage(i)}
          >
            <span className="deprender-stage-icon">{i < activeStage ? '✓' : s.icon}</span>
            <span className="deprender-stage-label">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="deprender-panel">
        <div className="deprender-panel-title">{stage.title}</div>
        <p className="deprender-panel-desc">{stage.desc}</p>

        {stage.envVars && (
          <div className="deprender-env-table">
            <div className="deprender-env-head">
              <span>Key</span>
              <span>Value</span>
            </div>
            {stage.envVars.map(v => (
              <div key={v.key} className="deprender-env-row">
                <span className="deprender-env-key">{v.key}</span>
                <span className="deprender-env-val">{v.value}</span>
              </div>
            ))}
          </div>
        )}

        {stage.snippet && (
          <div className="deprender-snippet">
            <span className="deprender-snippet-label">{stage.snippet.label}</span>
            <code className="deprender-snippet-code">{stage.snippet.value}</code>
          </div>
        )}

        {stage.log && (
          <div className="deprender-log">
            {stage.log.map((line, i) => (
              <div key={i} className={`deprender-log-line deprender-log-${line.type}`}>
                <span className="deprender-log-time">{line.t}</span>
                <span>{line.msg}</span>
              </div>
            ))}
          </div>
        )}

        {stage.healthUrl && (
          <div className="deprender-health">
            <span className="deprender-health-dot" />
            <span className="deprender-health-label">Health check: </span>
            <span className="deprender-health-url">{stage.healthUrl}</span>
          </div>
        )}
      </div>

      <div className="deprender-footer">
        <div className="deprender-autodeploy">
          <label className="deprender-toggle-label">
            <input
              type="checkbox"
              checked={autoDeploy}
              onChange={() => setAutoDeploy(v => !v)}
              className="deprender-toggle-input"
            />
            <span className="deprender-toggle-track">
              <span className="deprender-toggle-thumb" />
            </span>
            <span className="deprender-toggle-text">
              Auto-deploy on push to <code>main</code>
            </span>
          </label>
          {autoDeploy && (
            <span className="deprender-autodeploy-on">Enabled — every git push triggers a new deploy</span>
          )}
        </div>
        <div className="deprender-nav">
          <button
            className="deprender-nav-btn"
            disabled={activeStage === 0}
            onClick={() => setActiveStage(s => s - 1)}
          >
            ← Back
          </button>
          <button
            className="deprender-nav-btn deprender-nav-primary"
            disabled={activeStage === stages.length - 1}
            onClick={() => setActiveStage(s => s + 1)}
          >
            {activeStage === stages.length - 2 ? '🚀 Deploy' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}

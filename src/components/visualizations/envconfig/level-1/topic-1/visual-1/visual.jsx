import React, { useState } from 'react';
import './visual.css';

const EnvDotenvVisualization = () => {
  const [showValues, setShowValues] = useState(false);
  const [activeTab, setActiveTab] = useState('correct');
  const [flowStep, setFlowStep] = useState(0);

  const envVars = [
    { key: 'DB_URL', value: 'mongodb://localhost:27017/mydb', secret: true },
    { key: 'JWT_SECRET', value: 'supersecretkey123', secret: true },
    { key: 'PORT', value: '3000', secret: false },
    { key: 'NODE_ENV', value: 'development', secret: false },
  ];

  const flowSteps = [
    { id: 0, label: '.env file', desc: 'Stores key=value pairs on disk' },
    { id: 1, label: 'dotenv.config()', desc: 'Reads and parses the .env file' },
    { id: 2, label: 'process.env', desc: 'Variables injected into Node.js runtime' },
    { id: 3, label: 'Your Code', desc: 'Access via process.env.KEY' },
  ];

  const handleNext = () => setFlowStep(s => Math.min(s + 1, 3));
  const handleReset = () => setFlowStep(0);

  return (
    <div className="envdot-container">
      <div className="envdot-tabs">
        <button
          className={`envdot-tab ${activeTab === 'correct' ? 'envdot-tab--active' : ''}`}
          onClick={() => setActiveTab('correct')}
        >
          Correct Usage
        </button>
        <button
          className={`envdot-tab ${activeTab === 'mistake' ? 'envdot-tab--active' : ''}`}
          onClick={() => setActiveTab('mistake')}
        >
          Common Mistake
        </button>
      </div>

      {activeTab === 'correct' ? (
        <div className="envdot-correct">
          <div className="envdot-flow">
            {flowSteps.map((step, i) => (
              <React.Fragment key={step.id}>
                <div className={`envdot-node ${flowStep >= step.id ? 'envdot-node--active' : ''}`}>
                  <div className="envdot-node-label">{step.label}</div>
                  {flowStep === step.id && (
                    <div className="envdot-node-desc">{step.desc}</div>
                  )}
                </div>
                {i < flowSteps.length - 1 && (
                  <div className={`envdot-arrow ${flowStep > step.id ? 'envdot-arrow--active' : ''}`}>
                    &#8594;
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="envdot-flow-controls">
            {flowStep < 3 ? (
              <button className="envdot-btn" onClick={handleNext}>Next Step</button>
            ) : (
              <button className="envdot-btn envdot-btn--reset" onClick={handleReset}>Reset</button>
            )}
          </div>

          <div className="envdot-file-panel">
            <div className="envdot-file-header">
              <span className="envdot-filename">.env</span>
              <button
                className="envdot-toggle-btn"
                onClick={() => setShowValues(v => !v)}
              >
                {showValues ? 'Hide Values' : 'Show Values'}
              </button>
            </div>
            <div className="envdot-file-body">
              {envVars.map(v => (
                <div key={v.key} className="envdot-env-line">
                  <span className="envdot-env-key">{v.key}</span>
                  <span className="envdot-eq">=</span>
                  <span className={`envdot-env-val ${v.secret && !showValues ? 'envdot-env-val--hidden' : ''}`}>
                    {v.secret && !showValues ? '••••••••••••' : v.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="envdot-gitignore">
              <span className="envdot-gitignore-icon">&#9888;</span>
              <span>Add <code>.env</code> to <code>.gitignore</code> — NEVER commit secrets!</span>
            </div>
          </div>

          <div className="envdot-code-panel">
            <div className="envdot-code-label">Usage in code</div>
            <pre className="envdot-code">
{`require('dotenv').config();

const db = process.env.DB_URL;
const port = process.env.PORT || 3000;`}
            </pre>
          </div>
        </div>
      ) : (
        <div className="envdot-mistake">
          <div className="envdot-mistake-title">
            <span className="envdot-x">&#10007;</span> Committing .env to Git
          </div>
          <div className="envdot-git-log">
            <div className="envdot-commit envdot-commit--bad">
              <span className="envdot-commit-hash">a3f92c1</span>
              <span className="envdot-commit-msg">Add environment config</span>
              <span className="envdot-commit-files">+ .env</span>
              <div className="envdot-commit-badge">EXPOSED!</div>
            </div>
            <div className="envdot-commit">
              <span className="envdot-commit-hash">b21e04d</span>
              <span className="envdot-commit-msg">Initial commit</span>
            </div>
          </div>
          <div className="envdot-mistake-consequences">
            <div className="envdot-consequence">&#128683; Secrets visible to everyone with repo access</div>
            <div className="envdot-consequence">&#128683; Persisted in Git history forever</div>
            <div className="envdot-consequence">&#128683; Bots scan GitHub for leaked API keys</div>
          </div>
          <div className="envdot-fix">
            <div className="envdot-fix-title">&#10003; The fix: .gitignore</div>
            <pre className="envdot-code">
{`# .gitignore
.env
.env.local
.env.*.local`}
            </pre>
            <div className="envdot-fix-note">Commit <code>.env.example</code> with dummy values instead</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnvDotenvVisualization;

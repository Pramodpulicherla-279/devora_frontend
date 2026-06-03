/* Lesson: Environment variables & modes
 * Visual type: ILLUSTRATION (interactive mode switch)
 * Reason: env vars + modes are about "which .env file loads when" — switching the
 * mode and watching import.meta.env values change makes the mapping concrete. */
import React, { useState } from 'react';
import './visual.css';

const ENVS = {
  development: { file: '.env.development', api: 'http://localhost:3000', debug: 'true', prod: 'false' },
  production: { file: '.env.production', api: 'https://api.myapp.com', debug: 'false', prod: 'true' },
};

const BtEnvVisualization = () => {
  const [mode, setMode] = useState('development');
  const e = ENVS[mode];
  return (
    <div className="btenv-wrap">
      <header className="btenv-head">
        <span className="btenv-badge">Vite</span>
        <h2>Environment Variables &amp; Modes</h2>
        <p>Different config for dev vs production</p>
      </header>
      <div className="btenv-modes">
        {Object.keys(ENVS).map((m) => (
          <button key={m} className={`btenv-mode ${mode === m ? 'btenv-mode--on' : ''}`} onClick={() => setMode(m)}>{m}</button>
        ))}
      </div>
      <div className="btenv-file">📄 Loaded: <code>{e.file}</code></div>
      <pre className="btenv-code"><code>{`# ${e.file}
VITE_API_URL=${e.api}
VITE_DEBUG=${e.debug}`}</code></pre>
      <div className="btenv-access">
        <div className="btenv-access-label">Access in code via import.meta.env:</div>
        <div className="btenv-vars">
          <div className="btenv-var"><code>import.meta.env.VITE_API_URL</code><span>{e.api}</span></div>
          <div className="btenv-var"><code>import.meta.env.MODE</code><span>{mode}</span></div>
          <div className="btenv-var"><code>import.meta.env.PROD</code><span>{e.prod}</span></div>
        </div>
      </div>
      <div className="btenv-note">⚠️ Only vars prefixed <code>VITE_</code> are exposed to client code (the rest stay server-side secret). Set the mode with <code>vite build --mode production</code>.</div>
    </div>
  );
};
export default BtEnvVisualization;

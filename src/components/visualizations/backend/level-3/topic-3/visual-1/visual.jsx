import React, { useState, useEffect } from 'react';
import './visual.css';

const MIDDLEWARE_TYPES = [
  { id: 'builtin', label: 'Built-in', color: '#68A063', icon: '🔧', examples: ['express.json()', 'express.urlencoded()', 'express.static()'] },
  { id: 'thirdparty', label: 'Third-party', color: '#61AFEF', icon: '📦', examples: ['morgan (logging)', 'cors (cross-origin)', 'helmet (security)', 'cookie-parser'] },
  { id: 'custom', label: 'Custom', color: '#E5C07B', icon: '✍️', examples: ['Auth check', 'Request logger', 'Rate limiter', 'Input validator'] },
  { id: 'error', label: 'Error Handling', color: '#E06C75', icon: '🚨', examples: ['4-arg: (err, req, res, next)', 'Must be last app.use()', 'Catches errors from all middleware'] },
];

const PIPELINE = [
  { id: 'request', label: 'Incoming Request', color: '#7d8590', icon: '📨' },
  { id: 'logger', label: 'Logger MW', color: '#61AFEF', icon: '📋', code: `app.use((req, res, next) => {\n  console.log(\`\${req.method} \${req.url}\`);\n  next();\n});` },
  { id: 'auth', label: 'Auth MW', color: '#E5C07B', icon: '🔐', code: `app.use((req, res, next) => {\n  if (!req.headers.authorization) {\n    return res.status(401).json({ error: 'Unauthorized' });\n  }\n  next();\n});` },
  { id: 'json', label: 'express.json()', color: '#68A063', icon: '🔧', code: `app.use(express.json());\n// Parses JSON body → req.body` },
  { id: 'route', label: 'Route Handler', color: '#C678DD', icon: '🎯', code: `app.get('/users', (req, res) => {\n  res.json({ users: [] });\n});` },
  { id: 'response', label: 'Response Sent', color: '#68A063', icon: '📤' },
];

const BkndMiddlewareVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [activeType, setActiveType] = useState('builtin');
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (!playing) return;
    if (activeStep >= PIPELINE.length - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setActiveStep(s => s + 1), 800);
    return () => clearTimeout(t);
  }, [playing, activeStep]);

  const runPipeline = () => { setActiveStep(0); setBlocked(false); setPlaying(true); };
  const blockAtAuth = () => { setActiveStep(2); setBlocked(true); setPlaying(false); };
  const mwType = MIDDLEWARE_TYPES.find(m => m.id === activeType);
  const currentStep = PIPELINE[activeStep];

  return (
    <div className="bnmw-wrap">
      <header className="bnmw-head">
        <span className="bnmw-badge">Express.js</span>
        <h2>Middleware Deep Dive</h2>
        <p>Middleware are functions that run between request and response</p>
      </header>

      <div className="bnmw-grid">
        {/* Pipeline Visualizer */}
        <div className="bnmw-panel">
          <h3>Request Pipeline</h3>
          <p className="bnmw-sub">Every request passes through middleware in order. Each calls <code>next()</code> to continue.</p>

          <div className="bnmw-pipeline">
            {PIPELINE.map((step, i) => (
              <div key={step.id} className="bnmw-pipe-row">
                <div className={`bnmw-pipe-node ${i <= activeStep && !blocked ? 'bnmw-pipe-node--active' : ''} ${blocked && i === activeStep ? 'bnmw-pipe-node--blocked' : ''}`}
                  style={{ '--sc': step.color }}>
                  <span className="bnmw-pipe-icon">{step.icon}</span>
                  <span className="bnmw-pipe-label">{step.label}</span>
                  {blocked && i === activeStep && <span className="bnmw-blocked-badge">BLOCKED — 401</span>}
                </div>
                {i < PIPELINE.length - 1 && (
                  <div className={`bnmw-pipe-line ${i < activeStep && !blocked ? 'bnmw-pipe-line--active' : ''}`} />
                )}
              </div>
            ))}
          </div>

          <div className="bnmw-pipe-controls">
            <button className="bnmw-btn bnmw-btn--run" onClick={runPipeline} disabled={playing}>
              {playing ? 'Running…' : '▶ Run Request'}
            </button>
            <button className="bnmw-btn bnmw-btn--block" onClick={blockAtAuth}>🔐 Block at Auth</button>
          </div>

          {currentStep?.code && !blocked && (
            <pre className="bnmw-code"><code>{currentStep.code}</code></pre>
          )}
          {blocked && (
            <pre className="bnmw-code bnmw-code--error"><code>{PIPELINE[2].code}</code></pre>
          )}
        </div>

        {/* Middleware Types */}
        <div className="bnmw-panel">
          <h3>Middleware Types</h3>
          <div className="bnmw-type-tabs">
            {MIDDLEWARE_TYPES.map(m => (
              <button key={m.id} className={`bnmw-type-tab ${activeType === m.id ? 'bnmw-type-tab--on' : ''}`}
                style={{ '--mc': m.color }} onClick={() => setActiveType(m.id)}>
                {m.icon} {m.label}
              </button>
            ))}
          </div>
          <div className="bnmw-type-detail" style={{ borderColor: mwType.color }}>
            <ul className="bnmw-examples">
              {mwType.examples.map(ex => <li key={ex}>{ex}</li>)}
            </ul>
          </div>

          <pre className="bnmw-code"><code>{`// Custom middleware anatomy
const myLogger = (req, res, next) => {
  // ① Do something (log, auth check, etc.)
  console.log('Request received:', req.method);

  // ② Call next() to pass to next middleware
  next();

  // ③ Or end the pipeline:
  // res.status(401).json({ error: 'Stop!' });
};

app.use(myLogger); // Apply globally
app.get('/secret', myLogger, handler); // Apply to one route`}</code></pre>

          <div className="bnmw-next-box">
            <div className="bnmw-next-title">The <code>next()</code> function</div>
            <ul className="bnmw-next-rules">
              <li><code>next()</code> — move to the next middleware</li>
              <li><code>next(err)</code> — skip to error-handling middleware</li>
              <li>Without calling <code>next()</code> or sending a response, the request hangs ⚠️</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BkndMiddlewareVisualization;

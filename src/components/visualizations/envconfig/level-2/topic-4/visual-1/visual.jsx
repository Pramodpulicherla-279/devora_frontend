import { useState } from 'react';
import './visual.css';

const CHAIN = [
  { label: 'Router', desc: 'Matches the route', err: false },
  { label: 'Controller', desc: 'Throws / calls next(err)', err: true },
  { label: '(skips normal middleware)', desc: 'Express jumps past them', err: false, skipped: true },
  { label: 'Error Handler', desc: '4-arg middleware catches it', err: false, handler: true },
];

export default function EnvErrorHandlingVisualization() {
  const [devMode, setDevMode] = useState(true);
  const [step, setStep] = useState(0);

  const response = devMode
    ? `{
  "error": "ValidationError",
  "message": "email is required",
  "stack": "Error: email is required\\n  at /src/controllers/user.js:12\\n  at Layer.handle..."
}`
    : `{
  "error": "Something went wrong",
  "message": "email is required"
}`;

  return (
    <div className="enverr-wrap">
      <h3 className="enverr-title">Global Error Handling</h3>
      <p className="enverr-sub">A thrown error falls through to a single 4-argument error middleware</p>

      <div className="enverr-chain">
        {CHAIN.map((c, i) => (
          <div key={i} className="enverr-chain-item">
            <button className={`enverr-node ${step === i ? 'enverr-node-active' : ''} ${c.err ? 'enverr-node-err' : ''} ${c.handler ? 'enverr-node-handler' : ''} ${c.skipped ? 'enverr-node-skip' : ''}`}
              onClick={() => setStep(i)}>
              <span className="enverr-node-label">{c.label}</span>
              <span className="enverr-node-desc">{c.desc}</span>
            </button>
            {i < CHAIN.length - 1 && <span className="enverr-arrow">↓</span>}
          </div>
        ))}
      </div>

      <div className="enverr-resp-head">
        <span>Error response</span>
        <button className={`enverr-mode ${devMode ? 'enverr-mode-dev' : 'enverr-mode-prod'}`}
          onClick={() => setDevMode(d => !d)}>
          {devMode ? '🔧 development' : '🚀 production'}
        </button>
      </div>
      <pre className="enverr-resp">{response}</pre>

      <pre className="enverr-code">{`// MUST have 4 args for Express to treat it as an error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.name,
    message: err.message,
    ...(process.env.NODE_ENV === 'development'
        ? { stack: err.stack } : {}),
  });
});`}</pre>
    </div>
  );
}

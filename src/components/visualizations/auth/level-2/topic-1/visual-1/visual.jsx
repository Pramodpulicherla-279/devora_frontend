import React, { useState, useEffect } from 'react';
import './visual.css';

const PIPELINE = [
  { id: 'request', label: 'Incoming Request', icon: '📨', color: '#7d8590', detail: 'GET /api/profile with Authorization header' },
  { id: 'extract', label: 'Extract token', icon: '✂️', color: '#61AFEF', detail: 'Read "Bearer <token>" from headers', code: `const header = req.headers.authorization;\nconst token = header?.split(' ')[1];` },
  { id: 'verify', label: 'Verify signature', icon: '🔐', color: '#E5C07B', detail: 'jwt.verify() with the secret', code: `const decoded = jwt.verify(token, process.env.JWT_SECRET);` },
  { id: 'attach', label: 'Attach user', icon: '📎', color: '#C678DD', detail: 'Add decoded user to req.user', code: `req.user = decoded;\nnext(); // continue to route` },
  { id: 'route', label: 'Protected route', icon: '🎯', color: '#FBBF24', detail: 'Handler runs with req.user available', code: `app.get('/api/profile', authMiddleware, (req, res) => {\n  res.json({ user: req.user });\n});` },
];

const AuthMiddlewareVisualization = () => {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [scenario, setScenario] = useState('valid');

  useEffect(() => {
    if (!playing) return;
    if (scenario !== 'valid' && step >= 2) { setPlaying(false); return; }
    if (step >= PIPELINE.length - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setStep(s => s + 1), 800);
    return () => clearTimeout(t);
  }, [playing, step, scenario]);

  const run = () => { setStep(0); setPlaying(true); };
  const blocked = scenario !== 'valid' && step >= 2;

  return (
    <div className="authmw-wrap">
      <header className="authmw-head">
        <span className="authmw-badge">Auth</span>
        <h2>Auth Middleware</h2>
        <p>A gatekeeper function that verifies the token before protected routes run</p>
      </header>

      <div className="authmw-scenarios">
        {[['valid', '✓ Valid token'], ['missing', '✗ No token'], ['invalid', '✗ Invalid token']].map(([key, label]) => (
          <button key={key} className={`authmw-scenario ${scenario === key ? 'authmw-scenario--on' : ''}`}
            onClick={() => { setScenario(key); setStep(0); setPlaying(false); }}>{label}</button>
        ))}
      </div>

      <div className="authmw-pipeline">
        {PIPELINE.map((p, i) => (
          <div key={p.id} className="authmw-pipe-row">
            <div className={`authmw-node ${i <= step && !(blocked && i > 2) ? 'authmw-node--on' : ''} ${blocked && i === 2 ? 'authmw-node--blocked' : ''}`}
              style={{ '--nc': p.color }}>
              <span className="authmw-node-icon">{p.icon}</span>
              <div className="authmw-node-body">
                <span className="authmw-node-label">{p.label}</span>
                <span className="authmw-node-detail">{p.detail}</span>
              </div>
              {blocked && i === 2 && <span className="authmw-401">401 Unauthorized</span>}
            </div>
            {i < PIPELINE.length - 1 && <div className={`authmw-pipe-line ${i < step && !(blocked && i >= 2) ? 'authmw-pipe-line--on' : ''}`} />}
          </div>
        ))}
      </div>

      <div className="authmw-controls">
        <button className="authmw-btn" onClick={run} disabled={playing}>{playing ? 'Running…' : '▶ Run request'}</button>
        <button className="authmw-btn authmw-btn--reset" onClick={() => { setStep(0); setPlaying(false); }}>Reset</button>
      </div>

      {blocked && (
        <pre className="authmw-code authmw-code--err"><code>{scenario === 'missing'
          ? `if (!token) {\n  return res.status(401).json({ error: 'No token provided' });\n}`
          : `try {\n  jwt.verify(token, secret);\n} catch {\n  return res.status(401).json({ error: 'Invalid token' });\n}`}</code></pre>
      )}
      {!blocked && PIPELINE[step]?.code && (
        <pre className="authmw-code"><code>{PIPELINE[step].code}</code></pre>
      )}

      <div className="authmw-full">
        <h3>Complete middleware</h3>
        <pre className="authmw-code"><code>{`function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();                       // ✓ allow through
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Apply to any route that needs auth
app.get('/api/profile', authMiddleware, profileHandler);`}</code></pre>
      </div>
    </div>
  );
};

export default AuthMiddlewareVisualization;

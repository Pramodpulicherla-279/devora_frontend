import React, { useState } from 'react';
import './visual.css';

const TOKENS = [
  { type: 'Access Token', color: '#FBBF24', life: '15 minutes', stored: 'In memory (JS variable)', use: 'Sent with every API request', risk: 'Short life limits damage if stolen' },
  { type: 'Refresh Token', color: '#61AFEF', life: '7–30 days', stored: 'httpOnly cookie (safer)', use: 'Only to get a new access token', risk: 'Can be revoked server-side' },
];

const FLOW = [
  { t: 0.5, label: 'Login → receive BOTH tokens', state: 'access valid', color: '#FBBF24' },
  { t: 2, label: 'API requests use access token', state: 'access valid', color: '#FBBF24' },
  { t: 3.5, label: 'Access token EXPIRES (15 min)', state: 'access expired', color: '#E06C75' },
  { t: 5, label: 'Silently POST /refresh with refresh token', state: 'refreshing', color: '#61AFEF' },
  { t: 6.5, label: 'Receive NEW access token', state: 'access valid', color: '#FBBF24' },
  { t: 8, label: 'Continue — user never noticed', state: 'access valid', color: '#00ED64' },
];

const AuthRefreshTokensVisualization = () => {
  const [step, setStep] = useState(0);

  return (
    <div className="authrt-wrap">
      <header className="authrt-head">
        <span className="authrt-badge">Auth</span>
        <h2>Refresh Tokens</h2>
        <p>Short-lived access tokens + long-lived refresh tokens = secure AND seamless</p>
      </header>

      <div className="authrt-cards">
        {TOKENS.map(t => (
          <div key={t.type} className="authrt-card" style={{ borderColor: t.color }}>
            <div className="authrt-card-head" style={{ color: t.color }}>{t.type}</div>
            <div className="authrt-card-row"><span>Lifespan</span><strong>{t.life}</strong></div>
            <div className="authrt-card-row"><span>Stored</span><strong>{t.stored}</strong></div>
            <div className="authrt-card-row"><span>Used for</span><strong>{t.use}</strong></div>
            <div className="authrt-card-note">{t.risk}</div>
          </div>
        ))}
      </div>

      <div className="authrt-timeline-section">
        <h3>The refresh flow — step through it</h3>
        <div className="authrt-timeline">
          {FLOW.map((f, i) => (
            <button key={i} className={`authrt-tl-step ${step >= i ? 'authrt-tl-step--on' : ''}`} style={{ '--tc': f.color }} onClick={() => setStep(i)}>
              <span className="authrt-tl-dot" />
              <span className="authrt-tl-label">{f.label}</span>
            </button>
          ))}
        </div>
        <div className="authrt-state-bar" style={{ borderColor: FLOW[step].color }}>
          Current state: <strong style={{ color: FLOW[step].color }}>{FLOW[step].state}</strong>
        </div>
        <div className="authrt-controls">
          <button className="authrt-btn" onClick={() => setStep(s => Math.min(FLOW.length - 1, s + 1))} disabled={step >= FLOW.length - 1}>Next →</button>
          <button className="authrt-btn authrt-btn--reset" onClick={() => setStep(0)}>Reset</button>
        </div>
      </div>

      <pre className="authrt-code"><code>{`// Login: issue both
const accessToken  = jwt.sign({ sub: user.id }, ACCESS_SECRET,  { expiresIn: '15m' });
const refreshToken = jwt.sign({ sub: user.id }, REFRESH_SECRET, { expiresIn: '7d'  });
res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

// Refresh endpoint: trade refresh → new access
app.post('/auth/refresh', (req, res) => {
  const token = req.cookies.refreshToken;
  try {
    const { sub } = jwt.verify(token, REFRESH_SECRET);
    const accessToken = jwt.sign({ sub }, ACCESS_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  } catch {
    res.status(401).json({ error: 'Refresh expired — please log in' });
  }
});`}</code></pre>
    </div>
  );
};

export default AuthRefreshTokensVisualization;

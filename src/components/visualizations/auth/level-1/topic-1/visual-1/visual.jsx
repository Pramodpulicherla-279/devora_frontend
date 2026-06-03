import React, { useState } from 'react';
import './visual.css';

const COMPARE = [
  { feature: 'Where state lives', session: 'On the server (memory/DB)', token: 'In the token itself (client)' },
  { feature: 'Server stores', session: 'A session record per user', token: 'Nothing — stateless' },
  { feature: 'Scales horizontally', session: 'Harder (shared session store)', token: 'Easy — any server can verify' },
  { feature: 'Sent with request', session: 'Session ID cookie', token: 'Bearer token (Authorization header)' },
  { feature: 'Revoke instantly', session: 'Yes — delete the record', token: 'Hard — valid until expiry' },
  { feature: 'Best for', session: 'Monoliths, server-rendered apps', token: 'APIs, SPAs, mobile, microservices' },
];

const SESSION_FLOW = [
  { step: 'Login', detail: 'User sends email + password', icon: '🔑' },
  { step: 'Server creates session', detail: 'Stores { sessionId → userId } on server', icon: '🗄️' },
  { step: 'Cookie sent back', detail: 'Set-Cookie: sessionId=abc123', icon: '🍪' },
  { step: 'Next request', detail: 'Browser auto-sends the cookie', icon: '🔁' },
  { step: 'Server looks up', detail: 'Finds session in store → knows the user', icon: '🔍' },
];

const TOKEN_FLOW = [
  { step: 'Login', detail: 'User sends email + password', icon: '🔑' },
  { step: 'Server signs JWT', detail: 'Encodes userId + signs with secret', icon: '✍️' },
  { step: 'Token sent back', detail: 'Client stores it (memory / storage)', icon: '📦' },
  { step: 'Next request', detail: 'Authorization: Bearer <token>', icon: '🔁' },
  { step: 'Server verifies', detail: 'Checks signature — no DB lookup needed', icon: '✅' },
];

const AuthSessionsTokensVisualization = () => {
  const [tab, setTab] = useState('compare');
  const [sessionStep, setSessionStep] = useState(-1);
  const [tokenStep, setTokenStep] = useState(-1);

  return (
    <div className="authst-wrap">
      <header className="authst-head">
        <span className="authst-badge">Auth</span>
        <h2>Sessions vs Tokens</h2>
        <p>Two ways to remember who a user is after they log in</p>
      </header>

      <div className="authst-tabs">
        {[['compare', '⚖️ Comparison'], ['session', '🍪 Session Flow'], ['token', '🎫 Token Flow']].map(([key, label]) => (
          <button key={key} className={`authst-tab ${tab === key ? 'authst-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {tab === 'compare' && (
        <div className="authst-compare">
          <table className="authst-table">
            <thead><tr><th>Feature</th><th>🍪 Sessions</th><th>🎫 Tokens (JWT)</th></tr></thead>
            <tbody>
              {COMPARE.map(r => (
                <tr key={r.feature}>
                  <td className="authst-td-label">{r.feature}</td>
                  <td className="authst-td-session">{r.session}</td>
                  <td className="authst-td-token">{r.token}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="authst-summary">
            <div className="authst-sum-card authst-sum-card--session">
              <strong>🍪 Sessions = stateful</strong>
              <p>The server remembers. Simple to revoke, but needs a shared store to scale.</p>
            </div>
            <div className="authst-sum-card authst-sum-card--token">
              <strong>🎫 Tokens = stateless</strong>
              <p>The token carries the proof. Scales effortlessly, but harder to revoke early.</p>
            </div>
          </div>
        </div>
      )}

      {tab === 'session' && (
        <div className="authst-flow">
          <p className="authst-flow-desc">Click through how a <strong>session</strong>-based login works.</p>
          <div className="authst-flow-steps">
            {SESSION_FLOW.map((s, i) => (
              <button key={i} className={`authst-flow-step ${sessionStep >= i ? 'authst-flow-step--on' : ''}`} onClick={() => setSessionStep(i)}>
                <span className="authst-flow-icon">{s.icon}</span>
                <div><div className="authst-flow-step-title">{s.step}</div><div className="authst-flow-step-detail">{s.detail}</div></div>
              </button>
            ))}
          </div>
          <div className="authst-flow-controls">
            <button className="authst-btn" onClick={() => setSessionStep(s => Math.min(SESSION_FLOW.length - 1, s + 1))} disabled={sessionStep >= SESSION_FLOW.length - 1}>Next →</button>
            <button className="authst-btn authst-btn--reset" onClick={() => setSessionStep(-1)}>Reset</button>
          </div>
        </div>
      )}

      {tab === 'token' && (
        <div className="authst-flow">
          <p className="authst-flow-desc">Click through how a <strong>token</strong>-based login works.</p>
          <div className="authst-flow-steps">
            {TOKEN_FLOW.map((s, i) => (
              <button key={i} className={`authst-flow-step authst-flow-step--token ${tokenStep >= i ? 'authst-flow-step--on' : ''}`} onClick={() => setTokenStep(i)}>
                <span className="authst-flow-icon">{s.icon}</span>
                <div><div className="authst-flow-step-title">{s.step}</div><div className="authst-flow-step-detail">{s.detail}</div></div>
              </button>
            ))}
          </div>
          <div className="authst-flow-controls">
            <button className="authst-btn" onClick={() => setTokenStep(s => Math.min(TOKEN_FLOW.length - 1, s + 1))} disabled={tokenStep >= TOKEN_FLOW.length - 1}>Next →</button>
            <button className="authst-btn authst-btn--reset" onClick={() => setTokenStep(-1)}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthSessionsTokensVisualization;

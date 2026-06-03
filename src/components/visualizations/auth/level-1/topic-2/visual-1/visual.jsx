import React, { useState } from 'react';
import './visual.css';

const fakeHash = (pw, rounds) => {
  // deterministic pseudo-hash for visualization only (NOT real bcrypt)
  let h = 0;
  for (let i = 0; i < pw.length; i++) { h = (h * 31 + pw.charCodeAt(i)) >>> 0; }
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789./';
  let body = '';
  let seed = h ^ (rounds * 2654435761);
  for (let i = 0; i < 31; i++) { seed = (seed * 1103515245 + 12345) >>> 0; body += chars[seed % 64]; }
  const salt = ('' + (h % 9e15)).padStart(22, '0').slice(0, 22).replace(/[^a-zA-Z0-9]/g, 'x');
  return `$2b$${String(rounds).padStart(2, '0')}$${salt}${body}`;
};

const STEPS = [
  { label: 'Plain password', icon: '🔓', color: '#E06C75' },
  { label: 'Generate salt', icon: '🧂', color: '#E5C07B' },
  { label: 'Hash (salt + pw, N rounds)', icon: '⚙️', color: '#61AFEF' },
  { label: 'Store hash only', icon: '🔒', color: '#FBBF24' },
];

const AuthBcryptHashingVisualization = () => {
  const [password, setPassword] = useState('hunter2');
  const [rounds, setRounds] = useState(10);
  const [tab, setTab] = useState('hash');
  const [loginPw, setLoginPw] = useState('hunter2');
  const [verified, setVerified] = useState(null);

  const storedHash = fakeHash(password, rounds);
  const verify = () => setVerified(fakeHash(loginPw, rounds) === storedHash);
  const cost = Math.pow(2, rounds);

  return (
    <div className="authbc-wrap">
      <header className="authbc-head">
        <span className="authbc-badge">Auth</span>
        <h2>bcrypt Password Hashing</h2>
        <p>Never store plain passwords — hash them with a slow, salted algorithm</p>
      </header>

      <div className="authbc-tabs">
        {[['hash', '🔒 Hashing'], ['verify', '✅ Verify Login'], ['why', '💡 Why bcrypt']].map(([key, label]) => (
          <button key={key} className={`authbc-tab ${tab === key ? 'authbc-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {tab === 'hash' && (
        <div className="authbc-hash">
          <div className="authbc-controls">
            <label>Password
              <input className="authbc-input" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>Cost factor (rounds): <strong>{rounds}</strong> → {cost.toLocaleString()} iterations
              <input type="range" min="4" max="15" value={rounds} onChange={e => setRounds(Number(e.target.value))} className="authbc-slider" />
            </label>
          </div>
          <div className="authbc-steps">
            {STEPS.map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="authbc-step-arrow">→</div>}
                <div className="authbc-step" style={{ '--sc': s.color }}>
                  <span className="authbc-step-icon">{s.icon}</span>
                  <span className="authbc-step-label">{s.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="authbc-result">
            <div className="authbc-result-label">Stored hash</div>
            <code className="authbc-hash-out">{storedHash}</code>
            <div className="authbc-hash-anatomy">
              <span><span className="authbc-anat-dot" style={{ background: '#E06C75' }}></span>$2b$ = algorithm</span>
              <span><span className="authbc-anat-dot" style={{ background: '#E5C07B' }}></span>{String(rounds).padStart(2, '0')}$ = cost</span>
              <span><span className="authbc-anat-dot" style={{ background: '#61AFEF' }}></span>next 22 chars = salt</span>
              <span><span className="authbc-anat-dot" style={{ background: '#FBBF24' }}></span>rest = hash</span>
            </div>
          </div>
          <pre className="authbc-code"><code>{`const bcrypt = require('bcryptjs');\n\nconst hash = await bcrypt.hash(password, ${rounds});\n// salt is generated & embedded automatically`}</code></pre>
        </div>
      )}

      {tab === 'verify' && (
        <div className="authbc-verify">
          <p className="authbc-desc">bcrypt re-hashes the login attempt with the <strong>same salt</strong> and compares. You never decrypt — hashing is one-way.</p>
          <div className="authbc-verify-box">
            <div className="authbc-stored">Stored: <code>{storedHash.slice(0, 28)}…</code></div>
            <label>Login attempt
              <input className="authbc-input" value={loginPw} onChange={e => { setLoginPw(e.target.value); setVerified(null); }} />
            </label>
            <button className="authbc-verify-btn" onClick={verify}>bcrypt.compare() ▶</button>
            {verified === true && <div className="authbc-match authbc-match--ok">✓ Match — password correct, log them in</div>}
            {verified === false && <div className="authbc-match authbc-match--no">✗ No match — reject login</div>}
          </div>
          <pre className="authbc-code"><code>{`const ok = await bcrypt.compare(loginPassword, storedHash);\nif (!ok) return res.status(401).json({ error: 'Invalid credentials' });`}</code></pre>
        </div>
      )}

      {tab === 'why' && (
        <div className="authbc-why">
          <div className="authbc-why-grid">
            {[
              ['🧂', 'Salted', 'A unique random salt per password means identical passwords get different hashes — rainbow tables useless.'],
              ['🐢', 'Deliberately slow', 'The cost factor makes each hash take ~100ms. Brute-forcing billions becomes infeasible.'],
              ['📈', 'Future-proof', 'Increase the cost factor as hardware gets faster — no algorithm change needed.'],
              ['🚫', 'One-way', 'You cannot reverse a hash. Even if the DB leaks, passwords stay protected.'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="authbc-why-card">
                <span className="authbc-why-icon">{icon}</span>
                <strong>{title}</strong>
                <p>{desc}</p>
              </div>
            ))}
          </div>
          <div className="authbc-never">
            <strong>❌ Never do this:</strong>
            <pre className="authbc-code"><code>{`// Plain text — catastrophic\nuser.password = password;\n\n// MD5 / SHA-1 — too fast, crackable\nuser.password = md5(password);`}</code></pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthBcryptHashingVisualization;

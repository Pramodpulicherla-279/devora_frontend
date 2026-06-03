import React, { useState } from 'react';
import './visual.css';

const THREATS = {
  xss: {
    label: 'XSS', full: 'Cross-Site Scripting', color: '#E06C75', icon: '💉',
    attack: 'Attacker injects malicious JS that steals tokens from localStorage.',
    defenses: ['Store tokens in httpOnly cookies (JS can\'t read them)', 'Escape/sanitize all user input', 'Use a Content-Security-Policy header', 'React escapes JSX by default — avoid dangerouslySetInnerHTML'],
    code: `// ❌ Vulnerable: token readable by injected JS\nlocalStorage.setItem('token', token);\n\n// ✓ Safer: httpOnly cookie — invisible to JS\nres.cookie('token', token, {\n  httpOnly: true, secure: true, sameSite: 'strict'\n});`,
  },
  csrf: {
    label: 'CSRF', full: 'Cross-Site Request Forgery', color: '#E5C07B', icon: '🎭',
    attack: 'A malicious site tricks the browser into sending authenticated requests.',
    defenses: ['Use SameSite=Strict/Lax cookies', 'Require a CSRF token for state-changing requests', 'Check the Origin / Referer header', 'Prefer Authorization header over cookies for APIs'],
    code: `res.cookie('token', token, {\n  httpOnly: true,\n  sameSite: 'strict'   // blocks cross-site sends\n});\n\n// + CSRF token for forms\napp.use(csrf());`,
  },
  bruteforce: {
    label: 'Brute Force', full: 'Credential Brute Force', color: '#C678DD', icon: '🔨',
    attack: 'Attacker tries thousands of password guesses automatically.',
    defenses: ['Rate-limit login attempts (e.g. 5 / 15 min)', 'Use slow hashing (bcrypt cost ≥ 10)', 'Add account lockout / CAPTCHA after N fails', 'Enforce strong password policies'],
    code: `const rateLimit = require('express-rate-limit');\n\nconst loginLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 5,\n  message: 'Too many attempts, try later'\n});\n\napp.post('/login', loginLimiter, loginHandler);`,
  },
  exposure: {
    label: 'Secret Leak', full: 'Secret / Token Exposure', color: '#FBBF24', icon: '🔑',
    attack: 'Secrets committed to git or sent to the client get harvested.',
    defenses: ['Keep secrets in environment variables (.env)', 'Add .env to .gitignore', 'Never put secrets in JWT payload (it\'s readable)', 'Rotate secrets if they ever leak', 'Always use HTTPS in production'],
    code: `// ❌ Never\nconst SECRET = "hardcoded-key-123";\n\n// ✓ From environment\nconst SECRET = process.env.JWT_SECRET;\n\n// .gitignore\n.env`,
  },
};

const CHECKLIST = [
  'Hash passwords with bcrypt (cost ≥ 10)',
  'Always serve over HTTPS',
  'Store JWT secret in env vars, never in code',
  'Short access-token expiry + refresh tokens',
  'Rate-limit auth endpoints',
  'Validate & sanitize all user input',
  'Use httpOnly + SameSite cookies',
  'Return generic auth error messages',
];

const AuthSecurityBestPracticesVisualization = () => {
  const [threat, setThreat] = useState('xss');
  const [checked, setChecked] = useState({});
  const [tab, setTab] = useState('threats');

  const t = THREATS[threat];
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="authsec-wrap">
      <header className="authsec-head">
        <span className="authsec-badge">Auth</span>
        <h2>Security Best Practices</h2>
        <p>Know the common attacks — and exactly how to defend against each</p>
      </header>

      <div className="authsec-tabs">
        {[['threats', '⚔️ Threats &amp; Defenses'], ['checklist', '✅ Checklist']].map(([key, label]) => (
          <button key={key} className={`authsec-tab ${tab === key ? 'authsec-tab--on' : ''}`} onClick={() => setTab(key)} dangerouslySetInnerHTML={{ __html: label }} />
        ))}
      </div>

      {tab === 'threats' && (
        <div className="authsec-threats">
          <div className="authsec-threat-tabs">
            {Object.entries(THREATS).map(([key, th]) => (
              <button key={key} className={`authsec-threat-tab ${threat === key ? 'authsec-threat-tab--on' : ''}`}
                style={{ '--tc': th.color }} onClick={() => setThreat(key)}>
                <span>{th.icon}</span><span>{th.label}</span>
              </button>
            ))}
          </div>
          <div className="authsec-threat-detail" style={{ borderColor: t.color }}>
            <div className="authsec-threat-title" style={{ color: t.color }}>{t.icon} {t.full}</div>
            <div className="authsec-attack"><strong>Attack:</strong> {t.attack}</div>
            <div className="authsec-defenses">
              <strong>Defenses:</strong>
              <ul>{t.defenses.map((d, i) => <li key={i}>{d}</li>)}</ul>
            </div>
            <pre className="authsec-code"><code>{t.code}</code></pre>
          </div>
        </div>
      )}

      {tab === 'checklist' && (
        <div className="authsec-checklist">
          <p className="authsec-desc">Tick off your production auth checklist. Score: <strong style={{ color: checkedCount === CHECKLIST.length ? '#00ED64' : '#FBBF24' }}>{checkedCount}/{CHECKLIST.length}</strong></p>
          <div className="authsec-check-list">
            {CHECKLIST.map((item, i) => (
              <label key={i} className={`authsec-check-item ${checked[i] ? 'authsec-check-item--on' : ''}`}>
                <input type="checkbox" checked={!!checked[i]} onChange={() => setChecked(c => ({ ...c, [i]: !c[i] }))} />
                <span className="authsec-check-box">{checked[i] ? '✓' : ''}</span>
                <span className="authsec-check-text">{item}</span>
              </label>
            ))}
          </div>
          {checkedCount === CHECKLIST.length && (
            <div className="authsec-complete">🎉 All checks passed — your auth is production-hardened!</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthSecurityBestPracticesVisualization;

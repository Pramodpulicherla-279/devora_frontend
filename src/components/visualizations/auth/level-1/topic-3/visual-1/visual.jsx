import React, { useState } from 'react';
import './visual.css';

const HEADER = { alg: 'HS256', typ: 'JWT' };
const PAYLOAD_PRESETS = {
  admin: { sub: '1', name: 'Alice', role: 'admin', iat: 1700000000, exp: 1700003600 },
  user: { sub: '2', name: 'Bob', role: 'user', iat: 1700000000, exp: 1700003600 },
};

const b64 = (obj) => {
  try { return btoa(JSON.stringify(obj)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_'); }
  catch { return 'xxxxx'; }
};

const AuthJwtSigningVisualization = () => {
  const [preset, setPreset] = useState('admin');
  const [secret, setSecret] = useState('my-super-secret-key');
  const [tampered, setTampered] = useState(false);
  const [tab, setTab] = useState('anatomy');

  const payload = PAYLOAD_PRESETS[preset];
  const headerB64 = b64(HEADER);
  const payloadB64 = b64(payload);
  const sigB64 = b64({ s: secret, h: headerB64.length, p: payloadB64.length }).slice(0, 43);
  const displaySig = tampered ? sigB64.slice(0, -4) + 'HACK' : sigB64;

  return (
    <div className="authjwt-wrap">
      <header className="authjwt-head">
        <span className="authjwt-badge">JWT</span>
        <h2>JWT Signing &amp; Verification</h2>
        <p>Header · Payload · Signature — three Base64 parts joined by dots</p>
      </header>

      <div className="authjwt-tabs">
        {[['anatomy', '🧩 Anatomy'], ['verify', '🔐 Verification']].map(([key, label]) => (
          <button key={key} className={`authjwt-tab ${tab === key ? 'authjwt-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {tab === 'anatomy' && (
        <div className="authjwt-anatomy">
          <div className="authjwt-controls">
            <div className="authjwt-preset-btns">
              {Object.keys(PAYLOAD_PRESETS).map(p => (
                <button key={p} className={`authjwt-preset ${preset === p ? 'authjwt-preset--on' : ''}`} onClick={() => setPreset(p)}>{p}</button>
              ))}
            </div>
          </div>

          {/* Encoded token */}
          <div className="authjwt-token">
            <span className="authjwt-part authjwt-part--header">{headerB64}</span>
            <span className="authjwt-dot">.</span>
            <span className="authjwt-part authjwt-part--payload">{payloadB64}</span>
            <span className="authjwt-dot">.</span>
            <span className="authjwt-part authjwt-part--sig">{displaySig}</span>
          </div>

          {/* Decoded */}
          <div className="authjwt-decoded">
            <div className="authjwt-section authjwt-section--header">
              <div className="authjwt-section-label">HEADER · algorithm &amp; type</div>
              <pre><code>{JSON.stringify(HEADER, null, 2)}</code></pre>
            </div>
            <div className="authjwt-section authjwt-section--payload">
              <div className="authjwt-section-label">PAYLOAD · claims (data)</div>
              <pre><code>{JSON.stringify(payload, null, 2)}</code></pre>
            </div>
            <div className="authjwt-section authjwt-section--sig">
              <div className="authjwt-section-label">SIGNATURE · proves authenticity</div>
              <pre><code>{`HMACSHA256(\n  base64(header) + "." +\n  base64(payload),\n  secret\n)`}</code></pre>
            </div>
          </div>
          <div className="authjwt-warn">⚠️ Payload is only Base64-encoded, <strong>not encrypted</strong> — never put passwords or secrets in it. Anyone can read it.</div>
        </div>
      )}

      {tab === 'verify' && (
        <div className="authjwt-verify">
          <p className="authjwt-desc">The server re-computes the signature using its secret. If it matches, the token is authentic and untampered.</p>
          <div className="authjwt-verify-controls">
            <label>Server secret
              <input className="authjwt-input" value={secret} onChange={e => setSecret(e.target.value)} />
            </label>
            <label className="authjwt-tamper">
              <input type="checkbox" checked={tampered} onChange={e => setTampered(e.target.checked)} />
              Simulate a tampered token (attacker edits payload)
            </label>
          </div>
          <div className={`authjwt-verify-result ${tampered ? 'authjwt-verify-result--fail' : 'authjwt-verify-result--ok'}`}>
            {tampered
              ? <><span className="authjwt-result-icon">✗</span><div><strong>Signature INVALID</strong><p>Computed signature ≠ token signature. Server rejects with 401. Attacker can't forge it without the secret.</p></div></>
              : <><span className="authjwt-result-icon">✓</span><div><strong>Signature VALID</strong><p>Token is authentic &amp; unmodified. Server trusts the claims — no DB lookup needed.</p></div></>
            }
          </div>
          <pre className="authjwt-code"><code>{`const jwt = require('jsonwebtoken');\n\n// Sign on login\nconst token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });\n\n// Verify on each request\ntry {\n  const decoded = jwt.verify(token, process.env.JWT_SECRET);\n  // decoded = { sub, name, role, iat, exp }\n} catch (err) {\n  return res.status(401).json({ error: 'Invalid token' });\n}`}</code></pre>
        </div>
      )}
    </div>
  );
};

export default AuthJwtSigningVisualization;

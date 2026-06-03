import React, { useState } from 'react';
import './visual.css';

const STEPS = [
  { id: 'request', icon: '📧', color: '#61AFEF', title: 'User requests reset', detail: 'Enters email on "Forgot password?" page', code: `POST /auth/forgot-password\n{ email: "alice@x.com" }` },
  { id: 'token', icon: '🎲', color: '#E5C07B', title: 'Server generates reset token', detail: 'Random token + short expiry, hashed in DB', code: `const token = crypto.randomBytes(32).toString('hex');\nuser.resetTokenHash = sha256(token);\nuser.resetExpires = Date.now() + 1000*60*15; // 15 min` },
  { id: 'email', icon: '✉️', color: '#C678DD', title: 'Email the reset link', detail: 'Link contains the RAW token (not stored)', code: `sendEmail(user.email,\n  \`https://app.com/reset?token=\${token}\`);` },
  { id: 'verify', icon: '🔍', color: '#FBBF24', title: 'User clicks link → verify', detail: 'Hash incoming token, match DB, check expiry', code: `const user = await User.findOne({\n  resetTokenHash: sha256(req.query.token),\n  resetExpires: { $gt: Date.now() }\n});\nif (!user) throw new Error('Invalid or expired');` },
  { id: 'reset', icon: '🔒', color: '#00ED64', title: 'Set new password', detail: 'Hash new password, clear reset token', code: `user.password = await bcrypt.hash(newPassword, 10);\nuser.resetTokenHash = undefined;\nuser.resetExpires = undefined;\nawait user.save();` },
];

const AuthPasswordResetVisualization = () => {
  const [step, setStep] = useState(0);

  return (
    <div className="authpwr-wrap">
      <header className="authpwr-head">
        <span className="authpwr-badge">Auth</span>
        <h2>Password Reset Flow</h2>
        <p>Securely let users regain access — without ever knowing their old password</p>
      </header>

      <div className="authpwr-stepper">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.id}>
            {i > 0 && <div className={`authpwr-connector ${step >= i ? 'authpwr-connector--on' : ''}`} />}
            <button className={`authpwr-step-node ${step === i ? 'authpwr-step-node--on' : ''} ${step > i ? 'authpwr-step-node--done' : ''}`}
              style={{ '--sc': s.color }} onClick={() => setStep(i)}>
              <span className="authpwr-step-icon">{s.icon}</span>
              <span className="authpwr-step-num">{i + 1}</span>
            </button>
          </React.Fragment>
        ))}
      </div>

      <div className="authpwr-detail" style={{ borderColor: STEPS[step].color }}>
        <div className="authpwr-detail-head">
          <span className="authpwr-detail-icon">{STEPS[step].icon}</span>
          <div>
            <div className="authpwr-detail-title" style={{ color: STEPS[step].color }}>Step {step + 1}: {STEPS[step].title}</div>
            <div className="authpwr-detail-text">{STEPS[step].detail}</div>
          </div>
        </div>
        <pre className="authpwr-code"><code>{STEPS[step].code}</code></pre>
      </div>

      <div className="authpwr-controls">
        <button className="authpwr-btn" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>← Prev</button>
        <button className="authpwr-btn authpwr-btn--next" onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))} disabled={step === STEPS.length - 1}>Next →</button>
      </div>

      <div className="authpwr-rules">
        <h3>🔐 Security rules</h3>
        <div className="authpwr-rules-grid">
          {[
            'Store only a HASH of the reset token — never the raw token',
            'Set a short expiry (15–60 min) so leaked links die fast',
            'Make tokens single-use — clear after a successful reset',
            'Always respond "email sent" even if the email doesn\'t exist (prevents user enumeration)',
          ].map((r, i) => <div key={i} className="authpwr-rule">✓ {r}</div>)}
        </div>
      </div>
    </div>
  );
};

export default AuthPasswordResetVisualization;

/* Lesson: Reactive Forms
 * Visual type: INTERACTIVE
 * Reason: Reactive forms track value & validity state. A live form showing each
 * control's valid/invalid/touched state + the form's overall validity makes the
 * model tangible. */
import React, { useState } from 'react';
import './visual.css';

const NgReactiveFormsVisualization = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const pwValid = pw.length >= 8;
  const formValid = emailValid && pwValid;

  return (
    <div className="ngform-wrap">
      <header className="ngform-head">
        <span className="ngform-badge">Angular</span>
        <h2>Reactive Forms</h2>
        <p>Form state &amp; validation, modeled in code</p>
      </header>
      <div className="ngform-form">
        <div className="ngform-field">
          <label>email <span className="ngform-rule">required, email</span></label>
          <input className={`ngform-input ${email ? (emailValid ? 'ngform-input--ok' : 'ngform-input--err') : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          <div className="ngform-state">
            <span className={emailValid ? 'ngform-s--ok' : 'ngform-s--err'}>{emailValid ? 'valid' : 'invalid'}</span>
            <span className={email ? 'ngform-s--touched' : 'ngform-s--pristine'}>{email ? 'touched' : 'pristine'}</span>
          </div>
        </div>
        <div className="ngform-field">
          <label>password <span className="ngform-rule">minLength(8)</span></label>
          <input type="password" className={`ngform-input ${pw ? (pwValid ? 'ngform-input--ok' : 'ngform-input--err') : ''}`} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" />
          <div className="ngform-state">
            <span className={pwValid ? 'ngform-s--ok' : 'ngform-s--err'}>{pwValid ? 'valid' : `${pw.length}/8 chars`}</span>
          </div>
        </div>
      </div>
      <button className="ngform-submit" disabled={!formValid}>{formValid ? 'Submit ✓' : 'Fix errors to submit'}</button>
      <pre className="ngform-code"><code>{`form = this.fb.group({
  email:    ['', [Validators.required, Validators.email]],
  password: ['', [Validators.minLength(8)]],
});
// form.valid → ${formValid}`}</code></pre>
      <div className="ngform-note">The form model lives in the component class. Each control exposes <code>valid</code>, <code>touched</code>, <code>errors</code> — bind them to show validation UI reactively.</div>
    </div>
  );
};
export default NgReactiveFormsVisualization;

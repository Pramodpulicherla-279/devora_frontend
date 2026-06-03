import React, { useState } from 'react';
import './visual.css';

const VALIDATORS = [
  { field: 'name', rule: 'required: true', test: (v) => v.trim().length > 0, errorMsg: 'Path `name` is required.', color: '#00ED64' },
  { field: 'email', rule: 'match: /@/', test: (v) => /@/.test(v), errorMsg: 'Invalid email format.', color: '#61AFEF' },
  { field: 'age', rule: 'min: 18', test: (v) => Number(v) >= 18, errorMsg: 'Path `age` (n) is less than minimum (18).', color: '#E5C07B' },
];

const MIDDLEWARE = [
  { hook: 'pre("save")', icon: '⬅️', color: '#00ED64', desc: 'Runs BEFORE a document is saved. Perfect for hashing passwords, setting timestamps.', code: `userSchema.pre("save", async function(next) {\n  // 'this' = the document being saved\n  if (this.isModified("password")) {\n    this.password = await bcrypt.hash(this.password, 10);\n  }\n  next();\n});` },
  { hook: 'post("save")', icon: '➡️', color: '#61AFEF', desc: 'Runs AFTER a document is saved. Good for logging, sending notifications.', code: `userSchema.post("save", function(doc, next) {\n  console.log(\`User \${doc.name} was saved\`);\n  sendWelcomeEmail(doc.email);\n  next();\n});` },
  { hook: 'pre("find")', icon: '🔍', color: '#E5C07B', desc: 'Runs BEFORE any find query. Useful for soft-delete filters, default sorting.', code: `userSchema.pre("find", function() {\n  // Auto-exclude soft-deleted docs\n  this.where({ isDeleted: { $ne: true } });\n});` },
];

const MdbValidationMiddlewareVisualization = () => {
  const [tab, setTab] = useState('validation');
  const [name, setName] = useState('Alice');
  const [email, setEmail] = useState('alice@x.com');
  const [age, setAge] = useState('28');
  const [validated, setValidated] = useState(false);
  const [activeHook, setActiveHook] = useState(0);

  const values = { name, email, age };
  const errors = VALIDATORS.filter(v => !v.test(values[v.field]));
  const passes = errors.length === 0;

  return (
    <div className="mdbvm-wrap">
      <header className="mdbvm-head">
        <span className="mdbvm-badge">Mongoose</span>
        <h2>Validation &amp; Middleware</h2>
        <p>Enforce data rules and hook into the document lifecycle</p>
      </header>

      <div className="mdbvm-tabs">
        {[['validation', '✅ Validation'], ['middleware', '🪝 Middleware (Hooks)']].map(([key, label]) => (
          <button key={key} className={`mdbvm-tab ${tab === key ? 'mdbvm-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* Validation */}
      {tab === 'validation' && (
        <div className="mdbvm-grid">
          <div className="mdbvm-panel">
            <h3>Try saving a document</h3>
            <div className="mdbvm-form">
              {VALIDATORS.map(v => (
                <div key={v.field} className="mdbvm-field">
                  <label>
                    <span className="mdbvm-field-name">{v.field}</span>
                    <code className="mdbvm-field-rule">{v.rule}</code>
                  </label>
                  <input className={`mdbvm-input ${validated && !v.test(values[v.field]) ? 'mdbvm-input--err' : ''} ${validated && v.test(values[v.field]) ? 'mdbvm-input--ok' : ''}`}
                    value={v.field === 'name' ? name : v.field === 'email' ? email : age}
                    onChange={e => { v.field === 'name' ? setName(e.target.value) : v.field === 'email' ? setEmail(e.target.value) : setAge(e.target.value); setValidated(false); }} />
                </div>
              ))}
              <button className="mdbvm-save-btn" onClick={() => setValidated(true)}>await user.save() ▶</button>
            </div>
          </div>
          <div className="mdbvm-panel">
            <h3>Result</h3>
            {!validated && <div className="mdbvm-idle">Fill the form &amp; click save to validate.</div>}
            {validated && passes && (
              <div className="mdbvm-success">
                <div className="mdbvm-success-icon">✓</div>
                <strong>Validation passed!</strong>
                <p>Document saved to MongoDB.</p>
                <pre className="mdbvm-code"><code>{`{ name: "${name}", email: "${email}", age: ${age} }`}</code></pre>
              </div>
            )}
            {validated && !passes && (
              <div className="mdbvm-errors">
                <div className="mdbvm-error-title">✗ ValidationError</div>
                {errors.map(e => (
                  <div key={e.field} className="mdbvm-error-row">
                    <code>{e.field}</code>: {e.errorMsg}
                  </div>
                ))}
                <pre className="mdbvm-code"><code>{`try {\n  await user.save();\n} catch (err) {\n  // err.name === "ValidationError"\n  console.log(err.errors);\n}`}</code></pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Middleware */}
      {tab === 'middleware' && (
        <div className="mdbvm-middleware">
          <p className="mdbvm-desc">Middleware (hooks) run functions at specific moments in a document's lifecycle.</p>
          <div className="mdbvm-hook-tabs">
            {MIDDLEWARE.map((m, i) => (
              <button key={m.hook} className={`mdbvm-hook-tab ${activeHook === i ? 'mdbvm-hook-tab--on' : ''}`}
                style={{ '--hc': m.color }} onClick={() => setActiveHook(i)}>
                <span>{m.icon}</span><code>{m.hook}</code>
              </button>
            ))}
          </div>
          <div className="mdbvm-hook-detail" style={{ borderColor: MIDDLEWARE[activeHook].color }}>
            <p className="mdbvm-hook-desc">{MIDDLEWARE[activeHook].desc}</p>
            <pre className="mdbvm-code"><code>{MIDDLEWARE[activeHook].code}</code></pre>
          </div>
          <div className="mdbvm-lifecycle">
            <div className="mdbvm-life-step" style={{ borderColor: '#00ED64' }}>pre('save')</div>
            <span className="mdbvm-life-arrow">→</span>
            <div className="mdbvm-life-step mdbvm-life-step--db">💾 MongoDB write</div>
            <span className="mdbvm-life-arrow">→</span>
            <div className="mdbvm-life-step" style={{ borderColor: '#61AFEF' }}>post('save')</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MdbValidationMiddlewareVisualization;

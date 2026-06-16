import React, { useState } from 'react';
import './visual.css';

const EnvConfigModuleVisualization = () => {
  const [view, setView] = useState('bad');

  const badFiles = [
    {
      name: 'app.js',
      lines: [
        "const db = require('mongoose');",
        "db.connect(process.env.DB_URL);",
      ],
    },
    {
      name: 'auth.js',
      lines: [
        "jwt.sign(payload,",
        "  process.env.JWT_SECRET,",
        "  { expiresIn: process.env.JWT_EXPIRY }",
        ");",
      ],
    },
    {
      name: 'email.js',
      lines: [
        "transporter = nodemailer.createTransport({",
        "  host: process.env.SMTP_HOST,",
        "  port: process.env.SMTP_PORT,",
        "  auth: { user: process.env.SMTP_USER,",
        "          pass: process.env.SMTP_PASS }",
        "});",
      ],
    },
    {
      name: 'server.js',
      lines: [
        "app.listen(process.env.PORT || 3000);",
        "// what if PORT is undefined?",
      ],
    },
  ];

  const goodConfig = `// config/index.js
const Joi = require('joi');

const schema = Joi.object({
  DB_URL:     Joi.string().required(),
  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRY: Joi.string().default('7d'),
  PORT:       Joi.number().default(3000),
  SMTP_HOST:  Joi.string().required(),
  SMTP_PORT:  Joi.number().default(587),
  SMTP_USER:  Joi.string().required(),
  SMTP_PASS:  Joi.string().required(),
});

const { error, value } = schema.validate(process.env);
if (error) throw new Error(\`Config error: \${error.message}\`);

module.exports = value;`;

  const goodUsage = [
    { name: 'app.js', line: "const { DB_URL } = require('./config');" },
    { name: 'auth.js', line: "const { JWT_SECRET, JWT_EXPIRY } = require('./config');" },
    { name: 'email.js', line: "const { SMTP_HOST, SMTP_PORT } = require('./config');" },
    { name: 'server.js', line: "const { PORT } = require('./config');" },
  ];

  return (
    <div className="envmod-container">
      <div className="envmod-toggle-bar">
        <button
          className={`envmod-toggle ${view === 'bad' ? 'envmod-toggle--bad' : ''}`}
          onClick={() => setView('bad')}
        >
          &#10007; Scattered process.env
        </button>
        <button
          className={`envmod-toggle ${view === 'good' ? 'envmod-toggle--good' : ''}`}
          onClick={() => setView('good')}
        >
          &#10003; Config Module
        </button>
      </div>

      {view === 'bad' ? (
        <div className="envmod-bad">
          <div className="envmod-bad-header">
            process.env calls scattered across every file — fragile and inconsistent
          </div>
          <div className="envmod-files-grid">
            {badFiles.map(f => (
              <div key={f.name} className="envmod-file-card envmod-file-card--bad">
                <div className="envmod-file-top">
                  <span className="envmod-file-name">{f.name}</span>
                  <span className="envmod-warn-dot" title="raw process.env access">!</span>
                </div>
                <pre className="envmod-pre">
                  {f.lines.map((l, i) => (
                    <div key={i} className={l.includes('process.env') ? 'envmod-highlight-bad' : ''}>{l}</div>
                  ))}
                </pre>
              </div>
            ))}
          </div>
          <div className="envmod-problems">
            <div className="envmod-problem">&#128683; No validation — typos silently become undefined</div>
            <div className="envmod-problem">&#128683; Default values scattered or missing</div>
            <div className="envmod-problem">&#128683; Hard to find all env usages during refactor</div>
          </div>
        </div>
      ) : (
        <div className="envmod-good">
          <div className="envmod-good-layout">
            <div className="envmod-left">
              <div className="envmod-section-title">config/index.js</div>
              <pre className="envmod-code">{goodConfig}</pre>
            </div>
            <div className="envmod-right">
              <div className="envmod-section-title">Every file imports from one place</div>
              <div className="envmod-usage-list">
                {goodUsage.map(f => (
                  <div key={f.name} className="envmod-usage-item">
                    <span className="envmod-file-name">{f.name}</span>
                    <code className="envmod-usage-line">{f.line}</code>
                  </div>
                ))}
              </div>
              <div className="envmod-benefits">
                <div className="envmod-section-title">Benefits</div>
                <div className="envmod-benefit">&#10003; Validates all vars at startup</div>
                <div className="envmod-benefit">&#10003; Provides typed defaults</div>
                <div className="envmod-benefit">&#10003; Single source of truth</div>
                <div className="envmod-benefit">&#10003; Easy to audit &amp; refactor</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnvConfigModuleVisualization;

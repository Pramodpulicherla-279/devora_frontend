import React, { useState } from 'react';
import './visual.css';

const SETUP_STEPS = [
  { step: 1, code: `npm init -y\nnpm install express`, label: 'Install Express' },
  { step: 2, code: `const express = require('express');\nconst app = express();`, label: 'Create app instance' },
  { step: 3, code: `app.get('/', (req, res) => {\n  res.send('Hello World!');\n});`, label: 'Define a route' },
  { step: 4, code: `app.listen(3000, () => {\n  console.log('Server on port 3000');\n});`, label: 'Start the server' },
];

const METHODS = [
  { method: 'GET', color: '#6cc644', desc: 'Read / fetch data', example: "app.get('/users', handler)" },
  { method: 'POST', color: '#61AFEF', desc: 'Create new resource', example: "app.post('/users', handler)" },
  { method: 'PUT', color: '#E5C07B', desc: 'Full update of resource', example: "app.put('/users/:id', handler)" },
  { method: 'PATCH', color: '#C678DD', desc: 'Partial update', example: "app.patch('/users/:id', handler)" },
  { method: 'DELETE', color: '#E06C75', desc: 'Remove resource', example: "app.delete('/users/:id', handler)" },
];

const NODE_VS_EXPRESS = [
  { feature: 'HTTP Server', node: 'require("http").createServer()', express: 'express() + app.listen()' },
  { feature: 'Routing', node: 'Manual URL parsing with if/else', express: 'app.get(), app.post(), etc.' },
  { feature: 'Middleware', node: 'Build from scratch', express: 'app.use() — built-in + ecosystem' },
  { feature: 'JSON response', node: 'res.end(JSON.stringify(data))', express: 'res.json(data)' },
  { feature: 'Static files', node: 'fs.readFile + manual MIME', express: 'express.static("public")' },
];

const BkndExpressIntroVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeMethod, setActiveMethod] = useState('GET');
  const [tab, setTab] = useState('setup');

  const method = METHODS.find(m => m.method === activeMethod);

  return (
    <div className="bnei-wrap">
      <header className="bnei-head">
        <span className="bnei-badge">Express.js</span>
        <h2>Introduction to Express.js</h2>
        <p>The minimal, flexible Node.js web framework</p>
      </header>

      <div className="bnei-tabs">
        {[['setup', '🚀 Setup'], ['methods', '🔀 HTTP Methods'], ['compare', '⚖️ Node vs Express']].map(([key, label]) => (
          <button key={key} className={`bnei-tab ${tab === key ? 'bnei-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* ── Setup Steps ── */}
      {tab === 'setup' && (
        <div className="bnei-setup">
          <div className="bnei-steps">
            {SETUP_STEPS.map((s, i) => (
              <button key={s.step} className={`bnei-step-btn ${activeStep === i ? 'bnei-step-btn--on' : ''} ${i < activeStep ? 'bnei-step-btn--done' : ''}`}
                onClick={() => setActiveStep(i)}>
                <span className="bnei-step-num">{s.step}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
          <pre className="bnei-code"><code>{SETUP_STEPS[activeStep].code}</code></pre>
          <div className="bnei-nav-btns">
            <button className="bnei-nav" disabled={activeStep === 0} onClick={() => setActiveStep(s => s - 1)}>← Prev</button>
            <button className="bnei-nav bnei-nav--next" disabled={activeStep === SETUP_STEPS.length - 1} onClick={() => setActiveStep(s => s + 1)}>Next →</button>
          </div>
          <pre className="bnei-code bnei-code--full"><code>{SETUP_STEPS.map(s => s.code).join('\n\n')}</code></pre>
        </div>
      )}

      {/* ── HTTP Methods ── */}
      {tab === 'methods' && (
        <div className="bnei-methods">
          <div className="bnei-method-pills">
            {METHODS.map(m => (
              <button key={m.method} className={`bnei-method-pill ${activeMethod === m.method ? 'bnei-method-pill--on' : ''}`}
                style={{ '--mc': m.color }} onClick={() => setActiveMethod(m.method)}>{m.method}</button>
            ))}
          </div>
          <div className="bnei-method-detail" style={{ borderColor: method.color }}>
            <span className="bnei-method-badge" style={{ background: method.color }}>{method.method}</span>
            <p className="bnei-method-desc">{method.desc}</p>
            <pre className="bnei-code"><code>{method.example}</code></pre>
          </div>
          <div className="bnei-req-flow">
            <div className="bnei-flow-box bnei-flow-client">Client<br /><code>fetch('/users')</code></div>
            <div className="bnei-flow-arrow" style={{ color: method.color }}>— {method.method} →</div>
            <div className="bnei-flow-box bnei-flow-server">Express Server<br /><code>app.{method.method.toLowerCase()}('/users', …)</code></div>
            <div className="bnei-flow-arrow" style={{ color: method.color }}>← res.json() —</div>
            <div className="bnei-flow-box bnei-flow-client">Client receives<br />JSON / HTML</div>
          </div>
        </div>
      )}

      {/* ── Node vs Express ── */}
      {tab === 'compare' && (
        <div className="bnei-compare">
          <table className="bnei-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th style={{ color: '#68A063' }}>Raw Node.js</th>
                <th style={{ color: '#888' }}>Express.js</th>
              </tr>
            </thead>
            <tbody>
              {NODE_VS_EXPRESS.map(row => (
                <tr key={row.feature}>
                  <td className="bnei-td-feature">{row.feature}</td>
                  <td className="bnei-td-node"><code>{row.node}</code></td>
                  <td className="bnei-td-express"><code>{row.express}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="bnei-compare-note">Express adds a thin, powerful abstraction layer — you still write Node.js, just with much less boilerplate.</p>
        </div>
      )}
    </div>
  );
};

export default BkndExpressIntroVisualization;

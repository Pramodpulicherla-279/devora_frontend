import React, { useState } from 'react';
import './visual.css';

const ENDPOINTS = [
  { method: 'GET', path: '/api/users', color: '#68A063', desc: 'Get all users', reqBody: null, respBody: `[\n  { "id": 1, "name": "Ali", "email": "ali@x.com" },\n  { "id": 2, "name": "Sam", "email": "sam@x.com" }\n]`, status: 200 },
  { method: 'GET', path: '/api/users/:id', color: '#68A063', desc: 'Get one user by ID', reqBody: null, respBody: `{ "id": 1, "name": "Ali", "email": "ali@x.com" }`, status: 200 },
  { method: 'POST', path: '/api/users', color: '#61AFEF', desc: 'Create a new user', reqBody: `{\n  "name": "Mia",\n  "email": "mia@x.com"\n}`, respBody: `{ "id": 3, "name": "Mia", "email": "mia@x.com" }`, status: 201 },
  { method: 'PUT', path: '/api/users/:id', color: '#E5C07B', desc: 'Update a user (full)', reqBody: `{\n  "name": "Ali Updated",\n  "email": "ali2@x.com"\n}`, respBody: `{ "id": 1, "name": "Ali Updated", "email": "ali2@x.com" }`, status: 200 },
  { method: 'DELETE', path: '/api/users/:id', color: '#E06C75', desc: 'Delete a user', reqBody: null, respBody: `(204 No Content — empty body)`, status: 204 },
];

const API_CODE = `// routes/users.js\nconst express = require('express');\nconst router = express.Router();\nconst ctrl = require('../controllers/userController');\n\nrouter.get('/',    ctrl.getAll);\nrouter.get('/:id', ctrl.getOne);\nrouter.post('/',   ctrl.create);\nrouter.put('/:id', ctrl.update);\nrouter.delete('/:id', ctrl.remove);\n\nmodule.exports = router;\n\n// app.js\napp.use('/api/users', require('./routes/users'));`;

const CONTROLLER_CODE = `// controllers/userController.js\nlet users = [];\nlet nextId = 1;\n\nexports.getAll = (req, res) => {\n  res.json(users);\n};\n\nexports.getOne = (req, res) => {\n  const user = users.find(u => u.id === +req.params.id);\n  if (!user) return res.status(404).json({ error: 'Not found' });\n  res.json(user);\n};\n\nexports.create = (req, res) => {\n  const user = { id: nextId++, ...req.body };\n  users.push(user);\n  res.status(201).json(user);\n};\n\nexports.update = (req, res) => {\n  const idx = users.findIndex(u => u.id === +req.params.id);\n  if (idx === -1) return res.status(404).json({ error: 'Not found' });\n  users[idx] = { ...users[idx], ...req.body };\n  res.json(users[idx]);\n};\n\nexports.remove = (req, res) => {\n  users = users.filter(u => u.id !== +req.params.id);\n  res.status(204).send();\n};`;

const BkndRestfulApiVisualization = () => {
  const [activeEndpoint, setActiveEndpoint] = useState(0);
  const [codeView, setCodeView] = useState('routes');
  const [simulating, setSimulating] = useState(false);
  const [simResult, setSimResult] = useState(null);

  const ep = ENDPOINTS[activeEndpoint];

  const simulate = () => {
    setSimulating(true);
    setSimResult(null);
    setTimeout(() => { setSimulating(false); setSimResult(ep); }, 900);
  };

  const statusColor = (code) => code < 300 ? '#68A063' : code < 400 ? '#E5C07B' : '#E06C75';

  return (
    <div className="bnra-wrap">
      <header className="bnra-head">
        <span className="bnra-badge">REST API</span>
        <h2>Creating RESTful APIs</h2>
        <p>Routes · Controllers · Request / Response</p>
      </header>

      <div className="bnra-grid">
        {/* API Explorer */}
        <div className="bnra-panel">
          <h3>API Endpoint Explorer</h3>
          <div className="bnra-endpoints">
            {ENDPOINTS.map((e, i) => (
              <button key={i} className={`bnra-endpoint ${activeEndpoint === i ? 'bnra-endpoint--on' : ''}`}
                style={{ '--ec': e.color }} onClick={() => { setActiveEndpoint(i); setSimResult(null); }}>
                <span className="bnra-ep-method" style={{ background: e.color }}>{e.method}</span>
                <code className="bnra-ep-path">{e.path}</code>
              </button>
            ))}
          </div>

          <div className="bnra-ep-detail" style={{ borderColor: ep.color }}>
            <p className="bnra-ep-desc">{ep.desc}</p>
            {ep.reqBody && (
              <div className="bnra-ep-section">
                <span className="bnra-ep-section-label">Request Body</span>
                <pre className="bnra-code"><code>{ep.reqBody}</code></pre>
              </div>
            )}
            <button className="bnra-sim-btn" style={{ borderColor: ep.color, color: ep.color }}
              onClick={simulate} disabled={simulating}>
              {simulating ? '⏳ Sending…' : `▶ Simulate ${ep.method}`}
            </button>
            {simResult && (
              <div className="bnra-sim-result">
                <div className="bnra-sim-status" style={{ color: statusColor(simResult.status) }}>
                  HTTP {simResult.status}
                </div>
                <pre className="bnra-code"><code>{simResult.respBody}</code></pre>
              </div>
            )}
          </div>
        </div>

        {/* Code Panel */}
        <div className="bnra-panel">
          <div className="bnra-code-tabs">
            <button className={`bnra-ctab ${codeView === 'routes' ? 'bnra-ctab--on' : ''}`} onClick={() => setCodeView('routes')}>routes/users.js</button>
            <button className={`bnra-ctab ${codeView === 'controller' ? 'bnra-ctab--on' : ''}`} onClick={() => setCodeView('controller')}>userController.js</button>
          </div>
          <pre className="bnra-code bnra-code--scroll"><code>{codeView === 'routes' ? API_CODE : CONTROLLER_CODE}</code></pre>

          <div className="bnra-tips">
            <div className="bnra-tip">✓ Always use <code>res.status(201)</code> for POST (created)</div>
            <div className="bnra-tip">✓ Use <code>res.status(204).send()</code> for DELETE (no content)</div>
            <div className="bnra-tip">✓ Return consistent JSON error shapes: <code>{"{ error: '...' }"}</code></div>
            <div className="bnra-tip">✓ Prefix all API routes with <code>/api</code></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BkndRestfulApiVisualization;

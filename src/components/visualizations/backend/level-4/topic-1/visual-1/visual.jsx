import React, { useState } from 'react';
import './visual.css';

const MVC_LAYERS = {
  model: {
    label: 'Model', icon: '🗄️', color: '#68A063',
    resp: 'Data layer — database interactions, schemas, business logic',
    files: ['models/User.js', 'models/Post.js', 'models/Comment.js'],
    code: `// models/User.js\nconst users = []; // in-memory (use MongoDB in prod)\n\nconst UserModel = {\n  findAll: () => users,\n  findById: (id) => users.find(u => u.id === id),\n  create: (data) => {\n    const user = { id: Date.now(), ...data };\n    users.push(user);\n    return user;\n  },\n};\n\nmodule.exports = UserModel;`,
  },
  view: {
    label: 'View', icon: '🎨', color: '#61AFEF',
    resp: 'Presentation layer — EJS templates rendered to HTML for the browser',
    files: ['views/index.ejs', 'views/users/list.ejs', 'views/partials/nav.ejs'],
    code: `<!-- views/users/list.ejs -->\n<%- include('../partials/header', { title: 'Users' }) %>\n<main>\n  <h1>All Users</h1>\n  <% users.forEach(user => { %>\n    <div class="user-card">\n      <h2><%= user.name %></h2>\n      <p><%= user.email %></p>\n    </div>\n  <% }); %>\n</main>\n<%- include('../partials/footer') %>`,
  },
  controller: {
    label: 'Controller', icon: '⚙️', color: '#E5C07B',
    resp: 'Logic layer — handles requests, talks to Model, tells View what to render',
    files: ['controllers/userController.js', 'controllers/postController.js'],
    code: `// controllers/userController.js\nconst UserModel = require('../models/User');\n\nexports.listUsers = (req, res) => {\n  const users = UserModel.findAll();\n  res.render('users/list', { users });\n};\n\nexports.createUser = (req, res) => {\n  const user = UserModel.create(req.body);\n  res.redirect('/users');\n};\n\nexports.showUser = (req, res) => {\n  const user = UserModel.findById(req.params.id);\n  if (!user) return res.status(404).render('404');\n  res.render('users/show', { user });\n};`,
  },
};

const FLOW_STEPS = [
  { from: 'Browser', to: 'Router', label: 'GET /users', color: '#7d8590' },
  { from: 'Router', to: 'Controller', label: 'listUsers(req, res)', color: '#E5C07B' },
  { from: 'Controller', to: 'Model', label: 'UserModel.findAll()', color: '#68A063' },
  { from: 'Model', to: 'Controller', label: 'returns users[]', color: '#68A063' },
  { from: 'Controller', to: 'View', label: 'res.render("users/list", { users })', color: '#61AFEF' },
  { from: 'View', to: 'Browser', label: 'HTML response', color: '#61AFEF' },
];

const FILE_STRUCTURE = `project/\n├── app.js               ← Entry point\n├── routes/\n│   ├── index.js         ← Mount all routers\n│   └── users.js         ← /users routes\n├── controllers/\n│   └── userController.js\n├── models/\n│   └── User.js\n├── views/\n│   ├── partials/\n│   │   ├── header.ejs\n│   │   └── footer.ejs\n│   └── users/\n│       └── list.ejs\n└── public/              ← Static files (CSS, JS)\n    └── style.css`;

const BkndMvcProjectVisualization = () => {
  const [activeLayer, setActiveLayer] = useState('controller');
  const [flowStep, setFlowStep] = useState(-1);
  const [tab, setTab] = useState('mvc');

  const layer = MVC_LAYERS[activeLayer];

  return (
    <div className="bnmv-wrap">
      <header className="bnmv-head">
        <span className="bnmv-badge">Node.js</span>
        <h2>MVC Project Architecture</h2>
        <p>Model · View · Controller — the standard pattern for organised web apps</p>
      </header>

      <div className="bnmv-tabs">
        {[['mvc', '🏗️ MVC Layers'], ['flow', '🔄 Request Flow'], ['structure', '📁 File Structure']].map(([key, label]) => (
          <button key={key} className={`bnmv-tab ${tab === key ? 'bnmv-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {tab === 'mvc' && (
        <div className="bnmv-mvc">
          <div className="bnmv-layer-btns">
            {Object.entries(MVC_LAYERS).map(([key, { label, icon, color }]) => (
              <button key={key} className={`bnmv-layer-btn ${activeLayer === key ? 'bnmv-layer-btn--on' : ''}`}
                style={{ '--lc': color }} onClick={() => setActiveLayer(key)}>
                {icon} {label}
              </button>
            ))}
          </div>
          <div className="bnmv-layer-detail" style={{ borderColor: layer.color }}>
            <p className="bnmv-layer-resp">{layer.resp}</p>
            <div className="bnmv-layer-files">
              {layer.files.map(f => <code key={f} className="bnmv-file-chip">{f}</code>)}
            </div>
            <pre className="bnmv-code"><code>{layer.code}</code></pre>
          </div>
        </div>
      )}

      {tab === 'flow' && (
        <div className="bnmv-flow">
          <p className="bnmv-flow-desc">Trace a <code>GET /users</code> request through the full MVC stack.</p>
          <div className="bnmv-flow-steps">
            {FLOW_STEPS.map((s, i) => (
              <div key={i} className={`bnmv-flow-step ${flowStep >= i ? 'bnmv-flow-step--on' : ''}`} style={{ '--fc': s.color }}>
                <span className="bnmv-flow-from">{s.from}</span>
                <div className="bnmv-flow-arrow-wrap">
                  <div className="bnmv-flow-line" />
                  <span className="bnmv-flow-label">{s.label}</span>
                </div>
                <span className="bnmv-flow-to">{s.to}</span>
              </div>
            ))}
          </div>
          <div className="bnmv-flow-controls">
            <button className="bnmv-btn" onClick={() => setFlowStep(f => Math.min(FLOW_STEPS.length - 1, f + 1))} disabled={flowStep === FLOW_STEPS.length - 1}>Next step →</button>
            <button className="bnmv-btn bnmv-btn--reset" onClick={() => setFlowStep(-1)}>Reset</button>
          </div>
        </div>
      )}

      {tab === 'structure' && (
        <div className="bnmv-structure">
          <p className="bnmv-struct-desc">Organise your Express project by concern, not by file type.</p>
          <pre className="bnmv-code bnmv-code--large"><code>{FILE_STRUCTURE}</code></pre>
        </div>
      )}
    </div>
  );
};

export default BkndMvcProjectVisualization;

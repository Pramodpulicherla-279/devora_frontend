import React, { useState } from 'react';
import './visual.css';

const EJS_TAGS = [
  { tag: '<%= %>', color: '#68A063', label: 'Output (escaped)', desc: 'Renders value as escaped HTML. Use for displaying data safely.', example: `<h1>Hello, <%= user.name %>!</h1>\n<!-- renders: Hello, Ali! -->` },
  { tag: '<% %>', color: '#61AFEF', label: 'Scriptlet', desc: 'Runs JS logic — no output. Use for if/else, loops, variable declarations.', example: `<% if (isLoggedIn) { %>\n  <p>Welcome back!</p>\n<% } else { %>\n  <p>Please log in.</p>\n<% } %>` },
  { tag: '<%- %>', color: '#E06C75', label: 'Raw Output (unescaped)', desc: 'Renders raw HTML. Only use with trusted content — XSS risk!', example: `<%- include('partials/header') %>\n<%- htmlContent %>  <!-- ⚠️ unescaped -->` },
  { tag: '<%# %>', color: '#7d8590', label: 'Comment', desc: 'EJS comment — stripped at render time, never visible in output HTML.', example: `<%# This is a server-side comment %>\n<!-- This IS visible in HTML -->` },
  { tag: '<%- include() %>', color: '#C678DD', label: 'Include / Partial', desc: 'Embeds another EJS file. Core pattern for layouts and reusable partials.', example: `<%- include('partials/nav', { user }) %>\n<%- include('partials/footer') %>` },
];

const RENDER_STEPS = [
  { id: 'route', icon: '🔀', label: 'Express Route', code: `app.get('/profile', (req, res) => {\n  const user = { name: 'Ali', role: 'Admin' };\n  res.render('profile', { user });\n});` },
  { id: 'template', icon: '📄', label: 'EJS Template', code: `<!-- views/profile.ejs -->\n<h1>Hello, <%= user.name %>!</h1>\n<p>Role: <%= user.role %></p>` },
  { id: 'html', icon: '🌐', label: 'Final HTML', code: `<!-- Sent to browser -->\n<h1>Hello, Ali!</h1>\n<p>Role: Admin</p>` },
];

const BkndEjsTemplatingVisualization = () => {
  const [activeTag, setActiveTag] = useState(0);
  const [renderStep, setRenderStep] = useState(0);
  const [liveVar, setLiveVar] = useState('World');

  return (
    <div className="bnej-wrap">
      <header className="bnej-head">
        <span className="bnej-badge">EJS</span>
        <h2>EJS Templating Engine</h2>
        <p>Embedded JavaScript — render dynamic HTML on the server</p>
      </header>

      <div className="bnej-grid">
        {/* Tag Explorer */}
        <div className="bnej-panel">
          <h3>EJS Tag Types</h3>
          <div className="bnej-tags">
            {EJS_TAGS.map((t, i) => (
              <button key={t.tag} className={`bnej-tag-btn ${activeTag === i ? 'bnej-tag-btn--on' : ''}`}
                style={{ '--tc': t.color }} onClick={() => setActiveTag(i)}>
                <code>{t.tag}</code>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
          <div className="bnej-tag-detail" style={{ borderColor: EJS_TAGS[activeTag].color }}>
            <p className="bnej-tag-desc">{EJS_TAGS[activeTag].desc}</p>
            <pre className="bnej-code"><code>{EJS_TAGS[activeTag].example}</code></pre>
          </div>
        </div>

        {/* Render Flow + Live demo */}
        <div className="bnej-panel">
          <h3>Render Flow</h3>
          <div className="bnej-render-steps">
            {RENDER_STEPS.map((s, i) => (
              <button key={s.id} className={`bnej-rstep ${renderStep === i ? 'bnej-rstep--on' : ''} ${i < renderStep ? 'bnej-rstep--done' : ''}`}
                onClick={() => setRenderStep(i)}>
                <span>{s.icon}</span><span>{s.label}</span>
              </button>
            ))}
          </div>
          <pre className="bnej-code"><code>{RENDER_STEPS[renderStep].code}</code></pre>
          {renderStep < RENDER_STEPS.length - 1 && (
            <button className="bnej-next-btn" onClick={() => setRenderStep(s => s + 1)}>Next step →</button>
          )}

          <div className="bnej-live">
            <h3>Live Demo</h3>
            <label>Template variable: <code>name</code></label>
            <input className="bnej-input" value={liveVar} onChange={e => setLiveVar(e.target.value)} placeholder="World" />
            <div className="bnej-live-row">
              <div className="bnej-live-side">
                <div className="bnej-live-label">Template (EJS)</div>
                <pre className="bnej-code"><code>{`<h1>Hello, <%= name %>!</h1>`}</code></pre>
              </div>
              <div className="bnej-live-arrow">→</div>
              <div className="bnej-live-side">
                <div className="bnej-live-label">Output (HTML)</div>
                <div className="bnej-live-output">
                  <h1 style={{ fontSize: '1rem', margin: 0 }}>Hello, {liveVar || 'World'}!</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BkndEjsTemplatingVisualization;

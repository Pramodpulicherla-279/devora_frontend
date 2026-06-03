import React, { useState } from 'react';
import './visual.css';

const LAYOUTS = [
  { name: 'Without Layout', icon: '😩', desc: 'Every page repeats the same <head>, <nav>, <footer> HTML. Change nav → update every file.', bad: true },
  { name: 'With Partials', icon: '✅', desc: 'Extract common sections into partial files. Include them anywhere with <%- include() %>. One change updates all pages.', bad: false },
];

const PARTIALS = [
  { name: 'header.ejs', color: '#68A063', icon: '🔝', content: `<!-- views/partials/header.ejs -->\n<!DOCTYPE html>\n<html>\n<head>\n  <title><%= title %></title>\n  <link rel="stylesheet" href="/style.css">\n</head>\n<body>\n<nav>\n  <a href="/">Home</a>\n  <a href="/about">About</a>\n</nav>`, desc: 'HTML head + navigation — same on every page' },
  { name: 'footer.ejs', color: '#61AFEF', icon: '🔻', content: `<!-- views/partials/footer.ejs -->\n<footer>\n  <p>&copy; 2024 My App</p>\n</footer>\n</body>\n</html>`, desc: 'Closing tags, footer content' },
  { name: 'card.ejs', color: '#C678DD', icon: '🃏', content: `<!-- views/partials/card.ejs -->\n<div class="card">\n  <h2><%= title %></h2>\n  <p><%= description %></p>\n  <a href="<%= link %>">Read more</a>\n</div>`, desc: 'Reusable UI component with passed data' },
];

const PAGE_TEMPLATE = `<!-- views/home.ejs -->\n<%- include('partials/header', { title: 'Home' }) %>\n\n<main>\n  <h1>Welcome, <%= user.name %>!</h1>\n\n  <% posts.forEach(post => { %>\n    <%- include('partials/card', {\n      title: post.title,\n      description: post.excerpt,\n      link: '/posts/' + post.id\n    }) %>\n  <% }); %>\n</main>\n\n<%- include('partials/footer') %>`;

const BkndAdvancedEjsVisualization = () => {
  const [activePartial, setActivePartial] = useState(0);
  const [layoutMode, setLayoutMode] = useState(1);
  const [showComposed, setShowComposed] = useState(false);

  return (
    <div className="bnae-wrap">
      <header className="bnae-head">
        <span className="bnae-badge">EJS</span>
        <h2>Advanced EJS — Layouts &amp; Partials</h2>
        <p>DRY templating with reusable components</p>
      </header>

      {/* Layout comparison */}
      <div className="bnae-layout-compare">
        {LAYOUTS.map((l, i) => (
          <button key={l.name} className={`bnae-layout-card ${layoutMode === i ? 'bnae-layout-card--on' : ''} ${l.bad ? 'bnae-layout-card--bad' : 'bnae-layout-card--good'}`}
            onClick={() => setLayoutMode(i)}>
            <span className="bnae-layout-icon">{l.icon}</span>
            <span className="bnae-layout-name">{l.name}</span>
            <p className="bnae-layout-desc">{l.desc}</p>
          </button>
        ))}
      </div>

      <div className="bnae-grid">
        {/* Partials Explorer */}
        <div className="bnae-panel">
          <h3>Partials Library</h3>
          <div className="bnae-partial-tabs">
            {PARTIALS.map((p, i) => (
              <button key={p.name} className={`bnae-partial-tab ${activePartial === i ? 'bnae-partial-tab--on' : ''}`}
                style={{ '--pc': p.color }} onClick={() => setActivePartial(i)}>
                {p.icon} {p.name}
              </button>
            ))}
          </div>
          <div className="bnae-partial-detail" style={{ borderColor: PARTIALS[activePartial].color }}>
            <p className="bnae-partial-desc">{PARTIALS[activePartial].desc}</p>
            <pre className="bnae-code"><code>{PARTIALS[activePartial].content}</code></pre>
          </div>
        </div>

        {/* Page Composition */}
        <div className="bnae-panel">
          <div className="bnae-comp-head">
            <h3>Page Composition</h3>
            <button className="bnae-compose-btn" onClick={() => setShowComposed(!showComposed)}>
              {showComposed ? 'Show template' : 'Show full template'}
            </button>
          </div>
          <pre className="bnae-code"><code>{PAGE_TEMPLATE}</code></pre>
          {showComposed && (
            <div className="bnae-composed-view">
              <div className="bnae-composed-label">Composed page structure:</div>
              {[
                { label: '<%- include("partials/header") %>', color: '#68A063' },
                { label: '<main>  …your content…  </main>', color: '#c9d1d9' },
                { label: '<% posts.forEach() %>  ←  loops', color: '#61AFEF' },
                { label: '<%- include("partials/card") %>  ←  repeated', color: '#C678DD' },
                { label: '<%- include("partials/footer") %>', color: '#61AFEF' },
              ].map((r, i) => (
                <div key={i} className="bnae-composed-row" style={{ borderColor: r.color }}>
                  <code style={{ color: r.color }}>{r.label}</code>
                </div>
              ))}
            </div>
          )}

          <div className="bnae-folder-struct">
            <h3>Recommended Folder Structure</h3>
            <pre className="bnae-code"><code>{`views/\n├── partials/\n│   ├── header.ejs\n│   ├── footer.ejs\n│   └── card.ejs\n├── home.ejs\n├── about.ejs\n└── profile.ejs`}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BkndAdvancedEjsVisualization;

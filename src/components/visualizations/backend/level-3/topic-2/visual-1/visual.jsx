import React, { useState } from 'react';
import './visual.css';

const METHOD_COMPARE = [
  { prop: 'Purpose', get: 'Read/fetch data', post: 'Create/send data' },
  { prop: 'Data location', get: 'URL query string (?key=val)', post: 'Request body (hidden)' },
  { prop: 'Visibility', get: 'Visible in URL bar', post: 'Not visible in URL' },
  { prop: 'Bookmarkable', get: 'Yes', post: 'No' },
  { prop: 'Idempotent', get: 'Yes (safe to repeat)', post: 'No (creates duplicates)' },
  { prop: 'Data size limit', get: 'URL length limit (~2000 chars)', post: 'No practical limit' },
  { prop: 'Use cases', get: 'Search, filters, pagination', post: 'Login, forms, file upload' },
];

const PARSERS = [
  { name: 'express.json()', color: '#68A063', use: 'Parses JSON body (APIs)', example: `app.use(express.json());\n// req.body = { name: 'Ali', age: 25 }` },
  { name: 'express.urlencoded()', color: '#61AFEF', use: 'Parses HTML form data', example: `app.use(express.urlencoded({ extended: true }));\n// req.body = { email: 'ali@example.com' }` },
];

const REQ_DATA = [
  { prop: 'req.body', color: '#C678DD', source: 'Request body (POST/PUT)', example: `// POST /login\n// Body: { email: "ali@x.com", pass: "123" }\nconst { email, pass } = req.body;` },
  { prop: 'req.params', color: '#E5C07B', source: 'URL path parameters', example: `// Route: /users/:id\n// URL: /users/42\nconst id = req.params.id; // "42"` },
  { prop: 'req.query', color: '#61AFEF', source: 'URL query string', example: `// URL: /search?q=express&page=2\nconst { q, page } = req.query;` },
];

const BkndGetPostFormVisualization = () => {
  const [activeParser, setActiveParser] = useState(0);
  const [activeReqData, setActiveReqData] = useState('req.body');
  const [formEmail, setFormEmail] = useState('ali@example.com');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('compare');

  const reqItem = REQ_DATA.find(r => r.prop === activeReqData);

  return (
    <div className="bngp-wrap">
      <header className="bngp-head">
        <span className="bngp-badge">Express.js</span>
        <h2>GET vs POST &amp; Body Parsing</h2>
        <p>Form data · req.body · req.query · req.params</p>
      </header>

      <div className="bngp-tabs">
        {[['compare', '⚖️ GET vs POST'], ['parsing', '🔧 Body Parsers'], ['reqdata', '📦 req Data']].map(([key, label]) => (
          <button key={key} className={`bngp-tab ${activeTab === key ? 'bngp-tab--on' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
        ))}
      </div>

      {/* GET vs POST Table */}
      {activeTab === 'compare' && (
        <div className="bngp-compare">
          <table className="bngp-table">
            <thead>
              <tr>
                <th>Property</th>
                <th style={{ color: '#68A063' }}>GET</th>
                <th style={{ color: '#61AFEF' }}>POST</th>
              </tr>
            </thead>
            <tbody>
              {METHOD_COMPARE.map(row => (
                <tr key={row.prop}>
                  <td className="bngp-td-label">{row.prop}</td>
                  <td className="bngp-td-get">{row.get}</td>
                  <td className="bngp-td-post">{row.post}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bngp-form-demo">
            <h3>Live Form Demo</h3>
            <div className="bngp-form-sim">
              <input className="bngp-form-input" value={formEmail} onChange={e => { setFormEmail(e.target.value); setFormSubmitted(false); }} placeholder="Enter email" />
              <button className="bngp-submit-btn" onClick={() => setFormSubmitted(true)}>Submit (POST)</button>
            </div>
            {formSubmitted && (
              <div className="bngp-result">
                <div className="bngp-result-row"><span>req.body.email</span><code>"{formEmail}"</code></div>
                <div className="bngp-result-row"><span>req.method</span><code>"POST"</code></div>
                <div className="bngp-result-row"><span>Content-Type</span><code>application/x-www-form-urlencoded</code></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Body Parsers */}
      {activeTab === 'parsing' && (
        <div className="bngp-parsers">
          <p className="bngp-parser-intro">Express needs middleware to parse incoming request bodies. Without it, <code>req.body</code> is undefined.</p>
          <div className="bngp-parser-tabs">
            {PARSERS.map((p, i) => (
              <button key={p.name} className={`bngp-parser-tab ${activeParser === i ? 'bngp-parser-tab--on' : ''}`}
                style={{ '--pc': p.color }} onClick={() => setActiveParser(i)}>
                <code>{p.name}</code>
              </button>
            ))}
          </div>
          <div className="bngp-parser-detail" style={{ borderColor: PARSERS[activeParser].color }}>
            <p className="bngp-use">Use when: {PARSERS[activeParser].use}</p>
            <pre className="bngp-code"><code>{PARSERS[activeParser].example}</code></pre>
          </div>
          <pre className="bngp-code bngp-code--full"><code>{`// Register BOTH to handle all cases
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  console.log(req.body); // parsed body
  res.json({ received: req.body });
});`}</code></pre>
        </div>
      )}

      {/* req Data */}
      {activeTab === 'reqdata' && (
        <div className="bngp-reqdata">
          <div className="bngp-req-btns">
            {REQ_DATA.map(r => (
              <button key={r.prop} className={`bngp-req-btn ${activeReqData === r.prop ? 'bngp-req-btn--on' : ''}`}
                style={{ '--rc': r.color }} onClick={() => setActiveReqData(r.prop)}>
                <code>{r.prop}</code>
              </button>
            ))}
          </div>
          <div className="bngp-req-detail" style={{ borderColor: reqItem.color }}>
            <p className="bngp-req-source">Source: <strong>{reqItem.source}</strong></p>
            <pre className="bngp-code"><code>{reqItem.example}</code></pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default BkndGetPostFormVisualization;

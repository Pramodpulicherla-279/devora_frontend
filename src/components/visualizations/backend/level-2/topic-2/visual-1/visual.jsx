import React, { useState } from 'react';
import './visual.css';

const REQ_PROPS = [
  { prop: 'req.params', color: '#E5C07B', example: `// Route: /users/:id\n// URL: /users/42\nreq.params.id  // "42"`, desc: 'URL path segments — defined with colon in route' },
  { prop: 'req.query', color: '#61AFEF', example: `// URL: /search?q=node&page=2\nreq.query.q     // "node"\nreq.query.page  // "2"`, desc: 'Query string key-value pairs after the ?' },
  { prop: 'req.body', color: '#C678DD', example: `// POST /login with JSON body\nreq.body.email     // "ali@example.com"\nreq.body.password  // "secret"`, desc: 'Request body — requires body-parser middleware' },
  { prop: 'req.headers', color: '#E06C75', example: `req.headers['content-type'] // "application/json"\nreq.headers['authorization'] // "Bearer token..."`, desc: 'HTTP headers sent by the client' },
  { prop: 'req.method', color: '#68A063', example: `req.method  // "GET" | "POST" | "PUT" | "DELETE"`, desc: 'The HTTP verb of the request' },
];

const RES_METHODS = [
  { method: 'res.send()', color: '#68A063', example: `res.send('Hello World');\nres.send('<h1>HTML</h1>');`, desc: 'Send a string, Buffer, or object response' },
  { method: 'res.json()', color: '#61AFEF', example: `res.json({ name: 'Ali', role: 'admin' });`, desc: 'Send JSON — sets Content-Type automatically' },
  { method: 'res.status()', color: '#E5C07B', example: `res.status(404).json({ error: 'Not found' });\nres.status(201).json({ id: newUser.id });`, desc: 'Set HTTP status code before sending' },
  { method: 'res.redirect()', color: '#C678DD', example: `res.redirect('/login');\nres.redirect(301, 'https://new-site.com');`, desc: 'Redirect client to another URL' },
  { method: 'res.render()', color: '#E06C75', example: `res.render('home', { title: 'Welcome', user });`, desc: 'Render a template (EJS, Pug, Handlebars, etc.)' },
];

const ROUTE_TYPES = [
  { type: 'Basic', code: `app.get('/about', (req, res) => {\n  res.send('About page');\n});` },
  { type: 'Params', code: `app.get('/users/:id', (req, res) => {\n  res.json({ id: req.params.id });\n});` },
  { type: 'Router', code: `// routes/users.js\nconst router = express.Router();\nrouter.get('/', getAllUsers);\nrouter.post('/', createUser);\nmodule.exports = router;\n\n// app.js\napp.use('/users', require('./routes/users'));` },
  { type: 'Chained', code: `app.route('/books')\n  .get(getAllBooks)\n  .post(createBook);\n\napp.route('/books/:id')\n  .get(getBook)\n  .put(updateBook)\n  .delete(deleteBook);` },
];

const BkndExpressDeepDiveVisualization = () => {
  const [activeReq, setActiveReq] = useState('req.params');
  const [activeRes, setActiveRes] = useState('res.json()');
  const [routeType, setRouteType] = useState('Basic');

  const req = REQ_PROPS.find(r => r.prop === activeReq);
  const res = RES_METHODS.find(r => r.method === activeRes);
  const route = ROUTE_TYPES.find(r => r.type === routeType);

  return (
    <div className="bned-wrap">
      <header className="bned-head">
        <span className="bned-badge">Express.js</span>
        <h2>Express Deep Dive</h2>
        <p>Request · Response · Routing · Router</p>
      </header>

      <div className="bned-grid">
        {/* ── req object ── */}
        <div className="bned-panel">
          <h3>The <code>req</code> Object</h3>
          <div className="bned-prop-list">
            {REQ_PROPS.map(r => (
              <button key={r.prop} className={`bned-prop-btn ${activeReq === r.prop ? 'bned-prop-btn--on' : ''}`}
                style={{ '--rc': r.color }} onClick={() => setActiveReq(r.prop)}>
                <code>{r.prop}</code>
              </button>
            ))}
          </div>
          <div className="bned-detail" style={{ borderColor: req.color }}>
            <p className="bned-detail-desc">{req.desc}</p>
            <pre className="bned-code"><code>{req.example}</code></pre>
          </div>
        </div>

        {/* ── res object ── */}
        <div className="bned-panel">
          <h3>The <code>res</code> Object</h3>
          <div className="bned-prop-list">
            {RES_METHODS.map(r => (
              <button key={r.method} className={`bned-prop-btn ${activeRes === r.method ? 'bned-prop-btn--on' : ''}`}
                style={{ '--rc': r.color }} onClick={() => setActiveRes(r.method)}>
                <code>{r.method}</code>
              </button>
            ))}
          </div>
          <div className="bned-detail" style={{ borderColor: res.color }}>
            <p className="bned-detail-desc">{res.desc}</p>
            <pre className="bned-code"><code>{res.example}</code></pre>
          </div>
        </div>
      </div>

      {/* ── Routing ── */}
      <section className="bned-routing">
        <h3>Routing Patterns</h3>
        <div className="bned-route-tabs">
          {ROUTE_TYPES.map(r => (
            <button key={r.type} className={`bned-route-tab ${routeType === r.type ? 'bned-route-tab--on' : ''}`}
              onClick={() => setRouteType(r.type)}>{r.type}</button>
          ))}
        </div>
        <pre className="bned-code bned-code--large"><code>{route.code}</code></pre>
      </section>
    </div>
  );
};

export default BkndExpressDeepDiveVisualization;

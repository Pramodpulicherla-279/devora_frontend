import React, { useState } from 'react';
import './visual.css';

const CRUD_METHODS = [
  { crud: 'Create', http: 'POST', color: '#61AFEF', status: '201 Created', route: 'POST /users', body: '{ name, email }', resp: '{ id: 1, name: "Ali", email: "ali@x.com" }' },
  { crud: 'Read (all)', http: 'GET', color: '#68A063', status: '200 OK', route: 'GET /users', body: null, resp: '[{ id:1, name:"Ali" }, { id:2, name:"Sam" }]' },
  { crud: 'Read (one)', http: 'GET', color: '#68A063', status: '200 OK', route: 'GET /users/:id', body: null, resp: '{ id: 1, name: "Ali", email: "ali@x.com" }' },
  { crud: 'Update', http: 'PUT', color: '#E5C07B', status: '200 OK', route: 'PUT /users/:id', body: '{ name: "Ali Updated" }', resp: '{ id: 1, name: "Ali Updated" }' },
  { crud: 'Delete', http: 'DELETE', color: '#E06C75', status: '204 No Content', route: 'DELETE /users/:id', body: null, resp: '(empty body)' },
];

const REST_PRINCIPLES = [
  { id: 'stateless', label: 'Stateless', icon: '🔓', desc: 'Each request contains all info needed. Server stores no session state. Scales horizontally.' },
  { id: 'uniform', label: 'Uniform Interface', icon: '📐', desc: 'Resources identified by URLs. Standard HTTP methods. Consistent response format (JSON).' },
  { id: 'client-server', label: 'Client-Server', icon: '🔀', desc: 'Frontend and backend are independent. Each can evolve separately.' },
  { id: 'cacheable', label: 'Cacheable', icon: '💾', desc: 'Responses can be cached by clients/proxies. Improves performance and scalability.' },
  { id: 'layered', label: 'Layered System', icon: '🥞', desc: 'Client doesn\'t know if it\'s talking to the actual server or an intermediate (proxy, LB).' },
];

const STATUS_CODES = [
  { range: '2xx', label: 'Success', color: '#68A063', codes: [{ code: 200, meaning: 'OK — standard success' }, { code: 201, meaning: 'Created — resource created' }, { code: 204, meaning: 'No Content — deleted successfully' }] },
  { range: '4xx', label: 'Client Error', color: '#E5C07B', codes: [{ code: 400, meaning: 'Bad Request — invalid input' }, { code: 401, meaning: 'Unauthorized — not logged in' }, { code: 403, meaning: 'Forbidden — no permission' }, { code: 404, meaning: 'Not Found — resource missing' }] },
  { range: '5xx', label: 'Server Error', color: '#E06C75', codes: [{ code: 500, meaning: 'Internal Server Error' }, { code: 503, meaning: 'Service Unavailable' }] },
];

const BkndRestCrudVisualization = () => {
  const [activeCrud, setActiveCrud] = useState(0);
  const [activePrinciple, setActivePrinciple] = useState('stateless');
  const [activeStatus, setActiveStatus] = useState('2xx');

  const crud = CRUD_METHODS[activeCrud];
  const principle = REST_PRINCIPLES.find(p => p.id === activePrinciple);
  const statusGroup = STATUS_CODES.find(s => s.range === activeStatus);

  return (
    <div className="bnrc-wrap">
      <header className="bnrc-head">
        <span className="bnrc-badge">REST</span>
        <h2>REST &amp; CRUD Operations</h2>
        <p>HTTP methods · Status codes · REST principles</p>
      </header>

      <div className="bnrc-grid">
        {/* CRUD Table */}
        <div className="bnrc-panel">
          <h3>CRUD → HTTP Mapping</h3>
          <div className="bnrc-crud-btns">
            {CRUD_METHODS.map((c, i) => (
              <button key={i} className={`bnrc-crud-btn ${activeCrud === i ? 'bnrc-crud-btn--on' : ''}`}
                style={{ '--cc': c.color }} onClick={() => setActiveCrud(i)}>
                <span className="bnrc-method-pill" style={{ background: c.color }}>{c.http}</span>
                <span>{c.crud}</span>
              </button>
            ))}
          </div>
          <div className="bnrc-crud-detail" style={{ borderColor: crud.color }}>
            <div className="bnrc-detail-row"><span>Route</span><code>{crud.route}</code></div>
            {crud.body && <div className="bnrc-detail-row"><span>Body</span><code>{crud.body}</code></div>}
            <div className="bnrc-detail-row"><span>Response</span><code>{crud.resp}</code></div>
            <div className="bnrc-detail-row"><span>Status</span><span className="bnrc-status-badge" style={{ background: crud.color }}>{crud.status}</span></div>
          </div>
        </div>

        {/* REST Principles + Status Codes */}
        <div className="bnrc-panel">
          <h3>REST Principles</h3>
          <div className="bnrc-principles">
            {REST_PRINCIPLES.map(p => (
              <button key={p.id} className={`bnrc-principle-btn ${activePrinciple === p.id ? 'bnrc-principle-btn--on' : ''}`}
                onClick={() => setActivePrinciple(p.id)}>
                {p.icon} {p.label}
              </button>
            ))}
          </div>
          <p className="bnrc-principle-desc">{principle.desc}</p>

          <h3 style={{ marginTop: '16px' }}>HTTP Status Codes</h3>
          <div className="bnrc-status-tabs">
            {STATUS_CODES.map(s => (
              <button key={s.range} className={`bnrc-status-tab ${activeStatus === s.range ? 'bnrc-status-tab--on' : ''}`}
                style={{ '--sc': s.color }} onClick={() => setActiveStatus(s.range)}>
                <span>{s.range}</span><span className="bnrc-status-label">{s.label}</span>
              </button>
            ))}
          </div>
          <div className="bnrc-status-list">
            {statusGroup.codes.map(c => (
              <div key={c.code} className="bnrc-status-row">
                <span className="bnrc-status-code" style={{ color: statusGroup.color }}>{c.code}</span>
                <span className="bnrc-status-meaning">{c.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BkndRestCrudVisualization;

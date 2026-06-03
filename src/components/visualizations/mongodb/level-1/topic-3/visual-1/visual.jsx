import React, { useState } from 'react';
import './visual.css';

const DOCS = [
  { _id: 1, name: 'Alice', age: 28, role: 'admin', tags: ['vip', 'beta'] },
  { _id: 2, name: 'Bob', age: 34, role: 'user', tags: ['beta'] },
  { _id: 3, name: 'Carol', age: 22, role: 'user', tags: ['new'] },
  { _id: 4, name: 'Dan', age: 41, role: 'admin', tags: ['vip'] },
  { _id: 5, name: 'Eve', age: 19, role: 'user', tags: ['new', 'beta'] },
];

const OPERATORS = {
  '$gt': { label: '$gt — greater than', test: (d) => d.age > 25, query: '{ age: { $gt: 25 } }', color: '#00ED64', desc: 'Matches values greater than 25' },
  '$lt': { label: '$lt — less than', test: (d) => d.age < 30, query: '{ age: { $lt: 30 } }', color: '#61AFEF', desc: 'Matches values less than 30' },
  '$eq': { label: '$eq — equals', test: (d) => d.role === 'admin', query: '{ role: { $eq: "admin" } }', color: '#E5C07B', desc: 'Matches role exactly equal to "admin"' },
  '$in': { label: '$in — in array', test: (d) => ['admin'].includes(d.role), query: '{ role: { $in: ["admin"] } }', color: '#C678DD', desc: 'Matches role within the given list' },
  '$and': { label: '$and — all true', test: (d) => d.age > 25 && d.role === 'user', query: '{ $and: [\n    { age: { $gt: 25 } },\n    { role: "user" }\n  ] }', color: '#E06C75', desc: 'Both conditions must be true' },
  '$or': { label: '$or — any true', test: (d) => d.age < 20 || d.role === 'admin', query: '{ $or: [\n    { age: { $lt: 20 } },\n    { role: "admin" }\n  ] }', color: '#56B6C2', desc: 'At least one condition must be true' },
};

const MdbQueryOperatorsVisualization = () => {
  const [activeOp, setActiveOp] = useState('$gt');
  const op = OPERATORS[activeOp];
  const matched = DOCS.filter(op.test);
  const matchedIds = new Set(matched.map(d => d._id));

  return (
    <div className="mdbqo-wrap">
      <header className="mdbqo-head">
        <span className="mdbqo-badge">MongoDB</span>
        <h2>Query Operators</h2>
        <p>Filter documents like a pro with comparison &amp; logical operators</p>
      </header>

      <div className="mdbqo-op-tabs">
        {Object.entries(OPERATORS).map(([key, o]) => (
          <button key={key} className={`mdbqo-op-tab ${activeOp === key ? 'mdbqo-op-tab--on' : ''}`}
            style={{ '--oc': o.color }} onClick={() => setActiveOp(key)}>
            <code>{key}</code>
          </button>
        ))}
      </div>

      <div className="mdbqo-grid">
        {/* Query */}
        <div className="mdbqo-panel">
          <h3>Query</h3>
          <div className="mdbqo-op-name" style={{ color: op.color }}>{op.label}</div>
          <p className="mdbqo-op-desc">{op.desc}</p>
          <pre className="mdbqo-code" style={{ borderColor: op.color }}><code>{`db.users.find(\n  ${op.query}\n);`}</code></pre>
          <div className="mdbqo-match-count" style={{ color: op.color }}>
            {matched.length} of {DOCS.length} documents match
          </div>
        </div>

        {/* Results */}
        <div className="mdbqo-panel">
          <h3>Collection (matches highlighted)</h3>
          <div className="mdbqo-docs">
            {DOCS.map(d => (
              <pre key={d._id} className={`mdbqo-doc ${matchedIds.has(d._id) ? 'mdbqo-doc--match' : 'mdbqo-doc--dim'}`}
                style={matchedIds.has(d._id) ? { borderColor: op.color } : {}}>
                <code>{`{ _id: ${d._id}, name: "${d.name}", age: ${d.age}, role: "${d.role}" }`}</code>
                {matchedIds.has(d._id) && <span className="mdbqo-check" style={{ color: op.color }}>✓</span>}
              </pre>
            ))}
          </div>
        </div>
      </div>

      <div className="mdbqo-cheatsheet">
        <h3>Operator cheat sheet</h3>
        <div className="mdbqo-cheat-grid">
          {[
            ['$gt / $gte', 'greater than / or equal'],
            ['$lt / $lte', 'less than / or equal'],
            ['$ne', 'not equal'],
            ['$in / $nin', 'in / not in array'],
            ['$and / $or', 'logical combine'],
            ['$exists', 'field is present'],
          ].map(([o, d]) => (
            <div key={o} className="mdbqo-cheat-row">
              <code className="mdbqo-cheat-op">{o}</code>
              <span className="mdbqo-cheat-desc">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MdbQueryOperatorsVisualization;

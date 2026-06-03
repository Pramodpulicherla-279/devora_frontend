import React, { useState } from 'react';
import './visual.css';

const SQL_TABLE = {
  columns: ['id', 'name', 'email', 'city'],
  rows: [
    [1, 'Alice', 'alice@x.com', 'Mumbai'],
    [2, 'Bob', 'bob@x.com', 'Delhi'],
  ],
};

const MONGO_DOC = `{
  "_id": ObjectId("65a1f2..."),
  "name": "Alice",
  "email": "alice@x.com",
  "address": {
    "city": "Mumbai",
    "pin": "400001"
  },
  "hobbies": ["reading", "chess"],
  "isActive": true
}`;

const TERMS = [
  { sql: 'Database', mongo: 'Database', color: '#00ED64', desc: 'Top-level container — same concept in both worlds.' },
  { sql: 'Table', mongo: 'Collection', color: '#13AA52', desc: 'A group of related records. MongoDB calls it a collection.' },
  { sql: 'Row', mongo: 'Document', color: '#61AFEF', desc: 'A single record. In MongoDB it is a flexible JSON-like document (BSON).' },
  { sql: 'Column', mongo: 'Field', color: '#E5C07B', desc: 'A single attribute. Documents can have different fields — no fixed schema.' },
  { sql: 'JOIN', mongo: 'Embed / $lookup', color: '#C678DD', desc: 'Instead of joins, MongoDB often embeds related data inside one document.' },
];

const BSON_TYPES = [
  { type: 'String', example: '"Alice"', color: '#98C379' },
  { type: 'Number', example: '42, 3.14', color: '#E5C07B' },
  { type: 'Boolean', example: 'true / false', color: '#56B6C2' },
  { type: 'ObjectId', example: 'ObjectId("...")', color: '#00ED64' },
  { type: 'Array', example: '["a", "b"]', color: '#C678DD' },
  { type: 'Object', example: '{ city: "..." }', color: '#61AFEF' },
  { type: 'Date', example: 'ISODate("...")', color: '#E06C75' },
  { type: 'Null', example: 'null', color: '#7d8590' },
];

const MdbDocumentsVisualization = () => {
  const [tab, setTab] = useState('compare');
  const [activeTerm, setActiveTerm] = useState(1);

  return (
    <div className="mdbdoc-wrap">
      <header className="mdbdoc-head">
        <span className="mdbdoc-badge">MongoDB</span>
        <h2>MongoDB Thinks in Documents</h2>
        <p>Forget rigid tables — store data the way your app actually uses it</p>
      </header>

      <div className="mdbdoc-tabs">
        {[['compare', '🆚 Tables vs Documents'], ['terms', '🔤 Terminology'], ['bson', '🧬 BSON Types']].map(([key, label]) => (
          <button key={key} className={`mdbdoc-tab ${tab === key ? 'mdbdoc-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* Compare */}
      {tab === 'compare' && (
        <div className="mdbdoc-compare">
          <div className="mdbdoc-side mdbdoc-side--sql">
            <div className="mdbdoc-side-head">📊 SQL — rigid table</div>
            <div className="mdbdoc-table-wrap">
              <table className="mdbdoc-table">
                <thead><tr>{SQL_TABLE.columns.map(c => <th key={c}>{c}</th>)}</tr></thead>
                <tbody>
                  {SQL_TABLE.rows.map((r, i) => (
                    <tr key={i}>{r.map((c, j) => <td key={j}>{String(c)}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mdbdoc-side-note">Every row must match the exact same columns. Nested data needs extra tables + joins.</p>
          </div>

          <div className="mdbdoc-arrow">➜</div>

          <div className="mdbdoc-side mdbdoc-side--mongo">
            <div className="mdbdoc-side-head">🍃 MongoDB — flexible document</div>
            <pre className="mdbdoc-code"><code>{MONGO_DOC}</code></pre>
            <p className="mdbdoc-side-note">One document holds nested objects &amp; arrays. No joins needed — related data lives together.</p>
          </div>
        </div>
      )}

      {/* Terminology */}
      {tab === 'terms' && (
        <div className="mdbdoc-terms">
          <div className="mdbdoc-term-table">
            <div className="mdbdoc-term-header">
              <span>SQL term</span>
              <span></span>
              <span>MongoDB term</span>
            </div>
            {TERMS.map((t, i) => (
              <button key={t.sql} className={`mdbdoc-term-row ${activeTerm === i ? 'mdbdoc-term-row--on' : ''}`}
                style={{ '--tc': t.color }} onClick={() => setActiveTerm(i)}>
                <span className="mdbdoc-term-sql">{t.sql}</span>
                <span className="mdbdoc-term-eq">→</span>
                <span className="mdbdoc-term-mongo" style={{ color: t.color }}>{t.mongo}</span>
              </button>
            ))}
          </div>
          <div className="mdbdoc-term-detail" style={{ borderColor: TERMS[activeTerm].color }}>
            <span className="mdbdoc-term-detail-icon">💡</span>
            {TERMS[activeTerm].desc}
          </div>
        </div>
      )}

      {/* BSON */}
      {tab === 'bson' && (
        <div className="mdbdoc-bson">
          <p className="mdbdoc-desc">MongoDB stores documents as <strong>BSON</strong> (Binary JSON) — JSON plus extra types like Date and ObjectId.</p>
          <div className="mdbdoc-bson-grid">
            {BSON_TYPES.map(t => (
              <div key={t.type} className="mdbdoc-bson-card" style={{ borderColor: t.color }}>
                <span className="mdbdoc-bson-type" style={{ color: t.color }}>{t.type}</span>
                <code className="mdbdoc-bson-ex">{t.example}</code>
              </div>
            ))}
          </div>
          <div className="mdbdoc-objectid">
            <h3>The special <code>_id</code> field</h3>
            <p>Every document automatically gets a unique <code>_id</code>. If you don't provide one, MongoDB generates an <code>ObjectId</code> — a 12-byte value containing a timestamp, machine id, and counter.</p>
            <pre className="mdbdoc-code"><code>{`ObjectId("65a1f2c8e4b0a1d2c3e4f5a6")\n           └─timestamp┘└─random─┘└counter┘`}</code></pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default MdbDocumentsVisualization;

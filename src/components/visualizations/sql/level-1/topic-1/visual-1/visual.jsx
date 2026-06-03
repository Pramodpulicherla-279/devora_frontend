import React, { useState } from 'react';
import './visual.css';

const SAMPLE_TABLE = {
  name: 'users',
  columns: ['id', 'name', 'email', 'age', 'city'],
  rows: [
    [1, 'Alice', 'alice@x.com', 28, 'Mumbai'],
    [2, 'Bob', 'bob@x.com', 34, 'Delhi'],
    [3, 'Carol', 'carol@x.com', 22, 'Pune'],
    [4, 'Dan', 'dan@x.com', 41, 'Bengaluru'],
  ],
};

const SELECT_QUERY = { highlighted: ['name', 'email'], where: null };

const DB_VS_SHEET = [
  { feature: 'Relationships', db: 'Foreign keys link tables', sheet: 'Manual copy-paste' },
  { feature: 'Querying', db: 'SQL — powerful, fast', sheet: 'VLOOKUP / filters' },
  { feature: 'Scale', db: 'Millions of rows', sheet: 'Slows above ~100k rows' },
  { feature: 'Integrity', db: 'Constraints enforced', sheet: 'Anyone can break rules' },
  { feature: 'Concurrency', db: 'Multiple users safely', sheet: 'Conflicts & overwrites' },
];

const QUERY_ANATOMY = [
  { part: 'SELECT', color: '#4EA5D9', desc: 'Which columns to return' },
  { part: 'FROM', color: '#68A063', desc: 'Which table to read from' },
  { part: 'WHERE', color: '#E5C07B', desc: 'Filter rows by condition' },
  { part: 'ORDER BY', color: '#C678DD', desc: 'Sort the results' },
  { part: 'LIMIT', color: '#E06C75', desc: 'Cap number of rows returned' },
];

const EXAMPLE_QUERY = `SELECT name, email
FROM   users
WHERE  age > 25
ORDER BY name
LIMIT  10;`;

const SqlDbFoundationsVisualization = () => {
  const [activeCol, setActiveCol] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const [activePart, setActivePart] = useState(null);
  const [tab, setTab] = useState('table');

  return (
    <div className="sqldf-wrap">
      <header className="sqldf-head">
        <span className="sqldf-badge">SQL</span>
        <h2>Every App Runs on a Database</h2>
        <p>Tables · Rows · Columns · Your first SELECT</p>
      </header>

      <div className="sqldf-tabs">
        {[['table', '📋 The Table Model'], ['compare', '⚖️ DB vs Spreadsheet'], ['query', '🔍 Query Anatomy']].map(([key, label]) => (
          <button key={key} className={`sqldf-tab ${tab === key ? 'sqldf-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* Table Model */}
      {tab === 'table' && (
        <div className="sqldf-table-panel">
          <p className="sqldf-hint">Click any column header or row to highlight it</p>
          <div className="sqldf-table-name"><code>TABLE: {SAMPLE_TABLE.name}</code></div>
          <div className="sqldf-table-wrap">
            <table className="sqldf-table">
              <thead>
                <tr>
                  {SAMPLE_TABLE.columns.map(col => (
                    <th key={col}
                      className={`sqldf-th ${activeCol === col ? 'sqldf-th--on' : ''}`}
                      onClick={() => setActiveCol(activeCol === col ? null : col)}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SAMPLE_TABLE.rows.map((row, ri) => (
                  <tr key={ri}
                    className={`sqldf-tr ${activeRow === ri ? 'sqldf-tr--on' : ''}`}
                    onClick={() => setActiveRow(activeRow === ri ? null : ri)}>
                    {row.map((cell, ci) => (
                      <td key={ci}
                        className={`sqldf-td ${activeCol === SAMPLE_TABLE.columns[ci] ? 'sqldf-td--col' : ''} ${activeRow === ri ? 'sqldf-td--row' : ''}`}>
                        {String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="sqldf-legend">
            <span className="sqldf-leg sqldf-leg--col">← Column (field/attribute)</span>
            <span className="sqldf-leg sqldf-leg--row">→ Row (record/tuple)</span>
          </div>
          <pre className="sqldf-code"><code>{`-- Read the whole table\nSELECT * FROM users;\n\n-- Read specific columns\nSELECT name, email FROM users;`}</code></pre>
        </div>
      )}

      {/* DB vs Spreadsheet */}
      {tab === 'compare' && (
        <div className="sqldf-compare">
          <table className="sqldf-cmp-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th style={{ color: '#4EA5D9' }}>🗄️ Relational Database</th>
                <th style={{ color: '#68A063' }}>📊 Spreadsheet</th>
              </tr>
            </thead>
            <tbody>
              {DB_VS_SHEET.map(row => (
                <tr key={row.feature}>
                  <td className="sqldf-cmp-label">{row.feature}</td>
                  <td className="sqldf-cmp-db">{row.db}</td>
                  <td className="sqldf-cmp-sheet">{row.sheet}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="sqldf-db-types">
            <h3>Types of Databases</h3>
            <div className="sqldf-db-grid">
              {[['Relational (SQL)', '#4EA5D9', 'PostgreSQL, MySQL, SQLite, MS SQL — structured tables with relationships'],
                ['Document (NoSQL)', '#68A063', 'MongoDB, Firestore — JSON-like documents, flexible schema'],
                ['Key-Value', '#E5C07B', 'Redis, DynamoDB — ultra-fast simple lookups'],
                ['Graph', '#C678DD', 'Neo4j — interconnected nodes and relationships']].map(([name, color, desc]) => (
                <div key={name} className="sqldf-db-card" style={{ borderColor: color }}>
                  <span className="sqldf-db-name" style={{ color }}>{name}</span>
                  <span className="sqldf-db-desc">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Query Anatomy */}
      {tab === 'query' && (
        <div className="sqldf-query-panel">
          <div className="sqldf-anatomy">
            {QUERY_ANATOMY.map((p, i) => (
              <button key={p.part}
                className={`sqldf-part-btn ${activePart === i ? 'sqldf-part-btn--on' : ''}`}
                style={{ '--pc': p.color }} onClick={() => setActivePart(activePart === i ? null : i)}>
                <code>{p.part}</code>
                {activePart === i && <span className="sqldf-part-desc">{p.desc}</span>}
              </button>
            ))}
          </div>
          <pre className="sqldf-code sqldf-code--query"><code>{EXAMPLE_QUERY}</code></pre>
          <div className="sqldf-clause-list">
            {QUERY_ANATOMY.map((p, i) => (
              <div key={p.part} className={`sqldf-clause-row ${activePart === i ? 'sqldf-clause-row--on' : ''}`}
                style={{ borderColor: p.color }} onClick={() => setActivePart(activePart === i ? null : i)}>
                <code style={{ color: p.color }}>{p.part}</code>
                <span>{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SqlDbFoundationsVisualization;

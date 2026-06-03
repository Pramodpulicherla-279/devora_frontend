import React, { useState } from 'react';
import './visual.css';

const JOINS = {
  inner: {
    label: 'INNER JOIN',
    color: '#4EA5D9',
    desc: 'Returns only rows that have a MATCH in BOTH tables. Unmatched rows from either side are excluded.',
    vennLeft: false, vennCenter: true, vennRight: false,
    result: [
      { order_id: 101, product: 'Laptop', user_name: 'Alice' },
      { order_id: 102, product: 'Phone', user_name: 'Bob' },
      { order_id: 103, product: 'Tablet', user_name: 'Alice' },
    ],
    query: `SELECT orders.order_id, orders.product, users.name AS user_name
FROM   orders
INNER JOIN users ON orders.user_id = users.id;`,
  },
  left: {
    label: 'LEFT JOIN',
    color: '#68A063',
    desc: 'Returns ALL rows from the LEFT table, and matched rows from the right. Unmatched right rows become NULL.',
    vennLeft: true, vennCenter: true, vennRight: false,
    result: [
      { order_id: 101, product: 'Laptop', user_name: 'Alice' },
      { order_id: 102, product: 'Phone', user_name: 'Bob' },
      { order_id: 103, product: 'Tablet', user_name: 'Alice' },
      { order_id: 104, product: 'Monitor', user_name: 'NULL' },
    ],
    query: `SELECT orders.order_id, orders.product, users.name AS user_name
FROM   orders
LEFT JOIN users ON orders.user_id = users.id;`,
  },
  right: {
    label: 'RIGHT JOIN',
    color: '#C678DD',
    desc: 'Returns ALL rows from the RIGHT table, and matched rows from the left. Unmatched left rows become NULL.',
    vennLeft: false, vennCenter: true, vennRight: true,
    result: [
      { order_id: 101, product: 'Laptop', user_name: 'Alice' },
      { order_id: 102, product: 'Phone', user_name: 'Bob' },
      { order_id: 103, product: 'Tablet', user_name: 'Alice' },
      { order_id: 'NULL', product: 'NULL', user_name: 'Carol' },
    ],
    query: `SELECT orders.order_id, orders.product, users.name AS user_name
FROM   orders
RIGHT JOIN users ON orders.user_id = users.id;`,
  },
  full: {
    label: 'FULL OUTER JOIN',
    color: '#E5C07B',
    desc: 'Returns ALL rows from BOTH tables. Where there is no match, the missing side is NULL.',
    vennLeft: true, vennCenter: true, vennRight: true,
    result: [
      { order_id: 101, product: 'Laptop', user_name: 'Alice' },
      { order_id: 102, product: 'Phone', user_name: 'Bob' },
      { order_id: 103, product: 'Tablet', user_name: 'Alice' },
      { order_id: 104, product: 'Monitor', user_name: 'NULL' },
      { order_id: 'NULL', product: 'NULL', user_name: 'Carol' },
    ],
    query: `SELECT orders.order_id, orders.product, users.name AS user_name
FROM   orders
FULL OUTER JOIN users ON orders.user_id = users.id;`,
  },
};

const SqlJoinsVisualization = () => {
  const [activeJoin, setActiveJoin] = useState('inner');
  const j = JOINS[activeJoin];

  return (
    <div className="sqljn-wrap">
      <header className="sqljn-head">
        <span className="sqljn-badge">SQL</span>
        <h2>SQL Joins</h2>
        <p>Combine data from multiple tables using relationships</p>
      </header>

      <div className="sqljn-join-tabs">
        {Object.entries(JOINS).map(([key, { label, color }]) => (
          <button key={key} className={`sqljn-join-tab ${activeJoin === key ? 'sqljn-join-tab--on' : ''}`}
            style={{ '--jc': color }} onClick={() => setActiveJoin(key)}>{label}</button>
        ))}
      </div>

      <div className="sqljn-grid">
        {/* Left: Venn + description */}
        <div className="sqljn-panel">
          {/* Venn Diagram */}
          <div className="sqljn-venn">
            <div className={`sqljn-circle sqljn-circle--left ${j.vennLeft ? 'sqljn-circle--lit' : ''}`}>
              <span>orders</span>
            </div>
            <div className={`sqljn-overlap ${j.vennCenter ? 'sqljn-overlap--lit' : ''}`}
              style={{ background: j.vennCenter ? j.color : 'transparent' }} />
            <div className={`sqljn-circle sqljn-circle--right ${j.vennRight ? 'sqljn-circle--lit' : ''}`}>
              <span>users</span>
            </div>
          </div>
          <div className="sqljn-join-name" style={{ color: j.color }}>{j.label}</div>
          <p className="sqljn-desc">{j.desc}</p>

          {/* Source tables */}
          <div className="sqljn-source-tables">
            <div className="sqljn-src-table">
              <div className="sqljn-src-head">orders</div>
              <table><thead><tr><th>order_id</th><th>product</th><th>user_id</th></tr></thead>
                <tbody>
                  {[[101,'Laptop',1],[102,'Phone',2],[103,'Tablet',1],[104,'Monitor',99]].map(([id,p,uid]) => (
                    <tr key={id}><td>{id}</td><td>{p}</td><td className={uid === 99 ? 'sqljn-unmatched' : ''}>{uid}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="sqljn-join-sym" style={{ color: j.color }}>⋈</div>
            <div className="sqljn-src-table">
              <div className="sqljn-src-head">users</div>
              <table><thead><tr><th>id</th><th>name</th></tr></thead>
                <tbody>
                  {[[1,'Alice'],[2,'Bob'],[3,'Carol']].map(([id,name]) => (
                    <tr key={id}><td>{id}</td><td>{name}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Query + Result */}
        <div className="sqljn-panel">
          <h3>Query</h3>
          <pre className="sqljn-code"><code>{j.query}</code></pre>
          <h3>Result</h3>
          <div className="sqljn-result-wrap">
            <table className="sqljn-result">
              <thead><tr><th>order_id</th><th>product</th><th>user_name</th></tr></thead>
              <tbody>
                {j.result.map((r, i) => (
                  <tr key={i} className={String(r.user_name) === 'NULL' || String(r.order_id) === 'NULL' ? 'sqljn-null-row' : ''}>
                    <td className={String(r.order_id) === 'NULL' ? 'sqljn-null' : ''}>{String(r.order_id)}</td>
                    <td className={String(r.product) === 'NULL' ? 'sqljn-null' : ''}>{String(r.product)}</td>
                    <td className={String(r.user_name) === 'NULL' ? 'sqljn-null' : ''}>{String(r.user_name)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="sqljn-tip">
            <strong>ON clause:</strong> specifies which columns link the tables.
            <code>orders.user_id = users.id</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SqlJoinsVisualization;

import React, { useState } from 'react';
import './visual.css';

const ORDERS = [
  { _id: 1, customer: 'Alice', product: 'Laptop', category: 'Tech', amount: 999 },
  { _id: 2, customer: 'Bob', product: 'Desk', category: 'Office', amount: 250 },
  { _id: 3, customer: 'Alice', product: 'Mouse', category: 'Tech', amount: 50 },
  { _id: 4, customer: 'Carol', product: 'Chair', category: 'Office', amount: 180 },
  { _id: 5, customer: 'Bob', product: 'Phone', category: 'Tech', amount: 699 },
];

const STAGES = [
  {
    stage: '$match',
    color: '#00ED64',
    desc: 'Filter documents — like find(). Keep only Tech category orders.',
    code: `{ $match: { category: "Tech" } }`,
    transform: (docs) => docs.filter(d => d.category === 'Tech'),
    render: (docs) => docs.map(d => `${d.customer}: ${d.product} ($${d.amount})`),
  },
  {
    stage: '$group',
    color: '#61AFEF',
    desc: 'Group by customer & sum their amounts — like SQL GROUP BY.',
    code: `{ $group: {\n    _id: "$customer",\n    total: { $sum: "$amount" }\n} }`,
    transform: (docs) => {
      const g = {};
      docs.forEach(d => { g[d.customer] = (g[d.customer] || 0) + d.amount; });
      return Object.entries(g).map(([customer, total]) => ({ customer, total }));
    },
    render: (docs) => docs.map(d => `${d.customer}: total $${d.total}`),
  },
  {
    stage: '$sort',
    color: '#E5C07B',
    desc: 'Sort groups by total, descending (highest spender first).',
    code: `{ $sort: { total: -1 } }`,
    transform: (docs) => [...docs].sort((a, b) => b.total - a.total),
    render: (docs) => docs.map(d => `${d.customer}: total $${d.total}`),
  },
  {
    stage: '$limit',
    color: '#C678DD',
    desc: 'Keep only the top result — the biggest spender.',
    code: `{ $limit: 1 }`,
    transform: (docs) => docs.slice(0, 1),
    render: (docs) => docs.map(d => `🏆 ${d.customer}: $${d.total}`),
  },
];

const MdbAggregationVisualization = () => {
  const [step, setStep] = useState(0);

  // compute progressive results
  let current = ORDERS;
  const results = [ORDERS.map(d => `${d.customer}: ${d.product} ($${d.amount})`)];
  STAGES.forEach(s => { current = s.transform(current); results.push(s.render(current)); });

  const fullPipeline = `db.orders.aggregate([\n${STAGES.map(s => '  ' + s.code.replace(/\n/g, '\n  ')).join(',\n')}\n]);`;

  return (
    <div className="mdbagg-wrap">
      <header className="mdbagg-head">
        <span className="mdbagg-badge">MongoDB</span>
        <h2>The Aggregation Pipeline</h2>
        <p>Documents flow through stages — each transforms the output of the last</p>
      </header>

      {/* Pipeline stages */}
      <div className="mdbagg-pipeline">
        <div className={`mdbagg-stage-node ${step === 0 ? 'mdbagg-stage-node--on' : ''}`} onClick={() => setStep(0)}>
          <span className="mdbagg-stage-icon">📥</span>
          <span className="mdbagg-stage-name">Input</span>
        </div>
        {STAGES.map((s, i) => (
          <React.Fragment key={s.stage}>
            <div className="mdbagg-flow-arrow">→</div>
            <button className={`mdbagg-stage-node ${step === i + 1 ? 'mdbagg-stage-node--on' : ''} ${step > i + 1 ? 'mdbagg-stage-node--done' : ''}`}
              style={{ '--sc': s.color }} onClick={() => setStep(i + 1)}>
              <code className="mdbagg-stage-code">{s.stage}</code>
            </button>
          </React.Fragment>
        ))}
      </div>

      <div className="mdbagg-grid">
        {/* Stage detail */}
        <div className="mdbagg-panel">
          {step === 0 ? (
            <>
              <h3>📥 Input Collection: orders</h3>
              <p className="mdbagg-desc">5 raw order documents enter the pipeline.</p>
            </>
          ) : (
            <>
              <h3 style={{ color: STAGES[step - 1].color }}>Stage {step}: {STAGES[step - 1].stage}</h3>
              <p className="mdbagg-desc">{STAGES[step - 1].desc}</p>
              <pre className="mdbagg-code" style={{ borderColor: STAGES[step - 1].color }}><code>{STAGES[step - 1].code}</code></pre>
            </>
          )}
          <div className="mdbagg-controls">
            <button className="mdbagg-btn" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>← Prev</button>
            <button className="mdbagg-btn mdbagg-btn--next" onClick={() => setStep(s => Math.min(STAGES.length, s + 1))} disabled={step === STAGES.length}>Next stage →</button>
          </div>
        </div>

        {/* Live output */}
        <div className="mdbagg-panel">
          <h3>Output after this stage</h3>
          <div className="mdbagg-output">
            {results[step].map((line, i) => (
              <div key={i} className="mdbagg-output-row" style={{ borderColor: step === 0 ? '#30363d' : STAGES[step - 1].color }}>
                {line}
              </div>
            ))}
          </div>
          <div className="mdbagg-doc-count">{results[step].length} document{results[step].length !== 1 ? 's' : ''}</div>
        </div>
      </div>

      <div className="mdbagg-full">
        <h3>Full pipeline</h3>
        <pre className="mdbagg-code"><code>{fullPipeline}</code></pre>
      </div>
    </div>
  );
};

export default MdbAggregationVisualization;

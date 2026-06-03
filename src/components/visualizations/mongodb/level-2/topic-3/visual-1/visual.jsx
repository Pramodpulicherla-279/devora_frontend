import React, { useState } from 'react';
import './visual.css';

const APPROACHES = {
  embed: {
    label: 'Embedding',
    color: '#00ED64',
    tagline: 'Store related data inside one document',
    code: `// One document holds everything
{
  _id: 1,
  name: "Alice",
  address: {
    city: "Mumbai",
    pin: "400001"
  },
  orders: [
    { product: "Laptop", price: 999 },
    { product: "Mouse",  price: 50 }
  ]
}`,
    pros: ['One query fetches everything', 'Atomic updates on the whole doc', 'Great read performance'],
    cons: ['Document can grow large (16MB limit)', 'Duplicated data if shared', 'Hard if sub-data queried alone'],
    when: 'Use when data is read together & "owned" by the parent (1-to-few).',
  },
  reference: {
    label: 'Referencing',
    color: '#61AFEF',
    tagline: 'Store ids that point to other documents',
    code: `// users collection
{ _id: 1, name: "Alice" }

// orders collection — references user
{
  _id: 101,
  userId: 1,        // ← reference
  product: "Laptop",
  price: 999
}

// Join at query time with $lookup`,
    pros: ['No data duplication', 'Documents stay small', 'Best for 1-to-many / many-to-many'],
    cons: ['Needs $lookup or extra queries', 'No cross-document atomicity', 'More complex reads'],
    when: 'Use when data is large, shared, or queried independently (1-to-many).',
  },
};

const RULES = [
  { rule: 'Data accessed together → embed', icon: '🔗', color: '#00ED64' },
  { rule: 'Data grows unbounded → reference', icon: '📈', color: '#61AFEF' },
  { rule: 'Data shared across docs → reference', icon: '♻️', color: '#E5C07B' },
  { rule: '"Design for your queries, not your data"', icon: '🎯', color: '#C678DD' },
];

const MdbSchemaDesignVisualization = () => {
  const [approach, setApproach] = useState('embed');
  const a = APPROACHES[approach];

  return (
    <div className="mdbsd-wrap">
      <header className="mdbsd-head">
        <span className="mdbsd-badge">MongoDB</span>
        <h2>Schema Design</h2>
        <p>Embed or reference? The decision that defines your app's performance</p>
      </header>

      <div className="mdbsd-approach-tabs">
        {Object.entries(APPROACHES).map(([key, ap]) => (
          <button key={key} className={`mdbsd-approach-tab ${approach === key ? 'mdbsd-approach-tab--on' : ''}`}
            style={{ '--ac': ap.color }} onClick={() => setApproach(key)}>
            {ap.label}
          </button>
        ))}
      </div>

      <div className="mdbsd-grid">
        <div className="mdbsd-panel">
          <div className="mdbsd-tagline" style={{ color: a.color }}>"{a.tagline}"</div>
          <pre className="mdbsd-code" style={{ borderColor: a.color }}><code>{a.code}</code></pre>
        </div>
        <div className="mdbsd-panel">
          <div className="mdbsd-proscons">
            <div className="mdbsd-pros">
              <h3>✓ Pros</h3>
              {a.pros.map(p => <div key={p} className="mdbsd-pro-row">{p}</div>)}
            </div>
            <div className="mdbsd-cons">
              <h3>✗ Cons</h3>
              {a.cons.map(c => <div key={c} className="mdbsd-con-row">{c}</div>)}
            </div>
          </div>
          <div className="mdbsd-when" style={{ borderColor: a.color }}>
            <strong style={{ color: a.color }}>When to use:</strong> {a.when}
          </div>
        </div>
      </div>

      <div className="mdbsd-rules">
        <h3>Rules of thumb</h3>
        <div className="mdbsd-rules-grid">
          {RULES.map(r => (
            <div key={r.rule} className="mdbsd-rule-card" style={{ borderColor: r.color }}>
              <span className="mdbsd-rule-icon">{r.icon}</span>
              <span className="mdbsd-rule-text">{r.rule}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MdbSchemaDesignVisualization;

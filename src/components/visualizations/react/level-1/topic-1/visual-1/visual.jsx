import React, { useState } from 'react';
import './visual.css';

const COMPONENT_TREE = {
  name: 'App',
  color: '#61DAFB',
  children: [
    {
      name: 'Navbar',
      color: '#68A063',
      children: [{ name: 'Logo', color: '#E5C07B', children: [] }, { name: 'NavLinks', color: '#E5C07B', children: [] }],
    },
    {
      name: 'Main',
      color: '#C678DD',
      children: [
        { name: 'ProductCard', color: '#E06C75', children: [{ name: 'Image', color: '#7d8590', children: [] }, { name: 'Price', color: '#7d8590', children: [] }] },
        { name: 'ProductCard', color: '#E06C75', children: [{ name: 'Image', color: '#7d8590', children: [] }, { name: 'Price', color: '#7d8590', children: [] }] },
        { name: 'ProductCard', color: '#E06C75', children: [{ name: 'Image', color: '#7d8590', children: [] }, { name: 'Price', color: '#7d8590', children: [] }] },
      ],
    },
    { name: 'Footer', color: '#56B6C2', children: [] },
  ],
};

const ANATOMY_PARTS = [
  { part: 'function', color: '#C678DD', desc: 'Keyword — all React components are functions (PascalCase name)' },
  { part: 'ProductCard', color: '#61DAFB', desc: 'Component name — must start with a capital letter' },
  { part: '({ title, price })', color: '#E5C07B', desc: 'Props — data passed IN from the parent component' },
  { part: 'return', color: '#C678DD', desc: 'Every component must return JSX (what to display)' },
  { part: '<div className="card">', color: '#98C379', desc: 'JSX — looks like HTML but is JavaScript. Use className not class' },
  { part: '{title}, {price}', color: '#E5C07B', desc: 'Expressions — curly braces inject JS values into JSX' },
];

const REUSE_CODE = `// Define ONCE
function ProductCard({ title, price, image }) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>${'{price}'}</p>
    </div>
  );
}

// Reuse ANYWHERE with different data
<ProductCard title="Laptop" price={999} image="/laptop.jpg" />
<ProductCard title="Phone"  price={599} image="/phone.jpg" />
<ProductCard title="Watch"  price={199} image="/watch.jpg" />`;

function TreeNode({ node, depth = 0, onSelect, selected }) {
  return (
    <div className="rctcp-tree-node">
      <button
        className={`rctcp-node-btn ${selected === node.name + depth ? 'rctcp-node-btn--on' : ''}`}
        style={{ '--nc': node.color, marginLeft: `${depth * 16}px` }}
        onClick={() => onSelect(node.name + depth)}
      >
        <span className="rctcp-node-tag">{'<'}{node.name}{' />'}</span>
      </button>
      {node.children.map((child, i) => (
        <TreeNode key={`${child.name}-${i}`} node={child} depth={depth + 1} onSelect={onSelect} selected={selected} />
      ))}
    </div>
  );
}

const RctComponentsVisualization = () => {
  const [tab, setTab] = useState('tree');
  const [selected, setSelected] = useState(null);
  const [activePart, setActivePart] = useState(null);

  return (
    <div className="rctcp-wrap">
      <header className="rctcp-head">
        <span className="rctcp-badge">React</span>
        <h2>Meet React Components</h2>
        <p>Build UIs from small, reusable pieces — components all the way down</p>
      </header>

      <div className="rctcp-tabs">
        {[['tree', '🌳 Component Tree'], ['anatomy', '🔬 JSX Anatomy'], ['reuse', '♻️ Reusability']].map(([key, label]) => (
          <button key={key} className={`rctcp-tab ${tab === key ? 'rctcp-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* Component Tree */}
      {tab === 'tree' && (
        <div className="rctcp-tree-panel">
          <p className="rctcp-hint">Click any component to highlight it. Notice how <code>ProductCard</code> is reused 3×</p>
          <div className="rctcp-tree-grid">
            <div className="rctcp-tree">
              <TreeNode node={COMPONENT_TREE} onSelect={setSelected} selected={selected} />
            </div>
            <div className="rctcp-tree-note">
              <div className="rctcp-tree-rule">
                <span className="rctcp-rule-icon">🧱</span>
                <div>
                  <strong>Every component is a function</strong>
                  <p>It takes props (data in) and returns JSX (UI out).</p>
                </div>
              </div>
              <div className="rctcp-tree-rule">
                <span className="rctcp-rule-icon">♻️</span>
                <div>
                  <strong>Components are reusable</strong>
                  <p>Write once, render with different data as many times as needed.</p>
                </div>
              </div>
              <div className="rctcp-tree-rule">
                <span className="rctcp-rule-icon">🔠</span>
                <div>
                  <strong>PascalCase naming</strong>
                  <p>React uses the capital letter to tell components from HTML tags.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Anatomy */}
      {tab === 'anatomy' && (
        <div className="rctcp-anatomy">
          <p className="rctcp-hint">Click any highlighted part to learn what it does</p>
          <div className="rctcp-anatomy-grid">
            <div className="rctcp-parts">
              {ANATOMY_PARTS.map((p, i) => (
                <button key={p.part} className={`rctcp-part-btn ${activePart === i ? 'rctcp-part-btn--on' : ''}`}
                  style={{ '--pc': p.color }} onClick={() => setActivePart(activePart === i ? null : i)}>
                  <code>{p.part}</code>
                  {activePart === i && <span className="rctcp-part-desc">{p.desc}</span>}
                </button>
              ))}
            </div>
            <pre className="rctcp-code"><code>{`function ProductCard({ title, price }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{price}</p>
    </div>
  );
}`}</code></pre>
          </div>
        </div>
      )}

      {/* Reuse */}
      {tab === 'reuse' && (
        <div className="rctcp-reuse">
          <div className="rctcp-reuse-compare">
            <div className="rctcp-bad-way">
              <div className="rctcp-way-label rctcp-way-label--bad">❌ Without components — copy-paste nightmare</div>
              <pre className="rctcp-code"><code>{`<div class="card">
  <img src="/laptop.jpg" />
  <h2>Laptop</h2>
  <p>$999</p>
</div>
<div class="card">         {/* same again */}
  <img src="/phone.jpg" />
  <h2>Phone</h2>           {/* change 1 thing = */}
  <p>$599</p>              {/* update ALL copies */}
</div>`}</code></pre>
            </div>
            <div className="rctcp-good-way">
              <div className="rctcp-way-label rctcp-way-label--good">✓ With components — define once, reuse forever</div>
              <pre className="rctcp-code"><code>{REUSE_CODE}</code></pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RctComponentsVisualization;

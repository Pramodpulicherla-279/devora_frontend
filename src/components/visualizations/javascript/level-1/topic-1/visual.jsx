import React, { useState } from 'react';
import './visual.css';

const DATA_TYPES = [
  { id: 'string', icon: '"..."', label: 'String', color: '#98C379', example: 'let name = "Alice";', desc: 'Text wrapped in quotes. Use single (\'), double ("), or backtick (`) quotes.', samples: ['"Hello"', '"123"', '`Hi ${name}`'] },
  { id: 'number', icon: '42', label: 'Number', color: '#E5C07B', example: 'let age = 25;', desc: 'Integers and decimals. JS has one type for both whole and floating-point numbers.', samples: ['42', '3.14', '-7', 'Infinity'] },
  { id: 'boolean', icon: 'T/F', label: 'Boolean', color: '#56B6C2', example: 'let isActive = true;', desc: 'Only two values: true or false. Drives every if/else decision in your code.', samples: ['true', 'false'] },
  { id: 'null', icon: '∅', label: 'Null', color: '#E06C75', example: 'let data = null;', desc: 'Intentionally empty. You set this manually to say "no value here".', samples: ['null'] },
  { id: 'undefined', icon: '?', label: 'Undefined', color: '#ABB2BF', example: 'let x; // auto undefined', desc: 'Variable declared but not yet assigned. JS fills this in automatically.', samples: ['undefined'] },
  { id: 'object', icon: '{}', label: 'Object', color: '#C678DD', example: 'let user = { name: "Ali" };', desc: 'Key-value pairs. Groups related data together under one name.', samples: ['{ name: "Ali" }', '{ age: 25, active: true }'] },
  { id: 'array', icon: '[]', label: 'Array', color: '#61AFEF', example: 'let nums = [1, 2, 3];', desc: 'Ordered list. Access items by index starting at 0.', samples: ['[1, 2, 3]', '["a", "b", "c"]'] },
];

const KEYWORDS = [
  { kw: 'var', scope: 'Function', reassign: true, redeclare: true, hoisted: true, color: '#E06C75', tip: 'Old way. Avoid in modern JS — it has confusing scoping rules.' },
  { kw: 'let', scope: 'Block', reassign: true, redeclare: false, hoisted: false, color: '#61AFEF', tip: 'Use for values that will change (counters, state, etc.).' },
  { kw: 'const', scope: 'Block', reassign: false, redeclare: false, hoisted: false, color: '#98C379', tip: 'Default choice. Use unless you know the value will change.' },
];

const JsVariablesDatatypesVisualization = () => {
  const [active, setActive] = useState(DATA_TYPES[0]);
  const [kwHover, setKwHover] = useState(null);

  const typeofLabel = active.id === 'array' ? 'object' : active.id;

  return (
    <div className="jsvd-wrap">
      <header className="jsvd-head">
        <span className="jsvd-js-badge">JS</span>
        <h2>Variables &amp; Data Types</h2>
        <p>Click a type to explore it</p>
      </header>

      <div className="jsvd-body">
        {/* ─── Type Grid ─── */}
        <div className="jsvd-type-grid">
          {DATA_TYPES.map((t) => (
            <button
              key={t.id}
              className={`jsvd-type-btn ${active.id === t.id ? 'jsvd-type-btn--on' : ''}`}
              style={{ '--tc': t.color }}
              onClick={() => setActive(t)}
            >
              <span className="jsvd-ticon">{t.icon}</span>
              <span className="jsvd-tlabel">{t.label}</span>
            </button>
          ))}
        </div>

        {/* ─── Detail Panel ─── */}
        <div className="jsvd-detail" style={{ '--tc': active.color }}>
          <div className="jsvd-dtop">
            <span className="jsvd-dbadge" style={{ background: active.color }}>{active.label}</span>
            <code className="jsvd-typeof">typeof → "{typeofLabel}"</code>
          </div>
          <p className="jsvd-desc">{active.desc}</p>
          <pre className="jsvd-code"><code>{active.example}</code></pre>
          <div className="jsvd-samples">
            {active.samples.map((s) => (
              <span key={s} className="jsvd-chip">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── let / const / var ─── */}
      <section className="jsvd-kw-section">
        <h3>let vs const vs var</h3>
        <div className="jsvd-kw-grid">
          {KEYWORDS.map((k) => (
            <div
              key={k.kw}
              className={`jsvd-kw-card ${kwHover === k.kw ? 'jsvd-kw-card--hover' : ''}`}
              style={{ '--kc': k.color }}
              onMouseEnter={() => setKwHover(k.kw)}
              onMouseLeave={() => setKwHover(null)}
            >
              <div className="jsvd-kwname">{k.kw}</div>
              <ul className="jsvd-kwrows">
                <li><span>Scope</span><span className="jsvd-kwval">{k.scope}</span></li>
                <li><span>Reassignable</span><span className={k.reassign ? 'jsvd-yes' : 'jsvd-no'}>{k.reassign ? 'Yes' : 'No'}</span></li>
                <li><span>Redeclarable</span><span className={k.redeclare ? 'jsvd-yes' : 'jsvd-no'}>{k.redeclare ? 'Yes' : 'No'}</span></li>
                <li><span>Hoisted</span><span className={k.hoisted ? 'jsvd-yes' : 'jsvd-no'}>{k.hoisted ? 'Yes' : 'No'}</span></li>
              </ul>
              {kwHover === k.kw && <p className="jsvd-kwtip">{k.tip}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default JsVariablesDatatypesVisualization;

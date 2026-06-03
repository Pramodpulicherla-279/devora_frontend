import React, { useState } from 'react';
import './visual.css';

const ARCH_LAYERS = [
  { label: 'Your Application Code', color: '#68A063', icon: '📝', desc: 'Your JS files — routes, logic, modules.' },
  { label: 'Node.js Runtime', color: '#5DA0A0', icon: '⚙️', desc: 'V8 engine runs JS. libuv handles async I/O using the event loop.' },
  { label: 'Operating System', color: '#444', icon: '🖥️', desc: 'File system, network sockets, timers — all managed here.' },
];

const EVENT_LOOP_PHASES = [
  { phase: 'timers', desc: 'Runs callbacks from setTimeout / setInterval', color: '#E5C07B' },
  { phase: 'I/O callbacks', desc: 'Handles most async I/O completions (file, network)', color: '#61AFEF' },
  { phase: 'poll', desc: 'Retrieves new I/O events, blocking if queue is empty', color: '#68A063' },
  { phase: 'check', desc: 'setImmediate() callbacks run here', color: '#C678DD' },
  { phase: 'close', desc: 'Cleanup callbacks (socket.destroy, etc.)', color: '#E06C75' },
];

const MODULE_COMPARE = {
  commonjs: {
    label: 'CommonJS (CJS)',
    color: '#68A063',
    badge: 'require / module.exports',
    examples: [
      `// math.js\nconst add = (a, b) => a + b;\nmodule.exports = { add };`,
      `// app.js\nconst { add } = require('./math');\nconsole.log(add(2, 3)); // 5`,
    ],
    notes: ['Default in Node.js (no config needed)', 'Synchronous loading', 'Works in all Node versions'],
  },
  esmodule: {
    label: 'ES Modules (ESM)',
    color: '#61AFEF',
    badge: 'import / export',
    examples: [
      `// math.js\nexport const add = (a, b) => a + b;`,
      `// app.js\nimport { add } from './math.js';\nconsole.log(add(2, 3)); // 5`,
    ],
    notes: ['Requires "type":"module" in package.json', 'Asynchronous — tree-shakeable', 'Modern standard (frontend + backend)'],
  },
};

const NPM_STEPS = [
  { cmd: 'npm init -y', desc: 'Create package.json with defaults', icon: '📄' },
  { cmd: 'npm install express', desc: 'Install a package (saved to dependencies)', icon: '⬇️' },
  { cmd: 'npm install nodemon --save-dev', desc: 'Install dev-only dependency', icon: '🛠️' },
  { cmd: 'npm run start', desc: 'Run a script defined in package.json', icon: '▶️' },
  { cmd: 'npm update', desc: 'Update all packages to latest compatible versions', icon: '🔄' },
];

const BkndNodeIntroVisualization = () => {
  const [activeLayer, setActiveLayer] = useState(null);
  const [activePhase, setActivePhase] = useState(0);
  const [moduleTab, setModuleTab] = useState('commonjs');
  const [exampleIdx, setExampleIdx] = useState(0);

  return (
    <div className="bnni-wrap">
      <header className="bnni-head">
        <span className="bnni-badge">Node.js</span>
        <h2>Introduction to Node.js</h2>
        <p>Runtime · Event Loop · Modules · NPM</p>
      </header>

      {/* ── Architecture ── */}
      <section className="bnni-section">
        <h3>Node.js Architecture</h3>
        <div className="bnni-arch">
          {ARCH_LAYERS.map((l, i) => (
            <div
              key={i}
              className={`bnni-layer ${activeLayer === i ? 'bnni-layer--on' : ''}`}
              style={{ '--lc': l.color }}
              onClick={() => setActiveLayer(activeLayer === i ? null : i)}
            >
              <span className="bnni-layer-icon">{l.icon}</span>
              <span className="bnni-layer-label">{l.label}</span>
              {activeLayer === i && <p className="bnni-layer-desc">{l.desc}</p>}
            </div>
          ))}
          <div className="bnni-arch-note">Single-threaded + non-blocking = handles thousands of requests without extra threads</div>
        </div>
      </section>

      {/* ── Event Loop ── */}
      <section className="bnni-section">
        <h3>The Event Loop</h3>
        <div className="bnni-loop-grid">
          <div className="bnni-loop-diagram">
            {EVENT_LOOP_PHASES.map((p, i) => (
              <button
                key={p.phase}
                className={`bnni-phase ${activePhase === i ? 'bnni-phase--on' : ''}`}
                style={{ '--pc': p.color }}
                onClick={() => setActivePhase(i)}
              >
                {p.phase}
              </button>
            ))}
            <div className="bnni-loop-arrow">↻</div>
          </div>
          <div className="bnni-phase-detail" style={{ borderColor: EVENT_LOOP_PHASES[activePhase].color }}>
            <span className="bnni-phase-name" style={{ color: EVENT_LOOP_PHASES[activePhase].color }}>
              {EVENT_LOOP_PHASES[activePhase].phase}
            </span>
            <p>{EVENT_LOOP_PHASES[activePhase].desc}</p>
            <pre className="bnni-code"><code>{`// Example\nsetTimeout(() => console.log('timers phase'), 0);\nsetImmediate(() => console.log('check phase'));`}</code></pre>
          </div>
        </div>
      </section>

      {/* ── Modules ── */}
      <section className="bnni-section">
        <h3>CommonJS vs ES Modules</h3>
        <div className="bnni-module-tabs">
          {Object.entries(MODULE_COMPARE).map(([key, { label, color }]) => (
            <button key={key} className={`bnni-mod-tab ${moduleTab === key ? 'bnni-mod-tab--on' : ''}`}
              style={{ '--mc': color }} onClick={() => { setModuleTab(key); setExampleIdx(0); }}>
              {label}
            </button>
          ))}
        </div>
        <div className="bnni-module-body" style={{ borderColor: MODULE_COMPARE[moduleTab].color }}>
          <span className="bnni-mod-badge" style={{ background: MODULE_COMPARE[moduleTab].color }}>
            {MODULE_COMPARE[moduleTab].badge}
          </span>
          <div className="bnni-mod-examples">
            {MODULE_COMPARE[moduleTab].examples.map((ex, i) => (
              <button key={i} className={`bnni-ex-tab ${exampleIdx === i ? 'bnni-ex-tab--on' : ''}`}
                onClick={() => setExampleIdx(i)}>File {i + 1}</button>
            ))}
          </div>
          <pre className="bnni-code"><code>{MODULE_COMPARE[moduleTab].examples[exampleIdx]}</code></pre>
          <ul className="bnni-mod-notes">
            {MODULE_COMPARE[moduleTab].notes.map(n => <li key={n}>{n}</li>)}
          </ul>
        </div>
      </section>

      {/* ── NPM ── */}
      <section className="bnni-section">
        <h3>NPM — Node Package Manager</h3>
        <div className="bnni-npm-list">
          {NPM_STEPS.map(s => (
            <div key={s.cmd} className="bnni-npm-row">
              <span className="bnni-npm-icon">{s.icon}</span>
              <code className="bnni-npm-cmd">{s.cmd}</code>
              <span className="bnni-npm-desc">{s.desc}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BkndNodeIntroVisualization;

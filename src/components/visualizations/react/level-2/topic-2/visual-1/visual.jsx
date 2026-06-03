import React, { useState, useRef, useMemo, useCallback } from 'react';
import './visual.css';

const HOOKS = {
  useRef: {
    label: 'useRef',
    color: '#61DAFB',
    icon: '🔖',
    tagline: 'Access DOM elements and persist values without re-rendering',
    uses: ['Access DOM elements directly (focus, scroll, measure)', 'Persist a value across renders WITHOUT causing re-render', 'Store previous state values', 'Hold mutable values like timers and intervals'],
    notFor: "Storing values that should trigger UI updates — use useState for that",
    code: `// 1. DOM access
const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus(); // direct DOM access

// 2. Persist without re-render
const renderCount = useRef(0);
renderCount.current++; // no re-render
console.log(renderCount.current);`,
  },
  useMemo: {
    label: 'useMemo',
    color: '#E5C07B',
    icon: '💾',
    tagline: 'Cache expensive calculation results — recalculate only when deps change',
    uses: ['Expensive calculations (sorting, filtering large arrays)', 'Computed values derived from props/state', 'Prevent recalculation on every render', 'Reference stability for objects passed as props'],
    notFor: "Every value — useMemo has a cost. Only use when profiling shows a bottleneck.",
    code: `const filteredItems = useMemo(() => {
  // Only recomputes when items or query changes
  return items
    .filter(item => item.name.includes(query))
    .sort((a, b) => a.price - b.price);
}, [items, query]); // ← dependency array`,
  },
  useCallback: {
    label: 'useCallback',
    color: '#C678DD',
    icon: '📌',
    tagline: 'Cache a function reference — prevent child re-renders caused by new function instances',
    uses: ['Functions passed as props to memoized children', 'Event handlers in useEffect dependency arrays', 'Stable function references for React.memo to work', 'Functions passed to hooks with dep arrays'],
    notFor: "Every function — only when the function is causing unnecessary child re-renders.",
    code: `// Without useCallback: new fn every render
const handleClick = () => doSomething(id);

// With useCallback: same fn reference
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]); // only recreates when id changes

// Child won't re-render if fn reference is stable
<Child onClick={handleClick} />`,
  },
};

const RctUseRefMemoVisualization = () => {
  const [activeHook, setActiveHook] = useState('useRef');
  const [refDemo, setRefDemo] = useState('');
  const [renderCount, setRenderCount] = useState(0);
  const [items] = useState(() => Array.from({ length: 1000 }, (_, i) => ({ id: i, name: `Item ${i}`, price: Math.round(Math.random() * 100) })));
  const [query, setQuery] = useState('');
  const [callbackCount, setCallbackCount] = useState(0);
  const inputRef = useRef(null);
  const renderRef = useRef(0);

  const h = HOOKS[activeHook];

  const expensiveResult = useMemo(() => {
    const filtered = items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    return { count: filtered.length, total: filtered.reduce((s, i) => s + i.price, 0) };
  }, [items, query]);

  const stableCallback = useCallback(() => {
    setCallbackCount(c => c + 1);
  }, []);

  return (
    <div className="rctrm-wrap">
      <header className="rctrm-head">
        <span className="rctrm-badge">React</span>
        <h2>useRef · useMemo · useCallback</h2>
        <p>Three hooks for DOM access, memoization, and performance</p>
      </header>

      <div className="rctrm-hook-tabs">
        {Object.entries(HOOKS).map(([key, { label, color, icon }]) => (
          <button key={key} className={`rctrm-hook-tab ${activeHook === key ? 'rctrm-hook-tab--on' : ''}`}
            style={{ '--hc': color }} onClick={() => setActiveHook(key)}>
            <span>{icon}</span><span>{label}</span>
          </button>
        ))}
      </div>

      <div className="rctrm-grid">
        {/* Description */}
        <div className="rctrm-panel">
          <div className="rctrm-hook-badge" style={{ background: h.color }}>
            {h.icon} {h.label}
          </div>
          <p className="rctrm-tagline">"{h.tagline}"</p>
          <h3>Use it when:</h3>
          <ul className="rctrm-use-list">
            {h.uses.map((u, i) => <li key={i}>{u}</li>)}
          </ul>
          <div className="rctrm-not-for">
            <strong>⚠️ Not for:</strong> {h.notFor}
          </div>
          <pre className="rctrm-code"><code>{h.code}</code></pre>
        </div>

        {/* Live Demo */}
        <div className="rctrm-panel">
          <h3>Live Demo</h3>
          {activeHook === 'useRef' && (
            <div className="rctrm-demo">
              <p className="rctrm-demo-desc">Click "Focus" to focus the input using a ref — no state involved.</p>
              <div className="rctrm-demo-row">
                <input ref={inputRef} className="rctrm-input" placeholder="I'll be focused by ref" value={refDemo}
                  onChange={e => setRefDemo(e.target.value)} />
                <button className="rctrm-demo-btn" onClick={() => inputRef.current?.focus()}>
                  Focus via ref
                </button>
              </div>
              <div className="rctrm-info-box">
                <strong>Render count (via useRef):</strong>
                <span className="rctrm-render-num">{renderRef.current}</span>
                <span className="rctrm-info-note">The ref value updates without triggering a re-render.</span>
              </div>
              <button className="rctrm-demo-btn" onClick={() => { renderRef.current++; setRenderCount(c => c + 1); }}>
                Trigger re-render ({renderCount}) — check ref
              </button>
            </div>
          )}

          {activeHook === 'useMemo' && (
            <div className="rctrm-demo">
              <p className="rctrm-demo-desc">Filter 1,000 items. Without useMemo, this runs on every render.</p>
              <input className="rctrm-input" placeholder="Filter items…" value={query} onChange={e => setQuery(e.target.value)} />
              <div className="rctrm-memo-result">
                <div className="rctrm-memo-stat">
                  <span>Matching items</span>
                  <strong style={{ color: '#E5C07B' }}>{expensiveResult.count}</strong>
                </div>
                <div className="rctrm-memo-stat">
                  <span>Total price</span>
                  <strong style={{ color: '#68A063' }}>${expensiveResult.total}</strong>
                </div>
              </div>
              <div className="rctrm-info-box">Recomputed only when <code>query</code> changes, not on every render.</div>
            </div>
          )}

          {activeHook === 'useCallback' && (
            <div className="rctrm-demo">
              <p className="rctrm-demo-desc">The callback is memoized — same function reference every render unless deps change.</p>
              <button className="rctrm-demo-btn" onClick={stableCallback}>
                Call stable function
              </button>
              <div className="rctrm-info-box">
                <strong>Times called:</strong> <span style={{ color: '#C678DD', fontSize: '1.1rem', fontWeight: 700 }}>{callbackCount}</span>
              </div>
              <pre className="rctrm-code"><code>{`// React.memo child only re-renders
// when props actually change.
// useCallback ensures onClick prop
// has the same reference each render.

const Child = React.memo(({ onClick }) => (
  <button onClick={onClick}>Click</button>
));`}</code></pre>
            </div>
          )}
        </div>
      </div>

      <div className="rctrm-comparison">
        <h3>When to use each</h3>
        <div className="rctrm-cmp-grid">
          {[
            { hook: 'useRef', q: 'Need DOM access or mutable value?', color: '#61DAFB' },
            { hook: 'useMemo', q: 'Expensive calculation on each render?', color: '#E5C07B' },
            { hook: 'useCallback', q: 'Function passed to memoized child?', color: '#C678DD' },
          ].map(c => (
            <div key={c.hook} className="rctrm-cmp-card" style={{ borderColor: c.color }}>
              <code style={{ color: c.color }}>{c.hook}</code>
              <p>{c.q}</p>
            </div>
          ))}
        </div>
        <p className="rctrm-perf-tip">💡 Don't over-optimize! Add these only when you have a <em>measured</em> performance problem.</p>
      </div>
    </div>
  );
};

export default RctUseRefMemoVisualization;

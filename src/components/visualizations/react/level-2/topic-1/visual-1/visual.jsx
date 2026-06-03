import React, { useState, useEffect, useRef } from 'react';
import './visual.css';

const LIFECYCLE_PHASES = [
  { phase: 'Mount', color: '#68A063', icon: '🌱', desc: 'Component added to DOM. useEffect with [] runs once here.', code: `useEffect(() => {\n  // Runs ONCE after mount\n  fetchData();\n  document.title = 'Page loaded';\n}, []); // empty = run on mount only` },
  { phase: 'Update', color: '#61DAFB', icon: '🔄', desc: 'State or props changed. useEffect with deps re-runs when listed deps change.', code: `useEffect(() => {\n  // Runs when userId changes\n  fetchUser(userId);\n}, [userId]); // dep array` },
  { phase: 'Unmount', color: '#E06C75', icon: '🍂', desc: 'Component removed from DOM. Return cleanup function to prevent memory leaks.', code: `useEffect(() => {\n  const timer = setInterval(tick, 1000);\n\n  return () => {\n    clearInterval(timer); // cleanup!\n  };\n}, []);` },
];

const USE_STATE_RULES = [
  'State updates are ASYNC — never read state right after setting it',
  'Pass a function to setter when new state depends on old state: setCount(c => c + 1)',
  'Objects/arrays: create a NEW copy — never mutate in place',
  'Each useState call creates independent state — useState is called per value',
];

const RctUseStateEffectVisualization = () => {
  const [tab, setTab] = useState('usestate');
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);
  const [phase, setPhase] = useState(0);
  const [fetchStatus, setFetchStatus] = useState('idle');
  const [fetchData, setFetchData] = useState(null);
  const [query, setQuery] = useState('react');
  const timerRef = useRef(null);
  const [timerCount, setTimerCount] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // Demo: timer with cleanup
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => setTimerCount(c => c + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);

  const updateCount = (val) => {
    setCount(val);
    setHistory(prev => [...prev.slice(-6), val]);
  };

  const simulateFetch = () => {
    setFetchStatus('loading');
    setFetchData(null);
    setTimeout(() => {
      setFetchStatus('success');
      setFetchData({ id: 1, title: `${query} result`, views: Math.floor(Math.random() * 9000) + 1000 });
    }, 1200);
  };

  return (
    <div className="rctse-wrap">
      <header className="rctse-head">
        <span className="rctse-badge">React</span>
        <h2>useState &amp; useEffect</h2>
        <p>The two hooks that power almost every React component</p>
      </header>

      <div className="rctse-tabs">
        {[['usestate', '🔄 useState'], ['useeffect', '⚡ useEffect'], ['lifecycle', '🌿 Lifecycle']].map(([key, label]) => (
          <button key={key} className={`rctse-tab ${tab === key ? 'rctse-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* useState */}
      {tab === 'usestate' && (
        <div className="rctse-usestate">
          <div className="rctse-grid">
            <div className="rctse-panel">
              <h3>useState anatomy</h3>
              <pre className="rctse-code"><code>{`const [count, setCount] = useState(0);
//     ↑ value  ↑ setter       ↑ initial

// Update state:
setCount(5);            // set directly
setCount(c => c + 1);  // use previous value`}</code></pre>
              <div className="rctse-state-demo">
                <div className="rctse-counter-display">{count}</div>
                <div className="rctse-counter-btns">
                  <button className="rctse-btn rctse-btn--dec" onClick={() => updateCount(count - 1)}>−1</button>
                  <button className="rctse-btn rctse-btn--reset" onClick={() => { updateCount(0); }}>Reset</button>
                  <button className="rctse-btn rctse-btn--inc" onClick={() => updateCount(count + 1)}>+1</button>
                </div>
                <div className="rctse-history">
                  <span className="rctse-history-label">History:</span>
                  {history.map((v, i) => <span key={i} className="rctse-history-chip">{v}</span>)}
                </div>
              </div>
            </div>
            <div className="rctse-panel">
              <h3>Rules of useState</h3>
              <ul className="rctse-rules">
                {USE_STATE_RULES.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
              <pre className="rctse-code"><code>{`// ❌ Mutating state directly — broken!
state.count = 5; // won't re-render!

// ✓ Always use the setter
setCount(5);

// ❌ Reading right after set — stale!
setCount(10);
console.log(count); // still old value

// ✓ Use the setter's callback form
setCount(prev => {
  console.log(prev); // guaranteed current
  return prev + 1;
});`}</code></pre>
            </div>
          </div>
        </div>
      )}

      {/* useEffect */}
      {tab === 'useeffect' && (
        <div className="rctse-useeffect">
          <div className="rctse-grid">
            <div className="rctse-panel">
              <h3>Dependency Array Patterns</h3>
              {[
                { deps: 'No array', color: '#E06C75', when: 'Every render', code: `useEffect(() => {\n  document.title = count;\n}); // ← no array` },
                { deps: 'Empty []', color: '#68A063', when: 'Mount only (once)', code: `useEffect(() => {\n  fetchInitialData();\n}, []); // ← empty` },
                { deps: '[dep1, dep2]', color: '#61DAFB', when: 'When deps change', code: `useEffect(() => {\n  fetchUser(userId);\n}, [userId]); // ← with deps` },
              ].map(p => (
                <div key={p.deps} className="rctse-dep-row" style={{ borderColor: p.color }}>
                  <div className="rctse-dep-header">
                    <code style={{ color: p.color }}>{p.deps}</code>
                    <span className="rctse-dep-when">Runs: {p.when}</span>
                  </div>
                  <pre className="rctse-code"><code>{p.code}</code></pre>
                </div>
              ))}
            </div>
            <div className="rctse-panel">
              <h3>Fetch data with useEffect</h3>
              <div className="rctse-fetch-demo">
                <label>Search query: <input className="rctse-input" value={query} onChange={e => setQuery(e.target.value)} /></label>
                <button className="rctse-fetch-btn" onClick={simulateFetch} disabled={fetchStatus === 'loading'}>
                  {fetchStatus === 'loading' ? '⏳ Fetching…' : 'Run fetch()'}
                </button>
                {fetchStatus === 'success' && fetchData && (
                  <div className="rctse-fetch-result">
                    <code>{`{ id: ${fetchData.id}, title: "${fetchData.title}", views: ${fetchData.views} }`}</code>
                  </div>
                )}
              </div>
              <pre className="rctse-code"><code>{`useEffect(() => {\n  let cancelled = false;\n  fetch(\`/api?q=\${query}\`)\n    .then(r => r.json())\n    .then(data => {\n      if (!cancelled) setData(data);\n    });\n  return () => { cancelled = true; };\n}, [query]);`}</code></pre>

              <h3 style={{ marginTop: '14px' }}>Timer with cleanup</h3>
              <div className="rctse-timer-demo">
                <div className="rctse-timer-display">{timerCount}s</div>
                <button className="rctse-fetch-btn" onClick={() => setTimerRunning(r => !r)}>
                  {timerRunning ? '⏸ Pause' : '▶ Start'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lifecycle */}
      {tab === 'lifecycle' && (
        <div className="rctse-lifecycle">
          <p className="rctse-desc">useEffect replaces class component lifecycle methods — but works differently.</p>
          <div className="rctse-lifecycle-steps">
            {LIFECYCLE_PHASES.map((lp, i) => (
              <button key={lp.phase} className={`rctse-lifecycle-btn ${phase === i ? 'rctse-lifecycle-btn--on' : ''}`}
                style={{ '--lc': lp.color }} onClick={() => setPhase(i)}>
                <span>{lp.icon}</span><span>{lp.phase}</span>
              </button>
            ))}
          </div>
          <div className="rctse-lifecycle-detail" style={{ borderColor: LIFECYCLE_PHASES[phase].color }}>
            <p className="rctse-lifecycle-desc">{LIFECYCLE_PHASES[phase].desc}</p>
            <pre className="rctse-code"><code>{LIFECYCLE_PHASES[phase].code}</code></pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default RctUseStateEffectVisualization;

import { useState } from 'react';
import './visual.css';

const BUGS = [
  { title: 'Out-of-order execution', code: 'In [3]: x = 10\nIn [1]: x = 5\nIn [4]: print(x)  # prints 10, not 5!', fix: 'Kernel → Restart & Run All. Never rely on In[] order.' },
  { title: 'Hidden state', code: 'del df  # deleted...\n# ...but if you re-run the import cell,\n# df is back without you noticing.', fix: 'Use Kernel → Restart to clear all variables between runs.' },
  { title: 'Variable shadowing', code: 'list = [1, 2, 3]   # shadows builtin!\nlist(range(5))     # TypeError', fix: 'Avoid naming variables after Python builtins.' },
];

const TIMEIT = [
  { fn: 'list comprehension', time: '45.2 µs ± 0.8 µs' },
  { fn: 'map() + list()', time: '61.4 µs ± 1.2 µs' },
  { fn: 'for loop append', time: '112.3 µs ± 2.1 µs' },
];

const PRUN = [
  { calls: 3, time: '0.021', cumtime: '0.021', fn: 'load_data' },
  { calls: 124, time: '0.009', cumtime: '0.009', fn: 'read_csv' },
  { calls: 1, time: '0.004', cumtime: '0.014', fn: 'merge' },
];

export default function JnbDebuggingVisualization() {
  const [tab, setTab] = useState(0);
  const [activeBug, setActiveBug] = useState(0);

  return (
    <div className="jnbdebug-root">
      <h2 className="jnbdebug-title">Debugging and Profiling</h2>
      <div className="jnbdebug-tabs">
        {['Debugging', 'Profiling'].map((t, i) => (
          <button key={i} className={`jnbdebug-tab ${tab === i ? 'jnbdebug-tab--active' : ''}`} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>

      {tab === 0 ? (
        <div className="jnbdebug-panel">
          <div className="jnbdebug-bug-list">
            {BUGS.map((b, i) => (
              <button key={i} className={`jnbdebug-bug-btn ${activeBug === i ? 'jnbdebug-bug-btn--active' : ''}`} onClick={() => setActiveBug(i)}>{b.title}</button>
            ))}
          </div>
          <div className="jnbdebug-bug-detail">
            <pre className="jnbdebug-code">{BUGS[activeBug].code}</pre>
            <div className="jnbdebug-fix">
              <span className="jnbdebug-fix-label">Fix:</span> {BUGS[activeBug].fix}
            </div>
          </div>
        </div>
      ) : (
        <div className="jnbdebug-panel">
          <div className="jnbdebug-section-label">%timeit — compare approaches</div>
          <table className="jnbdebug-table">
            <thead><tr><th>Expression</th><th>Time</th></tr></thead>
            <tbody>{TIMEIT.map(r => (
              <tr key={r.fn}><td>{r.fn}</td><td className="jnbdebug-time">{r.time}</td></tr>
            ))}</tbody>
          </table>
          <div className="jnbdebug-section-label" style={{ marginTop: 16 }}>%prun — function hotspots</div>
          <table className="jnbdebug-table">
            <thead><tr><th>ncalls</th><th>tottime</th><th>cumtime</th><th>function</th></tr></thead>
            <tbody>{PRUN.map(r => (
              <tr key={r.fn}><td>{r.calls}</td><td>{r.time}</td><td>{r.cumtime}</td><td className="jnbdebug-fn">{r.fn}</td></tr>
            ))}</tbody>
          </table>
          <p className="jnbdebug-note">Run <code className="jnbdebug-inline">%prun my_function()</code> to see where time is actually spent.</p>
        </div>
      )}
    </div>
  );
}

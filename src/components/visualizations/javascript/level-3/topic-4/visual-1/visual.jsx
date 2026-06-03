import React, { useState, useEffect } from 'react';
import './visual.css';

const PROMISE_STATES = ['pending', 'fulfilled', 'rejected'];

const STYLES_DEMO = {
  callbacks: {
    label: 'Callback Hell',
    color: '#E06C75',
    code: `fetchUser(id, (user) => {
  fetchPosts(user.id, (posts) => {
    fetchComments(posts[0].id, (comments) => {
      // deeply nested... 😱
    });
  });
});`,
  },
  promise: {
    label: 'Promise Chain',
    color: '#E5C07B',
    code: `fetchUser(id)
  .then(user => fetchPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(err => console.error(err));`,
  },
  async: {
    label: 'async / await',
    color: '#98C379',
    code: `async function loadData(id) {
  try {
    const user = await fetchUser(id);
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    console.log(comments); // clean! ✓
  } catch (err) {
    console.error(err);
  }
}`,
  },
};

const JsAsyncPromisesVisualization = () => {
  const [promiseState, setPromiseState] = useState('pending');
  const [simRunning, setSimRunning] = useState(false);
  const [simResult, setSimResult] = useState(null);
  const [style, setStyle] = useState('callbacks');
  const [fetchLog, setFetchLog] = useState([]);
  const [fetchRunning, setFetchRunning] = useState(false);

  const simulate = (outcome) => {
    setPromiseState('pending');
    setSimRunning(true);
    setSimResult(null);
    setTimeout(() => {
      setPromiseState(outcome);
      setSimResult(outcome === 'fulfilled' ? '{ id: 1, name: "Alice" }' : 'Error: 404 Not Found');
      setSimRunning(false);
    }, 1500);
  };

  const runFetch = () => {
    setFetchLog([]);
    setFetchRunning(true);
    const steps = [
      { ms: 0, msg: 'fetch() called — request sent', color: '#61AFEF' },
      { ms: 600, msg: '⏳ Waiting for server response…', color: '#F7DF1E' },
      { ms: 1200, msg: 'Response received (200 OK)', color: '#98C379' },
      { ms: 1600, msg: '.json() called — parsing body', color: '#E5C07B' },
      { ms: 2000, msg: '✓ Data ready: { users: [...] }', color: '#56d364' },
    ];
    steps.forEach(({ ms, msg, color }) => {
      setTimeout(() => {
        setFetchLog((prev) => [...prev, { msg, color }]);
        if (ms === 2000) setFetchRunning(false);
      }, ms);
    });
  };

  const stateColor = { pending: '#F7DF1E', fulfilled: '#56d364', rejected: '#f85149' };
  const stateIcon  = { pending: '⏳', fulfilled: '✓', rejected: '✗' };

  return (
    <div className="jsap-wrap">
      <header className="jsap-head">
        <span className="jsap-badge">JS</span>
        <h2>Async Concepts, Promises &amp; APIs</h2>
      </header>

      <div className="jsap-grid">
        {/* ─── Promise State Machine ─── */}
        <div className="jsap-panel">
          <h3>Promise Lifecycle</h3>
          <p className="jsap-sub">A Promise is always in one of three states.</p>

          <div className="jsap-states">
            {PROMISE_STATES.map((s) => (
              <div
                key={s}
                className={`jsap-state ${promiseState === s ? 'jsap-state--active' : ''}`}
                style={{ '--sc': stateColor[s] }}
              >
                <span className="jsap-state-icon">{stateIcon[s]}</span>
                <span className="jsap-state-name">{s}</span>
              </div>
            ))}
          </div>

          <div className="jsap-sim-controls">
            <button className="jsap-btn jsap-btn--ok" onClick={() => simulate('fulfilled')} disabled={simRunning}>
              Simulate success
            </button>
            <button className="jsap-btn jsap-btn--err" onClick={() => simulate('rejected')} disabled={simRunning}>
              Simulate failure
            </button>
          </div>

          {simResult && (
            <div className={`jsap-result ${promiseState === 'fulfilled' ? 'jsap-result--ok' : 'jsap-result--err'}`}>
              {promiseState === 'fulfilled' ? '.then() →' : '.catch() →'} <code>{simResult}</code>
            </div>
          )}

          <pre className="jsap-code">
            <code>{`const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ id: 1, name: "Alice" });
    // or: reject(new Error("404"));
  }, 1500);
});

p.then(data => console.log(data))
 .catch(err => console.error(err));`}</code>
          </pre>
        </div>

        {/* ─── Code Style + Fetch ─── */}
        <div className="jsap-panel">
          <h3>Async Styles</h3>
          <div className="jsap-style-tabs">
            {Object.entries(STYLES_DEMO).map(([key, { label, color }]) => (
              <button
                key={key}
                className={`jsap-stab ${style === key ? 'jsap-stab--on' : ''}`}
                style={{ '--stc': color }}
                onClick={() => setStyle(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <pre className="jsap-code jsap-code--style" style={{ borderColor: STYLES_DEMO[style].color }}>
            <code>{STYLES_DEMO[style].code}</code>
          </pre>

          <div className="jsap-fetch">
            <div className="jsap-fetch-head">
              <h3>Fetch API</h3>
              <button className="jsap-fetch-btn" onClick={runFetch} disabled={fetchRunning}>
                {fetchRunning ? 'Fetching…' : 'Run fetch()'}
              </button>
            </div>
            <div className="jsap-fetch-log">
              {fetchLog.length === 0 && <div className="jsap-fetch-empty">Press "Run fetch()" to see the flow</div>}
              {fetchLog.map((entry, i) => (
                <div key={i} className="jsap-fetch-entry" style={{ color: entry.color }}>
                  <span className="jsap-fetch-dot" style={{ background: entry.color }} />
                  {entry.msg}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsAsyncPromisesVisualization;

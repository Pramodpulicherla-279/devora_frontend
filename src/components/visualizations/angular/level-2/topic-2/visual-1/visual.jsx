/* Lesson: HttpClient
 * Visual type: ANIMATION (request lifecycle)
 * Reason: An HTTP call is a timed round-trip with loading/success/error states.
 * Animating the request → pending → response cycle shows the async lifecycle. */
import React, { useState } from 'react';
import './visual.css';

const NgHttpVisualization = () => {
  const [state, setState] = useState('idle'); // idle, loading, success, error
  const run = (outcome) => {
    setState('loading');
    setTimeout(() => setState(outcome), 1200);
  };
  return (
    <div className="nghttp-wrap">
      <header className="nghttp-head">
        <span className="nghttp-badge">Angular</span>
        <h2>HttpClient</h2>
        <p>Talking to a backend — and handling every outcome</p>
      </header>
      <div className="nghttp-flow">
        <div className="nghttp-node nghttp-node--app">Component</div>
        <div className={`nghttp-wire ${state !== 'idle' ? 'nghttp-wire--on' : ''}`}>
          {state === 'loading' ? '⟳ GET /api/users…' : '— HttpClient —'}
        </div>
        <div className="nghttp-node nghttp-node--server">Server</div>
      </div>
      <div className={`nghttp-state nghttp-state--${state}`}>
        {state === 'idle' && 'Idle — fire a request below'}
        {state === 'loading' && '⏳ Loading… (subscribe is waiting)'}
        {state === 'success' && '✓ 200 OK — data received, render it'}
        {state === 'error' && '✗ Error — caught by catchError, show fallback'}
      </div>
      <div className="nghttp-btns">
        <button className="nghttp-btn nghttp-btn--ok" onClick={() => run('success')} disabled={state === 'loading'}>▶ Successful request</button>
        <button className="nghttp-btn nghttp-btn--err" onClick={() => run('error')} disabled={state === 'loading'}>▶ Failing request</button>
      </div>
      <pre className="nghttp-code"><code>{`this.http.get<User[]>('/api/users').subscribe({
  next:  (users) => this.users = users,   // success
  error: (err)   => this.handleError(err) // failure
});`}</code></pre>
      <div className="nghttp-note">HttpClient returns an <strong>Observable</strong> — nothing happens until you <code>subscribe()</code>. Always handle both <code>next</code> and <code>error</code>.</div>
    </div>
  );
};
export default NgHttpVisualization;

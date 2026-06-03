/* Lesson: Route Guards & Lazy Loading
 * Visual type: INTERACTIVE (guard decision + lazy-load animation)
 * Reason: A guard is a gate that allows/blocks navigation; lazy loading defers a
 * bundle until needed. Toggling auth to see the guard redirect, plus a chunk
 * loading on demand, demonstrates both. */
import React, { useState } from 'react';
import './visual.css';

const NgGuardVisualization = () => {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState('guard');
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const lazyLoad = () => { setLoading(true); setTimeout(() => { setLoading(false); setLoaded(true); }, 1100); };

  return (
    <div className="ngguard-wrap">
      <header className="ngguard-head">
        <span className="ngguard-badge">Angular</span>
        <h2>Route Guards &amp; Lazy Loading</h2>
        <p>Protect routes &amp; load code only when needed</p>
      </header>
      <div className="ngguard-tabs">
        <button className={`ngguard-tab ${tab === 'guard' ? 'ngguard-tab--on' : ''}`} onClick={() => setTab('guard')}>🛡️ Route Guard</button>
        <button className={`ngguard-tab ${tab === 'lazy' ? 'ngguard-tab--on' : ''}`} onClick={() => setTab('lazy')}>📦 Lazy Loading</button>
      </div>
      {tab === 'guard' ? (
        <>
          <label className="ngguard-auth">
            <input type="checkbox" checked={authed} onChange={(e) => setAuthed(e.target.checked)} /> Logged in
          </label>
          <div className="ngguard-flow">
            <div className="ngguard-step">Navigate to <code>/dashboard</code></div>
            <div className="ngguard-arrow">↓</div>
            <div className="ngguard-gate">🛡️ canActivate: isLoggedIn?</div>
            <div className="ngguard-arrow">↓</div>
            <div className={`ngguard-result ${authed ? 'ngguard-result--allow' : 'ngguard-result--block'}`}>
              {authed ? '✓ Allowed → Dashboard renders' : '✗ Blocked → redirect to /login'}
            </div>
          </div>
          <pre className="ngguard-code"><code>{`{ path: 'dashboard', component: Dashboard,
  canActivate: [authGuard] }`}</code></pre>
        </>
      ) : (
        <>
          <div className="ngguard-bundles">
            <div className="ngguard-bundle ngguard-bundle--main">main.js (loaded at start)</div>
            <div className={`ngguard-bundle ngguard-bundle--lazy ${loaded ? 'ngguard-bundle--loaded' : ''}`}>
              {loading ? '⟳ loading admin.chunk.js…' : loaded ? '✓ admin.chunk.js loaded' : 'admin.chunk.js (not yet loaded)'}
            </div>
          </div>
          <button className="ngguard-btn" onClick={lazyLoad} disabled={loading || loaded}>{loaded ? 'Loaded ✓' : '▶ Visit /admin'}</button>
          <pre className="ngguard-code"><code>{`{ path: 'admin',
  loadComponent: () =>
    import('./admin.component')   // ← only fetched on demand
      .then(m => m.AdminComponent) }`}</code></pre>
          <div className="ngguard-note">Lazy loading keeps the initial bundle small — the admin code only downloads when a user actually navigates to <code>/admin</code>. Faster first load.</div>
        </>
      )}
    </div>
  );
};
export default NgGuardVisualization;

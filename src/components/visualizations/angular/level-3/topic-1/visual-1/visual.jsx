/* Lesson: Angular Router
 * Visual type: INTERACTIVE
 * Reason: Routing maps URLs to components without page reloads. A simulated
 * browser where clicking nav swaps the rendered view shows SPA routing live. */
import React, { useState } from 'react';
import './visual.css';

const ROUTES = {
  '/': { comp: 'HomeComponent', body: '🏠 Welcome home!' },
  '/products': { comp: 'ProductListComponent', body: '📦 All products listed here.' },
  '/products/42': { comp: 'ProductDetailComponent', body: '🔎 Product #42 details (param id=42).' },
  '/about': { comp: 'AboutComponent', body: 'ℹ️ About this app.' },
};

const NgRouterVisualization = () => {
  const [url, setUrl] = useState('/');
  const r = ROUTES[url];
  return (
    <div className="ngrouter-wrap">
      <header className="ngrouter-head">
        <span className="ngrouter-badge">Angular</span>
        <h2>Angular Router</h2>
        <p>URLs → components, no full page reload</p>
      </header>
      <div className="ngrouter-browser">
        <div className="ngrouter-urlbar">🔒 myapp.com<span className="ngrouter-path">{url}</span></div>
        <div className="ngrouter-nav">
          {Object.keys(ROUTES).map((u) => (
            <button key={u} className={`ngrouter-link ${url === u ? 'ngrouter-link--on' : ''}`} onClick={() => setUrl(u)}>{u}</button>
          ))}
        </div>
        <div className="ngrouter-view">
          <div className="ngrouter-comp">&lt;router-outlet&gt; → {r.comp}</div>
          <div className="ngrouter-body">{r.body}</div>
        </div>
      </div>
      <pre className="ngrouter-code"><code>{`const routes: Routes = [
  { path: '',            component: HomeComponent },
  { path: 'products',    component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'about',       component: AboutComponent },
];`}</code></pre>
      <div className="ngrouter-note">The matched component renders inside <code>&lt;router-outlet&gt;</code>. Only that region changes — the rest of the app stays mounted. Use <code>:id</code> for dynamic params.</div>
    </div>
  );
};
export default NgRouterVisualization;

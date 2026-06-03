/* Lesson: Code splitting & lazy loading
 * Visual type: INTERACTIVE
 * Reason: Code splitting defers chunks until needed. Navigating "routes" and
 * watching only the needed chunk download shows the smaller-initial-bundle win. */
import React, { useState } from 'react';
import './visual.css';

const ROUTES = [
  { path: '/', chunk: 'main.js', size: 45, loaded: true },
  { path: '/dashboard', chunk: 'dashboard.js', size: 80, loaded: false },
  { path: '/admin', chunk: 'admin.js', size: 120, loaded: false },
];

const BtSplitVisualization = () => {
  const [loaded, setLoaded] = useState({ 'main.js': true });
  const visit = (chunk) => { setLoaded((l) => ({ ...l, [chunk]: true })); };
  const total = ROUTES.filter((r) => loaded[r.chunk]).reduce((s, r) => s + r.size, 0);
  const allTotal = ROUTES.reduce((s, r) => s + r.size, 0);
  return (
    <div className="btsplit-wrap">
      <header className="btsplit-head">
        <span className="btsplit-badge">Vite</span>
        <h2>Code Splitting &amp; Lazy Loading</h2>
        <p>Load only the code each route needs</p>
      </header>
      <div className="btsplit-routes">
        {ROUTES.map((r) => (
          <div key={r.path} className={`btsplit-route ${loaded[r.chunk] ? 'btsplit-route--loaded' : ''}`}>
            <code className="btsplit-path">{r.path}</code>
            <span className="btsplit-chunk">{r.chunk} · {r.size}KB</span>
            {loaded[r.chunk] ? <span className="btsplit-status">✓ loaded</span>
              : <button className="btsplit-visit" onClick={() => visit(r.chunk)}>Visit →</button>}
          </div>
        ))}
      </div>
      <div className="btsplit-meter">
        <div className="btsplit-meter-label">Downloaded so far: {total}KB / {allTotal}KB</div>
        <div className="btsplit-bar"><div className="btsplit-fill" style={{ width: `${(total / allTotal) * 100}%` }} /></div>
      </div>
      <pre className="btsplit-code"><code>{`// React.lazy + dynamic import → separate chunk
const Admin = lazy(() => import('./Admin'))

<Suspense fallback={<Spinner/>}>
  <Admin />   {/* admin.js only fetched when rendered */}
</Suspense>`}</code></pre>
      <div className="btsplit-note">Without splitting, users download <strong>all {allTotal}KB</strong> upfront. With it, the initial load is tiny and heavy routes load on demand.</div>
    </div>
  );
};
export default BtSplitVisualization;

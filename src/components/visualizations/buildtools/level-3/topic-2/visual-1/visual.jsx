/* Lesson: Dev server & environments
 * Visual type: ILLUSTRATION
 * Reason: The dev server's features (HMR, proxy, source maps) are conceptual — a
 * feature explorer mapping each to its benefit communicates them clearly. */
import React, { useState } from 'react';
import './visual.css';

const FEATURES = {
  hmr: { icon: '🔥', label: 'Hot Module Replacement', d: 'Swap changed modules in the running app without a full reload — keeps state.', cfg: "devServer: { hot: true }" },
  proxy: { icon: '🔀', label: 'Proxy', d: 'Forward /api requests to your backend, dodging CORS in dev.', cfg: "devServer: { proxy: { '/api': 'http://localhost:3000' } }" },
  sourcemap: { icon: '🗺️', label: 'Source Maps', d: 'Map bundled code back to your source so errors point to real files/lines.', cfg: "devtool: 'eval-source-map'" },
  overlay: { icon: '🚨', label: 'Error Overlay', d: 'Show build/runtime errors right in the browser, full-screen.', cfg: "devServer: { client: { overlay: true } }" },
};

const BtDevServerVisualization = () => {
  const [f, setF] = useState('hmr');
  return (
    <div className="btdev-wrap">
      <header className="btdev-head">
        <span className="btdev-badge">Build Tools</span>
        <h2>Dev Server &amp; Environments</h2>
        <p>The features that make local dev fast &amp; pleasant</p>
      </header>
      <div className="btdev-tabs">
        {Object.entries(FEATURES).map(([k, v]) => (
          <button key={k} className={`btdev-tab ${f === k ? 'btdev-tab--on' : ''}`} onClick={() => setF(k)}>{v.icon} {v.label.split(' ')[0]}</button>
        ))}
      </div>
      <div className="btdev-detail">
        <strong>{FEATURES[f].icon} {FEATURES[f].label}</strong>
        <p>{FEATURES[f].d}</p>
      </div>
      <pre className="btdev-code"><code>{FEATURES[f].cfg}</code></pre>
      <div className="btdev-note">The dev server runs in-memory (nothing written to disk) for speed. HMR is the headline feature — edit a component and see it update while preserving app state.</div>
    </div>
  );
};
export default BtDevServerVisualization;

/* Lesson: Getting started with Vite
 * Visual type: ILLUSTRATION
 * Reason: Vite's key idea — native ESM served on demand in dev (no bundling) →
 * instant startup — is best shown by contrasting Vite's dev flow with old bundlers. */
import React, { useState } from 'react';
import './visual.css';

const BtViteVisualization = () => {
  const [tool, setTool] = useState('vite');
  return (
    <div className="btvite-wrap">
      <header className="btvite-head">
        <span className="btvite-badge">Vite</span>
        <h2>Getting Started with Vite</h2>
        <p>Why dev startup is near-instant</p>
      </header>
      <div className="btvite-toggle">
        <button className={`btvite-tbtn ${tool === 'old' ? 'btvite-tbtn--on' : ''}`} onClick={() => setTool('old')}>Old bundler</button>
        <button className={`btvite-tbtn btvite-tbtn--vite ${tool === 'vite' ? 'btvite-tbtn--on' : ''}`} onClick={() => setTool('vite')}>Vite</button>
      </div>
      {tool === 'old' ? (
        <div className="btvite-diagram btvite-diagram--old">
          <div className="btvite-step">Bundle ENTIRE app first…</div>
          <div className="btvite-bar btvite-bar--slow"><div className="btvite-fill btvite-fill--slow" /></div>
          <div className="btvite-time">⏱️ slow cold start (seconds–minutes)</div>
          <div className="btvite-then">…then serve the giant bundle.</div>
        </div>
      ) : (
        <div className="btvite-diagram btvite-diagram--vite">
          <div className="btvite-step">Start server instantly — serve files as the browser requests them (native ESM)</div>
          <div className="btvite-bar"><div className="btvite-fill" /></div>
          <div className="btvite-time">⚡ ready in milliseconds</div>
          <div className="btvite-then">On-demand transform + esbuild = fast HMR.</div>
        </div>
      )}
      <pre className="btvite-code"><code>{`npm create vite@latest my-app
cd my-app
npm install
npm run dev      # ⚡ ready in ~200ms`}</code></pre>
      <div className="btvite-note">In dev, Vite skips bundling — the browser's native ES modules load files on demand. In production it bundles with Rollup for an optimized build.</div>
    </div>
  );
};
export default BtViteVisualization;

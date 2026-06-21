/* Lesson: vite.config.js
 * Visual type: ILLUSTRATION
 * Reason: The config file's keys (plugins, server, resolve, build) are structural
 * — an annotated config explorer maps each option to what it controls. */
import React, { useState } from 'react';
import './visual.css';

const KEYS = {
  plugins: { label: 'plugins', d: 'Add framework support & features (React, etc.).' },
  server: { label: 'server', d: 'Dev server: port, proxy, open browser, host.' },
  resolve: { label: 'resolve.alias', d: 'Path aliases like @ → /src for clean imports.' },
  build: { label: 'build', d: 'Output dir, sourcemaps, chunking, minify.' },
};

const BtConfigVisualization = () => {
  const [hl, setHl] = useState('plugins');
  return (
    <div className="btconfig-wrap">
      <header className="btconfig-head">
        <span className="btconfig-badge">Vite</span>
        <h2>vite.config.js</h2>
        <p>One file to configure the whole build</p>
      </header>
      <pre className="btconfig-code"><code>{`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  `}<span className={`btconfig-k ${hl==='plugins'?'btconfig-k--on':''}`} onClick={()=>setHl('plugins')}>plugins: [react()]</span>{`,
  `}<span className={`btconfig-k ${hl==='server'?'btconfig-k--on':''}`} onClick={()=>setHl('server')}>{"server: { port: 5180, open: true }"}</span>{`,
  `}<span className={`btconfig-k ${hl==='resolve'?'btconfig-k--on':''}`} onClick={()=>setHl('resolve')}>{"resolve: { alias: { '@': '/src' } }"}</span>{`,
  `}<span className={`btconfig-k ${hl==='build'?'btconfig-k--on':''}`} onClick={()=>setHl('build')}>{"build: { outDir: 'dist', sourcemap: true }"}</span>{`
})`}</code></pre>
      <div className="btconfig-detail"><strong>{KEYS[hl].label}</strong><p>{KEYS[hl].d}</p></div>
      <div className="btconfig-note">Tap any highlighted key. The config is plain JS — you can compute values, read env vars, and conditionally change settings per mode.</div>
    </div>
  );
};
export default BtConfigVisualization;

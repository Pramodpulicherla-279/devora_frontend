/* Lesson: Build & preview
 * Visual type: ANIMATION (build pipeline)
 * Reason: The production build is a multi-stage pipeline. Stepping through
 * transpile → bundle → minify → hash → output shows what `vite build` does. */
import React, { useState, useEffect } from 'react';
import './visual.css';

const STAGES = [
  { icon: '🔄', label: 'Transpile', d: 'JSX/TS → plain JS via esbuild.' },
  { icon: '📦', label: 'Bundle', d: 'Rollup combines modules & tree-shakes dead code.' },
  { icon: '🗜️', label: 'Minify', d: 'Strip whitespace, shorten names.' },
  { icon: '#️⃣', label: 'Hash', d: 'Add content hashes for cache-busting.' },
  { icon: '📁', label: 'Output dist/', d: 'Static files ready to deploy.' },
];

const BtBuildVisualization = () => {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    if (step >= STAGES.length - 1) { setRunning(false); return; }
    const t = setTimeout(() => setStep((s) => s + 1), 800);
    return () => clearTimeout(t);
  }, [running, step]);
  return (
    <div className="btbuild-wrap">
      <header className="btbuild-head">
        <span className="btbuild-badge">Vite</span>
        <h2>Build &amp; Preview</h2>
        <p>What <code>npm run build</code> actually does</p>
      </header>
      <div className="btbuild-pipe">
        {STAGES.map((s, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className={`btbuild-conn ${step >= i ? 'btbuild-conn--on' : ''}`} />}
            <div className={`btbuild-stage ${step === i ? 'btbuild-stage--on' : ''} ${step > i ? 'btbuild-stage--done' : ''}`}>
              <span className="btbuild-icon">{s.icon}</span>
              <span className="btbuild-label">{s.label}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
      {step >= 0 && <div className="btbuild-detail"><strong>{STAGES[step].label}</strong> — {STAGES[step].d}</div>}
      <div className="btbuild-controls">
        <button className="btbuild-btn" onClick={() => { setStep(0); setRunning(true); }} disabled={running}>▶ vite build</button>
        <button className="btbuild-btn btbuild-btn--reset" onClick={() => { setStep(-1); setRunning(false); }}>Reset</button>
      </div>
      <pre className="btbuild-code"><code>{`npm run build      # → dist/ (optimized)
npm run preview    # serve dist/ locally to test`}</code></pre>
      <div className="btbuild-note">Always <code>preview</code> the production build before deploying — dev and prod can behave differently (env vars, minification, base paths).</div>
    </div>
  );
};
export default BtBuildVisualization;

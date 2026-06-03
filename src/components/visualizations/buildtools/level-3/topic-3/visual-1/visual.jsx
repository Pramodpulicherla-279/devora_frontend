/* Lesson: Optimizing the bundle
 * Visual type: INTERACTIVE
 * Reason: Optimizations (tree-shaking, minify, splitting) each shrink the bundle.
 * Toggling them and watching the size drop makes their impact tangible. */
import React, { useState } from 'react';
import './visual.css';

const OPTS = {
  treeshake: { label: 'Tree-shaking', save: 120, d: 'Drop unused exports/dead code.' },
  minify: { label: 'Minification', save: 90, d: 'Strip whitespace, shorten names.' },
  split: { label: 'Code splitting', save: 70, d: 'Defer non-critical chunks.' },
  gzip: { label: 'Gzip/Brotli', save: 60, d: 'Compress over the wire.' },
};
const BASE = 420;

const BtOptimizeVisualization = () => {
  const [on, setOn] = useState({ treeshake: false, minify: false, split: false, gzip: false });
  const saved = Object.entries(on).reduce((s, [k, v]) => s + (v ? OPTS[k].save : 0), 0);
  const final = Math.max(40, BASE - saved);
  const pct = Math.round((final / BASE) * 100);

  return (
    <div className="btopt-wrap">
      <header className="btopt-head">
        <span className="btopt-badge">Build Tools</span>
        <h2>Optimizing the Bundle</h2>
        <p>Stack optimizations &amp; watch the size shrink</p>
      </header>
      <div className="btopt-meter">
        <div className="btopt-meter-row">
          <span>Bundle size</span>
          <strong className={final < 200 ? 'btopt-good' : ''}>{final}KB</strong>
        </div>
        <div className="btopt-bar">
          <div className="btopt-base" style={{ width: '100%' }} />
          <div className="btopt-final" style={{ width: `${pct}%` }} />
        </div>
        <div className="btopt-meter-foot">{BASE}KB raw → {final}KB ({100 - pct}% smaller)</div>
      </div>
      <div className="btopt-toggles">
        {Object.entries(OPTS).map(([k, v]) => (
          <label key={k} className={`btopt-toggle ${on[k] ? 'btopt-toggle--on' : ''}`}>
            <input type="checkbox" checked={on[k]} onChange={(e) => setOn((o) => ({ ...o, [k]: e.target.checked }))} />
            <div className="btopt-toggle-body">
              <strong>{v.label} <span className="btopt-save">−{v.save}KB</span></strong>
              <span>{v.d}</span>
            </div>
          </label>
        ))}
      </div>
      <div className="btopt-note">Modern bundlers tree-shake &amp; minify in production by default. Measure with <code>rollup-plugin-visualizer</code> / <code>webpack-bundle-analyzer</code> to find the heavy bits.</div>
    </div>
  );
};
export default BtOptimizeVisualization;

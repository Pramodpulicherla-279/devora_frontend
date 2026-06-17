import { useState } from 'react';
import './visual.css';

const TRANSFORMS = [
  { key: 'translateX', min: -100, max: 100, unit: 'px', def: 0 },
  { key: 'translateY', min: -100, max: 100, unit: 'px', def: 0 },
  { key: 'rotate', min: -180, max: 180, unit: 'deg', def: 0 },
  { key: 'scaleX', min: 0.2, max: 2, unit: '', def: 1, step: 0.1 },
  { key: 'scaleY', min: 0.2, max: 2, unit: '', def: 1, step: 0.1 },
  { key: 'skewX', min: -45, max: 45, unit: 'deg', def: 0 },
];

const COMPOSITED = ['translateX', 'translateY', 'rotate', 'scaleX', 'scaleY'];

export default function CssTransformsVisualization() {
  const [vals, setVals] = useState(Object.fromEntries(TRANSFORMS.map(t => [t.key, t.def])));
  const [willChange, setWillChange] = useState(false);

  const transformStr = TRANSFORMS
    .filter(t => vals[t.key] !== t.def)
    .map(t => `${t.key}(${vals[t.key]}${t.unit})`)
    .join(' ') || 'none';

  const reset = () => setVals(Object.fromEntries(TRANSFORMS.map(t => [t.key, t.def])));

  return (
    <div className="csstfm-wrap">
      <h3 className="csstfm-title">CSS Transforms & will-change</h3>
      <p className="csstfm-sub">Adjust each transform function and watch the element update</p>

      <div className="csstfm-main">
        <div className="csstfm-controls">
          {TRANSFORMS.map(t => (
            <div key={t.key} className="csstfm-ctrl">
              <div className="csstfm-ctrl-head">
                <span className="csstfm-ctrl-key">{t.key}</span>
                <span className="csstfm-ctrl-val">{vals[t.key]}{t.unit}</span>
              </div>
              <input className="csstfm-slider" type="range" min={t.min} max={t.max}
                step={t.step || 1} value={vals[t.key]}
                onChange={e => setVals(v => ({ ...v, [t.key]: +e.target.value }))} />
            </div>
          ))}
          <button className="csstfm-reset" onClick={reset}>↺ Reset all</button>
        </div>

        <div className="csstfm-stage">
          <div className="csstfm-grid-bg">
            <div className="csstfm-box" style={{ transform: transformStr, willChange: willChange ? 'transform' : 'auto' }}>
              box
            </div>
          </div>
        </div>
      </div>

      <pre className="csstfm-code">{`transform: ${transformStr};${willChange ? '\nwill-change: transform;' : ''}`}</pre>

      <div className="csstfm-perf">
        <div className="csstfm-perf-head">
          <span>Performance: will-change</span>
          <button className={`csstfm-toggle ${willChange ? 'csstfm-toggle-on' : ''}`}
            onClick={() => setWillChange(w => !w)}>{willChange ? 'ON' : 'OFF'}</button>
        </div>
        <div className="csstfm-perf-grid">
          <div className="csstfm-perf-col csstfm-perf-good">
            <div className="csstfm-perf-label">✅ GPU-composited (cheap)</div>
            {COMPOSITED.map(k => <span key={k} className="csstfm-perf-item">{k}</span>)}
            <span className="csstfm-perf-item">opacity</span>
          </div>
          <div className="csstfm-perf-col csstfm-perf-bad">
            <div className="csstfm-perf-label">⚠️ Triggers layout (costly)</div>
            {['width', 'height', 'top', 'left', 'margin'].map(k => <span key={k} className="csstfm-perf-item">{k}</span>)}
          </div>
        </div>
        <p className="csstfm-perf-note">Animate <code>transform</code> &amp; <code>opacity</code> — they skip layout/paint. Add <code>will-change: transform</code> to hint the browser to promote the element to its own layer (use sparingly).</p>
      </div>
    </div>
  );
}

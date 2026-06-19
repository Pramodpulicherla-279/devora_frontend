/* Lesson: Mobile-First & Viewport Units
 * Visual: Width slider showing base mobile styles + min-width enhancements layering on */
import { useState } from 'react';
import './visual.css';

const LAYERS = [
  { min: 0, label: 'Base (mobile)', cols: 1, css: '.grid { display: grid; gap: 1rem; grid-template-columns: 1fr; }' },
  { min: 600, label: '@media (min-width: 600px)', cols: 2, css: '@media (min-width: 600px) {\n  .grid { grid-template-columns: 1fr 1fr; }\n}' },
  { min: 960, label: '@media (min-width: 960px)', cols: 3, css: '@media (min-width: 960px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}' },
];

export default function CssMobileFirstVisualization() {
  const [w, setW] = useState(420);
  const active = [...LAYERS].reverse().find(l => w >= l.min);
  const appliedCount = LAYERS.filter(l => w >= l.min).length;

  return (
    <div className="mobilefirst-wrap">
      <h3 className="mobilefirst-title">Mobile-First & Viewport Units</h3>
      <p className="mobilefirst-sub">Start with the smallest screen, then layer enhancements upward with <code>min-width</code></p>

      <label className="mobilefirst-label">Viewport width: <strong>{w}px</strong></label>
      <input className="mobilefirst-slider" type="range" min="320" max="1280" value={w} onChange={e => setW(+e.target.value)} />

      <div className="mobilefirst-frame" style={{ maxWidth: Math.min(w, 560) + 'px' }}>
        <div className="mobilefirst-grid" style={{ gridTemplateColumns: `repeat(${active.cols}, 1fr)` }}>
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="mobilefirst-card" />)}
        </div>
      </div>
      <div className="mobilefirst-active">Active: <strong>{active.label}</strong> → {active.cols} column{active.cols > 1 ? 's' : ''}</div>

      <div className="mobilefirst-layers">
        {LAYERS.map((l, i) => (
          <pre key={i} className={`mobilefirst-css ${w >= l.min ? 'mobilefirst-on' : 'mobilefirst-off'}`}>{l.css}</pre>
        ))}
      </div>
      <p className="mobilefirst-note">{appliedCount} rule{appliedCount > 1 ? 's' : ''} applied (they stack — later ones override). Don't forget <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code>.</p>
    </div>
  );
}

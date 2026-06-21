/* Lesson: Media Queries
 * Visual: Breakpoint explorer — drag the width to see which @media block is active */
import { useState } from 'react';
import './visual.css';

const BREAKPOINTS = [
  { name: 'sm', min: 0, max: 639, label: 'Mobile', cols: 1, color: '#f85149' },
  { name: 'md', min: 640, max: 1023, label: 'Tablet', cols: 2, color: '#f0883e' },
  { name: 'lg', min: 1024, max: 1279, label: 'Laptop', cols: 3, color: '#2f81f7' },
  { name: 'xl', min: 1280, max: 9999, label: 'Desktop', cols: 4, color: '#56d364' },
];

export default function CssMediaQueriesVisualization() {
  const [w, setW] = useState(800);
  const bp = BREAKPOINTS.find(b => w >= b.min && w <= b.max);

  const code = bp.name === 'sm'
    ? '/* base styles — no query needed */\n.grid { grid-template-columns: 1fr; }'
    : `@media (min-width: ${bp.min}px) {\n  .grid { grid-template-columns: repeat(${bp.cols}, 1fr); }\n}`;

  return (
    <div className="mediaq-wrap">
      <h3 className="mediaq-title">Media Queries</h3>
      <p className="mediaq-sub">A breakpoint is just a width where your layout changes</p>

      <label className="mediaq-label">Viewport: <strong style={{ color: bp.color }}>{w}px</strong> → <strong>{bp.label}</strong> ({bp.name})</label>
      <input className="mediaq-slider" type="range" min="360" max="1440" value={w} onChange={e => setW(+e.target.value)} />

      <div className="mediaq-scale">
        {BREAKPOINTS.map(b => (
          <div key={b.name} className={`mediaq-bp ${bp.name === b.name ? 'mediaq-bp-on' : ''}`}
            style={bp.name === b.name ? { borderColor: b.color, color: b.color } : {}}>
            {b.name}<small>{b.min}px+</small>
          </div>
        ))}
      </div>

      <div className="mediaq-frame">
        <div className="mediaq-grid" style={{ gridTemplateColumns: `repeat(${bp.cols}, 1fr)` }}>
          {Array.from({ length: bp.cols * 2 }).map((_, i) => <div key={i} className="mediaq-card" style={{ background: bp.color }} />)}
        </div>
      </div>

      <pre className="mediaq-code">{code}</pre>
    </div>
  );
}

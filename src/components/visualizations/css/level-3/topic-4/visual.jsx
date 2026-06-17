import { useState } from 'react';
import './visual.css';

const TIMING = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'];
const PROPS = ['all', 'opacity', 'transform', 'background-color', 'width'];

export default function CssAnimationsVisualization() {
  const [duration, setDuration] = useState(0.5);
  const [timing, setTiming] = useState('ease');
  const [prop, setProp] = useState('all');
  const [hovered, setHovered] = useState(false);

  const css = `transition: ${prop} ${duration}s ${timing};`;
  const hoverStyles = hovered
    ? { opacity: 0.4, transform: 'scale(1.15) rotate(8deg)', background: '#a78bfa', width: '100%' }
    : { opacity: 1, transform: 'scale(1) rotate(0deg)', background: '#58a6ff', width: '60%' };

  return (
    <div className="cssanim-wrap">
      <h3 className="cssanim-title">CSS Transitions</h3>
      <p className="cssanim-sub">Configure a transition and see it live</p>

      <div className="cssanim-controls">
        <div className="cssanim-ctrl-group">
          <label className="cssanim-label">Property</label>
          <div className="cssanim-chips">
            {PROPS.map(p => (
              <button key={p} className={`cssanim-chip ${prop === p ? 'cssanim-chip-active' : ''}`}
                onClick={() => setProp(p)}>{p}</button>
            ))}
          </div>
        </div>

        <div className="cssanim-ctrl-group">
          <label className="cssanim-label">Duration: {duration}s</label>
          <input className="cssanim-slider" type="range" min="0.1" max="3" step="0.1"
            value={duration} onChange={e => setDuration(+e.target.value)} />
        </div>

        <div className="cssanim-ctrl-group">
          <label className="cssanim-label">Timing Function</label>
          <div className="cssanim-chips">
            {TIMING.map(t => (
              <button key={t} className={`cssanim-chip ${timing === t ? 'cssanim-chip-active' : ''}`}
                onClick={() => setTiming(t)}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="cssanim-preview-area">
        <div
          className="cssanim-box"
          style={{
            transition: `${prop} ${duration}s ${timing}`,
            ...hoverStyles
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered ? 'Hover state' : 'Hover me'}
        </div>
        <p className="cssanim-hint">(hover the box to trigger)</p>
      </div>

      <pre className="cssanim-code">{`.element {\n  ${css}\n}\n\n.element:hover {\n  opacity: 0.4;\n  transform: scale(1.15) rotate(8deg);\n  background-color: #a78bfa;\n}`}</pre>
    </div>
  );
}

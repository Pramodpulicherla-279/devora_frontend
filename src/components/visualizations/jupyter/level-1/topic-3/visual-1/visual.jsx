import { useState } from 'react';
import './visual.css';

const W = 300, H = 140, CX = W / 2, CY = H / 2, R = 55;

function makeCurve(fn, pts = 60) {
  return Array.from({ length: pts }, (_, i) => {
    const x = (i / (pts - 1)) * W;
    const t = (i / (pts - 1)) * 2 * Math.PI;
    let y;
    if (fn === 'sin') y = CY - Math.sin(t) * R;
    else if (fn === 'cos') y = CY - Math.cos(t) * R;
    else y = CY - Math.tan(t * 0.3) * R * 0.5;
    y = Math.max(4, Math.min(H - 4, y));
    return `${x},${y}`;
  }).join(' ');
}

const GRID_LINES = [30, 70, 110];

export default function JnbWidgetsVisualization() {
  const [sliderVal, setSliderVal] = useState(5);
  const [fn, setFn] = useState('sin');
  const [showGrid, setShowGrid] = useState(true);

  const stroke = fn === 'sin' ? '#f97316' : fn === 'cos' ? '#79c0ff' : '#7ee787';
  const polyline = makeCurve(fn);

  const code = `from ipywidgets import interact\nimport numpy as np\n\n@interact(n=(0, 10), fn=['sin','cos','tan'], grid=True)\ndef plot(n=${sliderVal}, fn='${fn}', grid=${showGrid}):\n    x = np.linspace(0, 2*np.pi, 100*n or 1)\n    plt.plot(x, getattr(np, fn)(x))`;

  return (
    <div className="jnbwidgets-root">
      <h2 className="jnbwidgets-title">Interactive Widgets</h2>
      <div className="jnbwidgets-layout">
        <div className="jnbwidgets-controls">
          <div className="jnbwidgets-control-group">
            <label className="jnbwidgets-label">n = {sliderVal}</label>
            <input type="range" min={0} max={10} value={sliderVal} onChange={e => setSliderVal(+e.target.value)} className="jnbwidgets-slider" />
          </div>
          <div className="jnbwidgets-control-group">
            <label className="jnbwidgets-label">Function</label>
            <select value={fn} onChange={e => setFn(e.target.value)} className="jnbwidgets-select">
              <option value="sin">sin</option>
              <option value="cos">cos</option>
              <option value="tan">tan</option>
            </select>
          </div>
          <div className="jnbwidgets-control-group">
            <label className="jnbwidgets-label jnbwidgets-check-label">
              <input type="checkbox" checked={showGrid} onChange={e => setShowGrid(e.target.checked)} className="jnbwidgets-checkbox" />
              Show grid
            </label>
          </div>
        </div>

        <div className="jnbwidgets-plot-box">
          <svg viewBox={`0 0 ${W} ${H}`} className="jnbwidgets-svg">
            {showGrid && GRID_LINES.map(y => (
              <line key={y} x1={0} y1={y} x2={W} y2={y} stroke="#21262d" strokeWidth="1" />
            ))}
            {showGrid && [60, 150, 240].map(x => (
              <line key={x} x1={x} y1={0} x2={x} y2={H} stroke="#21262d" strokeWidth="1" />
            ))}
            <line x1={0} y1={CY} x2={W} y2={CY} stroke="#30363d" strokeWidth="1.5" />
            <polyline points={polyline} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
            <text x={6} y={14} fill="#6b7785" fontSize="10">{fn}(x)</text>
          </svg>
        </div>
      </div>

      <pre className="jnbwidgets-code">{code}</pre>
    </div>
  );
}

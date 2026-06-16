import { useState } from 'react';
import './visual.css';

const W = 320, H = 220, PAD = 30;
const X_MIN = -3, X_MAX = 3, Y_MIN = -0.5, Y_MAX = 9.5;

function toSVG(x, y) {
  const sx = PAD + ((x - X_MIN) / (X_MAX - X_MIN)) * (W - PAD * 2);
  const sy = H - PAD - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * (H - PAD * 2);
  return { sx, sy };
}

export default function MfDerivativeVisualization() {
  const [px, setPx] = useState(1);
  const f = x => x * x;
  const slope = 2 * px;
  const py = f(px);

  const pts = [];
  for (let x = X_MIN; x <= X_MAX; x += 0.08) {
    const { sx, sy } = toSVG(x, f(x));
    pts.push(`${sx},${sy}`);
  }

  const tanLen = 1.5;
  const { sx: tx1, sy: ty1 } = toSVG(px - tanLen, py - slope * tanLen);
  const { sx: tx2, sy: ty2 } = toSVG(px + tanLen, py + slope * tanLen);
  const { sx: pcx, sy: pcy } = toSVG(px, py);

  return (
    <div className="mfderiv-root">
      <h3 className="mfderiv-title">Derivative — f(x) = x²</h3>
      <div className="mfderiv-body">
        <svg width={W} height={H} className="mfderiv-svg">
          <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#30363d" />
          <line x1={PAD + (W - PAD * 2) / 2} y1={PAD} x2={PAD + (W - PAD * 2) / 2} y2={H - PAD} stroke="#30363d" />
          <polyline points={pts.join(' ')} fill="none" stroke="#58a6ff" strokeWidth="2" />
          <line x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke="#f97316" strokeWidth="1.8" strokeDasharray="5,3" />
          <circle cx={pcx} cy={pcy} r={5} fill="#56d364" />
          <text x={pcx + 7} y={pcy - 5} fill="#56d364" fontSize="11">({px}, {py})</text>
        </svg>

        <div className="mfderiv-panel">
          <div className="mfderiv-row">
            <span className="mfderiv-label">x</span>
            <input type="range" min={-2.5} max={2.5} step={0.5} value={px}
              onChange={e => setPx(Number(e.target.value))}
              className="mfderiv-slider" />
            <span className="mfderiv-val">{px}</span>
          </div>
          <div className="mfderiv-stats">
            <div className="mfderiv-stat"><span>f(x)</span><b>{py.toFixed(2)}</b></div>
            <div className="mfderiv-stat"><span>f′(x) = 2x</span><b style={{ color: '#f97316' }}>{slope.toFixed(2)}</b></div>
          </div>
          <div className="mfderiv-note">
            The <span style={{ color: '#f97316' }}>orange line</span> is the tangent — its slope equals f′(x).
          </div>
        </div>
      </div>
    </div>
  );
}

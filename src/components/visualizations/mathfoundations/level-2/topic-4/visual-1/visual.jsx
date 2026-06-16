import { useState, useEffect } from 'react';
import './visual.css';

const LR_OPTIONS = { Small: 0.05, Medium: 0.2, Large: 0.6 };
const W = 320, H = 180, PAD = 20;
const X_MIN = -3, X_MAX = 3;

function f(x) { return x * x; }
function df(x) { return 2 * x; }
function toSVG(x, y) {
  const sx = PAD + ((x - X_MIN) / (X_MAX - X_MIN)) * (W - PAD * 2);
  const sy = H - PAD - (y / 9) * (H - PAD * 2);
  return { sx, sy: Math.max(PAD, Math.min(H - PAD, sy)) };
}

export default function MfGradientDescentVisualization() {
  const [lr, setLr] = useState('Medium');
  const [pos, setPos] = useState(-2.5);
  const [history, setHistory] = useState([-2.5]);
  const [converged, setConverged] = useState(false);

  const step = () => {
    if (converged) return;
    const newPos = pos - LR_OPTIONS[lr] * df(pos);
    const clamped = Math.max(-3, Math.min(3, newPos));
    setPos(clamped);
    setHistory(h => [...h, clamped]);
    if (Math.abs(clamped) < 0.05) setConverged(true);
  };

  const reset = () => { setPos(-2.5); setHistory([-2.5]); setConverged(false); };

  useEffect(() => { reset(); }, [lr]);

  const curvePts = [];
  for (let x = X_MIN; x <= X_MAX; x += 0.1) {
    const { sx, sy } = toSVG(x, f(x));
    curvePts.push(`${sx},${sy}`);
  }

  const { sx: pcx, sy: pcy } = toSVG(pos, f(pos));

  return (
    <div className="mfgd-root">
      <h3 className="mfgd-title">Gradient Descent</h3>
      <div className="mfgd-lr-row">
        <span className="mfgd-lr-label">Learning Rate:</span>
        {Object.keys(LR_OPTIONS).map(k => (
          <button key={k} onClick={() => setLr(k)}
            className={`mfgd-lr-btn ${lr === k ? 'mfgd-lr-active' : ''}`}>
            {k} ({LR_OPTIONS[k]})
          </button>
        ))}
      </div>

      <svg width={W} height={H} className="mfgd-svg">
        <polyline points={curvePts.join(' ')} fill="none" stroke="#58a6ff" strokeWidth="2" />
        {history.slice(-6).map((x, i, arr) => {
          if (i === arr.length - 1) return null;
          const { sx: x1, sy: y1 } = toSVG(x, f(x));
          const { sx: x2, sy: y2 } = toSVG(arr[i + 1], f(arr[i + 1]));
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#a78bfa" strokeWidth="1.2" strokeDasharray="3,2" />;
        })}
        <circle cx={pcx} cy={pcy} r={6} fill="#56d364" />
        <text x={pcx + 8} y={pcy - 4} fill="#56d364" fontSize="10">({pos.toFixed(2)}, {f(pos).toFixed(2)})</text>
      </svg>

      <div className="mfgd-controls">
        <button className="mfgd-btn" onClick={step} disabled={converged}>Step →</button>
        <button className="mfgd-btn mfgd-btn-reset" onClick={reset}>Reset</button>
        <span className="mfgd-steps">Steps: {history.length - 1}</span>
      </div>

      <div className="mfgd-status">
        {converged
          ? <span className="mfgd-converged">Converged at x ≈ {pos.toFixed(3)} (minimum!)</span>
          : <span>Gradient at x={pos.toFixed(2)}: f′(x) = <b style={{ color: '#f97316' }}>{df(pos).toFixed(2)}</b></span>
        }
      </div>
    </div>
  );
}

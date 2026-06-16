import { useState } from 'react';
import './visual.css';

const W = 280, H = 120, CX = 140, CY = 60, SCALE = 22;

export default function MfDotProductVisualization() {
  const [a, setA] = useState([2, 3]);
  const [b, setB] = useState([4, 1]);

  const dot = a[0] * b[0] + a[1] * b[1];
  const magA = Math.sqrt(a[0] ** 2 + a[1] ** 2);
  const magB = Math.sqrt(b[0] ** 2 + b[1] ** 2);
  const cosTheta = magA && magB ? (dot / (magA * magB)).toFixed(3) : 0;
  const theta = (Math.acos(Math.min(1, Math.max(-1, cosTheta))) * 180 / Math.PI).toFixed(1);

  const ax = CX + a[0] * SCALE, ay = CY - a[1] * SCALE;
  const bx = CX + b[0] * SCALE, by = CY - b[1] * SCALE;

  const adj = (vec, idx, delta) => {
    const n = [...vec]; n[idx] = Math.min(4, Math.max(-4, n[idx] + delta));
    return n;
  };

  return (
    <div className="mfdot-root">
      <h3 className="mfdot-title">Dot Product</h3>
      <div className="mfdot-body">
        <div className="mfdot-left">
          <div className="mfdot-vec-row">
            <span className="mfdot-vec-label" style={{ color: '#58a6ff' }}>a</span>
            {a.map((v, i) => (
              <div key={i} className="mfdot-cell-group">
                <button onClick={() => setA(adj(a, i, -1))}>−</button>
                <span className="mfdot-val">{v}</span>
                <button onClick={() => setA(adj(a, i, 1))}>+</button>
              </div>
            ))}
          </div>
          <div className="mfdot-vec-row">
            <span className="mfdot-vec-label" style={{ color: '#a78bfa' }}>b</span>
            {b.map((v, i) => (
              <div key={i} className="mfdot-cell-group">
                <button onClick={() => setB(adj(b, i, -1))}>−</button>
                <span className="mfdot-val">{v}</span>
                <button onClick={() => setB(adj(b, i, 1))}>+</button>
              </div>
            ))}
          </div>
          <div className="mfdot-steps">
            <div className="mfdot-step">a · b = ({a[0]} × {b[0]}) + ({a[1]} × {b[1]})</div>
            <div className="mfdot-step">= {a[0] * b[0]} + {a[1] * b[1]}</div>
            <div className="mfdot-result">= <b>{dot}</b></div>
          </div>
          <div className="mfdot-geo">
            <span className="mfdot-geo-label">Angle θ = {theta}°</span>
            <span className="mfdot-geo-label">cos θ = {cosTheta}</span>
          </div>
        </div>

        <svg width={W} height={H} className="mfdot-svg">
          <line x1={0} y1={CY} x2={W} y2={CY} stroke="#30363d" />
          <line x1={CX} y1={0} x2={CX} y2={H} stroke="#30363d" />
          <line x1={CX} y1={CY} x2={ax} y2={ay} stroke="#58a6ff" strokeWidth="2.5" />
          <polygon points={`${ax},${ay} ${ax - 5},${ay + 5} ${ax + 5},${ay + 5}`} fill="#58a6ff"
            transform={`rotate(${-Math.atan2(a[1], a[0]) * 180 / Math.PI}, ${ax}, ${ay})`} />
          <line x1={CX} y1={CY} x2={bx} y2={by} stroke="#a78bfa" strokeWidth="2.5" />
          <polygon points={`${bx},${by} ${bx - 5},${by + 5} ${bx + 5},${by + 5}`} fill="#a78bfa"
            transform={`rotate(${-Math.atan2(b[1], b[0]) * 180 / Math.PI}, ${bx}, ${by})`} />
          <text x={ax + 5} y={ay - 3} fill="#58a6ff" fontSize="10">a</text>
          <text x={bx + 5} y={by - 3} fill="#a78bfa" fontSize="10">b</text>
        </svg>
      </div>
    </div>
  );
}

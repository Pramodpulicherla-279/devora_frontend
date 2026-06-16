import { useState } from 'react';
import './visual.css';

const W = 280, H = 280, CX = 140, CY = 140, SCALE = 22;

function toSVG(x, y) {
  return { sx: CX + x * SCALE, sy: CY - y * SCALE };
}

export default function MfVectorsVisualization() {
  const [vx, setVx] = useState(3);
  const [vy, setVy] = useState(4);

  const mag = Math.sqrt(vx * vx + vy * vy).toFixed(2);
  const angle = ((Math.atan2(vy, vx) * 180) / Math.PI).toFixed(1);
  const { sx, sy } = toSVG(vx, vy);
  const ticks = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];

  return (
    <div className="mfvec-root">
      <h3 className="mfvec-title">Vector Explorer</h3>
      <div className="mfvec-body">
        <svg width={W} height={H} className="mfvec-svg">
          {ticks.map(t => {
            const { sx: tx } = toSVG(t, 0);
            const { sy: ty } = toSVG(0, t);
            return (
              <g key={t}>
                <line x1={tx} y1={CY - 3} x2={tx} y2={CY + 3} stroke="#30363d" strokeWidth="1" />
                <line x1={CX - 3} y1={ty} x2={CX + 3} y2={ty} stroke="#30363d" strokeWidth="1" />
              </g>
            );
          })}
          <line x1={0} y1={CY} x2={W} y2={CY} stroke="#30363d" strokeWidth="1" />
          <line x1={CX} y1={0} x2={CX} y2={H} stroke="#30363d" strokeWidth="1" />
          <text x={W - 6} y={CY - 4} fill="#6b7785" fontSize="10" textAnchor="end">x</text>
          <text x={CX + 4} y={10} fill="#6b7785" fontSize="10">y</text>

          <line x1={CX} y1={CY} x2={sx} y2={sy} stroke="#58a6ff" strokeWidth="2.5" />
          <polygon
            points={`${sx},${sy} ${sx - 6},${sy + 6} ${sx + 6},${sy + 6}`}
            fill="#58a6ff"
            transform={`rotate(${-parseFloat(angle)}, ${sx}, ${sy})`}
          />
          <text x={sx + 6} y={sy - 4} fill="#58a6ff" fontSize="11">({vx}, {vy})</text>
        </svg>

        <div className="mfvec-controls">
          <div className="mfvec-control-row">
            <span className="mfvec-label">x =&nbsp;<b>{vx}</b></span>
            <div className="mfvec-btn-group">
              <button onClick={() => setVx(v => Math.max(-5, v - 1))}>−</button>
              <button onClick={() => setVx(v => Math.min(5, v + 1))}>+</button>
            </div>
          </div>
          <div className="mfvec-control-row">
            <span className="mfvec-label">y =&nbsp;<b>{vy}</b></span>
            <div className="mfvec-btn-group">
              <button onClick={() => setVy(v => Math.max(-5, v - 1))}>−</button>
              <button onClick={() => setVy(v => Math.min(5, v + 1))}>+</button>
            </div>
          </div>
          <div className="mfvec-stats">
            <div className="mfvec-stat"><span>Magnitude</span><b>|v| = {mag}</b></div>
            <div className="mfvec-stat"><span>Direction</span><b>θ = {angle}°</b></div>
            <div className="mfvec-stat"><span>Formula</span><b>√(x²+y²)</b></div>
          </div>
        </div>
      </div>
    </div>
  );
}

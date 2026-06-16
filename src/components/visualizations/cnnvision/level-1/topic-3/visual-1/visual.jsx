import { useState } from 'react';
import './visual.css';

const MAP = [
  [3, 7, 2, 5],
  [1, 4, 8, 6],
  [9, 2, 4, 1],
  [3, 6, 5, 8],
];

function maxPool(r, c) { return Math.max(MAP[r][c], MAP[r][c+1], MAP[r+1][c], MAP[r+1][c+1]); }
function avgPool(r, c) { return ((MAP[r][c] + MAP[r][c+1] + MAP[r+1][c] + MAP[r+1][c+1]) / 4).toFixed(1); }

const regions = [[0,0],[0,2],[2,0],[2,2]];

export default function CnnPoolingVisualization() {
  const [mode, setMode] = useState('max');
  const [hover, setHover] = useState(null);

  const CELL = 36;

  return (
    <div className="cnnpool-wrap">
      <h3 className="cnnpool-title">Pooling Layers</h3>

      <div className="cnnpool-tabs">
        <button className={`cnnpool-tab ${mode==='max'?'cnnpool-tab--active':''}`} onClick={() => setMode('max')}>Max Pooling</button>
        <button className={`cnnpool-tab ${mode==='avg'?'cnnpool-tab--active':''}`} onClick={() => setMode('avg')}>Avg Pooling</button>
      </div>

      <div className="cnnpool-layout">
        <div className="cnnpool-panel">
          <div className="cnnpool-panel-label">4×4 Feature Map</div>
          <svg viewBox="0 0 150 150" width={150} height={150}>
            {MAP.map((row, r) =>
              row.map((v, c) => {
                const regionIdx = regions.findIndex(([rr,cc]) => r>=rr && r<rr+2 && c>=cc && c<cc+2);
                const colors = ['#1d3a5c','#1a2744','#1d3d1d','#2d1a44'];
                const isHov = hover === regionIdx;
                const isWinner = mode === 'max' && hover !== null && (() => {
                  const [rr,cc] = regions[regionIdx];
                  const mx = maxPool(rr,cc);
                  return v === mx && r>=rr && r<rr+2 && c>=cc && c<cc+2;
                })();
                return (
                  <g key={`${r}-${c}`}
                    onMouseEnter={() => setHover(regionIdx)}
                    onMouseLeave={() => setHover(null)}
                    style={{cursor:'pointer'}}>
                    <rect x={c*CELL+3} y={r*CELL+3} width={CELL-2} height={CELL-2} rx={4}
                      fill={isWinner ? '#1d5c2d' : isHov ? colors[regionIdx] : '#161b22'}
                      stroke={isHov ? '#58a6ff' : '#30363d'}
                      strokeWidth={isHov ? 2 : 1}/>
                    <text x={c*CELL+CELL/2+2} y={r*CELL+CELL/2+6} textAnchor="middle"
                      fontSize={13} fill={isWinner ? '#56d364' : '#e6edf3'} fontWeight={isWinner?'bold':'normal'}>{v}</text>
                  </g>
                );
              })
            )}
            {regions.map(([rr,cc], i) => {
              const clrs = ['#58a6ff','#a78bfa','#56d364','#f97316'];
              return <rect key={i} x={cc*CELL+3} y={rr*CELL+3} width={CELL*2-2} height={CELL*2-2}
                fill="none" stroke={clrs[i]} strokeWidth={2.5} rx={5} strokeDasharray={i===hover?'none':'6 3'}/>;
            })}
          </svg>
          <div className="cnnpool-hint">Hover a region to inspect</div>
        </div>

        <div className="cnnpool-arrow">→</div>

        <div className="cnnpool-panel">
          <div className="cnnpool-panel-label">2×2 Output ({mode === 'max' ? 'Max' : 'Avg'})</div>
          <svg viewBox="0 0 80 80" width={80} height={80}>
            {regions.map(([rr,cc], i) => {
              const val = mode === 'max' ? maxPool(rr,cc) : avgPool(rr,cc);
              const clrs = ['#58a6ff','#a78bfa','#56d364','#f97316'];
              const or = i < 2 ? 0 : 1;
              const oc = i % 2;
              return (
                <g key={i}>
                  <rect x={oc*38+2} y={or*38+2} width={34} height={34} rx={5}
                    fill={hover===i ? '#1d3a5c' : '#161b22'}
                    stroke={clrs[i]} strokeWidth={2}/>
                  <text x={oc*38+19} y={or*38+23} textAnchor="middle" fontSize={13}
                    fill={clrs[i]} fontWeight="bold">{val}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="cnnpool-info">
        <div className="cnnpool-info-item">
          <span className="cnnpool-info-key">Spatial reduction</span>
          <span className="cnnpool-info-val">4×4 → 2×2 (2× smaller each dim)</span>
        </div>
        <div className="cnnpool-info-item">
          <span className="cnnpool-info-key">{mode === 'max' ? 'Max pooling' : 'Avg pooling'}</span>
          <span className="cnnpool-info-val">{mode === 'max' ? 'Keeps strongest activation' : 'Averages all activations'}</span>
        </div>
      </div>
    </div>
  );
}

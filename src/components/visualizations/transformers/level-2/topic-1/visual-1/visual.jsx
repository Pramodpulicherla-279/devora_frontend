import { useState } from 'react';
import './visual.css';

const POSITIONS = 20;
const DIMS = 24;

function peValue(pos, dim) {
  if (dim % 2 === 0) return Math.sin(pos / Math.pow(10000, dim / DIMS));
  return Math.cos(pos / Math.pow(10000, (dim - 1) / DIMS));
}

function valToColor(v) {
  const t = (v + 1) / 2;
  const r = Math.round(t * 0x81 + (1 - t) * 0x1e);
  const g = Math.round(t * 0x8c + (1 - t) * 0x26);
  const b = Math.round(t * 0xf8 + (1 - t) * 0x3d);
  return `rgb(${r},${g},${b})`;
}

export default function TrPosEncodingVisualization() {
  const [hoverPos, setHoverPos] = useState(null);
  const [hoverDim, setHoverDim] = useState(null);
  const [showInfo, setShowInfo] = useState('why');

  const cellW = 18, cellH = 14;
  const svgW = DIMS * cellW + 60;
  const svgH = POSITIONS * cellH + 44;

  const INFO = {
    why: 'Transformers process all tokens simultaneously (no recurrence). Without positional encoding, the model sees a bag of tokens with no order. Adding PE gives each position a unique "fingerprint."',
    sin: 'Even dimensions use sin(pos/10000^(2i/d)). This produces smooth wave patterns that generalize to longer sequences than seen during training.',
    cos: 'Odd dimensions use cos(). Combined with sin, any relative offset can be expressed as a linear transformation of the encoding — enabling relative position reasoning.',
  };

  return (
    <div className="trpe-wrap">
      <h3 className="trpe-title">Sinusoidal Positional Encoding</h3>
      <p className="trpe-sub">Each position gets a unique pattern across all embedding dimensions</p>

      <div className="trpe-heatmap-box">
        <div className="trpe-axis-label trpe-axis-y">Position (0–{POSITIONS - 1})</div>
        <div className="trpe-heatmap-inner">
          <div className="trpe-axis-label trpe-axis-x">Dimension (0–{DIMS - 1})</div>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="trpe-svg"
            onMouseLeave={() => { setHoverPos(null); setHoverDim(null); }}>
            {Array.from({ length: POSITIONS }, (_, p) =>
              Array.from({ length: DIMS }, (_, d) => {
                const v = peValue(p, d);
                const isHP = hoverPos === p;
                const isHD = hoverDim === d;
                return (
                  <rect key={`${p}-${d}`}
                    x={60 + d * cellW} y={20 + p * cellH}
                    width={cellW - 1} height={cellH - 1}
                    rx={1}
                    fill={valToColor(v)}
                    opacity={hoverPos !== null || hoverDim !== null ? (isHP || isHD ? 1 : 0.25) : 0.9}
                    onMouseEnter={() => { setHoverPos(p); setHoverDim(d); }}
                    style={{ cursor: 'crosshair' }}
                  />
                );
              })
            )}
            {/* Axis ticks */}
            {[0, 5, 10, 15, 19].map(p => (
              <text key={p} x={54} y={20 + p * cellH + cellH / 2 + 3}
                textAnchor="end" fill="#6b7785" fontSize="8">{p}</text>
            ))}
            {[0, 8, 16, 23].map(d => (
              <text key={d} x={60 + d * cellW + cellW / 2} y={16}
                textAnchor="middle" fill="#6b7785" fontSize="8">{d}</text>
            ))}
          </svg>
        </div>
      </div>

      {hoverPos !== null && hoverDim !== null && (
        <div className="trpe-tooltip">
          pos={hoverPos}, dim={hoverDim} → {peValue(hoverPos, hoverDim).toFixed(4)}
          &nbsp;({hoverDim % 2 === 0 ? 'sin' : 'cos'} wave)
        </div>
      )}

      <div className="trpe-tabs">
        {Object.keys(INFO).map(k => (
          <button key={k} className={`trpe-tab ${showInfo === k ? 'trpe-tab-active' : ''}`}
            onClick={() => setShowInfo(k)}>
            {k === 'why' ? 'Why PE?' : k === 'sin' ? 'Sin dims' : 'Cos dims'}
          </button>
        ))}
      </div>
      <div className="trpe-info">{INFO[showInfo]}</div>

      <div className="trpe-legend">
        <div className="trpe-legend-bar" />
        <div className="trpe-legend-labels">
          <span>-1.0</span><span>0</span><span>+1.0</span>
        </div>
      </div>
    </div>
  );
}

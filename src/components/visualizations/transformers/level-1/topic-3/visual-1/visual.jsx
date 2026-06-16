import { useState } from 'react';
import './visual.css';

const TOKENS = ['The', 'bank', 'can', 'guarantee', 'deposits'];
const WEIGHTS = [
  [0.40, 0.30, 0.10, 0.10, 0.10],
  [0.05, 0.50, 0.05, 0.20, 0.20],
  [0.10, 0.15, 0.45, 0.20, 0.10],
  [0.05, 0.25, 0.10, 0.45, 0.15],
  [0.05, 0.20, 0.10, 0.20, 0.45],
];

function lerp(a, b, t) { return a + (b - a) * t; }
function wToColor(w) {
  const r = Math.round(lerp(0x0d, 0x81, w));
  const g = Math.round(lerp(0x11, 0x8c, w * 0.5));
  const b = Math.round(lerp(0x17, 0xf8, w));
  return `rgb(${r},${g},${b})`;
}

const STEP_INFO = {
  query: 'Query (Q): "What am I looking for?" — derived from the current token',
  key: 'Key (K): "What do I contain?" — each token broadcasts its identity',
  value: 'Value (V): "What do I share?" — the actual content to aggregate',
};

export default function TrAttentionVisualization() {
  const [selected, setSelected] = useState(1);
  const [qkvStep, setQkvStep] = useState('query');

  const weights = WEIGHTS[selected];
  const Y = 80;
  const XS = TOKENS.map((_, i) => 30 + i * 58);

  return (
    <div className="tratt-wrap">
      <h3 className="tratt-title">The Attention Mechanism</h3>
      <p className="tratt-sub">Click a token to see how much it attends to every other token</p>

      <div className="tratt-svg-wrap">
        <svg viewBox="0 0 320 160" className="tratt-svg">
          {/* Connection lines */}
          {TOKENS.map((_, i) => {
            if (i === selected) return null;
            const w = weights[i];
            return (
              <line key={i}
                x1={XS[selected]} y1={Y}
                x2={XS[i]} y2={Y}
                stroke={wToColor(w)}
                strokeWidth={Math.max(0.5, w * 7)}
                opacity={0.8}
              />
            );
          })}

          {/* Weight labels */}
          {TOKENS.map((_, i) => {
            const w = weights[i];
            const mx = (XS[selected] + XS[i]) / 2;
            if (i === selected) return null;
            return (
              <text key={i} x={mx} y={Y - 10}
                textAnchor="middle" fill={wToColor(w)} fontSize="8" fontWeight="600">
                {(w * 100).toFixed(0)}%
              </text>
            );
          })}

          {/* Token circles */}
          {TOKENS.map((tok, i) => {
            const isActive = i === selected;
            const w = weights[i];
            return (
              <g key={i} onClick={() => setSelected(i)} style={{ cursor: 'pointer' }}>
                <circle cx={XS[i]} cy={Y} r={isActive ? 20 : 16}
                  fill={isActive ? '#818cf8' : wToColor(w)}
                  stroke={isActive ? '#a78bfa' : 'transparent'}
                  strokeWidth={2}
                  opacity={isActive ? 1 : 0.65 + w * 0.35}
                />
                <text x={XS[i]} y={Y + 4} textAnchor="middle"
                  fill="#fff" fontSize={isActive ? 9 : 8} fontWeight={isActive ? 700 : 500}>
                  {tok}
                </text>
                <text x={XS[i]} y={Y + 26} textAnchor="middle"
                  fill="#a3adbb" fontSize="8">pos {i}</text>
              </g>
            );
          })}

          <text x="160" y="148" textAnchor="middle" fill="#6b7785" fontSize="8">
            Attention weights sum to 1.0 (softmax)
          </text>
        </svg>
      </div>

      <div className="tratt-qkv">
        <p className="tratt-qkv-label">Query → Key → Value pipeline</p>
        <div className="tratt-qkv-tabs">
          {Object.keys(STEP_INFO).map(k => (
            <button key={k} className={`tratt-qkv-tab ${qkvStep === k ? 'tratt-qkv-tab-active' : ''}`}
              onClick={() => setQkvStep(k)}>
              {k.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="tratt-qkv-desc">{STEP_INFO[qkvStep]}</div>
      </div>

      <div className="tratt-formula">
        <span className="tratt-formula-text">Attention(Q,K,V) = softmax(</span>
        <span className="tratt-formula-frac">QK<sup>T</sup><hr />√d<sub>k</sub></span>
        <span className="tratt-formula-text">) V</span>
      </div>
    </div>
  );
}

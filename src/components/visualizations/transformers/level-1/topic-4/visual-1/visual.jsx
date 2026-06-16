import { useState } from 'react';
import './visual.css';

const TOKENS = ['She', 'saw', 'the', 'man', 'with', 'telescope'];
const HEADS = [
  {
    label: 'Head 1 — Syntactic',
    color: '#58a6ff',
    desc: 'Tracks grammatical relationships: subject-verb, noun-modifier.',
    weights: [
      [0.5, 0.3, 0.1, 0.05, 0.03, 0.02],
      [0.3, 0.4, 0.1, 0.1, 0.05, 0.05],
      [0.1, 0.1, 0.5, 0.2, 0.05, 0.05],
      [0.05, 0.1, 0.2, 0.45, 0.1, 0.1],
      [0.03, 0.05, 0.05, 0.1, 0.5, 0.27],
      [0.02, 0.05, 0.05, 0.1, 0.27, 0.51],
    ],
  },
  {
    label: 'Head 2 — Semantic',
    color: '#818cf8',
    desc: 'Captures semantic similarity: who does what, object-action binding.',
    weights: [
      [0.4, 0.1, 0.05, 0.1, 0.05, 0.3],
      [0.1, 0.35, 0.05, 0.3, 0.05, 0.15],
      [0.05, 0.05, 0.5, 0.15, 0.1, 0.15],
      [0.1, 0.3, 0.15, 0.25, 0.1, 0.1],
      [0.05, 0.05, 0.1, 0.1, 0.4, 0.3],
      [0.3, 0.15, 0.15, 0.1, 0.3, 0.0],
    ],
  },
  {
    label: 'Head 3 — Positional',
    color: '#a78bfa',
    desc: 'Attends to nearby positions — captures local context and word order.',
    weights: [
      [0.5, 0.4, 0.05, 0.02, 0.02, 0.01],
      [0.35, 0.4, 0.2, 0.03, 0.01, 0.01],
      [0.05, 0.2, 0.5, 0.2, 0.04, 0.01],
      [0.02, 0.03, 0.2, 0.5, 0.2, 0.05],
      [0.01, 0.01, 0.04, 0.2, 0.5, 0.24],
      [0.01, 0.01, 0.01, 0.05, 0.24, 0.68],
    ],
  },
];

export default function TrMultiHeadVisualization() {
  const [activeHead, setActiveHead] = useState(0);
  const [focusRow, setFocusRow] = useState(null);

  const head = HEADS[activeHead];
  const cellSize = 36;
  const pad = 8;

  return (
    <div className="trmha-wrap">
      <h3 className="trmha-title">Multi-Head Attention</h3>
      <p className="trmha-sub">Multiple heads each learn to attend to different relationships simultaneously</p>

      <div className="trmha-head-tabs">
        {HEADS.map((h, i) => (
          <button key={i}
            className={`trmha-head-tab ${activeHead === i ? 'trmha-head-tab-active' : ''}`}
            style={activeHead === i ? { borderColor: h.color, color: h.color, background: h.color + '18' } : {}}
            onClick={() => { setActiveHead(i); setFocusRow(null); }}>
            H{i + 1}
          </button>
        ))}
      </div>

      <div className="trmha-head-desc" style={{ borderLeftColor: head.color }}>
        <strong style={{ color: head.color }}>{head.label}</strong>
        <span className="trmha-muted"> — {head.desc}</span>
      </div>

      <div className="trmha-heatmap-wrap">
        <svg viewBox={`0 0 ${6 * cellSize + 80 + pad} ${6 * cellSize + 60 + pad}`} className="trmha-svg">
          {/* Column labels */}
          {TOKENS.map((tok, c) => (
            <text key={c} x={80 + c * cellSize + cellSize / 2} y={28}
              textAnchor="middle" fill="#a3adbb" fontSize="9" fontWeight="500">{tok}</text>
          ))}
          {/* Row labels + cells */}
          {TOKENS.map((tok, r) => (
            <g key={r} onClick={() => setFocusRow(focusRow === r ? null : r)} style={{ cursor: 'pointer' }}>
              <text x={74} y={60 + r * cellSize + cellSize / 2 + 4}
                textAnchor="end" fill={focusRow === r ? head.color : '#a3adbb'} fontSize="9">{tok}</text>
              {TOKENS.map((_, c) => {
                const w = head.weights[r][c];
                const alpha = focusRow === null ? w : (focusRow === r ? w : w * 0.15);
                return (
                  <rect key={c}
                    x={80 + c * cellSize + 2}
                    y={60 + r * cellSize + 2}
                    width={cellSize - 4}
                    height={cellSize - 4}
                    rx={4}
                    fill={head.color}
                    opacity={alpha}
                  />
                );
              })}
            </g>
          ))}
          <text x={80 + 3 * cellSize} y={6 * cellSize + 74} textAnchor="middle" fill="#6b7785" fontSize="8">
            Click a row to focus · darker = stronger attention
          </text>
        </svg>
      </div>

      <div className="trmha-concat-note">
        <span className="trmha-concat-icon">→</span>
        All 3 head outputs are <strong>concatenated</strong> then projected → final representation captures syntax + semantics + position simultaneously
      </div>
    </div>
  );
}

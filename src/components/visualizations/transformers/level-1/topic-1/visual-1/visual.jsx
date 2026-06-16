import { useState } from 'react';
import './visual.css';

const TOKENS = ['The', 'cat', 'sat', 'on', 'the', 'mat'];
const PIXELS = Array.from({ length: 6 }, (_, r) =>
  Array.from({ length: 6 }, (_, c) => {
    const v = Math.round(30 + Math.sin(r * 1.2 + c * 0.8) * 80 + Math.cos(r + c * 1.5) * 50);
    return Math.max(20, Math.min(220, v));
  })
);

export default function TrSeqVisualization() {
  const [activeToken, setActiveToken] = useState(null);
  const [showDep, setShowDep] = useState(false);

  const deps = { 1: [0, 4], 2: [1], 4: [0], 5: [2, 4] };

  return (
    <div className="trseq-wrap">
      <h3 className="trseq-title">Images vs. Sequences</h3>
      <p className="trseq-sub">Two fundamentally different ways data can be structured</p>

      <div className="trseq-panels">
        <div className="trseq-panel">
          <div className="trseq-panel-label">Image Data (Spatial Grid)</div>
          <svg viewBox="0 0 180 180" className="trseq-svg">
            {PIXELS.map((row, r) =>
              row.map((val, c) => (
                <rect
                  key={`${r}-${c}`}
                  x={c * 28 + 6} y={r * 28 + 6}
                  width={24} height={24}
                  rx={3}
                  fill={`rgb(${val},${Math.round(val * 0.6)},${Math.round(val * 1.2)})`}
                  opacity={0.85}
                />
              ))
            )}
            <text x="90" y="176" textAnchor="middle" fill="#6b7785" fontSize="9">6×6 pixel grid — no inherent order</text>
          </svg>
          <div className="trseq-badge trseq-badge-blue">CNNs excel here</div>
        </div>

        <div className="trseq-panel">
          <div className="trseq-panel-label">Sequence Data (Tokens)</div>
          <svg viewBox="0 0 300 180" className="trseq-svg">
            {TOKENS.map((tok, i) => {
              const x = i * 46 + 14;
              const isActive = activeToken === i;
              const isDep = activeToken !== null && deps[activeToken]?.includes(i);
              return (
                <g key={i} onClick={() => setActiveToken(isActive ? null : i)} style={{ cursor: 'pointer' }}>
                  <rect x={x} y={60} width={38} height={28} rx={6}
                    fill={isActive ? '#818cf8' : isDep ? '#a78bfa44' : '#21262d'}
                    stroke={isActive ? '#818cf8' : isDep ? '#a78bfa' : '#30363d'}
                    strokeWidth={isActive ? 2 : 1} />
                  <text x={x + 19} y={79} textAnchor="middle" fill={isActive ? '#fff' : '#e6edf3'} fontSize="10" fontWeight={isActive ? 700 : 400}>{tok}</text>
                  <text x={x + 19} y={106} textAnchor="middle" fill="#6b7785" fontSize="8">{i}</text>
                </g>
              );
            })}
            {showDep && activeToken !== null && deps[activeToken]?.map(d => {
              const x1 = activeToken * 46 + 33, x2 = d * 46 + 33;
              return (
                <line key={d} x1={x1} y1={60} x2={x2} y2={60}
                  stroke="#a78bfa" strokeWidth={2} strokeDasharray="4 2" markerEnd="url(#arr)" />
              );
            })}
            <defs>
              <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#a78bfa" />
              </marker>
            </defs>
            <text x="150" y="130" textAnchor="middle" fill="#6b7785" fontSize="9">Position matters — order encodes meaning</text>
            <text x="150" y="145" textAnchor="middle" fill="#6b7785" fontSize="9">Click a token to highlight it</text>
          </svg>
          <div className="trseq-badge trseq-badge-violet">Transformers excel here</div>
        </div>
      </div>

      <div className="trseq-facts">
        <div className="trseq-fact">
          <span className="trseq-fact-icon">↔</span>
          <div><strong>Long-range dependencies</strong><br /><span className="trseq-muted">"The cat... it" — pronoun refers to noun 10 words away</span></div>
        </div>
        <div className="trseq-fact">
          <span className="trseq-fact-icon">#</span>
          <div><strong>Position matters</strong><br /><span className="trseq-muted">"Dog bites man" ≠ "Man bites dog" — same tokens, different meaning</span></div>
        </div>
        <div className="trseq-fact">
          <span className="trseq-fact-icon">∞</span>
          <div><strong>Variable length</strong><br /><span className="trseq-muted">Sentences can be 3 or 300 tokens — models must handle both</span></div>
        </div>
      </div>

      <button className="trseq-btn" onClick={() => setShowDep(s => !s)}>
        {showDep ? 'Hide' : 'Show'} dependencies
      </button>
    </div>
  );
}

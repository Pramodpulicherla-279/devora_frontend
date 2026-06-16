import { useState } from 'react';
import './visual.css';

const TOKENS = ['The', 'cat', 'sat', 'on', 'mat'];
const COLORS = ['#56d364', '#58a6ff', '#818cf8', '#a78bfa', '#f97316'];

export default function TrRnnVisualization() {
  const [step, setStep] = useState(-1);
  const [showVanish, setShowVanish] = useState(false);

  const active = step;
  const processed = Math.min(step, TOKENS.length - 1);

  return (
    <div className="trrnn-wrap">
      <h3 className="trrnn-title">Recurrent Neural Networks (RNNs)</h3>
      <p className="trrnn-sub">Hidden state flows left-to-right, carrying context across timesteps</p>

      <div className="trrnn-svg-wrap">
        <svg viewBox="0 0 560 160" className="trrnn-svg">
          {/* Hidden state arrows between steps */}
          {TOKENS.map((_, i) => {
            if (i === 0) return null;
            const x1 = i * 100 - 10, x2 = i * 100 + 26;
            const fade = showVanish ? Math.max(0.08, 1 - i * 0.2) : 1;
            return (
              <g key={`arrow-${i}`}>
                <defs>
                  <marker id={`ah${i}`} markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
                    <path d="M0,0 L7,3.5 L0,7 Z" fill={`rgba(129,140,248,${fade})`} />
                  </marker>
                </defs>
                <line
                  x1={x1} y1={72} x2={x2} y2={72}
                  stroke={`rgba(129,140,248,${fade})`}
                  strokeWidth={showVanish ? 3 * fade + 0.5 : 2}
                  markerEnd={`url(#ah${i})`}
                />
                {showVanish && (
                  <text x={(x1 + x2) / 2} y={62} textAnchor="middle" fill={`rgba(163,173,187,${fade})`} fontSize="8">
                    ×{(1 - i * 0.18).toFixed(2)}
                  </text>
                )}
              </g>
            );
          })}

          {/* RNN cells */}
          {TOKENS.map((tok, i) => {
            const x = i * 100 + 26;
            const isActive = i === active;
            const isDone = i <= processed && step >= 0;
            return (
              <g key={i}>
                {/* Input arrow */}
                <line x1={x + 22} y1={140} x2={x + 22} y2={98}
                  stroke={isDone ? COLORS[i] : '#30363d'} strokeWidth={1.5} />
                <polygon
                  points={`${x + 18},98 ${x + 26},98 ${x + 22},92`}
                  fill={isDone ? COLORS[i] : '#30363d'} />

                {/* Cell box */}
                <rect x={x} y={44} width={44} height={44} rx={8}
                  fill={isActive ? '#818cf8' : isDone ? '#161b22' : '#0d1117'}
                  stroke={isActive ? '#818cf8' : isDone ? COLORS[i] : '#30363d'}
                  strokeWidth={isActive ? 2.5 : 1.5} />
                <text x={x + 22} y={70} textAnchor="middle"
                  fill={isActive ? '#fff' : isDone ? COLORS[i] : '#6b7785'}
                  fontSize="9" fontWeight="600">h{i}</text>

                {/* Token label */}
                <text x={x + 22} y={152} textAnchor="middle"
                  fill={isDone ? COLORS[i] : '#6b7785'} fontSize="10" fontWeight={isDone ? 600 : 400}>{tok}</text>
              </g>
            );
          })}

          {/* Output arrow from last processed */}
          {step >= 0 && (
            <line x1={processed * 100 + 48} y1={66} x2={processed * 100 + 60} y2={66}
              stroke="#56d364" strokeWidth={2} strokeDasharray="4 2" />
          )}
          {step >= TOKENS.length - 1 && (
            <g>
              <rect x={540} y={52} width={14} height={28} rx={3} fill="#56d36422" stroke="#56d364" strokeWidth={1} />
              <text x={547} y={70} textAnchor="middle" fill="#56d364" fontSize="7" fontWeight="600">OUT</text>
            </g>
          )}

          <text x="280" y="18" textAnchor="middle" fill="#6b7785" fontSize="9">
            {step < 0 ? 'Press Step → to process tokens one by one' : step >= TOKENS.length - 1 ? 'Complete — output generated from final hidden state' : `Processing "${TOKENS[active]}" at position ${active}`}
          </text>
        </svg>
      </div>

      <div className="trrnn-controls">
        <button className="trrnn-btn" onClick={() => setStep(-1)}>Reset</button>
        <button className="trrnn-btn trrnn-btn-primary"
          onClick={() => setStep(s => Math.min(s + 1, TOKENS.length - 1))}
          disabled={step >= TOKENS.length - 1}>
          Step →
        </button>
        <button className={`trrnn-btn ${showVanish ? 'trrnn-btn-warn' : ''}`}
          onClick={() => setShowVanish(s => !s)}>
          {showVanish ? 'Hide' : 'Show'} vanishing gradient
        </button>
      </div>

      {showVanish && (
        <div className="trrnn-warning">
          <strong>Vanishing Gradient Problem</strong> — gradients shrink exponentially as they flow back through time.
          Information from early tokens (e.g. "The") barely influences the final output.
          This is why plain RNNs struggle with long sequences — and why Transformers were invented.
        </div>
      )}

      <div className="trrnn-legend">
        <div className="trrnn-leg-item"><span className="trrnn-dot" style={{ background: '#818cf8' }} />Active cell</div>
        <div className="trrnn-leg-item"><span className="trrnn-dot" style={{ background: '#30363d' }} />Hidden state arrow</div>
        <div className="trrnn-leg-item"><span className="trrnn-dot" style={{ background: '#56d364' }} />Output</div>
      </div>
    </div>
  );
}

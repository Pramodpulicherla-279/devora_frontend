import { useState } from 'react';
import './visual.css';

const BLOCKS = [
  { id: 'input', label: 'Token Input', color: '#56d364', short: 'IN', desc: 'Raw text is split into tokens (subwords). Each token maps to an integer ID. E.g. "unbelievable" → ["un", "##believ", "##able"] → [2102, 14920, 3085].' },
  { id: 'embed', label: 'Embedding', color: '#58a6ff', short: 'EMB', desc: 'Token IDs map to dense vectors (d_model = 512 or 768). These learned embeddings place semantically similar words nearby in vector space.' },
  { id: 'pe', label: 'Positional Encoding', color: '#a78bfa', short: 'PE', desc: 'Since attention is order-agnostic, we add sinusoidal position vectors to each embedding. This injects information about where each token appears in the sequence.' },
  { id: 'mha', label: 'Multi-Head Attention', color: '#818cf8', short: 'MHA', desc: 'Each token attends to all others via Q·Kᵀ/√d_k softmax scoring. Multiple heads run in parallel, each capturing different relationships (syntactic, semantic, positional).' },
  { id: 'add1', label: 'Add & LayerNorm', color: '#f97316', short: 'A+N', desc: 'Residual connection: output = LayerNorm(x + sublayer(x)). This stabilises training (prevents vanishing gradients) and lets information flow directly through. Critical for training deep networks.' },
  { id: 'ffn', label: 'Feed-Forward Network', color: '#58a6ff', short: 'FFN', desc: 'Two linear layers with ReLU/GELU activation: FFN(x) = max(0, xW₁+b₁)W₂+b₂. Expands to 4× d_model then contracts. Applied to each position independently — adds capacity.' },
  { id: 'add2', label: 'Add & LayerNorm', color: '#f97316', short: 'A+N', desc: 'Second residual connection around the FFN sublayer. Same purpose: preserve gradient flow, allow direct skip connections across the block. Together these two form one Encoder Layer.' },
];

export default function TrArchVisualization() {
  const [active, setActive] = useState(null);

  const info = active !== null ? BLOCKS[active] : null;

  return (
    <div className="trarch-wrap">
      <h3 className="trarch-title">Transformer Encoder Block</h3>
      <p className="trarch-sub">Click any component to learn what it does</p>

      <div className="trarch-layout">
        <div className="trarch-stack">
          {BLOCKS.map((b, i) => (
            <button
              key={b.id}
              className={`trarch-block ${active === i ? 'trarch-block-active' : ''}`}
              style={{ borderColor: active === i ? b.color : '#30363d', color: active === i ? b.color : '#e6edf3' }}
              onClick={() => setActive(active === i ? null : i)}
            >
              <span className="trarch-block-badge" style={{ background: b.color + '22', color: b.color }}>{b.short}</span>
              <span className="trarch-block-label">{b.label}</span>
              {i < BLOCKS.length - 1 && (
                <svg className="trarch-arrow" viewBox="0 0 20 12">
                  <path d="M10,0 L10,8 M6,5 L10,10 L14,5" stroke="#30363d" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              )}
            </button>
          ))}
        </div>

        <div className="trarch-info-panel">
          {info ? (
            <>
              <div className="trarch-info-header" style={{ color: info.color }}>
                <span className="trarch-info-badge" style={{ background: info.color + '22', borderColor: info.color + '55' }}>{info.short}</span>
                {info.label}
              </div>
              <p className="trarch-info-body">{info.desc}</p>
            </>
          ) : (
            <div className="trarch-info-placeholder">
              <div className="trarch-info-icon">↑</div>
              <p>Select a component from the encoder stack to see a detailed explanation of its role and computation.</p>
            </div>
          )}

          <div className="trarch-dims">
            <div className="trarch-dim-row"><span>d_model</span><span>512</span></div>
            <div className="trarch-dim-row"><span>Heads</span><span>8</span></div>
            <div className="trarch-dim-row"><span>d_ff</span><span>2048</span></div>
            <div className="trarch-dim-row"><span>Layers (N)</span><span>6</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

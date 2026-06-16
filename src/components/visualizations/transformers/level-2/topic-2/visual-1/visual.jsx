import { useState } from 'react';
import './visual.css';

const MODULES = [
  {
    name: 'ScaledDotProductAttention',
    color: '#58a6ff',
    params: '—',
    lines: [
      'def forward(self, q, k, v, mask=None):',
      '    scores = torch.matmul(q, k.transpose(-2,-1))',
      '    scores = scores / math.sqrt(self.d_k)   # ← scale',
      '    if mask is not None: scores = scores.masked_fill(mask==0, -1e9)',
      '    attn = F.softmax(scores, dim=-1)',
      '    return torch.matmul(attn, v), attn',
    ],
    highlight: 2,
    note: 'Dividing by √d_k prevents dot products from growing too large, keeping softmax gradients healthy.',
  },
  {
    name: 'MultiHeadAttention',
    color: '#818cf8',
    params: 'd_model × 4 (Q,K,V,O projections)',
    lines: [
      'def forward(self, q, k, v, mask=None):',
      '    # Project & split into h heads',
      '    q = self.split_heads(self.W_q(q))  # (B,h,T,d_k)',
      '    k = self.split_heads(self.W_k(k))',
      '    v = self.split_heads(self.W_v(v))',
      '    x, _ = self.attention(q, k, v, mask)',
      '    x = self.concat_heads(x)           # (B,T,d_model)',
      '    return self.W_o(x)',
    ],
    highlight: 6,
    note: 'concat_heads merges all head outputs, then W_o projects back to d_model. Each head gets d_model/h dimensions.',
  },
  {
    name: 'FeedForward',
    color: '#a78bfa',
    params: 'd_model × d_ff × 2 weights',
    lines: [
      'class FeedForward(nn.Module):',
      '    def __init__(self, d_model, d_ff, dropout=0.1):',
      '        self.linear1 = nn.Linear(d_model, d_ff)',
      '        self.linear2 = nn.Linear(d_ff, d_model)',
      '    def forward(self, x):',
      '        return self.linear2(                  # ← contract',
      '            F.relu(self.linear1(x)))          # ← expand×4',
    ],
    highlight: 6,
    note: 'd_ff = 4 × d_model (e.g. 2048 for d_model=512). The bottleneck stores "facts" about each token position.',
  },
  {
    name: 'EncoderBlock',
    color: '#56d364',
    params: 'MHA + FFN + 2× LayerNorm',
    lines: [
      'def forward(self, x, mask=None):',
      '    # Self-attention + residual',
      '    x = self.norm1(x + self.attn(x, x, x, mask))',
      '    # FFN + residual',
      '    x = self.norm2(x + self.ff(x))',
      '    return x',
    ],
    highlight: 2,
    note: 'The residual connections x + sublayer(x) are the key to training very deep networks without degradation.',
  },
  {
    name: 'Transformer',
    color: '#f97316',
    params: 'N × EncoderBlock stack',
    lines: [
      'def forward(self, src, src_mask=None):',
      '    x = self.embedding(src)           # token ids → vectors',
      '    x = self.pos_encoding(x)          # add positional signal',
      '    for layer in self.encoder_layers:  # stack of N blocks',
      '        x = layer(x, src_mask)',
      '    return self.output_proj(x)         # project to vocab',
    ],
    highlight: 3,
    note: 'Stacking N identical encoder blocks (N=6 in the original paper) dramatically increases representational power.',
  },
];

export default function TrScratchVisualization() {
  const [open, setOpen] = useState(0);

  const m = MODULES[open];

  return (
    <div className="trscratch-wrap">
      <h3 className="trscratch-title">Mini Transformer — Module Breakdown</h3>
      <p className="trscratch-sub">Expand each module to see its PyTorch implementation and the key line to understand</p>

      <div className="trscratch-pipeline">
        {MODULES.map((mod, i) => (
          <button key={i}
            className={`trscratch-pill ${open === i ? 'trscratch-pill-active' : ''}`}
            style={open === i ? { borderColor: mod.color, color: mod.color, background: mod.color + '18' } : {}}
            onClick={() => setOpen(i)}>
            {mod.name}
            {i < MODULES.length - 1 && <span className="trscratch-pill-arrow">→</span>}
          </button>
        ))}
      </div>

      <div className="trscratch-card" style={{ borderTopColor: m.color }}>
        <div className="trscratch-card-header">
          <span className="trscratch-card-name" style={{ color: m.color }}>{m.name}</span>
          {m.params !== '—' && <span className="trscratch-card-params">params: {m.params}</span>}
        </div>
        <div className="trscratch-code">
          {m.lines.map((line, i) => (
            <div key={i} className={`trscratch-line ${i === m.highlight ? 'trscratch-line-hl' : ''}`}
              style={i === m.highlight ? { borderLeftColor: m.color } : {}}>
              <span className="trscratch-lineno">{i + 1}</span>
              <code>{line}</code>
            </div>
          ))}
        </div>
        <div className="trscratch-note" style={{ borderLeftColor: m.color }}>
          <strong style={{ color: m.color }}>Key insight:</strong> {m.note}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import './visual.css';

const PATCH_COLORS = [
  '#1d3a5c','#1a3a2a','#3a1a00','#2a1a3a',
  '#1a2a3a','#2a3a1a','#3a2a1a','#1a3a3a',
  '#3a1a2a','#2a2a3a','#1a1a3a','#3a3a1a',
  '#1a3a1a','#3a1a3a','#2a3a3a','#3a2a3a',
];

const FEATURES = [
  { feature: 'Data hunger', cnn: 'Low', vit: 'High', winner: 'cnn' },
  { feature: 'Compute (training)', cnn: 'Moderate', vit: 'High', winner: 'cnn' },
  { feature: 'Accuracy (large data)', cnn: 'Good', vit: 'Excellent', winner: 'vit' },
  { feature: 'Local features', cnn: 'Built-in', vit: 'Learned', winner: 'cnn' },
  { feature: 'Global context', cnn: 'Limited', vit: 'Full', winner: 'vit' },
  { feature: 'Transfer learning', cnn: 'Easy', vit: 'Easy', winner: 'tie' },
];

export default function CnnVitVisualization() {
  const [tab, setTab] = useState('patches');

  return (
    <div className="cnnvit-wrap">
      <h3 className="cnnvit-title">Vision Transformers (ViT)</h3>
      <div className="cnnvit-tabs">
        {['patches', 'pipeline', 'compare'].map(t => (
          <button key={t} className={`cnnvit-tab${tab === t ? ' cnnvit-tab--active' : ''}`}
            onClick={() => setTab(t)}>
            {t === 'patches' ? 'Patch Tokenization' : t === 'pipeline' ? 'Transformer Pipeline' : 'ViT vs CNN'}
          </button>
        ))}
      </div>

      {tab === 'patches' && (
        <div className="cnnvit-panel">
          <svg width="272" height="272" viewBox="0 0 272 272" className="cnnvit-svg">
            {PATCH_COLORS.map((c, i) => {
              const col = i % 4, row = Math.floor(i / 4);
              return (
                <g key={i}>
                  <rect x={col * 68} y={row * 68} width={68} height={68} fill={c} stroke="#21262d" strokeWidth={1} />
                  <text x={col * 68 + 28} y={row * 68 + 38} fontSize={14} fill="#a3adbb" fontWeight="600">{i + 1}</text>
                </g>
              );
            })}
          </svg>
          <p className="cnnvit-note">The 224×224 image is split into 16 patches of 56×56 (shown as 4×4 grid). Each patch becomes a token embedding.</p>
        </div>
      )}

      {tab === 'pipeline' && (
        <div className="cnnvit-pipeline">
          {['Patch Embeddings (16 tokens)', '+ Position Encoding', 'Transformer Block ×12', 'Self-Attention', 'MLP Head', 'Class Prediction'].map((s, i) => (
            <div key={i} className="cnnvit-pipe-row">
              <div className="cnnvit-pipe-box">{s}</div>
              {i < 5 && <div className="cnnvit-pipe-arrow">↓</div>}
            </div>
          ))}
        </div>
      )}

      {tab === 'compare' && (
        <div className="cnnvit-table-wrap">
          <table className="cnnvit-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th style={{ color: '#f97316' }}>CNN</th>
                <th style={{ color: '#a78bfa' }}>ViT</th>
              </tr>
            </thead>
            <tbody>
              {FEATURES.map(f => (
                <tr key={f.feature}>
                  <td>{f.feature}</td>
                  <td style={{ color: f.winner === 'cnn' ? '#56d364' : '#e6edf3' }}>{f.cnn}</td>
                  <td style={{ color: f.winner === 'vit' ? '#56d364' : '#e6edf3' }}>{f.vit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

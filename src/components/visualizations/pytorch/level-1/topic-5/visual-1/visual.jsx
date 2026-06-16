import { useState } from 'react';
import './visual.css';

const VOCAB = [
  { word: 'king',   idx: 0, vec: [0.82, -0.39, 0.51, 0.73, -0.22] },
  { word: 'queen',  idx: 1, vec: [0.78, -0.41, 0.55, 0.69, -0.18] },
  { word: 'cat',    idx: 2, vec: [-0.45, 0.67, -0.31, 0.22, 0.88] },
  { word: 'dog',    idx: 3, vec: [-0.41, 0.70, -0.28, 0.19, 0.91] },
  { word: 'python', idx: 4, vec: [0.12, 0.35, -0.80, -0.55, 0.44] },
];

const DIM_COLORS = ['#f97316', '#58a6ff', '#a78bfa', '#56d364', '#fb923c'];

export default function PtEmbeddingsVisualization() {
  const [selected, setSelected] = useState(0);
  const entry = VOCAB[selected];

  return (
    <div className="ptemb-root">
      <h3 className="ptemb-title">Embedding Layer: Word → Dense Vector</h3>

      <div className="ptemb-layout">
        <div className="ptemb-col">
          <div className="ptemb-col-label">Vocabulary (vocab_size=5)</div>
          <div className="ptemb-vocab">
            {VOCAB.map((v) => (
              <button
                key={v.word}
                className={`ptemb-word ${selected === v.idx ? 'ptemb-word-active' : ''}`}
                onClick={() => setSelected(v.idx)}
              >
                <span className="ptemb-word-idx">[{v.idx}]</span>
                <span className="ptemb-word-text">{v.word}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="ptemb-flow">
          <div className="ptemb-flow-step">
            <div className="ptemb-index-badge">idx = {entry.idx}</div>
            <svg width="28" height="48" viewBox="0 0 28 48">
              <path d="M14 0 V40 L6 32 M14 40 L22 32" stroke="#f97316" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="ptemb-lookup-label">Lookup table<br/>(nn.Embedding)</div>
          <svg width="28" height="48" viewBox="0 0 28 48">
            <path d="M14 0 V40 L6 32 M14 40 L22 32" stroke="#f97316" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="ptemb-col">
          <div className="ptemb-col-label">Embedding vector (dim=5)</div>
          <div className="ptemb-vector-card">
            <div className="ptemb-vector-title" style={{ color: '#f97316' }}>
              embed("{entry.word}")
            </div>
            <div className="ptemb-vector">
              {entry.vec.map((v, i) => (
                <div key={i} className="ptemb-dim">
                  <span className="ptemb-dim-idx" style={{ color: DIM_COLORS[i] }}>d{i}</span>
                  <div className="ptemb-bar-track">
                    <div
                      className="ptemb-bar-fill"
                      style={{
                        width: `${Math.abs(v) * 50}%`,
                        background: v >= 0 ? DIM_COLORS[i] : '#6b7785',
                        marginLeft: v < 0 ? `${(1 + v) * 50}%` : '50%',
                      }}
                    />
                    <div className="ptemb-bar-center" />
                  </div>
                  <span className="ptemb-dim-val" style={{ color: DIM_COLORS[i] }}>
                    {v.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="ptemb-shape-note">torch.Size([5])</div>
          </div>
        </div>
      </div>

      <pre className="ptemb-code">{`emb = nn.Embedding(num_embeddings=5, embedding_dim=5)
out = emb(torch.tensor([${entry.idx}]))  # "${entry.word}"`}</pre>
    </div>
  );
}

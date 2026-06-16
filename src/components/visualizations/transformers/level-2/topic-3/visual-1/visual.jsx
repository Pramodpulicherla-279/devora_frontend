import { useState } from 'react';
import './visual.css';

const BERT_SENTENCE = ['The', '[MASK]', 'sat', 'on', 'the', 'mat'];
const BERT_PRED = ['cat', 'dog', 'bird'];
const GPT_TOKENS = ['The', 'cat', 'sat', 'on', 'the', 'mat'];

export default function TrPretrainingVisualization() {
  const [tab, setTab] = useState('bert');
  const [predIdx, setPredIdx] = useState(0);

  const n = GPT_TOKENS.length;

  return (
    <div className="trpretrain-wrap">
      <h3 className="trpretrain-title">Pretraining Objectives: Masked LM vs. Causal LM</h3>
      <p className="trpretrain-sub">How BERT and GPT learn from unlabelled text differently</p>

      <div className="trpretrain-tabs">
        {[['bert', 'BERT (Masked LM)'], ['gpt', 'GPT (Causal LM)']].map(([k, label]) => (
          <button key={k} className={`trpretrain-tab ${tab === k ? 'trpretrain-tab-active' : ''}`} onClick={() => setTab(k)}>{label}</button>
        ))}
      </div>

      {tab === 'bert' && (
        <div className="trpretrain-panel">
          <div className="trpretrain-sentence">
            {BERT_SENTENCE.map((t, i) => (
              <span key={i} className={`trpretrain-token ${t === '[MASK]' ? 'trpretrain-mask' : ''}`}>{t}</span>
            ))}
          </div>
          <div className="trpretrain-arrow">↓ Bidirectional attention — model sees ALL tokens</div>
          <div className="trpretrain-pred-row">
            <span className="trpretrain-label">Prediction:</span>
            {BERT_PRED.map((p, i) => (
              <button key={i} className={`trpretrain-pred ${predIdx === i ? 'trpretrain-pred-active' : ''}`} onClick={() => setPredIdx(i)}>{p}</button>
            ))}
          </div>
          <div className="trpretrain-info">
            <strong style={{ color: '#818cf8' }}>Bidirectional context</strong> — BERT reads left AND right simultaneously. The [MASK] token forces the model to predict missing words using full sentence context. Enables rich representations but cannot generate text autoregressively.
          </div>
          <svg viewBox="0 0 340 60" className="trpretrain-svg">
            {BERT_SENTENCE.map((_, i) => BERT_SENTENCE.map((_, j) => (
              <line key={`${i}-${j}`} x1={28 + i * 56} y1={30} x2={28 + j * 56} y2={30}
                stroke={i === 1 || j === 1 ? '#818cf8' : '#30363d'}
                strokeWidth={i === 1 || j === 1 ? 1.5 : 0.7} opacity={0.5} />
            )))}
            {BERT_SENTENCE.map((t, i) => (
              <circle key={i} cx={28 + i * 56} cy={30} r={10}
                fill={t === '[MASK]' ? '#818cf8' : '#161b22'} stroke="#30363d" strokeWidth="1.5" />
            ))}
            {BERT_SENTENCE.map((t, i) => (
              <text key={i} x={28 + i * 56} y={34} textAnchor="middle" fontSize="8" fill={t === '[MASK]' ? '#0d1117' : '#a3adbb'}>{t.slice(0, 4)}</text>
            ))}
          </svg>
        </div>
      )}

      {tab === 'gpt' && (
        <div className="trpretrain-panel">
          <div className="trpretrain-sentence">
            {GPT_TOKENS.map((t, i) => (
              <span key={i} className="trpretrain-token trpretrain-gpt-token">{t}</span>
            ))}
          </div>
          <div className="trpretrain-arrow">↓ Causal mask — each token attends only to past tokens</div>
          <svg viewBox="0 0 300 260" className="trpretrain-svg trpretrain-svg-tall">
            {Array.from({ length: n }, (_, row) => Array.from({ length: n }, (_, col) => (
              <rect key={`${row}-${col}`} x={20 + col * 42} y={10 + row * 40} width={36} height={34} rx={4}
                fill={col <= row ? '#818cf825' : '#161b22'}
                stroke={col <= row ? '#818cf8' : '#30363d'}
                strokeWidth="1" />
            )))}
            {Array.from({ length: n }, (_, row) => Array.from({ length: n }, (_, col) => (
              <text key={`t-${row}-${col}`} x={38 + col * 42} y={32 + row * 40} textAnchor="middle" fontSize="9"
                fill={col <= row ? '#818cf8' : '#6b7785'}>{col <= row ? '✓' : '✗'}</text>
            )))}
            {Array.from({ length: n }, (_, i) => (
              <text key={`l-${i}`} x={10} y={32 + i * 40} textAnchor="end" fontSize="8" fill="#a3adbb">{GPT_TOKENS[i].slice(0, 3)}</text>
            ))}
          </svg>
          <div className="trpretrain-info">
            <strong style={{ color: '#818cf8' }}>Autoregressive generation</strong> — GPT predicts each next token given only the left context. The triangular mask enforces this during training. This makes GPT naturally suited for text generation tasks.
          </div>
        </div>
      )}
    </div>
  );
}

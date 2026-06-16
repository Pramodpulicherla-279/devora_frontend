import { useState } from 'react';
import './visual.css';

const WORD = 'unhappiness';

const SCHEMES = {
  bpe: {
    label: 'BPE',
    tokens: ['un', 'happi', 'ness'],
    ids: [2078, 14631, 1230],
    color: '#818cf8',
    vocabSize: '50,257',
    note: 'Byte-Pair Encoding merges the most frequent byte-pairs iteratively. Used by GPT-2/3.',
  },
  wordpiece: {
    label: 'WordPiece',
    tokens: ['un', '##happi', '##ness'],
    ids: [4895, 21355, 19814],
    color: '#56d364',
    vocabSize: '30,522',
    note: 'WordPiece uses ## to mark continuation sub-tokens. Used by BERT.',
  },
  sentencepiece: {
    label: 'SentencePiece',
    tokens: ['▁un', 'happi', 'ness'],
    ids: [809, 13696, 755],
    color: '#f97316',
    vocabSize: '32,000',
    note: 'SentencePiece treats text as raw bytes including spaces (▁ marks word start). Used by T5, LLaMA.',
  },
};

const COLORS = ['#818cf8', '#56d364', '#f97316', '#f59e0b', '#ec4899'];

export default function TrTokenizationVisualization() {
  const [tab, setTab] = useState('bpe');
  const s = SCHEMES[tab];
  const tokenColors = s.tokens.map((_, i) => COLORS[i % COLORS.length]);

  return (
    <div className="trtok-wrap">
      <h3 className="trtok-title">Tokenization Deep Dive</h3>
      <p className="trtok-sub">How the word <code className="trtok-word">{WORD}</code> is split by different tokenizers</p>

      <div className="trtok-tabs">
        {Object.entries(SCHEMES).map(([k, v]) => (
          <button key={k} className={`trtok-tab ${tab === k ? 'trtok-tab-active' : ''}`}
            style={tab === k ? { borderColor: v.color, color: v.color, background: v.color + '18' } : {}}
            onClick={() => setTab(k)}>{v.label}</button>
        ))}
      </div>

      <div className="trtok-visual">
        <div className="trtok-original">{WORD}</div>
        <div className="trtok-arrow">↓</div>
        <div className="trtok-tokens">
          {s.tokens.map((t, i) => (
            <div key={i} className="trtok-chip" style={{ borderColor: tokenColors[i], color: tokenColors[i], background: tokenColors[i] + '18' }}>
              <span className="trtok-chip-text">{t}</span>
              <span className="trtok-chip-id" style={{ color: tokenColors[i] + 'aa' }}>ID: {s.ids[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="trtok-note" style={{ borderLeftColor: s.color }}>{s.note}</div>

      <table className="trtok-table">
        <thead>
          <tr>
            <th>Tokenizer</th><th>Token Count</th><th>Vocab Size</th><th>Used By</th>
          </tr>
        </thead>
        <tbody>
          <tr className={tab === 'bpe' ? 'trtok-row-active' : ''}>
            <td style={{ color: '#818cf8' }}>BPE</td><td>3</td><td>50,257</td><td>GPT-2, GPT-3</td>
          </tr>
          <tr className={tab === 'wordpiece' ? 'trtok-row-active' : ''}>
            <td style={{ color: '#56d364' }}>WordPiece</td><td>3</td><td>30,522</td><td>BERT, DistilBERT</td>
          </tr>
          <tr className={tab === 'sentencepiece' ? 'trtok-row-active' : ''}>
            <td style={{ color: '#f97316' }}>SentencePiece</td><td>3</td><td>32,000</td><td>T5, LLaMA</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

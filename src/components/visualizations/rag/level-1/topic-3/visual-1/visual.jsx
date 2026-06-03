/* Lesson: Advanced Retrieval Strategies
 * Visual type: ILLUSTRATION
 * Reason: Strategies like hybrid search, re-ranking and chunking are conceptual
 * upgrades — a comparison explorer of each technique + when to use it fits best. */
import React, { useState } from 'react';
import './visual.css';

const STRATS = {
  hybrid: { label: 'Hybrid Search', d: 'Combine dense (semantic embeddings) + sparse (keyword/BM25) search. Catches both meaning and exact terms.', when: 'When exact keywords (IDs, names) matter alongside meaning.' },
  rerank: { label: 'Re-Ranking', d: 'Retrieve a large set cheaply, then use a cross-encoder to re-score the top candidates for relevance.', when: 'When first-pass retrieval is noisy and precision matters.' },
  chunking: { label: 'Smart Chunking', d: 'Split documents on semantic boundaries (not fixed sizes), with overlap, so chunks stay self-contained.', when: 'Always — bad chunking is the #1 cause of poor RAG.' },
  hyde: { label: 'HyDE / Query Expansion', d: 'Generate a hypothetical answer first, embed THAT, and search with it. Often retrieves better than the raw question.', when: 'When questions are short or ambiguous.' },
};

const RagRetrievalVisualization = () => {
  const [s, setS] = useState('hybrid');
  return (
    <div className="ragret-wrap">
      <header className="ragret-head">
        <span className="ragret-badge">RAG</span>
        <h2>Advanced Retrieval</h2>
        <p>Beyond basic vector search — getting the RIGHT chunks</p>
      </header>
      <div className="ragret-tabs">
        {Object.entries(STRATS).map(([k, v]) => (
          <button key={k} className={`ragret-tab ${s === k ? 'ragret-tab--on' : ''}`} onClick={() => setS(k)}>{v.label}</button>
        ))}
      </div>
      <div className="ragret-detail">
        <p className="ragret-d">{STRATS[s].d}</p>
        <div className="ragret-when"><strong>Use when:</strong> {STRATS[s].when}</div>
      </div>
      {s === 'hybrid' && (
        <div className="ragret-hybrid">
          <div className="ragret-h ragret-h--dense">Dense (semantic)</div>
          <div className="ragret-plus">+</div>
          <div className="ragret-h ragret-h--sparse">Sparse (keyword)</div>
          <div className="ragret-eq">=</div>
          <div className="ragret-h ragret-h--merged">Merged ranking</div>
        </div>
      )}
      <div className="ragret-note">Retrieval quality caps your whole RAG system: if the right chunk isn't retrieved, no LLM can answer correctly. Most RAG wins come from better retrieval, not bigger models.</div>
    </div>
  );
};
export default RagRetrievalVisualization;

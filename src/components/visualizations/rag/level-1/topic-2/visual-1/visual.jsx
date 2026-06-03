/* Lesson: Embeddings & Vector DBs
 * Visual type: INTERACTIVE
 * Reason: "Similar meaning → nearby vectors" only clicks when you pick a query
 * point in a 2D semantic space and watch the nearest neighbors light up. */
import React, { useState } from 'react';
import './visual.css';

const DOCS = [
  { t: 'dog', x: 22, y: 30, g: 'animals' }, { t: 'cat', x: 30, y: 24, g: 'animals' }, { t: 'puppy', x: 18, y: 38, g: 'animals' },
  { t: 'car', x: 74, y: 28, g: 'vehicles' }, { t: 'truck', x: 82, y: 36, g: 'vehicles' }, { t: 'bicycle', x: 68, y: 20, g: 'vehicles' },
  { t: 'apple', x: 40, y: 76, g: 'food' }, { t: 'banana', x: 50, y: 82, g: 'food' }, { t: 'pizza', x: 58, y: 70, g: 'food' },
];

const RagEmbeddingsVisualization = () => {
  const [query, setQuery] = useState(0);
  const k = 3;
  const q = DOCS[query];
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const ranked = DOCS.map((d, i) => ({ i, d, dist: dist(q, d) })).filter((r) => r.i !== query).sort((a, b) => a.dist - b.dist);
  const neighbors = new Set(ranked.slice(0, k).map((r) => r.i));
  const W = 300, H = 220, pad = 16;
  const X = (x) => pad + (x / 100) * (W - 2 * pad);
  const Y = (y) => pad + (y / 100) * (H - 2 * pad);

  return (
    <div className="ragemb-wrap">
      <header className="ragemb-head">
        <span className="ragemb-badge">RAG</span>
        <h2>Embeddings &amp; Vector DBs</h2>
        <p>Meaning becomes geometry — similar text sits close together</p>
      </header>
      <div className="ragemb-chart-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="ragemb-svg" preserveAspectRatio="xMidYMid meet">
          {ranked.slice(0, k).map((r) => (
            <line key={r.i} x1={X(q.x)} y1={Y(q.y)} x2={X(r.d.x)} y2={Y(r.d.y)} className="ragemb-link" />
          ))}
          {DOCS.map((d, i) => (
            <g key={i} onClick={() => setQuery(i)} style={{ cursor: 'pointer' }}>
              <circle cx={X(d.x)} cy={Y(d.y)} r={i === query ? 8 : 6} className={`ragemb-dot ${i === query ? 'ragemb-dot--q' : neighbors.has(i) ? 'ragemb-dot--n' : ''}`} />
              <text x={X(d.x)} y={Y(d.y) - 10} className="ragemb-label">{d.t}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="ragemb-readout">Query: <strong>"{q.t}"</strong> → nearest: {ranked.slice(0, k).map((r) => r.d.t).join(', ')}</div>
      <div className="ragemb-note">Tap any word to make it the query. An <strong>embedding</strong> turns text into a vector; a <strong>vector DB</strong> finds the closest vectors (cosine/Euclidean) — that's semantic search.</div>
    </div>
  );
};
export default RagEmbeddingsVisualization;

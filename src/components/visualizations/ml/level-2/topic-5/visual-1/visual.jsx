/* Lesson: K-Means Clustering — Finding Groups Without Labels
 * Visual type: INTERACTIVE
 * Reason: K-means is iterative — random centroids, assign points, move centroids,
 * repeat. Stepping through iterations on a scatter of customer points shows the
 * convergence that the algorithm description only implies. */
import React, { useState, useMemo } from 'react';
import './visual.css';

const W = 300, H = 140, PAD = 18;
const K = 3;
const COLORS = ['#a78bfa', '#56d364', '#f0883e'];

const SEED_POINTS = [
  [0.15,0.20],[0.18,0.35],[0.22,0.15],[0.12,0.28],[0.20,0.40],
  [0.50,0.55],[0.55,0.60],[0.48,0.70],[0.60,0.65],[0.53,0.48],
  [0.80,0.20],[0.85,0.30],[0.78,0.15],[0.88,0.22],[0.82,0.38],
].map(([x, y]) => ({ x: PAD + x * (W - 2 * PAD), y: H - PAD - y * (H - 2 * PAD) }));

const CENTROIDS = [
  [[0.40,0.50],[0.75,0.45],[0.20,0.60]],
  [[0.18,0.28],[0.55,0.60],[0.82,0.25]],
  [[0.18,0.28],[0.54,0.60],[0.83,0.24]],
];

function toPx([x, y]) {
  return { x: PAD + x * (W - 2 * PAD), y: H - PAD - y * (H - 2 * PAD) };
}

function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

const MlKMeansVisualization = () => {
  const [iter, setIter] = useState(0);

  const centroids = CENTROIDS[Math.min(iter, CENTROIDS.length - 1)].map(toPx);

  const assignments = SEED_POINTS.map(p => {
    const dists = centroids.map(c => dist(p, c));
    return dists.indexOf(Math.min(...dists));
  });

  return (
    <div className="mlkm-wrap">
      <header className="mlkm-head">
        <span className="mlkm-badge">Machine Learning</span>
        <h2>K-Means Clustering</h2>
        <p>No labels — find natural customer groups</p>
      </header>

      <div className="mlkm-steps">
        {['Random centroids', 'Assign to nearest', 'Converged (k=3)'].map((s, i) => (
          <div key={i} className={`mlkm-step-pill ${iter === i ? 'mlkm-step-pill--on' : ''}`}>{s}</div>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="mlkm-svg">
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#30363d" strokeWidth={1} />
        <line x1={PAD} y1={PAD / 2} x2={PAD} y2={H - PAD} stroke="#30363d" strokeWidth={1} />
        <text x={W - PAD} y={H - PAD + 11} textAnchor="end" fill="#6b7785" fontSize={8}>Avg order value →</text>
        <text x={PAD - 2} y={PAD / 2 + 3} textAnchor="end" fill="#6b7785" fontSize={8}>Frequency ↑</text>

        {SEED_POINTS.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={iter > 0 ? 5 : 4} fill={iter > 0 ? COLORS[assignments[i]] : '#30363d'} opacity={0.85} />
        ))}

        {centroids.map((c, i) => (
          <g key={i}>
            <circle cx={c.x} cy={c.y} r={8} fill={COLORS[i]} opacity={0.3} />
            <circle cx={c.x} cy={c.y} r={4} fill={COLORS[i]} />
            <text cx={c.x} cy={c.y} textAnchor="middle" fill={COLORS[i]} fontSize={8} fontWeight="700">
              <tspan x={c.x} dy={-10}>✕</tspan>
            </text>
          </g>
        ))}
      </svg>

      <div className="mlkm-controls">
        <button className="mlkm-btn" onClick={() => setIter(Math.max(0, iter - 1))} disabled={iter === 0}>← Back</button>
        <span className="mlkm-iter">Iteration {iter + 1}/{CENTROIDS.length}</span>
        <button className="mlkm-btn" onClick={() => setIter(Math.min(CENTROIDS.length - 1, iter + 1))} disabled={iter >= CENTROIDS.length - 1}>Next →</button>
      </div>

      <div className="mlkm-legend">
        {['Cluster 1 (high-freq buyers)', 'Cluster 2 (mid-range)', 'Cluster 3 (low-freq, high value)'].map((l, i) => (
          <span key={i} className="mlkm-leg"><span className="mlkm-dot" style={{ background: COLORS[i] }} />{l}</span>
        ))}
      </div>

      <div className="mlkm-note">
        <code>KMeans(n_clusters=3).fit(X)</code>. You choose k — the algorithm finds the centroids. Use the <strong>elbow method</strong> (plot inertia vs k) to pick k when you don't know it in advance.
      </div>
    </div>
  );
};

export default MlKMeansVisualization;

/* Lesson: The Central Limit Theorem — Why Sample Means Behave Normally
 * Visual type: INTERACTIVE
 * Reason: The CLT's magic is that skewed raw data produces normal-looking sample
 * means. Clicking "Draw samples" accumulates mean-dots and the histogram visibly
 * converges to a bell — the theorem plays out in front of the learner. */
import React, { useState, useRef } from 'react';
import './visual.css';

const POP_SKEW = [499,499,499,800,800,1000,1000,1200,1500,2000,3000,5000,8000,15000,30000];

function sample(n) {
  const vals = Array.from({ length: n }, () => POP_SKEW[Math.floor(Math.random() * POP_SKEW.length)]);
  return vals.reduce((a, b) => a + b, 0) / n;
}

const W = 320, H = 90, BINS = 14, MIN_M = 800, MAX_M = 12000;

function buildHist(means) {
  const counts = new Array(BINS).fill(0);
  means.forEach(m => {
    const bin = Math.min(BINS - 1, Math.floor(((m - MIN_M) / (MAX_M - MIN_M)) * BINS));
    counts[Math.max(0, bin)]++;
  });
  return counts;
}

const InfStatsCltVisualization = () => {
  const [means, setMeans] = useState([]);
  const [n, setN] = useState(30);
  const running = useRef(false);

  const addBatch = (count) => {
    const newMeans = Array.from({ length: count }, () => sample(n));
    setMeans(prev => [...prev, ...newMeans].slice(-300));
  };

  const reset = () => { setMeans([]); };

  const counts = buildHist(means);
  const maxCount = Math.max(...counts, 1);
  const barW = (W - 40) / BINS;
  const overallMean = means.length ? (means.reduce((a, b) => a + b, 0) / means.length).toFixed(0) : '—';

  return (
    <div className="isclt-wrap">
      <header className="isclt-head">
        <span className="isclt-badge">Inferential</span>
        <h2>Central Limit Theorem</h2>
        <p>Skewed orders → normal sample means</p>
      </header>

      <div className="isclt-controls">
        <label className="isclt-label">Sample size n =
          <select className="isclt-sel" value={n} onChange={e => { setN(+e.target.value); reset(); }}>
            {[5, 10, 30, 50].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>
        <div className="isclt-btns">
          <button className="isclt-btn" onClick={() => addBatch(1)}>+1 sample</button>
          <button className="isclt-btn" onClick={() => addBatch(20)}>+20</button>
          <button className="isclt-btn" onClick={() => addBatch(100)}>+100</button>
          <button className="isclt-btn isclt-btn--reset" onClick={reset}>Reset</button>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="isclt-svg">
        <line x1={20} y1={H - 16} x2={W - 10} y2={H - 16} stroke="#30363d" strokeWidth={1} />
        {counts.map((c, i) => {
          const bh = (c / maxCount) * (H - 28);
          return (
            <rect key={i} x={20 + i * barW} y={H - 16 - bh} width={barW - 1} height={bh} rx={2} fill="#a78bfa" opacity={means.length > 20 ? 0.85 : 0.5} />
          );
        })}
        {means.length > 40 && (
          <text x={W / 2} y={12} textAnchor="middle" fill="#56d364" fontSize={9.5} fontWeight="700">↓ Bell curve emerging</text>
        )}
        <text x={20} y={H - 4} fill="#6b7785" fontSize={8}>₹800</text>
        <text x={W - 10} y={H - 4} fill="#6b7785" fontSize={8} textAnchor="end">₹12k</text>
      </svg>

      <div className="isclt-stats">
        <div className="isclt-stat">
          <span>Samples drawn</span><strong>{means.length}</strong>
        </div>
        <div className="isclt-stat">
          <span>Mean of means</span><strong>₹{overallMean}</strong>
        </div>
        <div className="isclt-stat">
          <span>Shape</span><strong style={{ color: means.length > 40 ? '#56d364' : '#a3adbb' }}>{means.length > 40 ? 'Bell ✓' : 'Accumulating…'}</strong>
        </div>
      </div>

      <div className="isclt-note">
        Raw order values are wildly right-skewed. But as you draw samples of n ≥ 30, their <em>means</em> form a bell — regardless of the population shape. That's the CLT, and it's why t-tests work on skewed data.
      </div>
    </div>
  );
};

export default InfStatsCltVisualization;

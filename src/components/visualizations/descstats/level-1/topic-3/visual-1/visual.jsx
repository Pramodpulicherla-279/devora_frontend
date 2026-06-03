/* Lesson: Distributions
 * Visual type: INTERACTIVE
 * Reason: A histogram's "shape" only clicks when you can re-bin the same data
 * and switch between distribution shapes to compare them side by side. */
import React, { useState } from 'react';
import './visual.css';

const SHAPES = {
  uniform: { label: 'Uniform', gen: (n) => 50 },
  normal: { label: 'Normal (bell)', gen: () => { let s = 0; for (let i = 0; i < 6; i++) s += Math.random(); return (s / 6) * 100; } },
  rightskew: { label: 'Right-skewed', gen: () => Math.min(100, -Math.log(1 - Math.random()) * 22) },
  bimodal: { label: 'Bimodal', gen: () => (Math.random() < 0.5 ? 25 : 72) + (Math.random() - 0.5) * 22 },
};

// deterministic-ish sample per shape (fixed seed feel via fixed arrays)
function sample(shape, bins) {
  const counts = new Array(bins).fill(0);
  const N = 400;
  for (let i = 0; i < N; i++) {
    let v;
    if (shape === 'uniform') v = Math.random() * 100;
    else v = SHAPES[shape].gen();
    v = Math.max(0, Math.min(99.9, v));
    counts[Math.floor((v / 100) * bins)]++;
  }
  return counts;
}

const DescStatsDistributionsVisualization = () => {
  const [shape, setShape] = useState('normal');
  const [bins, setBins] = useState(12);
  const [seed, setSeed] = useState(0); // re-roll
  const counts = React.useMemo(() => sample(shape, bins), [shape, bins, seed]);
  const max = Math.max(...counts, 1);
  const W = 320, H = 130, pad = 16;
  const bw = (W - 2 * pad) / bins;

  return (
    <div className="dsdist-wrap">
      <header className="dsdist-head">
        <span className="dsdist-badge">Statistics</span>
        <h2>Distributions</h2>
        <p>The shape of your data — re-bin it &amp; compare shapes</p>
      </header>

      <div className="dsdist-tabs">
        {Object.entries(SHAPES).map(([k, s]) => (
          <button key={k} className={`dsdist-tab ${shape === k ? 'dsdist-tab--on' : ''}`} onClick={() => setShape(k)}>{s.label}</button>
        ))}
      </div>

      <div className="dsdist-chart-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="dsdist-svg" preserveAspectRatio="xMidYMid meet">
          {counts.map((c, i) => {
            const h = (c / max) * (H - 28);
            return <rect key={i} x={pad + i * bw + 1} y={H - 18 - h} width={bw - 2} height={h} className="dsdist-bar" rx="1" />;
          })}
          <line x1={pad} y1={H - 18} x2={W - pad} y2={H - 18} className="dsdist-axis" />
        </svg>
      </div>

      <div className="dsdist-controls">
        <label>Bins: {bins}
          <input type="range" min="5" max="24" value={bins} onChange={(e) => setBins(Number(e.target.value))} className="dsdist-slider" />
        </label>
        <button className="dsdist-reroll" onClick={() => setSeed((s) => s + 1)}>↻ Re-sample</button>
      </div>

      <div className="dsdist-note">
        Fewer bins hide detail; too many bins make it noisy. The same data can look very different depending on bin width.
      </div>
    </div>
  );
};

export default DescStatsDistributionsVisualization;

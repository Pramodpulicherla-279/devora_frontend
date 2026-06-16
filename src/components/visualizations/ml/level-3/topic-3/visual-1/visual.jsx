/* Lesson: Overfitting and Regularisation
 * Visual type: INTERACTIVE
 * Reason: The lesson is about detecting overfitting by watching the gap between
 * train and validation scores grow as complexity increases, and then applying
 * regularisation (α/C slider) to shrink it. Two curves diverging then converging
 * is the visual story. */
import React, { useState } from 'react';
import './visual.css';

const W = 300, H = 100, PAD = 22;

function score(depth, isVal, reg) {
  const trainPeak = 0.97;
  const valPeak = 0.86;
  if (!isVal) {
    return Math.min(trainPeak, 0.60 + depth * 0.037);
  } else {
    const raw = valPeak - Math.max(0, (depth - 4) * 0.04);
    return Math.max(0.5, raw + reg * 0.05);
  }
}

const MlOverfittingVisualization = () => {
  const [reg, setReg] = useState(0);
  const depths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const toX = (i) => PAD + (i / (depths.length - 1)) * (W - 2 * PAD);
  const toY = (s) => H - PAD - (s - 0.45) / (1 - 0.45) * (H - 2 * PAD) * 0.88;

  const trainPath = depths.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(score(d, false, reg))}`).join(' ');
  const valPath = depths.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(score(d, true, reg))}`).join(' ');

  const bestDepth = depths[depths.reduce((best, d, i) => score(d, true, reg) > score(depths[best], true, reg) ? i : best, 0)];
  const bestX = toX(depths.indexOf(bestDepth));

  return (
    <div className="mlovfit-wrap">
      <header className="mlovfit-head">
        <span className="mlovfit-badge">Machine Learning</span>
        <h2>Overfitting &amp; Regularisation</h2>
        <p>Train accuracy climbs — val accuracy falls: that's the gap</p>
      </header>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="mlovfit-svg">
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#30363d" strokeWidth={1} />
        <line x1={PAD} y1={PAD / 2} x2={PAD} y2={H - PAD} stroke="#30363d" strokeWidth={1} />
        {[0.6, 0.7, 0.8, 0.9].map(v => (
          <g key={v}>
            <line x1={PAD} y1={toY(v)} x2={W - PAD} y2={toY(v)} stroke="#21262d" strokeWidth={1} />
            <text x={PAD - 3} y={toY(v) + 3} textAnchor="end" fill="#6b7785" fontSize={7.5}>{Math.round(v * 100)}%</text>
          </g>
        ))}

        <path d={trainPath} stroke="#a78bfa" strokeWidth={2} fill="none" />
        <path d={valPath} stroke="#56d364" strokeWidth={2} fill="none" />

        <line x1={bestX} y1={PAD / 2} x2={bestX} y2={H - PAD} stroke="#f0883e" strokeWidth={1} strokeDasharray="3 3" />

        <text x={PAD} y={H - PAD + 11} fill="#6b7785" fontSize={7.5}>depth=1</text>
        <text x={W - PAD} y={H - PAD + 11} textAnchor="end" fill="#6b7785" fontSize={7.5}>depth=10</text>
      </svg>

      <div className="mlovfit-legend">
        <span><span className="mlovfit-dot mlovfit-dot--train" />Training score</span>
        <span><span className="mlovfit-dot mlovfit-dot--val" />Validation score</span>
        <span><span className="mlovfit-dot mlovfit-dot--best" />Best depth</span>
      </div>

      <div className="mlovfit-control">
        <label className="mlovfit-lbl">Regularisation strength
          <span style={{ color: reg === 0 ? '#f85149' : reg < 0.5 ? '#f0883e' : '#56d364' }}>
            {reg === 0 ? 'None (overfit)' : reg < 0.5 ? 'Mild' : 'Strong'}
          </span>
        </label>
        <input type="range" min={0} max={1} step={0.1} value={reg} onChange={e => setReg(+e.target.value)} className="mlovfit-slider" />
      </div>

      <div className="mlovfit-note">
        Regularisation (L1/L2 penalty, <code>max_depth</code>, <code>min_samples_leaf</code>) penalises complexity. The orange dashed line shows where validation score peaks — that's your optimal complexity without regularisation. With it, the optimal shifts right.
      </div>
    </div>
  );
};

export default MlOverfittingVisualization;

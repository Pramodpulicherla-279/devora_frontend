/* Lesson: The Bias-Variance Tradeoff — Why Models Fail
 * Visual type: INTERACTIVE
 * Reason: The U-curve of total error vs model complexity is THE canonical image
 * for bias-variance. A complexity slider that moves a marker along the curve and
 * shows a conceptual decision-boundary sketch makes the lesson's core claim
 * ("both extremes fail") viscerally clear. */
import React, { useState } from 'react';
import './visual.css';

const W = 320, H = 100, PAD_L = 24, PAD_B = 20;
const CW = W - PAD_L - 10, CH = H - PAD_B - 8;

function biasPath() {
  const pts = [];
  for (let i = 0; i <= 50; i++) {
    const t = i / 50;
    const x = PAD_L + t * CW;
    const y = 8 + CH * (1 - t) * 0.92;
    pts.push(i === 0 ? `M${x},${y}` : `L${x},${y}`);
  }
  return pts.join(' ');
}

function variancePath() {
  const pts = [];
  for (let i = 0; i <= 50; i++) {
    const t = i / 50;
    const x = PAD_L + t * CW;
    const y = 8 + CH * t * t * 0.92;
    pts.push(i === 0 ? `M${x},${y}` : `L${x},${y}`);
  }
  return pts.join(' ');
}

function totalPath() {
  const pts = [];
  for (let i = 0; i <= 50; i++) {
    const t = i / 50;
    const x = PAD_L + t * CW;
    const bias = (1 - t) * 0.92;
    const vari = t * t * 0.92;
    const y = 8 + CH * (bias + vari) / 1.7;
    pts.push(i === 0 ? `M${x},${y}` : `L${x},${y}`);
  }
  return pts.join(' ');
}

function totalAt(t) {
  const bias = (1 - t) * 0.92;
  const vari = t * t * 0.92;
  return (bias + vari) / 1.7;
}

const MlBiasVarianceVisualization = () => {
  const [complexity, setComplexity] = useState(30);
  const t = complexity / 100;
  const cx = PAD_L + t * CW;
  const cy = 8 + CH * totalAt(t);
  const bias = ((1 - t) * 100).toFixed(0);
  const variance = (t * t * 100).toFixed(0);
  const region = t < 0.35 ? 'underfitting' : t > 0.65 ? 'overfitting' : 'sweet spot';

  return (
    <div className="mlbv-wrap">
      <header className="mlbv-head">
        <span className="mlbv-badge">Machine Learning</span>
        <h2>Bias-Variance Tradeoff</h2>
        <p>Too simple underfits — too complex overfits — find the sweet spot</p>
      </header>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="mlbv-svg">
        <line x1={PAD_L} y1={H - PAD_B} x2={W - 8} y2={H - PAD_B} stroke="#30363d" strokeWidth={1} />
        <line x1={PAD_L} y1={8} x2={PAD_L} y2={H - PAD_B} stroke="#30363d" strokeWidth={1} />
        <text x={PAD_L - 2} y={6} textAnchor="end" fill="#6b7785" fontSize={7.5}>Error</text>
        <text x={W - 8} y={H - PAD_B + 10} textAnchor="end" fill="#6b7785" fontSize={7.5}>Complexity →</text>

        <path d={biasPath()} stroke="#f85149" strokeWidth={1.5} fill="none" strokeDasharray="4 3" opacity={0.7} />
        <path d={variancePath()} stroke="#56d364" strokeWidth={1.5} fill="none" strokeDasharray="4 3" opacity={0.7} />
        <path d={totalPath()} stroke="#a78bfa" strokeWidth={2} fill="none" />

        <circle cx={cx} cy={cy} r={5} fill="#a78bfa" />
        <line x1={cx} y1={8} x2={cx} y2={H - PAD_B} stroke="#a78bfa" strokeWidth={1} strokeDasharray="3 3" opacity={0.5} />

        <text x={PAD_L + 8} y={22} fill="#f85149" fontSize={8}>Bias ↓</text>
        <text x={W - 50} y={26} fill="#56d364" fontSize={8}>Variance ↑</text>
        <text x={W / 2 + 4} y={H - PAD_B - 2} textAnchor="middle" fill="#a78bfa" fontSize={7.5}>Total error</text>
      </svg>

      <div className="mlbv-control">
        <label className="mlbv-lbl">Model complexity
          <span className={`mlbv-region mlbv-region--${region.replace(' ', '')}`}>{region}</span>
        </label>
        <input type="range" min={0} max={100} value={complexity} onChange={e => setComplexity(+e.target.value)} className="mlbv-slider" />
      </div>

      <div className="mlbv-stats">
        <div className="mlbv-stat"><span>Bias</span><strong style={{ color: '#f85149' }}>{bias}%</strong></div>
        <div className="mlbv-stat"><span>Variance</span><strong style={{ color: '#56d364' }}>{variance}%</strong></div>
        <div className="mlbv-stat"><span>Region</span><strong className={`mlbv-region mlbv-region--${region.replace(' ', '')}`}>{region}</strong></div>
      </div>

      <div className="mlbv-note">
        A decision tree with <code>max_depth=None</code> memorises training data (high variance). A tree with <code>max_depth=1</code> barely tries (high bias). Tune depth with cross-validation to find the sweet spot.
      </div>
    </div>
  );
};

export default MlBiasVarianceVisualization;

/* Lesson: Train-Test Split and Overfitting
 * Visual type: INTERACTIVE
 * Reason: Overfitting is best seen by sliding model complexity and watching the
 * fitted curve go from underfit → good → memorizing noise, with train/test
 * error diverging. */
import React, { useState } from 'react';
import './visual.css';

// fixed noisy points around a gentle curve
const PTS = [[10,40],[20,55],[30,52],[40,68],[50,62],[60,78],[70,72],[80,88],[90,82]];

const MlTrainTestSplitVisualization = () => {
  const [complexity, setComplexity] = useState(2); // 1 underfit, 2 good, 5 overfit
  const W = 300, H = 170, pad = 24;
  const X = (x) => pad + (x / 100) * (W - 2 * pad);
  const Y = (y) => H - pad - (y / 100) * (H - 2 * pad);
  // build a wiggly path whose wiggle grows with complexity
  const path = [];
  for (let x = 0; x <= 100; x += 2) {
    const base = 38 + x * 0.45;
    const wiggle = complexity <= 1 ? 0 : Math.sin(x / (12 - complexity)) * (complexity - 1) * 4;
    path.push(`${X(x)},${Y(base + wiggle)}`);
  }
  const state = complexity <= 1 ? { k: 'under', t: 'Underfitting', d: 'Too simple — misses the real pattern. High error everywhere.' }
    : complexity <= 3 ? { k: 'good', t: 'Good fit', d: 'Captures the trend, ignores the noise. Generalizes well.' }
    : { k: 'over', t: 'Overfitting', d: 'Memorizes noise. Great on train data, poor on new data.' };

  return (
    <div className="mlsplit-wrap">
      <header className="mlsplit-head">
        <span className="mlsplit-badge">Machine Learning</span>
        <h2>Train/Test Split &amp; Overfitting</h2>
        <p>A model must generalize, not memorize</p>
      </header>
      <div className="mlsplit-chart-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="mlsplit-svg" preserveAspectRatio="xMidYMid meet">
          <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} className="mlsplit-axis" />
          <line x1={pad} y1={pad} x2={pad} y2={H - pad} className="mlsplit-axis" />
          <polyline className={`mlsplit-fit mlsplit-fit--${state.k}`} points={path.join(' ')} />
          {PTS.map(([x, y], i) => <circle key={i} cx={X(x)} cy={Y(y)} r="4" className="mlsplit-pt" />)}
        </svg>
      </div>
      <div className="mlsplit-control">
        <label>Model complexity
          <input type="range" min="1" max="5" value={complexity} onChange={(e) => setComplexity(Number(e.target.value))} className="mlsplit-slider" />
        </label>
        <div className="mlsplit-scale"><span>simple</span><span>complex</span></div>
      </div>
      <div className={`mlsplit-verdict mlsplit-verdict--${state.k}`}>
        <strong>{state.t}</strong> — {state.d}
      </div>
      <div className="mlsplit-split">
        <div className="mlsplit-bar mlsplit-bar--train">Train 80%</div>
        <div className="mlsplit-bar mlsplit-bar--test">Test 20%</div>
      </div>
      <div className="mlsplit-note">Always hold out a <strong>test set</strong> the model never sees during training — it's the only honest measure of generalization.</div>
    </div>
  );
};
export default MlTrainTestSplitVisualization;

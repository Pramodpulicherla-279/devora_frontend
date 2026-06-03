/* Lesson: Probability Distributions
 * Visual type: INTERACTIVE
 * Reason: Discrete vs continuous distributions are best grasped by switching
 * between them and adjusting their defining parameter to see the shape change. */
import React, { useState } from 'react';
import './visual.css';

const DISTS = {
  binomial: { label: 'Binomial', param: 'p (success)', min: 5, max: 95, def: 50, kind: 'discrete' },
  poisson: { label: 'Poisson', param: 'λ (rate)', min: 1, max: 10, def: 4, kind: 'discrete' },
  normal: { label: 'Normal', param: 'σ (spread)', min: 6, max: 26, def: 14, kind: 'continuous' },
};

function pmf(dist, param, bins) {
  const arr = new Array(bins).fill(0);
  if (dist === 'binomial') {
    const n = bins - 1, p = param / 100;
    const choose = (a, b) => { let r = 1; for (let i = 0; i < b; i++) r = (r * (a - i)) / (i + 1); return r; };
    for (let k = 0; k <= n; k++) arr[k] = choose(n, k) * p ** k * (1 - p) ** (n - k);
  } else if (dist === 'poisson') {
    const l = param; let fact = 1;
    for (let k = 0; k < bins; k++) { if (k > 0) fact *= k; arr[k] = (l ** k * Math.exp(-l)) / fact; }
  } else {
    const mu = bins / 2, s = param / 2;
    for (let k = 0; k < bins; k++) arr[k] = Math.exp(-((k - mu) ** 2) / (2 * s * s));
  }
  const sum = arr.reduce((a, b) => a + b, 0) || 1;
  return arr.map((v) => v / sum);
}

const DescStatsProbDistributionsVisualization = () => {
  const [dist, setDist] = useState('normal');
  const cfg = DISTS[dist];
  const [param, setParam] = useState(cfg.def);
  const bins = 16;
  const data = pmf(dist, param, bins);
  const max = Math.max(...data, 0.001);
  const W = 320, H = 130, pad = 16;
  const bw = (W - 2 * pad) / bins;

  const change = (d) => { setDist(d); setParam(DISTS[d].def); };

  return (
    <div className="dspd-wrap">
      <header className="dspd-head">
        <span className="dspd-badge">Statistics</span>
        <h2>Probability Distributions</h2>
        <p>Each value's likelihood — discrete &amp; continuous</p>
      </header>

      <div className="dspd-tabs">
        {Object.entries(DISTS).map(([k, d]) => (
          <button key={k} className={`dspd-tab ${dist === k ? 'dspd-tab--on' : ''}`} onClick={() => change(k)}>
            {d.label}<span className="dspd-kind">{d.kind}</span>
          </button>
        ))}
      </div>

      <div className="dspd-chart-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="dspd-svg" preserveAspectRatio="xMidYMid meet">
          {dist === 'normal' ? (
            <polyline className="dspd-curve"
              points={data.map((v, i) => `${pad + i * bw + bw / 2},${H - 18 - (v / max) * (H - 30)}`).join(' ')} />
          ) : data.map((v, i) => {
            const h = (v / max) * (H - 30);
            return <rect key={i} x={pad + i * bw + 1} y={H - 18 - h} width={bw - 2} height={h} className="dspd-bar" rx="1" />;
          })}
          <line x1={pad} y1={H - 18} x2={W - pad} y2={H - 18} className="dspd-axis" />
        </svg>
      </div>

      <div className="dspd-control">
        <label>{cfg.param}: {dist === 'binomial' ? `${param}%` : (param / (dist === 'normal' ? 2 : 1)).toFixed(0)}
          <input type="range" min={cfg.min} max={cfg.max} value={param} onChange={(e) => setParam(Number(e.target.value))} className="dspd-slider" />
        </label>
      </div>
      <div className="dspd-note">
        {dist === 'binomial' && 'Binomial: number of successes in n independent yes/no trials.'}
        {dist === 'poisson' && 'Poisson: count of events in a fixed interval (λ = average rate).'}
        {dist === 'normal' && 'Normal: the continuous bell curve — sums of many small effects.'}
      </div>
    </div>
  );
};

export default DescStatsProbDistributionsVisualization;

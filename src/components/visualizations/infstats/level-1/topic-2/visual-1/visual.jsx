/* Lesson: Probability Distributions — Uniform, Normal, Binomial
 * Visual type: INTERACTIVE
 * Reason: The lesson contrasts three theoretical shapes. A toggle that switches
 * the SVG curve (flat/bell/bars) and labels the key parameters (a–b / μσ / n·p)
 * makes each distribution's personality immediately visible. */
import React, { useState } from 'react';
import './visual.css';

const W = 320, H = 100, PAD = 20;

function uniformPath() {
  const y = H * 0.3;
  return `M${PAD},${y} L${W - PAD},${y}`;
}

function normalPath() {
  const pts = [];
  for (let i = 0; i <= 60; i++) {
    const t = (i / 60) * 6 - 3;
    const x = PAD + (i / 60) * (W - 2 * PAD);
    const y = H - PAD - Math.exp(-0.5 * t * t) * (H - 2 * PAD) * 0.9;
    pts.push(i === 0 ? `M${x},${y}` : `L${x},${y}`);
  }
  return pts.join(' ');
}

function binomialBars(n = 10, p = 0.4) {
  const bars = [];
  for (let k = 0; k <= n; k++) {
    const logC = Array.from({ length: n }, (_, i) => Math.log(i + 1)).slice(0, k).reduce((a, b) => a + b, 0)
      - Array.from({ length: n - k }, (_, i) => Math.log(i + 1)).reduce((a, b) => a + b, 0);
    const prob = Math.exp(logC + k * Math.log(p) + (n - k) * Math.log(1 - p));
    bars.push(prob);
  }
  const max = Math.max(...bars);
  const bw = (W - 2 * PAD) / (n + 1);
  return bars.map((p, k) => ({
    x: PAD + k * bw,
    h: (p / max) * (H - 2 * PAD) * 0.9,
    w: bw * 0.75,
    pct: (p * 100).toFixed(1),
  }));
}

const DISTS = {
  uniform: {
    name: 'Uniform',
    tagline: 'Every outcome equally likely',
    params: 'a = 0, b = 1',
    use: 'Simulations, random number generation, null models',
    color: '#56d364',
  },
  normal: {
    name: 'Normal (Gaussian)',
    tagline: 'Bell-shaped — most values cluster at the mean',
    params: 'μ = 0, σ = 1',
    use: 'Heights, measurement errors, sample means (CLT)',
    color: '#a78bfa',
  },
  binomial: {
    name: 'Binomial',
    tagline: 'Count of successes in n independent trials',
    params: 'n = 10, p = 0.4',
    use: 'Conversion rates, defect counts, A/B test clicks',
    color: '#f0883e',
  },
};

const InfStatsDistributionsVisualization = () => {
  const [dist, setDist] = useState('normal');
  const d = DISTS[dist];
  const bars = dist === 'binomial' ? binomialBars() : [];

  return (
    <div className="isdist-wrap">
      <header className="isdist-head">
        <span className="isdist-badge">Inferential</span>
        <h2>Probability Distributions</h2>
        <p>Three shapes — three different data-generating processes</p>
      </header>

      <div className="isdist-toggle">
        {Object.keys(DISTS).map(k => (
          <button key={k} className={`isdist-t ${dist === k ? 'isdist-t--on' : ''}`} style={dist === k ? { borderColor: DISTS[k].color, color: DISTS[k].color, background: '#1a1040' } : {}} onClick={() => setDist(k)}>{DISTS[k].name}</button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="isdist-svg">
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#30363d" strokeWidth={1} />
        <line x1={PAD} y1={PAD / 2} x2={PAD} y2={H - PAD} stroke="#30363d" strokeWidth={1} />

        {dist === 'uniform' && (
          <>
            <path d={uniformPath()} stroke={d.color} strokeWidth={2.5} fill="none" />
            <line x1={PAD} y1={H * 0.3} x2={PAD} y2={H - PAD} stroke={d.color} strokeWidth={1} strokeDasharray="3 3" />
            <line x1={W - PAD} y1={H * 0.3} x2={W - PAD} y2={H - PAD} stroke={d.color} strokeWidth={1} strokeDasharray="3 3" />
            <text x={W / 2} y={H * 0.25} textAnchor="middle" fill={d.color} fontSize={9}>P(x) = 1/(b−a)</text>
          </>
        )}

        {dist === 'normal' && (
          <>
            <path d={normalPath()} stroke={d.color} strokeWidth={2} fill="none" />
            <line x1={W / 2} y1={PAD / 2} x2={W / 2} y2={H - PAD} stroke={d.color} strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
            <text x={W / 2} y={H - PAD + 11} textAnchor="middle" fill={d.color} fontSize={8.5}>μ</text>
            <text x={W / 2 + 28} y={H - PAD + 11} textAnchor="middle" fill="#6b7785" fontSize={8}>μ + σ</text>
          </>
        )}

        {dist === 'binomial' && bars.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={H - PAD - b.h} width={b.w} height={b.h} rx={2} fill={d.color} opacity={0.8} />
          </g>
        ))}
      </svg>

      <div className="isdist-info">
        <div className="isdist-row"><span>Tagline</span><strong style={{ color: d.color }}>{d.tagline}</strong></div>
        <div className="isdist-row"><span>Parameters</span><code>{d.params}</code></div>
        <div className="isdist-row"><span>Common use</span><em>{d.use}</em></div>
      </div>

      <div className="isdist-note">
        Choosing the wrong distribution mis-calibrates every probability you compute downstream. Ask: "how is this data generated?" before fitting a model.
      </div>
    </div>
  );
};

export default InfStatsDistributionsVisualization;

import { useState } from 'react';
import './visual.css';

const W = 300, H = 160, PAD = 24;

function normalPDF(x, mu, sigma) {
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
}
function binomPMF(k, n, p) {
  let c = 1;
  for (let i = 0; i < k; i++) c *= (n - i) / (i + 1);
  return c * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

export default function MfDistributionsVisualization() {
  const [tab, setTab] = useState('Normal');
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.5);

  let pts = [], bars = [];

  if (tab === 'Normal') {
    const xMin = mu - 4 * sigma, xMax = mu + 4 * sigma;
    const yMax = normalPDF(mu, mu, sigma) * 1.15;
    pts = [];
    for (let i = 0; i <= 100; i++) {
      const x = xMin + (i / 100) * (xMax - xMin);
      const y = normalPDF(x, mu, sigma);
      pts.push(`${PAD + (i / 100) * (W - PAD * 2)},${H - PAD - (y / yMax) * (H - PAD * 2)}`);
    }
  } else if (tab === 'Binomial') {
    const vals = Array.from({ length: n + 1 }, (_, k) => ({ k, v: binomPMF(k, n, p) }));
    const yMax = Math.max(...vals.map(v => v.v)) * 1.15;
    const bw = (W - PAD * 2) / (n + 1);
    bars = vals.map(({ k, v }) => ({
      x: PAD + k * bw,
      y: H - PAD - (v / yMax) * (H - PAD * 2),
      h: (v / yMax) * (H - PAD * 2),
      w: bw - 2,
      label: k,
    }));
  } else {
    const yMax = (1 / 8) * 1.15;
    const bw = (W - PAD * 2) / 8;
    bars = Array.from({ length: 8 }, (_, i) => ({
      x: PAD + i * bw, y: H - PAD - (1 / 8 / yMax) * (H - PAD * 2),
      h: (1 / 8 / yMax) * (H - PAD * 2), w: bw - 2, label: i,
    }));
  }

  return (
    <div className="mfdist-root">
      <h3 className="mfdist-title">Probability Distributions</h3>
      <div className="mfdist-tabs">
        {['Normal', 'Binomial', 'Uniform'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`mfdist-tab ${tab === t ? 'mfdist-tab-active' : ''}`}>{t}</button>
        ))}
      </div>

      <svg width={W} height={H} className="mfdist-svg">
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#30363d" />
        <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="#30363d" />
        {tab === 'Normal' && pts.length > 0 && (
          <polyline points={pts.join(' ')} fill="none" stroke="#58a6ff" strokeWidth="2.2" />
        )}
        {(tab === 'Binomial' || tab === 'Uniform') && bars.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h}
            fill={tab === 'Binomial' ? '#a78bfa' : '#56d364'} rx="2" />
        ))}
      </svg>

      <div className="mfdist-controls">
        {tab === 'Normal' && (
          <>
            <div className="mfdist-ctrl-row">
              <span>μ = {mu}</span>
              <input type="range" min={-2} max={2} step={0.5} value={mu}
                onChange={e => setMu(Number(e.target.value))} className="mfdist-slider" />
            </div>
            <div className="mfdist-ctrl-row">
              <span>σ = {sigma}</span>
              <input type="range" min={0.5} max={2} step={0.25} value={sigma}
                onChange={e => setSigma(Number(e.target.value))} className="mfdist-slider" />
            </div>
          </>
        )}
        {tab === 'Binomial' && (
          <>
            <div className="mfdist-ctrl-row">
              <span>n = {n}</span>
              <input type="range" min={2} max={15} step={1} value={n}
                onChange={e => setN(Number(e.target.value))} className="mfdist-slider" />
            </div>
            <div className="mfdist-ctrl-row">
              <span>p = {p.toFixed(1)}</span>
              <input type="range" min={0.1} max={0.9} step={0.1} value={p}
                onChange={e => setP(Number(e.target.value))} className="mfdist-slider" />
            </div>
          </>
        )}
        {tab === 'Uniform' && (
          <div className="mfdist-note">Uniform: each value equally likely. P(x) = 1/8 for any of 8 outcomes.</div>
        )}
      </div>
    </div>
  );
}

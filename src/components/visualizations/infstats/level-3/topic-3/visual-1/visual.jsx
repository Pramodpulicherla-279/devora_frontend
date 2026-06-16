/* Lesson: Statistical Power and Sample Size
 * Visual type: INTERACTIVE
 * Reason: Power is invisible until you see the two overlapping distributions (H₀
 * and H₁) and the β shaded region shrink as you increase n. Sliding sample size
 * makes the lesson's core claim — "underpowered tests waste everyone's time" —
 * viscerally clear. */
import React, { useState } from 'react';
import './visual.css';

const W = 320, H = 110, PAD = 20;

function erf(x) {
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  const a1=0.254829592,a2=-0.284496736,a3=1.421413741,a4=-1.453152027,a5=1.061405429,p=0.3275911;
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

function normalCdf(x, mu, sd) {
  return 0.5 * (1 + erf((x - mu) / (sd * Math.sqrt(2))));
}

function bellPath(mu, sd) {
  const cx = PAD + mu * (W - 2 * PAD);
  const pts = [];
  for (let i = 0; i <= 80; i++) {
    const x = PAD + (i / 80) * (W - 2 * PAD);
    const z = (x - cx) / (sd * (W - 2 * PAD) * 2);
    const y = H - PAD - Math.exp(-0.5 * z * z) * (H - 2 * PAD) * 0.85;
    pts.push(i === 0 ? `M${x},${y}` : `L${x},${y}`);
  }
  return pts.join(' ');
}

const InfStatsPowerVisualization = () => {
  const [n, setN] = useState(30);
  const effect = 0.3;
  const sd = 1 / Math.sqrt(n);
  const critZ = 1.645;
  const critMu = 0.5 + critZ * sd;
  const power = 1 - normalCdf(critMu, 0.5 + effect, sd);
  const beta = 1 - power;

  const critX = PAD + critMu * (W - 2 * PAD);

  return (
    <div className="ispwr-wrap">
      <header className="ispwr-head">
        <span className="ispwr-badge">Inferential</span>
        <h2>Statistical Power &amp; Sample Size</h2>
        <p>More data → less chance of missing a real effect</p>
      </header>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="ispwr-svg">
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#30363d" strokeWidth={1} />
        <path d={bellPath(0.5, sd)} stroke="#a78bfa" strokeWidth={2} fill="none" />
        <path d={bellPath(0.5 + effect, sd)} stroke="#56d364" strokeWidth={2} fill="none" />
        <line x1={critX} y1={PAD / 2} x2={critX} y2={H - PAD} stroke="#f0883e" strokeWidth={1.5} strokeDasharray="4 3" />
        <text x={PAD + 0.5 * (W - 2 * PAD)} y={H - PAD + 12} textAnchor="middle" fill="#a78bfa" fontSize={8}>H₀ (no effect)</text>
        <text x={PAD + (0.5 + effect) * (W - 2 * PAD)} y={H - PAD + 12} textAnchor="middle" fill="#56d364" fontSize={8}>H₁ (real effect)</text>
        <text x={critX + 4} y={14} fill="#f0883e" fontSize={8}>Critical value</text>
        <text x={critX - 4} y={14} textAnchor="end" fill="#a78bfa" fontSize={8.5} fontWeight="700">β={beta < 0.01 ? '<0.01' : beta.toFixed(2)}</text>
      </svg>

      <div className="ispwr-control">
        <label className="ispwr-lbl">Sample size n = <strong style={{ color: '#a78bfa' }}>{n}</strong></label>
        <input type="range" min={10} max={200} step={5} value={n} onChange={e => setN(+e.target.value)} className="ispwr-slider" />
      </div>

      <div className="ispwr-stats">
        <div className="ispwr-stat"><span>Power (1−β)</span><strong style={{ color: power > 0.8 ? '#56d364' : power > 0.6 ? '#f0883e' : '#f85149' }}>{(power * 100).toFixed(0)}%</strong></div>
        <div className="ispwr-stat"><span>β (miss rate)</span><strong>{(beta * 100).toFixed(0)}%</strong></div>
        <div className="ispwr-stat"><span>Status</span><strong style={{ color: power >= 0.8 ? '#56d364' : '#f85149' }}>{power >= 0.8 ? 'Adequate ≥80%' : 'Underpowered'}</strong></div>
      </div>

      <div className="ispwr-note">
        Run your power analysis <em>before</em> collecting data. "n = 30 per group" is a guess, not a decision. At 80% power, you still have a 20% chance of missing a real effect — that's the industry minimum, not the gold standard.
      </div>
    </div>
  );
};

export default InfStatsPowerVisualization;

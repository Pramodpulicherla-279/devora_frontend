import { useState } from 'react';
import './visual.css';

const MODES = ['Coin', 'Die'];
const COIN = { sides: 2, labels: ['H', 'T'], probs: [0.5, 0.5], colors: ['#58a6ff', '#a78bfa'] };
const DIE  = { sides: 6, labels: ['1','2','3','4','5','6'], probs: Array(6).fill(1/6), colors: ['#58a6ff','#a78bfa','#56d364','#f97316','#e6edf3','#6b7785'] };

export default function MfProbabilityVisualization() {
  const [mode, setMode] = useState('Coin');
  const [counts, setCounts] = useState([0, 0]);
  const [total, setTotal] = useState(0);
  const sim = mode === 'Coin' ? COIN : DIE;

  const init = () => { setCounts(Array(sim.sides).fill(0)); setTotal(0); };

  const roll = () => {
    const r = Math.floor(Math.random() * sim.sides);
    setCounts(c => { const n = [...c]; n[r]++; return n; });
    setTotal(t => t + 1);
  };

  const rollMany = () => {
    const n = [...counts.map(() => 0)].map((_, i) => counts[i]);
    for (let i = 0; i < 50; i++) { n[Math.floor(Math.random() * sim.sides)]++; }
    setCounts(n.map((v, i) => v + counts[i] - counts[i]));
    const nc = Array(sim.sides).fill(0);
    for (let i = 0; i < 50; i++) nc[Math.floor(Math.random() * sim.sides)]++;
    setCounts(c => c.map((v, i) => v + nc[i]));
    setTotal(t => t + 50);
  };

  const maxCount = Math.max(1, ...counts);
  const BAR_H = 80;

  return (
    <div className="mfprob-root">
      <h3 className="mfprob-title">Probability Simulator</h3>
      <div className="mfprob-modes">
        {MODES.map(m => (
          <button key={m} onClick={() => { setMode(m); init(); }}
            className={`mfprob-mode ${mode === m ? 'mfprob-mode-active' : ''}`}>
            {m === 'Coin' ? '🪙 Coin Flip' : '🎲 Die Roll'}
          </button>
        ))}
      </div>

      <div className="mfprob-chart">
        {sim.labels.map((lbl, i) => {
          const freq = total ? counts[i] / total : 0;
          const barH = (counts[i] / maxCount) * BAR_H;
          return (
            <div key={i} className="mfprob-bar-wrap">
              <div className="mfprob-pct" style={{ color: sim.colors[i] }}>
                {total ? (freq * 100).toFixed(1) + '%' : '—'}
              </div>
              <div className="mfprob-bar-bg" style={{ height: BAR_H }}>
                <div className="mfprob-bar" style={{ height: barH, background: sim.colors[i] }} />
              </div>
              <div className="mfprob-bar-label">{lbl}</div>
              <div className="mfprob-theory">{(sim.probs[i] * 100).toFixed(0)}%</div>
            </div>
          );
        })}
      </div>

      <div className="mfprob-actions">
        <button className="mfprob-btn" onClick={roll}>Roll ×1</button>
        <button className="mfprob-btn" onClick={rollMany}>Roll ×50</button>
        <button className="mfprob-btn mfprob-btn-reset" onClick={init}>Reset</button>
        <span className="mfprob-total">n = {total}</span>
      </div>
      <div className="mfprob-note">Grey % = theoretical probability. As n → ∞, observed converges.</div>
    </div>
  );
}

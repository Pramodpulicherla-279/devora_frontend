/* Lesson: t-Tests — Comparing Two Groups
 * Visual type: INTERACTIVE
 * Reason: The lesson covers one-sample t (compare to ₹10,000 benchmark) and
 * two-sample t (Electronics vs Furniture). Overlapping bell curves with a
 * draggable difference slider show how the t-statistic grows as the gap widens
 * and the distributions separate — making "significant" feel inevitable. */
import React, { useState } from 'react';
import './visual.css';

const W = 320, H = 100, PAD = 20;
const SD = 22;

function bellPath(cx, color, alpha = 1) {
  const pts = [];
  for (let i = 0; i <= 80; i++) {
    const x = PAD + (i / 80) * (W - 2 * PAD);
    const z = (x - cx) / SD;
    const y = H - PAD - Math.exp(-0.5 * z * z) * (H - 2 * PAD) * 0.88;
    pts.push(i === 0 ? `M${x},${y}` : `L${x},${y}`);
  }
  return pts.join(' ');
}

const InfStatsTTestsVisualization = () => {
  const [mode, setMode] = useState('two');
  const [diff, setDiff] = useState(40);

  const mu1 = W / 2 - diff / 2;
  const mu2 = W / 2 + diff / 2;
  const benchmark = W / 2 - 30;

  const se = SD / Math.sqrt(30);
  const t = (diff / 2) / se;
  const sig = Math.abs(t) > 2.04;

  return (
    <div className="isttest-wrap">
      <header className="isttest-head">
        <span className="isttest-badge">Inferential</span>
        <h2>t-Tests</h2>
        <p>Is this difference real or chance?</p>
      </header>

      <div className="isttest-toggle">
        <button className={`isttest-t ${mode === 'one' ? 'isttest-t--on' : ''}`} onClick={() => setMode('one')}>One-sample</button>
        <button className={`isttest-t ${mode === 'two' ? 'isttest-t--on' : ''}`} onClick={() => setMode('two')}>Two-sample</button>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="isttest-svg">
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#30363d" strokeWidth={1} />

        {mode === 'two' ? (
          <>
            <path d={bellPath(mu1)} stroke="#a78bfa" strokeWidth={2} fill="none" />
            <path d={bellPath(mu2)} stroke="#f0883e" strokeWidth={2} fill="none" />
            <line x1={mu1} y1={PAD / 2} x2={mu1} y2={H - PAD} stroke="#a78bfa" strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
            <line x1={mu2} y1={PAD / 2} x2={mu2} y2={H - PAD} stroke="#f0883e" strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
            <text x={mu1} y={H - PAD + 12} textAnchor="middle" fill="#a78bfa" fontSize={8.5}>Electronics</text>
            <text x={mu2} y={H - PAD + 12} textAnchor="middle" fill="#f0883e" fontSize={8.5}>Furniture</text>
          </>
        ) : (
          <>
            <path d={bellPath(W / 2)} stroke="#a78bfa" strokeWidth={2} fill="none" />
            <line x1={W / 2} y1={PAD / 2} x2={W / 2} y2={H - PAD} stroke="#a78bfa" strokeWidth={1} strokeDasharray="3 3" />
            <line x1={benchmark} y1={PAD / 2} x2={benchmark} y2={H - PAD} stroke="#f85149" strokeWidth={1.5} strokeDasharray="4 3" />
            <text x={benchmark} y={H - PAD + 12} textAnchor="middle" fill="#f85149" fontSize={8.5}>₹10k benchmark</text>
            <text x={W / 2} y={H - PAD + 12} textAnchor="middle" fill="#a78bfa" fontSize={8.5}>Sample mean</text>
          </>
        )}
      </svg>

      {mode === 'two' && (
        <div className="isttest-control">
          <label className="isttest-lbl">Group difference <span style={{ color: sig ? '#56d364' : '#f0883e' }}>{diff > 0 ? '+' : ''}{diff}px</span></label>
          <input type="range" min={0} max={120} value={diff} onChange={e => setDiff(+e.target.value)} className="isttest-slider" />
        </div>
      )}

      <div className="isttest-result">
        <div className="isttest-stat">
          <span>t-statistic</span>
          <strong style={{ color: sig ? '#56d364' : '#a78bfa' }}>{t.toFixed(2)}</strong>
        </div>
        <div className="isttest-stat">
          <span>Threshold (α=0.05)</span>
          <strong>|t| &gt; 2.04</strong>
        </div>
        <div className="isttest-stat">
          <span>Verdict</span>
          <strong style={{ color: sig ? '#56d364' : '#f85149' }}>{sig ? 'Significant ✓' : 'Not significant'}</strong>
        </div>
      </div>

      {mode === 'two' && <p className="isttest-hint">Drag the slider — watch when the curves separate enough to reach significance.</p>}

      <div className="isttest-note">
        <strong>One-sample</strong>: compare your group's mean to a known number. <strong>Two-sample</strong>: compare two groups to each other. Both ask the same question — is this gap bigger than noise?
      </div>
    </div>
  );
};

export default InfStatsTTestsVisualization;

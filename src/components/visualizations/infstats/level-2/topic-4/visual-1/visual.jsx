/* Lesson: ANOVA — Comparing More Than Two Groups
 * Visual type: INTERACTIVE
 * Reason: ANOVA partitions variance into "between groups" and "within groups".
 * Three overlapping distributions whose spread can be varied shows visually
 * when F is large (groups far apart, tight spread) vs small (groups close or noisy). */
import React, { useState } from 'react';
import './visual.css';

const W = 320, H = 110, PAD = 18;
const GROUPS = [
  { name: 'Electronics', color: '#a78bfa', mu: 0.28 },
  { name: 'Accessories', color: '#f0883e', mu: 0.50 },
  { name: 'Furniture',   color: '#56d364', mu: 0.72 },
];

function bellPath(mu, sd) {
  const pts = [];
  const cx = PAD + mu * (W - 2 * PAD);
  for (let i = 0; i <= 80; i++) {
    const x = PAD + (i / 80) * (W - 2 * PAD);
    const z = (x - cx) / (sd * (W - 2 * PAD));
    const y = H - PAD - Math.exp(-0.5 * z * z) * (H - 2 * PAD) * 0.85;
    pts.push(i === 0 ? `M${x},${y}` : `L${x},${y}`);
  }
  return pts.join(' ');
}

const InfStatsAnovaVisualization = () => {
  const [spread, setSpread] = useState(0.06);

  const grandMu = GROUPS.reduce((s, g) => s + g.mu, 0) / GROUPS.length;
  const betweenVar = GROUPS.reduce((s, g) => s + (g.mu - grandMu) ** 2, 0) / (GROUPS.length - 1);
  const withinVar = spread ** 2;
  const F = (betweenVar / withinVar).toFixed(2);
  const sig = F > 3.35;

  return (
    <div className="isanova-wrap">
      <header className="isanova-head">
        <span className="isanova-badge">Inferential</span>
        <h2>ANOVA</h2>
        <p>Three groups, one test — F = between ÷ within</p>
      </header>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="isanova-svg">
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#30363d" strokeWidth={1} />
        {GROUPS.map((g, i) => (
          <g key={i}>
            <path d={bellPath(g.mu, spread)} stroke={g.color} strokeWidth={1.8} fill="none" opacity={0.85} />
            <line x1={PAD + g.mu * (W - 2 * PAD)} y1={H - PAD - 4} x2={PAD + g.mu * (W - 2 * PAD)} y2={H - PAD + 4} stroke={g.color} strokeWidth={1.5} />
            <text x={PAD + g.mu * (W - 2 * PAD)} y={H - PAD + 13} textAnchor="middle" fill={g.color} fontSize={8}>{g.name}</text>
          </g>
        ))}
        <line x1={PAD + grandMu * (W - 2 * PAD)} y1={8} x2={PAD + grandMu * (W - 2 * PAD)} y2={H - PAD} stroke="#6b7785" strokeWidth={1} strokeDasharray="3 3" />
        <text x={PAD + grandMu * (W - 2 * PAD)} y={6} textAnchor="middle" fill="#6b7785" fontSize={8}>Grand mean</text>
      </svg>

      <div className="isanova-control">
        <label className="isanova-lbl">Within-group spread (noise)
          <span style={{ color: sig ? '#56d364' : '#f85149' }}>{spread < 0.05 ? 'Tight' : spread < 0.1 ? 'Moderate' : 'Noisy'}</span>
        </label>
        <input type="range" min={0.02} max={0.18} step={0.01} value={spread} onChange={e => setSpread(+e.target.value)} className="isanova-slider" />
      </div>

      <div className="isanova-stats">
        <div className="isanova-stat"><span>Between-group var</span><strong>{betweenVar.toFixed(4)}</strong></div>
        <div className="isanova-stat"><span>Within-group var</span><strong>{withinVar.toFixed(4)}</strong></div>
        <div className="isanova-stat"><span>F-statistic</span><strong style={{ color: sig ? '#56d364' : '#a78bfa' }}>{F}</strong></div>
        <div className="isanova-stat"><span>Verdict (α=0.05)</span><strong style={{ color: sig ? '#56d364' : '#f85149' }}>{sig ? 'Significant' : 'Not sig.'}</strong></div>
      </div>

      <div className="isanova-note">
        ANOVA asks: is the between-group variance (signal) large relative to within-group variance (noise)? High F → groups are genuinely different. After a significant ANOVA, use <strong>post-hoc tests</strong> (Tukey HSD) to find which pairs differ.
      </div>
    </div>
  );
};

export default InfStatsAnovaVisualization;

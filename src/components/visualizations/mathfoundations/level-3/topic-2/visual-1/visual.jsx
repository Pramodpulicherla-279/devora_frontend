import { useState } from 'react';
import './visual.css';

const DATA = [2, 4, 4, 4, 5, 5, 7, 9];
const W = 380, H = 60, PAD = 20, MIN_V = 0, MAX_V = 12;

function toX(v) { return PAD + ((v - MIN_V) / (MAX_V - MIN_V)) * (W - PAD * 2); }

const mean = DATA.reduce((s, v) => s + v, 0) / DATA.length;
const sorted = [...DATA].sort((a, b) => a - b);
const median = (sorted[3] + sorted[4]) / 2;
const mode = 4;
const std = Math.sqrt(DATA.reduce((s, v) => s + (v - mean) ** 2, 0) / DATA.length).toFixed(2);

const STATS = [
  { key: 'mean', label: 'Mean', value: mean, color: '#58a6ff', desc: `Σx/n = ${mean}` },
  { key: 'median', label: 'Median', value: median, color: '#a78bfa', desc: `Middle value = ${median}` },
  { key: 'mode', label: 'Mode', value: mode, color: '#56d364', desc: `Most frequent = ${mode}` },
  { key: 'std', label: 'Std Dev', value: null, color: '#f97316', desc: `σ = ${std}` },
];

export default function MfDescStatsVisualization() {
  const [highlight, setHighlight] = useState(null);

  return (
    <div className="mfds-root">
      <h3 className="mfds-title">Descriptive Statistics</h3>
      <div className="mfds-dataset">
        Dataset: [{DATA.join(', ')}]
      </div>

      <svg width={W} height={H} className="mfds-svg">
        <line x1={PAD} y1={H / 2} x2={W - PAD} y2={H / 2} stroke="#30363d" strokeWidth="1.5" />
        {[0, 2, 4, 6, 8, 10, 12].map(v => (
          <g key={v}>
            <line x1={toX(v)} y1={H / 2 - 4} x2={toX(v)} y2={H / 2 + 4} stroke="#30363d" />
            <text x={toX(v)} y={H / 2 + 16} fill="#6b7785" fontSize="9" textAnchor="middle">{v}</text>
          </g>
        ))}
        {DATA.map((v, i) => (
          <circle key={i} cx={toX(v)} cy={H / 2} r={7}
            fill={highlight === 'mode' && v === mode ? '#56d364'
              : highlight === 'mean' && Math.abs(v - mean) < 0.01 ? '#58a6ff'
              : highlight === 'median' && (v === 4 || v === 5) ? '#a78bfa'
              : '#21262d'}
            stroke="#30363d" strokeWidth="1" />
        ))}
        {highlight === 'mean' && (
          <line x1={toX(mean)} y1={PAD / 2} x2={toX(mean)} y2={H - PAD / 3}
            stroke="#58a6ff" strokeWidth="2" />
        )}
        {highlight === 'median' && (
          <line x1={toX(median)} y1={PAD / 2} x2={toX(median)} y2={H - PAD / 3}
            stroke="#a78bfa" strokeWidth="2" strokeDasharray="4,2" />
        )}
        {highlight === 'std' && (
          <rect x={toX(mean - parseFloat(std))} y={H / 2 - 10}
            width={toX(mean + parseFloat(std)) - toX(mean - parseFloat(std))} height={20}
            fill="#f97316" fillOpacity="0.15" stroke="#f97316" strokeWidth="1" rx="3" />
        )}
      </svg>

      <div className="mfds-stats-grid">
        {STATS.map(s => (
          <button key={s.key}
            className={`mfds-stat-card ${highlight === s.key ? 'mfds-stat-active' : ''}`}
            style={{ '--c': s.color }}
            onMouseEnter={() => setHighlight(s.key)}
            onMouseLeave={() => setHighlight(null)}
            onClick={() => setHighlight(h => h === s.key ? null : s.key)}>
            <span className="mfds-stat-label">{s.label}</span>
            <span className="mfds-stat-desc" style={{ color: s.color }}>{s.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

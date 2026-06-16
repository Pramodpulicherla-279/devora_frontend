import { useState } from 'react';
import './visual.css';

const NORMAL = {
  label: 'Normal Point',
  color: '#818cf8',
  depth: 8,
  max: 10,
  splits: ['Feature A ≤ 2.1', 'Feature C > 0.8', 'Feature B ≤ 1.5', 'Feature D > 3.2',
    'Feature A > 1.0', 'Feature C ≤ 2.7', 'Feature B > 0.4', '→ Leaf'],
};

const ANOMALY = {
  label: 'Anomaly',
  color: '#f97316',
  depth: 3,
  max: 10,
  splits: ['Feature A ≤ 0.1', 'Feature D > 9.8', '→ Leaf'],
};

function TreePanel({ point, active, onClick }) {
  const score = (1 - point.depth / point.max).toFixed(2);
  return (
    <div className={`unsupifo-panel ${active ? 'unsupifo-panel--active' : ''}`} onClick={onClick}
      style={{ '--accent': point.color }}>
      <div className="unsupifo-panel-title" style={{ color: point.color }}>{point.label}</div>
      <svg viewBox="0 0 160 180" className="unsupifo-tree-svg">
        {point.splits.map((s, i) => {
          const isLeaf = s.startsWith('→');
          const x = 80, y = 16 + i * 20;
          return (
            <g key={i}>
              {i > 0 && <line x1={80} y1={y - 11} x2={80} y2={y - 1} stroke="#30363d" strokeWidth={1.5} />}
              <rect x={15} y={y} width={130} height={17} rx={4}
                fill={isLeaf ? (point.color === '#f97316' ? '#2a1205' : '#0d1337') : '#161b22'}
                stroke={isLeaf ? point.color : '#30363d'} strokeWidth={1} />
              <text x={80} y={y + 11} textAnchor="middle" fill={isLeaf ? point.color : '#a3adbb'} fontSize={8.5}>{s}</text>
            </g>
          );
        })}
      </svg>
      <div className="unsupifo-depth-row">
        <span className="unsupifo-depth-label">Path depth</span>
        <span className="unsupifo-depth-val" style={{ color: point.color }}>{point.depth} / {point.max}</span>
      </div>
      <div className="unsupifo-score-row">
        <span className="unsupifo-score-label">Anomaly Score</span>
        <span className="unsupifo-score-val" style={{ color: point.color }}>{score}</span>
      </div>
    </div>
  );
}

export default function UnsupIsoForestVisualization() {
  const [active, setActive] = useState(null);

  return (
    <div className="unsupifo-wrap">
      <h3 className="unsupifo-title">Isolation Forest — Key Insight</h3>
      <p className="unsupifo-sub">Anomalies are isolated in fewer splits. Click a panel to highlight.</p>

      <div className="unsupifo-panels">
        <TreePanel point={NORMAL} active={active === 'n'} onClick={() => setActive(active === 'n' ? null : 'n')} />
        <div className="unsupifo-vs">VS</div>
        <TreePanel point={ANOMALY} active={active === 'a'} onClick={() => setActive(active === 'a' ? null : 'a')} />
      </div>

      <div className="unsupifo-formula">
        <span className="unsupifo-formula-label">Score formula:</span>
        <code className="unsupifo-formula-code">score = 1 - avg_depth / max_depth</code>
        <span className="unsupifo-formula-note">Score near 1 → anomaly &nbsp;|&nbsp; Score near 0 → normal</span>
      </div>
    </div>
  );
}

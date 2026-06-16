import { useState } from 'react';
import './visual.css';

const CLUSTERS = [
  {
    id: 0,
    label: 'High Value Loyal',
    color: '#818cf8',
    profile: 'Low recency (recent), High spend. Your best customers — reward them.',
    points: [{ x: 55, y: 48 }, { x: 68, y: 35 }, { x: 78, y: 55 }, { x: 62, y: 60 }, { x: 82, y: 42 }],
  },
  {
    id: 1,
    label: 'At Risk',
    color: '#f97316',
    profile: 'Mid recency, Mid spend. Were active but drifting — send a win-back campaign.',
    points: [{ x: 130, y: 90 }, { x: 148, y: 105 }, { x: 138, y: 118 }, { x: 120, y: 100 }],
  },
  {
    id: 2,
    label: 'Lost Customers',
    color: '#f85149',
    profile: 'High recency (long ago), Low spend. Churned — costly to recover.',
    points: [{ x: 210, y: 148 }, { x: 225, y: 160 }, { x: 198, y: 162 }, { x: 215, y: 172 }],
  },
  {
    id: 3,
    label: 'New Customers',
    color: '#56d364',
    profile: 'Low recency, Low spend. Just acquired — nurture with onboarding.',
    points: [{ x: 60, y: 155 }, { x: 78, y: 168 }, { x: 48, y: 172 }, { x: 70, y: 178 }],
  },
];

const W = 280, H = 210;

export default function UnsupSegmentVisualization() {
  const [selected, setSelected] = useState(null);
  const sel = selected !== null ? CLUSTERS[selected] : null;

  return (
    <div className="unsupseg-wrap">
      <h3 className="unsupseg-title">Customer Segmentation — RFM Clusters</h3>
      <p className="unsupseg-hint">Click a cluster to see its profile.</p>

      <div className="unsupseg-main">
        <div className="unsupseg-chart-wrap">
          <svg viewBox={`0 0 ${W} ${H}`} className="unsupseg-svg">
            <text x={10} y={H - 4} fill="#6b7785" fontSize={9} textAnchor="middle" transform={`rotate(-90,10,${H/2})`}>Monetary ($)</text>
            <text x={W / 2} y={H - 2} fill="#6b7785" fontSize={9} textAnchor="middle">Recency (days)</text>
            <line x1={22} y1={8} x2={22} y2={H - 16} stroke="#30363d" strokeWidth={1} />
            <line x1={22} y1={H - 16} x2={W - 8} y2={H - 16} stroke="#30363d" strokeWidth={1} />
            <text x={22} y={14} fill="#6b7785" fontSize={7} textAnchor="middle">High $</text>
            <text x={22} y={H - 18} fill="#6b7785" fontSize={7} textAnchor="middle">Low $</text>
            <text x={26} y={H - 7} fill="#6b7785" fontSize={7}>Recent</text>
            <text x={W - 30} y={H - 7} fill="#6b7785" fontSize={7}>Long ago</text>

            {CLUSTERS.map(c =>
              c.points.map((p, j) => (
                <circle key={`${c.id}-${j}`}
                  cx={p.x} cy={p.y} r={selected === c.id ? 8 : 6}
                  fill={c.color} opacity={selected !== null && selected !== c.id ? 0.25 : 0.85}
                  stroke={selected === c.id ? '#fff' : 'none'} strokeWidth={1.5}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelected(selected === c.id ? null : c.id)} />
              ))
            )}
          </svg>
        </div>

        <div className="unsupseg-legend">
          {CLUSTERS.map(c => (
            <div key={c.id} className={`unsupseg-legend-item ${selected === c.id ? 'unsupseg-legend-item--active' : ''}`}
              style={{ '--cc': c.color }} onClick={() => setSelected(selected === c.id ? null : c.id)}>
              <span className="unsupseg-dot" style={{ background: c.color }} />
              <span className="unsupseg-legend-label">{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {sel && (
        <div className="unsupseg-profile" style={{ borderColor: sel.color }}>
          <div className="unsupseg-profile-name" style={{ color: sel.color }}>{sel.label}</div>
          <div className="unsupseg-profile-text">{sel.profile}</div>
        </div>
      )}
    </div>
  );
}

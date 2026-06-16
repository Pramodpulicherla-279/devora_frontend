import { useState } from 'react';
import './visual.css';

const commits = [
  { hash: 'a1b2c3d', msg: 'feat: add dropout regularization', dvcTag: 'v1.0', dataHash: 'md5:3f4a...', stage: 'model.pkl' },
  { hash: 'e4f5g6h', msg: 'data: add 10k new training samples', dvcTag: 'v1.1', dataHash: 'md5:7b2c...', stage: 'data.csv' },
  { hash: 'i7j8k9l', msg: 'feat: switch to transformer backbone', dvcTag: 'v2.0', dataHash: 'md5:9e1f...', stage: 'features.pkl' },
];

const dagNodes = [
  { id: 'data', label: 'data.csv', x: 60, y: 80, color: '#56d364' },
  { id: 'features', label: 'features.pkl', x: 220, y: 80, color: '#3fb950' },
  { id: 'model', label: 'model.pkl', x: 380, y: 80, color: '#2ea043' },
  { id: 'metrics', label: 'metrics.json', x: 380, y: 30, color: '#388bfd' },
];

const dagEdges = [
  { from: { x: 120, y: 80 }, to: { x: 185, y: 80 } },
  { from: { x: 285, y: 80 }, to: { x: 345, y: 80 } },
  { from: { x: 380, y: 65 }, to: { x: 380, y: 45 } },
];

export default function MlopsDvcVisualization() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="mlopsdvc-container">
      <h3 className="mlopsdvc-title">Data & Model Versioning (DVC)</h3>

      <div className="mlopsdvc-section-label">Pipeline DAG</div>
      <svg className="mlopsdvc-dag" viewBox="0 0 480 130" preserveAspectRatio="xMidYMid meet">
        {dagEdges.map((e, i) => (
          <line key={i} x1={e.from.x} y1={e.from.y} x2={e.to.x} y2={e.to.y} stroke="#30363d" strokeWidth="2" markerEnd="url(#arrow)"/>
        ))}
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#30363d"/>
          </marker>
        </defs>
        {dagNodes.map(n => (
          <g key={n.id}>
            <rect x={n.x - 55} y={n.y - 18} width="110" height="36" rx="6" fill="#161b22" stroke={n.color} strokeWidth="1.5"/>
            <text x={n.x} y={n.y + 5} textAnchor="middle" fill={n.color} fontSize="11" fontFamily="monospace">{n.label}</text>
          </g>
        ))}
      </svg>

      <div className="mlopsdvc-section-label">Git + DVC commit history</div>
      <div className="mlopsdvc-commits">
        {commits.map((c, i) => (
          <div key={i} className={`mlopsdvc-commit ${selected === i ? 'mlopsdvc-commit--active' : ''}`} onClick={() => setSelected(selected === i ? null : i)}>
            <div className="mlopsdvc-commit-left">
              <span className="mlopsdvc-hash">{c.hash}</span>
              <span className="mlopsdvc-tag">{c.dvcTag}</span>
            </div>
            <div className="mlopsdvc-commit-msg">{c.msg}</div>
            {selected === i && (
              <div className="mlopsdvc-commit-detail">
                <div>DVC tracked: <code>{c.stage}</code></div>
                <div>Data checksum: <code>{c.dataHash}</code></div>
                <div className="mlopsdvc-note">Run <code>dvc checkout {c.dvcTag}</code> to restore exact data + model state</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

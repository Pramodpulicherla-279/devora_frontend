import { useState } from 'react';
import './visual.css';

const TREES = [
  {
    label: 'Tree 1',
    vote: 'Return',
    nodes: [
      { id: 0, text: 'Days Since Purchase ≤ 30?', children: [1, 2] },
      { id: 1, text: 'Price > $50?', children: [3, 4] },
      { id: 2, text: '→ No Return', children: [] },
      { id: 3, text: '→ Return', children: [] },
      { id: 4, text: '→ No Return', children: [] },
    ],
  },
  {
    label: 'Tree 2',
    vote: 'Return',
    nodes: [
      { id: 0, text: 'Category = Electronics?', children: [1, 2] },
      { id: 1, text: 'Rating < 3?', children: [3, 4] },
      { id: 2, text: '→ No Return', children: [] },
      { id: 3, text: '→ Return', children: [] },
      { id: 4, text: '→ No Return', children: [] },
    ],
  },
  {
    label: 'Tree 3',
    vote: 'No Return',
    nodes: [
      { id: 0, text: 'Customer VIP?', children: [1, 2] },
      { id: 1, text: '→ No Return', children: [] },
      { id: 2, text: 'Used Discount?', children: [3, 4] },
      { id: 3, text: '→ Return', children: [] },
      { id: 4, text: '→ No Return', children: [] },
    ],
  },
];

const VOTES = TREES.map(t => t.vote);
const RETURN_COUNT = VOTES.filter(v => v === 'Return').length;
const FINAL = RETURN_COUNT > TREES.length / 2 ? 'Return' : 'No Return';

function MiniTree({ nodes }) {
  const BOX_W = 130, BOX_H = 26, GAP_Y = 44, SVG_W = 290, SVG_H = 190;
  const positions = [
    { x: 80, y: 10 },
    { x: 20, y: 54 }, { x: 140, y: 54 },
    { x: 0, y: 98 }, { x: 60, y: 98 },
  ];
  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="svrf-tree-svg">
      {nodes.map((n, i) => {
        const { x, y } = positions[i] || { x: 0, y: 0 };
        const isLeaf = n.children.length === 0;
        return (
          <g key={n.id}>
            {n.children.map(cid => {
              const cp = positions[cid] || { x: 0, y: 0 };
              return <line key={cid} x1={x + BOX_W / 2} y1={y + BOX_H} x2={cp.x + BOX_W / 2} y2={cp.y} stroke="#30363d" strokeWidth={1.5} />;
            })}
            <rect x={x} y={y} width={BOX_W} height={BOX_H} rx={5}
              fill={isLeaf ? (n.text.includes('Return') && !n.text.includes('No') ? '#0d2e1a' : '#1e1010') : '#161b22'}
              stroke={isLeaf ? (n.text.includes('Return') && !n.text.includes('No') ? '#56d364' : '#f97316') : '#30363d'} strokeWidth={1} />
            <text x={x + BOX_W / 2} y={y + 17} textAnchor="middle" fill={isLeaf ? '#e6edf3' : '#a3adbb'} fontSize={8.5}>{n.text}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function SvRandomForestVisualization() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="svrf-wrap">
      <h3 className="svrf-title">Random Forest — Majority Vote</h3>

      <div className="svrf-trees">
        {TREES.map((tree, i) => (
          <div key={i} className={`svrf-tree-card ${expanded === i ? 'svrf-tree-card--open' : ''}`}
            onClick={() => setExpanded(expanded === i ? null : i)}>
            <div className="svrf-tree-header">
              <span className="svrf-tree-label">{tree.label}</span>
              <span className={`svrf-tree-vote ${tree.vote === 'Return' ? 'svrf-vote--yes' : 'svrf-vote--no'}`}>
                {tree.vote}
              </span>
              <span className="svrf-tree-toggle">{expanded === i ? '▲' : '▼'}</span>
            </div>
            {expanded === i && (
              <div className="svrf-tree-body">
                <MiniTree nodes={tree.nodes} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="svrf-vote-bar">
        {TREES.map((t, i) => (
          <div key={i} className={`svrf-vote-chip ${t.vote === 'Return' ? 'svrf-chip--yes' : 'svrf-chip--no'}`}>
            {t.label}: <strong>{t.vote}</strong>
          </div>
        ))}
      </div>

      <div className="svrf-result">
        <span className="svrf-result-label">Majority Vote →</span>
        <span className={`svrf-result-val ${FINAL === 'Return' ? 'svrf-final--yes' : 'svrf-final--no'}`}>{FINAL}</span>
        <span className="svrf-result-sub">({RETURN_COUNT}/{TREES.length} trees voted Return)</span>
      </div>

      <div className="svrf-note">
        <strong>Bagging:</strong> Each tree trains on a random bootstrap sample of the data, reducing variance without increasing bias.
      </div>
    </div>
  );
}

/* Lesson: Weighted Graphs and Why Weights Change Everything
 * 2D animated: edges carry weights (costs). Two paths from A to F are compared — the one with
 * fewer hops isn't always the cheapest. Animates summing each path's weight. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const NODES = [
  { id: 0, l: 'A', x: 80, y: 160 }, { id: 1, l: 'B', x: 250, y: 70 },
  { id: 2, l: 'C', x: 250, y: 250 }, { id: 3, l: 'D', x: 430, y: 70 },
  { id: 4, l: 'E', x: 430, y: 250 }, { id: 5, l: 'F', x: 580, y: 160 },
];
const W = { '0-1': 2, '0-2': 5, '1-3': 7, '2-4': 3, '3-5': 1, '4-5': 4, '1-2': 1 };
const EDGES = Object.keys(W).map(k => k.split('-').map(Number));
// two A→F paths: P1 = A-B-D-F (2+7+1=10), P2 = A-C-E-F (5+3+4=12)
const PATHS = [
  { name: 'A→B→D→F', nodes: [0, 1, 3, 5], cost: 10, c: '#56d364' },
  { name: 'A→C→E→F', nodes: [0, 2, 4, 5], cost: 12, c: '#f0883e' },
];
export default function GraphWeightedVisualization() {
  const [p, setP] = useState(0);
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(s => { const path = PATHS[p]; if (s >= path.nodes.length - 1) { setP(x => (x + 1) % PATHS.length); return 0; } return s + 1; }), 1.0, auto, [p]);
  const path = PATHS[p];
  const running = path.nodes.slice(0, step + 1).reduce((sum, n, i, arr) => i === 0 ? 0 : sum + (W[[arr[i - 1], n].sort((a, b) => a - b).join('-')] || 0), 0);
  const onPath = (a, b) => { const idx = path.nodes.indexOf(a); return idx !== -1 && path.nodes[idx + 1] === b || (path.nodes.indexOf(b) !== -1 && path.nodes[path.nodes.indexOf(b) + 1] === a); };

  return (
    <Stage2D
      title="Weighted Graphs"
      subtitle="Edges carry a weight — a distance, time, or cost. The 'best' route minimises total weight, which isn't always the fewest hops."
      accent="#58a6ff"
      viewBox="0 0 640 320"
      controls={
        <>
          {PATHS.map((pp, i) => <button key={i} className={`dsa2d-btn ${i === p ? 'dsa2d-btn--on' : ''}`} onClick={() => { setP(i); setStep(0); }}>{pp.name}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">running cost: {running}</span>
        </>
      }
      legend={<>Path <code>A→B→D→F</code> costs <strong>10</strong>; <code>A→C→E→F</code> costs <strong>12</strong> — same number of hops, different totals. Finding the minimum-weight path is what algorithms like <strong>Dijkstra's</strong> solve. Weights turn "is there a route?" into "what's the cheapest route?"</>}
    >
      {EDGES.map(([a, b], i) => {
        const lit = onPath(a, b);
        const na = NODES[a], nb = NODES[b];
        const w = W[[a, b].sort((x, y) => x - y).join('-')];
        return (
          <g key={i}>
            <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={lit ? path.c : '#30363d'} strokeWidth={lit ? 4 : 2} style={{ transition: 'stroke .3s' }} />
            <circle cx={(na.x + nb.x) / 2} cy={(na.y + nb.y) / 2} r="12" fill="#0d1117" stroke={lit ? path.c : '#6e7681'} />
            <text x={(na.x + nb.x) / 2} y={(na.y + nb.y) / 2 + 4} fill={lit ? path.c : '#8b949e'} fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{w}</text>
          </g>
        );
      })}
      {NODES.map(n => {
        const active = path.nodes.slice(0, step + 1).includes(n.id);
        return <g key={n.id}><circle cx={n.x} cy={n.y} r="20" fill={active ? path.c : '#161b22'} stroke={active ? path.c : '#8b949e'} strokeWidth="2.5" className={active && path.nodes[step] === n.id ? 'dsa2d-pulse' : ''} /><text x={n.x} y={n.y + 6} fill={active ? '#0d1117' : '#e6edf3'} fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{n.l}</text></g>;
      })}
      <text x="320" y="312" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">numbers on edges = weights · total for this path = {path.cost}</text>
    </Stage2D>
  );
}

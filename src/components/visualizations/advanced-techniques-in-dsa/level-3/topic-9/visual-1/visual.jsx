/* Lesson: Strongly Connected Components and Tarjan's Algorithm
 * 2D animated: a directed graph decomposed into SCCs — groups where every node can reach
 * every other. Cycle through the components and the condensed DAG they form. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const N = { A: [100, 70], B: [240, 60], C: [170, 170], D: [400, 80], E: [520, 130], F: [440, 220], G: [280, 250] };
const EDGES = [['A', 'B'], ['B', 'C'], ['C', 'A'], ['B', 'D'], ['D', 'E'], ['E', 'F'], ['F', 'D'], ['C', 'G'], ['F', 'G']];
const SCCS = [
  { ids: ['A', 'B', 'C'], c: '#6b8cff', name: 'SCC 1: A↔B↔C' },
  { ids: ['D', 'E', 'F'], c: '#f0a35e', name: 'SCC 2: D↔E↔F' },
  { ids: ['G'], c: '#4fce78', name: 'SCC 3: G alone' },
];
export default function AgraphSccVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % (SCCS.length + 1)), 2.0, auto);
  const showAll = i === SCCS.length;
  const active = showAll ? null : SCCS[i];
  const sccOf = id => SCCS.find(s => s.ids.includes(id));
  return (
    <Stage2D title="Strongly Connected Components" subtitle="In a directed graph, an SCC is a maximal group where every node can reach every other (a cycle cluster). Collapse each SCC to a dot and the graph becomes a DAG."
      accent="#f0a35e" viewBox="0 0 640 300"
      controls={<>{SCCS.map((s, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>SCC {k + 1}</button>)}<button className={`dsa2d-btn ${showAll ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(SCCS.length)}>all</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{showAll ? '3 SCCs → condensed DAG' : active.name}</span></>}
      legend={<><strong>Tarjan's algorithm</strong> finds all SCCs in one DFS pass — O(V+E) — by tracking each node's discovery index and "low-link" (the oldest ancestor reachable from its subtree); when a node's low-link equals its own index, an SCC pops off the stack. Uses: dependency cycles, 2-SAT, compiler analysis.</>}>
      <defs><marker id="scc-arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 Z" fill="#6e7681" /></marker></defs>
      {EDGES.map(([a, b], k) => {
        const [x1, y1] = N[a], [x2, y2] = N[b];
        const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
        const sameScc = sccOf(a) === sccOf(b);
        const hot = active && active.ids.includes(a) && active.ids.includes(b);
        return <line key={k} x1={x1 + ux * 22} y1={y1 + uy * 22} x2={x2 - ux * 24} y2={y2 - uy * 24} stroke={hot || (showAll && sameScc) ? sccOf(a).c : '#3d4450'} strokeWidth={hot || (showAll && sameScc) ? 3.5 : 2} markerEnd="url(#scc-arr)" style={{ transition: 'stroke .3s' }} />;
      })}
      {Object.entries(N).map(([id, [x, y]]) => {
        const s = sccOf(id);
        const lit = showAll || (active && active.ids.includes(id));
        return (
          <g key={id}>
            <circle cx={x} cy={y} r="20" fill={lit ? `color-mix(in srgb, ${s.c} 26%, transparent)` : '#161b22'} stroke={lit ? s.c : '#484f58'} strokeWidth={lit ? 3 : 2} className={!showAll && active && active.ids.includes(id) ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s, stroke .3s' }} />
            <text x={x} y={y + 5} fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{id}</text>
          </g>
        );
      })}
      <text x="320" y="292" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">{showAll ? 'condensation: SCC1 → SCC2 → SCC3, SCC1 → SCC3 (a DAG)' : 'every node in the highlighted group can reach every other'}</text>
    </Stage2D>
  );
}

/* Lesson: Representing Graphs — Adjacency Matrix vs Adjacency List
 * 2D animated: the same small graph shown three ways — picture, adjacency matrix, adjacency
 * list. Hover/step an edge to see it light up in all three at once. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

// small 4-node graph for a compact matrix
const N = [{ id: 0, l: 'A', x: 70, y: 70 }, { id: 1, l: 'B', x: 190, y: 60 }, { id: 2, l: 'A2', x: 70, y: 190 }, { id: 3, l: 'C', x: 190, y: 190 }];
const LBL = ['A', 'B', 'C', 'D'];
const NODES = [{ id: 0, l: 'A', x: 80, y: 70 }, { id: 1, l: 'B', x: 200, y: 70 }, { id: 2, l: 'C', x: 200, y: 190 }, { id: 3, l: 'D', x: 80, y: 190 }];
const EDGES = [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2]];
const ADJ = { 0: [1, 2, 3], 1: [0, 2], 2: [0, 1, 3], 3: [0, 2] };

export default function GraphRepresentationVisualization() {
  const [e, setE] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setE(v => (v + 1) % EDGES.length), 1.1, auto);
  const [ea, eb] = EDGES[e];

  return (
    <Stage2D
      title="Adjacency Matrix vs Adjacency List"
      subtitle="Two ways to store a graph. A matrix is an n×n grid of 0/1; a list stores each node's neighbours. The highlighted edge shows where it lives in each."
      accent="#56d364"
      viewBox="0 0 640 300"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setE(v => (v + 1) % EDGES.length)}>next edge</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">edge {LBL[ea]}–{LBL[eb]}</span>
        </>
      }
      legend={<><strong>Matrix</strong>: O(1) edge lookup but O(n²) space — good for dense graphs. <strong>List</strong>: O(degree) lookup, O(n+e) space — best for sparse graphs (most real ones). An undirected edge appears <em>twice</em>: at [A][B] and [B][A].</>}
    >
      {/* graph picture */}
      <text x="140" y="34" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">the graph</text>
      {EDGES.map(([a, b], i) => {
        const on = (a === ea && b === eb) || (a === eb && b === ea);
        return <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} stroke={on ? '#56d364' : '#30363d'} strokeWidth={on ? 3.5 : 2} />;
      })}
      {NODES.map(n => <g key={n.id}><circle cx={n.x} cy={n.y} r="18" fill="#161b22" stroke={(n.id === ea || n.id === eb) ? '#56d364' : '#8b949e'} strokeWidth="2.5" /><text x={n.x} y={n.y + 5} fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{n.l}</text></g>)}

      {/* matrix */}
      <text x="380" y="34" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">adjacency matrix</text>
      {LBL.map((l, c) => <text key={'ch' + c} x={330 + c * 30} y="58" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">{l}</text>)}
      {LBL.map((l, r) => <text key={'rh' + r} x="300" y={80 + r * 30} fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">{l}</text>)}
      {LBL.map((_, r) => LBL.map((__, c) => {
        const one = ADJ[r]?.includes(c);
        const hot = (r === ea && c === eb) || (r === eb && c === ea);
        return <g key={r + '-' + c}><rect x={330 + c * 30 - 13} y={80 + r * 30 - 13} width="26" height="26" rx="4" fill={hot ? 'rgba(86,211,100,.35)' : one ? 'rgba(86,211,100,.12)' : '#0d1117'} stroke={hot ? '#56d364' : '#21262d'} /><text x={330 + c * 30} y={80 + r * 30 + 5} fill={one ? '#7ee787' : '#484f58'} fontSize="13" textAnchor="middle" fontFamily="Consolas">{one ? 1 : 0}</text></g>;
      }))}

      {/* list */}
      <text x="380" y="210" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">adjacency list</text>
      {LBL.map((l, r) => {
        const hot = r === ea || r === eb;
        return <text key={'l' + r} x="300" y={234 + r * 20} fill={hot ? '#7ee787' : '#c9d1d9'} fontSize="13" fontFamily="Consolas">{l}: [{ADJ[r].map(x => LBL[x]).join(', ')}]</text>;
      })}
    </Stage2D>
  );
}

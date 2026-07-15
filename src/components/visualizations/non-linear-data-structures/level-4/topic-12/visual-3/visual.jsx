/* Problem: Clone Graph
 * 2D animated: deep-copy a graph. Traverse the original; for each node create a clone once
 * (tracked in a visited map) so cycles don't cause infinite copying. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const NODES = [{ id: 0, l: 'A', x: 60, y: 80 }, { id: 1, l: 'B', x: 180, y: 60 }, { id: 2, l: 'C', x: 180, y: 200 }, { id: 3, l: 'D', x: 300, y: 130 }];
const ADJ = { 0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2] };
const EDGES = []; { const seen = new Set(); for (const a in ADJ) for (const b of ADJ[a]) { const k = Math.min(a, b) + '-' + Math.max(a, b); if (!seen.has(k)) { seen.add(k); EDGES.push([+a, b]); } } }
const ORDER = [0, 1, 2, 3];      // clone creation order (BFS from A)
const DX = 330;                   // clone offset

export default function GraphCloneVisualization() {
  const [n, setN] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setN(v => (v >= ORDER.length ? 0 : v + 1)), 0.9, auto);
  const cloned = new Set(ORDER.slice(0, n));

  return (
    <Stage2D
      title="Clone Graph" subtitle="Make a deep copy where every node and edge is new. The trick is a map from original node → its clone: create each clone once, then wire up edges using the map."
      accent="#a78bfa" viewBox="0 0 680 280"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setN(v => (v >= ORDER.length ? 0 : v + 1))}>step</button><button className="dsa2d-btn" onClick={() => setN(0)}>↺</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">cloned: {n}/{ORDER.length}</span></>}
      legend={<>DFS or BFS the original. Before copying a neighbour, check the <code>visited</code> map — if its clone exists, reuse it (this is what stops cycles like A↔B from looping forever); otherwise create it. Then connect clone edges. Time and space <code>O(V+E)</code>.</>}
    >
      <text x="150" y="30" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">original</text>
      <text x={150 + DX} y="30" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">clone</text>
      {/* original edges + nodes */}
      {EDGES.map(([a, b], k) => <line key={'o' + k} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} stroke="#30363d" strokeWidth="2" />)}
      {NODES.map(nn => { const done = cloned.has(nn.id); return <g key={'on' + nn.id}><circle cx={nn.x} cy={nn.y} r="18" fill={done ? 'rgba(167,139,250,.2)' : '#161b22'} stroke="#a78bfa" strokeWidth="2.5" className={ORDER[n - 1] === nn.id ? 'dsa2d-pulse' : ''} /><text x={nn.x} y={nn.y + 5} fill="#e6edf3" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{nn.l}</text></g>; })}
      {/* clone edges (appear when both endpoints cloned) + nodes */}
      {EDGES.map(([a, b], k) => { const on = cloned.has(a) && cloned.has(b); return <line key={'c' + k} x1={NODES[a].x + DX} y1={NODES[a].y} x2={NODES[b].x + DX} y2={NODES[b].y} stroke={on ? '#56d364' : 'transparent'} strokeWidth="2.5" />; })}
      {NODES.map(nn => { const done = cloned.has(nn.id); return done ? <g key={'cn' + nn.id} className="dsa2d-fade"><circle cx={nn.x + DX} cy={nn.y} r="18" fill="rgba(86,211,100,.18)" stroke="#56d364" strokeWidth="2.5" /><text x={nn.x + DX} y={nn.y + 5} fill="#56d364" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{nn.l}'</text></g> : null; })}
      <text x="340" y="268" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">visited map ensures each node is copied exactly once</text>
    </Stage2D>
  );
}

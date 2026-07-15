/* Lesson: Building a Binary Tree in Python
 * 2D animated: assemble a tree one node at a time using a Node class with left/right pointers,
 * wiring each child onto its parent. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const NODES = [
  { id: 0, v: 1, x: 320, y: 50, p: null, side: '' },
  { id: 1, v: 2, x: 200, y: 130, p: 0, side: 'left' },
  { id: 2, v: 3, x: 440, y: 130, p: 0, side: 'right' },
  { id: 3, v: 4, x: 140, y: 206, p: 1, side: 'left' },
  { id: 4, v: 5, x: 260, y: 206, p: 1, side: 'right' },
];
export default function TreeBuildVisualization() {
  const [n, setN] = useState(1);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setN(v => (v >= NODES.length ? 1 : v + 1)), 1.0, auto);

  return (
    <Stage2D
      title="Building a Binary Tree"
      subtitle="Each node is a small object holding a value plus left and right references. You grow the tree by attaching new nodes to a parent's left or right."
      accent="#a78bfa"
      viewBox="0 0 640 270"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setN(v => (v >= NODES.length ? 1 : v + 1))}>attach node</button>
          <button className="dsa2d-btn" onClick={() => setN(1)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{n === 1 ? 'root = Node(1)' : `root...${NODES[n - 1].side} = Node(${NODES[n - 1].v})`}</span>
        </>
      }
      legend={<><code>class Node: def __init__(self, val): self.val = val; self.left = self.right = None</code>. Link children with <code>parent.left = Node(...)</code>. The root reference is your entry point — everything else is reached by following left/right.</>}
    >
      {NODES.slice(0, n).map(nd => nd.p !== null && (() => {
        const par = NODES[nd.p];
        return <line key={'e' + nd.id} x1={par.x} y1={par.y + 18} x2={nd.x} y2={nd.y - 18} stroke="#a78bfa" strokeWidth="2" />;
      })())}
      {NODES.slice(0, n).map((nd, k) => (
        <g key={nd.id} className="dsa2d-fade">
          <circle cx={nd.x} cy={nd.y} r="22" fill="#161b22" stroke="#a78bfa" strokeWidth="2" className={k === n - 1 ? 'dsa2d-pop' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
          <text x={nd.x} y={nd.y + 6} fill="#e6edf3" fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{nd.v}</text>
          {nd.side && <text x={(nd.x + NODES[nd.p].x) / 2 + (nd.side === 'left' ? -14 : 14)} y={(nd.y + NODES[nd.p].y) / 2} fill="#6b7785" fontSize="10" textAnchor="middle" fontFamily="Consolas">{nd.side}</text>}
        </g>
      ))}
      <text x="320" y="252" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">each attachment is one pointer assignment: parent.left / parent.right</text>
    </Stage2D>
  );
}

/* Problem: Invert a Binary Tree
 * 2D animated: swap every node's left and right child, top to bottom. Toggle between the
 * original and its mirror image. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const P = { A: [320, 46], B: [190, 116], C: [450, 116], D: [120, 186], E: [260, 186], F: [380, 186], G: [500, 186] };
const EDGES = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'F'], ['C', 'G']];
const ORIG = { A: 50, B: 30, C: 70, D: 20, E: 40, F: 60, G: 80 };
const INV = { A: 50, B: 70, C: 30, D: 80, E: 60, F: 40, G: 20 };
export default function TreeInvertVisualization() {
  const [inv, setInv] = useState(false);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setInv(v => !v), 2.0, auto);
  const vals = inv ? INV : ORIG;

  return (
    <Stage2D
      title="Invert a Binary Tree"
      subtitle="Inverting (mirroring) means swapping the left and right child of every node. A tiny recursion — famously a whiteboard classic."
      accent="#a78bfa"
      viewBox="0 0 640 240"
      controls={
        <>
          <button className={`dsa2d-btn ${!inv ? 'dsa2d-btn--on' : ''}`} onClick={() => setInv(false)}>original</button>
          <button className={`dsa2d-btn ${inv ? 'dsa2d-btn--on' : ''}`} onClick={() => setInv(true)}>inverted</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<><code>invert(node): node.left, node.right = invert(node.right), invert(node.left)</code>. Every node's children swap, so the whole tree becomes its mirror image. One traversal → <strong>O(n)</strong> time, O(h) stack. Notice each level reads reversed after inverting.</>}
    >
      {EDGES.map(([a, b], i) => <line key={i} x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]} stroke="#30363d" strokeWidth="2" />)}
      {Object.entries(P).map(([id, [x, y]]) => (
        <g key={id}>
          <circle cx={x} cy={y} r="22" fill={inv ? 'rgba(167,139,250,.2)' : '#161b22'} stroke="#a78bfa" strokeWidth="2" className={inv ? 'dsa2d-pop' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
          <text x={x} y={y + 5} fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{vals[id]}</text>
        </g>
      ))}
      <text x="320" y="224" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">{inv ? 'every left/right pair swapped — the tree is mirrored' : 'original tree — toggle to mirror it'}</text>
    </Stage2D>
  );
}

/* Lesson: Tree Traversal — Preorder, Inorder, and Postorder
 * 2D animated: the three depth-first traversals on the same tree. Toggle the order and watch
 * the nodes light up in visiting sequence. Inorder on a BST yields sorted output. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const P = { 50: [320, 46], 30: [190, 116], 70: [450, 116], 20: [120, 186], 40: [260, 186], 60: [390, 186], 80: [520, 186] };
const EDGES = [[50, 30], [50, 70], [30, 20], [30, 40], [70, 60], [70, 80]];
const ORDERS = {
  preorder: [50, 30, 20, 40, 70, 60, 80],
  inorder: [20, 30, 40, 50, 60, 70, 80],
  postorder: [20, 40, 30, 60, 80, 70, 50],
};
export default function TreeTraversalVisualization() {
  const [order, setOrder] = useState('inorder');
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const seq = ORDERS[order];
  useAutoPlay(() => setStep(v => (v >= seq.length ? 0 : v + 1)), 0.7, auto, [order]);

  return (
    <Stage2D
      title="Tree Traversals"
      subtitle="Depth-first traversal visits every node — the ORDER depends on when you process the node relative to its children: before (pre), between (in), or after (post)."
      accent="#58a6ff"
      viewBox="0 0 640 270"
      controls={
        <>
          {Object.keys(ORDERS).map(o => <button key={o} className={`dsa2d-btn ${order === o ? 'dsa2d-btn--on' : ''}`} onClick={() => { setOrder(o); setStep(0); }}>{o}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<><strong>Preorder</strong> (node, L, R): copy/serialize a tree. <strong>Inorder</strong> (L, node, R): on a BST this returns values <em>sorted</em>. <strong>Postorder</strong> (L, R, node): delete or evaluate a tree bottom-up. All are O(n).</>}
    >
      {EDGES.map(([a, b], k) => <line key={k} x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]} stroke="#30363d" strokeWidth="2" />)}
      {Object.entries(P).map(([val, [x, y]]) => {
        const visitIdx = seq.slice(0, step).indexOf(+val);
        const visited = visitIdx !== -1;
        const cur = step > 0 && seq[step - 1] === +val;
        return (
          <g key={val}>
            <circle cx={x} cy={y} r="22" fill={cur ? 'rgba(88,166,255,.35)' : visited ? 'rgba(88,166,255,.12)' : '#161b22'} stroke={cur ? '#58a6ff' : visited ? '#3d5a80' : '#7c6bb0'} strokeWidth="2" className={cur ? 'dsa2d-pulse' : ''} />
            <text x={x} y={y + 5} fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{val}</text>
            {visited && <text x={x + 20} y={y - 16} fill="#58a6ff" fontSize="11" fontFamily="Consolas">{visitIdx + 1}</text>}
          </g>
        );
      })}
      {/* sequence */}
      <text x="60" y="242" fill="#8b949e" fontSize="12" fontFamily="Consolas">visit order:</text>
      <text x="150" y="242" fill="#79c0ff" fontSize="15" fontFamily="Consolas">{seq.slice(0, step).join(' → ')}</text>
      {order === 'inorder' && step >= seq.length && <text x="320" y="262" fill="#56d364" fontSize="12" textAnchor="middle" fontFamily="Consolas">inorder of a BST = sorted ✓</text>}
    </Stage2D>
  );
}

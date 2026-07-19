/* Lesson: Balanced Trees — A Conceptual Introduction to AVL Trees
 * 2D animated: inserting 30, 20, 10 in order makes a left-heavy chain. A single right rotation
 * rebalances it so no lookup path is longer than necessary. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function TreeAvlVisualization() {
  const [rotated, setRotated] = useState(false);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setRotated(r => !r), 2.2, auto);
  // unbalanced: 30 root -> 20 -> 10 (left chain). balanced: 20 root, 10 left, 30 right.
  const UNBAL = { 30: [320, 60], 20: [230, 140], 10: [140, 220] };
  const UNBAL_E = [[30, 20], [20, 10]];
  const BAL = { 20: [320, 80], 10: [220, 170], 30: [420, 170] };
  const BAL_E = [[20, 10], [20, 30]];
  const pos = rotated ? BAL : UNBAL;
  const edges = rotated ? BAL_E : UNBAL_E;

  return (
    <Stage2D
      title="Self-Balancing (AVL) Trees"
      subtitle="An AVL tree tracks each node's balance factor and performs rotations after inserts/deletes, guaranteeing height stays ~log n — so operations never degrade to O(n)."
      accent="#56d364"
      viewBox="0 0 640 270"
      controls={
        <>
          <button className={`dsa2d-btn ${!rotated ? 'dsa2d-btn--on' : ''}`} onClick={() => setRotated(false)}>unbalanced</button>
          <button className={`dsa2d-btn ${rotated ? 'dsa2d-btn--on' : ''}`} onClick={() => setRotated(true)}>after rotation</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={rotated
        ? <>A <strong>right rotation</strong> lifts 20 to the root with 10 and 30 as children — height drops from 2 to 1, balance restored. AVL and red-black trees automate these rotations to keep <strong>O(log n)</strong> guaranteed.</>
        : <>Inserting sorted values <code>30 → 20 → 10</code> creates a left-leaning chain (balance factor +2 at the root). The tree is <strong>unbalanced</strong> and search is degrading toward O(n). It needs a rotation.</>}
    >
      {edges.map(([a, b], k) => <line key={k} x1={pos[a][0]} y1={pos[a][1]} x2={pos[b][0]} y2={pos[b][1]} stroke={rotated ? '#56d364' : '#f0883e'} strokeWidth="2" style={{ transition: 'all .4s' }} />)}
      {Object.entries(pos).map(([v, [x, y]]) => (
        <g key={v} style={{ transition: 'all .4s' }}>
          <circle cx={x} cy={y} r="24" fill={rotated ? 'rgba(86,211,100,.15)' : 'rgba(240,136,62,.12)'} stroke={rotated ? '#56d364' : '#f0883e'} strokeWidth="2" />
          <text x={x} y={y + 5} fill="#e6edf3" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
        </g>
      ))}
      <text x="320" y="256" fill={rotated ? '#56d364' : '#f0883e'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">
        {rotated ? 'balanced · height 1 · O(log n)' : 'left-heavy chain · height 2 · rotate right →'}
      </text>
    </Stage2D>
  );
}

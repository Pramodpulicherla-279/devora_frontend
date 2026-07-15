/* Lesson: What Is a Heap? The Tree That Powers Priority Queues
 * 2D animated: a heap is a COMPLETE binary tree with the heap property — every parent is ≤
 * (min-heap) its children. Cycles through parents to show the invariant holds everywhere. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const VALS = [5, 8, 12, 15, 20, 30, 25];
const POS = [[320, 46], [200, 116], [440, 116], [140, 186], [260, 186], [380, 186], [500, 186]];
const EDGES = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
const PARENTS = [0, 1, 2];
export default function HeapIntroVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PARENTS.length), 1.8, auto);
  const p = PARENTS[i];
  const children = [2 * p + 1, 2 * p + 2].filter(c => c < VALS.length);

  return (
    <Stage2D
      title="What Is a Heap?"
      subtitle="A heap is a complete binary tree obeying the heap property: in a MIN-heap, every parent is ≤ both its children. The smallest value is therefore always at the root."
      accent="#56d364"
      viewBox="0 0 640 250"
      controls={
        <>
          {PARENTS.map((pp, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>check {VALS[pp]}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{VALS[p]} ≤ {children.map(c => VALS[c]).join(' & ')} ✓</span>
        </>
      }
      legend={<>Two rules define a heap: it's <strong>complete</strong> (filled left-to-right, no gaps) and it obeys the <strong>heap property</strong> (parent ≤ children for a min-heap). Note it's <em>not</em> a BST — siblings aren't ordered. This weaker order is exactly enough to grab the min/max in O(1).</>}
    >
      {EDGES.map(([a, b], k) => {
        const on = a === p && children.includes(b);
        return <line key={k} x1={POS[a][0]} y1={POS[a][1]} x2={POS[b][0]} y2={POS[b][1]} stroke={on ? '#56d364' : '#30363d'} strokeWidth={on ? 3 : 2} style={{ transition: 'stroke .3s' }} />;
      })}
      {VALS.map((v, k) => {
        const isP = k === p, isC = children.includes(k);
        return (
          <g key={k}>
            <circle cx={POS[k][0]} cy={POS[k][1]} r="22" fill={isP ? 'rgba(86,211,100,.3)' : isC ? 'rgba(88,166,255,.18)' : '#161b22'} stroke={isP ? '#56d364' : isC ? '#58a6ff' : '#7c6bb0'} strokeWidth="2" className={isP ? 'dsa2d-pulse' : ''} />
            <text x={POS[k][0]} y={POS[k][1] + 5} fill="#e6edf3" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      <text x="320" y="232" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">green parent ≤ blue children — true for every node → valid min-heap</text>
    </Stage2D>
  );
}

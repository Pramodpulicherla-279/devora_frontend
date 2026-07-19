/* Lesson: BST Performance — Best Case vs Worst Case (and Why Balance Matters)
 * 2D animated: the same values as a balanced tree (height ~log n) vs a degenerate chain from
 * inserting them already sorted (height n). Search cost depends entirely on height. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const BAL = { 40: [320, 46], 20: [200, 110], 60: [440, 110], 10: [130, 174], 30: [265, 174], 50: [385, 174], 70: [510, 174] };
const BAL_E = [[40, 20], [40, 60], [20, 10], [20, 30], [60, 50], [60, 70]];
const CHAIN = { 10: [180, 46], 20: [250, 96], 30: [320, 146], 40: [390, 196], 50: [460, 240] };
const CHAIN_E = [[10, 20], [20, 30], [30, 40], [40, 50]];
export default function TreeBalanceVisualization() {
  const [bal, setBal] = useState(true);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setBal(b => !b), 2.4, auto);

  return (
    <Stage2D
      title="Balance Determines Speed"
      subtitle="A BST is only fast if it's bushy. Insert values in sorted order and it degenerates into a linked list — search drops from O(log n) to O(n)."
      accent={bal ? '#56d364' : '#f85149'}
      viewBox="0 0 640 280"
      controls={
        <>
          <button className={`dsa2d-btn ${bal ? 'dsa2d-btn--on' : ''}`} onClick={() => setBal(true)}>balanced — O(log n)</button>
          <button className={`dsa2d-btn ${!bal ? 'dsa2d-btn--on' : ''}`} onClick={() => setBal(false)}>degenerate — O(n)</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={bal
        ? <>A <strong>balanced</strong> tree of n nodes has height ~<code>log₂(n)</code>, so search/insert/delete are all <strong>O(log n)</strong>. This is the whole point of a BST.</>
        : <>Inserting <strong>already-sorted</strong> values makes every node a right child — a straight chain of height n. Search is now <strong>O(n)</strong>, no better than a list. Self-balancing trees (AVL, red-black) prevent this.</>}
    >
      {bal ? <>
        {BAL_E.map(([a, b], k) => <line key={k} x1={BAL[a][0]} y1={BAL[a][1]} x2={BAL[b][0]} y2={BAL[b][1]} stroke="#30363d" strokeWidth="2" />)}
        {Object.entries(BAL).map(([v, [x, y]]) => <g key={v}><circle cx={x} cy={y} r="20" fill="rgba(86,211,100,.12)" stroke="#56d364" strokeWidth="2" /><text x={x} y={y + 5} fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text></g>)}
        <text x="320" y="232" fill="#56d364" fontSize="13" textAnchor="middle" fontFamily="Consolas">height 2 · reach any node in ≤3 comparisons</text>
      </> : <>
        {CHAIN_E.map(([a, b], k) => <line key={k} x1={CHAIN[a][0]} y1={CHAIN[a][1]} x2={CHAIN[b][0]} y2={CHAIN[b][1]} stroke="#f85149" strokeWidth="2" />)}
        {Object.entries(CHAIN).map(([v, [x, y]]) => <g key={v}><circle cx={x} cy={y} r="20" fill="rgba(248,81,73,.12)" stroke="#f85149" strokeWidth="2" /><text x={x} y={y + 5} fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text></g>)}
        <text x="320" y="272" fill="#f85149" fontSize="13" textAnchor="middle" fontFamily="Consolas">height 4 · worst case walks all 5 nodes</text>
      </>}
    </Stage2D>
  );
}

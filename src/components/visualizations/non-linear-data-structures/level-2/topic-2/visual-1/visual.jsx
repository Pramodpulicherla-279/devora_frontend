/* Lesson: Min-Heaps vs Max-Heaps
 * 2D animated: toggle between a min-heap (smallest on top) and a max-heap (largest on top).
 * Same shape, opposite ordering — the root is always the extreme value. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const POS = [[320, 46], [200, 116], [440, 116], [140, 186], [260, 186], [380, 186], [500, 186]];
const EDGES = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
const MIN = [5, 8, 12, 15, 20, 30, 25];
const MAX = [30, 25, 20, 8, 12, 15, 5];
export default function HeapMinMaxVisualization() {
  const [isMin, setIsMin] = useState(true);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setIsMin(m => !m), 2.2, auto);
  const vals = isMin ? MIN : MAX;

  return (
    <Stage2D
      title="Min-Heap vs Max-Heap"
      subtitle="A min-heap keeps the smallest value at the root; a max-heap keeps the largest. The structure is identical — only the comparison flips."
      accent={isMin ? '#58a6ff' : '#f0883e'}
      viewBox="0 0 640 250"
      controls={
        <>
          <button className={`dsa2d-btn ${isMin ? 'dsa2d-btn--on' : ''}`} onClick={() => setIsMin(true)}>min-heap</button>
          <button className={`dsa2d-btn ${!isMin ? 'dsa2d-btn--on' : ''}`} onClick={() => setIsMin(false)}>max-heap</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">root = {vals[0]} ({isMin ? 'minimum' : 'maximum'})</span>
        </>
      }
      legend={isMin
        ? <>A <strong>min-heap</strong> (parent ≤ children) gives O(1) access to the smallest element — ideal for "always process the smallest/nearest next". Python's <code>heapq</code> is a min-heap.</>
        : <>A <strong>max-heap</strong> (parent ≥ children) gives O(1) access to the largest element. In Python you fake one by negating values before pushing them onto <code>heapq</code>.</>}
    >
      {EDGES.map(([a, b], k) => <line key={k} x1={POS[a][0]} y1={POS[a][1]} x2={POS[b][0]} y2={POS[b][1]} stroke="#30363d" strokeWidth="2" />)}
      {vals.map((v, k) => {
        const isRoot = k === 0;
        const c = isMin ? '#58a6ff' : '#f0883e';
        return (
          <g key={k}>
            <circle cx={POS[k][0]} cy={POS[k][1]} r="22" fill={isRoot ? c + '44' : '#161b22'} stroke={isRoot ? c : '#7c6bb0'} strokeWidth="2" className={isRoot ? 'dsa2d-pulse' : ''} style={{ transition: 'all .3s' }} />
            <text x={POS[k][0]} y={POS[k][1] + 5} fill="#e6edf3" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      <text x="320" y="232" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">{isMin ? 'each parent ≤ its children → min bubbles to the top' : 'each parent ≥ its children → max bubbles to the top'}</text>
    </Stage2D>
  );
}

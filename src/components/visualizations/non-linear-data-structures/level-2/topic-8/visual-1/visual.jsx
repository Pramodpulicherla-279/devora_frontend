/* Lesson: Using Python's heapq Module
 * 2D animated: heapq turns a plain list into a min-heap. heappush adds, heappop removes the
 * smallest — always in O(log n). Steps through the API on a live list. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const SNAPS = [
  { v: [], code: 'heap = []' },
  { v: [7], code: 'heappush(heap, 7)' },
  { v: [3, 7], code: 'heappush(heap, 3)' },
  { v: [3, 7, 9], code: 'heappush(heap, 9)' },
  { v: [1, 3, 9, 7], code: 'heappush(heap, 1)' },
  { v: [3, 7, 9], code: 'heappop() → 1  (min)' },
  { v: [7, 9], code: 'heappop() → 3  (min)' },
];
export default function HeapHeapqVisualization() {
  const [s, setS] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setS(v => (v + 1) % SNAPS.length), 1.2, auto);
  const { v, code } = SNAPS[s];
  const CW = 60, gap = 8;
  const startX = 320 - (Math.max(v.length, 1) * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Python's heapq Module"
      subtitle="heapq implements a binary min-heap directly on a Python list. You never manage the tree yourself — just push and pop."
      accent="#56d364"
      viewBox="0 0 640 220"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setS(v => (v + 1) % SNAPS.length)}>next call</button>
          <button className="dsa2d-btn" onClick={() => setS(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{code}</span>
        </>
      }
      legend={<><code>from heapq import heappush, heappop</code>. Push and pop are <strong>O(log n)</strong>; <code>heap[0]</code> peeks the min in <strong>O(1)</strong>. For a max-heap, push negated values. <code>heapify(list)</code> converts an existing list in O(n). Note the list isn't fully sorted — only the heap invariant holds.</>}
    >
      <text x="320" y="60" fill="#7ee787" fontSize="16" textAnchor="middle" fontFamily="Consolas">{code}</text>
      <text x="60" y="112" fill="#8b949e" fontSize="12" fontFamily="Consolas">heap:</text>
      {v.length === 0 && <text x="320" y="118" fill="#8b949e" fontSize="15" textAnchor="middle" fontFamily="Consolas">[ ]</text>}
      {v.map((val, k) => {
        const isMin = k === 0;
        return (
          <g key={k} className="dsa2d-fade">
            <rect x={startX + k * (CW + gap)} y="90" width={CW} height="50" rx="8" fill={isMin ? 'rgba(86,211,100,.25)' : '#161b22'} stroke={isMin ? '#56d364' : '#30363d'} strokeWidth="2" className={isMin ? 'dsa2d-pop' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
            <text x={startX + k * (CW + gap) + CW / 2} y="121" fill="#e6edf3" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{val}</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="82" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">{k}</text>
            {isMin && <text x={startX + k * (CW + gap) + CW / 2} y="160" fill="#56d364" fontSize="11" textAnchor="middle" fontFamily="Consolas">heap[0] = min</text>}
          </g>
        );
      })}
      <text x="320" y="196" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">heap[0] is always the smallest — pop it in O(log n)</text>
    </Stage2D>
  );
}

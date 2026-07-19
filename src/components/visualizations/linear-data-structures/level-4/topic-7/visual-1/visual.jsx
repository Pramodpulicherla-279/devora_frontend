/* Lesson: Using collections.deque for Efficient Queues
 * 2D animated: a deque supports O(1) adds and removes at BOTH ends. Cycles through the four
 * operations to show none of them shift the interior. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const SNAPS = [
  { d: ['B', 'C', 'D'], op: 'start', hi: null },
  { d: ['A', 'B', 'C', 'D'], op: 'appendleft("A")', hi: 0 },
  { d: ['A', 'B', 'C', 'D', 'E'], op: 'append("E")', hi: 4 },
  { d: ['B', 'C', 'D', 'E'], op: 'popleft() → A', hi: null },
  { d: ['B', 'C', 'D'], op: 'pop() → E', hi: null },
];
export default function SqDequeVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % SNAPS.length), 1.2, auto);
  const { d, op, hi } = SNAPS[i];
  const CW = 62, gap = 8;
  const startX = 320 - (d.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="collections.deque"
      subtitle="A deque (double-ended queue) is implemented as a doubly linked list of blocks, giving O(1) appends and pops at either end — the right tool for a real queue."
      accent="#56d364"
      viewBox="0 0 640 210"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v + 1) % SNAPS.length)}>next op</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{op}</span>
        </>
      }
      legend={<>Unlike <code>list.pop(0)</code> (O(n)), a deque's <code>popleft()</code> and <code>appendleft()</code> are both <strong>O(1)</strong>. Use <code>from collections import deque</code> for queues, BFS frontiers, and sliding-window buffers. Trade-off: no O(1) random indexing in the middle.</>}
    >
      <text x={startX - 20} y="112" fill="#58a6ff" fontSize="12" textAnchor="end" fontFamily="Consolas">left</text>
      {d.map((v, k) => {
        const isHot = k === hi;
        return (
          <g key={k} className="dsa2d-fade">
            <rect x={startX + k * (CW + gap)} y="82" width={CW} height="52" rx="8" fill={isHot ? 'rgba(86,211,100,.25)' : '#161b22'} stroke={isHot ? '#56d364' : '#7c6bb0'} strokeWidth="2" className={isHot ? 'dsa2d-pop' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
            <text x={startX + k * (CW + gap) + CW / 2} y="114" fill="#e6edf3" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      <text x={startX + d.length * (CW + gap) + 2} y="112" fill="#56d364" fontSize="12" fontFamily="Consolas">right</text>
      <text x="320" y="172" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">appendleft / popleft ⟷ append / pop — all O(1)</text>
    </Stage2D>
  );
}

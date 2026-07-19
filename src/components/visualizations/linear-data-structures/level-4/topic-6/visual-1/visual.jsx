/* Lesson: Implementing a Queue — Why a List Isn't Always the Best Choice
 * 2D animated: dequeuing from a Python list means pop(0), which shifts every remaining element
 * one slot left — O(n) per dequeue. The fix (deque) is previewed. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const BASE = ['A', 'B', 'C', 'D', 'E'];
export default function SqQueueListProblemVisualization() {
  const [phase, setPhase] = useState(0); // 0 before, 1 removed front, 2 shifted
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setPhase(v => (v + 1) % 3), 1.3, auto);
  const CW = 60, gap = 8, startX = 150;

  return (
    <Stage2D
      title="Why list.pop(0) Is Slow"
      subtitle="A list looks like an easy queue — until you dequeue. Removing the front element forces every other element to shift down one index."
      accent="#f0883e"
      viewBox="0 0 640 230"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setPhase(v => (v + 1) % 3)}>step</button>
          <button className="dsa2d-btn" onClick={() => setPhase(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{phase === 0 ? 'queue.pop(0)' : phase === 1 ? 'front removed…' : 'everything shifts left → O(n)'}</span>
        </>
      }
      legend={<>Enqueue with <code>append()</code> is O(1), but <code>pop(0)</code> is <strong>O(n)</strong> because indices must stay contiguous — all n−1 elements slide left. For a real queue use <code>collections.deque</code> (O(1) at both ends) or a linked list. Never build a hot-path queue on <code>list.pop(0)</code>.</>}
    >
      {BASE.map((v, k) => {
        const removed = k === 0 && phase >= 1;
        const shift = phase >= 2 && k >= 1 ? -(CW + gap) : 0;
        return (
          <g key={k} style={{ transform: `translateX(${shift}px)`, transition: 'transform .4s', opacity: removed ? 0.2 : 1 }}>
            <rect x={startX + k * (CW + gap)} y="80" width={CW} height="52" rx="8"
              fill={removed ? 'rgba(248,81,73,.2)' : k >= 1 && phase >= 1 ? 'rgba(240,136,62,.14)' : '#161b22'}
              stroke={removed ? '#f85149' : k >= 1 && phase >= 1 ? '#f0883e' : '#30363d'} strokeWidth="2" />
            <text x={startX + k * (CW + gap) + CW / 2} y="112" fill="#e6edf3" fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            {!removed && <text x={startX + k * (CW + gap) + CW / 2} y="72" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">[{phase >= 2 ? k - 1 : k}]</text>}
            {removed && <text x={startX + CW / 2} y="72" fill="#f85149" fontSize="11" textAnchor="middle" fontFamily="Consolas">out</text>}
          </g>
        );
      })}
      <text x="320" y="176" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">{phase >= 2 ? 'each remaining element got a new index — that copy is the O(n) cost' : 'orange = elements that will have to move'}</text>
    </Stage2D>
  );
}

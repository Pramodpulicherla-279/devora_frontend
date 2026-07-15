/* Lesson: What Is a Queue? Understanding FIFO With Real Examples
 * 2D animated: a queue like a checkout line. enqueue adds at the rear, dequeue removes from the
 * front — First In, First Out. Steps through operations. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const SNAPS = [
  { q: ['A'], op: 'enqueue A' },
  { q: ['A', 'B'], op: 'enqueue B' },
  { q: ['A', 'B', 'C'], op: 'enqueue C' },
  { q: ['B', 'C'], op: 'dequeue → A (first in, first out)' },
  { q: ['C'], op: 'dequeue → B' },
  { q: ['C', 'D'], op: 'enqueue D' },
];
export default function SqQueueIntroVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % SNAPS.length), 1.1, auto);
  const { q, op } = SNAPS[i];
  const CW = 64, gap = 10, startX = 180;

  return (
    <Stage2D
      title="Queues: First In, First Out"
      subtitle="A queue works at both ends but in one direction of flow: new items join the rear, and items leave from the front — exactly like a line at a store."
      accent="#58a6ff"
      viewBox="0 0 640 220"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v + 1) % SNAPS.length)}>next op</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{op}</span>
        </>
      }
      legend={<>Two operations: <code>enqueue</code> (add at rear) and <code>dequeue</code> (remove from front). FIFO order preserves arrival sequence — used in task scheduling, print spoolers, BFS traversal, and any "fair, in-order" processing.</>}
    >
      <text x="140" y="118" fill="#56d364" fontSize="12" textAnchor="end" fontFamily="Consolas">front</text>
      {q.map((v, k) => {
        const isFront = k === 0, isRear = k === q.length - 1;
        return (
          <g key={k} className="dsa2d-fade">
            <rect x={startX + k * (CW + gap)} y="86" width={CW} height="52" rx="8" fill={isFront ? 'rgba(88,166,255,.25)' : isRear ? 'rgba(86,211,100,.18)' : '#161b22'} stroke={isFront ? '#58a6ff' : isRear ? '#56d364' : '#30363d'} strokeWidth="2" className={isRear ? 'dsa2d-pop' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
            <text x={startX + k * (CW + gap) + CW / 2} y="118" fill="#e6edf3" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      <text x={startX + q.length * (CW + gap) + 4} y="118" fill="#56d364" fontSize="12" fontFamily="Consolas">rear</text>
      <text x="320" y="74" fill="#58a6ff" fontSize="12" textAnchor="middle" fontFamily="Consolas">← dequeue (out)</text>
      <text x="320" y="176" fill="#56d364" fontSize="12" textAnchor="middle" fontFamily="Consolas">enqueue (in) →</text>
    </Stage2D>
  );
}

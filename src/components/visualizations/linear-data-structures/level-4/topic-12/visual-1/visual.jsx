/* Lesson: Where Stacks and Queues Show Up in Real Software
 * 2D animated: flip through real systems, tagging each as stack-powered (LIFO) or
 * queue-powered (FIFO) with a one-line why. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const USES = [
  { t: 'Function call stack', kind: 'stack', why: 'Each call pushes a frame; returning pops it — pure LIFO.' },
  { t: 'Undo / Redo', kind: 'stack', why: 'Most recent action is undone first — push actions, pop to undo.' },
  { t: 'Browser back button', kind: 'stack', why: 'Pages pile up; "back" pops the latest visited page.' },
  { t: 'Task / job scheduler', kind: 'queue', why: 'Jobs run in arrival order — enqueue at rear, run from front.' },
  { t: 'BFS & print spooler', kind: 'queue', why: 'Process neighbours / documents fairly, first-come-first-served.' },
  { t: 'Message queues (Kafka)', kind: 'queue', why: 'Producers enqueue events; consumers dequeue them in order.' },
];
export default function SqRealWorldVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % USES.length), 2.1, auto);
  const u = USES[i];
  const isStack = u.kind === 'stack';
  const c = isStack ? '#58a6ff' : '#56d364';

  return (
    <Stage2D
      title="Stacks & Queues in the Wild"
      subtitle="These two structures are everywhere in real systems. The question is always the same: do you want the newest item first (stack) or the oldest (queue)?"
      accent={c}
      viewBox="0 0 640 250"
      controls={
        <>
          {USES.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<><strong>Stacks (LIFO):</strong> call stacks, undo, browser history, DFS, expression parsing. <strong>Queues (FIFO):</strong> schedulers, BFS, print spoolers, buffering, message brokers. Reach for a stack when recency matters; a queue when fairness/order matters.</>}
    >
      <rect x="70" y="50" width="500" height="150" rx="14" fill="#0b0f15" stroke={c} strokeWidth="1.5" />
      <text x="96" y="92" fill="#e6edf3" fontSize="21" fontWeight="700" fontFamily="system-ui">{u.t}</text>
      <rect x={isStack ? 96 : 96} y="108" width="140" height="32" rx="16" fill={c + '22'} stroke={c} />
      <text x="166" y="130" fill={c} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{isStack ? 'STACK · LIFO' : 'QUEUE · FIFO'}</text>
      <foreignObject x="96" y="150" width="448" height="44">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '15px system-ui', lineHeight: 1.35 }}>{u.why}</div>
      </foreignObject>
      <text x="320" y="230" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">example {i + 1} of {USES.length}</text>
    </Stage2D>
  );
}

/* Lesson: Circular Queues — Solving the Wasted Space Problem
 * 2D animated: a fixed-size ring buffer. front and rear indices wrap around with modulo, so
 * space freed by dequeues gets reused instead of wasted. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const CAP = 6;
const OPS = ['E:10', 'E:20', 'E:30', 'D', 'E:40', 'E:50', 'D', 'E:60', 'E:70'];
function stateAt(step) {
  const slots = Array(CAP).fill(null); let front = 0, rear = 0, count = 0;
  for (let s = 0; s <= step && s < OPS.length; s++) {
    const op = OPS[s];
    if (op === 'D') { if (count > 0) { slots[front] = null; front = (front + 1) % CAP; count--; } }
    else { const val = op.split(':')[1]; if (count < CAP) { slots[rear] = val; rear = (rear + 1) % CAP; count++; } }
  }
  return { slots, front, rear, count };
}
const CX = 300, CY = 130, R = 82;
const pos = i => ({ x: CX + R * Math.cos(-Math.PI / 2 + i * 2 * Math.PI / CAP), y: CY + R * Math.sin(-Math.PI / 2 + i * 2 * Math.PI / CAP) });
export default function SqCircularQueueVisualization() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(v => (v >= OPS.length - 1 ? 0 : v + 1)), 1.0, auto);
  const { slots, front, rear, count } = stateAt(step);
  const curOp = OPS[Math.min(step, OPS.length - 1)];

  return (
    <Stage2D
      title="Circular Queue (Ring Buffer)"
      subtitle="A fixed array where indices wrap around: rear = (rear + 1) % capacity. When the queue passes the end, it reuses slots freed at the front — no wasted space."
      accent="#a78bfa"
      viewBox="0 0 640 260"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setStep(v => (v >= OPS.length - 1 ? 0 : v + 1))}>next op</button>
          <button className="dsa2d-btn" onClick={() => setStep(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{curOp === 'D' ? 'dequeue' : `enqueue ${curOp.split(':')[1]}`} · size {count}/{CAP}</span>
        </>
      }
      legend={<>Modular arithmetic makes the array behave like a ring. <code>front</code> and <code>rear</code> chase each other around; enqueue/dequeue are both <strong>O(1)</strong> with a <strong>fixed</strong> memory footprint. Ring buffers power streaming audio, keyboard buffers, and bounded producer/consumer queues.</>}
    >
      {slots.map((v, i) => {
        const p = pos(i);
        const isFront = i === front && count > 0;
        const isRear = i === rear && count > 0;
        const filled = v !== null;
        return (
          <g key={i}>
            <rect x={p.x - 26} y={p.y - 20} width="52" height="40" rx="7"
              fill={filled ? 'rgba(167,139,250,.22)' : '#0d1117'} stroke={isFront ? '#58a6ff' : isRear ? '#56d364' : filled ? '#a78bfa' : '#30363d'} strokeWidth={isFront || isRear ? 3 : 2} />
            <text x={p.x} y={p.y + 5} fill={filled ? '#e6edf3' : '#484f58'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v ?? '·'}</text>
            <text x={p.x} y={p.y - 26} fill="#6b7785" fontSize="9" textAnchor="middle" fontFamily="Consolas">{i}</text>
          </g>
        );
      })}
      <text x={CX} y={CY - 4} fill="#58a6ff" fontSize="12" textAnchor="middle" fontFamily="Consolas">front={front}</text>
      <text x={CX} y={CY + 14} fill="#56d364" fontSize="12" textAnchor="middle" fontFamily="Consolas">rear={rear}</text>
      <text x="540" y="120" fill="#58a6ff" fontSize="12" textAnchor="middle" fontFamily="Consolas">front</text>
      <text x="540" y="150" fill="#56d364" fontSize="12" textAnchor="middle" fontFamily="Consolas">rear</text>
    </Stage2D>
  );
}

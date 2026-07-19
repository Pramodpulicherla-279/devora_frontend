/* Lesson: Tail Recursion and Why Python Doesn't Optimize It
 * 2D animated: compare non-tail (a pending × waits on every frame's return) with tail-recursive
 * (an accumulator carries the answer down, nothing pending). Python stacks frames either way. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function CrTailRecursionVisualization() {
  const [tail, setTail] = useState(true);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setTail(t => !t), 2.4, auto);
  const frames = [4, 3, 2, 1, 0];
  const acc = [1, 4, 12, 24, 24];                 // accumulator carried down (tail)

  return (
    <Stage2D
      title="Tail Recursion"
      subtitle="A call is 'tail recursive' when the recursive call is the LAST thing it does — no pending operation waits for the return."
      accent="#a78bfa"
      viewBox="0 0 640 300"
      controls={
        <>
          <button className={`dsa2d-btn ${!tail ? 'dsa2d-btn--on' : ''}`} onClick={() => setTail(false)}>non-tail</button>
          <button className={`dsa2d-btn ${tail ? 'dsa2d-btn--on' : ''}`} onClick={() => setTail(true)}>tail-recursive</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={tail
        ? <>Tail form: <code>fact(n, acc)</code> carries the running product DOWN as a parameter — when it hits the base case the answer is already computed, nothing pending. Some languages reuse one frame for this (O(1) space). <strong>Python does NOT</strong> — it still stacks every frame.</>
        : <>Non-tail form: <code>n * fact(n-1)</code> leaves a <strong>pending multiply</strong> on each frame that can only finish after the child returns. The stack must hold every frame until the unwind.</>}
    >
      <text x="320" y="34" fill="#c9bdf5" fontSize="14" textAnchor="middle" fontFamily="Consolas">
        {tail ? 'def fact(n, acc=1): return fact(n-1, n*acc)   # last call = the return' : 'def fact(n): return n * fact(n-1)   # multiply pending after return'}
      </text>
      {frames.map((n, k) => (
        <g key={k}>
          <rect x="180" y={54 + k * 42} width="280" height="34" rx="7" fill="#161b22" stroke="#a78bfa" strokeWidth="1.5" />
          <text x="200" y={76 + k * 42} fill="#c9d1d9" fontSize="14" fontFamily="Consolas">fact({n}{tail ? `, acc=${acc[k]}` : ''})</text>
          {tail
            ? <text x="440" y={76 + k * 42} fill="#7ee787" fontSize="13" textAnchor="end" fontFamily="Consolas">acc={acc[k]}</text>
            : <text x="440" y={76 + k * 42} fill="#f0883e" fontSize="13" textAnchor="end" fontFamily="Consolas">{n === 0 ? '→1' : `${n}× ⏳`}</text>}
        </g>
      ))}
      <text x="320" y="288" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">
        {tail ? 'nothing pending — but Python still keeps all 5 frames (no tail-call optimization)' : 'orange ⏳ = a multiply waiting for the child to return'}
      </text>
    </Stage2D>
  );
}

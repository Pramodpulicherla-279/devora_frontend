/* Lesson: Base Cases — Why Every Recursive Function Needs an Exit
 * 2D animated: toggle a base case on/off. With it, frames stack then stop at 0. Without it,
 * frames keep stacking past the limit and turn red — a stack overflow. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const MAX = 8;
export default function CrBaseCaseVisualization() {
  const [frames, setFrames] = useState(1);
  const [hasBase, setHasBase] = useState(true);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setFrames(f => {
    if (hasBase) return f >= 5 ? 1 : f + 1;      // stops at n=0 (5 frames)
    return f >= MAX ? 1 : f + 1;                  // keeps going → overflow
  }), 0.6, auto, [hasBase]);
  const overflow = !hasBase && frames >= MAX;

  return (
    <Stage2D
      title="Base Cases: The Exit Door"
      subtitle="The base case is the condition that stops the recursion. Remove it and the function calls itself forever — until the call stack runs out of room."
      accent="#f85149"
      viewBox="0 0 640 300"
      controls={
        <>
          <button className={`dsa2d-btn ${hasBase ? 'dsa2d-btn--on' : ''}`} onClick={() => { setHasBase(true); setFrames(1); }}>with base case ✓</button>
          <button className={`dsa2d-btn ${!hasBase ? 'dsa2d-btn--on' : ''}`} onClick={() => { setHasBase(false); setFrames(1); }}>no base case ✗</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={hasBase
        ? <>With <code>if n == 0: return</code>, each call shrinks toward 0, hits the base case, and the stack unwinds cleanly. ✓</>
        : <>With no base case, <code>n</code> never stops shrinking, frames pile up without limit, and Python raises <strong>RecursionError</strong> (stack overflow). Always write the exit first.</>}
    >
      {Array.from({ length: hasBase ? 5 : MAX }).map((_, k) => {
        const shown = k < frames;
        const isBase = hasBase && k === 4;
        const bad = !hasBase && k >= MAX - 1 && overflow;
        return (
          <g key={k} style={{ opacity: shown ? 1 : 0.1, transition: 'opacity .3s' }}>
            <rect x="200" y={230 - k * 40} width="240" height="34" rx="7"
              fill={bad ? 'rgba(248,81,73,.2)' : isBase ? 'rgba(86,211,100,.15)' : '#161b22'}
              stroke={bad ? '#f85149' : isBase ? '#56d364' : '#30363d'} strokeWidth="2"
              className={shown && k === frames - 1 ? 'dsa2d-pulse' : ''} />
            <text x="320" y={252 - k * 40} fill={bad ? '#ff9d95' : isBase ? '#56d364' : '#c9d1d9'} fontSize="14" textAnchor="middle" fontFamily="Consolas">
              {isBase ? 'n=0 → return (stop)' : hasBase ? `f(n=${4 - k})` : `f(n=${-k})`}
            </text>
          </g>
        );
      })}
      {overflow && <text x="320" y="30" fill="#f85149" fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="Consolas" className="dsa2d-pulse">💥 RecursionError: stack overflow</text>}
      <text x="80" y="150" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui" transform="rotate(-90 80 150)">call stack grows ↑</text>
    </Stage2D>
  );
}

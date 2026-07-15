/* Lesson: Recursion vs Iteration — When to Use Which
 * 2D animated: same task (sum 1..n) computed two ways side by side — a loop that updates one
 * accumulator vs recursive frames that stack. Both reach the same answer. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const N = 5;
export default function CrRecursionVsIterationVisualization() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(v => (v + 1) % (N + 2)), 0.85, auto);
  const acc = [0, 1, 3, 6, 10, 15][Math.min(step, N)];

  return (
    <Stage2D
      title="Recursion vs Iteration"
      subtitle="Two ways to sum 1..n. Iteration keeps ONE running total in a loop; recursion stacks a frame per number. Same result, different cost profile."
      accent="#a78bfa"
      viewBox="0 0 640 300"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setStep(v => (v + 1) % (N + 2))}>step</button>
          <button className="dsa2d-btn" onClick={() => setStep(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<><strong>Iteration:</strong> O(1) memory — one accumulator, no stack. <strong>Recursion:</strong> O(n) memory — a frame per call, but often cleaner for tree/branching problems. Prefer loops for simple sequences; reach for recursion when the structure itself is recursive.</>}
    >
      <line x1="320" y1="20" x2="320" y2="280" stroke="#30363d" strokeDasharray="4 4" />
      {/* Iteration panel */}
      <text x="150" y="40" fill="#58a6ff" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Iteration (loop)</text>
      <rect x="70" y="60" width="160" height="46" rx="8" fill="#161b22" stroke="#58a6ff" strokeWidth="2" />
      <text x="150" y="80" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">total</text>
      <text x="150" y="99" fill="#79c0ff" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{acc}</text>
      <text x="150" y="140" fill="#c9d1d9" fontSize="13" textAnchor="middle" fontFamily="Consolas">{step <= N ? `+ ${Math.min(step, N)}` : '✓ done'}</text>
      <text x="150" y="250" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">O(1) memory</text>
      {/* Recursion panel */}
      <text x="480" y="40" fill="#a78bfa" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Recursion (frames)</text>
      {Array.from({ length: N }).map((_, k) => {
        const shown = k < step;
        return (
          <g key={k} style={{ opacity: shown ? 1 : 0.12, transition: 'opacity .3s' }}>
            <rect x="400" y={60 + k * 34} width="160" height="28" rx="6" fill="#161b22" stroke="#a78bfa" strokeWidth="1.5" className={shown && k === step - 1 ? 'dsa2d-pulse' : ''} />
            <text x="480" y={79 + k * 34} fill="#c9bdf5" fontSize="13" textAnchor="middle" fontFamily="Consolas">sum({N - k})</text>
          </g>
        );
      })}
      <text x="480" y="250" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">O(n) memory</text>
      <text x="320" y="290" fill="#56d364" fontSize="13" textAnchor="middle" fontFamily="Consolas">both → 15</text>
    </Stage2D>
  );
}

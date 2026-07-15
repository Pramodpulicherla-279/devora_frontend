/* Lesson: Converting a Recursive Function Into an Iterative One
 * 2D animated: same factorial, shown as recursion (frames on a stack) morphing into a loop
 * (one accumulator, no stack). Toggle between the two forms. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function CrRecursiveToIterativeVisualization() {
  const [iter, setIter] = useState(false);
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(s => { const n = (s + 1) % 6; if (n === 0) setIter(v => !v); return n; }), 0.8, auto);
  const products = [1, 1, 2, 6, 24, 24];

  return (
    <Stage2D
      title="Recursion → Iteration"
      subtitle="Any recursion can be rewritten as a loop (sometimes with an explicit stack). For simple linear recursion like factorial, a plain loop replaces the whole call stack."
      accent="#58a6ff"
      viewBox="0 0 640 290"
      controls={
        <>
          <button className={`dsa2d-btn ${!iter ? 'dsa2d-btn--on' : ''}`} onClick={() => { setIter(false); setStep(0); }}>recursive</button>
          <button className={`dsa2d-btn ${iter ? 'dsa2d-btn--on' : ''}`} onClick={() => { setIter(true); setStep(0); }}>iterative</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={iter
        ? <><code>result = 1; for i in range(1, n+1): result *= i</code>. One variable, one loop — <strong>O(1)</strong> extra space, no stack frames, no overflow risk. Best for straightforward linear recursion.</>
        : <>Recursive <code>n * fact(n-1)</code> uses <strong>O(n)</strong> stack space. Fine and readable — but branching recursion (trees, backtracking) is where recursion truly earns its keep; plain loops are better here.</>}
    >
      {!iter ? (
        <>
          <text x="320" y="36" fill="#79c0ff" fontSize="14" textAnchor="middle" fontFamily="Consolas">call stack — one frame per number</text>
          {[4, 3, 2, 1, 0].map((n, k) => (
            <g key={k} style={{ opacity: k < step ? 1 : 0.15, transition: 'opacity .3s' }}>
              <rect x="200" y={54 + k * 40} width="240" height="32" rx="6" fill="#161b22" stroke="#58a6ff" strokeWidth="1.5" className={k === step - 1 ? 'dsa2d-pulse' : ''} />
              <text x="320" y={75 + k * 40} fill="#c9d1d9" fontSize="14" textAnchor="middle" fontFamily="Consolas">fact({n})</text>
            </g>
          ))}
          <text x="320" y="272" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">O(n) stack space</text>
        </>
      ) : (
        <>
          <text x="320" y="36" fill="#79c0ff" fontSize="14" textAnchor="middle" fontFamily="Consolas">one loop — one accumulator</text>
          <rect x="240" y="70" width="160" height="60" rx="10" fill="#0b0f15" stroke="#58a6ff" strokeWidth="2" />
          <text x="320" y="94" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">result</text>
          <text x="320" y="118" fill="#79c0ff" fontSize="24" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{products[step]}</text>
          <text x="320" y="170" fill="#c9d1d9" fontSize="15" textAnchor="middle" fontFamily="Consolas">{step === 0 ? 'result = 1' : step <= 4 ? `result *= ${step}` : '✓ done'}</text>
          {/* i track */}
          {[1, 2, 3, 4].map(i => (
            <g key={i}>
              <rect x={210 + (i - 1) * 60} y="200" width="44" height="30" rx="6" fill={i <= step ? 'rgba(88,166,255,.18)' : '#161b22'} stroke={i <= step ? '#58a6ff' : '#30363d'} />
              <text x={232 + (i - 1) * 60} y="220" fill={i <= step ? '#79c0ff' : '#6b7785'} fontSize="14" textAnchor="middle" fontFamily="Consolas">{i}</text>
            </g>
          ))}
          <text x="320" y="272" fill="#56d364" fontSize="12" textAnchor="middle" fontFamily="Consolas">O(1) space — no stack</text>
        </>
      )}
    </Stage2D>
  );
}

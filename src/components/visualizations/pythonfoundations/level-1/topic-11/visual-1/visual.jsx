/* Lesson: Debugging Python Code Like a Professional
 * 2D animated step-debugger: walk average([10,20,30]) line by line, watching the
 * variable panel until the returned value surprises you — that's the bug. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const TRACE = [
  { line: 'def average(nums):', vars: {}, note: 'define the function' },
  { line: '  total = 0', vars: { total: 0 }, note: 'accumulator = 0' },
  { line: '  for n in nums: total += n', vars: { total: 60, n: 30 }, note: 'loop done: total = 60' },
  { line: '  return total / len(nums) - 1', vars: { total: 60, ret: 19 }, note: '🐛 19?! expected 20' },
  { line: '  return total / len(nums)', vars: { total: 60, ret: 20 }, note: 'fixed → 20 ✓' },
];

export default function PfDebuggingVisualization() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(s => (s + 1) % TRACE.length), 1.9, auto);
  const t = TRACE[step];
  const bug = step === 3, fixed = step === 4;

  return (
    <Stage2D
      title="Debugging: step, inspect, isolate"
      subtitle="average([10,20,30]) returns 19 instead of 20. Step through and watch the variables — the moment a value surprises you, you've found the line."
      accent="#ffd43b"
      viewBox="0 0 640 280"
      controls={
        <>
          <button className="pf2d-btn" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>⏮</button>
          <button className="pf2d-btn pf2d-btn--primary" onClick={() => setStep(s => Math.min(TRACE.length - 1, s + 1))} disabled={step === TRACE.length - 1}>step ⏭</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <button className="pf2d-btn" onClick={() => setStep(0)}>↺</button>
          <span className="pf2d-readout">{step + 1}/{TRACE.length} — {t.note}</span>
        </>
      }
      legend={bug
        ? <>Found it: precedence. <code>total / len(nums) - 1</code> is <code>(total/len) - 1</code> = 20 − 1 = 19. Debugging is comparing <em>expected</em> vs <em>actual</em> state at each line.</>
        : fixed ? <>Fixed → 20. Pro habits: reproduce first, read the traceback bottom-up, inspect variables at checkpoints, change <strong>one thing</strong> at a time.</>
        : <>Watch the variable panel on the right as you step. A debugger (or a well-placed <code>print()</code>) shows the program's <em>actual</em> state — bugs live in the gap between that and what you assumed.</>}
    >
      {/* code panel */}
      {TRACE.map((r, i) => (
        <g key={i}>
          <rect x="24" y={30 + i * 44} width="380" height="36" rx="6"
            fill={i === step ? (i === 3 ? '#3a1416' : i === 4 ? '#0d2818' : '#1c2432') : '#111318'} className="pf2d-fade" />
          <text x="38" y={54 + i * 44} fill={i === step ? '#ffd43b' : '#8b949e'} fontSize="13" fontFamily="Consolas">{(i === step ? '▶ ' : '  ') + r.line}</text>
        </g>
      ))}
      {/* variable panel */}
      <rect x="424" y="30" width="192" height="220" rx="10" fill="#0d1117" stroke="#21262d" />
      <text x="440" y="52" fill="#8b949e" fontSize="12" fontFamily="system-ui">watch variables</text>
      {Object.entries(t.vars).map(([k, v], i) => (
        <g key={k} className="pf2d-pop" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <rect x="440" y={66 + i * 52} width="160" height="42" rx="8" fill={k === 'ret' ? (bug ? '#3a1416' : '#0d2818') : '#161b22'} stroke={k === 'ret' ? (bug ? '#f85149' : '#238636') : '#30363d'} />
          <text x="452" y={92 + i * 52} fill="#e6edf3" fontSize="15" fontFamily="Consolas">{k} = {v}</text>
        </g>
      ))}
      {bug && <text x="520" y="240" fill="#f85149" fontSize="13" textAnchor="middle" fontFamily="system-ui">🐛 expected 20</text>}
      {fixed && <text x="520" y="240" fill="#56d364" fontSize="13" textAnchor="middle" fontFamily="system-ui">✓ fixed</text>}
    </Stage2D>
  );
}

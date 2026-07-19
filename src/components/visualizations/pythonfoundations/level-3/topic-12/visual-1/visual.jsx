/* Lesson: Putting It Together — Designing a Simple Class From Scratch
 * 2D animated: the Stack class builds up line by line on the left; on the right the
 * live LIFO structure grows and shrinks as push/pop run. Auto-steps then push/pops. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const STEPS = [
  { code: 'class Stack:', note: 'one responsibility: LIFO' },
  { code: '  def __init__(self):', note: 'hide the state…' },
  { code: '    self._items = []', note: 'composition: HAS-A list' },
  { code: '  def push(self, x):', note: 'append → O(1)' },
  { code: '  def pop(self):', note: 'pop from the end → O(1)' },
  { code: '  def __len__(self):', note: 'join the language' },
];

export default function PfDesignClassVisualization() {
  const [step, setStep] = useState(0);
  const [stack, setStack] = useState([]);
  const [auto, setAuto] = useState(true);
  const push = () => setStack(a => a.length < 4 ? [...a, a.length + 1] : a);
  const pop = () => setStack(a => a.slice(0, -1));
  useAutoPlay(() => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else if (stack.length < 3) push();
    else if (stack.length > 0) pop();
    else setStep(0);
  }, 1.5, auto, [step, stack.length]);
  const built = step >= STEPS.length - 1;

  return (
    <Stage2D
      title="Design a class from scratch: Stack"
      subtitle="Everything from this course, assembled: encapsulated state, methods, dunders — ending in a working LIFO stack you can drive."
      accent="#56d364"
      viewBox="0 0 640 260"
      controls={
        <>
          <button className="pf2d-btn" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>⏮</button>
          <button className="pf2d-btn pf2d-btn--primary" onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))} disabled={step === STEPS.length - 1}>next ⏭</button>
          {built && <><button className="pf2d-btn" onClick={push}>push</button><button className="pf2d-btn" onClick={pop} disabled={!stack.length}>pop</button></>}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="pf2d-readout">{STEPS[step].note}</span>
        </>
      }
      legend={built
        ? <>Drive your creation: <code>push</code> stacks a crate on top, <code>pop</code> removes the top one — <strong>Last-In, First-Out</strong>. You've just built the exact class the DSA stack chapter starts from: encapsulated list, O(1) ops, clean interface. Note it uses composition (HAS-A list), not inheritance.</>
        : <>The design drill: <strong>concept → private state → behavior → dunders → use</strong>. Follow this recipe for any structure you build in DSA.</>}
    >
      {/* code panel */}
      {STEPS.map((s, i) => (
        <text key={i} x="24" y={40 + i * 30} fill={i <= step ? (i === step ? '#56d364' : '#c9d1d9') : '#30363d'} fontSize="15" fontFamily="Consolas" className="pf2d-fade">{(i === step ? '▶' : ' ') + s.code}</text>
      ))}
      {/* live stack */}
      <line x1="420" y1="228" x2="600" y2="228" stroke="#30363d" strokeWidth="3" />
      <text x="510" y="30" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">{built ? `len(s) = ${stack.length}` : 'appears at the end'}</text>
      {stack.map((v, i) => (
        <g key={i} className="pf2d-pop" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <rect x="450" y={210 - i * 48} width="120" height="42" rx="8" fill={i === stack.length - 1 ? '#56d364' : '#161b22'} stroke={i === stack.length - 1 ? '#56d364' : '#30363d'} strokeWidth="2" />
          <text x="510" y={237 - i * 48} fill={i === stack.length - 1 ? '#0d1117' : '#e6edf3'} fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          {i === stack.length - 1 && <text x="584" y={237 - i * 48} fill="#ffd43b" fontSize="12" fontFamily="Consolas">← top</text>}
        </g>
      ))}
    </Stage2D>
  );
}

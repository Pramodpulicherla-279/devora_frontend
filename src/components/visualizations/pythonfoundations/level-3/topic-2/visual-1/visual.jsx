/* Lesson: Defining Your First Class — Attributes and the Constructor
 * 2D animated: step through Dog("Rex", 3); each self.x = ... line installs one attribute
 * slot into the new object. Auto-steps the construction. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const STEPS = [
  { line: 'rex = Dog("Rex", 3)', note: 'Python allocates an empty object' },
  { line: '__init__(self, name, age)', note: 'self = the new empty object' },
  { line: 'self.name = "Rex"', note: 'first slot installed' },
  { line: 'self.age = 3', note: 'second slot installed' },
  { line: 'rex is ready', note: 'object returned, bound to rex' },
];

export default function PfFirstClassVisualization() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(s => (s + 1) % STEPS.length), 1.8, auto);
  const hasName = step >= 2, hasAge = step >= 3, done = step >= 4;

  return (
    <Stage2D
      title="Your first class: the constructor"
      subtitle='class Dog:  def __init__(self, name, age): … — step through what happens when you call Dog("Rex", 3).'
      accent="#56d364"
      viewBox="0 0 640 250"
      controls={
        <>
          <button className="pf2d-btn" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>⏮</button>
          <button className="pf2d-btn pf2d-btn--primary" onClick={() => setStep(s => Math.min(4, s + 1))} disabled={step === 4}>step ⏭</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <button className="pf2d-btn" onClick={() => setStep(0)}>↺</button>
          <span className="pf2d-readout">{STEPS[step].line} — {STEPS[step].note}</span>
        </>
      }
      legend={<><code>__init__</code> doesn't create the object — Python already allocated it. Its job is to <strong>initialise</strong> it: every <code>self.x = value</code> installs one slot. Forget a slot and later code hits <code>AttributeError</code>.</>}
    >
      {/* __init__ box */}
      <rect x="40" y="90" width="180" height="70" rx="12" fill="#161b22" stroke="#56d364" strokeWidth="2" className={step >= 1 && !done ? 'pf2d-pulse' : ''} />
      <text x="130" y="122" fill="#56d364" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">__init__</text>
      <text x="130" y="144" fill="#c9d1d9" fontSize="11" textAnchor="middle" fontFamily="Consolas">(self, name, age)</text>
      {/* object being built */}
      <rect x="330" y="50" width="270" height="170" rx="14" fill={done ? '#0d2818' : '#111318'} stroke={done ? '#238636' : '#30363d'} strokeWidth="2" className="pf2d-fade" />
      <text x="465" y="78" fill={done ? '#56d364' : '#8b949e'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{step === 0 ? '(allocating…)' : done ? 'rex — Dog object' : 'self → new object'}</text>
      <g className="pf2d-fade">
        <rect x="352" y="96" width="226" height="46" rx="8" fill={hasName ? '#58a6ff' : '#0d1117'} stroke={hasName ? '#58a6ff' : '#30363d'} />
        <text x="465" y="124" fill={hasName ? '#0d1117' : '#6e7681'} fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{hasName ? 'name = "Rex"' : 'name: (empty)'}</text>
      </g>
      <g className="pf2d-fade">
        <rect x="352" y="156" width="226" height="46" rx="8" fill={hasAge ? '#f97316' : '#0d1117'} stroke={hasAge ? '#f97316' : '#30363d'} />
        <text x="465" y="184" fill={hasAge ? '#0d1117' : '#6e7681'} fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{hasAge ? 'age = 3' : 'age: (empty)'}</text>
      </g>
      {step >= 1 && !done && <line x1="220" y1="125" x2="330" y2="125" stroke="#56d364" strokeWidth="2.5" className="pf2d-flow" />}
    </Stage2D>
  );
}

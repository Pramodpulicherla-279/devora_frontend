/* Lesson: Analyzing Your Own Functions Step by Step
 * 2D animated code-walk: highlight each line, tag its cost, accumulate the total, then
 * collapse to the final Big O. Auto-steps through the function. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const LINES = [
  { t: 'def has_pair(nums, target):', cost: '', tag: '' },
  { t: '    seen = set()', cost: 'O(1)', tag: '1 op' },
  { t: '    for x in nums:', cost: 'O(n)', tag: 'loop ×n' },
  { t: '        if target - x in seen:', cost: 'O(1)', tag: 'set lookup' },
  { t: '            return True', cost: 'O(1)', tag: '' },
  { t: '        seen.add(x)', cost: 'O(1)', tag: 'set add' },
  { t: '    return False', cost: 'O(1)', tag: '' },
];

export default function CaAnalyzingFunctionsVisualization() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(v => (v + 1) % (LINES.length + 1)), 1.0, auto);
  const done = step >= LINES.length;

  return (
    <Stage2D
      title="Analyzing a Function, Line by Line"
      subtitle="Walk each line, note what it costs, multiply loop bodies by their iterations, then keep the dominant term."
      accent="#58a6ff"
      viewBox="0 0 640 300"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setStep(s => (s + 1) % (LINES.length + 1))}>next line</button>
          <button className="dsa2d-btn" onClick={() => setStep(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>The set lookup on line 4 is <code>O(1)</code>, but it runs inside a loop that repeats <code>n</code> times → <code>O(n)·O(1) = O(n)</code>. Everything else is constant, so the whole function is <strong>O(n)</strong> time and <strong>O(n)</strong> space (the <code>seen</code> set).</>}
    >
      {LINES.map((ln, k) => {
        const active = k === step && !done;
        const passed = k < step;
        return (
          <g key={k} style={{ opacity: passed || active ? 1 : 0.4, transition: 'opacity .3s' }}>
            {active && <rect x="30" y={26 + k * 26} width="470" height="24" rx="5" fill="rgba(88,166,255,.16)" />}
            <text x="44" y={43 + k * 26} fill={active ? '#79c0ff' : '#c9d1d9'} fontSize="15" fontFamily="Consolas">{ln.t}</text>
            {(passed || active) && ln.cost && <text x="512" y={43 + k * 26} fill={ln.cost.includes('n') ? '#f0883e' : '#56d364'} fontSize="13" fontFamily="Consolas">{ln.cost}</text>}
          </g>
        );
      })}
      {/* total */}
      <line x1="30" y1="220" x2="610" y2="220" stroke="#30363d" />
      <text x="44" y="248" fill="#8b949e" fontSize="14" fontFamily="system-ui">total =</text>
      <g style={{ opacity: done ? 1 : 0.3, transition: 'opacity .4s' }}>
        <rect x="120" y="230" width="180" height="34" rx="8" fill="rgba(88,166,255,.14)" stroke="#58a6ff" />
        <text x="210" y="253" fill="#79c0ff" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">O(n) time</text>
        <text x="340" y="253" fill="#8b949e" fontSize="14" fontFamily="Consolas">·  O(n) space</text>
      </g>
    </Stage2D>
  );
}

/* Lesson: How to Recognize a DP Problem in an Interview
 * 2D animated: cycle through the tell-tale signals that a problem wants dynamic programming. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const SIGNALS = [
  { t: '"Count the number of ways…"', c: '#58a6ff', why: 'Counting distinct paths/combinations almost always decomposes into summed subproblems.' },
  { t: '"Find the minimum / maximum…"', c: '#f0a35e', why: 'Optimising over sequential choices (cost, profit, length) is DP territory.' },
  { t: 'Choices at every step + overlapping futures', c: '#a78bfa', why: 'Take-or-skip decisions whose remaining subproblem repeats across branches.' },
  { t: 'The brute force is exponential', c: '#f85149', why: 'If naive recursion is O(2ⁿ) but the distinct states are few, memoize them.' },
  { t: 'Answer for n builds on n-1, n-2, …', c: '#4fce78', why: 'A clean recurrence relation is the strongest possible hint.' },
];
export default function DpRecognizeVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % SIGNALS.length), 2.3, auto);
  const s = SIGNALS[i];
  return (
    <Stage2D title="Recognising a DP Problem" subtitle="Interviewers rarely say 'use DP'. They hand you a story; you spot the structure. These five signals cover the vast majority of DP questions."
      accent={s.c} viewBox="0 0 640 260"
      controls={<>{SIGNALS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>Once you suspect DP, work the checklist: define the <strong>state</strong> (what does dp[i] mean?), the <strong>recurrence</strong> (how does it build from smaller states?), the <strong>base cases</strong>, and the <strong>answer location</strong>. If you can fill those four in, the code follows.</>}>
      <rect x="70" y="50" width="500" height="140" rx="14" fill="#0b0f15" stroke={s.c} strokeWidth="1.5" />
      <text x="320" y="98" fill="#e6edf3" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{s.t}</text>
      <rect x="245" y="112" width="150" height="30" rx="15" fill={s.c + '22'} stroke={s.c} />
      <text x="320" y="132" fill={s.c} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">→ think DP</text>
      <foreignObject x="96" y="150" width="448" height="36"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '13.5px system-ui', lineHeight: 1.35, textAlign: 'center' }}>{s.why}</div></foreignObject>
      <text x="320" y="230" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">signal {i + 1} of {SIGNALS.length}</text>
    </Stage2D>
  );
}

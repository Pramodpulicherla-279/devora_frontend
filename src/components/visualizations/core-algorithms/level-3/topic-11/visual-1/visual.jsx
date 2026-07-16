/* Lesson: Backtracking vs Dynamic Programming — How to Tell Which One You Need
 * 2D animated: cycle through signals that point to backtracking vs DP. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const CASES = [
  { q: '"List / print ALL solutions"', a: 'Backtracking', c: '#a78bfa', why: 'You must actually enumerate each distinct configuration — there is nothing to collapse.' },
  { q: '"Count the number of ways" or "find the best value"', a: 'Dynamic Programming', c: '#58a6ff', why: 'You only need an aggregate, and subproblems repeat — memoize their answers.' },
  { q: 'Subproblems overlap heavily', a: 'Dynamic Programming', c: '#58a6ff', why: 'The same state is reached many ways; caching turns exponential into polynomial.' },
  { q: 'Each path leads to a unique state (a tree)', a: 'Backtracking', c: '#a78bfa', why: 'No overlap to exploit, so just explore with choose/explore/un-choose.' },
];
export default function BtVsDpVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % CASES.length), 2.3, auto);
  const c = CASES[i];
  return (
    <Stage2D title="Backtracking vs Dynamic Programming" subtitle="Both explore a space of choices, but they answer different questions. The tell is whether subproblems repeat and whether you need every solution or just a count/optimum."
      accent={c.c} viewBox="0 0 640 260"
      controls={<>{CASES.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>Rule of thumb: <strong>overlapping subproblems + "count/optimize"</strong> → memoize (DP). <strong>Distinct configurations + "list them all"</strong> → backtracking. Many problems start as backtracking and become DP once you notice the same state recomputed — that's exactly the naive-vs-memoized Fibonacci story.</>}>
      <rect x="70" y="52" width="500" height="150" rx="14" fill="#0b0f15" stroke={c.c} strokeWidth="1.5" />
      <text x="320" y="96" fill="#e6edf3" fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{c.q}</text>
      <rect x={210} y="112" width="220" height="34" rx="17" fill={c.c + '22'} stroke={c.c} />
      <text x="320" y="134" fill={c.c} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">→ {c.a}</text>
      <foreignObject x="96" y="156" width="448" height="42"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '14px system-ui', lineHeight: 1.35, textAlign: 'center' }}>{c.why}</div></foreignObject>
      <text x="320" y="236" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">signal {i + 1} of {CASES.length}</text>
    </Stage2D>
  );
}

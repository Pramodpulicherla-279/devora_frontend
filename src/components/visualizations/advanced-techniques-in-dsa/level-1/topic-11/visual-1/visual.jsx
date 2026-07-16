/* Lesson: Greedy vs Dynamic Programming — Spotting the Difference Early
 * 2D animated: cycle through the signals that separate a safe greedy commit from a problem
 * that needs DP's consider-everything approach. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const CASES = [
  { q: 'Does the local best ever hurt you later?', a: 'Yes → DP', c: '#58a6ff', why: 'Coin {1,3,4} target 6: taking the 4 looks great and ruins the answer. Choices interact → DP.' },
  { q: 'Can you PROVE local best is safe?', a: 'Yes → Greedy', c: '#f0a35e', why: 'Activity selection: an exchange argument shows taking the earliest finisher never loses. Commit freely.' },
  { q: 'Do subproblems overlap and repeat?', a: 'Yes → DP', c: '#58a6ff', why: 'When many decision paths lead to the same remaining problem, cache it — that\'s DP\'s home turf.' },
  { q: 'Is one pass over sorted data enough?', a: 'Likely Greedy', c: '#f0a35e', why: 'Sort + single sweep with a running commitment (intervals, deadlines, ratios) is the greedy signature.' },
];
export default function GreedyVsDpVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % CASES.length), 2.4, auto);
  const c = CASES[i];
  return (
    <Stage2D title="Greedy vs DP: Spot It Early" subtitle="Both walk a sequence of choices. Greedy commits once and never looks back — O(n log n)-ish and simple. DP keeps every option alive in a table — heavier but safe. The problem's structure decides."
      accent={c.c} viewBox="0 0 640 260"
      controls={<>{CASES.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>Practical order in an interview: sketch the greedy rule → <strong>attack it with counterexamples</strong> → if it survives and you can hint at an exchange argument, ship greedy; if you find a case where an early choice backfires, switch to DP. Never assume greedy without the attack step.</>}>
      <rect x="70" y="52" width="500" height="146" rx="14" fill="#0b0f15" stroke={c.c} strokeWidth="1.5" />
      <text x="320" y="96" fill="#e6edf3" fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{c.q}</text>
      <rect x="235" y="110" width="170" height="32" rx="16" fill={c.c + '22'} stroke={c.c} />
      <text x="320" y="131" fill={c.c} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{c.a}</text>
      <foreignObject x="96" y="150" width="448" height="42"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '13.5px system-ui', lineHeight: 1.35, textAlign: 'center' }}>{c.why}</div></foreignObject>
      <text x="320" y="234" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">signal {i + 1} of {CASES.length}</text>
    </Stage2D>
  );
}

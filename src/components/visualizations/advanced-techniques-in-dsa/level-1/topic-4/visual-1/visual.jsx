/* Lesson: Proving (or Disproving) That a Greedy Approach Works
 * 2D animated: cycle through the three standard tools — counterexamples, the exchange
 * argument, and greedy-stays-ahead. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const TOOLS = [
  { t: '1 · Hunt for a counterexample', c: '#f85149', why: 'Before proving anything, try to break it. Small adversarial inputs (like coins {1,3,4}) kill most wrong greedy ideas in minutes.' },
  { t: '2 · Exchange argument', c: '#f0a35e', why: 'Take any optimal solution that differs from greedy\'s. Swap one differing choice for greedy\'s choice and show the result is no worse. Repeat → greedy is optimal.' },
  { t: '3 · Greedy stays ahead', c: '#56d364', why: 'Show by induction that after every step, greedy\'s partial solution is at least as good as any other strategy\'s. If it never falls behind, it finishes optimal.' },
];
export default function GreedyProvingVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % TOOLS.length), 2.6, auto);
  const t = TOOLS[i];
  return (
    <Stage2D title="Proving a Greedy Approach" subtitle="'It feels right' is how greedy bugs ship. Interviewers (and production code) want one of these three justifications before trusting a greedy rule."
      accent={t.c} viewBox="0 0 640 250"
      controls={<>{TOOLS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>Workflow: try to <strong>disprove</strong> first (cheap), then prove with an <strong>exchange argument</strong> (most common) or <strong>stays-ahead induction</strong>. In interviews, even sketching the argument — "swapping any other choice for mine can't improve things because…" — earns the credit.</>}>
      <rect x="70" y="50" width="500" height="150" rx="14" fill="#0b0f15" stroke={t.c} strokeWidth="1.5" />
      <text x="320" y="94" fill={t.c} fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{t.t}</text>
      <foreignObject x="96" y="110" width="448" height="80"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '14px system-ui', lineHeight: 1.5, textAlign: 'center' }}>{t.why}</div></foreignObject>
      <text x="320" y="230" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">tool {i + 1} of {TOOLS.length}</text>
    </Stage2D>
  );
}

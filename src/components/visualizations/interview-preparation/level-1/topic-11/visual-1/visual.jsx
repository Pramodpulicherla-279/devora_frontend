/* Lesson: How to Identify Which Pattern a New Problem Needs
 * 2D animated: keyword → pattern decision cards. The phrases interviewers use are the
 * strongest signal for which template to reach for. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const SIGNALS = [
  { kw: '"contiguous subarray / substring…"', pat: 'Sliding Window', c: '#4fce78' },
  { kw: '"sorted array" + "pair / target sum"', pat: 'Two Pointers', c: '#6b8cff' },
  { kw: '"k largest / smallest / most frequent"', pat: 'Top-K (heap)', c: '#a78bfa' },
  { kw: '"next greater / days until…"', pat: 'Monotonic Stack', c: '#e46e9b' },
  { kw: '"all combinations / generate every…"', pat: 'Backtracking', c: '#f0a35e' },
  { kw: '"count ways / min cost" + choices', pat: 'Dynamic Programming', c: '#58a6ff' },
  { kw: '"shortest path / fewest steps"', pat: 'BFS (or Dijkstra if weighted)', c: '#4fce78' },
];
export default function PatIdentifyVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % SIGNALS.length), 1.9, auto);
  const s = SIGNALS[i];
  return (
    <Stage2D title="Keyword → Pattern" subtitle="Problem statements leak their pattern through vocabulary. Train the reflex: hear the phrase, name the template, then verify it fits before coding."
      accent={s.c} viewBox="0 0 640 240"
      controls={<>{SIGNALS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>The reflex isn't the whole job — after naming a candidate pattern, <strong>sanity-check it</strong> (does the window property hold? is the data sorted? do subproblems overlap?). A wrong pattern spotted in 30 seconds costs nothing; one discovered after 20 minutes of coding costs the interview.</>}>
      <rect x="60" y="56" width="250" height="110" rx="14" fill="#0b0f15" stroke="#30363d" strokeWidth="1.5" />
      <text x="185" y="88" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">the interviewer says…</text>
      <foreignObject x="72" y="98" width="226" height="60"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#e6edf3', font: '700 13.5px system-ui', lineHeight: 1.35, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{s.kw}</div></foreignObject>
      <g className="dsa2d-pulse"><line x1="315" y1="111" x2="342" y2="111" stroke={s.c} strokeWidth="3" /><polygon points="342,105 354,111 342,117" fill={s.c} /></g>
      <rect x="360" y="56" width="220" height="110" rx="14" fill={s.c + '14'} stroke={s.c} strokeWidth="2" />
      <text x="470" y="88" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">your first thought</text>
      <foreignObject x="370" y="98" width="200" height="60"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: s.c, font: '700 15px system-ui', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{s.pat}</div></foreignObject>
      <text x="320" y="208" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">signal {i + 1} of {SIGNALS.length}</text>
    </Stage2D>
  );
}

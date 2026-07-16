/* Lesson: The Anatomy of a Backtracking Function — Choose, Explore, Unchoose
 * 2D animated: cycle through the three-step template that every backtracking function follows. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STEPS = [
  { t: 'Base case', c: '#8b949e', code: 'if is_complete(state):\n    record(state); return', why: 'When the solution is complete, save it and stop recursing down this branch.' },
  { t: '1 · Choose', c: '#58a6ff', code: 'for choice in options(state):\n    make(choice)', why: 'Commit to one option — add it to the current partial solution.' },
  { t: '2 · Explore', c: '#a78bfa', code: '    backtrack(state)', why: 'Recurse to build on that choice and explore everything it leads to.' },
  { t: '3 · Un-choose', c: '#f0883e', code: '    undo(choice)', why: 'Remove the choice so the loop can try the next option from a clean state.' },
];
export default function BtAnatomyVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 2.0, auto);
  const s = STEPS[i];
  return (
    <Stage2D title="Anatomy of a Backtracking Function" subtitle="Almost every backtracking solution follows the same skeleton. Learn this template once and you can adapt it to subsets, permutations, N-Queens, Sudoku, and more."
      accent={s.c} viewBox="0 0 640 270"
      controls={<>{STEPS.map((st, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{st.t}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>The <strong>un-choose</strong> step is what people forget — without it, choices leak across branches and the search is wrong. "Make a choice, recurse, undo it" is the rhythm. The base case records complete solutions and stops the descent.</>}>
      {/* full template with active line highlighted */}
      <rect x="60" y="40" width="520" height="150" rx="12" fill="#0b0f15" stroke="#30363d" />
      {[
        { txt: 'def backtrack(state):', active: false },
        { txt: '  if is_complete(state):', active: i === 0 },
        { txt: '      record(state); return', active: i === 0 },
        { txt: '  for choice in options(state):', active: i === 1 },
        { txt: '      make(choice)      # choose', active: i === 1 },
        { txt: '      backtrack(state)   # explore', active: i === 2 },
        { txt: '      undo(choice)       # un-choose', active: i === 3 },
      ].map((ln, k) => (
        <g key={k}>
          {ln.active && <rect x="70" y={54 + k * 19 - 13} width="500" height="18" rx="4" fill={s.c + '22'} />}
          <text x="82" y={54 + k * 19} fill={ln.active ? s.c : '#8b949e'} fontSize="13" fontFamily="Consolas" fontWeight={ln.active ? '700' : '400'}>{ln.txt}</text>
        </g>
      ))}
      <rect x="60" y="204" width="520" height="46" rx="10" fill="#0b0f15" stroke={s.c} strokeWidth="1.5" />
      <text x="80" y="224" fill={s.c} fontSize="14" fontWeight="700" fontFamily="system-ui">{s.t}</text>
      <foreignObject x="80" y="228" width="480" height="20"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '12.5px system-ui' }}>{s.why}</div></foreignObject>
    </Stage2D>
  );
}

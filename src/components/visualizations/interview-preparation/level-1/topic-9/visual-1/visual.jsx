/* Lesson: The Backtracking Pattern, Revisited
 * 2D animated: the universal template mapped onto four classic problems — same skeleton,
 * different choices and constraints. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ROWS = [
  { prob: 'Subsets', choice: 'include / skip element', constraint: 'none — every path is valid', c: '#4fce78' },
  { prob: 'Permutations', choice: 'any unused element', constraint: 'used[] blocks repeats', c: '#a78bfa' },
  { prob: 'N-Queens', choice: 'a column for this row', constraint: 'no shared column / diagonal', c: '#6b8cff' },
  { prob: 'Word Search', choice: 'an adjacent grid cell', constraint: 'must match next letter, no reuse', c: '#f0a35e' },
];
export default function PatBacktrackingVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % ROWS.length), 2.2, auto);
  const r = ROWS[i];
  return (
    <Stage2D title="Backtracking: One Template, Many Costumes" subtitle="Choose → explore → un-choose never changes. Preparing for interviews means practising the MAPPING: what are the choices, and what constraint prunes them?"
      accent={r.c} viewBox="0 0 640 270"
      controls={<>{ROWS.map((rr, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{rr.prob}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>In the interview, say the mapping out loud: "my choices at each step are <em>{r.choice}</em>, and I prune when <em>{r.constraint}</em>". Once those two blanks are filled, the code is the same eight lines you've written before.</>}>
      <rect x="60" y="46" width="250" height="180" rx="12" fill="#0b0f15" stroke="#30363d" />
      {['def backtrack(state):', '  if complete: record; return', '  for choice in CHOICES:', '    if violates CONSTRAINT:', '        continue  # prune', '    make(choice)', '    backtrack(state)', '    undo(choice)'].map((ln, k) => (
        <g key={k}>
          {(k === 2 || k === 3) && <rect x="68" y={70 + k * 21 - 13} width="234" height="18" rx="4" fill={r.c + '20'} />}
          <text x="76" y={70 + k * 21} fill={(k === 2 || k === 3) ? r.c : '#8b949e'} fontSize="11.5" fontFamily="Consolas" fontWeight={(k === 2 || k === 3) ? '700' : '400'}>{ln}</text>
        </g>
      ))}
      <rect x="336" y="46" width="244" height="180" rx="12" fill={r.c + '10'} stroke={r.c} strokeWidth="2" />
      <text x="458" y="76" fill="#e6edf3" fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{r.prob}</text>
      <text x="458" y="112" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">CHOICES =</text>
      <foreignObject x="346" y="118" width="224" height="34"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: r.c, font: '700 13px system-ui', textAlign: 'center' }}>{r.choice}</div></foreignObject>
      <text x="458" y="176" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">CONSTRAINT =</text>
      <foreignObject x="346" y="182" width="224" height="34"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#e6edf3', font: '700 13px system-ui', textAlign: 'center' }}>{r.constraint}</div></foreignObject>
      <text x="320" y="254" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">fill the two blanks and the template does the rest</text>
    </Stage2D>
  );
}

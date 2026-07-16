/* Lesson: Common Backtracking Interview Problems, Solved Step by Step (overview)
 * 2D animated: flip through the classic backtracking problems and the shape each one takes. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PROBS = [
  { t: 'Subsets / Combinations', pat: 'include-or-skip tree', c: '#4fce78', why: 'At each element choose to include it or not, recording every partial path.' },
  { t: 'Permutations', pat: 'used[] + choose/undo', c: '#a78bfa', why: 'Pick any unused element for each position; release it on the way back.' },
  { t: 'N-Queens', pat: 'place row-by-row + constraints', c: '#58a6ff', why: 'Track columns and diagonals; backtrack when a row has no safe square.' },
  { t: 'Palindrome Partitioning', pat: 'cut + recurse on suffix', c: '#f0883e', why: 'Try each prefix that is a palindrome, then partition the rest.' },
  { t: 'Word Search / Sudoku', pat: 'grid DFS + undo', c: '#ffd43b', why: 'Explore neighbouring cells / candidate values, marking and un-marking as you go.' },
];
export default function BtInterviewVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PROBS.length), 2.3, auto);
  const p = PROBS[i];
  return (
    <Stage2D title="Common Backtracking Interview Problems" subtitle="Backtracking questions look varied but share one skeleton: choose, explore, un-choose, with a pruning check. Recognise the shape and the code writes itself."
      accent={p.c} viewBox="0 0 640 300"
      controls={<>{PROBS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>All of these are the same template with a different <strong>choice set</strong> and <strong>constraint</strong>: subsets choose include/skip, permutations track <code>used</code>, N-Queens/Sudoku check board rules, partitioning cuts palindromic prefixes. Add a prune and you're done.</>}>
      <rect x="60" y="46" width="520" height="150" rx="14" fill="#0b0f15" stroke={p.c} strokeWidth="1.5" />
      <text x="320" y="88" fill="#e6edf3" fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{p.t}</text>
      <rect x="170" y="104" width="300" height="32" rx="16" fill={p.c + '22'} stroke={p.c} />
      <text x="320" y="125" fill={p.c} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{p.pat}</text>
      <foreignObject x="86" y="146" width="468" height="46"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '14px system-ui', lineHeight: 1.4, textAlign: 'center' }}>{p.why}</div></foreignObject>
      {PROBS.map((_, k) => <circle key={k} cx={320 - (PROBS.length - 1) * 12 + k * 24} cy="228" r="5" fill={k === i ? p.c : '#30363d'} />)}
      <text x="320" y="266" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">problem {i + 1} of {PROBS.length} — each detailed step-by-step in the lesson below</text>
    </Stage2D>
  );
}

/* Problem: Palindrome Partitioning
 * 2D animated: split "aab" so every piece is a palindrome. Try each palindromic prefix, recurse
 * on the rest, backtrack. Two answers: [a|a|b] and [aa|b]. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STEPS = [
  { cuts: ['a'], rest: 'ab', log: 'prefix "a" is a palindrome → cut, recurse on "ab"' },
  { cuts: ['a', 'a'], rest: 'b', log: 'prefix "a" again → cut, recurse on "b"' },
  { cuts: ['a', 'a', 'b'], rest: '', ok: true, log: 'string consumed → record [a | a | b]' },
  { cuts: ['aa'], rest: 'b', log: 'backtrack… try the longer prefix "aa" — also a palindrome!' },
  { cuts: ['aa', 'b'], rest: '', ok: true, log: 'record [aa | b]' },
  { cuts: ['aab?'], rest: '', bad: true, done: true, log: '"aab" itself is NOT a palindrome → prune. 2 partitions total' },
];
export default function BtPalindromePartitionVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.8, auto);
  const s = STEPS[i];
  return (
    <Stage2D title='Palindrome Partitioning of "aab"' subtitle="At every position, the choices are 'which palindromic prefix do I cut off next?' — cut, recurse on the remainder, un-cut. Non-palindromic prefixes are pruned instantly."
      accent="#f0a35e" viewBox="0 0 640 210"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>Choices = palindromic prefixes, constraint = the palindrome check, base case = empty remainder. Worst case (all same letter) yields 2ⁿ⁻¹ partitions, so output is inherently exponential; a precomputed palindrome table (DP!) speeds the checks — two patterns cooperating.</>}>
      {/* cut pieces */}
      {s.cuts.map((piece, k) => (
        <g key={k} className="dsa2d-fade">
          <rect x={140 + k * (piece.length * 34 + 46)} y="66" width={piece.length * 34 + 30} height="54" rx="10" fill={s.bad && k === s.cuts.length - 1 ? 'rgba(248,81,73,.15)' : 'rgba(240,163,94,.16)'} stroke={s.bad && k === s.cuts.length - 1 ? '#f85149' : '#f0a35e'} strokeWidth="2.5" className={k === s.cuts.length - 1 ? 'dsa2d-pulse' : ''} />
          <text x={140 + k * (piece.length * 34 + 46) + (piece.length * 34 + 30) / 2} y="100" fill={s.bad && k === s.cuts.length - 1 ? '#ff9d95' : '#e6edf3'} fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{piece}</text>
        </g>
      ))}
      {s.rest && <g><rect x={140 + s.cuts.reduce((a, p) => a + p.length * 34 + 46, 0)} y="72" width={s.rest.length * 34 + 20} height="42" rx="9" fill="#0d1117" stroke="#6e7681" strokeWidth="1.5" strokeDasharray="5 4" /><text x={140 + s.cuts.reduce((a, p) => a + p.length * 34 + 46, 0) + (s.rest.length * 34 + 20) / 2} y="99" fill="#8b949e" fontSize="17" textAnchor="middle" fontFamily="Consolas">{s.rest}</text></g>}
      <text x="320" y="158" fill={s.ok ? '#56d364' : s.bad ? '#f85149' : '#8b949e'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{s.ok ? '✓ partition recorded' : s.bad ? '✗ not a palindrome → prune' : 'dashed = remainder still to split'}</text>
      <text x="320" y="190" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">answers so far: [a|a|b]{i >= 4 ? ' · [aa|b]' : ''}</text>
    </Stage2D>
  );
}

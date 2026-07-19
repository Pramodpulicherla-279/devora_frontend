/* Problem: Median of Two Sorted Arrays (Hard)
 * 2D animated: binary-search the PARTITION of the smaller array. A valid pair of cuts puts
 * exactly half the elements on the left with every left value ≤ every right value. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const A = [1, 3, 8], B = [2, 4, 6, 9];  // merged: 1,2,3,4,6,8,9 → median 4; halfLen = 4
const CUTS = [
  { i: 1, j: 3, ok: false, log: 'i=1, j=3: left {1 | 2,4,6} — max-left 6 but A-right starts at 3: 6 > 3 ✗' },
  { i: 2, j: 2, ok: true, log: 'i=2, j=2: left {1,3 | 2,4} right {8 | 6,9} — 3 ≤ 6 ✓ and 4 ≤ 8 ✓ valid!' },
];
export default function SrchMedianArraysVisualization() {
  const [c, setC] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setC(v => (v + 1) % CUTS.length), 2.6, auto);
  const cut = CUTS[c];
  const row = (arr, cutIdx, y, name) => (
    <g key={name}>
      <text x="70" y={y + 26} textAnchor="end" fill="#8b949e" fontSize="13" fontWeight="700" fontFamily="Consolas">{name}</text>
      {arr.map((v, k) => (
        <g key={k}>
          <rect x={90 + k * 66} y={y} width="56" height="42" rx="8" fill={k < cutIdx ? 'rgba(88,166,255,.2)' : 'rgba(240,163,94,.16)'} stroke={k < cutIdx ? '#58a6ff' : '#f0a35e'} strokeWidth="2" style={{ transition: 'fill .3s, stroke .3s' }} />
          <text x={118 + k * 66} y={y + 27} fill="#e6edf3" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
        </g>
      ))}
      <line x1={90 + cutIdx * 66 - 5} y1={y - 6} x2={90 + cutIdx * 66 - 5} y2={y + 48} stroke={cut.ok ? '#56d364' : '#f85149'} strokeWidth="3.5" className="dsa2d-pulse" style={{ transition: 'x .4s' }} />
    </g>
  );
  return (
    <Stage2D title="Median of Two Sorted Arrays" subtitle="Don't merge (that's O(m+n)) — binary-search where to CUT the smaller array. The other array's cut is forced (left halves must hold half the elements), leaving one condition to check."
      accent={cut.ok ? '#56d364' : '#f85149'} viewBox="0 0 640 250"
      controls={<>{CUTS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === c ? 'dsa2d-btn--on' : ''}`} onClick={() => setC(k)}>cut {k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={cut.ok
        ? <>Valid partition: cross-check <code>A[i-1] ≤ B[j]</code> (3 ≤ 6 ✓) and <code>B[j-1] ≤ A[i]</code> (4 ≤ 8 ✓). With an odd total the median is the biggest left value: <code>max(3, 4) = <strong>4</strong></code>. Binary search runs only over A's cut → <strong>O(log min(m, n))</strong>.</>
        : <>Invalid: B's left half reaches 6, but A's right half starts at 3 — left values leak past right ones. The violation's direction tells you which way to move A's cut (here: give A a bigger left). That monotone push/pull is what makes it binary-searchable.</>}>
      {row(A, cut.i, 60, 'A')}
      {row(B, cut.j, 130, 'B')}
      <text x="320" y="212" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">blue = left halves (4 elements total) · orange = right halves (3 elements)</text>
      <text x="320" y="236" fill={cut.ok ? '#56d364' : '#f85149'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{cut.ok ? '✓ valid → median = max(left) = 4' : '✗ 6 > 3 crosses the boundary → shift A’s cut right'}</text>
    </Stage2D>
  );
}

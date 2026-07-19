/* Lesson: Python's Built-In Sort — What Timsort Does Under the Hood
 * 2D animated: Timsort = detect natural runs → extend short ones with insertion sort → merge
 * runs like merge sort. Cycle through the three phases. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PHASES = [
  { t: '1. Find natural runs', c: '#58a6ff', why: 'Scan for already-sorted stretches (ascending or descending). Real data has many.' },
  { t: '2. Extend with insertion sort', c: '#f0883e', why: 'Short runs are grown to a minimum length using insertion sort — fast on nearly-sorted data.' },
  { t: '3. Merge runs', c: '#56d364', why: 'Merge the runs pairwise (like merge sort), following rules that keep merges balanced.' },
];
export default function SortTimsortVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PHASES.length), 2.3, auto);
  const p = PHASES[i];
  // illustrative array with two runs
  const runs = [[2, 5, 8], [1, 4, 9, 12]];
  return (
    <Stage2D title="Timsort — Python's sorted()" subtitle="Python's list.sort() and sorted() use Timsort: a hybrid of insertion sort and merge sort tuned for real-world data, which is often partly ordered. Stable and O(n log n) worst case."
      accent={p.c} viewBox="0 0 640 260"
      controls={<>{PHASES.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>Timsort shines because real data isn't random — it has pre-sorted runs. Best case on already-sorted input is <strong>O(n)</strong>; worst case is <strong>O(n log n)</strong>; it's <strong>stable</strong> and uses O(n) space. That's why you almost never write your own sort in Python.</>}>
      {/* two runs shown */}
      {runs.map((run, ri) => (
        <g key={ri}>
          <text x={ri === 0 ? 175 : 420} y="60" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">run {ri + 1}{i >= 2 ? '' : ' (sorted)'}</text>
          {run.map((v, k) => <g key={k}><rect x={(ri === 0 ? 100 : 340) + k * 48} y="70" width="42" height="42" rx="7" fill={i === 2 ? 'rgba(86,211,100,.18)' : ri === 0 ? 'rgba(88,166,255,.15)' : 'rgba(240,136,62,.15)'} stroke={i === 2 ? '#56d364' : ri === 0 ? '#58a6ff' : '#f0883e'} strokeWidth="2" /><text x={(ri === 0 ? 100 : 340) + k * 48 + 21} y="97" fill="#e6edf3" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text></g>)}
        </g>
      ))}
      {i === 2 && <text x="320" y="150" fill="#56d364" fontSize="14" textAnchor="middle" fontFamily="Consolas">merge → [1, 2, 4, 5, 8, 9, 12]</text>}
      <rect x="90" y="176" width="460" height="60" rx="12" fill="#0b0f15" stroke={p.c} strokeWidth="1.5" />
      <text x="320" y="200" fill={p.c} fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{p.t}</text>
      <foreignObject x="110" y="208" width="420" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '13px system-ui', textAlign: 'center' }}>{p.why}</div></foreignObject>
    </Stage2D>
  );
}

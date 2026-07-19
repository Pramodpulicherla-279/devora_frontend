/* Lesson: Why Sorting Matters More Than You'd Think
 * 2D animated: cycle through the problems that become easy once data is sorted. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const USES = [
  { t: 'Binary search', c: '#58a6ff', why: 'Sorted order unlocks O(log n) lookups instead of O(n) scans.' },
  { t: 'Finding duplicates / median', c: '#a78bfa', why: 'Equal values sit next to each other; the median is just the middle element.' },
  { t: 'Two-pointer techniques', c: '#56d364', why: 'Pair-sum, 3-sum and container problems rely on moving pointers on sorted data.' },
  { t: 'Grouping & deduping', c: '#f0883e', why: 'One linear pass groups equal items or removes duplicates once they are adjacent.' },
  { t: 'Top-K / ranking', c: '#ffd43b', why: 'The k largest or smallest are simply the first or last k after sorting.' },
];
export default function SortWhyVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % USES.length), 2.2, auto);
  const u = USES[i];
  return (
    <Stage2D title="Why Sorting Matters" subtitle="Sorting is rarely the final goal — it's the setup step that turns hard problems into easy ones. A single O(n log n) sort can collapse an O(n²) problem to O(n)."
      accent={u.c} viewBox="0 0 640 250"
      controls={<>{USES.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>Ask on any problem: "would this be easier if the input were sorted?" Often the answer is yes, and a preliminary sort is worth its <code>O(n log n)</code> cost. Sorting enables binary search, two pointers, adjacency-based grouping, and simple top-K selection.</>}>
      {/* mini before/after bars */}
      <text x="150" y="42" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">unsorted</text>
      {[4, 1, 3, 5, 2].map((v, k) => <rect key={k} x={90 + k * 26} y={100 - v * 12} width="20" height={v * 12} rx="3" fill="#30363d" />)}
      <text x="490" y="42" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">sorted → easy</text>
      {[1, 2, 3, 4, 5].map((v, k) => <rect key={k} x={430 + k * 26} y={100 - v * 12} width="20" height={v * 12} rx="3" fill={u.c} />)}
      <text x="320" y="80" fill="#8b949e" fontSize="20" textAnchor="middle">→</text>
      <rect x="120" y="130" width="400" height="86" rx="12" fill="#0b0f15" stroke={u.c} strokeWidth="1.5" />
      <text x="320" y="164" fill="#e6edf3" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{u.t}</text>
      <foreignObject x="140" y="176" width="360" height="34"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '13px system-ui', lineHeight: 1.35, textAlign: 'center' }}>{u.why}</div></foreignObject>
    </Stage2D>
  );
}

/* Lesson: Common Sorting Interview Problems, Solved Step by Step (overview)
 * 2D animated: flip through classic sorting-based interview problems and the technique each needs. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PROBS = [
  { t: 'Sort Colors (Dutch Flag)', pat: 'three-way partition', c: '#f0883e', why: 'One pass with low/mid/high pointers sorts 0s, 1s, 2s in place — no counting needed.' },
  { t: 'Merge Intervals', pat: 'sort then sweep', c: '#58a6ff', why: 'Sort by start, then merge each interval into the previous if they overlap.' },
  { t: 'Kth Largest Element', pat: 'quickselect / heap', c: '#a78bfa', why: 'Quickselect partitions toward the kth position in O(n) average — no full sort.' },
  { t: 'Largest Number', pat: 'custom comparator', c: '#56d364', why: 'Sort strings by which concatenation (a+b vs b+a) is larger.' },
  { t: 'Meeting Rooms II', pat: 'sort + min-heap', c: '#ffd43b', why: 'Sort by start; a heap of end times tracks how many rooms run concurrently.' },
];
export default function SortInterviewVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PROBS.length), 2.3, auto);
  const p = PROBS[i];
  return (
    <Stage2D title="Common Sorting Interview Problems" subtitle="Many problems don't ask you to sort — they become trivial once you do, or need a partial sort (quickselect) or a custom order. Recognising that is the trick."
      accent={p.c} viewBox="0 0 640 300"
      controls={<>{PROBS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>The sorting toolkit: <strong>sort-then-sweep</strong> for intervals, <strong>three-way partition</strong> for few distinct values, <strong>quickselect</strong> for the kth element without a full sort, and <strong>custom comparators</strong> when the natural order isn't what you want.</>}>
      <rect x="60" y="46" width="520" height="150" rx="14" fill="#0b0f15" stroke={p.c} strokeWidth="1.5" />
      <text x="320" y="88" fill="#e6edf3" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{p.t}</text>
      <rect x="185" y="104" width="270" height="32" rx="16" fill={p.c + '22'} stroke={p.c} />
      <text x="320" y="125" fill={p.c} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{p.pat}</text>
      <foreignObject x="86" y="146" width="468" height="46"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '14px system-ui', lineHeight: 1.4, textAlign: 'center' }}>{p.why}</div></foreignObject>
      {PROBS.map((_, k) => <circle key={k} cx={320 - (PROBS.length - 1) * 12 + k * 24} cy="228" r="5" fill={k === i ? p.c : '#30363d'} />)}
      <text x="320" y="266" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">problem {i + 1} of {PROBS.length} — each detailed step-by-step in the lesson below</text>
    </Stage2D>
  );
}

/* Lesson: Common Searching Interview Problems, Solved Step by Step (overview)
 * 2D animated: flip through classic search problems, each tagged with the search variant it needs. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PROBS = [
  { t: 'Search Insert Position', pat: 'lower-bound binary search', c: '#58a6ff', why: 'Find the first index where a[i] >= target — the classic "leftmost" binary search.' },
  { t: 'Find Peak Element', pat: 'binary search on slope', c: '#a78bfa', why: 'Compare a[mid] with a[mid+1]; move toward the higher side — a peak must be there.' },
  { t: 'Search in Rotated Array', pat: 'which-half-is-sorted', c: '#6b8cff', why: 'Identify the sorted half at each mid and test whether the target falls inside it.' },
  { t: 'Koko Eating Bananas', pat: 'binary search on the answer', c: '#56d364', why: 'Binary-search the eating speed; feasibility (finishes in time) is monotonic.' },
  { t: 'Median of Two Sorted Arrays', pat: 'binary search on partition', c: '#f0883e', why: 'Binary-search where to split the smaller array so left and right halves balance.' },
];
export default function SrchInterviewVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PROBS.length), 2.3, auto);
  const p = PROBS[i];
  return (
    <Stage2D title="Common Searching Interview Problems" subtitle="Most search interview questions are binary search in disguise. The skill is spotting the monotonic property you can binary-search over."
      accent={p.c} viewBox="0 0 640 300"
      controls={<>{PROBS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>The search toolkit: <strong>lower/upper-bound</strong> binary search for positions, <strong>binary search on the answer</strong> for optimisation, and <strong>which-half-is-sorted</strong> for rotated data. Ask: "is there a value where a yes/no condition flips exactly once?" If so, binary-search it.</>}>
      <rect x="60" y="46" width="520" height="150" rx="14" fill="#0b0f15" stroke={p.c} strokeWidth="1.5" />
      <text x="320" y="88" fill="#e6edf3" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{p.t}</text>
      <rect x="170" y="104" width="300" height="32" rx="16" fill={p.c + '22'} stroke={p.c} />
      <text x="320" y="125" fill={p.c} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{p.pat}</text>
      <foreignObject x="86" y="146" width="468" height="46"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '14px system-ui', lineHeight: 1.4, textAlign: 'center' }}>{p.why}</div></foreignObject>
      {PROBS.map((_, k) => <circle key={k} cx={320 - (PROBS.length - 1) * 12 + k * 24} cy="228" r="5" fill={k === i ? p.c : '#30363d'} />)}
      <text x="320" y="266" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">problem {i + 1} of {PROBS.length} — each detailed step-by-step in the lesson below</text>
    </Stage2D>
  );
}

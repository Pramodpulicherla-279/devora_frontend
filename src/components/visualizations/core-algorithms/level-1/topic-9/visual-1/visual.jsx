/* Lesson: When Linear Search Is Actually the Right Choice
 * 2D animated: cycle through the situations where a plain O(n) scan beats binary search. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const CASES = [
  { t: 'Tiny arrays (n < ~20)', ok: true, why: "Binary search's bookkeeping costs more than just scanning a handful of elements." },
  { t: 'Unsorted data, one lookup', ok: true, why: 'Sorting to enable binary search costs O(n log n) — more than a single O(n) scan.' },
  { t: 'Linked lists', ok: true, why: 'No random access, so reaching the middle is itself O(n) — binary search loses its edge.' },
  { t: 'Finding all matches', ok: true, why: 'You must touch every element anyway, so the scan is unavoidable.' },
  { t: 'Sorted + many lookups', ok: false, why: 'Here binary search (or a hash set) wins big — this is NOT a linear-search case.' },
];
export default function SrchWhenLinearVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % CASES.length), 2.3, auto);
  const c = CASES[i];
  return (
    <Stage2D title="When Linear Search Wins" subtitle="Binary search is faster asymptotically, but it isn't always the right tool. Linear search shines in several very common situations."
      accent={c.ok ? '#56d364' : '#f0883e'} viewBox="0 0 640 260"
      controls={<>{CASES.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>Reach for linear search when data is <strong>small</strong>, <strong>unsorted and searched once</strong>, stored in a <strong>linked list</strong>, or when you need <strong>every</strong> match. Binary search only pays off on <strong>sorted, randomly-accessible data searched many times</strong>.</>}>
      <rect x="70" y="50" width="500" height="140" rx="14" fill="#0b0f15" stroke={c.ok ? '#56d364' : '#f0883e'} strokeWidth="1.5" />
      <text x="320" y="92" fill="#e6edf3" fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{c.t}</text>
      <rect x={c.ok ? 210 : 205} y="106" width={c.ok ? 220 : 230} height="30" rx="15" fill={c.ok ? 'rgba(86,211,100,.15)' : 'rgba(240,136,62,.15)'} stroke={c.ok ? '#56d364' : '#f0883e'} />
      <text x="320" y="126" fill={c.ok ? '#7ee787' : '#f8c088'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{c.ok ? '✓ linear search' : '✗ use binary / hashing'}</text>
      <foreignObject x="96" y="146" width="448" height="40"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '14px system-ui', lineHeight: 1.35, textAlign: 'center' }}>{c.why}</div></foreignObject>
      <text x="320" y="228" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">scenario {i + 1} of {CASES.length}</text>
    </Stage2D>
  );
}

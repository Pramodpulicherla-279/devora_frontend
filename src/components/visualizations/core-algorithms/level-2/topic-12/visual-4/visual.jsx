/* Problem: Kth Largest Element (Quickselect)
 * 2D animated: quicksort's partition, but recurse into ONE side only — the side containing
 * position k. Average O(n) instead of a full O(n log n) sort. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

// find 3rd largest of [7,2,9,4,8,1] = index 3 ascending (k-th largest → index n-k = 3)
const STEPS = [
  { a: [7, 2, 9, 4, 8, 1], range: [0, 5], pivot: null, log: 'want the 3rd largest → ascending index 3 · partition around pivot 1? use last: pivot = 1' },
  { a: [1, 2, 9, 4, 8, 7], range: [0, 5], pivot: 0, fixed: [0], log: 'pivot 1 lands at index 0 — target 3 is RIGHT → recurse right only' },
  { a: [1, 2, 9, 4, 8, 7], range: [1, 5], pivot: null, log: 'partition [1..5] around pivot 7' },
  { a: [1, 2, 4, 7, 8, 9], range: [1, 5], pivot: 3, fixed: [0, 3], log: 'pivot 7 lands at index 3 — that IS the target → answer 7' },
  { a: [1, 2, 4, 7, 8, 9], range: null, pivot: 3, fixed: [0, 3], done: true, log: '3rd largest = 7 — and we never sorted the whole array' },
];
const CW = 74, gap = 12, startX = (640 - (6 * (CW + gap) - gap)) / 2;
export default function SortQuickselectVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.9, auto);
  const s = STEPS[i];
  return (
    <Stage2D title="Kth Largest via Quickselect" subtitle="Partition once and the pivot's final index tells you which side holds the k-th element — so throw the other side away. Halving the work each round averages to O(n) total."
      accent="#a78bfa" viewBox="0 0 640 200"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>Full sort O(n log n), heap O(n log k), quickselect <strong>O(n) average</strong> (n + n/2 + n/4 + … = 2n). Worst case is O(n²) with bad pivots — randomise to make that vanish. Note the discarded grey region is never touched again.</>}>
      {s.a.map((v, k) => {
        const inRange = s.range && k >= s.range[0] && k <= s.range[1];
        const isPivot = k === s.pivot, isFixed = s.fixed && s.fixed.includes(k);
        const isTarget = k === 3;
        return (
          <g key={k} opacity={s.range == null || inRange || isFixed ? 1 : 0.3} style={{ transition: 'opacity .3s' }}>
            <rect x={startX + k * (CW + gap)} y="64" width={CW} height="52" rx="8" fill={s.done && isTarget ? 'rgba(86,211,100,.3)' : isPivot ? 'rgba(167,139,250,.28)' : isFixed ? 'rgba(86,211,100,.12)' : '#161b22'} stroke={s.done && isTarget ? '#56d364' : isPivot ? '#a78bfa' : isFixed ? '#56d364' : '#6e7681'} strokeWidth={isPivot || (s.done && isTarget) ? 3 : 2} className={(isPivot && !s.done) || (s.done && isTarget) ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={startX + k * (CW + gap) + CW / 2} y="97" fill="#e6edf3" fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="132" fill={isTarget ? '#ffd43b' : '#8b949e'} fontSize="11" textAnchor="middle" fontFamily="Consolas">{isTarget ? 'target idx 3' : k}</text>
          </g>
        );
      })}
      <text x="320" y="172" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">dimmed = discarded side (never recursed into) · purple = pivot settling into place</text>
    </Stage2D>
  );
}

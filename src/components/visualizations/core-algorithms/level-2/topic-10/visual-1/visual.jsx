/* Lesson: Bucket Sort and Radix Sort
 * 2D animated: LSD radix sort makes one stable counting-sort pass per digit — units, then tens.
 * After the most-significant digit pass, the array is fully sorted. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STATES = [
  { arr: [42, 8, 15, 73, 26, 57], label: 'original order', place: null },
  { arr: [42, 73, 15, 26, 57, 8], label: 'stable sort by UNITS digit', place: 'u' },
  { arr: [8, 15, 26, 42, 57, 73], label: 'stable sort by TENS digit → sorted', place: 't' },
];
const CW = 74, gap = 12, startX = (640 - (6 * (CW + gap) - gap)) / 2;
export default function SortBucketRadixVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STATES.length), 1.8, auto);
  const s = STATES[i];
  const digitOf = (n, place) => place === 'u' ? n % 10 : place === 't' ? Math.floor(n / 10) : null;
  return (
    <Stage2D title="Radix Sort — O(d·(n+k))" subtitle="Sort integers digit by digit, least-significant first, using a stable counting sort each pass. Because each pass preserves the previous order, after the top digit the whole array is sorted — no comparisons."
      accent="#a78bfa" viewBox="0 0 640 200"
      controls={<>{STATES.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>pass {k}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.label}</span></>}
      legend={<>Each pass is a <strong>stable</strong> counting sort on one digit, so earlier passes' order survives as tie-breaks. With <code>d</code> digits it's <strong>O(d·(n+k))</strong> — effectively linear for fixed-width integers. <em>Bucket sort</em> is the same idea for real numbers: scatter into ranges, sort each bucket, concatenate.</>}>
      {s.arr.map((v, k) => {
        const d = digitOf(v, s.place);
        const str = String(v).padStart(2, '0');
        return (
          <g key={k} className="dsa2d-fade">
            <rect x={startX + k * (CW + gap)} y="70" width={CW} height="56" rx="8" fill="#161b22" stroke={s.place ? '#a78bfa' : '#30363d'} strokeWidth="2" />
            {str.split('').map((ch, ci) => {
              const isActive = (s.place === 'u' && ci === 1) || (s.place === 't' && ci === 0);
              return <text key={ci} x={startX + k * (CW + gap) + CW / 2 + (ci === 0 ? -11 : 11)} y="104" fill={isActive ? '#c9bdf5' : '#e6edf3'} fontSize="22" textAnchor="middle" fontWeight="700" fontFamily="Consolas" style={isActive ? { filter: 'drop-shadow(0 0 6px #a78bfa)' } : {}}>{ch}</text>;
            })}
            {s.place && <text x={startX + k * (CW + gap) + CW / 2} y="142" fill="#a78bfa" fontSize="11" textAnchor="middle" fontFamily="Consolas">{s.place === 'u' ? 'units' : 'tens'}={d}</text>}
          </g>
        );
      })}
      <text x="320" y="34" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">glowing digit = the one this pass sorts on</text>
    </Stage2D>
  );
}

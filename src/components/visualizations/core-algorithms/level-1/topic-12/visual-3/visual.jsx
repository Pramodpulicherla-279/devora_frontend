/* Problem: Find Peak Element
 * 2D animated: binary search on the SLOPE — compare a[mid] with a[mid+1] and move toward the
 * rising side; a peak is guaranteed there. No target value needed. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const A = [1, 3, 5, 6, 4, 2];
const STEPS = [
  { lo: 0, hi: 5, mid: 2, log: 'a[2]=5 < a[3]=6 → rising → peak is right: lo=3' },
  { lo: 3, hi: 5, mid: 4, log: 'a[4]=4 > a[5]=2 → falling → peak is here or left: hi=4' },
  { lo: 3, hi: 4, mid: 3, log: 'a[3]=6 > a[4]=4 → falling → hi=3' },
  { lo: 3, hi: 3, mid: null, done: true, peak: 3, log: 'lo == hi → peak at index 3 (value 6)' },
];
const CW = 74, gap = 12, startX = (640 - (A.length * (CW + gap) - gap)) / 2, baseY = 168, unit = 16;
export default function SrchPeakElementVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.6, auto);
  const s = STEPS[i];
  return (
    <Stage2D title="Find Peak Element" subtitle="No sorted array, no target — yet binary search still works. The comparison a[mid] vs a[mid+1] tells you which direction MUST contain a peak, so half the range is always safe to discard."
      accent="#a78bfa" viewBox="0 0 640 210"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>Why it's safe: if the slope rises at mid, either it keeps rising to the array's edge (the edge is a peak) or it turns — and the turn is a peak. Either way the right half contains one. <strong>O(log n)</strong> without sortedness — a favourite interviewer twist.</>}>
      {A.map((v, k) => {
        const inRange = k >= s.lo && k <= s.hi, isMid = k === s.mid || (s.mid != null && k === s.mid + 1), isPeak = s.peak === k;
        return (
          <g key={k} opacity={inRange || isPeak ? 1 : 0.35}>
            <rect x={startX + k * (CW + gap)} y={baseY - v * unit} width={CW} height={v * unit} rx="6" fill={isPeak ? 'rgba(86,211,100,.3)' : isMid ? 'rgba(255,212,59,.2)' : inRange ? '#161b22' : '#0d1117'} stroke={isPeak ? '#56d364' : isMid ? '#ffd43b' : inRange ? '#6e7681' : '#30363d'} strokeWidth={isMid || isPeak ? 3 : 2} className={isPeak ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s, opacity .3s' }} />
            <text x={startX + k * (CW + gap) + CW / 2} y={baseY - v * unit - 7} fill="#e6edf3" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      <text x="320" y="200" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">yellow pair = the slope comparison a[mid] vs a[mid+1]</text>
    </Stage2D>
  );
}

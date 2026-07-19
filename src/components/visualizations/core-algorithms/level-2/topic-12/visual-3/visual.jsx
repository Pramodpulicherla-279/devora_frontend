/* Problem: Merge Intervals
 * 2D animated: sort by start, sweep once — overlapping intervals absorb into a growing block,
 * gaps close the block and open a new one. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const IV = [[1, 3], [2, 6], [5, 8], [10, 12], [11, 14]];
const STEPS = [
  { upto: 0, merged: [[1, 3]], log: '[1,3] starts the first block' },
  { upto: 1, merged: [[1, 6]], log: '[2,6]: 2 ≤ 3 → overlap → block extends to [1,6]' },
  { upto: 2, merged: [[1, 8]], log: '[5,8]: 5 ≤ 6 → overlap → block extends to [1,8]' },
  { upto: 3, merged: [[1, 8], [10, 12]], log: '[10,12]: 10 > 8 → gap → new block' },
  { upto: 4, merged: [[1, 8], [10, 14]], done: true, log: '[11,14]: 11 ≤ 12 → extends → result: [1,8], [10,14]' },
];
const SCALE = 36, ox = 70;
export default function SortMergeIntervalsVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.7, auto);
  const s = STEPS[i];
  return (
    <Stage2D title="Merge Intervals" subtitle="Once sorted by start, overlap detection needs just one comparison against the current block's end. Everything earlier is finished forever — a single forward sweep."
      accent="#4fce78" viewBox="0 0 640 240"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<><strong>O(n log n)</strong> for the sort, O(n) for the sweep. Extension must use <code>max(end, e)</code> — a fully-contained interval like [2,4] inside [1,6] must not shrink the block. Sibling problems: insert-interval, meeting-rooms, employee free time.</>}>
      {Array.from({ length: 15 }).map((_, t) => <text key={t} x={ox + t * SCALE} y="24" fill="#6e7681" fontSize="11" textAnchor="middle" fontFamily="Consolas">{t}</text>)}
      {IV.map(([st, e], k) => {
        const isCur = k === s.upto, seen = k < s.upto;
        return (
          <g key={k} opacity={seen ? 0.45 : 1} style={{ transition: 'opacity .3s' }}>
            <rect x={ox + st * SCALE} y={34 + k * 26} width={(e - st) * SCALE} height="20" rx="6" fill={isCur ? 'rgba(255,212,59,.2)' : '#161b22'} stroke={isCur ? '#ffd43b' : '#6e7681'} strokeWidth={isCur ? 2.5 : 1.5} className={isCur ? 'dsa2d-pulse' : ''} />
            <text x={ox + st * SCALE + 8} y={48 + k * 26} fill="#e6edf3" fontSize="11" fontWeight="700" fontFamily="Consolas">[{st},{e}]</text>
          </g>
        );
      })}
      <text x={ox} y="188" fill="#8b949e" fontSize="11" fontFamily="system-ui">merged:</text>
      {s.merged.map(([st, e], k) => (
        <g key={'m' + k}>
          <rect x={ox + st * SCALE} y="196" width={(e - st) * SCALE} height="22" rx="7" fill="rgba(86,211,100,.22)" stroke="#56d364" strokeWidth="2.5" style={{ transition: 'width .35s' }} />
          <text x={ox + st * SCALE + 8} y="211" fill="#7ee787" fontSize="11" fontWeight="700" fontFamily="Consolas">[{st},{e}]</text>
        </g>
      ))}
    </Stage2D>
  );
}

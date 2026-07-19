/* Problem: Merge Intervals (Greedy Consolidation)
 * 2D animated: the greedy view of merging — after sorting, the decision at each interval is
 * an irreversible commit: absorb into the open block, or seal it and open a new one. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const IV = [[1, 4], [3, 5], [7, 9], [8, 10]];
const STEPS = [
  { upto: 0, merged: [[1, 4]], log: '[1,4] opens the first block' },
  { upto: 1, merged: [[1, 5]], log: '[3,5]: 3 ≤ 4 → absorb → block [1,5] (commit, never revisit)' },
  { upto: 2, merged: [[1, 5], [7, 9]], log: '[7,9]: 7 > 5 → seal [1,5] forever, open [7,9]' },
  { upto: 3, merged: [[1, 5], [7, 10]], done: true, log: '[8,10]: 8 ≤ 9 → absorb → final: [1,5], [7,10]' },
];
const SCALE = 48, ox = 90;
export default function GreedyMergeIntervalsVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.8, auto);
  const s = STEPS[i];
  return (
    <Stage2D title="Merge Intervals as a Greedy Commit" subtitle="Why is one pass enough? Sorting by start guarantees no future interval can reach BACK before the current block — so sealing a block is a safe greedy commitment, never revisited."
      accent="#4fce78" viewBox="0 0 640 220"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>The greedy lens on a familiar problem: each interval triggers exactly one <strong>irreversible decision</strong> (absorb / seal + open) justified by the sort order — the definition of a greedy algorithm. <strong>O(n log n)</strong> total, O(1) extra beyond the output.</>}>
      {Array.from({ length: 11 }).map((_, t) => <text key={t} x={ox + t * SCALE} y="28" fill="#6e7681" fontSize="11" textAnchor="middle" fontFamily="Consolas">{t}</text>)}
      {IV.map(([st, e], k) => {
        const isCur = k === s.upto, seen = k < s.upto;
        return (
          <g key={k} opacity={seen ? 0.4 : 1} style={{ transition: 'opacity .3s' }}>
            <rect x={ox + st * SCALE} y={40 + k * 28} width={(e - st) * SCALE} height="20" rx="7" fill={isCur ? 'rgba(255,212,59,.16)' : '#161b22'} stroke={isCur ? '#ffd43b' : '#6e7681'} strokeWidth={isCur ? 2.5 : 1.5} className={isCur ? 'dsa2d-pulse' : ''} />
            <text x={ox + st * SCALE + 8} y={54 + k * 28} fill="#e6edf3" fontSize="11" fontWeight="700" fontFamily="Consolas">[{st},{e}]</text>
          </g>
        );
      })}
      <text x={ox} y="172" fill="#8b949e" fontSize="11" fontFamily="system-ui">blocks:</text>
      {s.merged.map(([st, e], k) => {
        const sealed = k < s.merged.length - 1 || s.done;
        return (
          <g key={'m' + k}>
            <rect x={ox + st * SCALE} y="180" width={(e - st) * SCALE} height="22" rx="8" fill={sealed ? 'rgba(86,211,100,.22)' : 'rgba(86,211,100,.12)'} stroke="#56d364" strokeWidth={sealed ? 2.5 : 2} strokeDasharray={sealed ? 'none' : '6 4'} style={{ transition: 'width .35s' }} />
            <text x={ox + st * SCALE + 8} y="195" fill="#7ee787" fontSize="11" fontWeight="700" fontFamily="Consolas">[{st},{e}]{sealed ? ' 🔒' : ' …open'}</text>
          </g>
        );
      })}
    </Stage2D>
  );
}

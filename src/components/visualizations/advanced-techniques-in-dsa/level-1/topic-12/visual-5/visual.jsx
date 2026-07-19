/* Problem: Non-Overlapping Intervals (minimum removals)
 * 2D animated: activity selection inverted — keep the maximum compatible set (earliest-end
 * greedy), and whatever isn't kept is the minimum to remove. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const IV = [[1, 2], [1, 3], [2, 3], [3, 4]];  // sorted by end
const STEPS = [
  { upto: 0, kept: [0], removed: [], lastEnd: 2, log: '[1,2]: first interval → keep (last end = 2)' },
  { upto: 1, kept: [0], removed: [1], lastEnd: 2, log: '[1,3]: starts 1 < 2 → overlaps → REMOVE it' },
  { upto: 2, kept: [0, 2], removed: [1], lastEnd: 3, log: '[2,3]: starts 2 ≥ 2 → compatible → keep' },
  { upto: 3, kept: [0, 2, 3], removed: [1], done: true, lastEnd: 4, log: '[3,4]: 3 ≥ 3 → keep. Removals needed: 1' },
];
const SCALE = 90, ox = 120;
export default function GreedyNonOverlapVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.8, auto);
  const s = STEPS[i];
  return (
    <Stage2D title="Non-Overlapping Intervals" subtitle="'Minimum removals so nothing overlaps' is activity selection in disguise: greedily KEEP the earliest-ending compatible intervals (the maximum possible), and count what's left out."
      accent="#f0a35e" viewBox="0 0 640 220"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>Sort by <strong>end</strong>, sweep, keep whatever starts at or after the last kept end. Keeping the earliest finisher provably maximises the kept set, so removals = n − kept is minimal. <strong>O(n log n)</strong>. Cousin problems: minimum arrows to burst balloons, meeting rooms.</>}>
      {Array.from({ length: 5 }).map((_, t) => <text key={t} x={ox + t * SCALE} y="30" fill="#6e7681" fontSize="11" textAnchor="middle" fontFamily="Consolas">{t}</text>)}
      {IV.map(([st, e], k) => {
        const isCur = k === s.upto, isKept = s.kept.includes(k), isRemoved = s.removed.includes(k);
        const seen = k <= s.upto;
        return (
          <g key={k} opacity={!seen ? 0.35 : isRemoved ? 0.5 : 1} style={{ transition: 'opacity .3s' }}>
            <rect x={ox + st * SCALE} y={44 + k * 32} width={(e - st) * SCALE} height="24" rx="8" fill={isRemoved ? 'rgba(248,81,73,.14)' : isKept && seen ? 'rgba(86,211,100,.18)' : isCur ? 'rgba(255,212,59,.14)' : '#161b22'} stroke={isRemoved ? '#f85149' : isKept && seen ? '#56d364' : isCur ? '#ffd43b' : '#6e7681'} strokeWidth={isCur ? 2.5 : 2} strokeDasharray={isRemoved ? '5 4' : 'none'} className={isCur ? 'dsa2d-pulse' : ''} />
            <text x={ox + st * SCALE + 10} y={61 + k * 32} fill={isRemoved ? '#ff9d95' : '#e6edf3'} fontSize="11" fontWeight="700" fontFamily="Consolas">[{st},{e}]{isRemoved ? ' ✂' : ''}</text>
          </g>
        );
      })}
      <text x="320" y="200" fill={s.done ? '#56d364' : '#8b949e'} fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{s.done ? '✓ minimum removals = 1 (the dashed interval)' : `kept: ${s.kept.length} · removed: ${s.removed.length}`}</text>
    </Stage2D>
  );
}

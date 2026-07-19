/* Problem: Longest Consecutive Sequence
 * 2D animated: put everything in a set, then only start counting at a number whose predecessor
 * is absent (a true sequence start). Extend upward. O(n) despite looking nested. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const NUMS = [100, 4, 200, 1, 3, 2];
const SET = new Set(NUMS);
// starts: numbers with no predecessor; the run 1,2,3,4 is longest (4)
const SORTED = [...NUMS].sort((a, b) => a - b);
export default function HtLongestConsecutiveVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v >= SORTED.length ? 0 : v + 1)), 0.9, auto);
  const cur = SORTED[Math.min(i, SORTED.length - 1)];
  const isStart = cur !== undefined && !SET.has(cur - 1);
  // run length from cur
  let run = 0; if (isStart) { let x = cur; while (SET.has(x)) { run++; x++; } }
  const done = i >= SORTED.length;
  const CW = 74, gap = 10;
  const startX = 320 - (SORTED.length * (CW + gap) - gap) / 2;
  const bestRun = [1, 2, 3, 4];

  return (
    <Stage2D
      title="Longest Consecutive Sequence"
      subtitle="Dump the numbers in a set for O(1) lookups. Only begin counting at a 'start' (no n−1 in the set), then walk n, n+1, n+2… Each number is visited at most twice."
      accent="#56d364"
      viewBox="0 0 640 230"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v >= SORTED.length ? 0 : v + 1))}>next</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{done ? 'longest run = 4' : isStart ? `${cur} is a start → run ${run}` : `${cur} not a start (skip)`}</span>
        </>
      }
      legend={<>The insight that makes it O(n): a number only kicks off a count if <code>num−1</code> is <strong>not</strong> in the set. That guarantees each consecutive run is walked exactly once. Here the run <strong>1→2→3→4</strong> has length 4 (100 and 200 are isolated).</>}
    >
      {SORTED.map((v, k) => {
        const start = !SET.has(v - 1);
        const inBest = bestRun.includes(v);
        const isCur = k === i && !done;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="66" width={CW} height="54" rx="8"
              fill={inBest && done ? 'rgba(86,211,100,.28)' : isCur ? 'rgba(88,166,255,.22)' : '#161b22'}
              stroke={inBest && done ? '#56d364' : isCur ? '#58a6ff' : start ? '#a78bfa' : '#30363d'} strokeWidth="2" className={isCur ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="99" fill="#e6edf3" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            {start && !done && <text x={startX + k * (CW + gap) + CW / 2} y="58" fill="#a78bfa" fontSize="11" textAnchor="middle" fontFamily="Consolas">start</text>}
          </g>
        );
      })}
      <text x="320" y="152" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">purple-outlined = sequence starts (no predecessor in set)</text>
      {done && <text x="320" y="182" fill="#56d364" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">longest consecutive: 1,2,3,4 → length 4</text>}
    </Stage2D>
  );
}

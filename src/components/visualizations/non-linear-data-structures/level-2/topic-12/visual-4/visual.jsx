/* Problem: Top K Frequent Elements
 * 2D animated: count frequencies with a hash map, then keep a size-k min-heap over those
 * counts. The heap ends holding the k most frequent values. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const NUMS = [1, 1, 1, 2, 2, 3];
const K = 2;
const FREQ = {}; NUMS.forEach(n => FREQ[n] = (FREQ[n] || 0) + 1);
const ENTRIES = Object.entries(FREQ).map(([v, c]) => ({ v: +v, c }));   // [{1,3},{2,2},{3,1}]
export default function HeapTopKFrequentVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v > ENTRIES.length ? 0 : v + 1)), 1.1, auto);
  // size-k min-heap by count
  let heap = [];
  ENTRIES.slice(0, Math.min(i, ENTRIES.length)).forEach(e => { heap.push(e); heap.sort((a, b) => a.c - b.c); if (heap.length > K) heap.shift(); });
  const done = i > ENTRIES.length;
  const CW = 84, gap = 16;
  const startX = 320 - (ENTRIES.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Top K Frequent Elements"
      subtitle="First count how often each value appears. Then run a size-k min-heap over those (value, count) pairs — the survivors are the k most frequent."
      accent="#a78bfa"
      viewBox="0 0 640 240"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v > ENTRIES.length ? 0 : v + 1))}>next</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{done ? `top ${K}: ${heap.map(e => e.v).join(', ')}` : 'building heap…'}</span>
        </>
      }
      legend={<>Counting is <strong>O(n)</strong>; the size-k heap over m distinct values is <strong>O(m log k)</strong>. (A bucket-sort by frequency can even hit O(n).) Here counts are 1→3, 2→2, 3→1, so the top {K} are <strong>1 and 2</strong>.</>}
    >
      <text x="320" y="46" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">frequency map</text>
      {ENTRIES.map((e, k) => {
        const inHeap = heap.some(h => h.v === e.v);
        const processed = k < i;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="60" width={CW} height="60" rx="10"
              fill={done && inHeap ? 'rgba(167,139,250,.28)' : processed ? '#161b22' : '#0d1117'}
              stroke={done && inHeap ? '#a78bfa' : processed ? '#6e7681' : '#30363d'} strokeWidth="2" />
            <text x={startX + k * (CW + gap) + CW / 2} y="86" fill="#e6edf3" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">val {e.v}</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="107" fill="#8b949e" fontSize="13" textAnchor="middle" fontFamily="Consolas">×{e.c}</text>
          </g>
        );
      })}
      <text x="320" y="158" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">size-{K} min-heap keeps the most frequent</text>
      {heap.map((e, k) => (
        <g key={k} className="dsa2d-fade">
          <rect x={250 + k * 80} y="170" width="70" height="44" rx="9" fill="rgba(167,139,250,.2)" stroke="#a78bfa" strokeWidth="2" />
          <text x={285 + k * 80} y="197" fill="#c9bdf5" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{e.v} (×{e.c})</text>
        </g>
      ))}
    </Stage2D>
  );
}

/* Problem: Kth Largest Element in an Array
 * 2D animated: keep a min-heap of size k. After scanning everything, the heap holds the k
 * largest values and its ROOT is exactly the kth largest. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const NUMS = [3, 2, 3, 1, 2, 4, 5, 5, 6];
const K = 4;   // 4th largest = 4
function keptAt(n) { let kept = []; for (let i = 0; i < n; i++) { kept.push(NUMS[i]); kept.sort((a, b) => a - b); if (kept.length > K) kept.shift(); } return kept; }
export default function HeapKthLargestVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v >= NUMS.length ? 0 : v + 1)), 0.75, auto);
  const kept = keptAt(i);
  const done = i >= NUMS.length;
  const CW = 50, gap = 6;
  const startX = 320 - (NUMS.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Kth Largest Element"
      subtitle="Don't sort the whole array. Keep a min-heap capped at size k — its smallest element (the root) is always the kth largest seen so far."
      accent="#f0883e"
      viewBox="0 0 640 230"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v >= NUMS.length ? 0 : v + 1))}>next</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{done ? `${K}th largest = ${kept[0]}` : `heap(${K}): {${kept.join(',')}}`}</span>
        </>
      }
      legend={<>Push each value; if the heap exceeds k, pop the min. What survives are the k largest, and the root is the answer → <strong>O(n log k)</strong>, better than fully sorting O(n log n) when k is small. Here the <strong>{K}th largest is {kept[0] ?? '4'}</strong>.</>}
    >
      {NUMS.map((v, k) => {
        const scanned = k < i, cur = k === i && !done;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="50" width={CW} height="44" rx="7" fill={cur ? 'rgba(88,166,255,.22)' : scanned ? '#161b22' : '#0d1117'} stroke={cur ? '#58a6ff' : scanned ? '#6e7681' : '#30363d'} strokeWidth="2" className={cur ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="78" fill="#e6edf3" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      <text x="320" y="128" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">min-heap of the {K} largest so far</text>
      {kept.map((v, k) => {
        const isRoot = k === 0;
        return (
          <g key={k} className="dsa2d-fade">
            <rect x={230 + k * 50} y="140" width="44" height="44" rx="8" fill={isRoot ? 'rgba(240,136,62,.28)' : 'rgba(86,211,100,.16)'} stroke={isRoot ? '#f0883e' : '#56d364'} strokeWidth="2" />
            <text x={252 + k * 50} y="168" fill="#e6edf3" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      {kept.length > 0 && <text x="252" y="202" fill="#f0883e" fontSize="11" textAnchor="middle" fontFamily="Consolas">root = kth largest</text>}
    </Stage2D>
  );
}

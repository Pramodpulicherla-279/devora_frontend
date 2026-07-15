/* Lesson: Finding the K Largest (or Smallest) Elements
 * 2D animated: keep a min-heap of size k while scanning. Push each value; if the heap grows
 * past k, pop the smallest. What remains are the k largest — in O(n log k). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ARR = [4, 10, 2, 8, 6, 7];
const K = 3;
function keptAt(n) {
  let kept = [];
  for (let i = 0; i < n; i++) { kept.push(ARR[i]); kept.sort((a, b) => a - b); if (kept.length > K) kept.shift(); }
  return kept;
}
export default function HeapKLargestVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v >= ARR.length ? 0 : v + 1)), 0.9, auto);
  const kept = keptAt(i);
  const done = i >= ARR.length;
  const CW = 60, gap = 10;
  const startX = 320 - (ARR.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="K Largest With a Size-k Heap"
      subtitle="Keep only the k biggest seen so far in a min-heap of size k. Its smallest (the root) is the bar to beat — anything smaller is discarded immediately."
      accent="#56d364"
      viewBox="0 0 640 230"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v >= ARR.length ? 0 : v + 1))}>next</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{done ? `${K} largest: ${kept.join(', ')}` : `heap of ${K}: {${kept.join(', ')}}`}</span>
        </>
      }
      legend={<>A size-k min-heap costs <strong>O(n log k)</strong> — better than sorting the whole list (O(n log n)) when k is small. The heap's root is the smallest of the current top-k, so each new value only needs one O(1) comparison before deciding to keep it. (For k smallest, use a max-heap.)</>}
    >
      {ARR.map((v, k) => {
        const scanned = k < i, cur = k === i && !done;
        const inKept = scanned && kept.includes(v) && ARR.slice(0, i).lastIndexOf(v) === k;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="52" width={CW} height="50" rx="8" fill={cur ? 'rgba(88,166,255,.22)' : scanned ? '#161b22' : '#0d1117'} stroke={cur ? '#58a6ff' : scanned ? '#484f58' : '#30363d'} strokeWidth="2" className={cur ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="83" fill="#e6edf3" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      {/* kept heap */}
      <text x="320" y="138" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">min-heap of top {K}</text>
      {kept.map((v, k) => {
        const isMin = k === 0;
        return (
          <g key={k} className="dsa2d-fade">
            <rect x={240 + k * 60} y="150" width="52" height="46" rx="8" fill={isMin ? 'rgba(240,136,62,.2)' : 'rgba(86,211,100,.18)'} stroke={isMin ? '#f0883e' : '#56d364'} strokeWidth="2" />
            <text x={266 + k * 60} y="179" fill="#e6edf3" fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      {kept.length > 0 && <text x={266} y="214" fill="#f0883e" fontSize="10" textAnchor="middle" fontFamily="Consolas">root = min</text>}
    </Stage2D>
  );
}

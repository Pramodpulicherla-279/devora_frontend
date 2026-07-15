/* Problem: Find Median From a Data Stream
 * 2D animated: two heaps split the numbers in half — a max-heap for the lower half, a min-heap
 * for the upper. The median is read from their tops in O(1). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

// snapshots after adding each streamed value
const STEPS = [
  { add: 5, low: [5], high: [], med: '5' },
  { add: 2, low: [2], high: [5], med: '3.5' },
  { add: 8, low: [5, 2], high: [8], med: '5' },
  { add: 1, low: [2, 1], high: [5, 8], med: '3.5' },
  { add: 9, low: [5, 2, 1], high: [8, 9], med: '5' },
];
export default function HeapMedianStreamVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.5, auto);
  const s = STEPS[i];

  return (
    <Stage2D
      title="Median From a Data Stream"
      subtitle="Keep the smaller half in a max-heap and the larger half in a min-heap, balanced in size. The median sits right at their tops."
      accent="#58a6ff"
      viewBox="0 0 640 250"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v + 1) % STEPS.length)}>add next</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">added {s.add} · median = {s.med}</span>
        </>
      }
      legend={<>Each new value is pushed to one heap then rebalanced so the sizes differ by ≤1 → <strong>O(log n)</strong> per insert. The median is the top of the larger heap, or the average of both tops when sizes are equal — read in <strong>O(1)</strong>.</>}
    >
      {/* max-heap (low) */}
      <text x="160" y="46" fill="#f0883e" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="system-ui">max-heap · lower half</text>
      {s.low.map((v, k) => {
        const top = k === 0;
        return (
          <g key={k} className="dsa2d-fade">
            <rect x={90 + k * 54} y="60" width="46" height="46" rx="9" fill={top ? 'rgba(240,136,62,.28)' : '#161b22'} stroke={top ? '#f0883e' : '#7c6bb0'} strokeWidth="2" />
            <text x={113 + k * 54} y="89" fill="#e6edf3" fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      <text x="160" y="128" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">top = largest of low</text>
      {/* min-heap (high) */}
      <text x="480" y="46" fill="#56d364" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="system-ui">min-heap · upper half</text>
      {s.high.map((v, k) => {
        const top = k === 0;
        return (
          <g key={k} className="dsa2d-fade">
            <rect x={410 + k * 54} y="60" width="46" height="46" rx="9" fill={top ? 'rgba(86,211,100,.24)' : '#161b22'} stroke={top ? '#56d364' : '#7c6bb0'} strokeWidth="2" />
            <text x={433 + k * 54} y="89" fill="#e6edf3" fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      <text x="480" y="128" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">top = smallest of high</text>
      <line x1="320" y1="40" x2="320" y2="130" stroke="#30363d" strokeDasharray="4 4" />
      {/* median */}
      <rect x="240" y="164" width="160" height="52" rx="12" fill="#0b0f15" stroke="#58a6ff" strokeWidth="2" />
      <text x="320" y="186" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">median</text>
      <text x="320" y="209" fill="#79c0ff" fontSize="22" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{s.med}</text>
    </Stage2D>
  );
}

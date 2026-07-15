/* Lesson: Constant Time O(1) — The Fastest an Operation Can Be
 * 2D animated: nums[i] jumps straight to one cell, no matter how big the array. Grow n
 * and the number of steps stays exactly 1. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function CaConstantTimeVisualization() {
  const [n, setN] = useState(6);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setN(v => (v >= 12 ? 4 : v + 2)), 1.2, auto);
  const target = Math.min(3, n - 1);
  const CW = Math.min(46, 520 / n), gap = 5;
  const startX = 320 - (n * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Constant Time O(1)"
      subtitle="An O(1) operation takes the same time regardless of input size. Array indexing jumps straight to the address — one step, always."
      accent="#56d364"
      viewBox="0 0 640 200"
      controls={
        <>
          <div className="dsa2d-group"><span className="dsa2d-label">array size n = {n}</span><input className="dsa2d-slider" type="range" min="4" max="12" step="2" value={n} onChange={e => setN(+e.target.value)} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">nums[{target}] → 1 step</span>
        </>
      }
      legend={<>The array grows, but <code>nums[{target}]</code> always costs <strong>1 step</strong> — the index is multiplied by the item size and added to the base address. Dict/set lookups and stack push/pop are also O(1). Flat line = the dream.</>}
    >
      {Array.from({ length: n }).map((_, i) => {
        const on = i === target;
        return (
          <g key={i} className="dsa2d-fade">
            <rect x={startX + i * (CW + gap)} y="70" width={CW} height="52" rx="7" fill={on ? '#56d364' : '#161b22'} stroke={on ? '#56d364' : '#30363d'} strokeWidth="2" />
            <text x={startX + i * (CW + gap) + CW / 2} y="102" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">{i}</text>
          </g>
        );
      })}
      {/* direct jump arrow */}
      <g style={{ transform: `translate(${startX + target * (CW + gap) + CW / 2}px, 44px)`, transition: 'transform .4s cubic-bezier(.4,1.3,.5,1)' }}>
        <polygon points="-10,-16 10,-16 0,0" fill="#56d364" className="dsa2d-pulse" />
        <text y="-22" fill="#56d364" fontSize="13" textAnchor="middle" fontFamily="Consolas">nums[{target}]</text>
      </g>
      <text x="320" y="158" fill="#c9d1d9" fontSize="13" textAnchor="middle" fontFamily="Consolas">steps = 1  (independent of n)</text>
    </Stage2D>
  );
}

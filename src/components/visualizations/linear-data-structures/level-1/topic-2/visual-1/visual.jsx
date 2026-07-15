/* Lesson: Static Arrays vs Dynamic Arrays — How Python Lists Actually Grow
 * 2D animated: appending fills a fixed-capacity block; when it's full, Python allocates a
 * BIGGER block (capacity doubles) and copies everything over. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

// capacity grows 4 → 8 → 16 as it fills
function capacityFor(n) { let c = 4; while (c < n) c *= 2; return c; }
export default function ArrDynamicGrowthVisualization() {
  const [n, setN] = useState(1);                 // number of items
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setN(v => (v >= 10 ? 1 : v + 1)), 0.85, auto);
  const cap = capacityFor(n);
  const justResized = n > 1 && capacityFor(n - 1) !== cap;
  const CW = Math.min(34, 520 / cap), gap = 4;
  const startX = 320 - (cap * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Dynamic Arrays: How Lists Grow"
      subtitle="A Python list reserves spare capacity. Appends drop into empty slots for free — until the block fills, when it reallocates to a larger block and copies everything."
      accent="#f0883e"
      viewBox="0 0 640 230"
      controls={
        <>
          <div className="dsa2d-group"><span className="dsa2d-label">items = {n}</span><input className="dsa2d-slider" type="range" min="1" max="10" value={n} onChange={e => setN(+e.target.value)} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">size {n} / capacity {cap}</span>
        </>
      }
      legend={<>A <strong>static</strong> array has fixed size — full means full. A <strong>dynamic</strong> array (Python's <code>list</code>) over-allocates, so most appends are O(1). When it fills, capacity typically <strong>doubles</strong> and all elements are copied to the new block — that one append is O(n).</>}
    >
      {Array.from({ length: cap }).map((_, k) => {
        const filled = k < n;
        const isNew = k === n - 1;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="80" width={CW} height="48" rx="6"
              fill={filled ? (isNew ? 'rgba(240,136,62,.25)' : 'rgba(240,136,62,.12)') : '#0b0f15'}
              stroke={filled ? '#f0883e' : '#21262d'} strokeWidth="2" strokeDasharray={filled ? '0' : '3 3'}
              className={isNew ? 'dsa2d-pop' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
            {filled && <text x={startX + k * (CW + gap) + CW / 2} y="110" fill="#f8c088" fontSize="13" textAnchor="middle" fontFamily="Consolas">{k}</text>}
          </g>
        );
      })}
      <text x="320" y="62" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">solid = used · dashed = reserved spare capacity</text>
      {justResized
        ? <text x="320" y="164" fill="#f0883e" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas" className="dsa2d-pulse">⚡ full! capacity doubled → {cap}, all items copied (O(n))</text>
        : <text x="320" y="164" fill="#56d364" fontSize="14" textAnchor="middle" fontFamily="Consolas">append into spare slot → O(1)</text>}
    </Stage2D>
  );
}

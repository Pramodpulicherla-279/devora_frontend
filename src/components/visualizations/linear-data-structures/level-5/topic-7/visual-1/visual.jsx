/* Lesson: Load Factor and Resizing — Keeping Lookups Fast
 * 2D animated: as entries fill the table, the load factor climbs. Cross the threshold (~2/3)
 * and the table doubles capacity and rehashes everything to stay fast. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const THRESH = 0.66;
function capacityFor(n) { let cap = 8; while (n / cap > THRESH) cap *= 2; return cap; }
export default function HtLoadFactorVisualization() {
  const [n, setN] = useState(1);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setN(v => (v >= 12 ? 1 : v + 1)), 0.8, auto);
  const cap = capacityFor(n);
  const lf = n / cap;
  const justResized = n > 1 && capacityFor(n - 1) !== cap;
  const cellW = Math.min(30, 480 / cap), gap = 4;
  const startX = 320 - (cap * (cellW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Load Factor & Resizing"
      subtitle="Load factor = entries ÷ capacity. As it rises, collisions become likely. Crossing the threshold triggers a resize: allocate a bigger table and rehash every key."
      accent="#a78bfa"
      viewBox="0 0 640 230"
      controls={
        <>
          <div className="dsa2d-group"><span className="dsa2d-label">entries = {n}</span><input className="dsa2d-slider" type="range" min="1" max="12" value={n} onChange={e => setN(+e.target.value)} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">load = {n}/{cap} = {lf.toFixed(2)}</span>
        </>
      }
      legend={<>Keeping the load factor below ~<strong>0.66</strong> keeps buckets sparse and operations O(1). When it's exceeded, the table roughly <strong>doubles</strong> and every entry is rehashed into the new slots — an occasional O(n) cost that keeps the average O(1) (amortized).</>}
    >
      {/* gauge */}
      <rect x="120" y="46" width="400" height="26" rx="8" fill="#0b0f15" stroke="#30363d" />
      <rect x="120" y="46" width="400" height="26" rx="8" fill={lf > THRESH ? '#f0883e' : '#a78bfa'} style={{ transform: `scaleX(${Math.min(lf / THRESH, 1)})`, transformBox: 'fill-box', transformOrigin: 'left', transition: 'transform .35s, fill .3s' }} />
      <line x1="520" y1="40" x2="520" y2="78" stroke="#f0883e" strokeWidth="2" strokeDasharray="4 3" />
      <text x="520" y="92" fill="#f0883e" fontSize="11" textAnchor="middle" fontFamily="Consolas">0.66</text>
      {/* buckets */}
      {Array.from({ length: cap }).map((_, k) => {
        const filled = k < n;
        return <rect key={k} x={startX + k * (cellW + gap)} y="110" width={cellW} height="40" rx="4" fill={filled ? 'rgba(167,139,250,.25)' : '#0d1117'} stroke={filled ? '#a78bfa' : '#21262d'} strokeWidth="1.5" className={filled && k === n - 1 ? 'dsa2d-pop' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />;
      })}
      <text x="320" y="176" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">capacity = {cap} slots</text>
      {justResized
        ? <text x="320" y="204" fill="#f0883e" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas" className="dsa2d-pulse">⚡ threshold crossed → resized to {cap} & rehashed</text>
        : <text x="320" y="204" fill="#56d364" fontSize="13" textAnchor="middle" fontFamily="Consolas">plenty of room — lookups stay O(1)</text>}
    </Stage2D>
  );
}

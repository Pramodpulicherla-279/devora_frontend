/* Lesson: Amortized Analysis — Why Appending to a List Is "Usually" O(1)
 * 2D animated: per-append cost bars. Most appends cost 1; the occasional resize spikes to n,
 * but averaged over many appends it's still O(1). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

// per-append cost: 1 normally; a copy of current size when capacity doubles (4,8)
const COSTS = [1, 1, 1, 1, 5, 1, 1, 1, 9, 1, 1, 1];   // spikes at index 4 (copy 4) and 8 (copy 8)
export default function ArrAmortizedVisualization() {
  const [n, setN] = useState(1);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setN(v => (v >= COSTS.length ? 1 : v + 1)), 0.5, auto);
  const total = COSTS.slice(0, n).reduce((a, b) => a + b, 0);
  const avg = (total / n).toFixed(2);
  const BW = 40, gap = 6, startX = 60;

  return (
    <Stage2D
      title="Amortized O(1) Appends"
      subtitle="A single append is usually cheap, but occasionally triggers an expensive copy. Averaged over all appends, the cost per append stays constant."
      accent="#a78bfa"
      viewBox="0 0 640 250"
      controls={
        <>
          <div className="dsa2d-group"><span className="dsa2d-label">appends: {n}</span><input className="dsa2d-slider" type="range" min="1" max={COSTS.length} value={n} onChange={e => setN(+e.target.value)} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">total {total} / {n} = {avg} avg</span>
        </>
      }
      legend={<>Most appends cost <strong>1</strong> (drop into a spare slot). Every so often the list is full, so it doubles capacity and copies all <code>n</code> items — a tall spike. But those spikes are rare and grow apart geometrically, so the <strong>average cost per append is O(1)</strong>. That's what "amortized" means.</>}
    >
      {/* baseline */}
      <line x1="50" y1="180" x2="590" y2="180" stroke="#30363d" />
      {COSTS.map((cost, k) => {
        const shown = k < n;
        const spike = cost > 1;
        const h = cost * 14;
        return (
          <g key={k} style={{ opacity: shown ? 1 : 0.12, transition: 'opacity .3s' }}>
            <rect x={startX + k * (BW + gap)} y={180 - h} width={BW} height={h} rx="4"
              fill={spike ? '#f0883e' : '#a78bfa'} className={shown && k === n - 1 ? 'dsa2d-pop' : ''}
              style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }} />
            <text x={startX + k * (BW + gap) + BW / 2} y="196" fill="#8b949e" fontSize="10" textAnchor="middle" fontFamily="Consolas">{k + 1}</text>
            {spike && shown && <text x={startX + k * (BW + gap) + BW / 2} y={175 - h} fill="#f0883e" fontSize="11" textAnchor="middle" fontFamily="Consolas">copy!</text>}
          </g>
        );
      })}
      {/* average line */}
      <line x1="50" y1={180 - (total / n) * 14} x2="590" y2={180 - (total / n) * 14} stroke="#56d364" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="596" y={184 - (total / n) * 14} fill="#56d364" fontSize="12" textAnchor="end" fontFamily="Consolas">avg ≈ {avg}</text>
      <text x="320" y="228" fill="#c9d1d9" fontSize="13" textAnchor="middle" fontFamily="Consolas">purple = O(1) appends · orange = rare O(n) resize · dashed = running average</text>
    </Stage2D>
  );
}

/* Problem: Subsets (Bitmask Enumeration Revisited)
 * 2D animated: the iterative subsets solution — count masks 0..2ⁿ−1 and read each one as a
 * membership pattern. No recursion, no backtracking, just a for-loop. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ITEMS = ['a', 'b', 'c'];
export default function BitBitmaskEnumVisualization() {
  const [mask, setMask] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setMask(v => (v + 1) % 8), 1.1, auto);
  const subset = ITEMS.filter((_, i) => mask & (1 << i));
  return (
    <Stage2D title="Subsets by Counting (Iterative)" subtitle="The backtracking version builds subsets recursively; this one just counts. Each integer 0..7 IS a subset — bit i answers 'is element i in?' Loop, decode, collect."
      accent="#58a6ff" viewBox="0 0 640 250"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setMask(v => (v + 1) % 8)}>mask++</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">mask {mask} = {mask.toString(2).padStart(3, '0')}₂ → {'{' + (subset.join(',') || '∅') + '}'}</span></>}
      legend={<>The for-loop <code>for mask in range(2**n)</code> visits every subset exactly once — the binary counter does the enumeration bookkeeping that backtracking does with recursion. Same O(n·2ⁿ) output cost; choose whichever reads cleaner. This duality (recursion ↔ counting) is the point of the problem.</>}>
      {/* the counter */}
      {[2, 1, 0].map((bit, col) => {
        const on = mask & (1 << bit);
        return (
          <g key={bit}>
            <rect x={200 + col * 90} y="46" width="70" height="52" rx="10" fill={on ? 'rgba(88,166,255,.26)' : '#161b22'} stroke={on ? '#58a6ff' : '#30363d'} strokeWidth={on ? 3 : 2} style={{ transition: 'fill .25s' }} />
            <text x={235 + col * 90} y="80" fill={on ? '#79c0ff' : '#6e7681'} fontSize="22" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{on ? 1 : 0}</text>
            <text x={235 + col * 90} y="114" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">'{ITEMS[bit]}' in?</text>
          </g>
        );
      })}
      {/* collected list */}
      <text x="90" y="160" fill="#8b949e" fontSize="12" fontFamily="system-ui">collected so far:</text>
      {Array.from({ length: mask + 1 }).map((_, m) => {
        const sub = ITEMS.filter((_, i) => m & (1 << i));
        return (
          <g key={m} className="dsa2d-fade">
            <rect x={90 + (m % 4) * 130} y={172 + Math.floor(m / 4) * 36} width="116" height="28" rx="8" fill={m === mask ? 'rgba(88,166,255,.2)' : '#161b22'} stroke={m === mask ? '#58a6ff' : '#3d4450'} strokeWidth={m === mask ? 2.5 : 1.5} />
            <text x={148 + (m % 4) * 130} y={191 + Math.floor(m / 4) * 36} fill={m === mask ? '#79c0ff' : '#c9d1d9'} fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{m}: {'{' + (sub.join(',') || '∅') + '}'}</text>
          </g>
        );
      })}
    </Stage2D>
  );
}

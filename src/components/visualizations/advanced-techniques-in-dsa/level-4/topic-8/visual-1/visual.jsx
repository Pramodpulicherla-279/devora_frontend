/* Lesson: The Bitmask Pattern for Tracking Subsets
 * 2D animated: a 3-bit mask ↔ a subset of {a, b, c}. Count from 000 to 111 and watch each
 * mask select its subset — 2ⁿ masks enumerate every subset. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ITEMS = ['a', 'b', 'c'];
export default function BitBitmaskSubsetsVisualization() {
  const [mask, setMask] = useState(5);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setMask(v => (v + 1) % 8), 1.2, auto);
  const subset = ITEMS.filter((_, i) => mask & (1 << i));
  return (
    <Stage2D title="Bitmasks = Subsets" subtitle="Give every element one bit: bit i ON means element i is in the subset. An integer 0..2ⁿ−1 encodes any subset, and looping over all integers enumerates them all."
      accent="#58a6ff" viewBox="0 0 640 250"
      controls={<><div className="dsa2d-group"><span className="dsa2d-label">mask = {mask}</span><input className="dsa2d-slider" type="range" min="0" max="7" value={mask} onChange={e => setMask(+e.target.value)} /></div><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{mask.toString(2).padStart(3, '0')} → {'{' + subset.join(',') + '}'}</span></>}
      legend={<>Subset ops become bit ops: add element i → <code>mask | (1&lt;&lt;i)</code>, test → <code>mask &amp; (1&lt;&lt;i)</code>, union → <code>|</code>, intersection → <code>&amp;</code>. This encoding powers <strong>bitmask DP</strong> (e.g. travelling salesman over "which cities are visited") where a set must be a dictionary key or array index.</>}>
      {/* bits */}
      {[2, 1, 0].map((bit, col) => {
        const on = mask & (1 << bit);
        return (
          <g key={bit}>
            <rect x={200 + col * 90} y="52" width="70" height="56" rx="9" fill={on ? 'rgba(88,166,255,.28)' : '#161b22'} stroke={on ? '#58a6ff' : '#30363d'} strokeWidth={on ? 3 : 2} style={{ transition: 'fill .25s' }} />
            <text x={235 + col * 90} y="88" fill={on ? '#79c0ff' : '#484f58'} fontSize="24" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{on ? 1 : 0}</text>
            <text x={235 + col * 90} y="126" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">bit {bit} = '{ITEMS[bit]}'</text>
          </g>
        );
      })}
      {/* subset */}
      <text x="320" y="164" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">selected subset</text>
      {ITEMS.map((it, i) => {
        const on = mask & (1 << i);
        return (
          <g key={it}>
            <circle cx={250 + i * 70} cy="198" r="22" fill={on ? 'rgba(86,211,100,.24)' : '#161b22'} stroke={on ? '#56d364' : '#30363d'} strokeWidth={on ? 3 : 2} className={on ? 'dsa2d-fade' : ''} style={{ transition: 'fill .25s, stroke .25s' }} />
            <text x={250 + i * 70} y="204" fill={on ? '#7ee787' : '#484f58'} fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{it}</text>
          </g>
        );
      })}
      <text x="320" y="244" fill="#79c0ff" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">mask {mask} = {mask.toString(2).padStart(3, '0')}₂ ↔ {'{' + (subset.join(', ') || '∅') + '}'}</text>
    </Stage2D>
  );
}

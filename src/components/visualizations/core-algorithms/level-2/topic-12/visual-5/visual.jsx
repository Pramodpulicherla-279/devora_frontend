/* Problem: Sort Characters by Frequency
 * 2D animated: count with a hash map, then order by count descending — "tree" becomes "eetr".
 * Counting + sorting the counts, not the characters. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const S = 'tree';
const PHASES = [
  { p: 0, log: 'input: "tree"' },
  { p: 1, log: 'count: t→1, r→1, e→2 (one hash-map pass)' },
  { p: 2, log: 'sort keys by count desc: e(2), t(1), r(1)' },
  { p: 3, done: true, log: 'rebuild: "ee" + "t" + "r" → "eetr"' },
];
export default function SortFreqCharsVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PHASES.length), 1.9, auto);
  const ph = PHASES[i];
  const counts = [['e', 2], ['t', 1], ['r', 1]];
  return (
    <Stage2D title="Sort Characters by Frequency" subtitle="Sorting the characters directly can't work — order depends on COUNTS. So count first (hash map), then sort the few distinct keys by their count, then rebuild the string."
      accent="#4fce78" viewBox="0 0 640 230"
      controls={<>{PHASES.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{ph.log}</span></>}
      legend={<>Count O(n) + sort the <em>k distinct</em> keys O(k log k) → effectively <strong>O(n + k log k)</strong>. A bucket-by-count variant (index = frequency) removes even the sort → O(n). Pattern to remember: <strong>transform, then sort the transform</strong>, not the raw data.</>}>
      {/* input */}
      {S.split('').map((ch, k) => <g key={k}><rect x={160 + k * 56} y="44" width="46" height="42" rx="8" fill={ph.p >= 1 ? 'rgba(88,166,255,.14)' : '#161b22'} stroke="#58a6ff" strokeWidth="2" /><text x={183 + k * 56} y="71" fill="#e6edf3" fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text></g>)}
      <text x="130" y="70" textAnchor="end" fill="#8b949e" fontSize="12" fontFamily="Consolas">input</text>
      {/* counts */}
      {ph.p >= 1 && counts.map(([ch, c], k) => (
        <g key={ch} className="dsa2d-fade">
          <rect x={ph.p >= 2 ? 160 + k * 110 : 160 + [1, 0, 2][k] * 110} y="110" width="96" height="40" rx="9" fill={ph.p >= 2 && k === 0 ? 'rgba(86,211,100,.2)' : '#161b22'} stroke={ph.p >= 2 && k === 0 ? '#56d364' : '#8b949e'} strokeWidth="2" style={{ transition: 'x .5s' }} />
          <text x={(ph.p >= 2 ? 208 + k * 110 : 208 + [1, 0, 2][k] * 110)} y="136" fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas" style={{ transition: 'x .5s' }}>'{ch}' × {c}</text>
        </g>
      ))}
      {ph.p >= 1 && <text x="130" y="136" textAnchor="end" fill="#8b949e" fontSize="12" fontFamily="Consolas">{ph.p >= 2 ? 'sorted ↓count' : 'counts'}</text>}
      {/* output */}
      {ph.p >= 3 && 'eetr'.split('').map((ch, k) => <g key={k} className="dsa2d-pop" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}><rect x={160 + k * 56} y="172" width="46" height="42" rx="8" fill="rgba(86,211,100,.22)" stroke="#56d364" strokeWidth="2.5" /><text x={183 + k * 56} y="199" fill="#7ee787" fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text></g>)}
      {ph.p >= 3 && <text x="130" y="198" textAnchor="end" fill="#8b949e" fontSize="12" fontFamily="Consolas">output</text>}
    </Stage2D>
  );
}

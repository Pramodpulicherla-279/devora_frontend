/* Lesson: Checking, Setting, and Clearing a Specific Bit
 * 2D animated: the three masking recipes applied to bit k of a byte — check with &,
 * set with |, clear with & ~. Slide k and toggle the operation. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const N0 = 0b10101100;
const OPS = {
  check: { expr: k => `n & (1 << ${k})`, f: (n, k) => n & (1 << k), note: 'non-zero means the bit is ON — n unchanged' },
  set: { expr: k => `n | (1 << ${k})`, f: (n, k) => n | (1 << k), note: 'forces the bit to 1, leaves the rest alone' },
  clear: { expr: k => `n & ~(1 << ${k})`, f: (n, k) => n & ~(1 << k) & 0xff, note: 'forces the bit to 0, leaves the rest alone' },
};
export default function BitCheckSetClearVisualization() {
  const [k, setK] = useState(1);
  const [op, setOp] = useState('set');
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setK(v => (v + 1) % 8), 1.4, auto);
  const mask = 1 << k;
  const out = OPS[op].f(N0, k);
  const CW = 50, gap = 7, startX = (640 - (8 * (CW + gap) - gap)) / 2;
  const row = (n, y, label, hiIdx) => (
    <g key={label}>
      <text x={startX - 12} y={y + 20} textAnchor="end" style={{ fontSize: 12, fontWeight: 700, fill: '#8b949e', fontFamily: 'Consolas' }}>{label}</text>
      {Array.from({ length: 8 }, (_, i) => (n >> (7 - i)) & 1).map((b, i) => {
        const isK = 7 - i === k;
        return (
          <g key={i}>
            <rect x={startX + i * (CW + gap)} y={y} width={CW} height={28} rx="6" fill={isK ? 'rgba(167,139,250,.28)' : b ? 'rgba(88,166,255,.15)' : '#161b22'} stroke={isK ? '#a78bfa' : b ? '#58a6ff' : '#30363d'} strokeWidth={isK ? 2.5 : 1.5} style={{ transition: 'fill .25s' }} />
            <text x={startX + i * (CW + gap) + CW / 2} y={y + 20} fill={b ? '#e6edf3' : '#484f58'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{b}</text>
          </g>
        );
      })}
    </g>
  );
  return (
    <Stage2D title="Check · Set · Clear a Bit" subtitle="Build a mask with 1 << k, then choose the operator: & tests, | sets, & ~ clears. Bit k is highlighted purple in every row — watch only that column change."
      accent="#a78bfa" viewBox="0 0 640 230"
      controls={<>{Object.keys(OPS).map(o => <button key={o} className={`dsa2d-btn ${o === op ? 'dsa2d-btn--on' : ''}`} onClick={() => setOp(o)}>{o}</button>)}<div className="dsa2d-group"><span className="dsa2d-label">k = {k}</span><input className="dsa2d-slider" type="range" min="0" max="7" value={k} onChange={e => setK(+e.target.value)} /></div><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<><code>{OPS[op].expr(k)}</code> → {OPS[op].note}. These three one-liners are the alphabet of bit manipulation — flags, permissions, visited-sets in bitmask DP all reduce to them. (Toggle is the fourth: <code>n ^ (1 &lt;&lt; k)</code>.)</>}>
      {row(N0, 46, 'n', k)}
      {row(mask & 0xff, 96, '1<<' + k, k)}
      <line x1={startX} y1="140" x2={startX + 8 * 57 - 7} y2="140" stroke="#30363d" strokeWidth="2" />
      {row(out & 0xff, 150, 'result', k)}
      <text x="320" y="216" fill="#c9bdf5" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{OPS[op].expr(k)} = {out & 0xff}{op === 'check' ? (out ? '  → bit is ON' : '  → bit is OFF') : ''}</text>
    </Stage2D>
  );
}

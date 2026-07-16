/* Lesson: AND, OR, XOR, and NOT — The Bitwise Operators Explained
 * 2D animated: two 8-bit numbers combined bit-by-bit under each operator. Toggle the operator
 * and watch every column recompute. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const A = 0b11001010, B = 0b10011100;
const OPS = {
  'AND &': { f: (a, b) => a & b, note: '1 only where BOTH are 1 — masking / testing bits' },
  'OR |': { f: (a, b) => a | b, note: '1 where EITHER is 1 — setting bits' },
  'XOR ^': { f: (a, b) => a ^ b, note: '1 where they DIFFER — toggling, parity, dedup tricks' },
  'NOT ~a': { f: (a) => (~a) & 0xff, note: 'flip every bit of a (shown truncated to 8 bits)' },
};
export default function BitOperatorsVisualization() {
  const [op, setOp] = useState('AND &');
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setOp(o => { const ks = Object.keys(OPS); return ks[(ks.indexOf(o) + 1) % ks.length]; }), 2.2, auto);
  const res = OPS[op].f(A, B);
  const row = (n, y, label, hi) => {
    const CW = 44, gap = 6, startX = 170;
    return (
      <g key={label}>
        <text x={150} y={y + 22} textAnchor="end" style={{ fontSize: 13, fontWeight: 700, fill: hi ? '#79c0ff' : '#8b949e', fontFamily: 'Consolas' }}>{label}</text>
        {Array.from({ length: 8 }, (_, i) => (n >> (7 - i)) & 1).map((b, i) => (
          <g key={i}>
            <rect x={startX + i * (CW + gap)} y={y} width={CW} height={30} rx="6" fill={b ? (hi ? 'rgba(86,211,100,.28)' : 'rgba(88,166,255,.18)') : '#161b22'} stroke={b ? (hi ? '#56d364' : '#58a6ff') : '#30363d'} strokeWidth={b ? 2.5 : 1.5} style={{ transition: 'fill .25s' }} />
            <text x={startX + i * (CW + gap) + CW / 2} y={y + 21} fill={b ? '#e6edf3' : '#484f58'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{b}</text>
          </g>
        ))}
        <text x={startX + 8 * (CW + gap) + 8} y={y + 21} style={{ fontSize: 13, fontWeight: 700, fill: hi ? '#7ee787' : '#8b949e', fontFamily: 'Consolas' }}>= {n}</text>
      </g>
    );
  };
  return (
    <Stage2D title="Bitwise Operators" subtitle="These operate on each bit position independently — column by column, no carrying. They're the tools every bit trick is built from."
      accent="#56d364" viewBox="0 0 640 230"
      controls={<>{Object.keys(OPS).map(k => <button key={k} className={`dsa2d-btn ${k === op ? 'dsa2d-btn--on' : ''}`} onClick={() => setOp(k)}>{k}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<><strong>{op}</strong>: {OPS[op].note}. Memorise the roles: <code>&amp;</code> tests/clears, <code>|</code> sets, <code>^</code> toggles, <code>~</code> inverts. Combined with shifts they give you surgical control over any single bit.</>}>
      {row(A, 40, 'a', false)}
      {op !== 'NOT ~a' && row(B, 90, 'b', false)}
      <line x1="170" y1={op !== 'NOT ~a' ? 132 : 82} x2="590" y2={op !== 'NOT ~a' ? 132 : 82} stroke="#30363d" strokeWidth="2" />
      <text x="150" y={op !== 'NOT ~a' ? 128 : 78} textAnchor="end" style={{ fontSize: 14, fontWeight: 700, fill: '#56d364', fontFamily: 'Consolas' }}>{op.split(' ')[1] || op}</text>
      {row(res, op !== 'NOT ~a' ? 142 : 92, 'result', true)}
    </Stage2D>
  );
}

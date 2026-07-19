/* Problem: Single Number II (every element appears three times)
 * 2D animated: XOR can't cancel triples — so count each BIT position across all numbers and
 * take the count mod 3. What remains is exactly the unique number's bits. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const NUMS = [5, 5, 5, 3];   // unique = 3
const BITS = 3;
const colSum = b => NUMS.reduce((s, n) => s + ((n >> b) & 1), 0);
export default function BitSingleNumberIiVisualization() {
  const [col, setCol] = useState(0);   // which bit column is highlighted (0..2, then 3 = done)
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setCol(v => (v + 1) % (BITS + 1)), 1.6, auto);
  const done = col === BITS;
  return (
    <Stage2D title="Single Number II — Count Bits Mod 3" subtitle="[5, 5, 5, 3]: XOR fails here (5^5^5 = 5, not 0). Instead sum each bit column: triples contribute multiples of 3, so column-sum mod 3 reveals the unique number bit by bit."
      accent="#a78bfa" viewBox="0 0 640 260"
      controls={<>{Array.from({ length: BITS }).map((_, k) => <button key={k} className={`dsa2d-btn ${k === col ? 'dsa2d-btn--on' : ''}`} onClick={() => setCol(k)}>bit {BITS - 1 - k}</button>)}<button className={`dsa2d-btn ${done ? 'dsa2d-btn--on' : ''}`} onClick={() => setCol(BITS)}>result</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>Column sums: bit2 → 3 (mod 3 = <strong>0</strong>), bit1 → 1 (mod 3 = <strong>1</strong>), bit0 → 4 (mod 3 = <strong>1</strong>) → 011₂ = <strong>3</strong> ✓. O(32·n) time, O(1) space. The famous two-variable (ones/twos) trick computes the same thing with pure bit ops.</>}>
      {/* numbers as bit rows */}
      {NUMS.map((n, r) => (
        <g key={r}>
          <text x="180" y={58 + r * 34} textAnchor="end" fill={n === 3 ? '#c9bdf5' : '#8b949e'} fontSize="13" fontWeight="700" fontFamily="Consolas">{n} =</text>
          {Array.from({ length: BITS }).map((_, c) => {
            const bit = (n >> (BITS - 1 - c)) & 1;
            const hot = c === col && !done;
            return (
              <g key={c}>
                <rect x={200 + c * 70} y={40 + r * 34} width="58" height="28" rx="6" fill={hot ? 'rgba(167,139,250,.22)' : bit ? 'rgba(88,166,255,.14)' : '#161b22'} stroke={hot ? '#a78bfa' : bit ? '#58a6ff' : '#30363d'} strokeWidth={hot ? 2.5 : 1.5} style={{ transition: 'fill .25s' }} />
                <text x={229 + c * 70} y={60 + r * 34} fill={bit ? '#e6edf3' : '#6e7681'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{bit}</text>
              </g>
            );
          })}
        </g>
      ))}
      <line x1="200" y1="178" x2="460" y2="178" stroke="#30363d" strokeWidth="2" />
      {Array.from({ length: BITS }).map((_, c) => {
        const sum = colSum(BITS - 1 - c);
        const hot = c === col && !done;
        return (
          <g key={'s' + c}>
            <text x={229 + c * 70} y="200" fill={hot || done ? '#c9bdf5' : '#8b949e'} fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">Σ={sum}</text>
            <text x={229 + c * 70} y="222" fill={done ? '#7ee787' : hot ? '#a78bfa' : '#6e7681'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">%3={sum % 3}</text>
          </g>
        );
      })}
      <text x="320" y="250" fill={done ? '#56d364' : '#8b949e'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{done ? '✓ leftover bits 011₂ = 3 — the single number' : 'triples always contribute 0 or 3 to a column — mod 3 erases them'}</text>
    </Stage2D>
  );
}

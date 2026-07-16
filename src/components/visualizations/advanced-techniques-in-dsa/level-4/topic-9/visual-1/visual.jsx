/* Lesson: Swapping Two Numbers Without a Temporary Variable
 * 2D animated: the three-step XOR swap. Step through a^=b, b^=a, a^=b and watch the values
 * trade places with no third variable. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const A0 = 12, B0 = 10;
const STEPS = [
  { a: A0, b: B0, log: `start: a = ${A0}, b = ${B0}` },
  { a: A0 ^ B0, b: B0, hl: 'a', log: `a ^= b   → a = ${A0}^${B0} = ${A0 ^ B0}  (holds both, mixed)` },
  { a: A0 ^ B0, b: A0, hl: 'b', log: `b ^= a   → b = ${B0}^${A0 ^ B0} = ${A0}  (b is now the old a!)` },
  { a: B0, b: A0, hl: 'a', log: `a ^= b   → a = ${A0 ^ B0}^${A0} = ${B0}  — swapped, no temp` },
];
export default function BitSwapXorVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.8, auto);
  const s = STEPS[i];
  const box = (label, v, x, hot) => (
    <g key={label}>
      <rect x={x} y="60" width="150" height="84" rx="12" fill={hot ? 'rgba(240,163,94,.22)' : '#161b22'} stroke={hot ? '#f0a35e' : '#30363d'} strokeWidth={hot ? 3 : 2} className={hot ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
      <text x={x + 75} y="88" fill="#8b949e" fontSize="13" textAnchor="middle" fontFamily="Consolas">{label}</text>
      <text x={x + 75} y="120" fill="#e6edf3" fontSize="26" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
      <text x={x + 75} y="138" fill="#6b7785" fontSize="10" textAnchor="middle" fontFamily="Consolas">{v.toString(2).padStart(4, '0')}</text>
    </g>
  );
  return (
    <Stage2D title="XOR Swap (No Temp Variable)" subtitle="Because x ^ y ^ y = x, the mixed value a^b acts as a reversible container: XOR it with either original to recover the other. Three XORs, zero extra storage."
      accent="#f0a35e" viewBox="0 0 640 220"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>A classic interview curiosity more than daily practice — in Python you'd just write <code>a, b = b, a</code>. Two cautions: it breaks if <code>a</code> and <code>b</code> are the <em>same memory location</em> (everything cancels to 0), and modern compilers make the temp-variable swap just as fast.</>}>
      {box('a', s.a, 140, s.hl === 'a')}
      {box('b', s.b, 350, s.hl === 'b')}
      <text x="320" y="188" fill="#f8c088" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{i === 0 ? 'a, b = 12, 10' : i === 1 ? 'a ^= b' : i === 2 ? 'b ^= a' : 'a ^= b   ✓ swapped'}</text>
    </Stage2D>
  );
}

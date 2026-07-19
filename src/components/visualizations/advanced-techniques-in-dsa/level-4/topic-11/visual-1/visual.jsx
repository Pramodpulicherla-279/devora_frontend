/* Lesson: When Bit Tricks Help, and When They Just Make Code Harder to Read
 * 2D animated: cycle through judgement calls — where bit tricks genuinely win vs where a
 * clear expression is the better engineering choice. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const CASES = [
  { t: 'Bitmask DP / subset state', ok: true, why: 'A set as an int is the only practical key for 2ⁿ DP states — no readable alternative exists.' },
  { t: 'Flags, permissions, protocol headers', ok: true, why: 'The domain itself is bits; masks ARE the clear expression here.' },
  { t: 'Hot inner loops (popcount, parity)', ok: true, why: 'Measured hotspots justify tricks — with a comment and a test.' },
  { t: 'x * 2 written as x << 1', ok: false, why: 'The compiler already does this. You saved nothing and obscured intent.' },
  { t: 'XOR swap in application code', ok: false, why: 'a, b = b, a is instant to read and just as fast. Cleverness ≠ quality.' },
];
export default function BitWhenVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % CASES.length), 2.3, auto);
  const c = CASES[i];
  return (
    <Stage2D title="Bit Tricks: Power vs Readability" subtitle="Bit manipulation is a sharp tool. Sometimes it's the only tool; often it's showing off. The dividing line is whether the bits are essential to the problem or just an obfuscated integer."
      accent={c.ok ? '#56d364' : '#f0883e'} viewBox="0 0 640 250"
      controls={<>{CASES.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>Rules of thumb: reach for bits when the <strong>domain is bits</strong> (flags, masks, hardware), when a <strong>set must be an index</strong> (bitmask DP), or when a <strong>profiler</strong> says so. Otherwise write the obvious code — and when you do use a trick, leave a comment explaining the identity it relies on.</>}>
      <rect x="70" y="50" width="500" height="142" rx="14" fill="#0b0f15" stroke={c.ok ? '#56d364' : '#f0883e'} strokeWidth="1.5" />
      <text x="320" y="94" fill="#e6edf3" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{c.t}</text>
      <rect x={c.ok ? 225 : 205} y="108" width={c.ok ? 190 : 230} height="30" rx="15" fill={c.ok ? 'rgba(86,211,100,.15)' : 'rgba(240,136,62,.15)'} stroke={c.ok ? '#56d364' : '#f0883e'} />
      <text x="320" y="128" fill={c.ok ? '#7ee787' : '#f8c088'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{c.ok ? '✓ use the bit trick' : '✗ write it plainly'}</text>
      <foreignObject x="96" y="146" width="448" height="40"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '13.5px system-ui', lineHeight: 1.35, textAlign: 'center' }}>{c.why}</div></foreignObject>
      <text x="320" y="230" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">scenario {i + 1} of {CASES.length}</text>
    </Stage2D>
  );
}

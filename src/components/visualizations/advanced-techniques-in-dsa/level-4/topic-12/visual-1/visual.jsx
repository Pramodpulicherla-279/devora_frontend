/* Lesson: Common Bit Manipulation Interview Problems, Solved Step by Step (overview)
 * 2D animated: flip through the classic bit problems and the identity each one leans on. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PROBS = [
  { t: 'Single Number', pat: 'XOR everything', c: '#a78bfa', why: 'Pairs cancel (x^x=0); the loner survives. O(n) time, O(1) space.' },
  { t: 'Number of 1 Bits', pat: 'n & (n-1) loop', c: '#4fce78', why: "Kernighan's erase-the-lowest-bit — one iteration per set bit." },
  { t: 'Counting Bits (0..n)', pat: 'dp[i] = dp[i>>1] + (i & 1)', c: '#58a6ff', why: 'Each count builds on the half-value already computed — bits meet DP.' },
  { t: 'Missing Number', pat: 'XOR indices with values', c: '#f0a35e', why: 'XOR 0..n and all elements; everything pairs off except the missing one.' },
  { t: 'Subsets (iterative)', pat: 'masks 0 … 2ⁿ−1', c: '#e46e9b', why: 'Every integer is a subset; bit i decides whether element i joins.' },
];
export default function BitInterviewVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PROBS.length), 2.3, auto);
  const p = PROBS[i];
  return (
    <Stage2D title="Common Bit Manipulation Problems" subtitle="Almost every bit interview question reduces to four identities: x^x=0, x^0=x, n&(n-1) clears the lowest bit, 1<<k builds a mask. Spot which one applies and you're done."
      accent={p.c} viewBox="0 0 640 300"
      controls={<>{PROBS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>The bit toolkit: <strong>XOR cancellation</strong> for find-the-odd-one-out, <strong>n&amp;(n-1)</strong> for counting/power-of-two, <strong>masks + shifts</strong> for per-bit surgery, and <strong>bitmask enumeration</strong> for subsets. Bonus points in interviews for naming the identity before writing code.</>}>
      <rect x="60" y="46" width="520" height="150" rx="14" fill="#0b0f15" stroke={p.c} strokeWidth="1.5" />
      <text x="320" y="88" fill="#e6edf3" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{p.t}</text>
      <rect x="160" y="104" width="320" height="32" rx="16" fill={p.c + '22'} stroke={p.c} />
      <text x="320" y="125" fill={p.c} fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{p.pat}</text>
      <foreignObject x="86" y="146" width="468" height="46"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '14px system-ui', lineHeight: 1.4, textAlign: 'center' }}>{p.why}</div></foreignObject>
      {PROBS.map((_, k) => <circle key={k} cx={320 - (PROBS.length - 1) * 12 + k * 24} cy="228" r="5" fill={k === i ? p.c : '#30363d'} />)}
      <text x="320" y="266" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">problem {i + 1} of {PROBS.length} — each detailed step-by-step in the lesson below</text>
    </Stage2D>
  );
}

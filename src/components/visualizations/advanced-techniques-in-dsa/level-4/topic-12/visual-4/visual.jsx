/* Problem: Reverse Bits
 * 2D animated: mirror an 8-bit number — symmetric positions swap pairwise from the outside in.
 * 11010010 becomes 01001011. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const IN = [1, 1, 0, 1, 0, 0, 1, 0];
export default function BitReverseBitsVisualization() {
  const [step, setStep] = useState(0);   // 0..4 pairs swapped
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(v => (v + 1) % 5), 1.3, auto);
  const bits = IN.map((b, i) => {
    const pair = Math.min(i, 7 - i);
    return pair < step ? IN[7 - i] : b;
  });
  const CW = 62, gap = 8, startX = (640 - (8 * (CW + gap) - gap)) / 2;
  return (
    <Stage2D title="Reverse Bits" subtitle="Reversing a bit string mirrors it: bit 0 trades places with bit 7, bit 1 with bit 6, and so on inward. Four swaps finish an 8-bit value."
      accent="#f0a35e" viewBox="0 0 640 220"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setStep(v => (v + 1) % 5)}>swap pair</button><button className="dsa2d-btn" onClick={() => setStep(0)}>↺</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{step === 0 ? 'original: 11010010 (210)' : step < 4 ? `pair ${step} swapped` : 'reversed: 01001011 (75)'}</span></>}
      legend={<>Loop version: peel the input's low bit and push it onto the result (<code>res = (res &lt;&lt; 1) | (n &amp; 1); n &gt;&gt;= 1</code>) 32 times. The slick O(1) version swaps halves, then quarters, then pairs with masks — divide-and-conquer on bits. Used in FFTs and endian conversion.</>}>
      {bits.map((b, i) => {
        const pair = Math.min(i, 7 - i);
        const swapped = pair < step, isNext = pair === step && step < 4;
        return (
          <g key={i}>
            <rect x={startX + i * (CW + gap)} y="66" width={CW} height="56" rx="9" fill={isNext ? 'rgba(255,212,59,.14)' : swapped ? 'rgba(240,163,94,.18)' : '#161b22'} stroke={isNext ? '#ffd43b' : swapped ? '#f0a35e' : '#30363d'} strokeWidth={isNext ? 3 : 2} className={isNext ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={startX + i * (CW + gap) + CW / 2} y="102" fill={b ? '#f8c088' : '#6e7681'} fontSize="24" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{b}</text>
            <text x={startX + i * (CW + gap) + CW / 2} y="140" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">bit {7 - i}</text>
          </g>
        );
      })}
      {/* mirror arcs for next pair */}
      {step < 4 && <path d={`M ${startX + step * (CW + gap) + CW / 2} 58 Q 320 ${16 + step * 12} ${startX + (7 - step) * (CW + gap) + CW / 2} 58`} fill="none" stroke="#ffd43b" strokeWidth="2.5" strokeDasharray="5 4" className="dsa2d-pulse" />}
      <text x="320" y="188" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">outermost pairs swap first, working inward — a mirror image in 4 moves</text>
    </Stage2D>
  );
}

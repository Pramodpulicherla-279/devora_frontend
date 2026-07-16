/* Lesson: Left Shift and Right Shift — Multiplying and Dividing With Bits
 * 2D animated: shift a number's bits left or right and watch the value double or halve.
 * The bits physically slide; zeros fill the gap. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const BASE = 0b00010110; // 22
export default function BitShiftsVisualization() {
  const [sh, setSh] = useState(0);   // -2..+2 (left positive)
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setSh(v => (v >= 2 ? -2 : v + 1)), 1.3, auto);
  const val = sh >= 0 ? (BASE << sh) & 0xff : BASE >> -sh;
  const bits = Array.from({ length: 8 }, (_, i) => (val >> (7 - i)) & 1);
  const CW = 56, gap = 8, startX = (640 - (8 * (CW + gap) - gap)) / 2;
  const expr = sh === 0 ? '22' : sh > 0 ? `22 << ${sh}` : `22 >> ${-sh}`;
  const meaning = sh === 0 ? 'no shift' : sh > 0 ? `× ${2 ** sh}` : `÷ ${2 ** -sh} (floor)`;
  return (
    <Stage2D title="Bit Shifts: << and >>" subtitle="Shifting left slides every bit one place up — doubling the value; shifting right slides down — halving it (dropping the remainder). Multiplication and division for the price of a slide."
      accent="#f0a35e" viewBox="0 0 640 220"
      controls={<><div className="dsa2d-group"><span className="dsa2d-label">shift = {sh >= 0 ? '<< ' + sh : '>> ' + -sh}</span><input className="dsa2d-slider" type="range" min="-2" max="2" value={sh} onChange={e => setSh(+e.target.value)} /></div><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{expr} = {val}  ({meaning})</span></>}
      legend={<><code>n &lt;&lt; k</code> multiplies by <code>2ᵏ</code>; <code>n &gt;&gt; k</code> floor-divides by <code>2ᵏ</code>. Bits shifted off the end are <strong>lost</strong> (watch the left edge on <code>&lt;&lt; 2</code>) and zeros fill in behind. Shifts pair with masks: <code>1 &lt;&lt; k</code> builds the mask that isolates bit k.</>}>
      {bits.map((b, i) => (
        <g key={i}>
          <rect x={startX + i * (CW + gap)} y="66" width={CW} height="56" rx="8" fill={b ? 'rgba(240,163,94,.3)' : '#161b22'} stroke={b ? '#f0a35e' : '#30363d'} strokeWidth={b ? 3 : 2} style={{ transition: 'fill .3s, stroke .3s' }} />
          <text x={startX + i * (CW + gap) + CW / 2} y="102" fill={b ? '#f8c088' : '#484f58'} fontSize="24" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{b}</text>
          <text x={startX + i * (CW + gap) + CW / 2} y="140" fill="#6b7785" fontSize="10" textAnchor="middle" fontFamily="Consolas">{128 >> i}</text>
        </g>
      ))}
      <text x="320" y="176" fill="#8b949e" fontSize="13" textAnchor="middle" fontFamily="Consolas">{sh > 0 ? '← bits slide left, zeros enter from the right' : sh < 0 ? 'bits slide right →, low bits fall off' : 'original: 22 = 00010110'}</text>
      <text x="320" y="204" fill="#f8c088" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{expr} = {val}</text>
    </Stage2D>
  );
}

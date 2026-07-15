/* Lesson: Reversing a String — Multiple Approaches and Their Trade-Offs
 * 2D animated: two-pointer swap on a character array building the reversal, alongside the
 * Pythonic one-liner s[::-1]. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STR = 'PYTHON';
export default function StrReverseVisualization() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const maxStep = Math.floor(STR.length / 2);
  useAutoPlay(() => setStep(v => (v > maxStep ? 0 : v + 1)), 0.9, auto);
  const arr = STR.split('');
  for (let s = 0; s < Math.min(step, maxStep); s++) { const j = STR.length - 1 - s; [arr[s], arr[j]] = [arr[j], arr[s]]; }
  const lo = Math.min(step, maxStep), hi = STR.length - 1 - lo;
  const done = step >= maxStep;
  const CW = 62, gap = 8;
  const startX = 320 - (STR.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Reversing a String"
      subtitle="Strings are immutable, so we reverse a list of characters (two pointers), then join. Python also offers the elegant slice s[::-1]."
      accent="#56d364"
      viewBox="0 0 640 230"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setStep(v => (v > maxStep ? 0 : v + 1))}>swap</button>
          <button className="dsa2d-btn" onClick={() => setStep(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{done ? `'${arr.join('')}' ✓` : `swap [${lo}] ↔ [${hi}]`}</span>
        </>
      }
      legend={<>Three options: <code>s[::-1]</code> (concise, O(n) time & space), <code>''.join(reversed(s))</code>, or the manual two-pointer swap shown here (O(n) time, O(n) space since strings can't be mutated in place). All are O(n) — pick the clearest.</>}
    >
      {arr.map((ch, k) => {
        const isLo = k === lo && !done, isHi = k === hi && !done;
        const swapped = k < lo || k > hi;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="74" width={CW} height="54" rx="8"
              fill={isLo || isHi ? 'rgba(86,211,100,.25)' : swapped ? 'rgba(86,211,100,.1)' : '#161b22'}
              stroke={isLo || isHi ? '#56d364' : swapped ? '#3fb950' : '#30363d'} strokeWidth="2"
              className={isLo || isHi ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="110" fill="#e6edf3" fontSize="22" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text>
          </g>
        );
      })}
      {!done && <>
        <text x={startX + lo * (CW + gap) + CW / 2} y="64" fill="#56d364" fontSize="12" textAnchor="middle" fontFamily="Consolas">lo</text>
        <text x={startX + hi * (CW + gap) + CW / 2} y="64" fill="#56d364" fontSize="12" textAnchor="middle" fontFamily="Consolas">hi</text>
      </>}
      <text x="320" y="168" fill="#8b949e" fontSize="13" textAnchor="middle" fontFamily="Consolas">{done ? "reversed → 'NOHTYP'  (same as PYTHON[::-1])" : 'swap ends, step inward'}</text>
    </Stage2D>
  );
}

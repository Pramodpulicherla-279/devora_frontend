/* Problem: Find All Numbers Missing From [1, n]
 * 2D animated: use the array itself as a hash set — mark index |v|-1 negative for each value
 * seen. Positions still positive at the end are the missing numbers. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const NUMS = [4, 3, 2, 7, 8, 2, 3, 1];   // n=8, missing 5 and 6
function stateAt(step) {
  const a = NUMS.map(Math.abs);
  const seen = new Set();
  for (let i = 0; i < step && i < NUMS.length; i++) seen.add(Math.abs(NUMS[i]));
  return seen;
}
export default function ArrMissingNumbersVisualization() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(v => (v > NUMS.length ? 0 : v + 1)), 0.7, auto);
  const seen = stateAt(Math.min(step, NUMS.length));
  const done = step > NUMS.length;
  const missing = [];
  for (let x = 1; x <= NUMS.length; x++) if (!seen.has(x)) missing.push(x);
  const CW = 58, gap = 6;
  const startX = 320 - (NUMS.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Find All Missing Numbers [1..n]"
      subtitle="With values in the range 1..n, you can mark presence inside the array itself (flip the sign at index v−1). Indices left positive point to missing numbers."
      accent="#f0883e"
      viewBox="0 0 640 240"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setStep(v => (v > NUMS.length ? 0 : v + 1))}>mark next</button>
          <button className="dsa2d-btn" onClick={() => setStep(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{done ? `missing: ${missing.join(', ')}` : `seen: {${[...seen].sort((a, b) => a - b).join(',')}}`}</span>
        </>
      }
      legend={<>Trick: for each value <code>v</code>, mark slot <code>|v|−1</code> as "present" (negate it). Because values are bounded by n, the array doubles as a hash set → <strong>O(n)</strong> time and <strong>O(1)</strong> extra space. Slots never marked = the missing numbers.</>}
    >
      {/* presence slots 1..n */}
      {Array.from({ length: NUMS.length }).map((_, idx) => {
        const num = idx + 1;
        const present = seen.has(num);
        const isMissing = done && !present;
        return (
          <g key={idx}>
            <rect x={startX + idx * (CW + gap)} y="70" width={CW} height="54" rx="8"
              fill={isMissing ? 'rgba(240,136,62,.3)' : present ? 'rgba(86,211,100,.18)' : '#161b22'}
              stroke={isMissing ? '#f0883e' : present ? '#3fb950' : '#30363d'} strokeWidth="2" className={isMissing ? 'dsa2d-pulse' : ''} />
            <text x={startX + idx * (CW + gap) + CW / 2} y="102" fill="#e6edf3" fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{num}</text>
            <text x={startX + idx * (CW + gap) + CW / 2} y="140" fill={present ? '#56d364' : isMissing ? '#f0883e' : '#8b949e'} fontSize="12" textAnchor="middle" fontFamily="Consolas">{present ? '✓' : isMissing ? 'missing' : '·'}</text>
          </g>
        );
      })}
      <text x="320" y="176" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">each number 1..n marked when it appears in the input</text>
      {done && <text x="320" y="206" fill="#f0883e" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">missing = [{missing.join(', ')}]</text>}
    </Stage2D>
  );
}

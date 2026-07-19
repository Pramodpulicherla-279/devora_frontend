/* Problem: Missing Number
 * 2D animated: XOR all indices 0..n together with all array values — every present number
 * pairs with its index and cancels; only the missing one survives. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const A = [3, 0, 1];   // n = 3, missing 2
const SEQ = [
  { acc: 0, take: null, log: 'acc = 0 · plan: XOR in 0,1,2,3 (indices+n) and 3,0,1 (values)' },
  { acc: 0 ^ 0 ^ 3, take: 'idx 0 ^ val 3', log: 'acc ^= 0 ^ 3 → 3' },
  { acc: 0 ^ 0 ^ 3 ^ 1 ^ 0, take: 'idx 1 ^ val 0', log: 'acc ^= 1 ^ 0 → 2' },
  { acc: 0 ^ 0 ^ 3 ^ 1 ^ 0 ^ 2 ^ 1, take: 'idx 2 ^ val 1', log: 'acc ^= 2 ^ 1 → 1' },
  { acc: 0 ^ 0 ^ 3 ^ 1 ^ 0 ^ 2 ^ 1 ^ 3, take: 'n = 3', done: true, log: 'acc ^= 3 → 2 — the missing number (2 never had a partner)' },
];
export default function BitMissingNumberVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % SEQ.length), 1.7, auto);
  const s = SEQ[i];
  return (
    <Stage2D title="Missing Number via XOR" subtitle="[3, 0, 1] should contain 0..3 — which is absent? XOR the full expected set with the actual values: everything present cancels against itself, the absentee remains."
      accent="#a78bfa" viewBox="0 0 640 230"
      controls={<>{SEQ.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>O(n) time, O(1) space, no overflow worries (the Gauss-sum alternative <code>n(n+1)/2 − sum</code> can overflow in fixed-width languages). Every value 0..3 appears twice across the two rows below — except <strong>2</strong>, which appears once and survives all the cancelling.</>}>
      <text x="130" y="62" textAnchor="end" fill="#8b949e" fontSize="12" fontFamily="Consolas">expected 0..n:</text>
      {[0, 1, 2, 3].map((v, k) => {
        const isMissing = v === 2;
        return <g key={k}><rect x={150 + k * 76} y="42" width="62" height="34" rx="8" fill={isMissing && s.done ? 'rgba(167,139,250,.3)' : '#161b22'} stroke={isMissing && s.done ? '#a78bfa' : '#6e7681'} strokeWidth={isMissing && s.done ? 3 : 2} className={isMissing && s.done ? 'dsa2d-pulse' : ''} /><text x={181 + k * 76} y="65" fill="#e6edf3" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text></g>;
      })}
      <text x="130" y="128" textAnchor="end" fill="#8b949e" fontSize="12" fontFamily="Consolas">actual values:</text>
      {A.map((v, k) => <g key={k}><rect x={150 + k * 76} y="108" width="62" height="34" rx="8" fill="#161b22" stroke="#6e7681" strokeWidth="2" /><text x={181 + k * 76} y="131" fill="#e6edf3" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text></g>)}
      <rect x="230" y="168" width="180" height="42" rx="10" fill={s.done ? 'rgba(167,139,250,.16)' : '#0b0f15'} stroke="#a78bfa" strokeWidth="2" />
      <text x="320" y="195" fill={s.done ? '#c9bdf5' : '#e6edf3'} fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="Consolas">acc = {s.acc}{s.done ? ' ✓ missing!' : ''}</text>
    </Stage2D>
  );
}

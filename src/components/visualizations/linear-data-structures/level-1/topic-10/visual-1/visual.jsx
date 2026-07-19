/* Lesson: Prefix Sums — Precomputing Your Way to Faster Queries
 * 2D animated: build a running-total array once, then answer any range-sum query in O(1) with
 * a single subtraction prefix[j+1] - prefix[i]. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ARR = [3, 1, 4, 1, 5, 9];
const PREFIX = ARR.reduce((acc, v) => [...acc, acc[acc.length - 1] + v], [0]); // len 7
const QI = 1, QJ = 4;   // query sum of indices 1..4 = 1+4+1+5 = 11
export default function ArrPrefixSumVisualization() {
  const [k, setK] = useState(0);                 // how many prefix cells built (0..7); >7 = query
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setK(v => (v >= PREFIX.length + 2 ? 0 : v + 1)), 0.7, auto);
  const querying = k > PREFIX.length;
  const CW = 62, gap = 8;
  const ax = 320 - (ARR.length * (CW + gap) - gap) / 2;
  const px = 320 - (PREFIX.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Prefix Sums"
      subtitle="Precompute a running total so any range's sum is a single subtraction — turning repeated O(n) scans into O(1) lookups."
      accent="#56d364"
      viewBox="0 0 640 270"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setK(v => (v >= PREFIX.length + 2 ? 0 : v + 1))}>step</button>
          <button className="dsa2d-btn" onClick={() => setK(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{querying ? `sum(${QI}..${QJ}) = P[${QJ + 1}]-P[${QI}] = ${PREFIX[QJ + 1]}-${PREFIX[QI]} = ${PREFIX[QJ + 1] - PREFIX[QI]}` : 'building prefix…'}</span>
        </>
      }
      legend={<><code>prefix[i]</code> holds the sum of everything before index <code>i</code>. Then <code>sum(i..j) = prefix[j+1] − prefix[i]</code> — no matter how wide the range, it's <strong>O(1)</strong>. Building the prefix array is a one-time <strong>O(n)</strong> cost that pays off across many queries.</>}
    >
      {/* original array */}
      <text x={ax} y="46" fill="#8b949e" fontSize="11" fontFamily="system-ui">array:</text>
      {ARR.map((v, i) => {
        const inRange = querying && i >= QI && i <= QJ;
        return (
          <g key={i}>
            <rect x={ax + i * (CW + gap)} y="54" width={CW} height="46" rx="7" fill={inRange ? 'rgba(86,211,100,.2)' : '#161b22'} stroke={inRange ? '#56d364' : '#30363d'} strokeWidth="2" />
            <text x={ax + i * (CW + gap) + CW / 2} y="83" fill="#e6edf3" fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      {/* prefix array */}
      <text x={px} y="150" fill="#8b949e" fontSize="11" fontFamily="system-ui">prefix (running total):</text>
      {PREFIX.map((v, i) => {
        const built = i < k;
        const isEndpoint = querying && (i === QI || i === QJ + 1);
        return (
          <g key={i} style={{ opacity: built ? 1 : 0.15, transition: 'opacity .3s' }}>
            <rect x={px + i * (CW + gap)} y="158" width={CW} height="46" rx="7"
              fill={isEndpoint ? 'rgba(86,211,100,.25)' : '#0b0f15'} stroke={isEndpoint ? '#56d364' : built ? '#3fb950' : '#21262d'} strokeWidth="2"
              className={built && i === k - 1 ? 'dsa2d-pop' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
            <text x={px + i * (CW + gap) + CW / 2} y="187" fill={isEndpoint ? '#7ee787' : '#c9d1d9'} fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            <text x={px + i * (CW + gap) + CW / 2} y="150" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">P{i}</text>
          </g>
        );
      })}
      <text x="320" y="238" fill={querying ? '#56d364' : '#8b949e'} fontSize="14" textAnchor="middle" fontFamily="Consolas">
        {querying ? `range sum [${QI}..${QJ}] = ${PREFIX[QJ + 1] - PREFIX[QI]} in O(1)` : 'each cell = previous prefix + current value'}
      </text>
    </Stage2D>
  );
}

/* Problem: Roman to Integer
 * 2D animated: scan left to right. Normally add each symbol's value, but SUBTRACT when a
 * smaller symbol sits before a larger one (IV, IX, XL...). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const S = 'MCMXCIV';   // 1994
const VAL = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
function totalAt(n) {
  let t = 0;
  for (let i = 0; i < n; i++) { const cur = VAL[S[i]], nxt = VAL[S[i + 1]] || 0; t += cur < nxt ? -cur : cur; }
  return t;
}
export default function StrRomanIntegerVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v >= S.length ? 0 : v + 1)), 0.9, auto);
  const total = totalAt(i);
  const done = i >= S.length;
  const CW = 66, gap = 8;
  const startX = 320 - (S.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Roman to Integer"
      subtitle="Roman numerals mostly add up, with one twist: a smaller symbol before a larger one means subtraction (IV = 4, not 6). One left-to-right pass handles both."
      accent="#f0883e"
      viewBox="0 0 640 220"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v >= S.length ? 0 : v + 1))}>next symbol</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">total = {total}</span>
        </>
      }
      legend={<>Rule: <code>if value(s[i]) &lt; value(s[i+1]): subtract else add</code>. That single comparison captures all six subtractive pairs (IV, IX, XL, XC, CD, CM). One pass → <strong>O(n)</strong>. "MCMXCIV" = 1000 + (1000−100) + (100−10) + (5−1) = <strong>1994</strong>.</>}
    >
      {S.split('').map((ch, k) => {
        const cur = VAL[ch], nxt = VAL[S[k + 1]] || 0;
        const subtract = cur < nxt;
        const scanned = k < i;
        const isCur = k === i && !done;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="56" width={CW} height="56" rx="8"
              fill={isCur ? 'rgba(88,166,255,.22)' : scanned ? (subtract ? 'rgba(248,81,73,.14)' : 'rgba(86,211,100,.12)') : '#0d1117'}
              stroke={isCur ? '#58a6ff' : scanned ? (subtract ? '#f85149' : '#3fb950') : '#30363d'} strokeWidth="2" className={isCur ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="82" fill="#e6edf3" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="102" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">{subtract ? '−' : '+'}{cur}</text>
          </g>
        );
      })}
      <text x="320" y="150" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">green = added · red = subtracted (smaller before larger)</text>
      <text x="320" y="182" fill="#f0883e" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">= {total}</text>
    </Stage2D>
  );
}

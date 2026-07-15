/* Lesson: Traversing and Comparing Strings Character by Character
 * 2D animated: two strings compared position by position; the scan stops at the first
 * mismatch (that char decides ordering) or runs to the end if equal. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const A = 'APPLE', B = 'APPLY';
export default function StrCompareVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const mismatch = [...A].findIndex((c, k) => c !== B[k]);
  const stopAt = mismatch === -1 ? A.length - 1 : mismatch;
  useAutoPlay(() => setI(v => (v >= stopAt ? 0 : v + 1)), 0.8, auto);
  const decided = i >= stopAt;
  const CW = 62, gap = 8;
  const startX = 320 - (A.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Comparing Strings, Char by Char"
      subtitle="String comparison walks both strings together. The first position where they differ decides which is 'smaller' — the rest never gets checked."
      accent="#58a6ff"
      viewBox="0 0 640 250"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v >= stopAt ? 0 : v + 1))}>compare next</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{decided ? `'${A[stopAt]}' vs '${B[stopAt]}' → ${A[stopAt] < B[stopAt] ? 'A < B' : 'A > B'}` : `matching at [${i}]`}</span>
        </>
      }
      legend={<>Lexicographic comparison (<code>&lt;</code>, <code>==</code>) is a character-by-character walk: equal chars continue, the first unequal pair decides the result by code point. Best case differs at position 0 (O(1)); worst case identical strings (<strong>O(n)</strong>).</>}
    >
      {[{ s: A, y: 60, label: 'A' }, { s: B, y: 130, label: 'B' }].map(({ s, y, label }) => (
        <g key={label}>
          <text x={startX - 24} y={y + 34} fill="#8b949e" fontSize="14" fontFamily="Consolas">{label}</text>
          {s.split('').map((ch, k) => {
            const scanned = k < i;
            const cur = k === i;
            const isMismatch = decided && k === stopAt;
            const isMatch = scanned || (cur && ch === (label === 'A' ? B[k] : A[k]));
            return (
              <g key={k}>
                <rect x={startX + k * (CW + gap)} y={y} width={CW} height="54" rx="8"
                  fill={isMismatch ? 'rgba(248,81,73,.22)' : cur ? 'rgba(88,166,255,.22)' : scanned ? 'rgba(86,211,100,.12)' : '#161b22'}
                  stroke={isMismatch ? '#f85149' : cur ? '#58a6ff' : scanned ? '#3fb950' : '#30363d'} strokeWidth="2"
                  className={cur ? 'dsa2d-pulse' : ''} />
                <text x={startX + k * (CW + gap) + CW / 2} y={y + 35} fill="#e6edf3" fontSize="22" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text>
              </g>
            );
          })}
        </g>
      ))}
      {decided && <text x="320" y="220" fill="#f85149" fontSize="14" textAnchor="middle" fontFamily="Consolas">first mismatch at [{stopAt}] decides the order — earlier chars were equal</text>}
    </Stage2D>
  );
}

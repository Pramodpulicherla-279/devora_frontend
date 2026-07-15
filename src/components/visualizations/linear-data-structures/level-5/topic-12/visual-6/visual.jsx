/* Problem: First Non-Repeating Character
 * 2D animated: first pass counts every character's frequency; second pass returns the first
 * character whose count is 1. Two linear scans. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const S = 'loveleetcode';
const FREQ = {}; [...S].forEach(c => FREQ[c] = (FREQ[c] || 0) + 1);
const ANS = [...S].findIndex(c => FREQ[c] === 1);   // 'v' at index 2
export default function HtFirstUniqueVisualization() {
  const [phase, setPhase] = useState(0);   // 0 counting, 1 scanning
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => {
    if (phase === 0) { if (i >= S.length - 1) { setPhase(1); setI(0); } else setI(i + 1); }
    else { if (i >= ANS) { setPhase(0); setI(0); } else setI(i + 1); }
  }, 0.5, auto, [phase, i]);
  const CW = 44, gap = 4;
  const startX = 320 - (S.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="First Non-Repeating Character"
      subtitle="Pass 1: tally every character's frequency in a hash map. Pass 2: walk the string again and return the first character whose count is exactly 1."
      accent="#58a6ff"
      viewBox="0 0 640 240"
      controls={
        <>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{phase === 0 ? `counting… ('${S[i]}')` : `scanning for count 1 → '${S[Math.min(i, ANS)]}'`}</span>
        </>
      }
      legend={<>Two O(n) passes with a frequency map: count first, then find. Answer here is <code>'v'</code> at index {ANS} — the earliest character appearing once. Since there are only 26 letters, the space is effectively O(1).</>}
    >
      {S.split('').map((ch, k) => {
        const counted = phase === 0 ? k <= i : true;
        const scanning = phase === 1 && k === i;
        const isAns = phase === 1 && k === ANS && i >= ANS;
        const unique = FREQ[ch] === 1;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="54" width={CW} height="46" rx="6"
              fill={isAns ? 'rgba(86,211,100,.3)' : scanning ? 'rgba(88,166,255,.25)' : '#161b22'}
              stroke={isAns ? '#56d364' : scanning ? '#58a6ff' : '#30363d'} strokeWidth="2" className={scanning || isAns ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="84" fill="#e6edf3" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text>
            {counted && <text x={startX + k * (CW + gap) + CW / 2} y="116" fill={unique ? '#56d364' : '#8b949e'} fontSize="11" textAnchor="middle" fontFamily="Consolas">{FREQ[ch]}</text>}
          </g>
        );
      })}
      <text x="320" y="150" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">numbers = frequency of each character</text>
      {phase === 1 && i >= ANS && <text x="320" y="184" fill="#56d364" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">first unique = '{S[ANS]}' at index {ANS}</text>}
    </Stage2D>
  );
}

/* Problem: House Robber
 * 2D animated: adjacent houses can't both be robbed. dp[i] = max(skip → dp[i-1], rob → dp[i-2]
 * + value). Fill the row and watch the take-or-skip decisions. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const V = [2, 7, 9, 3, 1];
const STEPS = [
  { upto: 0, dp: [2], log: 'dp[0] = 2 (only one house)' },
  { upto: 1, dp: [2, 7], log: 'dp[1] = max(2, 7) = 7 (rob the better of the first two)' },
  { upto: 2, dp: [2, 7, 11], log: 'dp[2] = max(skip 7, rob 2+9=11) = 11' },
  { upto: 3, dp: [2, 7, 11, 11], log: 'dp[3] = max(skip 11, rob 7+3=10) = 11 → skipping wins' },
  { upto: 4, dp: [2, 7, 11, 11, 12], done: true, log: 'dp[4] = max(11, 11+1=12) = 12 → rob houses 0, 2, 4' },
];
const CW = 84, gap = 16, startX = (640 - (V.length * (CW + gap) - gap)) / 2;
export default function DpHouseRobberVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.8, auto);
  const s = STEPS[i];
  return (
    <Stage2D title="House Robber" subtitle="At each house one question: rob it (adding to the best from two houses back) or skip it (keeping the best so far)? dp[i] = max(dp[i-1], dp[i-2] + value[i])."
      accent="#f0a35e" viewBox="0 0 640 220"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>The adjacency constraint is what forces DP: choices interact, so greedy "rob the biggest" fails ([2,7,9]: greedy takes 9+2=11 by luck, but on [5,10,5,10,5] it collapses). O(n) time; the two-cell window makes it O(1) space. Ring variant (House Robber II) runs it twice.</>}>
      {V.map((v, k) => {
        const isCur = k === s.upto, hasDp = k < s.dp.length;
        const robbed = s.done && [0, 2, 4].includes(k);
        return (
          <g key={k}>
            <text x={startX + k * (CW + gap) + CW / 2} y="52" fontSize="22" textAnchor="middle">{robbed ? '💰' : '🏠'}</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="76" fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">${v}</text>
            <rect x={startX + k * (CW + gap)} y="90" width={CW} height="40" rx="9" fill={isCur ? 'rgba(255,212,59,.16)' : hasDp ? 'rgba(240,163,94,.14)' : '#161b22'} stroke={isCur ? '#ffd43b' : hasDp ? '#f0a35e' : '#6e7681'} strokeWidth={isCur ? 3 : 2} className={isCur ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={startX + k * (CW + gap) + CW / 2} y="116" fill={hasDp ? '#f8c088' : '#6e7681'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{hasDp ? 'dp=' + s.dp[k] : '·'}</text>
          </g>
        );
      })}
      <text x="320" y="172" fill={s.done ? '#56d364' : '#8b949e'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{s.done ? '✓ best loot = $12 (💰 marks the robbed houses)' : 'each cell looks back exactly two houses'}</text>
      <text x="320" y="200" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">dp[i] = max(dp[i−1], dp[i−2] + value[i])</text>
    </Stage2D>
  );
}

/* Problem: Word Break (boolean DP)
 * 2D animated: dp[i] = "can the first i chars be segmented?" A position turns true when some
 * earlier true position reaches it via one dictionary word. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const S = 'leetcode';
const STEPS = [
  { dp: [true, false, false, false, false, false, false, false, false], arc: null, log: 'dp[0] = true — the empty prefix is trivially "broken"' },
  { dp: [true, false, false, false, true, false, false, false, false], arc: [0, 4, 'leet'], log: 'from dp[0]: s[0:4] = "leet" ∈ dict → dp[4] = true' },
  { dp: [true, false, false, false, true, false, false, false, true], arc: [4, 8, 'code'], done: true, log: 'from dp[4]: s[4:8] = "code" ∈ dict → dp[8] = true → breakable ✓' },
];
const CW = 58, gap = 6, startX = (640 - (9 * (CW + gap) - gap)) / 2, Y = 110;
export default function DpWordBreakVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 2.0, auto);
  const s = STEPS[i];
  return (
    <Stage2D title='Word Break — "leetcode"' subtitle="dict = {leet, code}. Think of positions 0..n as stepping stones: a stone is reachable if some earlier reachable stone connects to it by one dictionary word. Is stone n reachable?"
      accent="#a78bfa" viewBox="0 0 640 230"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>Boolean reachability DP: <code>dp[i] = any(dp[j] and s[j:i] in dict)</code>. <strong>O(n²)</strong> substring checks (a trie or set of word lengths trims it). Contrast with Word Break II — that one must <em>enumerate</em> sentences (backtracking); this one only asks yes/no, so DP wins.</>}>
      {/* word arc */}
      {s.arc && (
        <g className="dsa2d-fade">
          <path d={`M ${startX + s.arc[0] * (CW + gap) + 8} ${Y - 14} Q ${startX + ((s.arc[0] + s.arc[1]) / 2) * (CW + gap)} ${Y - 74} ${startX + s.arc[1] * (CW + gap) - 12} ${Y - 14}`} fill="none" stroke="#a78bfa" strokeWidth="3" className="dsa2d-pulse" />
          <text x={startX + ((s.arc[0] + s.arc[1]) / 2) * (CW + gap)} y={Y - 66} fill="#c9bdf5" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">"{s.arc[2]}"</text>
        </g>
      )}
      {/* position stones 0..8 */}
      {s.dp.map((ok, k) => (
        <g key={k}>
          <circle cx={startX + k * (CW + gap)} cy={Y} r="17" fill={ok ? 'rgba(86,211,100,.25)' : '#161b22'} stroke={ok ? '#56d364' : '#6e7681'} strokeWidth={ok ? 3 : 2} className={s.arc && k === s.arc[1] ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s, stroke .3s' }} />
          <text x={startX + k * (CW + gap)} y={Y + 5} fill={ok ? '#7ee787' : '#8b949e'} fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{k}</text>
        </g>
      ))}
      {/* the string beneath */}
      {S.split('').map((ch, k) => <text key={k} x={startX + k * (CW + gap) + (CW + gap) / 2} y={Y + 44} fill="#c9d1d9" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text>)}
      <text x="320" y={Y + 84} fill={s.done ? '#56d364' : '#8b949e'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{s.done ? '✓ dp[8] reached → "leet code"' : 'green stones = breakable prefixes'}</text>
    </Stage2D>
  );
}

/* Lesson: The Dynamic Programming Pattern, Revisited
 * 2D animated: the four questions that turn any DP problem into code — state, recurrence,
 * base cases, answer location — mapped onto classic problems. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ROWS = [
  { prob: 'Climbing Stairs', state: 'dp[i] = ways to reach step i', rec: 'dp[i-1] + dp[i-2]', base: 'dp[0]=dp[1]=1', ans: 'dp[n]', c: '#6b8cff' },
  { prob: 'House Robber', state: 'dp[i] = best loot up to house i', rec: 'max(dp[i-1], dp[i-2]+val[i])', base: 'dp[0]=val[0]', ans: 'dp[n-1]', c: '#f0a35e' },
  { prob: 'LCS', state: 'dp[i][j] = LCS of prefixes i, j', rec: 'diag+1 or max(up, left)', base: 'row/col 0 = 0', ans: 'dp[m][n]', c: '#a78bfa' },
  { prob: 'Coin Change', state: 'dp[a] = min coins for amount a', rec: 'min(dp[a-c]+1 for c)', base: 'dp[0]=0', ans: 'dp[amount]', c: '#4fce78' },
];
export default function PatDpVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % ROWS.length), 2.4, auto);
  const r = ROWS[i];
  const field = (label, val, y) => (
    <g key={label}>
      <text x="180" y={y} fill="#8b949e" fontSize="12" textAnchor="end" fontFamily="Consolas">{label}</text>
      <foreignObject x="196" y={y - 15} width="384" height="22"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#e6edf3', font: '700 13px Consolas, monospace', whiteSpace: 'nowrap', overflow: 'hidden' }}>{val}</div></foreignObject>
    </g>
  );
  return (
    <Stage2D title="DP: The Four-Question Interview Script" subtitle="Every DP solution answers the same four questions. Practise filling this form quickly — it's what 'thinking in DP' actually means under time pressure."
      accent={r.c} viewBox="0 0 640 270"
      controls={<>{ROWS.map((rr, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{rr.prob}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>Say the state definition out loud first — "<em>{r.state}</em>" — because a wrong state dooms everything after it. Then recurrence, base cases, answer cell. Memoize or tabulate is a detail you decide last.</>}>
      <rect x="70" y="46" width="500" height="176" rx="14" fill="#0b0f15" stroke={r.c} strokeWidth="1.5" />
      <text x="320" y="76" fill={r.c} fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{r.prob}</text>
      {field('1 · state:', r.state, 110)}
      {field('2 · recurrence:', r.rec, 142)}
      {field('3 · base cases:', r.base, 174)}
      {field('4 · answer at:', r.ans, 206)}
      <text x="320" y="252" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">problem {i + 1} of {ROWS.length} — the form never changes</text>
    </Stage2D>
  );
}

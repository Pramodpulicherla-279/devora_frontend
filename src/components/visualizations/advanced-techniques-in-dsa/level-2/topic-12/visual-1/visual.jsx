/* Lesson: Common Dynamic Programming Interview Problems, Solved Step by Step (overview)
 * 2D animated: flip through the classic DP problems and the state/recurrence each one uses. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PROBS = [
  { t: 'House Robber', pat: 'dp[i] = max(rob i, skip i)', c: '#f0a35e', why: 'Rob house i (plus dp[i-2]) or skip it (dp[i-1]) — adjacent houses conflict.' },
  { t: 'Unique Paths', pat: 'dp[r][c] = dp[r-1][c] + dp[r][c-1]', c: '#58a6ff', why: 'Each grid cell is reached from above or the left; counts add.' },
  { t: 'Word Break', pat: 'dp[i] = any(dp[j] and s[j:i] in dict)', c: '#a78bfa', why: 'A prefix is breakable if some earlier breakable point reaches i via a dictionary word.' },
  { t: 'Maximum Subarray (Kadane)', pat: 'best ending here = max(x, prev + x)', c: '#4fce78', why: 'At each element: extend the running sum or restart — a one-variable DP.' },
  { t: 'Edit Distance', pat: '2D table, 3 operations', c: '#f85149', why: 'Insert / delete / replace each map to a neighbouring cell — LCS\'s famous sibling.' },
];
export default function DpInterviewVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PROBS.length), 2.3, auto);
  const p = PROBS[i];
  return (
    <Stage2D title="Common DP Interview Problems" subtitle="Every classic below is 'define the state, write the recurrence'. The stories differ; the method doesn't."
      accent={p.c} viewBox="0 0 640 300"
      controls={<>{PROBS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>The DP toolkit: <strong>1D tables</strong> for sequences (robber, Kadane), <strong>2D tables</strong> for two strings or grids (edit distance, unique paths), and <strong>boolean reachability</strong> (word break). State definition is 80% of the battle — practice writing "dp[i] means…" out loud.</>}>
      <rect x="60" y="46" width="520" height="150" rx="14" fill="#0b0f15" stroke={p.c} strokeWidth="1.5" />
      <text x="320" y="88" fill="#e6edf3" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{p.t}</text>
      <rect x="130" y="104" width="380" height="32" rx="16" fill={p.c + '22'} stroke={p.c} />
      <text x="320" y="125" fill={p.c} fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{p.pat}</text>
      <foreignObject x="86" y="146" width="468" height="46"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '14px system-ui', lineHeight: 1.4, textAlign: 'center' }}>{p.why}</div></foreignObject>
      {PROBS.map((_, k) => <circle key={k} cx={320 - (PROBS.length - 1) * 12 + k * 24} cy="228" r="5" fill={k === i ? p.c : '#30363d'} />)}
      <text x="320" y="266" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">problem {i + 1} of {PROBS.length} — each detailed step-by-step in the lesson below</text>
    </Stage2D>
  );
}

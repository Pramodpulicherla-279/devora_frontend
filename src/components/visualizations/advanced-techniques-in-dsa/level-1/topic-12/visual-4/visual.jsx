/* Problem: Assign Cookies
 * 2D animated: sort kids by greed and cookies by size, then match with two pointers — give
 * each kid the SMALLEST cookie that satisfies them, saving big cookies for greedy kids. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const KIDS = [1, 2, 3], COOKIES = [1, 1, 3];
const STEPS = [
  { k: 0, c: 0, match: true, log: 'kid(greed 1) vs cookie(size 1): 1 ≥ 1 → feed! both advance' },
  { k: 1, c: 1, match: false, log: 'kid(2) vs cookie(1): too small → discard cookie, kid waits' },
  { k: 1, c: 2, match: true, log: 'kid(2) vs cookie(3): 3 ≥ 2 → feed!' },
  { k: 2, c: 3, done: true, fed: 2, log: 'cookies exhausted → 2 content kids (the maximum possible)' },
];
export default function GreedyAssignCookiesVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.8, auto);
  const s = STEPS[i];
  return (
    <Stage2D title="Assign Cookies" subtitle="Sort both sides, then walk them together: the smallest unfed kid meets the smallest remaining cookie. Satisfy or discard — never waste a large cookie on a modest appetite."
      accent="#4fce78" viewBox="0 0 640 230"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>The exchange argument: any assignment that gives a kid a bigger cookie than necessary can be swapped to the minimal one without unfeeding anyone — so smallest-fits-first is optimal. Sort + one pass: <strong>O(n log n)</strong>. Same shape as boats-to-save-people and task matching.</>}>
      <text x="120" y="52" fill="#8b949e" fontSize="12" fontFamily="system-ui">kids (greed, sorted):</text>
      {KIDS.map((g, k) => {
        const isCur = k === s.k && !s.done, isFed = k < s.k || (s.done && k < 2);
        return (
          <g key={k}>
            <circle cx={320 + k * 80} cy="52" r="22" fill={isFed ? 'rgba(86,211,100,.22)' : isCur ? 'rgba(255,212,59,.16)' : '#161b22'} stroke={isFed ? '#56d364' : isCur ? '#ffd43b' : '#6e7681'} strokeWidth={isCur ? 3 : 2} className={isCur ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={320 + k * 80} y="58" fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{isFed ? '😊' : '🙂'}{g}</text>
          </g>
        );
      })}
      <text x="120" y="130" fill="#8b949e" fontSize="12" fontFamily="system-ui">cookies (size, sorted):</text>
      {COOKIES.map((c, k) => {
        const isCur = k === s.c && !s.done, used = k < s.c || s.done;
        const wasted = k === 1 && i >= 2;
        return (
          <g key={k} opacity={wasted ? 0.35 : 1} style={{ transition: 'opacity .3s' }}>
            <rect x={296 + k * 80} y="106" width="48" height="44" rx="10" fill={isCur ? 'rgba(255,212,59,.16)' : used && !wasted ? 'rgba(86,211,100,.16)' : '#161b22'} stroke={isCur ? '#ffd43b' : used && !wasted ? '#56d364' : '#6e7681'} strokeWidth={isCur ? 3 : 2} className={isCur ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={320 + k * 80} y="134" fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">🍪{c}</text>
          </g>
        );
      })}
      <text x="320" y="196" fill={s.done ? '#56d364' : s.match ? '#56d364' : '#f0a35e'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{s.done ? `✓ answer: ${s.fed} kids fed` : s.match ? 'cookie ≥ greed → feed, advance both' : 'cookie too small → discard it, keep the kid'}</text>
    </Stage2D>
  );
}

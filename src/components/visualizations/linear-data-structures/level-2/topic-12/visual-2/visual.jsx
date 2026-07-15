/* Problem: Valid Anagram
 * 2D animated: count letters of the first word up, the second word down. If every tally lands
 * back at zero, they're anagrams. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const A = 'anagram', B = 'nagaram';
const LETTERS = [...new Set((A + B).split(''))].sort();
export default function StrValidAnagramVisualization() {
  const [k, setK] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setK(v => (v > A.length ? 0 : v + 1)), 0.55, auto);
  const cnt = {}; LETTERS.forEach(l => cnt[l] = 0);
  A.slice(0, Math.min(k, A.length)).split('').forEach(c => cnt[c]++);
  B.slice(0, Math.min(k, B.length)).split('').forEach(c => cnt[c]--);
  const done = k > A.length;
  const allZero = LETTERS.every(l => cnt[l] === 0);

  return (
    <Stage2D
      title="Valid Anagram"
      subtitle="Two strings are anagrams if they use the same letters the same number of times. Add for one word, subtract for the other — everything should cancel to zero."
      accent="#56d364"
      viewBox="0 0 640 240"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setK(v => (v > A.length ? 0 : v + 1))}>step</button>
          <button className="dsa2d-btn" onClick={() => setK(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{done ? (allZero ? '✓ anagram' : '✗ not') : `matching #${Math.min(k, A.length)}`}</span>
        </>
      }
      legend={<>A single count array (or dict) handles it: <code>+1</code> for each char of A, <code>−1</code> for each of B. If lengths differ, or any count is non-zero at the end, it's not an anagram → <strong>O(n)</strong> time, O(1) space (26 letters). Beats sorting's O(n log n).</>}
    >
      <text x="120" y="52" fill="#8b949e" fontSize="14" fontFamily="Consolas">"{A}"  (+)</text>
      <text x="360" y="52" fill="#8b949e" fontSize="14" fontFamily="Consolas">"{B}"  (−)</text>
      {LETTERS.map((L, li) => {
        const v = cnt[L];
        const zero = v === 0;
        return (
          <g key={L}>
            <text x={120 + li * 62} y="100" fill="#e6edf3" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{L}</text>
            <rect x={120 + li * 62 - 22} y="116" width="44" height="40" rx="8" fill={zero ? 'rgba(86,211,100,.15)' : 'rgba(240,136,62,.18)'} stroke={zero ? '#56d364' : '#f0883e'} strokeWidth="2" />
            <text x={120 + li * 62} y="142" fill={zero ? '#7ee787' : '#f8c088'} fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      <text x="320" y="196" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">every tally should return to 0</text>
      {done && <text x="320" y="222" fill={allZero ? '#56d364' : '#f85149'} fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{allZero ? '✓ all zero → valid anagram' : '✗ mismatch'}</text>}
    </Stage2D>
  );
}

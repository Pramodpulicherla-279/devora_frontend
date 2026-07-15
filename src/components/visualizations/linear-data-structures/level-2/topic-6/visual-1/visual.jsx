/* Lesson: Anagrams — Using Hashing to Compare Without Sorting
 * 2D animated: count each letter's frequency in both words. If the two frequency maps match,
 * they're anagrams — an O(n) alternative to sorting both strings O(n log n). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const A = 'LISTEN', B = 'SILENT';
const LETTERS = [...new Set((A + B).split(''))].sort();
export default function StrAnagramVisualization() {
  const [k, setK] = useState(0);                 // chars counted so far (0..len)
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setK(v => (v >= A.length + 1 ? 0 : v + 1)), 0.7, auto);
  const countA = {}, countB = {};
  A.slice(0, Math.min(k, A.length)).split('').forEach(c => countA[c] = (countA[c] || 0) + 1);
  B.slice(0, Math.min(k, B.length)).split('').forEach(c => countB[c] = (countB[c] || 0) + 1);
  const done = k > A.length;
  const CW = 62, gap = 8;
  const startX = 320 - (A.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Anagram Check by Hashing"
      subtitle="Two words are anagrams if they use exactly the same letters. Count letter frequencies once for each — if the counts match, they're anagrams."
      accent="#56d364"
      viewBox="0 0 640 280"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setK(v => (v >= A.length + 1 ? 0 : v + 1))}>count next</button>
          <button className="dsa2d-btn" onClick={() => setK(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{done ? '✓ counts match → anagram' : `counting char ${Math.min(k, A.length)}`}</span>
        </>
      }
      legend={<>Sorting both strings and comparing is <strong>O(n log n)</strong>. Building a frequency <strong>hash map</strong> for each and comparing is <strong>O(n)</strong> — a single pass per word. Same idea powers "group anagrams": use the sorted word or the count as a hash key.</>}
    >
      {/* two words */}
      {[{ s: A, y: 40, cnt: countA, label: 'A' }, { s: B, y: 96, cnt: countB, label: 'B' }].map(({ s, y, label }) => (
        <g key={label}>
          {s.split('').map((ch, ci) => {
            const counted = ci < (label === 'A' ? Math.min(k, A.length) : Math.min(k, B.length));
            return (
              <g key={ci}>
                <rect x={startX + ci * (CW + gap)} y={y} width={CW} height="44" rx="7" fill={counted ? 'rgba(86,211,100,.14)' : '#161b22'} stroke={counted ? '#3fb950' : '#30363d'} strokeWidth="2" />
                <text x={startX + ci * (CW + gap) + CW / 2} y={y + 30} fill="#e6edf3" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text>
              </g>
            );
          })}
        </g>
      ))}
      {/* frequency table */}
      <text x="120" y="176" fill="#8b949e" fontSize="12" fontFamily="Consolas">letter</text>
      <text x="120" y="204" fill="#58a6ff" fontSize="12" fontFamily="Consolas">count A</text>
      <text x="120" y="230" fill="#a78bfa" fontSize="12" fontFamily="Consolas">count B</text>
      {LETTERS.map((L, li) => {
        const a = countA[L] || 0, b = countB[L] || 0;
        const match = a === b;
        return (
          <g key={L}>
            <text x={230 + li * 56} y="176" fill="#e6edf3" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{L}</text>
            <text x={230 + li * 56} y="204" fill="#79c0ff" fontSize="15" textAnchor="middle" fontFamily="Consolas">{a}</text>
            <text x={230 + li * 56} y="230" fill="#c9bdf5" fontSize="15" textAnchor="middle" fontFamily="Consolas">{b}</text>
            {done && <text x={230 + li * 56} y="254" fill={match ? '#56d364' : '#f85149'} fontSize="14" textAnchor="middle" fontFamily="Consolas">{match ? '✓' : '✗'}</text>}
          </g>
        );
      })}
    </Stage2D>
  );
}

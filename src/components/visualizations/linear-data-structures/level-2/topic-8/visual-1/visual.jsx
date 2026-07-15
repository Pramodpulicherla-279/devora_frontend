/* Lesson: Substrings vs Subsequences — A Distinction That Trips Everyone Up
 * 2D animated: toggle between a SUBSTRING (a contiguous run) and a SUBSEQUENCE (characters in
 * order but not necessarily adjacent). The highlight pattern makes the difference obvious. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STR = 'ALGORITHM';
const SUBSTRING = [3, 4, 5];            // "ORI" — contiguous
const SUBSEQUENCE = [0, 3, 6, 8];       // "A O I M" — gaps allowed, order kept
export default function StrSubstringSubseqVisualization() {
  const [mode, setMode] = useState('substring');
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setMode(m => m === 'substring' ? 'subsequence' : 'substring'), 2.3, auto);
  const picks = mode === 'substring' ? SUBSTRING : SUBSEQUENCE;
  const picked = STR.split('').filter((_, i) => picks.includes(i)).join('');
  const CW = 58, gap = 6;
  const startX = 320 - (STR.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Substring vs Subsequence"
      subtitle="A substring is a contiguous slice. A subsequence keeps the original order but may skip characters. Mixing them up is a classic interview trap."
      accent="#f0883e"
      viewBox="0 0 640 220"
      controls={
        <>
          <button className={`dsa2d-btn ${mode === 'substring' ? 'dsa2d-btn--on' : ''}`} onClick={() => setMode('substring')}>substring</button>
          <button className={`dsa2d-btn ${mode === 'subsequence' ? 'dsa2d-btn--on' : ''}`} onClick={() => setMode('subsequence')}>subsequence</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">"{picked}"</span>
        </>
      }
      legend={mode === 'substring'
        ? <>A <strong>substring</strong> is an unbroken run of characters — a contiguous slice <code>s[i:j]</code>. A string of length n has O(n²) substrings.</>
        : <>A <strong>subsequence</strong> deletes zero or more characters while keeping the rest in order — gaps are allowed. There are O(2ⁿ) subsequences. Every substring is a subsequence, but not vice-versa.</>}
    >
      {STR.split('').map((ch, k) => {
        const on = picks.includes(k);
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="76" width={CW} height="56" rx="8"
              fill={on ? 'rgba(240,136,62,.25)' : '#161b22'} stroke={on ? '#f0883e' : '#30363d'} strokeWidth="2"
              className={on ? 'dsa2d-pop' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
            <text x={startX + k * (CW + gap) + CW / 2} y="112" fill={on ? '#f8c088' : '#8b949e'} fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="68" fill="#6b7785" fontSize="10" textAnchor="middle" fontFamily="Consolas">{k}</text>
          </g>
        );
      })}
      {/* connecting line for subsequence */}
      {mode === 'subsequence' && picks.slice(0, -1).map((idx, n) => (
        <line key={n} x1={startX + idx * (CW + gap) + CW / 2} y1="140" x2={startX + picks[n + 1] * (CW + gap) + CW / 2} y2="140" stroke="#f0883e" strokeWidth="2" strokeDasharray="4 3" />
      ))}
      <text x="320" y="176" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">{mode === 'substring' ? 'contiguous — no gaps allowed' : 'gaps allowed (dashed jumps) — order preserved'}</text>
    </Stage2D>
  );
}

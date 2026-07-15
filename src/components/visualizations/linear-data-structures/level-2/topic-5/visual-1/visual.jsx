/* Lesson: Checking for Palindromes
 * 2D animated: two pointers from both ends compare characters moving inward. If every pair
 * matches until they cross, it's a palindrome. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STR = 'RACECAR';
export default function StrPalindromeVisualization() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const maxStep = Math.floor(STR.length / 2);
  useAutoPlay(() => setStep(v => (v > maxStep ? 0 : v + 1)), 0.9, auto);
  const lo = Math.min(step, maxStep), hi = STR.length - 1 - lo;
  const done = step >= maxStep;
  const CW = 62, gap = 8;
  const startX = 320 - (STR.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Palindrome Check"
      subtitle="A palindrome reads the same forwards and backwards. Compare the outermost pair, then step inward — any mismatch means it's not a palindrome."
      accent="#a78bfa"
      viewBox="0 0 640 220"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setStep(v => (v > maxStep ? 0 : v + 1))}>compare</button>
          <button className="dsa2d-btn" onClick={() => setStep(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{done ? '✓ palindrome!' : `'${STR[lo]}' == '${STR[hi]}' ?`}</span>
        </>
      }
      legend={<>Two pointers, <strong>O(n/2) = O(n)</strong> time and <strong>O(1)</strong> space — no reversed copy needed. It short-circuits on the first mismatch. (For real input you'd often lowercase and strip non-letters first.)</>}
    >
      {STR.split('').map((ch, k) => {
        const isLo = k === lo && !done, isHi = k === hi && !done;
        const matched = k < lo || k > hi;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="70" width={CW} height="54" rx="8"
              fill={isLo || isHi ? 'rgba(167,139,250,.25)' : matched ? 'rgba(86,211,100,.14)' : '#161b22'}
              stroke={isLo || isHi ? '#a78bfa' : matched ? '#56d364' : '#30363d'} strokeWidth="2"
              className={isLo || isHi ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="106" fill="#e6edf3" fontSize="22" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text>
          </g>
        );
      })}
      {!done && <>
        <text x={startX + lo * (CW + gap) + CW / 2} y="60" fill="#a78bfa" fontSize="12" textAnchor="middle" fontFamily="Consolas">▲</text>
        <text x={startX + hi * (CW + gap) + CW / 2} y="60" fill="#a78bfa" fontSize="12" textAnchor="middle" fontFamily="Consolas">▲</text>
      </>}
      <text x="320" y="164" fill={done ? '#56d364' : '#8b949e'} fontSize="14" textAnchor="middle" fontFamily="Consolas">{done ? 'all pairs matched — it reads the same both ways' : 'green = pairs already confirmed equal'}</text>
    </Stage2D>
  );
}

/* Lesson: The Two-Pointer Technique Applied to Strings
 * 2D animated: "reverse only the vowels". One pointer scans from the left for a vowel, one
 * from the right; when both find one, swap and step inward. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STR = 'DEVORA';
const isV = c => 'AEIOU'.includes(c);
// Precompute swap sequence of vowel index pairs
const vIdx = [...STR].map((c, i) => isV(c) ? i : -1).filter(i => i >= 0);
const SWAPS = []; for (let i = 0, j = vIdx.length - 1; i < j; i++, j--) SWAPS.push([vIdx[i], vIdx[j]]);
export default function StrTwoPointerVisualization() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(v => (v > SWAPS.length ? 0 : v + 1)), 1.0, auto);
  const arr = STR.split('');
  for (let s = 0; s < Math.min(step, SWAPS.length); s++) { const [a, b] = SWAPS[s]; [arr[a], arr[b]] = [arr[b], arr[a]]; }
  const active = step < SWAPS.length ? SWAPS[step] : null;
  const done = step >= SWAPS.length;
  const CW = 66, gap = 8;
  const startX = 320 - (STR.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Two Pointers on Strings: Reverse Vowels"
      subtitle="Two pointers don't just walk toward each other blindly — they can skip characters. Here each side scans for a vowel, then the pair is swapped."
      accent="#a78bfa"
      viewBox="0 0 640 220"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setStep(v => (v > SWAPS.length ? 0 : v + 1))}>swap vowels</button>
          <button className="dsa2d-btn" onClick={() => setStep(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{done ? `'${arr.join('')}' ✓` : `swap vowels [${active[0]}] ↔ [${active[1]}]`}</span>
        </>
      }
      legend={<>Both pointers move independently — advancing past consonants until each lands on a vowel — then swap and continue. Still a single pass → <strong>O(n)</strong> time, <strong>O(1)</strong> extra space (working on a char list). The same skip-and-swap idea handles "valid palindrome ignoring punctuation".</>}
    >
      {arr.map((ch, k) => {
        const vowel = isV(ch);
        const hot = active && (k === active[0] || k === active[1]);
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="72" width={CW} height="56" rx="8"
              fill={hot ? 'rgba(167,139,250,.28)' : vowel ? 'rgba(167,139,250,.1)' : '#161b22'}
              stroke={hot ? '#a78bfa' : vowel ? '#7c6bb0' : '#30363d'} strokeWidth="2"
              className={hot ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="108" fill={vowel ? '#c9bdf5' : '#e6edf3'} fontSize="24" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text>
          </g>
        );
      })}
      <text x="320" y="164" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">{done ? 'consonants stayed put; vowels E,O,A reversed → A,O,E' : 'purple-tinted = vowels · consonants are skipped over'}</text>
    </Stage2D>
  );
}

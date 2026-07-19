/* Problem: Koko Eating Bananas (Binary Search on Answer)
 * 2D animated: binary-search the eating SPEED. For each candidate k, hours(k) = Σ ceil(pile/k);
 * feasible means finishing within h hours. Find the minimum feasible speed. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PILES = [3, 6, 7, 11];
const H = 8;
const hours = k => PILES.reduce((s, p) => s + Math.ceil(p / k), 0);
const STEPS = [
  { lo: 1, hi: 11, mid: 6, log: `k=6 → hours = 1+1+2+2 = 6 ≤ 8 ✓ feasible → try slower: hi=6` },
  { lo: 1, hi: 6, mid: 3, log: `k=3 → hours = 1+2+3+4 = 10 > 8 ✗ too slow → lo=4` },
  { lo: 4, hi: 6, mid: 5, log: `k=5 → hours = 1+2+2+3 = 8 ≤ 8 ✓ → hi=5` },
  { lo: 4, hi: 5, mid: 4, log: `k=4 → hours = 1+2+2+3 = 8 ≤ 8 ✓ → hi=4` },
  { lo: 4, hi: 4, mid: null, done: true, ans: 4, log: 'lo == hi → minimum speed = 4 bananas/hour' },
];
export default function SrchKokoVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.8, auto);
  const s = STEPS[i];
  const k = s.mid ?? s.ans;
  return (
    <Stage2D title="Koko Eating Bananas" subtitle="Piles [3,6,7,11], 8 hours. Eating speed k is the hidden answer: faster always finishes sooner (monotonic!), so binary-search k for the smallest speed that still fits in h hours."
      accent="#f0a35e" viewBox="0 0 640 230"
      controls={<>{STEPS.map((_, j) => <button key={j} className={`dsa2d-btn ${j === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(j)}>{j + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>The check function is the whole design: <code>hours(k) = Σ ceil(pile / k)</code>, O(n) per probe → total <strong>O(n log maxPile)</strong>. The same "binary search the answer, verify with a scan" template solves ship-capacity, split-array, and aggressive-cows problems.</>}>
      {PILES.map((p, j) => {
        const need = Math.ceil(p / k);
        return (
          <g key={j}>
            {Array.from({ length: p }).map((_, b) => <rect key={b} x={100 + j * 130} y={158 - b * 11} width="52" height="9" rx="3" fill={b < k * (need - 1) ? 'rgba(240,163,94,.5)' : 'rgba(240,163,94,.22)'} stroke="#f0a35e" strokeWidth="1" />)}
            <text x={126 + j * 130} y="180" fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{p} 🍌</text>
            <text x={126 + j * 130} y="200" fill="#f8c088" fontSize="12" textAnchor="middle" fontFamily="Consolas">⌈{p}/{k}⌉={need}h</text>
          </g>
        );
      })}
      <text x="320" y="34" fill={s.done ? '#56d364' : hours(k) <= H ? '#56d364' : '#f85149'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{s.done ? `answer: k = ${s.ans} (exactly ${hours(s.ans)} hours)` : `speed k = ${k} → total ${hours(k)} hours (budget ${H})`}</text>
    </Stage2D>
  );
}

/* Lesson: Sliding Window on Strings — Longest Substring Problems
 * 2D animated: find the longest substring with no repeating characters. The right edge extends
 * the window; on a duplicate, the left edge jumps forward. Tracks the best length. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STR = 'ABCABCBB';
// Replay the algorithm up to a given right index, returning {left, best, bestRange}
function stateAt(rightMax) {
  let left = 0, best = 0, bestL = 0, bestR = 0; const last = {};
  for (let r = 0; r <= rightMax && r < STR.length; r++) {
    const c = STR[r];
    if (last[c] !== undefined && last[c] >= left) left = last[c] + 1;
    last[c] = r;
    if (r - left + 1 > best) { best = r - left + 1; bestL = left; bestR = r; }
  }
  return { left, best, bestL, bestR };
}
export default function StrSlidingWindowVisualization() {
  const [right, setRight] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setRight(v => (v >= STR.length - 1 ? 0 : v + 1)), 0.9, auto);
  const { left, best, bestL, bestR } = stateAt(right);
  const CW = 58, gap = 8;
  const startX = 320 - (STR.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Longest Substring Without Repeats"
      subtitle="Grow a window to the right. If the new character is already inside, slide the left edge past its previous occurrence — the window always holds unique characters."
      accent="#56d364"
      viewBox="0 0 640 230"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setRight(v => (v >= STR.length - 1 ? 0 : v + 1))}>extend →</button>
          <button className="dsa2d-btn" onClick={() => setRight(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">window [{left}..{right}] · longest = {best}</span>
        </>
      }
      legend={<>A hash map remembers each character's last index. When a repeat appears, jump <code>left</code> to just past it — never backward. Each pointer only moves forward, so the whole scan is <strong>O(n)</strong>. For "ABCABCBB" the answer is <strong>3</strong> ("ABC").</>}
    >
      <rect x={startX + left * (CW + gap) - 4} y="66" width={(right - left + 1) * (CW + gap) - gap + 8} height="66" rx="10" fill="rgba(86,211,100,.1)" stroke="#56d364" strokeWidth="2" style={{ transition: 'x .3s, width .3s' }} />
      {STR.split('').map((ch, k) => {
        const inWin = k >= left && k <= right;
        const inBest = k >= bestL && k <= bestR;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="76" width={CW} height="48" rx="8"
              fill={inWin ? 'rgba(86,211,100,.22)' : '#161b22'} stroke={inWin ? '#56d364' : '#30363d'} strokeWidth="2" />
            <text x={startX + k * (CW + gap) + CW / 2} y="106" fill="#e6edf3" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text>
            {inBest && <circle cx={startX + k * (CW + gap) + CW / 2} cy="142" r="3.5" fill="#7ee787" />}
          </g>
        );
      })}
      <text x={startX + left * (CW + gap) + CW / 2} y="64" fill="#56d364" fontSize="11" textAnchor="middle" fontFamily="Consolas">L</text>
      <text x={startX + right * (CW + gap) + CW / 2} y="64" fill="#56d364" fontSize="11" textAnchor="middle" fontFamily="Consolas">R</text>
      <text x="320" y="168" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">green dots mark the best window found so far (length {best})</text>
    </Stage2D>
  );
}

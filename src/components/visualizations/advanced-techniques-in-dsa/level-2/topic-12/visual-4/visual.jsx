/* Problem: Maximum Subarray (Kadane's Algorithm)
 * 2D animated: at each element, either EXTEND the running subarray or RESTART fresh — a
 * one-variable DP. Track the best ever seen. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const A = [-2, 1, -3, 4, -1, 2, 1, -5];
function buildSteps() {
  const steps = []; let cur = 0, best = -Infinity, start = 0, bs = 0, be = 0;
  for (let i = 0; i < A.length; i++) {
    if (cur + A[i] < A[i]) { cur = A[i]; start = i; } else cur += A[i];
    const restarted = cur === A[i] && start === i;
    if (cur > best) { best = cur; bs = start; be = i; }
    steps.push({ i, cur, best, bs, be, restarted, log: `${restarted ? `restart at ${A[i]}` : `extend: ${cur - A[i]} + ${A[i]} = ${cur}`} · best = ${best}` });
  }
  steps.push({ i: A.length - 1, cur, best, bs, be, done: true, log: `max subarray = [4, −1, 2, 1] → sum 6` });
  return steps;
}
const STEPS = buildSteps();
const CW = 66, gap = 8, startX = (640 - (A.length * (CW + gap) - gap)) / 2;
export default function DpKadaneVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.4, auto);
  const s = STEPS[i];
  return (
    <Stage2D title="Maximum Subarray (Kadane)" subtitle="The state is tiny: 'best sum ENDING right here'. If the running sum ever drags the newcomer down, drop it and restart — negative baggage never helps. One pass, one comparison per element."
      accent="#4fce78" viewBox="0 0 640 210"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>Kadane is DP compressed to a single variable: <code>cur = max(x, cur + x)</code>, <code>best = max(best, cur)</code>. <strong>O(n)</strong> time, O(1) space. The green band marks the best window found — [4, −1, 2, 1] summing to <strong>6</strong>.</>}>
      {A.map((v, k) => {
        const isCur = k === s.i && !s.done, inBest = k >= s.bs && k <= s.be;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="62" width={CW} height="52" rx="8" fill={isCur ? 'rgba(255,212,59,.16)' : inBest ? 'rgba(86,211,100,.16)' : '#161b22'} stroke={isCur ? '#ffd43b' : inBest ? '#56d364' : '#6e7681'} strokeWidth={isCur ? 3 : 2} className={isCur ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={startX + k * (CW + gap) + CW / 2} y="94" fill={v < 0 ? '#ff9d95' : '#e6edf3'} fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      {/* best band */}
      <rect x={startX + s.bs * (CW + gap) - 4} y="56" width={(s.be - s.bs + 1) * (CW + gap) - gap + 8} height="64" rx="10" fill="none" stroke="#56d364" strokeWidth="2" strokeDasharray="6 4" style={{ transition: 'x .35s, width .35s' }} />
      <text x="200" y="158" fill="#f8c088" fontSize="14" fontWeight="700" fontFamily="Consolas">cur = {s.cur}</text>
      <text x="420" y="158" fill="#7ee787" fontSize="14" fontWeight="700" fontFamily="Consolas">best = {s.best}</text>
      <text x="320" y="192" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">rule: cur = max(x, cur + x) — carrying a negative prefix is never worth it</text>
    </Stage2D>
  );
}
